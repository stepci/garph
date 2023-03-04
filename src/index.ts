import { ConverterConfig, convertSchema } from './converter'
import { InferClient, InferClientTypes, InferClientTypesArgs, ClientTypes } from './client'
import { TSEnumType, UnionToIntersection, getEnumProperties } from './utils'

type GarphType = 'String' | 'Int' | 'Float' | 'Boolean' | 'ID' | 'ObjectType' | 'InterfaceType' | 'InputType' | 'Scalar' | 'Enum' | 'List' | 'Union' | 'Ref' | 'Nullable' | 'Args'

abstract class Type<T, X extends GarphType> {
  _is: X
  _inner: any
  _args: Args
  _shape: T
  typeDef: TypeDefinition<T>
}

type TypeDefinition<T> = {
  name?: string
  type: GarphType
  shape?: T
  args?: Args
  description?: string
  isNullable?: boolean
  isRequired?: boolean
  deprecated?: string
  scalarOptions?: ScalarOptions<any, any>
  defaultValue?: any
  interfaces?: AnyType[]
  // resolverFunction?: (parent: unknown, args: any, context: any, info: any) => T // Add additional type-safety around this
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
export type AnyUnion = Type<any, 'Union'>
export type AnyEnum = Type<any, 'Enum'>
export type AnyScalar = Type<any, 'Scalar'>
export type AnyInput = Type<any, 'InputType'>
export type AnyInterface = Type<any, 'InterfaceType'>
export type AnyArgs = Type<any, 'Args'>
export type AnyNullable = Type<any, 'Nullable'>
export type AnyObject = Type<any, 'ObjectType'>

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

// TODO: Refactor Args to get rid of this mess
export type Infer<T> = T extends AnyObject | AnyInterface ? {
  [K in keyof T['_inner'] as T['_inner'][K] extends AnyNullable ? never :
  T['_inner'][K] extends AnyArgs ?
  T['_inner'][K]['_shape'] extends AnyNullable ? never : K :
  K]: Infer<T['_inner'][K]>
} & {
  [K in keyof T['_inner'] as T['_inner'][K] extends AnyNullable ? K :
  T['_inner'][K] extends AnyArgs ?
  T['_inner'][K]['_shape'] extends AnyNullable ? K : never :
  never]?: Infer<T['_inner'][K]>
} : T extends AnyInput ? {
  [K in keyof T['_shape'] as T['_shape'][K] extends AnyNullable ? never :
  T['_shape'][K] extends AnyArgs ?
  T['_shape'][K]['_shape'] extends AnyNullable ? never : K :
  K]: Infer<T['_shape'][K]>
} & {
  [K in keyof T['_shape'] as T['_shape'][K] extends AnyNullable ? K :
  T['_shape'][K] extends AnyArgs ?
  T['_shape'][K]['_shape'] extends AnyNullable ? K : never :
  never]?: Infer<T['_shape'][K]>
} : InferShallow<T>

export type InferShallow<T> =
  T extends AnyString | AnyID | AnyScalar | AnyNumber | AnyBoolean ? T['_shape'] :
  T extends AnyEnum ? T['_inner'] :
  T extends AnyUnion ? Infer<T['_inner']> :
  T extends AnyList ? readonly Infer<T['_shape']>[] :
  T extends AnyNullable ? Infer<T['_shape']> | null | undefined :
  T extends AnyArgs | AnyRef ? Infer<T['_shape']> :
  T

export type InferArgs<T extends AnyType> = T extends AnyObject | AnyInterface ? {
  [K in keyof T['_inner']]: T['_inner'][K] extends AnyArgs ? {
    [G in keyof T['_inner'][K]['_args'] as T['_inner'][K]['_args'][G] extends AnyNullable ? never : G]: Infer<T['_inner'][K]['_args'][G]>
  } & {
    [G in keyof T['_inner'][K]['_args'] as T['_inner'][K]['_args'][G] extends AnyNullable ? G : never]?: Infer<T['_inner'][K]['_args'][G]>
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

class GType<T extends ObjectType, X> extends Type<T, 'ObjectType'> {
  declare _inner: X

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
    // This is temporary construct, until we figure out how to properly manage to shared schema
    this.typeDef.interfaces = Array.isArray(ref) ? ref : [ref]
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

class GInterface<T extends ObjectType, X> extends Type<T, 'InterfaceType'> {
  declare _inner: X

  constructor(name: string, shape: T, interfaces?: AnyInterface[]) {
    super()
    this.typeDef = {
      name,
      type: 'InterfaceType',
      shape,
      interfaces
    }
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }

  implements<D extends AnyInterface>(ref: D | D[]) {
    // This is temporary construct, until we figure out how to properly manage to shared schema
    this.typeDef.interfaces = Array.isArray(ref) ? ref : [ref]
    return new GInterface<T, T & UnionToIntersection<D['_shape']>>(this.typeDef.name, this.typeDef.shape, Array.isArray(ref) ? ref : [ref])
  }
}

class GString<T extends GarphType> extends Type<string, T> {
  constructor(type: 'String' | 'ID' = 'String') {
    super()
    this.typeDef = {
      type
    }
  }

  nullable() {
    return new GNullable<this>(this)
  }

  required() {
    this.typeDef.isRequired = true
    return this
  }

  list() {
    return new GList<this>(this)
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

  nullable() {
    return new GNullable<this>(this)
  }

  required() {
    this.typeDef.isRequired = true
    return this
  }

  list() {
    return new GList<this>(this)
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

  nullable() {
    return new GNullable<this>(this)
  }

  required() {
    this.typeDef.isRequired = true
    return this
  }

  list() {
    return new GList<this>(this)
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

class GEnum<T extends readonly string[] | TSEnumType> extends Type<readonly string[], 'Enum'> {
  declare _inner: T extends readonly string[] ? T[number] : keyof T

  constructor(name: string, shape: T) {
    super()

    let enumShape: readonly string[]
    if (Array.isArray(shape)) {
      enumShape = shape
    } else {
      enumShape = getEnumProperties(shape as TSEnumType)
    }

    this.typeDef = {
      name,
      type: 'Enum',
      shape: enumShape
    }
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }
}

class GUnion<T extends AnyObject> extends Type<T[], 'Union'> {
  declare _inner: T

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
}

class GRef<T> extends Type<T, 'Ref'> {
  constructor(ref: string | T) {
    super()
    this.typeDef = {
      name: typeof ref === 'string' ? ref : (ref as AnyType).typeDef.name,
      type: 'Ref'
    }
  }

  nullable() {
    return new GNullable<this>(this)
  }

  required() {
    this.typeDef.isRequired = true
    return this
  }

  list() {
    return new GList<this>(this)
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

class GScalar<I, O> extends Type<I, 'Scalar'> {
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

class GList<T extends AnyType> extends Type<T, 'List'> {
  constructor(shape: T) {
    super()
    this.typeDef = {
      type: 'List',
      shape: shape
    }
  }

  nullable() {
    return new GNullable<this>(this)
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
    return new GList<this>(this)
  }
}

class GNullable<T extends AnyType> extends Type<T, 'Nullable'> {
  constructor(shape: T) {
    super()
    this.typeDef = shape.typeDef
    this.typeDef.isNullable = true
    this.typeDef.isRequired = false
  }

  list() {
    return new GList<this>(this)
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
  declare _args: X

  constructor(shape: T, args: X) {
    super()
    this.typeDef = shape.typeDef
    this.typeDef.args = args
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

export class GarphSchema {
  types: AnyType[] = []

  buildSchema({ resolvers }: { resolvers: any }, config?: ConverterConfig) {
    return convertSchema({ types: this.types, resolvers }, config)
  }

  type<T extends ObjectType>(name: string, shape: T) {
    const t = new GType<T, T>(name, shape)
    this.types.push(t)
    return t
  }

  inputType<T extends ObjectType>(name: string, shape: T) {
    const t = new GInput<T>(name, shape)
    this.types.push(t)
    return t
  }

  enumType<T extends readonly string[] | TSEnumType>(name: string, args: T) {
    const t = new GEnum<T>(name, args)
    this.types.push(t)
    return t
  }

  unionType<T extends AnyObject>(name: string, args: T[]) {
    const t = new GUnion<T>(name, args)
    this.types.push(t)
    return t
  }

  scalarType<I, O>(name: string, options: ScalarOptions<I, O>) {
    const t = new GScalar<I, O>(name, options)
    this.types.push(t)
    return t
  }

  interface<T extends ObjectType>(name: string, shape: T) {
    const t = new GInterface<T, T>(name, shape)
    this.types.push(t)
    return t
  }

  string() {
    return new GString<'String'>()
  }

  id() {
    return new GString<'ID'>('ID')
  }

  int() {
    return new GNumber<'Int'>('Int')
  }

  float() {
    return new GNumber<'Float'>('Float')
  }

  boolean() {
    return new GBoolean()
  }

  ref<T>(ref: string | T) {
    return new GRef<T>(ref)
  }

  // enum<T extends string>(args: T[]) {
  //   return new GEnum<T>('', args)
  // }

  // union<T extends AnyType>(args: T[]) {
  //   return new GUnion<T>('', args)
  // }
}

export const g = new GarphSchema()
export { convertSchema }
