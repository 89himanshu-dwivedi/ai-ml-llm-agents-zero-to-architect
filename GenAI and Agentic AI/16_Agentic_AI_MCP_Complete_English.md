# Introduction to Agentic AI and MCP — Complete English Notes

> **Source handling:** These notes reorganize the uploaded transcript into a study-friendly structure. The complete original transcript is preserved verbatim in Appendix A. Source-derived ideas are kept distinct from additional practical guidance.

## Table of Contents

1. [Video Context](#1-video-context)
2. [What Is MCP?](#2-what-is-mcp)
3. [Why Enterprise AI Needs MCP](#3-why-enterprise-ai-needs-mcp)
4. [Hotel Booking Analogy: MakeMyTrip](#4-hotel-booking-analogy-makemytrip)
5. [Problems with APIs](#5-problems-with-apis)
6. [Problems When AI Agents Use Many Tools](#6-problems-when-ai-agents-use-many-tools)
7. [How the MCP Middleware Model Works](#7-how-the-mcp-middleware-model-works)
8. [Without MCP vs. With MCP](#8-without-mcp-vs-with-mcp)
9. [Key Concepts and Terms](#9-key-concepts-and-terms)
10. [Simple → Advanced → Super Advanced](#10-simple--advanced--super-advanced)
11. [Errors, Gotchas, and Limits](#11-errors-gotchas-and-limits)
12. [Best Option and Trade-offs](#12-best-option-and-trade-offs)
13. [Interview Questions: Junior to Architect](#13-interview-questions-junior-to-architect)
14. [Quick Revision Cheat Sheet](#14-quick-revision-cheat-sheet)
15. [Final Summary](#15-final-summary)
16. [Assistant-Added Practical Notes](#16-assistant-added-practical-notes)
17. [Appendix A — Complete Original Transcript](#appendix-a--complete-original-transcript)

## 1. Video Context

This video is part of a series on Agentic AI and focuses on the **Model Context Protocol (MCP)**. The speaker first explains why a standard is useful, then uses a hotel-booking aggregator analogy to show why integrating many APIs can become difficult.

## 2. What Is MCP?

**MCP stands for Model Context Protocol.**

The transcript describes MCP as an open protocol that standardizes how applications provide context to large language models. Its analogy is a **USB-C port for AI applications**: USB-C standardizes a connection for devices, while MCP aims to provide a standardized way for AI applications to connect to tools and data sources.

In the transcript's simplified architectural explanation, MCP acts as a middle layer between an AI agent and its tools or APIs.

> **Nuance:** “A fancy wrapper” is an introductory analogy, not a complete technical definition. MCP is a protocol with defined interaction patterns, not merely a box around API endpoints.

## 3. Why Enterprise AI Needs MCP

### 3.1 From simple agents to enterprise systems

The transcript mentions smaller agent use cases such as:
- Creating calendar events
- Triggering Gmail or sending automatic replies
- Building Telegram or WhatsApp bots

Enterprise systems may need to interact with many tools and APIs. Each integration can have its own:
- API schema and response format
- Authentication method
- Error-handling behavior
- Rate limits
- Maintenance requirements

If every agent implements every integration independently, code duplication and maintenance effort can grow, and changes can break dependent workflows.

### 3.2 The standardization idea

The transcript imagines a large organization where separate teams connect to the same APIs in different ways. A shared MCP server can offer a common interface and reusable integrations across teams.

**Core point:** MCP does not eliminate integration work. It can organize and standardize that work in a reusable layer.

## 4. Hotel Booking Analogy: MakeMyTrip

The speaker uses a hotel aggregator such as MakeMyTrip.

1. A user selects a destination and dates.
2. The aggregator displays multiple hotel options.
3. The aggregator does not own every hotel; it obtains availability and price information from hotel systems.
4. This information is commonly exchanged through APIs rather than by scraping every hotel's website.

### 4.1 Different hotels can expose different APIs

Hotel A might return fields such as `room_id`, `room_type`, `price_per_night`, and `amenities`. Hotel B may represent similar information using different field names or a different structure.

The aggregator therefore has to:
- Understand each hotel's API
- Normalize data into its own common format
- Update integrations when an API changes

At a scale of hundreds or thousands of hotels, maintaining separate integrations can become expensive and complex.

## 5. Problems with APIs

According to the transcript, API integration complexity goes beyond a different URL or a few different response fields.

| Problem | Practical meaning |
|---|---|
| Different schemas | Field names, nesting, and response structures can vary |
| Authentication | Services may use different authentication mechanisms |
| Error handling | Error codes, retry behavior, and failure modes can vary |
| Rate limits | Services can impose different request limits |
| API changes | Upstream schema or behavior changes may require integration updates |
| Repeated integration | Multiple agents or teams may reimplement the same connection |

## 6. Problems When AI Agents Use Many Tools

An AI agent commonly combines:
- **An LLM**, which interprets the user's natural-language request and helps decide which capability to use.
- **Tools**, which expose external capabilities such as hotel availability, flight search, weather, restaurant booking, or cab booking.

Example: “I am travelling to Bangalore. Show me hotel options for these dates.”

The LLM interprets the request, and the agent selects an appropriate tool. A travel-planning agent may also need flights, weather, restaurants, and cabs. Custom integration logic for every tool can make orchestration complicated.

The core issue is that the agent should focus on completing the user's task, but custom schemas, authentication, rate limits, and errors can burden every integration.

## 7. How the MCP Middleware Model Works

The transcript's high-level model can be represented as:

```text
User
  ↓ natural-language request
LLM / AI Agent
  ↓ standardized tool interaction
MCP Server
  ├── Hotel API
  ├── Flight API
  ├── Weather API
  ├── Restaurant API
  └── Cab API
```

### Responsibilities described in the transcript

- Expose tools or capabilities through a standard interface
- Integrate with underlying APIs
- Normalize data and return it in a common format
- Keep integration-specific concerns in a shared layer
- Allow multiple agents to reuse the same server and capabilities

The transcript's key point is that **MCP standardizes and makes integrations reusable; it does not remove the underlying integration work.**

### Why a shared server can help

If multiple agents use the same MCP server, teams may avoid duplicating the same integration in every agent. A fix can be made in the shared layer. The actual benefit depends on implementation, versioning, and deployment design.

## 8. Without MCP vs. With MCP

| Aspect | Direct integrations (simplified model) | MCP-based model |
|---|---|---|
| Agent connection | Custom integration with each API/tool | Agent accesses capabilities through an MCP server |
| Tool discovery | May require custom or hard-coded wiring | Tools can be discovered through the MCP server |
| Integration code | May be duplicated across agents | Can be reused in a shared layer |
| API differences | Handled in agent/per-tool integration code | May be handled by the MCP server or connector layer |
| Maintenance | Changes may affect multiple consumers | Updating a shared layer may help |
| Complexity | Integration details may burden the agent | Some complexity moves to the shared server |
| Responsibility | Agent plus per-tool integrations | Agent plus MCP server plus underlying APIs |

## 9. Key Concepts and Terms

### 9.1 Model Context Protocol
A protocol intended to standardize how AI applications interact with tools and context.

### 9.2 MCP server
A server that exposes capabilities through an MCP-compatible interface and can connect to underlying systems.

### 9.3 Middleware
A layer between systems that handles communication, transformation, or integration concerns.

### 9.4 Tool discovery
A client can discover available tools and their capabilities instead of manually hard-coding every endpoint.

### 9.5 Normalization
Converting data from different systems into a common structure.

### 9.6 Reusability
Allowing multiple agents or applications to use a shared integration or capability.

### 9.7 “Write once, use everywhere”
The transcript's guiding idea is to standardize a common integration once and reuse it across agents. It does not mean maintenance becomes unnecessary.

## 10. Simple → Advanced → Super Advanced

### Simple: one tool
One agent needs one stable API. A direct integration may be manageable.

### Advanced: many heterogeneous tools
An agent needs hotel, flight, weather, and restaurant capabilities. Managing different schemas, authentication, and errors becomes harder.

### Super Advanced: enterprise-wide reuse
Many teams and agents share capabilities. Shared MCP servers, governance, versioning, access controls, and observability become important.

## 11. Errors, Gotchas, and Limits

1. **MCP is not a magic fix.** If an underlying API is unavailable, the MCP server cannot use that dependency normally.
2. **Integration work does not disappear.** The transcript explicitly says the work remains; standardization and reuse are the goals.
3. **API changes still require attention.** The MCP server or connector may need updates and testing.
4. **A standard protocol does not make backend APIs identical.** Different services may still need adapters and normalization.
5. **Security remains essential.** Use least-privilege permissions and design authorization or approval for sensitive actions.
6. **Latency and reliability matter.** An extra middleware hop can add latency or another failure point.
7. **Tool selection is not guaranteed.** Standardized descriptions can help, but a model may still choose the wrong tool.
8. **A shared server is a shared dependency.** Plan for availability, capacity, tenant isolation, and monitoring.
9. **The “fancy wrapper” analogy is incomplete.** MCP should be understood in terms of its actual protocol and client/server behavior.

## 12. Best Option and Trade-offs

| Situation | Practical direction | Why |
|---|---|---|
| One small agent and one stable API | Direct integration may be sufficient | Avoids the cost of an additional shared layer |
| Many tools with different interfaces | Consider an MCP layer | Standardized discovery/interfaces and reusable integrations may help |
| Many agents or teams share capabilities | A shared MCP server may help | Reduces duplication and can centralize governance |
| High-risk business actions | Add explicit authorization, validation, approval, and audit logs | The protocol alone does not enforce business safety |
| Strict latency or reliability needs | Measure both architectures | Evaluate extra hops and dependency trade-offs |

## 13. Interview Questions: Junior to Architect

### Junior
1. What does MCP stand for?
2. Why might an AI application need MCP?
3. What does the USB-C analogy mean?
4. How are APIs and tools related?
5. How does the MakeMyTrip analogy illustrate the problem MCP addresses?

### Mid-level
6. Why do different API schemas make integrations difficult?
7. What is the difference between an AI agent and an MCP server?
8. What is the benefit of handling authentication, rate limits, and errors in a shared layer?
9. What is tool discovery?
10. Does MCP eliminate integration work or standardize it? Explain.

### Senior / Architect
11. How would you design a shared MCP server for multiple agents?
12. How could an MCP server failure affect dependent agents?
13. How would you manage API versioning and backward compatibility?
14. Where would you enforce authorization, tenant isolation, audit logging, and secret management?
15. Which factors would guide the choice between MCP and direct integration?
16. How would you observe, scale, and secure a shared server?

## 14. Quick Revision Cheat Sheet

- **MCP:** Model Context Protocol.
- **Purpose:** A standardized interface for AI applications to interact with tools and data sources.
- **Analogy:** USB-C for AI applications.
- **Main problem:** Different tools/APIs have different schemas, authentication, errors, and rate limits.
- **Hotel example:** An aggregator must integrate and normalize data from multiple hotel APIs.
- **MCP server:** A shared MCP-compatible layer that can expose capabilities and handle backend integrations.
- **Key benefits:** Reuse, discoverability, and standardization.
- **Important caveat:** Integration and maintenance remain; the placement and reuse of complexity change.
- **Enterprise angle:** Make shared capabilities manageable across many agents and teams.

## 15. Final Summary

The easiest way to understand MCP is this: **when AI agents need many tools and APIs, a standardized protocol and reusable server layer can be preferable to implementing every integration separately inside every agent.**

In the MakeMyTrip analogy, the aggregator has to handle each hotel's API format. In an MCP-based architecture, an agent can discover and access capabilities through an MCP-compatible interface while backend integration logic is managed by the server or connector layer.

Remember: MCP does not eliminate API calls. It is an approach to standardizing integrations, improving reuse, and reducing the integration burden placed on individual agents.

## 16. Assistant-Added Practical Notes

> This section adds implementation guidance beyond the uploaded transcript.

- In production, explicitly design authentication, authorization, secrets management, input validation, audit logs, rate limiting, and monitoring.
- Tool descriptions should be clear, specific, and bounded; ambiguous descriptions can cause an agent to select the wrong capability.
- Consider explicit user confirmation or policy checks for destructive or high-impact actions such as payments, booking confirmations, data deletion, or refunds.
- Document expected input/output schemas, error states, timeouts, and retry behavior for every tool.
- Roll out shared-server changes with versioning and tests because one change can affect multiple agents.
- Decide whether MCP is appropriate by comparing consumer count, tool diversity, security boundaries, latency, operating cost, and maintainability.

## Appendix A — Complete Original Transcript

The uploaded source transcript is preserved below. Its line breaks are retained; the original wording has intentionally not been rewritten.

```text
Introduction to Agentic AI and MCP
Hi, this is Wenut. We just turned into
wanker ready classes. This video is part
of a series. Complete the previous
videos in this playlist [music] before
you start this video. The complete
playlist information, the material and
the code file information is given in
[music] the video description below.
Understanding Model Context Protocol (MCP)
Welcome to our new topic within the
space of agentic AI system. this
particular concept MCP it is gaining a
lot of traction. Let us try to
understand what is MCP and then we will
try to see MCPS are a kind of fancy way
of wrapping up all your tools. You can
call simply it as a wrapper to easily
understand it. All your APIs, all your
tools if you wrap them and if you keep
it as a middle layer between your AI
agent, you have your AI agent and then
usually AI agent interacts with multiple
tools. Now in between comes MCP to make
it much more simpler, easier or mostly
systematic. That is the most important
aspect of MCP. We're going to see all
the details of that. We will try to see
some pseudo code and MCP workflow and
then we will see a couple of examples of
MCP. It's going to be very exciting.
It's going to be like uh we will feel
like we almost have the superpower and
everything is working so smoothly. So
The Need for MCP in Enterprise AI
let's understand what is MCP. Before
even we go to the understanding of MCP,
I'll try to give you an intuition.
Instead of directly explaining you this
is explaining it to you that this is
MCP. What I would like to do is maybe
I'll try to see what exactly is the
need. So model MCP stands for model
context protocol. This MCP has been
introduced by claude team for the first
time. So the entropic team in their own
words what they say about MCP is MCP is
model context protocol. Context is the
keyword here even the protocol. So what
exactly is this context that we are
talking about? We will get an idea by
the end of this session. What exactly is
the protocol that we are talking about?
What they're saying is MCP is an open
protocol that standardizes how
applications provide context to LLM. We
will get an idea on this. As of now this
sentence may not make any sense to us.
Basically here it tries to say that MCP
helps our LLM and AI agents to interact
with the tools in an easy manner or in a
standardized manner. It's a standardized
protocol. And they're saying think of
MCP like a USB C port for AI
applications. Just like USBC port
provides standardized way to connect to
your devices various peripherals uh
access cities. MCP provides a
standardized way to connect AI models to
different data sources and different
tools. As of now I agree that it may not
add a lot of sense to us. The whole
session is about understanding what
exactly they are trying to tell us. Here
we will see a couple of examples, couple
of analysis, couple of pseudo codes,
couple of workflows to understand what
exactly this MCP is all about.
If you ask me right now a lot of people
who are working on agent AI, what they
are looking at is mostly adding very
simple features on desktop apps uh like
uh you know making
an event in calendar or triggering Gmail
or building a simple Telegram or
WhatsApp bot. So right now a lot of
people who are working on AI agents I
have seen people are building simple AI
agents but still they are working
effectively they can do maybe a small
task or a medium-sized task but if you
take this to a level where if you are
building AI agents at an enterprise
level companies like Oracle companies
like IBM when they are entering the
picture the real potential lies in the
broader professional enterprise level
vision. So these companies they are not
going to build AI agents which will help
as personal assistance for somebody to
update their calendar for somebody to
send an automatic reply to Gmail. I
don't think these companies are focusing
on these type of AI agentic AI task when
they are building when big companies
like IBM are building agentic AI
systems. Definitely they must be doing
something very big for their clients.
When it comes to that level I want you
to come out of the regular agentic AI
system examples that we build. If you
come out of them, if you look at the
enterprise level agentic AI
applications, then there is a huge scope
for standardizing everything. You cannot
interact with APIs in their own uh
specialized or in their own customized
way. Right now MCP is in very early
stage. If everybody adopts MCP, MCP is
like a standardized protocol that
everybody must follow. That means IBM
will create one MCP server, one M one
set of rules, then everybody must follow
within that company or Oracle creates
one MCP server in that all the tools
will be included. Everybody must follow
them. Right now nobody is following any
of the rules or there is no standard
protocol. I have an agentic AI system
that will call the tool one in my own
way, tool two in my own way, tool three
in my own way. I'm calling these tool
one, tool two, tool three. And then the
same company if the other team is there
they are also calling tool one tool two
tool three again they are writing lots
and lots of repetitive code what if we
standardize all of these all these tools
we will keep an MCP server that will
interact with the tools and everybody
has to interact with MCP server how do
we do it so basically if you are looking
at a very big organization if they want
to standardize this whole agentic AI
system how it interacts with the tools
that is where MCP comes into the picture
I haven't explained you what is MCP we
are going to get that clarity very soon
but only thing that I is if MCP comes
into the picture when you are building
very large agentic AI systems that are
interacting with n number of tools.
Intuition Behind MCP: The Hotel Booking Analogy
Now let me give you the actual intuition
behind MCP because I have used the term
MCP multiple times but by now you might
not have got real clarity what exactly
is MCP. Now let's start from zero. I
don't know what is MCP. What exactly is
the need of MCP? When does it come into
the picture? Now imagine you want to
book a hotel through aggregator apps or
the platforms like let's say make my
trip. In make my trip I want to book
flights or I can book hotels as well. So
let's say I go to make my trip and I
want to book a hotel. So I will go here.
I will go to the website. I'll click on
hotels. Let's say I will write let's say
I want to book a hotel in Bangalore.
Anywhere in Bangalore. Okay. These are
my dates that I want to book the hotel
for. And then once I select these two
dates, I would say one room for two
world. I'll search for it. Now make my
trip is giving me various options. So it
is giving me option for JW Marriott. It
is giving me option for ITC. It is
giving me option for Taj Bangalore,
Risen Blue etc. Palm Meadows. It is
giving me multiple options. Now make my
trip. They themselves do not have any
hotel. They are connected to multiple
hotels. from that hotel they are getting
the information whether the rooms are
available or not. If the rooms are
available, what is that Arif per night?
That is information make my trip is
trying to get from these hotels.
Now how does this website communicate
with different different hotels? Right
now I have let's say Leela Palace is one
of the hotel, Royal Arcade is another
hotel. Now how do you think make my trip
communicates with Leela Palace and gets
that okay per night the room whatever
that we are looking for is costing us
this much. How does this make my trip
communicate with Royal Arcade and get
this price that per night this is a
room. How can we fetch the hotel
availability followed by booking?
Different hotels may have different
websites. Definitely if I go to Lela's
website, the website architecture is
different. The website structure is
different. Maybe the pages are
different. Royal arcade will have their
own website. So, make my trip is not
going to scrape the websites and get us
the information. So, it's not going to
do web scraping. Then how can we get
this information? How do you think make
my trip is getting this information from
different hotels? They are using APIs.
What is an API? application programming
interface where each of these hotels
will give their own API. They this make
my trip website will have access to
these hotels APIs.
So these hotels at their own will and
wish happily they will share their part
of the database details with these uh
aggregator websites like make my trip or
go ibo. So these websites aggregated
websites apps they will hit that website
or they will hit the database of uh
Leela they will hit the database of
royal arit through API get the
particular information that they are
looking for right now make my trip let's
call it as MMD make my trip wants to get
the information from Leila Palace about
the room price it will hit the website
by using the API
and then get back the price it will also
hit the website of Royal Arcade by using
the API provided by Royal Arcade and get
the price. So that is the standard
protocol that now everybody is
following. Now there is a small glitch
in this or there is a small problem.
What is the problem? If you see the
Leela Palace Bangalore API, the way it
works is there will be a base URL. Then
there is an option to get available
rooms. Then the response sent by the
Leela Palace API. This will be the
response. Leela Palace sends that room
ID is this one. Type is delux. Price per
night is this much. Currency is this
one. Amenities are these. Now the same
format. There is no rule that royal
arcade also has to follow exactly the
same API format. The API is not set by
the aggregator. That API is set by the
hotel itself. So this hotel lia pal has
told that we will give you the
information in this particular format.
Now royal architect says that we will
give you the information in this
particular format. On the face of it
they look same but here first room ID is
given but here number of rooms are
given. Later room type is given but here
in this API room price is given. The
third element is room type. Here it is
price per night and then here it is
named as amenities. Here it says
includes these. Now this particular
website make my trip when it is
interacting with multiple hotels they
have no other option but to maintain
different different APIs. They have to
hardcode how Rison Blue is giving their
API accordingly they have to write the
code and get this information. How Palm
Meadows is giving their API and then
write it write the code get this
information. And so right now this
website if it is handling thousand
hotels it has to handle thousand APIs no
matter which format they are in the it
is a responsibility of make my trip to
normalize that data and then fill their
internal databases. Now that is going to
be a hectic task and by chance if any of
these hotels change their API later on
if they update their API again make my
trip they have to update that particular
API which is connecting and then they
have to fill their databases.
Challenges with APIs and Tools for AI Agents
Now until now we discussed about APIs.
Let's say if there's an aggregator like
make my trip, if it want to interact
with multiple hotels, it has to use
APIs. Now if you want to keep all of
this in an AI agent. Now what we do is
if we want an AI agent to book this
hotel, we would ask the tool to pick
this hotel. So inside a tool we will
keep Lila Palace. Inside another tool we
will keep Royal Arct. So what we do is
agents use tools. our AI agent. If I
want an AI agent to book my hotel, an AI
agent to check whether this hotel is
available or not. AI agent, what are the
two main sources? It will have LLM that
is thinking ability. AI agent will take
the request from the user. The user will
give the request in a usual natural
language text. Here in make my trip, the
user has to select particular fields or
he has to fill a particular form. But
when you are using AI agent, how does it
work? The user will say that you know
what I'm going to Bangalore. I want to
book a hotel and that is for 2 days from
this day to this day. So that is what
the user will say that will be the
prompt or the input. Now that will be
understood by large language model. The
large language model will understand
this and interpret it. After that it
will tell the AI agent that you know
what the user wants to book a hotel or
he want to check the availability. Then
the AI agent will take the help of the
tools. A agent will say any of the tools
do you have hotel booking capability? Do
you have the capability to check the
total availability? So what we do is
whatever is this API we just wrap it
under tool. Tool one is for liabalis.
Tool two is for royal arcade. Like that
the problem that we have with APIs how
MMT make my trip has to handle different
APIs different formats. The same problem
AI agent will also have when it is
interacting with multiple different
types of tools. That means every API has
their own structure. Now we have to
create a standard protocol or we have to
somehow normalize it. So the problem
with the tools, what is the first
problem with the tools? Not all tools
have the same structure. All tools may
not follow the standard protocol. There
are thousands and thousands of tools.
Even then this is somewhat better. Tool
one is also talking about hotel booking.
Tool two is also talking about hotel
booking only. Yes, there is a small
difference in the uh API link URL. There
is a small difference in the get back
URL. The rest API. There is some
difference in the API. But still this is
also for checking the hotel
availability. This is also for checking
the hotel availability. But you know
what AI agent an AI agent it doesn't
only check the hotel availability it
will use LLM it will use multiple tools
when I say tools AI agent will not only
use the tool of hotel availability agent
maybe this is a travel planner agent
this travel planner agent will get the
information on weather this will get the
information on flight booking it'll get
the information on hotel checking it'll
get the information on uh let's say
restaurant booking cab booking it'll get
hell lot of information it'll be this AI
agent will be interacting with multiple
tools. Now for one task if we have
multiple tools and handling all these
tools it is going to be a havoc for AI
agent there will be a lot of hard coding
for every API we have to write lots and
lots of code and it will be a lot of
repetition in that so each API has its
own structure each API has its own error
handling I'm just talking about the
structure there are other aspects as
well each API has its own authentication
method each API has its own rate limits
now tool one does the weather handling a
weather checking task tool two Flight
checking tool three flight booking tool
four port hotel checking tool five hotel
booking tool six restaurant booking cab
booking there are different different
tools available now when you have these
many tools how do you think an AI agent
can handle all these tools without
repetition that is the first thing the
second thing is there are too many
things that we need to handle for each
of these tools and I don't want to waste
my AI agent in getting lost within this
whole tool tools organization or
structuring these tools because it has a
broader task of whatever the user has
given. We want to focus on that. We
don't want to take the headache of
orchestrating all these tools. We want
to take this outside.
Why a Standard Protocol (MCP) is Needed
That is why there is a need for a
standard protocol. Writing custom codes
for all these tools is a hell lot of a
job. It is going to be very tedious
especially I'm talking about an
enterprise level. If you are building a
very complex agentic AI system that
interacts let's say with 200 tools or
maybe more than 200 tools and if there
is lot of repetition it and if there is
lot of error handling a lot of
authentication methods rate limits etc
we have to handle them or maybe if you
are building if you are building one AI
agent agentic system that is handling
200 tools and such agentic AI systems if
you're building let's say thousand of
such agentic AI systems I'm talking
about agentic AI system. Let's say if
you take one company like Oracle, they
have thousand clients and for each
client they are building different
different type of agentic AI systems and
each one of them is so complex. Each one
of them again uses 200 tools each. There
is going to be hell lot of repression.
It's going to create a lot of confusion
as well. What if API is updated? Let's
say you created one agent system which
is using 200 tools. Out of these 200
tools, there are five tools where this
API structure has been updated. What if
the schema of API is slightly changed?
Then this whole agentic AI system may
fail if those tools are very much
critical in its workflow. Can we create
a standard protocol that can provide the
context to AI agent? Providing the
context is nothing but if you want to
book the hotel, one tool one come and
say that I'm the tool that will book the
hotels. If the user says that I want to
check the flights, one tool will come
and say that I'm the AI I'm the tool
that can check the flights and one of
the tool can be booking the flights. Can
we create a standard protocol that can
provide the context to AI agent to
choose the tool? So there are two simple
MCP as a Universal Connector and Middleware
ways to look at this. Even though MCP is
a very big deal right now, a simplest
way to look at this is earlier agent
used to directly interact with the tool.
Now MCP comes into the picture. Some
people say MCP is just a fancy wrapper
around the tools and I agree with it.
MCB is simply a fancy wrapper around the
tools that will make your overall
interaction with the tools. AI agent if
it interacts if it wants to interact
with the tools. Earlier it was doing
direct interaction. Now MCP will create
a standard protocol so that you can
build enterprise level applications
without any hassle.
Let's get into more details. We will get
into more analogies to understand this.
As of now, MCP stands for model context
protocol. It is like a universal
connector for AI agents or tools.
Instead of AI agent learning the tools
APIs, it learns MCP format once. Now
that is the most important aspect. AI
agent doesn't interact with your tools
or APIs anymore. It just learns the MCP
format once and it can use any MCP
compliant tool. We're going to see what
exactly it means. Your AI agent, it'll
be connected to MCP. Now if there is any
update in the tool we don't care because
MCP internally it'll take care of it.
Still we have to handle all this. Still
we have to do all of this. The work will
not be reduced but it will be
standardized. That means there is a very
high chance that your AI agent may not
break in between. MCP is essentially a
middle layer. You can think of it like a
middleware that sits between your raw
APIs and AI agents. Here I'm using these
two things interchangeably. raw APIs and
tools because if you are building a tool
within that you just put your API you
just wrap your API you decorate it using
the tool so when I say tool or API
almost like I'm trying to use them
interchangeably so without a MCP the AI
agent takes directly or it talks
directly to each hotel each flight
booking other APIs it must handle
different formats authentication errors
by itself AI agent now with MCP AI
agents talks to only MCP server the MCP
server takes all those it it indeed
talks to all these APIs normalize the
data handles the limits returns the
standard format back to the AI agent. So
without MCP AI agent talking to the
tools with MCP AI agent talking to MCP
server MCP server handles all this. So
if there's any problem MCP server has to
take care of it or we have to fix it
once in MCP server and once you create
this MCP server it's not just one AI
agent you can use multiple AI agents
talking to MCP server earlier this was
not possible once you create one MCP
server this is agent one this is agent 2
this is agent three agent four agent
five earlier if there is anything wrong
all these agents used to break but now
if there is anything wrong you just fix
that MCP server all these AI agents can
use the single MCP server that's why
it's called server
AI agent discovers tools instead of
being hard-coded APIs. It discovers
tools instead of being hardcoded APIs.
It discovers tools via MCP server.
Integration logic lives in the MCP
server. I'm not saying that we are
getting away from the integration. I'm
not saying that we are getting away from
API calling. Still whatever was the pain
point that was there. But right now what
we are doing is we are standardizing
this so that our repetitive work will
get reduced. You write once. Now this is
the most important point. You write
once, use it everywhere. One MCP server
works for almost all the AI agents
inside your company. Imagine a very big
company like Oracle or IBM. They have
written one MCP server. Everybody within
IBM must be using that one MCP server.
How much of the work will be reduced?
Otherwise thousands and thousands of
teams that are creating thousands and
thousands of agents. They were
interacting with the APIs individually.
Tools are discoverable, pluggable and
reusable. These tools are pluggable to
this MCP server. MCP server is a fancy
wrapper around the APIs.
So let us see some pseudo code. How does
this MCP server works?
Continue with the next video in the
playlist. We are covering everything
step by step. If you have any questions
or the comments, please post them in the
comments window below.

```
