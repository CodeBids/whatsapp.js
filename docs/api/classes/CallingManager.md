---
layout: default
title: "Class: CallingManager"
parent: Classes
grand_parent: API Reference
---
[**@thejulianjara/whatsapp.js v1.3.8**](../README.md)

***

[@thejulianjara/whatsapp.js](../globals.md) / CallingManager

# Class: CallingManager

Defined in: [src/client/actions/Calling.ts:20](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Calling.ts#L20)

Manages WhatsApp Business Calling: initiating and controlling calls, and calling
settings, via the `calls` and `settings` endpoints.

The Calling API is a newer, still-evolving part of the Cloud API — treat this manager
as beta. Method shapes follow Meta's published documentation as closely as possible,
but field names/behavior may still change on Meta's side.

## Constructors

### Constructor

> **new CallingManager**(`client`): `CallingManager`

Defined in: [src/client/actions/Calling.ts:23](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Calling.ts#L23)

#### Parameters

##### client

[`Client`](Client.md)

#### Returns

`CallingManager`

## Methods

### accept()

> **accept**(`callId`, `session`): `Promise`\<[`CallActionResponse`](../interfaces/CallActionResponse.md)\>

Defined in: [src/client/actions/Calling.ts:62](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Calling.ts#L62)

Accepts an incoming call.

#### Parameters

##### callId

`string`

Call ID, from the incoming `calls` webhook event

##### session

[`CallSdpSession`](../interfaces/CallSdpSession.md)

SDP answer

#### Returns

`Promise`\<[`CallActionResponse`](../interfaces/CallActionResponse.md)\>

API response

***

### connect()

> **connect**(`to`, `session?`): `Promise`\<[`InitiateCallResponse`](../interfaces/InitiateCallResponse.md)\>

Defined in: [src/client/actions/Calling.ts:33](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Calling.ts#L33)

Initiates a business-to-user call.

#### Parameters

##### to

`string`

Recipient's WhatsApp ID (phone number, international format, no leading "+")

##### session?

[`CallSdpSession`](../interfaces/CallSdpSession.md)

Optional SDP offer to send with the call request

#### Returns

`Promise`\<[`InitiateCallResponse`](../interfaces/InitiateCallResponse.md)\>

The initiated call's ID

***

### getSettings()

> **getSettings**(): `Promise`\<[`CallingSettings`](../interfaces/CallingSettings.md) \| `undefined`\>

Defined in: [src/client/actions/Calling.ts:105](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Calling.ts#L105)

Gets the phone number's current calling settings.

#### Returns

`Promise`\<[`CallingSettings`](../interfaces/CallingSettings.md) \| `undefined`\>

The calling settings, if calling has been configured for this number

***

### preAccept()

> **preAccept**(`callId`, `session`): `Promise`\<[`CallActionResponse`](../interfaces/CallActionResponse.md)\>

Defined in: [src/client/actions/Calling.ts:52](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Calling.ts#L52)

Sends a pre-accept SDP answer for an incoming call, before fully accepting it.

#### Parameters

##### callId

`string`

Call ID, from the incoming `calls` webhook event

##### session

[`CallSdpSession`](../interfaces/CallSdpSession.md)

SDP answer

#### Returns

`Promise`\<[`CallActionResponse`](../interfaces/CallActionResponse.md)\>

API response

***

### reject()

> **reject**(`callId`): `Promise`\<[`CallActionResponse`](../interfaces/CallActionResponse.md)\>

Defined in: [src/client/actions/Calling.ts:71](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Calling.ts#L71)

Rejects an incoming call.

#### Parameters

##### callId

`string`

Call ID, from the incoming `calls` webhook event

#### Returns

`Promise`\<[`CallActionResponse`](../interfaces/CallActionResponse.md)\>

API response

***

### terminate()

> **terminate**(`callId`): `Promise`\<[`CallActionResponse`](../interfaces/CallActionResponse.md)\>

Defined in: [src/client/actions/Calling.ts:80](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Calling.ts#L80)

Terminates an ongoing call.

#### Parameters

##### callId

`string`

Call ID

#### Returns

`Promise`\<[`CallActionResponse`](../interfaces/CallActionResponse.md)\>

API response

***

### updateSettings()

> **updateSettings**(`settings`): `Promise`\<[`CallSettingsSuccessResponse`](../interfaces/CallSettingsSuccessResponse.md)\>

Defined in: [src/client/actions/Calling.ts:119](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Calling.ts#L119)

Updates the phone number's calling settings.

#### Parameters

##### settings

[`CallingSettings`](../interfaces/CallingSettings.md)

Settings to update

#### Returns

`Promise`\<[`CallSettingsSuccessResponse`](../interfaces/CallSettingsSuccessResponse.md)\>

API response
