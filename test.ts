import { z, Infer, InferArgs } from './z'

// const x = z.object({
//   name: z.string().description('d').args(a => ({
//     fd: a.string()
//   }))
// })

const x = z.object({
  name: z.string()
  .args({
    fd: z.enum(['a', 'b', 'c'])
  })
  .resolve((d) => {
    console.log(d.fd)
  })
})

const y = z.object({
  x: z.field(x).optional()
})

type xType = Infer<typeof y>

type xArgs = InferArgs<typeof x>

console.log(x)
