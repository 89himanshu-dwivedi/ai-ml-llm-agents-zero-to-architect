# LangGraph: Understanding AI Agentic Behavior — English Notes

> **Source-preservation note:** The material is organized into clear headings and revision-friendly sections. The complete source transcript is preserved in **Appendix A — Original Transcript (Verbatim)** without intentional edits. Speech-to-text errors and inconsistent spellings may appear in the source; they have not been silently corrected in the appendix.

## 1. Quick Summary

This lesson turns a basic LLM node into a tool-using AI agent. The example uses LangGraph, ChatOpenAI, and Tavily Search. The LLM decides whether to call a search tool or produce a final answer; tool results return to the LLM, which synthesizes the answer. Messages are accumulated in state using the `add_messages` reducer. The agent is invoked and tested through a Gradio interface. A fresh invocation does not automatically remember the previous question; memory management is the next topic.

## 2. LLM Node vs. AI Agent

### 2.1 An LLM alone is not agentic behavior
- An LLM generates text; the lesson describes it as a next-token/next-word generation engine.
- Without a tool, an LLM cannot reliably answer questions that require live external information, such as today's gold price.
- **LLM + tools + actions + external information + tool-selection decisions + answer synthesis** form the agentic workflow described in the lesson.

### 2.2 The basic agent cycle
1. The user submits a question.
2. The LLM decides whether a tool is needed.
3. If a tool is needed, the LLM produces a tool-call request.
4. The tool retrieves external information or performs an action.
5. The result returns to the LLM.
6. The LLM may call another tool or produce a final answer.
7. The workflow ends at `END`.

## 3. The Agentic Workflow Graph

Conceptual flow:

```text
START
  |
  v
LLM node ---- conditional decision ----> END
  |                 |
  |                 +------------------> Tools node
  |                                          |
  +<-----------------------------------------+
                  tool result
```

- `START` connects to the LLM node.
- A conditional edge from the LLM node routes execution to the tools node or `END`.
- The tools node sends its result back to the LLM node.
- The LLM may choose among multiple tools, such as search, calculator, Python, SQL, or RAG.
- The cycle may repeat; the LLM ends the workflow when it has enough information to answer.
- The transcript depicts conditional edges as dotted lines.

## 4. Setting Up Tavily Search

The lesson uses Tavily as an internet-search tool.

### 4.1 Main setup steps
- Install the required packages; the transcript mentions `pip install tavily` and `pip install langchain-openai`.
- Obtain a Tavily API key and configure it in the environment.
- Import `TavilySearchResults` and define the search tool.
- The example sets `max_results=3`.
- Smoke-test the tool directly with a question such as “What is the latest update on AI?”
- A direct Tavily test does not involve the LLM: the search engine returns results itself. In the agent workflow, the LLM is connected to the tool.

> **Terminology note:** The speech-to-text transcript includes variants such as “Tavly,” “Tablely,” and “Tably.” The commonly used library spelling is **Tavily**. Verify exact package and import names against the version installed in your environment.

## 5. ChatOpenAI and `bind_tools`

### 5.1 Chat model
The lesson uses `ChatOpenAI` for chatbot-style interactions and refers to the `langchain-openai` package.

### 5.2 What `bind_tools` does
- Put all available tools into a list.
- Use `llm.bind_tools(tools)` to expose the tools to the model.
- This enables the model to produce tool-call requests and select from the tools available to it.
- Example tools include Tavily/web search, Python, SQL, calculator, and RAG.
- Without this setup, you may need to implement manual routing logic based on the user's question.
- The lesson emphasizes LangGraph's structured workflow as useful for debugging and control.

**Important distinction:** `bind_tools` exposes tool definitions to the model. The graph's tools node and conditional routing are still needed to execute calls and route the workflow.

## 6. State and Message History

### 6.1 `AgentState`
The state is defined as a list of messages. Chat workflows may include:
- System messages
- Human/user messages
- AI/assistant messages
- Tool messages

### 6.2 `Annotated` and `add_messages`
- `Annotated` attaches metadata to a type declaration.
- The `add_messages` reducer is used to append/merge new messages with the existing message history.
- This approach can maintain the user message, AI tool-call message, tool result, and final AI response in the same state history.
- A simpler state containing only a question and answer can also work, but a message list is useful for multiple back-and-forth interactions.

### 6.3 Context and token limits
- Preserving prior messages gives the workflow conversation context.
- A very long history can eventually hit token/context limits.
- The transcript mentions summarization as a future strategy but uses the simple message-append approach in this lesson.

## 7. Defining Nodes

### 7.1 LLM node
- Receives `AgentState`.
- Passes the state messages to the tool-enabled LLM.
- Adds the LLM response to state and returns it.

### 7.2 Tools node
- The lesson uses LangGraph's prebuilt `ToolNode`.
- The available tool list is supplied to `ToolNode`.
- The tools node executes the requested tool and returns the tool result into the state/message flow.

> The transcript sometimes mixes “LangChain” and “LangGraph,” likely due to speech-to-text errors. In the context of graph nodes and conditional routing, the lesson is discussing LangGraph components.

## 8. Assembling the Graph

The sequence described in the transcript is:

1. Create `StateGraph(AgentState)`.
2. Add the LLM node.
3. Add the tools node.
4. Add the `START -> LLM node` edge.
5. Add conditional routing from the LLM node using `tools_condition`.
6. Add an edge from the tools node back to the LLM node.
7. Ensure the LLM node has a finish path to `END`.
8. Compile the graph into a runnable agent app.
9. Print/inspect the graph representation.

`tools_condition` is prebuilt routing logic: when the LLM response contains a tool call, it routes to the tools node; when no tool call is requested, the workflow can take the finish path.

## 9. Invoking and Debugging the Agent

- Pass user input in message format, for example with role `user` and the question as `content`.
- Example question: “What is the latest update on AI?”
- Execute the graph with `agent_app.invoke(...)`.
- Printing the entire result reveals intermediate messages as well.
- The example result includes a user message, an AI tool-call message, a tool message, and the final AI message.
- To get user-facing text, extract the last message from `result["messages"]` and read its `content`.
- If an error says something is “not defined,” check whether notebook cells/imports were executed in the right order. The transcript debugs a missed execution involving `llm_with_tools` and the tools node.

## 10. Gradio Chat UI

- The lesson imports Gradio and defines a chatbot function.
- The function receives the user's message, invokes the agent app, and returns the final AI response.
- A Gradio interface is given a title such as “LangGraph Agent Chatbot” and started with `launch()`.
- Example questions include recent war-related news and the latest gold-price news.
- The LLM summarizes/synthesizes search results for the user.
- For current information, it is useful to independently check freshness and source quality.

## 11. Memory: A Limitation of This Agent

The transcript asks the agent, “What was my previous question?” The agent cannot identify the previous question.

**Reason:** If each `agent_app.invoke(...)` call supplies only the current message and does not restore or persist conversation history, the context from a previous invocation is not automatically available.

- Tool use and memory are separate capabilities.
- The agent in this lesson can use tools, but it does not retain conversation memory across separate invocations.
- LangGraph memory management is introduced as the next topic.

## 12. Why Does LangGraph Use More Code?

According to the transcript, some frameworks can create a basic agent in fewer lines. LangGraph's graph-based structure can look more verbose, but it supports:
- Debugging
- Execution tracing
- Workflow control
- Expanding complex agents within a predictable structure

The core design point is that explicit structure at the beginning can help when building more complex workflows later.

## 13. Revision Table

| Concept | Key point |
|---|---|
| LLM node | Generates text; does not by itself execute external tools |
| Tool | A capability for an external action or data retrieval |
| `bind_tools` | Exposes tool definitions to the model |
| `ToolNode` | Graph node used to execute tool calls |
| `tools_condition` | Conditional routing based on tool calls |
| `AgentState` | Carries workflow messages/state |
| `add_messages` | Reducer used to append/merge message history |
| Tool loop | Tool result returns to the LLM |
| `END` | Workflow finishes when no further tool action is required |
| Memory | Past context across invocations requires history management/persistence |
| Gradio | Simple interactive UI for the agent |

## 14. Common Errors and Gotchas

1. **Missing/invalid API key:** Verify that the Tavily key is configured in the environment.
2. **Package/import mismatch:** Package names in a recording may differ from current installed versions; check version-compatible documentation.
3. **Cell execution order:** Ensure the cells defining `llm_with_tools`, state, nodes, and the tools node have been executed.
4. **Missing state reducer:** Correct state annotation/reducer setup is needed to accumulate message history.
5. **Mismatched tool lists:** `bind_tools` and `ToolNode` should use compatible tool definitions.
6. **Missing conditional route/edge:** Check LLM-to-tools conditional routing, tools-to-LLM return edge, and the finish path.
7. **Printing the wrong result:** The full result includes intermediate tool-call messages; inspect the final message content for the user-facing answer.
8. **Assuming memory exists:** A new invocation does not automatically remember the previous question unless history/persistence is implemented.
9. **Token growth:** Keeping every message increases context size; a summarization/trimming strategy may be needed.
10. **Treating search as unquestionable truth:** Evaluate search-result freshness, relevance, and credibility.

## 15. Additional Points Added — Separate from the Source

This section adds practical clarification for learning; it is not part of the original transcript.

### 15.1 Minimal mental model
- **LLM decides** whether to request a tool.
- **Graph routes** the request to the correct node.
- **Tool executes** the requested operation.
- **State carries** messages/results between nodes.
- **LLM synthesizes** the user-facing response.

### 15.2 Production considerations
- Do not hard-code API keys in source code; use environment variables or a secret manager.
- Treat tool output as untrusted external input. Instructions found inside a search page must not replace system/developer policy.
- Plan timeouts, retries, error handling, and logging for tool execution, API calls, and final responses.
- For user-facing answers about current events, include relevant sources/citations where possible.
- Define conversation memory explicitly: messages within the current request, session-level history, and long-term persistence are different things.
- LangGraph/LangChain APIs can change between versions. Verify the transcript's code details against the documentation for your installed versions.

### 15.3 Simplified pseudocode (conceptual, not verbatim source code)

```python
# Conceptual flow only
def llm_node(state):
    response = llm_with_tools.invoke(state["messages"])
    return {"messages": [response]}

tools_node = ToolNode(tools)

graph.add_node("llm", llm_node)
graph.add_node("tools", tools_node)
graph.add_edge(START, "llm")
graph.add_conditional_edges("llm", tools_condition)
graph.add_edge("tools", "llm")
# Conditional routing must also provide a finish path.
```

> This is illustrative pseudocode, not the transcript's exact runnable code. Check exact imports and API behavior against the installed LangGraph version.

## 16. No-Skip Checklist

- [ ] LLM-only behavior and the gold-price example
- [ ] Definition of agentic behavior: LLM + tools + actions
- [ ] START, LLM, Tools, conditional routing, and END graph
- [ ] Concept of multiple possible tools
- [ ] Tavily installation, API key, max-results setting, and direct tool test
- [ ] ChatOpenAI and `langchain-openai`
- [ ] Purpose of `bind_tools`
- [ ] `AgentState`, `Annotated`, and `add_messages` reducer
- [ ] Message roles and appending message history
- [ ] Token-limit concern and future summarization
- [ ] LLM node and prebuilt tools node
- [ ] `StateGraph`, edges, `tools_condition`, and tools-to-LLM return edge
- [ ] Printing/inspecting the graph
- [ ] `invoke` input structure and extracting final AI content
- [ ] Debugging missed cell execution/undefined variables
- [ ] Gradio UI and example questions
- [ ] Failure to recall the previous question
- [ ] Memory-less agent and next lesson on memory management
- [ ] Benefits of LangGraph structure for debugging, tracing, and control
- [ ] Full source transcript preserved in Appendix A

## 17. Board-Level Answer

**Question: How does a tool-using AI agent work in LangGraph?**

In LangGraph, create a `StateGraph` with an `AgentState`. Configure the LLM with tools using `bind_tools`. The user message reaches the LLM node. If the LLM requests a tool, `tools_condition` routes execution to the `ToolNode`. The tool executes and adds its result to the state/message flow, and the graph returns to the LLM node. The LLM interprets and summarizes the result; if another tool is needed, the loop repeats, otherwise the workflow finishes at `END`. The `add_messages` reducer helps preserve message history. However, tool binding alone does not provide persistent memory: history must be managed across invocations/sessions.

## Appendix A — Original Transcript (Verbatim)

The complete original text from the source file is preserved below. Its wording, spelling, repetitions, and speech-to-text artifacts have not been silently edited in this appendix.


```text
Understanding AI Agentic Behavior
This video is part of a series. Complete
the previous videos [music] in this
playlist before you start this video.
The complete playlist information, the
material and the code file information
is given in the video description below.
In the last section, we have seen what
is an LLM node and we have also seen
that if you ask any question that
requires a tool like internet searching,
the LLM node could not answer it. When
we asked what is the gold price today,
it says that it may vary. So this is not
an AI agent. There is no agentic AI
behavior yet. AI agent in Langraph or AI
agent in general, it's not just LLM
alone. LLM alone can generate text only.
It is just the next word generating
engine. This is not agentic behavior. It
becomes agentic behavior when you are
mixing LLM plus some tools. Then we will
take actions, gather the external
information. So an LLM node becomes an
AI agent when it is using tools when it
is taking some actions gathering some
external information making decisions on
what tool to use when and then
synthesizing the answer giving the
output then it becomes an AI agent that
looks like it is solving some problem
that is not really obvious next word or
next token generation. So let us see how
Designing the Agentic Workflow
to build an AI agent our first react
agent or in simple words I want to
create our first AI agent where I am
combining LLM plus search tool. We will
use tavly search tool and we will
combine uh we will connect the LLM node
to that tool. Then we will be sending
some questions and then we will get the
answers. Before we jump on to building
the AI agent, let me just draw the
sample architectural graph. How does
that look like in langraph? So we will
have the usual start node and this start
node is connected to LLM node.
Now LLM node may be connected to
multiple tool nodes. As of now we have
it connected to one tool. This is
connected to tool node. Now LLM asks a
question to the tool node or the user
will ask a question that will reach LLM
and LLM will send that question. It may
synthesize. It may modify that question.
It may modify that message. Send it to
the tool node and tool load indeed has
to send it back to LLM. Tool load will
send the information back to LLM again.
LLM may ask the tool node but this loop
cannot be infinite loop. Once the LLM
decides that oh you know what I have got
my final answer then LLM will end. So
this will going to be a conditional
edge. LM will decide that if I have to
so user has sent a question and do I
need to go to tool load next or do I
need to end this? That is what LLM will
decide. So this will be a conditional
node. So there will be a conditional uh
age. Sorry not conditional load there
will be a conditional age from LLM to
tool and end. This is how the overall
graph uh will look like. But we are
going to see that when we actually build
it.
The conditional edges are denoted with
dots. I think for a better
understanding, let us draw this once
again. So you will have your start node
start and that is connected to llm node
and that is conditionally connected to
either end node. when LLM decides that
you know what I don't need any
information from the tool I have the
answer final answer then that will be
given to end node end
you will be connecting that to tool node
so either LLM will go to either tool or
end so that is what it has to be dotted
connection but tool node will definitely
send back all the information to L node
that will be a kind of strict one in
fact LLM can connect to multiple tools
as well LLM depending on the user
question LLM can decide whether it has
to use calculator tool or internet
searching tool or rag tool It can use
any tool. Let's go back to the code file
and you must install Tavly. Tablely is a
engine that search engine that we will
be using in this exercise. So, pip
install Tavly. I'm assuming that you
have executed this whole package requ
whenever you are in doubt or whenever
you have logged off from the system and
you are coming back once again. Make
sure that you install all the packages
with this one execution otherwise every
now and then you will be missing one or
two packages. I don't want you to face
that. So execute this and then come to
example four where AI using agent using
external tools and when you are working
with tavly search engine you have to get
the tavly API key as well. So from
langchain community tools.tavly search
import tavly search results and then
from the tavly so I got my API key and
I'm just setting it up from my
environment. Now if you want to quickly
Setting Up Tools and Tavily Search
check whether these uh uh this tool is
working or not I will simply call it as
search tool or I can call it as tably
tool tably search results I'm taking max
results three and if I want to do a
quick testing
quick testing of the tool setup I would
say my result is uh what is the latest
update on AI if I just send that
probably it will take three results and
try to give me those three results there
is no llm here it will simply give me
three values is Google AI announcement
from March. It is taking this from
somewhere. So from the internet we are
getting some results that are directly
given by Tavly but we will not be
working with it in this manner. We have
to define LLM and then we will connect
the way that I have shown you all the
connections that we will be giving. So
for for this particular exercise or from
this particular exercise onwards I will
be using chat open AI instead of open AI
alone. I will use chat open AI that is
the one that I have seen most of the
people are using it. And for chatbot
kind of uh interactions for two and flow
interactions usually chat openai is
preferred. So pip install
langchain openai is what you need to do.
So anyway we have installed it so I'll
not do it again. from langchain chat
openai
from langchain earlier from langchain
classic I got import I imported openai
but now from langchen openai there are
multiple ways to import it but this is
one of the ways import chat openai and I
Configuring LLM with bind_tools
am defining lm as chat openai now there
is one extra step that you need to do so
earlier we have the search tool you can
write multiple tools here so keep all
the tools in one place and then you have
to use this function called bind tools
bind Bind tools works on LLM like chat
openai. It works on LLMs like Gemini
etc. So this bind tool function is a
very good utility function that is given
by langraph. This function helps the
agent to choose the right tool. Imagine
you have three or four tools. One is
search tool, one is python tool, one is
SQL tool, one is calculator tool, one is
rag tool. So when the user asks a
question which tool the LLM must pick.
So this particular bind tool function
will help us otherwise you may have to
write that logic by yourself. If the
user is asking this then you have to
pick that tool. Remember one of the
problem that we have faced in the
beginning the problems with lang chain
if you remember there the agentic
behavior was very wild. We wanted the
agent to pick SQL tool but it was
picking rag tool. We want the agent to
pick rag tool. It was picking web search
tool and we were not having that much
control. That problem has been solved by
langraph guys by using this bind tools.
Most often if there is no ambiguity in
the user question somehow LLM tends to
pick the right tool. So you must do if
you take regular LLM that is your
regular LLM as it is and you have to
create LLM with tools LLM.bind tools
you're exposing all your tools to LLM
and this this will be inside a node
later on. So this step is an extra step
but very useful even without this step
also somehow we can make it work but
bind tools is extremely useful. So you
must do that you define all the tools
inside a list and say llm.tbind tools.
So that is the second step. And then as
usual we will go to state. Let me write
down state nodes edges etc. But yeah
nodes and edges we will do it in the
graph. So let me create the state from
typing import type from langraph.graph
import state graph start and end. Now
I'm creating agent state. It's a type.
For the first time I'm creating
annotated list. annotated
list.
Managing State with Annotated Messages
So usually if you say type take that
means you have an option to mention what
type of uh information or what is the
type of the variable. So agent state
will have all the messages and list of
messages. But once you say annotated
list and then here you add something
called reducer function. There is a
reducer function called add messages. So
what this does is all the messages that
we are passing on since it is going to
be kind of chat bot since there will be
lot of two and fro messages in chat open
AI you have human message you have
system message you have AI message
usually system message is static one
message only but AI message followed by
human message first will be human and
then AI message then AI message then
human message like that there'll be
multiple messages that will be stacked
up and if you want to keep track of all
those messages then this is the best way
to use it. So if you are using AI agent
nodes and if [snorts] you are keeping
several messages then try to define your
AI agent state instead of earlier this
will also work not a problem you can say
that I have the user question I have the
answer from the AI agent this is fine
but if you experience or if you feel
that there will be multiple messages
that will be going to and fro it's
better to keep a list of all the
messages so if you say annotated list so
directly list also you can give so if
you say I just want to have a list of
messages that is fine but particularly
if you say annotated ated list. So you
will say annotated and what type of uh
structure that you want to give list and
this is called reducer function. Add
messages means you keep on stacking up
you keep on appending all the messages.
So this is called a reducer function.
The other type of reducer functions are
maybe instead of add messages you can
have a reducer function which says that
keep only the last one or if this
annotated if you are working with
numerical fields you can say maybe add
up all the values. Maybe you can say
reduce function is take only maximum
value. But as of now the reducer
function is you take the list of
messages and you keep on adding the
messages. You keep on appending the
messages so that I preserve the whole
context. So in my agent state what I
will be having I will be having system
message followed by human message
followed by AI message again followed by
human followed by AI followed by human
followed by AI. All the messages I will
have and that is the beauty of langraph
where you will have all the messages
passed on to all the nodes. there is
very less scope for confusion. There is
very less scope for hallucination.
So this is something that you must
understand. So instead of replacing the
old messages, we are keeping on adding
one by one one by one messages to our
state. Yes, obviously if you are adding
too many messages later on it may give
the tokens error later on. We can uh do
some kind of summarization but as of now
you go ahead with this approach. agent
state messages annotated list and keep
on adding the messages. Let us see
whether this is working or not.
Annotated is not defined yet.
So from where we will get annotated from
typing only you have typed date and then
you give annotated.
Add messages is not defined. From where
you will get add messages from langraph
graph dot messages.
So that is given by lang graph. So lang
graph.graph graph. I think there is
something called the
reducer or something here or directly
you can get add messages from langraph
dot graph dot message. You import add
messages then this will work perfectly.
So this is the agent state.
Let's go ahead with adding of the nodes.
So the first node is lm node. I would
say define llm node and it'll take the
state which is of the type agent state
as input and lm with tools invoke state
messages. So all the messages we are
giving as input and then whatever are
the result we will go to state messages
append the response to response. So
whatever messages that are there in the
state probably as of now you will have
system message and human message both of
them in fact system message also if you
leave it to default human message will
be given to LLM you will get the AI
message and you are just appending that
AI message to the state so that is what
you will get in return. So if you say
your LLM node you are using here LLM
with tools that means if a user is
asking a question that is supposed to
ask a particular tool it will be LLM
will be automatically choosing that
Building Nodes and Graph Architecture
right tool and there is something called
tools node that we have to define
in fact that tool node is automatically
given by lang chain pre-built so I will
say tools node so it'll take agent state
and you simply say return tools node
tool equal to all tools whatever all
tools you keep them in list and then you
just use tools node. So this is part of
lang chain pre-built. So from
lang graph sorry whenever I'm saying
lang automatically lang chain is coming
it's actually lang graph it's lang graph
lang graph pre-built tools node and
tools condition are given by default. So
tools node is the one where you just
need to say you connect my LLM node to
the tools node later on we are going to
connect them and this tool node once the
lm asks a question to the tool node the
tool node will give the answer to the
llm node so you simply put all your
tools in fact you don't really need to
write this function directly you can use
this tool node but uh to follow a
particular structure I thought it's
better to define node one node two node
one is lm node node two is tools node in
that tool node is a pre-built function
that is provided by langraph pre-built
when I say langraph or langin both of
them are developed by a same by the same
team only the Harrison chase he also has
recorded several courses you can also
follow his courses as well quite
interesting
now let's go ahead
with the next step which is building the
graph we have reached the graph
so I will say agent
workflow
so So we right now I started using this
uh word called agent right now because
first time we are connecting LLM to the
tool. So agent workflow state graph. So
let me write one by one line agent
workflow state graph. Agent state agent
state what is agent state? It is a list
of all the messages AI messages human
messages everything. So it is one hell
of a list that we will develop over the
time. So first I will add lm node. So
this is the workflow starting and then
uh we will say nodes the first node is
agent.workflow node lm node and then
tools is the tool node and then the
edges the first edges from start to lm
node. After that the next age that we
are going to add is going to be the
conditional age. Once you have the llm
node lm can go to either end or tool.
Initially it has to go to tool only but
you are supposed to add a conditional
age. LM will decide and then the tool
will send back the information to LLM
node. So that is what we are going to
do. Now we are going to add a
conditional edge add
conditional edges. So what is that
conditional edge that we are going to
add? It is between llm node and then the
tool condition. Tool condition you are
not writing this function automatically
langraph has given you that pre-built
function. This tool condition will
choose the tools. That means if you have
four tools then lm will tell that okay
user is asking about a calculation then
tools condition will pick the calculator
tool. If the user is asking about uh
current news then tool condition will
pick up tavly search tool. If the user
is asking about python then the python
tool will be picked. So all that you
need to do is you create this tools node
you add all the tools automatically
tools condition is the function that is
pre-built. Now that headache is taken
care by lang chain or lang graph team
and then you just need to give that
tools node. So the conditional age over
here is not really complex like the ones
that we have done earlier automatically.
the tools conditions and the tools if
you provide automatically it will be
taken care of and remember after adding
that conditional edge we need to add one
more edge what is that edge that we need
to add tools should be added back to LLM
once again so that no edge we have to
add so I would say agent
workflow
dot add an edge tools to be added to lm
node and then lm node is added to end.
So LLM node is connected to end. LLM
node is connected to tools condition. So
LM node will decide what is the right
tool for it to process and then tools
will send that information. For example,
user asks a question what is the
temperature today. Then the tools
condition will decide that okay he's
asking about temperature probably we
need internet searching. Then it'll do
the internet searching tool and then the
tools node whatever the information
today's temperature in the city that
you're talking about is this much. LM
node will finally synthesize the answer.
then it'll hit the end. So you may have
to go through this a couple of times to
understand this overall workflow.
Otherwise you can simply think that LLM
node is connected to tools and tools
conditions will decide which tool to
pick up and that tool will send back the
information to LLM node LLM node is
finally connected to and once LLM
decides that okay I have got the answer
I'm done and tested. So once this is
there it says that tools node is not
defined. That means have we executed
this tools node is defined. So here
tools node this is the tools node
somewhere we may have missed one
execution now everything is working fine
and as a good habit we generally tend to
say my agent
app simply if I want to print
agent app
start lm node connected to tools tools
connected back to lm lm node connected
to tools after two three iterations then
conditionally it may end as well. That
is the graph. Now if I want to invoke
Testing the Agent and Gradio Deployment
this my result. So first let me simply
write the question in the simplest
manner. So agent state is what I want to
take. So sample question sample question
is equal to
what is the latest update on AI. So I
would say app what is this app agent
app.invoke Invoke in messages as a list
of messages. So if you are working with
chat open AAI you have to give in this
particular structure role is user. So
user question the content. So you have
to give role is user the content is a
sample question and then you will get
the output from AI. So user AI system
user AI system. These are the three
types of messages. So I would say
messages and then list of messages
within that the role is user. The
content is sample question. What is the
latest update on AI? Then you will get
the result. from the result also we want
to get the a message that is why I'm
writing this first first let's print the
whole result then you will understand
that the whole result is not what we
wanted so llmc tools is not defined lm
with tools is not defined probably
somewhere
when we are calling llm with tools it is
failing it's good that we got an error
we will get a chance to debug this
so let's execute one by one by one all
of this I think we have missed this
execution let's go from the beginning.
Okay, it's good that we will get a
chance to debug it. So, first we have
defined our Tavly search tool. Uh we
have just imported it. We have created
the key search tool and then we have
tested it. That is working fine. And
then we have defined our LLM and then we
are binding the tools that is called LLM
with tools. I think this execution was
not done earlier. Now I have created the
agent state. I have created the nodes.
One is LLM node, the other one is tools
node and agentic workflow. LM node is
connected to tools and then end. And
then once I give this information my
message is role user. So as you can see
it is very easy to debug in general
compared to lang chain AI agents. Your
langraph AI agents are slightly easier
to debug but that only comes after
multiple trail and errors. You may have
to go through a steep learning curve.
That is true but at the end you will be
appreciating langraph for sure. You can
see there is a lot of information that
is given here in result. The actual
final output is uh I think and the final
output is the AI agent output which we
need to take. An easy way to take that
is within the result if you go to
messages within that if you take the
last message content
last means minus one index and if you
take the content from there
so you have the role role is user. So
let me I think let us see whether we can
do pretty print
import
where is uh pretty print
from print. So I just got that code form
print import pint
and then I say print result directly if
I print the result see whether we get
any better result. Yeah that is not that
bad. You have human message what is the
latest new on news on AI. Then you have
the AI message which is blank. That is
the original state. And then the tool
message it has given multiple options
the tool. So you can see that here AI
message is blank. After that the tool
message it would have given three
results and then LLM got that
information. The final AI message is
here are some of the latest updates on
AI. So 1 2 3 four messages in the result
because you keep on adding user message
followed by a message which is blank and
then followed by tool message followed
by AI message. This is what I'm
interested in. So I don't want to
directly print everything. I would like
to from the result and from the
messages. So let me use print again.
from the result from the messages the
last message content is what I'm
interested in if you try to print that
here are some of the latest updates on
AI Google AI announcements in March
techrunch AI news advancements in AI
machine learning this is what the result
is in fact you can create a grado app as
well gradio interface where you can see
these messages in a slightly better
manner so let us do that as well quickly
so that will give us a slightly better
feeling of calling this AI agent import
gradu as here. Define the chatbot user
message. Whatever the user is giving as
the user message in fact you can type
hint it user message has to be a string
or something otherwise you can leave it
as it is also and the history is what
you're going to give. My result equal to
app dot invoke messages ro user contain
whatever is a user question that is what
I'm going to give and return the output
the final output by the AI is what I
want to get. So I will say gradu chatbot
dot or chat interface
in fact I can say demo.launch or direct
launch is also fine. So grat
interface and then my function is equal
to chatbot title is langraph agent
chatbot not bad and then directly I
would say dotl
launch.
So here is the one for some reason this
gradual thing is quite large in my
system but let it be. So the name is
Langraph AI agent chatbot and this is
the place that I have. So what is the
news on war? What is the recent news on
war? Maybe does it have any impact on
stock market? I can have several
questions but let me just ask this
question. Can we get the answer from
radio?
Yes, there are some USIsrael war
war related stuff is given here. What is
the latest news on gold price?
It will it will give us the result.
Obviously, your tokens and all that that
also you have to keep track of. So, we
are slowly getting into this agent
intake behavior. We can see that LLM is
making a choice. LLM is doing the
summarization, synthesizing the answer
and giving you the answer by interacting
with Tavly search. So that is our first
Memory Management and Conclusion
AI agent using Langraph. Overall the
concept is simple but building inside
Langraph that is what takes some time.
But you know what? Let me just ask what
this question. What was my previous
question?
What was my previous question? I
couldn't find the information on
specific previous question. You know
what? Every time you are invoking this
agent app, every time when you invoke
obviously there will be no track of the
previous question. So this is an AI
agent without memory. So the next topic
obviously we have to discuss is an AI
agent with memory. Definitely lang
chain. We have seen there are ways to
manage the memory. Lang graph also they
have given beautiful ways to manage the
memory. So the next topic is memory
management.
We have just now created our first AI
agent. If you have observed it compared
to other agentic AI frameworks it is
much much difficult over here or it
takes a very large lines of code. If you
see other agent AI frameworks hardly you
can create an AI agent like this with
LLM node. You just connect it to a tool.
It may take one line, two line or hardly
three lines of code. But in langraph
hardly like we have written literally 20
plus lines of code. But there is a
reason why lang graph makes it so
difficult for us to create AI agents
because there is a particular structure
that we have to follow here. And that
structure is going to really help you
later on in debugging. This structure is
going to help you in tracing. This
structure will give you much more
control in future. That is why even if
you feel that we are doing somewhat
counterintuitively we are going
backwards that means we are writing more
code to create a simple agent. No that
is not the case here. We will be
creating very complex agents in future
there we want to have proper control
over debugging and tracing. That's the
reason why we are creating the graphs
instead of the regular procedural code.
I'll see you in the next session.
[music] Heat. Heat. N.
[music]
[music]

```
