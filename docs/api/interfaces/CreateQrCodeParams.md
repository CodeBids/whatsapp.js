---
layout: default
title: "Interface: CreateQrCodeParams"
parent: Interfaces
grand_parent: API Reference
---
[**@thejulianjara/whatsapp.js v1.3.8**](../README.md)

***

[@thejulianjara/whatsapp.js](../globals.md) / CreateQrCodeParams

# Interface: CreateQrCodeParams

Defined in: [src/types/qrCodes.ts:17](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/qrCodes.ts#L17)

## Properties

### generateQrImage?

> `optional` **generateQrImage?**: [`QrCodeImageFormat`](../type-aliases/QrCodeImageFormat.md)

Defined in: [src/types/qrCodes.ts:21](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/qrCodes.ts#L21)

When provided, the response includes a qr_image_url in this image format

***

### prefilledMessage

> **prefilledMessage**: `string`

Defined in: [src/types/qrCodes.ts:19](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/types/qrCodes.ts#L19)

Message pre-filled in the chat when a user scans the code or opens the link (max 140 characters)
