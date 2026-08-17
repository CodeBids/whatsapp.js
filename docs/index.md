---
layout: default
title: Home
nav_order: 1
permalink: /
---

# @thejulianjara/whatsapp.js

A modern, fully-typed **WhatsApp Cloud API** client for Node.js.

Send text, images, documents, templates, interactive buttons, lists, locations, contacts, products, and more — with first-class TypeScript support.

---

## Quick Links

| Section | Description |
|---------|-------------|
| [API Reference](./api/) | Full auto-generated API reference |
| [Classes](./api/classes/) | `Client`, `Message`, `WebhookHandler`, the feature managers, and builders |
| [Interfaces](./api/interfaces/) | TypeScript interfaces for payloads, options, and responses |
| [Enumerations](./api/enumerations/) | `EventType`, `LanguageCode`, `WhatsAppErrorCode` |
| [Type Aliases](./api/type-aliases/) | Shared type aliases (categories, statuses, and similar unions) |
| [Functions](./api/functions/) | Utility functions |

---

## Installation

```bash
npm install @thejulianjara/whatsapp.js
```

```bash
pnpm add @thejulianjara/whatsapp.js
```

---

## Quick Start

```typescript
import { Client } from '@thejulianjara/whatsapp.js';

const client = new Client({
  phoneId: 'YOUR_PHONE_NUMBER_ID',
  accessToken: 'YOUR_ACCESS_TOKEN',
  webhook: {
    verifyToken: 'YOUR_VERIFY_TOKEN',
    port: 3000,
  },
});

// Send a text message
await client.message.send({
  to: '5491112345678',
  content: 'Hello from whatsapp.js!',
});

// Listen for incoming messages
client.on('message.received', (message) => {
  console.log(`From: ${message.from}, Text: ${message.text}`);
});
```

See the main [README](https://github.com/TheJulianJara/whatsapp.js#readme) for the full usage guide, including webhook signature verification and every feature below.

---

## Features

### Messaging
- **Text, media & templates** — text, images, audio, video, documents, stickers
- **Interactive messages** — buttons, lists, CTA URLs, flows, address messages
- **Location & contacts** — send and request locations, contact cards
- **Catalog & products** — single product and product list messages
- **Fluent builders** — `EmbedBuilder`, `ButtonBuilder`, `ListBuilder`, `ContactBuilder`, `LocationBuilder`, `RowBuilder`

### Account & number management
- **[Phone Number Management](./api/classes/PhoneNumberManager.md)** — register/deregister numbers, verification codes, two-step verification
- **[Message Templates](./api/classes/TemplateManager.md)** — create, list, edit and delete templates via the Business Management API
- **[Flow Management](./api/classes/FlowManager.md)** — create, publish, deprecate and preview WhatsApp Flows
- **[Groups](./api/classes/GroupManager.md)** — create and manage WhatsApp groups, invite links and join requests
- **[Conversational Components](./api/classes/ConversationalAutomationManager.md)** — welcome message, commands, and ice breakers
- **[QR Codes & Short Links](./api/classes/QrCodeManager.md)** — click-to-chat codes with pre-filled messages
- **[Blocking Users](./api/classes/BlockedUsersManager.md)** — block, unblock and list blocked users
- **[Calling (beta)](./api/classes/CallingManager.md)** — initiate, accept, reject and terminate calls
- **Business profile** — read and update your WhatsApp Business profile

### Platform
- **Built-in webhook** — HTTP server included for real-time event handling
- **Webhook signature verification** — validates `X-Hub-Signature-256` on every incoming request
- **Message collectors** — collect multiple messages with filters, timeouts, and limits
- **Media management** — upload, download, and delete media files
- **Typing indicator** — show "typing..." status to users
- **Typed error handling** — every API error code mapped to an enum
- **Strict validation** — payloads validated before hitting the API
- **Tested** — test suite powered by Jest
