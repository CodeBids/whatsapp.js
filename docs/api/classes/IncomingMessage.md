---
layout: default
title: "Class: IncomingMessage"
parent: Classes
grand_parent: API Reference
---
[**@thejulianjara/whatsapp.js v1.3.8**](../README.md)

***

[@thejulianjara/whatsapp.js](../globals.md) / IncomingMessage

# Class: IncomingMessage

Defined in: [src/models/IncomingMessage.ts:8](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/IncomingMessage.ts#L8)

Represents a message received from WhatsApp

## Constructors

### Constructor

> **new IncomingMessage**(`data`, `client`): `IncomingMessage`

Defined in: [src/models/IncomingMessage.ts:31](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/IncomingMessage.ts#L31)

#### Parameters

##### data

`any`

##### client

[`Client`](Client.md)

#### Returns

`IncomingMessage`

## Properties

### audio?

> `optional` **audio?**: `any`

Defined in: [src/models/IncomingMessage.ts:16](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/IncomingMessage.ts#L16)

***

### button?

> `optional` **button?**: `any`

Defined in: [src/models/IncomingMessage.ts:22](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/IncomingMessage.ts#L22)

***

### contacts?

> `optional` **contacts?**: `any`[]

Defined in: [src/models/IncomingMessage.ts:20](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/IncomingMessage.ts#L20)

***

### context?

> `optional` **context?**: `any`

Defined in: [src/models/IncomingMessage.ts:26](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/IncomingMessage.ts#L26)

***

### document?

> `optional` **document?**: `any`

Defined in: [src/models/IncomingMessage.ts:18](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/IncomingMessage.ts#L18)

***

### from

> **from**: `string`

Defined in: [src/models/IncomingMessage.ts:11](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/IncomingMessage.ts#L11)

***

### id

> **id**: `string`

Defined in: [src/models/IncomingMessage.ts:10](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/IncomingMessage.ts#L10)

***

### image?

> `optional` **image?**: `any`

Defined in: [src/models/IncomingMessage.ts:15](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/IncomingMessage.ts#L15)

***

### interactive?

> `optional` **interactive?**: `any`

Defined in: [src/models/IncomingMessage.ts:21](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/IncomingMessage.ts#L21)

***

### location?

> `optional` **location?**: `any`

Defined in: [src/models/IncomingMessage.ts:19](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/IncomingMessage.ts#L19)

***

### order?

> `optional` **order?**: `any`

Defined in: [src/models/IncomingMessage.ts:25](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/IncomingMessage.ts#L25)

***

### reaction?

> `optional` **reaction?**: `any`

Defined in: [src/models/IncomingMessage.ts:23](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/IncomingMessage.ts#L23)

***

### sticker?

> `optional` **sticker?**: `any`

Defined in: [src/models/IncomingMessage.ts:24](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/IncomingMessage.ts#L24)

***

### text?

> `optional` **text?**: `string`

Defined in: [src/models/IncomingMessage.ts:14](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/IncomingMessage.ts#L14)

***

### timestamp

> **timestamp**: `string`

Defined in: [src/models/IncomingMessage.ts:12](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/IncomingMessage.ts#L12)

***

### type

> **type**: `string`

Defined in: [src/models/IncomingMessage.ts:13](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/IncomingMessage.ts#L13)

***

### video?

> `optional` **video?**: `any`

Defined in: [src/models/IncomingMessage.ts:17](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/IncomingMessage.ts#L17)

## Methods

### forward()

> **forward**(`to`): `Promise`\<[`MessageApiResponse`](../interfaces/MessageApiResponse.md) \| `null`\>

Defined in: [src/models/IncomingMessage.ts:101](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/IncomingMessage.ts#L101)

Forwards the message to another recipient

#### Parameters

##### to

`string`

Recipient's phone number

#### Returns

`Promise`\<[`MessageApiResponse`](../interfaces/MessageApiResponse.md) \| `null`\>

API response

***

### markAsRead()

> **markAsRead**(): `Promise`\<`any`\>

Defined in: [src/models/IncomingMessage.ts:76](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/IncomingMessage.ts#L76)

Marks the message as read

#### Returns

`Promise`\<`any`\>

API response

***

### react()

> **react**(`emoji`): `Promise`\<[`MessageApiResponse`](../interfaces/MessageApiResponse.md)\>

Defined in: [src/models/IncomingMessage.ts:54](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/IncomingMessage.ts#L54)

Reacts to the message with an emoji

#### Parameters

##### emoji

`string`

Emoji to react with

#### Returns

`Promise`\<[`MessageApiResponse`](../interfaces/MessageApiResponse.md)\>

API response

***

### reply()

> **reply**(`payload`): `Promise`\<[`MessageApiResponse`](../interfaces/MessageApiResponse.md)\>

Defined in: [src/models/IncomingMessage.ts:43](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/IncomingMessage.ts#L43)

Replies to the message with text

#### Parameters

##### payload

[`MessagePayload`](../interfaces/MessagePayload.md)

#### Returns

`Promise`\<[`MessageApiResponse`](../interfaces/MessageApiResponse.md)\>

API response

***

### sendTypingIndicator()

> **sendTypingIndicator**(): `Promise`\<`any`\>

Defined in: [src/models/IncomingMessage.ts:88](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/IncomingMessage.ts#L88)

Shows a typing indicator to the sender

#### Returns

`Promise`\<`any`\>

API response
