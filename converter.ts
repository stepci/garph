import { AnyType } from './index'
import { makeExecutableSchema } from '@graphql-tools/schema'

import { schemaComposer, ObjectTypeComposerFieldConfigMapDefinition } from 'graphql-compose'

export function convertSchema({ types, resolvers }: { types: AnyType[], resolvers?: any }, config?: { defaultRequired?: boolean }) {
  const convertedTypes = types.map(type => convertToGraphqlType(type, config, resolvers))
  return makeExecutableSchema({ typeDefs: convertedTypes.map(t => t.toSDL()), resolvers })
}

function iterateFields (type: AnyType, name: string, config) {
  switch (type.typeDef.type) {
    case 'string':
      return type.typeDef.isRequired ? 'String!' : 'String'
    case 'int':
      return type.typeDef.isRequired ? 'Int!' : 'Int'
    case 'float':
      return type.typeDef.isRequired ? 'Float!' : 'Float'
    case 'boolean':
      return type.typeDef.isRequired ? 'Boolean!' : 'Boolean'
    case 'id':
      return type.typeDef.isRequired ? 'ID!' : 'ID'
    case 'list':
      return type.typeDef.isRequired ? `[${iterateFields(type.typeDef.shape, name, config)}]!` : `[${iterateFields(type.typeDef.shape, name, config)}]`
    case 'ref':
      return type.typeDef.isRequired ? `${type.typeDef.name}!` : type.typeDef.name
  }
}

function convertToGraphqlType(type: AnyType, config, resolvers) {
  const x = schemaComposer.createObjectTC({
    name: type.typeDef.name,
    fields: parseFields(type.typeDef.shape, config, resolvers),
  })

  return x
}

function parseFields(fields, config, resolvers) {
  const fieldsObj: ObjectTypeComposerFieldConfigMapDefinition<any, any> = {}
  Object.keys(fields).forEach(fieldName => {
    const field = fields[fieldName]
    fieldsObj[fieldName] = {
      type: iterateFields(field, fieldName, config),
      args: parseArgs(field.typeDef.args, config),
      description: field.typeDef.description,
    }
  })

  return fieldsObj
}

function parseArgs (anyargs, config) {
  if (!anyargs) return

  const args: any = {}
  Object.keys(anyargs).forEach(argName => {
    const arg = anyargs[argName]
    args[argName] = {
      type: iterateFields(arg, argName, config),
      description: arg.typeDef.description
    }
  })

  return args
}
