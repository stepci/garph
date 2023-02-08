import { g, Infer, InferArgs, InferResolvers, InferResolversStrict } from './z'

const w = g.type('Query', {
  name: g.string(),
  age: g.int()
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
  date: g.field(s)
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
