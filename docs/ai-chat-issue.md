# RCA: MCP Tool-Call Response Not Rendering in Chat UI

## Symptom

When a user message triggered an MCP tool call, the chat UI showed no response. The event stream ended at `finish-step` with no subsequent `finish` or `[DONE]` event. Casual (non-tool) messages rendered correctly.

## Root Cause

The server used `stopWhen: stepCountIs(5)`, which instructed the AI SDK to attempt up to 5 agentic steps in a single request. After step 1 (model calls tool → MCP executes), the SDK tried to start step 2 by reconstructing the conversation context from a `recordedContent` buffer.

The problem: `recordedContent` is populated by the internal event processor only for chunks of type `tool-call` and `tool-result`. MCP dynamic tools (loaded via `@ai-sdk/mcp`'s `dynamicTool()`) emit different chunk types — `tool-input-available` and `tool-output-available` — so they were **never written to `recordedContent`**.

With an empty `recordedContent`, `toResponseMessages()` returned nothing. The step 2 request to the model received no tool-result context, the continuation logic broke silently, and the `finish` event was never emitted. The stream stalled and the UI rendered nothing.

## Fix

Switch from server-side multi-step to client-side re-submission.

### Server (`server/api/chat.ts`)

Remove `stopWhen: stepCountIs(5)`. The AI SDK default is `stepCountIs(1)`, so the server now stops cleanly after step 1 and always emits `finish`.

### Client (`app/pages/chat.vue`)

Add `sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls` to the `Chat` constructor. The AI SDK checks whether every dynamic-tool part in the last assistant message has reached `output-available` state. When true, it automatically re-submits the full conversation — now including the tool results — so the model can generate a text response.

```ts
// app/pages/chat.vue
import { Chat } from "@ai-sdk/vue";
import {
  DefaultChatTransport,
  lastAssistantMessageIsCompleteWithToolCalls
} from "ai";

const chat = new Chat({
  transport: new DefaultChatTransport({ api: "/api/chat" }),
  sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls
});
```

## Request Flow (After Fix)

1. User sends message → server step 1 starts
2. Model emits tool call → MCP executes → `finish-step` + `finish` emitted
3. Client receives complete message with `dynamic-tool` parts in `output-available` state
4. `sendAutomaticallyWhen` triggers automatic re-submission with tool results in context
5. Server step 1 (new request) → model generates text response → UI renders

## Versions Affected

- `ai` ≥ 6.x (AI SDK v6)
- `@ai-sdk/mcp` ≥ 1.x
- `@ai-sdk/vue` ≥ 3.x
