---
layout: default
title: "Class: PhoneNumberManager"
parent: Classes
grand_parent: API Reference
---
[**@thejulianjara/whatsapp.js v1.3.8**](../README.md)

***

[@thejulianjara/whatsapp.js](../globals.md) / PhoneNumberManager

# Class: PhoneNumberManager

Defined in: [src/client/actions/PhoneNumbers.ts:28](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/PhoneNumbers.ts#L28)

Manages WhatsApp Business phone numbers: listing, registration, verification, and
two-step verification, via the Business Management API.

## Constructors

### Constructor

> **new PhoneNumberManager**(`client`): `PhoneNumberManager`

Defined in: [src/client/actions/PhoneNumbers.ts:31](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/PhoneNumbers.ts#L31)

#### Parameters

##### client

[`Client`](Client.md)

#### Returns

`PhoneNumberManager`

## Methods

### deregister()

> **deregister**(`phoneNumberId?`): `Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

Defined in: [src/client/actions/PhoneNumbers.ts:150](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/PhoneNumbers.ts#L150)

Deregisters a phone number from the Cloud API. The number stops being reachable through
this integration until it's registered again.

#### Parameters

##### phoneNumberId?

`string`

Phone number ID; defaults to the client's own number

#### Returns

`Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

API response

***

### get()

> **get**(`phoneNumberId?`, `fields?`): `Promise`\<[`PhoneNumberDetails`](../interfaces/PhoneNumberDetails.md)\>

Defined in: [src/client/actions/PhoneNumbers.ts:78](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/PhoneNumbers.ts#L78)

Gets details for a single phone number.

#### Parameters

##### phoneNumberId?

`string`

Phone number ID to look up; defaults to the client's own number

##### fields?

`string`[] = `DEFAULT_DETAIL_FIELDS`

Fields to request

#### Returns

`Promise`\<[`PhoneNumberDetails`](../interfaces/PhoneNumberDetails.md)\>

The phone number details

***

### list()

> **list**(`params?`): `Promise`\<[`PhoneNumberListResponse`](../interfaces/PhoneNumberListResponse.md)\>

Defined in: [src/client/actions/PhoneNumbers.ts:48](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/PhoneNumbers.ts#L48)

Lists every phone number on the WhatsApp Business Account.
Requires `wabaId` to be set on the Client.

#### Parameters

##### params?

[`ListPhoneNumbersParams`](../interfaces/ListPhoneNumbersParams.md) = `{}`

Filtering and pagination options

#### Returns

`Promise`\<[`PhoneNumberListResponse`](../interfaces/PhoneNumberListResponse.md)\>

The list of phone numbers

***

### register()

> **register**(`pin`, `phoneNumberId?`): `Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

Defined in: [src/client/actions/PhoneNumbers.ts:134](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/PhoneNumbers.ts#L134)

Registers a verified phone number for use with the Cloud API.

#### Parameters

##### pin

`string`

Six-digit two-step verification PIN for the number

##### phoneNumberId?

`string`

Phone number ID; defaults to the client's own number

#### Returns

`Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

API response

***

### requestVerificationCode()

> **requestVerificationCode**(`params`, `phoneNumberId?`): `Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

Defined in: [src/client/actions/PhoneNumbers.ts:92](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/PhoneNumbers.ts#L92)

Requests a verification code (via SMS or voice call) for a phone number that has
already been added but not yet verified.

#### Parameters

##### params

[`RequestVerificationCodeParams`](../interfaces/RequestVerificationCodeParams.md)

Delivery method and language for the code

##### phoneNumberId?

`string`

Phone number ID; defaults to the client's own number

#### Returns

`Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

API response

***

### setTwoStepVerificationPin()

> **setTwoStepVerificationPin**(`pin`, `phoneNumberId?`): `Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

Defined in: [src/client/actions/PhoneNumbers.ts:162](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/PhoneNumbers.ts#L162)

Sets or updates the two-step verification PIN for a phone number.

#### Parameters

##### pin

`string`

Six-digit PIN

##### phoneNumberId?

`string`

Phone number ID; defaults to the client's own number

#### Returns

`Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

API response

***

### updateSettings()

> **updateSettings**(`settings`, `phoneNumberId?`): `Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

Defined in: [src/client/actions/PhoneNumbers.ts:175](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/PhoneNumbers.ts#L175)

Updates phone number settings, such as identity change notifications.

#### Parameters

##### settings

[`UpdatePhoneNumberSettingsPayload`](../interfaces/UpdatePhoneNumberSettingsPayload.md)

Settings to update

##### phoneNumberId?

`string`

Phone number ID; defaults to the client's own number

#### Returns

`Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

API response

***

### verifyCode()

> **verifyCode**(`code`, `phoneNumberId?`): `Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

Defined in: [src/client/actions/PhoneNumbers.ts:118](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/PhoneNumbers.ts#L118)

Submits the verification code received via SMS/voice to complete phone number verification.

#### Parameters

##### code

`string`

Numeric verification code

##### phoneNumberId?

`string`

Phone number ID; defaults to the client's own number

#### Returns

`Promise`\<[`SuccessResponse`](../interfaces/SuccessResponse.md)\>

API response
