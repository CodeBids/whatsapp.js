---
layout: default
title: "Class: RowBuilder"
parent: Classes
grand_parent: API Reference
---
[**@thejulianjara/whatsapp.js v1.3.8**](../README.md)

***

[@thejulianjara/whatsapp.js](../globals.md) / RowBuilder

# Class: RowBuilder

Defined in: [src/models/Row.ts:14](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Row.ts#L14)

Builder class for constructing an array of rows for interactive list messages.

## Example

```ts
const rows = new RowBuilder()
  .addRow({ id: '1', title: 'Option A' })
  .addRow({ id: '2', title: 'Option B' })
  .build();
```

## Constructors

### Constructor

> **new RowBuilder**(`rows?`): `RowBuilder`

Defined in: [src/models/Row.ts:21](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Row.ts#L21)

Creates a new RowBuilder instance.

#### Parameters

##### rows?

[`Row`](../interfaces/Row.md)[] = `[]`

Optional initial array of rows.

#### Returns

`RowBuilder`

## Methods

### addRow()

> **addRow**(`row`): `RowBuilder`

Defined in: [src/models/Row.ts:30](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Row.ts#L30)

Adds a row to the builder.

#### Parameters

##### row

[`Row`](../interfaces/Row.md)

The row to add.

#### Returns

`RowBuilder`

The RowBuilder instance for chaining.

***

### build()

> **build**(): [`Row`](../interfaces/Row.md)[]

Defined in: [src/models/Row.ts:39](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Row.ts#L39)

Builds and returns the final array of rows.

#### Returns

[`Row`](../interfaces/Row.md)[]

The array of rows.
