# n8n for Agentic AI — Complete English Notes

> **Source coverage:** This document is based on the complete uploaded 599-line transcript.  
> **Important:** Source content is not silently removed. The complete original transcript is preserved in the appendix at the end.

## 1. What is n8n?

n8n is a **no-code / low-code workflow automation platform** that lets users connect visual nodes to build workflows and agentic-AI systems.

### Core idea

```text
Trigger
   ↓
Data / Event
   ↓
AI Model / Logic
   ↓
Tools / Integrations
   ↓
Action
   ↓
Output
```

The transcript presents n8n as an accessible starting point for Agentic AI, especially for people without a strong AI/coding background.

It can connect systems such as MySQL, Excel, Google Drive, AWS and many other services. For large enterprise systems, however, code-based frameworks may provide more control, robustness, security and customization.

---

## 2. Why n8n is useful for beginners

- Visual drag-and-drop workflow building.
- Nodes can be connected visually.
- Many integrations.
- Marketing and sales teams can build workflows.
- AI models can be combined with ordinary automation steps.
- Convenient for prototypes and smaller applications.
- Large/complex enterprise systems may require careful evaluation of code-based frameworks.

### Key distinction

**Easy to start does not mean best for every production system.**

Large systems require robustness, security, maintainability and customization.

---

# 3. Setting Up an n8n Account

The transcript demonstrates:

1. Open the n8n login page.
2. Create a login.
3. Sign in with Gmail if desired.
4. Name the workspace/space.
5. Complete email verification/activation.
6. The workspace may show a blank canvas, templates or AI workflow creation options.
7. The transcript mentions different free-trial durations; the exact duration should be verified against the current account/plan.

---

# 4. Workflow Fundamentals

An AI agent can practically be represented as an **n8n workflow**.

A workflow can be:
- named,
- tagged,
- visually arranged,
- exported,
- imported.

### Typical workflow

```text
Trigger
  ↓
Read/Input Data
  ↓
AI / Processing
  ↓
Action
  ↓
Result
```

---

# 5. First Project — Gmail AI Reply Agent

The first practical project is a Gmail-based AI assistant.

### Goal

When an incoming email arrives:

```text
Incoming Email
      ↓
Gmail Trigger
      ↓
OpenAI Model
      ↓
Generate Contextual Reply
      ↓
Gmail Send Message
      ↓
Sender receives reply
```

Instead of a static autoresponder, the AI reads the email context and generates a relevant response.

---

## 5.1 Gmail Trigger Node

The first node is generally the **trigger node**.

Its purpose is to start the workflow when the required event occurs.

The Gmail trigger involves:
- connecting a Gmail account,
- selecting a message-received event,
- configuring the polling/schedule,
- fetching a test event.

The transcript demonstrates checking every minute.

### Testing

A fetched event can expose:
- email ID,
- thread ID,
- snippet,
- timestamp and other fields.

The result can be inspected as a table or JSON.

---

# 6. OpenAI Node — Generate the Reply

The Gmail trigger is followed by an OpenAI model.

The transcript demonstrates:
- OpenAI credentials/API key,
- model selection,
- message model operation,
- prompt configuration.

### Prompt concept

```text
You are a helpful AI assistant.
Understand the incoming message.
Reply professionally.
Keep the reply within approximately four lines.
```

The incoming Gmail snippet is passed dynamically into the prompt.

### Important

The OpenAI node generates the response. It does **not** send the email by itself. A Gmail send node is required for the actual email action.

---

# 7. Gmail Send Node

The complete cycle becomes:

```text
Gmail Trigger
     ↓
OpenAI Message Model
     ↓
Gmail Send Message
```

The send node can use:
- recipient = original sender,
- subject = original subject / `Re:` subject,
- body = OpenAI-generated response,
- email type = text or HTML.

Dynamic values can be dragged from earlier nodes.

---

# 8. End-to-End Gmail AI Agent Test

The transcript tests the workflow with an interview/material request.

Flow:

- Email arrives.
- Gmail trigger captures it.
- OpenAI reads the request.
- OpenAI generates a reply.
- Gmail sends the reply to the original sender.

### Key learning

```text
Event
 → Understand
 → Generate
 → Act
```

---

# 9. Debugging / Testing Basics

Each node can be tested/executed individually.

Useful practices:

- Inspect trigger output.
- Inspect previous-node data.
- Inspect the generated AI response.
- Verify the final action before executing it.
- Use execution history/logs.

---

# 10. Second Project — Cold Email Automation

The next workflow is more complex.

### Business problem

Leads are stored in Google Sheets.

Every week:

1. Read leads.
2. Prepare email content.
3. Send the email to each lead.

### Flow

```text
Schedule Trigger
       ↓
Google Sheets — Get Leads
       ↓
Set / Prepare Email Content
       ↓
Gmail — Send Email
       ↓
Wait
       ↓
Next Email
```

---

# 11. Schedule Trigger

The Schedule Trigger starts workflows at defined intervals.

The transcript mentions:
- every minute,
- every hour,
- every day,
- every week,
- specific days/times.

Example:
> Send cold emails once a week.

---

# 12. Google Sheets as the Lead Source

The Google Sheets node can:
- select the document,
- select the sheet,
- fetch rows,
- apply optional filtering.

Example:

```text
Name | Email
-----|----------------
Lead1| person@example.com
Lead2| person2@example.com
...
```

The fetched rows can feed the downstream Gmail node.

---

# 13. Set Node — Prepare Email Content

A Set/manual-mapping node can prepare fields such as:

```text
subject
body
```

The transcript uses a healthcare-product marketing example.

The email body can contain:
- product introduction,
- features,
- benefits,
- call to action.

---

# 14. Gmail Send — Bulk Cold Email

The Gmail node receives:
- recipient from the Google Sheet email field,
- subject from the Set node,
- body from the Set node.

Sending hundreds or thousands of messages without pacing can create deliverability/spam problems.

The transcript introduces a **Wait node**:

```text
Lead 1 → Send
       ↓
     Wait
       ↓
Lead 2 → Send
       ↓
     Wait
       ↓
Lead 3 → Send
```

The purpose is to spread out the sending rather than creating one large burst.

For production systems, provider limits, consent, anti-spam rules, rate limits and deliverability requirements must also be respected.

---

# 15. n8n Templates

The transcript demonstrates ready-made workflow templates such as:

- LinkedIn lead generation
- Trello board summarization
- Daily calendar summaries
- AI-powered email autoresponders
- GitHub issue/bounty workflows
- E-commerce workflows
- Healthcare workflows
- Marketing workflows
- Social-media automation

The central idea:

> You do not always need to build every workflow from scratch.

Typical process:

1. Search for a template.
2. Understand it.
3. Import/copy it.
4. Connect credentials.
5. Modify required parts.
6. Test it.

---

# 16. Workflow Readability

Meaningful node names make workflows easier to understand.

Instead of:

```text
Schedule Trigger
Get Rows
Set
Send Message
Wait
```

use names such as:

```text
Send Mail Weekly
Email Leads Data
Prepare Mail Subject & Body
Send Emails
Wait Between Emails
```

This makes the workflow read like a story.

---

# 17. Sticky Notes

Sticky notes can document workflows.

Example:

```text
# Gmail Trigger
## Gets incoming email

# AI Node
## Generates reply

# Gmail Send
## Sends reply
```

The transcript also demonstrates Markdown heading syntax inside notes.

Sticky notes are useful for:
- explanations,
- documentation,
- understanding downloaded workflows.

---

# 18. Exporting and Importing Workflows

Workflows can be exported as JSON.

Examples from the transcript:

```text
email agent.json
cold email automation.json
```

They can then be:
- imported from a file,
- copied/pasted,
- reused,
- shared,
- backed up.

---

# 19. Social Media Automation Template

The transcript demonstrates a template roughly following:

```text
Schedule
   ↓
Google Trends
   ↓
Find Trending Topics
   ↓
Keywords
   ↓
Choose Blog Topic
   ↓
Research using Perplexity
   ↓
Facebook / LinkedIn / X
   ↓
Update Google Sheets
```

Required accounts/credentials can be connected and the workflow customized.

---

# 20. Generating Workflows with AI

n8n provides a **Build with AI** approach.

Instead of manually creating every node, a user can describe the desired workflow in natural language.

Example:

> Read lead emails from a Google Sheet every week and send a cold email to each lead.

The AI can generate a workflow structure.

---

# 21. Generating n8n Workflow JSON with an External LLM

The transcript also demonstrates:

1. Ask ChatGPT for an n8n workflow.
2. Request JSON format.
3. Copy the JSON.
4. Paste/import it into n8n.
5. Inspect the nodes.
6. Fix credentials/configuration.
7. Test the workflow.

### Important

An AI-generated workflow should **not** be trusted blindly.

Always inspect and test generated workflows.

---

# 22. Third Project — Telegram AI Agent + Hacker News

The third major workflow is a Telegram-based technology-news agent.

```text
Telegram Message
       ↓
Telegram Trigger
       ↓
AI Agent
       ↓
OpenAI Chat Model
       ↓
Hacker News Tool
       ↓
Generated Answer
       ↓
Telegram Send Message
```

The user asks for current technology information and the backend agent uses Hacker News to retrieve relevant information.

---

# 23. Telegram Bot Setup

The transcript demonstrates creating a Telegram bot through BotFather.

Basic flow:

```text
Telegram
   ↓
BotFather
   ↓
Create Bot
   ↓
Get Access Token
   ↓
Connect Token to n8n
```

The Telegram trigger listens for incoming messages and exposes information such as message ID and chat information during testing.

---

# 24. AI Agent Node

Compared with a direct OpenAI node, the AI Agent node can expose additional capabilities.

The transcript highlights:

```text
AI Agent
 ├── Chat Model
 ├── Memory
 └── Tools
```

The user prompt comes from Telegram.

Example:

> I want to know the latest tech news.

The agent:
- understands the question,
- uses the chat model,
- uses the Hacker News tool,
- generates a response,
- sends it back through Telegram.

---

# 25. Hacker News Tool

Hacker News is used as the technology-news source.

The transcript instructs the agent:

```text
Use the Hacker News tool to answer the user.
If you don't know the answer, say "I don't know"
instead of making it up.
```

This is a basic mechanism for reducing hallucination.

---

# 26. Tool Configuration Problem

The first approach tried to retrieve a precise article.

A broad request such as:

> Latest tech news?

did not map cleanly to a specific article.

### Adjustment

Instead of retrieving one exact article:

```text
Get many articles
        ↓
10 / 50 articles
        ↓
Find relevant information
```

The broader retrieval increased the chance that relevant information would be available.

---

# 27. n8n Debugging — The Chicken-and-Egg Problem

The transcript encounters a situation where:

- a previous node needs to execute,
- execution depends on unresolved downstream configuration,
- the workflow appears to enter a loop-like state.

The demonstrated approach:

```text
Save workflow
   ↓
Go to Executions
   ↓
Select latest execution
   ↓
Debug in Editor
   ↓
Fresh execution
   ↓
Execute nodes one by one
```

---

# 28. Telegram Response

After the AI response is generated, Telegram Send Message sends it back.

Required values include:
- chat ID,
- generated response text.

Flow:

```text
Telegram Input
     ↓
AI Agent
     ↓
AI Response
     ↓
Chat ID + Response Text
     ↓
Telegram Send
```

For external interaction, the workflow needs to be active.

---

# 29. Learning from Tool Failure

The transcript demonstrates cases where Hacker News does not contain useful results for queries such as Gemini or ChatGPT.

Desired behavior:

```text
Relevant information available
        ↓
Answer

Relevant information unavailable
        ↓
"I don't know"
```

Important agentic principle:

> An agent should not invent an answer merely because the user asked a question.

---

# 30. Multiple Tools — Future Expansion

The Telegram agent can be expanded:

```text
                 ┌── Hacker News
User → AI Agent ─┼── Google News
                 ├── Yahoo Finance
                 └── Other Tools
                         ↓
                    Final Answer
```

Telegram is only the interface. The backend agent can use multiple tools.

WhatsApp can also be used as an interface, although the transcript presents Telegram as easier for the demonstrated setup.

---

# 31. The Three Fundamental Workflows

### Workflow 1 — Gmail AI Responder

```text
Email → AI → Reply
```

### Workflow 2 — Cold Email Automation

```text
Schedule → Google Sheets → Prepare Email → Gmail → Wait
```

### Workflow 3 — Telegram Tech News Agent

```text
Telegram → AI Agent → Hacker News → Telegram
```

Together these demonstrate triggers, AI models, data sources, tools, scheduling, actions, debugging and integrations.

---

# 32. Practice Philosophy

The transcript strongly emphasizes:

> Watching the video alone is not enough to learn n8n.

The real learning loop is:

```text
Build
 ↓
Make Mistake
 ↓
Debug
 ↓
Fix
 ↓
Repeat
 ↓
Confidence
```

Manual workflow building is useful initially.

After understanding the architecture, AI-generated workflows become much more useful because you can identify and fix errors quickly.

---

# 33. Simple → Advanced → Super Advanced Mental Model

## Simple

```text
Trigger → Action
```

Example:
Email received → Send fixed response.

## Intermediate

```text
Trigger → Data → AI → Action
```

Example:
Email → OpenAI → Reply.

## Advanced

```text
Trigger
  ↓
Data
  ↓
AI Agent
  ↓
Tool Selection
  ↓
External Systems
  ↓
Conditional Logic
  ↓
Action
```

## Super Advanced

```text
User
 ↓
Agent
 ├── Memory
 ├── Tool 1
 ├── Tool 2
 ├── Tool 3
 ├── External APIs
 ├── Database
 ├── RAG
 ├── Validation
 └── Human Approval
        ↓
   Final Action
```

---

# 34. Real-World Use Cases

Examples presented in or directly represented by the transcript include:

- AI email assistant
- Cold email automation
- Lead management
- Lead scoring
- CRM updates
- Weather alert agent
- Personal assistant
- Telegram chatbot
- Technology-news assistant
- Social-media automation
- Google Trends → content pipeline
- Healthcare claim/document workflows
- Marketing automation
- Calendar summaries
- GitHub workflows
- E-commerce automation

---

# 35. Errors & Gotchas

### 35.1 API Credentials

Gmail, OpenAI, Telegram and other integrations require credentials.

### 35.2 Missing Tool Data

A precise Hacker News lookup may fail if the expected article is unavailable.

### 35.3 Workflow State

Previous errors can affect subsequent node execution.

### 35.4 AI-Generated Workflows

Generated workflows may still contain incorrect credentials, configuration or business logic.

### 35.5 Email Blasting

Uncontrolled bulk sending can create spam and deliverability issues.

### 35.6 External Actions

Production systems should validate and control actions such as sending messages, modifying CRM records, placing orders or deleting data.

---

# 36. Best Option — When to Use n8n

| Situation | Suitable Approach |
|---|---|
| Beginner Agentic AI | n8n |
| Quick prototype | n8n |
| Business automation | n8n can be strong |
| Many SaaS integrations | n8n |
| Visual workflow | n8n |
| Small/medium automation | n8n |
| Maximum custom control | Code-based framework |
| Very complex enterprise agent | Carefully evaluate architecture/framework |
| AI-generated workflow | Generate + inspect + test |

**Practical approach:** Learn workflow concepts in n8n first, then choose the production architecture based on security, scale, observability, maintainability and customization requirements.

---

# 37. Interview Questions — Junior

1. What is n8n?
2. What is a workflow?
3. What is a trigger node?
4. What is an action node?
5. Why is n8n called no-code/low-code?
6. How does a Gmail trigger work?
7. What is the role of an OpenAI node?
8. Why use Google Sheets in a workflow?
9. What does a Schedule Trigger do?
10. How can a Telegram bot be connected?
11. What is the difference between a tool and an AI Agent?
12. Why export/import workflows as JSON?

# 38. Interview Questions — Mid Level

1. What is the difference between an AI Agent node and a normal LLM node?
2. How do multiple tools make an agent more useful?
3. How would you debug an n8n workflow?
4. How would you manage credentials?
5. Why is rate limiting important in bulk email workflows?
6. How would you validate an AI-generated workflow before production?
7. What is the difference between a trigger and polling?
8. How could n8n be integrated with a RAG system?
9. How would you handle external API failures?
10. How would idempotency prevent duplicate emails/actions?

# 39. Interview Questions — Senior / Architect

1. When would you choose n8n versus LangGraph or a code-based architecture?
2. Where would you place human-in-the-loop approval?
3. How would you design credential/security architecture?
4. How would you restrict agent tool permissions?
5. What retry and failure-recovery strategy would you use?
6. How would you prevent duplicate side effects?
7. How would you implement observability?
8. How would you handle long-running workflows?
9. How would you validate AI output before deterministic business actions?
10. How would you orchestrate multi-agent workflows?
11. How would you design RAG + tool calling + workflow automation?
12. What n8n limitations would you evaluate for enterprise scale?

---

# 40. Quick Revision Cheat Sheet

```text
n8n
= Visual Workflow Automation

Workflow
= Connected Nodes

Trigger
= Workflow Start

AI Node
= LLM Processing

AI Agent
= Model + Tools + Agent Logic

Tool
= External Capability

Schedule
= Time-based Trigger

Google Sheets
= Data Source

Gmail
= Communication Action

Telegram
= User Interface / Trigger + Response

Sticky Notes
= Documentation

JSON
= Workflow Export/Import

Template
= Ready-made Workflow

Build with AI
= Natural-language workflow generation

Debug
= Execution history + node-by-node testing
```

---

# 41. Assistant-Added Study Guidance

> **This section is additional study guidance, not a replacement for the source transcript.**

### Production-grade mental model

```text
Input
 ↓
Authentication
 ↓
Authorization
 ↓
Trigger
 ↓
Validation
 ↓
AI / Rules
 ↓
Tool Selection
 ↓
External Action
 ↓
Verification
 ↓
Logging / Monitoring
 ↓
User Response
```

For production agents, especially those that perform external actions, consider:
- least-privilege credentials,
- input validation,
- output validation,
- rate limits,
- retries with backoff,
- idempotency,
- audit logs,
- secrets management,
- human approval for risky actions,
- monitoring and alerting.

---

# 42. Final Summary

n8n provides a practical visual entry point for Agentic AI by combining:

**Triggers + Data + AI Models + Tools + Actions**

The transcript's three core projects are:

1. **Gmail AI Responder**
2. **Cold Email Automation**
3. **Telegram + Hacker News AI Agent**

The central learning principle is:

> **Build manually first → make mistakes → debug → understand the architecture → then use AI-generated workflows.**

---

# Appendix — Complete Original Source Transcript

> The complete uploaded source transcript is preserved below so that no source content is silently skipped.

Introduction to n8n for Agentic AI
Hi, this is Wenut. We just turned into wanker ready classes. This video is part
of a series. Complete the previous videos in this playlist [music] before
you start this video. The complete playlist information, the material and the code file information is given in
[music] the video description below. N8N the term itself sometimes it is uh
Understanding n8n and its No-Code Approach
kind of confusing why somebody would name a tool called N8N. So let us start with what exactly is NAN or NA10 agents.
NA10 agents are one of the easiest way to start with agent AI. If you go in the outside world if somebody is saying that
I'm trying agent AI but I'm not from AI background. Probably they are working with NAN and let me tell you people without any background also they have
created wonders somebody who is into marketing or somebody who is into sales if they want to implement AI in their
current work progress. If they want to create any workflow then they have tried N10 and they could achieve a lot of productivity. We're going to see how it
is possible. And the best part about N10 is it provides a no code approach to connect the nodes and build and
orchestrate your entire AI system. It has as of now it has huge number of integrations and in future also almost
anything that we can think of. If my data is on MySQL or if my data is on Excel, if my data is on Google Drive, if my data is on AWS, better wherever the
data is you should be able to connect where whatever are the tools you should be able to connect and then we'll have huge number of uh integrations in
future. As of now also there are so many integrations already available. This is one of the most popular agentic
AI system as of now that is being used. The remaining agent AI system that we have discussed until now most of the coders or most of the data scientists
who have the background they were using it. If you ask me anybody if they want to get started with agent AI they can get started with N8N. But the thing is
it doesn't mean that people everybody uses NAN only. When it comes to the real world we want to code so that we are in
the maximum control. So this looks good for starters. This looks good for smaller applications. But if you want to
build an application that is covering multiple features maximum number of elements and if you want to customize
each one of them and this is a huge big agent AI system in that case people are preferring the other frameworks which
are code based not the non-codebased non-codebased are easier for somebody to get started but we are talking about
large systems in companies it is not about starting up it is about robustness it is about security it is about adding as many features as possible so n is
good it doesn't mean this is the only one that should be used companies prefer other frameworks as well let's learn NAN
the full form of NAN is node mission. NAN means node mission. How come NAN means node mission? So the way they
derived it is N and then N 1 2 3 4 5 6 7 8. So N eight characters in between and
then 8 N. Node mission has eight characters in between 1 2 3 4 5 6 7 8.
So this is this is what NAN means. We don't need to know that but I was curious why somebody would name something as NAN. This is the reason
behind it. Let us try to get started with a couple of agents. Let me tell you teaching n would be very difficult for
Setting Up Your n8n Account
me because this is one of the easiest tool. It's all about drag and drop, drag and drop, drag this node, drag this node. So I will be the whole session
will be about drag this node, connect to this node, drag this node, connect to this node. That is the only teaching part that I'll be doing. So NA is all
about I will give you a kickstart automatically you will be able to accelerate this whole learning. NA is that easy to implement. So let's go
ahead create an account in NA10. Uh the NA10 free trail will be given to you for 15 days. That is the reason why we're
starting it today. So you have 15 days time to practice it. Even once we are done with these sessions, you should be able to practice it. So you go to N8
login. You create a login ID. You can use uh Gmail. Once you say sign in, they
will give you your own space. You have to name your space. You have to give a unique name. And then once you sign in,
right now this is also under free trail. One of the account that I'm showing you is under free trail. 27 days left. I
think they are giving 30 days now or 15 days. Let me just check. So 27 days of free trade left in my case. So you try
to login once you have the login. So right now it is showing some workflows here. In your case it may be showing uh
a blank space like this. You either start from your template or build with
AI. It may show like this. Otherwise the landing page would look somewhat like this. So create an account all of you
quickly. While creating an account it may ask you for I think verification or activation from the email. Just activate
it and then you will have this account. If everything works fine, you will have this screen shown to you.
Creating Your First Workflow: Gmail AI Agent
This is the original screen that you get once you create a login on N8N. So what you must do is there's a plus sign over
here right at the top N8N and then plus. So once you click on a plus sign, you are adding a workflow. Now all these AI
agents, this is agentic AI workflow. We'll be creating workflows. So you can create in a personal account. So you
click on this plus sign. This is called workflow. And you can name the workflow. I would name it as my workflow or I
would name it as the AI agent name or let's say agent one or agent sales related agent or we are creating an AI
agent let us suppose for email so email related agent and then you can add a tag you can actually give some tags let's
say you're working with 20 30 projects five projects are related to email two projects are related to sales around three projects are related to some other
automation so you can manage the tags also you can give some tag so that later on you can search by tags but as of now
you just name the workflow and then we will be able to create a workflow so let us create our first NAN agent. What
it'll do? It'll be a Gmail based agent. So here is the simplest task here in this session. Today I'm not really going
to teach you NAN agent that you can automate the stuff. Today we are going to build such an NAN agent that will help you to learn NAN quickly. So that
later on you can build any agent you can use any agent you can understand anything. So let us cover the basics fundamentals properly so that we can
handle any type of complexity later on. So let us build one of the simplest AI agent. This is a Gmail based AI agent that listens to incoming emails. Let's
say somebody sends you an email. So uh we are going to build an AI agent. In fact, we will deploy it and we will see whether it works or not. We will build
an AI agent that will be your uh assistant. So, it is like for iron man, there is an AI agent called Zarvis. So,
whenever uh iron man wants to talk to something or somebody sends an email, imagine there's an AI agent, your
assistant which is sending the reply to the user whomsoever sends the email obviously will set the context. So, what
it does is it uses OpenAI GBD4 GBD 3.5 to analyze and respond. It'll try to use
any of these models to analyze whatever is the incoming email and it'll respond in the most possible or the most
relevant manner. We can also train how it should respond and sends a smart reply to the sender. So it's a simple AI agent. Once we receive the email instead
of sending a static message earlier also these kind of agents were there but they were not AI agents. They send just a static message one message to everybody.
But now we want to send a relevant or a smart message which understand the context. So let us try to build one such
personal assistant email assistant AI agent. So how we started? You first create this workflow on the left hand on
the right hand side you have this plus search and all these symbols are there. You click on this plus. This is where you will add all the nodes. I hope you
can see this clearly. Let me zoom in a bit more. So on the right hand side on the right hand side over here you will
see the plus sign. So I'm clicking on the plus sign. So the first node usually that first node is known as a trigger
node. That is where the whole automation or the workflow triggers. So I would like to add the first node as Gmail.
So within Gmail what action should be triggering it whenever somebody sends me an email that is when I would like to
kickstart. So what is the action? So go to email. So either you can add a
label to the message, get a message, get many messages. These are all the action. You can label it, you can draft it, you can thread action. So first one that you
see on message received. So I want to take an action once I receive the message. Once I receive the message that
is when I want to read the message, understand the message, draw, write a reply and then send it. So on receiving
a message is what you need to click. So here you need to add your Gmail account. So for you it will not it will be blank.
So what we must do is here we have to give a Gmail account so that once I receive in my Gmail account and then uh
for every minute you want to search once for every hour you want to check for your messages. Every day every week it is up to us. So I have kept every minute
whenever I receive a message every minute I'll be doing this exercise. Have I received any messages or not? If I receive a message on Gmail I would like
to reply to it. Okay. Every minute um once the event is once the message is received I would like to reply to it. So
if I fetch the event right now, somebody has sent me a message probably this is from urbanpro.com. Somebody has a dear
banker ready pricing for the following inquiries reduce respond etc etc. So these are the ones that I have received.
This is a message that I have received. It has just fetched it. Once you see your message here that means everything is working perfectly. So I will go back
to the canvas. So how do you go back to the canvas? On the top left hand side go back to the canvas is there. So I'll
click on back to the canvas. So I have the first node which is the trigger node Gmail trigger. Everything will get triggered from here. This node is ready.
You also add this node. The only thing that you will be adding is Gmail account. How do you add a Gmail account? It will take you to this place and then
you will just say sign in with Google. It's very straightforward. You just need to sign in with Google. Then your first node will be ready
once you are done with your first node. So this is what O2 recommendation and then you just click on sign in with
Google. Automatically it will be ready.
How do you know if it is working or not? Once you fetch the event, you will get the schema or you can also see it as a table. This is easier to see what is the
ID of the mail, thread ID and then uh your snippet, paytime etc. Like that you will have the mail snippet here. You can
also see it in JSON format. Table is easier to see. You can see if you see this table working that means your Gmail
trigger is working fine. So once we're done with uh Gmail trigger
that means somebody has sent me a mail I have to send them a reply that sounds uh as if I am sharing that reply to them.
So for that I will be using AI. If you want to use AI node you can use a dedicated AI node or you can use
customized AI node like open AI. So I will use a simpler version. I will use open AI message a model or classify
text. I would like to message a model. Don't do it when I'm doing it. Just observe it. Then I'll give you time. So what you must to do is you go here and
then you will click on this. We will say open AI is the one that I will use. I will click on it. I will click on
message model and then open AAI account need to be added. So for us to add the
open AI account, it is going to ask for API key. Those of you who have this API key, you put your key here and
automatically once it is done, you can save it. You can close this. Automatically your OpenAI account will be taken here. And then resource text,
your operation is message model and then from the list etc. These options will be visible once you put that openi account
over there and then we will be doing the rest of the things.
So which model is that what we want to take. So we can uh choose the model from openai charg 3.5 turbo or charg 4.40
latest or codex mini any one of them. So I have picked GPD 3.5 turbo is the one that I have taken. And here comes the
prompt. So in the prompt we have to give what is the message that we want to reply.
So what we will say is you are a helpful AI agent and you must try to answer the
user question. So you are a helpful AI assistant.
Try to understand the message. try to understand
the message and reply in let's say four lines.
The message is given here. The message is given here. And where is the message?
If you see on the left hand side, Gmail trigger ID, thread, snippet. Whatever is that snippet that I have, I will hold
it. I will drag it. I will put it here. So basically, you are a helpful AI assistant. Try to understand the message. Reply to it in four lines. The
message is given here. So whatever is the message that is over here that I have pasted it. So automatically AI
agent will understand that okay I have to read this message and I have to reply to that. If I execute this step
automatically the output will be generated but the mail sending will not happen. For that we have to connect Gmail once again. So first let me
execute this. Let us see whether it will give the output or not. See that it has read the message and in the output
either I can see the schema or table in the table. Thank you for update signing pricing for Python etc etc assistant.
This is the message that we have got. your helpful is try to understand the message and
write a reply. Write a reply in a professional manner.
Yeah, write a reply in four lines that should be fine. Once we connect the Gmail node then we
will be able to see what exactly it is trying to answer. So now you see here from Urban Pro we have got this message
and this is a response. Dear Urban Pro team, thank you for the update. So this is the output that we have got from the
this is the original message and this is the prompt that we have given and GPD3.5 turbo has generated this output but this
is not clearly visible here. What we will do is we will take this output we will go back to canvas. Now this model will be completed once we attach a
replay as well. So if I do a send a message then I'll be able to see the complete cycle. So the first one is I'll
get a message from Gmail. The second one is I will uh try to generate a reply from OpenAI and then the third one is I
will send a reply. So how do I send a reply? Again I have to bring back Gmail into the picture. So I will add Gmail.
This time I will be saying send a message. Now to whom I should send a message.
First of all credential to connect. I will use my Gmail account. The resource is uh message and then uh operation is
send to whom are you sending? Whomsoever has sent you the message to the same person we are trying to send. So to whom
we are sending to get that we have to go back to the previous node called Gmail trigger in that from where we are receiving the message somewhere the
message. So from address whatever was the from address that will be the person whom we are sending earlier I have received a message from this particular
person. So that is why I am putting this email here looks like somebody from urban port urban pro team has messaged me. So to that person now instead of
taking this exact one we are writing this JavaScript here which is like once you drag and drop automatically that
variable will be taken. So from Gmail trigger.json JSON from who whomsoever was the from id that is the one that I'm
dragging and dropping it here what is the subject whatever was the previous subject I will drag it here or max to max what you can put is re so reply to
that subject so I'm attaching the re extra text there and then reply operation is send operation email type
you can give an email text email or HTML email anything is fine and what is the message that we are sending which
message are we sending are we sending a static message to them or are we sending a dynamic message kind of generated by
open AI the message is generated by open AI so whatever was the open AI text that you see this the one that is generated
that is the one that we are sending. So here the variables that we are choosing are two is picked up from Gmail trigger whomsoever has sent that message earlier
from whom from whomsoever has received we have received a message that will be the two address subject will be the same subject with re added to it and then in
the email message we will go to our message model and from there we will pick that whatever was the response text
that is the one that we'll pick once we are done with it if we execute the step automatically the mail will be sent to urbanpro.com automatically it will be
sent but let me do that no problem let it go ahead and send it the mail is sent now to see whether this whole thing is working or not. Let us do a test. First,
what I'll do is I will do a test again. I'll try to rebuild this whole thing. So, it doesn't take this much of time. It takes hardly 3 4 minutes of time to
build uh this kind of very small agent which will read the message, compose the reply and then send it. But since we're
doing it for the first time, it may take some time. So, what we will do is we will do another test and then see whether it works perfectly or not. So,
let me show you this Gmail right now. Uh this is my Gmail. So, let let me send from another email. I will try to send
an email to this account. So let me compose. So from here
so my subject that I am composing somewhere else.
So so this is where I am composing. The subject is sir I need your help. These are the typical messages that I get.
Tomorrow I have an interview. I have an interview. I need materials
for so and so topic. Let's say for logistic regression.
Can you please share the video and uh DBDs?
Now this is a message that I'm sending. Once I send that message, the message will be received here.
Let us see.
So sir, I need your help. This message is received now. So what I'll do is I'll go and run this workflow. Now if I execute this workflow,
I can see the logs here. Gmail trigger. If I click on Gmail trigger, the message that I have just sent, tomorrow I have
an interview. I need materials for logistic regression. That message is received. And then from here, hello, good luck with the interview. Can I
provide you with materials logistic? Unfortunately, I'm unable to access sectional links like YouTube etc. However, I recommend like this one is uh
generated by OpenAI. If we make it like a rag model and say that okay, this is the particular link that you can give.
If we train it well with our data, then it will respond and then it has sent the message also. The person who has sent us
the email, that person would be receiving this email. This reply is already here. Yeah,
good luck with your interview tomorrow, etc., etc. So, this is one of the very basic NAN workflow. The reason why I
have introduced this very basic one is we want to get comfortable with NAN. There is this broomstick tidy up option. 1 2 3 four options are there. Zoom in,
zoom out, this all that. If you click on that tidy up option, then every time once you click on it, everything will come in the middle. Every now and then
what happens is sometimes we may be having the nodes like this not well arranged. I'll click on tidy up. It will tidy up whatever is seen here. I will
recreate all of this once again just to show you in a structured organized manner how it works. First we start with
Gmail trigger. Usually these are all the triggers. The first node is a trigger. That is where everything will get
started. What is the trigger? On receiving a message I can choose the mode to be every minute, every hour or
every day once. So I will choose every minute once. And then here we have to
give the Gmail account details. Once I fetch the event, fetch the event. Fetch the test event is the one that we try it
for the first time. Like see the output. So Gmail account fetch the test event.
No Gmail data found. We didn't get any Gmail data. Let us try to looks like the
let us try to connect this one to the Gmail. Sign in with Gmail. I will try to
sign in with Gmail. Making sure that it is signed in. then only it'll be able to get it.
Sign in successful. Now if I go back now this has uh fetched that event based
on the sign in that I have picked. I will go back to canvas now and then here I will try to add open AI an AI model.
Messenger model I want to send a message as a reply. Now you have to choose your openi account here and then messenger
model and what is the type of model that you want to choose? OpenAI is giving several models. DBD 3.5 Turbo is a
pretty decent model and what is your prompt? So here we would like to tell whatever this AI model wants to do. Read
the user message and reply in a professional tone.
The message is given here. Message is given here. Here we have to drag and drop whatever was the previous nodes
message snippet. Whatever was the snippet that need to be dragged and dropped here. And then once I execute this step, uh reply will be generated.
So somebody has sent me a mail node uh your uh allowed n access n access
basically I have uh just now I have logged into n so from n I have received a message you have connected your gmail
to n so I'm saying thank you for bringing this to my attention etc etc that is generated by AI and once you are done with this one you could say go back
to canvas now this is where I got the message this is where I have generated a reply now I would like to send a reply
so I will say Gmail I'll click on this and then this time I want to send a message now here are the options that I
want you to focus who to whom you want to send that is Gmail sender. So from whomsoever has I have received that is
the person whom I want to send. What is the subject that you want to keep? Security alert was the subject. So I will say reply to that security alert.
So reply to the subject name. And then what is the email type? That's fine. Any email type is fine with me. Text or HTML. The HTML will give you access to
put more and more HTML tags make the email look beautiful. Later on we can respond to that. As of now we are just giving the text message. And then what
is the message that you want to send? That message is developed by OpenAI model. So whatever was the response text that was generated that is the one that
I will pick. Once I execute this step it will automatically send an email. I will not execute it. I will go back to this. So right now everything is given here.
Once I execute the workflow automatically this workflow will send a reply to NAN but NA probably it will
just throw it back because uh that must be a no reply no reply one. So it has sent a message to NAN. So if you see the
send messages in this one. So security alert and I need your help. All of this
is happening on Gmail. This is what makes NAN very exciting. until whatever agents that we have created we haven't
seen them in action but the first basic agent in N8 itself we have seen it in action our Gmail automatically a reply
being generated by Gmail automatically it has been sent by N8N we will try to go one level up the previous uh agent
that we have created or in N8 and these agents are known as workflows the previous workflow was pretty simple we will try to make it a little complex now
what we want to do is whenever somebody says AI agent it means that it is replacing a human resource usually we
want to create AI agents which will be almost alternating atives to human resources. That's what the whole AI
agents are all about. Imagine a human resource whose job is to send cold emails. So we have a list of customers
or these are known as leads in the marketing terminology. I may have their email address, I may have their mobile
numbers. So what I want to do is maybe this person who who takes these email addresses and he keeps on sending these
cold emails whether they are buying my product or not, whether they're showing interest in my product or not. every week once I keep on sending these emails
so that when there is a need for that product automatically they in their back of their mind they will always think about my product. So that is what this
cold the whole idea of cold email automation is. I want to keep on sending this is not an active marketing I want to send emails almost every week once so
that the customer will remember me whenever there is a need. So what if I want to automate that using NAN so I
want to have all these leads maybe on a Google sheet. I will be updating my leads. I'll keep on adding my leads their email addresses. I want to create
an NAN agent which will automatically take the email address from here. I just want to automate it. I don't want to
give it to it manually. I will put all my leads in this sheet. If there's a new lead comes, I'll just update it here. I want automatically NAN to approach here
and then from this place I want N to take the data and then I would like it
to take the data from leads sheet and then maybe use AI or maybe I have a
static email. So fill the email and then send the email using uh Gmail ID. You
try to send the email. So first take the data leads data fill the email and then you try to send the message. So that is
the one that I want to create. So there will be three nodes once again. One node will be taking care of gathering the leads. The second node will be taking
care of uh filling the email data. This can be either AI node or it can be a simple static text node. And then the
third node will be taking the action of sending the email. So let us try to create this. So this is the first
workflow that we have created. It is called as email agent. Now the next workflow I will click on this plus. I'll click on workflow. This is going to be a
personal workflow. First let me save this workflow and then go ahead with the new workflow. This workflow name is old
Building a Cold Email Automation Workflow
email automation. Old email automation is what I want to do. So first I will add a schedule trigger. I want to
schedule like whether I want to send the email daily or weekly or monthly. So that you have to schedule. So you have
to add a schedule trigger. Schedule trigger is the first one. In that you can add a schedule trigger interval. Every day once you want to send it or
every minute you want to send an email that will be too much. Every hour you want to send it or every weekly once that you want to send it. Is it on
Sunday midnight or Monday midnight? You can schedule it. If you say day exactly at what time of the day that you want to send it, you can put all of this. So I'm
saying every week once is I want to send it. So this is a very simple node. I'll execute this step. This will be set. So
every week once this email will be sent. So if you see a green tick mark that means this node is working fine. There's
no problem and there is nothing uh complex about this node. It is just that we have created a schedule. The next one is the one where we want to get the
leads data. So the leads data is on Google sheet. Imagine. So from Google sheets I want to get this data. So I
would say Google Sheets. Google Sheets. And then do I want to
create a spreadsheet? No. Do I want to delete a spreadsheet? No. I want to get rows from the sheet. I want to get the
rows from the sheet. So I want to get the rows. So here you have to add your Google Sheets account or the Gmail
account itself. And then the resource is sheet within a document. The operation is I want to get the rows. I want to
copy the rows. I want to get the rows from that sheet. What is the document? What is the sheet that you want to put it here? And what is the sheet name
within that? So let us do one thing. We will go to Gmail and we will try to create a Google sheet or we can take the
existing leads data. Let us see whether I have the leads existing leads data.
Now this is one other lead one. So let me say email. So I will go to Google drive.
So I already have one uh leads. Let us suppose these are the DV leads. So whatever are the leads your customer
leads you have kept them here. So these are the email addresses. So let us not bother these email addresses. So I will
take this one only. You can have any number of emails. No problem. You can keep any number of them. So as of now I have kept one of them. So what I want to
do is I want to go to this place. I want to send emails to all these people from this second row, second column which is
email. So as of now I have only one row. You can fill it with any number of rows. So this is the sheet that I want to
take. I'll make sure that it is shared anyone with the link. I will copy the link. I will go back to my NHN. I will
say document by URL. I have copy pasted a URL here. So this is a URL. So automatically it will say which sheet
out of that. Let me name this sheet as emails. So it is already named as emails. So from the list it will say
from the list by name let us see sheet one
there is one emails. So basically what I want to do is I want to I want to go to this particular uh
Google sheets within that there is one sheet called emails that is the one that I want to take. If you want to add any additional filter conditions you can add
like I want to take only top 10 or I want to take from this condition or that condition. As of now I don't have any condition. I want to go to the sheet. I
want to get all the emails. So I can give four five emails also or I can give 10 emails any number of emails that I
have. So intentionally what I'll try to do here is just to make sure that I don't disturb them, I will try to give some wrong emails here so that only the
first email will be sent. So these are the data points. So once I
execute this step, when do I know it is working perfectly or not? Automatically it should go to our leads data and get fetch the data. So it has fetched those
four rows that we are looking for. I'll go back to canvas. So we are sending an email every week once and then uh the
email will be sent to all the emails that are there in our Google sheet. Now the next step is I want to send an email
message. So to send an email message, I will add a static mail content node. Either you can send an email using AI
generated content or you can just fix an email. This is marketing email. So the marketing mail is usually fixed. So you
will fix an email, you can send it. So you can add something called static node. static node
or I think the node name here is I think set is the node. So I will just set
node. So here the mode is manual mapping. What are all the fields that you want to add here? Those are the fields that we will be creating here.
One field that I want to add is subject of the email. Subject of the email
whatever is the value of that uh subject you can add it here. Let us suppose we want to send cold emails related to DV
analytics. Let us suppose we want to send it to a list of candidates. Let us otherwise we are selling a product.
Imagine we are selling one healthcare related product where we are measuring u let's say blood pressure or we are
measuring a glucose level using a small device or healthcare
made easy. This is a product that we want to send. So this is a subject. So this is the subject of the email and
then I will create body of the email. So right now I'm not sending this email. I'm just keeping all these parameters ready. So that in the Gmail trigger
which I will create later on there I will drag and drop the subject. There I will drag and drop the body of the message.
or email body. Now you will talk about this healthare product how what is a healthare product
by our you will not write like this. So you will write properly like what is the whole product about buy or healthcare
product it has feature one feature two feature three
etc like that you keep all these features etc etc all of them once you execute this step if these two fields are set correctly so you have the
subject of the email body and we will be sending four emails so for four emails this is the one that we will get as
output I'll be sending every week once I'll be sending to all the leads that are here and the content that I want to
send is also ready The next item that I will be adding is I want to send the email through Gmail. So I'll go here. I
will put Gmail here. Now this Gmail I want to send a message through Gmail.
Message send to whom. So to whom I will go to rows wherever email is there. That
is the one. This is a set of emails that I want to send to these emails. And what is the subject? Can somebody tell me
what is that I have to drag here. Shall I fill the subject here? No, I will be dragging that from subject of the email
which we have created using earlier edit fields. and then message whatever was the email body that will be my message.
Once I execute this step automatically this email will be sent to all those four leads that we have. How many of
even if you have 4,000 leads all of them will be getting that message. Once I execute this mail sent sent not executed
properly all these mails were spent. In fact what Gmail does is if you're
sending if you're blasting the emails like this to hundreds or thousands of people Gmail may tag your account as spam account. So what trick people use
is instead of making it look like a robot, people try to add something called wait in between. So don't send
all the messages in one go, Gmail may be tagging me as a a kind of spam. Maybe wait for 10 seconds. 10 seconds. That is
the time interval between uh each of the emails that you are sending. So you send every week for all of my leads. You take
my subject, you take my whatever is the email body. I can change it if I want. And then send the message using Gmail.
But in between sending the messages from email to email. Let's say 100 emails don't send within a minute. 100 emails send in 500 or maybe thousand seconds.
So that Gmail thinks that I'm sending one by one. Even then if you are sending too much of this if you are overkilling it then if people are tagging us as spam
then also Gmail may block our account but we need to use this carefully. This
is a cold email automation. When I said people are using AI for automating their job, these are the kind of workflows
that they are creating. People are very much excited about it. Something like this creation of this was not easy earlier. This hardly takes like uh the
whole setup that we have done what like 20 minutes but it will save a hell lot of time. In fact we can customize it further here. We can make the email body
HTML format as well. If you give HTML format finally if you choose HTML style email here then the email will also look
beautiful with all the tags and HTML tags it will look much more uh neat. So that is how these uh old automation
emails are working.
quickly try this. In fact, uh within NAT, we have seen a
couple of agents like this. There are several uh a couple of nodes. What we what we have seen there are several nodes that are available. You have uh
your uh email responder agent which will have uh like this is one that we have seen. One of them there is something called lead scoring agent. It takes the
data, scores the lead quality, how good is the lead, whether it can be converted into the potential customer or not or it
can send to our sale team or it can update our CRM. Okay, this is the lead that you must call weather alert agent. It checks the user location, fetches the
forecast API and sends a personalized advice to that user. You are traveling to this place, but the weather says that around this time there could be a rain
around this particular place. Personal assistant agent, Telegram chat agent, we will create one telegram chat agent. In fact, the next one is Telegram chat
agent. So there are several agents. Now there is uh some place called templates. If you want to use some of the pre-built
workflows on the left hand side, you see in the menu on the left hand side you have the pre-built template. So these
are all the templates uh LinkedIn lead generation. So somebody has created this template. You can use them. This one is
Exploring n8n's Template Library and Workflow Automation
automated Trello board summarization template. Get daily calendar summaries via SMS with Google calendar. A powered
email trigger autoresponse system with OpenAI and Gmail. It sounds something like what we have created. GitHub bounty issue tracker etc. So if you click on
see more templates you will see there are 7164 workflows that are already there. So if you want to work on
something interesting related to particular field like AI, sales, IT operations, marketing, document ops, other let's say if you're interested in
a particular industry and you want to focus a lot on that industry only then you can search for it. Let's say I'm
interested in e-commerce. Now I will try to see what are the workflows that are there. 3D product video generation from
2D image e-commerce store. So somebody will upload a 2D image. Let's say you want to help a gold store. You want to
make some money out of it. So what do you say? Uh whatever is the new product that you get. So you'll go and talk to that gold shop owner. Whatever is a new
product that you will get, I will just take a photo of it and then I will create a 3D product video generation and
then you can post it on your Instagram. You may get a lot of customers. So that kind of product that you can suggest multi- aent SEO optimization like that.
There are several several e-commerce related. For example, if I'm interested in another industry for example, I'm
interested in healthcare only. Are there any related product extract process healthcare claims via BLM run Google
Drive and sheets? Let's say healthare claims. So if I want to use it, I'll click on it and then some of them are free, some of them are paid. This says
this is for free. I'll click on this. This is used for free. Import template to my cloud workspace. Copy template to
JSON. Let me say import template to my cloud workspace. No workspace found. Wonderful. So what I'll do is I'll try
to get this copy template to keyboard. I have copied to clipboard. What I will do is I will go here create a new workflow.
I will say first I will save this and then I'll just do control V. Since I
have copied to my clipboard then I will say tidy up. So this is the template somebody's talking looks very simple. Get the Google drive trigger which means
the data healthare data must be on that. Download the file PLM run. Probably this is the one that will analyze all those healthare records and then whatever was
the hard copy that will be given in a very structured format. Some of the workflows like this they may look very simple let me tell you companies will
pay you a lot for these kind of automations because hell lot of resources were used in analyzing these health claim records and somehow if you
can automate it with higher accuracy and that would be great what I'm trying to tell you is you can go ahead here and
play around with some of the automatically existing workflows you don't need to create workflows from the
scratch are you with me everyone you try to see some of the workflows let's say related to marketing let me remove healthcare there will be hell lot of uh
workflows related to marketing summarize your YouTube translate dynamically generate a web page from user requests
like that. There are different different workflows. Try to practice these workflows. There are different type of nodes. We have discussed some of these
nodes. Trigger node is what we have discussed. AI code node is what we have discussed. There are some utility nodes. So, we are going to see several other
examples to touch upon all these nodes in the upcoming uh examples.
Nodes are connected visually. You can see that if you click on let's say if you click on your overview as of now, whatever are the nodes that whatever the
workflows that you have created, they can be seen here. So cold email automation is one of them or email agent
is the other one. Let's say if I click on my previous workflow these are all the nodes that are connected visually. One thing that I suggest is if you want
somebody to read it easily you can rename them. So here it says schedule trigger but somebody who is looking at it for the first time for the first time
they may not understand what exactly this schedule trigger is. So what you can do is you can click on this you can click on the node and click on IDF and
then click on the node. So this is the name. So instead of schedule trigger send a mail weekly.
So that is a name that I have given. Send a mail weekly. Get rows from the sheet is the next one. So what I'll do
is I'll click on this. Instead of get rows sheet I'll say emails email leads data.
Email leads data is the second one. I will click on this. This is the mail
subject and body. Right. Sending a message. I think I can
leave it as it is or I will simply say send emails.
Wait in between the mails. So this is straightforward wait and uh between a mail.
So what I'm trying to tell you is you can rename these nodes so that this overall thing looks like a story. You send a mail weekly get the data from
emails mail subject and fill the mail subject and body send the emails wait in between the emails. So that is how you
can make your uh overall workflow look a little neater or readable. In fact in some of the workflows you have seen some
uh background colors as well that also can be done by us. Let's say this one we will save it. We will go back. Let's say
we have this email agent. So if I want to format it slightly differently, what
I can do is I can add something called sticky notes. Add sticky notes. So I will add sticky notes here. The first
note this is the Gmail trigger. So it says I'm a note and this is written in markdown format. Markdown means if you put two hashes that is heading level
two. If you put one hash that is heading level one. Like that there is some kind of code. So I would just write this node
gets email. That is what this node gets. this note gets email. So that is the
first thing. So if I want to make it even smaller, I can go to three hashes. Now I will add another sticky note.
This is the one that is over here. Just to make this readable, just to make this explainable. Like we don't want the user
to get confused with what our nodes are doing. In that case, you can use it. What does this node do? This trying to
tell us this node generates the reply. This node generates the
reply. That is the one that we are writing. So the reason why I'm showing it here is once you're downloading some of the standard
workflows you may see these kind of notes that are appearing. So you can change the color of this note as well. So here let me say this one. This node
generates the reply.
Similarly I will add another sticky node. The last node whatever is the node
sends the message. This one sends the message.
So sometimes when you're working or when you're downloading especially some of the existing workflows you may find them
having these type of sticky notes added behind the nodes. That is also one way of arranging it. But the one that I like
is instead of the sticky notes you name your node in such a way that automatically the user will get to know what is it regarding what this node is
doing. Now what you can do is let's say from one place to another place if you want to move these workflows you can export
them as JSON files. So you can download this whole workflow in the form of a JSON file. Once I say download it says
email agent.json. Let's say if I want to download another one I'll go to overview. I want to download this one
whole email. So I will say download automatically it will be downloaded as hold email
automation.json. It will be downloaded as JSON exported as JSON. Now you can also import it. So
Importing and Exporting Workflows in n8n
let's say if I want to create a workflow or either you can copy paste it or you can import it.
So this is a blank one. Import from a file. So earlier somewhere I have this file cold email automation is a file. So
that is the one that I want to import it. So import from a file. Cold email automation. This is the one. So I would
say cold email automation one or two. Save it. So let's say when we are
searching for this I like one of the template AI powered multisocial media post automation Google trends and perplexity somebody has done it for
social media. So this is the one maybe I'll try to understand. So looks like uh some trend
will be found. So let's uh use it for free and see. So copy the so it says copy the template uh clipboard. I will
copy it. I have copied it. I will go to my workflow and personal and then I will paste it. That is one way or I can go
back. Let's say is there a download option that they have given? No. Anyway, we
will go here and then I'll click on tidy up. Again, this tidy up will give you the format that originally that somebody
has created or all the notes will be shown to you. So, schedule trigger find the Google trends to the most trending
topics and then find the keywords. Choose the blog topic. So, what I think somebody's doing is they're finding the most important trends, finding a blog
topic and then doing the research using perplexity and then pushing it onto Facebook, LinkedIn and Twitter or the X
and then update the Google Sheets. So that is how somebody is automating the social media posting automatically. So
if I want to use this, I just need to connect my Facebook account, LinkedIn account, Twitter account and then this
perplexity accounts. Wherever these accounts are required, I'll be so once I save it, I can uh export it. Looks like
uh this contains what? Let's see. It contains credentials that have not shared with you. Looks like it has credentials that are not saved with us.
So maybe we have to change those credentials and then once we save it, we can export it as JSON as well. So what
I'm trying to tell you is NAN has made everything so easy. In fact last week a couple of weeks back this was not there
when I was uh creating this material but a couple of weeks back they have added an extra thing called you don't even
need to create these agents also. So let me create a new agent new
AI-Powered Workflow Generation and ChatGPT Integration
workflow. It's hagging for some reason.
Now until now I have shown you the first part step by step. But here it says build with AI which means even you don't
need to do whatever we have shown until now. Whatever I told you until now all of that need not be done. You just tell what you want to do. I want to create a
cold email automation agent. The data of the leads email data
is on Google sheet. We want to send emails to each of the
lead in the Google sheet. That's it. So basically you're not even creating what
I have told you. You don't even need that. You just write down what you want and then you click on it. Automatically
the whole workflow will be created. They don't even want us to even drag and drop the notes. Don't take the pain or
pressure of dragging and dropping the notes. You just give the right prompt automatically everything will be done on its own. Let us see
this I haven't tried. I don't use it because I want the overall workflow in my way. Maybe we can create one and see
how it is suggesting. Based on that we can make uh modifications. So first schedule trigger workflow configuration
get leads from Google email generation and then uh Gmail tool. I think sending the email is missing. I think that will
also be added soon. Overall this looks uh in line. It is still thinking. Probably one last
thing need to be added which is uh sending the email or is this one automatically? Yeah, looks like it is
sending the email here. So, email generation agent is taking the leads data. We have to give the placeholder for leads one. So, the reason why I'm
showing you this one is you don't even need to create the workflow that we have created right now. You just give the
prompt the workflow will be created. This you can use it when you want to create from uh AI. In fact, you can go
to charg get a similar workflow and then uh paste it here. So let's say I will go to tactivity
and say give me an N8 workflow. This is what I'm saying. Give me an N
workflow.
Finally I will ask you to give me in JSON format so that I can copy paste.
Give me in JSON format so that I can copy paste.
I just need to copy this board, paste it in NA. All of this will be created.
There you go. So, let me copy this board and then I'll go to N8 once again. This time I'll create another workflow.
Leave without saving and just control V. I just did control V. Nothing else. I just hit control V here. And this is the
one that it has created. I'll click on tidy up and then see schedule trigger. Get the lead from Gmail data. If email
is connected or not connected. If email is connected then send a cold email. If email is not connected mark as okay if
email is contacted not contacted. Looks like it is checking maybe if it is already contacted or not. We don't want
to send the duplicate emails. That extra if then else condition is added. If it is not contacted then it is going back and updating the email one. Sometimes
this may work. If it doesn't work again I'll go here. I'll say that the Gmail sending is not working. It is just showing it as contacted not contacted.
Then it will make the adjustments. What I'm trying to tell you here is n it's not that you have to create everything
from scratch on your own. A lot of it is kind of automated. You just need to have clarity in your mind what you want to do
and if you sit on it sufficient amount of the time, you should be able to build that automation for sure. There's no doubt about it.
I'll pause here and take some questions. Anybody having any questions?
Building a Telegram AI Agent with Hacker News Integration
Let's create another NA10 agent. This time it'll be a telegram agent. User will be sending a message from telegram
the app. And then behind the scenes we want to run our AI agent. The AI agent will respond to the user on telegram.
You can do this in WhatsApp also but somehow WhatsApp has so many security features. So setting up or the setup
takes a hell lot of time. So we'll be spending a lot of time on the overall setup. We have to register our account under business or something. But I'm
going to show you in Telegram, you can try it on WhatsApp also. So I want to create one AI agent that will give the
news related to latest technology. So keeping up with this technology, keeping up with AI, open a what is happening
there, what is happening in Google, what is happening in Gemini. So I find it very challenging. So what I thought is what if I create an AI agent that will
get the news. So it will use hacker news. Hacker news is the place where you'll get latest news related to technology, latest discussions related
to technology. And I want it to have a kind of very easy interaction with the user. So user will be using either WhatsApp or Telegram. The user will ask
hey what is the latest news related to OpenAI? What is the latest news like recently one meeting has happened by
Nvidia. So what is the news related to that Nvidia meeting? What is the OpenAI dev day highlights? So if the user will
ask or automatically maybe I want to give every day one newsletter to the user saying that okay this is what is happening in the tech world. If that is
the AI agent automation that I want to do I'll show you how easy it is to do that. Let us create one N agent. Let me
save this and then go to the new workflow.
Postal workflow. For some reason, it is hanging in sometimes. Probably it has to do with uh the Firefox.
All right. Now the first trigger that I add is Telegraph. So somebody if somebody is messaging from Telegram, so
whenever somebody messages on message, so if somebody clicks on Telegram and say hi, that is when this whole workflow will get activated. So Telegram chat
account, we need to add it here. telegram account and then put it uh trigger on message. So in telegram
account if you want to add telegram account there is something called access token that you need to get. So I'll show you how to get this access token from
telegram. Anybody can try this. This is not a big field. So let me show you how it is done. You have to get this access token. Most of the times uh getting this
access tokens itself is the only difficult task. Rest of all things are taken care by n. Now from telegram if you want to create any bot you have to
use something called this bot father. Like botfather you have this bot father. There are duplicates of this. So make
sure that you're using the one that has more than uh 3 million users. Bot father. So once you say bot father there
if you go there and say I want to create a new bot, new telegram bot is what I want to create. That will give all the
news and so on. All right. A new bot. How are we doing? How are we calling it? Please choose a name for your bot. I
would say latest text news agent latest.
That is the one that I want to create. Then it will say everything should end with the bot. So let me just give this name. Now it says that it must end with
bot. So I will say text news latest bot.
Here you will get access token. It's that easy. You just need to copy this. Once I click on it, copy to clipboard. I
will go back here. Put the access token here. That is how you will get the access token where you have created one
uh bot. If people will interact to that bot, that bot will give the latest tech news. That is the one that we want to
create. So the first trigger is this one telegram trigger and telegram account is from the access token that we have got.
and then on a message. So if somebody sends a message on telegram, this will get triggered. Let us try to execute
this. So it is listening for the test event. So listening means it is waiting for somebody to message this here. So we
have created this tech news agent latest bot. I will click on this. So this is the one I will say start. I'll say
hello. Now let us see it's let's go back here. I'll say stop listening and then execute
this step. Then I'll go here. I bought
go to telegram and create an event. I think the ID that I have been using the access account is not for this one. So
the previous one itself I'm using. So what I'll try to do is this particular one I'll try to update.
Stop listening. I'll go to telegram account. I'll put the access token the one that I have copied here. Save it.
It is testing. Done. It is now the connection is established. Now if I execute it, it is listening for me to
send a message. I will go back here. I will send a message. Hello. This one must be seen here. If I execute
this, you can see message ID is four and whatever was the message I have sent is hello. Let me execute once again just as
a test. This time I'll try to say hello. I want to know the latest news in tech.
You can see that whatever the message that I have given there, it has got it here. I want to know the latest news in
the tech. So our first trigger of listening to the message from the bot is here. Now I want to add an AI agent
which will try to gather all the tech news. So I will add AI agent node.
Earlier we have added open AI node directly but here regularly what people use is AI agent node. AI agent is little
bit more complex. In this you will give chat model. You see here down chat model memory tool. You can add multiple
features inside an AI agent node. So the user prompt what is a user prompt? Simply right now it says JSON chat
input. We will leave it as it is for now. Actually the prompt is whatever the user is asking we need to answer to
that. So what we will do is we will simply the user prompt is defined below. What
is the user prompt? The user is asking this. Hello I want to know the latest tech news. So to that we need to respond. How do you respond? You need to
you give a chat model. The chat model is open AAI. I want to use OpenAI chat model.
within that you give the open account and whatever is the type of the model that you want to use
and then the tool here I want to use hacker news tool there's a particular tool called hacker news hacker news is
the platform where you get all the tech news discussions this is the hacker news pretty simple UI
whatever people are talking about the latest post plastic can be programmed lifespan etc etc everything related to
tech people are talking about it people rate it everything related to tech if you want to be up to date with the text
news uh the tech related news you can follow this hacker news this is what a lot of people this is like our uh Instagram for tech guys are nerds okay
now hacker news tool is what I want to attach now tool description you can you can
leave it as set automatically resources you get it from the articles article ID
which article we need to get we don't know based on what user has asked we'd have to get it so you sometimes you will see these buttons that means let the AI
decide it once you click on this you're saying defined automatically by the model. So you don't need to specifically mention the article ID. Let the AI
define this. So execute this step. So here right now it is asking for article ID. This execution doesn't make sense.
So we will go back to the canvas. We will leave it as it is. As of now we will get a message from the user from Telegram. This AI model will uh get the
information or analyze information from chat GPT and then also try to get the news from hacker news. Once it generates
the output, we have to send it back to the user back to telegram. So user is waiting in the telegram. He says I want
to know the latest news in the tech. we our AI agent has to generate it and then send a message back to the user. So even
before that what we will try to do is we'll try to give another message to this AI agent that try to use hacker
try to use hacker news tool to answer
the user questions. If you do not know the answer, say I
don't know instead of making it up.
Question is given here. Question is here. So I'm saying use the hacken use
tool and if you don't know the answer say I do not know and the question is given here. I will not execute it. I will just attach the rest of the node
also. Then we will experiment with it. Now the next node that I will add is again telegram node only.
So will be again telegram. Send a message back to the user. Send a text message.
You can send an audio file etc etc. Whatever you are developing here you can send it. Here I'm keeping it pretty simple. Send a text message. What is the
resource message from where I will get the message previously generated? I think the message is generated by AI agent. Let me execute the previous node
and see there's a problem with the workflow. Let us try to go back one by one. One by one we'll try to execute and get it because for us to attach it we
need to execute the previous one. So I'll go back here. Execute this step. So okay this is one of the problem in NAN
unless until you resolve the outstanding issues it is not going to execute the previous one. Now this is kind of chicken and egg problem to resolve this
issue we need to execute this code to execute this code we need to resolve this issue. So this is kind of going into the loop. So for that what you may
have to do is you just save this once and then try to go for executions. You have you are in editor you go into
executions the latest execution you click on debug in editor. So now you're all fresh the errors are gone. We are at
the debug mode. Now we will freshly execute. So one by one node. So there is an execute step for this node itself. The first node is what I'm executing. So
it is waiting for a trigger. The trigger is given in this one. So again I will write the same message.
This node executed successfully. You can see that somebody has sent this message. Now I will go here. The previous ones
are here. Now I will try to execute this node.
The problem get an article in the hacker news. This is not working. Looks like when somebody told I want to know the latest news related to tech. There is
nothing like that in the hacker news. uh tool. So what we will do is we will try to give some message that is kind of
relevant. So let me re-execute this again. We will go back to executions and
then I will say debugging editor. I'll select the latest error debugging editor. This times we will execute this
again. Problem in the workflow.
This is the article. Let's execute the previous steps.
So what I'm trying to do is I'm trying to send a message where I can get the information from hacker news.
It's waiting. So let's go back to this one. I want to know about let's say open
AI. So telegram I want to know about open AI
that works. So here it says the resource that you are requesting could not be found. So looks like about open AAI that
information could not be found is the one that it is giving. So what we will do is instead of uh getting the resource
as article here we will make a small modification anything that you have as many documents as possible instead of
getting precisely open AI related information you get every information that you have instead of 100 let us get
10 articles at least in 10 articles we must have something for sure so somebody if they say that I want to know open
about open AI at least within 10 goes or maybe you will try to search in 50 articles get many articles 50 articles
at least somewhere that news must be there so let us give this and try to execute this step now now it again
waiting for our telegram this one I will send the same message earlier it failed because it could not find the exact precise one article that we're looking
for now I'm trying to get as many articles as 50 looks like something it has got okay in fact uh it has gone
through all these articles and it will generate some output out of it so from there that output will be given to openai that will be sent to telegram so
now looks like everything is fine now I'll try to execute the workflow once I execute the workflow or I will try to
keep it as active and then once I keep it as active I don't need to come back here I will come here now I will have
the actual interaction because on that side everything is set. I want to know about OpenAI. Let us see what is the
response. So here the response is generated here
some of the recent stories related to OpenAI. OpenAs board has fired Sam Alman this story links to open a blog
announcement etc etc. I think you know that story. Now what is the chat ID? Because this is the chat I have to give
the response to that chat ID. So I have to attach the chat ID here and then what is the text? The output. So the output
is the text first. I'll keep it here. So this is the text reply that I want to give to which chat I have to give. I
have to give the chat ID over here. So somewhere in the chat. This is this chat ID. For this chat ID, I will give this
as the response. Now if I execute this step, right now it is not allowing us to do it because it is saying deactivate
the workflow. To execute this, I will go back here. I will say deactivated and then I will come back here and then
execute this workflow. This is the response that we have got. So open air board has fired alman GP4.
This is an open GP4 model. So are creating text etc. Another story about open air. These are all the stories what is happening. Now I will try to go back
and now I'll keep it active. For you to have an interaction from outside your NA10 workflow has to be marked as
active. I'm marking it as active and then we will go and have an interaction with it. Let's say what is the latest
news about Gemini? What is the latest news on Gemini?
The whole workflow has to take place in the back end and then give us this result. I could not find any recent
latest news on hacker news item. Therefore, I don't have the latest news on the Gemini. Let me ask once again.
What is the news on Gemini? Looks like genuinely if it doesn't have
it will not give. Now it has given us I don't know answer. What is the news on Chad GT?
Is people is there anyone who's talking about chat GPT? Let us see. It is searching. It just has found open
board has filed some like that it has found a couple of articles. What we will do is we will go to hacker bank and then
try to see some of the latest post Spotify Shopify equals of real 8K browser render exposure it's time for
your own space age from sales to real life fun strips etc etc etc
we'll try to ask for one news that is uh here
let's try to ask this
I couldn't find any specific story discussion etc etc. Maybe it is not uh try able to find many articles related
to this but anyway overall what I'm trying to say here is this is a telegram based agent and what it is doing in the back end is it is trying to connect our
AI agent it is trying to connect our n workflow
and if we give sufficient amount of tools one is hacker news tool. What if I give Google news? What if I give Yahoo Finance news? If I add many tools and if
I give this a chat model, what it'll do is it'll gather all the information and then it will respond to the same user in
the same chat. What you can do is instead of Telegram, you can put any other chat agent. Instead of Telegram, you can also use WhatsApp. But uh here
in Telegram, it's very easy to create a bot, get the API key. But in WhatsApp, it's not uh that simple or straightforward. So this is our third
Key Takeaways and Practicing n8n Workflows
workflow that we have created. Again, this whole workflow you don't need to create from scratch. You can use AI to
create this workflow also. But what I generally suggest is initially it's better to learn the hard way. If you create your own workflows by your own
hand, you will be making lot of mistakes. That is where you will learn. After that once you create workflows using AI, if there are any issues, you
can fix them quickly. So these are the three fundamental workflows. After going through any number of multiple
workflows, what I found is there are certain nodes that we need to understand. I made sure that in these three workflows, we cover up all those
different different type of nodes. So once you are very comfortable in these workflows, you can build any amount of
complex workflows. In the later session, in the next session we will try to see uh some more workflows which are a bit
more complex than this. We will see something called a web hook node. We will try to set up a Google cloud account related node. So we going to see
different uh type of workflows which will cover different different nodes. But again it's not that easy to learn n
in a session like this where I'm explaining and you are watching it. N can be learned only through practice. You can see this session as just a
kickstart or some kind of demo that I'm giving but only when you try everything by your own hand only when you fail and
then fix it. That is when you will gain the real confidence of NAT. So that is the introduction session of
NAT. We will discuss a bit more workflows in the next session. I'll now open the forum for questions. Any
questions? Anybody quickly
continue with the next video in the playlist. We are covering everything step by step. If you have any questions
or the comments, please post them in the comments window below.