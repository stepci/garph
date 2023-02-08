abstract class AnyType<T> {
  _type: T
  typeDef: TypeDefinition<T>
}

type AnyXType = AnyType<any>

type AnyString = AnyType<string>

type AnyBoolean = AnyType<boolean>

type AnyNumber = AnyType<number>

type AnyField = AnyType<any>

type AnyList = {
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

type AnyArgs = {
  [key: string]: AnyXType
}

type AnyXArgs = GArgs<any, any>

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
  isList?: boolean
  isOptionalList?: boolean
  scalarOptions?: ScalarOptions<any, any>
}

type ScalarOptions<I, O> = {
  serialize: (value: I) => O
  parseValue: (value: O) => I
  parseLiteral?: (ast: any) => I
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
  T extends AnyList ? Infer<T['_inner']>[] :
  T extends AnyOptional ? Infer<T['_inner']> | null :
  T extends AnyXArgs ? Infer<T['_type']> :
  T extends AnyUnion ? Infer<T['_union']> :
  T extends AnyEnum ? T['_enum'] :
  T extends AnyScalar ? T['_input']:
  T extends AnyField ? Infer<T['_type']> :
never

export type InferArgs<T extends AnyXType> = T extends AnyObject ? {
  [K in keyof T['_shape']]: T['_shape'][K]['_args'] extends AnyArgs ? {
    [G in keyof T['_shape'][K]['_args']]: Infer<T['_shape'][K]['_args'][G]>
  } : never
} : never

export type InferResolvers <T extends ObjectType, X extends InferResolverConfig> = {
  [K in keyof T]: {
    [G in keyof Infer<T[K]>]?: (parent: unknown, args: InferArgs<T[K]>[G], context: X['context'], info: X['info']) => Infer<T[K]>[G]
  }
}

export type InferResolversStrict <T extends ObjectType, X extends InferResolverConfig> = {
  [K in keyof T]: {
    [G in keyof Infer<T[K]>]: (parent: unknown, args: InferArgs<T[K]>[G], context: X['context'], info: X['info']) => Infer<T[K]>[G]
  }
}

class GList<T extends AnyXType, X extends AnyArgs> extends AnyType<T[]> {
  _type: T[]
  _inner: T
  _args: X
  typeDef: TypeDefinition<T[]>

  constructor(shape: AnyXType) {
    super()
    this.typeDef = shape.typeDef
    this.typeDef.isList = true
  }

  nullable() {
    return new GOptional<this, X>(this, true)
  }

  args<X extends AnyArgs>(x: X) {
    return new GArgs<this, X>(this, x)
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }

  // list() {
  //   return new GList<this, X>(this)
  // }
}

class GOptional<T extends AnyXType, X extends AnyArgs> extends AnyType<T> {
  _inner: T
  _args: X
  typeDef: TypeDefinition<T>

  constructor(shape: AnyXType, isOptionalList?: boolean) {
    super()
    this.typeDef = shape.typeDef
    this.typeDef.isOptional = true

    if (isOptionalList) this.typeDef.isOptionalList = true
  }

  list() {
    return new GList<this, never>(this)
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }
}

class GObject<T extends ObjectType> extends AnyType<T> {
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

  nullable() {
    return new GOptional<this, never>(this)
  }

  list() {
    return new GList<this, never>(this)
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

  nullable() {
    return new GOptional<this, never>(this)
  }

  list() {
    return new GList<this, never>(this)
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }

  args<X extends AnyArgs>(x: X) {
    return new GArgs<this, X>(this, x)
  }
}

class GArgs<T extends AnyXType, X extends AnyArgs> {
  _type: T
  _args: X
  typeDef: TypeDefinition<T>

  constructor(shape: T, args: X) {
    this.typeDef = shape.typeDef
    this.typeDef.args = args
  }

  list() {
    return new GList<this, X>(this)
  }

  nullable() {
    return new GOptional<this, X>(this)
  }
}

class GNumber extends AnyType<number> {
  _type: number
  typeDef: TypeDefinition<number>

  constructor(type: 'int' | 'float' = 'int') {
    super()
    this.typeDef = {
      type
    }
  }

  nullable() {
    return new GOptional<this, never>(this)
  }

  list() {
    return new GList<this, never>(this)
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

  nullable() {
    return new GOptional<this, never>(this)
  }

  list() {
    return new GList<this, never>(this)
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

  nullable() {
    return new GOptional<this, never>(this)
  }

  list() {
    return new GList<this, never>(this)
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

  nullable() {
    return new GOptional<this, never>(this)
  }

  list() {
    return new GList<this, never>(this)
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

  constructor(name: string, scalarOptions: ScalarOptions<I, O>) {
    super()
    this.typeDef = {
      name,
      type: 'scalar',
      scalarOptions
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
  list<T extends AnyXType>(shape: T) {
    return new GList<T, any>(shape)
  },
  optional<T extends AnyXType>(shape: T) {
    return new GOptional<T, any>(shape)
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
  scalar<I, O>(name: string, options: ScalarOptions<I, O>) {
    return new GScalar<I, O>(name, options)
  }
}
