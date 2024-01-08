import { g, InferResolvers, buildSchema, Infer } from './../src/index'
import { createYoga } from 'graphql-yoga'
import { createServer } from 'http'

const Dog = g.type('Dog', {
  name: g.string(),
  owner: g.string().omitResolver()
})

const queryType = g.type('Query', {
  dogs: g.ref(() => Dog).list()
})

const owners = {
  Apollo: 'Mish',
  Buddy: 'Sebastian'
}

type resolverTypes = InferResolvers<{ Query: typeof queryType, Dog: typeof Dog }, {}>

const resolvers: resolverTypes = {
  Query: {
    dogs: (parent, args, context, info) => {
      return [
        {
          name: 'Apollo',
        },
        {
          name: 'Buddy',
        }
      ]
    }
  },
  Dog: {
    owner: {
      load (queries) {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(queries.map(q => owners[q.parent.name]))
          }, 1000)
        })
      }
    }
  }
}

const schema = buildSchema({ g, resolvers })
const yoga = createYoga({ schema })
const server = createServer(yoga)
server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})
