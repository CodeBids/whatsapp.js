---
layout: default
title: "Class: ConversationalAutomationManager"
parent: Classes
grand_parent: API Reference
---
[**@thejulianjara/whatsapp.js v1.3.8**](../README.md)

***

[@thejulianjara/whatsapp.js](../globals.md) / ConversationalAutomationManager

# Class: ConversationalAutomationManager

Defined in: [src/client/actions/ConversationalAutomation.ts:14](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/ConversationalAutomation.ts#L14)

Manages Conversational Components for the phone number: the welcome message shown
on a user's first chat, slash-style commands, and ice breaker prompts.

## Constructors

### Constructor

> **new ConversationalAutomationManager**(`client`): `ConversationalAutomationManager`

Defined in: [src/client/actions/ConversationalAutomation.ts:17](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/ConversationalAutomation.ts#L17)

#### Parameters

##### client

[`Client`](Client.md)

#### Returns

`ConversationalAutomationManager`

## Methods

### get()

> **get**(): `Promise`\<[`ConversationalAutomationSettings`](../interfaces/ConversationalAutomationSettings.md)\>

Defined in: [src/client/actions/ConversationalAutomation.ts:25](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/ConversationalAutomation.ts#L25)

Gets the current Conversational Components configuration.

#### Returns

`Promise`\<[`ConversationalAutomationSettings`](../interfaces/ConversationalAutomationSettings.md)\>

The welcome message toggle, commands, and prompts currently configured

***

### update()

> **update**(`settings`): `Promise`\<[`ConversationalAutomationSuccessResponse`](../interfaces/ConversationalAutomationSuccessResponse.md)\>

Defined in: [src/client/actions/ConversationalAutomation.ts:39](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/ConversationalAutomation.ts#L39)

Updates the Conversational Components configuration. Only the fields provided are changed.

#### Parameters

##### settings

[`UpdateConversationalAutomationPayload`](../interfaces/UpdateConversationalAutomationPayload.md)

Fields to update

#### Returns

`Promise`\<[`ConversationalAutomationSuccessResponse`](../interfaces/ConversationalAutomationSuccessResponse.md)\>

API response
