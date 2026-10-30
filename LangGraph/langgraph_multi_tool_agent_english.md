# LangGraph Multi-Tool AI Agent — English Notes

## 1. Executive Summary
This project builds a healthcare/clinical decision-support agent that answers natural-language questions by selecting among four tool categories: SQL database access, retrieval-augmented generation (RAG), web search, and Python computation. The LangGraph control flow is explicit: **Agent/LLM → Tools → Agent/LLM → (Tools again or END)**. This improves workflow visibility and control, but it does not guarantee factual correctness.

## 2. Problem and Objective
- A user asks a question in natural language.
- The required information may be in structured EHR tables, clinical documents, public web sources, or a calculation.
- The agent chooses the relevant tool; complex questions may require multiple tools in sequence.
- Tool outputs return to the agent, which synthesizes a user-readable answer.
- The transcript contrasts a prior LangChain ReAct implementation, which reportedly encountered token/iteration errors on some complex questions, with a more explicitly orchestrated LangGraph workflow. This is the instructor’s reported experience, not a universal benchmark.

## 3. Tool Selection Map
| Tool | Intended use | Example |
|---|---|---|
| SQL database toolkit | Query structured EHR/table data | Department names, patient counts, patient metrics |
| RAG retriever | Retrieve evidence from internal clinical documents/PDFs | Why is a risk level high under a clinical guideline? |
| Web search (SerpAPI or alternative) | Retrieve public/current internet information | Recent updates or public organizational facts |
| Python tool | Calculations, percentages, deterministic risk-score arithmetic | Compute metrics or aggregate values |

Tool descriptions should be precise so the model can determine when each tool is appropriate. The transcript describes short keyword queries for web search and clinical-document questions for RAG.

## 4. Graph Architecture
1. **START** — the user request enters the workflow.
2. **Agent / LLM node** — evaluates the request and available tools, then decides whether to answer or call a tool.
3. **Conditional routing** — route to Tools when a tool call is requested; otherwise route to END.
4. **Tools node** — executes the requested SQL, RAG, web-search, or Python tool.
5. Tool results are added to the state/message history and control returns to the Agent node.
6. The agent decides again whether another tool call is needed or whether it can answer.
7. When no further tool call is needed, the graph ends and returns the final answer.

```text
START → Agent/LLM ── tool call? ── Yes → Tools → Agent/LLM
                 └── No → END/Final answer
```

## 5. Implementation Sequence
1. Install/import required packages and configure API keys/environment variables.
2. Configure the EHR SQL database connection and SQL toolkit.
3. Expose the RAG retriever as a tool, with a clear scope description.
4. Configure web search (the transcript mentions SerpAPI or an alternative).
5. Define a Python calculation tool.
6. Combine all four tools into a tool list.
7. Define `AgentState` or an equivalent message state.
8. Bind the tools to the LLM so it can issue tool calls.
9. Create the Agent node to pass current messages to the tool-enabled LLM.
10. Create the Tools node. The transcript demonstrates a custom node that prints the tool name for visibility; the standard LangGraph `ToolNode` is also an option.
11. Build a `StateGraph`, set the Agent as the entry point, and use `tools_condition` or equivalent conditional routing to select Tools or END.
12. Add an edge from Tools back to Agent, compile the graph, and test representative questions.

## 6. State and Message Handling
- The Agent node passes messages to the model; the model response may be a final answer or may contain tool calls.
- After tool execution, tool results must be added to the message history and returned to the Agent node.
- The transcript’s default approach retains all messages. If repeated loops cause token/context issues, it mentions limiting the history to recent 5, 10, or 20 messages.
- Truncating history can remove useful context or earlier tool results. In production, design summarization/state compaction and explicit iteration limits carefully.

## 7. Test Scenarios Mentioned in the Transcript
| Question type | Expected routing idea |
|---|---|
| “What are all the departments in our DB?” | SQL tool |
| Clinical guideline/document question | RAG tool |
| Current public/web information | Web-search tool |
| Calculation, risk score, or percentage | Python tool |
| “Find diabetic patients with HbA1c above 9 and explain why they are high risk according to clinical guidelines” | SQL + RAG |
| “Identify patients with SpO₂ below 90 and summarize” | SQL, potentially followed by RAG/LLM synthesis depending on the requested explanation |
| Complex multi-source question | Multiple tools, possibly through repeated agent-tool cycles |

The transcript reports that test cases that had failed in the instructor’s prior LangChain setup worked more often in the LangGraph version. This is a reported observation, not a guarantee that every query will succeed.

## 8. Debugging Checklist
- Confirm that the appropriate tool was selected.
- Inspect each tool’s input and output, including empty/error results.
- Check for repeated tool calls without progress.
- Inspect message-history size and token usage.
- Improve tool descriptions and examples when routing is poor.
- Make system instructions and final-answer requirements explicit.
- Add maximum-iteration/time limits and a fallback for tool failures.
- Use tracing/observability to inspect node and tool-call sequences.

## 9. Production Safety — Additional Recommendations
> This section contains assistant-added practical guidance and is separate from the original transcript.

- **Healthcare privacy:** enforce minimum-necessary access, role-based permissions, audit logging, identifier redaction, and approved data-processing boundaries.
- **SQL safety:** use read-only credentials for read-only workflows; validate queries and enforce timeouts/row limits. Prompt instructions alone are not a security boundary.
- **Web safety:** treat retrieved web pages as untrusted data, not instructions. Mitigate prompt injection from search results.
- **RAG grounding:** cite retrieved document sections where possible, distinguish evidence from inference, and disclose when evidence is missing.
- **Tool permissions:** allowlist tools and apply least privilege.
- **Loop control:** cap tool-call rounds, handle tool exceptions, and return a controlled failure response rather than looping indefinitely.
- **Clinical oversight:** a demo agent is not a substitute for clinician judgment or validated clinical software; use appropriate human oversight and validation.

## 10. Trade-offs
- **Benefits:** explicit control flow, easier debugging, custom routing, multi-tool orchestration, and clear places to add validation/approval nodes.
- **Costs:** more graph/state design, additional LLM/tool latency, token/API cost, and safety engineering effort.
- **Key caveat:** LangGraph improves orchestration visibility and control; it does not automatically make the model correct or eliminate errors.

## 11. Interview Questions
1. Why migrate a multi-tool agent from LangChain-style execution to LangGraph?
2. What is the difference between the Agent node and the Tools node?
3. How does conditional routing choose between Tools and END?
4. How does a tool result return to the LLM?
5. When would SQL and RAG be combined in one workflow?
6. How would you prevent infinite tool-call loops?
7. Why might message history need to be limited or summarized?
8. What security controls are required for an EHR-connected agent?
9. How would you trace a wrong answer to tool selection, retrieval, or synthesis?
10. What are the limits of claiming that LangGraph is more reliable than another framework?

## 12. Quick Revision Table
| Concept | Key point |
|---|---|
| Agent/LLM node | Chooses to answer or call a tool |
| Tools node | Executes tool calls and returns results |
| Conditional edge | Routes to Tools or END |
| SQL | Structured database information |
| RAG | Internal documents/guidelines |
| Web search | Public/current internet information |
| Python | Calculations and deterministic computation |
| Message history | Carries user, AI, and tool messages |
| Iteration control | Prevents runaway tool loops |

## 13. Board-Level Answer
A LangGraph multi-tool agent accepts a natural-language request and routes it through an LLM node that selects from SQL, RAG, web-search, and Python tools. Tool results return to the agent, which can invoke additional tools or produce the final response. The explicit graph makes orchestration and failure points easier to inspect, while production deployment still requires access controls, validation, observability, iteration limits, and domain-specific safety measures.

## 14. No-Skip Checklist
- [ ] Motivation for rebuilding the LangChain multi-tool agent in LangGraph
- [ ] Healthcare/EHR use case and four tool categories
- [ ] Graph architecture and repeated agent-tool loop
- [ ] SQL, RAG, web-search, and Python tool purposes
- [ ] Tool descriptions, state, and LLM tool binding
- [ ] Agent node and custom/standard Tools node
- [ ] Conditional routing and graph compilation
- [ ] Single-tool and multi-tool test cases
- [ ] Token/iteration troubleshooting
- [ ] Portfolio and interview positioning
- [ ] Original transcript appended in Appendix A

## 15. Original Source — Preserved (Appendix A)
The following is the supplied transcript, preserved in its original sequence and wording. Speech-to-text repetitions and errors are intentionally not silently corrected.

