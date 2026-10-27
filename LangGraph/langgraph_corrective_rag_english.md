# LangGraph Corrective RAG — Complete Notes (English)

> **Source-preservation note:** The full original transcript is reproduced in **Appendix A — Original Source Preserved**. The main notes reorganize the lesson for study. Any recommendations beyond the transcript are clearly labeled **Additional Points Added**.

## 1. Quick Summary
Corrective RAG adds a validation layer after retrieval and before answer generation. Rather than blindly trusting retrieved chunks, an LLM checks whether the documents are relevant to the user’s question. Relevant context leads to answer generation; irrelevant context triggers query rewriting and another retrieval attempt.

## 2. Context: Part 2 of the LangGraph Series
The transcript says Part 1 covered fundamentals such as LLM nodes, AI agents, tool connections, RAG, and Agentic RAG. Part 2 introduces advanced case studies: Corrective RAG, reflection, agent tracing, a custom SQL agent, a multi-tool AI agent, and human-in-the-loop workflows. This lesson focuses on Corrective RAG.

## 3. Why Traditional RAG Can Fail
A traditional retriever may return incomplete, irrelevant, or noisy chunks. Possible causes include:
- An unclear or ambiguous user question.
- Incorrect chunks retrieved from the vector database.
- Weak semantic-search results.
- Hallucinated or incorrect answers generated from weak context.
- High consequences of errors in sensitive domains such as healthcare and banking.

**Core problem:** Plain RAG may lack a dedicated feedback loop to correct poor retrieval before generating an answer.

## 4. Core Idea of Corrective RAG
1. Receive the user question.
2. Retrieve documents or chunks.
3. Grade the relevance of the retrieved context.
4. If relevant, generate an answer from the retrieved context.
5. If not relevant, rewrite the question as a clearer search query.
6. Retrieve again using the rewritten query.
7. Grade again and generate an answer when relevant context is found.

The transcript also mentions an alternative: search the internet when retrieved documents are irrelevant. The instructor generally prefers keeping answers grounded in the supplied documents, so web search is presented as an optional variation rather than the default.

## 5. Workflow Architecture
### Nodes
- **Retrieve node:** Reads the user question from state and retrieves chunks.
- **Rewrite question node:** Improves the search query while preserving the original meaning.
- **Generate answer node:** Uses the question and retrieved context to produce the final answer.

### Conditional edge: `grade_documents`
The grading function compares the question with the retrieved context and returns one of two routing outcomes:
- `generate answer`
- `rewrite question`

Flow:
`START → retrieve → grade_documents → (relevant: generate answer → END | not relevant: rewrite question → retrieve again)`

### Labels visible in the supplied diagrams
- Agent node decides whether to execute a retrieval function/tool.
- Should Retrieve? conditional edge.
- Tool node calls the retrieval tool.
- Check Relevance conditional edge.
- Relevant → Generate → Answer.
- Not relevant → Rewrite → retrieval loop.

## 6. Data Preparation and Retriever Setup
The transcript describes the standard RAG preparation sequence:
1. Load a PDF policy document.
2. Split the text into chunks with a text splitter.
3. Create embeddings using OpenAI embeddings.
4. Store chunks and embeddings in a Chroma vector store.
5. Create a retriever; the example uses `k=4` (four chunks).
6. Test it with `retriever.invoke(...)`; the sample question is “what is covered under inpatient treatment”.

Installing the required packages and configuring an OpenAI API key are also part of setup. The transcript does not specify exact package versions or provide the complete requirements file in the text provided.

## 7. State, LLM, and Retrieve Node
- The transcript uses `ChatOpenAI` as the LLM.
- `AgentState` stores a list of messages; a reducer appends new messages to state.
- The retrieve node reads the user question from the first/human message in state.
- It invokes the retriever, joins the retrieved documents, and returns the combined context in state.
- Print statements such as “retrieve from the policy document” are used to trace node execution.

The instructor found a retriever node easier to manage than wrapping the retriever as a tool. Both approaches can be experimented with.

## 8. Document-Relevance Grading
### Grader prompt intent
The grader receives the user question and retrieved documents and checks whether their semantic meaning is relevant to the question.
- Relevant context that supports answering → `yes`.
- Context that is only generally related, or would require guessing → `no`.

### Structured output
The transcript demonstrates a Pydantic `BaseModel`-based object named `CheckRelevance` with a binary `yes`/`no` score. Structured output constrains the LLM response to the expected shape instead of free-form text.

### Routing
- Binary score `yes` → print “documents are relevant” and return `generate answer`.
- Binary score `no` → print “documents are not relevant” and return `rewrite question`.

The transcript identifies grading as the most important part of the workflow and the part that requires the most practice. A custom function can also be used as long as it evaluates relevance and provides the routing decision.

## 9. Rewrite Question Node
The rewrite prompt aims to:
- Turn the user’s question into a better search query for a health-insurance policy.
- Preserve the question’s overall meaning.
- Reduce ambiguity and improve search clarity and intent.

The node reads the question from state, sends it to the LLM, and extracts the rewritten query from the response content. The transcript’s example rewrites “Is ambulance expense covered?” as “Are ambulance expenses included in the health insurance policy coverage?”

In the demonstrated implementation, the rewritten question replaces the original question. The transcript also suggests an alternative: store the original and rewritten questions in separate state fields to retain the original wording.

After rewriting, the graph returns to the retrieve node.

## 10. Generate Final Answer Node
The transcript’s prompt rules are:
- Use only the retrieved health-insurance policy content.
- Do not use outside knowledge.
- If the answer is not present in context, say: “I could not find the answer.”
- Keep the answer clear and concise.

The node reads the current question and retrieved context from state, formats the prompt, invokes the LLM, and returns the final answer.

## 11. Graph Orchestration
The transcript’s graph-building sequence is:
1. Create `StateGraph(AgentState)`.
2. Add the nodes: retrieve, rewrite question, and generate answer.
3. Add `START → retrieve`.
4. Add a conditional edge from `retrieve` using `grade_documents`.
5. Map the `generate answer` outcome to the generate node.
6. Map the `rewrite question` outcome to the rewrite node.
7. Add `rewrite question → retrieve`.
8. Add `generate answer → END`.
9. Compile the graph and inspect its structure/diagram.
10. Run test questions with `graph.invoke(...)`.

## 12. Test Cases and Observed Behavior
One direct-retrieval test asks: “What is the waiting period for pre-existing condition?” The grader finds relevant documents, so the graph generates an answer directly.

A rewrite example:
- Original: “Is ambulance expense covered?”
- First retrieval: the grader marks the documents irrelevant.
- Rewrite: “Are ambulance expenses included in the health insurance policy coverage?”
- Second retrieval: the grader marks the context relevant.
- Result: the final answer is generated.

In the instructor’s environment, question 5 among ten test questions triggered a rewrite. The transcript explicitly notes that another environment or model may trigger rewriting for a different question because LLM-based grading is not a perfectly deterministic, strict rule.

## 13. Corrective RAG vs. Plain RAG
| Aspect | Plain RAG | Corrective RAG |
|---|---|---|
| Retrieval validation | May not include a dedicated relevance check | Grades retrieved context |
| Irrelevant chunks | May proceed to answer generation | Rewrites query and retrieves again |
| Complexity | Simpler | More nodes, prompts, and routing logic |
| Reliability | Strongly dependent on retrieval quality | Can recover from ambiguous/weak queries, but offers no guarantee |

## 14. Exam and Interview Revision Points
- The defining feature of Corrective RAG is relevance grading after retrieval.
- Relevant context → generate an answer.
- Irrelevant context → rewrite the question and retrieve again.
- A LangGraph conditional edge chooses the next node.
- `retrieve`, `rewrite question`, and `generate answer` are separate nodes.
- State must carry the user question and retrieved context.
- Structured output makes the grader’s `yes/no` response more predictable.
- Retry limits matter in production; the transcript’s sample flow does not explain an explicit retry limit.
- Answers about sensitive policy topics should remain grounded in retrieved source material.

## 15. Common Errors and Gotchas
1. **Infinite rewrite loop:** If relevance never passes, the graph may repeatedly rewrite and retrieve. Set a retry limit or fallback. *(Additional Points Added)*
2. **Overwriting the question:** Replacing the original query can remove useful audit/debugging context. Separate `original_question` and `rewritten_question` fields can help. *(The transcript also mentions this alternative.)*
3. **Grader false positive:** The LLM may incorrectly mark irrelevant context as relevant. Use test cases and an evaluation set. *(Additional Points Added)*
4. **Grader false negative:** Relevant context may be marked irrelevant, causing unnecessary rewrites. *(Additional Points Added)*
5. **No-answer policy:** If context does not support an answer, say so rather than guessing.
6. **External web fallback:** Web search requires handling source trust, freshness, access policy, and citations. *(Additional Points Added)*
7. **Token/context size:** Joining multiple chunks may create an oversized prompt. *(Additional Points Added)*

## 16. Additional Points Added — Production Recommendations
These recommendations are separate from the original transcript:
- Set a maximum number of rewrites (for example, two or three) and then use a safe fallback.
- Log the original query, rewritten query, retrieved document IDs/scores, grader result, and final path.
- A grader schema may include a reason or confidence score, but keep the routing contract stable.
- Evaluate retrieval relevance separately from answer correctness: relevant chunks do not guarantee a correct answer.
- For insurance, healthcare, or legal use cases, consider source references/citations and human escalation.
- Treat retrieved document text as untrusted data; do not treat prompt-injection text inside a document as system instructions.
- Test relevant, ambiguous, unanswerable, repeated-rewrite, malformed-grader-output, and empty-retrieval cases.
- Monitor rewrite rate, retrieval quality, latency, token usage, no-answer/refusal rate, and user feedback.

## 17. Quick Revision Table
| Component | Responsibility | Typical output / route |
|---|---|---|
| Retriever | Fetch chunks relevant to the question | Retrieved context |
| Grader | Check context/question relevance | `generate answer` / `rewrite question` |
| Rewrite node | Improve the search query | Rewritten query |
| Generate node | Produce a context-grounded answer | Final answer |
| Conditional edge | Select the next node based on grading | Route to generate or rewrite |
| State | Carry question, context, and messages | Shared workflow data |

## 18. Summary
Corrective RAG does not blindly trust plain RAG’s retrieval results. It grades the retrieved context; relevant context leads to answer generation, while irrelevant context triggers query rewriting and another retrieval attempt. In LangGraph, this can be orchestrated with retrieve, conditional grading/routing, rewrite, and generate nodes. It can improve retrieval for ambiguous queries, but reliable production use also requires bounded retries, careful grading, source grounding, testing, and observability.

## 19. Board-Level Answer
**Corrective RAG is a RAG architecture that validates retrieved documents before answer generation. A relevance grader compares the retrieved context with the user query. If the context is relevant, the system generates a grounded answer; if not, it rewrites the query and retrieves again through a conditional workflow. In LangGraph, this is implemented with retrieval, rewrite, and answer-generation nodes connected by conditional edges. Production implementations should add retry limits, logging, evaluation, and a safe no-answer fallback.**

## 20. No-Skip Checklist
- [x] Part 2 context and advanced topics
- [x] Traditional RAG failure modes
- [x] Corrective RAG validation concept
- [x] Optional internet-search variation and instructor preference
- [x] Architecture and conditional edges
- [x] PDF loading, splitting, OpenAI embeddings, Chroma, `k=4` retriever
- [x] `ChatOpenAI`, `AgentState`, message reducer, retrieve node
- [x] Grader prompt, Pydantic structured output, yes/no routing
- [x] Rewrite prompt and ambulance-expense example
- [x] Grounding rules for answer generation
- [x] Graph nodes, edges, compile, and invoke
- [x] Test cases and model-dependent grading variation
- [x] Original transcript included verbatim in Appendix A

## Appendix A — Original Source Preserved
The following is the full original transcript text, preserved without intentional omissions or rewriting.

