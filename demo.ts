import { convertSchema } from './converter'
import { g, InferResolvers, Infer } from './index'
import { createYoga } from 'graphql-yoga'

type Blog = {
  title: string
  author: string
}

const blogType = g.type('Blog', {
  title: g.string(),
  author: g.ref<Blog>('User')
})

const userType = g.type('User', {
  age: g.int(),
  blog: blogType.description('The blog of the user')
})

const queryType = g.type('Query', {
  // Edge-case: Schema must contain uniquely named types but contains multiple types named "User".
  greet: g.string().args({
    name: g.string().required(),
  })
})

const resolvers: InferResolvers<{ Query: typeof queryType}, {}> = {
  Query: {
    greet: (parent, args) => 'A'
  }
}

const schema = convertSchema({
  types: [userType, blogType, queryType],
  resolvers
})

const yoga = createYoga({ schema })
Bun.serve(yoga)
