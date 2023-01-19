import { z, Infer } from './z'

const x = z.object({
  name: z.boolean().array().optional()
})

type u = Infer<typeof x>
