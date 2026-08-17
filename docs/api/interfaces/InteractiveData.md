---
layout: default
title: "Interface: InteractiveData"
parent: Interfaces
grand_parent: API Reference
---
[**@thejulianjara/whatsapp.js v1.3.8**](../README.md)

***

[@thejulianjara/whatsapp.js](../globals.md) / InteractiveData

# Interface: InteractiveData

Defined in: [src/types/message.ts:110](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L110)

## Properties

### action?

> `optional` **action?**: `object`

Defined in: [src/types/message.ts:134](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L134)

#### button?

> `optional` **button?**: `string`

#### buttons?

> `optional` **buttons?**: `object`[]

#### catalog\_id?

> `optional` **catalog\_id?**: `string`

#### flow\_action?

> `optional` **flow\_action?**: `"navigate"` \| `"data_exchange"`

#### flow\_action\_payload?

> `optional` **flow\_action\_payload?**: `object`

##### flow\_action\_payload.data?

> `optional` **data?**: `Record`\<`string`, `any`\>

##### flow\_action\_payload.screen?

> `optional` **screen?**: `string`

#### flow\_cta?

> `optional` **flow\_cta?**: `string`

#### flow\_id?

> `optional` **flow\_id?**: `string`

#### flow\_message\_version?

> `optional` **flow\_message\_version?**: `string`

#### flow\_token?

> `optional` **flow\_token?**: `string`

#### name?

> `optional` **name?**: `string`

#### parameters?

> `optional` **parameters?**: `object`

##### parameters.display\_text

> **display\_text**: `string`

##### parameters.url

> **url**: `string`

#### product\_retailer\_id?

> `optional` **product\_retailer\_id?**: `string`

#### sections?

> `optional` **sections?**: `object`[]

#### sections\_product\_list?

> `optional` **sections\_product\_list?**: `object`[]

***

### body

> **body**: `object`

Defined in: [src/types/message.ts:128](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L128)

#### text

> **text**: `string`

***

### footer?

> `optional` **footer?**: `object`

Defined in: [src/types/message.ts:131](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L131)

#### text

> **text**: `string`

***

### header?

> `optional` **header?**: `object`

Defined in: [src/types/message.ts:112](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L112)

#### document?

> `optional` **document?**: `object`

##### document.id?

> `optional` **id?**: `string`

##### document.link?

> `optional` **link?**: `string`

#### image?

> `optional` **image?**: `object`

##### image.id?

> `optional` **id?**: `string`

##### image.link?

> `optional` **link?**: `string`

#### text?

> `optional` **text?**: `string`

#### type

> **type**: `"text"` \| `"image"` \| `"document"` \| `"video"` \| `"location"`

#### video?

> `optional` **video?**: `object`

##### video.id?

> `optional` **id?**: `string`

##### video.link?

> `optional` **link?**: `string`

***

### type

> **type**: `"text"` \| `"address_message"` \| `"button"` \| `"flow"` \| `"list"` \| `"product"` \| `"product_list"` \| `"cta_url"` \| `"location_request_message"`

Defined in: [src/types/message.ts:111](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/message.ts#L111)
