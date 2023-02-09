abstract class Type<T> {
  _type: T
  typeDef: TypeDefinition<T>
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
  resolverFunction?: (parent: any, args: any, context: any, info: any) => T // Add additional type-safety around this
}

type AnyType = Type<any>

type AnyString = Type<string>

type AnyBoolean = Type<boolean>

type AnyNumber = Type<number>

type AnyField = Type<any>

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
  [key: string]: AnyType
}

type ObjectType = {
  [key: string]: AnyType
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

export type Infer<T extends AnyType> = T extends AnyObject ? {
  [K in keyof T['_shape']]: Infer<T['_shape'][K]>
} : T extends AnyString ? T['_type'] :
  T extends AnyBoolean ? T['_type'] :
  T extends AnyNumber ? T['_type'] :
  T extends AnyList ? Infer<T['_inner']>[] :
  T extends AnyOptional ? Infer<T['_inner']> | null :
  T extends AnyArgs ? Infer<T['_type']> :
  T extends AnyUnion ? Infer<T['_union']> :
  T extends AnyEnum ? T['_enum'] :
  T extends AnyScalar ? T['_input']:
  T extends AnyField ? Infer<T['_type']> :
never

export type InferArgs<T extends AnyType> = T extends AnyObject ? {
  [K in keyof T['_shape']]: T['_shape'][K]['_args'] extends AnyArgs ? {
    [G in keyof T['_shape'][K]['_args']]: Infer<T['_shape'][K]['_args'][G]>
  } : never
} : never

// Work in progress
// export type InferArgsDeep<T extends AnyType> = T extends AnyObject ? {
//   [K in keyof T['_shape']]: T['_shape'][K]['_args'] extends AnyArgs ? {
//     [G in keyof T['_shape'][K]['_args']]: Infer<T['_shape'][K]['_args'][G]>
//   } : {
//     [Z in keyof Infer<T['_shape'][K]>]: T['_shape'][K]['_type']['_shape'] extends AnyArgs ? InferArgs<T['_shape'][K]['_type']>[Z]: InferArgsDeep<T['_shape'][K]['_type']['_shape']>
//   }
// } : never

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

type InferArg <T extends AnyArgs> = {
  [K in keyof T]: Infer<T[K]>
}

class GType<T extends ObjectType> extends Type<T> {
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

  description(text: string) {
    this.typeDef.description = text
    return this
  }
}

class GString extends Type<string> {
  _type: string
  typeDef: TypeDefinition<string>

  constructor(type: 'string' | 'id' = 'string') {
    super()
    this.typeDef = {
      type
    }
  }

  optional() {
    return new GOptional<this, never>(this)
  }

  list() {
    return new GList<this, never>(this)
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }

  args<X extends AnyArgs>(args: X) {
    return new GArgs<this, X>(this, args)
  }
}

class GNumber extends Type<number> {
  _type: number
  typeDef: TypeDefinition<number>

  constructor(type: 'int' | 'float' = 'int') {
    super()
    this.typeDef = {
      type
    }
  }

  optional() {
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

class GBoolean extends Type<boolean> {
  _type: boolean
  typeDef: TypeDefinition<boolean>

  constructor() {
    super()
    this.typeDef = {
      type: 'boolean'
    }
  }

  optional() {
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

class GEnum<T extends string> extends Type<T[]> {
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

class GUnion<T extends AnyType[]> extends Type<T> {
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

class GField<T extends AnyType> extends Type<T> {
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

class GScalar<I, O> extends Type<I> {
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

class GList<T extends AnyType, X extends AnyArgs> extends Type<T[]> {
  _type: T[]
  _inner: T
  _args: X
  typeDef: TypeDefinition<T[]>

  constructor(shape: AnyType) {
    super()
    this.typeDef = shape.typeDef
    this.typeDef.isList = true
  }

  optional() {
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

class GOptional<T extends AnyType, X extends AnyArgs> extends Type<T> {
  _inner: T
  _args: X
  typeDef: TypeDefinition<T>

  constructor(shape: T, isOptionalList?: boolean) {
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

class GArgs<T extends AnyType, X extends AnyArgs> {
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

  optional() {
    return new GOptional<this, X>(this)
  }

  // For future reference
  // resolve (fn: (parent: unknown, args: InferArg<X>, context: unknown, info: unknown) => Infer<T>) {
  //   this.typeDef.resolverFunction = fn
  //   return this
  // }
}

export const g = {
  type<T extends ObjectType>(name: string, shape: T) {
    return new GType<T>(name, shape)
  },
  string() {
    return new GString()
  },
  int() {
    return new GNumber('int')
  },
  float() {
    return new GNumber('float')
  },
  boolean() {
    return new GBoolean()
  },
  id() {
    return new GString('id')
  },
  enum<T extends string>(name: string, args: T[]) {
    return new GEnum<T>(name, args)
  },
  union<T extends AnyType[]>(name: string, ...args: T) {
    return new GUnion<T>(name, args)
  },
  field<T extends AnyType>(shape: T) {
    return new GField<T>(shape)
  },
  scalar<I, O>(name: string, options: ScalarOptions<I, O>) {
    return new GScalar<I, O>(name, options)
  },
  list<T extends AnyType>(shape: T) {
    return new GList<T, any>(shape)
  },
  optional<T extends AnyType>(shape: T) {
    return new GOptional<T, any>(shape)
  }
}
