# 🏗️ AI System Design

> **Phase 10 · Visual-first · A repeatable 12-point blueprint for
> designing production AI systems on a whiteboard**

## 📌 12-Point Framework

-   ChatGPT
-   Support Bot
-   Salesforce Copilot
-   Interview Mode

## 📖 On this page

1.  Why a framework
2.  The 12-point blueprint
3.  Reference architecture
4.  Request lifecycle
5.  Design: ChatGPT
6.  Design: Support Bot
7.  Design: Salesforce Copilot
8.  System catalog
9.  Cost & scaling
10. Interview Qs
11. Mindset

------------------------------------------------------------------------

# 1. Why a Framework

## Why you need a repeatable blueprint

AI system design interviews (and real projects) fail when you jump
straight to **"use RAG + GPT-4."** Senior engineers reason from
requirements → constraints → architecture → trade-offs. Memorize one
12-point checklist and you can design any AI system live, without
freezing.

## AI System Design

``` text
AI System Design
├── Clarify
├── Functional reqs
├── Non-functional
├── Scale & latency
├── Core AI
├── Model choice
├── RAG design
├── Agent design
├── Prompt strategy
├── Data
├── Databases
├── Vector store
├── Caching
└── Cross-cutting: Cost · Security · Scaling · Monitoring · Deployment
```

## Every AI system decomposes into the same five buckets

``` text
Requirements → Architecture → Core AI → Data/Platform → Cross-cutting
```

# 2. The Blueprint

## The 12-point AI System Design framework

> Walk these in order. Each maps to a question the interviewer is
> silently scoring you on.

### 1 · Requirements

Functional + non-functional. Who, what, how many, how fast?

### 2 · Architecture

High-level boxes & arrows. Client → API → orchestration → model.

### 3 · RAG Design

Sources, chunking, embeddings, retrieval, re-rank, context window.

### 4 · Agent Design

Single vs multi-agent, tools, planning, loops, guardrails.

### 5 · Database

Relational/NoSQL for state, chat history, users, audit.

### 6 · Vector DB

Which store, index type, metadata filters, sharding.

### 7 · Prompt Strategy

System prompt, templates, few-shot, output schema, safety.

### 8 · Cost Optimization

Model tiering, caching, batching, token budgets, fallbacks.

### 9 · Security

Authn/z, PII, prompt injection, tenant isolation, secrets.

### 10 · Scaling

Stateless services, queues, rate limits, autoscaling, GPUs.

### 11 · Monitoring

Latency, cost, quality/evals, hallucination, feedback loop.

### 12 · Deployment

CI/CD, canary, model/prompt versioning, rollback.

## Interview tip

Spend the first **3--5 minutes on Requirements**. Nail scale, latency
SLA, accuracy bar, and budget before drawing a single box --- it shapes
every later decision.

# 3. Reference Architecture

## The canonical production AI architecture

Almost every AI product is a variation of this. Learn it once, adapt the
pieces.

``` text
Client: web / mobile / Slack
          ↓
API Gateway: auth · rate limit · WAF
          ↓
Orchestration Layer: LangGraph / custom
          ↓
Guardrails: input filter · PII · injection
          ↓
Route by intent
     ┌────┴──────────────┐
     ↓                   ↓
RAG Pipeline        Agent + Tools
     │                   │
Vector DB          Tools / APIs / MCP
Re-ranker               │
     └──────────┬────────┘
                ↓
        Model Router
       cheap ↔ frontier
                ↓
               LLM
                ↓
         Semantic Cache
                ↓
      Output guardrails
        + citations

App DB: history · users
Observability: traces · cost · evals
```

### The reference stack --- swap/remove blocks per use case

# 4. Request Lifecycle

## What happens on a single request

``` text
User
 ↓ query (+ auth token)
Gateway
 ↓ validated request
Orchestrator
 ↓
Semantic Cache ── cache hit → cached answer (fast, $0)
 ↓ miss
embed + retrieve top-k
 ↓
Retriever + VDB → chunks + metadata
 ↓
prompt + context
 ↓
LLM (router)
 ↓
answer + citations
 ↓
store
 ↓
streamed answer
 ↓
Observability → log latency, tokens, cost, eval
```

> **Cache-first, retrieve, generate, observe --- the universal hot
> path**

# 5. Worked Design 1

## Design: ChatGPT-style assistant

### 1 · Requirements

**Functional:** multi-turn chat, streaming, memory of conversation,
code + markdown, file upload.

**Non-functional:** \<1s first token, millions of concurrent users,
99.9% uptime, moderation.

### Architecture

``` text
User
 ↓
WebSocket / SSE — streaming
 ↓
Context builder — history + summary
 ↓
Moderation
 ↓
Model router
 ├── Small model — cheap turns
 └── Frontier model — hard turns
 ↓
Conversation store + rolling summary
```

**Key idea:** rolling-summary memory + model routing to control cost at
scale.

### Design decisions

  -----------------------------------------------------------------------
  \#                                  Decision
  ----------------------------------- -----------------------------------
  3 RAG                               Optional --- only for
                                      "browse"/uploaded files; otherwise
                                      pure chat

  5 DB                                Postgres (users, threads) + blob
                                      store (files) + Redis (session)

  7 Prompt                            System persona + tools + rolling
                                      summary of old turns (avoid context
                                      blowup)

  8 Cost                              Route easy turns to small model;
                                      cache common Q&A; summarize history

  9 Security                          Moderation in & out, per-user rate
                                      limits, abuse detection

  10 Scale                            Stateless app tier + GPU inference
                                      pool behind a queue; autoscale

  11 Monitor                          Token/cost per user, latency p95,
                                      thumbs feedback → eval set
  -----------------------------------------------------------------------

# 6. Worked Design 2

## Design: Customer Support Bot (RAG)

### 1 · Requirements

**Functional:** answer from help docs with citations, escalate to human,
multilingual, log tickets.

**Non-functional:** grounded (no hallucinated policy), \<3s answer,
deflect 60%+ of tickets.

### Architecture

``` text
Customer Query
 ↓
Query rewrite + language detect
 ↓
Hybrid retrieve — BM25 + vector
 ↓
Vector DB — doc chunks
 ↓
Re-rank top-k
 ↓
LLM answer — grounded + cite
 ↓
Confident & grounded?
 ├── yes → Answer + sources
 └── no  → Escalate to human + create ticket
 ↓
Feedback → eval
```

> **Grounding + confidence gate + human escalation = trustworthy
> support**

### ✅ Design choices

-   Hybrid search (keyword + vector) for exact policy terms
-   Strict "answer only from context, else escalate" prompt
-   Citations link to source doc --- builds trust & auditability
-   Nightly re-index when docs change

### 🚫 Anti-patterns

-   Letting the model answer ungrounded → wrong policy = liability
-   One giant chunk per doc → poor retrieval precision
-   No escalation path → frustrated customers
-   No eval set → silent quality regressions

# 7. Worked Design 3

## Design: Salesforce CRM Copilot (Agentic)

### 1 · Requirements

**Functional:** natural-language actions on CRM ("summarize this
account", "create a follow-up task", "draft an email", "what's the
pipeline for Q3?").

**Non-functional:** respect record-level security, auditable actions, no
data leaving the org boundary, human approval for writes.

### Architecture

``` text
Sales rep
 ↓
Copilot UI in Salesforce
 ↓
Planner agent
 ↓
Permission & sharing check
 ↓
Tool calls via MCP
 ├── Query records — SOQL
 ├── RAG over knowledge + notes
 └── Write action — create / update
          ↓
     Needs approval?
       ├── yes → Human confirm
       └── no
          ↓
       Execute
          ↓
LLM synthesize — grounded answer
          ↓
Audit log
```

> **Agentic copilot with permission enforcement + human-in-the-loop
> writes + full audit**

### Design decisions

  -----------------------------------------------------------------------
  \#                                  Decision
  ----------------------------------- -----------------------------------
  4 Agent                             Planner + tool-using agent; tools
                                      exposed via MCP server over CRM
                                      APIs

  6 Vector DB                         Per-org namespace; metadata =
                                      record IDs + sharing for filtered
                                      retrieval

  9 Security                          Enforce native sharing/FLS on every
                                      tool call; never bypass the user's
                                      permissions

  9 Security                          Prompt-injection defense on record
                                      text; writes require explicit
                                      approval

  11 Monitor                          Audit every action; track approval
                                      rate, action success, hallucination
                                      flags
  -----------------------------------------------------------------------

### The make-or-break point

Security must run per tool call at the data layer, enforcing the running
user's sharing & field-level security --- not just at the UI. The LLM
never sees records the user can't access.

# 8. System Catalog

## Pattern map: which architecture for which system

  -----------------------------------------------------------------------
  System                  Core pattern            Critical concern
  ----------------------- ----------------------- -----------------------
  ChatGPT assistant       Chat + memory + model   Latency & cost at scale
                          routing                 

  AI search engine        RAG + re-rank +         Grounding & freshness
                          citations               

  Support bot             Hybrid RAG + escalation No hallucinated policy

  Resume analyzer         Structured extraction + Bias / fairness
                          scoring                 

  AI interviewer          Stateful agent + rubric Consistency & memory

  Coding assistant        RAG over repo + tools + Context size &
                          tests                   correctness

  CRM / Salesforce        Agentic tools (MCP) +   Permissions & audit
  copilot                 approvals               

  Document analyzer       Parse → chunk → RAG →   OCR quality & PII
                          extract                 

  Email assistant         RAG over inbox + draft  Privacy & tone
                          agent                   
  -----------------------------------------------------------------------

## Decision tree --- map any prompt to its core architecture in seconds

``` text
What's the primary job?
        │
 ┌──────┼───────────────┬────────────────────┐
 ↓      ↓               ↓                    ↓
Answer  Take actions    Extract structure    Open-ended
questions in systems    from documents       conversation
from knowledge
 ↓      ↓               ↓                    ↓
RAG +   Agent +         Parse +              Chat + memory
re-rank tools/MCP      schema-constrained   + model routing
+ cite  + approvals    extraction
```

# 9. Cost & Scaling

## Cross-cutting: cost, scaling, security, monitoring

### 💰 Cost levers

-   Semantic cache for repeated questions (\$0 hits)
-   Model tiering: small model first, escalate only if needed
-   Trim context --- summarize, retrieve fewer/better chunks
-   Batch + stream; set hard token budgets per request

### 📈 Scaling levers

-   Stateless app tier → horizontal autoscale
-   Async queue for heavy/agent jobs; backpressure + rate limits
-   VDB sharding + replicas; read replicas for app DB
-   GPU pool with batching for self-hosted models

### 🔒 Security must-haves

-   Authn/z + tenant isolation (per-org VDB namespace)
-   Input/output guardrails + prompt-injection defense
-   PII redaction & data-residency boundaries
-   Human approval for irreversible actions; audit everything

### 📊 Monitoring must-haves

-   Latency p50/p95, tokens & cost per request/user
-   Quality evals (LLM-as-judge) + hallucination rate
-   Retrieval hit-rate & groundedness scoring
-   User feedback loop → continuous eval set

# 10. Common Mistakes

-   ✗ Designing before clarifying scale, latency SLA, and budget.
-   ✗ One model for everything --- no routing → 10× cost.
-   ✗ RAG with no re-ranking or eval → confident wrong answers.
-   ✗ Enforcing permissions only in the UI, not at the data/tool layer.
-   ✗ No observability → you can't see cost, quality, or drift in prod.

# 11. Interview Mode

## Interview questions & model answers

### Q1. Design ChatGPT. Where do you start?

Start with requirements: users/concurrency, functional requirements,
first-token/response latency, availability, moderation/safety, memory
requirements, and budget. Then move through the 12-point framework.

``` text
Requirements → Architecture → RAG / Agent → Data + Vector DB
→ Prompt → Cost → Security → Scaling → Monitoring → Deployment
```

### Q2. How do you keep a RAG support bot from hallucinating policy?

``` text
Query → Hybrid retrieval → Re-rank → Grounded context → LLM
→ Confidence + groundedness gate
   ├── Yes → answer + citations
   └── No  → human escalation
```

Key controls: answer only from retrieved context, cite source documents,
re-rank chunks, maintain an evaluation set, escalate when
confidence/grounding is insufficient.

### Q3. How do you enforce security in a Salesforce/CRM copilot?

Security must be enforced at the data/tool layer, not only in the UI.

``` text
User request → Permission/sharing check → Tool call
→ Native sharing + FLS → Only authorized records → LLM
```

For writes: permission check → human approval → execute → audit log.

### Q4. How do you control cost in a high-traffic AI product?

Semantic caching, model tiering, context trimming, summarization, hard
token budgets, batching where appropriate, fallback models, and cost
tracking per request/user.

### Q5. RAG vs agent vs fine-tune --- how do you pick in a design?

``` text
Fresh/external knowledge? → RAG
Actions in a system? → Agent + Tools
Stable repeated behavior/style? → Fine-tune
One-off instruction change? → Prompt Engineering
Combination? → Combine patterns
```

### Q6. How do you measure quality in production?

Offline evaluation set, LLM-as-judge, groundedness, hallucination rate,
retrieval quality, user feedback, regression testing, latency, and cost.

### Q7. How do you make the system scale statelessly?

``` text
Users → Load Balancer → Stateless App Instances
                         ↓
              Shared external state
              DB · Redis · Object storage · Queue
```

The application tier can then scale horizontally without depending on
local instance state.

# 12. Mindset

## Senior AI System Design Mindset

Don't begin with **"Which LLM should I use?"**

Begin with:

``` text
1. What must the system do?
2. What scale must it support?
3. What latency / accuracy is required?
4. What data does it need?
5. Does it need knowledge retrieval?
6. Does it need actions/tools?
7. What security boundaries exist?
8. What does it cost?
9. How will it scale?
10. How will I monitor quality?
11. How will I deploy safely?
12. What are the trade-offs?
```

------------------------------------------------------------------------

# 🔥 Important AI Engineering Additions

> The following section adds only the key production concepts needed to
> apply the 12-point framework. The source flow is preserved first.

## A. Whiteboard Order

``` text
Requirements
   ↓
Scale + latency
   ↓
Core user journey
   ↓
High-level architecture
   ↓
RAG / Agent / Simple LLM
   ↓
Data + state
   ↓
Security boundary
   ↓
Cost + scaling
   ↓
Observability
   ↓
Deployment
   ↓
Trade-offs
```

## B. Core Decision Diagram

``` text
What problem are you solving?
        │
 ┌──────┼──────────────┐
 ↓      ↓              ↓
Knowledge? Actions?    Behavior/style?
 ↓      ↓              ↓
RAG    Agent+Tools     Fine-tune
        /MCP
```

One-off behavior change → Prompt Engineering.

## C. Production AI System Layers

``` text
Experience
   ↓
Gateway
   ↓
Orchestration
   ↓
AI Layer: LLM · RAG · Tools · MCP · Prompt
   ↓
Data: DB · Vector DB · Object Store · Cache
   ↓
Cross-cutting: Security · Cost · Monitoring · Evaluation
   ↓
Operations: CI/CD · Versioning · Canary · Rollback
```

# 🎯 12-Point Interview Checklist

  -----------------------------------------------------------------------
  \#                      Check                   Question
  ----------------------- ----------------------- -----------------------
  1                       Requirements            What exactly must the
                                                  system do?

  2                       Architecture            What are the major
                                                  components?

  3                       RAG                     Does it need
                                                  external/current
                                                  knowledge?

  4                       Agent                   Does it need
                                                  actions/tools?

  5                       Database                Where does application
                                                  state live?

  6                       Vector DB               How is semantic
                                                  retrieval handled?

  7                       Prompt                  How are behavior and
                                                  outputs controlled?

  8                       Cost                    How do we control
                                                  token/model cost?

  9                       Security                Who can access what and
                                                  perform which actions?

  10                      Scaling                 How does the system
                                                  handle growth?

  11                      Monitoring              How do we know quality
                                                  and reliability are
                                                  healthy?

  12                      Deployment              How do we release and
                                                  rollback safely?
  -----------------------------------------------------------------------

# ⚠️ Key Gotchas

1.  RAG does not automatically mean grounded --- bad retrieval produces
    bad context.
2.  An agent is not just an LLM --- it needs controlled tools,
    permissions, state/workflow, and guardrails.
3.  UI security is not enough --- permissions must be enforced where
    data/tools are accessed.
4.  Bigger models are not automatically the answer --- routing can
    reserve expensive models for difficult work.
5.  Scaling is more than adding servers --- queues, rate limits, shared
    state, VDB capacity, GPU inference, and backpressure matter.
6.  Production quality needs evaluation --- prompts, models, retrieval,
    or data can change and silently regress quality.

# 🧠 One-Page Revision

``` text
AI SYSTEM DESIGN
├── 1 Requirements → Functional + Non-functional
├── 2 Architecture → Client → Gateway → Orchestration → AI
├── 3 RAG → Source → Chunk → Embed → Retrieve → Re-rank → Context
├── 4 Agent → Plan → Tool → Observe → Act
├── 5 Database → Users · State · History · Audit
├── 6 Vector DB → Retrieval · Filters · Index · Sharding
├── 7 Prompt → System · Few-shot · Schema · Safety
├── 8 Cost → Cache · Routing · Context · Tokens
├── 9 Security → Auth · PII · Injection · Tenant isolation
├── 10 Scaling → Stateless · Queue · Rate limit · Autoscale
├── 11 Monitoring → Latency · Cost · Quality · Feedback
└── 12 Deployment → CI/CD · Canary · Versioning · Rollback
```

# 🏆 Golden Rules

1.  Requirements first, architecture second.
2.  Don't choose an LLM before understanding the workload.
3.  Use RAG when the system needs retrieved knowledge.
4.  Use agents when the system needs controlled actions/tools.
5.  Keep permissions at the data/tool layer.
6.  Use model routing to control cost.
7.  Cache before spending another model call when appropriate.
8.  Design observability from day one.
9.  Every production AI system needs evaluation.
10. Human approval belongs around high-risk or irreversible actions.
11. Stateless application tiers make horizontal scaling easier.
12. Always explain trade-offs, not just technologies.

# 🔗 Phase 9 → Phase 10 Connection

``` text
Phase 9: Fine-Tuning
        ↓
behavior / format / style
        ↓
Phase 10: AI System Design
        ├── RAG
        ├── Agents
        ├── Tools / MCP
        ├── Model routing
        ├── Data
        ├── Security
        ├── Scaling
        ├── Monitoring
        └── Deployment
```

**Phase 9:** specialize model behavior.\
**Phase 10:** place that model inside a complete production system.

# 📌 Final Summary

AI System Design is not about memorizing one architecture. The
repeatable approach is:

``` text
Requirements → Architecture → RAG / Agent / Simple LLM
→ Database + Vector DB → Prompt strategy → Cost → Security
→ Scaling → Monitoring → Deployment → Trade-offs
```

The most important interview habit is to spend the first **3--5
minutes** understanding requirements, scale, latency, accuracy, and
budget before drawing the architecture.

``` text
Knowledge → RAG
Actions → Agent + Tools/MCP + Approvals
Documents → Parse + Schema-constrained extraction
Chat → Memory + Model routing
```

# 💼 LinkedIn Post

## AI System Design: Stop Starting With "Which LLM?"

One of the biggest mistakes in AI system design is jumping directly to:
**"Let's use RAG + an LLM."**

Production AI systems need much more than a model.

A repeatable 12-point framework helps:

1.  Requirements
2.  Architecture
3.  RAG design
4.  Agent design
5.  Database
6.  Vector DB
7.  Prompt strategy
8.  Cost optimization
9.  Security
10. Scaling
11. Monitoring
12. Deployment

The key mindset is simple:

**Requirements → Constraints → Architecture → Trade-offs**

For example:

-   Need knowledge → RAG
-   Need actions → Agent + Tools/MCP
-   Need stable behavior/style → Fine-tuning
-   Need one-off instruction changes → Prompting

And production concerns cannot be afterthoughts:

**Security + Cost + Scaling + Evaluation + Observability**

The strongest system design answers don't just say what technology to
use. They explain **why**, what the constraints are, and what trade-offs
are being made.

#AIEngineering #SystemDesign #RAG #AIAgents #LLM #MCP #GenerativeAI
