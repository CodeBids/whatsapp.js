---
layout: default
title: "Interface: MessageBodyPayload"
parent: Interfaces
grand_parent: API Reference
---
[**@thejulianjara/whatsapp.js v1.3.8**](../README.md)

***

[@thejulianjara/whatsapp.js](../globals.md) / MessageBodyPayload

# Interface: MessageBodyPayload

Defined in: [src/types/message.ts:267](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L267)

## Properties

### address\_message?

> `optional` **address\_message?**: `object`

Defined in: [src/types/message.ts:312](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L312)

#### country

> **country**: `string`

#### saved\_addresses?

> `optional` **saved\_addresses?**: `object`[]

#### values?

> `optional` **values?**: `Record`\<`string`, `string`\>

***

### audio?

> `optional` **audio?**: `object`

Defined in: [src/types/message.ts:295](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L295)

#### id?

> `optional` **id?**: `string`

#### link?

> `optional` **link?**: `string`

***

### biz\_opaque\_callback\_data?

> `optional` **biz\_opaque\_callback\_data?**: `string`

Defined in: [src/types/message.ts:320](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L320)

***

### contacts?

> `optional` **contacts?**: [`ContactPayloadData`](ContactPayloadData.md)[]

Defined in: [src/types/message.ts:309](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L309)

***

### context?

> `optional` **context?**: [`Context`](Context.md)

Defined in: [src/types/message.ts:272](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L272)

***

### document?

> `optional` **document?**: `object`

Defined in: [src/types/message.ts:289](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L289)

#### caption?

> `optional` **caption?**: `string`

#### filename?

> `optional` **filename?**: `string`

#### id?

> `optional` **id?**: `string`

#### link?

> `optional` **link?**: `string`

***

### image?

> `optional` **image?**: `object`

Defined in: [src/types/message.ts:284](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L284)

#### caption?

> `optional` **caption?**: `string`

#### id?

> `optional` **id?**: `string`

#### link?

> `optional` **link?**: `string`

***

### interactive?

> `optional` **interactive?**: [`InteractiveData`](InteractiveData.md)

Defined in: [src/types/message.ts:310](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L310)

***

### location?

> `optional` **location?**: [`LocationData`](LocationData.md)

Defined in: [src/types/message.ts:308](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L308)

***

### messaging\_product

> **messaging\_product**: `string`

Defined in: [src/types/message.ts:268](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L268)

***

### reaction?

> `optional` **reaction?**: [`ReactionData`](ReactionData.md)

Defined in: [src/types/message.ts:311](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L311)

***

### recipient\_type?

> `optional` **recipient\_type?**: `string`

Defined in: [src/types/message.ts:269](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L269)

***

### sticker?

> `optional` **sticker?**: `object`

Defined in: [src/types/message.ts:304](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L304)

#### id?

> `optional` **id?**: `string`

#### link?

> `optional` **link?**: `string`

***

### template?

> `optional` **template?**: `object`

Defined in: [src/types/message.ts:277](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L277)

#### components?

> `optional` **components?**: [`TemplateComponent`](TemplateComponent.md)[]

#### language

> **language**: `object`

##### language.code

> **code**: [`LanguageCode`](../enumerations/LanguageCode.md)

#### name

> **name**: `string`

***

### text?

> `optional` **text?**: `object`

Defined in: [src/types/message.ts:273](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L273)

#### body

> **body**: `string`

#### preview\_url?

> `optional` **preview\_url?**: `boolean`

***

### to

> **to**: `string`

Defined in: [src/types/message.ts:270](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L270)

***

### type

> **type**: [`MessageType`](../type-aliases/MessageType.md)

Defined in: [src/types/message.ts:271](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L271)

***

### video?

> `optional` **video?**: `object`

Defined in: [src/types/message.ts:299](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L299)

#### caption?

> `optional` **caption?**: `string`

#### id?

> `optional` **id?**: `string`

#### link?

> `optional` **link?**: `string`
