# Agentic AI --- Complete Structured Study Notes

> **Source:** Uploaded transcript\
> **Approach:** The transcript is reorganized into a logical learning
> flow. Source concepts and examples are preserved. **Assistant-added
> guidance** is clearly separated at the end.

------------------------------------------------------------------------

# 1. Introduction to Agentic AI

## 1.1 Moving from GenAI to Agentic AI

The session introduces **AI Agents / Agentic AI**.

Earlier the main focus was:

``` text
Generative AI
    ↓
LLMs
    ↓
Prompt
    ↓
Generated Answer
```

The next stage is:

``` text
GenAI
  ↓
Agentic AI
```

The basic idea is that an LLM should not only generate an answer. When
necessary, it should be able to **use tools, create an action plan,
perform actions, observe results, iterate, and then produce the final
answer**.

------------------------------------------------------------------------

# 2. Basic Working of Generative AI / LLMs

The transcript explains an LLM primarily as a **next-token generation
engine**.

Flow:

``` text
User Prompt
    ↓
Tokens
    ↓
Next-token prediction
    ↓
More tokens
    ↓
Meaningful stopping point
    ↓
Generated output
```

LLMs can generate:

-   Text
-   Images/video through generative applications
-   Other generated content

However, standalone LLMs have limitations.

------------------------------------------------------------------------

# 3. Limitation #1 --- Outdated Knowledge

Transcript example:

> "Who is the current president of India?"

In the tutorial environment, the model produced an outdated answer based
on older knowledge.

The instructor's point is:

``` text
Training Data
     ↓
Knowledge cutoff
     ↓
LLM knowledge
```

If an event occurs after the relevant training/cutoff information, a
standalone LLM may not reliably know the current information.

### Mental Model

Think of the LLM as a smart person with limited historical exposure:

``` text
Smart Brain
+
Limited historical knowledge
```

If that person has only seen events up to a certain point, they cannot
reliably answer later current-event questions.

------------------------------------------------------------------------

# 4. Solution --- Tool Use

If the LLM is given an internet-search tool:

``` text
User Question
      ↓
LLM
      ↓
Needs current information
      ↓
Internet Search Tool
      ↓
Current information
      ↓
LLM
      ↓
Answer
```

This introduces the basic idea of **Agentic AI**.

------------------------------------------------------------------------

# 5. What Are AI Agents?

The transcript's basic definition is:

> AI agents are software programs that attempt to perform tasks in a
> human-like manner.

Human behavior:

``` text
Question
   ↓
Think
   ↓
Need information?
   ↓
Use a tool
   ↓
Observe result
   ↓
Think again
   ↓
Take next action
   ↓
Final answer
```

An agent attempts to imitate this pattern.

------------------------------------------------------------------------

# 6. Limitation #2 --- Mathematics

Examples:

``` text
2 + 2
Square root of 253
```

The transcript explains that a standalone LLM should not be treated as a
calculator.

Conceptually:

``` text
"2"       → representation
"+"       → representation
"2"       → representation
              ↓
          LLM processing
              ↓
        Generated output
```

An LLM is not fundamentally a deterministic mathematical computation
engine.

### Better Approach

Instead of asking the LLM to directly perform the computation:

``` text
User: Calculate 2 + 2
        ↓
LLM understands requirement
        ↓
Python / Calculator Tool
        ↓
2 + 2 = 4
        ↓
LLM gives final answer
```

------------------------------------------------------------------------

# 7. Brain + Tools = Agent

Core mental model:

``` text
              AI AGENT
                  │
       ┌──────────┴──────────┐
       ▼                     ▼
     Brain                 Tools
      │                      │
     LLM             Calculator/Search/etc.
      │
      ▼
 Action Plan / Reasoning
```

The transcript simplifies this as:

> **Agent = LLM reasoning + Tools**

The LLM:

-   Understands human instructions.
-   Creates an action plan.
-   Determines whether a tool is needed.
-   Uses a tool.
-   Observes the result.
-   Can iterate.
-   Generates the final answer.

------------------------------------------------------------------------

# 8. How Agents Mimic Human Tasks

Example:

**Question:** "What is the temperature in London?"

Human:

``` text
I don't know the temperature
       ↓
Check the internet
       ↓
Search
       ↓
Inspect result
       ↓
If first result is insufficient
       ↓
Check another result
       ↓
Final temperature
```

AI Agent:

``` text
Question
   ↓
Think
   ↓
Internet tool required
   ↓
Search query
   ↓
Observation
   ↓
Enough information?
  ├── No → Search again
  └── Yes
        ↓
     Final answer
```

------------------------------------------------------------------------

# 9. ReAct Framework --- Reasoning and Acting

The transcript explains an agent's internal workflow using a
**ReAct-style** pattern.

ReAct = **Reasoning + Acting**

Basic cycle:

``` text
Thought
  ↓
Action
  ↓
Action Input
  ↓
Observation
  ↓
Thought
  ↓
Action
  ↓
Observation
  ↓
Repeat
  ↓
Final Answer
```

Example:

``` text
Question:
Temperature in London?

Thought:
I need current information.

Action:
Internet Search

Action Input:
Today's temperature in London

Observation:
Search results

Thought:
First result is insufficient.

Action:
Search again / inspect another result

Observation:
Useful result

Thought:
I have the answer.

Final Answer:
...
```

------------------------------------------------------------------------

# 10. Main Components of an AI Agent

## 10.1 User Input

The user provides a requirement.

## 10.2 LLM --- Brain

The LLM understands the instruction and creates an action plan.

## 10.3 Prompt --- Action Plan

The prompt can define:

-   Available tools
-   How tools should be used
-   How the answer should be produced
-   The expected thought/action/observation structure

## 10.4 Tools

Examples:

-   Internet search
-   Calculator
-   Python
-   Wikipedia
-   Google Search
-   Finance tools
-   APIs
-   Cloud tools
-   File/data tools

## 10.5 Agent

Combines the brain, tools, and action plan.

## 10.6 Agent Executor

Executes the agent, often through an iterative loop.

``` text
Agent
 ↓
Agent Executor
 ↓
Think → Act → Observe
 ↓
Repeat
 ↓
Final Answer
```

------------------------------------------------------------------------

# 11. Agents Are Not Perfect

The transcript explicitly warns that AI agents are not 100% perfect.

Possible problems:

-   Inconsistent results
-   Sometimes works, sometimes errors
-   Re-execution may be required
-   Excessive token consumption
-   Token limits can be exhausted
-   Too many iterations
-   Wrong tool selection
-   Timeout errors
-   Parsing errors
-   Incorrect search results
-   Tool limitations

Therefore agent systems need testing, monitoring, and error handling.

------------------------------------------------------------------------

# 12. First Agent --- Tavily Search

The first practical example uses **Tavily Search** as an internet-search
tool.

Goal:

``` text
LLM alone
   ↓
Cannot reliably answer current events

LLM + Tavily Search
   ↓
Retrieve current information
   ↓
Answer
```

------------------------------------------------------------------------

# 13. Tavily API Key

External tools require API credentials.

Typical flow:

``` text
Tavily
 ↓
Sign up / Login
 ↓
API Key
 ↓
Environment variable
 ↓
Application
```

The transcript demonstrates keeping the key in the environment.

> API keys should not be hard-coded into source code.

------------------------------------------------------------------------

# 14. Tavily Search Tool

The transcript uses an example such as:

``` text
Tavily Search
+
max_results = 4
```

Meaning:

``` text
Search
 ↓
Multiple results
 ↓
Take first 4
```

The instructor explains that limiting results can help control API
usage/rate limits.

------------------------------------------------------------------------

# 15. Action Plan as Prompt

An agent needs more than an LLM and tools.

It needs instructions such as:

``` text
You have these tools.
Use them when required.
Respond helpfully and accurately.
Follow the required thought/action/observation structure.
```

LangChain provides agent prompt/action-plan templates.

Mental model:

``` text
LLM = Brain
Tools = Capabilities
Prompt = Action Plan
Agent = Combined system
Executor = Runs the loop
```

------------------------------------------------------------------------

# 16. Creating the Agent

Manual architecture:

``` text
Define LLM
     ↓
Define Tools
     ↓
Define Prompt
     ↓
Create Agent
     ↓
Create Agent Executor
     ↓
Invoke
```

The transcript demonstrates a structured agent approach conceptually
like:

``` text
create_structured_chat_agent
        ↓
agent
        ↓
agent_executor
        ↓
invoke(question)
```

------------------------------------------------------------------------

# 17. Role of the Agent Executor

The Agent Executor manages iterative execution:

``` text
Question
   ↓
Think
   ↓
Tool
   ↓
Observation
   ↓
Think
   ↓
Tool
   ↓
Observation
   ↓
Final Answer
```

If the first result is insufficient, the agent can perform another
action/tool call.

------------------------------------------------------------------------

# 18. `verbose=True`

During development:

``` python
verbose=True
```

can expose backend execution.

Useful for:

-   Inspecting agent actions
-   Understanding tool selection
-   Debugging
-   Seeing iterations

Important distinction:

``` text
Verbose trace
    ≠
Final user answer
```

If only the final answer should be shown:

``` text
verbose=False
```

------------------------------------------------------------------------

# 19. Current President Example

With a search tool:

``` text
Question:
"What is the current president of India?"
       ↓
LLM
       ↓
Search tool
       ↓
Search results
       ↓
Agent observes
       ↓
Final answer
```

Main lesson:

> A tool can provide external/current information that the standalone
> LLM does not reliably have.

------------------------------------------------------------------------

# 20. Search Quality Matters

The cricket-score example gives an important observation.

Question:

> What is the current cricket score between India and South Africa?

A generic search engine may return a general news result. Ideally, a
specialized sports source/tool would be more appropriate.

### Lesson

> Agent quality depends not only on the LLM but also on the quality and
> suitability of its tools.

------------------------------------------------------------------------

# 21. Generative AI vs Agentic AI

  Generative AI                        Agentic AI
  ------------------------------------ ----------------------------------------
  Prompt → Generated output            Goal → Reason → Act → Observe → Answer
  Mostly standalone generation         LLM + tools
  Knowledge limited to model/context   Can access external tools
  Direct generation                    Iterative execution possible
  Calculation can be unreliable        Can use calculator/Python
  No automatic tool use                Can select/use tools

### Golden Difference

> **Generative AI generates; Agentic AI can determine what action/tool
> is needed and execute it.**

------------------------------------------------------------------------

# 22. Why Tavily Instead of Google?

The instructor's tutorial-era explanation:

-   Tavily's free API usage was convenient.
-   Google APIs can have different restrictions/limits.
-   Multiple search providers are available.

Mentioned alternatives include:

-   Google
-   Bing
-   Tavily
-   Other search APIs

The core architectural idea is **tool-based external search**, not one
specific search provider.

------------------------------------------------------------------------

# 23. API Keys and Practice Setup

The transcript asks learners to:

-   Install required packages.
-   Keep API keys ready.
-   Store keys in the environment.
-   Arrange OpenAI API access for practice.

The transcript also contains a tutorial-era discussion about API-key
cost.

------------------------------------------------------------------------

# 24. Version Compatibility Issue

A package/import compatibility issue appears in the transcript.

The instructor explains that recent package/version changes can cause
tutorial code to throw errors.

Lesson:

``` text
Tutorial code
     ↓
Package evolves
     ↓
API changes
     ↓
Import/version issue
```

Therefore tutorial code may need adaptation to the current package/API.

------------------------------------------------------------------------

# 25. Full Agent Workflow

``` text
                 USER
                   │
                   ▼
               Question
                   │
                   ▼
                  LLM
                (Brain)
                   │
                   ▼
             Action Plan
                   │
                   ▼
            Choose a Tool
                   │
                   ▼
              Tool Call
                   │
                   ▼
              Observation
                   │
                   ▼
           Is answer enough?
              /          \
            No            Yes
            │              │
            ▼              ▼
       Think again      Final Answer
            │
            └──────→ Tool / Action
```

------------------------------------------------------------------------

# 26. Square Root Example --- One Tool Is Not Enough

Question:

> What is the square root of 535?

If the only available tool is:

``` text
Internet Search
```

the agent may search the web.

A better tool is:

``` text
Math Question
     ↓
Calculator / Math Tool
     ↓
Exact computation
```

Examples:

``` text
Current event
     ↓
Search tool

Mathematical calculation
     ↓
Calculator/Python tool
```

------------------------------------------------------------------------

# 27. Structured Chat Agent vs ReAct Agent

The transcript discusses two agent styles.

## Structured Chat Agent

Example concept:

``` text
create_structured_chat_agent
```

## ReAct Agent

ReAct means:

> Reasoning and Acting

Pattern:

``` text
Thought
 ↓
Action
 ↓
Observation
 ↓
Thought
 ↓
Action
 ↓
Final Answer
```

------------------------------------------------------------------------

# 28. How Different Are They?

The transcript's practical explanation is that their broad architecture
is similar:

``` text
LLM
 +
Tools
 +
Prompt / Action Plan
 +
Agent Execution
```

Differences can appear in:

-   Prompt structure
-   Action-plan format
-   Tool interaction format
-   Framework/API implementation

------------------------------------------------------------------------

# 29. Wikipedia Tool

The ReAct example uses Wikipedia as a tool.

Flow:

``` text
Question
 ↓
ReAct Agent
 ↓
Wikipedia
 ↓
Observation
 ↓
Reasoning
 ↓
Final Answer
```

Example topics include:

-   UPI/cyber-crime-related question
-   World War II

------------------------------------------------------------------------

# 30. ReAct Prompt

The demonstrated structure is approximately:

``` text
Question
 ↓
Thought
 ↓
Action
 ↓
Action Input
 ↓
Observation
 ↓
Thought
 ↓
Repeat
 ↓
Final Answer
```

The agent can iterate until it obtains sufficient information.

------------------------------------------------------------------------

# 31. Hiding Verbose Output

Question:

> Can the internal agent process be hidden so the user sees only the
> final answer?

Yes.

Development:

``` text
verbose=True
```

Production/user-facing:

``` text
verbose=False
```

The verbose trace is mainly for understanding/debugging.

------------------------------------------------------------------------

# 32. LLM Math Tool

The next major tool is **LLM Math**.

Purpose:

> Perform mathematics-related operations through a specialized
> calculation mechanism.

Architecture:

``` text
User math question
       ↓
LLM understands question
       ↓
Question → Python/math expression
       ↓
Python/calculator execution
       ↓
Exact result
       ↓
Final answer
```

------------------------------------------------------------------------

# 33. Why Does LLM Math Need an LLM?

The transcript makes an important distinction.

User asks:

> What is the cube root of 999?

The mathematical engine needs an executable expression, while the
natural-language question first needs interpretation.

``` text
Natural Language
       ↓
LLM
       ↓
Python expression
       ↓
Python execution
       ↓
Result
```

------------------------------------------------------------------------

# 34. Multiple Tools

An agent can receive multiple tools.

Example:

``` text
Tool 1 → Search
Tool 2 → Calculator
```

Question:

> When was MS Excel first released, and how many years ago was that?

The agent can perform:

1.  Search → release year
2.  Calculator → current year − release year

------------------------------------------------------------------------

# 35. Multi-Tool Agent Example

Transcript example:

``` text
Question:
When was MS Excel first released?
How many years back?

       ↓

Search Tool
       ↓
Release year = 1985

       ↓

Calculator
       ↓
2025 - 1985 = 40

       ↓

Final Answer
40 years
```

The key lesson is that one agent can combine multiple tools for a
multi-step task.

------------------------------------------------------------------------

# 36. Tool Selection

If the agent has:

``` text
Search
Calculator
```

Question:

> Area of a cube with side 5?

Calculator is sufficient.

Question:

> When was X released and how many years ago?

Search + Calculator are both required.

The agent should select tools according to the task.

------------------------------------------------------------------------

# 37. Coding Confidence

The instructor gives practical advice:

> Do not panic when you see a coding error.

Common causes:

-   Typo
-   Import issue
-   Version mismatch
-   Wrong parameter
-   Tool configuration

Good debugging mindset:

``` text
Error
 ↓
Understand
 ↓
Debug
 ↓
Fix
 ↓
Continue
```

------------------------------------------------------------------------

# 38. LangChain Tool Ecosystem

Tools mentioned include:

-   Search
-   AWS tools
-   Bash tools
-   Google Drive
-   Google Finance
-   Bing
-   Brave
-   Tavily
-   11Labs
-   Python REPL
-   Image generation
-   Google Places API
-   Wikipedia
-   Yahoo Finance
-   YouTube
-   Stack Exchange

The overall idea:

``` text
LLM
 ↓
Different capabilities through tools
```

------------------------------------------------------------------------

# 39. 11Labs

The transcript describes 11Labs as a **text-to-speech** tool.

Flow:

``` text
LLM text output
      ↓
11Labs
      ↓
Speech/audio
```

Use case:

> Convert generated text into speech.

------------------------------------------------------------------------

# 40. Python REPL

Python REPL can provide programmatic execution:

``` text
Natural language
      ↓
LLM
      ↓
Python code
      ↓
Execution
      ↓
Result
```

------------------------------------------------------------------------

# 41. From Custom Agents to Toolkits

Earlier:

``` text
LLM
+
Tools
+
Prompt
+
Agent
+
Executor
```

was manually assembled.

Now:

``` text
Ready-made Toolkit
       ↓
Prebuilt Agent
       ↓
Less manual implementation
```

------------------------------------------------------------------------

# 42. CSV Agent Toolkit

The transcript introduces a CSV toolkit.

Concept:

> Upload a CSV and ask natural-language questions about the data without
> manually writing every analysis script.

Example questions:

-   What are the column names?
-   What is the minimum?
-   What is the maximum?
-   What is the average?
-   Are there outliers?

------------------------------------------------------------------------

# 43. CSV Agent Architecture

``` text
CSV File
   ↓
CSV Agent Toolkit
   ↓
LLM understands question
   ↓
Generate analysis code
   ↓
Python/Pandas execution
   ↓
Data analysis
   ↓
Final answer
```

------------------------------------------------------------------------

# 44. Example --- Column Names

Question:

> What are the column names?

Conceptually, the generated analysis may perform something equivalent
to:

``` python
df.columns
```

Then:

``` text
Python result
 ↓
LLM
 ↓
Human-readable answer
```

The user does not necessarily need to see the generated code.

------------------------------------------------------------------------

# 45. Example --- Minimum / Maximum / Average

Question:

> What is the minimum, maximum and average value of age?

Conceptual flow:

``` text
Question
 ↓
Generate Python/Pandas analysis
 ↓
Read age column
 ↓
min()
max()
mean()
 ↓
Final answer
```

------------------------------------------------------------------------

# 46. Example --- Outlier Analysis

Question:

> Are there any outliers in the data?

The agent performs data/statistical analysis.

The transcript mentions:

-   Extreme values
-   Box plots
-   Outliers

and reports the resulting analysis.

------------------------------------------------------------------------

# 47. Dangerous Code Warning

CSV agents can automatically execute generated Python code.

The transcript discusses a setting such as:

``` text
allow_dangerous_code=True
```

Reason:

> Python code is being executed in the backend, and automatically
> running generated code can be dangerous.

### Important Lesson

Automatically generated/executed code should not be blindly trusted.

------------------------------------------------------------------------

# 48. Benefit of Toolkits

Toolkits reduce manual implementation:

``` text
Manual implementation
        ↓
Many components

Toolkit
        ↓
Prebuilt functionality
```

The user supplies the data and asks questions; the toolkit orchestrates
the necessary internal tools.

------------------------------------------------------------------------

# 49. Single Agent → Multi-Agent

The transcript ends by introducing a future direction.

### Current

``` text
One AI Agent
      ↓
Tools
      ↓
Answer
```

### Future

``` text
Agent 1
   ↓
Agent 2
   ↓
Agent 3
   ↓
Agent 4
   ↓
Agent 5 = Reviewer/Judge
```

Multiple agents can communicate.

One agent can generate an answer while another checks whether the answer
is correct.

------------------------------------------------------------------------

# 50. Single-Agent vs Multi-Agent

  Single Agent                   Multi-Agent
  ------------------------------ ------------------------------
  One agent solves the task      Multiple specialized agents
  Simpler architecture           More coordination
  Easier debugging               More complex debugging
  Lower orchestration overhead   More communication
  Good for many tasks            Useful for complex workflows

------------------------------------------------------------------------

# 51. Complete Agentic AI Mental Model

``` text
                    USER
                      │
                      ▼
                   INPUT
                      │
                      ▼
                     LLM
                   (BRAIN)
                      │
                      ▼
                ACTION PLAN
                      │
                      ▼
                TOOL SELECTION
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
      Search       Calculator      Python
        │             │             │
        └─────────────┼─────────────┘
                      ▼
                 OBSERVATION
                      │
                      ▼
                 THINK AGAIN?
                  /       \
                Yes        No
                 │          │
                 └──→ Tool  ▼
                        FINAL ANSWER
```

------------------------------------------------------------------------

# 52. GenAI → Agentic AI Progression

``` text
Generative AI
     ↓
LLM generates text
     ↓
LLM limitation
     ↓
Need current/external information
     ↓
Tools
     ↓
Need tool selection
     ↓
Action plan
     ↓
Iterative execution
     ↓
AI Agent
     ↓
Multiple tools
     ↓
Toolkits
     ↓
Multi-Agent Systems
```

------------------------------------------------------------------------

# 53. Interview Questions --- Junior

1.  What is Agentic AI?
2.  What is an AI agent?
3.  How is an agent different from a standalone LLM?
4.  What is the role of the LLM inside an agent?
5.  What is a tool?
6.  Why does an LLM need tools?
7.  What is an action plan?
8.  What does `verbose=True` do?
9.  What is an Agent Executor?
10. What is Tavily?

------------------------------------------------------------------------

# 54. Interview Questions --- Mid-Level

1.  Explain LLM + tools + action plan.
2.  Explain the ReAct framework.
3.  What are Thought, Action and Observation?
4.  Why is an internet-search tool useful?
5.  Why is a calculator better than search for mathematical computation?
6.  How does an agent use multiple tools?
7.  Structured Chat Agent vs ReAct Agent?
8.  Why can agent execution require multiple iterations?
9.  Why can agents consume many tokens?
10. What causes tool/API/version errors?
11. What is a CSV Agent Toolkit?
12. Why can CSV analysis generate Python code?

------------------------------------------------------------------------

# 55. Interview Questions --- Senior / Architect

1.  Design an agent that can choose between Search, Calculator, and
    Python.
2.  How would you control agent iteration limits?
3.  How would you handle tool timeout/failure?
4.  How would you prevent unsafe generated code execution?
5.  How would you secure API keys?
6.  How would you evaluate tool-selection accuracy?
7.  How would you design a multi-tool agent?
8.  When should you use a ready-made toolkit instead of a custom agent?
9.  When should you use a single-agent vs multi-agent architecture?
10. How would one agent validate another agent's output?
11. How would you monitor agent cost and token consumption?
12. How would you prevent an agent from repeatedly calling the wrong
    tool?

------------------------------------------------------------------------

# 56. Errors & Gotchas

-   Treating an LLM like a calculator is a mistake.
-   Treating an LLM as a current-information database is a mistake.
-   Having a search tool does not guarantee a reliable answer.
-   A generic search result may be less suitable than a domain-specific
    source.
-   Tool quality directly affects agent quality.
-   API keys should not be hard-coded.
-   API rate limits matter.
-   Package/API compatibility issues can occur.
-   `verbose=True` traces are not the final answer.
-   Agents can consume many tokens through repeated iterations.
-   Agents can time out.
-   Tool parsing can fail.
-   One tool is not sufficient for every task.
-   Mathematical tasks are better handled by calculator/Python tools.
-   Automatic Python execution can introduce security risks.
-   Multi-agent architecture is not automatically better; it can add
    unnecessary complexity.
-   A ready-made toolkit does not eliminate the underlying security or
    quality risks.

------------------------------------------------------------------------

# 57. Quick Revision Table

  Concept          Meaning
  ---------------- -------------------------------
  LLM              Agent's brain
  Tool             External capability
  Prompt           Action plan/instructions
  Agent            LLM + tools + action plan
  Agent Executor   Runs the agent loop
  ReAct            Reasoning + Acting
  Tavily           Search tool example
  Calculator       Exact computation
  Python           Programmatic execution
  Wikipedia        Knowledge lookup tool
  CSV Toolkit      Data-analysis agent/toolkit
  Verbose          Backend execution visibility
  Multi-Agent      Multiple collaborating agents

------------------------------------------------------------------------

# 58. Final Cheat Sheet

``` text
LLM alone
   ↓
Generate answer

LLM + Search
   ↓
Current/external information

LLM + Calculator
   ↓
Reliable calculation

LLM + Python
   ↓
Programmatic computation/execution

LLM + Multiple Tools
   ↓
Multi-step problem solving

LLM + Tools + Action Plan
   ↓
AI Agent

AI Agent + Iterative Thought/Action/Observation
   ↓
ReAct-style Agent

Ready-made tools + Agent
   ↓
Toolkit

Multiple Agents
   ↓
Multi-Agent System
```

------------------------------------------------------------------------

# 59. Assistant-Added Study Guidance

> **This section is not direct transcript content.**

## 59.1 Production Agent Mental Model

``` text
User Goal
   ↓
Planner / LLM
   ↓
Tool Selection
   ↓
Permission Check
   ↓
Tool Execution
   ↓
Validation
   ↓
Final Response
```

Production systems may benefit from authorization/permission checks
before sensitive tool calls.

## 59.2 Agent Evaluation

Do not evaluate only whether the final answer "sounds correct."

Measure:

-   Tool-selection accuracy
-   Tool-call success rate
-   Task completion rate
-   Groundedness
-   Number of iterations
-   Token usage
-   Latency
-   Failure/timeout rate
-   Cost per task
-   Unsafe tool-call rate

## 59.3 Agent vs Deterministic Workflow

If the steps are fixed:

``` text
A → B → C → D
```

a deterministic workflow may be simpler.

If the system needs to decide dynamically:

``` text
Search?
Calculator?
Python?
Another tool?
```

an agentic approach can be useful.

------------------------------------------------------------------------

# 60. Complete Source Transcript --- Preserved Below

The full uploaded transcript is included below as the source-of-truth
reference so the structured notes do not silently omit source material.

``` text
Introduction to Agentic AI
So today we are entering the world of agents AI agents. So what exactly is this agentic AI? This is the kind of
starting point of agentic AI. Slowly we are moving away from genai. Gen AI is a certain style. Then we are now getting
into agentic AI. Agentic AI this whole topic itself did not exist. A couple of years back if you take me at that time
there was only geni. Last time the batch that I have taken it was only geni. At that time agent was the last session and
at that time I still remember taking saying that maybe in a couple of years we may have this AI agents related
session. But at that time there was no term called agentic AI. Now the whole subject agent AI is present. In Genai we
Limitations of Generative AI (LLMs)
largely use LLMs. So LLMs will take your input. The input is prompt and then try to predict what is the next item in the
sequence. We call that as token. It'll keep on generating the tokens. It'll stop when you have reached a meaningful
stopping point. Then it'll stop. This whole thing looks like a perfect answer to your question. And this is what generative AI it is generating the text.
It can generate the images. It can generate the videos. Everything it is going to generate. But this generative
AI has certain limitations. Generative AI. If somebody says geni mostly they are talking about LLM and their
applications. How do you use LLM? How do you make use of LLMs to solve some of the problems that are in your hand? But this genai has certain issues. So let me
show you one of the first issue that you may have with geni. For example, if I define my LLM is equal to open AI
whatever is the temperature. If I ask the question that uh llm dot invoke
who is the current president of India? What do you think will be the answer? As of October 2021 the current president of
India is Ramadin. What nonsense is this? Why is it giving me the answer like this? Tell me. First of all, we have to
come out of this mindset that I'm asking a question. LLM is giving the answer. Tell me. Now that is the general user. That is how they see. But as a data
scientist who is using JNAI, what you should see this as these are the token that you have given as input. Who is the current president of India? Based on
your input, this token generated this token generated. Based on all this input until here, this token generated as of October 2021, the current president of
India is Raman Goin. Can somebody explain me what is happening here? What's what's the correct answer?
Correct answer is murmur. And why am I getting the answer like this? Anybody? The reason why I'm getting the wrong answer and what exactly is the meaning
of this output that I got? Uh sir, the data which is OpenAI is using is based on like old data. So it
is not up to date as per the current data. So I would say instead of data, the data that is used for training the model by
OpenAI, isn't it? OpenAI it is using certain model. The model that is being used by OpenAI in training that model
the data in that model that they have used is until October 2021 only until
October 2021. The data is present with the model based on that it made a generation and it said Ramadin is the
current president of India. Now definitely this is the wrong answer. Now this is where generative AI limitation
is highlighted. What is it? Generative AI is like a good brain. It can generate but what is the problem with the brain?
It has not evolved. It has seen only until a certain point of time. So imagine there is a person who lived only
until October 21. It's a he's a good smart guy. But if you ask him who is the president of India, he will say Ramnar
Kov or he has seen history until October 2021 only. You he hasn't seen whatever
happened later on. In that case you cannot ask for the current live events. That is where the biggest limitation of
generated AI comes into the picture. That is where we will give apart from this generative AI to this LLM, I will
give a tool. You know what is the tool that I'll give? I will give use internet. Now tell me if I ask this
question to LLM and if I tell it use internet also do you think I will get a right answer?
Yes. Now if it uses internet it will go and search for the current president of India there will be multiple places where current president of India name
will be mentioned then it will get the answer. Now that is nothing but agentic AI. What are AI agents? AI agents are
What are AI Agents?
software programs that think like humans. If I'm not able to answer then I may have to use a tool then I will use the tool. I will try to give you the
answer. This is a very very broad basic way of looking at genai versus agent AI. But our whole session today is about AI
agents. You will get clarity on this. As of now, I'm trying to highlight what is the biggest issue with LLM? LLM are
good. But can LLM do mathematics? Tell me if you ask 2 plus 23 what is the answer? Do you think LLM can give the
right answer to this? I have seen lot of people mocking open AI mocking Chad GPT in the beginning. Two years back there
are so many LinkedIn posts. Somebody will say that 2 plus two then uh charad used to say five or chip used to say six
and they totally mock saying that something that cannot say 2 plus two how can you trust its output tell me honestly your two will it be taken as
two by charg everything that you will give will be converted into a tell me what it will be converted into
multi dimensional vector multi-dimensional vector embedding isn't it they're known as vector embedding two will be an embedding plus will be an
embedding yes or no and then again two will be an embedding that will be taken as input and then that will be sent to
the model give as an output that will be an embedding that will be converted to the text. Now for us it looks like 2
plus2. Do you think the model will see that as a two? It will see that as a vector memory, isn't it? It'll convert it into a vector. That is the reason why
it cannot do mathematics. Now how do you should solve it? Do not directly do 2 plus2. Try to write the Python code for
calculating 2 plus2. Then it will give the Python code. In the Python code you execute 2 plus 2 then you will get four then you will get the output. Then it's a better option. So you give Python tool
here. Are you with me? Directly if you ask questions to genai it may do mistake because it is just a next token
generation engine standalone LLM. It cannot do mathematics. If you ask what is a square root of 253, do you think
LLM has an answer to this? Even though this looks like very simple, any calculator can do it. Can LLM do it? Can RGB give you the answer to this? The
thing is we are asking a wrong question. We have built a large language model. It is just a next generation token generation engine. We are not asking the
right question. So standard LLM cannot do mathematics. Can it search the internet and give us the answer? If I
ask the large language model, hey, what is the current cricket score? Is there any match going on between India and any
other country today? Do you think LLM can answer that question? LLM could not give answers related to recent facts. LLM cannot access the
current news data. So, LLM is like brain but it has seen a limited memory. So, to
resolve these issues, to resolve these roadblocks, we have introduced something called agents. Agents are softwares or
software programs acting like humans. If you are a human being, if I ask you a certain question, if you do not know the answer, quickly you'll check in the
internet. Yes or no? Quickly you will use a tool. If I ask you a question, you do not know the answer quickly you will check the book. Quickly you will go to
newspaper and get the answer. Quickly. If I ask you a question what is square root of 253 if you don't know the answer what will you do what tool you will use
in the general world calculator you will take the calculator and in the calculator you will enter square roo of 253 and you give me the answer exactly
agents are like human beings agents is the point where artificial intelligence has entered the real human beings and
they started overtaking or they started replacing humans this is the first time you can actually replace a human by
using AI agents like the way exactly how humans behave if I ask a question to human what is square root of 253 he will
take a calculator AI agent will also take a tool called calculator and calculate this and give me earlier we
could not reach human beings because there was no thinking capacity there was no brain but do you have the brain now in AI agents what is the brain part you
need brain plus you need tools what is the brain which brain will understand the human instructions if you are asking a twisted question yesterday I went it
rained today do you think is it going to rain can you tell me what is the temperature you giving your own uh language and you are giving instructions
somebody has to understand what is the brain part in an agent the brain is nothing but lm your llm now earlier this brain was
missing lm was missing Now to this brain if you give the tool if you give the calculator tool don't you think whatever human can do whichever question that you
ask human will do it in calculator and give you don't you think you can achieve with this agent if you give LLM plus Python don't you think agent can write a
Python code to your requirement you describe what you want I want you to write a Python code for creating this particular application or for drawing
this graph with this input etc etc lm will understand your requirement and give you the output you give LLM the
brain plus the tool it will have internally it will have an action plan based on that action plan it will give you the output agents are software
programs designed to imitate how humans perform tasks. Now, this is exactly what agents do. This is not exaggeration.
Until now, humans, if you see their IQ and if you see AI agents or AI, its IQ,
humans were always beating it. But recently, AI has taken over human intelligence. AI has started solving
problems that it has started scoring better than humans. For example, if you take mathematics olympia test, until now
humans were scoring better than AI in the mathematics olympia test. But recently AI has started scoring better
than humans in the mathematics Olympia test. It started solving mathematical problems better than humans. Slowly like
we are the first generation to witness this only this year or last year or last last year. That is when AI has taken
over humans. A lot of people see this as a scary point but that is just very dramatic. What we should do is we should
think about some of the easiest problems that we are able to solve. Earlier so many trivial problems were there we were not able to solve them. Now we can
easily solve them by using AI agents. AI agents can simulate human thinking, decision making and communication with
growing accuracy. This is all true. In fact, all these points will get clarity. We will unveil them one by one. They can handle complex task like analysis. They
can do analysis because they have the brain. LLM is the brain. It will give step-by-step procedure what need to be
How AI Agents Mimic Human Thinking (ReAct Framework)
followed. They can do customer service and coordination can be done faster. So AI agents are softwares acting like
humans. Inside an AI agent, I will actually crack open an AI agent. I'll show you what happens inside an AI agent. What you will see is AI agent
will think. If you ask a question, if you give a requirement, AI agent will think. I'll show you what is that thought. After thinking, it will take an
action and then it will observe something. For example, if I ask you certain question, you do not know the answer. I ask you who is the president
of Italy today. Okay? Or what is the temperature in London? Definitely you don't know the answer. Then you will
think, right? What is the first thing that you think? What is the temperature of London? I do not know. I think uh I have to go to internet and search what
is the temperature in London. So AI agent internally you will see if you see the traces of its thoughts you will exactly see the way humans think I have
to go to internet and search for it. It will also think like this and if you provide internet searching tool then it will also say another word another
sentence saying that okay I have to use internet searching tool here and then uh what is the action it will actually go to that internet searching tool it will
put a search keyword temperature in London today's temperature in London like the way exactly human do then it'll observe that there are 20 30 results out
of that it will look at the first result this looks like the right answer thought action observation first link it did not have the temperature okay the first link
did not have the temperature again it will think the first link did not have the temperature again I have to do a searching it will do the searching again this time I will click on the second
link again it will do all that thinking it It will do it two three times and finally once I have the final answer the
thought all those traces all its imagination you can actually read it you you will get to see how it is arriving at it finally it will say that okay I
have the final answer I can give it to user now then you will have the temperature in London now what you see here in your chat GPT is the AI agent
only chat GPT that we are using on the website is not the LLM earlier it used
to be LLM but this is AI agent only have you ever seen if you ask a question it says sometimes thinking you remember
that so For example like uh sometimes when you ask a certain questions you will get a output saying thinking or
something. So let's say let me ask this question linear algebra MSE mathematics functions
explain in simple terms sometimes when we ask certain questions it will try to
say that like in some questions you will have this option like thinking next time it try to observe so that thinking traces also we can see may not be in
charge but here in our coding environment we can see that if the output is not sufficient then it will do
it two three times and then finally come up with the answer just like the way humans do AI agents mimic that somehow
how they could achieve I would not say AI agents are 100% perfect they are improving but whatever they could do as of today we are able to achieve certain
tasks AI agents are software programs that interact with real world external events current data they can go beyond
whatever is LLM trained data what is LLM trained data lm will stop at a point and say that as of today as of this point
only I can answer but beyond that if you want to go you have to go with AI agents today we are not going to go into AI
agentic framework we are going to build agents with our own hands. We'll try to build everything with our own hands so that we get a real look and feel and
real inner workings of AI agents. Later on, we will use frameworks that will make working with AI agents easier. So
if you see AI agents, if you give the input as a user, user will be giving the input and there's an action plan that
will be created. User has asked this question, he asked a question, what is the temperature in London? I think I have to do this, I have to do this. If
this doesn't work, I have to do this. I have to do this. All these traces it will create. An action plan will be created. To create an action plan, you
need a brain. So which will which component will will be acting as brain which component will help in creating
this action plan step-by-step procedure of thinking that component is your LLM and the prompts that are given to that
LLM. Now is LM alone sufficient to answer certain questions no it requires tools then it'll find out the right tool
and then it will do that action plan it will do the iterations multiple times finally once it has the output it'll give you the output. So agent says LLM
reasoning plus tools. I think already I have kind of made this point clear in the first example itself here LLM did
not work. If I use the internet searching tool that is AI agent the same point I'm trying to tell in multiple ways but before we jump onto our first
example I want you to note that agents are not 100% perfect as of today but in future they may get perfect so in this
session or in general when you're working with AI agent you may get inconsistent results that means sometimes AI agent will work sometimes
it may throw an error that means we may have to reexecute sometimes in its thinking it may consume a lot of tokens because when you're using LLM there is a
token limit you have consumed sufficient tokens it will say that I'm not able to think anymore that means your tokens are exhausted sometimes it will think
multiple times it is not able to find the answer. It could not find the right tool, it will say that timeout error I have gone for multiple iterations and
then if you want to customize a particular agent as of now there are not multiple ways but maybe in future definitely this agent AI is growing a
agents will get better and better. So let's get started with creation of our first AI agent. What I will do is I will
Building Your First AI Agent with Tavily Search
first show you the code end to end in one go so that it will help you in understanding. After that along with you
I will once again do it. So in the first iteration itself try not to do it. I'm not sharing this code. First I'll show it to you the first example and then we
will go I will once again execute this with you. So this is what we could not
answer. The first example itself we'll try to continue. I have asked a question who is the current president of India. Ramanar goend is a wrong answer. I could
not answer. So for this what is the first thing that you have to do? You have to define the tool. You have to
give the Google searching tool or any of the tools. So just like Google search engine there is something called Tavly
search engine. Tablely search engine. Tavly,
Tavly search engine. So this is also just like Google search engine. So what I'll do is if you're not able to answer
this question, use this search engine. So for Tableau search engine, you have to create a login ID here. So you have to go and for any of the tools or any of
the services that you use, you have to get their API key. So you will search for Tableau API key. It will ask you to
login, sign up, create a login ID which you can do by create using Google and then you can get your API key in Tavly
search engine. An API key will be given. You can copy this and then you can use that API key. So I would say OS.
Environment my Tavly
API key is TY API key. Either you can write the key here already I have stored it here in the keys somewhere here. So
once I execute this the key is with me. Now I will define my key. So this is a API key. So I will say my tools is equal
to the tool name is Tavly search engine.
Tavly search results and there is a parameter called max results. So max to max I want to take first four results. You can take other results as well. But
I don't think when you're doing internet searching first four are sufficient or first two three are sufficient. Otherwise this API key has rate limits.
We don't want to go beyond the rate. So if somebody is searching for who is the current president of India, table will give multiple results. But are we taking
all the results by mentioning max results equal to four? I'm taking only first four results. So you have the tool
right now. Now comes the thinking part or the action plan. The next one is action plan. How do you create an action
plan? Action plan is nothing but the prompt. The prompt that you give to the LLM that is your action plan. So the
prompt is already given by LChain to us. So from Langchain we import hub. In that there is a prompt that is already
created as an action plan. So I will try to print what is that action plan.
So this is the action plan. Respond to human helpfully accurately as possible. You have access to the following tools. Tell me what is the tool. This is the
parameter as of now. What is the tool? So this will convert it to you have the following tool. The tool is Tavly search
results. So use the search engine tool and then try to respond to user and then you have the question, you have the
thought, you have the action and then you make the observation etc etc. So this is the thinking or this is the action plan that we have created for the
AI agent. User input question action plan is ready tools are ready. Now we need to get the final output which means
we have to connect all of these. We have to stitch all of them into an agent. So let's try to stitch them and create an
agent tool is ready. Our uh action plan is
ready. Let me quickly write my LLM is open. Anyway we have created that earlier. Now agent create structured
agent is our uh function. After that we have to use agent exeutor. So that means
once I have created the agent I have to execute this whole flow. This will happen in a iterative manner. That means
it will think it will put one keyword who is the current president of India. It'll get the answer. If the answer is wrong or if the answer is not sufficient
it'll do it multiple times. That whole iterations will be done by agent exeutor. I will say agent executor is
agent exeutor. Use my agent use my tools. Whereos equal to true orbos equal to false. If you keep verbos equal to true, you will get to see what is
happening behind the scenes. How this whole process of thinking is happening. So once our agent is created, now it's time to run our agent exeutor. Agent
exeutor dot invoke. Now you ask your question. Whatever is your question, I should be able to give
the answer. Who is the current president of India? Earlier you have asked who is the current president of India. You got a wrong answer. But now you are giving
the tool. You are giving an action plan. This is supposed to work. An agent is one step better than jai. Entering a new
execution chain. What was the thought? I need to use Wikipedia tool to find the current president of India. Action Wikipedia the current president of India
etc etc and then it has given the final answer. It is saying the current president of India is Roati Murmu. In fact we haven't given any tool as
Wikipedia but it has taken it probably in this agent itself there would have been some Wikipedia internally one of
the tool basic tool or the default tool or I would say let me say tools one and we will specifically mention this tools
one tools one this time I'm trying to force it use my
tools only. Let us see. I need to use tably search results. So earlier it has used Wikipedia tool. Somehow maybe it
has a predefined set of tools. But here I have very specifically told use tools one only. And what did I mention as tools one? Tools one is tab search
results. So it is saying I need to use tably search results tool to find the answer to this question. And then tab search results. Uh in the action who is
the current president of India directly it has pasted that and then it went to this again it went to this link only Wikipedia that is fine no problem.
Finally it has given us the right answer which is Draari Murmu. So what I'm trying to tell you is if
your gen AI is having a limitation of giving you the right answer by giving the sufficient number of tools you can create an AI agent that will almost act
like a human being. Let us ask one more question and then all of us together we will recreate this agent. Let me ask
current question today's question. What is the score of the cricket match that
is happening between India and South Africa? Do you think it is going to
work? It all depends on how good the table search is. Cricket match for India versus South Africa. India versus South
Africa full scorecard it has went to in current score of the match between India versus 154 for 8 T on day one. Can
somebody confirm whether it is correct or wrong? Yeah. Yeah. Like far better. I would not
say this is very current but we would have given right tool isn't it? If you have the cricket related tool like ESPN
cricket tool because based on that search results it went to Indian express but it should have gone to where if it is really a good search engine the good
search engine would have taken it to some cricket related sports related website. I'm re-executing this. Let us
see whether it'll take us to some other again it is taking to Indian express only but anyway it is giving one or two like now it is giving lunch time but
anyway it is at least accessing the correct information. Have you got a feel of how agents work? Have you seen the
clear difference between genai and AI agents? AI agents are LLM brain plus tools plus the action plan that will
almost try to mimic the humans. Are you with me? If you give sufficient amount of tools
to a chatbot earlier we have created a chatbot that is just look at the documents and give the answers but the user is asking a totally different
question. The user is asking a question that is not found in the documents but if you are giving sufficient amount of tools then AI agent may answer the
question that is given by the user. Sir. Yes. Uh sir there's something need to know that we are using tably. Uh why cannot
we use simply Google? Uh Google also I have another example just for the sake of ease of use. I have started with the
tavly. Tavly gives us maximum rate limits for API for free API it will give us maximum limits. Google has so much
restriction. The Google one is known as search engine page results. Later on we will use search engine Google provided by Google also. So there are several
search engines. You can use data go search engine. You can use Bing search engine. You can use tavly or Google. For
us search engine means Google only isn't it? But there are other options as well. Got it. Yeah. So Tableau has the maximum free uh
version free number of uh what do you call uh calls API calls that is why I have introduced this to you okay in one
more example we'll do Google also what I'm expecting from you right now is
I'm expecting you to install the packages okay and then uh I'm expecting you to do the keys ready keep the keys
ready and then uh tably also you try to get the key keep it in the environment
and then I will try to explain you the code of defining the tools and then uh defining the prompt and then defining
the agent. For those who don't have the OpenAI, I
request you to get the OpenAI API key. At least one you can buy, isn't it? For $10, you should buy the OpenAI API key
and start practicing it. At least for one year, you can use it if you spend around $10 or alone if you cannot afford. I think
that's not a thing at all. Like uh alone, you should be able to afford otherwise two three of you can share one key each one of you $33.
Sir, it's working. But uh in the first uh step where we are importing PP strolling lang it is getting error. Uh I
think ignore that. I think the same error is it like you need a version related error. Yes. Uh so ignore that. Even with that it
should work. Yeah it is working. Ideally we should not get that error. A couple of months back I was not getting the error but recently there is a
version compatibility issue. Because of that we are getting that error but as of now you can ignore that but still it should work. Yeah.
Okay. Now focus back here. We have already asked a question to LLM about a current event. It could not answer. So
step one is define the tools. Let me write it once again. Maybe this time you try to write along with me. Define the
tools. So what is the tool that we are using? We can use Google search engine or Microsoft search engine or we can use
Davi search engine. So I would say my tools is equal to. So intentionally I'm defining it as a different tool. I'm
saying my tools two or tools.tavi is equal to my tavly tools. Max results
equal to four means I want to take four results because this is kind of paid in a sense paid in a sense our uh each
usage will be tracked and then there is a limitation that see monthly plan,000 credits. So maybe 1,000 times or
thousand results only given to me,000 is pretty good as of now. So this is the tool that I have created you define the
tools tell me define tools even before defining tools what you should define you should define the brain. to define
the brain part. What is the brain part? Define tools. Define tools. Before defining you, you have to define the
brain. What is that? Thinking brain will be LLM. LLM equal to
open. Open. See, I am naming it as brain. There is nothing like this is not the original terminology. Just for our understanding, I'm saying define what is
the brain define the tools. And then once you have the tools, once you have the brain, you need an action plan. Right or wrong? Define action plan.
Action plan is in the form of the prompt. You can change the prompt also. But we can use the prompt that is there
on lang chain. So if you change this prompt slightly the agent will change. That's the only thing. So you have
defined the brain, you have defined the tools, you have defined the prompt. Let me print the prompt. So this is the
prompt which means your action plan is ready. Your action plan is ready. Your tools
are ready. Your brain is ready. Now you have to define the agent which will put all of them at a place. Define agent.
Are you with me? All of you. Are you with me? Are you comfortable on whatever we doing here? What is it going about the head?
Yeah, it's fine right like everything. Now agent is equal to create structured agent. See, this is create structured
agent is one way of creating agent. There is something called react agent. There are different ways of working with agents but all of them do the similar
task. Slight differentiation maybe there in the prompt or the action plan or somewhere here and there but overall I want to create an agent which will use
my brain LLM, use my tools, use my action plan and then I would say agent executor. Here we are doing everything
very manual way. If we go to agent A frameworks, all this will be done in one line with one function. But here we are
doing everything one by one. I'm creating an agent. I'm creating an agent exeutor. What is the agent exeutor? It will run in the loops one by one. One by
one until it gets the answer. So use the tools and then use the when we say veros equal to true, I will see a green color
text where I can see what is happening in the back end. Then I would say my agent executor
dot I think to avoid the confusion I would say I would name this as agent. I
would name this as agent. uh let's say
agent base so that is create structure agent so I would say agent base so this I would call it as agent to avoid
otherwise we will just follow the general terminology agent executor dot invoke
you can ask any question now tell me if I ask what is square root of 253 can
this answer if I ask what is square root of 253 do you think you will you will get the
right answer let let's ask later on but let us see first we will try to see what is the output here
the output current president of India is rob anyway we have seen that output so make sure that you write all these pieces of code by yourself make sure
that you are very comfortable with whatever is there in front of you if everything works fine you should get the
output you can also test it for several other internet based questions which otherwise your LLM may not be able to
answer but this one may answer now my question to you is before we get
the answer. Can somebody tell me if I ask the question? So until now it is working fine. It is able to do an action
plan and give us who is the current president of India. That is fine. But if I ask this question that what is the
what is the square root of
535? Do you think I'll get an answer to this?
Anybody? No. Tell me what is going on. What is the rinking that you're having? What is the kind of uh what is the problem here? If
we given the tool only for internet search. So this is internet search. So this is not really a calculator. So if we are
not using the calculator then we may not be able to get the right answer. So the action is table search results. What is
the square root of this? And it is not able to give us the answer. It says that output parsing issue etc. It should not give an error. At least it should say
that uh you know I'm not able to get the answer or it should throw some kind of random answer.
So let me rewrite this once again. agent executor.
This is working fine. Let me ask what is the square root of 635.
So it is going to tab searching for square root of 635 approximately 25.999.
But what it is doing? It is going to some website and trying to get the answer out of it. So let me make it a
little difficult. Cube root of 635. It may go to that website once again try to search for it and then try to give it. I
would say this is decent but this is not the right way of doing it. Isn't it? Because it is instead of using the calculator it is going to certain
website and trying to fetch the answer. If you are asking for numbers that are not found in those websites you may not
get the right answer. It will say that okay it is like it's very difficult to parse. But it makes sense isn't it? Here you
can see that since you are using a kind of internet search if you're asking mathematics related question it is not able to answer. So for that we may have
to use a different tool called calculator or LLM math which will solve this issue. So there are different different type of tools that we are
going to explore a little later. So the agent type that we have used is one of
the agent type. This is known as create structured chat agent. Apart from this there is one more agent type that is very frequently used that is known as
react agent. One more agent that you will see very frequently is reasoning and acting agent. React agent. React
stands for reasoning and acting agent. Now what is the difference between the previous agent and this agent? prompt and the action plan is slightly
different. In this react agent like this there are multiple agents but whatever is the agent that you see internally the overall working will be same the overall
the structure will be same you will have the LLM brain you will be using the tools you will be using the action plan
through the prompt then finally you will create the agent but in the prompt stage maybe while it is creating the action plan there may be slightly different
action plan from agent type to agent type the action plan may change so we will try to see how this react agents
action plan is slightly different from the previous action plan let us try to see that so I will try to create one
more agent But this time we will try to use react agent. You can use either react agent, you can use structured chat agent. It's not a very big deal. You
will get the same answer. Your llm is equal to openai. And then my tools. This time I want to
use Wikipedia tool. So for that from lang chain I want to use a different tool all together dot agents load the
tools. My tool that I want to use is Wikipedia. That means I'm going to use a certain uh
I'm going to ask a question that may have the answer in Wikipedia. Now I'm going to create this react agent. So the
overall process would be agent equal to initialize agent use the tools which is nothing but to be on the safe side I
will say tools wiki just to make sure that I'm not using anything else tools wiki use my
llm which is open AI now agent is zeroshot react description so basically
it will have a different action plan hold together different action plan means the prompt that we have written earlier this will slightly change but
overall it will answer the question in the same manner for example if my final question invoking happens like this
let's say if my question is somewhere it has to search in Wikipedia the question is equal to instead of asking who is the
current president of India let me ask a really Wikipedia related question let's say what is the law
what is the law that is related to UPI cyber crimes in India now I will simply
say agent run whatever is the question you just give that then it will use a different action plan since I have given verbos equal to true now you see that
slightly different verbose so action Wikipedia action input up UP cyber crimes in India. So what it has done is it has gone to Wikipedia. It has given
this as input and then it has observed action action input observation and then it has a thought I need to I now know
the final answer. So it itself has got the thought. Sometimes the thought will be no this is not the right answer I have to think for it. No this is not the
right answer I have to think for it. Finally once it says I know the final answer the LM brain says that this looks like the final answer. It will give us the answer. Let us say if I ask another
question let's say what is the same question? We
will ask what is the cube root of 625. I I'm pretty sure in
Wikipedia this answer would not be there. Let us see what is the thought action observation. The thought action input it has gone to calculator and it
is trying to give us the answer. I think it is trying to take some of the previous tools. So what we will do is we
will try to yeah so it has uh done something. So it has gone to page exploration like I think within Wikipedia there is something that is
trying to provide us this answer. Within Wikipedia I think there are some image pages etc etc. It is kind of giving a decent answer. Let's ask one more
question to see what is the back end processing just to see how this React agent is thinking internally.
Explain explain me about World War II.
Now let us see what is the answer that it has got. You should always think before what to do and then Wikipedia
World War II it has gone to page World War II and then it says that I know the final answer etc etc. So this is another
type of agent either you can use react agent or you can use create structure chat agent both of them are similar type of agents by nature or by basic nature
what agents do is they will use the lm brain they will use the tools they will use a prompt they will use that action plan and then try to give us the answer
if I want to get an idea on what is its action plan if I want to see the prompt behind prompt behind reasoning and
acting agent so I would say agentlmchain prompt template if I see this will be slightly different answer the following
question to the best that you have access to you have access to Wikipedia and then use the following format. You have the question and then thought. You
should always think about it and then take action and then action input and then observation and then you have a thought. Once you have the final thought
like this thought, action, observation, thought, action, observation, repeat ite times. You understand the way humans think. You are looking for something you
haven't found it, you do it again. You looking for something, you haven't found it, you do it again, you do it n times. Once you know the final answer to the
question, then you try to give the final answer question and the final structured output. So that is the AI agent. As we
discussed if you provide the right tool then it will give us the right answer. So try to work with this one. All of you
quickly write this one then we will see certain other tools.
There are list of tools that are provided to us. We'll be exploring a maximum amount of them.
Are there any quick questions anybody? Anything that is unclear please let me know.
Uh sir I have one question like uh can we remove all the like whatever the process this agent is following and can
we get the final output as answer? Huh? Yeah. So here we have kept verbose equal to true right. Yes.
So if you just uh this web equal to true kept just to understand what is happening. Okay. But see whatever you
see in this green color and uh this uh blue color is not really the answer. Yes
that is the background work. So once it says entering the chain it will give us the final answer. So let's uh redo this
for the same question. You got that big an answer. But that is actually final answer is what we want. So I will just
remove equal to true and then execute it. So it's executing internally.
This is the final is that what you're looking for? Yes. Yes. That is ideally what we do everywhere. Okay. Only since we are learning here
just to see what happens behind the scenes, we kept verbos equal to true. Okay. Otherwise this is how you have asked a
question. I don't really care how agent is really thinking internally. It has provided me this final answer after all those iterations. Okay.
Yeah. Thank you. Now let me show you examples of other tools as well. We will try to see a
couple of more tools and then I'll show you a repository of tools that are available. The other tool that most widely used is
LLM math. LLM math tool. What does it do? It will do all the mathematics
related operations. I would say my LLM is open AI. I think just for the benefit of recapping everything, can somebody
help me? What are those steps that we have to remember? One is the brain which is llm is equal to open aai and then
after you give the brain what is the next thing that you'll be providing brain followed by tools
tools good so you will say my tools my calculator tool is what I'm giving load
tools lm math here we are using llmath lm equal to lm so this tool requires lm also that means it is going to do the
mathematical calculations using python but to understand your question convert to python you need lm are you getting
what I'm trying to say you have asked a mathematics related question Internally it will use Python but for your question
to be converted into Python code you need LM. Okay. And then I would say agent initialize agent. You can use
react agent which has lesser stress. Zero short description is the one that we will use. And then let me switch off
the verbose because verbose equal to true it is going to give us what is happening behind the scenes. Without verbose we will do it once. Later on we
can do it with verbose. Then I will simply say agent dot run what is the cube root of 9. And without any hassle
this time I should get 9.99 or something. 9.99 is a cube root of triple 9. Whatever you ask you should get. The
thing is you have asked this question it is not a calculator input. This question is converted into Python code. So if I
keep verbos equal to true then I will get to see what is happening behind the scenes how it is uh working. So if I put this one then we will see it's thinking
action is calculator action input. I should use calculator tool to find this answer. Answer is a triple line. See
look at this. What is happening behind the scenes all of you? What is the cube root of triple 9 and it found the answer as triple 9? Now see the thought this
doesn't seem right let me try again. So what lm brain is saying you have asked for what is the cube root of triple 9. The answer was triple 9 itself. Then
told that no no this doesn't seem right. I have to use calculator tool again. So in the calculator it has given this as input and then it got this final output
Using Multiple Tools and Google Search Engine
and it has given us the final output. This is the calculator tool. Quickly try
this example as well. Later on I will show you Google search engine tool. This pretty straightforward one. Now there is
a way we can give multiple tools also here. Load tools you give multiple tools. If you ask a question that has usage of or that requires two or three
tools to be used then all those two or three tools will be considered for giving you the final answer.
Google search engine tool is known as SER s API is what we call it as
Google search engine tool. Earlier we have used tab
search you can use Google search. So search engine results page. SE stands for search engine results page. SER API
if we go there and then this is the link SE app SE API. Search API here. If you go there and if you sign in using uh
Google, there you will get another API key. When you're working with geni agent, most of
the times you will be spending on getting these API keys. So I have around three credits of 100 searching plans and
I have the API key. I can see the API key. I can copy it. So search API is what you have to use. So Google search
results page is what you need to install first. I think you have to do PP install of uh SCP Google search results. Once
that installation is done then you have to keep your search uh key here you have to get the key. So
from here you have to get the key. After getting the key we have to keep it in our environment os dot environment
and then uh whatever is the variable name search API key. Your key is need to be given here. In my case we are getting
it from user data search API key. Once I execute this it'll ask for my permission.
Otherwise if I given the permission it will get the key. Once the key is given again I will write my brain which is LLM
is open AI the same thing tools is SE API this time what I'll do is I will give two tools search API I want you to
I want to ask a question that involves two tasks one is searching the internet also doing the mathematics or doing the
calculation so I want you to use lm math as well as this one or maybe I'll give all the tools you decide what is the
right tool that need to be used so I will say my agent is equal to initialize agent see how it is working then I'll
give you a couple of minutes time to execute it I kept wear equal to So let me ask a question that uh initialize
agent when was
when was MSXL first released? How many years back? The current year is 2025.
Now when MSXL first released search engine can tell you but if it is 2025 since the question is how many years
back it has to do a mathematical calculation. 2025 minus 1985 it is going to give us based on the calculation
also. Now if I try to ask this question then I will say agent.tr run. So first I will say initialize agent that is done
then I would say my agent.run when MSXL first released. So look at
this the internal thinking I should use search engine to find the release date of MSXL. It has taken the action of searching first. I have given two tools
searching and doing the LLM math doing the calculator. MSXL first released in September 30 1985. Then I should use
calculator to calculate the number of years back from the current year because I have asked a question how many years back. So 2025 - 1985 it has done that.
Just like the way human being does this just like the way human being tries to do this. When did we get independence?
How many years back? If I ask you that question or when did Cuba get independence? How many years back? You will first understand when did Cuba get
independent? That year and then current year minus that how many years back is what you will get. Final answer is MS Excel was first introduced 40 years back
in 1985. Try to execute this. Try to use SE API tool which is Google searching tool.
That was a question asked by somebody that like uh can I use Google search as well? Yes, you can use Google search,
you can use calculator, you can use several tools. Even if you are giving two tools, if you
ask only one question related to one tool, that one tool will be used. For example, if I ask instead of internet searching, if I ask what is the area of
a cube with side equal to five. So if I have a cube, each side is five. What is
the area of it? Five cube should be the answer 125. So it is using only calculator. Calculator everywhere calculator. Even though we have given
two tools, it is using only calculator because calculator is sufficient here. But here it requires calculator as well as searching. It will use both the tools
quickly write this code everyone.
I want you to be very comfortable with this code. I don't want you to look at it like a very big monster when you are
writing the code. That is one big barrier that I have observed in people that when they start writing the code, even a simplest error kind of freaks
them out. But sometimes that error is just due to some small typo. If we just fix that typo, everything looks so
clean. The only difference between a good coder and a scary or somebody who's a novice is good coder is always confident of the error that he got. He
can resolve it. I want you to reach that level. If you really look deep into this, the
overall coding is not that difficult. They're just two three lines of code. We are repeating it multiple times. The same LLM brain, the same tools agent and
then agent. The tools that you see, you have alpha vantage, extra search, there are so many
tools that lang provide. So you can use the tools to do certain tasks on AWS as well. You can do it on bash. You can do
use certain tools to connect to Google drive. You can get some data from Google finance. We have done Google search. Uh you can do Bing search. You can do brave
search. We have done table search. You can do another one as well. 11 Labs. Can somebody tell me what levels does? It
shows text to speech. What does this mean? What can where can you use this? 11 Labs. That means your output that
you're getting if you want the reader to hear it. If you want to convert your text into speech, you can use 11 Labs. Python RPL will be the one that we will
be knowingly unknowingly directly indirectly we will be using it. Everything that you gave if you want to get a Python code out of it this can be
used. So there are certain tools that we will be using frequently image generated duct do search Google drive Google places API and then Wikipedia, Yahoo
Finance, YouTube lab stack exchange there are several tools that are available. Now whatever we have done
until now is we are creating our own agents. We are making agents with our own hands. But nowadays this thing has
Introduction to CSV Agent Toolkit
changed. We have certain toolkit. We have certain readymate agents which are taking care of everything. You just need
to use it. You have a toolkit. There is something called CSV toolkit. So earlier
we are writing my own agent. But now you have uh agent frameworks. You have so many readymate agents. You don't need
any of the ones that we have created unless until you are working on a very very specific customized problem for your particular team. Otherwise you can
use the existing toolkits. So there is a concept called toolkits that is available in uh lang chain. So what
exactly these toolkits do? One of the toolkit is CSV toolkit. So that means if
you upload a CSV file and you can ask any question to that CSV file, you can do any analysis to in that CSV file
without writing the Python code. Very soon the world will get into a place where nobody need to write the code. If
you know proper English, if you can articulate what you want, code will be written, code will be generated, presented to you and if you don't like the code, you articulate once again code
will be given to you. Your general natural language text will be converted to code. I'm not exaggerating it. Already such systems are already
available. So first let's import this CSV toolkit from lang chain I think experimental
load tools. No these are not the ones com. You may have to install this lang chain experimental. It'll ask you to
restart but we don't restart lchain. Dot
agent agents dot agent toolkits. In this toolkits you have CSV create CSV agent
toolkit. If you go to this particular place in lang chain, if you click on this link, you can see what are all the integrations that are available. You can
follow up what are the tools, what are the toolkits, what are the latest updates that are available from whatever I am showing it to you here.
Import CSV toolkit agent.
Create CSV agent. Now, what does this do? So, I will say
my LLM is OpenAI. And then this time when I'm defining the agent here itself I will try to give my data set. First
let me get that data set. Import one data set. I have a data set called banking data set. Import banking data
set. So I would say
bank market data set. I will get a CSV file here first.
Let me get the path for it. This is the one.
Bank market CSV the file is here bank market dot CSV now what I'm going to do is I create an agent where I can talk to
this file all together I will ask a question what is the minimum value of this what is the average of this are there any outliers in this automatically
background code will be written automatically the analysis will be done I will get the answer automatically so how is it done by using create CSV agent
this is one toolkit which will use multiple tools inside it to give me the final answer use this bank market dot
CSV use my agent for now I will not keep web equal to
true now let's say once I create this agent
something we must be missing agent type I have given the llm the path is given let me
give so it is asking us to put hello
dangerous code equal to true because what it is thing is when you are executing the Python code in the back end sometimes it may be creating some
issues it may be deleting some of the important packages that you have so when you are using this agent you are doing it everything intentionally I think what
it might have happened is sometimes lang chain might have done something wrong some people might have raised an issue just to make sure that you are aware of
what you are using because in the back end Python code will be running automatically running Python code is not a good option everywhere they want you
to know that you are running the dangerous code so I am allowing it to be true then only it is letting me pass this now I have given is bankmarket CSV.
I'll simply ask a question. What are the column names?
What are the column names in the data set?
Even though it looks like it will give me an answer but internally it will use Python. So it will create a Python code.
So it will read this file bankmarket. CSV store it in a data frame data frame doc columns and then it got columns
answer and it has given me the final final answer is this one but internally it has written the Python code for it. So whatever I ask whatever are the questions that I'm asking
what is the minimum maximum and average value
of age column if I ask this question. So it has done all of this. So let me
put equal to true. This one I'll try to ignore
so that I'll just get the direct answer finally I will not see anything. What is the minimum maximum average value of
phase is this but if you keep equal to true then you will get to see usually when you are developing something I suggest that keeps equal to true because
you you want to know you want to be in control of what is happening so that whether this agent is working properly or not anyway you can store this output
somewhere and print that output only let me ask one more slightly difficult question agent run
are there any outliers in the data
Are there any outliers? It has to do some analysis to give me this output. See this is there are outliers in the data say statistics box plots are the
extreme values columns etc etc. It is giving me all these values. The outliers in the data set is also given in the
balance there are extreme outliers. If you see the box plot you'll understand that there are outliers present. So here is an example of already readym made
built agent. All that you need to do is supply your data just use it. Right now it is named as toolkit by lang chain but
outside these are known as simple agents. Maybe somebody will call this as data analysis agent or somebody will call it as pandas agent or creating the
python code agent like that people are giving us agents which we directly AI agents which we directly can use. One
big difference that you'll observe is until now we are working with one one AI agent at a time. Later on we will be working with multiple AI agents. One AI
agent will talk to another one. Another one will decide whether the first AI agent is giving you the right answer or not. Four agents will work and the fifth agent will decide whether everything is
right or wrong. Those are coming up later on. As of now, I'm working with single single AI agent. Making sure that we're comfortable with this first.
Execute this. All of you use this toolkit. Ask it slightly different questions.
Execute this. Everyone
Conclusion
continue with the next video. In the playlist, we are covering everything step by step. If you have any questions
or the comments, please post them in the comments window below.
```
