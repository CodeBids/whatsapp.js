---
layout: default
title: "Class: Message"
parent: Classes
grand_parent: API Reference
---
[**@thejulianjara/whatsapp.js v1.3.8**](../README.md)

***

[@thejulianjara/whatsapp.js](../globals.md) / Message

# Class: Message

Defined in: [src/client/actions/Message.ts:25](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Message.ts#L25)

## Constructors

### Constructor

> **new Message**(`client`): `Message`

Defined in: [src/client/actions/Message.ts:28](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Message.ts#L28)

#### Parameters

##### client

[`Client`](Client.md)

#### Returns

`Message`

## Methods

### send()

> **send**(`payload`): `Promise`\<[`MessageApiResponse`](../interfaces/MessageApiResponse.md)\>

Defined in: [src/client/actions/Message.ts:37](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Message.ts#L37)

Sends a message through the WhatsApp API with flexible content options

#### Parameters

##### payload

[`MessagePayload`](../interfaces/MessagePayload.md)

Message payload with various content options

#### Returns

`Promise`\<[`MessageApiResponse`](../interfaces/MessageApiResponse.md)\>

API response
