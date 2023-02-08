import { z, Infer, InferArgs, InferResolvers, InferResolversStrict } from './z'

const w = z.type('Query', {
  name: z.string(),
  age: z.int()
})

const x = z.type('Z', {
  name: z.string()
    .args({
      alphabet: z.enum('d', ['a', 'b', 'c'])
    })
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
