---
layout: default
title: "Class: ButtonBuilder"
parent: Classes
grand_parent: API Reference
---
[**@thejulianjara/whatsapp.js v1.3.8**](../README.md)

***

[@thejulianjara/whatsapp.js](../globals.md) / ButtonBuilder

# Class: ButtonBuilder

Defined in: [src/models/Button.ts:3](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Button.ts#L3)

## Implements

- [`Button`](../interfaces/Button.md)

## Constructors

### Constructor

> **new ButtonBuilder**(`data`): `ButtonBuilder`

Defined in: [src/models/Button.ts:9](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Button.ts#L9)

#### Parameters

##### data

[`Button`](../interfaces/Button.md)

#### Returns

`ButtonBuilder`

## Properties

### id?

> `optional` **id?**: `string`

Defined in: [src/models/Button.ts:5](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Button.ts#L5)

#### Implementation of

[`Button`](../interfaces/Button.md).[`id`](../interfaces/Button.md#id)

***

### text?

> `optional` **text?**: `string`

Defined in: [src/models/Button.ts:7](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Button.ts#L7)

#### Implementation of

[`Button`](../interfaces/Button.md).[`text`](../interfaces/Button.md#text)

***

### type?

> `optional` **type?**: `"reply"` \| `"url"`

Defined in: [src/models/Button.ts:4](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Button.ts#L4)

#### Implementation of

[`Button`](../interfaces/Button.md).[`type`](../interfaces/Button.md#type)

***

### url?

> `optional` **url?**: `string`

Defined in: [src/models/Button.ts:6](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Button.ts#L6)

#### Implementation of

[`Button`](../interfaces/Button.md).[`url`](../interfaces/Button.md#url)

## Methods

### setDisplayText()

> **setDisplayText**(`displayText`): `void`

Defined in: [src/models/Button.ts:17](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Button.ts#L17)

Sets the display text for the button.

#### Parameters

##### displayText

`string`

The text to be displayed on the button.

#### Returns

`void`

***

### setId()

> **setId**(`id`): `void`

Defined in: [src/models/Button.ts:33](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Button.ts#L33)

Sets the ID for the button.

#### Parameters

##### id

`string`

The unique identifier for the button.

#### Returns

`void`

***

### setType()

> **setType**(`type`): `void`

Defined in: [src/models/Button.ts:41](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Button.ts#L41)

Sets the type of the button.

#### Parameters

##### type

`"reply"` \| `"url"`

The type of the button, either 'reply' or 'url'.

#### Returns

`void`

***

### setUrl()

> **setUrl**(`url`): `void`

Defined in: [src/models/Button.ts:25](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Button.ts#L25)

Sets the URL for the button.

#### Parameters

##### url

`string`

The URL to be opened when the button is clicked.

#### Returns

`void`
