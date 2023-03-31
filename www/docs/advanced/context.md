# Context

In GraphQL, a context is an object containing any data that is shared across all resolvers for a single request. This can include information such as the currently authenticated user or a database connection.

## Default context

The initial context refers to the context object that is created when the server receives a new request. This context object contains information that is common to all requests, such as the HTTP headers and the request method.

```ts
import { g, InferResolvers, buildSchema } from 'garph'
import { createYoga, YogaInitialContext } from 'graphql-yoga'

const queryType = g.type('Query', {
  context: g.string()
})

const resolvers: InferResolvers<{ Query: typeof queryType }, { context: YogaInitialContext }> = {
  Query: {
    context: (parent, args, context, info) => `Context: ${context}`
  }
}

const schema = buildSchema({ g, resolvers })
```

## Extending default context

A custom context can include any information that is relevant to the execution of the query, such as authentication credentials, database connections, and other context-specific data. By passing a custom context to the resolvers, the application can avoid passing the same information to every resolver function as arguments.

```ts
import { g, InferResolvers, buildSchema } from 'garph'
import { createYoga, YogaInitialContext } from 'graphql-yoga'

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
```
