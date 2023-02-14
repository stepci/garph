import { convertSchema } from './converter'
import { g, InferResolvers, Infer } from './index'
import { createYoga } from 'graphql-yoga'

const user = g.type('User', {
  id: g.id().required(),
  name: g.string().required(),
  age: g.int()
})

const queryType = g.type('Query', {
  // Edge-case: Schema must contain uniquely named types but contains multiple types named "User".
  greet: g.string().args({
    name: g.string().required()
  })
})

const resolvers: InferResolvers<{ Query: typeof queryType }, { context: any, info: any }> = {
  Query: {
    greet (parent, args, context, info) {
      return `Hello, ${args.name}!`
    }
  }
}

const schema = convertSchema({
  types: [queryType],
  resolvers
})

const yoga = createYoga({ schema })
Bun.serve(yoga)
