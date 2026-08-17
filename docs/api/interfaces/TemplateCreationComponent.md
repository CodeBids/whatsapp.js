---
layout: default
title: "Interface: TemplateCreationComponent"
parent: Interfaces
grand_parent: API Reference
---
[**@thejulianjara/whatsapp.js v1.3.8**](../README.md)

***

[@thejulianjara/whatsapp.js](../globals.md) / TemplateCreationComponent

# Interface: TemplateCreationComponent

Defined in: [src/types/templates.ts:39](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/templates.ts#L39)

A component within a template's structure, as sent to / returned from the Business Management API.

## Properties

### buttons?

> `optional` **buttons?**: [`TemplateCreationButton`](TemplateCreationButton.md)[]

Defined in: [src/types/templates.ts:48](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/templates.ts#L48)

***

### example?

> `optional` **example?**: `object`

Defined in: [src/types/templates.ts:43](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/templates.ts#L43)

#### body\_text?

> `optional` **body\_text?**: `string`[][]

#### header\_handle?

> `optional` **header\_handle?**: `string`[]

#### header\_text?

> `optional` **header\_text?**: `string`[]

***

### format?

> `optional` **format?**: `"TEXT"` \| `"IMAGE"` \| `"VIDEO"` \| `"DOCUMENT"` \| `"LOCATION"`

Defined in: [src/types/templates.ts:41](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/templates.ts#L41)

***

### text?

> `optional` **text?**: `string`

Defined in: [src/types/templates.ts:42](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/templates.ts#L42)

***

### type

> **type**: `"HEADER"` \| `"BODY"` \| `"FOOTER"` \| `"BUTTONS"`

Defined in: [src/types/templates.ts:40](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/templates.ts#L40)
