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

type AnyScalar = {
  _input: any
  _output: any
}

type ObjectType = {
  [key: string]: AnyXType
}

type TypeDefinition<T> = {
  name?: string
  type: string
  shape?: T
  args?: AnyArgs
  description?: string
  isOptional?: boolean
  isArray?: boolean
  isOptionalArray?: boolean
}

export type InferResolverConfig = {
  context?: any
  info?: any
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
  T extends AnyScalar ? T['_input']:
  T extends AnyField ? Infer<T['_type']> : never

export type InferResolvers <T extends ObjectType, X extends InferResolverConfig> = {
  [K in keyof T]?: {
    [G in keyof Infer<T[K]>]?: (parent: any, args: InferArgs<T[K]>[G], context: X['context'], info: X['info']) => Infer<T[K]>[G]
  }
}

export type InferResolversStrict <T extends ObjectType, X extends InferResolverConfig> = {
  [K in keyof T]: {
    [G in keyof Infer<T[K]>]: (parent: any, args: InferArgs<T[K]>[G], context: X['context'], info: X['info']) => Infer<T[K]>[G]
  }
}

class GArray<T extends AnyXType> extends AnyType<T[]> {
  _type: T[]
  _inner: T
  typeDef: TypeDefinition<T[]>

  constructor(shape: AnyXType) {
    super()
    this.typeDef = shape.typeDef
    this.typeDef.isArray = true
  }

  optional() {
    return new GOptional<this>(this, true)
  }
}

class GOptional<T> extends AnyType<T> {
  _inner: T
  typeDef: TypeDefinition<T>

  constructor(shape: AnyXType, isOptionalArray?: boolean) {
    super()
    this.typeDef = shape.typeDef
    this.typeDef.isOptional = true

    if (isOptionalArray) this.typeDef.isOptionalArray = true
  }

  array() {
    return new GArray<this>(this)
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }
}

class GObject<T> extends AnyType<T> {
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
    return new GOptional<this>(this)
  }

  array() {
    return new GArray<this>(this)
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }
}

class GString extends AnyType<string> {
  _type: string
  typeDef: TypeDefinition<string>

  constructor(type: 'string' | 'id' = 'string') {
    super()
    this.typeDef = {
      type
    }
  }

  optional() {
    return new GOptional<this>(this)
  }

  array() {
    return new GArray<this>(this)
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }

  args<X extends AnyArgs>(x: X) {
    return new GArgs<this, X>(this, x)
  }
}

type InferArg<X extends AnyArgs> = {
  [K in keyof X]: Infer<X[K]>
}

class GArgs<T extends AnyXType, X extends AnyArgs> {
  _type: T
  _args: X
  typeDef: TypeDefinition<T>

  constructor(shape: T, args: X) {
    this.typeDef = shape.typeDef
    this.typeDef.args = args
  }

  // resolve(fn: (parent: any, args: InferArg<X>, context: any, info: any) => Infer<T>) {
  //   return this
  // }
}

export type InferArgs<T extends AnyXType> = T extends AnyObject ? {
  [K in keyof T['_shape']]: T['_shape'][K]['_args'] extends AnyArgs ? {
    [G in keyof T['_shape'][K]['_args']]: Infer<T['_shape'][K]['_args'][G]>
  } : never
} : never

type AnyArgs = {
  [key: string]: AnyXType
}

type AnyXArgs = GArgs<any, any>

class GNumber extends AnyType<number> {
  _type: number
  typeDef: TypeDefinition<number>

  constructor(type: 'int' | 'float' = 'int') {
    super()
    this.typeDef = {
      type
    }
  }

  optional() {
    return new GOptional<this>(this)
  }

  array() {
    return new GArray<this>(this)
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }
}

class GBoolean extends AnyType<boolean> {
  _type: boolean
  typeDef: TypeDefinition<boolean>

  constructor() {
    super()
    this.typeDef = {
      type: 'boolean'
    }
  }

  optional() {
    return new GOptional<this>(this)
  }

  array() {
    return new GArray<this>(this)
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }
}

class GUnion<T extends AnyXType[]> extends AnyType<T> {
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
    return new GOptional<this>(this)
  }

  array() {
    return new GArray<this>(this)
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }
}

class GField<T extends AnyXType> extends AnyType<T> {
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
    return new GOptional<this>(this)
  }

  array() {
    return new GArray<this>(this)
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }
}

class GEnum<T extends string> extends AnyType<T[]> {
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

class GScalar<I, O> extends AnyType<I> {
  _input: I
  _output: O
  typeDef: TypeDefinition<I>

  constructor(name: string, options) {
    super()
    this.typeDef = {
      name,
      type: 'scalar'
    }
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }
}

export const g = {
  type<T extends ObjectType>(name: string, shape: T) {
    return new GObject<T>(name, shape)
  },
  string() {
    return new GString()
  },
  array<T extends AnyXType>(shape: T) {
    return new GArray<T>(shape)
  },
  union<T extends AnyXType[]>(name: string, ...args: T) {
    return new GUnion<T>(name, args)
  },
  enum<T extends string>(name: string, args: T[]) {
    return new GEnum<T>(name, args)
  },
  boolean() {
    return new GBoolean()
  },
  int() {
    return new GNumber('int')
  },
  float() {
    return new GNumber('float')
  },
  id() {
    return new GString('id')
  },
  field<T extends AnyXType>(t: T) {
    return new GField<T>(t)
  },
  scalar<I, O>(name: string, options: { serialize: (value: I) => O, parseValue: (value: O) => I, parseLiteral?: (ast: any) => I }) {
    return new GScalar<I, O>(name, options)
  }
}
