---
layout: default
title: "Interface: CreateTemplatePayload"
parent: Interfaces
grand_parent: API Reference
---
[**@thejulianjara/whatsapp.js v1.3.8**](../README.md)

***

[@thejulianjara/whatsapp.js](../globals.md) / CreateTemplatePayload

# Interface: CreateTemplatePayload

Defined in: [src/types/templates.ts:51](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/templates.ts#L51)

## Properties

### allow\_category\_change?

> `optional` **allow\_category\_change?**: `boolean`

Defined in: [src/types/templates.ts:59](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/templates.ts#L59)

Whether Meta may automatically recategorize the template instead of rejecting it

***

### category

> **category**: [`TemplateCategory`](../type-aliases/TemplateCategory.md)

Defined in: [src/types/templates.ts:56](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/templates.ts#L56)

***

### components

> **components**: [`TemplateCreationComponent`](TemplateCreationComponent.md)[]

Defined in: [src/types/templates.ts:57](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/templates.ts#L57)

***

### language

> **language**: `string`

Defined in: [src/types/templates.ts:55](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/templates.ts#L55)

Template language code (e.g. "en_US")

***

### name

> **name**: `string`

Defined in: [src/types/templates.ts:53](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/templates.ts#L53)

Lowercase letters, numbers and underscores only
