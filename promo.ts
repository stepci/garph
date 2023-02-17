import { g, Infer, InferArgs, InferResolvers } from './index'

const queryType = g.type('Query', {
  greet: g.string().args({
    name: g.string().optional().default('Mish'),
  })
})

type query = Infer<typeof queryType>
type queryArgs = InferArgs<typeof queryType>

const resolvers: InferResolvers<{ Query: typeof queryType}, {}> = {
  Query: {
    greet: (parent, args, info, context) => `Hello, `
  }
}
