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
  friends: g.ref('User').description('The friends of the user').list().deprecated('wow'),
})

const queryType = g.type('Query', {
  greet: g.string()
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
}, { defaultNullability: false })

const yoga = createYoga({ schema })
Bun.serve(yoga)
