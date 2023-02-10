import { g, Infer, InferArgs, InferResolvers } from './index'

const w = g.type('Query', {
  name: g.string().args({
    includeLastName: g.boolean()
  }),
  age: g.int()
})

const u = g.type('User', {
  username: g.field(w),
  // name: g.string().args({
  //   includeLastName: g.boolean()
  // })
})

const s = g.scalar<Date, number>('Date', {
  parseValue: (value) => new Date(value),
  serialize: (value) => value.getTime()
})

const x = g.type('Z', {
  name: g.string()
    .args({
      alphabet: g.enum('d', ['a', 'b', 'c'])
    }),
  user: g.union('User', [u, w])
})

type xType = Infer<typeof x>

type xArgs = InferArgs<typeof x>

type x = { Query: typeof w, X: typeof x }

const resolvers: InferResolvers<x, {}> = {
  Query: {
    name: () => 'hello',
    age: () => 10
  },
  X: {
    name: (parent, args) => {
      return args.alphabet
    }
  }
}

// const api = buildSchema([x, w], resolvers)
console.log(x)
