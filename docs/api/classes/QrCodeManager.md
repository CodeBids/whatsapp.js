---
layout: default
title: "Class: QrCodeManager"
parent: Classes
grand_parent: API Reference
---
[**@thejulianjara/whatsapp.js v1.3.8**](../README.md)

***

[@thejulianjara/whatsapp.js](../globals.md) / QrCodeManager

# Class: QrCodeManager

Defined in: [src/client/actions/QrCodes.ts:11](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/QrCodes.ts#L11)

Manages click-to-chat QR codes and short links for the phone number, via the
`message_qrdls` endpoint.

## Constructors

### Constructor

> **new QrCodeManager**(`client`): `QrCodeManager`

Defined in: [src/client/actions/QrCodes.ts:14](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/QrCodes.ts#L14)

#### Parameters

##### client

[`Client`](Client.md)

#### Returns

`QrCodeManager`

## Methods

### create()

> **create**(`params`): `Promise`\<[`QrCodeRecord`](../interfaces/QrCodeRecord.md)\>

Defined in: [src/client/actions/QrCodes.ts:36](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/QrCodes.ts#L36)

Creates a new QR code / short link that opens a chat pre-filled with a message.

#### Parameters

##### params

[`CreateQrCodeParams`](../interfaces/CreateQrCodeParams.md)

The pre-filled message and optional QR image format

#### Returns

`Promise`\<[`QrCodeRecord`](../interfaces/QrCodeRecord.md)\>

The created QR code record

***

### delete()

> **delete**(`codeId`): `Promise`\<[`QrCodeSuccessResponse`](../interfaces/QrCodeSuccessResponse.md)\>

Defined in: [src/client/actions/QrCodes.ts:90](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/QrCodes.ts#L90)

Deletes a QR code / short link.

#### Parameters

##### codeId

`string`

QR code ID

#### Returns

`Promise`\<[`QrCodeSuccessResponse`](../interfaces/QrCodeSuccessResponse.md)\>

API response

***

### get()

> **get**(`codeId`): `Promise`\<[`QrCodeRecord`](../interfaces/QrCodeRecord.md)\>

Defined in: [src/client/actions/QrCodes.ts:58](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/QrCodes.ts#L58)

Gets a single QR code by its code ID.

#### Parameters

##### codeId

`string`

QR code ID

#### Returns

`Promise`\<[`QrCodeRecord`](../interfaces/QrCodeRecord.md)\>

The QR code record

***

### list()

> **list**(): `Promise`\<[`QrCodeListResponse`](../interfaces/QrCodeListResponse.md)\>

Defined in: [src/client/actions/QrCodes.ts:49](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/QrCodes.ts#L49)

Lists every QR code / short link created for the phone number.

#### Returns

`Promise`\<[`QrCodeListResponse`](../interfaces/QrCodeListResponse.md)\>

The list of QR codes

***

### update()

> **update**(`codeId`, `prefilledMessage`): `Promise`\<[`QrCodeRecord`](../interfaces/QrCodeRecord.md)\>

Defined in: [src/client/actions/QrCodes.ts:72](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/QrCodes.ts#L72)

Updates the pre-filled message of an existing QR code. The code and link stay the same.

#### Parameters

##### codeId

`string`

QR code ID

##### prefilledMessage

`string`

New pre-filled message

#### Returns

`Promise`\<[`QrCodeRecord`](../interfaces/QrCodeRecord.md)\>

The updated QR code record
