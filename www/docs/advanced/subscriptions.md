# Subscriptions

GraphQL subscriptions allow clients to subscribe to certain events on the server and receive updates as they occur. They are particularly useful for applications where real-time updates are important and where it would be inefficient or impractical to continuously poll the server for updates.

In the following example we will add a subscription called "counter" that returns a counter, which counts from 100 to 0 once subscribed

You can execute the following query in GraphQL playground to subscribe to the updates from the counter:

```graphql
subscription {
  counter
}
```

```ts
import { g, InferResolvers, buildSchema, Infer } from 'garph'

const queryType = g.type('Query', {
  greet: g.string()
})

const subscriptionType = g.type('Subscription', {
  counter: g.int()
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
    }
  }
}

const schema = buildSchema({ g, resolvers })
```
