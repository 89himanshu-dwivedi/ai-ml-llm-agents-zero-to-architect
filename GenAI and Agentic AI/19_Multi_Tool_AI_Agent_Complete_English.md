# Building a Multi-Tool AI Agent — Complete Study Notes (English)

> **Source-based notes:** This document organizes the supplied transcript into a study-friendly structure. The original transcript is preserved in Appendix A. Practical additions beyond the transcript are clearly separated.

## 1. Video Context

- The speaker identifies themself as “Wenut”; some words in the transcript may be speech-to-text errors.
- The video is part of a series. The speaker recommends completing the previous videos in the playlist first.
- Playlist details, learning materials, and code-file information are said to be available in the video description.
- The assignment is presented as a major learning milestone for the course.

## 2. From RAG to AI Agents

The speaker describes a broad progression in AI adoption:

1. Many teams are currently experimenting with Retrieval-Augmented Generation (RAG).
2. Teams are gradually moving toward AI agents.
3. In the speaker’s framing, building a RAG application is a useful milestone, while building a multi-tool agent is a more advanced step.
4. The speaker expects more companies to start building AI agents.

**Core idea:** The goal is not merely to retrieve documents and answer questions. It is to build an agent that can select different tools according to the user’s request.

## 3. Project Goal: One Multi-Tool Agent

The project aims to build one conversational agent that can answer several kinds of questions about a company or domain. The company name appears in multiple speech-to-text variants, including “Novate” and “Novatis.”

The agent will have four major capabilities:

1. **SQL tool** — retrieve information from structured databases.
2. **Python tool** — perform calculations, process data, and create visualizations.
3. **RAG tool** — retrieve relevant information from private/internal documents.
4. **Web-search tool** — find current or public information on the internet.

The user asks questions in natural language. The agent must determine which tool, or combination of tools, can answer the request.

## 4. Tool 1 — SQL for Structured Data

### 4.1 When should SQL be used?

Use the SQL tool when the answer is stored in a structured company database.

**Examples from the transcript:**
- What was the revenue from a particular client in the first quarter?
- Compare first-quarter revenue with second-quarter revenue.
- Retrieve sales data for the last 12 months.

### 4.2 Expected workflow

1. The user asks a question in natural language.
2. The agent identifies that the answer requires database information.
3. The agent invokes the SQL tool.
4. The SQL query retrieves relevant rows or aggregates.
5. The agent explains the results in a user-friendly response.

### 4.3 Access control

The speaker indicates that database answers should be available only to users with appropriate access, such as internal stakeholders or business partners. An AI agent should not become a route around existing database permissions.

## 5. Tool 2 — Python for Analysis and Visualization

### 5.1 When should Python be used?

Use the Python tool when the user requests calculations, transformations, analysis, or a graph based on retrieved data.

**Example from the transcript:**
- “Show me the last 12 months of sales data and give me a trend chart.”

### 5.2 Combined SQL and Python workflow

1. SQL retrieves the last 12 months of sales data.
2. Python processes the data.
3. Python creates the trend chart or visualization.
4. The agent presents the chart and key observations.

**Key distinction:** SQL is used to retrieve the data; Python is used for calculations and visualization. The exact division of responsibility depends on the implementation.

## 6. Tool 3 — RAG for Private Documents

When the question concerns private company documents, internal policies, reports, manuals, or a knowledge base, the agent should use the RAG tool.

### Role of RAG
- Retrieve relevant document chunks.
- Generate an answer using the retrieved context.
- Handle questions grounded in internal documents.

The transcript does not describe the internal implementation of RAG; it positions RAG as one tool available to the agent.

## 7. Tool 4 — Web Search for Internet Information

When the question requires public or current internet information, the agent should use web search.

**Examples from the transcript:**
- What is the company’s current stock price?
- Why is the stock price decreasing?
- What is the sentiment of users about the company?

The speaker mentions SERP API or “table search” (the wording in the transcript) as possible search options. The transcript does not settle on a specific provider.

**Important:** Questions about stock prices and sentiment depend on freshness and source quality.

## 8. Overall Architecture and Routing

High-level architecture:

```text
User
  |
  v
AI Agent / Orchestrator
  |
  +--> SQL Tool ------> Structured database
  |
  +--> Python Tool ---> Calculations / charts
  |
  +--> RAG Tool ------> Private documents / knowledge base
  |
  +--> Web Search ----> Public internet
  |
  v
Final response to user
```

### Main responsibilities of the agent
- Understand the user’s intent.
- Select the appropriate tool.
- Sequence multiple tools when necessary.
- Combine tool outputs into a final response.

### Example of a multi-tool request
“Retrieve sales for the last 12 months, create a trend chart, and compare it with the target in the internal report.”

A possible workflow:
1. Use SQL to retrieve monthly sales.
2. Use Python to calculate comparisons and generate the chart.
3. Use RAG to retrieve the target from the internal report.
4. Combine the findings into a final answer.

This combined scenario is an assistant-added illustration. The transcript gives separate examples for these capabilities.

## 9. How to Build the Assignment

The speaker’s suggested sequence is:

1. Install and import the required packages.
2. Create the SQL database. The speaker says database-creation instructions are included in the assignment material and notes that other databases or commands may also be possible.
3. Create the SQL tool. The speaker estimates that a basic implementation may be short.
4. Create a web-search tool. The transcript mentions SERP API or “table search.”
5. Create the Python tool.
6. Create the RAG tool, which the speaker says may require comparatively more code.
7. Wrap or decorate each function as a tool.
8. Create the agent.
9. Provide the SQL, web-search, Python, and RAG tools in the agent configuration.
10. Run sample questions and verify the results.

The speaker says detailed instructions and sample code are available and recommends following the assignment structure.

## 10. Why the Assignment Matters

The speaker encourages learners to attempt the assignment before looking at the solution, fail, debug, and try again. This should make the solution easier to understand later.

The speaker’s motivational points:
- Understanding this code file end to end would be a major course outcome.
- Learners are given a couple of weeks to complete the assignment.
- The speaker plans a later interaction to review the solutions.
- The video closes by congratulating learners on completing the course.

## 11. Practical Testing Checklist

| Test | Expected tool |
|---|---|
| Client’s quarterly revenue | SQL |
| Q1 vs. Q2 revenue comparison | SQL; Python if useful |
| 12-month sales trend chart | SQL + Python |
| Answer from an internal policy/document | RAG |
| Current public stock information | Web search |
| Combine information from multiple sources | Multiple tools, sequenced by the agent |

This table reorganizes the transcript’s examples into a testing checklist.

## 12. Errors, Gotchas, and Limitations

### 12.1 Incorrect tool selection
If the agent uses the same tool for every question, the architecture loses much of its value. Tool descriptions should be clear and distinct.

### 12.2 Access control
Do not configure credentials or permissions so that the agent can expose unrestricted private data to any user. Enforce user authorization in the backend/tool layer.

### 12.3 SQL safety
Directly concatenating natural-language input into unsafe SQL strings is risky. Consider read-only database roles, parameterized queries, approved tables/views, query restrictions, and row limits.

### 12.4 Visualization output
Validate data formats, date ordering, missing values, and chart output when creating visualizations with Python.

### 12.5 RAG grounding
Document-grounded answers benefit from evidence and source references. If the documents do not contain the answer, the agent should state that uncertainty rather than inventing information.

### 12.6 Web freshness
Stock prices and sentiment change quickly. Check timestamps, source credibility, and freshness.

### 12.7 Multi-tool orchestration
Some requests require multiple tools. Before combining outputs, verify that date ranges, units, and definitions are consistent.

## 13. Advanced and Super-Advanced Design Considerations
> **Assistant-added practical guidance — beyond the transcript**

- **Tool routing:** Use precise tool names and descriptions. Overlapping descriptions can cause ambiguity.
- **Least privilege:** Give each tool only the permissions it needs.
- **Auditability:** Maintain safe audit logs of requests, selected tools, query metadata, results, and final responses.
- **SQL guardrails:** Use approved tables/views, read-only roles, timeouts, row limits, and query validation.
- **Python sandboxing:** Isolate arbitrary code execution and restrict file/network access.
- **RAG citations:** Include document, page, or chunk references where possible.
- **Web-search reliability:** Corroborate important claims with credible sources.
- **Evaluation:** Define test questions and expected results for each tool category.
- **Fallback behavior:** If a tool fails, data is missing, or access is denied, return a clear message instead of fabricating an answer.
- **Human approval:** Add approval steps for sensitive actions or high-impact operations.

## 14. Interview Questions and Short Answers

### Q1. What is the difference between RAG and an AI agent?
**Answer:** RAG retrieves information and supplies it as context to an LLM. An AI agent can select and sequence tools to achieve a goal. RAG can itself be one tool used by an agent.

### Q2. When should SQL and RAG tools be used?
**Answer:** SQL is appropriate for structured relational data and aggregations. RAG is appropriate for retrieving relevant context from unstructured or private documents.

### Q3. Why use Python if SQL can perform calculations?
**Answer:** Some aggregations are best handled in SQL, while Python is useful for complex processing, analysis, and visualization. Not every calculation needs to be moved to Python.

### Q4. How does an agent decide which tool to call?
**Answer:** The model chooses based on the request, available context, and tool descriptions. Production systems should add validation and policy checks.

### Q5. How can database access be secured?
**Answer:** Enforce backend authorization, least-privilege credentials, approved views, query restrictions, audit logging, and sensitive-field protection.

### Q6. Should current stock-price questions use RAG or SQL?
**Answer:** In the transcript’s design, web search is intended for current internet information. A trusted market-data API or database could also be exposed through a dedicated tool.

### Q7. How should a multi-tool agent be tested?
**Answer:** Test each tool independently, then test routing, multi-step workflows, denied-access scenarios, tool failures, conflicting data, and final-answer quality.

### Q8. What are the main risks?
**Answer:** Incorrect tool selection, excessive data permissions, unsafe SQL/Python execution, stale web information, and incorrectly combining tool outputs.

## 15. Best Fit, Trade-offs, and Use Cases

### Suitable use cases
- Internal business analytics assistant.
- Sales and revenue reporting assistant.
- Private policy/document Q&A.
- Data analysis and chart generation.
- Public web research combined with internal knowledge.

### Benefits
- One conversational interface for multiple sources.
- Handles structured and unstructured data.
- Supports analysis and visualization within the workflow.
- Tool-based architecture can be modular.

### Trade-offs
- More complex than a single-tool chatbot.
- Higher overhead for permissions, testing, observability, and maintenance.
- Tool errors and inconsistent data can affect responses.
- Multiple calls can increase latency and cost.

### Practical recommendation
Verify SQL, RAG, Python, and web search independently first. Add agent routing afterward, then test multi-tool requests. Design permissions and safety controls before connecting all tools.

## 16. Summary / Quick Revision

- The project aims to build a **multi-tool AI agent**.
- **SQL** retrieves structured database information.
- **Python** performs calculations, data processing, and visualization.
- **RAG** retrieves context from private documents or a knowledge base.
- **Web search** retrieves public/current internet information.
- The agent selects one or more tools based on user intent.
- Assignment sequence: packages → database → tools → tool wrappers/decorators → agent → test questions.
- Security, authorization, validation, freshness, and testing are essential for production quality.

## 17. LinkedIn Post Draft

I’m learning how to build a multi-tool AI agent that goes beyond basic RAG.

The idea is to create one conversational interface that can:
- Query structured business data with SQL
- Analyze data and generate charts with Python
- Answer internal-document questions using RAG
- Retrieve current public information through web search

The key lesson is that an agent is not just an LLM connected to tools. Reliable tool routing, access control, validation, testing, and clear failure handling are equally important.

A useful learning path is to build and test each tool independently, then orchestrate them through an agent.

#AI #GenerativeAI #AIagents #RAG #Python #SQL #DataAnalytics

---

# Appendix A — Original Transcript (Preserved)

The transcript below is retained as provided by the user, including apparent speech-to-text errors and original wording.

Search in video
Hi, this is Wenut. We just turned into
wanker ready classes. This video is part
of a series. Complete the previous
videos in this playlist [music] before
you start this video. The complete
playlist information, the material and
the code file information is given in
[music] the video description below.
This project is about building an AI
agent. The whole world is kind of stuck
at one step before this. I will not say
stuck. I would say the whole world is
trying rag. So right now people are here
maximum number of people, maximum number
of teams that I have seen they're trying
out rags. Slowly they are entering
agents. So now we are talking about the
latest technology of creating AI agent.
If you can create a rag that means you
are up to date. If you're creating an AI
agent that means you are pretty good. A
lot of companies haven't started
building AI agents yet but they are
going to do that very soon. So we are
going to create an AI agent which is
little complex. This AI agent is going
to hit our databases get the relevant
information. That means if the customer
is asking a very technical questions
very technical question that need to be
answered by looking at our databases
then AI agent does that job. Let us
suppose I'm talking about this company
only Novate. Now instead of asking what
are the solutions given by noase if my
question is what is the revenue from
this particular client
in the first quarter and compare it with
the second quarter. If I ask such
questions the answers will be in the
proper databases if the user has the
proper access or like users are our
internal stakeholders only or users are
our business partners only. If we are
creating an AI agent that will answer
the user questions properly
by hitting a database then we will be
using SQL tool. So inside an AI agent AI
agent will have a discussion with the
user and the user is asking a technical
question related to our internal
database then it should hit the SQL tool
and while he's asking a question if
there's a calculation that is required
he said that after getting the
information give me a graph or give me a
visualization. For example, show me the
last 12 months uh sales data and give me
a trend chart. For creating a trend
chart, so to extract the last 12 month
sales data, our AI agent will use SQL
tool. And then for creating a trend
chart, it will it should use Python
tool. If the user is asking questions
related to our private documents, the AI
agent must use rag tool. That means you
want to have one place, one AI agent for
everything. This is like the super AI
agent that should be able to answer any
question related to a particular field.
It can get the data from SQL. It can do
operations in Python, create
visualizations, it can answer the
questions from rack or if at all it has
to search the internet. Let's say if you
ask questions like what is the Novat's
current stock price or why Novate is
stock price is decreasing or what is the
sentiment of the users about Novatis
like that. If you want to get the
information from internet that also we
want to get it. So basically we want to
have one AI agent that is super super
powerful. It does structured querying.
It does visualizations. It does
retrieval augment generation. It does
web search.
This is the AI agent that we want to
create. So this is like a little complex
than whatever we have done until here.
It doesn't mean that you cannot do it by
using your chat GPT here and there by
looking at our code itself. If you go
through our course, if you look at our
code, you should be able to create like
this. I have given very detailed
instructions so that when you're trying,
you should find it very easy. If you
read it automatically, you should be
able to get it. I have also given the
sample code at the end of it. If you
click on this link,
I have given kind of structure that you
must follow. So the same thing, the
assignment instructions. So the SQL
database creation also I have given. If
you go down,
so you'll start with packages. You can
create SQL database or you can create it
by using other databases other commands
also. And then you first create the SQL
tool. It hardly takes five six lines of
code or 10 lines of code and then wrap
it as a tool. Decorate it as a tool. You
create a web search tool by using SER
API or table search. Maybe 10 lines of
code. Here Python tool four lines of
code. rag it is slightly higher number
of uh lines of code and then finally you
create an agent and mention inside that
agent tool one tool two tool three tool
four and then you give these questions
you get the answers overall the
functionalities of agents are very very
complex but creating an agent should not
be very complex can you do this all of
you can you try it out
yes sir
yes sir
I'm telling you if there's anything very
serious about this course then this This
is one that you should do. If you just
say that I know this end to end only
this one this code file I know this end
to end that is sufficient. It is a
success for you because 99.9%
of the data scientist haven't reached
this phase yet anyway I'll give the
solution you try it you try fail try
fail then next time when I show the
solution you will just understand it
like uh very easily. Okay you give it a
try for sure. Okay, I'll give a couple
of weeks time for you to complete these
assignments and then I will announce one
more uh interaction with you. In that
I'll go through the solutions. Is that
clear everyone?
Yes sir.
Yes sir.
Yes sir.
Congratulations. You have completed the
course now. You can check the rest of
the courses in our playlist. I'll be
adding few more videos in this playlist
as well. Once again congratulations. On
the best.
