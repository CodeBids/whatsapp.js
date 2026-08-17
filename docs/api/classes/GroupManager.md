---
layout: default
title: "Class: GroupManager"
parent: Classes
grand_parent: API Reference
---
[**@thejulianjara/whatsapp.js v1.3.8**](../README.md)

***

[@thejulianjara/whatsapp.js](../globals.md) / GroupManager

# Class: GroupManager

Defined in: [src/client/actions/Groups.ts:28](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Groups.ts#L28)

Manages WhatsApp groups: creation, settings, invite links, join requests, and participant
removal. Requires the business phone number to be an Official Business Account (OBA)
operating on the Cloud API. Groups are invite-only — there's no "add participant" endpoint;
people join via an invite link or by having their join request approved.

## Constructors

### Constructor

> **new GroupManager**(`client`): `GroupManager`

Defined in: [src/client/actions/Groups.ts:31](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Groups.ts#L31)

#### Parameters

##### client

[`Client`](Client.md)

#### Returns

`GroupManager`

## Methods

### approveJoinRequests()

> **approveJoinRequests**(`groupId`, `joinRequestIds`): `Promise`\<[`ApproveGroupJoinRequestsResponse`](../interfaces/ApproveGroupJoinRequestsResponse.md)\>

Defined in: [src/client/actions/Groups.ts:233](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Groups.ts#L233)

Approves pending join requests.

#### Parameters

##### groupId

`string`

Group ID

##### joinRequestIds

`string`[]

IDs of the join requests to approve

#### Returns

`Promise`\<[`ApproveGroupJoinRequestsResponse`](../interfaces/ApproveGroupJoinRequestsResponse.md)\>

Which requests were approved, and which failed

***

### create()

> **create**(`payload`): `Promise`\<[`CreateGroupResponse`](../interfaces/CreateGroupResponse.md)\>

Defined in: [src/client/actions/Groups.ts:56](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Groups.ts#L56)

Creates a new group. The invite link isn't ready synchronously — it arrives via the
`group_lifecycle_update` webhook once the group finishes being created.

#### Parameters

##### payload

[`CreateGroupPayload`](../interfaces/CreateGroupPayload.md)

Group subject (required), description, and join approval mode

#### Returns

`Promise`\<[`CreateGroupResponse`](../interfaces/CreateGroupResponse.md)\>

The new group's ID

***

### delete()

> **delete**(`groupId`): `Promise`\<[`GroupSuccessResponse`](../interfaces/GroupSuccessResponse.md)\>

Defined in: [src/client/actions/Groups.ts:153](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Groups.ts#L153)

Deletes a group.

#### Parameters

##### groupId

`string`

Group ID

#### Returns

`Promise`\<[`GroupSuccessResponse`](../interfaces/GroupSuccessResponse.md)\>

API response

***

### get()

> **get**(`groupId`, `fields?`): `Promise`\<[`GroupDetails`](../interfaces/GroupDetails.md)\>

Defined in: [src/client/actions/Groups.ts:94](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Groups.ts#L94)

Gets details for a single group.

#### Parameters

##### groupId

`string`

Group ID

##### fields?

`string`[]

Fields to request (defaults to Meta's standard set when omitted)

#### Returns

`Promise`\<[`GroupDetails`](../interfaces/GroupDetails.md)\>

The group details

***

### getInviteLink()

> **getInviteLink**(`groupId`): `Promise`\<[`GroupInviteLinkResponse`](../interfaces/GroupInviteLinkResponse.md)\>

Defined in: [src/client/actions/Groups.ts:166](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Groups.ts#L166)

Gets a group's current invite link.

#### Parameters

##### groupId

`string`

Group ID

#### Returns

`Promise`\<[`GroupInviteLinkResponse`](../interfaces/GroupInviteLinkResponse.md)\>

The invite link

***

### getJoinRequests()

> **getJoinRequests**(`groupId`): `Promise`\<[`ListGroupJoinRequestsResponse`](../interfaces/ListGroupJoinRequestsResponse.md)\>

Defined in: [src/client/actions/Groups.ts:219](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Groups.ts#L219)

Lists pending join requests for a group with `join_approval_mode: "approval_required"`.

#### Parameters

##### groupId

`string`

Group ID

#### Returns

`Promise`\<[`ListGroupJoinRequestsResponse`](../interfaces/ListGroupJoinRequestsResponse.md)\>

The list of pending join requests

***

### list()

> **list**(`params?`): `Promise`\<[`ListGroupsResponse`](../interfaces/ListGroupsResponse.md)\>

Defined in: [src/client/actions/Groups.ts:73](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Groups.ts#L73)

Lists groups the business phone number is part of.

#### Parameters

##### params?

[`ListGroupsParams`](../interfaces/ListGroupsParams.md) = `{}`

Pagination options

#### Returns

`Promise`\<[`ListGroupsResponse`](../interfaces/ListGroupsResponse.md)\>

The list of groups

***

### rejectJoinRequests()

> **rejectJoinRequests**(`groupId`, `joinRequestIds`): `Promise`\<[`RejectGroupJoinRequestsResponse`](../interfaces/RejectGroupJoinRequestsResponse.md)\>

Defined in: [src/client/actions/Groups.ts:253](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Groups.ts#L253)

Rejects pending join requests.

#### Parameters

##### groupId

`string`

Group ID

##### joinRequestIds

`string`[]

IDs of the join requests to reject

#### Returns

`Promise`\<[`RejectGroupJoinRequestsResponse`](../interfaces/RejectGroupJoinRequestsResponse.md)\>

Which requests were rejected, and which failed

***

### removeParticipants()

> **removeParticipants**(`groupId`, `waIds`): `Promise`\<[`RemoveGroupParticipantsResponse`](../interfaces/RemoveGroupParticipantsResponse.md)\>

Defined in: [src/client/actions/Groups.ts:195](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Groups.ts#L195)

Removes participants from a group (up to 8 per call).

#### Parameters

##### groupId

`string`

Group ID

##### waIds

`string`[]

WhatsApp IDs of the participants to remove

#### Returns

`Promise`\<[`RemoveGroupParticipantsResponse`](../interfaces/RemoveGroupParticipantsResponse.md)\>

API response

***

### resetInviteLink()

> **resetInviteLink**(`groupId`): `Promise`\<[`GroupInviteLinkResponse`](../interfaces/GroupInviteLinkResponse.md)\>

Defined in: [src/client/actions/Groups.ts:179](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Groups.ts#L179)

Invalidates the current invite link and issues a new one.

#### Parameters

##### groupId

`string`

Group ID

#### Returns

`Promise`\<[`GroupInviteLinkResponse`](../interfaces/GroupInviteLinkResponse.md)\>

The new invite link

***

### update()

> **update**(`groupId`, `updates`): `Promise`\<[`GroupSuccessResponse`](../interfaces/GroupSuccessResponse.md)\>

Defined in: [src/client/actions/Groups.ts:121](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Groups.ts#L121)

Updates a group's subject, description and/or profile picture.

#### Parameters

##### groupId

`string`

Group ID

##### updates

[`UpdateGroupPayload`](../interfaces/UpdateGroupPayload.md)

Fields to update

#### Returns

`Promise`\<[`GroupSuccessResponse`](../interfaces/GroupSuccessResponse.md)\>

API response
