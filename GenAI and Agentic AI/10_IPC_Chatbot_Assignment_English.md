# Assignment: Indian Penal Code (IPC) Chatbot

## 1. Assignment Overview

The task is to build a **chatbot over the Indian Penal Code (IPC) PDF**.

The chatbot's main purpose is to answer user questions **only from the provided IPC document/PDF**. It should not use generic LLM knowledge, internet knowledge, or independently remembered legal information as the source of its answers.

### Core Requirement

> Chatbot answers should be based only on the **IPC PDF provided for the assignment**.

---

# 2. Required Flow

The expected architecture/flow is:

```text
Indian Penal Code PDF
        ↓
Document Loading
        ↓
Extract Text
        ↓
Split into Chunks
        ↓
Create Embeddings
        ↓
Vector Database
        ↓
Retriever
        ↓
Conversation Memory
        ↓
Conversational Retrieval Chain
        ↓
LLM
        ↓
IPC Chatbot
```

---

# 3. Step-by-Step Explanation

## Step 1 — Indian Penal Code PDF

The **Indian Penal Code PDF** provided for the assignment is the input/document source.

This PDF acts as the chatbot's **knowledge source**.

Important:

- The chatbot's knowledge source should be the provided IPC PDF.
- Generic LLM knowledge should not be used as the source of legal answers.
- The assignment references a **112-page Indian Penal Code document**.
- The actual PDF contents are not provided here, so IPC sections should not be independently assumed or invented.

---

## Step 2 — Document Loading

The PDF needs to be loaded into the application.

```text
IPC PDF
   ↓
PDF Document Loader
   ↓
Document objects
```

The document loader converts the PDF pages/content into a representation that the application can process.

---

## Step 3 — Extract Text

The actual text must be extracted from the PDF.

```text
PDF
 ↓
Text Extraction
 ↓
Page-wise / Document-wise Text
```

The extracted text becomes the input for the next processing stages.

Conceptually:

```text
Page 1 → extracted text
Page 2 → extracted text
Page 3 → extracted text
...
Page 112 → extracted text
```

---

# 4. Step 4 — Split into Chunks

The complete 112-page document should not be treated as one enormous text block for embedding.

Therefore, the document is divided into smaller **chunks**.

```text
Large IPC Document
        ↓
Text Splitter
        ↓
Chunk 1
Chunk 2
Chunk 3
Chunk 4
...
Chunk N
```

### Why Chunking?

Chunking helps to:

- retrieve relevant information more effectively
- create embeddings for manageable text units
- search for relevant document portions
- avoid sending the entire document to the LLM for every question

### Important

Chunk size and overlap can be selected according to the implementation.

The assignment does not require copying the exact implementation shown in the teaching material.

---

# 5. Step 5 — Create Embeddings

Each chunk needs to be converted into a numerical/vector representation.

```text
Chunk 1 ──→ Embedding Vector
Chunk 2 ──→ Embedding Vector
Chunk 3 ──→ Embedding Vector
...
Chunk N ──→ Embedding Vector
```

The purpose of embeddings is to represent semantic similarity.

Example:

```text
User Query:
"What IPC section applies to this crime?"

        ↓

Query Embedding

        ↓

Compare with document chunk embeddings
```

---

# 6. Step 6 — Vector Database

The generated embeddings are stored in a **Vector Database**.

```text
IPC Chunks
    ↓
Embeddings
    ↓
Vector Database
```

The vector database allows the application to efficiently search for relevant document chunks.

Conceptually:

```text
Vector DB
 ├── Chunk 1 + Embedding
 ├── Chunk 2 + Embedding
 ├── Chunk 3 + Embedding
 ├── ...
 └── Chunk N + Embedding
```

---

# 7. Step 7 — Retriever

When the user asks a question, the retriever finds relevant IPC document chunks.

Flow:

```text
User Question
      ↓
Query Embedding
      ↓
Vector Database Search
      ↓
Relevant IPC Chunks
```

The retriever's purpose is:

> Find the most relevant portions of the IPC PDF for the user's question.

Example:

```text
Question
"What IPC section applies to this particular crime?"

             ↓

        Retriever

             ↓

Relevant chunks from IPC PDF
```

---

# 8. Step 8 — Conversation Memory

The chatbot must also maintain the context of the previous conversation.

Example:

```text
User:
"What is Section X?"

Bot:
[Answer from retrieved IPC content]

User:
"What is the punishment for it?"
```

In the second question, the user did not repeat the section name.

Conversation memory preserves the previous interaction as context.

```text
Previous Conversation
        ↓
Conversation Memory
        ↓
Current Query Context
```

This makes follow-up questions easier to understand.

---

# 9. Step 9 — Conversational Retrieval Chain

The retriever and conversation memory are combined into a conversational retrieval workflow.

Conceptually:

```text
User Query
    ↓
Conversation Context
    ↓
Retriever
    ↓
Relevant IPC Chunks
    ↓
LLM
    ↓
Answer
```

The important point is:

> The chatbot needs both conversation context and document retrieval.

Conversation memory alone is not sufficient.

Vector search alone is also not sufficient when users ask follow-up questions.

---

# 10. Step 10 — LLM

The LLM generates the final answer using the retrieved IPC content and conversation context.

```text
Relevant IPC Chunks
        +
Conversation Context
        +
Current User Question
        ↓
       LLM
        ↓
Final Answer
```

### Critical Rule

The LLM should answer **based on the retrieved IPC document content**.

If the provided document does not contain enough information to answer the question, the chatbot should not invent an answer using generic legal knowledge.

---

# 11. Final Result — IPC Chatbot

Final architecture:

```text
                 ┌──────────────────────┐
                 │ Indian Penal Code PDF│
                 └──────────┬───────────┘
                            ↓
                 ┌──────────────────────┐
                 │  Document Loading    │
                 └──────────┬───────────┘
                            ↓
                 ┌──────────────────────┐
                 │    Extract Text      │
                 └──────────┬───────────┘
                            ↓
                 ┌──────────────────────┐
                 │   Split into Chunks  │
                 └──────────┬───────────┘
                            ↓
                 ┌──────────────────────┐
                 │ Create Embeddings    │
                 └──────────┬───────────┘
                            ↓
                 ┌──────────────────────┐
                 │   Vector Database    │
                 └──────────┬───────────┘
                            ↓
                 ┌──────────────────────┐
                 │      Retriever       │
                 └──────────┬───────────┘
                            ↓
                 ┌──────────────────────┐
                 │ Conversation Memory  │
                 └──────────┬───────────┘
                            ↓
                 ┌──────────────────────┐
                 │ Conversational       │
                 │ Retrieval Chain      │
                 └──────────┬───────────┘
                            ↓
                 ┌──────────────────────┐
                 │         LLM          │
                 └──────────┬───────────┘
                            ↓
                 ┌──────────────────────┐
                 │    IPC Chatbot       │
                 └──────────────────────┘
```

---

# 12. Expected Chatbot Behavior

## Example 1

A normal user might ask:

> "What IPC section applies to this particular crime?"

Expected behavior:

```text
User Question
     ↓
Retriever searches IPC PDF
     ↓
Relevant IPC content retrieved
     ↓
LLM uses retrieved content
     ↓
Answer
```

The answer must be sourced from the **provided IPC document**.

---

## Example 2

A user might ask:

> "I want to sue a company. Which IPC sections should I consider?"

Expected behavior:

```text
Question
   ↓
Search provided IPC PDF
   ↓
Retrieve relevant sections/content
   ↓
Generate answer from retrieved content
```

Again, the chatbot should not invent sections based on external or generic LLM knowledge.

---

# 13. Most Important Assignment Requirement

The central idea of the assignment is a **document-grounded chatbot / Retrieval-Augmented Generation style workflow**.

In simple terms:

```text
Do not send the question directly to the LLM
                    ↓
First search the document for relevant information
                    ↓
Give the relevant information to the LLM
                    ↓
Generate the answer using that context
```

---

# 14. Assignment Expectations

According to the transcript, the assignment expects:

1. **Document Loading**
2. **Chunking**
3. **Embeddings**
4. **Conversational Retrieval Chain**
5. **Chatbot with Conversation Context**

---

# 15. Implementation Freedom

The instructor specifically says:

> You do not have to copy the exact implementation shown in the teaching material.

This means:

```text
Same Required Concept
        +
Your Own Implementation
        =
Valid Assignment Approach
```

Different libraries, components, or implementation patterns can be used as long as the required functionality is achieved.

---

# 16. Source Note

The transcript describes this as an **IPC assignment** and refers to a **112-page Indian Penal Code PDF/document**.

However, the actual PDF contents are not provided in this material.

Therefore:

- Do not assume specific IPC sections.
- Do not independently add IPC section numbers.
- Do not substitute generic legal knowledge for the assignment document.
- The final chatbot should be grounded in the provided PDF.

---

# 17. Complete Assignment in One Flow

```text
                IPC PDF
                   │
                   ▼
          Document Loading
                   │
                   ▼
            Extract Text
                   │
                   ▼
          Split into Chunks
                   │
                   ▼
          Create Embeddings
                   │
                   ▼
           Vector Database
                   │
                   ▼
              Retriever
                   │
                   │
        ┌──────────▼──────────┐
        │ Conversation Memory │
        └──────────┬──────────┘
                   │
                   ▼
     Conversational Retrieval Chain
                   │
                   ▼
                  LLM
                   │
                   ▼
             IPC Chatbot
```

---

# 18. Assignment Goal

The final goal is to create a chatbot that:

- loads the IPC PDF
- extracts the document text
- splits the text into chunks
- creates embeddings for the chunks
- stores the embeddings in a vector database
- retrieves relevant chunks for user queries
- maintains previous conversation context
- uses a conversational retrieval chain to combine context and retrieved document content
- connects the retrieved context to an LLM
- generates answers **based on the IPC PDF**

---

# 19. Assistant-Added Practical Notes

> **Note:** The following section is additional implementation guidance and is not part of the original assignment transcript.

## 19.1 Recommended Mental Model

Think about the project in three major phases.

### Phase A — Indexing

```text
PDF
 ↓
Load
 ↓
Extract
 ↓
Chunk
 ↓
Embed
 ↓
Store in Vector DB
```

This normally happens during application setup/indexing.

### Phase B — Retrieval

```text
User Question
 ↓
Query Embedding
 ↓
Vector Search
 ↓
Top Relevant Chunks
```

This happens when the user asks a question.

### Phase C — Generation

```text
Question
   +
Conversation History
   +
Retrieved IPC Context
   ↓
LLM
   ↓
Grounded Answer
```

---

## 19.2 Important Guardrail

Because this is a legal-document chatbot, a useful rule is:

```text
If the answer is not supported by retrieved IPC PDF
                    ↓
          Do not invent the answer
                    ↓
Tell the user that the provided document
does not contain enough information
```

This helps enforce the assignment's "only from provided document" requirement.

---

## 19.3 RAG-style Architecture

The assignment can broadly be understood as a **document-grounded RAG / conversational retrieval system**:

```text
                 OFFLINE / INDEXING
                 ──────────────────

             IPC PDF
                ↓
          Text Extraction
                ↓
             Chunking
                ↓
           Embeddings
                ↓
          Vector Database


                 ONLINE / QUERY
                 ──────────────

             User Question
                   ↓
          Conversation Context
                   ↓
              Retriever
                   ↓
          Relevant IPC Chunks
                   ↓
          Context + Question
                   ↓
                  LLM
                   ↓
          Grounded IPC Answer
```

---

## 19.4 Key Interview Explanation

If asked:

**"Why do we need a vector database?"**

Simple answer:

> A vector database stores embeddings of IPC document chunks and helps retrieve semantically relevant chunks for a user query.

**"Why conversation memory?"**

> Conversation memory preserves previous messages so that follow-up questions can be understood in context.

**"Why not directly ask the LLM?"**

> A direct LLM response can depend on the model's general knowledge. The assignment restricts answers to the provided IPC PDF, so the retrieval layer supplies relevant document context before generation.

---

# 20. Final Checklist

Before considering the assignment complete, verify:

- [ ] IPC PDF loaded
- [ ] Text extracted
- [ ] Text chunked
- [ ] Embeddings generated
- [ ] Vector database created
- [ ] Retriever configured
- [ ] Conversation memory added
- [ ] Conversational retrieval workflow implemented
- [ ] LLM connected
- [ ] User questions answered using retrieved IPC context
- [ ] Follow-up questions retain conversation context
- [ ] Chatbot does not invent unsupported information
- [ ] The provided IPC PDF remains the source of truth
