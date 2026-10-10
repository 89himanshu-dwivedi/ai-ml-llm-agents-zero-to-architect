# MCP with an AI Agent — Complete English Notes

> **Source preservation:** The uploaded transcript has been reorganized into study-friendly sections. The complete original transcript is preserved in Appendix A. Practical guidance beyond the transcript is clearly separated.

## Table of Contents

1. [Understanding MCP with an AI Agent](#1-understanding-mcp-with-an-ai-agent)
2. [The Example Agent's Four Tasks](#2-the-example-agents-four-tasks)
3. [Architecture Without MCP](#3-architecture-without-mcp)
4. [Advantages of MCP](#4-advantages-of-mcp)
5. [MCP Workflow: From User Prompt to Confirmation](#5-mcp-workflow-from-user-prompt-to-confirmation)
6. [Step-by-Step MCP Workflow](#6-step-by-step-mcp-workflow)
7. [Claude Desktop + n8n Case Study Architecture](#7-claude-desktop--n8n-case-study-architecture)
8. [Configuring the Desktop Application](#8-configuring-the-desktop-application)
9. [Without MCP vs. With MCP](#9-without-mcp-vs-with-mcp)
10. [Simple → Advanced → Super Advanced](#10-simple--advanced--super-advanced)
11. [Errors, Gotchas, and Limitations](#11-errors-gotchas-and-limitations)
12. [Best Option and Trade-offs](#12-best-option-and-trade-offs)
13. [Interview Questions: Junior to Architect](#13-interview-questions-junior-to-architect)
14. [Quick Revision Cheat Sheet](#14-quick-revision-cheat-sheet)
15. [Final Summary](#15-final-summary)
16. [Assistant-Added Practical Notes](#16-assistant-added-practical-notes)
17. [Appendix A — Complete Original Transcript](#appendix-a--complete-original-transcript)

## 1. Understanding MCP with an AI Agent

The speaker uses an AI-agent example to compare how integration code can differ with and without MCP.

The main point is that MCP becomes more valuable when an agent must use many providers and tools. Direct integration can remain a reasonable choice for a small system.

## 2. The Example Agent's Four Tasks

The example travel agent needs four capabilities:

1. Search flights
2. Book flights
3. Search hotels
4. Book hotels

The user provides the origin, destination, dates, hotel location, and budget in natural language. The LLM interprets the request, and the agent selects relevant tools.

## 3. Architecture Without MCP

### 3.1 Multiple providers, different formats

If there are ten flight operators and each has a different API, the implementation may need a separate tool or integration for each provider. For example:
- Operator A uses `from`, `to`, and `date`.
- Operator B uses `source`, `destination`, and a departure-related field.

The workflow needs a common structure, so integration code **normalizes** the returned data. A similar process may be repeated for hotel providers.

### 3.2 What is normalization?

Normalization converts provider-specific data into a uniform structure so the agent can compare options and select one according to the user's requirements.

### 3.3 When is direct integration acceptable?

The transcript says that direct integration is fine when the system is small, there are few tools/APIs, and duplication remains manageable. MCP is not mandatory for every project.

## 4. Advantages of MCP

In the MCP model, rather than implementing every provider's details in every agent, the agent sends the task and required details to the MCP server. Example tasks:
- Search flights
- Book a flight
- Search hotels
- Book a hotel

The MCP server calls the underlying providers/tools, normalizes data, handles limits, and returns a standard response to the agent.

### 4.1 Reuse

Multiple AI agents can connect to one MCP server. This can reduce the need to reimplement the same integrations inside each agent.

### 4.2 Enterprise value

MCP may be particularly useful when:
- There are multiple providers
- Provider schemas change over time
- Multiple agents or applications use the same capabilities
- Centralized integration and maintenance are desirable

**Important:** API calls still happen. MCP does not magically remove them; it provides an approach for standardizing and reusing integration responsibilities in a shared layer.

## 5. MCP Workflow: From User Prompt to Confirmation

High-level flow:

```text
User Prompt
   ↓
AI Agent / LLM interprets request
   ↓
MCP Client discovers available tools
   ↓
MCP Server lists/exposes matching capabilities
   ↓
Agent chooses relevant tools
   ↓
MCP Client sends tool request
   ↓
MCP Server calls underlying provider APIs
   ↓
Results return to agent
   ↓
Agent compares options and selects
   ↓
Booking request goes through MCP
   ↓
MCP Server returns booking result
   ↓
AI Agent confirms to user
```

The transcript covers flight and hotel search and booking. After search results arrive, the agent selects an option based on user preferences and sends a booking request.

## 6. Step-by-Step MCP Workflow

### Step 1 — User prompt
The user asks for a flight from Bangalore to Delhi on a specified date and a nearby hotel within a budget.

### Step 2 — The LLM interprets the request
The LLM extracts requirements such as origin, destination, dates, hotel location, and budget.

### Step 3 — Identify the required tools
The agent determines that it needs flight search, flight booking, hotel search, and hotel booking capabilities.

### Step 4 — MCP client tool discovery
According to the transcript, the MCP client queries the MCP server for available tools/capabilities.

### Step 5 — The server returns available tools
The server provides information about relevant available tools. The agent chooses suitable tools for the task.

### Step 6 — Tool execution
The MCP server invokes the selected tools and underlying flight/hotel services, then returns results to the agent.

### Step 7 — Thought, observation, action loop
The transcript describes an iterative agent loop: the agent observes results, evaluates them, may call another tool, and reviews the new results. A task is not guaranteed to involve just one tool call.

### Step 8 — The agent selects an option
The LLM helps select flight/hotel options based on user preferences, such as the hotel budget.

### Step 9 — Booking request
The selected option is sent to the MCP server through the MCP client, which initiates the booking action.

### Step 10 — Confirmation
The server returns the booking result to the agent, and the agent communicates the outcome to the user.

> **Source nuance:** The transcript presents booking as an automated flow. In a real implementation, explicit user confirmation and server-side authorization before booking or purchase can be important safety controls; this is additional guidance.

## 7. Claude Desktop + n8n Case Study Architecture

The transcript introduces a practical case study:

- **Host / AI application:** Claude Desktop (speech recognition in the transcript also renders the name as “Cloud Desktop”)
- **MCP server:** A server hosted on n8n
- **Tools/capabilities:** Gmail, reading/sending email, checking calendar events, and creating or blocking calendar events
- **Configuration:** Add the MCP server connection details to the desktop application's configuration

High-level architecture:

```text
User
  ↓
Claude Desktop (host / AI application)
  ↓ MCP client connection
n8n MCP Server
  ├── Gmail: read/search email
  ├── Gmail: send reply
  └── Calendar: check/create/update events
```

According to the transcript, another AI agent can connect to the same MCP server to reuse the capabilities, provided the server and access permissions support that use.

## 8. Configuring the Desktop Application

The transcript's demonstrated steps are:

1. Download and install Claude Desktop.
2. Sign in.
3. Open the application's settings.
4. Edit the configuration in the Developer section.
5. Add the n8n MCP server connection details to the configuration file.
6. Create/configure the MCP server on n8n.
7. Verify that the connector/tools appear in the desktop app.
8. Test a calendar or email capability through a prompt.

The transcript refers to a configuration file named `claude_desktop_config.json` and describes adding the address of the n8n-hosted MCP server.

**Version caveat:** UI labels, configuration formats, and supported connection types may change. This summarizes the workflow demonstrated in the transcript; it is not guaranteed to be current click-by-click documentation.

## 9. Without MCP vs. With MCP

| Area | Without MCP | With MCP |
|---|---|---|
| Provider integration | Provider-specific integrations in the agent/tool layer | Integrations can be organized in a shared MCP server |
| Tool count | Multiple tools/integrations for multiple providers | Agent discovers/accesses capabilities through a common MCP interface |
| Data normalization | May be repeated in agent integration code | Can be centralized in the server/connector layer |
| Reuse | Code may be duplicated across agents | Multiple agents can reuse the same server |
| Maintenance | Changes may affect multiple consumers | Updating a shared integration may be easier |
| Small project | Often simple and adequate | The extra layer may be unnecessary |
| Enterprise | Duplication and coordination may grow | Standardization and reuse may be more valuable |

## 10. Simple → Advanced → Super Advanced

### Simple
One agent and one or two stable APIs. Direct integration can be practical and easy.

### Advanced
Multiple flight/hotel providers. Provider-specific code, data normalization, and error handling must be maintained.

### Super Advanced
Multiple agents, applications, and teams reuse the same tools. Shared MCP servers, access control, versioning, observability, scaling, and governance become important.

## 11. Errors, Gotchas, and Limitations

1. **MCP is not required in every case.** Small systems can work well with direct integrations.
2. **Code does not magically disappear.** Provider integrations and normalization logic still need to exist in the MCP server.
3. **The MCP server becomes a dependency.** If it is down, dependent tools may become unavailable.
4. **Tool discovery does not guarantee correct selection.** The agent still has to choose the appropriate tool.
5. **Provider schema changes still need handling.** The shared layer may need updates and tests.
6. **Bookings have side effects.** Search may be read-only, but booking is an external transaction; design authorization, confirmation, and duplicate-request protection.
7. **Protect credentials.** Do not hard-code API keys or tokens in source code or public configuration.
8. **Use least privilege.** Avoid combining email-read and email-send permissions unnecessarily.
9. **Setup is version-specific.** Verify current desktop configuration and n8n MCP behavior.
10. **The transcript simplifies the protocol flow.** The high-level client/server diagram is illustrative; implementation details depend on the actual setup.

## 12. Best Option and Trade-offs

| Situation | Recommendation | Reason |
|---|---|---|
| One agent and a few APIs | Consider direct integration | Simpler architecture and fewer moving parts |
| Many providers with different schemas | Consider MCP | Shared normalization/integration may reduce duplication |
| Many agents reuse Gmail/calendar/travel tools | Consider a shared MCP server | Reusability and centralized maintenance |
| Booking, payment, or sending external emails | Add approval and authorization controls around MCP | Standardization alone does not guarantee safe actions |
| Critical production workload | Add monitoring, fallback, and versioning plans | The shared dependency must remain reliable |

## 13. Interview Questions: Junior to Architect

### Junior
1. What are the example agent's four tasks?
2. What is data normalization?
3. When is direct integration acceptable?
4. What is the high-level role of the MCP server?
5. What role does the transcript assign to the MCP client?

### Mid-level
6. What challenges arise when ten flight operators expose different APIs?
7. How can an MCP server reduce duplicated integrations across agents?
8. What is the difference between tool discovery and tool execution?
9. How does the workflow proceed from flight/hotel search to booking?
10. What is the role of the thought–observation–action loop?

### Senior / Architect
11. What design decisions are needed to make an MCP server a shared enterprise service?
12. How would you isolate and test provider schema/version changes?
13. How would you enforce idempotency, approval, and authorization for bookings?
14. What fallback strategy would you design for an MCP server outage?
15. How would you choose between direct API integration and MCP?
16. How would you design access control, observability, and tenant isolation for a shared MCP server?

## 14. Quick Revision Cheat Sheet

- Example agent tasks: **Search flight, book flight, search hotel, book hotel**.
- Without MCP: provider-specific integrations and normalization code may be repeated.
- Normalization: converting provider-specific data to a common format.
- With MCP: the agent discovers/accesses capabilities through the MCP client and server.
- MCP server: calls backend APIs/tools and returns results to the agent.
- Main advantages: reuse, standardization, and centralized integration.
- MCP does not remove integration work; it organizes that work in a shared layer.
- Small system: direct integration can be reasonable.
- Enterprise/many agents: reuse benefits from MCP may be more valuable.
- Case study: Claude Desktop + n8n MCP server + Gmail/Calendar tools.

## 15. Final Summary

The central lesson is that **the value of MCP grows with the number of integrations and the need to reuse them**. Direct integration may be enough for a small agent. When many providers expose different schemas and several agents need the same capabilities, an MCP server can provide a common integration layer.

In the described workflow, the LLM interprets the user's prompt, the MCP client discovers tools, the MCP server executes underlying tools, results return to the agent, and a selected booking action produces a confirmation.

The case study proposes using Claude Desktop as the host and n8n to host an MCP server with Gmail and calendar capabilities.

## 16. Assistant-Added Practical Notes

> These points add practical engineering guidance beyond the source transcript.

- **Human confirmation:** Before booking a flight or hotel, confirm the selected provider, dates, total price, cancellation rules, and traveler details with the user.
- **Idempotency:** Use a provider-supported idempotency key or equivalent safeguard to prevent duplicate bookings when retries occur.
- **Authorization:** Discovering a tool is not the same as having permission to use it. Verify identity and permissions on every call.
- **Separate read and write tools:** Keep search/check tools distinct from booking/send/update tools and name them clearly.
- **Observability:** Log request IDs, tool names, latency, provider response categories, and failure reasons; avoid logging secrets or unnecessary personal data.
- **Resilience:** Define timeouts, bounded retries, rate-limit handling, and partial-failure messaging.
- **Evaluation:** Test correct tool selection, required-field handling, compliance with user constraints, and safeguards against write actions without confirmation.
- **Current setup:** Verify the latest official setup instructions for the desktop app and n8n, since the transcript's UI/configuration details are version-specific.

## Appendix A — Complete Original Transcript

The uploaded transcript is preserved below. The original wording has not been silently rewritten.

```text
Introduction to the Series
Hi, this is Wenut. We just turned into
wanker ready classes. This video is part
of a series. Complete the previous
videos in this playlist [music] before
you start this video. The complete
playlist information, the material and
the code file information is given in
[music] the video description below.
Understanding MCP with an AI Agent Example
By now, if you haven't got the hang of
MCP, that is totally natural. I will try
to give you one more example. I'll try
to give you kind of pseudo code of an AI
agent. I'll try to show you what happens
in that AI agent. If we are using the
without MCP, if we are writing the code,
how does that happen with MCP? If we are
using MCP, how do you think the code
will change? That's what I'm going to
show. So, right now we are building an
AI agent. It does exactly four tasks.
One is it can search the flights. Let us
suppose I want to go to Delhi. So, give
me best flights maybe from Bangalore to
Delhi. Give me the or search the
flights. Give me the best flight and
then book the flight. So AI agent can
book the flight also. Search for the
hotels in Delhi. I want to stay in a
particular place. This is my budget.
Search for the hotel. Book the hotel.
Now this is the task of an AI agent. It
can very well do it. No doubt about it.
Now if you are not using MCP, how will
be the process? When you are searching
for flights, there are four, five or
maybe 10 different flight operators.
They may have different different APIs.
So you may have to use 10 tools. So let
me show you one example. Imagine you
have two different operators. This is
one operator. This is another operator.
they have their different API format. So
the first operator gives the format as
from to and then date. The second
operator has a format of source
destination and then department or
something like that. So you will be
interacting if you have 10 flight
operators you have to create 10 tools
and then you get the information and
then you have to write a function for
the normalization of all that data.
Normalizing means you have to put it in
a uniform format so that AI agent can
understand at the end and then you try
to pick the best flight. The next one is
hotel one, hotel two, hotel three big uh
every hotel have their own API try to
check for the hotel, normalize the data
that is received from the hotel, pick
the best hotel and then the next task is
once you pick the best flight, best
hotel, try to book it. Now this is
without MCP it is still fine when you
are handling less number of tools, less
number of APIs. This is what people do
and this is still fine if your overall
system is quite small and if you do not
have too many tools to handle, I still
say go ahead with this. It's not a big
Advantages of Using MCP in Enterprise AI Systems
deal. But what happens with MCP? You
don't want to write the code like this.
You don't want to repeat this again and
again. I'm giving my origin uh this uh
I'm traveling from here. My destination
is this. Multiple times I'm giving it.
Check in time is check date is this.
Chicken uh check out date is this.
Chicken date is this. Check out date is
number of guests. I'm giving the same
information multiple times. Now what if
we are having MCP? The AI agent will
tell MCP simply search flights. I'm
traveling from here to here. Now I'm
giving this information to MCP server.
It is up to you MCP server. You have to
tell me whichever is the set of tools
that you are interacting all that like
from the AI agent this is very
simplified version if 10 AI agents are
using earlier all the 10 AI agents were
writing these many lines of code but all
the AI agents right now will write a
single line of code I'm sending this
information of search flights to my MCP
server and then search hotel to my MCP
server and then book flight book hotel
that's it you have four tasks search
flight a single function Book flight,
search hotel, book hotel, just give the
details. MCP server has to handle it.
Now within MCP server, all this hassle
that we have that will be now within MCP
server. It will be handling all this
search flight, search tool, etc., etc.
Now, where is the advantage? You might
be thinking we are writing similar
amount of code in MCP server also.
Earlier we were writing inside the AI
agent itself, inside the tool. But now
you're writing MCP with that whole code
in MCP server. It is right. We are not
totally taking away API calling. API
calling is still there. But what is the
added advantage? Once you get this MCP
server, this is reusable. Any AI agent
can connect to this MCP server and use
it. If you're talking about a very big
enterprise, that is when you will value
this whole MCP system. Without MCP, we
are directly talking to each hotel, each
flight, each like how many ever are
there, we are directly talking to them.
If you have less number of these, if
you're handling less number of API
calls, if you're handling less number of
tools, you can still directly go ahead
without any MCP. That is what a lot of
people do right now in agent Ka system
especially at an individual level when
people are trying examples they will go
ahead without MCP but if you are looking
for learning this agent KA system if you
want to get into a job in the company if
you see most of them they might be using
if not MCP they will be definitely using
standardized protocol for sure but right
now we are talking about MCP this is
kind of universally they have made it
open source everybody is kind of
encouraging it everybody they is
releasing their own MCP server even the
large companies like Microsoft they are
releasing their own MCP servers so that
everybody can use them directly without
[clears throat] using the individual
tools. So with MCP AI agents talks only
to the MCP server. MCP server talks to
all those APIs. Normalize the data,
handles the limits, returns the standard
format back to the agent. It will make
the agent job easy and multiple agents
can interact with MCP server. Use MCP
server when you have multiple providers
changing of the schemas many agents apps
using the same capabilities. In that
case you go for with MCP. So we will
learn MCP then you decide if you are
building a very complex agentic AI
system go with MCP. If you're building a
simple agentic AI system, if you're
building a simple agent, you may not
need MCP.
MCP Workflow: From User Prompt to Confirmation
Let me show you the MCP workflow before
we get into the actual MCP case study.
In this workflow, let us suppose we
start with the user prompt saying that I
want to book a flight from Bangalore to
Delhi on a certain date. Also, I want to
book a hotel near a particular place
with this requirement. Now the AI agent
once it takes the user prompt the
natural language AI agent will interpret
that after interpreting it will try to
understand okay we have to use certain
tools based on the LLM lm is the brain
inside the AI agent it'll think that
it'll think and say that we have to use
the tool searching of the flights
booking of the flights searching of the
hotels booking of the hotel then this AI
agent will talk to MCP client tool there
is one MCP client tool which will kind
of act a middleman between AI agent and
your MCP server this MCP client tool
tell the MCP server that these are the
tools that we are looking for. Do you
have them or can you go ahead and
execute these tools? MCP server will
then tell give the response back to the
AI agent saying that yes we have these
tools and these are the options. I have
searched the flights choose one. I have
booked the flights. This is the final
output. I have searched the hotels
choose one. I have booked the hotel.
These are the details. So once the MCP
server executes the tools and give back
the options, AI agent will pick one or a
couple of options and then finally MCP
server will handle all the bookings and
it'll give the response back to AI
agent. AI agent will finally tell the
user that I have just confirmed the
flights. I have just confirmed the
bookings as well. This is the overall
workflow between MCP and the AI agent. I
will try to show the workflow diagram
step-by-step process as well starting
from the user uh prompt until the final
confirmation but overall flow goes like
this.
Step-by-Step MCP Workflow
So the first step would be the user will
give the prompt to the AI agent. I have
this AI agent. This AI agent is going to
take the information or the prompt from
the user. User has prompted giving the
information that book me a flight from
Bangalore to Delhi on 15th August and
book a hotel near a particular place. my
budget is this much. Now that will be
given to AI agent. The large language
model inside the AI agent will
understand the user natural language
query and it decides that you know what
for me to do this I need the tools like
searching the flights, booking the
flights, searching the hotels, booking
the hotels. Then the next step is MCP
client which is with AI agent will be
doing the tool discovery. So it has to
talk to MCP server. So MCP client does
the tool discovery. Agent as the MCP
client. So this is one MCP client which
sits with AI agent. We're going to see
that later on. MCB client queries to MCP
server. Once these tools are discovered
and this is the program that will try to
act as an agent or act as a medium
between AI agent and MCP server, it goes
to MCP server and says that the tools
that I require right now. You might be
having thousands and thousands of tools.
Right now the tools that I am requiring
or the service uh that we require are
related to search flights, book flights,
search hotels, book hotel. Then the
server MCP server it responds by saying
that okay I have the tools search flight
booked flight search hotel book hotel
these tools are available. Then the AI
agent will choose the tools. Okay I have
these many tools. MCP once MCP server
kind of confirms that all these tools.
Maybe there are apart from these four
tools it may give these are the tools
maybe this is the best one or this is
the best one like that it may give eight
or nine tools. Then the AI agent will
choose the exact tools that is required.
The LLM acts as almost like a brain
inside that AI agent. Out of the eight
tools that we have given, we require
these four tools for doing this
particular task given by the user. Then
the next step is MCP client calls MCP
server. Further MCP server calls the
search flight, search hotels, whatever
the tools that are required, it will
call them. Then once you call them MCP
server will execute because we have
already given a confirmation that these
are the four tools or two tools that we
want to execute further and we have
given the information MCP server
executes the tools. Then let's say if
you are talking about search flight
search hotel AI agent MCP server may
have to may have to go back to AI agent
ask it to pick the best hotels or ask it
to pick the best flights based on user
preferences. So there can be two and fro
in between them. MCP might send after
execution. Okay, I have searched for the
flights. Here are the flights. You know
that in AI agent, it's not just one
iteration that will happen. There will
be thought, observation. AI agent will
interact with the tool. There will be a
thought. It'll pick the first tool.
Maybe this is not the right tool. It'll
pick the second tool. Maybe this is not
the second tool like that. Thought,
observation, and action. Thought,
observation, action. There will be lot
of iterations that will be happening
inside an AI agent. MCP server will
execute these tools and send the
information back to AI agent. Then the
AI agent picks the options. LLM picks
the top hotel the flights that it is
looking for and then once this picking
is done finally AI agent will give this
information to MCP client for booking
the request. AI agent will say that I
want to go with this flight option. I
want to go with this booking option
because LLM inside the AI agent based on
the user preference. User has asked for
5,000 per night and it will use its
brain and it will use its reasoning to
pick the hotel at 5,000 price the best
hotel. It'll book the it'll try to pick
the flight that is from Bangalore to
Delhi at a particular price and send it
to MCP client. Then the MCP client sends
the booking request to MCP server. We
are nearing almost the completion of
this whole task. The MCP server finally
what it will do? It handles the
bookings. Once it handles the bookings,
it will give it back to AI agent. The AI
agent will tell the user that we have
just booked your flight. You know what?
All this was done in AI agent
automatically. Earlier also only thing
is in between there was no MCP server.
The process remains the same earlier
like what was the process user used to
ask the AI agent book this flight I want
to do this and the LLM inside AI agent
used to interpret it. AI agent used to
directly interact with the tools. Now
I'm not saying that we have reduced the
work totally we have changed the whole
process. MCP is not a totally new
concept all together. What I'm trying to
say is we we were doing earlier also the
same task. It was fine if you are having
lesser number of tools but if you're
handling tool lot of tools lot of API
endpoints lot of databases if you have
to interact way then instead of
interacting directly with them if there
is a change in them you may have to
suffer a lot within the AI agent you may
have to write a lot of code instead of
that you interact everything with MCP
server still there is pain but it is
one-time pain then once you create an
MCP server AI agent can send requests
that are like natural language to MCP
server MCP server will handle everything
now that is the overall flow. What we
will do is to get a better understanding
of it. Now this is just the theory.
Until now we have discussed. Let us get
into an MCP case study to get a better
understanding of it.
MCP Case Study Architecture: Cloud Desktop and N8N
Before we go ahead with the case study,
let me show you or let me try to give
you the architecture or what is the
overall objective of this case study. So
what we do is we will install something
called cloud desktop. This will be our
host. We are going to use cloud desktop.
So from here as a user we will send the
prompt and then we will keep the MCP
server on NAT. On NAT we will have the
MCP server. Now this MCP server will be
connected to multiple tools. Maybe this
MCP server is connected to the tool of
Gmail, reading the email, sending a
reply to an email or accessing the
calendar events, blocking a calendar or
checking the calendar or like that. All
the tools that we want to connect we
will connect on NAN. Now here if the
user gives any request earlier if you
are having an AI agent you are supposed
to have all the tools here but now we
will just create an MCP server and in
the configuration file of your AI agent
you just configure that you interact
with this server. Now if the user gives
a prompt that go check my calendar then
it will hit the MCP server it will have
multiple tools it will use a right tool
to check the calendar and it will come
back and give us the response. If the
user says that send an email to a
particular person then this particular
prompt will be converted into a command
again. It will hit the MCP server. It
will search for the tool that has the
ability to send an email. It will send
the email and come back and give us a
confirmation that I have sent the email.
Our host is cloud desktop or AI agent is
the cloud desktop where it will
understand the user requirement and MCP
server will be on NAN that will provide
all the services in terms of tools that
we are looking for. Now if we want to
update any tool, if we want to add the
tool, if the tool updates, all that we
need to do is do it on MCP server. Now
instead of cloud desktop, if someone
else like the same MCP server, if
someone else wants to use it right now,
Wenert is using this particular MCP
server. If someone else wants to use the
same server or my own second AI agent,
this is AI agent one that I'm using for
a particular task which is using this
MCP server. If I'm creating my own AI
agent 2, earlier if I'm using AI agent
2, I have to create all these tools once
again integrate them. But now I will
just hit the MCP server. MCP server has
a link. Server link is there. You just
give the same server link in your
configuration. You can access all those
tools which are there on that MCP
server. Agent 3, agent 4. Any number of
agents can connect to that MCP server.
Let us see how does that work. We have
to start by installing cloud desktop and
then we will go back to n create an MCP
server. Then we will take the link of
the MCP server, keep it in the
configuration file and then we can have
a discussion with the cloud desktop
which will do all the bookings and all
the actions for us. Let's get started.
Setting up Cloud Desktop for MCP Integration
Let us get started by going to Google
typing cloud desktop app. You can
download the cloud desktop app. You
click on the first link. You download it
for whichever version you want. You
click on uh download. You log that by
using your cloud login account. If you
do not have quickly create one cloud
login account, the free tier gives you
certain number of credits daily. You can
use certain number of commands within
cloud desktop. So go ahead install it.
If everything works fine, you must be
installing a cloud desktop like this.
Once you log in, I'm also on the free
plan only. Later on we can upgrade if
required. As of now, this is the cloud
desktop app that you must be looking at
once everything works perfectly. Now
what you should do here is if you go and
click on your left hand side bottom this
particular link you will have settings
page in this settings you have to make
the right uh settings by clicking on
developer but even before that I want to
tell you one important information. And
if you click on new chat, you can write
uh any command here. You will get the
output. But if you click on this search
and tools, if you click on it, right now
there is web search, add connectors,
manage connector. We do not have
anything MCP from NAN. NA connectors are
not there. So what we are going to do is
on NAN, we will create an MCP server.
After that, we will come to this
configuration, add it to this
configuration. Then we will be seeing an
extra command here. An extra connector
which is N8N connector will be appearing
here. So how do you do that? You go to
your uh login id whatever is this button
on the left hand side bottom and then
click on settings and then there is
developer within settings there is
developer right below if you see here
you click on this developer you can edit
the configuration if there is n
configuration already done you will see
an option here but right now I haven't
done it I have deleted the previous one
so if you edit the configuration file
automatically it will take you to this
configuration if you do not have it you
check or you search by this name cloud
desktop configuration.json JSON by
clicking on that previous link
automatically it should land us here. So
once you have landed on this, once you
click on this configuration, there's
nothing. It's simply MCP servers. It
just a plain blank one. Here you have to
update it. What you need to update? You
have to put the MCP server information
here. And the server we are going to
create on N8. On our N8 cloud, we will
host our MCP server. We will put that
MCP server address in this configuration
file. Then our cloud desktop app which
is our AI agent host. This one will be
able to access our MCP server which is
sitting on our N8N. That is the whole
point of MCP servers. Anybody from any
location can access the server. Multiple
agents can access the same server. So
let us go to our N8N create an MCP
server over there.
Conclusion and Next Steps
Continue with the next video in the
playlist. We are covering everything
step by step. If you have any questions
or the comments, please post them in the
comments window below.
```
