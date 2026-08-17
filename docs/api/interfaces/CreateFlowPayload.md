---
layout: default
title: "Interface: CreateFlowPayload"
parent: Interfaces
grand_parent: API Reference
---
[**@thejulianjara/whatsapp.js v1.3.8**](../README.md)

***

[@thejulianjara/whatsapp.js](../globals.md) / CreateFlowPayload

# Interface: CreateFlowPayload

Defined in: [src/types/flows.ts:26](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/flows.ts#L26)

## Properties

### categories

> **categories**: [`FlowCategory`](../type-aliases/FlowCategory.md)[]

Defined in: [src/types/flows.ts:28](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/flows.ts#L28)

***

### clone\_flow\_id?

> `optional` **clone\_flow\_id?**: `string`

Defined in: [src/types/flows.ts:30](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/flows.ts#L30)

Create the new flow as a copy of an existing one

***

### endpoint\_uri?

> `optional` **endpoint\_uri?**: `string`

Defined in: [src/types/flows.ts:32](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/flows.ts#L32)

Data endpoint URL, required for flows that exchange data with your backend

***

### flow\_json?

> `optional` **flow\_json?**: `string`

Defined in: [src/types/flows.ts:34](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/flows.ts#L34)

Flow JSON as a string; alternative to uploading it afterwards with updateJson()

***

### name

> **name**: `string`

Defined in: [src/types/flows.ts:27](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/flows.ts#L27)

***

### publish?

> `optional` **publish?**: `boolean`

Defined in: [src/types/flows.ts:36](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/flows.ts#L36)

Publish immediately after creation (only if flow_json validates with no errors)
