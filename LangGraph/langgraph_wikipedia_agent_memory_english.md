# LangGraph Lab: Wikipedia AI Agent with Memory — English Notes

> **Source preservation:** The transcript is organized into structured notes below. Appendix A contains the complete original transcript verbatim, retaining its wording, order, repetitions, and speech-to-text artifacts.

## 1. Quick Summary

This lab builds a LangGraph agent using the **Wikipedia tool** instead of Tavily Search, then adds checkpoint-based memory. The LLM decides whether to call the tool or finish; Wikipedia returns results; and the LLM synthesizes a final answer. The recommended sequence is to test the graph without memory first, then attach `MemorySaver` at compile time and test previous-question recall with a `thread_id`.

## 2. Lab Goal and Why Wikipedia?

- The previous lesson covered an agent with memory; this lab reinforces the concepts through practice.
- The transcript describes Tavily as useful for internet/current-events searches and Wikipedia as useful for personalities, scientists, politicians, biographies, and background information.
- The instructor recommends attempting the exercise without looking at the code, then debugging issues independently.

## 3. Graph Architecture

```text
START -> LLM node --conditional--> END
             |
             v
        Wikipedia ToolNode
             |
             +------ result back to LLM
```

- `START` invokes the LLM node.
- Conditional routing decides whether the LLM should call Wikipedia or go to `END`.
- The tools node executes the Wikipedia query.
- The result returns to the LLM, which synthesizes/summarizes the final response.
- Multiple tools can be placed in the tools list; this lab focuses on Wikipedia.

## 4. Recommended Build Order

1. Define/import the Wikipedia tool.
2. Define the LLM.
3. Bind the tool with `bind_tools`.
4. Define `AgentState`.
5. Define the LLM and tools nodes.
6. Add nodes and edges to a `StateGraph`.
7. Compile and test a sample query.
8. Add `MemorySaver` only after the basic workflow works.
9. Pass `thread_id` inside `configurable` to test memory.

The transcript explicitly recommends testing the basic workflow before adding memory.

## 5. Wikipedia Tool and LLM

- The transcript mentions `pip install Wikipedia`; the instructor says the package was installed earlier.
- It refers to `WikipediaQueryRun` and `WikipediaAPIWrapper`.
- The wrapper is configured for the top five results/pages.
- The recording debugs an import-path mismatch between `langchain.utilities` and `langchain_community.utilities`.
- `ChatOpenAI` is configured as the LLM, and `llm.bind_tools(tools)` exposes the Wikipedia tool definition to it.

**Version note:** Verify exact package/import paths against documentation for your installed LangChain/LangGraph version.

## 6. State and Nodes

### `AgentState`
- Stores a list of messages.
- Uses `Annotated` and the `add_messages` reducer.
- The reducer adds new messages to the existing state history.

### LLM node
- Receives `AgentState`, passes messages to the tool-bound LLM, and returns the response in state.

### Tools node
- Uses the prebuilt `ToolNode`.
- The tools list contains Wikipedia for this lab.
- Executes tool calls and returns results into the message flow.

## 7. Building and Compiling the Graph

1. Create `StateGraph(AgentState)`.
2. Add LLM and tools nodes.
3. Add `START -> LLM`.
4. Add conditional routing with `tools_condition`.
5. Add a return edge from tools to LLM.
6. Ensure a finish path to `END`.
7. Compile and inspect the graph.
8. Invoke a sample query.

Tool requests route to Wikipedia; after the result returns, the LLM synthesizes the answer.

## 8. Sample Queries and Debugging

The transcript demonstrates:
- Donald Trump's education/biography.
- Mahatma Gandhi's biography.

The Donald Trump education query initially errors. The instructor checks whether notebook cells were executed and tries rephrasing it as “Donald Trump biography.” A later Mahatma Gandhi biography query returns a result.

Debugging reminders:
- Verify that required cells have actually run.
- Run tool, LLM binding, node, and graph cells in the correct order.
- Wikipedia calls may sometimes return JSON parsing errors or be delayed; the transcript suggests trying again after waiting. This is not a guaranteed fix.

## 9. Adding Memory

### `MemorySaver`
Conceptual setup from the transcript:

```python
from langgraph.checkpoint.memory import MemorySaver
memory = MemorySaver()
```

Pass `checkpointer=memory` when compiling the graph. The transcript describes the checkpoint memory as running in RAM and says the graph's visual structure may remain unchanged.

### `thread_id`
- Create a `config` dictionary.
- Set `thread_id` inside `configurable`.
- Ask “What was my previous question?” using the same thread ID to test recall.
- If a Wikipedia call temporarily hangs/errors, the transcript suggests re-executing after waiting.

## 10. Main Learning Points

- Tool use and memory are separate concerns: test the tool workflow first, then add checkpointing.
- The LLM requests a tool; conditional routing sends execution to the tools node.
- The tool result returns to the LLM for final synthesis.
- Reusing a thread ID can continue that thread's checkpointed history.
- Notebook cell execution order is an important debugging consideration.
- Future topics mentioned: multiple tools, multi-agent orchestration, long-term memory, and human-in-the-loop.

## 11. Revision Table

| Concept | Key point |
|---|---|
| Wikipedia tool | Personalities, biographies, background research |
| Tavily Search | Previously used for internet/current-events searches |
| `bind_tools` | Exposes tool definitions to the LLM |
| `AgentState` | Carries workflow messages |
| `add_messages` | Appends/merges message history |
| `ToolNode` | Executes tool calls |
| `tools_condition` | Conditional routing based on tool calls |
| `MemorySaver` | In-memory checkpoint saver |
| `checkpointer=memory` | Configures checkpointing at compile time |
| `thread_id` | Identifies a conversation thread |

## 12. Common Errors and Gotchas

1. Wrong import path: verify installed package documentation.
2. Missing Wikipedia dependency: verify installation.
3. Notebook cell not executed: run the cell after defining it.
4. Tool/query mismatch: keep query input clear.
5. JSON parsing/tool failure: add retries, timeouts, and exception handling.
6. Checkpointer not attached: verify `compile(checkpointer=memory)`.
7. Wrong/new thread ID: reuse the same ID for the same conversation.
8. Do not assume `MemorySaver` is permanent storage; in-memory persistence across sessions/processes is not guaranteed.
9. Verify biographical claims against reliable sources before critical use.

## 13. Additional Points Added — Separate from the Source

These practical additions are not part of the original transcript.

- Do not hard-code API keys/secrets in source code.
- Manage user-specific thread IDs with server-side authorization.
- Treat external tool output as untrusted data.
- Use timeouts, controlled retries, backoff, and logs.
- Preserve source metadata/citations for biographical claims where useful.

### Conceptual pseudocode (not exact transcript code)

```python
memory = MemorySaver()
agent_app = workflow.compile(checkpointer=memory)
config = {"configurable": {"thread_id": "session-123"}}
result = agent_app.invoke(
    {"messages": [{"role": "user", "content": "Mahatma Gandhi biography"}]},
    config=config,
)
```

Verify exact imports, state schema, and APIs against the installed version.

## 14. No-Skip Checklist

- [ ] Lab purpose and previous lesson context
- [ ] Wikipedia vs. Tavily use cases
- [ ] START, LLM, conditional route, tools node, END
- [ ] Multiple-tools list concept
- [ ] Test the workflow before adding memory
- [ ] Wikipedia package, `WikipediaQueryRun`, `WikipediaAPIWrapper`
- [ ] Top-five-results/pages configuration
- [ ] `ChatOpenAI` and `bind_tools`
- [ ] `AgentState`, `Annotated`, `add_messages`
- [ ] LLM node and prebuilt `ToolNode`
- [ ] `StateGraph`, edges, `tools_condition`, return edge
- [ ] Donald Trump query and debugging
- [ ] Mahatma Gandhi biography query
- [ ] Missed notebook-cell execution issue
- [ ] Wikipedia JSON/tool errors and re-execution suggestion
- [ ] `MemorySaver` and compile-time checkpointer
- [ ] `configurable` and `thread_id`
- [ ] Previous-question recall test
- [ ] Future topics: multiple tools/agents, long-term memory, human-in-the-loop
- [ ] Full source transcript preserved in Appendix A

## 15. Board-Level Answer

**Question: How do you build a Wikipedia tool-using LangGraph agent with memory?**

Define the Wikipedia tool and `ChatOpenAI`, then expose the tool with `bind_tools`. `AgentState` maintains message history. In a `StateGraph`, add the LLM node and prebuilt `ToolNode`; connect `START` to the LLM, add conditional routing with `tools_condition`, and add a return edge from tools to the LLM. The LLM summarizes the tool result into a final answer. After testing the basic workflow, pass `MemorySaver` through `compile(checkpointer=memory)` and use `configurable.thread_id` during invocation to test recall within the same thread.

## Appendix A — Original Transcript (Verbatim)

The complete original transcript follows unchanged.

