import { g, InferResolvers, Infer, buildSchema } from './../src/index'
import { createYoga } from 'graphql-yoga'
import { createServer } from 'http'

const x = g.type('X', {
  a: g.string(),
})

const y = g.type('Y', {
  b: g.string(),
})

const union = g.unionType('Union', { x, y })
type Union = Infer<typeof union>

const queryType = g.type('Query', {
  greet: g.ref(() => union)
    .args({
      name: g.string().optional().default('Max'),
    })
    .description('Greets a person')
})

type Query = Infer<typeof queryType>

const resolvers: InferResolvers<{ Query: typeof queryType, Union: typeof union }, {}> = {
  Query: {
    greet: (parent, args, context, info) => {
      if (args.name === 'Max') {
        return { __typename: 'X', a: 'Hello Max' }
      } else {
        return { __typename: 'Y', b: 'Hello World' }
      }
    }
  },
  Union: {
    __resolveType: (parent, context, info) => {
      return parent.__typename
    }
  }
}

const schema = buildSchema({ g, resolvers })
const yoga = createYoga({ schema })
const server = createServer(yoga)
server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})
