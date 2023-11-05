---
outline: [2, 3]
---

# Schemas

In GraphQL, a schema is a collection of types that define the structure of data that can be queried or mutated in a GraphQL API. The schema acts as a contract between the client and server, specifying what types of data can be queried, what types of mutations can be performed, and how the data will be structured and returned.

## Constructors

Create new Garph schema

```ts
import { GarphSchema } from 'garph'

const g = new GarphSchema()
```

Create new Garph schema with types

```ts
import { GarphSchema } from 'garph'

const g = new GarphSchema({ types: [type1, type2, type3] })
```

## Types

### Object Type

An object type is a type in GraphQL that represents an object with a set of named fields and their corresponding values. Object types are used to define the structure and shape of data that can be queried and retrieved from a GraphQL API. They can also be used as inputs for mutations.

```ts
g.type('User', {
  name: g.string()
})
```

GraphQL Type:

```graphql
type User {
  name: String!
}
```

### String

A string is a type in GraphQL that represents a sequence of characters, such as text or a message. It is used to represent textual data.

```ts
g.string()
```

GraphQL Type:

```graphql
String!
```

### Int

An integer is a type in GraphQL that represents a whole number without any decimal points. It is used to represent numeric data.

```ts
g.int()
```

GraphQL Type:

```graphql
Int!
```

### Float

A float is a type in GraphQL that represents a floating-point number with decimal points. It is used to represent numeric data that may have decimal points.

```ts
g.float()
```

GraphQL Type:

```graphql
Float!
```

### Boolean

A boolean is a type in GraphQL that represents a value of either true or false. It is used to represent logical data.

```ts
g.boolean()
```

GraphQL Type:

```graphql
Boolean!
```

### ID

An ID is a type in GraphQL that represents a unique identifier, typically used to identify a specific object or record in a database. It is a string that can be serialized and deserialized.

```ts
g.id()
```

GraphQL Type:

```graphql
ID!
```

### Enum

An enum is a type in GraphQL that represents a set of predefined values. It is used to restrict the possible values of a field or an argument to a specific set of values.

Plain:

```ts
g.enumType('Fruits', ['Apples', 'Oranges'] as const)
```

(We need `as const` for proper type inference)

From TypeScript Enum:

```ts
enum Fruits {
  Apples,
  Oranges
}

g.enumType('Fruits', Fruits)
```

GraphQL Type:

```graphql
enum Fruits {
  Apples
  Oranges
}
```

### Union

A union is a type in GraphQL that represents a set of types. It is used to represent a type that can be one of several possible types.

```ts
g.unionType('Name', { a, b })
```

GraphQL Type:

```graphql
union Name = A | B
```

### Ref

Reference:

```ts
const name = g.type('Name', {
  greet: g.ref(otherType)
})
```

Circular Reference:

```ts
const name = g.type('Name', {
  greet: g.ref(() => name)
})
```

### Interface

An interface is a type in GraphQL that defines a set of fields that can be implemented by other object types. It is used to define a common set of fields and their corresponding types that can be used by multiple object types.

```ts
g.interface('Name', {
  greet: g.string()
})
```

GraphQL Type:

```graphql
interface Name {
  greet: String!
}
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

### Input

An input type is a type in GraphQL that represents the input data for a mutation or a query argument. It is used to define the shape and structure of the data that can be passed as input to a GraphQL API.

```ts
g.inputType('Name', {
  greet: g.string()
})
```

GraphQL Type:

```graphql
input Name {
  greet: String!
}
```

### Scalar

Custom scalars can be useful for handling specific data types that are not natively supported by GraphQL or you want a version of an existing type that does some validation. For example, you might define a custom scalar for handling dates:

```ts
g.scalarType<Date, number>('Date', {
  serialize: (value) => value.getTime(),
  parseValue: (value) => new Date(value)
})
```

GraphQL Type:

```graphql
scalar Date
```

### Directive

A directive is a special kind of declaration in GraphQL that can be used to modify the behavior of a query or a schema. It is used to annotate parts of a query with metadata or to specify additional constraints on the execution of a query.

Currently not supported.

See: https://github.com/stepci/garph/issues/40

## Relay Types

### Node

```ts
g.node('User', {
  name: g.string()
})
```

GraphQL Type:

```graphql
type User {
  id: ID!
  name: String!
}
```

### Edge

```ts
g.edge('UserEdge', g.ref(userNode))
```

GraphQL Type:

```graphql
type UserEdge {
  cursor: String!
  node: User
}
```

### Connection

```ts
g.connection('UserConnection', g.ref(userEdge))
```

GraphQL Type:

```graphql
type UserConnection {
  edges: [UserEdge]
  pageInfo: PageInfo!
}
```

### PageInfo

```ts
g.pageInfoType
```

GraphQL Type:

```graphql
type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}
```

### PageInfoArgs

```
g.pageInfoArgs
```

GraphQL Type:

```graphql
(first: Int, last: Int, before: ID, after: ID)
```

## Modifiers

Modifiers can be chained together to produce desired type

### Args

Used to pass additional parameters to a query or a mutation. They can be used to filter, sort, or modify the data returned by a query

```ts
g.type('Query', {
  greet: g.string().args({ name: g.string() })
})
```

GraphQL Type:

```graphql
type Query {
  greet(name: String!): String!
}
```

### Implements

Define a set of interfaces that an object type implements

```ts
const test = g.type('Test', {}).implements(interface)
```

Or array of interfaces:

```ts
const test = g.type('Test', {}).implements([interface, interface])
```

GraphQL Type:

```graphql
type Test implements interface {
  ...
}
```

### Extend

Define a set of properties that extends an input, interface or object type

```ts
const name = {
  name: g.string()
}

const test = g.type('Test', {}).extend(name)
```

Or array of properties:

```ts
const test = g.type('Test', {}).extend([firstname, lastname])
```

GraphQL Type:

```graphql
type Test {
  name: String!
}
```

### List

Turns a particular type into a list

```ts
g.string().list()
```

### Paginated List

Turns a particular type into a cursor-paginated list

```ts
g.ref(user).paginatedList()
```

### Optional (nullable)

Specifies whether a field can return a null value if the requested data is not available

```ts
g.string().optional()
```

### Required

Specifies whether a field must return a value

```ts
g.string().required()
```

### Default

Default values can be used to provide a fallback value if a requested value is not available. They can be specified for arguments, query variables, and input objects

```ts
g.string().default("Default string")
```

### Description

A string that can be used to describe a schema element such as a field or an argument

```ts
g.string().description("Description")
```

### Deprecated

Mark a field as deprecated. It is used to indicate that a schema element is no longer supported or recommended and should not be used in new code. When a deprecated schema element is used, a warning is generated to alert developers

```ts
g.string().deprecated("Deprecation reason")
```

### Omit Resolver

Omit returning a field in the resolver. Used when you want to skip returning a value in case the value is resolved elsewhere

```ts
g.string().omitResolver()
```

## Utilities

[→ `buildSchema`](/api/index.md#buildschema)

[→ `printSchema`](/api/index.md#printschema)
