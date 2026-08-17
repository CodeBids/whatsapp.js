#!/usr/bin/env node

/**
 * Post-process TypeDoc markdown output to add Jekyll front matter.
 * Run after TypeDoc generates markdown to docs/api/.
 * Also recreates index.md files that TypeDoc wipes.
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'docs', 'api');

// Directories and their parent title for nav hierarchy
const SECTION_MAP = {
  classes: { title: 'Classes', order: 1 },
  interfaces: { title: 'Interfaces', order: 2 },
  enumerations: { title: 'Enumerations', order: 3 },
  functions: { title: 'Functions', order: 4 },
  'type-aliases': { title: 'Type Aliases', order: 5 },
};

// --- Index page templates ---

const API_INDEX = `---
layout: default
title: API Reference
nav_order: 2
has_children: true
---

# API Reference

Auto-generated API documentation for \`@thejulianjara/whatsapp.js\`.

| Section | Description |
|---------|-------------|
| [Classes](./classes/) | Core classes — Client, Message, WebhookHandler, builders |
| [Interfaces](./interfaces/) | All TypeScript interfaces |
| [Enumerations](./enumerations/) | EventType, LanguageCode, WhatsAppErrorCode |
| [Functions](./functions/) | getErrorMessage(), isErrorCode() |
| [Type Aliases](./type-aliases/) | Shared type aliases |
`;

function sectionIndex(section, title, order) {
  return `---
layout: default
title: ${title}
parent: API Reference
has_children: true
nav_order: ${order}
---

# ${title}
`;
}

// --- Helpers ---

function extractTitle(content, filename) {
  const match = content.match(/^#\s+(.+)$/m);
  if (match) {
    return match[1].replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim();
  }
  return path.basename(filename, '.md');
}

function addFrontMatter(filePath, section) {
  const content = fs.readFileSync(filePath, 'utf-8');
  if (content.startsWith('---')) return;

  const filename = path.basename(filePath);
  const title = extractTitle(content, filename);
  const parentTitle = SECTION_MAP[section].title;

  const frontMatter = [
    '---',
    'layout: default',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `parent: ${parentTitle}`,
    'grand_parent: API Reference',
    '---',
    '',
  ].join('\n');

  fs.writeFileSync(filePath, frontMatter + content, 'utf-8');
  console.log(`  ✓ ${section}/${filename}`);
}

function processDirectory(dir, section) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (file === 'index.md') continue;
    if (file.endsWith('.md') && fs.statSync(filePath).isFile()) {
      addFrontMatter(filePath, section);
    }
  }
}

// --- Main ---

console.log('Post-processing TypeDoc output for Jekyll...\n');

// 1. Write API-level index.md
fs.writeFileSync(path.join(DOCS_DIR, 'index.md'), API_INDEX, 'utf-8');
console.log('✓ api/index.md');

// 2. Write section index.md files and add front matter to TypeDoc pages
for (const [section, { title, order }] of Object.entries(SECTION_MAP)) {
  const dir = path.join(DOCS_DIR, section);
  if (!fs.existsSync(dir)) continue;

  // Write section index
  fs.writeFileSync(path.join(dir, 'index.md'), sectionIndex(section, title, order), 'utf-8');
  console.log(`✓ api/${section}/index.md`);

  // Add front matter to generated pages
  console.log(`Processing ${title}:`);
  processDirectory(dir, section);
  console.log('');
}

// 3. Handle globals.md
const globalsPath = path.join(DOCS_DIR, 'globals.md');
if (fs.existsSync(globalsPath)) {
  const content = fs.readFileSync(globalsPath, 'utf-8');
  if (!content.startsWith('---')) {
    const frontMatter = '---\nlayout: default\ntitle: Globals\nparent: API Reference\n---\n\n';
    fs.writeFileSync(globalsPath, frontMatter + content, 'utf-8');
    console.log('✓ api/globals.md');
  }
}

// 4. Remove TypeDoc's README.md (we have our own index.md)
const readmePath = path.join(DOCS_DIR, 'README.md');
if (fs.existsSync(readmePath)) {
  fs.unlinkSync(readmePath);
  console.log('✓ Removed api/README.md (using index.md instead)');
}

console.log('\nDone! Jekyll front matter added to all TypeDoc pages.');
