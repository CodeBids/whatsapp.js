---
layout: default
title: "Interface: TemplateParameter"
parent: Interfaces
grand_parent: API Reference
---
[**@thejulianjara/whatsapp.js v1.3.8**](../README.md)

***

[@thejulianjara/whatsapp.js](../globals.md) / TemplateParameter

# Interface: TemplateParameter

Defined in: [src/types/message.ts:58](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L58)

## Properties

### action?

> `optional` **action?**: `object`

Defined in: [src/types/message.ts:95](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L95)

#### catalog\_id?

> `optional` **catalog\_id?**: `string`

#### flow\_action\_data?

> `optional` **flow\_action\_data?**: `object`

##### flow\_action\_data.data?

> `optional` **data?**: `Record`\<`string`, `any`\>

##### flow\_action\_data.screen?

> `optional` **screen?**: `string`

#### flow\_token?

> `optional` **flow\_token?**: `string`

#### link?

> `optional` **link?**: `string`

#### product\_retailer\_id?

> `optional` **product\_retailer\_id?**: `string`

#### thumbnail\_product\_retailer\_id?

> `optional` **thumbnail\_product\_retailer\_id?**: `string`

***

### currency?

> `optional` **currency?**: `object`

Defined in: [src/types/message.ts:64](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L64)

#### amount\_1000

> **amount\_1000**: `number`

#### code

> **code**: `string`

#### fallback\_value

> **fallback\_value**: `string`

***

### date\_time?

> `optional` **date\_time?**: `object`

Defined in: [src/types/message.ts:69](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L69)

#### calendar?

> `optional` **calendar?**: `"GREGORIAN"`

#### day\_of\_month?

> `optional` **day\_of\_month?**: `number`

#### day\_of\_week?

> `optional` **day\_of\_week?**: `number`

#### fallback\_value

> **fallback\_value**: `string`

#### hour?

> `optional` **hour?**: `number`

#### minute?

> `optional` **minute?**: `number`

#### month?

> `optional` **month?**: `number`

#### year?

> `optional` **year?**: `number`

***

### document?

> `optional` **document?**: `object`

Defined in: [src/types/message.ts:82](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L82)

#### link

> **link**: `string`

***

### group\_id?

> `optional` **group\_id?**: `string`

Defined in: [src/types/message.ts:62](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L62)

WhatsApp group ID, used by the "group_id" parameter type to send a group invite link template

***

### image?

> `optional` **image?**: `object`

Defined in: [src/types/message.ts:79](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L79)

#### link

> **link**: `string`

***

### location?

> `optional` **location?**: `object`

Defined in: [src/types/message.ts:88](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L88)

#### address?

> `optional` **address?**: `string`

#### latitude

> **latitude**: `string` \| `number`

#### longitude

> **longitude**: `string` \| `number`

#### name?

> `optional` **name?**: `string`

***

### parameter\_name?

> `optional` **parameter\_name?**: `string`

Defined in: [src/types/message.ts:63](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L63)

***

### payload?

> `optional` **payload?**: `string`

Defined in: [src/types/message.ts:94](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L94)

***

### text?

> `optional` **text?**: `string`

Defined in: [src/types/message.ts:60](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L60)

***

### type

> **type**: `"text"` \| `"image"` \| `"document"` \| `"video"` \| `"location"` \| `"currency"` \| `"date_time"` \| `"payload"` \| `"action"` \| `"group_id"`

Defined in: [src/types/message.ts:59](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L59)

***

### video?

> `optional` **video?**: `object`

Defined in: [src/types/message.ts:85](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L85)

#### link

> **link**: `string`
