import { convertSchema } from './converter'
import { g, InferResolvers, Infer } from './index'
import { createYoga } from 'graphql-yoga'

const blogType = g.type('Blog', {
  title: g.string().required().list(),
  // author: g.ref<typeof userType>('User')
})

const userType = g.type('User', {
  name: g.string().args({
    first: g.int().list().description('First name'),
  }),
  age: g.int(),
  blog: g.ref<typeof blogType>('Blog')
})

const queryType = g.type('Query', {
  // Edge-case: Schema must contain uniquely named types but contains multiple types named "User".
  greet: g.string()
})

const resolvers: InferResolvers<{ Query: typeof queryType}, {}> = {
  Query: {
    greet: () => 'Hello world!'
  }
}

const schema = convertSchema({
  types: [queryType, blogType, userType],
  resolvers
})

const yoga = createYoga({ schema })
Bun.serve(yoga)
