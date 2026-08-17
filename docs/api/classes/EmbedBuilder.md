---
layout: default
title: "Class: EmbedBuilder"
parent: Classes
grand_parent: API Reference
---
[**@thejulianjara/whatsapp.js v1.3.8**](../README.md)

***

[@thejulianjara/whatsapp.js](../globals.md) / EmbedBuilder

# Class: EmbedBuilder

Defined in: [src/models/Embed.ts:15](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Embed.ts#L15)

Builder class for creating rich embed messages with a title, body, and footer.

## Example

```ts
const embed = new EmbedBuilder({
  title: 'Welcome',
  body: 'Hello world!',
  footer: 'Powered by whatsapp.js'
});
```

## Implements

- [`Embed`](../interfaces/Embed.md)

## Constructors

### Constructor

> **new EmbedBuilder**(`data`): `EmbedBuilder`

Defined in: [src/models/Embed.ts:25](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Embed.ts#L25)

Creates a new EmbedBuilder instance.

#### Parameters

##### data

[`Embed`](../interfaces/Embed.md)

The initial embed data.

#### Returns

`EmbedBuilder`

## Properties

### body

> **body**: `string`

Defined in: [src/models/Embed.ts:17](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Embed.ts#L17)

#### Implementation of

[`Embed`](../interfaces/Embed.md).[`body`](../interfaces/Embed.md#body)

***

### components?

> `optional` **components?**: [`Component`](../type-aliases/Component.md)[]

Defined in: [src/models/Embed.ts:19](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Embed.ts#L19)

***

### footer

> **footer**: `string`

Defined in: [src/models/Embed.ts:18](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Embed.ts#L18)

#### Implementation of

[`Embed`](../interfaces/Embed.md).[`footer`](../interfaces/Embed.md#footer)

***

### title

> **title**: `string`

Defined in: [src/models/Embed.ts:16](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Embed.ts#L16)

#### Implementation of

[`Embed`](../interfaces/Embed.md).[`title`](../interfaces/Embed.md#title)

## Methods

### setBody()

> **setBody**(`text`): `void`

Defined in: [src/models/Embed.ts:41](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Embed.ts#L41)

Sets the body content of the embed.

#### Parameters

##### text

`string`

The body text.

#### Returns

`void`

***

### setFooter()

> **setFooter**(`text`): `void`

Defined in: [src/models/Embed.ts:49](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Embed.ts#L49)

Sets the footer text of the embed.

#### Parameters

##### text

`string`

The footer text.

#### Returns

`void`

***

### setTitle()

> **setTitle**(`text`): `void`

Defined in: [src/models/Embed.ts:33](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Embed.ts#L33)

Sets the title of the embed.

#### Parameters

##### text

`string`

The title text.

#### Returns

`void`
