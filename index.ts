import { z, Infer } from './z'

const x = z.object({
  name: z.string().description('d').optional()
})

type y = Infer<typeof x>
