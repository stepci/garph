import { g, InferResolvers, buildSchema } from './../src/index'
import { createYoga } from 'graphql-yoga'
import { GraphQLError } from 'graphql'
import { createServer } from 'http'

const username = g.scalarType<string, string>('Username', {
  serialize: (username) => username,
  parseValue: (username) => {
    if (username.length < 3) {
      throw new GraphQLError('Username must be at least 3 characters long')
    }

    return username
  }
})

const queryType = g.type('Query', {
  login: g.string().args({ username }),
})

const resolvers: InferResolvers<{ Query: typeof queryType }, {}> = {
  Query: {
    login: (parent, args) => 'Success!'
  }
}

const schema = buildSchema({ g, resolvers })
const yoga = createYoga({ schema })
const server = createServer(yoga)
server.listen(4001, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})
