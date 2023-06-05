[garph](../index.md) / GarphSchema

# Class: GarphSchema

## Constructors

### constructor

• **new GarphSchema**()

## Properties

### nodeType

• **nodeType**: `GInterface`<``"Node"``, { `id`: `GString`<``"ID"``\>  }\>

#### Defined in

[index.ts:677](https://github.com/stepci/garph/blob/9b4fdc4/src/index.ts#L677)

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

[index.ts:688](https://github.com/stepci/garph/blob/9b4fdc4/src/index.ts#L688)

___

### pageInfoType

• **pageInfoType**: `GType`<``"PageInfo"``, { `endCursor`: `GOptional`<`GString`<``"String"``\>\> ; `hasNextPage`: `GBoolean` ; `hasPreviousPage`: `GBoolean` ; `startCursor`: `GOptional`<`GString`<``"String"``\>\>  }\>

#### Defined in

[index.ts:681](https://github.com/stepci/garph/blob/9b4fdc4/src/index.ts#L681)

___

### types

• **types**: [`AnyType`](../index.md#anytype)[] = `[]`

#### Defined in

[index.ts:676](https://github.com/stepci/garph/blob/9b4fdc4/src/index.ts#L676)

## Methods

### boolean

▸ **boolean**(): `GBoolean`

#### Returns

`GBoolean`

#### Defined in

[index.ts:776](https://github.com/stepci/garph/blob/9b4fdc4/src/index.ts#L776)

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

[index.ts:707](https://github.com/stepci/garph/blob/9b4fdc4/src/index.ts#L707)

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

[index.ts:717](https://github.com/stepci/garph/blob/9b4fdc4/src/index.ts#L717)

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

[index.ts:736](https://github.com/stepci/garph/blob/9b4fdc4/src/index.ts#L736)

___

### float

▸ **float**(): `GNumber`<``"Float"``\>

#### Returns

`GNumber`<``"Float"``\>

#### Defined in

[index.ts:772](https://github.com/stepci/garph/blob/9b4fdc4/src/index.ts#L772)

___

### id

▸ **id**(): `GString`<``"ID"``\>

#### Returns

`GString`<``"ID"``\>

#### Defined in

[index.ts:764](https://github.com/stepci/garph/blob/9b4fdc4/src/index.ts#L764)

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

[index.ts:730](https://github.com/stepci/garph/blob/9b4fdc4/src/index.ts#L730)

___

### int

▸ **int**(): `GNumber`<``"Int"``\>

#### Returns

`GNumber`<``"Int"``\>

#### Defined in

[index.ts:768](https://github.com/stepci/garph/blob/9b4fdc4/src/index.ts#L768)

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

[index.ts:754](https://github.com/stepci/garph/blob/9b4fdc4/src/index.ts#L754)

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

[index.ts:701](https://github.com/stepci/garph/blob/9b4fdc4/src/index.ts#L701)

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

[index.ts:782](https://github.com/stepci/garph/blob/9b4fdc4/src/index.ts#L782)

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

[index.ts:748](https://github.com/stepci/garph/blob/9b4fdc4/src/index.ts#L748)

___

### string

▸ **string**(): `GString`<``"String"``\>

#### Returns

`GString`<``"String"``\>

#### Defined in

[index.ts:760](https://github.com/stepci/garph/blob/9b4fdc4/src/index.ts#L760)

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

[index.ts:695](https://github.com/stepci/garph/blob/9b4fdc4/src/index.ts#L695)

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

[index.ts:742](https://github.com/stepci/garph/blob/9b4fdc4/src/index.ts#L742)
