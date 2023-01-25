import { z, Infer } from './z'

const x = z.object({
  name: z.string().description('d').optional().array()
})

type y = Infer<typeof x>
console.log(x)
