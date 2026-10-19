# MCP — Model Context Protocol
## Phase 8 · Visual-first · The "USB-C for AI"

> **One standard way to connect any LLM to any tool, data source, or system.**

## Core idea

**MCP = roles (host/client/server) + capabilities (tools/resources/prompts) + transport**

Builds on Phase 6 & 7:
- Function calling lets an LLM use tools.
- Agents use tools repeatedly toward goals.
- MCP standardizes how AI applications expose, discover, and reuse tools/data across hosts.

---

# Step 1 — What problem does it solve?

## The M×N integration nightmare

Every AI app otherwise needs custom glue for GitHub, Slack, Postgres, Drive, etc.

**Before MCP: M×N bespoke integrations**

```text
App 1 ── custom ── GitHub
App 1 ── custom ── Slack
App 2 ── custom ── GitHub
App 2 ── custom ── Slack
...
```

**With MCP: M+N-style standardized connections**

```text
AI Host 1 ─┐
AI Host 2 ─┼─ MCP Client ── MCP Server: GitHub ── GitHub API
AI Host 3 ─┤
           └─ MCP Server: Slack ──────────────── Slack API
           └─ MCP Server: Postgres ───────────── Database
```

The goal is reusable integrations rather than rewriting connectors for every host/tool combination.

---

# Step 2 — Why was it invented?

The source describes MCP as introduced by Anthropic in late 2024 and rapidly adopted across the industry to address repeated, incompatible tool connectors.

| Before MCP | With MCP |
|---|---|
| Custom connector per app × tool | Reusable server per capability |
| Rewrite for each model/host | Model/host-agnostic |
| No standard capability discovery | Servers advertise capabilities |
| Fragmented | Standardized/composable |

Examples of compatible hosts mentioned in the source:
- Claude Desktop
- IDEs
- Custom agents

---

# Step 3 — Without MCP

Hard-code every integration:

- ❌ M×N glue code
- ❌ Rewrite when switching models/hosts
- ❌ Little reuse across teams/projects
- ❌ Different auth/format quirks
- ❌ High maintenance

### Caveat

For one tool in one app, plain function calling is simpler.

MCP becomes more valuable with:
- many tools
- multiple hosts
- reusable connectors
- ecosystem/server consumption

---

# Step 4 — Real-world analogy

## 🔌 USB-C for AI

USB-C standardized device connectivity. MCP provides a standardized protocol for AI hosts to connect to tools/data without a custom adapter for every combination.

## 🏨 Universal hotel power adapter

One adapter instead of carrying a different plug for every country.

**MCP = adapter between AI hosts and tools/data systems.**

---

# Step 5 — Visual architecture

```text
                    HOST
              AI app / IDE / Agent
                       │
                  ┌────┴────┐
                  ▼         ▼
             MCP Client  MCP Client
                  │         │
                  ▼         ▼
        MCP Server: GitHub   MCP Server: Postgres
             │                    │
         GitHub API             Database
```

**Source relationship:** One host can run many clients; each client connects to one MCP server.

## Connection sequence

```text
Host / LLM app
     │
     ├─ start connection
     ├─ initialize / handshake
     ├─ discover capabilities
     │    ├─ tools
     │    ├─ resources
     │    └─ prompts
     ├─ user asks for something
     ├─ tools/call(name, args)
     ▼
MCP Client → MCP Server → Real system
                       │
                       └─ result
                            ↓
                     Client → LLM → answer
```

**Mental model:** Discover → Select → Call → Execute → Return → Answer

---

# Step 6 — Internal working

## ① Three primitives

### 🔧 Tools
Actions the model can invoke.

Examples:
- `create_issue`
- `run_query`

### 📄 Resources
Data the model can read.

Examples:
- files
- rows
- docs

### 📝 Prompts
Reusable prompt templates provided by a server.

## ② JSON-RPC 2.0

The source identifies MCP messages such as:
- `initialize`
- `tools/list`
- `tools/call`
- `resources/read`

Transport in the source:
- stdio for local subprocesses
- HTTP/SSE for remote servers

## ③ MCP vs traditional APIs

| Aspect | Traditional API | MCP |
|---|---|---|
| Audience | Developers/apps | LLMs/agents |
| Discovery | Docs + hard-coded client | Server advertises capabilities |
| Schema/interface | REST/GraphQL/etc. | Standard MCP capability model |
| Reuse | Custom integration | Reusable by compatible hosts |
| Under the hood | Service interface | Often wraps existing APIs |

### Key insight

**MCP does not replace APIs.**

```text
LLM / Agent
    ↓
MCP Client
    ↓
MCP Server
    ↓
REST / GraphQL / SDK / DB
    ↓
Real system
```

An MCP server can call a normal REST API internally and expose that capability through a standardized AI-facing interface.

## ④ MCP vs plain function calling

### Function calling — P6

```text
Your application
 ├─ defines tools
 ├─ exposes tools to model
 └─ executes tools
```

✅ Simple for one app  
❌ Not inherently a reusable cross-host integration

### MCP

```text
Standalone MCP server
 ├─ tools
 ├─ resources
 └─ prompts
       ↓
Compatible hosts
```

✅ Reusable  
✅ Standard discovery  
❌ More moving parts

**Core distinction:** Function calling is a model/application capability; MCP is a protocol for standardizing capability integration across applications. They can work together.

---

# Step 7 — Code implementation

## A. Minimal MCP server — Python

```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("weather")

@mcp.tool()
def get_weather(city: str) -> dict:
    """Get current weather for a city."""
    return {"city": city, "temp": 8, "cond": "rain"}

@mcp.resource("config://app")
def app_config() -> str:
    """Expose read-only data to the model."""
    return "units=metric"

if __name__ == "__main__":
    mcp.run()   # runs over stdio by default
```

This demonstrates:
- `get_weather()` → Tool
- `config://app` → Resource

## B. Host configuration

```json
{
  "mcpServers": {
    "weather": {
      "command": "python",
      "args": ["weather_server.py"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

The host can launch/connect to servers, discover capabilities, and expose them to the model instead of requiring custom client code for every individual tool.

---

# Step 8 — Production deployment

```text
                 AI Host / Agent
                       │
                    Auth layer
                  /            \
                 ▼              ▼
       Local servers       Remote servers
          (stdio)          (HTTP/SSE)
        files/shell/db     shared/hosted
                 \              /
                  \            /
                   ▼          ▼
                Permission scopes
                 + write approval
                       │
                       ▼
                External systems
                       │
                       ▼
                    Audit log
```

### Production rules from the source

**Trust boundary:** servers can read data and take actions. Vet third-party servers like dependencies.

**Auth:** per-server tokens/OAuth, least privilege, secrets in a manager.

**Local vs remote:** stdio for desktop/dev; HTTP/SSE for shared/hosted servers.

**Approval + audit:** use approval and auditing for write/destructive tools, same discipline as Phase 6/7.

---

# Important production additions

Only high-value additions directly relevant to MCP:

## 1. LLM is not the authorization layer

```text
LLM decision
    ↓
MCP tool request
    ↓
Policy / permission check
    ↓
Business validation
    ↓
Human approval if needed
    ↓
Execute
```

## 2. Least privilege

If a server needs read-only access:

```text
❌ read + write + delete
✅ read-only
```

## 3. Third-party server supply-chain risk

A server may execute code and access files, databases, tokens, APIs, or private data.

Vet:
- source/repository
- maintainer trust
- permissions
- dependencies
- network access
- secret handling
- update process

## 4. Resource content is untrusted input

```text
MCP Resource → untrusted content → LLM context
```

Treat resource data as data, not trusted instructions.

---

# Step 9 — Scaling concerns

| Concern | Why | Fix |
|---|---|---|
| Tool overload | Many servers/tools confuse model | Enable only needed servers; route/filter |
| Third-party security | Servers run code/access data | Vet, sandbox, scoped tokens, audits |
| Latency | Host → server → API adds hop | Local stdio for hot paths, caching |
| Versioning | Capabilities change | Capability negotiation, version control |
| Injection via resources | Untrusted data enters context | Treat as untrusted, validate/sanitize |

## Tool overload

```text
Many servers
    ↓
Many tools
    ↓
More context + selection ambiguity
    ↓
Higher cost/latency
    ↓
Potentially worse tool selection
```

Prefer:

```text
User goal → tool/server routing → relevant capabilities → LLM
```

## Caching

Safe read operations can sometimes be cached to reduce latency/cost, subject to freshness and authorization requirements.

## Versioning

Use controlled server evolution:
- capability negotiation
- version pinning where appropriate
- backward compatibility
- testing before upgrades

---

# Decision Guide

| Situation | Choice |
|---|---|
| Many tools across multiple AI hosts | ✅ MCP |
| Reuse community servers | ✅ MCP |
| One tool, one app | Function calling |
| Pure backend service-to-service | Traditional API |

## Use MCP when
- Many tools/data sources
- Multiple hosts/models share integrations
- Enterprise integration at scale
- Reusable/portable connectors
- Consuming MCP server ecosystem

## Don't use MCP when
- Single tool/single app
- Simple prototype/quick demo
- Pure service-to-service → REST/API
- Third-party server cannot be trusted
- No reuse benefit on latency-critical path

---

# How to identify in an interview

### Triggers FOR MCP
- "connect assistant to many systems"
- "reuse integrations across apps/models"
- "enterprise tool integration"
- "standardize tool access"
- "plug into existing MCP servers"

### Triggers AGAINST MCP
- "one quick API call"
- "single app"
- "no reuse"
- "non-LLM backend"

### Senior signal

Don't answer MCP automatically.

```text
One tool + one app → Function calling
Fixed backend integration → REST/API
Many AI hosts + reusable AI connectors → MCP
```

---

# Common mistakes

✗ Thinking MCP replaces APIs  
→ It standardizes how AI consumes them.

✗ Using MCP for a single tool  
→ Function calling is usually simpler.

✗ Installing unvetted third-party servers  
→ They can run code and access data.

✗ Enabling dozens of servers  
→ Tool overload and poor selection.

✗ Trusting resource content blindly  
→ Injection can enter context through data.

---

# Alternatives & Trade-offs

| Need | Alternative | Trade-off |
|---|---|---|
| One tool, one app | Function calling (P6) | Simple vs not reusable across hosts |
| Backend integration | REST/GraphQL | Mature vs not LLM-discoverable |
| Framework-native tools | LangChain/LlamaIndex tools | Fast in-ecosystem vs framework lock-in |
| Portable reusable connectors | MCP | Standard/ecosystem vs extra moving parts |

---

# MCP vs Function Calling vs API

| | Function Calling | MCP | Traditional API |
|---|---|---|---|
| Main purpose | Model requests a tool | Standardize AI capability integration | System-to-system integration |
| Scope | Usually app-level | Cross-host protocol | General software integration |
| Discovery | App-defined | Server advertises capabilities | Usually docs/schema |
| Reuse | Depends on app architecture | High | High |
| LLM-oriented | Yes | Yes | Not primarily |
| Replaces APIs? | No | No | N/A |

**Interview one-liner:**

> Function calling lets a model call tools; MCP standardizes how tools/resources are exposed and discovered across AI hosts; APIs remain the underlying system interfaces.

---

# MCP + AI Agents

MCP is especially useful with Phase 7 agents:

```text
                    AI Agent
                       │
                MCP Client layer
             ┌─────────┼─────────┐
             ▼         ▼         ▼
        MCP Server  MCP Server  MCP Server
          GitHub      Slack      Postgres
             │         │           │
             ▼         ▼           ▼
           APIs      APIs          DB
```

## Phase 6 → Phase 7 → Phase 8

```text
P6 Function Calling
      ↓
LLM can call a tool
      ↓
P7 AI Agents
      ↓
LLM repeatedly chooses tools toward a goal
      ↓
P8 MCP
      ↓
Capabilities become standardized,
discoverable and reusable across AI hosts
```

---

# Step 10 — Interview Questions & Answers

## Q1. What is MCP in one sentence?

MCP (Model Context Protocol) is an open protocol that standardizes how AI applications discover and interact with external tools, resources, and prompts.

## Q2. What problem does MCP solve?

It reduces the M×N integration problem by giving AI hosts and external systems a common protocol.

```text
M apps × N tools
       ↓
M hosts + N reusable MCP servers
```

## Q3. MCP vs traditional APIs?

Traditional APIs expose services for developers/applications. MCP standardizes how AI applications discover and consume tools, resources, and prompts. MCP can sit around existing APIs rather than replacing them.

## Q4. MCP vs function calling?

Function calling lets an LLM request a tool call from an application. MCP standardizes the interface between AI hosts and external capability providers so capabilities can be reusable across hosts.

```text
Function calling → model/tool interaction
MCP → standardized capability integration
```

They can work together.

## Q5. What are the three things an MCP server exposes?

1. Tools → actions
2. Resources → readable data
3. Prompts → reusable templates

## Q6. What are the roles in MCP?

- **Host** → AI application such as agent, IDE, or desktop AI app
- **Client** → connector inside the host
- **Server** → exposes tools/resources/prompts and connects to external systems

```text
Host
 └── MCP Client
       └── MCP Server
             └── External system
```

## Q7. What are the security considerations?

- authenticate servers
- least privilege
- protect secrets
- vet third-party servers
- sandbox where appropriate
- validate tool arguments
- approval for destructive actions
- audit important calls
- treat resource content as untrusted
- monitor access and behavior

---

# Advanced Interview Q&A

## Q8. Does MCP replace REST APIs?

No.

```text
LLM → MCP Client → MCP Server → REST/GraphQL/SDK/DB
```

MCP standardizes the AI-facing integration layer.

## Q9. Why not expose 100 MCP servers at once?

Too many capabilities can increase context, selection ambiguity, latency, and cost.

Use:
- routing
- filtering
- scoped exposure
- task-specific enablement

## Q10. Why is a third-party MCP server a security concern?

It may execute code and access data according to its permissions.

Treat it like a software dependency:

**vet → restrict → sandbox where possible → monitor → audit**

## Q11. When choose function calling instead of MCP?

For a simple application with one/few tools and no cross-host reuse requirement, direct function calling has fewer moving parts.

## Q12. Can an MCP server wrap an existing API?

Yes.

```text
MCP Server → Existing API/SDK → External service
```

This is a common practical architecture.

---

# Production Checklist

## Architecture
- [ ] Host/client/server boundaries
- [ ] Reusable server design
- [ ] Wrap existing APIs when appropriate
- [ ] Intentional local vs remote transport

## Security
- [ ] Least privilege
- [ ] Per-server authentication
- [ ] Secrets in secret manager
- [ ] Third-party server vetting
- [ ] Resource content treated as untrusted
- [ ] Approval for high-risk writes
- [ ] Audit logs

## Performance
- [ ] Only required servers enabled
- [ ] Tool filtering/routing
- [ ] Cache safe reads
- [ ] Avoid unnecessary hops
- [ ] Monitor p95/p99 latency

## Reliability
- [ ] Version control
- [ ] Capability negotiation
- [ ] Timeouts
- [ ] Retry strategy
- [ ] Server health monitoring

---

# One-Page Revision

**MCP = Model Context Protocol**

### Core idea
Standardized AI ↔ tool/data integration.

### Problem
M×N custom integrations.

### Goal
Reusable standardized servers.

### Three primitives
1. Tools → actions
2. Resources → data
3. Prompts → reusable templates

### Roles

```text
Host → Client → Server → External system
```

### Transport
- Local
- Remote

### MCP vs API
**MCP does not replace APIs.** It standardizes the AI-facing consumption layer.

### MCP vs Function Calling
- Function calling → model requests tools in an application
- MCP → reusable standardized capability integration across hosts

### Use MCP
Many tools, multiple hosts, reusable connectors, enterprise integration, ecosystem consumption.

### Avoid MCP
One simple tool, one app, quick prototype, pure backend integration, no reuse benefit.

### Production
**Least privilege + authentication + vetting + approval + audit + tool filtering + monitoring**

---

# Golden Rules

1. MCP does not replace APIs.
2. MCP standardizes AI-facing integration.
3. Tools = actions.
4. Resources = data.
5. Prompts = reusable templates.
6. Host uses clients; clients connect to servers.
7. Direct function calling is often simpler for one-app integrations.
8. MCP is valuable when reuse/interoperability matters.
9. Never blindly trust third-party MCP servers.
10. Never treat resource content as trusted instructions.
11. Don't expose every tool/server to every task.
12. Authorization stays outside the LLM.

---

# Phase 8 — AI Engineering Big Picture

```text
P1 LLM Foundations
      ↓
P2 Prompt Engineering
      ↓
P3 Embeddings + Similarity Search
      ↓
P4 Vector Databases
      ↓
P5 RAG
      ↓
P6 Function Calling / Tool Use
      ↓
P7 AI Agents
      ↓
P8 MCP
      ↓
Reusable AI integration layer
```

### Progression

```text
P5 RAG
→ Give AI knowledge

P6 Function Calling
→ Give AI actions

P7 Agents
→ Give AI a controlled goal-oriented loop

P8 MCP
→ Standardize how capabilities are exposed,
  discovered and reused across AI applications
```

---

# Final Summary

MCP addresses the integration problem in AI systems.

Without a standard:

```text
App 1 → custom GitHub
App 1 → custom Slack
App 2 → custom GitHub
App 2 → custom Slack
...
```

With MCP:

```text
AI Host
   ↓
MCP Client
   ↓
Reusable MCP Server
   ↓
Existing API / DB / System
```

The three core server capabilities:

```text
Tools     → do something
Resources → read something
Prompts   → reuse a template
```

The most important distinction:

> **Function calling gives an LLM a way to request actions. MCP standardizes how AI applications discover and consume reusable capabilities. APIs remain the underlying system interfaces.**

For production:

> **Treat MCP servers as software dependencies, scope permissions tightly, protect secrets, audit actions, and treat resource content as untrusted input.**

Use the simplest architecture that satisfies the actual reuse/interoperability requirement.

```text
One tool + one app
      ↓
Function calling

Fixed backend integration
      ↓
REST / GraphQL / API

Many tools + multiple AI hosts
      ↓
MCP
```
