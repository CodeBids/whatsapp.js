[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/CodeBids/whatsapp.js)
[![npm version](https://img.shields.io/npm/v/@thejulianjara/whatsapp.js.svg)](https://www.npmjs.com/package/@thejulianjara/whatsapp.js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)

# whatsapp.js

A modern, fully-typed **WhatsApp Cloud API** client for Node.js. Send text, images, documents, templates, interactive buttons, lists, locations, contacts, products, and more — with first-class TypeScript support.

---

## Features

- 💬 **Text, media & templates** — text, images, audio, video, documents, stickers
- 🔘 **Interactive messages** — buttons, lists, CTA URLs, flows
- 📍 **Location & contacts** — send and request locations, contact cards
- 🛒 **Catalog & products** — single product and product list messages
- 📦 **Fluent builders** — `EmbedBuilder`, `ButtonBuilder`, `ListBuilder`, `ContactBuilder`, `LocationBuilder`, `RowBuilder`
- 🔔 **Built-in webhook** — HTTP server included for real-time event handling
- ⏳ **Message collectors** — collect multiple messages with filters, timeouts, and limits
- 📎 **Media management** — upload, download, and delete media files
- 🏢 **Business profile** — read and update your WhatsApp Business profile
- ⌨️ **Typing indicator** — show "typing..." status to users
- ❌ **Typed error handling** — every API error code mapped to an enum
- 🔒 **Strict validation** — payloads validated before hitting the API
- 🧪 **Tested** — test suite powered by Jest

---

## Installation

```bash
npm install @thejulianjara/whatsapp.js
```

```bash
pnpm add @thejulianjara/whatsapp.js
```

```bash
yarn add @thejulianjara/whatsapp.js
```

---

## Quick Start

```ts
import { Client } from "@thejulianjara/whatsapp.js";

const client = new Client({
  phoneId: "YOUR_PHONE_ID",
  accessToken: "YOUR_ACCESS_TOKEN",
  webhook: {
    verifyToken: "YOUR_VERIFY_TOKEN",
    port: 3000,
    autoStart: true,
  },
});

client.on("ready", (info) => {
  console.log(`Connected as ${info.name} (${info.displayPhoneNumber})`);
});

client.on("message.received", async (message) => {
  if (message.text === "hello") {
    await message.reply({ to: message.from, content: "Hey there! 👋" });
  }
});
```

---

## Client Options

```ts
interface ClientOptions {
  phoneId: string;       // WhatsApp Business phone number ID
  accessToken: string;   // Meta API access token
  webhook?: {
    verifyToken: string; // Token to verify webhook requests
    port?: number;       // HTTP server port
    autoStart?: boolean; // Start the server automatically (default: true)
  };
}
```

---

## Sending Messages

All messages are sent through `client.message.send()` with a unified payload:

### Plain Text

```ts
await client.message.send({
  to: "5491155551234",
  content: "Hello from whatsapp.js!",
});
```

### Media Files

```ts
await client.message.send({
  to: "5491155551234",
  files: [
    {
      type: "image",
      url: "https://example.com/photo.jpg",
      caption: "Check this out",
    },
  ],
});

await client.message.send({
  to: "5491155551234",
  files: [
    {
      type: "document",
      url: "https://example.com/report.pdf",
      filename: "report.pdf",
      caption: "Your monthly report",
    },
  ],
});
```

### Templates

```ts
import { LanguageCode } from "@thejulianjara/whatsapp.js";

await client.message.send({
  to: "5491155551234",
  template: {
    name: "hello_world",
    language: LanguageCode.ENGLISH_US,
    components: [
      {
        type: "body",
        parameters: [{ type: "text", text: "John" }],
      },
    ],
  },
});
```

### Reactions

```ts
await client.message.send({
  to: "5491155551234",
  reaction: {
    message_id: "wamid.xxxx",
    emoji: "👍",
  },
});
```

### Location Request

```ts
await client.message.send({
  to: "5491155551234",
  locationRequest: {
    body: "Share your location for delivery",
  },
});
```

### Products

```ts
// Single product
await client.message.send({
  to: "5491155551234",
  product: {
    catalog_id: "123456",
    product_retailer_id: "SKU-001",
  },
});

// Product list
await client.message.send({
  to: "5491155551234",
  productList: {
    catalog_id: "123456",
    header: "Our products",
    body: "Pick your favorite:",
    sections: [
      {
        title: "Deals",
        product_items: [{ product_retailer_id: "SKU-001" }, { product_retailer_id: "SKU-002" }],
      },
    ],
  },
});
```

---

## Builders

### EmbedBuilder

```ts
import { EmbedBuilder, ButtonBuilder } from "@thejulianjara/whatsapp.js";

const embed = new EmbedBuilder({
  title: "Daily Menu",
  body: "Choose an option:",
  footer: "Powered by whatsapp.js",
});

const button = new ButtonBuilder({ type: "reply", id: "opt_1", text: "Option 1" });

await client.message.send({
  to: "5491155551234",
  embeds: [embed],
  components: [button],
});
```

### ListBuilder + RowBuilder

```ts
import { ListBuilder, RowBuilder } from "@thejulianjara/whatsapp.js";

const rows = new RowBuilder()
  .addRow({ id: "1", title: "Pizza", description: "Large mozzarella" })
  .addRow({ id: "2", title: "Burger", description: "Double cheeseburger" });

const list = new ListBuilder({
  title: "Food",
  rows,
  buttonText: "View options",
});

await client.message.send({
  to: "5491155551234",
  components: [list],
});
```

### LocationBuilder

```ts
import { LocationBuilder } from "@thejulianjara/whatsapp.js";

const location = new LocationBuilder({
  name: "Office",
  address: "123 Main St, New York",
  latitude: 40.7128,
  longitude: -74.006,
  phone_number: 1155551234,
});

await client.message.send({
  to: "5491155551234",
  components: [location],
});
```

### ContactBuilder

```ts
import { ContactBuilder } from "@thejulianjara/whatsapp.js";

const contact = new ContactBuilder({
  firstName: "John",
  lastName: "Doe",
  phones: [{ phone: "+15551234567", type: "CELL" }],
});

await client.message.send({
  to: "5491155551234",
  components: [contact],
});
```

---

## Webhook & Events

The client ships with a built-in HTTP server to receive WhatsApp events in real time.

### Available Events

| Event                | Description                              |
| -------------------- | ---------------------------------------- |
| `ready`              | Client connected successfully            |
| `message.received`   | A new message was received               |
| `message.delivered`  | A message was delivered                  |
| `message.read`       | A message was read                       |
| `message.reaction`   | A reaction was received                  |
| `status.updated`     | A message status was updated             |
| `interaction.create` | An interaction was received (button, list, etc.) |

### Example

```ts
client.on("message.received", async (message) => {
  console.log(`Message from ${message.from}: ${message.text}`);

  // Reply
  await message.reply({ to: message.from, content: "Got it ✅" });

  // React
  await message.react("✅");

  // Mark as read
  await message.markAsRead();

  // Forward to another number
  await message.forward("5491199998888");
});
```

### Start/Stop the Server Manually

```ts
const client = new Client({
  phoneId: "YOUR_PHONE_ID",
  accessToken: "YOUR_ACCESS_TOKEN",
  webhook: {
    verifyToken: "YOUR_VERIFY_TOKEN",
    autoStart: false, // Don't start automatically
  },
});

// Start when ready
client.startServer(3000, () => {
  console.log("Webhook listening on port 3000");
});

// Stop
client.stopServer(() => {
  console.log("Webhook stopped");
});
```

---

## Message Collectors

Collect multiple messages with filters, timeouts, and limits:

```ts
const collector = client.createMessageCollector({
  filter: (msg) => msg.from === "5491155551234",
  time: 30000, // 30 seconds
  max: 5,      // collect up to 5 messages
});

collector.on("collect", (msg) => {
  console.log("Collected:", msg.text);
});

collector.on("end", (collected) => {
  console.log(`Collected ${collected.size} messages`);
});
```

### Await a Single Message

```ts
const response = await client.awaitMessage(
  (msg) => msg.from === "5491155551234",
  15000, // 15 second timeout
);
console.log("Response:", response.text);
```

---

## Media Management

```ts
import { readFileSync } from "fs";

// Upload a file
const buffer = readFileSync("./photo.jpg");
const upload = await client.uploadMedia(buffer, "image/jpeg", "photo.jpg");
console.log("Media ID:", upload.id);

// Get URL
const media = await client.getMediaUrl(upload.id);
console.log("URL:", media.url);

// Download
const data = await client.downloadMedia(media.url);

// Delete
await client.deleteMedia(upload.id);
```

---

## Business Profile

```ts
// Read profile
const profile = await client.getBusinessProfile();
console.log(profile);

// Update profile
await client.updateBusinessProfile({
  about: "Built with whatsapp.js 🚀",
  description: "The best WhatsApp Cloud API client",
  email: "hello@example.com",
  websites: ["https://example.com"],
});
```

---

## Typing Indicator

```ts
await client.sendTypingIndicator("5491155551234");
```

---

## Error Handling

```ts
import { WhatsAppApiException, WhatsAppErrorCode, getErrorMessage, isErrorCode } from "@thejulianjara/whatsapp.js";

try {
  await client.message.send({ to: "invalid", content: "test" });
} catch (error) {
  if (error instanceof WhatsAppApiException) {
    console.error("WhatsApp error:", error.message);
  }
}

// Check a specific error code
if (isErrorCode(131047)) {
  console.log("Rate limited — wait before sending another message");
}
```

All API error codes are mapped in the `WhatsAppErrorCode` enum.

---

## Requirements

- **Node.js** >= 18.0.0
- A **WhatsApp Business** account with Cloud API access
- **Phone ID** and **Access Token** from [Meta for Developers](https://developers.facebook.com/)

---

## Development

```bash
# Clone the repository
git clone https://github.com/CodeBids/whatsapp.js.git
cd whatsapp.js

# Install dependencies
pnpm install

# Build
pnpm run build

# Run tests
pnpm test

# Tests with coverage
pnpm run test:coverage

# Lint
pnpm run lint
```

---

## License

[MIT](./LICENSE) © Julián
