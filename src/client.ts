import { InferArg, AnyInput, AnyInterface, AnyString, AnyID, AnyBoolean, AnyNumber, AnyList, AnyPaginatedList, AnyOptional, AnyArgs, AnyUnion, AnyEnum, AnyScalar, AnyRef, AnyObject, AnyOmitResolver } from './index'
import { ExpandRecursively } from './utils'

export type ClientTypes = {
  query: AnyObject
  mutation?: AnyObject
  subscription?: AnyObject
}

export type InferClient<T extends ClientTypes> = {
  [K in keyof T]: InferClientTypes<T[K]>
}

export type InferClientTypes<T> = ExpandRecursively<InferClientTypesRaw<T>>
export type InferClientTypesRaw<T> = T extends AnyInput | AnyObject | AnyInterface ? {
  __typename: T['_name']
} & {
  [K in keyof T['_shape'] as T['_shape'][K] extends AnyOptional ? never : K]: InferClientTypesRaw<T['_shape'][K]>
} & {
  [K in keyof T['_shape'] as T['_shape'][K] extends AnyOptional ? K : never]?: InferClientTypesRaw<T['_shape'][K]>
}: InferClientTypesShallow<T>

export type InferClientTypesShallow<T> =
  T extends AnyString | AnyID | AnyNumber | AnyBoolean ? T['_shape'] :
  T extends AnyScalar ? T['_output'] :
  T extends AnyEnum ? T['_inner'] :
  T extends AnyUnion ? {
    $on: {
      __typename: keyof {
        [K in keyof T['_inner'] as T['_inner'][K]['_name']]: never
      }
    } & {
      [K in keyof T['_inner'] as T['_inner'][K]['_name']]?: InferClientTypesRaw<T['_inner'][K]>
    }
  } :
  T extends AnyList ? InferClientTypesRaw<T['_shape']>[] :
  T extends AnyPaginatedList ? T['_inner'] :
  T extends AnyOptional ? InferClientTypesRaw<T['_shape']> | null | undefined :
  T extends AnyOmitResolver ? InferClientTypesRaw<T['_shape']> :
  T extends AnyArgs ? (args?: InferArg<T>) => InferClientTypes<T['_shape']> :
  T extends AnyRef ? InferClientTypesRaw<T['_inner']> :
  T
