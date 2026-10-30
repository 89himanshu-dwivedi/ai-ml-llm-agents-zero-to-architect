# LangSmith Tracing for LangChain and LangGraph Agents

## 1. Learning objectives
- Understand why tracing and observability matter in agentic AI systems.
- See how LangSmith records a workflow run, including nodes, tools, inputs, outputs, latency, and token/cost information when available.
- Configure tracing in a notebook environment and inspect a run.
- Diagnose a poor final answer by following the execution trace instead of guessing.

## 2. Why tracing matters
Complex agent workflows can be hard to debug as a black box. A result may be poor because a tool returned weak data, the model did not synthesize the returned data well, routing went down an unexpected branch, or the program returned the wrong message. Manual `print()` statements can show the path, but an observability platform provides a visual, step-by-step run tree.

Tracing is especially useful when you need to:
- Find the node or tool where a workflow failed.
- Inspect tool calls and their results.
- Compare model inputs and outputs.
- Review execution order and branching.
- Measure latency and inspect token/cost metadata where available.
- Explain and improve system behavior in production.

## 3. What LangSmith records
In the transcript's explanation, a trace can show the overall run and its nested operations, including:
- User input and final output.
- Node/chain/tool execution order.
- Inputs and outputs for individual steps.
- Prompts and model responses.
- Tool names and returned content.
- Execution duration, errors, and metadata.
- Token usage and estimated cost when supplied by the model/provider and available in the trace.

**Important distinction:** a trace helps you inspect what the system did; it does not itself guarantee that the answer is correct. Treat trace data as a debugging and observability aid.

## 4. Typical tracing workflow
1. Create or sign in to a LangSmith account.
2. Create a project for the application or experiment.
3. Generate an API key and store it securely.
4. Configure the runtime environment with tracing enabled, the API key, and the project name.
5. Run the LangChain/LangGraph application.
6. Open the project in LangSmith and inspect the new run.
7. Expand individual nodes/tools to compare their inputs and outputs.
8. Identify where behavior diverged from expectations, then improve prompts, routing, tool selection, or output handling.

Never hard-code API keys into a committed notebook or source repository. Prefer environment variables or a secret manager. The transcript's notebook-specific setup is an example, not a universal requirement for every IDE or current SDK version.

## 5. Notebook setup concepts from the transcript
The instructor describes setting tracing-related environment variables, including:
- `LANGCHAIN_TRACING_V2=true` (the transcript also uses a `LANG_TRACE`-style variable in places; confirm the current official setup for your SDK/version).
- `LANGCHAIN_API_KEY` / LangSmith API key.
- `LANGCHAIN_PROJECT` for the project name.

The transcript also demonstrates importing a trace decorator and assigning a name to a traced function, conceptually like:

```python
from langsmith import traceable

@traceable(name="sample_test")
def simple_test(value: int) -> int:
    return value + 10

result = simple_test(10)
print(result)  # 20
```

This small function is a smoke test: the output `20` confirms the function ran; the LangSmith project should also show the trace if configuration is correct. Exact imports, environment variable names, and setup steps can change with package versions, so validate them against current LangSmith documentation when implementing.

## 6. Trace a reflection-agent workflow
The example agent follows a path such as:

`Generate → Tools → Generate → Reflect → Generate → End`

A trace makes the branch sequence visible and lets you inspect what each stage received and returned. It is more informative than only printing the final answer because it can reveal whether the issue originated in retrieval/search, generation, reflection, routing, or result selection.

## 7. Hands-on debugging example from the transcript
The instructor asks the agent for Google AI news. The search tool returns relevant material, but the final response is a generic question asking whether the user wants more information instead of summarizing the news.

The trace helps isolate the issue:
1. The agent enters the generation node.
2. It calls the search tool.
3. The search tool returns content.
4. The generation/reflection path runs.
5. The final value selected by the application is not the useful summary the instructor expected.

The transcript's key diagnosis is that the search tool did return information; the problem appears to be in how the response is synthesized or which message the program returns. Potential fixes discussed include:
- Make the generation prompt explicit: summarize the returned information, do not omit key points, and produce a requested length/format.
- Inspect all relevant AI messages in the trace rather than assuming the last message is the desired final answer.
- Return the intended final response or a deliberate synthesis of the useful messages.
- Re-run the workflow and verify the change in a new trace.

Do not blindly use `messages[-1]` or `messages[-2]` without understanding the message sequence. Message ordering depends on the graph design and tool-call flow. Prefer a clearly defined state field for the final answer, or select the correct message type explicitly.

## 8. Troubleshooting checklist
- **No trace appears:** verify tracing is enabled, the API key is valid, the project name is correct, and the environment variables were set in the same runtime that executes the app.
- **Only the first run appears in a notebook:** restart/re-run cells carefully; the transcript suggests clearing notebook cache as a workaround in its environment, but this is not a universal LangSmith fix. Check SDK configuration and runtime state first.
- **Run appears under the default project:** verify the project environment variable and whether it was set before the traced function ran.
- **Tool returned good data but answer is poor:** inspect the model's input context, prompt, output, and the application's final-message selection.
- **Unexpected tool calls or loops:** inspect conditional routing, tool-call metadata, state counters, and stop conditions.
- **Latency/cost is high:** identify repeated LLM calls, tool calls, and reflection cycles in the trace; decide whether each step adds enough value.
- **Sensitive data appears in traces:** review data-handling policies, access controls, retention, and what inputs are sent to the observability service before enabling tracing in production.

## 9. Production considerations
- Use least-privilege access and secure API-key storage.
- Avoid logging secrets, credentials, payment data, or unnecessary personal information.
- Establish who can view traces and how long they are retained.
- Monitor failures, latency, token usage, and costs over representative workloads.
- Create evaluation datasets or test cases for recurring failure modes.
- Treat traces as diagnostic evidence, not proof of factual correctness.
- Validate any current pricing, free-tier limits, UI steps, and configuration names in official documentation; the transcript's numerical/plan details may become outdated.

## 10. What the transcript says about upcoming projects
The instructor previews two future topics:
1. **SQL agent:** accepts plain English, creates SQL, and executes it against a database.
2. **Multi-tool agent:** can use SQL, Python, web scraping, and RAG to answer a user question.

These are described as portfolio-project opportunities. For a real deployment, database agents should use least-privilege credentials, query validation, read-only access where possible, limits/timeouts, and human approval for destructive operations.

## 11. Quick revision table
| Concept | Remember |
|---|---|
| Tracing | Records the path and details of a workflow run. |
| Observability | Helps inspect behavior, performance, and failures. |
| Tool trace | Shows which tool ran and what it returned. |
| Latency | Time taken by a run or step. |
| Token/cost metadata | Available when supported and reported by the model/provider. |
| Poor final answer | Trace each stage; do not assume the tool is at fault. |
| Final message selection | Return the intended answer deliberately; do not guess by index. |
| Production safety | Protect keys and sensitive trace data. |

## 12. Interview questions for revision
1. Why is tracing important for multi-node AI agents?
2. What is the difference between manual `print()` debugging and centralized tracing?
3. What information can a LangSmith trace expose?
4. How would you diagnose a case where a search tool returns good results but the final answer is poor?
5. What can cause a run to appear in the default project rather than the intended project?
6. Why should API keys and sensitive user data be protected when tracing?
7. How can tracing help identify cost and latency bottlenecks?
8. Why is selecting `messages[-1]` not always a robust way to return the final answer?

## 13. Board-Level Answer
**LangSmith tracing provides observability for LangChain/LangGraph applications by recording execution paths and the inputs/outputs of model calls, tools, and other steps. Engineers can inspect branching, errors, latency, and available token/cost metadata to identify whether a problem comes from tool execution, prompt design, model synthesis, routing, or final-output handling. Tracing improves debuggability, but correctness still requires evaluation, tests, and appropriate safeguards.**

## 14. No-Skip Checklist
- [ ] Why agent workflows are difficult to debug.
- [ ] Manual tracing versus LangSmith tracing.
- [ ] Trace details: inputs, outputs, prompts, tools, timing, errors, metadata, token/cost information.
- [ ] Account/project/API-key setup described by the instructor.
- [ ] Notebook environment-variable setup discussion.
- [ ] `@traceable` smoke-test example and expected output `20`.
- [ ] Default-project behavior and repeated-run troubleshooting anecdote.
- [ ] Reflection-agent trace sequence.
- [ ] Google AI news example and final-answer debugging.
- [ ] Prompt improvement and final-message selection.
- [ ] Upcoming SQL-agent and multi-tool-agent projects.
- [ ] Original transcript preserved in Appendix A.

## 15. Additional Points Added (not part of the original transcript)
- Prefer an explicit `final_answer` state field over depending on a brittle message index.
- Add automated tests that assert both content quality and output structure.
- Use trace sampling/redaction and access controls when trace volume or sensitive data is a concern.
- For SQL agents, validate generated SQL and restrict permissions; do not let a general-purpose agent execute arbitrary destructive queries.

## Appendix A — Original Source Preserved
The following is the original transcript text as supplied, retained in its original sequence. Speech-recognition errors, repetitions, and terminology have not been silently corrected.

