# Pagination

GraphQL cursor-based pagination is a method of paginating data in a GraphQL API that allows clients to request data in chunks or pages, while maintaining a stable and consistent ordering of the results.

Garph creates a Relay-style paginated list when using `paginatedList` modifier and `g.pageInfoArgs` arg types.

```ts
import { g, InferResolvers, buildSchema } from 'garph'

const user = g.type('User', {
  id: g.string().description('User ID'),
  name: g.string().description('User name'),
})

const queryType = g.type('Query', {
  users: g.ref(user).paginatedList().args({ ...g.pageInfoArgs })
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
            cursor: '1'
          }
        ],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: '1',
          endCursor: '1'
        }
      }
    }
  }
}

const schema = buildSchema({ g, resolvers })
```
