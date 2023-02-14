import { AnyType } from './index'

import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLScalarType,
  GraphQLFloat,
  GraphQLID,
  GraphQLEnumType,
  GraphQLList
} from 'graphql'

export function convertSchema({ types }: { types: AnyType[] }) {
  const queryType = types.find(type => type.typeDef.name === 'Query')
  const mutationType = types.find(type => type.typeDef.name === 'Mutation')
  const subscriptionType = types.find(type => type.typeDef.name === 'Subscription')
  const otherTypes = types
    .filter(type => type.typeDef.name !== 'Query' && type.typeDef.name !== 'Mutation' && type.typeDef.name !== 'Subscription')
    .map(type => convertToGraphqlType(type))

  return new GraphQLSchema({
    query: convertToGraphqlType(queryType),
    // mutation: convertToGraphqlType(mutationType),
    // subscription: convertToGraphqlType(subscriptionType),
    types: otherTypes
  })
}

function iterateFields (type: AnyType, name: string) {
  switch (type.typeDef.type) {
    case 'type':
      const objectType = new GraphQLObjectType({
        name: type.typeDef.name,
        fields: () => {
          const fields: any = {}
          Object.keys(type.typeDef.shape).forEach(fieldName => {
            const field = type.typeDef.shape[fieldName]
            fields[fieldName] = {
              type: iterateFields(field, fieldName),
              description: field.typeDef.description,
              args: iterateArgs(field.typeDef.args)
            }
          })

          return fields
        }
      })

      return type.typeDef.isOptional ? objectType : new GraphQLNonNull(objectType)
    case 'string':
      return type.typeDef.isOptional ? GraphQLString : new GraphQLNonNull(GraphQLString)
    case 'int':
      return type.typeDef.isOptional ? GraphQLInt : new GraphQLNonNull(GraphQLInt)
    case 'float':
      return type.typeDef.isOptional ? GraphQLFloat : new GraphQLNonNull(GraphQLFloat)
    case 'boolean':
      return type.typeDef.isOptional ? GraphQLBoolean : new GraphQLNonNull(GraphQLBoolean)
    case 'id':
      return type.typeDef.isOptional ? GraphQLID : new GraphQLNonNull(GraphQLID)
    case 'list':
      return type.typeDef.isOptional ? new GraphQLList(iterateFields(type.typeDef.shape, name)) : new GraphQLNonNull(new GraphQLList(iterateFields(type.typeDef.shape, name)))
  }
}

function convertToGraphqlType(type: AnyType): GraphQLObjectType {
  return new GraphQLObjectType({
    name: type.typeDef.name,
    fields: () => {
      const fields: any = {}
      Object.keys(type.typeDef.shape).forEach(fieldName => {
        const field = type.typeDef.shape[fieldName]
        fields[fieldName] = {
          type: iterateFields(field, fieldName),
          description: field.typeDef.description,
          args: iterateArgs(field.typeDef.args)
        }
      })

      return fields
    }
  })
}

function iterateArgs (anyargs) {
  if (!anyargs) return

  const args: any = {}
  Object.keys(anyargs).forEach(argName => {
    const arg = anyargs[argName]
    args[argName] = {
      type: iterateFields(arg, argName),
      description: arg.typeDef.description
    }
  })

  return args
}
