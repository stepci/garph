abstract class Type<T> {
  _shape: T
  typeDef: TypeDefinition<T>
}

type TypeDefinition<T> = {
  name?: string
  type: 'string' | 'int' | 'float' | 'boolean' | 'id' | 'type' | 'ref' | 'list' | 'union' | 'enum' | 'scalar' | 'input'
  shape?: T
  args?: Args
  description?: string
  isOptional?: boolean
  isRequired?: boolean
  deprecated?: string
  scalarOptions?: ScalarOptions<any, any>
  defaultValue?: any
  resolverFunction?: (parent: any, args: any, context: any, info: any) => T // Add additional type-safety around this
}

export type AnyType = Type<any>
export type AnyString = Type<string>
export type AnyBoolean = Type<boolean>
export type AnyNumber = Type<number>
export type AnyRef = InstanceType<typeof GRef>
export type AnyList = InstanceType<typeof GList>
export type AnyUnion = InstanceType<typeof GUnion>
export type AnyEnum = InstanceType<typeof GEnum>
export type AnyOptional = InstanceType<typeof GOptional>
export type AnyObject = InstanceType<typeof GType>
export type AnyScalar = InstanceType<typeof GScalar>
export type AnyArgs = InstanceType<typeof GArgs>

export type Args = {
  [key: string]: AnyType
}

export type ObjectType = {
  [key: string]: AnyType
}

type ScalarOptions<I, O> = {
  serialize: (value: I) => O
  parseValue: (value: O) => I
  parseLiteral?: (ast: any) => I
}

type InferResolverConfig = {
  context?: any
  info?: any
}

export type Infer<T> = T extends AnyObject ? {
  [K in keyof T['_shape']]: Infer<T['_shape'][K]>
} : T extends AnyString ? T['_shape'] :
T extends AnyBoolean ? T['_shape'] :
T extends AnyNumber ? T['_shape'] :
T extends AnyList ? readonly Infer<T['_shape']>[] :
T extends AnyOptional ? Infer<T['_shape']> | null | undefined :
T extends AnyArgs ? Infer<T['_inner']> :
T extends AnyUnion ? Infer<T['_inner']> :
T extends AnyEnum ? T['_inner'] :
T extends AnyScalar ? T['_shape'] :
T extends AnyRef ? Infer<T['_ref']> :
T

export type InferArgs<T extends AnyType> = T extends AnyObject ? {
  [K in keyof T['_shape']]: T['_shape'][K]['_args'] extends Args ? {
    [G in keyof T['_shape'][K]['_args']]: Infer<T['_shape'][K]['_args'][G]>
  } : never
} : never

export type InferResolvers<T extends ObjectType, X extends InferResolverConfig> = {
  [K in keyof T]: {
    [G in keyof Infer<T[K]>]?: (parent: any, args: InferArgs<T[K]>[G], context: X['context'], info: X['info']) => Infer<T[K]>[G] | Promise<Infer<T[K]>[G]>
  }
}

export type InferResolversStrict<T extends ObjectType, X extends InferResolverConfig> = {
  [K in keyof T]: {
    [G in keyof Infer<T[K]>]: (parent: any, args: InferArgs<T[K]>[G], context: X['context'], info: X['info']) => Infer<T[K]>[G] | Promise<Infer<T[K]>[G]>
  }
}

type InferArg<T extends Args> = {
  [K in keyof T]: Infer<T[K]>
}

class GType<T extends ObjectType> extends Type<T> {
  constructor(name: string, shape: T, type: 'type' | 'input' = 'type') {
    super()
    this.typeDef = {
      name,
      type,
      shape
    }
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }

  deprecated(reason: string) {
    this.typeDef.deprecated = reason
    return this
  }
}

class GString extends Type<string> {
  constructor(type: 'string' | 'id' = 'string') {
    super()
    this.typeDef = {
      type
    }
  }

  optional() {
    return new GOptional<this, never>(this)
  }

  required() {
    this.typeDef.isRequired = true
    return this
  }

  list() {
    return new GList<this, never>(this)
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }

  default(value: string) {
    this.typeDef.defaultValue = value
    return this
  }

  deprecated(reason: string) {
    this.typeDef.deprecated = reason
    return this
  }

  args<X extends Args>(args: X) {
    return new GArgs<this, X>(this, args)
  }
}

class GNumber extends Type<number> {
  constructor(type: 'int' | 'float' = 'int') {
    super()
    this.typeDef = {
      type
    }
  }

  optional() {
    return new GOptional<this, never>(this)
  }

  required() {
    this.typeDef.isRequired = true
    return this
  }

  list() {
    return new GList<this, never>(this)
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }

  default(value: number) {
    this.typeDef.defaultValue = value
    return this
  }

  deprecated(reason: string) {
    this.typeDef.deprecated = reason
    return this
  }

  args<X extends Args>(args: X) {
    return new GArgs<this, X>(this, args)
  }
}

class GBoolean extends Type<boolean> {
  constructor() {
    super()
    this.typeDef = {
      type: 'boolean'
    }
  }

  optional() {
    return new GOptional<this, never>(this)
  }

  required() {
    this.typeDef.isRequired = true
    return this
  }

  list() {
    return new GList<this, never>(this)
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }

  default(value: boolean) {
    this.typeDef.defaultValue = value
    return this
  }

  deprecated(reason: string) {
    this.typeDef.deprecated = reason
    return this
  }

  args<X extends Args>(args: X) {
    return new GArgs<this, X>(this, args)
  }
}

class GEnum<T extends string> extends Type<T[]> {
  _inner: T

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

  deprecated(reason: string) {
    this.typeDef.deprecated = reason
    return this
  }
}

class GUnion<T extends AnyType> extends Type<T[]> {
  _inner: T

  constructor(name: string, shape: T[]) {
    super()
    this.typeDef = {
      name,
      type: 'union',
      shape
    }
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }

  deprecated(reason: string) {
    this.typeDef.deprecated = reason
    return this
  }
}

class GRef<T> extends Type<T> {
  _ref: T

  constructor(ref: string | T) {
    super()
    this.typeDef = {
      name: typeof ref === 'string' ? ref : (ref as AnyType).typeDef.name,
      type: 'ref'
    }
  }

  optional() {
    return new GOptional<this, never>(this)
  }

  required() {
    this.typeDef.isRequired = true
    return this
  }

  list() {
    return new GList<this, never>(this)
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }

  default(value: Infer<T>) {
    this.typeDef.defaultValue = value
    return this
  }

  deprecated(reason: string) {
    this.typeDef.deprecated = reason
    return this
  }

  args<X extends Args>(x: X) {
    return new GArgs<this, X>(this, x)
  }
}

class GScalar<I, O> extends Type<I> {
  _output: O

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

  deprecated(reason: string) {
    this.typeDef.deprecated = reason
    return this
  }
}

class GList<T extends AnyType, X extends Args> extends Type<T> {
  _args: X

  constructor(shape: T) {
    super()
    this.typeDef = {
      ...shape.typeDef,
      type: 'list'
    }
  }

  optional() {
    return new GOptional<this, never>(this)
  }

  required() {
    this.typeDef.isRequired = true
    return this
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }

  default(value: any[]) {
    this.typeDef.defaultValue = value
    return this
  }

  deprecated(reason: string) {
    this.typeDef.deprecated = reason
    return this
  }

  args<X extends Args>(args: X) {
    return new GArgs<this, X>(this, args)
  }

  list() {
    return new GList<this, X>(this)
  }
}

class GOptional<T extends AnyType, X extends Args> extends Type<T> {
  _args: X

  constructor(shape: T) {
    super()
    this.typeDef = shape.typeDef
    this.typeDef.isOptional = true
    this.typeDef.isRequired = false
  }

  list() {
    return new GList<this, never>(this)
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }

  default(value) {
    this.typeDef.defaultValue = value
    return this
  }

  deprecated(reason: string) {
    this.typeDef.deprecated = reason
    return this
  }

  args<X extends Args>(args: X) {
    return new GArgs<this, X>(this, args)
  }
}

class GArgs<T extends AnyType, X extends Args> extends Type<T> {
  _inner: T
  _args: X

  constructor(shape: T, args: X) {
    super()
    this.typeDef = shape.typeDef
    this.typeDef.args = args
  }

  optional() {
    return new GOptional<this, never>(this)
  }

  required() {
    this.typeDef.isRequired = true
    return this
  }

  list() {
    return new GList<this, never>(this)
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }

  default(value) {
    this.typeDef.defaultValue = value
    return this
  }

  deprecated(reason: string) {
    this.typeDef.deprecated = reason
    return this
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
  inputType<T extends ObjectType>(name: string, shape: T) {
    return new GType<T>(name, shape, 'input')
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
  enumType<T extends string>(name: string, args: T[]) {
    return new GEnum<T>(name, args)
  },
  unionType<T extends AnyType>(name: string, args: T[]) {
    return new GUnion<T>(name, args)
  },
  // enum<T extends string>(args: T[]) {
  //   return new GEnum<T>('', args)
  // },
  // union<T extends AnyType>(args: T[]) {
  //   return new GUnion<T>('', args)
  // },
  scalarType<I, O>(name: string, options: ScalarOptions<I, O>) {
    return new GScalar<I, O>(name, options)
  },
  list<T extends AnyType>(shape: T) {
    return new GList<T, any>(shape)
  },
  optional<T extends AnyType>(shape: T) {
    return new GOptional<T, any>(shape)
  },
  ref<T>(ref: string | T) {
    return new GRef<T>(ref)
  }
}
