# Validation

Custom scalars can be useful for handling specific data types that are not natively supported by GraphQL or you want a version of an existing type that does some validation.

In this example, we create a new scalar type `Username`, which ensures that the username is longer than 3 characters. In case of success the request proceeds, otherwise an error is thrown.

```ts
import { g, InferResolvers, buildSchema } from 'garph'
import { GraphQLError } from 'graphql'

const username = g.scalarType<string, string>('Username', {
  serialize: (username) => username,
  parseValue: (username) => {
    if (username.length < 3) {
      throw new GraphQLError('Username must be at least 3 characters long')
    }

    return username
  }
})

const queryType = g.type('Query', {
  login: g.string().args({ username }),
})

const resolvers: InferResolvers<{ Query: typeof queryType }, {}> = {
  Query: {
    login: (parent, args) => `Welcome back, ${args.username}!`
  }
}

const schema = buildSchema({ g, resolvers })
```

### Validating with Zod

Same as the example above, except we are now using Zod validator instead of writing the logic ourselves.

> Before you continue, make sure you have installed Zod from NPM

```ts
import { g, InferResolvers, buildSchema } from 'garph'
import { z } from 'zod'
import { GraphQLError } from 'graphql'

const usernameValidator = z.string().min(3)

const username = g.scalarType<string, string>('Username', {
  serialize: (username) => username,
  parseValue: (username) => {
    if (!usernameValidator.safeParse(username).success) {
      throw new GraphQLError('Username must be at least 3 characters long')
    }

    return username
  }
})

const queryType = g.type('Query', {
  login: g.string().args({ username }),
})

const resolvers: InferResolvers<{ Query: typeof queryType }, {}> = {
  Query: {
    login: (parent, args) => `Welcome back, ${args.username}!`
  }
}

const schema = buildSchema({ g, resolvers })
```
