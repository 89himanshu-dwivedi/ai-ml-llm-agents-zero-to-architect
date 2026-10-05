# Introduction to Generative AI and RAG

## 1. Introduction

This session introduces **Retrieval-Augmented Generation (RAG)**, presented in the source as one of the most important and commonly demonstrated GenAI/AI project patterns.

The instructor highlights that:

- RAG is commonly presented as a GenAI project when applying for jobs.
- The session is part of a larger playlist/course, and the previous videos are expected to be completed first.
- Playlist information, learning material, and code-file information are available in the video description.
- The session intends to explain RAG from fundamentals through implementation.
- The instructor plans to demonstrate one or more RAG examples.
- A demonstrated example can be extended to a learner's own data and presented as a project/case study.
- According to the source, many companies are currently implementing RAG.

> **Key takeaway:** If you remember one major concept from this session, remember **RAG — Retrieval-Augmented Generation**.

---

# 2. Why Retrieval-Augmented Generation (RAG) Is Needed

## 2.1 What Does "Generation" Mean?

Generation is performed by a **Large Language Model (LLM)**. The model generates text based on the input/question.

RAG adds a retrieval step so that the generated answer can use relevant information from a specific knowledge source.

---

## 2.2 Problem 1 — Private and Confidential Documents

Imagine a company has private and confidential documents that are not publicly available.

Examples discussed in the source include:

- Vendor agreements
- Confidential service-level agreements (SLAs)
- Client-specific agreements
- Product/service-related agreements
- Government agreements
- Agreements between countries
- Confidential trade agreements
- Documents associated with a long-running legal case

For example, the source uses an Oracle-like scenario:

> A company may have agreements with different clients. These agreements contain SLAs and information related to products or consulting services. Such documents are private and are not available to the outside world.

Now suppose the answer to a question exists **inside one of these private documents**.

For example:

- What is the policy for a particular agreement?
- What is the turnaround time for solving a particular problem?
- What exactly was agreed for a particular service?

If you ask a general-purpose LLM about that private information, the model cannot automatically access the company's private document repository.

### Core issue

The LLM may have seen a huge amount of internet data, but that does **not** mean it has access to:

- private company clouds,
- internal repositories,
- confidential agreements,
- private employee documents, or
- other restricted data sources.

Therefore, the answer needs to come from the private document repository rather than from general model knowledge.

---

# 3. Hallucination Problem

## 3.1 What Is Hallucination?

The source explains hallucination as a situation where an LLM produces an answer that **looks correct but is actually not supported by the required source**.

An LLM is fundamentally a generation engine.

At a simplified level, it generates:

1. One token based on the question.
2. The next probable token.
3. Another probable token.
4. And so on.
5. Finally, it produces a complete response.

The model's generation process does not automatically mean that it has verified the answer against your private document.

Therefore, instead of saying:

> "I don't know."

the model may generate an answer that sounds confident.

That generated but unsupported answer is referred to as **hallucination**.

---

## 3.2 Code-Update Example

The source gives another practical example.

Suppose a code/library has recently been updated.

You ask an LLM about the updated code, and it confidently says:

- this is the problem,
- this is the updated code,
- this code will work.

You copy and execute the code — but it does not work.

The problem is that the LLM may have generated a plausible answer rather than verified the answer against the exact current source/version.

### Important lesson

**Confidence of wording does not guarantee correctness.**

---

# 4. Why Can't We Simply Put All Documents in the Prompt?

A natural question is:

> Why not provide all private documents directly inside the prompt?

For a small document, this can be possible.

For example:

- a small PDF,
- a few pages,
- a short document.

But imagine:

- hundreds of PDF files,
- thousands of pages,
- very large repositories.

You cannot simply place everything into one prompt.

The source discusses the **context window** limitation and gives examples such as approximately 5,000 or 20,000 tokens as possible context limits depending on the model/system.

Therefore, putting an entire large private repository into every prompt is impractical.

---

# 5. Three Main Reasons RAG Is Needed

The source explicitly presents these as an interview question.

## Reason 1 — Question Answering from a Private Document Repository

You may want answers **only from your private documents**, not from the rest of the internet or general model knowledge.

Example:

> "I have private documents that are not visible to the rest of the world. I want my Q&A system to answer from those documents only."

That is a strong reason for RAG.

---

## Reason 2 — Reduce the Impact of Hallucinations

LLMs can sometimes produce answers that look correct even when they are not the correct answer for the required source.

This is especially problematic when:

- code has changed,
- policies have changed,
- agreements have specific wording,
- current information is required.

RAG retrieves relevant source information before generation, helping ground the response in that information.

---

## Reason 3 — Large Documents Cannot All Fit into One Prompt

If you have:

- large PDFs,
- hundreds of documents,
- thousands of pages,

you cannot keep inserting all of them into every prompt.

RAG provides another approach:

> Store and organize the document information so that only relevant pieces need to be retrieved for a question.

---

# 6. When RAG Is Required

Based on the source, RAG is useful when:

1. You need answers from private documents.
2. You want to reduce hallucination.
3. The required documents are too large to fit into the prompt.

The source summarizes the idea as:

**Private documents + large data + need for grounded Q&A → RAG**

---

# 7. Understanding the RAG Workflow

The source presents RAG as a **five-step process**.

## The 5 Steps

```text
1. Load the data
        ↓
2. Split the data into chunks
        ↓
3. Create embeddings
        ↓
4. Store embeddings in a vector database
        ↓
5. Retrieve relevant chunks
```

Each step has a specific purpose.

---

# 8. Step 1 — Document Loading

## 8.1 What Is Document Loading?

First, we need to bring the source document into the system and convert/read it in a form that the application can process.

The source says the input could be:

- YouTube transcripts
- Text files
- PDFs
- Other types of files

The basic idea is:

> **Read/load the source document first.**

---

## 8.2 Example: Confidential Employee Agreement

The source uses an **employee agreement PDF** as the implementation example.

The document is described as:

- confidential,
- between a company and employees,
- stored as an `employee agreement.pdf`,
- approximately 13 pages long.

The goal is:

> When a question is asked, the LLM should answer from this 13-page document rather than from unrelated information.

---

## 8.3 Loading the PDF

The source demonstrates the use of a PDF loader from LangChain and discusses installing the PDF-related package.

The transcript references:

- `langchain.document_loaders`
- `PyPDFLoader`
- installation of the relevant PDF package
- downloading the PDF into the environment using `wget`

The source demonstrates the general flow:

```text
Get the PDF
   ↓
Make it available in the environment
   ↓
Create a PDF loader
   ↓
Load the document
```

The loaded document contains approximately **13 pages**.

---

## 8.4 Source Code / Package Version Warning

The instructor explicitly warns that:

- code can change,
- packages can change,
- APIs can change,
- code that works today may require modifications after future versions.

The source estimates that code can change significantly across versions and says that small changes or package updates may be required.

### Important practical point

Do not blindly assume an old RAG tutorial's code will execute unchanged with the latest libraries.

---

# 9. LLM Provider / Company License Consideration

The source discusses using different LLM providers.

It mentions examples such as:

- OpenAI
- Cohere

The source explains that:

- one provider may be paid,
- another may be free for personal use,
- company usage may require a license,
- organizations often have agreements with specific LLM providers.

Therefore, when implementing RAG in a company:

> Check which LLM provider/model the organization has purchased or approved.

The source specifically recommends checking with the IT team.

---

# 10. Optional Helper Function — Pretty Printing

The source introduces a helper function called **pretty print**.

### Why?

When documents are printed directly, the output may be difficult to read.

A pretty-print helper makes the document output more organized and readable.

### Is it mandatory?

No.

The source explicitly describes it as **optional** and says it can be ignored.

---

# 11. Understanding the Loaded Document

The source then combines the pages/text to inspect the full document.

For the example PDF, the source reports approximately:

- **13 pages**
- **369 lines**
- **4,24x words** as stated in the transcript
- **29,540 characters**

The exact character/word count can vary depending on the PDF loader because:

- hyphens may be interpreted differently,
- spaces may be treated differently,
- PDF extraction can represent text differently.

The important stable idea is that the document is large enough that treating it as one prompt is not the intended RAG approach.

---

# 12. Step 2 — Splitting Data into Chunks

## 12.1 Why Do We Need Chunking?

The complete document is too large to process as one piece.

The source explains that if the whole document could simply be put into the prompt, there would be no need for this splitting step.

Instead:

> **Break the large document into smaller pieces called chunks.**

---

## 12.2 Recursive Character Text Splitter

The source uses a **Recursive Character Text Splitter**.

The conceptual configuration shown is:

```text
Chunk size   = 300 characters
Chunk overlap = 30 characters
```

---

## 12.3 What Is Chunk Size?

Suppose:

```text
Chunk size = 300
```

Then the first chunk contains approximately the first 300 characters.

The next chunk contains the next section of text.

Conceptually:

```text
Chunk 1 → characters 1–300
Chunk 2 → next section
Chunk 3 → next section
...
```

The purpose is to make the document manageable for downstream processing.

---

# 13. Why Chunk Overlap Is Required

## 13.1 The Boundary Problem

Suppose important information starts near the end of one chunk and continues into the beginning of the next chunk.

If chunks have no overlap, the relationship between those pieces may be weakened.

The source therefore introduces **chunk overlap**.

---

## 13.2 Example of Overlap

Instead of:

```text
Chunk 1 → 1–300
Chunk 2 → 301–600
```

we can overlap the chunks.

For example:

```text
Chunk 1 → 1–300
Chunk 2 → starts before 301
```

The source gives an example where the next chunk starts around the previous chunk's ending area, so some text appears in both chunks.

This creates continuity between neighboring chunks.

---

## 13.3 Recommended Ranges Given in the Source

The source suggests:

### Chunk overlap

Approximately:

**10%–20%**

The demonstration uses:

**10%**

### Chunk size

The source suggests trying approximately:

**300–3,000 characters**

The appropriate size depends on:

- the type of data,
- the expected answer,
- how much information is normally required to answer a question.

A useful principle from the source is:

> If an answer normally requires one chunk or a couple of chunks, that should influence your chunk size.

---

# 14. Chunking Example from the Employee Agreement

The source reports:

- Original document: approximately **29,540 characters**
- Chunk size: **300**
- Chunk overlap: **30**
- Result: approximately **133 chunks**

If there were no overlap, the rough number of chunks would be lower.

Because the chunks overlap, more chunks are produced.

The source demonstrates accessing:

- the first chunk,
- the second chunk,

and observing that each chunk is simply a portion of the original document.

### Important point

A chunk is **not a completely new type of information**.

It is simply a smaller piece of the original document.

---

# 15. Step 3 — Creating Embeddings

This is presented as the more technical step.

## 15.1 What Are Embeddings?

The source defines embeddings as:

> **A numerical representation of text that captures its meaning.**

Text is converted into vectors/numbers so that mathematical operations can be performed on it.

---

# 16. How LLMs Represent Text Internally

Consider the question:

> "What is the capital of India?"

The generated answer might be:

> "The capital of India is New Delhi."

To a user, it looks like the model is working directly with text.

Internally, however, the source explains that text is represented numerically.

A simplified conceptual flow is:

```text
Text
 ↓
Numerical representation / vectors
 ↓
Mathematical processing
 ↓
Numerical result
 ↓
Text representation
 ↓
Answer
```

The source emphasizes that the internal processing is mathematical.

---

# 17. Vectors and Semantic Meaning

A vector is not necessarily one number.

It can be a **multi-dimensional numerical representation**.

The source uses a simplified three-dimensional example.

For example, a word such as `king` could conceptually be represented by something like:

```text
[0.69, 0.38, 0.136]
```

This is only an illustrative example.

The important idea is:

> The numerical representation carries semantic/contextual information.

---

# 18. Similar Context → Similar Representation

The source uses examples such as:

- king
- man
- queen
- woman
- strong
- wise
- prince
- girl

Words that appear in related contexts can have representations that are closer in vector space.

For example:

```text
King ↔ Man
King ↔ Prince
Queen ↔ Woman
Queen ↔ Wise
```

The source describes this using the idea of positions in a multi-dimensional space.

---

# 19. Word Embeddings / Word2Vec Concept

The source connects this idea to **word embeddings** and **Word2Vec**.

The basic concept is:

```text
Word
 ↓
Numerical representation
 ↓
Vector
```

The word is effectively "embedded" in a multi-dimensional space.

Words are not placed randomly.

Their positions represent relationships learned from the data/context.

---

# 20. Vector Arithmetic Example

The source gives a classic conceptual example involving:

```text
King − Man + Woman + Wise
```

The idea is that vector arithmetic can move the representation toward a different semantic region.

The source asks where the resulting vector would fall among colored regions and explains that the result would have a higher chance of falling toward the region associated with the combined semantic meaning.

The purpose of this example is **not** to memorize the exact arithmetic.

The important concept is:

> Vector representations can encode relationships between concepts.

---

# 21. Another Embedding Example — Trees and Computers

The source creates a hypothetical dataset.

### Tree-related concepts

- trees are tall
- trees are green
- trees are majestic
- trees are essential
- trees give oxygen

### Computer-related concepts

- computers are fast
- computers are smart
- computers are useful

After converting the words into vectors, related concepts are expected to be closer in vector space.

Conceptually:

```text
Tree-related vectors → one semantic region

Computer-related vectors → another semantic region
```

---

# 22. What Happens Inside ChatGPT-Like Systems?

The source emphasizes that what appears to us as text is not the only internal representation.

For example, if you type:

> "What is the best way to learn Python?"

the text is represented numerically internally.

The source uses a simplified illustration of vectors with thousands of dimensions.

It mentions dimensions such as:

- 1,000
- 2,000
- 3,000

as illustrative examples for capturing richer context.

The core idea is:

```text
"What"
"learn"
"Python"
   ↓
Numerical/vector representations
   ↓
Mathematical comparison and processing
```

---

# 23. Embedding Example with OpenAI

The source demonstrates embeddings using LangChain and an OpenAI embedding model.

The example sentence is:

> "You must follow the rules."

The source shows that this sentence is converted into a vector.

It then discusses the vector size and states an example of:

**1,536 dimensions**

for the sample embedding used in the demonstration.

Two example sentences are also discussed:

1. "You must follow the rules."
2. "You must not disclose the rules."

Both are converted into vectors.

Because there are two input sentences, the collection of embeddings contains two embeddings.

---

# 24. Why Embeddings Are Powerful

The source emphasizes that these numbers are **not random numbers**.

They carry semantic information.

That semantic representation is one reason mathematical similarity can be used to identify related text.

The overall RAG step is therefore:

```text
Document chunks
      ↓
Convert text into numerical vectors
      ↓
Embeddings
```

---

# 25. Which Embedding Model Should Be Used?

The source demonstrates an OpenAI embedding option and also mentions Cohere embeddings.

Conceptually:

```text
Embeddings = OpenAI embeddings
```

or another supported embedding provider/model.

The source notes that Cohere may require additional configuration/lines.

The important idea is:

> Choose an embedding model and use it consistently to represent the source chunks.

---

# 26. Does the Vector for "King" Always Stay Exactly the Same?

A question from the session asks whether the vector for `king` is always the same fixed value.

The source explains the evolution of the idea:

- Historically, a word representation could be treated as a fixed representation.
- Later approaches incorporate contextual information.
- The meaning of `king` depends on surrounding context.

Examples given include:

### Royal king

A king from a royal family.

### "King" associated with Virat Kohli

The source refers to the nickname/context of "King" in cricket.

### King of Diamonds / King of Spades

A playing-card context.

### The Lion King

A movie/cartoon context.

Therefore, the surrounding context matters.

---

# 27. Contextual Meaning Example

If the surrounding words are consistently about cricket and the phrase is about "King Kohli", the representation will be associated strongly with the cricket context.

The source explains that slight contextual changes can cause slight vector changes, while strongly similar context can produce very similar representations.

---

# 28. Are Embeddings Randomly Generated Every Time?

Another question asks whether embeddings change in the same way that generated text can vary between executions.

The source explains that the embeddings associated with the trained model are based on the model/training process.

The instructor states that if the training data/model does not change, these representations do not simply change randomly every time the model is used.

The source also recommends a deeper **Word2Vec** session for anyone who wants to study this concept further.

---

# 29. RAG Steps 1–3 — Revision

At this point, the source asks the learner to recall the process.

### Step 1

**Load the data**

### Step 2

**Split the data into chunks**

### Step 3

**Create embeddings**

Embeddings are the numerical/vector representations of the chunks.

The source then moves to the next requirement:

> Once embeddings have been created, where do we store them?

---

# 30. Step 4 — Storing Embeddings in a Vector Database

## 30.1 Why Do We Need a Database?

Normally, application data is stored in databases.

However, the data being discussed here is now represented as **high-dimensional vectors**.

Therefore, the source introduces a dedicated type of database:

> **Vector Database**

---

# 31. Relational Database vs Vector Database

## Relational Databases

Examples mentioned:

- SQL
- Microsoft SQL Server / MSSQL
- MySQL

Typical relational database concepts include:

- rows,
- columns,
- tables,
- relationships,
- primary keys,
- secondary keys,
- indexes,
- numeric columns,
- string columns,
- date columns,
- SQL queries.

These systems are designed around structured/tabular data.

---

## Vector Databases

Vector databases are designed to work efficiently with vector representations.

In this RAG scenario:

```text
Text
 ↓
Embedding
 ↓
High-dimensional vector
 ↓
Vector database
```

The source mentions examples such as:

- Chroma
- Pinecone (the transcript's "fine cone" reference)

---

# 32. Why Not Simply Store Embeddings in a Regular SQL Database?

The source asks this as an interview-style question.

### Answer from the source's reasoning

In GenAI systems, text is converted into numerical vectors called embeddings.

These embeddings can be very high-dimensional.

A vector database is designed specifically for storing and working with this kind of vector data and performing similarity-oriented retrieval efficiently.

Therefore:

> **For embedding/vector similarity workloads, a vector database is generally the appropriate specialized storage layer.**

---

# 33. Chroma Example

The source demonstrates a Chroma-based vector store.

The conceptual process is:

```text
Chunks
  ↓
Embeddings
  ↓
Chroma Vector Store
  ↓
Employee Rules Database
```

The source calls the database something like:

**Employee Rules Database**

and uses a persistence directory so that the vector store can be physically stored rather than existing only in memory.

---

# 34. In-Memory vs Persistent Storage

The source explains the idea of persistence.

### In-memory

Data exists in memory and can be lost when the environment/process ends.

### Persistent storage

The vector database is stored physically in the specified location.

The demonstration uses a persistence directory for the employee-rules database.

After execution, a database is created in the environment/files.

---

# 35. RAG Steps 1–4 — Complete Revision

Let's lock the terminology down.

### Step 1 — Data Loading

Load the source documents.

### Step 2 — Chunking

Split the source document into smaller chunks.

### Step 3 — Embeddings

Convert each chunk into a numerical vector representation.

### Step 4 — Vector Database

Store the embeddings in a vector database.

```text
Documents
   ↓
Chunks
   ↓
Embeddings
   ↓
Vector Database
```

At this stage, the knowledge has been prepared for retrieval.

---

# 36. Step 5 — Data Retrieval

Now comes the final step:

> **Retrieval**

The user asks a question.

The question is also converted into a vector.

Then:

```text
User Question
      ↓
Query Embedding
      ↓
Compare with stored vectors
      ↓
Similarity calculation
      ↓
Most relevant chunks
```

---

# 37. How Similarity-Based Retrieval Works

Imagine a simplified two-dimensional vector space.

Suppose:

- one vector represents a computer-related concept,
- another vector represents a tree-related concept.

If the vectors are far apart, their semantic similarity is lower.

If two vectors are close together, they are more semantically related.

The source explains retrieval using this distance/similarity intuition.

---

# 38. Query-to-Chunk Matching

Suppose there are:

**133 chunks**

in the vector database.

The user's question is converted into a query vector.

That query vector is compared against the vectors of all the chunks.

The system identifies the chunks with the highest similarity.

For example:

```text
133 stored chunks
        ↓
Compare query with chunk vectors
        ↓
Rank by similarity
        ↓
Retrieve top 4 / top 5 relevant chunks
```

The source specifically uses **top four or top five** as the example.

---

# 39. Why This Reduces the Need to Put Everything in the Prompt

This is the central benefit.

Suppose you have:

- hundreds of PDFs,
- thousands of pages,
- a very large private repository.

You do **not** put every document into the prompt.

Instead:

```text
Huge document repository
        ↓
Chunk + embed + store
        ↓
Vector database
        ↓
User asks question
        ↓
Retrieve relevant chunks
        ↓
Use relevant information for the answer
```

Only the relevant information needs to be brought forward for the question.

---

# 40. Does the Retrieval Go to the Outside World?

The source repeatedly emphasizes the intended restriction:

If the RAG system is designed around a private document repository, the retrieval step should retrieve from that **private data source** rather than automatically searching unrelated external information.

This is why the source asks:

> Is the LLM being restricted to the private documents?

That is the central idea behind the demonstrated private-document RAG use case.

---

# 41. Complete RAG Architecture

The entire process can now be visualized as:

```text
                  OFFLINE / PREPARATION
                  ---------------------
Private Documents
       ↓
Document Loading
       ↓
Chunking
       ↓
Embeddings
       ↓
Vector Database
       ↓
       └─────────────────────────┐
                                 │
                                 │
                  QUERY / RETRIEVAL
                  ----------------
User Question
       ↓
Question Embedding
       ↓
Similarity Search
       ↓
Top Relevant Chunks
       ↓
Relevant Private Context
       ↓
LLM Generation
       ↓
Answer
```

The source itself focuses on the five RAG preparation/retrieval steps and ends by moving toward the next video, where the retrieval implementation is continued.

---

# 42. Complete 5-Step RAG Revision

| Step | What Happens | Purpose |
|---|---|---|
| **1. Load Data** | Read PDFs, text, transcripts, etc. | Bring source data into the system |
| **2. Split into Chunks** | Break large documents into smaller pieces | Make information manageable |
| **3. Create Embeddings** | Convert chunks into numerical vectors | Represent semantic information |
| **4. Store in Vector DB** | Store embeddings in a vector database | Enable efficient similarity retrieval |
| **5. Retrieve** | Convert query to vector and find similar chunks | Get relevant information for answering |

---

# 43. Important Numbers and Examples from the Source

For revision, retain these examples from the demonstration:

- Example private document: **Employee Agreement PDF**
- Example document size: **13 pages**
- Approximate extracted lines: **369**
- Approximate extracted characters: **29,540**
- Chunk size demonstrated: **300 characters**
- Chunk overlap demonstrated: **30 characters**
- Suggested overlap range: **10%–20%**
- Suggested chunk-size range: **300–3,000 characters**
- Resulting chunks in the example: **133**
- Example embedding dimension: **1,536**
- Example retrieval: **top 4 or top 5 chunks**
- Example vector database: **Chroma**
- Other vector database example mentioned: **Pinecone**
- Relational database examples: **SQL, MSSQL, MySQL**

---

# 44. Interview-Oriented Questions From This Script

## Beginner

### Q1. What is RAG?

**Answer:** RAG stands for Retrieval-Augmented Generation. It combines retrieval of relevant information from a knowledge source with LLM-based generation.

### Q2. Why is RAG needed?

**Answer:** The source identifies private-document Q&A, hallucination reduction, and handling large document repositories that cannot fit into a prompt as key reasons.

### Q3. What are the five steps of RAG?

**Answer:**

1. Load data
2. Split data into chunks
3. Create embeddings
4. Store embeddings in a vector database
5. Retrieve relevant chunks

### Q4. What is chunking?

**Answer:** Splitting a large document into smaller pieces called chunks.

### Q5. What is an embedding?

**Answer:** A numerical/vector representation of text that captures semantic/contextual information.

---

## Intermediate

### Q6. Why do we use chunk overlap?

**Answer:** To preserve contextual continuity between neighboring chunks and reduce information loss at chunk boundaries.

### Q7. Why use a vector database?

**Answer:** Because RAG works with high-dimensional embedding vectors and needs efficient similarity-based retrieval.

### Q8. What is the difference between a relational database and a vector database?

**Answer:** Relational databases primarily organize structured data into tables/rows/columns and support relational queries. Vector databases are designed for storing and searching vector representations.

### Q9. What happens during retrieval?

**Answer:** The user query is converted into an embedding and compared against stored chunk embeddings. The most similar chunks are retrieved.

### Q10. Why can't we simply put hundreds of PDFs into the prompt?

**Answer:** Large document collections can exceed the model's context window and are inefficient to repeatedly send as prompt content.

---

## Advanced

### Q11. How does chunk size affect RAG?

**Answer:** Chunk size determines how much source information is represented in each retrieval unit. The source suggests experimenting around 300–3,000 characters depending on the data and expected answer size.

### Q12. What is the role of embeddings in RAG?

**Answer:** Embeddings convert source chunks and queries into numerical representations so semantic similarity can be calculated.

### Q13. What does "top-k retrieval" mean?

**Answer:** It means retrieving the highest-ranked similar chunks, such as the top four or top five chunks in the source's example.

### Q14. What is the relationship between retrieval and hallucination?

**Answer:** Retrieval supplies relevant source information to ground the answer, helping reduce the likelihood of unsupported generated content.

---

# 45. Errors / Gotchas Mentioned or Implied by the Script

1. **Do not assume LLM confidence means correctness.**
2. **Do not assume an LLM can access private company documents automatically.**
3. **Do not put huge document repositories directly into a prompt.**
4. **Do not ignore context-window limitations.**
5. **Do not choose chunk size blindly.**
6. **Do not ignore chunk overlap where context crosses boundaries.**
7. **Do not assume tutorial code remains unchanged across package versions.**
8. **Do not assume company-approved LLM providers are the same as personal-use providers.**
9. **Do not confuse an ordinary relational database with a vector database.**
10. **Do not treat embeddings as random numbers; their purpose is to represent semantic/contextual information.**

---

# 46. Practical RAG Checklist

```text
□ Identify the private/knowledge data source
□ Load the documents
□ Extract readable text
□ Split documents into chunks
□ Select chunk size
□ Select chunk overlap
□ Generate embeddings
□ Store embeddings in a vector database
□ Convert user query into an embedding
□ Perform similarity search
□ Retrieve relevant chunks
□ Use retrieved context for generation
```

---

# 47. Final Summary

RAG solves a practical GenAI problem:

> **The answer may exist in a large or private knowledge repository that the LLM cannot directly rely on.**

Instead of forcing the entire repository into the prompt:

```text
Private Documents
       ↓
Load
       ↓
Chunk
       ↓
Embed
       ↓
Vector Database
       ↓
User Query
       ↓
Query Embedding
       ↓
Similarity Search
       ↓
Relevant Chunks
       ↓
LLM
       ↓
Answer
```

The most important terminology to remember is:

**RAG → Retrieval-Augmented Generation**

**Chunk → Smaller piece of a document**

**Embedding → Numerical/vector representation**

**Vector Database → Storage/search layer for embeddings**

**Retrieval → Finding the most relevant chunks for a query**

---

# 48. Additional Points

> These are additions for study clarity, kept separate from the source material.

### 48.1 RAG Has Two Conceptual Phases

It is useful to divide the five-step workflow into:

**Knowledge Preparation**

```text
Load → Chunk → Embed → Store
```

and:

**Question Answering**

```text
Query → Embed → Retrieve → Generate
```

This makes the architecture easier to remember.

### 48.2 The Vector Database Does Not "Understand" the Answer Like an LLM

Its primary role in this flow is to store/search vector representations and identify semantically similar content. The LLM remains responsible for generating the natural-language answer.

### 48.3 RAG Does Not Automatically Guarantee Correct Answers

Retrieval quality matters. If the wrong chunks are retrieved, the generated answer can still be poor or unsupported.

### 48.4 Chunking Is an Important Design Decision

There is no universal chunk size that works for every document. The source itself emphasizes experimenting based on the data and expected answer size.

### 48.5 Current Implementations Can Differ

The conceptual five-step workflow remains useful for learning, but exact LangChain classes, imports, package names, persistence APIs, embedding models, and vector-store APIs can change with library versions.
