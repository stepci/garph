import { g } from '../src'
import { InferClient, ClientTypes } from '../src/client'

const tType = g.type('Test', {
  test: g.string().list().description('Greets a person')
})

const queryType = g.type('Query', {
  greet: g.ref(() => tType)
    .list()
    .optional()
    .args({
      name: g.ref(() => tType).optional().default({ test: ['sdf'] }),
    })
    .description('Greets a person')
})

type x = InferClient<{ query: typeof queryType }>

export function createClient <T extends ClientTypes> (): InferClient<T> {
  return null as any
}

const client = createClient<{ query: typeof queryType }>()
client.query.greet({ name: { test: ['sdf'] } })?.forEach((x) => x.test)
