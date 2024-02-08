import { g, InferResolvers, buildSchema, Infer } from './../src/index'
import { createYoga } from 'graphql-yoga'
import { createServer } from 'http'

const personType = g.type('Person', {
  name: g.string(),
  id: g.internal<number>()
})

const queryType = g.type('Query', {
  greet: g.ref(personType)
    .args({
      name: g.string().optional().default('Max'),
    })
    .description('Greets a person')
})

type QueryType = Infer<typeof queryType>

const resolvers: InferResolvers<{ Query: typeof queryType }, {}> = {
  Query: {
    greet: (parent, args, context, info) => {
      return {
        name: `Hello, ${args.name}`,
        id: 123
      }
    }
  }
}

const schema = buildSchema({ g, resolvers })
const yoga = createYoga({ schema })
const server = createServer(yoga)
server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})
