---
layout: default
title: "Enumeration: EventType"
parent: Enumerations
grand_parent: API Reference
---
[**@thejulianjara/whatsapp.js v1.3.8**](../README.md)

***

[@thejulianjara/whatsapp.js](../globals.md) / EventType

# Enumeration: EventType

Defined in: [src/client/webhook/handlers/WebhookHandler.ts:9](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/webhook/handlers/WebhookHandler.ts#L9)

Types of events that can be emitted by the webhook handler

## Enumeration Members

### CALL\_EVENT

> **CALL\_EVENT**: `"call.event"`

Defined in: [src/client/webhook/handlers/WebhookHandler.ts:27](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/webhook/handlers/WebhookHandler.ts#L27)

Beta: emitted for entries on the `calls` webhook field (see the Calling API, `client.calling`)

***

### GROUP\_LIFECYCLE\_UPDATE

> **GROUP\_LIFECYCLE\_UPDATE**: `"group.lifecycle_update"`

Defined in: [src/client/webhook/handlers/WebhookHandler.ts:19](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/webhook/handlers/WebhookHandler.ts#L19)

A group was created, or a group's creation/deletion otherwise changed state (see `client.groups`)

***

### GROUP\_PARTICIPANTS\_UPDATE

> **GROUP\_PARTICIPANTS\_UPDATE**: `"group.participants_update"`

Defined in: [src/client/webhook/handlers/WebhookHandler.ts:21](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/webhook/handlers/WebhookHandler.ts#L21)

A participant joined, left, or was removed from a group

***

### GROUP\_SETTINGS\_UPDATE

> **GROUP\_SETTINGS\_UPDATE**: `"group.settings_update"`

Defined in: [src/client/webhook/handlers/WebhookHandler.ts:23](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/webhook/handlers/WebhookHandler.ts#L23)

A group's subject, description or picture changed

***

### GROUP\_STATUS\_UPDATE

> **GROUP\_STATUS\_UPDATE**: `"group.status_update"`

Defined in: [src/client/webhook/handlers/WebhookHandler.ts:25](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/webhook/handlers/WebhookHandler.ts#L25)

A group's status changed (e.g. suspended)

***

### INTERACTION\_CREATE

> **INTERACTION\_CREATE**: `"interaction.create"`

Defined in: [src/client/webhook/handlers/WebhookHandler.ts:17](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/webhook/handlers/WebhookHandler.ts#L17)

***

### MESSAGE\_DELIVERED

> **MESSAGE\_DELIVERED**: `"message.delivered"`

Defined in: [src/client/webhook/handlers/WebhookHandler.ts:12](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/webhook/handlers/WebhookHandler.ts#L12)

***

### MESSAGE\_FAILED

> **MESSAGE\_FAILED**: `"message.failed"`

Defined in: [src/client/webhook/handlers/WebhookHandler.ts:14](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/webhook/handlers/WebhookHandler.ts#L14)

***

### MESSAGE\_REACTION

> **MESSAGE\_REACTION**: `"message.reaction"`

Defined in: [src/client/webhook/handlers/WebhookHandler.ts:15](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/webhook/handlers/WebhookHandler.ts#L15)

***

### MESSAGE\_READ

> **MESSAGE\_READ**: `"message.read"`

Defined in: [src/client/webhook/handlers/WebhookHandler.ts:13](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/webhook/handlers/WebhookHandler.ts#L13)

***

### MESSAGE\_RECEIVED

> **MESSAGE\_RECEIVED**: `"message.received"`

Defined in: [src/client/webhook/handlers/WebhookHandler.ts:10](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/webhook/handlers/WebhookHandler.ts#L10)

***

### MESSAGE\_SENT

> **MESSAGE\_SENT**: `"message.sent"`

Defined in: [src/client/webhook/handlers/WebhookHandler.ts:11](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/webhook/handlers/WebhookHandler.ts#L11)

***

### STATUS\_UPDATED

> **STATUS\_UPDATED**: `"status.updated"`

Defined in: [src/client/webhook/handlers/WebhookHandler.ts:16](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/webhook/handlers/WebhookHandler.ts#L16)

***

### WEBHOOK\_EVENT

> **WEBHOOK\_EVENT**: `"webhook.event"`

Defined in: [src/client/webhook/handlers/WebhookHandler.ts:29](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/client/webhook/handlers/WebhookHandler.ts#L29)

Emitted for any subscribed webhook field this library doesn't parse into a more specific event (e.g. account_alerts, message_template_status_update, phone_number_quality_update).
