---
layout: default
title: "Class: FlowManager"
parent: Classes
grand_parent: API Reference
---
[**@thejulianjara/whatsapp.js v1.3.8**](../README.md)

***

[@thejulianjara/whatsapp.js](../globals.md) / FlowManager

# Class: FlowManager

Defined in: [src/client/actions/Flows.ts:23](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Flows.ts#L23)

Manages WhatsApp Flows: creation, metadata and JSON updates, publishing, deprecation,
deletion, and previews. `create()` and `list()` require `wabaId` to be set on the Client;
the rest operate directly on a Flow ID.

## Constructors

### Constructor

> **new FlowManager**(`client`): `FlowManager`

Defined in: [src/client/actions/Flows.ts:26](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Flows.ts#L26)

#### Parameters

##### client

[`Client`](Client.md)

#### Returns

`FlowManager`

## Methods

### create()

> **create**(`payload`): `Promise`\<[`CreateFlowResponse`](../interfaces/CreateFlowResponse.md)\>

Defined in: [src/client/actions/Flows.ts:48](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Flows.ts#L48)

Creates a new Flow.

#### Parameters

##### payload

[`CreateFlowPayload`](../interfaces/CreateFlowPayload.md)

Flow name, categories, and optional JSON/clone/endpoint/publish options

#### Returns

`Promise`\<[`CreateFlowResponse`](../interfaces/CreateFlowResponse.md)\>

The created Flow's ID and any validation errors found in flow_json

***

### delete()

> **delete**(`flowId`): `Promise`\<[`FlowSuccessResponse`](../interfaces/FlowSuccessResponse.md)\>

Defined in: [src/client/actions/Flows.ts:167](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Flows.ts#L167)

Deletes a Flow. Only Flows in DRAFT status can be deleted.

#### Parameters

##### flowId

`string`

Flow ID

#### Returns

`Promise`\<[`FlowSuccessResponse`](../interfaces/FlowSuccessResponse.md)\>

API response

***

### deprecate()

> **deprecate**(`flowId`): `Promise`\<[`FlowSuccessResponse`](../interfaces/FlowSuccessResponse.md)\>

Defined in: [src/client/actions/Flows.ts:154](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Flows.ts#L154)

Deprecates a published Flow so it can no longer be sent to users.

#### Parameters

##### flowId

`string`

Flow ID

#### Returns

`Promise`\<[`FlowSuccessResponse`](../interfaces/FlowSuccessResponse.md)\>

API response

***

### get()

> **get**(`flowId`, `fields?`): `Promise`\<[`FlowDetails`](../interfaces/FlowDetails.md)\>

Defined in: [src/client/actions/Flows.ts:86](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Flows.ts#L86)

Gets details for a single Flow.

#### Parameters

##### flowId

`string`

Flow ID

##### fields?

`string`[] = `DEFAULT_GET_FIELDS`

Fields to request

#### Returns

`Promise`\<[`FlowDetails`](../interfaces/FlowDetails.md)\>

The Flow details

***

### getAssets()

> **getAssets**(`flowId`): `Promise`\<[`FlowAssetListResponse`](../interfaces/FlowAssetListResponse.md)\>

Defined in: [src/client/actions/Flows.ts:180](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Flows.ts#L180)

Lists the assets uploaded to a Flow (e.g. its flow.json).

#### Parameters

##### flowId

`string`

Flow ID

#### Returns

`Promise`\<[`FlowAssetListResponse`](../interfaces/FlowAssetListResponse.md)\>

The Flow's assets, with download URLs

***

### getPreviewUrl()

> **getPreviewUrl**(`flowId`, `invalidate?`): `Promise`\<[`FlowPreviewResponse`](../interfaces/FlowPreviewResponse.md)\>

Defined in: [src/client/actions/Flows.ts:194](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Flows.ts#L194)

Gets a shareable preview URL for a Flow, valid for 30 days.

#### Parameters

##### flowId

`string`

Flow ID

##### invalidate?

`boolean` = `false`

When true, invalidates the previous preview URL and issues a new one

#### Returns

`Promise`\<[`FlowPreviewResponse`](../interfaces/FlowPreviewResponse.md)\>

The preview URL and its expiry

***

### list()

> **list**(`params?`): `Promise`\<[`FlowListResponse`](../interfaces/FlowListResponse.md)\>

Defined in: [src/client/actions/Flows.ts:67](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Flows.ts#L67)

Lists Flows on the WhatsApp Business Account.

#### Parameters

##### params?

[`ListFlowsParams`](../interfaces/ListFlowsParams.md) = `{}`

Filtering and pagination options

#### Returns

`Promise`\<[`FlowListResponse`](../interfaces/FlowListResponse.md)\>

The list of Flows

***

### publish()

> **publish**(`flowId`): `Promise`\<[`FlowSuccessResponse`](../interfaces/FlowSuccessResponse.md)\>

Defined in: [src/client/actions/Flows.ts:141](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Flows.ts#L141)

Publishes a Flow, making it usable in flow messages. The Flow must have valid JSON
uploaded first. Published Flows cannot be edited or deleted, only deprecated.

#### Parameters

##### flowId

`string`

Flow ID

#### Returns

`Promise`\<[`FlowSuccessResponse`](../interfaces/FlowSuccessResponse.md)\>

API response

***

### updateJson()

> **updateJson**(`flowId`, `flowJson`, `filename?`): `Promise`\<[`UploadFlowJsonResponse`](../interfaces/UploadFlowJsonResponse.md)\>

Defined in: [src/client/actions/Flows.ts:121](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Flows.ts#L121)

Uploads (or replaces) a Flow's JSON definition.

#### Parameters

##### flowId

`string`

Flow ID

##### flowJson

`string` \| `Buffer`\<`ArrayBufferLike`\>

Flow JSON, either as a raw string or an already-serialized Buffer

##### filename?

`string` = `"flow.json"`

Filename reported to the API (defaults to "flow.json")

#### Returns

`Promise`\<[`UploadFlowJsonResponse`](../interfaces/UploadFlowJsonResponse.md)\>

Upload result, including validation errors if the JSON is invalid

***

### updateMetadata()

> **updateMetadata**(`flowId`, `updates`): `Promise`\<[`FlowSuccessResponse`](../interfaces/FlowSuccessResponse.md)\>

Defined in: [src/client/actions/Flows.ts:102](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/actions/Flows.ts#L102)

Updates a Flow's metadata (name, categories, endpoint_uri, application_id).

#### Parameters

##### flowId

`string`

Flow ID

##### updates

[`UpdateFlowMetadataPayload`](../interfaces/UpdateFlowMetadataPayload.md)

Fields to update

#### Returns

`Promise`\<[`FlowSuccessResponse`](../interfaces/FlowSuccessResponse.md)\>

API response
