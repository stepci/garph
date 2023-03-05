import { g, InferResolvers, buildSchema } from './../src/index'
import { createYoga } from 'graphql-yoga'
import { createServer } from 'http'

const queryType = g.type('Query', {
  greet: g.string()
})

const file = g.scalarType<File, never>('File')

const mutationType = g.type('Mutation', {
  readTextFile: g.string()
    .args({
      file: g.ref<typeof file>('File'),
    })
    .description('Greets a person')
})

const resolvers: InferResolvers<{ Query: typeof queryType, Mutation: typeof mutationType }, {}> = {
  Query: {
    greet: (parent, args, context, info) => {
      return 'Hello World'
    }
  },
  Mutation: {
    readTextFile: async (parent, { file }, context, info) => {
      const textContent = await file.text()
      return textContent
    }
  }
}

const schema = buildSchema({ g, resolvers })
const yoga = createYoga({ schema })
const server = createServer(yoga)
server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})
