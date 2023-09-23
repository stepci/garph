[garph](../index.md) / GarphSchema

# Class: GarphSchema

## Constructors

### constructor

• **new GarphSchema**()

## Properties

### nodeType

• **nodeType**: `GInterface`<``"Node"``, { `id`: `GString`<``"ID"``\>  }\>

#### Defined in

[index.ts:578](https://github.com/stepci/garph/blob/1256b62/src/index.ts#L578)

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

[index.ts:589](https://github.com/stepci/garph/blob/1256b62/src/index.ts#L589)

___

### pageInfoType

• **pageInfoType**: `GType`<``"PageInfo"``, { `endCursor`: `GOptional`<`GString`<``"String"``\>\> ; `hasNextPage`: `GBoolean` ; `hasPreviousPage`: `GBoolean` ; `startCursor`: `GOptional`<`GString`<``"String"``\>\>  }\>

#### Defined in

[index.ts:582](https://github.com/stepci/garph/blob/1256b62/src/index.ts#L582)

___

### types

• **types**: [`AnyType`](../index.md#anytype)[] = `[]`

#### Defined in

[index.ts:577](https://github.com/stepci/garph/blob/1256b62/src/index.ts#L577)

## Methods

### boolean

▸ **boolean**(): `GBoolean`

#### Returns

`GBoolean`

#### Defined in

[index.ts:677](https://github.com/stepci/garph/blob/1256b62/src/index.ts#L677)

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

[index.ts:608](https://github.com/stepci/garph/blob/1256b62/src/index.ts#L608)

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

[index.ts:618](https://github.com/stepci/garph/blob/1256b62/src/index.ts#L618)

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

[index.ts:637](https://github.com/stepci/garph/blob/1256b62/src/index.ts#L637)

___

### float

▸ **float**(): `GNumber`<``"Float"``\>

#### Returns

`GNumber`<``"Float"``\>

#### Defined in

[index.ts:673](https://github.com/stepci/garph/blob/1256b62/src/index.ts#L673)

___

### id

▸ **id**(): `GString`<``"ID"``\>

#### Returns

`GString`<``"ID"``\>

#### Defined in

[index.ts:665](https://github.com/stepci/garph/blob/1256b62/src/index.ts#L665)

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

[index.ts:631](https://github.com/stepci/garph/blob/1256b62/src/index.ts#L631)

___

### int

▸ **int**(): `GNumber`<``"Int"``\>

#### Returns

`GNumber`<``"Int"``\>

#### Defined in

[index.ts:669](https://github.com/stepci/garph/blob/1256b62/src/index.ts#L669)

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

[index.ts:655](https://github.com/stepci/garph/blob/1256b62/src/index.ts#L655)

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

[index.ts:602](https://github.com/stepci/garph/blob/1256b62/src/index.ts#L602)

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

[index.ts:683](https://github.com/stepci/garph/blob/1256b62/src/index.ts#L683)

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

[index.ts:649](https://github.com/stepci/garph/blob/1256b62/src/index.ts#L649)

___

### string

▸ **string**(): `GString`<``"String"``\>

#### Returns

`GString`<``"String"``\>

#### Defined in

[index.ts:661](https://github.com/stepci/garph/blob/1256b62/src/index.ts#L661)

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

[index.ts:596](https://github.com/stepci/garph/blob/1256b62/src/index.ts#L596)

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

[index.ts:643](https://github.com/stepci/garph/blob/1256b62/src/index.ts#L643)
