# RAG — Retriever, Q&A Chain, Applications & Evaluation

> Complete structured study notes from the supplied transcript. The transcript is reorganized for learning; substantive concepts, examples, numbers, questions, implementation details, caveats and validation points are retained.

## 1. Session Context

This video continues the RAG series. The source asks learners to complete previous playlist videos and notes that the playlist, material and code files are in the video description.

This session covers:
1. The retriever.
2. Retrieved chunks versus the final answer.
3. Connecting retrieval with an LLM.
4. Retrieval Q&A Chain.
5. Real-world RAG applications.
6. Structured SQL data versus unstructured documents.
7. Multiple documents and conflicting sources.
8. Websites and dynamic sources.
9. Basel norms as a RAG project.
10. RAG evaluation and validation.

# 2. Understanding the Retriever

## 2.1 What is a Retriever?

A retriever is the component/function that finds relevant document chunks from the vector database for a user question.

The example uses an **Employee Rules Database**, containing the document chunks as vectors. The transcript mentions **136 chunks** in this version.

```text
Documents → Chunks → Embeddings/Vectors → Vector DB → Retriever
```

The retriever's job is retrieval, not final answer generation.

## 2.2 Sick-Leave Example

Question:

> What is the policy for sick leaves?

The query is represented as a vector and compared with stored chunk vectors. The system returns the most similar chunks; the example returns **four chunks/documents**.

The transcript calls each retrieved chunk a document internally.

## 2.3 Pretty Printing

Raw retrieved documents may be difficult to read. The source uses a `pretty_print` helper to display them neatly. This is only a presentation/helper function, not a core RAG component.

## 2.4 Insurance Example

Question:

> What is the policy for insurance?

Again, the question is converted into a vector and compared with all stored chunks. The demonstrated default is **top four** relevant chunks.

**Important:** these four chunks are not yet the answer. They are the information most closely related to the question.

## 2.5 Employee Salary Example

Question:

> What is the clause related to employee monthly salary?

The same `get relevant documents` operation retrieves the relevant chunks. This is the retrieval part of RAG.

# 3. Why RAG Has Huge Applications

The source contrasts RAG with older document-analysis workflows. If somebody had a huge book, such as the Bible, and wanted an answer about one specific piece, the information previously had to be manually read/transcribed/indexed.

RAG makes this type of document question answering practical.

Companies can take internal documents and build RAG applications over them. The source suggests that many companies have teams working on such applications.

At this stage, however, the system has retrieved documents only. The final answer still has to be generated.

# 4. Changing the Number of Retrieved Chunks

A learner asks whether the default four retrieved chunks can be changed.

Conceptually, yes. This is commonly controlled with a **top-k** value:

```text
top-k = 4
top-k = 10
```

The source discusses an older `top_k` parameter but demonstrates that it was not working in the tutorial's later API/version. The instructor suggests checking the current `get relevant documents` function/parameter.

**Gotcha:** library APIs change. Do not assume an old parameter name will work unchanged.

# 5. RAG and Prompts Are Different

A learner asks how RAG goes hand-in-hand with a prompt.

The source explicitly separates them:

- **RAG** retrieves relevant information for a particular/private knowledge source.
- **Prompting** instructs the LLM.

The connection is made after retrieval.

```text
User Question
   ↓
Retriever
   ↓
Relevant Chunks
   ↓
LLM
   ↓
Synthesize Answer
```

For example, instead of asking the LLM directly for an insurance policy, retrieve four relevant private-document chunks and ask the LLM to summarize/synthesize them into one answer.

This changes the answer from a generic answer to an answer specifically related to the private documents.

# 6. Real-World Application — Mortgage Operations

The source uses mortgage operations in Canada/North America as an example.

Often, knowledge about mortgage rules/documents is concentrated with a few experienced people:

```text
Documents → Experienced teammate reads them → Everyone asks that person
```

The source's common scenario is essentially: "Go to that person and ask him."

A RAG system can instead:

1. Collect the mortgage-operation documents.
2. Build a RAG over them.
3. Let employees ask questions.
4. Retrieve relevant chunks.
5. Generate an answer specific to the company/team/operation.

The benefit is not merely an AI answer; it is access to the organization's own knowledge.

# 7. Document Upload in ChatGPT-Like Systems

A learner asks whether uploading a document and asking questions about that document is similar to RAG.

The source describes it as the same/basic RAG idea: retrieve/use information from the supplied document and answer based on that document. A prompt may explicitly say:

> Answer based on this document only.

The key idea is document-grounded answering rather than unrelated general knowledge.

# 8. RAG with Structured vs. Unstructured Data

## 8.1 SQL Tables

A learner asks whether a SQL table/data warehouse can be the RAG source.

Technically, yes.

But the source says that for structured SQL data, especially original numerical/business data, it is generally **not a good idea** to convert everything into embeddings merely to use RAG.

RAG is especially useful for unstructured text such as documents and PDFs.

## 8.2 Why Direct SQL Is Better for Exact Numbers

Consider:

> What are the sales for the past six months?

For business data, the answer must be accurate.

Embedding the SQL data:

```text
SQL → Text → Embeddings → Vector DB → Similarity Search
```

can introduce a retrieval-based approach where an exact database query would be more appropriate.

The source frames this as:

> **Accuracy versus effort.**

Saving analytics/data-science manual effort is not useful if the business answer becomes inaccurate.

## 8.3 Better Architecture — Natural Language to SQL

The source recommends:

```text
User Question
   ↓
LLM
   ↓
SQL Query
   ↓
SQL Database
   ↓
Exact Result
   ↓
LLM
   ↓
Plain-English Answer
```

The user can ask in normal English without knowing SQL. The LLM converts the question to SQL, the database executes it, and the result can be expressed in plain English.

# 9. Multiple Document Sets and Similar Context

Suppose there are two document sets with similar context.

The source explains that both sets can be embedded and stored in the vector database:

```text
Document Set 1 ─┐
                ├→ Embeddings → Vector DB
Document Set 2 ─┘
```

The question becomes another embedding. The retriever selects the most similar chunks regardless of which set they came from.

For example, four results could contain a mixture of Set 1 and Set 2.

The retriever primarily performs similarity-based selection; it does not automatically understand every business-level conflict between documents.

In a production architecture, conflicts may require metadata, filters, source priority or business rules.

# 10. Websites and Dynamic Sources

RAG is not limited to PDFs.

The source explains that the PDF example uses a PDF loader, but document-loader frameworks can support many other sources, including:

- Websites
- Unstructured web content
- Spiders
- Sitemaps
- Cloud sources
- Twitter
- Reddit
- Messaging services
- PDFs
- Multiple PDFs
- Other supported sources

Conceptually:

```text
Source → Appropriate Loader → Text/Data → Chunks → Embeddings → Vector DB → Retrieval
```

Therefore, company websites and other changing sources can be used when an appropriate ingestion/loading process is available.

# 11. Basel Norms RAG Project

## 11.1 Interview/Project Advice

The source warns against taking a tutorial project and showing the exact same project and lines as personal experience.

Instead:

1. Use the project as a base.
2. Understand it.
3. Add your own domain/business context.
4. Modify it.
5. Be able to explain how you managed it.

## 11.2 Basel Norms

The source describes Basel norms as banking rules/regulations intended to help prevent banking-system failure.

Examples mentioned include requirements around:

- capital,
- lending,
- loan limits,
- asset liquidity,
- percentage of assets that can be given as loans,
- regulatory requirements.

The demonstration document is approximately **77 pages** and is a classic RAG case because answers are expected to come specifically from that document.

## 11.3 Step 1 — Load

The PDF is loaded using the PDF-loader approach and downloaded with `wget`.

Verification:

**77 pages.**

The source emphasizes that whether the source is a PDF or website, the important thing for this pipeline is obtaining the full text.

The example has approximately **36,000 words**.

## 11.4 Step 2 — Chunk

The Basel document is larger, so a larger chunk size is discussed.

Examples:

```text
Chunk size = 1,000
Overlap = 100
```

or:

```text
Chunk size = 700
Overlap = 70
```

The example produces **377 chunks**.

## 11.5 Step 3 — Embeddings

Create vector embeddings. The source mentions OpenAI and Cohere embeddings and demonstrates OpenAI while noting that Cohere can also be used.

## 11.6 Step 4 — Vector Database

Store the embeddings in a Basel-specific vector database. Persistence is used to create the physical database.

## 11.7 Step 5 — Retrieval

Example question:

> What is the percentage of minimum capital requirement?

The source gives a simplified example involving a bank with 100 crores that cannot lend all of it and discusses an **8% / 8-crore** example.

**Source-context note:** this is the tutorial's retrieval example; the current regulatory requirement is not independently verified here.

The retriever returns relevant documents/chunks. Again, those chunks are not the final answer.

Another example asks:

- What is PD?
- What is LGD?

The source expands them as:

- **PD — Probability of Default**
- **LGD — Loss Given Default**

# 12. Retrieval Q&A Chain

## 12.1 What Is Missing After Retrieval?

Until now:

```text
Question → Retriever → Documents
```

There is no synthesized answer yet.

To turn the retrieved documents into one answer, the source introduces the:

> **Retrieval Q&A Chain**

## 12.2 Why Is an LLM Needed?

The retriever can retrieve four documents/chunks, but it does not itself formulate the natural-language answer.

Therefore:

```text
Retriever → Relevant Documents → LLM → Synthesized Answer
```

The source deliberately points out that the earlier loading, chunking and vector-storage steps do not require the answer-generating LLM.

## 12.3 Cost Observation

The source notes that LLM usage costs money, while storing embeddings and retrieving vectors does not require an LLM-generated answer for every retrieval operation.

The LLM is needed when the system must synthesize the answer for the user.

# 13. Retrieval Q&A Chain — Stuff

The source introduces a chain type called **Stuff**.

The retrieved documents are combined and sent to the LLM:

```text
Doc 1
Doc 2
Doc 3
Doc 4
 ↓
Stuff Together
 ↓
LLM
 ↓
Answer
```

For this demonstration, the instructor uses this simpler approach.

# 14. Retrieval Q&A Chain — Map Reduce

Another option discussed is **Map Reduce**.

Conceptually:

```text
Doc 1 → Summary
Doc 2 → Summary
Doc 3 → Summary
Doc 4 → Summary
       ↓
Combine summaries
       ↓
Final synthesis
```

The source says it does not want to complicate the current example and therefore uses Stuff.

# 15. Before vs. After Q&A Chain

### Before

Question → four raw documents.

### After

Question → retriever → documents → LLM → direct natural-language answer.

This is the transition from a retrieval-only system to a more complete RAG Q&A application.

The source also notes that LLM temperature can be varied to influence the generated answer.

# 16. What Does "I Implemented RAG" Mean?

The source's practical interpretation is that a complete RAG project should cover more than simply putting documents into a vector database.

A complete flow is:

```text
Documents
 ↓
Loading
 ↓
Chunking
 ↓
Embeddings
 ↓
Vector DB
 ↓
Retriever
 ↓
LLM
 ↓
Q&A Answer
```

## 16.1 Applying It to a Company

Identify highly private/relevant documents for your team and build RAG over them.

For multiple PDFs, the ingestion logic changes from conceptually:

```text
for page in pages
```

to:

```text
for file in files
    for page in pages
```

and then the pages are combined into the full text/chunking pipeline.

The source says this is a relatively small change and enables multiple PDFs to be ingested.

# 17. RAG Evaluation and Validation

## 17.1 Why Evaluate?

In a company, clients/stakeholders will ask:

- How accurate are the results?
- What is the proof?
- How do you know the answer is correct?
- How do you know it came from the intended source?

Therefore, validation is essential.

## 17.2 Q&A Evaluation Chain

The source introduces a **Q&A Evaluation Chain**.

Basic idea:

```text
Known Question
+
Human/Ground-Truth Answer
+
RAG Answer
      ↓
Evaluation LLM
      ↓
Correct / Incorrect
      ↓
Accuracy
```

# 18. Constitution of India Evaluation Example

The source uses a **402-page Constitution of India** document.

Goal:

> Answers should come from the Constitution of India and nowhere else.

The familiar RAG process is repeated:

```text
Load
 ↓
Chunk
 ↓
Embeddings
 ↓
Vector DB
 ↓
RAG Q&A Chain
```

Example:

> According to the Constitution of India, what are the fundamental rights of citizens in India?

# 19. Why a Client Needs Proof

The source imagines presenting such a tool to a government organization.

A client could ask:

1. What proves the answer is correct?
2. What proves it came from the Constitution?
3. What proves it is not random/junk text?

That is why evaluation must be built into the project.

# 20. Creating a Ground-Truth Dataset

The source proposes taking around **10 real questions and answers** from the source document.

Examples include:

- Fundamental rights
- Directive Principles
- Election of the President of India

The known answers are stored as question-answer pairs.

The source uses a CSV-style file and imports it with pandas.

Conceptually:

```text
question,answer
Q1,Ground Truth 1
Q2,Ground Truth 2
Q3,Ground Truth 3
...
```

# 21. Testing an Out-of-Scope Question

The source intentionally adds:

> **Who is Narendra Modi?**

This question is not part of the Constitution source.

The purpose is to test whether the RAG system stays within its source boundary.

Expected behavior:

> **I don't know the answer / this information is not in the source.**

The source is using this as a grounding/refusal-style test, not as a request to answer the political question.

# 22. Generating RAG Predictions

The test questions are passed through the RAG Q&A chain.

The source encounters a small API issue:

- an earlier parameter was `question`,
- the current implementation expects `query`.

After changing to `query`, the answers are generated.

This again demonstrates that library APIs can change.

# 23. Human Answer vs. RAG Result

The evaluation compares:

- **Human answer** — reference/ground truth.
- **RAG result** — generated answer.

The source calls the reference the human answer.

The RAG result is what the system produced.

# 24. Using an LLM as the Evaluator

The source proposes using an LLM to compare the two answers.

Give the evaluator:

```text
Original Question
Human Answer
RAG Answer
```

and ask whether the meanings match.

The LLM can perform semantic comparison.

Output can be:

```text
Correct
Incorrect
```

# 25. Demonstrated 92% Accuracy

The source's first evaluation gives:

> **92% accuracy**

Several results are correct, while the deliberately added out-of-scope question is marked incorrect.

# 26. Why the 92% Example Is Misleading

The source then identifies the evaluation-data problem.

The question:

> Who is Narendra Modi?

was intentionally outside the Constitution.

The RAG answered:

> I don't know.

That is actually the desired behavior.

But the manually entered human answer was an actual answer about Narendra Modi.

Therefore the evaluator marked the RAG result incorrect.

The problem was the **ground-truth label**, not necessarily the RAG behavior.

# 27. Correct Ground Truth for an Out-of-Scope Question

If the system is intended to answer only from the Constitution, the reference answer should be:

> I don't know the answer.

Then the RAG's "I don't know" response can be counted as correct.

The source demonstrates that correcting this can produce **100% accuracy for that small sample**.

# 28. 100% Accuracy Is Not a Universal Guarantee

The source explicitly warns that 100% on this sample does not mean a production RAG system will always be 100% accurate.

Accuracy depends on:

- LLM strength,
- overall RAG quality,
- retrieval quality,
- evaluation dataset,
- ground-truth quality,
- question quality.

A larger evaluation set is more meaningful.

The source suggests testing around **100 questions**.

# 29. Complete RAG Architecture

```text
             KNOWLEDGE INGESTION
Documents / PDFs / Websites
            ↓
      Document Loader
            ↓
          Chunking
            ↓
        Embeddings
            ↓
      Vector Database
            ↓
          Retriever
            │
            ▼
            QUERY
       User Question
            ↓
      Query Embedding
            ↓
          Retriever
            ↓
     Top-K Relevant Chunks
            ↓
            LLM
            ↓
     Synthesized Answer
```

Evaluation:

```text
Ground-Truth Q&A
       +
RAG Answer
       ↓
Evaluation LLM
       ↓
Correct / Incorrect
       ↓
Accuracy
```

# 30. Data-Source Decision Guide

| Situation | Approach from the session |
|---|---|
| Private PDFs/documents | RAG |
| Internal team knowledge | RAG |
| Mortgage-operation documents | RAG |
| Regulatory documents | RAG |
| Large unstructured text | RAG |
| Websites | RAG with suitable loader |
| Multiple PDFs | Multi-document ingestion + RAG |
| Structured numerical SQL data | Prefer direct SQL |
| Natural-language question over SQL | LLM → SQL → DB → answer |
| Need accuracy evidence | Ground-truth evaluation + evaluation LLM |

# 31. Important Numbers

| Item | Source example |
|---|---:|
| Employee Rules chunks | 136 |
| Default retrieved chunks | 4 |
| Basel document | 77 pages |
| Basel extracted text | ~36,000 words |
| Basel chunk size example | 700 |
| Basel overlap example | 70 |
| Basel chunks | 377 |
| Constitution document | 402 pages |
| Initial evaluation dataset | ~10 Q&A pairs |
| Larger evaluation suggestion | ~100 questions |
| Demonstrated initial accuracy | 92% |
| Corrected small-sample result | 100% |

# 32. Interview Questions

## Beginner

### Q1. What is a retriever?
A component that retrieves the most relevant chunks/documents from the vector store for a query.

### Q2. Does the retriever generate the final answer?
No. It retrieves information. The LLM can synthesize the final answer.

### Q3. What is top-k?
The number of highest-ranked relevant chunks/results to retrieve.

### Q4. How many chunks were returned by default in the example?
Four.

### Q5. Why use pretty print?
To make retrieved document output readable.

## Intermediate

### Q6. How does RAG work with an LLM?
Retriever gets relevant chunks, then the LLM synthesizes an answer from them.

### Q7. What is a Retrieval Q&A Chain?
A chain combining retrieval and LLM answer generation.

### Q8. What is Stuff?
Retrieved documents are combined and passed to the LLM.

### Q9. What is Map Reduce?
Documents are processed/summarized individually and the results are combined.

### Q10. Should SQL tables always be embedded?
No. Exact structured/numerical data is generally better queried directly.

## Advanced

### Q11. How can natural language be converted to SQL?
LLM generates SQL from the user question, the database executes it, and the result can be converted back into natural language.

### Q12. Can multiple document sets be stored together?
Yes, but retrieval may return mixed chunks from the sets.

### Q13. Does retrieval automatically resolve conflicts?
No. Similarity retrieval alone does not guarantee business-level conflict resolution.

### Q14. Can RAG use websites?
Yes, with an appropriate loader/ingestion mechanism.

### Q15. Why evaluate RAG?
To demonstrate correctness, grounding and system quality.

## Architect Level

### Q16. How would you design multi-PDF RAG?
Multi-file ingestion → extraction → chunking → embeddings → vector DB → retriever → LLM → answer, with source metadata and access controls as appropriate.

### Q17. How would you evaluate production RAG?
Create representative ground truth, generate RAG responses, compare them, measure correctness, and test out-of-scope/missing-information cases.

### Q18. Why test out-of-scope questions?
To verify that the system does not confidently answer outside its intended knowledge source.

### Q19. What is the structured-vs-unstructured architecture decision?
Use RAG where semantic document retrieval is appropriate; use native database querying for exact structured numerical data.

# 33. Errors & Gotchas

1. Retriever output is not the final answer.
2. Four chunks are evidence/context, not automatically four correct facts.
3. `top_k` behavior can change with library versions.
4. RAG and prompting are separate concepts.
5. Do not embed structured numerical SQL data simply because it is possible.
6. Business accuracy matters more than only reducing manual effort.
7. Multiple document sets can produce mixed retrieval results.
8. Similarity search does not automatically resolve conflicts.
9. Websites require suitable ingestion/loaders.
10. Do not present an unchanged tutorial project as personal production experience.
11. Retriever cannot formulate the final answer by itself.
12. Stuff and Map Reduce are different strategies.
13. Evaluation requires correct ground truth.
14. Out-of-scope questions need the correct expected behavior.
15. Bad evaluation labels can make a good RAG result appear incorrect.
16. 100% on a small test set is not a production guarantee.
17. Accuracy depends on the LLM, retrieval, RAG design and evaluation data.
18. API parameters can change, e.g. `question` vs. `query`.

# 34. Final Revision

```text
INGESTION
Documents
   ↓
Load
   ↓
Chunk
   ↓
Embed
   ↓
Vector DB

RETRIEVAL
Question
   ↓
Query Embedding
   ↓
Retriever
   ↓
Top-K Chunks

GENERATION
Top-K Chunks
   ↓
LLM
   ↓
Answer

EVALUATION
Ground Truth + RAG Answer
   ↓
Evaluation LLM
   ↓
Correct / Incorrect
   ↓
Accuracy
```

## One-Line Interview Explanation

> "In RAG, I ingest domain documents, split them into chunks, generate embeddings and store them in a vector database. At query time I retrieve the most relevant chunks and pass them to an LLM for answer synthesis, then evaluate the system against ground-truth questions to measure quality and grounding."

# 35. Additional Points

These are separate additions for study clarity, not replacements for the supplied material.

## 35.1 Retriever vs. LLM

```text
Retriever = "Relevant information kahan hai?"
LLM       = "Us information se answer kaise banana hai?"
```

## 35.2 Retrieval Quality Matters

A strong LLM cannot compensate completely for poor retrieval:

```text
Wrong Retrieval
   ↓
Wrong Context
   ↓
Potentially Wrong Answer
```

## 35.3 Multi-Document Metadata

Large enterprise RAG systems can benefit from metadata such as:

- document type,
- department,
- geography,
- effective date,
- version,
- source,
- access scope.

## 35.4 Evaluation Should Go Beyond One Number

Production testing should include:

- normal questions,
- ambiguous questions,
- out-of-scope questions,
- conflicting documents,
- missing information,
- different document types,
- different user intents.

## 35.5 Remember the Architecture, Not One Tutorial API

The source itself shows API changes. The strongest mental model is:

> **Ingest → Chunk → Embed → Store → Retrieve → Generate → Evaluate**
