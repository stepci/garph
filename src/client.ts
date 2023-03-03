import { Infer, AnyString, AnyID, AnyBoolean, AnyNumber, AnyList, AnyOptional, AnyArgs, AnyUnion, AnyEnum, AnyScalar, AnyRef, AnyObject } from './index'

export type ClientTypes = {
  query: AnyObject
  mutation?: AnyObject
  subscription?: AnyObject
}

export type InferClient<T extends ClientTypes> = {
  [K in keyof T]: InferClientTypes<T[K]>
}

// TODO: Refactor Args to get rid of this mess
export type InferClientTypes<T> = T extends AnyObject ? {
  [K in keyof T['_inner'] as T['_inner'][K] extends AnyOptional ? never :
  T['_inner'][K] extends AnyArgs ?
  T['_inner'][K]['_shape'] extends AnyOptional ? never : K :
  K]: InferClientTypesShallow<T['_inner'][K]>
} & {
  [K in keyof T['_inner'] as T['_inner'][K] extends AnyOptional ? K :
  T['_inner'][K] extends AnyArgs ?
  T['_inner'][K]['_shape'] extends AnyOptional ? K : never :
  never]?: InferClientTypesShallow<T['_inner'][K]>
}: InferClientTypesShallow<T>

export type InferClientTypesShallow<T> =
  T extends AnyString | AnyID | AnyScalar | AnyNumber | AnyBoolean ? T['_shape'] :
  T extends AnyEnum ? T['_inner'] :
  T extends AnyUnion ? InferClientTypes<T['_inner']> :
  T extends AnyList ? InferClientTypes<T['_shape']>[] :
  T extends AnyOptional ? InferClientTypes<T['_shape']> | null | undefined :
  T extends AnyArgs ? (args?: InferClientTypesArgs<T>) => InferClientTypes<T['_shape']> :
  T extends AnyRef ? InferClientTypes<T['_shape']> :
  T

export type InferClientTypesArgs<T extends AnyArgs> = {
  [K in keyof T['_args'] as T['_args'][K] extends AnyOptional ? never : K]: Infer<T['_args'][K]>
} & {
  [K in keyof T['_args'] as T['_args'][K] extends AnyOptional ? K : never]?: Infer<T['_args'][K]>
}
