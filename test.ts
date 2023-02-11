import { g, Infer, InferArgs, InferResolvers } from './index'

type User = {
  username: string
  blogs: Blog[]
}

type Blog = {
  title: string
  authors: User[]
}

const w = g.type('Blog', {
  title: g.string(),
  authors: g.ref<typeof u>('User').list()
})

const u = g.type('User', {
  username: g.string(),
  blogs: g.ref<Blog>('Blog').list()
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
