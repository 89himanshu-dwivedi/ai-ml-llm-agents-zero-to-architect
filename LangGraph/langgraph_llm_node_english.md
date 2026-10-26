# LangGraph LLM Node — State, OpenAI Integration, and Chatbot UI (English)

> **Source preservation:** These notes reorganize the lesson transcript. The complete supplied transcript is included in Appendix A without intentional edits. Additional implementation and safety notes are clearly separated.

## 1. Lesson Overview

This lesson adds an **LLM node** to a simple LangGraph graph. Earlier examples used nodes and edges; now a user question is sent to an LLM, the answer is stored in state, and the result is returned to the user.

Planned progression:
1. A simple LLM node
2. A chatbot interface
3. Adding tools to create an AI agent
4. Multiple tools/agents and complex workflows

## 2. Prerequisites and Packages

The instructor says the course environment already has the required packages installed. The discussion mentions `langchain-community`, `langchain-openai`, LangGraph, LangChain Core, and Gradio.

- OpenAI models require the appropriate integration package and an API key.
- Other model providers may require their corresponding integration packages.
- Pin and verify package versions for the project environment.

**Cost note:** The transcript mentions API-key billing, but a fixed dollar amount should not be treated as a universal requirement. Provider pricing and account requirements can change.

## 3. API Key Configuration

The lesson demonstrates loading a key from an environment variable or Google Colab Secrets/User Data. It also mentions putting the key directly in code as a simpler alternative.

**Recommended approach:** Do not hard-code API keys in notebooks or source code. Use environment variables or a secret manager/Colab Secrets, avoid exposing keys in logs or repositories, and rotate any key that has been leaked.

## 4. First Test: Call the LLM Directly

Before building the graph, the instructor invokes the LLM directly to verify that the configuration works. The transcript’s example asks about a personal-finance “FIRE number.”

Purpose:
- Verify API/package configuration
- Receive an LLM response
- Move the same model call into a LangGraph node

Deprecation warnings may appear. Identify which API or package produced a warning before deciding how to address it.

## 5. Define State

The lesson defines a state structure with two string fields:

| Field | Type | Meaning |
|---|---|---|
| `user_question` | `str` | The user's question |
| `llm_answer` / `answer` | `str` | The LLM response |

The speech-to-text transcript is not entirely consistent about the answer-field name. Use one field name consistently in your implementation.

The sample state contains a question and an initially blank answer. This state is passed as input when invoking the graph.

## 6. LLM Node Function

The LLM node is a function that receives state.

Conceptual steps:
1. Read `user_question` from state.
2. Send the question to the LLM using `invoke(...)`.
3. Receive the model response.
4. Store the response in the answer field.
5. Return the updated state.

The node sends the question to the model and places the answer in workflow state.

## 7. Build, Compile, and Invoke the Graph

The simple graph in the lesson is:

`START → llm_node → END`

High-level sequence:
1. Define the state schema.
2. Write the LLM node function.
3. Create a `StateGraph`.
4. Register the LLM node with `add_node(...)`.
5. Add edges from `START` to the LLM node and from the LLM node to `END`.
6. Compile the graph.
7. Pass a sample state to `invoke(...)`.
8. Inspect the answer in the returned state.

The transcript also discusses importing `START`/`END` and alternate graph-visualization methods. If direct graph rendering does not work in the environment, it mentions `IPython.display` and Mermaid PNG rendering as an alternative.

## 8. Test Multiple Questions

The instructor invokes the graph with different sample states, including:
- “What is ikigai?”
- “How do I start a presentation?”

Each call supplies the question in state and receives the LLM response in the output state.

## 9. Gradio Chat Interface

The lesson uses Gradio's `ChatInterface` to create a simple UI.

General flow:
1. The user types a message in the chat box.
2. Gradio passes the message and history to the chatbot function.
3. The function creates input state (`user_question` = message; answer initially blank).
4. It invokes the LangGraph app.
5. It extracts the answer from the result.
6. Gradio displays the answer in the UI.

The transcript demonstrates the `gr.ChatInterface(...)` and `demo.launch()` pattern. Verify the exact function signature against the installed Gradio version.

**Scope note:** The transcript mentions receiving history, but does not show a complete implementation that includes history in the state or prompt. Do not assume this simple function provides full multi-turn memory.

## 10. LLM Node vs. AI Agent

The lesson's key distinction is:

- **LLM node:** Sends a user question to an LLM and returns an answer.
- **AI agent (the lesson's simplified definition):** Uses LLM reasoning together with tools to perform tasks.

If a user asks for the latest stock price or today's gold price and the system has no web/search or market-data tool, the model does not have reliable live-data access. A standalone LLM node does not guarantee real-time retrieval.

## 11. Quick Revision

- Store question and answer fields in state.
- The LLM node reads the question and invokes the model.
- The response is stored in the answer field.
- Graph: `START → llm_node → END`.
- `compile()` creates an executable graph; `invoke()` runs it with input state.
- Gradio `ChatInterface` can provide a basic UI.
- Without tool integration and routing, this is a simple LLM workflow, not a full tool-using agent.

## 12. No-Skip Checklist

- [ ] Purpose of an LLM node and learning roadmap
- [ ] Package prerequisites
- [ ] OpenAI API-key setup and secrets
- [ ] Direct LLM test and FIRE-number example
- [ ] State schema and question/answer fields
- [ ] LLM node function and `invoke(...)`
- [ ] `StateGraph`, `START`, `END`, and compilation
- [ ] Graph-visualization alternatives mentioned in the transcript
- [ ] Multiple sample questions/states
- [ ] Gradio chatbot function and UI flow
- [ ] Difference between an LLM node and an AI agent
- [ ] Live-data/tool example
- [ ] Complete original transcript in Appendix A

## 13. Additional Points Added — Implementation and Safety

- Keep API keys in secrets/environment variables; never commit them to source control.
- Validate input length and handle provider timeouts, rate limits, and API errors.
- Treat model output as untrusted until validated for the application.
- If conversation history is required, explicitly pass and manage it; a UI history parameter alone does not guarantee the LLM uses it.
- Do not rely on an LLM alone for live prices, medical facts, or other time-sensitive information; connect verified tools/data sources when needed.
- Pin dependencies and verify current provider/Gradio APIs because package interfaces can change.

## Appendix A — Original Source (Preserved Verbatim)

