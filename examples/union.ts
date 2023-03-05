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
  greet: g.string()
    .args({
      name: g.string().optional().default('Max'),
    })
    .description('Greets a person')
})

const resolvers: InferResolvers<{ Query: typeof queryType }, {}> = {
  Query: {
    greet: (parent, args, context, info) => `Hello, ${args.name}`
  }
}

const schema = buildSchema({ g, resolvers })
const yoga = createYoga({ schema })
const server = createServer(yoga)
server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})
