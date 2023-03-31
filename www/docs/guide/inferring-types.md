# Inferring Types

## Inferring Garph Types

Garph types can be inferred into TypeScript using the [`Infer`](/api/index.md#infer) utility

```ts
import { g, Infer } from 'garph'

const nameType = g.type('Name', {
  greet: g.string()
})

type NameType = Infer<typeof nameType>
```

Inferred type:

```ts
type NameType = {
  greet: string
}
```

## Inferring Args

Arguments on Garph types can be inferred into TypeScript using the [`InferArgs`](/api/index.md#inferargs) utility

```ts
import { g, InferArgs } from 'garph'

const nameType = g.type('Name', {
  greet: g.string().args({ name: g.string().optional() })
})

type NameType = InferArgs<typeof nameType>
```

Inferred type:

```ts
type NameType = {
  greet: {
    name: string | null | undefined
  }
}
```

## Inferring Resolvers

Resolver types can be inferred into TypeScript using the [`InferResolvers`](/api/index.md#inferresolvers) utility

```ts
import { g, InferResolvers } from 'garph'

const queryType = g.type('Query', {
  greet: g.string()
    .args({
      name: g.string().optional().default('Max'),
    })
    .description('Greets a person')
})

const resolvers: InferResolvers<{ Query: typeof queryType }, { context: any, info: any }> = {
  Query: {
    greet: (parent, args, context, info) => `Hello, ${args.name}`
  }
}
```

> You can specify the context and info types as a second parameter (see above)

Inferred type:

```ts
{
  Query: {
    greet?: (parent: any, args: {
      name: string | null | undefined
    }, context: any, info: any) => string | Promise<string>
  }
}
```

### Strict Mode

Using [`InferResolversStrict`](/api/index.md#inferresolversstrict) you can infer resolver types in strict mode, which requires all fields to be specified in the resolver configuration
