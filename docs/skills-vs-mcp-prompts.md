# Best Practices: Skills vs MCP Prompts

## The Rule of Thumb

> **MCP instructions cover how to use the server and its tools correctly.**  
> **Skill instructions cover how to use them for a given process or workflow.**

## For Your figma-to-pixel Use Case

### ❌ Current Approach (Not Optimal)

```typescript
// MCP Prompt with embedded workflow
const PROMPT_TEMPLATE = `You are an expert... [300+ lines of workflow]`;

export default defineMcpPrompt({
  name: "implement-figma-to-pixel",
  handler: ({ figmaLink, componentName }) => {
    // Returns massive prompt with all instructions
    return { messages: [{ role: "user", content: PROMPT_TEMPLATE }] };
  }
});
```

**Problems:**

- ❌ Workflow knowledge embedded in MCP prompt
- ❌ Loaded every time (token-heavy)
- ❌ Hard to maintain and update
- ❌ Not reusable across different contexts
- ❌ Can't be shared/provisioned organization-wide

---

### ✅ Recommended Approach: Skill + Simple MCP Prompt

#### Architecture:

```
┌─────────────────────────────────────┐
│   MCP Prompt (Simple Trigger)      │
│   - Accept parameters (figmaLink)  │
│   - Invoke skill by name           │
│   - Pass parameters to skill       │
└─────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│   Skill (Workflow Knowledge)        │
│   - Multi-step process             │
│   - Implementation standards       │
│   - Design system rules            │
│   - Loads on-demand                │
└─────────────────────────────────────┘
                 │
      ┌──────────┴──────────┐
      ▼                     ▼
┌─────────────┐      ┌─────────────┐
│  Figma MCP  │      │  Pixel MCP  │
│   Tools     │      │   Tools     │
└─────────────┘      └─────────────┘
```

#### Implementation:

**1. Skill File:** `/public/skills/figma-to-pixel/Skill.md`

```markdown
---
name: figma-to-pixel
description: Implement Figma designs with Pixel 3...
---

## Required Flow

1. Analyze Figma design
2. Get Pixel component docs
3. Map design to components
4. Apply styling
5. Implement & validate
```

**2. MCP Prompt:** `/server/mcp/prompts/implement-figma-to-pixel.ts`

```typescript
export default defineMcpPrompt({
  name: "implement-figma-to-pixel",
  handler: ({ figmaLink, componentName }) => {
    return {
      messages: [
        {
          role: "user",
          content: `Implement Figma design using Pixel 3.
        
Figma Link: ${figmaLink}
Component: ${componentName || "Auto-detect"}

Use the "figma-to-pixel" skill to complete this task.`
        }
      ]
    };
  }
});
```

---

## Benefits of Skills

### 1. **On-Demand Loading**

- Skills load only when relevant
- Preserves context window
- More efficient token usage

### 2. **Reusability**

- One skill, multiple MCP servers
- Can be used outside MCP prompts
- Shareable across organization

### 3. **Maintainability**

- Single source of truth
- Easy to update workflow
- Version control friendly

### 4. **Discoverability**

- Available in Skills Directory
- Can be provisioned org-wide
- Users can toggle on/off

### 5. **Composability**

- Skills can orchestrate multiple MCP servers
- Can call other skills
- Modular workflow design

---

## Migration Steps

### Step 1: Create Skill Structure

```bash
public/skills/figma-to-pixel/
├── Skill.md                    # Main skill file
└── references/
    ├── design-analysis.md      # Step 1 details
    ├── component-mapping.md    # Component reference
    ├── styling-rules.md        # Styling hierarchy
    └── implementation-standards.md  # Code standards
```

### Step 2: Move Workflow to Skill

Extract workflow knowledge from PROMPT_TEMPLATE into Skill.md:

- Multi-step process → Required Flow section
- Implementation rules → Standards section
- Examples → Reference files

### Step 3: Simplify MCP Prompt

Convert MCP prompt to simple trigger:

- Accept parameters
- Invoke skill by name
- Pass context

### Step 4: Test Integration

```typescript
// User calls MCP prompt
await mcpPrompt.handle({
  figmaLink: "https://figma.com/...",
  componentName: "MpButton"
});

// Behind the scenes:
// 1. MCP prompt triggers skill
// 2. Skill loads on-demand
// 3. Skill orchestrates Figma + Pixel MCP tools
// 4. Returns implementation
```

---

## When to Use Each

| Use Case                            | Solution      | Why                  |
| ----------------------------------- | ------------- | -------------------- |
| "How to connect to Figma API"       | MCP Server    | Tool connectivity    |
| "How to extract node ID"            | MCP Tool hint | Generic server usage |
| "Implement Figma to Pixel workflow" | **Skill**     | Process/workflow     |
| "Apply Pixel styling hierarchy"     | **Skill**     | Domain expertise     |
| "Validate implementation"           | **Skill**     | Standards/checklist  |
| "Trigger workflow with params"      | MCP Prompt    | Entry point          |

---

## Real-World Example: Notion

Notion demonstrates this pattern:

**MCP Server:**

- `notion-mcp` - Connects to Notion API
- Tools: `search_pages`, `read_page`, `create_page`

**Skills:**

- `meeting-intelligence` - Meeting prep workflow
- `research-assistant` - Research workflow
- `spec-to-implementation` - Dev workflow

Each skill uses the same MCP server, different workflows.

---

## Recommended Next Steps

1. ✅ **Create Skill** - Move PROMPT_TEMPLATE to `/public/skills/figma-to-pixel/Skill.md`
2. ✅ **Create References** - Split into modular reference files
3. ✅ **Simplify MCP Prompt** - Keep as simple trigger
4. Test workflow with both Figma and Pixel MCP connected
5. Deploy skill to organization (if Enterprise/Team plan)

**Result:** More maintainable, reusable, and efficient implementation! 🎉
