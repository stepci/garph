abstract class AnyType<T> {
  _type: T
  typeDef: TypeDefinition<T>
}

type AnyXType = AnyType<any>

type AnyString = AnyType<string>

type AnyBoolean = AnyType<boolean>

type AnyNumber = AnyType<number>

type AnyField = AnyType<any>

type AnyArray = {
  _type: any[]
  _inner: any
}

type AnyUnion = {
  _union: any[number]
}

type AnyEnum = {
  _enum: string[number]
}

type AnyOptional = {
  _inner: any
}

type AnyObject = {
  _shape: any
}

type ObjectType = {
  [key: string]: AnyXType
}

type TypeDefinition<T> = {
  name?: string
  type: string
  shape?: T
  description?: string
  isOptional?: boolean
  isArray?: boolean
  isOptionalArray?: boolean
}

export type Infer<T extends AnyXType> = T extends AnyObject ? {
  [K in keyof T['_shape']]: Infer<T['_shape'][K]>
} : T extends AnyString ? T['_type'] :
  T extends AnyBoolean ? T['_type'] :
  T extends AnyNumber ? T['_type'] :
  T extends AnyArray ? Infer<T['_inner']>[] :
  T extends AnyOptional ? Infer<T['_inner']> | undefined :
  T extends AnyXArgs ? Infer<T['_type']> :
  T extends AnyUnion ? Infer<T['_union']> :
  T extends AnyEnum ? T['_enum'] :
  T extends AnyField ? Infer<T['_type']> :
  never

export type InferResolvers <T extends ObjectType> = {
  [K in keyof T]?: {
    [Z in keyof Infer<T[K]>]?: (parent: any, args: InferArgs<T[K]>[Z], context: any, info: any) => Infer<T[K]>[Z]
  }
}

class ZArray<T extends AnyXType> extends AnyType<T[]> {
  _type: T[]
  _inner: T
  typeDef: TypeDefinition<T[]>

  constructor(shape: AnyXType) {
    super()
    this.typeDef = shape.typeDef
    this.typeDef.isArray = true
  }

  optional() {
    return new ZOptional<this>(this, true)
  }
}

class ZOptional<T> extends AnyType<T> {
  _inner: T
  typeDef: TypeDefinition<T>

  constructor(shape: AnyXType, isOptionalArray?: boolean) {
    super()
    this.typeDef = shape.typeDef
    this.typeDef.isOptional = true

    if (isOptionalArray) this.typeDef.isOptionalArray = true
  }

  array() {
    return new ZArray<this>(this)
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }
}

class ZObject<T> extends AnyType<T> {
  _shape: T
  typeDef: TypeDefinition<T>

  constructor(name: string, shape: T) {
    super()
    this.typeDef = {
      name,
      type: 'object',
      shape
    }
  }

  optional() {
    return new ZOptional<this>(this)
  }

  array() {
    return new ZArray<this>(this)
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }
}

class ZString extends AnyType<string> {
  _type: string
  typeDef: TypeDefinition<string>

  constructor(type: 'string' | 'id' = 'string') {
    super()
    this.typeDef = {
      type
    }
  }

  optional() {
    return new ZOptional<this>(this)
  }

  array() {
    return new ZArray<this>(this)
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }

  args<X extends AnyArgs>(x: X) {
    return new ZArgs<this, X>(this, x)
  }
}

type InferArg<X extends AnyArgs> = {
  [K in keyof X]: Infer<X[K]>
}

class ZArgs<T extends AnyXType, X extends AnyArgs> {
  _type: T
  _args: X
  typeDef: TypeDefinition<T>

  constructor(type: T, fn: X) {
    this._type = type
  }

  resolve(fn: (parent: any, args: InferArg<X>, context: any, info: any) => Infer<T>) {
    return this
  }
}

export type InferArgs<T extends AnyXType> = T extends AnyObject ? {
  [K in keyof T['_shape']]: T['_shape'][K]['_args'] extends AnyArgs ? {
    [Z in keyof T['_shape'][K]['_args']]: Infer<T['_shape'][K]['_args'][Z]>
  } : never
} : never

type AnyArgs = {
  [key: string]: AnyXType
}

type AnyXArgs = ZArgs<any, any>

class ZNumber extends AnyType<number> {
  _type: number
  typeDef: TypeDefinition<number>

  constructor(type: 'int' | 'float' = 'int') {
    super()
    this.typeDef = {
      type
    }
  }

  optional() {
    return new ZOptional<this>(this)
  }

  array() {
    return new ZArray<this>(this)
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }
}

class ZBoolean extends AnyType<boolean> {
  _type: boolean
  typeDef: TypeDefinition<boolean>

  constructor() {
    super()
    this.typeDef = {
      type: 'boolean'
    }
  }

  optional() {
    return new ZOptional<this>(this)
  }

  array() {
    return new ZArray<this>(this)
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }
}

class ZUnion<T extends AnyXType[]> extends AnyType<T> {
  _type: T
  _union: T[number]
  typeDef: TypeDefinition<T>

  constructor(name: string, shape: T) {
    super()
    this.typeDef = {
      name,
      type: 'union',
      shape
    }
  }

  optional() {
    return new ZOptional<this>(this)
  }

  array() {
    return new ZArray<this>(this)
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }
}

class ZField<T extends AnyXType> extends AnyType<T> {
  _type: T
  typeDef: TypeDefinition<T>

  constructor(shape: T) {
    super()
    this.typeDef = {
      type: 'field',
      shape
    }
  }

  optional() {
    return new ZOptional<this>(this)
  }

  array() {
    return new ZArray<this>(this)
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }
}

class ZEnum<T extends string> extends AnyType<T[]> {
  _type: T[]
  _enum: T
  typeDef: TypeDefinition<T[]>

  constructor(name: string, shape: T[]) {
    super()
    this.typeDef = {
      name,
      type: 'enum',
      shape
    }
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }
}

export const z = {
  type<T extends ObjectType>(name: string, shape: T) {
    return new ZObject<T>(name, shape)
  },
  string() {
    return new ZString()
  },
  array<T extends AnyXType>(shape: T) {
    return new ZArray<T>(shape)
  },
  union<T extends AnyXType[]>(name: string, ...args: T) {
    return new ZUnion<T>(name, args)
  },
  enum<T extends string>(name: string, args: T[]) {
    return new ZEnum<T>(name, args)
  },
  boolean() {
    return new ZBoolean()
  },
  int() {
    return new ZNumber('int')
  },
  float() {
    return new ZNumber('float')
  },
  id() {
    return new ZString('id')
  },
  field<T extends AnyXType>(t: T) {
    return new ZField<T>(t)
  }
}
