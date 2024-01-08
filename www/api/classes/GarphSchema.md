[garph](../index.md) / GarphSchema

# Class: GarphSchema

## Constructors

### constructor

• **new GarphSchema**(`«destructured»?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `types` | [`AnyType`](../index.md#anytype)[] |

#### Defined in

[index.ts:629](https://github.com/stepci/garph/blob/45f35d4/src/index.ts#L629)

## Properties

### nodeType

• **nodeType**: `GInterface`<``"Node"``, { `id`: `GString`<``"ID"``\>  }\>

#### Defined in

[index.ts:601](https://github.com/stepci/garph/blob/45f35d4/src/index.ts#L601)

___

### pageInfoArgs

• **pageInfoArgs**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `after` | `GOptional`<`GString`<``"ID"``\>\> |
| `before` | `GOptional`<`GString`<``"ID"``\>\> |
| `first` | `GOptional`<`GNumber`<``"Int"``\>\> |
| `last` | `GOptional`<`GNumber`<``"Int"``\>\> |

#### Defined in

[index.ts:612](https://github.com/stepci/garph/blob/45f35d4/src/index.ts#L612)

___

### pageInfoType

• **pageInfoType**: `GType`<``"PageInfo"``, { `endCursor`: `GOptional`<`GString`<``"String"``\>\> ; `hasNextPage`: `GBoolean` ; `hasPreviousPage`: `GBoolean` ; `startCursor`: `GOptional`<`GString`<``"String"``\>\>  }\>

#### Defined in

[index.ts:605](https://github.com/stepci/garph/blob/45f35d4/src/index.ts#L605)

___

### types

• **types**: [`AnyType`](../index.md#anytype)[] = `[]`

#### Defined in

[index.ts:599](https://github.com/stepci/garph/blob/45f35d4/src/index.ts#L599)

## Methods

### boolean

▸ **boolean**(): `GBoolean`

#### Returns

`GBoolean`

#### Defined in

[index.ts:714](https://github.com/stepci/garph/blob/45f35d4/src/index.ts#L714)

___

### connection

▸ **connection**<`N`, `T`\>(`name`, `shape`): `GType`<`string`, { `edges`: `GList`<`T`\> ; `pageInfo`: `GType`<``"PageInfo"``, { `endCursor`: `GOptional`<`GString`<``"String"``\>\> ; `hasNextPage`: `GBoolean` ; `hasPreviousPage`: `GBoolean` ; `startCursor`: `GOptional`<`GString`<``"String"``\>\>  }\>  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |
| `T` | extends [`Type`](Type.md)<`any`, ``"Ref"``, `T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `shape` | `T` |

#### Returns

`GType`<`string`, { `edges`: `GList`<`T`\> ; `pageInfo`: `GType`<``"PageInfo"``, { `endCursor`: `GOptional`<`GString`<``"String"``\>\> ; `hasNextPage`: `GBoolean` ; `hasPreviousPage`: `GBoolean` ; `startCursor`: `GOptional`<`GString`<``"String"``\>\>  }\>  }\>

#### Defined in

[index.ts:645](https://github.com/stepci/garph/blob/45f35d4/src/index.ts#L645)

___

### edge

▸ **edge**<`N`, `T`\>(`name`, `shape`): `GType`<`N`, { `cursor`: [`AnyString`](../index.md#anystring) ; `node`: `T`  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |
| `T` | extends [`Type`](Type.md)<`any`, ``"Ref"``, `T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `shape` | `T` |

#### Returns

`GType`<`N`, { `cursor`: [`AnyString`](../index.md#anystring) ; `node`: `T`  }\>

#### Defined in

[index.ts:655](https://github.com/stepci/garph/blob/45f35d4/src/index.ts#L655)

___

### enumType

▸ **enumType**<`N`, `T`\>(`name`, `args`): `GEnum`<`N`, `T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |
| `T` | extends readonly `string`[] \| `TSEnumType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `args` | `T` |

#### Returns

`GEnum`<`N`, `T`\>

#### Defined in

[index.ts:674](https://github.com/stepci/garph/blob/45f35d4/src/index.ts#L674)

___

### float

▸ **float**(): `GNumber`<``"Float"``\>

#### Returns

`GNumber`<``"Float"``\>

#### Defined in

[index.ts:710](https://github.com/stepci/garph/blob/45f35d4/src/index.ts#L710)

___

### id

▸ **id**(): `GString`<``"ID"``\>

#### Returns

`GString`<``"ID"``\>

#### Defined in

[index.ts:702](https://github.com/stepci/garph/blob/45f35d4/src/index.ts#L702)

___

### inputType

▸ **inputType**<`N`, `T`\>(`name`, `shape`): `GInput`<`N`, `T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |
| `T` | extends [`AnyTypes`](../index.md#anytypes) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `shape` | `T` |

#### Returns

`GInput`<`N`, `T`\>

#### Defined in

[index.ts:668](https://github.com/stepci/garph/blob/45f35d4/src/index.ts#L668)

___

### int

▸ **int**(): `GNumber`<``"Int"``\>

#### Returns

`GNumber`<``"Int"``\>

#### Defined in

[index.ts:706](https://github.com/stepci/garph/blob/45f35d4/src/index.ts#L706)

___

### interface

▸ **interface**<`N`, `T`\>(`name`, `shape`): `GInterface`<`N`, `T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |
| `T` | extends [`AnyTypes`](../index.md#anytypes) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `shape` | `T` |

#### Returns

`GInterface`<`N`, `T`\>

#### Defined in

[index.ts:692](https://github.com/stepci/garph/blob/45f35d4/src/index.ts#L692)

___

### node

▸ **node**<`N`, `T`\>(`name`, `shape`): `GType`<`N`, `T` & { `id`: `GString`<``"ID"``\>  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |
| `T` | extends [`AnyTypes`](../index.md#anytypes) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `shape` | `T` |

#### Returns

`GType`<`N`, `T` & { `id`: `GString`<``"ID"``\>  }\>

#### Defined in

[index.ts:639](https://github.com/stepci/garph/blob/45f35d4/src/index.ts#L639)

___

### ref

▸ **ref**<`T`\>(`ref`): `GRef`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ref` | `T` |

#### Returns

`GRef`<`T`\>

#### Defined in

[index.ts:720](https://github.com/stepci/garph/blob/45f35d4/src/index.ts#L720)

___

### registerType

▸ **registerType**(`type`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`AnyType`](../index.md#anytype) |

#### Returns

`void`

#### Defined in

[index.ts:619](https://github.com/stepci/garph/blob/45f35d4/src/index.ts#L619)

___

### scalarType

▸ **scalarType**<`I`, `O`\>(`name`, `options?`): `GScalar`<`I`, `O`\>

#### Type parameters

| Name |
| :------ |
| `I` |
| `O` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options?` | `ScalarOptions`<`I`, `O`\> |

#### Returns

`GScalar`<`I`, `O`\>

#### Defined in

[index.ts:686](https://github.com/stepci/garph/blob/45f35d4/src/index.ts#L686)

___

### string

▸ **string**(): `GString`<``"String"``\>

#### Returns

`GString`<``"String"``\>

#### Defined in

[index.ts:698](https://github.com/stepci/garph/blob/45f35d4/src/index.ts#L698)

___

### type

▸ **type**<`N`, `T`\>(`name`, `shape`): `GType`<`N`, `T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |
| `T` | extends [`AnyTypes`](../index.md#anytypes) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `shape` | `T` |

#### Returns

`GType`<`N`, `T`\>

#### Defined in

[index.ts:633](https://github.com/stepci/garph/blob/45f35d4/src/index.ts#L633)

___

### unionType

▸ **unionType**<`N`, `T`\>(`name`, `args`): `GUnion`<`N`, `T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |
| `T` | extends [`AnyObjects`](../index.md#anyobjects) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `args` | `T` |

#### Returns

`GUnion`<`N`, `T`\>

#### Defined in

[index.ts:680](https://github.com/stepci/garph/blob/45f35d4/src/index.ts#L680)
