import { z, Infer } from './z'

const x = z.object({
  name: z.string().array()
})

type u = Infer<typeof x>
