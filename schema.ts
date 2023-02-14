import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean,
} from 'graphql'

import { g, InferResolvers, Infer } from './index'

import { createYoga } from 'graphql-yoga'

const userType = g.type('User', {
  username: g.string(),
  age: g.int()
})

const queryType = g.type('Query', {
  user: g.ref(userType).args({
    includeX: g.boolean()
  })
})

const userSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: new GraphQLNonNull(new GraphQLObjectType({
          name: 'User',
          fields: {
            username: {
              type: new GraphQLNonNull(GraphQLString)
            },
            age: {
              type: new GraphQLNonNull(GraphQLInt)
            }
          }
        })),
        args: {
          includeX: {
            type: new GraphQLNonNull(GraphQLBoolean)
          }
        },
        resolve(parent, args, context, info) {
          console.log(args)
          return {
            username: 'Mish Ushakov',
            age: 22
          }
        }
      }
    }
  })
})

// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({ schema: userSchema })

// Pass it into a server to hook into request handlers.
Bun.serve(yoga)

type MyTypes = { Query: typeof queryType }

const resolvers: InferResolvers<MyTypes, {}> = {
  Query: {
    user(parent, args, context, info) {
      return {
        username: 'Mish Ushakov',
        age: 22
      }
    }
  }
}
