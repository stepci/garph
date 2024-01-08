# Loaders

In GraphQL, Data Loaders are used to batch and load data from a data source. They help address the N+1 problem, which is a common performance issue in GraphQL APIs.

The N+1 problem occurs when a GraphQL query involves fetching a list of entities (e.g., users) along with a related field (e.g., their posts), and for each entity, an additional query is made to fetch the related data. This leads to multiple (database) queries, causing inefficiencies and potential performance bottlenecks.

In Garph, you can add loaders to fields by making a field resolver return an object with `load` or `loadBatch` (no cache) function, which accepts a batch of queries that you can use to map to your data

## Parameters

Loader functions receive one argument:

- `queries`
  Array of query objects:
    - `parent`
      The object that contains the result returned by the parent resolver. This argument is not used for root-level resolvers.
    - `args`
      The arguments provided to the field in the GraphQL query or mutation.
    - `context`
      An object containing any data that is shared across all resolvers for a single request. This can include information such as the currently authenticated user or a database connection.
    - `info`
      An object that contains information about the execution state of the query, such as the name of the field being resolved and the selection set.

## Specifying resolver functions

```ts
import { g, InferResolvers, buildSchema, Infer } from 'garph'

const Dog = g.type('Dog', {
  name: g.string(),
  owner: g.string().omitResolver()
})

const queryType = g.type('Query', {
  dogs: g.ref(() => Dog).list()
})

const owners = {
  Apollo: 'Mish',
  Buddy: 'Sebastian'
}

type resolverTypes = InferResolvers<{ Query: typeof queryType, Dog: typeof Dog }, {}>

const resolvers: resolverTypes = {
  Query: {
    dogs: (parent, args, context, info) => {
      return [
        {
          name: 'Apollo',
        },
        {
          name: 'Buddy',
        }
      ]
    }
  },
  Dog: {
    owner: {
      load (queries) {
        // Promise with timeout added to demonstrate caching
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(queries.map(q => owners[q.parent.name]))
          }, 1000)
        })
      }
    }
  }
}

const schema = buildSchema({ g, resolvers })
```
