import { Infer, AnyInput, AnyInterface, AnyString, AnyID, AnyBoolean, AnyNumber, AnyList, AnyNullable, AnyArgs, AnyUnion, AnyEnum, AnyScalar, AnyRef, AnyObject } from './index'

export type ClientTypes = {
  query: AnyObject
  mutation?: AnyObject
  subscription?: AnyObject
}

export type InferClient<T extends ClientTypes> = {
  [K in keyof T]: InferClientTypes<T[K]>
}

export type InferClientTypes<T> = T extends AnyObject | AnyInterface ? {
  [K in keyof T['_inner'] as T['_inner'][K] extends AnyNullable ? never : K]: InferClientTypes<T['_inner'][K]>
} & {
  [K in keyof T['_inner'] as T['_inner'][K] extends AnyNullable ? K : never]?: InferClientTypes<T['_inner'][K]>
} : T extends AnyInput ? {
  [K in keyof T['_shape'] as T['_shape'][K] extends AnyNullable ? never : K]: InferClientTypes<T['_shape'][K]>
} & {
  [K in keyof T['_shape'] as T['_shape'][K] extends AnyNullable ? K : never]?: InferClientTypes<T['_shape'][K]>
} : InferClientTypesShallow<T>

export type InferClientTypesShallow<T> =
  T extends AnyString | AnyID | AnyScalar | AnyNumber | AnyBoolean ? T['_shape'] :
  T extends AnyEnum ? T['_inner'] :
  T extends AnyUnion ? InferClientTypes<T['_inner']> :
  T extends AnyList ? InferClientTypes<T['_shape']>[] :
  T extends AnyNullable ? InferClientTypes<T['_shape']> | null | undefined :
  T extends AnyArgs ? (args?: InferClientTypesArgs<T>) => InferClientTypes<T['_shape']> :
  T extends AnyRef ? InferClientTypes<T['_shape']> :
  T

export type InferClientTypesArgs<T extends AnyArgs> = {
  [K in keyof T['_args'] as T['_args'][K] extends AnyNullable ? never : K]: Infer<T['_args'][K]>
} & {
  [K in keyof T['_args'] as T['_args'][K] extends AnyNullable ? K : never]?: Infer<T['_args'][K]>
}
