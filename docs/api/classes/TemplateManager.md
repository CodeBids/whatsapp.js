---
layout: default
title: "Class: TemplateManager"
parent: Classes
grand_parent: API Reference
---
[**@thejulianjara/whatsapp.js v1.3.8**](../README.md)

***

[@thejulianjara/whatsapp.js](../globals.md) / TemplateManager

# Class: TemplateManager

Defined in: [src/client/actions/Templates.ts:21](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Templates.ts#L21)

Manages WhatsApp message templates (create, list, get, update, delete) via the
Business Management API. All methods require `wabaId` to be set on the Client,
since templates live on the WhatsApp Business Account, not on a single phone number.

## Constructors

### Constructor

> **new TemplateManager**(`client`): `TemplateManager`

Defined in: [src/client/actions/Templates.ts:24](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Templates.ts#L24)

#### Parameters

##### client

[`Client`](Client.md)

#### Returns

`TemplateManager`

## Methods

### create()

> **create**(`payload`): `Promise`\<[`CreateTemplateResponse`](../interfaces/CreateTemplateResponse.md)\>

Defined in: [src/client/actions/Templates.ts:46](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Templates.ts#L46)

Creates a new message template, submitting it for Meta's review.

#### Parameters

##### payload

[`CreateTemplatePayload`](../interfaces/CreateTemplatePayload.md)

Template name, language, category and components

#### Returns

`Promise`\<[`CreateTemplateResponse`](../interfaces/CreateTemplateResponse.md)\>

The created template's ID and initial status

***

### delete()

> **delete**(`params`): `Promise`\<[`TemplateSuccessResponse`](../interfaces/TemplateSuccessResponse.md)\>

Defined in: [src/client/actions/Templates.ts:136](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Templates.ts#L136)

Deletes a template by name. Deletes every language variant unless `hsm_id` is provided
to target a single one.

#### Parameters

##### params

[`DeleteTemplateParams`](../interfaces/DeleteTemplateParams.md)

Name (required) and optional hsm_id

#### Returns

`Promise`\<[`TemplateSuccessResponse`](../interfaces/TemplateSuccessResponse.md)\>

API response

***

### get()

> **get**(`templateId`, `fields?`): `Promise`\<[`TemplateRecord`](../interfaces/TemplateRecord.md)\>

Defined in: [src/client/actions/Templates.ts:101](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Templates.ts#L101)

Gets a single template by ID.

#### Parameters

##### templateId

`string`

Template ID

##### fields?

`string`[] = `DEFAULT_GET_FIELDS`

Fields to request

#### Returns

`Promise`\<[`TemplateRecord`](../interfaces/TemplateRecord.md)\>

The template

***

### list()

> **list**(`params?`): `Promise`\<[`TemplateListResponse`](../interfaces/TemplateListResponse.md)\>

Defined in: [src/client/actions/Templates.ts:76](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Templates.ts#L76)

Lists message templates on the WhatsApp Business Account.

#### Parameters

##### params?

[`ListTemplatesParams`](../interfaces/ListTemplatesParams.md) = `{}`

Filtering and pagination options

#### Returns

`Promise`\<[`TemplateListResponse`](../interfaces/TemplateListResponse.md)\>

The list of templates

***

### update()

> **update**(`templateId`, `updates`): `Promise`\<[`TemplateSuccessResponse`](../interfaces/TemplateSuccessResponse.md)\>

Defined in: [src/client/actions/Templates.ts:118](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Templates.ts#L118)

Edits an existing template's category and/or components. Editing a template
that has already been approved resets it to PENDING review.

#### Parameters

##### templateId

`string`

Template ID

##### updates

[`UpdateTemplatePayload`](../interfaces/UpdateTemplatePayload.md)

Fields to update

#### Returns

`Promise`\<[`TemplateSuccessResponse`](../interfaces/TemplateSuccessResponse.md)\>

API response
