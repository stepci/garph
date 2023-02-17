import { AnyType, Args } from './index'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { schemaComposer } from 'graphql-compose'

type convertConfig = {
  defaultNullability?: boolean
}

export function convertSchema({ types, resolvers }: { types: AnyType[], resolvers?: any }, config?: convertConfig) {
  const convertedTypes = types.map(type => convertToGraphqlType(type.typeDef.name, type, config))
  return makeExecutableSchema({ typeDefs: convertedTypes.map(t => t.toSDL()), resolvers })
}

function isOptional (target: string, type: AnyType, config: convertConfig) {
  return type.typeDef.isRequired ? `${target}!` : type.typeDef.isOptional ? `${target}` : config.defaultNullability ? `${target}` : `${target}!`
}

function iterateFields (type: AnyType, config: convertConfig) {
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
      return isOptional(`[${type.typeDef.name}]`, type, config)
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
    case 'input':
      return isOptional(type.typeDef.name, type, config)
  }
}

function convertToGraphqlType(name: string, type: AnyType, config: convertConfig) {
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
    case 'input':
      return schemaComposer.createInputTC({
        name,
        description: type.typeDef.description,
        fields: parseFields(type.typeDef.shape, config) as any,
      })
    case 'scalar':
      return schemaComposer.createScalarTC({
        name,
        description: type.typeDef.description,
        serialize: type.typeDef.scalarOptions.serialize,
        parseValue: type.typeDef.scalarOptions.parseValue,
        parseLiteral: type.typeDef.scalarOptions.parseLiteral,
      })
  }
}

function parseFields(fields: AnyType, config: convertConfig) {
  const fieldsObj = {}
  Object.keys(fields).forEach(fieldName => {
    const field = fields[fieldName]
    fieldsObj[fieldName] = {
      type: iterateFields(field, config),
      deprecationReason: field.typeDef.deprecated,
      args: parseArgs(field.typeDef.args, config),
      description: field.typeDef.description
    }
  })

  return fieldsObj
}

function parseArgs (anyArgs: Args, config) {
  if (!anyArgs) return

  const args = {}
  Object.keys(anyArgs).forEach(argName => {
    const arg = anyArgs[argName]
    args[argName] = {
      type: iterateFields(arg, config),
      defaultValue: arg.typeDef.defaultValue,
      deprecationReason: arg.typeDef.deprecated,
      description: arg.typeDef.description
    }
  })

  return args
}
