import { AnyType, Args } from './index'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { schemaComposer } from 'graphql-compose'

export type ConverterConfig = {
  defaultNullability?: boolean
}

export function convertSchema({ types, resolvers }: { types: AnyType[], resolvers?: any }, config: ConverterConfig = { defaultNullability: false }) {
  const convertedTypes = types.map(type => convertToGraphqlType(type.typeDef.name, type, config))
  return makeExecutableSchema({ typeDefs: convertedTypes.map(t => t.toSDL()), resolvers })
}

function isOptional(target: string, type: AnyType, config: ConverterConfig) {
  return type.typeDef.isRequired ? `${target}!` : type.typeDef.isOptional ? `${target}` : config.defaultNullability ? `${target}` : `${target}!`
}

export function getFieldType(type: AnyType, config: ConverterConfig) {
  switch (type.typeDef.type) {
    case 'String':
      return isOptional('String', type, config)
    case 'Int':
      return isOptional('Int', type, config)
    case 'Float':
      return isOptional('Float', type, config)
    case 'Boolean':
      return isOptional('Boolean', type, config)
    case 'ID':
      return isOptional('ID', type, config)
    case 'List':
      return isOptional(`[${getFieldType(type.typeDef.shape, config)}]`, type, config)
    case 'Ref':
      return isOptional(type.typeDef.name, type, config)
    case 'Enum':
      return isOptional(type.typeDef.name, type, config)
    case 'Scalar':
      return isOptional(type.typeDef.name, type, config)
    case 'Union':
      return isOptional(type.typeDef.name, type, config)
    case 'ObjectType':
      return isOptional(type.typeDef.name, type, config)
    case 'InputType':
      return isOptional(type.typeDef.name, type, config)
  }
}

export function convertToGraphqlType(name: string, type: AnyType, config: ConverterConfig) {
  switch (type.typeDef.type) {
    case 'ObjectType':
      const objType = schemaComposer.createObjectTC({
        name,
        description: type.typeDef.description,
        fields: parseFields(type.typeDef.shape, config)
      })

      if (type.typeDef.interfaces) {
        type.typeDef.interfaces.forEach(i => {
          objType.addFields(parseFields(i.typeDef.shape, config))
          objType.addInterface(i.typeDef.name)
        })
      }

      return objType
    case 'Enum':
      return schemaComposer.createEnumTC({
        name,
        description: type.typeDef.description,
        values: type.typeDef.shape.reduce((acc, val) => {
          acc[val] = {}
          return acc
        }, {})
      })
    case 'Union':
      return schemaComposer.createUnionTC({
        name,
        description: type.typeDef.description,
        types: type.typeDef.shape.map(t => t.typeDef.name)
      })
    case 'InputType':
      return schemaComposer.createInputTC({
        name,
        description: type.typeDef.description,
        fields: parseFields(type.typeDef.shape, config),
      })
    case 'Scalar':
      return schemaComposer.createScalarTC({
        name,
        description: type.typeDef.description,
        serialize: type.typeDef.scalarOptions.serialize,
        parseValue: type.typeDef.scalarOptions.parseValue,
        parseLiteral: type.typeDef.scalarOptions.parseLiteral,
        specifiedByURL: type.typeDef.scalarOptions.specifiedByUrl
      })
    case 'InterfaceType':
      const interfaceType = schemaComposer.createInterfaceTC({
        name,
        description: type.typeDef.description,
        fields: parseFields(type.typeDef.shape, config)
      })

      if (type.typeDef.interfaces) {
        type.typeDef.interfaces.forEach(i => {
          interfaceType.addFields(parseFields(i.typeDef.shape, config))
          interfaceType.addInterface(i.typeDef.name)
        })
      }

      return interfaceType
  }
}

export function parseFields(fields: AnyType, config: ConverterConfig) {
  const fieldsObj = {}
  Object.keys(fields).forEach(fieldName => {
    const field = fields[fieldName]
    fieldsObj[fieldName] = {
      type: getFieldType(field, config),
      deprecationReason: field.typeDef.deprecated,
      args: parseArgs(field.typeDef.args, config),
      description: field.typeDef.description
    }
  })

  return fieldsObj
}

export function parseArgs(anyArgs: Args, config) {
  if (!anyArgs) return

  const args = {}
  Object.keys(anyArgs).forEach(argName => {
    const arg = anyArgs[argName]
    args[argName] = {
      type: getFieldType(arg, config),
      defaultValue: arg.typeDef.defaultValue,
      deprecationReason: arg.typeDef.deprecated,
      description: arg.typeDef.description
    }
  })

  return args
}
