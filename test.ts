import { z, Infer, InferArgs } from './z'

// const x = z.object({
//   name: z.string().description('d').args(a => ({
//     fd: a.string()
//   }))
// })

const w = z.type('W', {
  name: z.string().optional()
})

const x = z.type('Z', {
  name: z.string()
  .args({
    fd: z.enum('d', ['a', 'b', 'c']),
    o: z.field(w)
  })
  .resolve((parent, args) => {
    console.log(args.fd)
  })
})

const y = z.type('X', {
  x: z.field(x).optional()
})

type xType = Infer<typeof x>

type xArgs = InferArgs<typeof x>

type yType = Infer<typeof y>
