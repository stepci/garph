import { AnyType } from './index'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { schemaComposer, ObjectTypeComposerFieldConfigMapDefinition } from 'graphql-compose'

export function convertSchema({ types, resolvers }: { types: AnyType[], resolvers?: any }, config?: { defaultRequired?: boolean }) {
  const convertedTypes = types.map(type => convertToGraphqlType(type.typeDef.name, type, config))
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
    case 'enum':
      return type.typeDef.isRequired ? `${type.typeDef.name}!` : type.typeDef.name
    case 'scalar':
      return type.typeDef.isRequired ? `${type.typeDef.name}!` : type.typeDef.name
    case 'union':
      return type.typeDef.isRequired ? `${type.typeDef.name}!` : type.typeDef.name
    case 'type':
      return type.typeDef.isRequired ? `${type.typeDef.name}!` : type.typeDef.name
  }
}

function convertToGraphqlType(name: string, type: AnyType, config) {
  switch (type.typeDef.type) {
    case 'type':
      return schemaComposer.createObjectTC({
        name,
        description: type.typeDef.description,
        fields: parseFields(type.typeDef.shape, config),
      })
    case 'enum':
      return schemaComposer.createEnumTC({
        name,
        description: type.typeDef.description,
        values: type.typeDef.shape.reduce((acc, val) => {
          acc[val] = {}
          return acc
        }, {})
      })
    case 'union':
      return schemaComposer.createUnionTC({
        name,
        description: type.typeDef.description,
        types: type.typeDef.shape.map(t => t.typeDef.name)
      })
  }
}

function parseFields(fields: AnyType['_shape'], config) {
  const fieldsObj: ObjectTypeComposerFieldConfigMapDefinition<any, any> = {}
  Object.keys(fields).forEach(fieldName => {
    const field = fields[fieldName]
    fieldsObj[fieldName] = {
      type: iterateFields(field, fieldName, config),
      deprecationReason: field.typeDef.deprecated,
      args: parseArgs(field.typeDef.args, config),
      description: field.typeDef.description
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
      defaultValue: arg.typeDef.defaultValue,
      deprecationReason: arg.typeDef.deprecated,
      description: arg.typeDef.description
    }
  })

  return args
}
