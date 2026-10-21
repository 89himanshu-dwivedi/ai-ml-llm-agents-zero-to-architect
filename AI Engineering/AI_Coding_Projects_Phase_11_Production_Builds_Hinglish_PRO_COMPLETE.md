# 🏗️ AI Coding Projects — Production Builds

> **Phase 11 · Visual-first · Turn the theory into shippable code — folder structure, backend, frontend, Docker, CI/CD, tests**

---

# 📚 Project Blueprint

- RAG Chatbot
- AI Agent
- Salesforce Assistant
- BUILD Mode

---

# 📖 On this page

1. Theory → production
2. Project blueprint
3. Folder structure
4. Build: RAG Chatbot
5. Build: AI Agent
6. Build: Salesforce Assistant
7. Docker & CI/CD
8. Testing & security
9. Project catalog
10. Interview Qs
11. Mindset

---

# 1. From Notebook to Production

A demo that works in a notebook is **10% of the job**.

Production means:

- a typed API
- retries & timeouts
- observability
- tests
- containerization
- CI/CD
- secrets management
- cost controls

This phase gives you a reusable project skeleton you can stamp out for any AI app.

---

## 🧠 AI Project — Four Production Buckets

```text
                         AI PROJECT
                             │
          ┌──────────────────┼──────────────────┐
          ↓                  ↓                  ↓
         Code               Data               Ops
          │                  │                  │
    API layer            Vector store        Docker
    Core logic           App DB              CI/CD
    LLM client           Cache               Secrets
    Retriever / agent                         Monitoring
          │
          └──────────────────┬──────────────────┘
                             ↓
                           Quality
                             │
                 Unit tests · Eval suite
                 Load tests · Security scan
```

> **Every production AI repo balances Code · Data · Ops · Quality**

---

# 2. Blueprint

## The 10-part production project checklist

Walk through these in order.

### 1 · Folder structure

Clean separation:

```text
api / core / services / tests
```

### 2 · Architecture

Layered:

```text
routes → services → clients → stores
```

### 3 · Backend

Use:

- FastAPI
- typed schemas
- async
- streaming

### 4 · Frontend

Use:

- React/Next chat UI
- SSE streaming
- citations

### 5 · LLM & RAG

Include:

- Provider client
- Retriever
- Prompt templates

### 6 · Docker

Use:

- Multi-stage build
- compose for local stack

### 7 · CI/CD

Pipeline:

```text
Lint
  ↓
Test
  ↓
Build
  ↓
Scan
  ↓
Deploy on merge
```

### 8 · Testing

Cover:

- Unit
- Integration
- Eval
- Load

### 9 · Security

Cover:

- Secrets
- Input guardrails
- Rate limits

### 10 · Monitoring

Track:

- Traces
- Cost
- Latency
- Eval dashboards

---

# 3. Folder Structure

## The reusable repo skeleton

```text
ai-app/
├── app/
│   ├── main.py            # FastAPI entrypoint
│   ├── api/
│   │   ├── routes_chat.py # /chat endpoints
│   │   └── deps.py        # auth, rate limit
│   ├── core/
│   │   ├── config.py      # settings (env)
│   │   ├── llm.py         # LLM client wrapper
│   │   └── prompts.py     # prompt templates
│   ├── services/
│   │   ├── rag.py         # retrieval pipeline
│   │   ├── agent.py       # tool-using agent
│   │   └── vectorstore.py # VDB client
│   └── schemas.py         # Pydantic models
├── frontend/              # React/Next chat UI
├── tests/
│   ├── test_rag.py
│   └── evals/eval_set.jsonl
├── .github/workflows/ci.yml
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
└── README.md
```

---

## Layered dependency flow

```text
api/routes
     ↓
services
rag · agent
     ↓
core/llm
provider client
     ↓
services/vectorstore
     ↓
schemas
Pydantic

core/config
     ↓
secrets/env
```

### Core rule

> **Layered dependencies flow one way: routes → services → clients → stores**

---

# 4. Build 1 — Production RAG Chatbot

## Architecture

```text
React chat UI
     ↓
SSE streaming
     ↓
FastAPI /chat
     ↓
Rate limit + auth
     ↓
Semantic cache
     │
     ├── hit ───────────────→ cached answer
     │
     └── miss
          ↓
      Embed query
          ↓
      Vector DB
          ↓
       Re-rank
          ↓
     Build prompt
   + context + citations
          ↓
       LLM stream
          ↓
   Log cost/latency/eval
```

> **End-to-end streaming RAG with caching, re-ranking, and observability**

---

## Backend — the retrieval + generation core

```python
# app/services/rag.py
from app.core.llm import llm_stream, embed
from app.services.vectorstore import search
from app.core.prompts import RAG_SYSTEM

async def answer(query: str, k: int = 5):
    qvec = await embed(query)
    hits = await search(qvec, k=k)          # top-k chunks
    context = "\n\n".join(h.text for h in hits)
    messages = [
        {"role": "system", "content": RAG_SYSTEM},
        {"role": "user",
         "content": f"Context:\n{context}\n\nQuestion: {query}"},
    ]
    async for token in llm_stream(messages):   # stream out
        yield token
    yield {"citations": [h.source for h in hits]}
```

---

## API route with streaming

```python
# app/api/routes_chat.py
from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from app.services.rag import answer
from app.api.deps import rate_limit

router = APIRouter()

@router.post("/chat")
async def chat(body: ChatIn, _=Depends(rate_limit)):
    return StreamingResponse(answer(body.query),
                             media_type="text/event-stream")
```

---

# 5. Build 2 — AI Agent with Tools

## Agent flow

```text
                         User goal
                            ↓
                         Plan step
                            ↓
                      Need a tool?
                       /          \
                     yes           no
                     ↓              ↓
                 Call tool       Final answer
              search · calc · API
                     ↓
                 Observe result
                     ↓
                 Plan next step
                     ↓
              Max steps + guardrails
```

> **ReAct loop: plan → act → observe → repeat, bounded by a step limit**

---

## Code

```python
# app/services/agent.py — minimal tool-using loop
from app.core.llm import llm_json

TOOLS = {"search": search_web, "calc": calculate}

async def run_agent(goal: str, max_steps: int = 6):
    scratch = []
    for _ in range(max_steps):
        step = await llm_json(goal, scratch)   # {thought, action, input}
        if step["action"] == "final":
            return step["input"]
        tool = TOOLS[step["action"]]
        result = await tool(step["input"])  # act
        scratch.append((step, result))         # observe
    return "Stopped: step limit reached"     # guardrail
```

---

## Production guardrails

- hard step cap
- per-tool timeouts
- an allow-list of tools
- output validation
- a kill-switch

> **Never let an agent loop or call tools unbounded.**

---

# 6. Build 3 — Salesforce AI Assistant

Tie it back to your stack:

> An assistant that answers questions over CRM data and drafts records — respecting sharing rules, with human approval for writes.

---

## Architecture

```text
LWC chat panel
     ↓
Apex REST controller
     ↓
Enforce sharing/FLS
     ↓
'with sharing'
     ↓
AI service layer
     ├── RAG over notes/KB
     └── SOQL data fetch
              ↓
        LLM synthesize
              ↓
          Write action?
           /        \
         yes         no
          ↓           ↓
     User approves   Answer
          ↓           │
     DML insert/update│
          └─────┬─────┘
                ↓
       Answer in LWC
                ↓
     Audit + Integration_Log__c
```

> **LWC → Apex (with sharing) → AI service → grounded answer / approved write + audit**

---

## Secure entrypoint

```java
// AiAssistantController.cls — secure entrypoint
public with sharing class AiAssistantController {
    @AuraEnabled
    public static AssistantResponse ask(String question, Id recordId) {
        // 'with sharing' enforces the running user's record access
        Account acc = [SELECT Id, Name, Industry, AnnualRevenue
                       FROM Account WHERE Id = :recordId WITH SECURITY_ENFORCED];
        String context = AiContextBuilder.fromAccount(acc);
        return AiCalloutService.synthesize(question, context); // async callout
    }
}
```

---

## Security non-negotiables

- `with sharing` + `WITH SECURITY_ENFORCED`
- Named Credentials for the LLM endpoint
- Never hardcode keys
- Writes routed through an approval + audit flow

---

# 7. Docker & CI/CD

## Containerize & ship

### Multi-stage Dockerfile

```dockerfile
FROM python:3.12-slim AS base
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app/ ./app/
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

## CI/CD pipeline

```text
Push / PR
   ↓
Lint + type check
   ↓
Unit + integration tests
   ↓
Eval suite gate
   ↓
Security scan + secrets
   ↓
Build image
   ↓
Deploy canary
   ↓
Promote to prod
```

> **Quality gates — tests AND an eval gate must pass before any deploy**

---

## CI configuration

```yaml
# .github/workflows/ci.yml (excerpt)
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pip install -r requirements.txt
      - run: ruff check . && mypy app
      - run: pytest -q                 # unit + integration
      - run: python -m tests.evals.run  # eval gate
      - run: docker build -t ai-app .
```

---

# 8. Testing & Security

## Testing pyramid + security checklist

### 🧪 Test layers

#### Unit

Prompt builders, parsers, tools (**mock LLM**).

#### Integration

Retrieve → generate end-to-end.

#### Eval

Golden set + LLM-as-judge, regression gate.

#### Load

Concurrency, latency p95, cost ceiling.

---

## 🔒 Security checklist

- Secrets in a vault / env, never in code
- Input & output guardrails + prompt-injection defense
- Rate limiting + auth on every endpoint
- PII redaction, tenant isolation, audit logging

---

## Deterministic unit test with a mocked LLM

```python
# tests/test_rag.py — deterministic unit test with a mocked LLM
import pytest
from app.services import rag

@pytest.mark.asyncio
async def test_answer_includes_citations(monkeypatch):
    monkeypatch.setattr(rag, "search", fake_search)   # stub VDB
    monkeypatch.setattr(rag, "llm_stream", fake_stream)
    out = [t async for t in rag.answer("refund policy?")]
    assert out[-1]["citations"]                  # grounded
```

---

# 9. Project Catalog

## Buildable projects & their core stack

| Project | Core stack | Headline feature |
|---|---|---|
| RAG chatbot | FastAPI + VDB + LLM + React | Streaming grounded answers |
| AI agent | ReAct loop + tools + guardrails | Multi-step task automation |
| Research assistant | Web search tool + RAG + synthesis | Cited reports |
| CRM assistant | Agent + CRM APIs (MCP) | NL actions on records |
| SQL generator | Schema RAG + constrained output | Safe NL→SQL |
| Salesforce assistant | LWC + Apex (with sharing) + LLM | Secure in-org copilot |
| Ticket analyzer | Classify + extract + route | Auto-triage |
| Document processor | Parse → chunk → extract schema | Structured data from PDFs |

---

## BUILD Mode

Use BUILD `<project>` anytime.

Examples:

```text
BUILD RAG Chatbot
BUILD Salesforce Assistant
```

Expected generated project:

```text
Folder structure
       ↓
Backend
       ↓
Frontend
       ↓
Docker
       ↓
CI/CD
       ↓
Tests
       ↓
README
```

> **I'll generate the complete repo: folder structure, backend, frontend, Docker, CI/CD, tests, and a README.**

---

# 10. Interview Mode

## Interview questions & model answers

### Q1. How do you structure a production AI codebase?

Use layered separation:

```text
API / Routes
      ↓
Services
      ↓
Clients
      ↓
Stores
```

Keep responsibilities separated:

- API handles request/response concerns.
- Services contain business/AI workflow logic.
- Clients wrap external providers.
- Stores handle persistence/vector storage.

The source blueprint uses:

```text
app/
├── api/
├── core/
├── services/
└── schemas.py
```

---

### Q2. How do you test something non-deterministic like an LLM app?

Use multiple test layers:

```text
Unit
  ↓
Integration
  ↓
Eval
  ↓
Load
```

- Mock the LLM for deterministic unit tests.
- Test retrieval → generation integration.
- Use a golden evaluation set and LLM-as-judge.
- Run regression evaluation before deployment.
- Load-test concurrency, p95 latency, and cost ceiling.

---

### Q3. Why an eval gate in CI/CD?

Because traditional tests cannot fully detect semantic quality regressions.

```text
Code change
    ↓
Unit tests
    ↓
Integration tests
    ↓
Eval gate
    ↓
Security scan
    ↓
Build
    ↓
Deploy
```

A prompt, model, retriever, or application change can pass normal tests while making AI answers worse. The eval gate provides a quality checkpoint before deployment.

---

### Q4. How do you keep an agent safe in production?

Use bounded execution:

```text
Agent
  ↓
Allow-listed tools
  ↓
Per-tool timeout
  ↓
Output validation
  ↓
Max step limit
  ↓
Kill-switch
```

Never allow:

- unlimited loops
- arbitrary tool access
- unbounded retries
- uncontrolled write actions

---

### Q5. How do you secure a Salesforce AI assistant?

The source design uses:

```text
LWC
 ↓
Apex
 ↓
with sharing
 ↓
WITH SECURITY_ENFORCED
 ↓
AI service
 ↓
Approved write
 ↓
Audit
```

Important controls:

- `with sharing`
- `WITH SECURITY_ENFORCED`
- Named Credentials
- No hardcoded LLM keys
- Approval for writes
- Audit logging

---

### Q6. How do you containerize and deploy?

Use a containerized application and a quality-gated CI/CD pipeline:

```text
Code
 ↓
Lint + type check
 ↓
Unit + integration
 ↓
Eval gate
 ↓
Security scan
 ↓
Docker build
 ↓
Canary deploy
 ↓
Promote to production
```

The supplied project skeleton uses a Python 3.12 slim base image and runs FastAPI through Uvicorn.

---

# 11. Mindset

## From notebook → production

```text
                NOTEBOOK
                   │
                   │ prototype
                   ↓
             WORKING DEMO
                   │
                   │ production hardening
                   ↓
       ┌───────────────────────────┐
       │       PRODUCTION APP      │
       ├───────────────────────────┤
       │ Typed API                 │
       │ Retries + timeouts        │
       │ Observability             │
       │ Tests + evals             │
       │ Docker                    │
       │ CI/CD                     │
       │ Secrets                   │
       │ Cost controls             │
       │ Security                  │
       └───────────────────────────┘
```

The key mindset:

> **A notebook proves that the idea works. Production engineering proves that the system can be operated safely, repeatedly, and economically.**

---

# 🔥 Important Production Additions

> This section adds only high-value concepts needed to apply the supplied Phase 11 blueprint. The original project flow above is preserved first.

## A. Production Request Path

A reusable production request path is:

```text
Client
  ↓
Auth / Rate Limit
  ↓
Typed API
  ↓
Validation
  ↓
Semantic Cache
  ↓
AI Service
  ├── RAG
  ├── Agent
  └── Direct LLM
  ↓
Provider / Tool / DB
  ↓
Output validation
  ↓
Streaming response
  ↓
Trace + cost + quality metrics
```

The important idea is that **AI logic should sit inside a controlled application path**, not directly inside the UI.

---

## B. Retry + Timeout Rule

External AI systems can fail or become slow.

Use:

```text
Provider call
    │
    ├── timeout → controlled fallback/error
    │
    ├── transient failure → bounded retry
    │
    └── success → continue
```

### Important

Retries should be **bounded**.

```text
Retry
  ↓
Retry
  ↓
Retry limit
  ↓
Fallback / error
```

Never create infinite retry loops.

---

## C. Typed Boundaries

A production AI application should validate data at boundaries:

```text
Frontend
   ↓
Request schema
   ↓
Service
   ↓
Provider response schema
   ↓
Output schema
   ↓
Frontend
```

For example, the source project uses **Pydantic models** for schemas.

The principle is:

> **Don't assume an LLM response has the shape you expected. Validate it.**

---

## D. RAG Production Checklist

For the Phase 11 RAG chatbot:

```text
Query
 ↓
Auth
 ↓
Rate limit
 ↓
Cache
 ↓
Embedding
 ↓
Vector retrieval
 ↓
Re-ranking
 ↓
Context construction
 ↓
LLM
 ↓
Citation validation
 ↓
Streaming
 ↓
Observability
```

Key production questions:

- Did retrieval return useful chunks?
- Were citations generated?
- Was the answer grounded?
- How many tokens were consumed?
- How long did retrieval and generation take?
- Did the request exceed its cost/latency budget?

---

## E. Agent Production Checklist

For the tool-using agent:

```text
User goal
   ↓
Plan
   ↓
Validate action
   ↓
Allow-listed tool
   ↓
Timeout
   ↓
Tool result
   ↓
Observe
   ↓
Next step
   ↓
Max step check
   ↓
Final response
```

For write-capable agents, add:

```text
Write action
    ↓
Permission check
    ↓
Human approval
    ↓
Execute
    ↓
Audit
```

---

## F. CI/CD Mental Model

```text
                 CHANGE
                   ↓
             Static checks
          lint · type checking
                   ↓
              Unit tests
                   ↓
          Integration tests
                   ↓
              Eval gate
                   ↓
            Security scan
                   ↓
             Build image
                   ↓
            Canary deploy
                   ↓
          Observe production
                   ↓
              Promote
```

This makes the deployment path:

> **Code quality + system correctness + AI quality + security**

rather than only:

> **Code compiles → deploy**

---

# 🎯 Production Readiness Checklist

Before calling an AI project production-ready, check:

| Area | Minimum question |
|---|---|
| API | Is the API typed and validated? |
| Reliability | Are retries and timeouts bounded? |
| AI | Is model/provider behavior observable? |
| RAG | Can retrieval and grounding be evaluated? |
| Agent | Are tools allow-listed and execution bounded? |
| Data | Is application/vector state separated cleanly? |
| Security | Are secrets, auth, PII, and tenant boundaries protected? |
| Testing | Do unit, integration, eval, and load tests exist? |
| CI/CD | Does an eval/security gate run before deployment? |
| Monitoring | Can you see latency, cost, traces, and quality? |
| Deployment | Can you canary and roll back safely? |
| Cost | Is there a budget/control mechanism? |

---

# 🧠 One-Page Revision

```text
AI CODING PROJECTS — PRODUCTION BUILDS
│
├── 1. Project Structure
│      └── api · core · services · tests
│
├── 2. Architecture
│      └── routes → services → clients → stores
│
├── 3. Backend
│      └── FastAPI · typed · async · streaming
│
├── 4. Frontend
│      └── React/Next · SSE · citations
│
├── 5. AI
│      └── LLM client · RAG · agents · prompts
│
├── 6. Docker
│      └── containerized application
│
├── 7. CI/CD
│      └── lint → test → eval → scan → build → deploy
│
├── 8. Testing
│      └── unit → integration → eval → load
│
├── 9. Security
│      └── secrets · guardrails · auth · rate limit
│
└── 10. Monitoring
       └── traces · cost · latency · evals
```

---

# 🏆 Golden Rules

1. **A notebook demo is not a production system.**
2. **Keep routes, services, clients, and stores separated.**
3. **Use typed schemas at API boundaries.**
4. **Bound retries, timeouts, and agent steps.**
5. **Mock LLM calls in deterministic unit tests.**
6. **Use integration tests for the real retrieval/generation path.**
7. **Use an eval gate before deploying AI changes.**
8. **Never hardcode secrets or provider keys.**
9. **Protect every endpoint with appropriate authentication and rate limits.**
10. **Agent tools must be allow-listed and bounded.**
11. **Write actions need stronger controls than read actions.**
12. **For Salesforce, enforce access at the Apex/data layer, not only the UI.**
13. **Observe latency, tokens, cost, traces, and AI quality.**
14. **Containerize the application and make deployment repeatable.**
15. **Production engineering is about reliability, security, quality, and cost—not only making the model answer.**

---

# 🔗 Phase 10 → Phase 11 Connection

```text
Phase 10
AI System Design
       │
       │ architecture
       ↓
Phase 11
Production Coding
       │
       ├── Folder structure
       ├── API
       ├── Backend
       ├── Frontend
       ├── RAG / Agent
       ├── Docker
       ├── CI/CD
       ├── Tests
       ├── Security
       └── Monitoring
```

### Mental model

**Phase 10:** Decide **what production system to build and why**.

**Phase 11:** Turn that architecture into **code that can actually be shipped and operated**.

---

# 📌 Final Summary

Phase 11 turns AI theory into a reusable production engineering workflow.

The core path is:

```text
Idea
 ↓
Architecture
 ↓
Folder structure
 ↓
Typed API
 ↓
Core AI service
 ↓
Data / Vector DB / Cache
 ↓
Frontend
 ↓
Docker
 ↓
Tests + Evals
 ↓
Security
 ↓
CI/CD
 ↓
Monitoring
 ↓
Production
```

Three core builds demonstrate the pattern:

```text
RAG Chatbot
→ Retrieval + re-ranking + streaming + citations

AI Agent
→ Plan + tool + observe + bounded execution

Salesforce Assistant
→ CRM data + sharing/FLS + AI + approved writes + audit
```

The central lesson:

> **Production AI is not just an LLM call. It is an engineered system around the LLM.**

---

# 💼 LinkedIn Post

## AI Coding Projects: From Notebook to Production

A working notebook is only the beginning of an AI project.

Production AI needs:

- Typed APIs
- Clean architecture
- Retries and timeouts
- RAG / agent workflows
- Docker
- CI/CD
- Unit + integration + evaluation tests
- Security
- Observability
- Cost controls

A reusable production structure can be:

```text
routes
  ↓
services
  ↓
clients
  ↓
stores
```

And the deployment pipeline:

```text
Lint
 ↓
Tests
 ↓
Eval gate
 ↓
Security scan
 ↓
Docker build
 ↓
Canary
 ↓
Production
```

Three useful production patterns:

**RAG Chatbot**
→ retrieve → re-rank → generate → cite

**AI Agent**
→ plan → tool → observe → repeat, with bounded execution

**Salesforce Assistant**
→ LWC → Apex → sharing/FLS → AI → approval → audit

The biggest mindset shift:

> **Don't build only something that works. Build something that can be tested, secured, monitored, deployed, and operated.**

#AIEngineering #LLM #RAG #AIAgents #SystemDesign #MLOps #GenerativeAI #Salesforce
