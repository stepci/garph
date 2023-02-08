import { z, Infer, InferArgs, InferResolvers } from './z'

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
    .resolve((_parent, args) => {
      console.log(args.input)
      return ''
    })
})

const y = z.type('X', {
  x: z.field(x).optional()
})

type xType = Infer<typeof x>

type xArgs = InferArgs<typeof x>

type yType = Infer<typeof y>

type x = { Query: typeof w, X: typeof x, Y: typeof y }

const resolvers: InferResolvers<x> = {
  Query: {
    name: () => 'hello'
  },
  X: {
    name: (parent, args) => `Hello, ${args.input.name}`
  }
}
