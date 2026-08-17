---
layout: default
title: "Interface: IncomingCallEvent"
parent: Interfaces
grand_parent: API Reference
---
[**@thejulianjara/whatsapp.js v1.3.8**](../README.md)

***

[@thejulianjara/whatsapp.js](../globals.md) / IncomingCallEvent

# Interface: IncomingCallEvent

Defined in: [src/types/calling.ts:43](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/calling.ts#L43)

Normalized shape of a single entry from the `calls` webhook field

## Indexable

> \[`key`: `string`\]: `unknown`

## Properties

### direction?

> `optional` **direction?**: `string`

Defined in: [src/types/calling.ts:49](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/calling.ts#L49)

***

### event

> **event**: `string`

Defined in: [src/types/calling.ts:47](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/calling.ts#L47)

***

### from

> **from**: `string`

Defined in: [src/types/calling.ts:45](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/calling.ts#L45)

***

### id

> **id**: `string`

Defined in: [src/types/calling.ts:44](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/calling.ts#L44)

***

### session?

> `optional` **session?**: [`CallSdpSession`](CallSdpSession.md)

Defined in: [src/types/calling.ts:50](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/calling.ts#L50)

***

### timestamp?

> `optional` **timestamp?**: `string`

Defined in: [src/types/calling.ts:48](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/calling.ts#L48)

***

### to

> **to**: `string`

Defined in: [src/types/calling.ts:46](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/calling.ts#L46)
