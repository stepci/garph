# Resolvers

GraphQL resolvers are functions for fetching the data for a particular field in a GraphQL query or mutation. When a client makes a GraphQL request, the GraphQL server invokes the corresponding resolver functions to retrieve the data for the requested fields.

## Parameters

Resolver functions receive four arguments:

- `parent`
  The object that contains the result returned by the parent resolver. This argument is not used for root-level resolvers.
- `args`
  The arguments provided to the field in the GraphQL query or mutation.
- `context`
  An object containing any data that is shared across all resolvers for a single request. This can include information such as the currently authenticated user or a database connection.
- `info`
  An object that contains information about the execution state of the query, such as the name of the field being resolved and the selection set.

## Specifying resolver functions

```ts{13-17} [Example]
import { g, InferResolvers, buildSchema } from 'garph'
import { createYoga } from 'graphql-yoga'
import { createServer } from 'http'

const queryType = g.type('Query', {
  greet: g.string()
    .args({
      name: g.string().optional().default('Max')
    })
    .description('Greets a person')
})

const resolvers: InferResolvers<{ Query: typeof queryType }, { context: any, info: any }> = {
  Query: {
    greet: (parent, args, context, info) => `Hello, ${args.name}`
  }
}

const schema = buildSchema({ g, resolvers })
```

## Type-safety

Resolver types can be inferred into TypeScript using the [`InferResolvers`](/api/index.md#inferresolvers) utility

[→ Inferring Resolvers](/docs/guide/inferring-types.md#inferring-resolvers)
