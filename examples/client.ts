import { g, AnyType, InferClient } from '../src'

const tType = g.type('Query', {
  test: g.string()
    .args({
      nae: g.string().optional().default('Max'),
    })
    .description('Greets a person')
})

const queryType = g.type('Query', {
  greet: g.ref<typeof tType>('')
    .list()
    .args({
      name: g.ref<typeof tType>('').optional().default('Max'),
    })
    .description('Greets a person')
})

export function createClient <T extends AnyType> (): InferClient<T> {
  return null as any
}

const client = createClient<typeof queryType>()
client.greet({ name: { test: '' } }).map(greet => {
  greet.test({ nae: 'Max' })
})
