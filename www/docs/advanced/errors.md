# Errors

GraphQL errors are used to indicate that an error occurred during the execution of a GraphQL query or mutation. These errors can be caused by a variety of reasons, such as invalid input data, server-side issues, or authentication errors.

## Exposing expected errors

Sometimes it is feasible to throw errors within your GraphQL resolvers whose message should be sent to clients instead of being masked. This can be achieved by throwing a `GraphQLError` instead of a "normal" [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error).

```ts
import { g, InferResolvers, buildSchema } from 'garph'
import { GraphQLError } from 'graphql'

const queryType = g.type('Query', {
  error: g.string(),
})

const resolvers: InferResolvers<{ Query: typeof queryType }, {}> = {
  Query: {
    error: () => {
      throw new GraphQLError('Expected error')
    }
  }
}

const schema = buildSchema({ g, resolvers })
```

## Error codes and other extensions

Sometimes it is useful to enrich errors with additional information, such as an error code that can be interpreted by the client. Error extensions can be passed as the second parameter to the `GraphQLError` constructor.

```ts
import { g, InferResolvers, buildSchema } from 'garph'
import { GraphQLError } from 'graphql'

const queryType = g.type('Query', {
  error: g.string(),
})

const resolvers: InferResolvers<{ Query: typeof queryType }, {}> = {
  Query: {
    error: () => {
      throw new GraphQLError('Expected error with extensions', { extensions: { code: 'EXPECTED_ERROR' } })
    }
  }
}

const schema = buildSchema({ g, resolvers })
```
