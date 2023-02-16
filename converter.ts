import { AnyType } from './index'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { schemaComposer, ObjectTypeComposerFieldConfigMapDefinition } from 'graphql-compose'

export function convertSchema({ types, resolvers }: { types: AnyType[], resolvers?: any }, config?: { defaultNullability?: boolean }) {
  const convertedTypes = types.map(type => convertToGraphqlType(type.typeDef.name, type, config))
  return makeExecutableSchema({ typeDefs: convertedTypes.map(t => t.toSDL()), resolvers })
}

function isOptional (target: string, type: AnyType, config) {
  return type.typeDef.isRequired ? `${target}!` : type.typeDef.isOptional ? `${target}` : config.defaultNullability ? `${target}` : `${target}!`
}

function iterateFields (type: AnyType, name: string, config) {
  switch (type.typeDef.type) {
    case 'string':
      return isOptional('String', type, config)
    case 'int':
      return isOptional('Int', type, config)
    case 'float':
      return isOptional('Float', type, config)
    case 'boolean':
      return isOptional('Boolean', type, config)
    case 'id':
      return isOptional('ID', type, config)
    case 'list':
      return isOptional(`[${iterateFields(type.typeDef.shape, name, config)}]`, type, config)
    case 'ref':
      return isOptional(type.typeDef.name, type, config)
    case 'enum':
      return isOptional(type.typeDef.name, type, config)
    case 'scalar':
      return isOptional(type.typeDef.name, type, config)
    case 'union':
      return isOptional(type.typeDef.name, type, config)
    case 'type':
      return isOptional(type.typeDef.name, type, config)
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
