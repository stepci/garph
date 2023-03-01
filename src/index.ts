import { convertSchema } from './converter'
import { InferClient, InferClientArgs } from './client'

type GarphType = 'String' | 'Int' | 'Float' | 'Boolean' | 'ID' | 'ObjectType' | 'InterfaceType' | 'InputType' | 'Scalar' | 'Enum' | 'List' | 'Union' | 'Ref' | 'Optional' | 'Args'

abstract class Type<T, X extends GarphType> {
  _is: X
  _shape: T
  typeDef: TypeDefinition<T>
}

type TypeDefinition<T> = {
  name?: string
  type: GarphType
  shape?: T
  args?: Args
  description?: string
  isOptional?: boolean
  isRequired?: boolean
  deprecated?: string
  scalarOptions?: ScalarOptions<any, any>
  defaultValue?: any
  interfaces?: AnyType[]
  resolverFunction?: (parent: unknown, args: any, context: any, info: any) => T // Add additional type-safety around this
}

export type AnyType = Type<any, any>
export type AnyString = Type<string, 'String'>
export type AnyID = Type<string, 'ID'>
export type AnyBoolean = Type<boolean, 'Boolean'>
export type AnyNumber = Type<number, any>
export type AnyInt = Type<number, 'Int'>
export type AnyFloat = Type<number, 'Float'>
export type AnyRef = Type<any, 'Ref'>
export type AnyList = Type<any, 'List'>
export type AnyUnion = InstanceType<typeof GUnion>
export type AnyEnum = InstanceType<typeof GEnum>
export type AnyScalar = Type<any, 'Scalar'>
export type AnyInput = Type<any, 'InputType'>
export type AnyInterface = Type<any, 'InterfaceType'>
export type AnyArgs = Type<any, 'Args'>
export type AnyOptional = Type<any, 'Optional'>
export type AnyObject = Type<any, 'ObjectType'>
export type AnyArgsInstance = InstanceType<typeof GArgs>
export type AnyObjectInstance = InstanceType<typeof GType>

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
  specifiedByUrl?: string
}

type InferResolverConfig = {
  context?: any
  info?: any
}

export type Infer<T> = T extends AnyObjectInstance ? {
  [K in keyof T['_inner']]: Infer<T['_inner'][K]>
}: T extends AnyInput | AnyInterface ? {
  [K in keyof T['_shape']]: Infer<T['_shape'][K]>
}: InferShallow<T>

export type InferShallow<T> =
  T extends AnyString | AnyID | AnyScalar | AnyNumber | AnyBoolean ? T['_shape'] :
  T extends AnyEnum ? T['_inner'] :
  T extends AnyUnion ? Infer<T['_inner']> :
  T extends AnyList ? Infer<T['_shape']>[] :
  T extends AnyOptional ? Infer<T['_shape']> | null | undefined :
  T extends AnyArgs | AnyRef ? Infer<T['_shape']> :
  T

export type InferArgs<T extends AnyType> = T extends AnyObject | AnyInterface ? {
  [K in keyof T['_shape']]: T['_shape'][K]['_args'] extends Args ? T['_shape'][K]['_args'] extends never ? never : {
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

type UnionToIntersection<T> =
  (T extends any ? (x: T) => any : never) extends
  (x: infer R) => any ? R : never

class GType<T extends ObjectType, X> extends Type<T, 'ObjectType'> {
  _inner: X

  constructor(name: string, shape: T, interfaces?: AnyInterface[]) {
    super()
    this.typeDef = {
      name,
      type: 'ObjectType',
      shape,
      interfaces
    }
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }

  implements<D extends AnyInterface>(ref: D | D[]) {
    return new GType<T, T & UnionToIntersection<D['_shape']>>(this.typeDef.name, this.typeDef.shape, Array.isArray(ref) ? ref : [ref])
  }
}

class GInput<T extends ObjectType> extends Type<T, 'InputType'> {
  constructor(name: string, shape: T) {
    super()
    this.typeDef = {
      name,
      type: 'InputType',
      shape
    }
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }
}

class GInterface<T extends ObjectType> extends Type<T, 'InterfaceType'> {
  constructor(name: string, shape: T) {
    super()
    this.typeDef = {
      name,
      type: 'InterfaceType',
      shape
    }
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }
}

class GString<T extends GarphType> extends Type<string, T> {
  constructor(type: 'String' | 'ID' = 'String') {
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

class GNumber<T extends GarphType> extends Type<number, T> {
  constructor(type: 'Int' | 'Float' = 'Int') {
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

class GBoolean extends Type<boolean, 'Boolean'> {
  constructor() {
    super()
    this.typeDef = {
      type: 'Boolean'
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

class GEnum<T extends string> extends Type<T[], 'Enum'> {
  _inner: T

  constructor(name: string, shape: T[]) {
    super()
    this.typeDef = {
      name,
      type: 'Enum',
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

class GUnion<T extends AnyType> extends Type<T[], 'Union'> {
  _inner: T

  constructor(name: string, shape: T[]) {
    super()
    this.typeDef = {
      name,
      type: 'Union',
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

class GRef<T> extends Type<T, 'Ref'> {
  constructor(ref: string | T) {
    super()
    this.typeDef = {
      name: typeof ref === 'string' ? ref : (ref as AnyType).typeDef.name,
      type: 'Ref'
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

class GScalar<I, O> extends Type<I,'Scalar'> {
  _output: O

  constructor(name: string, scalarOptions: ScalarOptions<I, O>) {
    super()
    this.typeDef = {
      name,
      type: 'Scalar',
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

  specifiedByUrl(url: string) {
    this.typeDef.scalarOptions.specifiedByUrl = url
    return this
  }
}

class GList<T extends AnyType, X extends Args> extends Type<T, 'List'> {
  _args: X

  constructor(shape: T) {
    super()
    this.typeDef = {
      type: 'List',
      shape: shape
    }
  }

  optional() {
    return new GOptional<this, X>(this)
  }

  required() {
    this.typeDef.isRequired = true
    return this
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

  args<X extends Args>(args: X) {
    return new GArgs<this, X>(this, args)
  }

  list() {
    return new GList<this, X>(this)
  }
}

class GOptional<T extends AnyType, X extends Args> extends Type<T, 'Optional'> {
  _args: X

  constructor(shape: T) {
    super()
    this.typeDef = shape.typeDef
    this.typeDef.isOptional = true
    this.typeDef.isRequired = false
  }

  list() {
    return new GList<this, X>(this)
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

  args<X extends Args>(args: X) {
    return new GArgs<this, X>(this, args)
  }
}

class GArgs<T extends AnyType, X extends Args> extends Type<T, 'Args'> {
  _args: X

  constructor(shape: T, args: X) {
    super()
    this.typeDef = shape.typeDef
    this.typeDef.args = args
  }

  optional() {
    return new GOptional<this, X>(this)
  }

  required() {
    this.typeDef.isRequired = true
    return this
  }

  list() {
    return new GList<this, X>(this)
  }

  description(text: string) {
    this.typeDef.description = text
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

const g = {
  type<T extends ObjectType>(name: string, shape: T) {
    return new GType<T, T>(name, shape)
  },
  inputType<T extends ObjectType>(name: string, shape: T) {
    return new GInput<T>(name, shape)
  },
  interface<T extends ObjectType>(name: string, shape: T) {
    return new GInterface<T>(name, shape)
  },
  string() {
    return new GString<'String'>()
  },
  id() {
    return new GString<'ID'>('ID')
  },
  int() {
    return new GNumber<'Int'>('Int')
  },
  float() {
    return new GNumber<'Float'>('Float')
  },
  boolean() {
    return new GBoolean()
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
  // list<T extends AnyType>(shape: T) {
  //   return new GList<T, any>(shape)
  // },
  // optional<T extends AnyType>(shape: T) {
  //   return new GOptional<T, any>(shape)
  // },
  ref<T>(ref: string | T) {
    return new GRef<T>(ref)
  }
}

export { g, convertSchema, InferClient, InferClientArgs }
