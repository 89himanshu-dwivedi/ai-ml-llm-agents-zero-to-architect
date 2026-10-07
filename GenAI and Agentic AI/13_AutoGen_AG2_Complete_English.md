# AutoGen / AG2 — Complete Agentic AI Framework Notes (English)

> **Source basis:** Uploaded AutoGen transcript.  
> **Important:** Original source is preserved verbatim in the appendix. The study notes below reorganize the source into a learning-friendly flow. Assistant-added material is clearly separated at the end.

---

# 1. What Is an Agentic AI Framework?

An Agentic AI framework is software that makes it easier to build AI-agent applications.

When multiple agents collaborate, complexity grows quickly:

```text
Agent 1
   ↓
Output
   ↓
Agent 2
   ↓
Agent 3
   ↓
Critic / Reviewer
   ↓
Correction
   ↓
Final Output
```

A framework can provide abstractions for:
- agents,
- LLMs,
- tools,
- memory,
- planning/orchestration,
- collaboration and communication.

The transcript positions Agentic AI frameworks specifically around agent-based applications and multi-agent orchestration.

---

# 2. GenAI Framework vs Agentic AI Framework

The transcript uses **LangChain** as a major GenAI-framework example.

Agentic-AI examples discussed include:

- AutoGen
- LangGraph
- CrewAI
- MetaGPT
- OpenAgents
- SuperAGI
- n8n

Conceptually:

```text
GenAI Framework
    ↓
GenAI Applications

Agentic AI Framework
    ↓
AI Agents + Planning + Collaboration + Multi-Agent Systems
```

The transcript does not treat LangChain and LangGraph as identical competitors; LangGraph is described as more agent-oriented.

---

# 3. What Is AutoGen?

AutoGen is introduced as an agentic AI framework.

The central idea is:

> Coordinate multiple AI agents through conversations/orchestration to solve a larger goal.

The transcript highlights:
- relatively smooth syntax,
- comparatively easy code,
- abstractions for multi-agent orchestration.

---

# 4. Core Difference in Agentic AI

Single agent:

```text
User
 ↓
Agent
 ↓
Answer
```

Agentic/multi-agent system:

```text
User Goal
   ↓
Agent 1
   ↓
Agent 2
   ↓
Agent 3
   ↓
Critic
   ↓
Correction
   ↓
Final Result
```

A software-development example can involve:
- frontend agent,
- backend/database agent,
- forms agent,
- testing agent,
- debugging agent,
- error-handling agent,
- correction agent.

The transcript's central point is that agents can collaborate on a larger goal.

---

# 5. AGI — Artificial General Intelligence

The transcript introduces the distinction between AI and AGI.

**AI:** Intelligent systems capable of specific tasks/capabilities.

**AGI:** A generalized intelligent system capable of understanding and performing a broad range of tasks.

The transcript uses illustrative examples such as a system that could work as:
- a watchman,
- software engineer,
- cook,
- pilot.

AGI is discussed as a broader long-term goal.

---

# 6. Two AutoGen Lines — Important Concept

A major warning in the transcript is that “AutoGen” can refer to two different project directions:

```text
Microsoft AutoGen
        vs
AutoGen / AG2
```

The transcript says the project split/fork occurred around **November 2024**, after which the open-source/community direction became known as **AG2**, while Microsoft maintained its own AutoGen direction.

### Why this matters

Online code can therefore differ:

```text
Documentation A
      ↓
Code A

Documentation B
      ↓
Code B
```

Using code from the wrong project/version can cause syntax or compatibility problems.

---

# 7. Why the Course Uses AG2

The transcript says the course uses the open-source **AG2 / AutoGen 2** direction.

A broader learning principle is also given:

```text
Learn one framework deeply
        ↓
Understand the concepts
        ↓
Other frameworks become easier
```

The transcript compares this to learning Excel and then being able to work with Google Sheets without starting from zero.

---

# 8. AG2 Fundamental Concepts

The basic structure introduced is:

```text
Assistant Agent
       +
Conversable Agent
```

### Assistant Agent

Basic single-agent interaction:

```text
User
 ↓
Assistant Agent
 ↓
LLM
 ↓
Response
```

### Conversable Agent

Important for multi-agent conversation:

```text
Agent A
   ↕
Agent B
   ↕
Agent C
```

The transcript presents multi-agent conversation as the major power of AutoGen/AG2.

---

# 9. LLM Configuration

An agent is associated with an LLM configuration.

Conceptually:

```text
Agent
 ↓
LLM Configuration
 ↓
LLM Provider / Model
```

The transcript demonstrates OpenAI API/model configuration.

The configuration identifies the provider/model used for the agent's generation and reasoning.

---

# 10. Basic Assistant Agent Example

Workflow:

```text
Install AutoGen
       ↓
Configure API
       ↓
Create LLM Config
       ↓
Create Assistant Agent
       ↓
generate_reply()
       ↓
Question
       ↓
Answer
```

The transcript uses a World War II summary as the example.

The first response does not perfectly follow the requested format, illustrating that LLM output is not a deterministic function with guaranteed formatting.

---

# 11. `generate_reply()` vs Conversation

### `generate_reply()`

One-way interaction:

```text
User → Agent
       ↓
    Response
```

### Conversation

Multi-turn interaction:

```text
Agent A → Agent B
Agent B → Agent A
Agent A → Agent B
...
```

Therefore, `generate_reply()` should not be confused with a multi-agent conversation.

---

# 12. Why Multiple Agents?

A single LLM/agent can make mistakes.

Example:

```text
User asks for a 10-line World War II summary
        ↓
Agent 1
        ↓
Potentially poor answer
        ↓
Agent 2 / Critic
        ↓
Evaluate
        ↓
Feedback
        ↓
Agent 1 regenerates
```

This creates an iterative quality-improvement loop.

---

# 13. Critic / Judge Agent

A second agent can act as a judge.

Example instruction:

```text
Evaluate Agent 1's answer.
Score it from 1–10.
Accept only if score > 8.
Otherwise provide feedback and request regeneration.
```

Flow:

```text
Agent 1
  ↓
Answer
  ↓
Agent 2 — Critic
  ↓
Score + Feedback
  ↓
Agent 1
  ↓
Improved Answer
```

This leads into agent reflection.

---

# 14. Conversable Agent

The transcript presents the Conversable Agent as a fundamental AG2 building block for multi-agent conversations.

It can support:
- agent-to-agent conversation,
- LLMs,
- tools,
- human-in-the-loop interaction,
- autonomous multi-agent systems.

---

# 15. Philosopher + Student Example

Two agents are created.

### Agent 1 — Philosopher Agent

Responsibilities:
- mental-health/philosophy-oriented assistance,
- positive communication,
- empathy,
- user support,
- answer refinement.

### Agent 2 — Student Agent

Responsibilities:
- act like a student,
- ask questions,
- evaluate answers,
- rate responses,
- request improvement.

```text
Student Agent
     ↓
Philosopher Agent
     ↓
Answer
     ↓
Student / Critic
     ↓
Rating
     ↓
Improvement
```

---

# 16. System Message

The system message defines an agent's role and expected behavior.

Example:

```text
You are a philosopher / mental-health expert.
Respond positively.
Listen patiently.
Respond empathetically.
```

Student:

```text
You act like a student.
Ask interesting questions.
Evaluate the answer.
Give a score.
```

The system message establishes the agent's behavioral role.

---

# 17. Initiating a Conversation

After creating two agents, a conversation is initiated.

Conceptually:

```text
Student
   ↓
initiate_chat()
   ↓
Philosopher
   ↓
Student
   ↓
Philosopher
```

Important pieces include:
- initiating/sending agent,
- recipient,
- initial message,
- maximum number of turns.

---

# 18. `max_turns`

Conversations should be bounded.

Example:

```text
max_turns = 3
```

This limits the number of dialogue turns.

Reason:

> Each LLM call can consume tokens and API cost.

Therefore, unnecessary or infinite conversation should be avoided.

---

# 19. Human-in-the-Loop

Autonomous:

```text
Agent A ↔ Agent B
```

With human participation:

```text
Agent A
   ↓
Human
   ↓
Agent B
```

The transcript demonstrates `human_input_mode="always"`.

This gives the human an opportunity to provide feedback during the conversation.

---

# 20. When to Use Human-in-the-Loop

The transcript emphasizes that agent systems are intended to be autonomous.

Therefore, involving a human at every step can reduce the value of autonomy.

Human input is appropriate when:
- a human preference is important,
- the decision is sensitive,
- the agent cannot safely decide,
- approval is required.

Otherwise:

```text
Clear Goal
 ↓
Autonomous Agents
 ↓
Iterations
 ↓
Best Output
```

---

# 21. AI Travel Planner — Case Study

The first larger case study is an **AI Travel Planner**.

Inputs can include:
- budget,
- destination,
- number of travelers,
- dates/duration,
- preferences,
- food,
- culture,
- adventure,
- relaxation.

---

# 22. Travel Planner — Two-Agent Architecture

### Agent 1 — Travel Planner

Responsibilities:
- ask questions,
- understand preferences,
- create itinerary,
- refine itinerary.

### Agent 2 — Traveler

Responsibilities:
- represent user preferences,
- answer planner questions,
- rate the itinerary,
- request changes when the score is low.

```text
Traveler Agent
      ↓
Travel Planner
      ↓
Itinerary
      ↓
Traveler Feedback
      ↓
Refinement
```

---

# 23. Travel Planner System Message

The planner is instructed to:
- be smart and friendly,
- create an itinerary,
- respect the requested duration,
- ask preference questions,
- identify nature/culture/food/adventure interests,
- refine the plan based on feedback,
- improve until a satisfactory rating is achieved.

A clear goal is important for autonomous agent behavior.

---

# 24. Italy Example

The traveler requests:

```text
5-day trip to Italy
```

The planner proposes:
- Rome,
- Florence,
- historical/cultural activities,
- transportation,
- accommodation,
- food recommendations.

The traveler asks an additional food question and eventually provides a high rating.

---

# 25. Goa Example

Another example:

```text
4-day Goa trip
```

Preferences:
- adventure,
- beach relaxation.

The planner proposes activities such as:
- beaches,
- water sports,
- waterfalls,
- scuba diving,
- relaxation.

The traveler can request additional detail and eventually provide a high rating to terminate the conversation.

---

# 26. Agent Reflection

**Agent Reflection** means one agent evaluates, critiques and helps improve another agent's output.

Mental model:

```text
Generate
   ↓
Reflect
   ↓
Critique
   ↓
Improve
   ↓
Generate Again
```

The transcript connects reflection with:
- spotting errors,
- reducing hallucination/error risk,
- improving output,
- autonomous/adaptive behavior.

---

# 27. Four-Agent Multi-Agent System

The transcript then moves from:
- one agent,
- two agents,

to a four-agent system.

The framework's value becomes more obvious as orchestration complexity increases.

---

# 28. Consumer Lending Pre-Screening — Case Study

The major business case study is:

**Consumer Lending Pre-Screening / Customer Onboarding**

The objective is to use agents to handle early customer questions and pre-screening.

The transcript specifically frames this as a front-end/onboarding process rather than a final loan-approval model.

---

# 29. Lending System — Agent Responsibilities

### Agent 1 — Profile Information Collection

Collect:
- customer name,
- mobile number.

Once both are available:

```text
TERMINATE
```

### Agent 2 — Preference Scanning

Identify:

```text
Home Loan
Personal Loan
Education Loan
Gold Loan
```

### Agent 3 — Loan Documents

Provide the required checklist based on the selected loan.

### Agent 4 — Customer Proxy

This is **not an LLM-based agent**.

It represents actual human/customer input.

```text
Human
 ↓
Customer Proxy
 ↓
Other Agents
```

---

# 30. Why the Customer Proxy Is Not LLM-Based

The transcript's reasoning is that the LLM should not invent actual customer information such as:
- name,
- mobile number,
- loan choice.

The human should provide those values.

Therefore:

```text
LLM Agents
= Reasoning / Understanding

Customer Proxy
= Actual Human Input
```

---

# 31. Traditional Software vs AI Agent

### Traditional Software

```text
Form
 ↓
Name Field
 ↓
Mobile Field
 ↓
Strict Logic
```

A free-form message such as:

> "My name is X, my mobile is Y and I need a personal loan."

may not fit a rigid form-based workflow.

### AI Agent

The LLM can interpret the natural-language statement and identify:
- name,
- mobile,
- loan preference.

The transcript presents language understanding and flexible interpretation as a major difference between conventional rigid software and AI agents.

---

# 32. Natural Language vs If/Else

Traditional approach:

```text
IF "personal loan"
    → Personal Loan Flow

IF "gold loan"
    → Gold Loan Flow
```

Agentic approach:

```text
User:
"I need money by keeping my gold as collateral."

        ↓

LLM understands intent
        ↓
Gold Loan
        ↓
Relevant Flow
```

The transcript uses this as an illustration of natural-language understanding.

---

# 33. Termination Logic

Agent loops require clear termination conditions.

```text
Collect required information
        ↓
Required data complete?
   ↓ Yes       ↓ No
TERMINATE     Continue
```

Examples:
- name + mobile complete → stop Agent 1 interaction,
- loan preference identified → stop Agent 2 interaction,
- document checklist delivered → final output.

---

# 34. Conversation Routing

### Conversation 1

```text
Profile Info Agent
        ↓
Customer Proxy
```

Message:

```text
Please provide your name and mobile number.
```

### Conversation 2

```text
Preference Scanning Agent
        ↓
Customer Proxy
```

Message:

```text
Which loan are you interested in?
```

### Conversation 3

```text
Customer Proxy
        ↓
Loan Documents Agent
```

Message:

```text
What documents are required?
```

Final:

```text
Loan Documents Agent
        ↓
Required Document Checklist
```

---

# 35. Sender → Recipient → Message

A key AutoGen orchestration concept in the transcript is:

```text
Sender
  ↓
Recipient
  ↓
Message
```

Example:

```text
Sender:
Profile Information Collection Agent

Recipient:
Customer Proxy Agent

Message:
Please provide your name and mobile number.
```

Explicit routing is essential in a multi-agent workflow.

---

# 36. Conversation Summary

The transcript also uses summarization to reduce a long conversation into required fields.

```text
Long Conversation
      ↓
LLM Summary
      ↓
Structured Information
```

For example:

```json
{
  "customer_name": "...",
  "mobile_number": "..."
}
```

The downstream process needs only the required structured information, not the entire conversation.

---

# 37. Structured Output Thinking

A useful pattern is:

```text
Conversation
 ↓
Summary / Extraction
 ↓
Structured Data
 ↓
Next Agent
```

For the lending case:

```text
Customer Conversation
        ↓
Name + Mobile
        ↓
Loan Preference
        ↓
Documents
```

---

# 38. Why a Framework Helps

Without a framework, many concerns may need to be implemented manually:

```text
Agent State
Agent Routing
Message Passing
Conversation History
Loops
Critics
Human Input
Termination
Summarization
Error Handling
```

A framework provides abstractions:

```text
AutoGen
 ↓
Agent Abstractions
 ↓
Conversation
 ↓
Routing
 ↓
Multi-Agent Orchestration
```

This is the central value of the framework discussed in the transcript.

---

# 39. Single Agent → Two Agents → Multi-Agent

Complete progression:

```text
Level 1
Single Agent
   ↓
generate_reply()

Level 2
Two Agents
   ↓
Conversable Agents
   ↓
Conversation

Level 3
Human-in-the-Loop
   ↓
Human + Agents

Level 4
Agent Reflection
   ↓
Generator + Critic

Level 5
Multi-Agent System
   ↓
4+ Specialized Agents
```

---

# 40. Simple → Advanced → Super Advanced

## Simple

```text
User
 ↓
Assistant Agent
 ↓
LLM
 ↓
Answer
```

## Advanced

```text
Agent A
  ↕
Agent B
  ↓
Feedback
  ↓
Improvement
```

## More Advanced

```text
Human
  ↓
Customer Proxy
  ↓
Specialized Agents
 ├── Profile
 ├── Preference
 └── Documents
```

## Super Advanced

```text
User
 ↓
Orchestrator
 ↓
Multiple Specialized Agents
 ├── Planner
 ├── Researcher
 ├── Executor
 ├── Critic
 ├── Validator
 └── Human Approval
 ↓
Structured Final Result
```

---

# 41. Errors & Gotchas

### 41.1 AutoGen Version Confusion

Identify whether code belongs to:
- Microsoft AutoGen,
- AG2 / AutoGen 2.

### 41.2 Wrong Framework Code

Online examples may belong to another framework or project version.

### 41.3 LLM Output Is Not Guaranteed

A four-line request may not always return four useful lines.

### 41.4 Too Many Turns

More turns mean more LLM calls, tokens, cost and latency.

### 41.5 Infinite Loops

Critic/regeneration loops require termination conditions.

### 41.6 Human-in-the-Loop Overuse

Requiring a human at every turn removes much of the autonomy benefit.

### 41.7 Role Confusion

Every agent should have a clear responsibility.

### 41.8 Poor Naming

Meaningful agent names reduce orchestration mistakes.

### 41.9 Wrong Recipient

Incorrect sender/recipient routing can break the workflow.

### 41.10 Missing Termination

Every iterative conversation needs an exit condition.

---

# 42. Best Option — Architecture Comparison

| Requirement | Recommended Pattern |
|---|---|
| Simple Q&A | Single Assistant Agent |
| Agent-to-agent discussion | Conversable Agents |
| Quality checking | Critic / Reflection Agent |
| Human approval | Human-in-the-loop |
| Specialized workflow | Multiple specialized agents |
| Complex routing | Explicit sender → recipient mapping |
| Long conversations | Summary / structured extraction |
| Cost control | Limit max turns |
| Sensitive action | Human approval |
| Many agents | Framework-based orchestration |

---

# 43. Interview Questions — Junior

1. What is an Agentic AI framework?
2. What is AutoGen?
3. What is AG2?
4. What is the difference between Microsoft AutoGen and AG2 according to the transcript?
5. What is an Assistant Agent?
6. What is a Conversable Agent?
7. What does `generate_reply()` do?
8. Why do we need multiple agents?
9. What is human-in-the-loop?
10. What is `max_turns`?
11. What is agent reflection?
12. What is a customer proxy agent?
13. Why can LLM configuration be separated from agent definition?

---

# 44. Interview Questions — Mid Level

1. Explain single-agent vs multi-agent architecture.
2. Why is a critic agent useful?
3. How does agent reflection work?
4. How would you prevent infinite agent loops?
5. Why is `max_turns` important?
6. How does human-in-the-loop work?
7. What is the difference between `generate_reply()` and multi-agent conversation?
8. How would you design an AI travel planner using two agents?
9. How would you design a lending pre-screening workflow using multiple agents?
10. Why should the customer proxy not be LLM-driven?
11. How would you route messages between specialized agents?
12. How would you convert long agent conversations into structured output?

---

# 45. Interview Questions — Senior / Architect

1. Design a production-grade multi-agent architecture using AutoGen/AG2.
2. How would you decide whether a problem needs one agent or multiple agents?
3. How would you prevent agent-to-agent infinite loops?
4. How would you evaluate whether a critic agent actually improves quality?
5. How would you control LLM cost in a multi-agent workflow?
6. How would you handle failed agents and retries?
7. How would you preserve state across multi-agent conversations?
8. How would you enforce authorization for individual tools?
9. Where should human approval be inserted?
10. How would you audit a lending onboarding workflow?
11. How would you ensure sensitive customer information is not hallucinated?
12. How would you design structured outputs between agents?
13. How would you migrate the architecture between AutoGen, LangGraph and CrewAI?
14. When does multi-agent architecture become unnecessary complexity?

---

# 46. Quick Revision Cheat Sheet

```text
Agentic AI Framework
= Framework for building/orchestrating AI-agent systems

AutoGen
= Agentic AI framework discussed in the transcript

AG2
= Open-source AutoGen direction discussed in the transcript

Assistant Agent
= Basic single-agent interaction

Conversable Agent
= Agent abstraction for multi-agent conversations

generate_reply()
= Generate a response from an agent

Conversation
= Multi-turn agent interaction

Human-in-the-loop
= Human participates in agent workflow

Critic
= Evaluates another agent's output

Agent Reflection
= Evaluate → Critique → Improve

max_turns
= Limits conversation iterations

Customer Proxy
= Human input represented in the workflow

Sender
= Agent initiating a message

Recipient
= Agent receiving a message

Structured Output
= Convert conversation into required fields
```

---

# 47. Final Summary

The transcript progresses from basic agent frameworks to increasingly complex multi-agent systems:

```text
Agentic AI Framework
        ↓
AutoGen / AG2
        ↓
Assistant Agent
        ↓
Conversable Agent
        ↓
Two-Agent Conversation
        ↓
Human-in-the-Loop
        ↓
Agent Reflection
        ↓
Four-Agent System
        ↓
Real Business Case
```

Major case studies:

### AI Travel Planner

```text
Traveler
   ↕
Travel Planner
   ↓
Refined Itinerary
```

### Consumer Lending Pre-Screening

```text
Customer
   ↓
Profile Agent
   ↓
Preference Agent
   ↓
Loan Documents Agent
   ↓
Final Checklist

Customer Proxy
= Human input throughout the process
```

Core lesson:

> **Multi-agent AI is not simply “more agents.” Its value comes from clear responsibilities, defined communication paths, feedback/reflection, bounded iterations, and deliberate decisions about where humans must remain in the loop.**

---

# 48. Assistant-Added Study Notes

> **This section is additional guidance and is intentionally separate from the source material.**

## Production considerations

For a real multi-agent system, also consider:

- authentication and authorization,
- PII protection,
- prompt injection,
- tool permissions,
- audit logs,
- retries/timeouts,
- circuit breakers,
- deterministic structured outputs,
- evaluation datasets,
- observability,
- cost budgets,
- human approval for high-impact decisions.

## Multi-agent decision rule

```text
Can one agent reliably solve it?
        │
       YES
        ↓
Use one agent

       NO
        ↓
Can tasks be cleanly separated?
        │
       YES
        ↓
Use specialized agents

       NO
        ↓
Consider better prompting,
tools, RAG, workflow orchestration,
or a different architecture first.
```

This prevents multi-agent architecture from being used merely because it looks sophisticated.

---

# Appendix — Complete Original Uploaded Transcript

Introduction to AutoGen Hi, this is Wenut. We just turned into wanker ready classes. This video is part of a series. Complete the previous videos in this playlist [music] before you start this video. The complete playlist information, the material and the code file information is given in [music] the video description below. Now we are going to discuss about uh What is an Agent AI Framework? autogen. This is one of the agent AI framework. First of all, what exactly is an agent AI framework? Whenever you hear the term framework that means somebody who has written a code to make your life easy to build applications related to agentic AI. So you are building multiple AI agents they're talking among each other and there will be a lot of orchestration that is required. One AI agent takes the input and it gives the output somewhere you have to store that a part of the output should go to agent two. A part of the output should go to agent three. Maybe there is another AI agent which will correct this. So there is a lot of two and fro that is going on in between these AI agents. Now instead of writing the code everything by myself is there any setup? Is there any set of packages or functions that I can use? If you're looking for them then these agent AI frameworks will appear in front of you and say that yes we have a certain terminology if you follow this particular piece of code automatically you will be able to build the applications related to agent AI very easily or multiple agents if you're handling then you can use our framework a framework will have access to LLM tools memory planning lot of planning and the collaboration between the AI agents so agentic AI frameworks totally focus on building agentic related applications or the softwares generative AI frameworks focus on building genai related applications Tell me a couple of genai related frameworks that got famous in the early days. When I talk about Genai frameworks, what is the framework that we have discussed in Genai? Which framework was discussed by us in Genai? Which framework? Anybody? Lang chain and lang chain is the one that we have discussed. Lang chain is the most famous one in the world. Apart from that there are other AI frameworks as well. JIA frameworks which we haven't discussed but they are not that prominent. But who knows maybe the company that you're working if they say that I want to build a gen project. I want to build rag only but you know what I don't want to use uh lang chain I want to use some other framework then maybe from framework to framework there will be slight syntax difference can you give me another framework anything that you have heard apart from lang chain lang graph and uh langraph is not uh particularly genai specific I would say if you see lang chain now lang chain is not a competitor of langraph in the sense what lang chain can do may not be done by lang graph what lang graph can do may not be done by lang chain like this is specifically created for agenti applications so if See what are the competitors of lang chain let's say within the space of langcha frameworks I would say another one is llama index have you heard of it llama index I think since lang chain itself is very famous the rest of the frameworks did not even come into the picture a lot of people did not even explore them but only when you need them then you can learn so there are a couple of other frameworks as well as as well set by other companies but lang chain is the most famously used one okay similar to that in agentic there are around three or four maybe five frameworks are getting very famous one of the framework that a lot of people talk about is autogen. Somehow it is pretty smooth and the code is pretty easy and everything seems to be somebody has thought of how agentic AI system should be kind of orchestrated. So it looks pretty smooth to handle autogen. And then lang graph lang chain is for gen applications and then lang graph is for agent related applications and then crew lang graph is slightly difficult to learn the architecture and the way that you write the code is a little like the learning curve is little steep compared to other ones. Crew AI is the another good one which is easy to learn and we can build complex applications and there's a lot of a lot of documentation and there will be a lot of discussions around the internet which will make our development much easier. Meta GPT and then open agents and then super agent NA10. NAN is the one that is very famous because of its no code terminology or low code AutoGen: Microsoft vs. Open-Source (AG2) terminology very very minimal amount of code is need to be written. Apart from this also there are several agent AI frameworks. We may get to hear them in future because we are at a very beginning stage. What we will do is we will learn maybe three or four frameworks and then we feel confident to handle any of the framework. Each framework have their own strengths and weaknesses. Autogen originally created by Microsoft. Autogen was introduced as a open-source framework by Microsoft and they want to make this whole uh agentic AI related applications multi- aent related conversations much much easier. One of the key difference between Gen AI and agentic AI. What is the key difference? If you ask me in genai also there are AI agents. You work with AI agents. But when somebody says I'm talking about agentic AI system, they mean to say it's not just one AI agent. It is agent one, agent two, agent three, agent four maybe 30 agents and then another four agents working as critics. Another agent is working as the one that is giving feedback etc. You are simply working with multiple AI agents. So that is what this agent that is when I think this term also came up. I'm building an agentic AI system where multiple agents are working together to solve my final ultimate goal. I have given them a goal as this one. This is the problem that you have to solve. This is a piece of software you have to create. Now to create this software, somebody has to write the front- end code. Somebody has to write the back end uh uh database code. Somebody has to write the forms, somebody has to do the testing, somebody has to do the error handling, somebody has to do the debugging, somebody has to write the test cases. Like that there are so many tasks when a software is being created. Several people will be working. Can I create all these agents? Once this is done, okay, I found the error. [clears throat] Where this error? Which agent should handle this error? Which agent should collate all these errors? After that, which agent should send this information to? Which other agent which will do the correction? After doing the correction, which agent should take that correction and make the correction after that, which agent should restart this whole process of testing. Now, this is too much of exhaustive thinking that need to be done. But why are we doing all this? Because we are simply replacing humans who are creating softwares. Now, softwares or the AI agents, they themselves are creating softwares. Now as a human you just need to have right clarity on what is the product that you want what are the features that you want to include that's it rest of the things will be taken care by AI agents they make mistakes they correct their own mistakes as well now I want to tell you one very important information here there is hell a lot of confusion in the internet when people say autogen now sometimes what happens is if you're searching for some documentation or some of the code related to autogen pieces of code they work perfectly some pieces of code they don't work then you will be banging your head because on the documentation side it is working and it is the latest documentation but it is still not working the same autogen one in some places If you just make small change, if you just add one extra line of code, this may break. It is not really working. There is a reason for that. Autogen there is no single autogen. There are two autogens. A lot of people do not know this or maybe it is not very explicitly very explicitly announced everywhere or only people who knew it they never told that very loudly to others. So there is some confusion. There are two autogen one is Microsoft autogen the other one is autogen 2. Autogen one autogen 2. So autogen it started as one autogen only but last year around this time exactly November 2024 one year back the same autogen split into two. So they have taken the same autogen they forked it. Now this is open source. This is known as autogen 2. This is open source. Now this is paid version. Microsoft autogen is paid. Now both of them are same. Here only Microsoft will develop this. Microsoft if you want to work with this autogen you have to pay to Microsoft maybe companies who are working they may want to take this Microsoft autogen. So if you ask me what is the story behind it looks like within Microsoft the team that developed autogen probably a team of Chinese individuals who have Chinese Chinese researchers and scientists who have developed autogen they have initially thought that we want to keep it open source so that everybody will use agentic AI systems so that everybody will develop agentic AI systems so that we can reach to this AGI very quickly what is AGI Understanding AGI (Artificial General Intelligence) we talk about AI artificial intelligence what is AGI our aim is AI usually but the scientist aim is AGI artificial general intelligence that means they want to build systems not only just understand one specific task. They want to build systems that will understand everything. You want to create an AI system that will work as a watchman as well as a software engineer. You want to work an artificial intelligence system that will work as a cook as well as a pilot. So this is what the whole world is after to reach there. We need to give all these things as open source or free so that everybody will try their hand so that we can quickly finish up AI task. Later on everybody will focus on AGI. But looks like Microsoft thought that no we want to license it Microsoft probably we don't know what are their strategic business moves. They thought that suddenly we cannot give autogen as open source. I think we have to start licensing. Now that is where this split has happened. I think one of the creators in his LinkedIn or Twitter or somewhere he announced that sorry we are not uh going ahead with Microsoft. Whatever is autogen that we have developed until now from that point onwards we are making this as open source. This one we will take the base and then every development that we do it will be communitydriven. That means people from the community will be suggesting the changes. Everybody will like we will be handling it like a true open source. And the same copy Microsoft has taken they will do their own development. They will add their own functions. They will add their own features. But that will be the paid version. The syntax almost almost remains the same. Obviously they have folk from the same package but there will be slight changes because afterwards whatever development has happened. Some features may be different here. Some features may be different here. This is a very big point that we need like it looks like a very simple point but unless until you know that there are two autogens you will be never kind of uh confident on what you are developing because what happens is I have seen a lot of people asking asking this question. I have seen a lot of people getting confused and even in the online forums also I have seen somebody says that this particular code did not work. The only solution that you get below is I think you are using the wrong autogen code. It is AG2 that you have to use or you have to use Microsoft autogen. Somebody who is working on Microsoft autogen if they are searching for the code sometimes they may get AG2 code and they may copy paste from there which will be wrong. Vice versa you are developing on AG2 but when you're searching on internet you got Microsoft related code you copy paste that then you may get wrong. So this happened around 2024 last year this time. So the one that we are using obviously we cannot be using the paid version from Microsoft. We will be using Autogen 2 AG2. In fact, originally if you go to pip install autogen, it will be installing autogen to the open source version. Autogen in outside world knows as autogen 2. If you're talking about autogen by Microsoft specifically, you have to say Microsoft autogen. So you might have heard whenever there is a discussion about autogen on internet or in YouTube, people will particularly say Microsoft autogen. People don't say Google Gemini. People don't say OpenAI JGPT. You don't really say the company name and the actual tool. But here in the case of autogen so the names that are used the terminology is Microsoft autogen and then the second one is autogen or ag2 autogen 2. So the actual typical terminology is Microsoft autogen and then autogenic autogen is a paid version. Autogen is a free version. Chi wang is the person who announced this saying like what all this means. I think this is on LinkedIn. He told that we have built this to make sure that everybody tries to use it and then uh like uh we thought that uh multiple companies and multiple university students are using it and we are very happy but now we have taken a bold step. Autogen is becoming AG2. Now this is announcement that Chiwang on his LinkedIn has given probably Microsoft would have also given the similar kind of announcement that autogen will become Microsoft autogen but he's the one of the original developers. I think Microsoft what they would have done is you take whatever you have developed until now you can take it as open source and then they have taken one version they are making it as paid. So in short this whole discussion that we had my only point is to highlight that there are two autogen one is uh Microsoft autogen which supports Microsoft broader ecosystem which is maintained by Microsoft and the one that we will be using here is the open source one AG2. Now is it necessary that I learn Microsoft autogen and AG2 separately? Not necessary. For example, if I learn Excel, I can automatically handle Google Sheets. Google Sheets is different. Google Sheets is handled by Google company and then Excel is by Microsoft. Now, do I really need to learn Excel and do I really need to learn Google Sheets? Is there any difference between them? Yes. Does that mean I have to learn them separately? No, not necessarily. If you learn Excel, you can handle Google Sheets very well. Similarly, if you learn Autogen 2, you should be able to handle Microsoft Autogen. You don't really need to learn this separately as a separate tool all together. Are you with me? Will there be any confusion in future? If you do pip install Autogen in Python, by default, Autogen 2 will be installed. It will not be Microsoft autogen. Okay. AutoGen 2 (AG2) Fundamentals Any questions on that? Anybody? How many of you already know this that autogen and Microsoft autogen are different? Anybody? Now let us try to understand AG2 and uh some of the fundamental concepts of it and we'll try to build a couple of applications aki mi aent related applications using autogen 2 or autogen. Now I will just use the term autogen. You have to understand we are talking about the open source version of the autogen from here on the basic fundamental structure is assistant agent which is similar to our single agent that we have created earlier and then later on there will be conversational agent. Now that is a one that will handle the conversations between the multiple uh assistant agents or multiple AI agents. So first let us do one AI agent which is known as assistant agent. Let us see how to build that. I think it's better that we code it rather than discuss it. First let me just uh show it to you some of the code and then we will uh go to the practice. So install pip install autogen install the packages. After this sometimes it may ask for a restart. A restart may not be required. And then uh I'm using open AAI API key my key. Once that key is uh done I will say import autogen. If you say import autogen it automatically imports our autogen not the Microsoft autogen. General in the world of Python autogen means autogen 2 for the open source version of autogen from autogen import lm config I think let me give a small hint to Google that I'm talking about assistant agent so that it can suggest me the code quickly from autogen import lm config lm configuration that means while I'm using AI agent I can tell use openai or use Google gemini or use go here or use cloud which LLM that I want to use behind the scenes of this agent so that it can give me the right answer or it can do the thinking part of it. LLM config followed by assistant agent. The original one, the real one is not the assistant agent. When people are talking about autogen, they talk about conversational agent. That is the one that is a real power or that is a real use of autogen. But I will start with the basic one. Assistant agent is like a single agent which is trying to answer your questions. So my LLM config my LLM configuration that I want to create is I would say LLM config. What is the API type? API type is what kind of API that you're using? Are you using Google API? Are you using Gemini API? Like are you using coher API? So that is a API type that means which large language model are you using? Which large language model API. So your API is large language models API open AI. And you can also mention the model. So I want to use GPT 3.5 turbo. That is the one that charges less in terms of the tokens. So GPI GPT 3.5 turbo is the LLM configuration that I want to use. Now that is working. Once that is done, I would say I will define my agent. Agent equal to assistant agent. You can give a name to this agent. Later on, we will be referring to this uh agent. Whatever is the question that we want to ask, we will be mentioning this name and use this lm configuration. Now we will try to generate a reply from this agent. I would say agent dot generate a reply. Agent dot generate reply and then I can ask a question. Now there is a particular format that we need to ask. We have to ask we have to give it like messages. Give me a four-line summary of World War II is what my question that I'm asking. Role equal to user, role equal to system, role equal to assistant. So you can give multiple roles. Role equal to user means as a user you are asking a question. If you put role equal to system then you set a system behavior. For example you will say you are a helpful AI assistant or you are a assistant related to customer relations or you are an assistant who is giving legal advice like that system role also you can set here role equal to user means as a user I am asking give me a fourline summary to this particular agent. So once I do that I will get the output world I will use my language skills to provide four-line summary of world war 2 etc etc. It has provided it. A better neater way to do this would be store it in reply and then uh print reply that may look slightly better. That is what I'm thinking. I need to provide four lines summary of World War II. Okay, understood. I will start by briefly mentioning the causes of the war. Then I will send so this one did not understand. Give me a four line summary. It has stopped after four lines. What nonsense is this? So it has given four lines but it has given us its thoughts only. Now this is not the problem of agent. This is the problem of chat GP itself or the open area. Let us reexecute it. I will search for the brief summary of tool. I need to find the essential keywords. Let me look at the keywords. I'll provide to the four line summary of the World War II. Let me give around 10 line summary. World War II. Yeah, I think now it has understood or maybe this time the one that we got is much more relevant. The World War II is a global conflict. The world began with Germany's invasion of Poland in 1939. Main access powers were Germany, Italy, Japan, etc., etc., United States and then Soviet Union, United Kingd, etc. This is the summary of World War II. Even though we talking about assistant agent, this is just to get a feel of how this whole system works but the real one will be conversible agent which we are going to try later on. What you can do is either you can uh do this for openi API key or if you have the key then uh you just uh do this one also osen environment API key you just put your key in the codes here. If you're not sharing your code with anybody this is not a standard uh method but if you're not sharing your code with anybody code file then you can put your key here as well. like this. Handling Multiple AI Agents All right. When it comes to agent AI frameworks, the real power or the real use is in the handling of multiple AI agents. AI agent one followed by agent two, agent three, agent one is talking to agent two, agent two is talking to agent three and they are trying to solve a problem. Why multiple agents are required? Sometimes one AI agent can do mistake. You have seen that mistake, isn't it? I think uh when we executed this twice, first two times the answer was not really sufficient. Now since I'm a human being, I read the answer. I have uh tried kind of uh do it a couple of times to get the output. But what if you already set this system and the user the final user get to see those answers. He will really laugh at our AI agent system. The final user will see the answer and he will get to know that there is not a strong uh uh system or the thinking system that is working behind the scenes when we are giving the replies. Now what if instead of giving the reply to the user, user has asked this question, give me a 10line summary of World War II. If the answer is funny, if the answer is not satisfying, I want to redo it. If that is also not satisfying, I want to redo it. Maybe I want to do it three four iterations. Then I want to give the right proper answer. But if you're using LLM, it can do relation. If you're using LLM, it is just a next token generation system. It can do mistakes. But LLM has the ability to understand the user question also. So what we will do is we will create another agent. Then we will create a conversation between those two agents. We will create another agent. See the user will ask a question. Agent one will give an answer. Then your job is to look at the agent one answer. And you understand user's question. See whether agent one answer is satisfactory or not. based on the agent one answer rate the answer between 1 to 10 and then only exit if the answer is scoring more than eight. So that is the task that I have given agent two. What did I tell agent two? You act as a judge and if the answer is scoring above eight marks then only you let it go. In the first answer when we got the first answer I will tell about World War II. I will try to arrange them as four points. Now I'm thinking and then done. Now that will go to agent two. Agent two will try to give marks to that. Agent two will say this is not really good. User has asked for 10 line summary of World War II but I could not see any anything that is mentioned related to World War II. So it will give less marks and then it will again ask the agent one to regenerate this whole thing that I have told. Agent one will give an answer. Agent two will act as a critic and try to give a feedback. Again agent one try to regenerate the answer. Agent two will work as a critique and then give back the answer. This will go inside the loop. So earlier there within the agent there is a thinking loop. Now you want to even in this thinking loop there is a chance that it will get stuck in its own loop. That was one of the biggest issues with the agent. That is one of the biggest limitation with the agent. Now I'm coming out of that agent to give a feedback to the first agent. So that means you want to strike a conversation between the agents. Now if you want to strike a conversation between the agents then you need a setup that can accept multiple AI agents. So one of the thing that has been introduced by autogen is conversible agent. Conversible agent is a fundamental building block of a2 for multi- aent conversations. If you want your agents to talk among themselves then you need conversible agents. Conversible agents will use lms tools. You can also put human in the loop. If at all you want to build a system where agent is also giving feedback but from the human also if you want to take some input this is not what I'm looking for I want extra or I want slightly larger answer I want answer related to this or maybe take this information my rating is this like that if you want to include human in the loop that is also fine or you can let the agentic AI systems think autonomously so one agent two agent three agent in that multiple AI agent slowly we are going to build multi- aentic AI system so let's start with conversible agent so how do we code about conversible agent you say my LLM config it looks similar to the assistant agent but slightly different uh function my LLM config I will use openAI the agent that I'm creating this time is conversible agent anyway I should have imported it first let me import it from autogen import conversible agent since I have imported directly I will just directly write is conversible agent name is agent my configuration is lm configuration my result is generate reply generate reply Okay, let me ask you a different question. Let me ask this question as give me the list of wonders in the world. Give me the list of wonders of the world. What are the seven wonders in the world? See, generate reply is not same as conversation. Later on, we will try to reach the conversation. For a conversation, you need two agents. First, we will define agent one and then if it is generate reply, agent is just replying to the user. It is similar to our previous assistant agent. But if you want to strike a conversation, you create agent one, tell agent one who you are. You create agent two, tell agent who that agent is. And then you write another uh another piece of code saying agent one, you talk to agent two and then you talk to among yourself for maybe five six times and give me the final answer. That is what we will say. But here generate reply is similar to the previous one. And then we will try to print the result. These are the seven wonders of the world. Great pyramids. New seven wonders are also there. Looks like I didn't know that. Seven natural wonders of the world, right? Now we will try to generate two agents create two agents and then we will try to strike a conversation between them. So from autogen at times I write the same code twice or thrice even though we have imported the packages because we want to get a kind of uh we want to be just little comfortable with what the packages that we are using. So from autogen import conversible agent and conversible agent and lm config. Then you define lm config here since we are using open API key once it is fine. Now the idea is I will create two agents here. Agent number one is philosopher agent. So this agent is a kind of philosophy master or some kind of mental health expert who will help us in answering questions related to philosophy. And the aer agent so this is like master agent. Then we will create another student agent and then we'll try to strike a conversation between them. So philosopher agent the first one is philosopher agent that I'll create. Second one is student agent. So first let's create philosopher agent. You just write whatever is the agent name conversible agent name is philosopher agent and then you write a proper system message because you want to define who this person is. So I want to say this particular agent I will say internally in it system I want to say when I say philosopher agent internally what I'm expecting. So system message is you are a mental health expert. You will help people to improve their mood and overcome depression. You will always speak positively and encourage others. Maybe the toxic nature of social media or something. If you want to avoid I want to create an app where people just log in and then they find all the motivation in their life. Maybe 2 3 minutes every day they log in in the morning and check and then they get recharged. If that is the final goal of this app if I want to create that let us see how agent systems will work. You will support people in uh dealing with loneliness. You will listen to them patiently and respond with empathy and then maybe if you want you can take uh feedback also. Finally, take the feedback from the user. Then ask them to rate you between uh 1 to 10 and you refine the answer until you get above eight. Until the user gives above eight, you keep on giving them the answer. Maybe the first answer that you gave may not be good. Then the user will say that no, I'm looking for a better answer. Until you get eight or above, you are you have to keep on giving the answers. That means you will give one answer. Somebody will ask a question how to avoid this. You will give an answer. If that person is not satisfied, he will say only five marks are given out of 10. In that case again you have to regenerate your answer. That is what we told in the system message for the philosopher agent. Philosopher agent created. Now as a good habit what you can do is before you go for the conversation you can always uh check with generate reply quickly. You can ask them like who are you or like just to check whether this is working or not. Instead of directly going into the conversation you can ask you can say generate reply and see how it is working. Generate reply is not same as conversation. Conversation is to and fro to and fro that happens. That means if I ask a question tell me a trick to be happy. Now again in general reply if I ask what was my previous question since it is not a conversation philosopher agent should not will not be able to answer. Let me show you what exactly it means. I said tell me a trick to be happy. It told that I'm really glad you reached out for help. One trick to boost your happiness is practice gratitude. So whsoever has helped you always think about them and try to give them back something like that. It is trying to tell us. Now this is not conversation. Generate reply is not conversation. It is just one way. That means if I go back and ask hey what was my previous question? What was my previous question? Can you tell me that? Then it will say hey I don't know like because that was not a conversation. I'm here to support you. It's okay if you don't remember. So it is giving consoling us because it's a philosopher agent. It's okay if you don't remember the previous question. How can you how can I help you in a better way? So it is thinking that we are suffering mentally. We are not able to recollect the questions. So that is why it is trying to help us or comfort us. But what I meant to say is I want to strike a conversation. To strike a conversation you have the philosopher agent. So that is the first agent. Now let us create another agent called student agent. This will also be a conversible agent. Student agent name is student. Now what is the student's uh role? So I will write the system message. You act like human. You represent the human. Your job is to ask questions to philosophy expert. You ask some interesting questions to him. You can also rate the answer given by the philosopher. Now what am I trying to do? If there is a gibberish junk answer given by first agent by mistake, the student agent will find it out, catch it and say that no this is not the right answer. This is not the appropriate answer. So out of 10 you will get a lesser mark. So you will keep on trying to rate that. Maybe you can uh keep that conversation lengthy also. But we have an option to see how many iterations will it go. So I'm creating second agent which is student agent. Once you have agent one agent two ready then you can start the conversation. But before starting the conversation always to check whether this is working or not. Tell me what is a trick quick trick that I use whether this one is working or not. I will say student dot like is it acting as per our requirement or not. If I want to check that I will say agent dot generate reply agent dot generate reply and then uh probably you can ask a question. I'm asking the student who are you since the system message was there the student uh the student agent will say that I'm a student I'm here to ask questions to the rest of the agents or something. So let us see what is the output here. I just ask who are you? I'm an AI assistant designed to act like human engage in a conversation with you. How can I assist you today? So that is what student want. So you have two agents. Agent one is philosopher agent. Let's think he's a teacher and then student. Now to make these two agents uh talk to each other and reason out and finally give us the much more refined answer then you must initiate a chat. So I would say student will initiate a chat and the recipient will be philosopher agent. Student is initiating a chat and the recipient is philosopher agent. Philosopher agent will be receiving the chat from the student. Student started by saying hello and max turns three that means they will have a conversation three dialog only. Student will ask a question student already started by saying hello. Philosopher guy will reply to that. Student will ask a question, philosopher will reply, student will ask questions, philosopher will reply. In fact, you can put max three, max four, five also. But everything will cost us because we are getting these replies generated by RGBT in the back end. So it will be costing us from open API. So that is why I kept max three. Maybe I'll keep max four just to see what is happening. So let us see everything started with a student to philosopher. He said hello. The philosopher guy told that uh let us see the conversation. Hello there. Great to see you reaching out. How are you feeling today? I'm feeling great. Thank you for asking. How can I assist you with uh philosophical inquiries today? That's wonderful. I'm here to support you. Emotional challenge etc etc. This is what I told you. Thank you for your kind words. I appreciate your aathy. Now do you have philosical questions? I think we will start with the question itself. Instead of hello, I would say what are the ways to save time and increase focus because that master is a mental health expert. So let us see how to save time and increase focus. That is the first question from the student student philosopher. what are the ways to save time and increase the focus and then let us see what the FL I'm really glad that you're looking for ways to improve the focus save time one effective strategy is prioritize your task and create a schedule manage your time better etc etc breaking down your goals and smaller more achievable etc etc etc etc these are all the ones that was gone now the student says that this is amazing advice I rate five out of five do you have any more tips how to enhance focus effectively I'm thrilled etc etc I think we are asking the philosopher agents to stop only when they reach 8 out of 10 I think here you can also rate the answer given by philosopher agent. Out of 10, out of 10, you can mention your ratings. Out of 10, how much is the philosopher scores? You can mention your rating. Now, from here on, the student will try to rate out of 10. So, 9 out of 10 is the one that he has given for the response. If basically, if we are getting a relevant response, automatically the philosopher agent will give 9 out of 10. If uh the response is totally gibberish like the way that we have seen earlier without giving the actual answer if it is beating around the bush then the less marks will be given and then it will start once again. So that is just one way of uh conversation. But the most common one is right now student is talking to teacher, student is talking to teacher and a conversation is going on. But what if I want in the name of student I want to bring the human also into the picture. That means I want to make sure that here is the student when I have defined him. Right now it is a completely autonomous agent between two software agents. The work is going on the conversation is going on and it works perfectly when you are developing a software. One of the agent is uh writing the code, the other agent is testing the code. Simply checking whether it is right or wrong. If it finds error, it informs the first agent and the agent will redevelop and again the second agent will retest. It will Human-in-the-Loop Interaction keep on going in the automatic loop manner. That works perfectly. But in actions like this where you want to take the human input also in that case you can redefine student. You can use something called human in the loop. Right now there's a loop of conversations that are going on between the two agents. You can use human in the loop. So I'm defining the students student as one of the agent. Here I will add one extra parameter called human input mode always. Then while the conversation is going on you will get a chance to enter your feedback and whatever you have entered the feedback based on that the conversation will be ch uh taking the turns. Let us see how that works. I have given the human in the loop or human input mode always. That means when the conversation is going on in between they will stop and ask you to enter your input. So let me say student let me store everything in the result student do initiate chat student is initiating the chat and the recipient is a philosopher agent but within the student I have the human input. So what are the ways to increase the focus is what the question that I have asked. Maximum turns is four. Now let us see. So you have one text box here that appears. The first question is what are the ways to improve the focus? The philosopher agent student is clear that you are looking for ways to improve the focus. One helpful strategy is to schedule or plan, prioritize tasks, break down your task. This can help you to stay organized etc etc. These are the ways. Now there is a strategy called eat the frog first. What exactly that means? Let me ask that question. There is a strategy called eat the frog first. What does that mean? In time management there is this particular strategy. What does this mean? So let us see what is the answer given by the philosopher agent. Eat the frog first is a metaphor. So this is the answer that we are getting. tackling your most challenging task or the least enjoyable task first thing in the morning. Similar to whatever is let us suppose if you have to do four things today and there is one which is very very difficult task. There is one task that is the most boring task, most difficult task and the most annoying task instead of leaving it towards the end of the day. So general strategy and I think this strategy I kind of use it at multiple places especially for time management. This works perfectly. If you want to feel less tensed, less uh like more relaxed, if you want to have lesser anxiety then you can follow the strategy called eat the frog first. So that means at the end of the day if somebody gives you a task that you have to eat the frog today you have 10 tasks one out of them is eating the frog then what people do is they first complete the nine tasks and at the end they keep that eating the frog at the end usually what happens is that will be pushed on and on we will be missing that but generally a good strategy would be if this is the most difficult this is the most annoying task this is the most one that we do not want to do if you still have to complete it if you have to eat a frog by the end of the day you just eat that first remaining nine tasks will be much much simpler faster anyway so this is the metaphor so it is right so what I'll say is that was a good answer I will give give you nine out of 10 marks then it'll say thank you I'm glad to hear that you have discussed etc etc give me a four bullet point summary from the user we are making all these requests it is not always a good idea to involve the user every time because uh you want this to be autonomous so that nobody is derailing the original conversation for which agents are built for agent systems have to be autonomous if at all you want to include anything you are supposed to include before building the agent in the system message itself on the fly you are not supposed to supply like this unless until it is very very critical or very very important human in the loop is must if it is needed then only you include it otherwise it's better to let the agents discuss among themselves and come up with the best of the best output you give them a goal if you know your goal clearly this is what I want and then if you mention it in agent one and agent two they will achieve the goal for sure give a goal to agents ask them you take multiple iterations give me the best of the best output definitely agents will give you that that is what this whole agent system is all about until now whatever I have shown you these are pretty basic task that will give you an idea on just the functions and how it works. What is the overall overall architecture that is behind autogen let us try to build one useful agent. Now Case Study: AI Travel Planner let us do one uh case study using the conversible agent agent conversation. Now the case study that I want to do is like somebody has already built an app around this case study. So I'm taking that idea and then trying to show you how like what was the thinking or planning behind that app. So somebody has created one travel guide app. You know what that travel guide do? You have to give the information on what is your budget and what is your destination preferences, how many people are going and what are the days that you are like what are the dates that you are visiting. So then this travel guide agents I think three four agents will be there. They will be having a huge discussion like the way we will have at our home this is where we must go. These are the things that we must visit this but this is our budget. We cannot go there. We should stay in this hotel. We should on day one we should go here. On day two we should go here. a proper plan will be prepared by us after a discussion of one week or something after doing all that internet search. Somebody thought that why don't I simply create one uh agentic system that can uh replace the whole discussion that we have for one week. So let us try to create two agents like a conversation between them. One agent is a travel planner agent the other guy is the actual traveler himself. So there are two agents. One agent is travel planner agent. So he will giving he'll be giving all the travel plans and this is what you can do that is what you can do etc etc. The other traveler he will say that no I do not have the budget. No no this is not what I want to I'm not satisfied with this. Uh I'm not uh really good with this plan. Like why this conversation is needed? Because travel planner agent maybe it can hallucinate sometimes. Travel planner agent maybe it may derail travel planner agent may not be giving the perfect plan. You have asked for a 4-day plan. It has given the 3 days plan and thought that it is 4 days and it given the wrong answer. Then we need another guy to correct it. So that is another agent. So this is agent one who is a travel planner agent. This is agent two who is the traveler agent. Let me call this agent like for us he is a user agent. He is the app user and this is the travel planner agent. So first let me define the travel planner agent which is going to be a conversible agent. Travel planner agent. Conversible agent name is travel planner agent. System message whatever is the system message that we want to give. You are very smart. You are a very smart friendly travel planner. Your job is to help the user plan their travel itinary. So you have to plan their itinary. If they say 4 days, give it for 4 days. If they say 3 days, give it for 3 days. You will ask relevant questions on preferences. So you will ask relevant questions on preferences for example nature, culture, food etc. Those are the questions that you will ask and then etc. And the travel companies based on the inputs suggest a travel plan. So you will ask like what are you looking for? So basically when the conversation is happening the travel planner agent will ask you what are you looking for? Are you a kind of adventure guy? Are you cool and laidback? Are you looking for beachf facing? Are you looking for uh money saving options? Are you a foodie? What kind of things that you want to do you want to explore the culture or you going for a photography tour? Those kind of questions the travel planner agent will ask based on the answers that the user maybe we will keep human input equal to on. In that case human or the user will give the input otherwise let the LLM itself tell that this is what I'm looking for. Then the travel planner agent will create the proper itinary and each conversation by asking the user if they're satisfied with the refinements or not. If they are not satisfied, if the user if if the user is not satisfied, refine your plan until they give rating nine or above out of 10. Now that is too hard. Maybe eight or above out of 10 and then I will say my lm config is lm configuration. I will close the first agent. Usually immediately after creating an agent as a habit what I do is I will ask the question who are you? To every agent that I create I will ask the question who are you? So that I'll get to know what exactly is this one. So I will say generate reply. What is my question? Messages. Instead of giving this I will say who are you? Are we good? Let us see. Yeah. Hello. I'm a smart and friendly travel planner. I'm here to help you. Travel itinary. Feel free to share your preferences. Agent one is ready. Who's a travel planner? Let us create agent two. Agent two is traveler. This guy is going to take the tour. So now let us give the system message. Here you define agent two. System message is you are a curious and enthusiastic traveler looking for your next trip. You will answer the questions that are asked by travel planner. You will answer the questions asked by the travel planner and also give the feedback on the suggested it itinary. You can also rate between 1 and 10. If it's below 8 then ask for adjustments and improvements. Now I have kept human input equal to always. Intentionally I have kept it because I don't want the traveler agent to act independently and maybe it may not know my preferences. So as a human I want to give my preferences and I also want my traveler agent to help me with what could be the rest of the preferences. So some inputs will be given by the traveler. Some questions will be asked by the traveler guy and some questions or the rest of the questions will be asked by us and as a human if you do not have anything you can just hit enter automatically reply will be generated. Now this is the traveler guy. So quickly we will check whether this guy is working or not. So traveler dot generate reply. I will ask the same question. Who are you? Since it is human input always it I'll just hit enter here. I will not enter anything. No human. Hello. I'm a curious enth enthusiastic traveler looking for the next trip. Once you create these two agents now to get your final plan properly you have to initiate the chat. If you want the travel planner guy to talk with the traveler and finally come up with the best plan. So let's say result is equal to traveler will initiate the chat. Traveler will ask the recipient is a travel planner agent. Then the message is let's say what do you want to do? Hi I want a 5-day trip to Italy. Can you help me? And maximum turns is three. Let me put maximum turns as four. Finally, everything will be stored in the result. We can print the result also once that is done. But while it is generating itself, we will get to see because we have to give the input. So let's start this conversation. Initiate the chat. So let us read it first. I want to plan a fight trip to Italy. That is what the traveler told the travel planner. Of course, I would like to help you to plan a trip to Italy. Let's start by narrowing down the focus of the trip. What are your most interested experiences during the fight trip in the Italy? Are you more interested in exploring the historical sites, enjoying the delicious Italian cuisine or relaxing at the coast or something else? Maybe I'm interested in exploring historical sites or maybe this is the one that I'm interested in. Maybe some museums with the diamonds if they're available. We want to go there, right? And then let us see. So it has given this output. What is the output? Travel planner agent to traveler. So to us, this is a great choice. It is filled with fascinating historical. Since you have five days, I recommend you to focus on Rome and Florence. two series in the history and the culture. Day one, you go to Rome. Day one, two, go to Rome. Day three, five, go to Florence. For transportation between Rome and Florence, I recommend a highspeed train as as accommodation, etc., etc., etc. This is what it is given. So, if you like it, you can take it. Otherwise, you can give the feedback also here. I like pretty much the answer. I will say what about food. Now, let us see what does it say. What about food? In Italy, the food is a big part of the travel experience. Try traditional Roman dishes such as something something cheese, pepper, pasta. So there's a name for it, Italian I think and then uh something else something else all of this. So we have to be a little careful with these dishes because it's a fiveday trip. We need to be careful when we are trying all this and then I would say 9 out of 10 9 out of 10 is my rating. Let us see what has it received. I'm glad you are happy with it etc etc. Termination done. Now if I want to see the result let us see the result. If I try to print the result chat result etc. This is the one that is I think there is a way to print this in a beautiful manner as well. Let us see whether I have that code somewhere. I don't remember the syntax. Is it like print import print result? Does that work? Let us see. Yeah, this is one form of the output. Let us see is there any better output, better way of output chat history. What I'm trying to do here is I want to print the chat history in a beautiful manner so that I can get to my final output. Yeah, this is also almost same. So great choice etc etc. This is what is given to us finally. Okay, day one, day two etc etc. I think there is a way we can print only the part which says content only that we can explore later on. But this is how it worked. Let us just recheck this. Maybe this time I'll ask a question. I want to go for a 4-day trip in Goa. I want to plan for a 4-day trip to Goa. Can you help? Let us see. Of course, this this this this relaxation. What do you want? Adventure activities, culture, adventure activities or relaxation around the beach? I would say adventure activities is one of the things. And then relaxation at the beach and relaxation at the beach. Both of them is what I want. So day one, arrive at Goa, check in and ba, relax at the beach, enjoy the water sports like parasailing, jet skiing, etc. Day two, dutaga waterfalls, thrilling jeep, safari, refreshing. Day three, try your hand on uh these things, scuba diving, etc., etc. And spend your last day relaxing at the beach, etc. Not bad. Not bad. You can say that uh make it more elaborative. I want a very detailed explanation. Let us see what does it do. It is trying to make it more elaborative. Yeah, this is too much of elaboration. Upon arrival of Goa, check the beach front etc etc. I think the same thing it is trying to give very lengthy sentences. I will say okay by 9 out of 10 please stop termination since I have given 9 out of 10 it has given the termination or final output the whole point that I'm trying to drive here is until now we have created one agent and we have seen its limitations sometimes if it takes a wrong turn or if it starts with the wrong assumption in the beginning itself the agent will eventually finally give us some wrong output which we are not satisfied what if I create another agent try to tell the first agent or validate the first agent's output and try to give a feedback to the first agent can it correct itself and then this conversation can it go to three times and finally give us the best output that is what this whole agentic AI system is all about. So until now if you see our whole session from the morning whatever we have discussed until now it is all one agent and then two agents. We started with one agent that was a single agent or single conversible agent or assistant agent and then two agents conversation. Now we will uh go to one more level up. Multi-Agent System with Four Agents This time I will go ahead with four agents. Multi- aents multi- aent system definitely it will be complex but this whole point of agentic AI frameworks is is multi- aentic AI systems also we can help you to create easily even for us like if we are creating this multi- aent it looks very complex even when we writing the code here it doesn't look very easy even the next case study that we are going to do it looks complex but the thing is the real complexity is much more internally if we do not have agent AI or if we do not have ak framework or autogen without autogen it will be 100 times complex with autogen maybe it is just five times or 5% complexity. So let us see how to build multi- aent system. This time we will try to work with four agents. You can expand it to four, five, any number of agents. Okay, let me give you this whole point of uh multi- aent system. This is also known as agent reflection. This is a keyword agent reflection. What is agent reflection? One agent is working as a critique. One agent is trying to tell the first agent that uh whatever you have done is right, whatever you have done is wrong. One agent is evaluating the output of another agent and trying to tell you that I'm giving you 9 out of 10. I'm giving you five out of 10. So what is agentic or agent reflection? Agents ability to evaluate, critique, improve its own thoughts, decisions or outputs. Just like how humans reflect on their own work to spot the errors key trait to what makes agentic meaning autonomous, intelligent and adaptive. I want to create one AI agent to reflect on the work that is given by another AI agent. So that will help us in reducing hallucinations especially that will help us in reducing the errors. So agent one I have generated the content. Agent two the reflection agent. The second agent your generated content needs to be having more details. The one that we have seen one agent talking agent conversation is uh almost like a reflection only we have used because one agent is giving a feedback to other agent and the first agent is trying to improve. We are not having a funny conversation or anything between the agents. Now let me give you a serious uh example of the case study. Right now I want to do the consumer lending pre-screening process. Anyway the consumer or anyway the bank's customer has to visit the bank or he has to visit our application and submit all the documents before uh he gets a loan. But these customers have too many questions in the beginning. They want to talk to our customer care agents. Now it is impossible for a country like India where of customers are there. No matter how many agents are there it is not practically possible because we have only 24 hours in a day. It is not practically possible to arrange lot of number of agents who keeps on talking to the customers and trying to resolve their grievances. What if I create AI agents which are acting like uh customer care agents where the customer is asking a general question in his natural language the AI agents are able to understand and try to at least if not the complete screening we want to do the pre-screening that means finally we want to give a loan we want to collect some documents. Now this is not really a model building or anything. This is the physical process, the regular process in the bank, I'm talking about the front- end banks where the documentation and the rest of the things happen. So there before taking the real documents, we want to do this first initial pre-screening or it is also known as customer onboarding. We want to onboard the customers by using uh a little complex agentic AI system or multi- agent AI system. So what do these agents do? First AI agent, it collects the customer details. I would like to collect the customer name, PAN card number, other card number, mobile number. Whatever are the details that are required, I'll collect them. Maybe I'll try to collect only basic details in the beginning. Tell me your name, tell me your mobile number. Those two are sufficient. These are the basic details because maybe once the loan is required, then later on I can collect them. The second agent collects the interested products. Okay, you have just come to our uh app. You have just come to our website. You have just called our call center. Now, what is that you are interested in? Are you interested in home loan or personal loan or educational loan or gold loan? I want to know what is your preference? Because the kind of documents that are required for home loan are different from documents that are required for home loan. They're very different from educational loan. The second agent will collect this information. Why agents are required? So there's one discussion or one argument that was happening between me myself and there is one more expert. So what that expert was saying earlier we were having automations. Earlier we were having uh software. Earlier also we were having them. Now people are just renaming them as AI agents. There is nothing much like that. Earlier we have software programs. The same software programs are now renamed as AI agents. There my argument was that yes software programs were there earlier but the brain part but the thinking part this reflection part understanding the general language part and replying in the same language that the user is talking this part was not there the software were there but they were strict and stringent that means you create a form in that form here enter the name here you enter the mobile number but if the user says my name is wankard my mobile number is this I'm interested in this if he writes four lines the software will not be able to find what is his name out of that what is his mobile number out of that do you also agree the indicator systems are little smarter in the sense They have this brain part. They have the thinking ability which was not there earlier. That is the main difference. Yes, there is a huge comparison between how AI agents are doing the work. How previously software used to do the work. But the biggest difference is AI agents can think. They can understand something if the output is beyond what is the space. Here it is controlled space limited space. User has to work in that only. But AI agents can work beyond that. Second AI agent will collect the information on what is the preference. Third AI agent will try to give the information on loan documents. If it is personal loan, the documents required are 1 2 3 4. If it is gold loan, the requirements are 1 2 3 4 5. If it is education loan, these are the three requirements. If it is home loan, these are the two requirements or three four five requirements. Earlier, humans were employed to explain this because humans were needed. No matter how big a software that they create, we are not able to answer every question coming from the user. But now AI agents have the ability to understand every question and try to answer them. These are the three agents. And agent 4 is a customer proxy agent. This is not an LLM based agent. We will remove LLM out of it. We will try to strictly keep it like a customer. So this is just a human. Human has to answer this. Now earlier I was including human but there there was an LLM. If human did not give the output or input human did not respond anything then LLM was somehow managing it which was fine. As a traveler LLM can also act. But here human only like LLM cannot decide what is the random name. LLM cannot decide what is a mobile number. LLM cannot randomly decide personal loan. So it will not be an LLM agent. This will be a customer proxy agent. This is literally the human who has to respond. So how does this work? Let us see the overall workings of this. I will tell you how this whole process works. First, we will create agent one, agent two, agent three. Agent one has to collect the customer details. Agent two has to collect the interested products. Agent three has to collect the has to give the loan documents against whatever is the product. Now, let me tell you the overall process. Then we will start the coding. Then we'll have clarity. So, here is the idea. We'll create agent one. What agent one will do? Get these two pieces of information. Name, mobile number. That's it. Conversible agent. Agent one will be conversing with customer proxy agent. Agent two will be talking to customer proxy agent. What it will ask? Hey can you tell me which loan you are interested in. So this will take this information and pass it on or keep it with it. Here also information is kept and then agent three what it will do? So agent one was asking a question to customer. Customer was answering. Agent two was asking a question to customer. Customer was answering. But this time it will be different. Customer will be asking a question to agent three. What are the documents that I have to what are the documents that I have to submit? Based on the information that we have given earlier. Agent three will take this information. Agent three whatever it has collected it will say that for this particular information you're supposed to submit these documents. The overall working will go like this. So we will create agent one. You create agent one which is profile information collection agent which will collect name and mobile number. Create agent two. It will scan for whether you're looking for home loan or personal loan or education loan or gold loan. And then agent three we will create which will tell if it is home loan. This is the documentation. Personal loan these are the documents required. Education loan these are the documents required. Case Study: Consumer Lending Pre-Screening Process Now the whole conversation how it has to be created or the tasks that we have to create. Agent one will be getting the information from the customer or customer will give the information to agent one and then customer will give the information to agent two on what loan is required but agent three will give the information to customer. So here agent will give the information to customer what are the documents that are required and this is the end of it. These are the documents that are required. That's it. So this is not as simple as the examples that we have discussed earlier. Let us try to do this. I'll try to redo everything. So from autogen important agent, user proxy agent uh and then conversible agent which we have already taken earlier but as a case study we'll try to restart everything. My LLM config is lm config API type is openai API. My model is GPT 4 mini. So it is not able to suggest. Let me write it down. GPT 4 mini. Have you heard of it? This is slightly powerful than GPT 3.5 Turbo but it cost us a little bit more. GPT 4 mini for OM. LM config is done. So let me create agent one that is profile info collection agent. So that is my conversible agent. It has to do a conversation. It cannot be an assistant agent. Conversible agent name is profile information collection agent. So my system message I have to give a proper system message here. What is your task? You're a helpful customer onboarding agent. Very good. You are here to help new customers to get started with their product or service. Your job is to gather the customer's name and mobile number very clearly. Once you have those two, you can say terminate. Do not ask for any other information. Do not ask for OTPs or do not ask for any other information. Return terminate when you have gathered all the information. Perfect. Once it gives terminate later on, I can use the term terminate. Whenever there's a terminate from the user, that means I got the right information. I can carry on. So my LLM config is lm config that I have done human input here here within this agent human input should be never because later on in the conversation I will make this profile information collection agent to talk to customer uh proxy agent the customer proxy agent will give the human input I don't want to collect the information in customer collection agent this agent is doing one job only there should not be any human input in this there should be input taken from the customer proxy agent only input should come from the conversation only but not from the user in this particular ular agent. So while creating this agent which has a specific task, do not let the human enter the input into this agent. Let it be entered in the customer proxy agent which is the fourth agent. There human can enter the input. So as a good habit what do we do? Tell me before we proceed further what I generally do. I will say agent dot generate reply and what is the question that I'm going to ask? Tell me who are you? Who are you? Yes. Agent dot generate reply. That kind of really helped me in solving a lot of later on issues like I have learned it the hard way. It is always good to check with the agent like who are you? What is your job? Okay. Sometimes what happens is we expect the agent to do something or maybe by mistake we have renamed the agent same way like we will not get to know what that agent is doing. I'm a customer onboarding agent here help you to get started with our product and services. Can you can I please have your name? Sometimes the agent will ask name follow the mobile number. Sometimes it'll ask give me your name as well as mobile number. Now this is what the difference between a software and an AI agent. AI agent has the smartness to get the information that it is looking for. A software may be very strict and stringent. If the user kind of little bit details the whole system will fail inside a software. The second agent here, agent two is to gather the information on the preference. So I'm calling it as preference scanning agent. The name is preference scan agent. So the system message is you are a helpful customer preference finding agent. You are here to help the new customers to get started with uh our product. Yes, of course. Your job is to gather the customer's preference on whether they are looking for home loan or whether they're looking for personal loan, looking for educational loan or gold loan. Any other can also be given. Here basically we want to limit to this and then lm config is equal to lm config. Again here human input never or always here also you want to take the input from the fourth agent which is customer proxy agent where the human will enter the input but not individually inside these agents. As usual we will once we create this agent I will say preference scanning agent dot generate reply generate reply content who are you it will say I'm a customer preference finding agent here are you looking for home loan personal loan education so it is acting as per my requirement the third agent is slightly different this agent it will tell the customers what is the checklist if the customer would have chosen home loan and the checklist for the home loan if the customer would have picked for educational loan checklist for the educational loan so let me Call that as loan documents agent. The name is loan documents agent. You are a helpful customer service agent and you will provide information on loan processing checklist based on based on the loan that the customer has picked based on the loan type that the customer has picked. So now I will say checklist for home loan is this one. IT returns also required for home loan bank statements, property documents and title papers. Checklist for the personal loan that is ABC documents, PANDA etc etc. Bank statement is also required last 6 months bank statement checklist for the educational loan admission letter fee structure official document from the institution income proof of the co-licant salary site part of the father. After that checklist for the gold loan, gold articles etc etc etc. After that is it I think we will close this. These are the ones it has to be three quotes single quotes. Then I would say my LLM config is LM config human input never three agent ready. These are the actual working agents. These are all LLM based. What do you mean by LM based? They have the thinking capabilities. I have just given them checklist for the personal loan. They have the ability to understand when personal loan is preferred. These are the ones that I have to give. Nowhere I have written a code of thing. If personal loan, if the word is personal loan, then this if then. We did not write any of the if then else loops because we have the LLM power to understand our natural language. That is where the whole world has changed within the last 2 years that LLMs could understand natural language. Otherwise until 2 years back everybody was coding it. If gold loan then.1 point2.3 if educational loan.12.3 but if you write that if then else if the user says I'm looking for a loan by putting my gold as collateral can you give me if the user says like that then that software was not able to understand because it was looking for specifically only one keyword called gold loan only with that swelling but here you can see little bit here and there LM can understand now we will try to create our final fourth agent which is customer proxy agent and this will not be LLM based agent this will be a human so customer proxy agent first time we are creating this kind of agent I would say you can say that as a conversible agent conversible agent name is customer proxy agent lm config equal to false I don't want any llm input here I don't want unnecessary lm give it own preference give it own name give it own mobile number lm was too smart to give it human input always if the termination message is terminate then if that is found in the message then we will terminate that means once you give it once this conversation is happening once you give the name the first agent will give that terminated because I got the name and mobile Second one once you give the loan preference as home loan the second agent will say terminate because these agents are thinking they are going in loops once they want to stop the loop they will give the option as terminate then it means that we have to stop this and then we have to move on to the next one. So in the conversation or when we are creating the task that we will get to see so if we find a terminate in the message then we will stop it otherwise we will proceed further. This is a customer proxy agent it is simply human input that box that we are giving but since there is a conversation and remaining three agents are there I'm creating this as a separate agent. You can think this as a input box. Let me ask customer proxy agent who are you? Let me ask the previous guy also who are you? Loan documents agent dot generate reply. Yep. Loan processing. The reason why I generally ask who are you is sometimes we tend to give the same names like agent one agent or agent agent or loan agent or something like that. Sometimes we think that we talking about this agent probably it is referring to some other agent. So just to make sure that everything is perfect that is why we give this uh who are you option generate reply generate reply who are you since we are asking who are you and it is always human input always it is asking for the human input I will just hit enter no human input reply order reply etc this is how it is expected to work now the bigger task creating the charts how the chart structure should be this is not like random chatting that can do it has to follow a particular uh method isn't it so the First thing is uh let's say the first one is who is the sender? The sender is a profile info guy. Profile info guy. What is that? Profile info collection agent. Who is the recipient? Can somebody tell me? Profile info collection agent will talk to whom? Let me write the exact name of the profile info guy. What is the profile info guy's name? This agent name is profile info collection agent is the sender. First message will be sent by him. Hello, I'm a profile information collection agent. Who is the receiver? Can you tell me the receiver guy in the first go? Try to think about it. Who is the receiver here? Who's going to receive that message? Recipient from profile info. Who will receive the information? Or who will get that message from profile guy? Who is the recipient? Who is this guy talking to? Profile info guy will say, "Hey, tell me your name and mobile number. Out of these four agents that we have created, who is going to receive that message? Customer." Customer proxy agent is a recipient. So that is the first chat that I have to create. The second chat that we will be creating would be again the similar one. The sender will be whom? Sender is who is the sender. Now you should be comfortable. Who's the sender? No, the preference scanning agent is the sender. Who's going to receive that message? Preference scanning agent who what like you move to the second desk in the bank. In the first they have asked for mobile number and uh your uh name and then they said that go to the second desk. In the second desk there's a preference scanning agent sitting there. Who is he talking to? Who's the sender? Preference scanning agent. Who's the recipient? Recipient is Who's the recipient? Again here also it is customer proxy agent. The same question will be again answered by customer proxy agent only. The third here this time customer proxy agent will ask the question he's the sender. I have told you my mobile number. I have told you my name. I have given you my preference. Can you tell me what are the documents that are required? So we will create the chat in such a way that the customer proxy agent is asking the who is the guy who is asking to who's the recipient who will receive the question from the customer. What is the name of the agent that we have created there? Recipient is can I say he's a recipient? Loan documents agent. Customer is going to ask can you tell me what are the loan documents and the loan documents agent will give the final output and that is it done. So let us see the charts. I don't remember the syntax. So let us use the code that is already there. It's impossible to remember this kind of little complex syntax. So I will try to use the pre-written code. But it's if we practice and multiple times then we may remember this syntax as well. But there were too many things in this. So we define chats like this. Sender is a profile info collection agent. Recipient is customer proxy agent. Can you imagine this all of you? Sender is this guy. He's the sender of the messages. Hey, are you following what I'm trying to say? Is it like can you imagine what is happening? Are you comfortable with what is happening here everyone? Yes. Yes. Okay. So the sender is this guy who is trying to collect the information from you and the recipient is this guy. So that is what this uh chat sender is. Profile information recipient is this. Message is hello, I'm here to help you to get started with the loan approval process. Could you tell me your name and mobile number? Now in this whole conversation finally we will take the information and we summarize that summary method reflection with LLM is we summarize all the conversation that has happened between these two guys. Maybe three four times they will talk. First the customer will not tell the name. The customer did not understand the question. Customer has given name only and again the agent has asked hey give me the mobile number as well. Customer has given the mobile number also. But when the name was asked, customer gave the mobile number. Again the LM corrected him. All that conversation will happen. That will be summarized. Finally return to the customer information. I want JSON file only. I just want two pieces of information. You will have so many conversations that will happen in between you. I just want simply two pieces of information from that whole conversational summary. What is it? Name of the customer, mobile number of the customer. That's it. You talk as much as you can. Maybe if I give a sufficient number of uh iterations, it this agent will make sure that it will have a lengthy discussion with the customer throughout the day. It will talk and it will try to get at the end of the day mobile number and name. The moment it gets mobile number and name, it will send the termination message. Customer will be in a shock. It was talking to me so nicely until now. The moment I get mobile number and name, it will stop talking to me. But here I'm not giving so many those many turns because it is going to cost us with every conversation. I'm giving two turns. Within two turns the customer has to give the name and mobile number which I feel is sufficient. But in practical applications maybe you can increase the number of turns like four, five or six turns. So that you're giving multiple chances for the customer to enter his name and mobile number. Clear chat history. Once that is done once you have found this JSON file where you have name and mobile number first chat is done. Second chat let's go back. Second chat is agent two will start the chat. Once you talk to agent one, once you give the name, once you give the mobile number, agent two will come into the picture. He is the sender. So what does he say? He will say hey I am a agent. I am a helpful assistant. Now he say great could you please tell me the kind of loan that you are interested in. Is it the home loan or the personal loan or educational loan etc etc. Again reflection with LLM and you talk to the customer as many times as you can and finally I'm just looking for one thing that is loan type. Next and sender is customer proxy agent. Automatically this will be the information we are already giving this. So the customer proxy agent did not like he doesn't need to enter that question. Automatically we're entering his question. Only the question give me the checklist for the home loan or for the loan mentioned by me. Give me the checklist for the loan mentioned by me. He just give me the checklist. Sender is proxy agent. Recipient is loan documents agent. Finally summary method. There is nothing like JSON or anything. Whatever comes to your mind whatever the documents please give me. These are all the chats that we are creating. In terms of the code and the syntax there is not much but a lot of times I have found myself doing errors in these brackets and uh somewhere I was getting lost in these commas and brackets or something otherwise the code or the syntax point of view there is not much but this whole indentation and these brackets and the parenthesis that is where I was making errors and then we will try to initiate the chats. So chats were created initiate the chats. So once you initiate the chats your overall app is up and running. So initiate the chats. So let us see the first chat. Hello I'm here to help you to get started with loan approval process. Could you tell me your name and mobile number? So, let me give my name only. Yes, this is my name. Now, let us see what has it asked. Hey, thank you, Wanker. Could you please provide your mobile number? Now, that was good. I would say 9898 981. All right, let us see whether it has found the JSON. Yes, the JSON final JSON is name and mobile number. It would have sent the termination message or anyway two is the maximum turns uh two or three. Which one we have given two turns or maximum turns two? So, anyway, it will do the hard termination even if it doesn't get the name and mobile number. and replying as the customer please provide the feedback to your preference scan agent press your enter so the preference scanning agent has started the chat see this could you please tell me the kind of loan that you are interested in it is it the home loan or personal loan or educational loan or the gold loan say I'm interested in home loan let me give a wrong answer here I am interested in some loan okay some it may understand as home loan I am looking for a loan a nice loan very good loan Let's see what does it say. Thank you for your interest. Help us in finding the perfect loan. Could you please specify which type of loan you are looking for? So let's not uh take its time. I would say I'm looking for a home loan please. I'm looking for a home loan. And then I will hit enter. So it would have created the JSON name is wanker mobile number is this looking for home loan automatically in the back end home loan and all these are there. Then automatically you have the load documents. Here is the checklist for the home load. That is it. Termination would have happened and then you have this final output. What we are seeing is the back end. Imagine this happening on an app where the user is having a conversation. He will never ever get to know that he's having this conversation with AI agent because these AI agents are so smart. In fact, we can create multiple AI agents. E for the first agent. For every agent, we can create two other agents as well. Let's say here I have created only one agent and this agent is directly talking to the customer. In between I can create another agent to do criticize what this agent is doing. Making sure that he's doing the proper things and then talking to the customers. So if this agent is directly talking to the customers by mistake if it is not giving the right answer this agent again correct it and do it. So it's all about your imagination of how many guardrails that you can keep how many features that you can add and how many agents that you can keep. This autogen will help you. All that you need to do is you have to structure or knit your chats in such a way that all these agents are talking to them. And chats knitting is also not that difficult. You just send who's the sender, who's the recipient, what is the message, what is the summary method etc. And thousands or hundreds of agents also you can knit them together. I'm not saying that you must definitely When to Use Multi-Agent AI Systems create a multi- aentic AI system always for sure that is not the objective of this session. What I'm trying to tell you is there is this scope. If you can do the job with one AI agent, well and good. If you think that you can do the job without AI agent directly with GMAI, no problem. If you can solve a problem with rack, no problem. So you can solve it with any of this approach. But if at all you need a solution that is requiring multiple AI agent, you can consider autogen. In fact within autogen you can see the overall chat summary if you want to what has happened this is the final crisp one or you can also see the cost that has incurred for one person the costing will not be that high but if we are showing it as an application multiple users are using thousands of them then we will get to see exact cost that is happening for mini tokens are little costlier compared to the GPD 3.5 turbo so finally what I want to tell you guys is that you can solve the same problem with simple LLM API that means you have a question asked by the user And then just by calling the API from uh open AAI or API from cloud you can solve it. You can solve the same problem if you take one problem. Sometimes you can solve it with just simple LM API. No fancy thing is required. Sometimes you may have to look at it twice. Maybe you may need a framework like lang chain. The concept of chains. First you get simple solution from LM API. You supply it to another chain and then finally you come to the solution. You can use lang chain related. little bit complex I would say little complex but still APIs only direct APIs sometimes the problem statement need to be solved by using rag good scenario when you don't want to look at the whole world of solutions when you want to limit it to your own documents private documents or if you want to reduce hallucination if you want to limit everything to a particular space then you may want to use rag sometimes you may have to show an AI agent as a solution where you will use lm API and then you will use some external tools and then uh you will try to think multiple times in value and give the output Sometimes you may have to use multiple agents. The example that we have done here is one agent like this. If you create one agent, it may not be able to do the task that we have seen. Now we can still do it but it is going to take hell lot of coding. Sometimes it is easier to use multiple agents to get the job done. Whatever we have seen here world is still a very early phase. I won't say that everybody like it is at a level maybe maybe R&D teams or very strong teams or people which are totally basing their business on those uh APIs or basing the business on these type of tools only. Those are the ones they are implementing. But if you ask me any regular data scientist Current Industry Adoption of Multi-Agent AI for last year I have a team of data scientists are all of them working on completely on agent systems that is not true companies still not have entered the phase of multi- aentic AI frameworks yet but they are exploring slowly probably in next 2 three years we may see multi-le agents agent AI systems being used by a lot of companies but not now they just started it's good to know that yeah one such framework that we have discussed right now is autogen so that is the story of autogen I hope you understood it so we have talked about single agent, two agents, multiple agents, agent reflections, talking among themselves etc etc. Now if you go to Microsoft auto or if you go to some other framework like lang graph or if you go to crew similar things will be there but the code that we have written in between that will change. So here you have the concept of sender recipient and message. So there you may have something like user you may have something like goal or background instead of system message there is something called a backstory or something in crew like different syntax will be there. Overall conceptually the same thing can be built in other uh aka systems as well frameworks as well. Continue Conclusion with the next video in the playlist. We are covering everything step by step. If you have any questions or the comments, please post them in the comments window below. &#x20;