import { g, InferResolvers, buildSchema } from './../src/index'
import { createYoga } from 'graphql-yoga'
import { createServer } from 'http'

const date = g.scalarType<Date, string>('Test')

const queryType = g.type('Query', {
  today: date
})

const resolvers: InferResolvers<{ Query: typeof queryType }, {}> = {
  Query: {
    today: () => new Date()
  }
}

const schema = buildSchema({ g, resolvers })
const yoga = createYoga({ schema })
const server = createServer(yoga)
server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})
