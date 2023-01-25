abstract class AnyType <T> {
  _type: T
  typeDef: TypeDefinition<T>
}

type AnyXType = AnyType<any>

type AnyThing = {
  _type: string | boolean
}

type AnyArray = {
  _type: any[]
  _inner: any
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

type TypeDefinition <T> = {
  type: string
  shape?: T
  description?: string
  isOptional?: boolean
  isArray?: boolean
  isOptionalArray?: boolean
}

export type Infer <T extends AnyXType> = T extends AnyObject ? {
  [K in keyof T['_shape']]: Infer<T['_shape'][K]>
} : T extends AnyThing ? T['_type'] : T extends AnyArray ? Infer<T['_inner']>[] : T extends AnyOptional ? Infer<T['_inner']> | undefined : never

class ZArray <T extends AnyXType> extends AnyType<T[]> {
  _type: T[]
  _inner: T
  typeDef: TypeDefinition<T[]>

  constructor (shape: AnyXType) {
    super()
    this.typeDef = shape.typeDef
    this.typeDef.isArray = true
  }

  optional () {
    return new ZOptional<this>(this, true)
  }
}

class ZOptional <T> extends AnyType<T> {
  _inner: T
  typeDef: TypeDefinition<T>

  constructor (shape: AnyXType, isOptionalArray?: boolean) {
    super()
    this.typeDef = shape.typeDef
    this.typeDef.isOptional = true

    if (isOptionalArray) this.typeDef.isOptionalArray = true
  }

  array () {
    return new ZArray<this>(this)
  }

  description (text: string) {
    this.typeDef.description = text
    return this
  }
}

class ZObject <T> extends AnyType<T> {
  _shape: T
  typeDef: TypeDefinition<T>

  constructor (shape: T) {
    super()
    this.typeDef = {
      type: 'object',
      shape
    }
  }

  optional () {
    return new ZOptional<this>(this)
  }

  array () {
    return new ZArray<this>(this)
  }

  description (text: string) {
    this.typeDef.description = text
    return this
  }
}

class ZString extends AnyType<string> {
  _type: string
  typeDef: TypeDefinition<string>

  constructor () {
    super()
    this.typeDef = {
      type: 'string'
    }
  }

  optional () {
    return new ZOptional<this>(this)
  }

  array () {
    return new ZArray<this>(this)
  }

  description (text: string) {
    this.typeDef.description = text
    return this
  }
}

export const z = {
  object <T extends ObjectType> (shape: T) {
    return new ZObject<T>(shape)
  },
  string () {
    return new ZString()
  },
  array <T extends AnyXType> (shape: T) {
    return new ZArray<T>(shape)
  }
}
