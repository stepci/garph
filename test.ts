import { g, Infer, InferArgs, InferResolvers } from './index'

type User = {
  username: string
  blog: Blog
}

type Blog = {
  title: string
  author: User
}

const w = g.type('Blog', {
  title: g.string(),
  author: g.ref<typeof u>('User'),
})

const u = g.type('User', {
  username: g.string(),
  blog: g.ref<Blog>('Blog').optional().list()
})

const s = g.scalar<Date, number>('Date', {
  parseValue: (value) => new Date(value),
  serialize: (value) => value.getTime()
})

type xType = Infer<typeof w>

type xArgs = InferArgs<typeof w>

const resolvers: InferResolvers<{ user: typeof u }, { context: any, info: any }> = {
  user: {
    username: (parent, args, context, info) => {
      return parent.username
    }
  }
}
