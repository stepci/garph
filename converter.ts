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
  GraphQLList,
  GraphQLInputObjectType
} from 'graphql'

export function convertSchema({ types, resolvers }: { types: AnyType[], resolvers?: any }, config?: { defaultRequired?: boolean }) {
  const queryType = types.find(type => type.typeDef.name === 'Query')
  const mutationType = types.find(type => type.typeDef.name === 'Mutation')
  const subscriptionType = types.find(type => type.typeDef.name === 'Subscription')
  // const otherTypes = types
  //   .filter(type => type.typeDef.name !== 'Query' && type.typeDef.name !== 'Mutation' && type.typeDef.name !== 'Subscription')
  //   .map(type => convertToGraphqlType(type, config, resolvers))

  return new GraphQLSchema({
    query: convertToGraphqlType(queryType, config, resolvers),
    // mutation: convertToGraphqlType(mutationType),
    // subscription: convertToGraphqlType(subscriptionType),
    // types: otherTypes
  })
}

function iterateFields (type: AnyType, name: string, config) {
  switch (type.typeDef.type) {
    // case 'type':
    //   const objectType = new GraphQLObjectType({
    //     name: type.typeDef.name + 'Type',
    //     fields: () => {
    //       const fields: any = {}
    //       Object.keys(type.typeDef.shape).forEach(fieldName => {
    //         const field = type.typeDef.shape[fieldName]
    //         fields[fieldName] = {
    //           type: iterateFields(field, fieldName, config),
    //           description: field.typeDef.description,
    //         }
    //       })

    //       return fields
    //     }
    //   })

    //   return type.typeDef.isRequired ? new GraphQLNonNull(objectType) : objectType
    case 'string':
      return type.typeDef.isRequired ? new GraphQLNonNull(GraphQLString) : GraphQLString
    case 'int':
      return type.typeDef.isRequired ? new GraphQLNonNull(GraphQLInt) : GraphQLInt
    case 'float':
      return type.typeDef.isRequired ? new GraphQLNonNull(GraphQLFloat) : GraphQLFloat
    case 'boolean':
      return type.typeDef.isRequired ? new GraphQLNonNull(GraphQLBoolean) : GraphQLBoolean
    case 'id':
      return type.typeDef.isRequired ? new GraphQLNonNull(GraphQLID) : GraphQLID
    case 'list':
      return type.typeDef.isRequired ? new GraphQLNonNull(new GraphQLList(iterateFields(type.typeDef.shape, name, config))) : new GraphQLList(iterateFields(type.typeDef.shape, name, config))
  }
}

function convertToGraphqlType(type: AnyType, config, resolvers): GraphQLObjectType {
  return new GraphQLObjectType({
    name: type.typeDef.name,
    fields: () => {
      const fields: any = {}
      Object.keys(type.typeDef.shape).forEach(fieldName => {
        const field = type.typeDef.shape[fieldName]
        fields[fieldName] = {
          type: iterateFields(field, fieldName, config),
          description: field.typeDef.description,
          args: parseArgs(field.typeDef.args, config),
          resolve: resolvers[type.typeDef.name][fieldName]
        }
      })

      return fields
    }
  })
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
