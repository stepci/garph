# Defer and Stream

::: warning
Stream and Defer are experimental features. There is no yet a stable specification for the incremental delivery protocol.
:::

Stream and defer are directives that allow you to improve latency for clients by sending the most important data as soon as it's ready.

Install a yoga plugin to enable `@stream` and `@defer` directives (requires yoga v4 and higer)

::: code-group
```sh [npm]
$ npm i @graphql-yoga/plugin-defer-stream
```

```sh [pnpm]
$ pnpm add @graphql-yoga/plugin-defer-stream
```

```sh [yarn]
$ yarn add @graphql-yoga/plugin-defer-stream
```

```sh [bun]
$ bun i @graphql-yoga/plugin-defer-stream
```
:::

Example Garph schema with streamed and slow fields:

```ts
import { g, InferResolvers, buildSchema } from './../src/index'
import { createYoga } from 'graphql-yoga'
import { useDeferStream } from '@graphql-yoga/plugin-defer-stream'
import { createServer } from 'node:http'

const queryType = g.type('Query', {
  alphabet: g.string().list().description(`This field can be @stream'ed`),
  fastField: g.string().description('A field that resolves fast.'),
  slowField: g
    .string()
    .optional()
    .description(
      'A field that resolves slowly. Maybe you want to @defer this field ;)'
    )
    .args({
      waitFor: g.int().default(5000),
    })
})

const wait = (time: number) => new Promise(resolve => setTimeout(resolve, time))

const resolvers: InferResolvers<{ Query: typeof queryType }, {}> = {
  Query: {
    async *alphabet() {
      for (const character of ['a', 'b', 'c', 'd', 'e', 'f', 'g']) {
        yield character
        await wait(1000)
      }
    },
    fastField: async () => {
      await wait(100)
      return 'I am speed'
    },
    slowField: async (_, { waitFor }) => {
      await wait(waitFor)
      return 'I am slow'
    }
  }
}

const schema = buildSchema({ g, resolvers })
const yoga = createYoga({
  schema,
  plugins: [useDeferStream()]
})

const server = createServer(yoga)

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})
```

Start the server:

```
npx ts-node server.ts
```

### Streamed fields

The `@stream` directive allows you to stream the individual items of a field of the list type as the items are available.

Visit http://localhost:4000/graphql and paste the following operation into the left panel:

```graphql
query StreamAlphabet {
  alphabet @stream
}
```

Then press the Play (Execute Query) button.

Alternatively, you can also send the stream operation via curl:

```sh
curl -g -X POST \
  -H "accept:multipart/mixed" \
  -H "content-type: application/json" \
  -d '{"query":"query StreamAlphabet { alphabet @stream }"}' \
  http://localhost:4000/graphql
```

### Deferred fields

The `@defer` directive allows you to post-pone the delivery of one or more (slow) fields grouped in an inlined or spread fragment.

Visit http://localhost:4000/graphql and paste the following operation into the left panel:

```graphql
query SlowAndFastFieldWithDefer {
  ... on Query @defer {
    slowField
  }
  fastField
}
```

Then press the Play (Execute Query) button.

Alternatively, you can also send the defer operation via curl:

```sh
curl -g -X POST \
  -H "accept:multipart/mixed" \
  -H "content-type: application/json" \
  -d '{"query":"query SlowAndFastFieldWithDefer { ... on Query @defer { slowField } fastField }"}' \
  http://localhost:4000/graphql
```
