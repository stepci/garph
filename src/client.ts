import { InferRaw, AnyString, AnyID, AnyBoolean, AnyNumber, AnyList, AnyOptional, AnyArgs, AnyUnion, AnyEnum, AnyScalar, AnyRef, AnyObject } from './index'
import { NiceIntersection } from './utils'

export type ClientTypes = {
  query: AnyObject
  mutation?: AnyObject
  subscription?: AnyObject
}

export type InferClient<T extends ClientTypes> = NiceIntersection<InferRaw<T>>
export type InferRawClient<T extends ClientTypes> = {
  [K in keyof T]: InferRawClientTypes<T[K]>
}

export type InferClientTypes<T> = NiceIntersection<InferRawClientTypes<T>>
export type InferRawClientTypes<T> = T extends AnyObject ? {
  [K in keyof T['_inner'] as T['_inner'][K] extends AnyOptional ? never : K]: InferRawClientTypes<T['_inner'][K]>
} & {
  [K in keyof T['_inner'] as T['_inner'][K] extends AnyOptional ? K : never]?: InferRawClientTypes<T['_inner'][K]>
} : InferRawClientTypesShallow<T>

export type InferRawClientTypesShallow<T> =
  T extends AnyString | AnyID | AnyScalar | AnyNumber | AnyBoolean ? T['_shape'] :
  T extends AnyEnum ? T['_inner'] :
  T extends AnyUnion ? InferRawClientTypes<T['_inner']> :
  T extends AnyList ? InferRawClientTypes<T['_shape']>[] :
  T extends AnyOptional ? InferRawClientTypes<T['_shape']> | null | undefined :
  T extends AnyArgs ? (args?: InferRawClientTypesArgs<T>) => InferRawClientTypes<T['_shape']> :
  T extends AnyRef ? InferRawClientTypes<T['_shape']> :
  T

export type InferClientTypesArgs<T extends AnyArgs> = NiceIntersection<InferRawClientTypesArgs<T>>
export type InferRawClientTypesArgs<T extends AnyArgs> = {
  [K in keyof T['_args'] as T['_args'][K] extends AnyOptional ? never : K]: InferRaw<T['_args'][K]>
} & {
  [K in keyof T['_args'] as T['_args'][K] extends AnyOptional ? K : never]?: InferRaw<T['_args'][K]>
}
