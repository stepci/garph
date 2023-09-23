# File Uploads

::: warning
The feature only works with compatible GraphQL servers and clients that have implemented the Multipart Request Specification.
:::

Garph supports the GraphQL [Multipart Request Specification](https://github.com/jaydenseric/graphql-multipart-request-spec), allowing you to upload files and consume the binary data inside GraphQL Resolvers via HTTP. All you need to do is adding a `File` scalar to your schema.

You can consume uploaded files or blobs as WHATWG standard [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) or [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) objects you might be familiar from the browser's API.

```ts
import { g, InferResolvers, buildSchema } from 'garph'

const file = g.scalarType<File, never>('File')

const mutationType = g.type('Mutation', {
  readTextFile: g.string()
    .args({
      file: g.ref(file),
    })
})

const resolvers: InferResolvers<{ Mutation: typeof mutationType }, {}> = {
  Mutation: {
    readTextFile: async (parent, { file }, context, info) => {
      const textContent = await file.text()
      return textContent
    }
  }
}

const schema = buildSchema({ g, resolvers })
```
