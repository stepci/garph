import { TSEnumType, UnionToIntersection, getEnumProperties, ObjectToUnion } from './utils'
import { buildSchema } from './schema'

type GarphType = 'String' | 'Int' | 'Float' | 'Boolean' | 'ID' | 'ObjectType' | 'InterfaceType' | 'InputType' | 'Scalar' | 'Enum' | 'List' | 'Union' | 'Ref' | 'Optional' | 'Args'

export abstract class Type<T, X extends GarphType> {
  _name?: string
  _is: X
  _inner?: any
  _args?: Args
  _shape: T
  typeDef: TypeDefinition<T>
}

export type TypeDefinition<T> = {
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
export type AnyOptional = Type<any, 'Optional'>
export type AnyObject = Type<any, 'ObjectType'>

export type Args = {
  [key: string]: AnyType
}

export type AnyTypes = {
  [key: string]: AnyType
}

export type AnyObjects = {
  [key: string]: AnyObject
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

type RefType = () => any

// TODO: Refactor Args to get rid of this mess
export type Infer<T> = T extends AnyInput | AnyObject | AnyInterface ? {
  __typename?: T['_name']
} & {
  [K in keyof T['_shape'] as T['_shape'][K] extends AnyOptional ? never :
  T['_shape'][K] extends AnyArgs ?
  T['_shape'][K]['_shape'] extends AnyOptional ? never : K :
  K]: Infer<T['_shape'][K]>
} & {
  [K in keyof T['_shape'] as T['_shape'][K] extends AnyOptional ? K :
  T['_shape'][K] extends AnyArgs ?
  T['_shape'][K]['_shape'] extends AnyOptional ? K : never :
  never]?: Infer<T['_shape'][K]>
} : InferShallow<T>

export type InferShallow<T> =
  T extends AnyString | AnyID | AnyScalar | AnyNumber | AnyBoolean ? T['_shape'] :
  T extends AnyEnum ? T['_inner'] :
  T extends AnyUnion ? Infer<ObjectToUnion<T['_inner']>> :
  T extends AnyList ? readonly Infer<T['_shape']>[] :
  T extends AnyOptional ? Infer<T['_shape']> | null | undefined :
  T extends AnyArgs ? Infer<T['_shape']> :
  T extends AnyRef ? Infer<ReturnType<T['_shape']>> :
  T

export type InferArgs<T extends AnyType> = T extends AnyObject | AnyInterface ? {
  [K in keyof T['_shape']]: T['_shape'][K] extends AnyArgs ? {
    [G in keyof T['_shape'][K]['_args'] as T['_shape'][K]['_args'][G] extends AnyOptional ? never : G]: Infer<T['_shape'][K]['_args'][G]>
  } & {
    [G in keyof T['_shape'][K]['_args'] as T['_shape'][K]['_args'][G] extends AnyOptional ? G : never]?: Infer<T['_shape'][K]['_args'][G]>
  } : never
} : never

export type InferResolvers<T extends AnyTypes, X extends InferResolverConfig> = {
  [K in keyof T]: {
    [G in keyof Infer<T[K]> as G extends '__typename' ? never : G]?: (parent: any, args: InferArgs<T[K]>[G], context: X['context'], info: X['info']) => Infer<T[K]>[G] | Promise<Infer<T[K]>[G]>
  }
}

export type InferResolversStrict<T extends AnyTypes, X extends InferResolverConfig> = {
  [K in keyof T]: {
    [G in keyof Infer<T[K]> as G extends '__typename' ? never : G]: (parent: any, args: InferArgs<T[K]>[G], context: X['context'], info: X['info']) => Infer<T[K]>[G] | Promise<Infer<T[K]>[G]>
  }
}

class GType<N extends string, T extends AnyTypes> extends Type<T, 'ObjectType'> {
  declare _name: N

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
    return new GType<N, T & UnionToIntersection<D['_shape']>>(this.typeDef.name, this.typeDef.shape as any, Array.isArray(ref) ? ref : [ref])
  }
}

class GInput<N extends string, T extends AnyTypes> extends Type<T, 'InputType'> {
  declare _name: N

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

class GInterface<N extends string, T extends AnyTypes> extends Type<T, 'InterfaceType'> {
  declare _name: N

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
    return new GInterface<N ,T & UnionToIntersection<D['_shape']>>(this.typeDef.name, this.typeDef.shape as any, Array.isArray(ref) ? ref : [ref])
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
    return new GOptional<this>(this)
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

  optional() {
    return new GOptional<this>(this)
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

  optional() {
    return new GOptional<this>(this)
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

class GEnum<N extends string, T extends readonly string[] | TSEnumType> extends Type<readonly string[], 'Enum'> {
  declare _name: N
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

class GUnion<N extends string, T extends AnyObjects> extends Type<T, 'Union'> {
  declare _inner: T

  constructor(name: string, shape: T) {
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
  constructor(ref: T) {
    super()
    this.typeDef = {
      shape: ref,
      type: 'Ref'
    }
  }

  optional() {
    return new GOptional<this>(this)
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

  constructor(name: string, scalarOptions?: ScalarOptions<I, O>) {
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

  optional() {
    return new GOptional<this>(this)
  }

  required() {
    this.typeDef.isRequired = true
    return this
  }

  description(text: string) {
    this.typeDef.description = text
    return this
  }

  default(value: Infer<T>[]) {
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

class GOptional<T extends AnyType> extends Type<T, 'Optional'> {
  constructor(shape: T) {
    super()
    this.typeDef = shape.typeDef
    this.typeDef.isOptional = true
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
}

export class GarphSchema {
  types: AnyType[] = []

  type<N extends string, T extends AnyTypes>(name: N, shape: T) {
    const t = new GType<N, T>(name, shape)
    this.types.push(t)
    return t
  }

  inputType<N extends string, T extends AnyTypes>(name: N, shape: T) {
    const t = new GInput<N, T>(name, shape)
    this.types.push(t)
    return t
  }

  enumType<N extends string, T extends readonly string[] | TSEnumType>(name: N, args: T) {
    const t = new GEnum<N, T>(name, args)
    this.types.push(t)
    return t
  }

  unionType<N extends string, T extends AnyObjects>(name: N, args: T) {
    const t = new GUnion<N, T>(name, args)
    this.types.push(t)
    return t
  }

  scalarType<I, O>(name: string, options?: ScalarOptions<I, O>) {
    const t = new GScalar<I, O>(name, options)
    this.types.push(t)
    return t
  }

  interface<N extends string, T extends AnyTypes>(name: N, shape: T) {
    const t = new GInterface<N, T>(name, shape)
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

  // The generic has to be any, because constraints cannot be applied to recursive types
  // This is a limitation of TypeScript
  ref<T>(ref: T) {
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
export { buildSchema }
