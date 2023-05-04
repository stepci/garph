[garph](../index.md) / GarphSchema

# Class: GarphSchema

## Constructors

### constructor

• **new GarphSchema**()

## Properties

### nodeType

• **nodeType**: `GInterface`<``"Node"``, { `id`: `GString`<``"ID"``\>  }\>

#### Defined in

[index.ts:595](https://github.com/stepci/garph/blob/528ec47/src/index.ts#L595)

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

[index.ts:606](https://github.com/stepci/garph/blob/528ec47/src/index.ts#L606)

___

### pageInfoType

• **pageInfoType**: `GType`<``"PageInfo"``, { `endCursor`: `GOptional`<`GString`<``"String"``\>\> ; `hasNextPage`: `GBoolean` ; `hasPreviousPage`: `GBoolean` ; `startCursor`: `GOptional`<`GString`<``"String"``\>\>  }\>

#### Defined in

[index.ts:599](https://github.com/stepci/garph/blob/528ec47/src/index.ts#L599)

___

### types

• **types**: [`AnyType`](../index.md#anytype)[] = `[]`

#### Defined in

[index.ts:594](https://github.com/stepci/garph/blob/528ec47/src/index.ts#L594)

## Methods

### boolean

▸ **boolean**(): `GBoolean`

#### Returns

`GBoolean`

#### Defined in

[index.ts:694](https://github.com/stepci/garph/blob/528ec47/src/index.ts#L694)

___

### connection

▸ **connection**<`N`, `T`\>(`name`, `shape`): `GType`<`string`, { `edges`: `GList`<`T`\> ; `pageInfo`: `GType`<``"PageInfo"``, { `endCursor`: `GOptional`<`GString`<``"String"``\>\> ; `hasNextPage`: `GBoolean` ; `hasPreviousPage`: `GBoolean` ; `startCursor`: `GOptional`<`GString`<``"String"``\>\>  }\>  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |
| `T` | extends [`Type`](Type.md)<`any`, ``"ObjectType"``, `T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `shape` | `T` |

#### Returns

`GType`<`string`, { `edges`: `GList`<`T`\> ; `pageInfo`: `GType`<``"PageInfo"``, { `endCursor`: `GOptional`<`GString`<``"String"``\>\> ; `hasNextPage`: `GBoolean` ; `hasPreviousPage`: `GBoolean` ; `startCursor`: `GOptional`<`GString`<``"String"``\>\>  }\>  }\>

#### Defined in

[index.ts:625](https://github.com/stepci/garph/blob/528ec47/src/index.ts#L625)

___

### edge

▸ **edge**<`N`, `T`\>(`name`, `shape`): `GType`<`N`, { `cursor`: [`AnyString`](../index.md#anystring) ; `node`: `T`  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |
| `T` | extends [`Type`](Type.md)<`any`, ``"ObjectType"``, `T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `shape` | `T` |

#### Returns

`GType`<`N`, { `cursor`: [`AnyString`](../index.md#anystring) ; `node`: `T`  }\>

#### Defined in

[index.ts:635](https://github.com/stepci/garph/blob/528ec47/src/index.ts#L635)

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

[index.ts:654](https://github.com/stepci/garph/blob/528ec47/src/index.ts#L654)

___

### float

▸ **float**(): `GNumber`<``"Float"``\>

#### Returns

`GNumber`<``"Float"``\>

#### Defined in

[index.ts:690](https://github.com/stepci/garph/blob/528ec47/src/index.ts#L690)

___

### id

▸ **id**(): `GString`<``"ID"``\>

#### Returns

`GString`<``"ID"``\>

#### Defined in

[index.ts:682](https://github.com/stepci/garph/blob/528ec47/src/index.ts#L682)

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

[index.ts:648](https://github.com/stepci/garph/blob/528ec47/src/index.ts#L648)

___

### int

▸ **int**(): `GNumber`<``"Int"``\>

#### Returns

`GNumber`<``"Int"``\>

#### Defined in

[index.ts:686](https://github.com/stepci/garph/blob/528ec47/src/index.ts#L686)

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

[index.ts:672](https://github.com/stepci/garph/blob/528ec47/src/index.ts#L672)

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

[index.ts:619](https://github.com/stepci/garph/blob/528ec47/src/index.ts#L619)

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

[index.ts:700](https://github.com/stepci/garph/blob/528ec47/src/index.ts#L700)

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

[index.ts:666](https://github.com/stepci/garph/blob/528ec47/src/index.ts#L666)

___

### string

▸ **string**(): `GString`<``"String"``\>

#### Returns

`GString`<``"String"``\>

#### Defined in

[index.ts:678](https://github.com/stepci/garph/blob/528ec47/src/index.ts#L678)

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

[index.ts:613](https://github.com/stepci/garph/blob/528ec47/src/index.ts#L613)

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

[index.ts:660](https://github.com/stepci/garph/blob/528ec47/src/index.ts#L660)
