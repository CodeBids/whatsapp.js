---
layout: default
title: "Interface: ContactPayloadData"
parent: Interfaces
grand_parent: API Reference
---
[**@thejulianjara/whatsapp.js v1.3.8**](../README.md)

***

[@thejulianjara/whatsapp.js](../globals.md) / ContactPayloadData

# Interface: ContactPayloadData

Defined in: [src/types/structures/Contact.ts:62](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/structures/Contact.ts#L62)

## Properties

### addresses?

> `optional` **addresses?**: `object`[]

Defined in: [src/types/structures/Contact.ts:80](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/structures/Contact.ts#L80)

#### city?

> `optional` **city?**: `string`

#### country?

> `optional` **country?**: `string`

#### country\_code?

> `optional` **country\_code?**: `string`

#### state?

> `optional` **state?**: `string`

#### street?

> `optional` **street?**: `string`

#### type

> **type**: `"HOME"` \| `"WORK"`

#### zip?

> `optional` **zip?**: `string`

***

### birthday?

> `optional` **birthday?**: `string`

Defined in: [src/types/structures/Contact.ts:93](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/structures/Contact.ts#L93)

***

### emails?

> `optional` **emails?**: `object`[]

Defined in: [src/types/structures/Contact.ts:76](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/structures/Contact.ts#L76)

#### email

> **email**: `string`

#### type

> **type**: `"HOME"` \| `"WORK"`

***

### name

> **name**: `object`

Defined in: [src/types/structures/Contact.ts:63](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/structures/Contact.ts#L63)

#### first\_name?

> `optional` **first\_name?**: `string`

#### formatted\_name

> **formatted\_name**: `string`

#### last\_name?

> `optional` **last\_name?**: `string`

#### middle\_name?

> `optional` **middle\_name?**: `string`

#### prefix?

> `optional` **prefix?**: `string`

#### suffix?

> `optional` **suffix?**: `string`

***

### org?

> `optional` **org?**: `object`

Defined in: [src/types/structures/Contact.ts:94](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/structures/Contact.ts#L94)

#### company?

> `optional` **company?**: `string`

#### department?

> `optional` **department?**: `string`

#### title?

> `optional` **title?**: `string`

***

### phones?

> `optional` **phones?**: `object`[]

Defined in: [src/types/structures/Contact.ts:71](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/structures/Contact.ts#L71)

#### phone

> **phone**: `number`

#### type?

> `optional` **type?**: `"CELL"` \| `"MAIN"` \| `"IPHONE"` \| `"HOME"` \| `"WORK"`

#### wa\_id

> **wa\_id**: `number`

***

### urls?

> `optional` **urls?**: `object`[]

Defined in: [src/types/structures/Contact.ts:89](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/structures/Contact.ts#L89)

#### type

> **type**: `"HOME"` \| `"WORK"`

#### url

> **url**: `string`
