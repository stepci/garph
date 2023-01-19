import { z, Infer } from './z'

const x = z.object({
  name: z.array(z.array(z.string()))
})

type u = Infer<typeof x>
