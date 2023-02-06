import { z, Infer, InferArgs } from './z'

// const x = z.object({
//   name: z.string().description('d').args(a => ({
//     fd: a.string()
//   }))
// })

const x = z.object({
  name: z.string().description('d')
  .args({
    fd: z.int().array()
  })
  .resolve((d) => {

  })
})

type xType = Infer<typeof x>

type xArgs = InferArgs<typeof x>

console.log(x)
