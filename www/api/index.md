garph

# garph

## Classes

- [GarphSchema](classes/GarphSchema.md)
- [Type](classes/Type.md)

## Type Aliases

### AnyArgs

Ƭ **AnyArgs**: [`Type`](classes/Type.md)<`any`, ``"Args"``\>

#### Defined in

[index.ts:58](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L58)

___

### AnyBoolean

Ƭ **AnyBoolean**: [`Type`](classes/Type.md)<`boolean`, ``"Boolean"``\>

#### Defined in

[index.ts:46](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L46)

___

### AnyEnum

Ƭ **AnyEnum**: [`Type`](classes/Type.md)<`any`, ``"Enum"``\>

#### Defined in

[index.ts:54](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L54)

___

### AnyFloat

Ƭ **AnyFloat**: [`Type`](classes/Type.md)<`number`, ``"Float"``\>

#### Defined in

[index.ts:49](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L49)

___

### AnyID

Ƭ **AnyID**: [`Type`](classes/Type.md)<`string`, ``"ID"``\>

#### Defined in

[index.ts:45](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L45)

___

### AnyInput

Ƭ **AnyInput**: [`Type`](classes/Type.md)<`any`, ``"InputType"``\>

#### Defined in

[index.ts:56](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L56)

___

### AnyInt

Ƭ **AnyInt**: [`Type`](classes/Type.md)<`number`, ``"Int"``\>

#### Defined in

[index.ts:48](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L48)

___

### AnyInterface

Ƭ **AnyInterface**: [`Type`](classes/Type.md)<`any`, ``"InterfaceType"``\>

#### Defined in

[index.ts:57](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L57)

___

### AnyList

Ƭ **AnyList**: [`Type`](classes/Type.md)<`any`, ``"List"``\>

#### Defined in

[index.ts:51](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L51)

___

### AnyNumber

Ƭ **AnyNumber**: [`Type`](classes/Type.md)<`number`, `any`\>

#### Defined in

[index.ts:47](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L47)

___

### AnyObject

Ƭ **AnyObject**: [`Type`](classes/Type.md)<`any`, ``"ObjectType"``\>

#### Defined in

[index.ts:60](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L60)

___

### AnyObjects

Ƭ **AnyObjects**: `Object`

#### Index signature

▪ [key: `string`]: [`AnyObject`](index.md#anyobject)

#### Defined in

[index.ts:71](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L71)

___

### AnyOmitResolver

Ƭ **AnyOmitResolver**: [`Type`](classes/Type.md)<`any`, ``"OmitResolver"``\>

#### Defined in

[index.ts:61](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L61)

___

### AnyOptional

Ƭ **AnyOptional**: [`Type`](classes/Type.md)<`any`, ``"Optional"``\>

#### Defined in

[index.ts:59](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L59)

___

### AnyPaginatedList

Ƭ **AnyPaginatedList**: [`Type`](classes/Type.md)<`any`, ``"PaginatedList"``\>

#### Defined in

[index.ts:52](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L52)

___

### AnyRef

Ƭ **AnyRef**: [`Type`](classes/Type.md)<`any`, ``"Ref"``\>

#### Defined in

[index.ts:50](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L50)

___

### AnyScalar

Ƭ **AnyScalar**: [`Type`](classes/Type.md)<`any`, ``"Scalar"``\>

#### Defined in

[index.ts:55](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L55)

___

### AnyString

Ƭ **AnyString**: [`Type`](classes/Type.md)<`string`, ``"String"``\>

#### Defined in

[index.ts:44](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L44)

___

### AnyType

Ƭ **AnyType**: [`Type`](classes/Type.md)<`any`, `any`\>

#### Defined in

[index.ts:43](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L43)

___

### AnyTypes

Ƭ **AnyTypes**: `Object`

#### Index signature

▪ [key: `string`]: [`AnyType`](index.md#anytype)

#### Defined in

[index.ts:67](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L67)

___

### AnyUnion

Ƭ **AnyUnion**: [`Type`](classes/Type.md)<`any`, ``"Union"``\>

#### Defined in

[index.ts:53](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L53)

___

### Args

Ƭ **Args**: `Object`

#### Index signature

▪ [key: `string`]: [`AnyType`](index.md#anytype)

#### Defined in

[index.ts:63](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L63)

___

### Infer

Ƭ **Infer**<`T`, `options`\>: `ExpandRecursively`<[`InferRaw`](index.md#inferraw)<`T`, `options`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `options` | extends `InferOptions` = { `omitResolver`: `never`  } |

#### Defined in

[index.ts:93](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L93)

___

### InferArg

Ƭ **InferArg**<`T`\>: `ExpandRecursively`<[`InferArgRaw`](index.md#inferargraw)<`T`\>\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[index.ts:125](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L125)

___

### InferArgRaw

Ƭ **InferArgRaw**<`T`\>: `T` extends [`AnyArgs`](index.md#anyargs) ? { [K in keyof T["\_args"] as T["\_args"][K] extends AnyOptional ? never : K]: InferRaw<T["\_args"][K]\> } & { [K in keyof T["\_args"] as T["\_args"][K] extends AnyOptional ? K : never]?: InferRaw<T["\_args"][K]\> } : `never`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[index.ts:126](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L126)

___

### InferArgs

Ƭ **InferArgs**<`T`\>: `ExpandRecursively`<[`InferArgsRaw`](index.md#inferargsraw)<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`AnyType`](index.md#anytype) |

#### Defined in

[index.ts:120](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L120)

___

### InferArgsRaw

Ƭ **InferArgsRaw**<`T`\>: `T` extends [`AnyObject`](index.md#anyobject) \| [`AnyInterface`](index.md#anyinterface) ? { [K in keyof T["\_shape"]]: InferArgRaw<T["\_shape"][K]\> } : `never`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`AnyType`](index.md#anytype) |

#### Defined in

[index.ts:121](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L121)

___

### InferRaw

Ƭ **InferRaw**<`T`, `options`\>: `T` extends [`AnyInput`](index.md#anyinput) \| [`AnyObject`](index.md#anyobject) \| [`AnyInterface`](index.md#anyinterface) ? { `__typename?`: `T`[``"_name"``]  } & { [K in keyof T["\_shape"] as T["\_shape"][K] extends AnyOptional \| options["omitResolver"] ? never : T["\_shape"][K] extends AnyArgs ? T["\_shape"][K]["\_shape"] extends AnyOptional \| options["omitResolver"] ? never : K : K]: InferRaw<T["\_shape"][K], options\> } & { [K in keyof T["\_shape"] as T["\_shape"][K] extends AnyOptional \| options["omitResolver"] ? K : T["\_shape"][K] extends AnyArgs ? T["\_shape"][K]["\_shape"] extends AnyOptional \| options["omitResolver"] ? K : never : never]?: InferRaw<T["\_shape"][K], options\> } : [`InferShallow`](index.md#infershallow)<`T`, `options`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `options` | extends `InferOptions` = { `omitResolver`: `never`  } |

#### Defined in

[index.ts:94](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L94)

___

### InferResolvers

Ƭ **InferResolvers**<`T`, `X`\>: { [K in keyof T]: K extends "Subscription" ? { [G in keyof T[K]["\_shape"]]?: Object } : { [G in keyof T[K]["\_shape"]]?: Function } \| { [G in keyof T[K]["\_shape"]]?: Object \| Object \| Object } & Object }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`AnyTypes`](index.md#anytypes) |
| `X` | extends `InferResolverConfig` |

#### Defined in

[index.ts:134](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L134)

___

### InferResolversStrict

Ƭ **InferResolversStrict**<`T`, `X`\>: { [K in keyof T]: K extends "Subscription" ? { [G in keyof T[K]["\_shape"]]: Object } : { [G in keyof T[K]["\_shape"]]: Function } \| { [G in keyof T[K]["\_shape"]]: Object \| Object \| Object } & Object }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`AnyTypes`](index.md#anytypes) |
| `X` | extends `InferResolverConfig` |

#### Defined in

[index.ts:156](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L156)

___

### InferShallow

Ƭ **InferShallow**<`T`, `options`\>: `T` extends [`AnyString`](index.md#anystring) \| [`AnyID`](index.md#anyid) \| [`AnyScalar`](index.md#anyscalar) \| [`AnyNumber`](index.md#anynumber) \| [`AnyBoolean`](index.md#anyboolean) ? `T`[``"_shape"``] : `T` extends [`AnyEnum`](index.md#anyenum) ? `T`[``"_inner"``] : `T` extends [`AnyUnion`](index.md#anyunion) ? [`InferRaw`](index.md#inferraw)<`ObjectToUnion`<`T`[``"_inner"``]\>, `options`\> : `T` extends [`AnyList`](index.md#anylist) ? [`InferRaw`](index.md#inferraw)<`T`[``"_shape"``], `options`\>[] : `T` extends [`AnyPaginatedList`](index.md#anypaginatedlist) ? `T`[``"_inner"``] : `T` extends [`AnyOptional`](index.md#anyoptional) ? [`InferRaw`](index.md#inferraw)<`T`[``"_shape"``], `options`\> \| ``null`` \| `undefined` : `T` extends [`AnyOmitResolver`](index.md#anyomitresolver) ? [`InferRaw`](index.md#inferraw)<`T`[``"_shape"``], `options`\> : `T` extends [`AnyArgs`](index.md#anyargs) ? [`InferRaw`](index.md#inferraw)<`T`[``"_shape"``], `options`\> : `T` extends [`AnyRef`](index.md#anyref) ? [`InferRaw`](index.md#inferraw)<`T`[``"_inner"``], `options`\> : `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `options` | extends `InferOptions` = { `omitResolver`: `never`  } |

#### Defined in

[index.ts:108](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L108)

___

### InferUnionNames

Ƭ **InferUnionNames**<`T`\>: `T` extends [`AnyUnion`](index.md#anyunion) ? `ObjectToUnion`<`T`[``"_inner"``]\>[``"_name"``] : `never`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[index.ts:132](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L132)

___

### TypeDefinition

Ƭ **TypeDefinition**<`T`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `args?` | [`Args`](index.md#args) |
| `defaultValue?` | `any` |
| `deprecated?` | `string` |
| `description?` | `string` |
| `extend?` | [`AnyTypes`](index.md#anytypes)[] |
| `interfaces?` | [`AnyInterface`](index.md#anyinterface)[] |
| `isOptional?` | `boolean` |
| `isRequired?` | `boolean` |
| `name?` | `string` |
| `scalarOptions?` | `ScalarOptions`<`any`, `any`\> |
| `shape?` | `T` |
| `type` | `GarphType` |

#### Defined in

[index.ts:28](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L28)

## Variables

### g

• `Const` **g**: [`GarphSchema`](classes/GarphSchema.md)

#### Defined in

[index.ts:729](https://github.com/stepci/garph/blob/bc1d582/src/index.ts#L729)

## Functions

### buildSchema

▸ **buildSchema**(`«destructured»`, `config?`): `GraphQLSchema`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `g` | [`GarphSchema`](classes/GarphSchema.md) |
| › `resolvers?` | `any` |
| `config` | `ConverterConfig` |

#### Returns

`GraphQLSchema`

#### Defined in

[schema.ts:17](https://github.com/stepci/garph/blob/bc1d582/src/schema.ts#L17)

___

### printSchema

▸ **printSchema**(`g`, `config?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `g` | [`GarphSchema`](classes/GarphSchema.md) |
| `config` | `ConverterConfig` |

#### Returns

`string`

#### Defined in

[schema.ts:11](https://github.com/stepci/garph/blob/bc1d582/src/schema.ts#L11)
