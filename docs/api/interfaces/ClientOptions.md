---
layout: default
title: "Interface: ClientOptions"
parent: Interfaces
grand_parent: API Reference
---
[**@thejulianjara/whatsapp.js v1.3.8**](../README.md)

***

[@thejulianjara/whatsapp.js](../globals.md) / ClientOptions

# Interface: ClientOptions

Defined in: [src/types/client.ts:1](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/client.ts#L1)

## Properties

### accessToken

> **accessToken**: `string`

Defined in: [src/types/client.ts:3](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/client.ts#L3)

***

### phoneId

> **phoneId**: `string`

Defined in: [src/types/client.ts:2](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/client.ts#L2)

***

### wabaId?

> `optional` **wabaId?**: `string`

Defined in: [src/types/client.ts:8](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/client.ts#L8)

WhatsApp Business Account ID. Required only for WABA-scoped features: listing every
phone number on the account, and managing message templates and Flows.

***

### webhook?

> `optional` **webhook?**: `object`

Defined in: [src/types/client.ts:9](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/client.ts#L9)

#### appSecret?

> `optional` **appSecret?**: `string`

App secret (found in the Meta App Dashboard). When provided, every incoming webhook
request is validated against its `X-Hub-Signature-256` header before being processed,
and requests with a missing or invalid signature are rejected with a 401 response.
Strongly recommended for any webhook endpoint reachable from the public internet.

#### autoStart?

> `optional` **autoStart?**: `boolean`

#### port?

> `optional` **port?**: `number`

#### verifyToken

> **verifyToken**: `string`
