[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/CodeBids/whatsapp.js)
[![npm version](https://img.shields.io/npm/v/@thejulianjara/whatsapp.js.svg)](https://www.npmjs.com/package/@thejulianjara/whatsapp.js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)

# whatsapp.js

Send WhatsApp messages in Node.js in under 2 minutes.

A modern, fully-typed **WhatsApp Cloud API client** for Node.js.
Build bots, automations, and real-time messaging workflows with a simple and unified API.

---

## ⚡ Quick Example

```ts
import { Client } from "@thejulianjara/whatsapp.js";

const client = new Client({
  phoneId: "YOUR_PHONE_ID",
  accessToken: "YOUR_ACCESS_TOKEN",
});

await client.message.send({
  to: "54911XXXXXXXX",
  content: "Hola mundo 👋",
});
```

---

## 🚀 What can you build?

* Send automated notifications (orders, alerts, reminders)
* Build WhatsApp chatbots with replies and interactions
* Handle incoming messages via webhooks
* Send products, menus, and interactive lists
* Create conversational flows with buttons and lists

---

## ⭐ Why whatsapp.js?

* **Minimal setup** → start sending messages in minutes
* **Unified API** → one method for all message types
* **Built-in webhook server** → no extra setup needed
* **TypeScript-first** → fully typed and safe
* **Powerful features** → without complexity

---

## 📦 Installation

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

## 🧠 Quick Start (with webhook)

```ts
import { Client } from "@thejulianjara/whatsapp.js";

const client = new Client({
  phoneId: "YOUR_PHONE_ID",
  accessToken: "YOUR_ACCESS_TOKEN",
  webhook: {
    verifyToken: "YOUR_VERIFY_TOKEN",
    port: 3000,
  },
});

client.on("ready", (info) => {
  console.log(`Connected as ${info.name}`);
});

client.on("message.received", async (message) => {
  if (message.text === "hello") {
    await message.reply({
      to: message.from,
      content: "Hey there! 👋",
    });
  }
});
```

### 🔒 Securing your webhook

Pass your Meta app secret as `appSecret` to have every incoming webhook request validated against its `X-Hub-Signature-256` header. Requests with a missing or invalid signature are rejected with a `401` before your event listeners ever run.

```ts
const client = new Client({
  phoneId: "YOUR_PHONE_ID",
  accessToken: "YOUR_ACCESS_TOKEN",
  webhook: {
    verifyToken: "YOUR_VERIFY_TOKEN",
    appSecret: "YOUR_APP_SECRET", // found in the Meta App Dashboard
    port: 3000,
  },
});
```

If you're handling the HTTP request yourself (e.g. inside an Express route) instead of using the built-in server, you can validate the signature manually with the same logic:

```ts
import { WebhookHandler } from "@thejulianjara/whatsapp.js";

const isValid = WebhookHandler.verifySignature(rawRequestBody, req.headers["x-hub-signature-256"], "YOUR_APP_SECRET");
```

---

## 🧩 Use Cases

### Order confirmation

```ts
await client.message.send({
  to: customer.phone,
  content: `Tu pedido #123 fue confirmado ✅`,
});
```

### OTP / verification code

```ts
await client.message.send({
  to: user.phone,
  content: `Tu código es 482193`,
});
```

### Simple chatbot

```ts
client.on("message.received", async (message) => {
  if (message.text === "menu") {
    await message.reply({
      to: message.from,
      content: "Elegí una opción:",
    });
  }
});
```

---

## 💬 Sending Messages

All messages use a **unified API**:

```ts
await client.message.send({
  to: "5491155551234",
  content: "Hello from whatsapp.js!",
});
```

---

### Media

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
```

---

### Templates

```ts
import { LanguageCode } from "@thejulianjara/whatsapp.js";

await client.message.send({
  to: "5491155551234",
  template: {
    name: "hello_world",
    language: LanguageCode.ENGLISH_US,
  },
});
```

Need to create, review or retire templates instead of just sending them? See [Template Management](#-template-management) below.

---

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

---

## 🔘 Interactive Messages

### Buttons

```ts
import { ButtonBuilder } from "@thejulianjara/whatsapp.js";

const button = new ButtonBuilder({
  type: "reply",
  id: "opt_1",
  text: "Option 1",
});

await client.message.send({
  to: "5491155551234",
  components: [button],
});
```

---

### Lists

```ts
import { ListBuilder, RowBuilder } from "@thejulianjara/whatsapp.js";

const rows = new RowBuilder()
  .addRow({ id: "1", title: "Pizza" })
  .addRow({ id: "2", title: "Burger" });

const list = new ListBuilder({
  title: "Menu",
  rows,
  buttonText: "View options",
});

await client.message.send({
  to: "5491155551234",
  components: [list],
});
```

---

## 🔔 Webhooks & Events

Built-in HTTP server for real-time events.

### Events

* `ready`
* `message.received`
* `message.delivered`
* `message.read`
* `message.reaction`
* `status.updated`
* `interaction.create`
* `call.event` _(beta, requires subscribing to the "calls" webhook field — see [Calling](#-calling-beta))_

### Example

```ts
client.on("message.received", async (message) => {
  console.log(message.text);

  await message.reply({
    to: message.from,
    content: "Got it ✅",
  });
});
```

---

## ⏳ Message Collectors

```ts
const collector = client.createMessageCollector({
  filter: (msg) => msg.from === "5491155551234",
  time: 30000,
  max: 5,
});

collector.on("collect", (msg) => {
  console.log(msg.text);
});
```

---

## 📎 Media Management

```ts
const upload = await client.uploadMedia(buffer, "image/jpeg", "photo.jpg");
const media = await client.getMediaUrl(upload.id);
const data = await client.downloadMedia(media.url);

await client.deleteMedia(upload.id);
```

---

## 🏢 Business Profile

```ts
const profile = await client.getBusinessProfile();

await client.updateBusinessProfile({
  about: "Built with whatsapp.js 🚀",
});
```

---

## 📝 Template Management

Create, review, edit and retire message templates through `client.templates`. This is the Business Management API counterpart to sending templates with `client.message.send({ template: ... })` — it requires `wabaId` (your WhatsApp Business Account ID) when creating the `Client`.

```ts
const client = new Client({
  phoneId: "YOUR_PHONE_ID",
  accessToken: "YOUR_ACCESS_TOKEN",
  wabaId: "YOUR_WABA_ID",
});

// Create a template and submit it for review
const created = await client.templates.create({
  name: "order_confirmation",
  language: "en_US",
  category: "UTILITY",
  components: [
    {
      type: "BODY",
      text: "Your order {{1}} has shipped 📦",
      example: { body_text: [["#1234"]] },
    },
  ],
});

// List templates, optionally filtered
const { data: templates } = await client.templates.list({ status: "APPROVED" });

// Get, edit and delete
const template = await client.templates.get(created.id);
await client.templates.update(created.id, { category: "MARKETING" });
await client.templates.delete({ name: "order_confirmation" });
```

---

## 📞 Calling (beta)

`client.calling` wraps the [Business Calling API](https://developers.facebook.com/docs/whatsapp/cloud-api/calling), a newer part of the Cloud API — treat it as beta, since Meta's spec here is still evolving.

```ts
// Call a user
await client.calling.connect("5491155551234");

// React to an incoming call (subscribe to the "calls" webhook field first)
client.on("call.event", async (call) => {
  if (call.event === "connect") {
    await client.calling.accept(call.id, { sdp_type: "answer", sdp: mySdpAnswer });
    // or: await client.calling.reject(call.id);
  }
});

await client.calling.terminate("call_id");

// Calling settings
const settings = await client.calling.getSettings();
await client.calling.updateSettings({ status: "ENABLED" });
```

---

## 💡 Conversational Components

Configure the welcome message shown on a user's first chat, slash-style commands, and ice breaker prompts, through `client.conversationalAutomation`.

```ts
await client.conversationalAutomation.update({
  enableWelcomeMessage: true,
  commands: [
    { command_name: "tickets", command_description: "Book flight tickets" },
    { command_name: "support", command_description: "Talk to a human" },
  ],
  prompts: ["Book a flight", "Track my order"],
});

const current = await client.conversationalAutomation.get();
```

---

## 🔗 QR Codes & Short Links

Create click-to-chat QR codes / short links that open a chat pre-filled with a message, through `client.qrCodes`.

```ts
const qr = await client.qrCodes.create({
  prefilledMessage: "Hi! I'd like to know more 👋",
  generateQrImage: "PNG",
});

console.log(qr.deep_link_url, qr.qr_image_url);

const { data: codes } = await client.qrCodes.list();

await client.qrCodes.update(qr.code, "New pre-filled message");
await client.qrCodes.delete(qr.code);
```

---

## 🚫 Blocking Users

Block or unblock users so they can't message you (or receive messages from you), through `client.blockedUsers`.

```ts
await client.blockedUsers.block(["5491155551234"]);

const { data: blocked } = await client.blockedUsers.list();

await client.blockedUsers.unblock(["5491155551234"]);
```

---

## ⌨️ Typing Indicator

```ts
await client.sendTypingIndicator("5491155551234");
```

---

## ❌ Error Handling

```ts
import { WhatsAppApiException } from "@thejulianjara/whatsapp.js";

try {
  await client.message.send({ to: "invalid", content: "test" });
} catch (error) {
  if (error instanceof WhatsAppApiException) {
    console.error(error.message);
  }
}
```

---

## 📋 Requirements

* Node.js >= 18
* WhatsApp Business account (Cloud API)
* Phone ID + Access Token from Meta

---

## 🛠 Development

```bash
git clone https://github.com/CodeBids/whatsapp.js.git
cd whatsapp.js

pnpm install
pnpm run build
pnpm test
```

---

## 📄 License

MIT © Julián Jara
