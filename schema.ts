import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql'

import { g, InferResolvers, Infer } from './index'

import { createYoga } from 'graphql-yoga'

const userType = g.type('User', {
  username: g.string(),
  age: g.int()
})

const queryType = g.type('Query', {
  user: g.ref(userType)
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
              type: new GraphQLNonNull(GraphQLString),
              resolve(parent, args, context, info) {
                return parent.username
              }
            },
            age: {
              type: new GraphQLNonNull(GraphQLInt),
              resolve(parent, args, context, info) {
                return parent.age
              }
            }
          }
        })),
        resolve() {
          return {
            username: 'Mish Ushakov',
            age: 20
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

const resolvers: InferResolvers<{ Query: typeof queryType, User: typeof userType }, {}> = {
  Query: {
    user(parent, args, context, info) {
      return {
        username: 'Mish Ushakov',
        age: 20
      }
    }
  },
  User: {
    username(parent: Infer<typeof userType>, args, context, info) {
      return parent.username
    },
    age(parent: Infer<typeof userType>, args, context, info) {
      return parent.age
    }
  }
}
