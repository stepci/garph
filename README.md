# garph

https://user-images.githubusercontent.com/10400064/220190966-705e4a4e-56ea-491a-8fa5-f2c3d243ab91.mov

> **Note**: Garph is currently in Alpha. We would love to hear your Feedback on our Discord community

Garph is a GraphQL schema-builder for TypeScript, that aims to deliver tRPC-like Developer-Experience. On top of that, Garph provides a GraphQL compability layer and type-safety primitives for any TypeScript project

Example of a GraphQL API built with Garph (served by Yoga and Bun):

```ts
import { g, InferResolvers, convertSchema } from 'garph'
import { createYoga } from 'graphql-yoga'

const queryType = g.type('Query', {
  greet: g.string()
    .args({
      name: g.string().optional().default('Max')
    })
    .description('Greets a person')
})

const resolvers: InferResolvers<{ Query: typeof queryType }, {}> = {
  Query: {
    greet: (parent, args, context, info) => `Hello, ${args.name}`
  }
}

const schema = convertSchema({
  types: [queryType],
  resolvers
})

const yoga = createYoga({ schema })
Bun.serve(yoga)
```

Produces the following GraphQL schema:

```gql
type Query {
  greet(name: String = "Max"): String!
}
```

### Get started

```
npm i garph
```

```ts
import { g } from 'garph'
```

## Reference

### Types

#### Object Type

```ts
g.type('Name', {
  greet: g.string()
})
```

#### String

```ts
g.string()
```

#### Int

```ts
g.int()
```

#### Float

```ts
g.float()
```

#### Boolean

```ts
g.boolean()
```

#### ID

```ts
g.id()
```

#### Enum

```ts
g.enumType('Name', ['A', 'B', 'C'])
```

#### Union

```ts
g.unionType('Name', [g.string(), g.int()])
```

#### Ref

Reference another type by name or pass-by-reference

```ts
const name = g.type('Name', {
  greet: g.string()
})

g.ref(name)
```

Alternative:

```ts
const name = g.type('Name', {
  greet: g.string()
})

g.ref<typeof name>('Name')
```

See [Circular References](#circular-references) for handling circular references

#### Interface

```ts
g.interface('Name', {
  greet: g.string()
})
```

#### Input

```ts
g.inputType('Name', {
  greet: g.string()
})
```

#### Scalar

```ts
g.scalarType<Date, number>('Name', {
  serialize: (value) => value.getTime(),
  parseValue: (value) => new Date(value)
})
```

#### Directive

Currently not supported

#### Fragment

Currently not supported

### Modifiers

Modifiers can be chained together to produce desired type

#### Implements

```ts
g.type('Name', {
  greet: g.string()
})
.implements('Name')
```

Or array of interfaces

```ts
g.type('Name', {
  greet: g.string()
})
.implements(['Name', 'User'])
```

#### List

```ts
g.string().list()
```

#### Optional (nullable)

```ts
g.string().optional()
```

#### Description

```ts
g.string().description("Description")
```

#### Args

```ts
g.string().args({
  name: g.string()
})
```

#### Required

```ts
g.string().required()
```

#### Default

> **Note**: Not type-safe at the moment

```ts
g.string().default("Default string")
```

#### Deprecated

```ts
g.string().deprecated("Deprecation reason")
```

### Extras

#### Inferring Types

Types can be inferred into TypeScript using the `Infer` utility

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

#### Inferring Args

Argument Types can be inferred into TypeScript using the `InferArgs` utility

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

#### Inferring Resolvers

Resolvers can be inferred into TypeScript using the `InferResolvers` utility

```ts
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

Inferred type:

```ts
{
  Query: {
    greet?: (parent: any, args: {
      test: readonly Date[]
    }, context: any, info: any) => string | Promise<string>
  }
}
```

#### Circular References

Due to some TypeScript limitations, if you want to handle circular references in a type-safe way, you'll have to point a reference to a shim-type, that mimicks your GraphQL Type

```ts
type User = {
  name: string
  age: number
  friends: User[]
}

const userType = g.type('User', {
  name: g.string(),
  age: g.int(),
  friends: g.ref<User>('User').list(),
})
```

Inferred type:

```ts
type UserType = {
  name: string
  age: number
  friends: readonly User[]
}
```

#### Converting to GraphQL schema

You can import `convertSchema` method to convert your types built with Garph into a functioning GraphQL schema

```ts
const schema = convertSchema({
  types: [queryType],
  resolvers
}, { defaultNullability: false })
```

## Examples

Example projects can be found under [`examples/`](examples/)

## Feedback

We would love to hear your Feedback on our Discord community
