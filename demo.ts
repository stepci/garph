import { convertSchema } from './converter'
import { g, InferResolvers, Infer } from './index'
import { createYoga } from 'graphql-yoga'

type Blog = {
  title: string
  author: string
}

const blogType = g.type('Blog', {
  title: g.string(),
  author: g.ref<Blog>('User').description('The author of the blog')
}).description('The blog of the user')

const userType = g.type('User', {
  age: g.int(),
  friends: g.ref('User').description('The friends of the user'),
})

const queryType = g.type('Query', {
  // Edge-case: Schema must contain uniquely named types but contains multiple types named "User".
  greet: g.ref('User').deprecated('wow').args({
    id: g.string().default('ABC'),
  })
})

const union = g.unionType('Union', [userType, blogType])

const resolvers: InferResolvers<{ Query: typeof queryType}, {}> = {
  Query: {
    greet: (parent, args) => 'A'
  }
}

const schema = convertSchema({
  types: [userType, blogType, queryType, union],
  resolvers
})

const yoga = createYoga({ schema })
Bun.serve(yoga)
