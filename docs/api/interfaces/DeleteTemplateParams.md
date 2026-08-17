---
layout: default
title: "Interface: DeleteTemplateParams"
parent: Interfaces
grand_parent: API Reference
---
[**@thejulianjara/whatsapp.js v1.3.8**](../README.md)

***

[@thejulianjara/whatsapp.js](../globals.md) / DeleteTemplateParams

# Interface: DeleteTemplateParams

Defined in: [src/types/templates.ts:112](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/templates.ts#L112)

## Properties

### hsm\_id?

> `optional` **hsm\_id?**: `string`

Defined in: [src/types/templates.ts:116](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/templates.ts#L116)

Template ID; when provided, only that language variant is deleted

***

### name

> **name**: `string`

Defined in: [src/types/templates.ts:114](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/templates.ts#L114)

Template name. Deletes every language variant unless hsm_id narrows it to one.
