# GQty

GQty is a fundamentally new approach to a GraphQL client. It makes using your API enjoyable, by generating queries at runtime based upon the data your app consumes.

[→ Website](https://gqty.dev)

[→ Repository](https://github.com/stepci/garph-gqty)

[→ Docs](https://gqty.dev/getting-started)

## Installation

::: code-group
```sh [npm]
$ npm i @garph/gqty
```

```sh [pnpm]
$ pnpm add @garph/gqty
```

```sh [yarn]
$ yarn add @garph/gqty
```

```sh [bun]
$ bun i @garph/gqty
```
:::

## Initialization

Example Schema:

::: code-group
```ts [schema.ts]
import { g, buildSchema } from 'garph'

export const queryType = g.type('Query', {
  greet: g.string()
    .args({
      name: g.string().optional().default('Max'),
    })
    .description('Greets a person')
})

const schema = buildSchema({ g })
```
:::

Initializing the client:

::: code-group
```ts [client.ts]
import { InferClient, createClient } from '@garph/gqty'
import { createScalarsEnumsHash, createGeneratedSchema } from '@garph/gqty/dist/utils'
import { schema, queryType } from './schema.ts'

type ClientTypes = InferClient<{ query: typeof queryType }>

export const { useQuery, ... } = createClient<ClientTypes>({
  generatedSchema: createGeneratedSchema(schema),
  scalarsEnumsHash: createScalarsEnumsHash(schema),
  url: 'http://localhost:4000/graphql'
})

// Needed for the babel plugin
export { schema as compiledSchema }
```
:::

Adding subscriptions support

```
npm i graphql-sse
```

::: code-group
```ts [client.ts]
import { createClient as createSubscriptionsClient } from 'graphql-sse'

export const { useSubscription, ... } = createClient<ClientTypes>({
  generatedSchema: createGeneratedSchema(schema),
  scalarsEnumsHash: createScalarsEnumsHash(schema),
  url: 'http://localhost:4000/graphql',
  subscriptionClient: createSubscriptionsClient({
    url: 'http://localhost:4000/api/graphql/stream'
  })
})
```
:::

## Babel Plugin

In production, you might want to use the babel plugin in order to replace the runtime dependencies (such as `generatedSchema`, `scalarsEnumsHash`) in your client config with statically-generated artefacts.

::: code-group
```json [.babelrc]
{
  "plugins": [["@garph/gqty/dist/plugin", {
    "clientConfig": "./utils/client.ts"
  }]]
}
```
:::

## Usage

### Core Client

Example:

```ts
import { resolved, query } from './client'

resolved(() => {
  return query.greet({ name: 'Mish' })
})
.then(data => {
  console.log(data)
})
```

[→ GQty Docs: Core Client](https://gqty.dev/guides/core/resolve)

### React

Example:

```tsx
import { useQuery } from './client'

export default function Example() {
  const query = useQuery()
  return <p>{ query.greet({ name: 'Mish' }) }</p>
}
```

[→ GQty Docs: Usage with React](https://gqty.dev/guides/react/read)
