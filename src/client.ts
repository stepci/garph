import { Infer, AnyObject, AnyString, AnyID, AnyBoolean, AnyNumber, AnyList, AnyOptional, AnyArgs, AnyUnion, AnyEnum, AnyScalar, AnyRef } from './index'

export type InferClient<T> = T extends AnyObject ? {
  [K in keyof T['_inner']]: InferClient<T['_inner'][K]>
}: InferClientShallow<T>

type InferClientShallow<T> =
  T extends AnyString | AnyEnum | AnyID | AnyScalar | AnyNumber | AnyBoolean ? T['_shape'] :
  T extends AnyList ? InferClient<T['_shape']>[] :
  T extends AnyArgs ? (args?: InferClientArgs<T>) => InferClient<T['_shape']> :
  T extends AnyOptional ? InferClient<T['_shape']> | null | undefined :
  T extends AnyUnion | AnyRef ? InferClient<T['_shape']> :
  T

export type InferClientArgs<T extends AnyArgs> = {
  [K in keyof T['_args']]: Infer<T['_args'][K]>
}
