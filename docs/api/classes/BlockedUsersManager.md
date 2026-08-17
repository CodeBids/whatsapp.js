---
layout: default
title: "Class: BlockedUsersManager"
parent: Classes
grand_parent: API Reference
---
[**@thejulianjara/whatsapp.js v1.3.8**](../README.md)

***

[@thejulianjara/whatsapp.js](../globals.md) / BlockedUsersManager

# Class: BlockedUsersManager

Defined in: [src/client/actions/BlockedUsers.ts:15](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/BlockedUsers.ts#L15)

Manages the phone number's block list: blocking/unblocking users and listing who's
currently blocked, via the `block_users` endpoint. Blocked users can't send messages
to, or receive messages from, this phone number.

## Constructors

### Constructor

> **new BlockedUsersManager**(`client`): `BlockedUsersManager`

Defined in: [src/client/actions/BlockedUsers.ts:18](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/BlockedUsers.ts#L18)

#### Parameters

##### client

[`Client`](Client.md)

#### Returns

`BlockedUsersManager`

## Methods

### block()

> **block**(`waIds`): `Promise`\<[`BlockUsersResponse`](../interfaces/BlockUsersResponse.md)\>

Defined in: [src/client/actions/BlockedUsers.ts:33](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/BlockedUsers.ts#L33)

Blocks one or more users, by WhatsApp ID / phone number.

#### Parameters

##### waIds

`string`[]

WhatsApp IDs (phone numbers, international format, no leading "+")

#### Returns

`Promise`\<[`BlockUsersResponse`](../interfaces/BlockUsersResponse.md)\>

Which users were blocked and which failed, if any

***

### list()

> **list**(`params?`): `Promise`\<[`ListBlockedUsersResponse`](../interfaces/ListBlockedUsersResponse.md)\>

Defined in: [src/client/actions/BlockedUsers.ts:61](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/BlockedUsers.ts#L61)

Lists users currently blocked by this phone number.

#### Parameters

##### params?

[`ListBlockedUsersParams`](../interfaces/ListBlockedUsersParams.md) = `{}`

Pagination options

#### Returns

`Promise`\<[`ListBlockedUsersResponse`](../interfaces/ListBlockedUsersResponse.md)\>

The list of blocked users

***

### unblock()

> **unblock**(`waIds`): `Promise`\<[`UnblockUsersResponse`](../interfaces/UnblockUsersResponse.md)\>

Defined in: [src/client/actions/BlockedUsers.ts:47](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/BlockedUsers.ts#L47)

Unblocks one or more previously blocked users.

#### Parameters

##### waIds

`string`[]

WhatsApp IDs (phone numbers, international format, no leading "+")

#### Returns

`Promise`\<[`UnblockUsersResponse`](../interfaces/UnblockUsersResponse.md)\>

Which users were unblocked
