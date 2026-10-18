# AI Agents — Phase 7
## Visual-first · LLMs that plan, act, observe, and self-correct in a loop to achieve goals autonomously

> **Agent = LLM + Tools (P6) + Memory (P3/P4) + a Loop + a Goal.**
>
> Everything you've learned plugs in here.

---

# Phase 7 Overview

- Single / Multi-Agent
- Planning
- Reflection
- LangGraph · CrewAI · AutoGen
- Decision Tree
- The 10-Step Path
- Problem it solves
- Why invented
- Without it
- Analogy
- Visual architecture
- Internal working
- Code
- Production
- Scaling
- Interview Qs

---

# Big Picture — The Anatomy of an Agent

```text
                         🎯 GOAL
                            │
                            ▼
                    ┌─────────────────┐
                    │   🧠 Brain LLM  │
                    │ Reasoning       │
                    │ Decision making │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
          🔧 Tools         🧠 Memory       🔁 Loop
          Search           Short-term      Plan
          APIs             context         Act
          Code exec        Long-term       Observe
          Database         vector DB       Reflect
              │              │              │
              └──────────────┼──────────────┘
                             ▼
                       ✅ Goal achieved
```

Patterns:
- Single agent
- Multi agent
- Planner-executor
- Reflection

**Mind Map:** brain + tools + memory + loop = autonomous behavior

---

# Step 1 — What problem does it solve?

💡 **The problem:** A single LLM call is "one-shot" — it can't break a big goal into steps, use tools mid-way, check its own work, or recover from errors.

Real tasks such as **"research competitors and write a report"** need many steps, decisions, and tool calls.

An agent wraps the LLM in a loop so it can:

**plan → act → observe → adapt**

until the goal is done.

## Example

**Goal:** `Plan a 3-day Tokyo trip within budget`

### Single LLM call
❌ Guesses, no live prices  
❌ No step-by-step  
❌ No checks

### Agent
```text
search flights → check hotels → compute budget → revise → finalize
```

✅ Grounded  
✅ Multi-step  
✅ Self-corrected plan

**AI Engineering point:** An agent is not simply a "smarter LLM". The important change is the **control loop around the LLM**.

---

# Step 2 — Why was it invented?

Function calling (P6) gave the model **hands**. Agents add a **brain loop** so it can use those hands repeatedly toward a goal.

Patterns/frameworks in the source:

- **2022 — ReAct:** reason + act + observe loop
- **2023 — AutoGPT / BabyAGI:** autonomous task loops (fragile)
- **2023 — LangChain agents:** tools + memory abstractions
- **2024 — LangGraph:** graph-based controllable agents
- **2024 — CrewAI / AutoGen:** role-based multi-agent teams / conversational patterns

## From one call to autonomy

```text
One call
  ↓
Function calling
  ↓
Repeated tool use
  ↓
Reason → Act → Observe
  ↓
Planning / Reflection
  ↓
Single agent
  ↓
Multi-agent
```

---

# Step 3 — What happens if we don't use one?

### Force a multi-step task into 1 prompt
❌ Can't fetch live data mid-task  
❌ No self-correction on errors  
❌ Hits context limits on big tasks

### Hand-code every step yourself
❌ Rigid; breaks on new inputs  
❌ Endless if/else branches

⚖️ **Important:** The opposite mistake is using an agent when a simple chain or single call would do. Agents add latency, cost, and unpredictability.

---

# Step 4 — Real-world analogy

## 👩‍🔧 Junior employee vs vending machine

A plain LLM is a vending machine: **one input → one output.**

An agent is a capable junior employee: give them a goal, and they figure out the steps, look things up (tools), check their work (reflection), ask for help when stuck, and return with a finished result.

You manage the **goal & guardrails**, not every keystroke.

## 🎬 Multi-agent = a film crew

- Director → orchestrator
- Researcher
- Writer
- Reviewer

Each specialist agent hands work to another.

---

# Step 5 — Visual architecture — the agent loop

```text
                 🎯 Goal
                    │
                    ▼
             🧠 Reason / Plan
             "what's the next step?"
                    │
                    ▼
             Need a tool?
              /                    yes         no
             │           │
             ▼           ▼
        🔧 Call tool   Can answer?
        search/API/      │
        code             │
             │           │
             ▼           │
        👀 Observe       │
          result         │
             │           │
             ▼           │
         🔁 Reflect ◄────┘
        done? error? adjust?
             │
        ┌────┴────┐
       no        yes
        │          │
        └─ loop    ▼
                 ✅ Final answer
```

**Memory is threaded throughout:**
- Short-term context
- Long-term memory / vector DB
- State/checkpoints

**Core loop:** Reason → Act → Observe → Reflect.

---

# Step 6 — Internal working — the 4 agent patterns

## ① Single Agent (ReAct loop)

```text
Task
 ↓
Agent (LLM + tools)
 ↓
Answer
 ↑
 └── repeated loop ──
```

## ② Planner–Executor

```text
Goal
 ↓
🗺️ Planner
break into sub-tasks
 ├─ Step 1 → Executor
 ├─ Step 2 → Executor
 └─ Step 3 → Executor
        ↓
      Combine
        ↓
    ✅ Result
```

## ③ Reflection Agent

```text
Draft answer
     ↓
 🔍 Critic
"what's wrong?"
     ↓
Revise
     ↓
✅ Final
```

**Reflection = generate → critique → revise.**

It can improve difficult outputs, but adds model calls, latency, and cost.

## ④ Multi-Agent

```text
                 🎬 Orchestrator
                /       |                      ▼        ▼        ▼
        🔎 Researcher ✍️ Writer ✅ Reviewer
               │        │        │
               └── findings / draft / approved ──┘
                          │
                          ▼
                   Final deliverable
```

---

# The 3 Frameworks

| Framework | Core model | Key idea | Best fit |
|---|---|---|---|
| **LangGraph** | Graph / Control | Agents as state graphs, explicit nodes/edges, loops | Controllable workflows |
| **CrewAI** | Role-based | Roles + goals + tasks; agents collaborate as a crew | Role specialization |
| **AutoGen** | Conversational | Agents talk to each other; flexible conversation patterns | Research / coding |

### LangGraph
- Agents as state graphs
- Explicit nodes/edges, loops
- Best for controllable workflows
- Production-grade, debuggable

### CrewAI
- Define roles + goals + tasks
- Agents collaborate as a "crew"
- Simple, intuitive
- Best for role specialization

### AutoGen
- Agents talk to each other
- Flexible conversation patterns
- Strong for research/code
- Microsoft-backed

> Frameworks evolve. The important architectural distinction is **graph/control vs role/task collaboration vs conversational coordination**.

---

# ★ Decision Tree — Which agent framework should I use?

```text
What's the core need?
       │
       ├── Controllable, stateful workflow with branches/loops
       │             ↓
       │        🟣 LangGraph
       │
       ├── Team of role-based specialists collaborating
       │             ↓
       │        🟢 CrewAI
       │
       ├── Open-ended research / agents conversing & coding
       │             ↓
       │        🔵 AutoGen
       │
       └── Just tools in a simple loop
                     ↓
              Single ReAct agent
              (no heavy framework)
```

Mental model:
- workflow → LangGraph
- role-based → CrewAI
- research/chat → AutoGen
- simple → plain ReAct

---

# Step 7 — Code implementation

## A · Minimal agent loop from scratch

```python
def run_agent(goal, tools, max_steps=6):
    messages = [
        {"role":"system","content":"Use tools to reach the goal."},
        {"role":"user","content": goal}
    ]

    for step in range(max_steps):              # ← cap prevents infinite loops
        resp = llm(messages, tools=tools)

        if resp.tool_calls:                    # ACT
            for call in resp.tool_calls:
                result = execute(call)          # OBSERVE
                messages.append(tool_msg(call, result))
        else:
            return resp.content                 # ✅ done

    return "Stopped: max steps reached"
```

**Core engine:**
```text
Goal → LLM decides → tool? → execute → observe → back to LLM → final
```

## B · LangGraph (controllable graph)

```python
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode

g = StateGraph(AgentState)
g.add_node("reason", call_model)
g.add_node("tools", ToolNode(tools))
g.set_entry_point("reason")
g.add_conditional_edges(
    "reason",
    should_continue,
    {"act":"tools", "end": END}
)
g.add_edge("tools", "reason")        # loop back

app = g.compile()
app.invoke({"messages": [("user", "Research X and summarize")]})
```

## C · CrewAI (role-based team)

```python
from crewai import Agent, Task, Crew

researcher = Agent(
    role="Researcher",
    goal="Find facts on {topic}",
    tools=[search]
)

writer = Agent(
    role="Writer",
    goal="Write a clear summary"
)

t1 = Task(description="Research {topic}", agent=researcher)
t2 = Task(description="Write report from research", agent=writer)

crew = Crew(
    agents=[researcher, writer],
    tasks=[t1, t2]
)

print(crew.kickoff(inputs={"topic": "vector databases"}))
```

---

# Step 8 — Production deployment

```text
User goal
   ↓
Agent orchestrator
   ↓
Guardrails + max steps + budget
   ↓
Reason / Act loop
   ├── Tools (scoped permissions)
   └── Memory (vector DB + state store)
   ↓
Risky action?
   ↓ yes
🧑 Human approval
   ↓
📊 Tracing: every step, token cost, latency, errors
   ↓
✅ Result
```

## Production rules

### Observability is non-negotiable
Trace every step: model calls, tool calls, results, token cost, latency, errors.

Examples from the source:
- LangSmith
- Langfuse

### Budgets & caps
- max steps
- token/time limits
- loop detection

### Scoped permissions + approval gates
Destructive actions should have approval gates.

### Persistent state
Checkpoint long tasks so they survive restarts.

---

# Important Production Additions

These are only the high-value additions directly relevant to the source.

## 1. LLM ≠ authorization layer

```text
LLM decision
    ↓
Tool request
    ↓
Policy / permission check
    ↓
Business validation
    ↓
Human approval if required
    ↓
Execute
```

The LLM can **suggest** an action; deterministic policy code should decide whether that action is permitted.

## 2. Idempotency

For write actions, retries can duplicate operations.

```text
create order
   ↓ timeout
retry
   ↓
duplicate order ❌
```

Use idempotency keys or equivalent safeguards for important writes.

## 3. Timeouts and retries

External tools should have:
- timeout
- bounded retries
- fallback behavior

## 4. Human-in-the-loop

```text
Agent → risky action → policy check → human approval → execute
```

---

# Step 9 — Scaling concerns

| Concern | Why | Fix |
|---|---|---|
| Cost explosion | Many LLM calls per task | Cheaper models for sub-steps, caps, caching |
| Latency | Sequential reason/act loops | Parallelize independent steps, smaller models |
| Reliability / loops | Agents get stuck or repeat | Max-steps, loop detection, fallback paths |
| Error compounding | One bad step poisons the rest | Reflection, validation between steps |
| Multi-agent chaos | Agents talk in circles | Clear roles, termination rules, an orchestrator |
| Security | Autonomous real-world actions | Least-privilege tools, approval gates, sandbox |

## Practical scaling pattern

```text
Complex planning → stronger model
Simple extraction → smaller model
Tool execution → deterministic code
Repeated reads → cache
Independent work → parallelize
```

### Cost mental model

```text
Total cost ≈
iterations × tokens/iteration × model cost
+ tool/API costs
```

### Parallel independent work

```text
             ┌→ Research A ─┐
Goal ────────┼→ Research B ─┼→ Combine
             └→ Research C ─┘
```

Only parallelize tasks that are actually independent.

---

# Decision Guide — When to use · When NOT · Trade-offs

| Task shape | Best fit |
|---|---|
| Single fact / answer | Plain LLM call |
| Answer from docs | RAG (P5) |
| Fixed known steps | Hard-coded chain / workflow |
| Dynamic multi-step, needs tools + decisions | ✅ Agent |
| Many specialized roles | ✅ Multi-Agent |

## ✓ Use an agent when
- Steps aren't known in advance
- Needs tools + decisions mid-task
- Must adapt/recover from errors
- Open-ended research/automation
- Genuinely multi-step goals

## ✗ Don't use an agent when
- A single call or RAG suffices
- Steps are fixed → use a chain
- Latency/cost-critical paths
- Determinism/auditability required
- You can't constrain its actions safely

---

# How to identify in an interview

### 🎯 Triggers FOR agents
"autonomous", "multi-step", "decide which tools", "research and then act", "self-correct", "no fixed workflow."

### Triggers AGAINST
"one answer", "from our docs" (RAG), "known sequence of steps" (chain), "must be deterministic."

### Senior signal
**Propose the simplest thing that works before reaching for agents.**

---

# Common mistakes

✗ Agent where single call/RAG/fixed chain would do → over-engineering.

✗ No max-steps/budget cap → runaway loops & cost.

✗ No tracing/observability → impossible to debug failures.

✗ Broad permissions with no approval gates.

✗ Too many agents/tools → coordination chaos.

---

# Alternatives & Trade-offs

| Need | Alternative | Trade-off |
|---|---|---|
| Fixed known steps | Deterministic chain/workflow | Predictable & cheap vs not adaptive |
| Knowledge answers | RAG (P5) | Grounded vs no autonomy |
| One action | Function calling (P6) | Simple vs single-shot |
| Controllable autonomy | LangGraph (graph) | Debuggable vs more setup than free-form |

---

# Agent vs RAG vs Tool Calling vs Workflow

```text
Need?
 │
 ├─ Knowledge from documents → RAG
 ├─ One external action → Function calling
 ├─ Fixed steps → Workflow / chain
 └─ Dynamic steps + decisions → Agent
```

These can be combined:

```text
Agent
 ├── RAG
 ├── Function calling
 ├── Memory
 └── Workflow nodes
```

---

# Step 10 — Interview Questions & Answers

## Q1. What is an AI agent, precisely?
An AI agent is a system where an LLM operates toward a goal through an iterative control loop. It can decide what action to take, use tools, observe results, update context/memory, and continue until a stopping condition.

**Core:** LLM + tools + memory + loop + goal.

## Q2. Agent vs a simple chain — when each?
Use a chain/workflow when steps are known and deterministic. Use an agent when the next step depends on current state, tool results, errors, or decisions made during execution.

```text
Known sequence → chain
Dynamic sequence → agent
```

## Q3. Explain ReAct.
ReAct combines reasoning and action:

```text
Reason → Act → Observe → Reason again → ...
```

The tool observation becomes input for the next decision.

## Q4. When multi-agent over single-agent?
When the task naturally decomposes into distinct specialist roles and coordination overhead is justified.

Example:
```text
Researcher → Writer → Reviewer
```

## Q5. LangGraph vs CrewAI vs AutoGen?
- LangGraph → explicit state graph, nodes/edges, controllable branching/loops
- CrewAI → role/task-oriented collaboration
- AutoGen → conversational multi-agent patterns

Choose based on control requirements and task shape.

## Q6. How do you stop runaway agents?
Use:
- max steps
- token budget
- timeouts
- loop detection
- tool-call limits
- termination conditions
- fallback paths
- human approval for risky actions

Never rely only on the model to decide when it should stop.

## Q7. What's the role of reflection?
Reflection adds:
```text
Generate → Critique → Revise → Final
```
It can improve difficult outputs but adds inference calls, latency, and cost.

## Q8. Biggest production risks?
- Runaway loops
- Cost explosion
- Latency
- Tool/API failures
- Error compounding
- Unsafe/unauthorized actions
- Prompt/tool manipulation
- Multi-agent coordination failures
- Difficult debugging without traces
- Non-deterministic behavior

Layered controls:
**guardrails + permissions + validation + observability + budgets + retries/timeouts + approval gates + persistent state**

---

# Advanced Concepts — only the important ones

## 1. State is more important than "chat history"

Production agent state may include:

```text
goal
current_step
tool_results
messages
plan
approvals
errors
retrieved_context
final_result
```

This makes execution more resumable and observable.

## 2. Checkpointing

```text
Step 1 → checkpoint → Step 2 → checkpoint → Step 3
```

A crash after Step 2 should not require starting everything again.

## 3. Tool result compression

```text
Large API result
      ↓
filter / summarize / extract
      ↓
compact structured result
      ↓
LLM
```

This reduces token cost and context pressure.

## 4. Dynamic tool selection

If an agent has hundreds of tools, exposing all tools every turn can increase prompt size, ambiguity, latency, and cost.

```text
User goal → Tool retrieval/routing → Relevant tools → Agent
```

## 5. Trajectory evaluation

For agents, evaluate more than the final answer:
- tool selection
- arguments
- number of steps
- unnecessary calls
- recovery after errors
- policy violations
- final quality
- cost/latency

---

# Super-Advanced — Agent Trust Boundary

> **The LLM is a decision-making component, not the security boundary.**

```text
                  LLM
                   │
             "I want to do X"
                   │
                   ▼
            Policy layer
                   │
             allowed?
              /                   no         yes
            │           │
         reject         ▼
                 Business validation
                        │
                        ▼
                 Human approval?
                        │
                        ▼
                   Tool execute
```

This matters for:
- sending messages
- modifying records
- issuing refunds
- creating/deleting resources
- code execution
- private information access

---

# Single-Agent vs Multi-Agent

| Dimension | Single Agent | Multi-Agent |
|---|---|---|
| Simplicity | Higher | Lower |
| Coordination | Easy | Harder |
| Roles | Generalist | Specialists |
| Debugging | Easier | More difficult |
| Cost | Usually lower | Can be higher |
| Best use | General multi-step task | Distinct specialist roles |

**Rule:** Start with one agent. Split into multiple agents only when specialization or isolation provides a clear benefit.

---

# Agent Maturity Ladder

```text
Level 1  Single LLM
   ↓
Level 2  Tool calling
   ↓
Level 3  Single ReAct agent
   ↓
Level 4  Planning / reflection
   ↓
Level 5  Stateful / checkpointed agent
   ↓
Level 6  Multi-agent
   ↓
Level 7  Production controls + evaluation + observability
```

Do not jump to multi-agent if Level 3 solves the problem.

---

# Production Reference Architecture

```text
                         USER
                           │
                           ▼
                    Goal / Request
                           │
                           ▼
                ┌───────────────────┐
                │ Agent Orchestrator│
                └─────────┬─────────┘
                          │
              ┌───────────┼───────────┐
              ▼           ▼           ▼
           Policy       State       Memory
           checks      store       / RAG
              │           │           │
              └───────────┼───────────┘
                          ▼
                    Reason / Plan
                          │
                    ┌─────▼─────┐
                    │ Tool Router│
                    └─────┬─────┘
                          │
            ┌─────────────┼─────────────┐
            ▼             ▼             ▼
          Search          API          Code
            │             │             │
            └─────────────┼─────────────┘
                          ▼
                       Observe
                          │
                       Validate
                          │
                       Reflect
                          │
                    Continue / End
                          │
                          ▼
                       Result

Tracing / metrics / audit logs across the entire flow
```

---

# Production Checklist

## Control
- [ ] Maximum steps
- [ ] Token budget
- [ ] Time budget
- [ ] Loop detection
- [ ] Clear termination conditions

## Security
- [ ] Least-privilege tools
- [ ] Authorization outside the LLM
- [ ] Input validation
- [ ] Tool-result validation
- [ ] Approval gates
- [ ] Sandbox for code execution
- [ ] Audit logs

## Reliability
- [ ] Timeouts
- [ ] Retries
- [ ] Fallbacks
- [ ] Checkpointing
- [ ] Idempotent write tools

## Observability
- [ ] Trace every model call
- [ ] Trace every tool call
- [ ] Token usage
- [ ] Latency
- [ ] Error rate
- [ ] Tool success/failure
- [ ] Cost per task

## Evaluation
- [ ] Final answer quality
- [ ] Tool selection
- [ ] Tool arguments
- [ ] Recovery behavior
- [ ] Unnecessary tool calls
- [ ] Safety/policy violations

---

# Quick Decision Tree

```text
                     Start
                       │
                       ▼
              Is it one simple answer?
                 /                            yes              no
                │                │
           Plain LLM        Need private/current
                            knowledge?
                              /                                   yes        no
                             │          │
                            RAG     Are steps fixed?
                                       /                                            yes        no
                                      │          │
                                   Workflow    Need tools
                                                + decisions?
                                                  /                                                    no      yes
                                                │        │
                                           Function   Agent
                                           calling      │
                                                       │
                                             Distinct specialist
                                             roles needed?
                                                /                                                     no         yes
                                               │           │
                                         Single Agent  Multi-Agent
```

---

# One-Page Revision

**AI Agent:** LLM + Tools + Memory + Loop + Goal

**Core loop:** Reason → Act → Observe → Reflect

**Four patterns:**
1. Single Agent / ReAct
2. Planner–Executor
3. Reflection
4. Multi-Agent

**Framework mental model:**
- LangGraph → graph/control
- CrewAI → roles/tasks
- AutoGen → conversation

**Use agent when:** dynamic steps, tools, decisions, adaptation/recovery, open-ended multi-step goals.

**Don't use agent when:** one call works, RAG solves it, fixed workflow, strict determinism, latency/cost critical, unsafe to constrain.

**Production must-have:** max steps, budgets, permissions, validation, observability, timeouts/retries, checkpointing, approval gates, evaluation.

---

# Golden Rules

1. **Agent ≠ just LLM.** It is an LLM inside a controlled loop.
2. **Tools give agents capabilities.**
3. **Memory gives continuity.**
4. **The loop gives autonomy.**
5. **The goal gives direction.**
6. **Start simple.**
7. **Do not use agents for deterministic workflows.**
8. **Never trust the LLM as your authorization layer.**
9. **Every production agent needs limits and observability.**
10. **Multi-agent is not automatically better than single-agent.**

---

# Phase 6 → Phase 7 Connection

```text
P6 Function Calling / Tool Use
            │
            │ gives LLM the ability to ACT
            ▼
P7 AI Agents
            │
            ├── Goal
            ├── Loop
            ├── Planning
            ├── Memory
            ├── Reflection
            └── Multiple tools / agents
            │
            ▼
Autonomous multi-step behavior
```

**P6:** "Here is a tool. Decide whether to call it."

**P7:** "Here is a goal. Decide what to do, call tools repeatedly, observe results, adapt, and finish the goal."

---

# AI Engineering Big Picture — Phases 1–7

```text
LLM
 │
 ├── Prompt Engineering (P2)
 ├── Embeddings (P3)
 │      └── Similarity Search
 ├── Vector Databases (P4)
 │      └── Retrieval infrastructure
 ├── RAG (P5)
 │      └── Private / fresh knowledge
 ├── Function Calling (P6)
 │      └── Actions / tools
 └── AI Agents (P7)
        ├── Goal
        ├── Planning
        ├── Loop
        ├── Memory
        ├── Tools
        ├── Reflection
        └── Multi-agent
```

**Big mental model:**
- RAG gives the model knowledge.
- Tools give the model actions.
- Memory gives continuity.
- Agents give the system a controlled loop toward a goal.

---

# LinkedIn Post

AI Agents are not simply "LLMs that can use tools."

The important idea is the loop:

🧠 Reason  
🔧 Act  
👀 Observe  
🔁 Reflect  
🎯 Continue until the goal is achieved

A useful mental model is:

**Agent = LLM + Tools + Memory + Loop + Goal**

The progression:

P2 → Prompt Engineering  
P3 → Embeddings  
P4 → Vector Databases  
P5 → RAG  
P6 → Function Calling / Tool Use  
P7 → AI Agents

RAG gives the system knowledge.

Function calling gives it actions.

Memory gives it continuity.

The agent loop gives it controlled autonomy.

But production agents need guardrails:

• Max steps and token budgets  
• Least-privilege tools  
• Authorization outside the LLM  
• Human approval for risky actions  
• Timeouts and retries  
• Checkpointing  
• Tracing and evaluation  
• Loop detection

One of the most important engineering principles:

**Don't use an agent when a simpler deterministic workflow will solve the problem.**

Start with the simplest architecture that works. Add autonomy only when the task genuinely needs dynamic decisions.

#AIEngineering #AIAgents #LLM #RAG #GenerativeAI #AgenticAI #SystemDesign

---

# Final Summary

AI Agents are the next layer after tool use.

```text
Single LLM call
       ↓
Tool calling
       ↓
Repeated tool use
       ↓
Reason → Act → Observe
       ↓
Planning + Reflection + Memory
       ↓
Single / Multi-Agent systems
```

The key engineering lesson is:

> **What is the simplest architecture that safely solves this goal?**

If one LLM call works → use it.

If knowledge retrieval is the problem → use RAG.

If one action is needed → use function calling.

If the workflow is fixed → use a deterministic workflow.

If the steps are dynamic and require decisions, tools, adaptation, and recovery → use an agent.

For production:

**control the loop, control the permissions, observe every step, and evaluate the trajectory.**
