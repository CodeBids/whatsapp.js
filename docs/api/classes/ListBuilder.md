---
layout: default
title: "Class: ListBuilder"
parent: Classes
grand_parent: API Reference
---
[**@thejulianjara/whatsapp.js v1.3.8**](../README.md)

***

[@thejulianjara/whatsapp.js](../globals.md) / ListBuilder

# Class: ListBuilder

Defined in: [src/models/List.ts:5](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/List.ts#L5)

## Implements

- [`List`](../interfaces/List.md)

## Constructors

### Constructor

> **new ListBuilder**(`data`): `ListBuilder`

Defined in: [src/models/List.ts:10](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/List.ts#L10)

#### Parameters

##### data

###### buttonText

`string`

###### rows

[`Row`](../interfaces/Row.md)[] \| [`RowBuilder`](RowBuilder.md)

###### title

`string`

#### Returns

`ListBuilder`

## Properties

### buttonText

> **buttonText**: `string`

Defined in: [src/models/List.ts:8](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/List.ts#L8)

#### Implementation of

[`List`](../interfaces/List.md).[`buttonText`](../interfaces/List.md#buttontext)

***

### rows

> **rows**: [`Row`](../interfaces/Row.md)[]

Defined in: [src/models/List.ts:7](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/List.ts#L7)

#### Implementation of

[`List`](../interfaces/List.md).[`rows`](../interfaces/List.md#rows)

***

### title

> **title**: `string`

Defined in: [src/models/List.ts:6](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/List.ts#L6)

#### Implementation of

[`List`](../interfaces/List.md).[`title`](../interfaces/List.md#title)

## Methods

### setButtonText()

> **setButtonText**(`buttonText`): `ListBuilder`

Defined in: [src/models/List.ts:52](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/List.ts#L52)

Sets the button text of the list.

#### Parameters

##### buttonText

`string`

The button text to be set for the list.

#### Returns

`ListBuilder`

***

### setRows()

> **setRows**(`rows`): `ListBuilder`

Defined in: [src/models/List.ts:39](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/List.ts#L39)

Sets the rows of the list.

#### Parameters

##### rows

[`Row`](../interfaces/Row.md)[] \| [`RowBuilder`](RowBuilder.md)

The rows to be set for the list.

#### Returns

`ListBuilder`

***

### setTitle()

> **setTitle**(`title`): `ListBuilder`

Defined in: [src/models/List.ts:30](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/List.ts#L30)

Sets the title of the list.

#### Parameters

##### title

`string`

The title to be set for the list.

#### Returns

`ListBuilder`
