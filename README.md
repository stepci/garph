# garph

https://user-images.githubusercontent.com/10400064/222474710-bc263775-06b8-4a78-8099-676a9ad3c7a4.mov

> **Warning**:
> Garph is currently in Alpha. We would love to hear your Feedback on our [Discord](https://discord.gg/KqJJzJ3BTu)

> **Note**:
> tRPC-style client for Garph has arrived! See [garph-gqty](https://github.com/stepci/garph-gqty) for more 🚀

Garph is a GraphQL schema-builder for TypeScript, that aims to deliver [tRPC](https://github.com/trpc/trpc)-like Developer-Experience. On top of that, Garph provides a GraphQL compability layer and type-safety primitives for any TypeScript project

Example of a GraphQL API built with Garph (served by Yoga):

```ts
import { g, InferResolvers, buildSchema } from 'garph'
import { createYoga } from 'graphql-yoga'
import { createServer } from 'http'

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

const schema = buildSchema({ g, resolvers })
const yoga = createYoga({ schema })
const server = createServer(yoga)
server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})
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

Plain:

```ts
g.enumType('Name', ['A', 'B', 'C'] as const)
```

(We need `as const` for proper type inference)

From TypeScript Enum:

```ts
enum Fruits {
  Apples,
  Oranges
}

g.enumType('Name', Fruits)
```

#### Union

```ts
g.unionType('Name', { a, b })
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

g.ref(() => name)
```

See [Circular References](#circular-references) for handling circular references

#### Interface

```ts
g.interface('Name', {
  greet: g.string()
})
```

Implementing an interface

```ts
const test = g.type('Test', {}).implements(interface)
```

Or a set of interfaces:

```ts
const test = g.type('Test', {}).implements([interface, interface])
```

> **Note**: Inherited fields will be added to the schema automatically, you don't need to re-specify them

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
const test = g.type('Test', {}).implements(interface)
```

Or array of interfaces:

```ts
const test = g.type('Test', {}).implements([interface, interface])
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
      name: string
    }, context: any, info: any) => string | Promise<string>
  }
}
```

#### Circular References

With Garph, circular references work just as you expect them to

Example GraphQL Schema:

```gql
type User {
  name: String!
  age: Int!
  friends(includeLastName: Boolean): [User!]!
}
```

Converted to Garph schema:

```ts
const userType = g.type('User', {
  name: g.string(),
  age: g.int(),
  friends: g.ref(() => userType).list()
    .args({
      includeLastName: g.boolean().optional()
    })
})
```

Inferred type:

```ts
type UserType = {
  name: string;
  age: number;
  friends: ...;
}
```

#### Converting to GraphQL schema

```ts
import { byuldSchema } from 'garph'

buildSchema({ resolvers })
```

Or you can use `convertSchema` method directly

```ts
const schema = convertSchema({
  types: [queryType],
  resolvers
}, { defaultNullability: false })
```

## Examples

Example projects can be found under [`examples/`](examples/)

## Feedback

We would love to hear your Feedback on our [Discord](https://discord.gg/KqJJzJ3BTu) community
