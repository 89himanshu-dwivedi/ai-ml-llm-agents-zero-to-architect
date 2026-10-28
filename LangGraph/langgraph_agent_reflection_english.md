# LangGraph Agent Reflection — Complete English Notes

> **Source handling:** These notes are based on the uploaded transcript and the accompanying Agent Reflection diagrams. The original transcript is preserved as-is in **Appendix A — Original Transcript (Verbatim)**. The structured notes and practical recommendations are assistant-added material and are clearly separated.

## 1. Quick Summary

**Agent Reflection** is a design pattern in which a generator LLM produces an answer, then a reflector/critic reviews it against the user's question. The critic provides feedback and the generator can revise the answer. The loop stops when the answer is acceptable or the maximum reflection count is reached.

Core loop:

`START → Generate (LLM) → [Tool call?] → Tool → Generate → Reflect → Generate → END`

- **Generator:** creates an answer or decides to call a tool.
- **Tool node:** executes tools such as search or Wikipedia and returns results to the state/messages.
- **Reflector:** checks factual accuracy, relevance, clarity, completeness, and requested format; provides improvement feedback.
- **Conditional routing:** chooses among tools, reflection, and END.
- **Reflection counter:** bounds repeated reflection and prevents an uncontrolled infinite loop.

Reflection may improve output quality, but every additional LLM call can increase token cost and latency. It should not necessarily run for every request.

## 2. What is Agent Reflection?

Agent Reflection is a pattern in which a generated response is reviewed by a critic/reflector rather than being sent directly to the user. The critic checks whether the response:

1. Answers the user's actual question.
2. Contains factual errors or unsupported claims.
3. Omits important information.
4. Follows the required format, clarity, and completeness expectations.
5. Can be improved.

If improvement is needed, the critic sends feedback to the generator. The generator produces a revised answer. The loop repeats until approval or an iteration limit.

### Generator and reflector roles

| Component | Responsibility | Typical input | Output |
|---|---|---|---|
| Generator / LLM node | Produces the initial or revised answer; may call tools | User question, prior messages, tool results, critic feedback | Answer or tool-call request |
| Tool node | Executes requested tools | Tool-call message | Tool result |
| Reflector / Critic node | Reviews the previous answer | Question, previous answer, review instructions | Critique/feedback and revision direction |
| Conditional router | Selects the next node | Latest message and reflection count | `tools`, `reflect`, or `end` |
| State | Carries workflow data between nodes | Messages and fields such as the counter | Updated state |

The reflector can use the same underlying LLM with a different prompt, or a separate model. In the transcript's example, the generator and reflector use an LLM-with-tools flow, and the reflection prompt is supplied as an additional message.

## 3. Reflection vs. a normal tool-using agent

### Normal agent

`START → LLM → (Tool → LLM)* → END`

The LLM can call tools, receive tool results, and then produce a final answer.

### Reflection agent

`START → Generate → (Tool → Generate)* → Reflect → Generate → END`

In addition to the normal tool cycle, there is a route for reviewing the answer. The reflection node sends feedback back to the generator. In the diagrams, `END`, `Tool`, and `Reflection` are possible conditional routes from the generator.

## 4. Cost, latency, and quality trade-off

Each reflection cycle adds an LLM call. Repeated generation and review can increase token usage and response time. The exact cost is not a fixed multiplier: it depends on prompt and answer lengths, model pricing, tool calls, and the actual number of loop iterations.

### When reflection may be useful

- High-stakes drafts such as legal or policy documents, with appropriate human review.
- Production code review or technical design drafts.
- Research reports and multi-source synthesis.
- Outputs where completeness, structure, or strict formatting matters.
- Tool-based research where checking results against the user's question is valuable.

### When to avoid or limit it

- Simple factual questions for which a reliable direct answer is enough.
- Low-latency, real-time chat.
- High-volume requests where every additional model call is expensive.
- Tasks where the critic lacks evidence needed to verify the answer.

**Key point:** Reflection does not guarantee truth. The critic can also be wrong. High-stakes applications may need source verification, deterministic validation, and human review.

## 5. LangGraph architecture

The transcript's example consists of these main parts:

1. Define tools — a search tool and optional Wikipedia/other tools.
2. Define the LLM and bind tools.
3. Define state — `messages` and `reflection_count`.
4. Create the generate/LLM node.
5. Create the tool node.
6. Create the reflection node.
7. Create a conditional routing function.
8. Connect nodes and edges in a StateGraph.
9. Compile and visualize the graph.
10. Invoke/test with example questions.

### State

- `messages`: carries the user question, assistant output, tool-call/tool-result messages, and reflection instructions/feedback.
- `reflection_count`: tracks how many reflections have run and helps limit the loop.

The transcript describes `AgentState` as a TypedDict/type-based state and uses the concept of a message-list reducer. In actual code, reducer annotations/imports must match the installed LangGraph version.

### Nodes

**Generate node**
- Reads conversation messages from state.
- Invokes the LLM with tools bound.
- Appends/returns the generated assistant message to state.

**Tool node**
- Executes bound tools.
- Adds tool results as messages in state.
- Returns control to the generator node.

**Reflection node**
- Sends the previous question and answer to the model with a review prompt.
- Asks the model to improve factual accuracy, clarity, completeness, and relevance.
- Increments the reflection count.
- Makes feedback/revised-answer guidance available to the next generator pass.

### Conditional routing

The transcript describes a function such as `should_continue` with this logic:

1. If the last assistant message contains tool calls, return the `tools` route.
2. Otherwise, if reflection is still allowed/required (the example uses `reflection_count < 1`), return `reflect`.
3. Otherwise, return `end`.

This is a simple one-reflection example. Multiple reflections require an explicit maximum count/configuration. Route names must match the mapping used by `add_conditional_edges`.

### Graph connections

- `START → generate`
- `generate → tools` (when tool calls are present)
- `generate → reflect` (when reflection should run)
- `generate → END` (when there is no tool call and the reflection limit is complete)
- `tools → generate`
- `reflect → generate`

## 6. Example flow: AI news query

The transcript tests the question: **“Give me May 2026 news headlines related to AI.”**

Expected conceptual sequence:

1. `generate` — the LLM processes the question.
2. `tools` — the search tool retrieves relevant results/headlines.
3. `generate` — the LLM synthesizes the tool results.
4. `reflect` — the answer is reviewed for relevance, accuracy, clarity, and completeness.
5. `generate` — the LLM produces a revised/final answer based on feedback.
6. `end` — the final response is returned.

The transcript reports a tool-call-related error in one run and a successful re-execution afterward. Testing and message/tool-call compatibility therefore matter; the reflection pattern does not guarantee that code will work on the first attempt.

A second example is: **“Give me some latest papers on AI in healthcare.”** In this case, the generator may make multiple tool calls as needed, followed by reflection and final generation.

## 7. Code-planning checklist

Before writing code, list these items:

- [ ] Define search/Wikipedia/other tools.
- [ ] Define the chat model.
- [ ] Bind tools to the model.
- [ ] Include messages and a reflection counter in state.
- [ ] Create the generator node.
- [ ] Register the required tools in ToolNode.
- [ ] Create the reflector prompt and reflection node.
- [ ] Ensure the router checks tool calls first.
- [ ] Set a clear upper bound for reflection count.
- [ ] Connect `START`, `END`, and node routes.
- [ ] Compile and visualize the graph.
- [ ] Test final-answer extraction and error handling.

## 8. Interview / exam revision

| Question | Short answer |
|---|---|
| What is Agent Reflection? | Reviewing a generator's output with a critic and revising it based on feedback. |
| What is the purpose of the reflection node? | To review/improve relevance, accuracy, clarity, completeness, and format. |
| Must the reflector be a separate model? | No. The same LLM with a different prompt or a separate LLM can be used. |
| Where does control go after the tool node? | Back to the generator/LLM node so it can process the tool result. |
| Why track reflection count? | To avoid infinite loops and uncontrolled cost/latency. |
| What does the conditional router decide? | Tool call, reflection, or END. |
| Does reflection completely remove hallucinations? | No. It is an extra review layer, not a guarantee of truth. |
| What is the main trade-off? | Potential quality improvement versus additional LLM cost and latency. |
| Is reflection needed for simple factual Q&A? | Often not, unless a validation requirement justifies it. |
| What is LangGraph's benefit here? | Explicit state, nodes, edges, and visibility/control over execution paths. |

## 9. Common errors / gotchas

1. **Infinite loop:** without a reflection limit, the graph may keep reflecting.
2. **Tool-routing priority:** if the latest message has tool calls, the router should handle the tool route first.
3. **Tool-call protocol:** after a tool call, maintain matching tool-result messages and the correct message sequence.
4. **State updates:** use the correct reducer to append messages; avoid accidentally overwriting state.
5. **Vague reflection prompt:** specify evaluation criteria and expected output rather than only saying “improve the answer.”
6. **Unsupported critique:** if the critic has no evidence to judge correctness, its confidence can be misleading.
7. **Counter semantics:** consistently decide whether the counter increments before or after reflection; test for off-by-one errors.
8. **Cost assumptions:** “three reflections = exactly three times total cost” is not always true; calculate actual generation, review, tool, and token costs.
9. **Search freshness:** for “latest” news/papers, inspect search freshness, timestamps, and source quality.
10. **Model/version mismatch:** LangGraph/LangChain APIs and tool integrations can change. Verify signatures against the official documentation for the installed version.

## 10. Additional Points Added — Recommended Implementation Practices

> These recommendations are assistant-added and should not be confused with the transcript's original claims.

### 10.1 Use structured critique

Ask the reflector to return structured fields such as:

- `approved`: boolean
- `issues`: list of concrete problems
- `evidence_gaps`: missing sources or unsupported claims
- `revision_instructions`: specific, actionable feedback

This can make routing and debugging more predictable than free-form prose.

### 10.2 Improve the stopping policy

Alongside a maximum iteration count, use stop criteria such as:

- The critic approves the answer.
- The maximum reflection count is reached.
- No meaningful improvement occurs across iterations.
- The time/token budget is reached.
- Required evidence is unavailable — disclose uncertainty instead of inventing facts.

### 10.3 Do not treat self-critique as independent verification

If the generator and critic use the same model and evidence, they may share the same blind spot. For high-stakes use, add citations/source checks, unit tests, schema validation, policy rules, and human approval.

### 10.4 Separate tool use from reflection

Tool use gathers evidence; reflection evaluates the answer against the collected evidence. Instruct the critic not to add new facts without evidence.

### 10.5 Production observability

Log node transitions, tool names, elapsed time, iteration count, token usage, critic findings, stop reason, and error category. Minimize or redact sensitive data in logs.

## 11. No-Skip Checklist

- [ ] Agent Reflection definition and generator/critic roles.
- [ ] Review criteria: errors, gaps, relevance, requested format.
- [ ] Feedback-to-generator loop.
- [ ] Reflection stopping/maximum iteration concept.
- [ ] LLM-call cost, latency, and quality trade-off.
- [ ] High-stakes and simple factual/real-time examples.
- [ ] Standard agent architecture vs. reflection architecture.
- [ ] Tools, model binding, state, messages, reflection count.
- [ ] Generate, tools, and reflect nodes.
- [ ] Three-way conditional routing.
- [ ] Graph connections, compilation, visualization, invocation.
- [ ] AI headlines and healthcare papers test examples.
- [ ] Transcript's error/re-execution mention.
- [ ] Reminder not to memorize syntax; focus on logic and official documentation.
- [ ] Original transcript preserved in Appendix A.

## 12. Board-Level Answer

**Agent Reflection is a workflow pattern in which an LLM-generated answer is reviewed by a critic/reflector, which provides feedback for revision. In LangGraph, this can be implemented with generator, tool, and reflection nodes, a shared message state, a reflection counter, and conditional edges that route execution to a tool, reflection, or END. The loop should be bounded because each review adds cost and latency. Reflection can improve quality but does not guarantee factual correctness, so evidence-based validation and human review may still be required for high-stakes applications.**

## Appendix A — Original Transcript (Verbatim)

The following is the original uploaded transcript, preserved without intentional edits. Its wording, repetitions, and apparent transcription errors are retained.

