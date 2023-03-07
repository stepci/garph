import { g, Infer, InferResolvers, buildSchema } from './../src/index'
import { createYoga } from 'graphql-yoga'
import { createServer } from 'http'

const node = g.interface('Node', {
  id: g.id()
})

const name = g.interface('Name', {
  name: g.string()
})

const test = g.type('Test', {}).implements([node, name])

const queryType = g.type('Query', {
  test: g.ref(() => test)
})

const resolvers: InferResolvers<{ Query: typeof queryType, Test: typeof test }, {}> = {
  Query: {
    test: (parent, args, context, info) => {
      return {
        id: '123',
        name: 'Test'
      }
    }
  },
  Test: {
    id: (parent, args, context, info) => {
      return parent.id
    },
    name: (parent, args, context, info) => {
      return parent.name
    }
  }
}

const schema = buildSchema({ g, resolvers })
const yoga = createYoga({ schema })
const server = createServer(yoga)
server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})
