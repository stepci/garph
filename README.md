# garph

https://user-images.githubusercontent.com/10400064/222474710-bc263775-06b8-4a78-8099-676a9ad3c7a4.mov

> **Warning**:
> We would love to hear your Feedback in our [Discord](https://discord.gg/KqJJzJ3BTu)

> **Note**:
> tRPC-style client for Garph has arrived! See [garph-gqty](https://github.com/stepci/garph-gqty) for more 🚀

Garph is a fullstack GraphQL framework for TypeScript, that aims to deliver the best GraphQL Developer-Experience.

## Get started

1. Install the dependencies

    ```
    npm i garph graphql-yoga
    ```

2. Create example GraphQL API

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

3. Start the server

    ```
    npx ts-node server.ts
    ```

4. Query the API

    Go to: http://localhost:4000/graphl

    Enter the following query:

    ```graphql
    {
      greet(name: "Max")
    }
    ```

    Click on the play button

## Documentation

Documentation is available on [garph.dev/docs](https://garph.dev/docs)

## Examples

Example projects can be found under [examples/](examples/)

## Feedback

We would love to hear your Feedback in our [Discord](https://discord.gg/KqJJzJ3BTu) community
