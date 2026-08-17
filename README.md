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
