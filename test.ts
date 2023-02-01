import { z, Infer } from './z'

const x = z.object({
  name: z.string().description('d').optional()
})

const o = z.object({
  last: z.string().description('d').optional()
})

const w = z.union(x, o)
type u = Infer<typeof w>

console.log(w)
