import type { GraphQLResolveInfo } from 'graphql'
import { TSEnumType, UnionToIntersection, getEnumProperties, ObjectToUnion, ExpandRecursively, MaybePromise, MaybeFunction } from './utils'
import { buildSchema, printSchema } from './schema'

type GraphQLRootType = 'Query' | 'Mutation' | 'Subscription'
type GarphType = 'String' | 'Int' | 'Float' | 'Boolean' | 'ID' | 'ObjectType' | 'InterfaceType' | 'InputType' | 'Scalar' | 'Enum' | 'List' | 'PaginatedList' | 'Union' | 'Ref' | 'Optional' | 'Args' | 'OmitResolver'

export abstract class Type<T, X extends GarphType> {
  _name?: string
  _is: X
  _inner?: any
  _output?: any
  _args?: Args
  _shape: T
  typeDef: TypeDefinition<T>

  description(text: string) {
    this.typeDef.description = text
    return this
  }

  deprecated(reason: string) {
    this.typeDef.deprecated = reason
    return this
  }
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
  interfaces?: AnyInterface[]
  extend?: AnyTypes[]
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
export type AnyPaginatedList = Type<any, 'PaginatedList'>
export type AnyUnion = Type<any, 'Union'>
export type AnyEnum = Type<any, 'Enum'>
export type AnyScalar = Type<any, 'Scalar'>
export type AnyInput = Type<any, 'InputType'>
export type AnyInterface = Type<any, 'InterfaceType'>
export type AnyArgs = Type<any, 'Args'>
export type AnyOptional = Type<any, 'Optional'>
export type AnyObject = Type<any, 'ObjectType'>
export type AnyOmitResolver = Type<any, 'OmitResolver'>

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
}

type InferOptions = {
  omitResolver?: AnyOmitResolver | never
}

type RefType = () => AnyType

// TODO: Refactor Args to get rid of this mess
export type Infer<T, options extends InferOptions = { omitResolver: never }> = ExpandRecursively<InferRaw<T, options>>
export type InferRaw<T, options extends InferOptions = { omitResolver: never }> = T extends AnyInput | AnyObject | AnyInterface ? {
  __typename?: T['_name']
} & {
  [K in keyof T['_shape'] as T['_shape'][K] extends AnyOptional | options['omitResolver'] ? never :
  T['_shape'][K] extends AnyArgs ?
  T['_shape'][K]['_shape'] extends AnyOptional | options['omitResolver'] ? never : K :
  K]: InferRaw<T['_shape'][K], options>
} & {
  [K in keyof T['_shape'] as T['_shape'][K] extends AnyOptional | options['omitResolver'] ? K :
  T['_shape'][K] extends AnyArgs ?
  T['_shape'][K]['_shape'] extends AnyOptional | options['omitResolver'] ? K : never :
  never]?: InferRaw<T['_shape'][K], options>
} : InferShallow<T, options>

export type InferShallow<T, options extends InferOptions = { omitResolver: never }> =
  T extends AnyString | AnyID | AnyScalar | AnyNumber | AnyBoolean ? T['_shape'] :
  T extends AnyEnum ? T['_inner'] :
  T extends AnyUnion ? InferRaw<ObjectToUnion<T['_inner']>, options> :
  T extends AnyList ? InferRaw<T['_shape'], options>[] :
  T extends AnyPaginatedList ? T['_inner'] :
  T extends AnyOptional ? InferRaw<T['_shape'], options> | null | undefined :
  T extends AnyOmitResolver ? InferRaw<T['_shape'], options> :
  T extends AnyArgs ? InferRaw<T['_shape'], options> :
  T extends AnyRef ? InferRaw<T['_inner'], options> :
  T

export type InferArgs<T extends AnyType> = ExpandRecursively<InferArgsRaw<T>>
export type InferArgsRaw<T extends AnyType> = T extends AnyObject | AnyInterface ? {
  [K in keyof T['_shape']]: InferArgRaw<T['_shape'][K]>
} : never

export type InferArg<T> = ExpandRecursively<InferArgRaw<T>>
export type InferArgRaw<T> = T extends AnyArgs ? {
  [K in keyof T['_args'] as T['_args'][K] extends AnyOptional ? never : K]: InferRaw<T['_args'][K]>
} & {
  [K in keyof T['_args'] as T['_args'][K] extends AnyOptional ? K : never]?: InferRaw<T['_args'][K]>
}: never

export type InferUnionNames<T> = T extends AnyUnion ? ObjectToUnion<T['_inner']>['_name'] : never

export type InferResolvers<T extends AnyTypes, X extends InferResolverConfig> = {
  [K in keyof T]: K extends 'Subscription' ? {
    [G in keyof T[K]['_shape']]?: {
      subscribe: (parent: {}, args: InferArg<T[K]['_shape'][G]>, context: X['context'], info: GraphQLResolveInfo) => MaybePromise<AsyncIterator<{[S in G]: Infer<T[K]['_shape'][G], { omitResolver: AnyOmitResolver }>}>>
      resolve?: (value: Infer<T[K]['_shape'][G]>, args: InferArg<T[K]['_shape'][G]>, context: X['context'], info: GraphQLResolveInfo) => MaybePromise<Infer<T[K]['_shape'][G], { omitResolver: AnyOmitResolver }>>
    }
  } : {
    [G in keyof T[K]['_shape']]?: (parent: K extends GraphQLRootType ? {} : Infer<T[K]>, args: InferArg<T[K]['_shape'][G]>, context: X['context'], info: GraphQLResolveInfo) => MaybePromise<MaybeFunction<Infer<T[K]['_shape'][G], { omitResolver: AnyOmitResolver }>>> | AsyncGenerator<Infer<T[K]['_shape'][G]['_shape'], { omitResolver: AnyOmitResolver }>>
  } | {
    [G in keyof T[K]['_shape']]?: {
      resolve: (parent: K extends GraphQLRootType ? {} : Infer<T[K]>, args: InferArg<T[K]['_shape'][G]>, context: X['context'], info: GraphQLResolveInfo) => MaybePromise<Infer<T[K]['_shape'][G], { omitResolver: AnyOmitResolver }>> | AsyncGenerator<Infer<T[K]['_shape'][G]['_shape'], { omitResolver: AnyOmitResolver }>>
    } | {
      load: (queries: { parent: K extends GraphQLRootType ? {} : Infer<T[K]>, args: InferArg<T[K]['_shape'][G]>, context: X['context'], info: GraphQLResolveInfo } []) => MaybePromise<Infer<T[K]['_shape'][G], { omitResolver: AnyOmitResolver }>[]>
    } | {
      loadBatch: (queries: { parent: K extends GraphQLRootType ? {} : Infer<T[K]>, args: InferArg<T[K]['_shape'][G]>, context: X['context'], info: GraphQLResolveInfo } []) => MaybePromise<Infer<T[K]['_shape'][G], { omitResolver: AnyOmitResolver }>[]>
    }
  } & {
    __isTypeOf?: (parent: Infer<T[K]>, context: X['context'], info: GraphQLResolveInfo) => MaybePromise<boolean>
    __resolveType?: (parent: Infer<T[K]>, context: X['context'], info: GraphQLResolveInfo) => MaybePromise<InferUnionNames<T[K]>>
  }
}

export type InferResolversStrict<T extends AnyTypes, X extends InferResolverConfig> = {
  [K in keyof T]: K extends 'Subscription' ? {
    [G in keyof T[K]['_shape']]: {
      subscribe: (parent: {}, args: InferArg<T[K]['_shape'][G]>, context: X['context'], info: GraphQLResolveInfo) => MaybePromise<AsyncIterator<{[S in G]: Infer<T[K]['_shape'][G], { omitResolver: AnyOmitResolver }>}>>
      resolve?: (value: Infer<T[K]['_shape'][G]>, args: InferArg<T[K]['_shape'][G]>, context: X['context'], info: GraphQLResolveInfo) => MaybePromise<Infer<T[K]['_shape'][G], { omitResolver: AnyOmitResolver }>>
    }
  } : {
    [G in keyof T[K]['_shape']]: (parent: K extends GraphQLRootType ? {} : Infer<T[K]>, args: InferArg<T[K]['_shape'][G]>, context: X['context'], info: GraphQLResolveInfo) => MaybePromise<MaybeFunction<Infer<T[K]['_shape'][G], { omitResolver: AnyOmitResolver }>>> | AsyncGenerator<Infer<T[K]['_shape'][G]['_shape'], { omitResolver: AnyOmitResolver }>>
  } | {
    [G in keyof T[K]['_shape']]: {
      resolve: (parent: K extends GraphQLRootType ? {} : Infer<T[K]>, args: InferArg<T[K]['_shape'][G]>, context: X['context'], info: GraphQLResolveInfo) => MaybePromise<Infer<T[K]['_shape'][G], { omitResolver: AnyOmitResolver }>> | AsyncGenerator<Infer<T[K]['_shape'][G]['_shape'], { omitResolver: AnyOmitResolver }>>
    } | {
      load: (queries: { parent: K extends GraphQLRootType ? {} : Infer<T[K]>, args: InferArg<T[K]['_shape'][G]>, context: X['context'], info: GraphQLResolveInfo } []) => MaybePromise<Infer<T[K]['_shape'][G], { omitResolver: AnyOmitResolver }>>[]
    } | {
      loadBatch: (queries: { parent: K extends GraphQLRootType ? {} : Infer<T[K]>, args: InferArg<T[K]['_shape'][G]>, context: X['context'], info: GraphQLResolveInfo } []) => MaybePromise<Infer<T[K]['_shape'][G], { omitResolver: AnyOmitResolver }>>[]
    }
  } & {
    __isTypeOf?: (parent: Infer<T[K]>, context: X['context'], info: GraphQLResolveInfo) => MaybePromise<boolean>
    __resolveType?: (parent: Infer<T[K]>, context: X['context'], info: GraphQLResolveInfo) => MaybePromise<InferUnionNames<T[K]>>
  }
}

class GType<N extends string, T extends AnyTypes> extends Type<T, 'ObjectType'> {
  declare _name: N

  constructor(name: string, shape: T, interfaces?: AnyInterface[], extend?: AnyTypes[]) {
    super()
    this.typeDef = {
      name,
      type: 'ObjectType',
      shape,
      interfaces,
      extend
    }
  }

  implements<D extends AnyInterface>(ref: D | D[]) {
    // This is temporary construct, until we figure out how to properly manage to shared schema
    this.typeDef.interfaces = Array.isArray(ref) ? ref : [ref]
    return new GType<N, T & UnionToIntersection<D['_shape']>>(this.typeDef.name, this.typeDef.shape as any, Array.isArray(ref) ? ref : [ref], this.typeDef.extend)
  }

  extend<D extends AnyTypes>(ref: D | D[]) {
    // This is temporary construct, until we figure out how to properly manage to shared schema
    this.typeDef.extend = Array.isArray(ref) ? ref : [ref]
    return new GType<N, T & UnionToIntersection<D>>(this.typeDef.name, this.typeDef.shape as any, this.typeDef.interfaces, Array.isArray(ref) ? ref : [ref])
  }
}

class GInput<N extends string, T extends AnyTypes> extends Type<T, 'InputType'> {
  declare _name: N

  constructor(name: string, shape: T, extend?: AnyTypes[]) {
    super()
    this.typeDef = {
      name,
      type: 'InputType',
      shape,
      extend
    }
  }

  extend<D extends AnyTypes>(ref: D | D[]) {
    // This is temporary construct, until we figure out how to properly manage to shared schema
    this.typeDef.extend = Array.isArray(ref) ? ref : [ref]
    return new GInput<N, T & UnionToIntersection<D>>(this.typeDef.name, this.typeDef.shape as any, Array.isArray(ref) ? ref : [ref])
  }
}

class GInterface<N extends string, T extends AnyTypes> extends Type<T, 'InterfaceType'> {
  declare _name: N

  constructor(name: string, shape: T, interfaces?: AnyInterface[], extend?: AnyTypes[]) {
    super()
    this.typeDef = {
      name,
      type: 'InterfaceType',
      shape,
      interfaces,
      extend
    }
  }

  implements<D extends AnyInterface>(ref: D | D[]) {
    // This is temporary construct, until we figure out how to properly manage to shared schema
    this.typeDef.interfaces = Array.isArray(ref) ? ref : [ref]
    return new GInterface<N ,T & UnionToIntersection<D['_shape']>>(this.typeDef.name, this.typeDef.shape as any, Array.isArray(ref) ? ref : [ref], this.typeDef.extend)
  }

  extend<D extends AnyTypes>(ref: D | D[]) {
    // This is temporary construct, until we figure out how to properly manage to shared schema
    this.typeDef.extend = Array.isArray(ref) ? ref : [ref]
    return new GInterface<N, T & UnionToIntersection<D>>(this.typeDef.name, this.typeDef.shape as any, this.typeDef.interfaces, Array.isArray(ref) ? ref : [ref])
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

  default(value: string) {
    this.typeDef.defaultValue = value
    return this
  }

  omitResolver () {
    return new GOmitResolver<this>(this)
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

  default(value: number) {
    this.typeDef.defaultValue = value
    return this
  }

  omitResolver () {
    return new GOmitResolver<this>(this)
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

  default(value: boolean) {
    this.typeDef.defaultValue = value
    return this
  }

  omitResolver () {
    return new GOmitResolver<this>(this)
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
}

class GUnion<N extends string, T extends AnyObjects> extends Type<T, 'Union'> {
  declare _name: N
  declare _inner: T

  constructor(name: string, shape: T) {
    super()
    this.typeDef = {
      name,
      type: 'Union',
      shape
    }
  }
}

class GRef<T> extends Type<T, 'Ref'> {
  declare _inner: T extends RefType ? ReturnType<T> : T

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

  paginatedList() {
    return new GPaginatedList<this>(this)
  }

  default(value: InferRaw<this['_inner']>) {
    this.typeDef.defaultValue = value
    return this
  }

  omitResolver () {
    return new GOmitResolver<this>(this)
  }

  args<X extends Args>(x: X) {
    return new GArgs<this, X>(this, x)
  }
}

class GScalar<I, O> extends Type<I, 'Scalar'> {
  declare _output: O

  constructor(name: string, scalarOptions?: ScalarOptions<I, O>) {
    super()
    this.typeDef = {
      name,
      type: 'Scalar',
      scalarOptions
    }
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

  default(value: typeof this._inner) {
    this.typeDef.defaultValue = value
    return this
  }

  omitResolver () {
    return new GOmitResolver<this>(this)
  }

  args<X extends Args>(args: X) {
    return new GArgs<this, X>(this, args)
  }

  list() {
    return new GList<this>(this)
  }
}

class GPaginatedList<T extends AnyType> extends Type<T, 'PaginatedList'> {
  declare _inner: {
    edges: {
      node: InferRaw<T>
      cursor: string
    }[]
    pageInfo: {
      hasNextPage: boolean,
      hasPreviousPage: boolean,
      startCursor?: string,
      endCursor?: string
    }
  }

  constructor(shape: T) {
    super()
    this.typeDef = {
      type: 'PaginatedList',
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

  omitResolver () {
    return new GOmitResolver<this>(this)
  }

  args<X extends Args>(args: X) {
    return new GArgs<this, X>(this, args)
  }

  // list() {
  //   return new GList<this>(this)
  // }
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

  default(value: InferRaw<T>) {
    this.typeDef.defaultValue = value
    return this
  }

  omitResolver () {
    return new GOmitResolver<this>(this)
  }

  args<X extends Args>(args: X) {
    return new GArgs<this, X>(this, args)
  }
}

class GOmitResolver<T extends AnyType> extends Type<T, 'OmitResolver'> {
  constructor(shape: T) {
    super()
    this.typeDef = shape.typeDef
  }

  optional() {
    return new GOptional<this>(this)
  }

  required() {
    this.typeDef.isRequired = true
    return this
  }

  default(value: InferRaw<T>) {
    this.typeDef.defaultValue = value
    return this
  }

  args<X extends Args>(args: X) {
    return new GArgs<this, X>(this, args)
  }

  list() {
    return new GList<this>(this)
  }
}

class GArgs<T extends AnyType, X extends Args> extends Type<T, 'Args'> {
  declare _args: X

  constructor(shape: T, args: X) {
    super()
    this.typeDef = shape.typeDef
    this.typeDef.args = args
  }
}

export class GarphSchema {
  types: Map<string, AnyType> = new Map()

  nodeType = this.interface('Node', {
    id: this.id()
  })

  pageInfoType = this.type('PageInfo', {
    hasNextPage: this.boolean(),
    hasPreviousPage: this.boolean(),
    startCursor: this.string().optional(),
    endCursor: this.string().optional()
  })

  pageInfoArgs = {
    first: this.int().optional(),
    last: this.int().optional(),
    before: this.id().optional(),
    after: this.id().optional()
  }

  registerType(type: AnyType) {
    const name = type.typeDef.name
    if (!['Node', 'PageInfo'].includes(name) && this.types.has(name)) throw new Error(`Type with name "${name}" already exists`)
    this.types.set(name, type)
  }

  constructor ({ types }: { types: AnyType[] } = { types: [] }) {
    types.forEach(t => this.registerType(t))
  }

  type<N extends string, T extends AnyTypes>(name: N, shape: T) {
    const t = new GType<N, T>(name, shape)
    this.registerType(t)
    return t
  }

  node<N extends string, T extends AnyTypes>(name: N, shape: T) {
    const t = new GType<N, T>(name, shape).implements(this.nodeType)
    this.registerType(t)
    return t
  }

  connection<N extends string, T extends AnyRef>(name: N, shape: T) {
    const t = new GType(name, {
      edges: new GList(shape),
      pageInfo: this.pageInfoType
    })

    this.registerType(t)
    return t
  }

  edge<N extends string, T extends AnyRef>(name: N, shape: T) {
    const t = new GType<N, {
      node: T
      cursor: AnyString
    }>(name, {
      node: shape,
      cursor: g.string()
    })

    this.registerType(t)
    return t
  }

  inputType<N extends string, T extends AnyTypes>(name: N, shape: T) {
    const t = new GInput<N, T>(name, shape)
    this.registerType(t)
    return t
  }

  enumType<N extends string, T extends readonly string[] | TSEnumType>(name: N, args: T) {
    const t = new GEnum<N, T>(name, args)
    this.registerType(t)
    return t
  }

  unionType<N extends string, T extends AnyObjects>(name: N, args: T) {
    const t = new GUnion<N, T>(name, args)
    this.registerType(t)
    return t
  }

  scalarType<I, O>(name: string, options?: ScalarOptions<I, O>) {
    const t = new GScalar<I, O>(name, options)
    this.registerType(t)
    return t
  }

  interface<N extends string, T extends AnyTypes>(name: N, shape: T) {
    const t = new GInterface<N, T>(name, shape)
    this.registerType(t)
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

export { buildSchema, printSchema }
