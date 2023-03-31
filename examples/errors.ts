import { g, InferResolvers, buildSchema } from './../src/index'
import { GraphQLError } from 'graphql'
import { createYoga } from 'graphql-yoga'
import { createServer } from 'http'

const queryType = g.type('Query', {
  error: g.string(),
  error_extensions: g.string()
})

const resolvers: InferResolvers<{ Query: typeof queryType }, {}> = {
  Query: {
    error: () => {
      throw new GraphQLError('Expected error')
    },
    error_extensions: () => {
      throw new GraphQLError('Expected error with extensions', { extensions: { code: 'EXPECTED_ERROR' } })
    }
  }
}

const schema = buildSchema({ g, resolvers })
const yoga = createYoga({ schema })
const server = createServer(yoga)
server.listen(4001, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})
