# Testing

Testing GraphQL APIs is made easy using [Step CI](https://stepci.com), an open-source API-testing framework.

Given the following Garph schema:

```ts
import { g, InferResolvers, buildSchema } from 'garph'

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

We can come up a Step CI workflow that looks like this:

```yml
version: "1.1"
name: Status Check
env:
  BASE_URL: "http://localhost:4000/graphql"
tests:
  default_greeting:
    steps:
      - name: 'Get default greeting'
        http:
          url: '${{env.BASE_URL}}'
          graphql:
            query: '{ greet }'
          check:
            status: 200
            json:
              data:
                greet: 'Hello, Max'

  specific_greeting:
    steps:
      - name: 'Greet a specific person'
        http:
          url: '${{env.BASE_URL}}'
          graphql:
            query: |
              query ($name: String) {
                greet(name: $name)
              }
            variables:
              name: Alice
          check:
            status: 200
            json:
              data:
                greet: 'Hello, Alice'
```

The first test checks if the query "greet" is working and returns the default greeting. The second test checks if the API correctly greets a specific person (in this case, Alice) when provided with a name variable.

**Run the workflow**

```
npx stepci run workflow.yml
```

Result:

```
 PASS  default_greeting
 PASS  specific_greeting

Tests: 0 failed, 2 passed, 2 total
Steps: 0 failed, 0 skipped, 2 passed, 2 total
Time:  0.035s, estimated 0s
CO2:   0.00002g

Workflow passed after 0.035s
```
