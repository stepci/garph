import { AnyType, Args, GarphSchema } from './index'
import { schemaComposer } from 'graphql-compose'
import { Factory } from 'single-user-cache'
const factory = new Factory()

export type ConverterConfig = {
  defaultNullability?: boolean
}

export function printSchema(g: GarphSchema, config: ConverterConfig = { defaultNullability: false }) {
  g.types.forEach(type => schemaComposer.add(convertToGraphqlType(type.typeDef.name, type, config)))
  return schemaComposer.toSDL()
}

export function buildSchema({ g, resolvers }: { g: GarphSchema, resolvers?: any }, config: ConverterConfig = { defaultNullability: false }) {
  g.types.forEach(type => schemaComposer.add(convertToGraphqlType(type.typeDef.name, type, config, resolvers[type.typeDef.name])))
  return schemaComposer.buildSchema()
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
    case 'PaginatedList':
      schemaComposer.createObjectTC({
        name: `${type.typeDef.shape.typeDef.shape.typeDef.name}Edge`,
        fields: {
          node: {
            type: type.typeDef.shape.typeDef.shape.typeDef.name,
          },
          cursor: {
            type: 'String!',
          }
        }
      })

      schemaComposer.createObjectTC({
        name: `${type.typeDef.shape.typeDef.shape.typeDef.name}Connection`,
        fields: {
          edges: {
            type: `[${type.typeDef.shape.typeDef.shape.typeDef.name}Edge]`,
          },
          pageInfo: {
            type: 'PageInfo!',
          }
        }
      })

      return isOptional(`${type.typeDef.shape.typeDef.shape.typeDef.name}Connection`, type, config)
    case 'Ref':
      if (!typeof type.typeDef.shape) {
        throw new Error('Ref type must be a function or a valid Garph Type')
      }

      let shape
      if (typeof type.typeDef.shape === 'function') {
        shape = type.typeDef.shape()
      } else {
        shape = type.typeDef.shape
      }

      return isOptional(shape.typeDef.name, type, config)
    default:
      return isOptional(type.typeDef.name, type, config)
  }
}

export function convertToGraphqlType(name: string, type: AnyType, config: ConverterConfig, resolvers?: any) {
  switch (type.typeDef.type) {
    case 'ObjectType':
      const objType = schemaComposer.createObjectTC({
        name,
        description: type.typeDef.description,
        fields: parseFields(name, type.typeDef.shape, config, resolvers),
      })

      if (type.typeDef.interfaces) {
        type.typeDef.interfaces.forEach(i => {
          objType.addFields(parseFields(name, i.typeDef.shape, config, resolvers))
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
        types: Object.values(type.typeDef.shape).map((t: AnyType) => t.typeDef.name),
        resolveType: resolvers?.resolveType
      })
    case 'InputType':
      return schemaComposer.createInputTC({
        name,
        description: type.typeDef.description,
        fields: parseFields(name, type.typeDef.shape, config),
      })
    case 'Scalar':
      return schemaComposer.createScalarTC({
        name,
        description: type.typeDef.description,
        serialize: type.typeDef.scalarOptions?.serialize,
        parseValue: type.typeDef.scalarOptions?.parseValue,
        parseLiteral: type.typeDef.scalarOptions?.parseLiteral,
        specifiedByURL: type.typeDef.scalarOptions?.specifiedByUrl
      })
    case 'InterfaceType':
      const interfaceType = schemaComposer.createInterfaceTC({
        name,
        description: type.typeDef.description,
        fields: parseFields(name, type.typeDef.shape, config),
        resolveType: resolvers?.resolveType
      })

      if (type.typeDef.interfaces) {
        type.typeDef.interfaces.forEach(i => {
          interfaceType.addFields(parseFields(name, i.typeDef.shape, config))
          interfaceType.addInterface(i.typeDef.name)
        })
      }

      return interfaceType
  }
}

export function parseFields(name: string, fields: AnyType, config: ConverterConfig, resolvers?: any) {
  const fieldsObj = {}
  Object.keys(fields).forEach(fieldName => {
    const field = fields[fieldName]
    fieldsObj[fieldName] = {
      type: getFieldType(field, config),
      args: parseArgs(field.typeDef.args, config),
      defaultValue: field.typeDef.defaultValue,
      deprecationReason: field.typeDef.deprecated,
      description: field.typeDef.description,
      resolve: addResolver(resolvers?.[fieldName], name + '.' + fieldName),
      subscribe: resolvers?.[fieldName]?.subscribe
    }
  })

  return fieldsObj
}

function addResolver (resolver, cacheKey: string) {
  if (!resolver) return
  if (resolver.resolve) return resolver.resolve

  const dataLoader = factory.create()

  // Loader
  if (resolver.load) {
    factory.add(cacheKey, { cache: true }, async (queries) => resolver.load(queries))

    return (parent, args, context, info) => {
      return dataLoader[cacheKey]({ parent, args, context, info })
    }
  }

  // Loader (no cache)
  if (resolver.loadBatch) {
    factory.add(cacheKey, { cache: false }, async (queries) => resolver.loadBatch(queries))

    return (parent, args, context, info) => {
      return dataLoader[cacheKey]({ parent, args, context, info })
    }
  }

  return resolver
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
