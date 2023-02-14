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
  getUser:
    g.boolean().args({
      id: g.id().required()
    })
    .list()
})

type x = Infer<typeof queryType>

const schema = convertSchema({
  types: [queryType, user]
}, { defaultRequired: true })

const yoga = createYoga({ schema })
Bun.serve(yoga)
