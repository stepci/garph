import { z, Infer, InferArgs, InferResolvers, InferResolversStrict } from './z'

const w = z.type('Query', {
  name: z.string(),
  age: z.int()
})

const x = z.type('Z', {
  name: z.string()
    .args({
      fd: z.enum('d', ['a', 'b', 'c']),
      input: z.field(w)
    })
})

type xType = Infer<typeof x>

type xArgs = InferArgs<typeof x>

type x = { Query: typeof w, X: typeof x }

const resolvers: InferResolvers<x, { context: string }> = {
  Query: {
    name: () => 'hello'
  },
  X: {
    name: (parent, args) => `Hello, ${args.input.name}`
  }
}

type QueryResolver = InferResolversStrict<{ Query: typeof x }, {}>['Query']['name']

const resolver: QueryResolver = (parent, args) => `Hello, ${args.input.name}`
