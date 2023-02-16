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

const scalarType = g.scalarType<Date, number>('SC', {
  serialize: (value) => value.getTime(),
  parseValue: (value) => new Date(value)
}).description('The query type')

const inputType = g.inputType('UserInput', {
  name: g.string(),
  age: g.int(),
})

const queryType = g.type('Query', {
  greet: g.ref(scalarType)
})

const union = g.unionType('Union', [userType, blogType])

const resolvers: InferResolvers<{ Query: typeof queryType}, {}> = {
  Query: {
    greet: (parent, args) => new Date()
  }
}

const schema = convertSchema({
  types: [inputType, queryType, userType, blogType, union, scalarType],
  resolvers
}, { defaultNullability: false })

const yoga = createYoga({ schema })
Bun.serve(yoga)
