import { g, AnyType, InferClient } from '../src'

const tType = g.type('Query', {
  test: g.string().list().description('Greets a person')
})

const queryType = g.type('Query', {
  greet: g.ref<typeof tType>('')
    .list()
    .args({
      name: g.ref<typeof tType>('').optional().default({ test: ['sdf'] }),
    })
    .description('Greets a person')
})

export function createClient <T extends AnyType> (): InferClient<T> {
  return null as any
}

const client = createClient<typeof queryType>()
client.greet({ name: { test: ['sdf'] } }).forEach((x) => x.test)
