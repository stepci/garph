import { convertSchema } from './converter'
import { g, InferResolvers, Infer } from './index'
import { createYoga } from 'graphql-yoga'

const user = g.type('User', {
  id: g.id(),
  name: g.string()
})

const queryType = g.type('Query', {
  test: g.id()
})
.description('The root query type.')

const schema = convertSchema({
  types: [queryType, user]
})

const yoga = createYoga({ schema })
Bun.serve(yoga)
