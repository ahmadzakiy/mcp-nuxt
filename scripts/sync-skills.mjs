#!/usr/bin/env node
// Copies pixel skill from .agents/skills/pixel/ to public/skills/pixel/

import { cp, rm } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, ".agents", "skills", "pixel");
const dest = join(root, "public", "skills", "pixel");

await rm(dest, { recursive: true, force: true });
await cp(src, dest, { recursive: true });

console.log(`Synced .agents/skills/pixel → public/skills/pixel`);
