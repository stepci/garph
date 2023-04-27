[garph](../index.md) / GarphSchema

# Class: GarphSchema

## Constructors

### constructor

• **new GarphSchema**()

## Properties

### types

• **types**: [`AnyType`](../index.md#anytype)[] = `[]`

#### Defined in

[index.ts:538](https://github.com/stepci/garph/blob/4139f80/src/index.ts#L538)

## Methods

### boolean

▸ **boolean**(): `GBoolean`

#### Returns

`GBoolean`

#### Defined in

[index.ts:592](https://github.com/stepci/garph/blob/4139f80/src/index.ts#L592)

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

[index.ts:552](https://github.com/stepci/garph/blob/4139f80/src/index.ts#L552)

___

### float

▸ **float**(): `GNumber`<``"Float"``\>

#### Returns

`GNumber`<``"Float"``\>

#### Defined in

[index.ts:588](https://github.com/stepci/garph/blob/4139f80/src/index.ts#L588)

___

### id

▸ **id**(): `GString`<``"ID"``\>

#### Returns

`GString`<``"ID"``\>

#### Defined in

[index.ts:580](https://github.com/stepci/garph/blob/4139f80/src/index.ts#L580)

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

[index.ts:546](https://github.com/stepci/garph/blob/4139f80/src/index.ts#L546)

___

### int

▸ **int**(): `GNumber`<``"Int"``\>

#### Returns

`GNumber`<``"Int"``\>

#### Defined in

[index.ts:584](https://github.com/stepci/garph/blob/4139f80/src/index.ts#L584)

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

[index.ts:570](https://github.com/stepci/garph/blob/4139f80/src/index.ts#L570)

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

[index.ts:598](https://github.com/stepci/garph/blob/4139f80/src/index.ts#L598)

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

[index.ts:564](https://github.com/stepci/garph/blob/4139f80/src/index.ts#L564)

___

### string

▸ **string**(): `GString`<``"String"``\>

#### Returns

`GString`<``"String"``\>

#### Defined in

[index.ts:576](https://github.com/stepci/garph/blob/4139f80/src/index.ts#L576)

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

[index.ts:540](https://github.com/stepci/garph/blob/4139f80/src/index.ts#L540)

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

[index.ts:558](https://github.com/stepci/garph/blob/4139f80/src/index.ts#L558)
