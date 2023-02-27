import { g, Infer, InferResolvers, convertSchema } from './../index'
import { createYoga } from 'graphql-yoga'

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

const schema = convertSchema({
  types: [queryType],
  resolvers
})

const yoga = createYoga({ schema })
Bun.serve({ fetch: yoga, port: 4000 })
