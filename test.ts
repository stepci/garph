import { g, Infer, InferArgs, InferResolvers } from './index'

const w = g.type('Blog', {
  title: g.string(),
  author: g.ref<typeof u>('User').args({
    fullName: g.boolean().optional()
  }),
})

const u = g.type('User', {
  username: g.string(),
  // blog: g.ref<typeof w>('Blog')
})

const s = g.scalar<Date, number>('Date', {
  parseValue: (value) => new Date(value),
  serialize: (value) => value.getTime()
})

type xType = Infer<typeof w>
type xArgs = InferArgs<typeof w>
