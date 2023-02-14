import { g, InferResolvers, Infer } from './index'

const userType = g.type('User', {
  username: g.string().list().optional(),
  age: g.int()
})

const queryType = g.type('Query', {
  user: g.ref(userType).args({
    includeX: g.boolean()
  })
})

type InferredUserType = Infer<typeof userType>
