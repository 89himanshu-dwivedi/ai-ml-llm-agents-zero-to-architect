# Agentic RAG in LangGraph — English Notes

> **Source preservation:** Structured notes are followed by the complete original transcript in Appendix A. The appendix retains original wording, sequence, repetitions, and speech-to-text artifacts.

## 1. Quick Summary

This lesson builds **Agentic RAG** in LangGraph. The retrieval system is wrapped as a tool that the LLM can invoke when needed. The example is a health-insurance policy PDF assistant. The workflow is: load documents, split into chunks, create embeddings, store them in Chroma, create a retriever, wrap it as a tool, bind it to an LLM, define state/nodes/edges, compile, and test. Future enhancements include document grading, query rewriting, corrective RAG, reranking, and hybrid search.

## 2. Agentic RAG and LangGraph

- The graph pattern is `START -> LLM`; conditional routing sends execution to a `ToolNode` or `END`, and tool results return to the LLM.
- The retriever can be wrapped as a RAG tool. The LLM invokes it, receives documents, and synthesizes an answer.
- The transcript emphasizes stateful workflows, explicit nodes/edges, and routing control in LangGraph.
- Advanced ideas previewed: query rewriting, document grading, internal reflection, and corrective RAG.

## 3. Lab Workflow

1. Load documents.
2. Split documents into chunks.
3. Create embeddings and store them in a vector database.
4. Create a retriever.
5. Wrap the retriever using `create_retriever_tool`.
6. Define the LLM and bind the tool.
7. Define state, LLM node, and tool node.
8. Build the `StateGraph`, edges, and conditional routing.
9. Compile/invoke and test one or more questions.

The transcript recommends testing the basic workflow before adding advanced enhancements.

## 4. Documents and Chunking

- The instructor uses publicly available PDF files hosted on GitHub.
- Example: a health-insurance policy document of approximately 25 pages.
- Goal: ground answers about benefits, exclusions, waiting periods, claims/reimbursements, and policy terms in the policy document.
- `RecursiveCharacterTextSplitter` is used.
- The transcript discusses chunk sizes of approximately 500–1,000 and overlap around 100 characters (roughly 15%).

## 5. Embeddings, Chroma, and Retriever

- OpenAI embeddings are used; the transcript notes that credits may be required.
- Chroma is the vector database.
- Chunks are embedded and stored in the vector DB.
- The retriever returns the top four matching documents.
- Example query: waiting period for a pre-existing disease/condition.
- The retriever returns documents; the LLM synthesizes them into a natural-language answer.
- The transcript also mentions pretty-print helper import/debugging.

## 6. Wrapping RAG as a Tool

- `create_retriever_tool` wraps the retriever as a tool.
- Example tool name: `search_health_policy_rag`.
- Clear tool descriptions help the agent choose correctly, especially when multiple tools exist.
- Describe its use for health-insurance benefits, exclusions, waiting periods, claims, documents, copay, renewal, and treatment questions.
- Example tools list: `tools = [rag_tool]`.

## 7. LLM Binding and System Prompt

- Define `ChatOpenAI` and bind the RAG tool with `llm.bind_tools(tools)`.
- Use a domain-specific system prompt, such as a helpful health-insurance policy assistant.
- Instruct the model to use the RAG tool for policy questions, ground answers in the supplied documents, and politely say when the information is not found.
- Explicitly prohibit inventing unsupported facts.
- The transcript also mentions domain-specific prompt examples for automobile and credit-risk data.

## 8. State and Nodes

- State is described as an annotated list of messages; the `add_messages` reducer updates message history.
- The LLM node combines the system prompt with existing messages, calls the LLM, and returns messages.
- The transcript suggests testing the LLM node independently first.
- The prebuilt `ToolNode` is configured with the RAG tool.

## 9. Build, Compile, and Test

1. Create a `StateGraph`; add LLM and tool nodes.
2. Add `START -> LLM`.
3. Add conditional routing with `tools_condition`.
4. Add a return edge from the tool node to the LLM.
5. Compile and inspect the graph.
6. Invoke sample questions; a loop can test multiple questions.

The transcript mentions around 10 test questions, including inpatient treatment, waiting period for a pre-existing condition, dental/oral treatment, and the free-look cancellation period. The sample output says dental/oral treatment was not covered and the free-look cancellation period was 15 days.

**Source boundary:** These are results from the lesson's sample policy document, not universal rules for every insurer or policy. Verify the actual policy version.

## 10. Advanced RAG Improvements

- **Conversational memory:** Add conversation history to the RAG agent.
- **Document grading:** Check whether retrieved documents are relevant and whether the answer addresses the question.
- **Query rewriting:** Rewrite ambiguous queries and retrieve again.
- **Corrective RAG:** Correct poor retrieval or try an alternate retrieval path. The transcript mentions internet fallback but says the instructor generally prefers grounding answers in the supplied PDFs.
- **Reranking:** Improve the order of the top four retrieved documents.
- **Hybrid search:** Combine semantic search with keyword/BM25 search.

## 11. LangGraph vs. Linear RAG — Transcript Framing

- Nodes and conditional edges provide workflow control.
- State is available at different workflow points.
- Retrieval, tool calls, validation, and query rewrites/retries can be explicit graph steps.
- The lesson focuses on implementing RAG in LangGraph rather than re-teaching RAG theory.

## 12. Revision Table

| Concept | Key point |
|---|---|
| Agentic RAG | LLM can invoke a RAG tool through graph routing |
| Chunking | Split long documents into smaller pieces |
| Embeddings | Map text to vector representations |
| Chroma | Vector DB used in the lesson |
| Retriever | Returns matching chunks |
| `create_retriever_tool` | Wraps retriever as a tool |
| `bind_tools` | Exposes tools to the LLM |
| `AgentState` | Carries messages through the graph |
| `ToolNode` | Executes the RAG tool |
| `tools_condition` | Tool-call-based routing |
| Document grading | Validates retrieved-content relevance |
| Query rewriting | Rewrites query and retries retrieval |
| Corrective RAG | Corrects retrieval/answer issues |
| Reranking | Improves retrieved-result order |
| Hybrid search | Combines semantic and keyword/BM25 search |

## 13. Common Errors and Gotchas

1. **Wrong import path:** Verify installed LangChain/LangGraph documentation.
2. **Missing API key/credits:** Embedding and LLM calls may require credentials/billing.
3. **Poor chunking:** Chunk size/overlap can cause context loss or noise.
4. **Treating retrieved documents as the final answer:** The retriever returns documents; the LLM synthesizes them.
5. **Vague tool description:** The wrong tool may be selected.
6. **Weak system prompt:** Specify grounding and “not found” behavior.
7. **No relevance check:** Irrelevant chunks can produce unsupported answers.
8. **Treating sample policy results as universal:** Verify the actual policy version.
9. **External fallback:** Avoid it if answers must be limited to supplied PDFs.
10. **Insufficient tests:** Include answerable, unanswerable, and ambiguous questions.

## 14. Additional Points Added — Separate from the Source

These recommendations are assistant-added, not part of the original transcript:
- Preserve file name, page number, and policy-version metadata.
- Log retrieved chunks and source references for auditability.
- In health insurance, explain policy text without guaranteeing claim approval.
- Test outdated, conflicting, ambiguous, and unanswerable cases.
- Limit grading/query-rewrite retries to avoid endless loops.
- Define access controls and retention for private documents.

## 15. No-Skip Checklist

- [ ] Agentic RAG introduction and LangGraph state/control
- [ ] Query rewriting, document grading, reflection, corrective RAG preview
- [ ] Full RAG workflow
- [ ] Public GitHub PDFs and approximately 25-page health-policy example
- [ ] Recursive splitter; chunk size 500–1,000; overlap around 100
- [ ] OpenAI embeddings and Chroma
- [ ] Top-four retriever and waiting-period query
- [ ] `create_retriever_tool`, tool name, and description
- [ ] Policy topics: benefits, exclusions, waiting periods, claims, documents, copay, renewal, treatments
- [ ] `ChatOpenAI`, `bind_tools`, system prompt
- [ ] `AgentState`, `Annotated`, `add_messages`
- [ ] LLM node, `ToolNode`, `StateGraph`, conditional edges
- [ ] Independent LLM-node test
- [ ] Compile/print/invoke and multiple test questions
- [ ] Inpatient, dental, and free-look cancellation examples
- [ ] Document grading, query rewriting, corrective RAG
- [ ] Reranking, hybrid search, BM25
- [ ] Part 1 wrap-up and Part 2 preview
- [ ] Full original transcript preserved in Appendix A

## 16. Board-Level Answer

**Question: How do you build Agentic RAG in LangGraph?**

Load documents, split them into chunks, create embeddings, store them in a vector DB such as Chroma, and create a retriever. Wrap the retriever as a tool with a clear name/description and bind it to the LLM. Define message state, an LLM node, and a tool node in a `StateGraph`; connect `START` to the LLM, add conditional routing with `tools_condition`, and route tool results back to the LLM. Compile and test with representative questions. Advanced workflows can add document grading, query rewriting, corrective retrieval, reranking, hybrid search, and conversational memory.

## Appendix A — Original Transcript (Verbatim)

The complete original transcript follows unchanged.


