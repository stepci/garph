import { z, Infer, InferArgs } from './z'

const w = z.type('W', {
  name: z.string().optional()
})

const x = z.type('Z', {
  name: z.string()
    .args({
      fd: z.enum('d', ['a', 'b', 'c']),
      input: z.field(w)
    })
    .resolve((_parent, args) => {
      console.log(args.input)
    })
})

const y = z.type('X', {
  x: z.field(x).optional()
})

type xType = Infer<typeof x>

type xArgs = InferArgs<typeof x>

type yType = Infer<typeof y>
