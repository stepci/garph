# GQty

GQty is a fundamentally new approach to a GraphQL client. It makes using your API enjoyable, by generating queries at runtime based upon the data your app consumes.

[→ Website](https://gqty.dev)

[→ Repository](https://github.com/stepci/garph-gqty)

[→ Docs](https://gqty.dev/docs/getting-started)

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
import { g } from 'garph'

export const queryType = g.type('Query', {
  greet: g.string()
    .args({
      name: g.string().optional().default('Max'),
    })
    .description('Greets a person')
})
```
:::

Initializing the client:

::: code-group
```ts [client.ts]
import { queryType } from './schema.ts'
import { InferClient, createClient } from '@garph/gqty'

type ClientTypes = InferClient<{ query: typeof queryType }>

export const { useQuery, ... } = createClient<ClientTypes>({
  schema: g,
  url: 'http://localhost:4000/graphql'
})
```
:::

## Core Client

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

[→ GQty Docs: Core Client](https://gqty.dev/docs/client/fetching-data)

## React

Example:

```tsx
import { useQuery } from './client'

export default function Example() {
  const query = useQuery()
  return <p>{ query.greet({ name: 'Mish' }) }</p>
}
```

[→ GQty Docs: Usage with React](https://gqty.dev/docs/react/fetching-data)
