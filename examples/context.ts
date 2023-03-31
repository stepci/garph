import { g, InferResolvers, buildSchema } from './../src/index'
import { createYoga, YogaInitialContext } from 'graphql-yoga'
import { createServer } from 'http'

const queryType = g.type('Query', {
  context: g.string()
})

const context = () => {
  return {
    hello: 'world'
  }
}

const resolvers: InferResolvers<{ Query: typeof queryType }, { context: YogaInitialContext & ReturnType<typeof context> }> = {
  Query: {
    context: (parent, args, context, info) => `Context: ${context.hello}`
  }
}

const schema = buildSchema({ g, resolvers })
const yoga = createYoga({ schema, context })
const server = createServer(yoga)
server.listen(4001, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})
