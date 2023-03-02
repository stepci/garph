import { Infer, AnyString, AnyID, AnyBoolean, AnyNumber, AnyList, AnyOptional, AnyArgs, AnyUnion, AnyEnum, AnyScalar, AnyRef, AnyObject } from './index'

export type InferClient<T> = T extends AnyObject ? {
  [K in keyof T['_inner']]: InferClient<T['_inner'][K]>
}: InferClientShallow<T>

export type InferClientShallow<T> =
  T extends AnyString | AnyID | AnyScalar | AnyNumber | AnyBoolean ? T['_shape'] :
  T extends AnyEnum ? T['_inner'] :
  T extends AnyUnion ? InferClient<T['_inner']> :
  T extends AnyList ? InferClient<T['_shape']>[] :
  T extends AnyOptional ? InferClient<T['_shape']> | null | undefined :
  T extends AnyArgs ? (args?: InferClientArgs<T>) => InferClient<T['_shape']> :
  T extends AnyRef ? InferClient<T['_shape']> :
  T

export type InferClientArgs<T extends AnyArgs> = {
  [K in keyof T['_args']]: Infer<T['_args'][K]>
}
