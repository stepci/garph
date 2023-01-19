export abstract class AnyType <T> {
  _type: T | undefined | T[]
}

type AnyXType = AnyType<any>

type AnyString = {
  _type: string
}

type AnyArray = {
  _type: any[]
}

type AnyOptional = {
  _type: any | undefined
}

type GTypeAny = {
  _shape: any
}

export type Infer <T extends AnyXType> = T extends GTypeAny ? {
  [K in keyof T['_shape']]: Infer<T['_shape'][K]>
} : T extends AnyString ? T['_type'] : T extends AnyArray ? T['_type'] : T extends AnyOptional ? Infer<T['_type']> | undefined : never

class ZArray <T extends AnyXType> extends AnyType<T> {
  _type: Infer<T>[]

  constructor () {
    super()
  }

  optional () {
    return new ZOptional<this>()
  }
}

class ZOptional <T> extends AnyType<T> {
  _type: T | undefined

  constructor () {
    super()
  }
}

class ZObject <T> extends AnyType<T> {
  _shape: T

  constructor () {
    super()
  }
}

class ZString extends AnyType<string> {
  _type: string

  optional () {
    return new ZOptional<this>()
  }

  array () {
    return new ZArray<this>()
  }
}

export const z = {
  object <T> (shape: T) {
    return new ZObject <T> ()
  },
  string () {
    return new ZString ()
  },
  array <T extends AnyXType> (shape: T) {
    return new ZArray<T>()
  }
}
