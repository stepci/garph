garph

# garph

## Classes

- [GarphSchema](classes/GarphSchema.md)
- [Type](classes/Type.md)

## Type Aliases

### AnyArgs

Ƭ **AnyArgs**: [`Type`](classes/Type.md)<`any`, ``"Args"``\>

#### Defined in

[index.ts:47](https://github.com/stepci/garph/blob/430779b/src/index.ts#L47)

___

### AnyBoolean

Ƭ **AnyBoolean**: [`Type`](classes/Type.md)<`boolean`, ``"Boolean"``\>

#### Defined in

[index.ts:35](https://github.com/stepci/garph/blob/430779b/src/index.ts#L35)

___

### AnyEnum

Ƭ **AnyEnum**: [`Type`](classes/Type.md)<`any`, ``"Enum"``\>

#### Defined in

[index.ts:43](https://github.com/stepci/garph/blob/430779b/src/index.ts#L43)

___

### AnyFloat

Ƭ **AnyFloat**: [`Type`](classes/Type.md)<`number`, ``"Float"``\>

#### Defined in

[index.ts:38](https://github.com/stepci/garph/blob/430779b/src/index.ts#L38)

___

### AnyID

Ƭ **AnyID**: [`Type`](classes/Type.md)<`string`, ``"ID"``\>

#### Defined in

[index.ts:34](https://github.com/stepci/garph/blob/430779b/src/index.ts#L34)

___

### AnyInput

Ƭ **AnyInput**: [`Type`](classes/Type.md)<`any`, ``"InputType"``\>

#### Defined in

[index.ts:45](https://github.com/stepci/garph/blob/430779b/src/index.ts#L45)

___

### AnyInt

Ƭ **AnyInt**: [`Type`](classes/Type.md)<`number`, ``"Int"``\>

#### Defined in

[index.ts:37](https://github.com/stepci/garph/blob/430779b/src/index.ts#L37)

___

### AnyInterface

Ƭ **AnyInterface**: [`Type`](classes/Type.md)<`any`, ``"InterfaceType"``\>

#### Defined in

[index.ts:46](https://github.com/stepci/garph/blob/430779b/src/index.ts#L46)

___

### AnyList

Ƭ **AnyList**: [`Type`](classes/Type.md)<`any`, ``"List"``\>

#### Defined in

[index.ts:40](https://github.com/stepci/garph/blob/430779b/src/index.ts#L40)

___

### AnyNumber

Ƭ **AnyNumber**: [`Type`](classes/Type.md)<`number`, `any`\>

#### Defined in

[index.ts:36](https://github.com/stepci/garph/blob/430779b/src/index.ts#L36)

___

### AnyObject

Ƭ **AnyObject**: [`Type`](classes/Type.md)<`any`, ``"ObjectType"``\>

#### Defined in

[index.ts:49](https://github.com/stepci/garph/blob/430779b/src/index.ts#L49)

___

### AnyObjects

Ƭ **AnyObjects**: `Object`

#### Index signature

▪ [key: `string`]: [`AnyObject`](index.md#anyobject)

#### Defined in

[index.ts:59](https://github.com/stepci/garph/blob/430779b/src/index.ts#L59)

___

### AnyOptional

Ƭ **AnyOptional**: [`Type`](classes/Type.md)<`any`, ``"Optional"``\>

#### Defined in

[index.ts:48](https://github.com/stepci/garph/blob/430779b/src/index.ts#L48)

___

### AnyPaginatedList

Ƭ **AnyPaginatedList**: [`Type`](classes/Type.md)<`any`, ``"PaginatedList"``\>

#### Defined in

[index.ts:41](https://github.com/stepci/garph/blob/430779b/src/index.ts#L41)

___

### AnyRef

Ƭ **AnyRef**: [`Type`](classes/Type.md)<`any`, ``"Ref"``\>

#### Defined in

[index.ts:39](https://github.com/stepci/garph/blob/430779b/src/index.ts#L39)

___

### AnyScalar

Ƭ **AnyScalar**: [`Type`](classes/Type.md)<`any`, ``"Scalar"``\>

#### Defined in

[index.ts:44](https://github.com/stepci/garph/blob/430779b/src/index.ts#L44)

___

### AnyString

Ƭ **AnyString**: [`Type`](classes/Type.md)<`string`, ``"String"``\>

#### Defined in

[index.ts:33](https://github.com/stepci/garph/blob/430779b/src/index.ts#L33)

___

### AnyType

Ƭ **AnyType**: [`Type`](classes/Type.md)<`any`, `any`\>

#### Defined in

[index.ts:32](https://github.com/stepci/garph/blob/430779b/src/index.ts#L32)

___

### AnyTypes

Ƭ **AnyTypes**: `Object`

#### Index signature

▪ [key: `string`]: [`AnyType`](index.md#anytype)

#### Defined in

[index.ts:55](https://github.com/stepci/garph/blob/430779b/src/index.ts#L55)

___

### AnyUnion

Ƭ **AnyUnion**: [`Type`](classes/Type.md)<`any`, ``"Union"``\>

#### Defined in

[index.ts:42](https://github.com/stepci/garph/blob/430779b/src/index.ts#L42)

___

### Args

Ƭ **Args**: `Object`

#### Index signature

▪ [key: `string`]: [`AnyType`](index.md#anytype)

#### Defined in

[index.ts:51](https://github.com/stepci/garph/blob/430779b/src/index.ts#L51)

___

### Infer

Ƭ **Infer**<`T`\>: `ExpandRecursively`<[`InferRaw`](index.md#inferraw)<`T`\>\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[index.ts:77](https://github.com/stepci/garph/blob/430779b/src/index.ts#L77)

___

### InferArg

Ƭ **InferArg**<`T`\>: `ExpandRecursively`<[`InferArgRaw`](index.md#inferargraw)<`T`\>\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[index.ts:108](https://github.com/stepci/garph/blob/430779b/src/index.ts#L108)

___

### InferArgRaw

Ƭ **InferArgRaw**<`T`\>: `T` extends [`AnyArgs`](index.md#anyargs) ? { [K in keyof T["\_args"] as T["\_args"][K] extends AnyOptional ? never : K]: InferRaw<T["\_args"][K]\> } & { [K in keyof T["\_args"] as T["\_args"][K] extends AnyOptional ? K : never]?: InferRaw<T["\_args"][K]\> } : `never`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[index.ts:109](https://github.com/stepci/garph/blob/430779b/src/index.ts#L109)

___

### InferArgs

Ƭ **InferArgs**<`T`\>: `ExpandRecursively`<[`InferArgsRaw`](index.md#inferargsraw)<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`AnyType`](index.md#anytype) |

#### Defined in

[index.ts:103](https://github.com/stepci/garph/blob/430779b/src/index.ts#L103)

___

### InferArgsRaw

Ƭ **InferArgsRaw**<`T`\>: `T` extends [`AnyObject`](index.md#anyobject) \| [`AnyInterface`](index.md#anyinterface) ? { [K in keyof T["\_shape"]]: InferArgRaw<T["\_shape"][K]\> } : `never`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`AnyType`](index.md#anytype) |

#### Defined in

[index.ts:104](https://github.com/stepci/garph/blob/430779b/src/index.ts#L104)

___

### InferRaw

Ƭ **InferRaw**<`T`\>: `T` extends [`AnyInput`](index.md#anyinput) \| [`AnyObject`](index.md#anyobject) \| [`AnyInterface`](index.md#anyinterface) ? { `__typename?`: `T`[``"_name"``]  } & { [K in keyof T["\_shape"] as T["\_shape"][K] extends AnyOptional ? never : T["\_shape"][K] extends AnyArgs ? T["\_shape"][K]["\_shape"] extends AnyOptional ? never : K : K]: InferRaw<T["\_shape"][K]\> } & { [K in keyof T["\_shape"] as T["\_shape"][K] extends AnyOptional ? K : T["\_shape"][K] extends AnyArgs ? T["\_shape"][K]["\_shape"] extends AnyOptional ? K : never : never]?: InferRaw<T["\_shape"][K]\> } : [`InferShallow`](index.md#infershallow)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[index.ts:78](https://github.com/stepci/garph/blob/430779b/src/index.ts#L78)

___

### InferResolvers

Ƭ **InferResolvers**<`T`, `X`\>: { [K in keyof T]: K extends "Subscription" ? { [G in keyof Infer<T[K]\> as G extends "\_\_typename" ? never : G]?: Object } : { [G in keyof Infer<T[K]\> as G extends "\_\_typename" ? never : G]?: Function } & Object }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`AnyTypes`](index.md#anytypes) |
| `X` | extends `InferResolverConfig` |

#### Defined in

[index.ts:117](https://github.com/stepci/garph/blob/430779b/src/index.ts#L117)

___

### InferResolversStrict

Ƭ **InferResolversStrict**<`T`, `X`\>: { [K in keyof T]: K extends "Subscription" ? { [G in keyof Infer<T[K]\> as G extends "\_\_typename" ? never : G]: Object } : { [G in keyof Infer<T[K]\> as G extends "\_\_typename" ? never : G]: Function } & Object }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`AnyTypes`](index.md#anytypes) |
| `X` | extends `InferResolverConfig` |

#### Defined in

[index.ts:131](https://github.com/stepci/garph/blob/430779b/src/index.ts#L131)

___

### InferShallow

Ƭ **InferShallow**<`T`\>: `T` extends [`AnyString`](index.md#anystring) \| [`AnyID`](index.md#anyid) \| [`AnyScalar`](index.md#anyscalar) \| [`AnyNumber`](index.md#anynumber) \| [`AnyBoolean`](index.md#anyboolean) ? `T`[``"_shape"``] : `T` extends [`AnyEnum`](index.md#anyenum) ? `T`[``"_inner"``] : `T` extends [`AnyUnion`](index.md#anyunion) ? [`InferRaw`](index.md#inferraw)<`ObjectToUnion`<`T`[``"_inner"``]\>\> : `T` extends [`AnyList`](index.md#anylist) ? [`InferRaw`](index.md#inferraw)<`T`[``"_shape"``]\>[] : `T` extends [`AnyPaginatedList`](index.md#anypaginatedlist) ? `T`[``"_inner"``] : `T` extends [`AnyOptional`](index.md#anyoptional) ? [`InferRaw`](index.md#inferraw)<`T`[``"_shape"``]\> \| ``null`` \| `undefined` : `T` extends [`AnyArgs`](index.md#anyargs) ? [`InferRaw`](index.md#inferraw)<`T`[``"_shape"``]\> : `T` extends [`AnyRef`](index.md#anyref) ? [`InferRaw`](index.md#inferraw)<`T`[``"_inner"``]\> : `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[index.ts:92](https://github.com/stepci/garph/blob/430779b/src/index.ts#L92)

___

### InferUnionNames

Ƭ **InferUnionNames**<`T`\>: `T` extends [`AnyUnion`](index.md#anyunion) ? `ObjectToUnion`<`T`[``"_inner"``]\>[``"_name"``] : `never`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[index.ts:115](https://github.com/stepci/garph/blob/430779b/src/index.ts#L115)

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
| `interfaces?` | [`AnyType`](index.md#anytype)[] |
| `isOptional?` | `boolean` |
| `isRequired?` | `boolean` |
| `name?` | `string` |
| `scalarOptions?` | `ScalarOptions`<`any`, `any`\> |
| `shape?` | `T` |
| `type` | `GarphType` |

#### Defined in

[index.ts:18](https://github.com/stepci/garph/blob/430779b/src/index.ts#L18)

## Variables

### g

• `Const` **g**: [`GarphSchema`](classes/GarphSchema.md)

#### Defined in

[index.ts:722](https://github.com/stepci/garph/blob/430779b/src/index.ts#L722)

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

[schema.ts:13](https://github.com/stepci/garph/blob/430779b/src/schema.ts#L13)
