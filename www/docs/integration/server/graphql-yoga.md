# GraphQL Yoga

GraphQL Yoga is a batteries-included cross-platform, spec-compliant GraphQL server, that runs anywhere. Yoga is focused on easy setup, performance and great developer experience.

[→ Website](https://the-guild.dev/graphql/yoga-server)

[→ Repository](https://github.com/dotansimha/graphql-yoga)

[→ Docs](https://the-guild.dev/graphql/yoga-server/docs)

## Installation

::: code-group
```sh [npm]
$ npm i graphql-yoga
```

```sh [pnpm]
$ pnpm add graphql-yoga
```

```sh [yarn]
$ yarn add graphql-yoga
```

```sh [bun]
$ bun i graphql-yoga
```
:::

## Serving Garph schema

```ts
import { g, InferResolvers, buildSchema } from 'garph'
import { createYoga, YogaInitialContext } from 'graphql-yoga'

const queryType = g.type('Query', {
  greet: g.string()
})

const resolvers: InferResolvers<{ Query: typeof queryType }, { context: YogaInitialContext }> = {
  Query: {
    greet: () => `Hello, World!`
  }
}

const schema = buildSchema({ g, resolvers })
const yoga = createYoga({ schema })
```

## Types

- Context: `YogaInitialContext`
