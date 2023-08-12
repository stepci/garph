# Relay

GraphQL Relay is a set of conventions and specifications for building GraphQL APIs that follow best practices for implementing pagination, node cursors, and connection types. These conventions were developed by Facebook to address common challenges in building complex, large-scale GraphQL APIs.

Garph ships with Relay primitives, which allow you to faster develop Relay-compatible GraphQL APIs.

```ts
import { g, InferResolvers, buildSchema } from 'garph'

const user = g.node('UserNode', {
  name: g.string().description('User name'),
})

const userEdge = g.edge('UserEdge', g.ref(user))
const userConnection = g.connection('UserConnection', g.ref(userEdge))

const queryType = g.type('Query', {
  users: g.ref(userConnection).args({ ...g.pageInfoArgs })
})

const resolvers: InferResolvers<{ Query: typeof queryType }, {}> = {
  Query: {
    users: (parent, args, context, info) => {
      return {
        edges: [
          {
            node: {
              id: '1',
              name: 'John',
            },
            cursor: '1',
          },
        ],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: '1',
          endCursor: '1',
        }
      }
    }
  }
}

const schema = buildSchema({ g, resolvers })
```
