import { z, Infer } from './z'

const x = z.object({
  name: z.boolean().array().optional(),
  test: z.object({
    name: z.object({
      last: z.string()
    })
  })
})

type u = Infer<typeof x>
