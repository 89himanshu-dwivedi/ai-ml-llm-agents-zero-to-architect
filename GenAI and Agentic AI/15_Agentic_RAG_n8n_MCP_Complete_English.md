# Agentic RAG + n8n RAG Chatbot + Frontend + MCP — Complete English Notes

> **Source basis:** Uploaded 567-line transcript.  
> **Rule:** Original transcript is preserved in the appendix. Main sections reorganize and explain the source without silently dropping source topics.

## 1. What is Agentic RAG?

In regular RAG, relevant information is retrieved from documents and supplied to the LLM.

In **Agentic RAG**, the RAG system is exposed as a **tool** that an AI Agent can use when required.

```text
User Question
     ↓
   AI Agent
     ↓
  RAG Tool
     ↓
Vector Database
     ↓
Relevant Chunks
     ↓
Chat Model
     ↓
Final Answer
```

The transcript uses private company documents as the main example: instead of returning generic public-knowledge answers, a company chatbot can answer from company-specific information. fileciteturn10file0L6-L23

---

# 2. Why Use RAG?

The transcript emphasizes several major motivations.

### 2.1 Reduce hallucination

An LLM may invent an answer when it does not know something. This is hallucination.

RAG retrieves relevant source information and grounds the response in that information. fileciteturn10file0L24-L41

### 2.2 Use Private / Company Data

If information exists inside private company documents, a generic ChatGPT/Gemini response may not be sufficiently specific.

RAG enables:

```text
Private Documents
      ↓
Retrieve Relevant Information
      ↓
LLM
      ↓
Company-specific Answer
```

### 2.3 Handle Large Documents

The transcript uses an approximately 87-page company document as an example. Putting the entire document directly into an LLM prompt creates context-window limitations, so a RAG system is used. fileciteturn10file0L61-L67

---

# 3. Building a RAG Chatbot in n8n — Data Ingestion

The workflow is:

```text
PDF / Company Document
        ↓
HTTP Node
        ↓
Data Loader
        ↓
Chunking
        ↓
OpenAI Embeddings
        ↓
Supabase Vector Store
```

The source PDF was hosted on GitHub and retrieved through an HTTP node using a raw file URL. fileciteturn10file0L45-L60

---

# 4. The Five Core RAG Steps

The transcript reviews:

```text
1. Load Data
      ↓
2. Split into Chunks
      ↓
3. Convert Chunks → Embeddings
      ↓
4. Store in Vector Database
      ↓
5. Retrieve Relevant Chunks
```

The transcript uses **Supabase Vector Store** and OpenAI embeddings. fileciteturn10file0L68-L88

---

# 5. Chunking

The PDF is divided into smaller pieces rather than stored as one huge block.

Transcript configuration:

```text
Chunk Size   = 1000
Chunk Overlap = 100
```

This corresponds to approximately 10% overlap.

A Recursive Character Text Splitter is used in the demonstration. fileciteturn10file0L89-L97

---

# 6. Supabase Vector Store

Supabase is used as the vector store.

```text
Document
  ↓
Chunks
  ↓
Embeddings
  ↓
Supabase Vector Store
```

The transcript describes storing document embeddings in a documents table and using OpenAI embeddings. fileciteturn10file0L79-L88

---

# 7. MIME Type Error

The initial execution produced an unsupported MIME type error.

The PDF was being retrieved as binary data but the data loader needed the correct PDF MIME type.

A code node was added to adjust the MIME type. fileciteturn10file0L98-L124

### Practical learning

```text
Error
 ↓
Understand Error
 ↓
Try Code / AI Assistance
 ↓
Test
 ↓
Fix
```

The instructor describes arriving at the solution after several attempts. fileciteturn10file0L105-L124

---

# 8. API Key Error

After the MIME issue, the OpenAI embedding API key was invalid.

The transcript demonstrates deleting/revoking the old/shared key, creating a new secret key and updating the n8n credential. fileciteturn10file0L125-L138

### Security lesson

```text
Old Key
  ↓
Revoke/Delete
  ↓
Create New Key
  ↓
Update Credential
```

---

# 9. Embeddings and Chunk Count

The example document is described as roughly 82–87 pages.

The resulting processing produced approximately **247 chunks/items** in the demonstrated run.

```text
1 PDF
 ↓
Chunking
 ↓
247 chunks
 ↓
Embeddings
 ↓
Vector DB
```

The data is now ready for retrieval. fileciteturn10file0L138-L143

---

# 10. Retrieval Workflow

The ingestion workflow is followed by a separate retrieval workflow.

```text
Chat Trigger
     ↓
AI Agent
     ↓
Chat Model
     +
Supabase Vector Store Tool
```

The RAG/vector store is provided to the AI Agent as a tool. fileciteturn10file0L144-L154

---

# 11. Normal Agent vs RAG Agent

## Normal Agent

```text
User
 ↓
AI Agent
 ↓
OpenAI Chat Model
 ↓
Answer
```

There is no private-document retrieval grounding.

## RAG Agent

```text
User
 ↓
AI Agent
 ↓
RAG / Supabase Tool
 ↓
Relevant Chunks
 ↓
OpenAI Chat Model
 ↓
Grounded Answer
```

The transcript demonstrates adding the vector store as a tool so answers can be grounded in private company documents. fileciteturn10file0L157-L189

---

# 12. Why is the LLM Needed After Retrieval?

This is an important interview concept.

The vector store does not normally produce the polished natural-language answer by itself.

```text
User Question
     ↓
Question → Vector
     ↓
Similarity Search
     ↓
Top Relevant Chunks
     ↓
Chat Model
     ↓
Final Answer
```

The transcript uses a top-**4 chunks** example.

Those retrieved chunks are passed to the chat model, which summarizes/composes them into the final response. fileciteturn10file0L190-L196

### Interview answer

> The vector database provides relevant evidence; the LLM uses that evidence to understand and generate the final natural-language response.

---

# 13. Company-Specific RAG Portfolio Project

The transcript suggests creating a detailed company/industry document and building RAG over it.

```text
Company / Industry
      ↓
Detailed Information
      ↓
Features / Products / Services
      ↓
Detailed Document
      ↓
RAG
      ↓
Company-specific Chatbot
```

The objective is a company/industry-specific chatbot rather than a generic chatbot. fileciteturn10file0L197-L231

---

# 14. Indian Constitution RAG Example

For learning, the transcript also mentions using Indian Constitution data instead of company documents.

```text
Indian Constitution
      ↓
RAG
      ↓
Chatbot
      ↓
Constitution-related Questions
```

The transcript suggests company-specific information may be more relevant for a portfolio project. fileciteturn10file0L228-L231

---

# 15. RAG Q&A Engine vs a Real Chatbot

A RAG system without memory can answer questions but does not automatically remember conversation history.

Example:

```text
User: What is the company?
Bot: Answer...

User: What was my previous question?
Bot: Cannot remember
```

The transcript adds simple memory that remembers the last five chats. fileciteturn10file0L215-L223

---

# 16. Adding Memory

Final conceptual architecture:

```text
                 ┌── Memory
User → AI Agent ─┼── Chat Model
                 └── RAG Tool
                        ↓
                 Supabase Vector Store
```

Now the chatbot can:
- answer from company documents,
- remember recent conversation context.

---

# 17. Adding a Frontend UI

The next step is to move from an n8n-only chatbot to a user-facing website.

Target:

```text
Website
   ↓
Webhook
   ↓
n8n AI Agent
   ↓
RAG
   ↓
Response
   ↓
Webhook
   ↓
Website
```

The transcript uses **Lovable** to create the frontend. fileciteturn10file0L233-L259

---

# 18. Webhook Node

A webhook acts as the bridge between the frontend and n8n backend.

```text
Frontend
   ↓
Webhook
   ↓
AI Processing
   ↓
Respond to Webhook
   ↓
Frontend
```

The transcript discusses GET and POST methods, with POST used for passing request information. fileciteturn10file0L247-L256

---

# 19. Lovable Frontend

The transcript gives Lovable instructions to create:
- a cybersecurity company chatbot,
- an example company called Secure Tech,
- a webhook connection,
- POST-based message submission,
- response display through the webhook.

Flow:

```text
User
 ↓
Lovable Chat UI
 ↓
POST Webhook
 ↓
n8n
 ↓
AI Agent + RAG
 ↓
Respond to Webhook
 ↓
Lovable UI
```

fileciteturn10file0L260-L294

---

# 20. Frontend Integration Debugging

The first frontend test produced a connectivity issue.

The debugging sequence included:

1. Verify the production webhook URL.
2. Check whether the workflow is active.
3. Inspect executions.
4. Inspect webhook response configuration.
5. Configure `Respond to Webhook`.
6. Save/activate the workflow.
7. Run a fresh test.

The transcript identifies an incorrect webhook response configuration and corrects it by responding through the Respond to Webhook node. fileciteturn10file0L296-L326

---

# 21. AI Agent Prompt Mapping Problem

The webhook successfully delivered the user message, but the AI Agent expected prompt input from a Chat Trigger.

The mismatch was:

```text
Webhook
   ↓
Message arrives
   X
AI Agent expects prompt from Chat Trigger
```

The fix:

```text
Webhook
   ↓
JSON Body Message
   ↓
AI Agent Prompt
```

The transcript gives `JSON.body.message` as the dynamic message source. fileciteturn10file0L327-L364

---

# 22. Successful End-to-End Architecture

The working flow becomes:

```text
User
 ↓
Website Chatbot
 ↓
Webhook
 ↓
AI Agent
 ↓
Supabase Vector Store
 ↓
Relevant Chunks
 ↓
LLM
 ↓
Final Answer
 ↓
Respond to Webhook
 ↓
Website
```

The successful execution shows the webhook receiving the question, the AI Agent processing it, Supabase returning four chunks, the model summarizing them and Respond to Webhook sending the answer back to the frontend. fileciteturn10file0L365-L376

---

# 23. Website + Company Chatbot

The transcript expands the simple chatbot into a one-page company website with an integrated floating chatbot.

Concept:

```text
Company Website
      +
Floating Chatbot
      ↓
Internal RAG
      ↓
Company-specific Answers
```

The transcript contrasts the historical effort/cost of custom chatbot projects with how quickly modern AI tools can create a prototype. fileciteturn10file0L377-L407

---

# 24. Another RAG Application — Ayurvedic Guru

The transcript proposes an **Ayurvedic Guru AI Doctor** project.

Concept:

```text
Ayurvedic Books
      ↓
RAG
      ↓
AI Agent
      ↓
User Question
      ↓
Ayurveda-based Information
```

The same Lovable → webhook → AI Agent → RAG architecture can be used. fileciteturn10file0L408-L423

> **Scope note:** The source presents this as an application idea; it does not establish medical safety or clinical validity.

---

# 25. Lovable + n8n

The broader product-building pattern presented is:

```text
Lovable
= Frontend / Website

n8n
= Backend Workflow / AI Orchestration

RAG
= Private Knowledge

LLM
= Reasoning / Response Generation
```

The user can describe a product idea in the frontend tool, add features and connect AI functionality through n8n webhooks. fileciteturn10file0L424-L434

---

# 26. MCP — Model Context Protocol

The next major topic is **MCP = Model Context Protocol**.

The transcript introduces it as a protocol intended to make interaction between AI agents and tools more standardized.

The transcript attributes its introduction to Anthropic. fileciteturn10file0L435-L447

---

# 27. Hotel Aggregator Example

The transcript uses a hotel aggregator such as MakeMyTrip to explain the idea.

```text
User
 ↓
Travel Aggregator
 ├── Hotel A API
 ├── Hotel B API
 ├── Hotel C API
 └── ...
```

The aggregator does not own every hotel. It communicates with provider systems through APIs to retrieve availability, booking and related information. fileciteturn10file0L448-L467

---

# 28. API as a Tool

In agentic-AI terminology:

```text
API
≈ Tool
```

An AI Agent can have:

```text
Tool 1
Tool 2
Tool 3
...
```

and select an appropriate tool based on the request. fileciteturn10file0L468-L472

---

# 29. The Problem with Thousands of APIs

Different providers can expose different:

- API structures,
- request/response formats,
- error handling,
- authentication,
- rate limits.

With thousands of providers, maintaining direct integrations becomes difficult. fileciteturn10file0L473-L490

---

# 30. MCP as a Middle Layer

## Without MCP

```text
AI Agent
 ├── Hotel API
 ├── Flight API
 ├── Restaurant API
 ├── Weather API
 └── ...
```

## With MCP

```text
AI Agent
    ↓
MCP Server
    ↓
 ┌───────────────┐
 │ Tool/API Logic│
 ├───────────────┤
 │ Hotel APIs    │
 │ Flight APIs   │
 │ Weather APIs  │
 │ Other APIs    │
 └───────────────┘
```

The transcript describes MCP as a middle layer or wrapper around tools. fileciteturn10file0L491-L533

---

# 31. Main MCP Benefit

Without MCP:

```text
API changes
   ↓
AI Agent code must adapt
```

With MCP:

```text
API changes
   ↓
MCP Server updates its integration
   ↓
AI Agent interface remains simpler
```

The transcript's architecture places the provider-specific API logic in the MCP server. fileciteturn10file0L497-L508

---

# 32. Travel Agent with MCP

Without MCP:

```text
Travel Agent
 ├── Airline 1 API
 ├── Airline 2 API
 ├── Airline 3 API
 ├── Hotel 1 API
 ├── Hotel 2 API
 ├── Hotel 3 API
 └── ...
```

With MCP:

```text
Travel Agent
      ↓
MCP Server
      ↓
Airlines / Hotels / Other Providers
```

The agent can express high-level intent:

```text
Book flight from A → B
Book hotel from date X → date Y
```

while provider-specific integration logic sits behind the MCP layer. fileciteturn10file0L513-L531

---

# 33. Zerodha Example

The transcript uses **Zerodha** as another example.

It contrasts traditional API-key/custom-code integration with the MCP concept in the context of algorithmic/trading workflows. fileciteturn10file0L534-L544

Example natural-language requests include:

> Summarize today's market condition, major index movement, sector performance and notable news affecting my holdings.

and:

> Group my open positions by underlying and calculate net delta of my option strategies.

The agent interprets the request and selects appropriate tools. fileciteturn10file0L545-L553

---

# 34. When Is MCP Useful?

The transcript makes an important qualification.

### Few tools

```text
1–4 tools
```

MCP may not be necessary.

### Many tools

```text
Hundreds / Thousands of tools
```

MCP can become useful as a standardized middle layer.

The transcript explicitly treats broad industry adoption as something that still needs to be observed. fileciteturn10file0L553-L563

---

# 35. Final MCP Mental Model

```text
                 ┌── Tool/API 1
                 ├── Tool/API 2
AI Agent → MCP ──┼── Tool/API 3
                 ├── Tool/API 4
                 └── Tool/API N
```

**One-line understanding:**

> MCP is presented in the transcript as a standardized middle layer/connector between an AI Agent and its tools/APIs.

---

# 36. Simple → Advanced → Super Advanced

## Simple

```text
PDF → Chunk → Embeddings → Vector DB
```

## Intermediate

```text
User
 ↓
Chat Agent
 ↓
Vector DB
 ↓
Relevant Chunks
 ↓
LLM
 ↓
Answer
```

## Advanced

```text
Website
 ↓
Webhook
 ↓
AI Agent
 ├── Memory
 ├── RAG Tool
 └── Chat Model
 ↓
Respond to Webhook
 ↓
Website
```

## Super Advanced

```text
User
 ↓
Frontend
 ↓
Webhook/API
 ↓
AI Agent
 ├── Memory
 ├── RAG
 ├── Tool Calling
 ├── Multiple APIs
 ├── MCP Server
 ├── Validation
 └── Human Approval
 ↓
External Systems
 ↓
Response
```

---

# 37. Errors & Gotchas

### 37.1 MIME Type
PDF binary data may need the correct MIME type.

### 37.2 API Key
An invalid/revoked/shared API key can break embedding generation.

### 37.3 Context Window
Very large documents should not simply be inserted into an LLM prompt.

### 37.4 Retrieval ≠ Final Answer
The vector database provides relevant chunks; the LLM produces the final response.

### 37.5 No Memory
A RAG chatbot does not automatically remember prior conversation; an explicit memory component may be needed.

### 37.6 Webhook Response
The frontend may not receive the processed response if the webhook is configured for an immediate response rather than responding through a Respond to Webhook node.

### 37.7 AI Agent Prompt Mapping
The webhook message must be mapped to the AI Agent's expected prompt input.

### 37.8 Production URL
Frontend integration requires the correct production webhook URL and an active workflow.

### 37.9 API Diversity
Different authentication, schemas and rate limits increase multi-tool integration complexity.

### 37.10 MCP Overuse
If only a few tools are involved, the transcript suggests that an MCP layer may add unnecessary complexity.

---

# 38. Best Architecture — In This Transcript's Context

| Requirement | Approach |
|---|---|
| Private company knowledge | RAG |
| Large PDF/document | Chunk + Embeddings |
| Semantic retrieval | Vector DB |
| Natural-language answer | LLM |
| Stateful chatbot | Memory |
| Website frontend | Lovable / custom frontend |
| Backend connection | Webhook |
| External tool integration | APIs / tools |
| Very large heterogeneous tool ecosystem | MCP may help |
| Few tools | Direct tool/API integration may be simpler |

---

# 39. Interview Questions — Junior

1. What is Agentic RAG?
2. What is the difference between RAG and a normal LLM?
3. How does RAG reduce hallucination?
4. What is a vector database?
5. What are embeddings?
6. Why do we chunk documents?
7. What is chunk overlap?
8. What is the role of Supabase Vector Store?
9. Why expose RAG as a tool to an AI Agent?
10. What is the difference between memory and RAG?
11. What is a webhook?
12. What does MCP stand for?
13. Why can an API be treated as a tool?

---

# 40. Interview Questions — Mid Level

1. Explain the five steps of RAG.
2. Why is an LLM needed after retrieval?
3. What is top-k retrieval?
4. How would you choose chunk size and overlap?
5. How would you design a webhook + AI Agent architecture?
6. How would you connect a RAG chatbot to a website?
7. How would you add conversation memory?
8. How would you debug a MIME-type problem?
9. How would you troubleshoot an invalid API key?
10. Why do many APIs make agent architecture difficult?
11. What is the difference between MCP and direct API integration?
12. Why is an MCP server called a middle layer?

---

# 41. Interview Questions — Senior / Architect

1. Design a production-grade Agentic RAG architecture.
2. How would you evaluate retrieval quality?
3. How would you optimize chunking?
4. How would you migrate when changing the embedding model?
5. How would you scale the vector database?
6. How would you defend against prompt injection and malicious retrieved content?
7. How would you enforce access controls on private company documents?
8. How would you implement tenant isolation in multi-tenant RAG?
9. How would you combine memory and RAG?
10. How would you secure a webhook-based AI backend?
11. How would you architect an agent with hundreds of APIs/tools?
12. When would you use MCP and when would you avoid it?
13. How would you handle MCP-server failures?
14. How would you design least-privilege tool permissions?
15. Where would you add human approval before an external action?

---

# 42. Quick Revision Cheat Sheet

```text
RAG
= Retrieval Augmented Generation

Agentic RAG
= RAG exposed as a tool to an AI Agent

Chunking
= Large document → smaller pieces

Embedding
= Text → numerical representation

Vector DB
= Stores/searches embeddings

Retrieval
= Finds relevant chunks

LLM
= Converts retrieved evidence into an answer

Memory
= Conversation context

Webhook
= Frontend ↔ Backend communication bridge

Respond to Webhook
= Sends processed result back

MCP
= Model Context Protocol

MCP Server
= Middle layer between AI Agent and tools/APIs
```

---

# 43. Final Summary

The transcript's complete journey is:

```text
Private Documents
      ↓
RAG
      ↓
Vector Database
      ↓
AI Agent
      ↓
Memory
      ↓
Webhook
      ↓
Frontend Chatbot
      ↓
Production-style User Experience
```

The next architecture concept is:

```text
AI Agent
   ↓
MCP Server
   ↓
Many Tools / APIs
```

Core lesson:

> **RAG grounds answers in private knowledge; Agentic RAG makes RAG available as an agent tool; webhooks connect the frontend to the backend agent; and MCP introduces a standardized middle-layer concept for large tool ecosystems.**

---

# 44. Assistant-Added Study Notes

> **This section is additional study guidance, separate from the source transcript.**

### RAG vs Agentic RAG

```text
Normal RAG:
Question → Retrieve → LLM → Answer

Agentic RAG:
Question → Agent → Decide whether RAG is needed
                  ↓
               RAG Tool
                  ↓
               Evidence
                  ↓
                 LLM
                  ↓
                Answer
```

### Production checklist

- Document permissions
- Tenant isolation
- Retrieval evaluation
- Citation/source tracking
- Prompt-injection defense
- Secret management
- Webhook authentication
- Rate limiting
- Logging
- Monitoring
- Human approval for high-impact actions

---

# Appendix — Complete Original Source Transcript

The complete uploaded 567-line transcript is preserved below.

Introduction to GenAI & Agentic AI Series
Hi, this is Wenut. We just turned into wanker ready classes. This video is part
of a series. Complete the previous videos in this playlist [music] before
you start this video. The complete playlist information, the material and the code file information is given in
[music] the video description below.
Understanding Agentic RAG and its Business Application
Now within NAN we can build a rack. We can also see agentic rack. What is agentic rack? You try to wrap a rag as a
tool inside an agent so that if you ask a question to an agent, it will refer to that particular tool. Now let me give
you a clear scenario here. Imagine there is a company whatever is the company name. Apparently right now the company
name is let's say deepwatch. What we want to do here is I have certain questions. What is deepwatch? What are its core uh cyber security services?
Looks like this is a company that is related to cyber security. How does deepwatch uh do this? What is MDR platform? What is Nexa aentka platform?
I do not know. I have hell lot of questions related to deep watch. Now I want answers for these 10 questions. If
that is the case, I can also ask these on chat GPT but chat GPT may not be able to give very much specific to deep watch
company. Imagine you are working in deep watch, you are working in that company and these are the customers who are
asking these questions. When your customers ask questions on your own company, you don't want to route your
customers into a location like Chad GPT or Gemini saying that you get the question answers from there. You want to
answer your customer questions customized based on your data, your internal data is much more accurate than
getting it from internet. So if somebody is asking a question related to our private documents and from private
documents if you want to answer the questions then you must be using rag retrieval augmented generation. So what
we will do here is we will try to create a rack to answer these questions. So we have all the data related to our
company. I'll keep all our data related to our company inside the documents and then whenever somebody asks a question I
would like to look at those private personal documents and try to answer the question so that I can get much more
relevant answers rather than generic answers. So a clear case of rag is one
Why Use RAG? Addressing Hallucination and Custom Answers
of the question entry question that you'll get related to rag. Why I should use rag? What is the need of rag? Rack
solves three major problems. Can somebody recollect what are the three major problems rag solves? Why I should use rag? Try to answer that anybody?
What is the need of? This is one of the most common interview question. In fact, any gen interview question you will have this uh definitely this question must be
there. I can tell you 100% of the times. Try to answer. Reduces reduces hallucination. That's a very important point. Rag is
used to reduce the hallucination. Can you explain more about it? What exactly is the meaning of reducing the hallucination using rag? That's the
right answer. Try to give explanation of that. So it will give the correct exact
answers instead of giving a generic answers. Generic answers. So that's a right explanation. So basically hallucination
means when you ask a question to JGP instead of say or any LLM instead of saying I do not know the answer what
it'll do is it'll try to make up the answer. So let's say these are private questions to the company. How does this
particular company improve meanantime to detect meanantime to remediate MTD MTR instead of saying I do not know what
exactly are MTD what exactly is MTR what it will say is something or the other MTR this that this that it'll try to
give that is known as hallucination if you want to reduce hallucination you must use rag so you want to generate the
information by retrieving the relevant documents so if you want to reduce hallucination you must use rag if you
have private documents with you these private documents are never exposed to any of the external LLM. So LLMs will
never get to know this information. How can I answer? How can an NLM answer the question related to our private
documents? If you have private documents, if you want to reduce hallucination and these private documents, if you can't put all of them
inside a prompt, in that case you must use rag. Have you understood our requirement right now? You're working
for a company that company wants to create a chatbot for their customers. If any customer wants to talk about that
company's information, then they can interact with that chatbot. That chatbot will give very specific information not
like a generic hallucinated information from Jad GPT or Gemini. So how do we do that? We will go to N8. We will try to
Building a RAG Chatbot in N8N: Data Ingestion
create a rag over there. So let's go to NAN workflows. I'll try to create a new
workflow. I'll try to create rag chatbot.
Rag chatbot for a company.
The first step is getting the data. You can get the data from Google drive or you can also add a node called HTTP node
to get the information if you have this information at a particular location. So we have our file which is on the GitHub.
So this is the PDF file that we have on GitHub. From this location we want to
access it into N8. So for that we need to add HTTP node.
I'll be sharing all this information. So here you have to put the URL the URL that is over here. But you have to put
the raw data URL and then if you put that link here then it will be downloading. So here is the URL the raw
data URL. Let me copy that information.
So the URL that you see on GitHub is not the raw data. So here it should start with raw.github user.content. content
but the one that we see on uh GitHub is GitHub dot some username dot this one
this looks like a URL but that is not actual URL it should start with raw data so if you paste that it actually prompts
for downloading directly this directly takes to your file so this is the link that we have to give there's no
authentication required if I execute the step I will get that file I have executed that step I got that file so
for a particular company all the information is stored in this particular file let Let me show you that file.
Maybe we'll download and see what exactly is there inside that file. So that company private data is there.
Everything related to that company. There are I think nearly 87 pages. Is it
possible to put all these 87 pages inside a prompt and ask the question? Do you think I can copy all this
information and send it to a large language model inside the prompt? You cannot send a very large prompt. Prompt
has a context window issue. That means you cannot give a very large prompt as input. So what we are trying to do is we
are trying to build a rack system on top of it. So we will get these 87 pages of data and then tell me what are the steps
The Five Steps of RAG: From Loading to Vector Database
inside rack. Do you remember first step is data loading which is this one. Try to recolct the next step everyone. Data
loading followed by split the data. Split the data into chunks. Splitting the data into chunks.
Chunks. All of you participate. Load the data. Split the data into chunks. Follow that up with what? Next step
rag has five steps. Have we have we completed rag session earlier?
Have we completed? Yes. Right. In that we have five steps that we have followed. One is load the data. The
second one is split the data into chunks. The third one is
once you split the data into chunks, convert them into embeddings or
numerical vectors. Once you convert them into embeddings, you store them in a database. What are the databases called?
What is the database called? Vector database. After vector database,
you do the retrieval. So first I got the data. Now what I'll try to do is I will split it and I'll
try to store them in a vector database. The vector database name that we will be storing all these documents is known as
superbase. Superbase vector store. So we will be storing all these documents in superbase vector store and what we want
to do is we want to add documents to vector store. So we will click on add document to vector store. If we have a
superbase account then it will be given here otherwise we have to create a superbase account. From there we have to
create credentials and put it here. After that we will be selecting that
account and I want to store all these documents inside this particular file or inside this particular table called
documents. I want to insert all these documents. If you remember, you take the data, you split the data into chunks, convert them into vector embeddings.
Those vector embeddings will be stored in this vector database. So if you're storing in this vector database, you
have to give embeddings model. You have to give how do you chunk the documents. So vector embeddings. The embeddings
model is OpenAI embeddings. This is the embeddings model that I will choose. The next one is I want to use a
default data loader. Within that also I want to split the data. So the type of
the data is binary data that we are taking the PDF file that we are taking and then I want to split the data based
on text splitter recursive character text splitter while writing the code. Earlier we have done everything that I'm
showing here but that was in lang chain Python code but here we are doing it inside this NAN. So I want to split the
chunk size is thousand and there is something called chunk overlap where we will try to mix the chunks the initial
and the last piece of information chunk overlap is 10 10% of overall data which
is like chunk size is 1,000 here chunk overlap is 100 that we are choosing once you give all this you can use this tidy
up button what it'll do is it'll try to show you a neat one otherwise if your overall uh map looks like this this
canvas it is not easy to read you can I always click on this tidy up button. Then it'll look like this. Now once I
execute it, what must happen is on the superb base vector store there must be all these vector embeddings that must be
have been stored. But if I execute it by default it gives an error. It says that unsupported mime type application stream
Troubleshooting MIME Type and API Key Errors
error. That means when we are getting this file the data loader says that I'm not able to read your file. So to make
sure that we are reading this PDF file accurately. So this mime type need to be changed to PDF. So there are multiple
ways of doing it. So what we can do is we can add a code node. So what we will do is we will try to
copy this and then I'll go to this place. I'll say code node. In the code
you can write the code. If you know how to write you can ask AI. So I got an error.
So this is error. Please try to write the code for adjusting the mind type. So
basically I'm simply directly saying it here. I have an error. Can you please resolve it? If it resolves well and good
otherwise what we can do is we can go to charge GPT or Gemini give the same error and then uh we can ask it to give me the
code to resolve it. So let's generate the code here. If it works fine otherwise we will ask the same question
in chat GPT try to get the answer maybe initially within one shot we may
not get the answer so it is giving this as one of the solution so let's do one thing we will execute this step
so some not defined that means this code is also not working so what we will do is right now I have the code for it
after trying it three four times I have got the code how to rectify this as of
now I will give you that code. But in general also if we do not know that code, how to change the mime type, how to resolve this error. Usually also what
we do is nobody learns how to do all this, we just try it out a couple of times, how to change the file type to
adjust this on different uh platforms like KGP or Gemini and then uh we will be able to resolve this issue. So let's
try to get that code. So I have written that code somewhere. So let me just copy paste the code from that particular
location. So this error I think later on N8 and
they themselves might resolve it. As of now it is showing some file conversion error. So instead of asking AI now I'll
come to Ford node. I will try to simply put it here.
So the code that you have to write for changing the mind type is this one. Now even I do not know JavaScript. This code
is in JavaScript. Even I do not know JavaScript. But how do I arrive at it? I got that error. I kept on searching for
a solution. Finally I arrived at this solution. Looks like this is the one that will be helpful for changing the
mime type. Now that I have added this code node. Let me execute it now. So file will be loaded. It is changing the
type of the file. Now the data loader is working. Now the embedding model it is saying that my API key provided is
wrong. So what I have done is recently I have been to this corporate training. There I have shared my API key. After
coming back from there I have to delete that API key. So what I'll do is I'll go to my OpenAI API key. Right now I'll try
to create one new key because sometimes if your key is compromised or if you have shared your key it is always a good
idea to make sure that you safeguard your key. So I have deleted one of the key. Now I'll try to create a new key.
Create new secret key. My key right now I will say this key name is AI
December 2025. project default project no restrictions
create a secret key this is the key that I'll be copying I'll come here and then
so at least the data loader is working fine embedding model is not working so I'll go here I will modify this open AI
API key is wrongly given so once again I'll just select this paste it and then
say save it's testing connected connection tested successfully usually
it's good to have openAI API key paid version if you're learning generative AI or agentic AI. It may cost you $10 but
it'll give you almost uh fuel for almost one year of practice. Now let me execute
file loaded file format being changed. Data loader is working. Now embeddings are getting created since the data is 82
pages. So all these embeddings will be created. All of them will be stored on the vector database. If you see here
overall there's a one item that is going from here to here. Let me zoom into this.
There's one item which is one file item that is going. There's one item that is also file. But at the end we are getting 247 items. That means 240 chunks of
data. From one file we have created 247 chunks of the data. So now we have all
the embeddings that are stored in this vector database. Now the next step in rag is retrieving
Setting Up a Retrieval Workflow with a Chat Agent
the documents from this vector database. For retrieval we have to create a separate workflow. So how do I create a
retrieval workflow? I will start with a chat agent. Chat trigger is the first
one that we will add. And then I will be connecting this to an AI agent.
This AI agent or to this AI agent, the tool that I give is rag is the tool or the superbase. I have stored all the
vectors in that superbase. So access them from here. So the chat model that we will be using is OpenAI chat model.
You can choose the model type. You can choose Gemini 4 uh GPD 4.1 charge 4 latest GPD 3.5 turbo and then the tool
that we want to choose here is the superbase tool vector store tool but
here I'm saying superbase tool is the one that we will use
let me just choose the superbase there will be one option where we will get use the superbase vector store as a tool see
retrieve the documents so this will be a tool for an AI agent that means if somebody is asking a question to an an
AI agent originally what happens is AI agent answer the questions from this chat model so let me show you let's say
let's save this let me show you what happens originally and what is the difference from what is a regular agent
and what is the rag agent let's create one more so if I create a
chat trigger if I connect it to an AI agent
and in that AI agent if I keep a chat model like OpenAI.
Now what happens is if I am writing a chat let's say chat happens here I will say hi what is the best way
to save time if I say like this what it will do is your chat will go to AI agent
it will send it to open a chat model and you will get the response you will see that your chat has gone to a agent and
it is connecting from open AI and it is giving you the output but what I'll do is in the tools I will add the rag tool
now By adding the rad tool your answer will be coming from here. So if I type the same thing here what is deep watch
company main services. If I say like this the
answer will be coming from chat GPT or OpenAI. Now this is what
type of answer it could be a hallucinated answer. Can you tell me what exactly I mean by saying it could
be a hallucinated answer which is not related to the document. H the documents that you have are private
documents and if the answer is not there in the internet then open AAI will try to give you some answer but what I'll
try to do extra here is in the place of tool I will add superbase vector store
superbase vector store but it is retrieve documents as a tool for AI agent so that means the description the
tool description that I'll give is this tool use this tool
for answering questions related to tell me anything
that is related to this particular company related to this company use this tool
for answering if you do not know the answer what I'm trying to do tell me here if
you don't know the answer just say I don't know so basically what I'm
trying to say is try not to make up any answer so try to answer the user questions from this tool and table name
is documents from those table and embeddings is openAI embeddings is what
I want to take. So use these OpenAI embeddings and then if I try to click
tidyups the same thing I was trying to create here earlier.
Let me show the other workflow where we were doing either you can put it in a different canvas all together or earlier
we were keeping it in the same canvas. Isn't it the one that you see here I try to keep
it here it's fine you can keep it here or you can keep it separately also you have the superbase vector store from
there you want to get it so in the tool so from this one you try to get the
information from the superbase account so let me try to ask the question now related to the same thing what is the
company's main services but this time what do you expect you expect this chat to hit this superbase vector store and
You must get the answer from here. That means you can be quite sure that your answers are not hallucinated. The
answers are related to private documents. So let me ask the question. Let us see whether it will hit superbase
vector. If it is hitting superbase vector store, that means you can be sure that your answers are perfect non-h
hallucinated. It'll still hit here. Can somebody tell me why it'll hit open a chat model also? Why not just superbase
vector store and give us the answer? Why we have to hit open a chat model as
well? Because in retrieval augmented generation once you hit this vector store you will get four most matching
documents. So your question will be converted into a vector that vector will be matched with the foremost vectors or
four most chunks of information. There are 127 or 247 chunks of information
overall. Out of those 247 chunks the top four chunks that have the answer that will be extracted. They will be sent to
your chat model. It is giving you the answer here. So rag is a specific case
where you want to use your private documents. Everybody who is here, if you're working in a company already or
if you are showing some particular company on your CV, I want you to prepare a 30 to 40page document on your
company. How do you prepare that? You go to open AI, you go to chat GPT and you ask about let's say if you're working on
a particular company. Let's say if you are working in a company called uh my
company name is no what is just I'm just making uh making it up my company name
is no give me I want to prepare a detailed report I want to prepare a
detailed report on my company
give me all the pointers give me all the points and features products s by my company.
So it will give all of them and then try to ask chat GPT to explain each and every feature. Explain each and every
feature. Maybe I want you to gather at least 100 pages from CH GP itself or if
you already have a document well and good but I want you to make it very much specific to your company or very much
specific to a particular industry or the company. So it is showing all this information and then each one of the
points we will ask it to elaborate elaborate the company's uh snapshot maybe elaborate. So I will ask elaborate
explain this in depth and prompt me
for the next point and it will explain that in depth and it'll prompt me shall
I go here shall I go there and then you keep on doing it like that you create some information about the company and
after that here whatever company that I have used replace that with your company document and then you have created a
chatbot that will particularly answer questions related to your company. Now this is not a chat board that we have
Adding Chatbot Memory for Enhanced Interaction
created. This is just a Q&A engine because if I ask what was my previous
question it will not be able to answer you have not asked any previous question
because for chatbot we need to keep memory so there is something called memory that we will add very simple so I will say just simple memory. So last
five chats that I'll be able to remember. Now that you have added memory, now if I ask a question
and then it'll give me the answer. It'll hit the super base. It'll give me the answer. Now if I ask what was my
previous question earlier it said you haven't asked any question. Now it will say you this is your question. It'll hit the memory quickly. It hit the memory.
What is the company? Now this is a chatbot that we have created for a particular company and its private
documents is what we are handling. Have you understood what I'm trying to say here? Will you be able to create one
chatbot for yourself on N8? N10 chatbot is damn easy to make. You just drag and drop some stuff and then your chatbot is
ready. So you can say that I'm very comfortable with rag. I can create rag on langchain
using the code. I can also create rag on N8N as well. Rag based chatbot. You can
put any documents data or any company's private documents. You will be answering the questions from that. One of the
exercises that I have given was instead of company document we have put Indian constitution data. So whatever somebody
has if any questions related to Indian constitution so that will be a chat word for Indian constitution. Now that is good for learning but if you keep your
company information whichever is available generic outside that company information if you build a rack on it it
will be very good to show on our portfolio. We understood this all of you is it easy
to follow? Yes sir. Now what we'll try to do is we will try
Integrating Chatbot with a Front-End UI using Lovable and Webhooks
to make it a little bit more interesting. So until now we have created a chatbot rag based chatbot. So
the PPT that I have in that another example is also there constitution of India. Based on that I have created rag
but I thought that later on maybe company related rag would be much more uh relevant. That's why I have changed
it. You can also try this one as well. What I'll try to do is the video related to this one also I'll upload. So I'll
upload both the videos. You can access any one of them. Okay. Is that fine?
Now the next part that we are going to add will be much more interesting. We
will try to create a front end UI. That means right now the chatbot is here on
NAT. What if I want to create a chatbot which the user will face and this chatbot whichever is my company let's
say I'm working in no what is and I want to keep the chatbot on now what is website from there user will send the
question in the back end I'll process and whatever the answer that I'm getting here the answer that I get here this
answer I want to send it to user on the chatbot are you getting what I'm trying to say right now you see the questioning
and answering on nan but we want to get into a place where user will enter from
the website. From the website you will get the question in the back end you'll process and you'll push back the answer to the website again. So how do we do
that? So for that we need something called a web hook node. So for that right now you have the superbase vector
store you have the rack all of that is fine but you need a web hook node to connect to the website. So let me show
you how that is done. So this one, let me just save this
web hook. What does this web hook node do? It should be able to listen to your
information from your website and send it here so that we can process it using AI and then send it back respond to web
hook node. We will add it'll respond to that web hook. So the first node that you will add here is web hook node.
This web hook node you can change the path or you can leave it as it is. So this web hook node production URL is
what we will take. You can use get method where you will get all the information in the URL itself or you can
use post method where you will pass on the information in a secured manner. So there are two ways of getting the
information from your website to here. So these are two kind of protocols. So usually post is a secured one. So this
is the link that we will carry. Now what we will do is we will create a website immediately using lovable. From there
from that chatbot we will talk to our AI agent in the back end. So your AI agent will be here inside n and then your
chatbot is on your website. So let me go to lovable.
Now here I will ask my request create
a chatbot. So here in lovable if you are using your
free account then there are limited credits. So I think you must be having I
have 30 credits but usually when you are using you may have five credits or something. So we have to use this
sparingly. So we will try to create a website front- end website. So create a website for
a cyber security company the or let me say not a website create a
chatbot for cyber security company I will not
use the same company name let's give a different company name so let's not use the proprietary company name the company
name is secure Tech Secure Tech is the company name just for
the sake of giving any name we have given it. So what I'm trying to do is I will create a website called Secure
Tech. It's a cyber security company and it will be a chatbot and then I'm saying use my web hook
URL. This is my web hook URL. So that means the chat that user is entering here it
should go to this web hook. That means we are hitting our own page here. So the information will come here and then so I
will say send the information using post method. So that is like this is how you
have to send the information to that website and then get the response using
respond to web hook. That means from that web hook you will get the response
display the response to the user. So what I'm saying is you create a cyberc
company website it is a chatbot and then do it then what it'll do actually you should put this in chatgity get the
description then put it a bit detailed website description you must give it here but I'm just simply asking this to
be created by lovable lovable typically takes around 2 to 3 minutes to give you the website so you understood the
overall plan what is the plan your AI agent will sit here so I will put AI agent here
so what will happen you will get the information from web hook somebody will type something. So this is the website
that will be created here. That will be your company website. Let's say if we go to know what is
this is a website of let's say you know what is what I want to do is there must be a chatbot somewhere here.
Somewhere here there's a chatbot. Let us suppose there is no chatbot here. Now what I want to do is I want to put a chatbot on this website. When somebody
clicks and when somebody starts interacting I want that message to be read by my web hook node. It will
receive it. It will send it to AI agent. My agent will process it and try to send the answer. The answer will be sent back
by using respond to web hook node. That's it. Once you do this either first incoming item or all incoming items,
whatever is information that you get from this AI agent, you send it back. So here in the chat bot, it should be
reflected. Now how do I answer these questions? I have to add a chat model. If I just add a chat model, whatever
chat GPT is giving the answer, you will get it. But I don't want to give any random answer. I want to give rag based
answers. So the tool should be superbase, superbase, vector store and retrieve
documents as this one. So useful for answering questions related to
whatever is your company name. Since we have created a vector store for this company, we will give this company name
and then I will give it this one. Embeddings is openai embeddings.
Connecting Frontend Chatbot to N8N Backend
Now as simple as this you have your website that is created by lovable. Lovable is spinning. So this is my
chatbot. It has created a direct chatbot only. It did not give lot of UI. So welcome to secure tech. I am your cyber
security assistant. I can help you to protect your project your digital assets. Then one question if the user types here we expect that question to
come over here. If I execute the workflow that should be happening. So for that to happen I have to keep this
active. Right now this is inactive. You have to keep this active. I'm hoping that everything is in place. So what
I'll do here is I will try to ask a question in this place. I would say hi.
I apologize but I'm experiencing connectivity issue. Please try again later. So at least let us see whether
that hi is received here or not.
This is my production URL. So listen to this test event. Now this will be
testing it. So waiting for the response. Let me just save it once again.
Let me just type it once again. Because sometimes what happens is this lovable may not be able to connect it. Then if
it is not working, we will tell lovable once again that the chat that I'm sending it here, this is not connected
to my URL. We will ask it to make sure that it is properly connected. I will once again type hi. So it is not it
looks like this is not connected to our web hook. So I will once again get it here production URL and copy it here.
Come back and then I will come to lovable. I will say that this chatbot is
not working. My URL or
my my web hook URL I would say production URL not for
testing production URL is this one. This is my web hook
production URL. Please correct it and show the response
by using respond to web hook node.
If post method is not working then we'll try some other method but let us see whether what lo says. If it says it is
already connected to this then fine otherwise if it thinks and thinks that okay this is not connected then it may try to modify that. So the web hook URL
is correct activated flow. So it says that your workflow need to be activated toggle the workflow. So it is trying to
suggest us that your workflow must be activated for this to work which we have activated already. So let me see the
executions and there is one error that we got 202 millisecond it has run. So
let us see whether web hook node not corrected. Set respond parameter using
respond web hook node. Looks like we have done an error here. So it says that when you are setting up the web hook
node in the web hook node the information that it is giving is your answer says
that respond respond immediately instead of saying this you respond using the web hook node. So once you receive a message
don't respond immediately you respond using the web hook node that means you process and the processing will go to
whatever is that context whatever is information that will go to respond to web hook node then only it will work. So in the execution after reading that
Debugging and Live Demonstration of the Chatbot
particular information here suggestion set this then it may work that is what
it says. So I'll come here we have changed it and then I will save this. Now I will come back here to the
website. Now I'll try to type hi I have received a message. How can I assist you? Now I'll go back to my place here
and see whether whatever the information that we have done earlier like have we
got that here. If I go to executions and then try to refresh this.
Let me type a specific message so that we can track it. What is the
name main service?
So it says yes I have received a message how can I help you today. So at least this information whether it is going here or not that is what we will try to
see. Let me refresh this the latest execution first we will see whether the message that we have sent there is it
coming here. So if I click on this looks like at least the new execution has happened recently. Now we will try to
see first my message whether the one that I have sent it here is it shown
here or not. So the message at least we are happy that if you come here on the chatbot
whatever the information that you have given here on your chatbot this is your chatbot customerf facing chatbot and the
information that you gave here is hitting your NAN and the question that you gave there is working here the
problem is with AI agent this AI agent is not able to give the answer and send it back to respond to web hook node. Let
us see what is the error in the AI agent. In the AI agent it is finding it
difficult. There is no prompt that is specified. So the error that we are getting it here is you are getting the
information from the user here. But in the AI agent it is saying that it is connected to chat trigger node and it is
expecting some prompt input which is not connected to chat trigger node. It is connected to web hook node. So what I'll
do is I will say the prompt that should be given to AI agent is defined below. And what I will say is whatever is the
information that you are getting from web hook node that information to that information you have to give the answer.
So I will say here you must say that
we will execute the previous nodes and then we will get something called
message. Whatever is the you are a
you are a helpful AI assistant.
That is fine. And then answer the user questions.
answer the user questions
using the tool that
the superbase vector store tool. I want to
answer you all the questions by using the vector store tool and then the user
question is given here. Usually the user
question if you execute the previous nodes you can drag and drop it from here. Otherwise you have to type it in
this format. The user question is your uh JSON
dot body dot message.
So this is the user question. Usually when you execute this you can drag and drop the variable directly but the previous execution is not working
because we are directly working with the production URL. It may not be there. So now what I have done is I have corrected
this issue. You will get the message to web hook node. message will be passed on to AI agent that will be sending it back to respond to web hook. Now I will go
back here. I have saved it. So let's go back here. Then I will say the same question.
Now AI agent is working. Now superbase vector store is working. They're thinking about giving the answer.
Finally they are giving the answer. It's a private company focus on managing security services etc etc they are giving. Now if you go back to our back
end processing and try to check what has happened in executions you can see that previous four executions failed due to
various reasons. One of them was web hook reason one of them as agent reason. Now the current execution has
successfully been executed and if you see what has happened here node by node
let me see the web hook node what has happened in there. You have received a message from the user
somewhere the query that we have given. So the message is this one. what is the company main service and then next node
if I go AI agent node it has processed it you can see it in this format or you can see it in table format so the
message was received and you have processed it superbase has done its job superbase vector store has given four
chunks of data emitting model has done its job and then openai has summarized these four pieces of information into
one piece and then respond to web hook node finally sent this information back onto your chat now if I want to make
this a little a bit more beautiful. Complete the website by adding all the
other pages or give me a one pager
website along with this chatbot that includes
this chatbot. Sometimes when you do this in loable, it may screw up the original functionality also. I'll go ahead give
me a one pager website that includes this chatbot. So I just don't want a simple chatbot. This is just a chatbot
secure techch.ai users can answer the ask the questions and we are answering the questions by using our internal
rack. So it is saying I'll create one pager secure tech website with a chatbot integrated as a floating widget. What is
a floating widget? Like you can keep it here and there. There was a time creating a chatbot like
this and integrating on the website. It was a 6 months project for four or five people and even after that the chatbot
was not effective. If you want to give a proper answers related to your company it would not have been possible. But nowadays even the college students are
doing this as their small project. It just hardly takes one or two hours to create a very effective chatbot and that
gives very proper information and you can also add lot of front- end user interface features.
Let us see. It's saying I have I will create this must be. So this is the
website that it has created. Decent but not very complex. And where is our chatboard? Somewhere here. If I click on
this chatboard. So this is your website. All the information will be there on your website. And then your chatbot is
also there. User can now answer the questions very easily. So about your
company. Earlier there were very specific questions related to this company only. Let's say earlier there
was a question what is MTTD? We will ask the question what is MTD and what is MTR
and how does your company handle them? I don't know
like this one if you ask any Chad GBT or any LLM you will get a very much highly hallucinated answer but right now we are
expecting our AI agent to read this and answer it properly. Let me tell you the thing that you see here in the last 20
minutes that we have created this is a literally a million dollar product five six years back if you go to any company
if you tell them I'll create a very beautiful website for you maybe four or five websites and I'll give you a
chatbot that will answer your clients the questions related to their specific
regarding whatever is the functionality and it'll be very very specific depending on your data only then
somebody would have paid me a lots and lots of money because that was not possible few days back or few years
back. Now it's very simple like we just created like a piece of cake. Even the errors also we did not resolve it like
AI itself they has suggested if there's any error here uh you can always say
resolve my error in this one itself you can say you'll get an option ask AI like
here this one ask assistant this assistant is an AI assistant if there's any error that itself it'll suggest
sometimes it itself will try to resolve so that is the N8N in the BPD I have
The Value of Agentic AI Chatbots
created another one this one is related to a company chatbot I thought this will kind of add more interest to you that is
why I have shown this. But in our PPT I have created we have created another one called Ayurvedic guru AI doctor. So what
uh this application is like Indian Ayurveda is very much uh rich in
information. So what if I take all that Ayurvedic uh books information I create
a rag out of them and then when the user asks the question let's say uh I have this particular issue like uh I'm
feeling suffering from cold can you give me any ayurveetic solution instead of going for quick tablet what if I want to
or if you have chronic diseases are there any ayuric solutions why don't we have a chatbot for that that was the
idea that I got and then we will the same overall flow will be the same we will create a website on web uh lovable
and then we will try to connect it to the respond to the web hook note AI agent and everything will be added
finally you will get the answer here so this will be the final website you can
also try this one creating this one I'll upload the videos of both the one that we have discussed anyway this video you
will get it as an extra video you can also get it this one this is another website that we have created using
lovable where you will have another chatbot here but this chatbot is related to ayurvea only any question that you
ask the answers will be coming from as remedies from Ayurveda. Have you understood this all of you? Any
questions on this? Any questions? Quick questions.
All right. If you're interested, I think you can
create websites on level like this. Like sometimes like it's been our dream that I have a particular idea in my mind and
I want to create it like a product. But we always stop by thinking I cannot create a application like Android. I
cannot create a web app. That used to be always one struggle for me or a lot of people isn't it? I have some idea but
I'm not able to implement it. But lovable is wonderful place where you just write down your idea, create a website, add the feature. If you want to
add another feature, add it, add it. At least you will love uh doing or seeing your imagination coming over here. And
then you can implement AI at the back end. You have n you give your information using web hook URL. Whatever
I have shown here, try it five six times. You will get familiarity with it. So once you take the information using
web hook URL, respond back to that web hook URL and then in between you put all
your AI whatever you want to put. So try to create a very a good web page as a
front end and try to come up with a AI solution and you can show it on your website as well.
Understanding Model Context Protocol (MCP)
This is a very important uh aspect N8N but what I have seen is not all
companies are using N8N but it's good to know N8N there is one more topic that is
also good to know but it's not that you definitely will be needing it you may not be needing it but what I thought is
a lot of people will be using this particular term so when people use that term I want you to realize what exactly
they mean what they are trying to tell so there is a particular jargon that is used called MCP P. So MCP is a very new
concept that has been introduced. MCP stands for model context protocol. So I'll try to give you a very quick brief
of what is MCP whether it is needed or not or why companies use it or at least
basic idea around that so that if somebody says there is an MCP or I'm using an MCP or this is one MCP at least
you will understand what they are talking about. MCP stands for model context protocol. So what companies have
realized especially this MCP has been introduced by anthropic. Anthropic is a company that gives us the claw model LLM
around one year back they told that uh let us introduce a protocol called MCP.
So to make this MCP concept easy I'll try to give you one intuitive example.
The intuition behind MCP goes like this. Imagine you want to book a hotel through an aggregated like make my trip. This is
easy. I want to go to make my trip uh website. on that website I want to book a hotel. So I want to book a hotel in
Bangalore. I want to check in on 12th August. I want to check out on 14th August. Now tell me one thing. Do you
think make my trip have their own hotels or they are aggregators? They are definitely aggregators. They
they do not have their own hotels. So what they do since they don't have their own hotels, they will hit various
websites of the hotel providers. So you have the Leela palace, you have
some any number of hotels are there. So what make my trip does is your request
it will be sent to various websites. They use something called APIs. So Leela Palace have their own database. Who is
booking the website? How many guests are there? How many rooms are full? How many rooms are empty? All that data is stored
in Leela Palace website. Royal Arcade have their own website. How many rooms are there in Royal Arcade and how many
guests are booked? How many rooms are vacant? What room? What costing? All of that information is Royal Arcade website
or Royal Arcade database. Now, if make my trip want to interact with Leela Palace, they will be using an API that
will hit Leela Palace database. If they want to interact with Royal Arit, Make
My Trip will use an API that will be hitting Royal Arcade database. So, this
is how it will look like. So there will be some base URL API like this one users won't see actually you and I we see the
regular website but if you want to send a bot get the information there will be a API that you will be using. So Leela
Palace when it is interacting this is the Leela Palace website this is how I'll carry the information this is the
Royal AR website this is how I'll carry the information it'll get all that information and it'll try to show you
these are the rooms that are available is it clear until here user is asking I want to book tickets or I want to book a
hotel and then there are multiple hotel providers make my trip will talk to those hotel providers using APIs now
this API in the AI terminology API is nothing but a tool. It's just like a tool inside our AI agent. Inside the
agent, you have tool one, tool 2, tool three. Like that you have API 1, API 2, API 3. So if you are using instead of a
Python programming language, if you're using an AI agent and if you are providing multiple tools to AI agent,
then AI agent will decide okay, I have to use this tool for hotel booking, I have to use this tool for hotel uh
selection like that. It will try to use multiple tools. Now the problem with the tools now this is the main intrusion
that I want to highlight here. The problem with the tools is that Leela Palace has its own structure of this
API. Do you think Leela Palace will talk to Royal Arcade and both of them will come up with the same structure or do
you think they don't care everybody have their own API? Leela Palace when they are creating the database when they're creating their API do you think they
talk to other hotels? Is it possible if you have thousand hotels all the thousand hotels have the same database structure same tables? It's not
possible, isn't it? Everybody will say this is my database. This is how I arrange it. And this is my API. If you want to use it, use it. Otherwise, leave
it. The problem that people have identified is there are if you have 10,000 hotels, you will have 10,000 API
different formats. Every API has its own structure. Every API has its own error handling. Every API has its own
authentication method. Every API has its own rate limits. How many times you can hit that uh server inside an hour or
something. It has its own limits. Every API is very very different. Now if your AI agent is handling
thousands and thousands of tools, it has become a headache because we have to follow the protocol that is given by
that API and we have to hardcode everything. That is what the problem that I have seen. And if your AI agent
is doing a very larger task, let's say your AI agent is a travel planner agent
and that will check the weather. There are mult multiple tools for checking the weather. That will do the cap booking.
There are multiple cap providers. Your AI agent is doing hotel checking. There are multiple hotels, multiple tools will be there. Your AI agent is doing flight
checking. Multiple flight uh providers are there. Flight booking, hotel booking, restaurant booking. Now there
will be hundreds and hundreds of tools. Your AI agent may be interacting and within them if APIs are having different
different structure. Every API has its own structure. Then it becomes very difficult for AI agent to handle all
this. We will be spending lot of time in normalizing this data itself. That is a problem that has been seen by lot of AI
agent providers and lot of companies. We need a standard protocol. So everybody thought that we need a standard
protocol. What do you mean by standard protocol? All these tools AI agent must find it very easy to interact with the
tools. As of today AI agent as of today what is happening is AI agent is
interacting with the tools directly. You have one AI agent that is
interacting with the tools. If you have five tools, it is interacting with five tools. If you have 10 tools, if you have 100 tools, a tool means API. If you have
100 APIs, AI agent is interacting with all of them. There is hell lot of code that is sitting inside an AI agent.
There comes model context protocol. The new introduction of model context protocol, what it says is it is like a
universal connector for AI agents. AI agent will talk to MCP server. MCP
server will have all this AI agent tool related logic. Earlier if AI agent is
talking to 500 tools, think about it. It have 500 structures. Imagine one tool
has updated. One API has updated internally or 10 APIs have updated internally. Do you think AI agent will
work or break? You have written the code for the previous API. Now internally
that company maybe Leela Palace has updated their API will it work? Your old code on the new API will it work? You
are asking how many rooms are there in your old protocol? But if they have changed their API, it will not be able to send back the data. Due to that
reason, it was becoming very painful for AI agents to keep track of all of this. We
need a middle layer. So without MCP, an AI agent talks directly to each hotel, each flight booking, each API. With MCP,
AI agent talks to only MCP server. So the server has all the logic to interact with APIs. If something breaks, one API
breaks also. Since AI agent is talking to server, server will handle all these issues.
Now the reason why I'm bringing this here is a lot of companies right now. Earlier they used to give APIs now they
are giving MCP server. That means they are creating MCP servers. Your AI agent
instead of talking to your APIs now it'll talk to MCP server. So that company will take the headache of
updating their APIs. Everything will be outside the AI agent's reach. It will just talk to MCP server. This will have
the standard protocol. Let me give you one example. If you take the example of searching flights, booking flights,
searching hotels, booking hotels. Let's say you have an AI agent which will search the flights, book the flights. It'll search the hotels, book the
hotels. If you are doing it without MCP server, if you're doing if you're talking with
every AI agent. So for searching flights, so if you write a function plan a trip without MCP, if you're planning a
trip, you have to search by using airline one, one API, aine 2, another
API, aine 3, aine 4, like that. If you have 50 airlines or 10 airlines, you have to write 10 API protocols. Each one
of them may be different. There will be a lot of duplication inside the agent. And then once you find the right flight, you will book it. And then if you're
talking to hotels at least flight providers are lesser but hotels will be thousands and thousands. You talk to all
those thousands and thousands of APIs there will be hell lot of code inside this. That is without MCP. With MCP what
will happen? You have one logic. I just want to book a flight from one place one to place two. I just want to book a
hotel from this date to this date and this is the packs. Everything else even
the APIs will be there. That will be there in MCP server. Now here if you're adding a new flight you're changing AI agent whereas earlier your agent is
right now talking to MCP server inside the server you just make an update you will be doing all this is the backend
code of the server. So without MCP AI agents talks directly to the hotel and
if there is any update in the API AI agent must handle it by itself. Now what
anthropic has proposed is AI agent talk to the MCP server only. MCP server
indeed talks to all the APIs. So a simple way to look at it is a lot of people call this MCP server as the
middle layer. Earlier you are connecting every AI agent to your tools but now MCP
server acts as a middle layer. A lot of people call this MCP server as a wrapper around the tools. The reason why I'm
saying this is a lot of companies have now started giving MCP servers. Their MCP servers you can handle them. If
you're working with an MCP server, your AI agent will find it very easy to handle all these tool updates etc. One
of one such example which will be easy for you to understand would be let's say have you heard of this Zerodha? What is
Zerodha? Anybody? Zeroda is a company where you can do the
trading like uh you can create an account, you can buy the stocks, you can sell the stocks. earlier if I want to
use Python code and if I want to do any of the algorithmic trading let us suppose if I want to say if the company
stock comes down by these many points I want to buy it earlier you have to use their API key now if the API updates you
have to update it so kite is a platform where you can uh do all this algorithmic trading etc fast trading you can do the
systematic uh trading without human intervention you can almost AI agent based trading you can do it earlier Here
zeroda used to give an API. Now what they doing? Zerodha is giving MCP server. Now why MCP server is needed? If
you have MCP server then your AI agent will talk to your MCP server and it will
become much much easier. Earlier somebody has to set their API key. Earlier they have to write lots of code.
Now you don't need any code. Let me show you certain examples. Now Zeroda gives MCP server. The user will simply once
you set up that user will ask a simple question. For example, the user has asked this question. Analyze your
portfolio performance. Identify this. Or let me show another question. I think this is just the explanation. So you can
ask, please provide a summary of today's market condition including major index movement, sector performance, and
notable news affecting my holdings, stock, usual volume, and plan of action. The user will ask a plain question like
this. This will hit the MCP server. Whichever tools that are required will be used in giving you the answer. The
previous question is please group my open positions based on underlying and calculate net delta of my option
strategies. So earlier if you ask such kind of question you have to write your own functions to answer this. But now
this question will go to your AI agent which will interpret and it'll find what are the right tools based on those tools
your answer will be given to you. I'm not very sure that each one of you you may not be working with MCP but I
thought I should introduce this to you because you may hear this term MCP. Once you hear this term MCP, I want you to
realize that instead of directly talking with an AI agent, directly talking to tools, there's something in between. But
it doesn't mean that everybody uses MCP. If you see hundreds and hundreds of tools, then only MCP server makes sense.
If there are only one or tools that one or two or three or four tools that you are using, then MCP server is not
needed. And this is MCP server protocol that has been proposed by cloud. If everybody follows that MCP server
protocol, then only this will become a hit. If companies say that why should I follow I'm not interested in MCP server
then this will not be going to be a big deal. So we have to wait and see whether everybody will accept MCP server or not.
As of now people are just looking at it whether uh it will be really uh adopted
in every industry or every company that we have to wait and see. As of now as a conclusion concluding point I can tell
you that AI agent talk to MCP server. MCP server has all the tool logic inside that. So it is just a middle layer
between your AI agent and the tools. Okay, that is what I want you to realize. Any question on this? Quickly
continue with the next video in the playlist. We are covering everything step by step. If you have any questions
or the comments, please post them in the comments window below.