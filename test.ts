import { z, Infer } from './z'

const x = z.object({
  name: z.string().description('d').optional(),
  isCool: z.boolean()
})

const t = z.object({
  m: z.int().description('d')
})

const o = z.object({
  last: z.string().description('d'),
  mish: z.union(x, t).array().optional()
})

const w = z.union(x, o)
type u = Infer<typeof o>

console.log(w)
