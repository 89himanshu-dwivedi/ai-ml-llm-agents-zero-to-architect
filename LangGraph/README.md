# Enterprise Architecture Thinking: Zero to Architect

Hi, I'm **Himanshu Kumar** — Technical Lead & Solution Architect with **8 years** of experience building enterprise systems.

I work at **CRISIL Ltd, an S&P Global company**, on S&P Global projects.

This is my catch-all learning repo for everything that sits *around the application* — messaging, caching, databases, integrations, infrastructure, cloud, AI/GenAI, and the architecture thinking needed to connect them into production-ready enterprise systems.

---
# LangGraph Learning Notes

Practical, transcript-based notes and examples for learning LangGraph
from fundamentals to advanced agentic workflows. These notes are
organized from the long lesson scripts shared for study; they are not a
claim that every listed advanced topic already has a complete
implementation in this repository.

## What This Covers

### Fundamentals

-   Why LangGraph is useful for orchestrating stateful LLM workflows
-   Graph concepts: `State`, nodes, edges, entry/finish points
-   `StateGraph`, compilation, invocation, and inspecting final state
-   `TypedDict`-based state and state updates from node functions
-   Conditional edges and routing
-   A beginner bank/ATM workflow and a food-delivery exercise

### Tool-Using Agents

-   Difference between a basic LLM node and a tool-using agent
-   Tool binding and the agent cycle: LLM → tool → tool result → LLM
-   Conditional routing to a tool node or `END`
-   Example internet search integration with Tavily
-   Message state and message accumulation with `add_messages`
-   Invoking and testing the graph, including a simple Gradio interface
    in the lesson

### RAG and Agentic RAG

-   Loading source documents and splitting them into chunks
-   `RecursiveCharacterTextSplitter`
-   Embeddings and Chroma vector storage
-   Building a retriever and choosing the top matching chunks
-   Wrapping retrieval as a tool using `create_retriever_tool`
-   A health-insurance policy PDF assistant example
-   `ToolNode`, `StateGraph`, conditional tool routing, and returning
    tool results to the LLM
-   Grounding answers in retrieved policy content

### Corrective RAG

-   Why retrieval can return irrelevant, incomplete, or noisy chunks
-   Grading retrieved documents for relevance
-   Conditional routing to answer generation or query rewriting
-   Re-retrieval after rewriting the query
-   Structured grader output and relevance decisions
-   Source-grounded answer generation and test scenarios
-   Optional internet search as an alternative mentioned in the lesson,
    not the default workflow

### Advanced Topics Mentioned in the Course Material

The supplied lessons preview or describe further case studies such as
reflection agents, agent tracing, custom SQL agents, multi-tool agents,
and human-in-the-loop workflows. Check the relevant lesson/script before
assuming a complete implementation is included.

## Conceptual Workflow

``` text
User question
     |
     v
   LLM node
     |
     +---- answer ready --------------------> END
     |
     +---- tool needed --> Tool node
                              |
                              v
                         Tool result
                              |
                              +-----------> LLM node

RAG extension:
Documents -> chunks -> embeddings -> Chroma -> retriever tool

Corrective RAG extension:
Retrieve -> grade relevance -> relevant? -> generate answer
                         |
                         +-- not relevant -> rewrite query -> retrieve again
```

## Repository Study Path

1.  **Graph fundamentals:** state, nodes, edges, compile, invoke.
2.  **Agentic behavior:** LLM nodes, tool binding, conditional routing.
3.  **Agentic RAG:** documents, chunking, embeddings, Chroma, retriever
    tool.
4.  **Corrective RAG:** document grading, query rewriting,
    retry/retrieval loop.
5.  **Further case studies:** add only when the corresponding source
    script and code are available.

## Important Notes

-   Some lesson demos are intentionally simplified. For example, the
    bank/ATM example uses hard-coded values and is not production
    authentication or transaction processing.
-   A fresh invocation does not necessarily provide persistent
    conversational memory; persistence/checkpointing must be designed
    and configured.
-   Retrieval quality and model-based grading can vary. Test relevant,
    irrelevant, ambiguous, and unanswerable questions.
-   Treat retrieved documents as untrusted input; do not let document
    text override system instructions.
-   Keep API keys in environment variables or a secret manager. Do not
    commit `.env` files or credentials.
-   Library names, imports, APIs, and package versions may change. Pin
    and verify dependencies for runnable projects.

## Notes Format

The study files preserve the supplied lesson transcript in an appendix
and keep added clarifications separate from source-derived explanations.
Refer to each lesson Markdown file for its exact coverage and source
transcript.

## Suggested GitHub Structure

``` text
langgraph-notes/
├── README.md
├── fundamentals/
├── tool-using-agents/
├── agentic-rag/
├── corrective-rag/
├── advanced-case-studies/
└── examples/
```

Use the folders above as a suggested organization; they do not imply
that every folder or code sample already exists.
## About Me

- Technical Lead & Solution Architect at **CRISIL Ltd, an S&P Global company**
- 8 years across Salesforce architecture, integrations and enterprise GenAI
- Domains: Public Sector, Financial Services, Healthcare, Supply Chain
- B.Tech in Computer Science, AKTU Lucknow
- [GitHub](https://github.com/89himanshu-dwivedi)
- [LinkedIn](https://www.linkedin.com/in/himanshukumar-sf/)
- [X](https://x.com/kum60094)
- [Trailblazer](https://www.salesforce.com/trailblazer/hdwivedi2)
- Email: [himanshu.jee.1996@gmail.com](mailto:himanshu.jee.1996@gmail.com)

---

# 🔒 Attribution & Ownership

Copyright (c) 2026 Himanshu Kumar. All rights reserved.

This material is my original learning and documentation work.

Reading it here and linking to it is welcome.

Downloading, copying, mirroring, forking, redistributing, republishing, creating derivative works, or using this material to train an AI/ML model requires **prior written permission**.

Request permission through [GitHub](https://github.com/89himanshu-dwivedi).

---

## License

See [LICENSE](https://github.com/89himanshu-dwivedi/enterprise-stack-zero-to-architect/blob/main/LICENSE) — proprietary, all rights reserved, permission required.

---

## ⭐ Repository Principle

> **Don't just learn technologies. Learn the problem they solve, understand the trade-offs, design for production, and know why an architect would choose one approach over another.**
