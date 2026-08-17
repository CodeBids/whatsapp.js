---
layout: default
title: "Interface: MessagePayload"
parent: Interfaces
grand_parent: API Reference
---
[**@thejulianjara/whatsapp.js v1.3.8**](../README.md)

***

[@thejulianjara/whatsapp.js](../globals.md) / MessagePayload

# Interface: MessagePayload

Defined in: [src/types/message.ts:187](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L187)

## Properties

### addressMessage?

> `optional` **addressMessage?**: [`AddressMessageData`](AddressMessageData.md)

Defined in: [src/types/message.ts:204](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L204)

***

### biz\_opaque\_callback\_data?

> `optional` **biz\_opaque\_callback\_data?**: `string`

Defined in: [src/types/message.ts:213](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L213)

***

### components?

> `optional` **components?**: [`Component`](../type-aliases/Component.md)[]

Defined in: [src/types/message.ts:193](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L193)

***

### content?

> `optional` **content?**: `string`

Defined in: [src/types/message.ts:190](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L190)

***

### context?

> `optional` **context?**: [`Context`](Context.md)

Defined in: [src/types/message.ts:197](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L197)

***

### embeds?

> `optional` **embeds?**: [`Embed`](Embed.md)[]

Defined in: [src/types/message.ts:198](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L198)

***

### files?

> `optional` **files?**: [`FileAttachment`](FileAttachment.md)[]

Defined in: [src/types/message.ts:194](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L194)

***

### flow?

> `optional` **flow?**: [`FlowData`](FlowData.md)

Defined in: [src/types/message.ts:203](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L203)

***

### interactive?

> `optional` **interactive?**: [`InteractiveData`](InteractiveData.md)

Defined in: [src/types/message.ts:195](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L195)

***

### locationRequest?

> `optional` **locationRequest?**: `object`

Defined in: [src/types/message.ts:200](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L200)

#### body

> **body**: `string`

***

### preview\_url?

> `optional` **preview\_url?**: `boolean`

Defined in: [src/types/message.ts:191](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L191)

***

### product?

> `optional` **product?**: [`ProductData`](ProductData.md)

Defined in: [src/types/message.ts:205](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L205)

***

### productList?

> `optional` **productList?**: `object`

Defined in: [src/types/message.ts:206](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L206)

#### body

> **body**: `string`

#### catalog\_id

> **catalog\_id**: `string`

#### footer?

> `optional` **footer?**: `string`

#### header?

> `optional` **header?**: `string`

#### sections

> **sections**: [`ProductListSection`](ProductListSection.md)[]

***

### reaction?

> `optional` **reaction?**: [`ReactionData`](ReactionData.md)

Defined in: [src/types/message.ts:196](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L196)

***

### recipient\_type?

> `optional` **recipient\_type?**: `"individual"` \| `"group"`

Defined in: [src/types/message.ts:189](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L189)

***

### template?

> `optional` **template?**: [`TemplateData`](TemplateData.md)

Defined in: [src/types/message.ts:192](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L192)

***

### to

> **to**: `string`

Defined in: [src/types/message.ts:188](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L188)
