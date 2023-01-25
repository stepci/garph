# minizod

Mini implementation of zod-like library, intended for learning purposes

Example:

```ts
import { z, Infer } from './z'

const x = z.object({
  name: z.string().description('d').optional().array()
})

type y = Infer<typeof x>
```

Inferred Type:

![](https://i.imgur.com/qTmVime.png)
