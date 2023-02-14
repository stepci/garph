import { convertSchema } from './converter'
import { g, InferResolvers, Infer } from './index'
import { createYoga } from 'graphql-yoga'

const user = g.type('User', {
  id: g.id()
})

const queryType = g.type('Query', {
  test: g.id().args({
    includeX: g.boolean().optional().description('wows')
  }),
  user: user.optional()
})
.description('The root query type.')

const schema = convertSchema({
  types: [queryType]
})

const yoga = createYoga({ schema })
Bun.serve(yoga)
