# Changelog

## What's New

### New MCP Tool: `get-icon-name`

A new tool for searching Pixel icon names. AI assistants can now look up valid icon names for the `MpIcon` component `name` prop — either by keyword or listing all available icons.

**430 icons** across **8 categories** are now searchable.

**Usage examples:**

- "Find icons related to search"
- "What user or profile icons are available?"
- "List all available Pixel icons"

The tool uses fuzzy search (Fuse.js) and handles list-all intent automatically.

---

### New MCP Resource: `icons`

The icon list is now exposed as an MCP resource (`llms-icons.txt`, 430 entries), making the full icon catalog available for context retrieval alongside existing component, docs, token, pattern, and template resources.

---

### MCP Resource Rename: `component` → `components`

The `component` resource has been renamed to `components` for naming consistency with other resources.

---

### Improved Search Logic

The shared `searchDocumentation` utility has been significantly upgraded:

- **Fuzzy search** (`findBestMatchesFuzzy`) powered by Fuse.js — tolerates typos, partial matches, and reordered words across **4 weighted fields** (`rawName`, `slugName`, `keyName`, `description`) with a match threshold of `0.4`
- **Token search for multi-word queries** — `useTokenSearch: true` is enabled so each word in a query is matched independently (e.g. `"form input"` matches entries containing both `"form"` and `"input"`)
- **Typo normalization** — repeated characters are collapsed before matching (e.g. `"butonnn"` → `"buton"`)
- **Smarter list-all intent detection** — `isListAllIntent` now handles free-form phrasing like `"get all components"`, `"give me every pattern"`, `"list available templates"` — up from **7 hardcoded exact phrases** to regex-based open-ended detection
- **Result limit** — `findBestMatches` and `findBestMatchesFuzzy` both accept a `limit` option to cap results
- **Graceful fallback** — fuzzy search falls back to prefix/includes matching when no fuzzy results are found

All **5 MCP tools** (`get-component`, `get-docs`, `get-pattern`, `get-template`, `get-icon-name`) benefit from these improvements.

---

### `@nuxtjs/mcp-toolkit` Updated: `0.6.0` → `0.15.0`

Major version bump with new features and protocol improvements. The MCP server at `/mcp` now runs on the latest toolkit.

---

### Eval Suite: `Pixel Icon Name Search`

A new evalite test suite covering the `get-icon-name` tool with 4 test cases: keyword search (search, user, arrow) and list-all intent.

---

### Eval Infrastructure Improvements

- **`vitest.config.ts`** added — loads `.env` via `dotenv/config` so `AI_GATEWAY_API_KEY` and `MCP_URL` are available during eval runs without manual export

---

### New Agent Skill: `manage-mcp`

A comprehensive skill for managing MCP servers in Nuxt — covers setup, creating tools/resources/prompts, middleware patterns (auth, CORS, rate limiting, logging), testing, and troubleshooting. Available at `.agents/skills/manage-mcp/SKILL.md` with detailed reference docs.

---

### Documentation

- **`docs/mcp-toolkit-improvement.md`** — notes on `@nuxtjs/mcp-toolkit` improvements and roadmap ideas
- **`AGENTS.md`** — updated to reflect current file structure: new tool, resource, utils, and routes

---

## What Improved

| Area               | Before                                       | After                                         |
| ------------------ | -------------------------------------------- | --------------------------------------------- |
| Icon support       | No way to look up icon names                 | `get-icon-name` tool + `icons` resource       |
| Search quality     | Exact/prefix string matching only            | Fuzzy search with typo tolerance and fallback |
| List-all detection | Only exact phrases (`"list all components"`) | Free-form natural language intent             |
| MCP toolkit        | `0.6.0`                                      | `0.15.0`                                      |
| Eval setup         | Manual `.env` export required                | Auto-loaded via `vitest.config.ts`            |
| Resource naming    | `component` (inconsistent)                   | `components` (consistent)                     |
| MCP skill          | No agent skill for MCP management            | Full `manage-mcp` skill with references       |
| Eval coverage      | 19 test cases across 6 suites                | 23 test cases across 7 suites                 |
