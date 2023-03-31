import { g, InferResolvers, buildSchema } from './../src/index'
import { createYoga } from 'graphql-yoga'
import { createServer } from 'http'

const file = g.scalarType<File, never>('File')

const mutationType = g.type('Mutation', {
  readTextFile: g.string()
    .args({
      file: g.ref(file),
    })
    .description('Greets a person')
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
const yoga = createYoga({ schema })
const server = createServer(yoga)
server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})
