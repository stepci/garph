---
outline: [2, 3]
---

# Quickstart

## Overview

Garph is a tool for building GraphQL APIs without codegen. It provides a fullstack TypeScript experience and makes it easy to create and maintain GraphQL APIs. This guide will show you how to install and set up Garph and create a simple GraphQL API.

**Check out a video introduction to Garph by Jamie Barton**

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/a6oEbe0-6zU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS and above)
- npm (included with Node)

## Tutorial

### Step 1: Install Garph

To install Garph, run the following command in your terminal:

::: code-group
```sh [npm]
$ npm i garph graphql-yoga
```

```sh [pnpm]
$ pnpm add garph graphql-yoga
```

```sh [yarn]
$ yarn add garph graphql-yoga
```

```sh [bun]
$ bun i garph graphql-yoga
```
:::

This will install Garph and [Yoga](https://the-guild.dev/graphql/yoga-server) in your project.

### Step 2: Create a schema

In GraphQL, schemas are used to define the types and operations that are available in a GraphQL API.

The "Query" type is the entry point for queries in a GraphQL schema. It defines the top-level fields that can be queried by clients of the API. The fields defined on the "Query" type determine what data can be queried and returned by the server.

Create a new file called `index.ts` and paste the following contents:

::: code-group
```ts [index.ts]
import { g, InferResolvers, buildSchema } from 'garph'
import { createYoga, YogaInitialContext } from 'graphql-yoga'
import { createServer } from 'http'

const queryType = g.type('Query', {
  greet: g.string()
    .args({
      name: g.string().optional().default('Max')
    })
    .description('Greets a person')
})
```
:::

This will import the required packages and create a new GraphQL schema a Query type, that has a field "greet", that takes an optional "name" argument of type string with the default value "Max".

The example above produces the following GraphQL schema:

```graphql
type Query {
  """
  Greets a person
  """
  greet(name: String = "Max"): String!
}
```

[→ More about Schemas](./guide/schemas.md)

### Step 3: Add resolvers

GraphQL resolvers are functions for fetching the data for a particular field in a GraphQL query or mutation. When a client makes a GraphQL request, the GraphQL server invokes the corresponding resolver functions to retrieve the data for the requested fields.

::: code-group
```ts{13-17} [index.ts]
import { g, InferResolvers, buildSchema } from 'garph'
import { createYoga, YogaInitialContext } from 'graphql-yoga'
import { createServer } from 'http'

const queryType = g.type('Query', {
  greet: g.string()
    .args({
      name: g.string().optional().default('Max')
    })
    .description('Greets a person')
})

const resolvers: InferResolvers<{ Query: typeof queryType }, { context: YogaInitialContext }> = {
  Query: {
    greet: (parent, args, context, info) => `Hello, ${args.name}`
  }
}
```
:::

The above code defines a resolver function for a "greet" field on the "Query" type in a GraphQL schema. When a client sends a query requesting the "greet" field, this resolver function will be invoked by the GraphQL server to fetch and return the data for the field.

The resolver function above simply returns a string that contains a greeting message using the name passed in as an argument.

[→ More about Resolvers](./guide/resolvers.md)

### Step 4: Serve the GraphQL API

Although Garph holds no opinions of which server is being used to serve the GraphQL API, we **higly recommend** starting out with [Yoga](https://the-guild.dev/graphql/yoga-server)

GraphQL Yoga can help simplify the process of building a GraphQL server, reduce boilerplate code, and provide useful features and tools to help you develop and debug your server more efficiently

::: code-group
```ts{19-24} [index.ts]
import { g, InferResolvers, buildSchema } from 'garph'
import { createYoga, YogaInitialContext } from 'graphql-yoga'
import { createServer } from 'http'

const queryType = g.type('Query', {
  greet: g.string()
    .args({
      name: g.string().optional().default('Max')
    })
    .description('Greets a person')
})

const resolvers: InferResolvers<{ Query: typeof queryType }, { context: YogaInitialContext }> = {
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
:::

In the above code, we create a new GraphQL schema from our Garph schema and resolvers. After that, we create a new Yoga instance with the schema provided and serve Yoga using a http server included in Node.js on port 4000

You can execute the following command to run the code above:

```sh
$ npx ts-node index.ts
```

Once the server is up, you should see the following output in the console:

```
Server is running on http://localhost:4000/graphql
```

### Step 5: Try the GraphQL API

To try out your new GraphQL API, open your web browser and navigate to: http://localhost:4000/graphql

This will open the GraphQL Playground (GraphiQL) where you can test your API by running queries.

To test the "greet" query, enter the following in the left pane:

```graphql
query {
  greet(name: "Max")
}
```

Then, click the "Play" button to run the query. You should see the following response in the right pane:

```json
{
  "data": {
    "greet": "Hello, Max"
  }
}
```

Congratulations, you have created a GraphQL API with Garph!

## Conclusion

In this Quickstart guide, you learned how to install and set up Garph and create a simple GraphQL API. For more information on how to use Garph, see other parts of the documentation
