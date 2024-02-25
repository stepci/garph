import { g, InferResolvers, buildSchema, Infer } from './../src/index'
import { createYoga } from 'graphql-yoga'
import { createServer } from 'http'

const queryType = g.type('Query', {
  greet: g.string()
})

const subscriptionType = g.type('Subscription', {
  counter: g.int(),
  winner: g.string()
})

const resolvers: InferResolvers<{ Subscription: typeof subscriptionType }, {}> = {
  Subscription: {
    counter: {
      subscribe: async function* (parent, args, context, info) {
        for (let i = 100; i >= 0; i--) {
          await new Promise((resolve) => setTimeout(resolve, 1000))
          yield { counter: i }
        }
      }
    },
    winner: {
      subscribe: async function* (parent, args, context, info) {
        for (let i = 100; i >= 0; i--) {
          await new Promise((resolve) => setTimeout(resolve, 1000))
          yield { winner: `User ${i}` }
        }
      }
    }
  }
}

const schema = buildSchema({ g, resolvers })
const yoga = createYoga({ schema })
const server = createServer(yoga)
server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})
