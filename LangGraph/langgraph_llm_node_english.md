# LangGraph LLM Node — State, OpenAI Integration, and Chatbot UI (English)

> **Source preservation:** These notes reorganize the lesson transcript. The complete supplied transcript is included in Appendix A without intentional edits. Additional implementation and safety notes are clearly separated.

## 1. Lesson Overview

This lesson adds an **LLM node** to a simple LangGraph graph. Earlier examples used nodes and edges; now a user question is sent to an LLM, the answer is stored in state, and the result is returned to the user.

Planned progression:
1. A simple LLM node
2. A chatbot interface
3. Adding tools to create an AI agent
4. Multiple tools/agents and complex workflows

## 2. Prerequisites and Packages

The instructor says the course environment already has the required packages installed. The discussion mentions `langchain-community`, `langchain-openai`, LangGraph, LangChain Core, and Gradio.

- OpenAI models require the appropriate integration package and an API key.
- Other model providers may require their corresponding integration packages.
- Pin and verify package versions for the project environment.

**Cost note:** The transcript mentions API-key billing, but a fixed dollar amount should not be treated as a universal requirement. Provider pricing and account requirements can change.

## 3. API Key Configuration

The lesson demonstrates loading a key from an environment variable or Google Colab Secrets/User Data. It also mentions putting the key directly in code as a simpler alternative.

**Recommended approach:** Do not hard-code API keys in notebooks or source code. Use environment variables or a secret manager/Colab Secrets, avoid exposing keys in logs or repositories, and rotate any key that has been leaked.

## 4. First Test: Call the LLM Directly

Before building the graph, the instructor invokes the LLM directly to verify that the configuration works. The transcript’s example asks about a personal-finance “FIRE number.”

Purpose:
- Verify API/package configuration
- Receive an LLM response
- Move the same model call into a LangGraph node

Deprecation warnings may appear. Identify which API or package produced a warning before deciding how to address it.

## 5. Define State

The lesson defines a state structure with two string fields:

| Field | Type | Meaning |
|---|---|---|
| `user_question` | `str` | The user's question |
| `llm_answer` / `answer` | `str` | The LLM response |

The speech-to-text transcript is not entirely consistent about the answer-field name. Use one field name consistently in your implementation.

The sample state contains a question and an initially blank answer. This state is passed as input when invoking the graph.

## 6. LLM Node Function

The LLM node is a function that receives state.

Conceptual steps:
1. Read `user_question` from state.
2. Send the question to the LLM using `invoke(...)`.
3. Receive the model response.
4. Store the response in the answer field.
5. Return the updated state.

The node sends the question to the model and places the answer in workflow state.

## 7. Build, Compile, and Invoke the Graph

The simple graph in the lesson is:

`START → llm_node → END`

High-level sequence:
1. Define the state schema.
2. Write the LLM node function.
3. Create a `StateGraph`.
4. Register the LLM node with `add_node(...)`.
5. Add edges from `START` to the LLM node and from the LLM node to `END`.
6. Compile the graph.
7. Pass a sample state to `invoke(...)`.
8. Inspect the answer in the returned state.

The transcript also discusses importing `START`/`END` and alternate graph-visualization methods. If direct graph rendering does not work in the environment, it mentions `IPython.display` and Mermaid PNG rendering as an alternative.

## 8. Test Multiple Questions

The instructor invokes the graph with different sample states, including:
- “What is ikigai?”
- “How do I start a presentation?”

Each call supplies the question in state and receives the LLM response in the output state.

## 9. Gradio Chat Interface

The lesson uses Gradio's `ChatInterface` to create a simple UI.

General flow:
1. The user types a message in the chat box.
2. Gradio passes the message and history to the chatbot function.
3. The function creates input state (`user_question` = message; answer initially blank).
4. It invokes the LangGraph app.
5. It extracts the answer from the result.
6. Gradio displays the answer in the UI.

The transcript demonstrates the `gr.ChatInterface(...)` and `demo.launch()` pattern. Verify the exact function signature against the installed Gradio version.

**Scope note:** The transcript mentions receiving history, but does not show a complete implementation that includes history in the state or prompt. Do not assume this simple function provides full multi-turn memory.

## 10. LLM Node vs. AI Agent

The lesson's key distinction is:

- **LLM node:** Sends a user question to an LLM and returns an answer.
- **AI agent (the lesson's simplified definition):** Uses LLM reasoning together with tools to perform tasks.

If a user asks for the latest stock price or today's gold price and the system has no web/search or market-data tool, the model does not have reliable live-data access. A standalone LLM node does not guarantee real-time retrieval.

## 11. Quick Revision

- Store question and answer fields in state.
- The LLM node reads the question and invokes the model.
- The response is stored in the answer field.
- Graph: `START → llm_node → END`.
- `compile()` creates an executable graph; `invoke()` runs it with input state.
- Gradio `ChatInterface` can provide a basic UI.
- Without tool integration and routing, this is a simple LLM workflow, not a full tool-using agent.

## 12. No-Skip Checklist

- [ ] Purpose of an LLM node and learning roadmap
- [ ] Package prerequisites
- [ ] OpenAI API-key setup and secrets
- [ ] Direct LLM test and FIRE-number example
- [ ] State schema and question/answer fields
- [ ] LLM node function and `invoke(...)`
- [ ] `StateGraph`, `START`, `END`, and compilation
- [ ] Graph-visualization alternatives mentioned in the transcript
- [ ] Multiple sample questions/states
- [ ] Gradio chatbot function and UI flow
- [ ] Difference between an LLM node and an AI agent
- [ ] Live-data/tool example
- [ ] Complete original transcript in Appendix A

## 13. Additional Points Added — Implementation and Safety

- Keep API keys in secrets/environment variables; never commit them to source control.
- Validate input length and handle provider timeouts, rate limits, and API errors.
- Treat model output as untrusted until validated for the application.
- If conversation history is required, explicitly pass and manage it; a UI history parameter alone does not guarantee the LLM uses it.
- Do not rely on an LLM alone for live prices, medical facts, or other time-sensitive information; connect verified tools/data sources when needed.
- Pin dependencies and verify current provider/Gradio APIs because package interfaces can change.

## Appendix A — Original Source (Preserved Verbatim)

```text
Introduction to LLM Nodes
This video is part of a series. Complete
the previous videos [music] in this
playlist before you start this video.
The complete playlist information, the
material and the code file information
is given in the video description below.
The next topic is adding an LLM node
inside the graph. Until now we have seen
simple graphs with nodes and edges. We
haven't yet started agentic AI behavior.
For us to build an AI agent, we have to
work with LLM. Now, we will see how to
add LLM node inside the graph. Later on,
we are going to get into building a
chatbot, adding tools and LLM, making an
agent, and then adding multiple tools
and creating multiple agents or complex
workflows. As of now, we will create a
very simple graph where we have the
start node and then it'll be connected
to an LLM node. The output of that LLM,
we will be uh showing it to the user.
Then there will be an end node. So, how
we work with LLMs? First we have to
define LLMs and then we'll be able to
create this LLM node. Let's see an
example. It sounds pretty
straightforward. Let's go back to our
code file. So the section that I'm
working here is example 3 LLM node. So I
will add some blank code cells.
Prerequisites and Package Installation
If you are talking about LLMs, you must
install the packages. The first package
that we have to install. We already have
installed all the required packages in
the beginning itself. If you go to the
packages required here, I have included
everything lang chain community,
langraph, langchain core, lang chain
openai, everything that is needed for
this whole course, I have already
installed all those packages. But for
the sake of discussion, I'm saying that
you have to install lang chain community
and lang chain openai. If you are using
OpenAI or LChain Coher or Gemini, any of
the LLM package that you are using, I
generally suggest you to get an OpenAI
API key first. You may have to pay some
$10 for you to get that open AI key and
it's all worth it. You may have to
install these packages. Once you have
successfully installed these two
packages, let me keep them as it is.
Once you have installed them, then you
can go ahead and use these LLMs from
langchain classic from lang chain.
Openai or you can also say
langchain_classic
llm import. There are multiple ways to
import. You can as of now I'll show
openai. Later on we will also work with
chat open AAI and you can also import co
here if you want but as of now we will
just leave it with openAI and if you are
Configuring OpenAI API Keys
working with open AAI you have to get
your openAI API key. So import OS and
then I would say from Google Collab
environment user data. So I have already
saved my key inside this OpenAI API key
is already saved in my environment. So
that I will just give it os.environment
environment open a API key get it from
my keys or the secrets or if you want to
make it simple you don't need to do
anything you simply put your key here so
let me write that separately you can say
either this one or if you want to do it
in a simple manner you simply say
instead of doing all this you will
simply say your key
but this anyway you might have done it
multiple times we will just get this key
everything is fine now just to check
whether everything is working fine or
not I will say my llm is open AAI and
the question is what is fire number in
personal finance so there's something
called fire number everyone must know
you have a different fire number I have
a different fire number what exactly is
the fire number that everyone must
calculate why is it important so let's
get an answer to that from LLM it says a
deprecation warning that is fine but it
should work and give us a result fire
number also known as financial
independence financial independence
retire early fire means financially
independent I can retire early number
refer to the amount amount of money that
needs to be saved or invested in order
to achieve financial independence to
retire early. It is calculated by
estimating the annual expense etc etc.
It has given the output. We don't really
care about that output. We have that LLM
working fine. Now we will try to do it
in lang graph manner. We will try to
Defining State in LangGraph
create an LLM node. We will try to
create a graph and then we will try to
give the input. We will try to invoke it
etc. So let's come back to the langraph
style from typing import type date.
Usually you don't need to do this again
and again but I'm doing it so that we
are kind of well versed with it. Uh from
langapgraph import state graph. Earlier
I used to import only state graph.
Slowly I have started introducing you
can get something called start node and
end node. They are actually predefined
internally. Earlier we used to say that
start from here or end from here. Set
this as start node set this as end node.
In fact you can get these environmental
variables or internal variables like
start and end node. Now as usual first
you have to create the state which is
very important. class you can give any
name I'm naming it as apt state it has
only two values it's a type user
question which is a string you and the
lm answer which is a string and if you
want to create a sample state sample
state is app state uh user question is
what is eager
is a blank so if I just try to print it
as it is I will get two values user
question is eag answer is blank and this
sample state we will give as input later
on once We build the number and this
question can be anything. This user
question you can put any question here
that you want to ask to any LLM later
on. Once you do that you add the node
state is done. Next thing is nodes. My
Building the LLM Node Function
node itself node is nothing but a
function lm node. It takes the state as
input and the state has to be exactly of
this structure app state. That means it
should have user question which is a
string answer which is a string. My llm
is openi. Earlier I have already defined
llm. You do not need to rewrite this
inside this function. No need. But
anyway to be on the safe side, I'm just
writing it here. Llm and then my result
is llm.invoke state user question. So
that means this invoke will ask this
question the whatever the user question
as of now in the state this is the user
question and fill the answer. So
whatever is the result that we will fill
it in answer. So what is uh guy that is
the question and the answer will be
filled by llm. The output is given as
state. Then if you want to see whether
this thing is working or not, you say
llm node and you can give the sample
state as a input. So I'm giving the
sample state as the input and you must
get the answer to that. This node is
working fine. User question is given
then the answer is given by lm. So I
just want to create one node here lm
node and then start and end node is what
we are going to give. So directly I will
give build the graph. Build the graph.
Constructing and Compiling the StateGraph
Now we will try to build this graph
slightly differently. We will try to use
a different style. We will use start and
end nodes. So first I would say my
workflow
is state graph app state that is a
structure that I want to have app state
that means it has question and answer
and then I'm adding an llm node. So this
is workflow add node lm node. So first
state graph and then nodes after that
edges. Now see the edges. The way that
I'm adding the edges is workflow. Add
edge start. So the beginning one you can
say start we have actually imported
start earlier. So start to lm node and
then lm node is connected to end. That's
it. And then once these edges are also
done then you will say workflow.app is
compile. And then if you simply say app
you will be able to see the output.
Start is not defined. If start is not
defined and would not have been defined
either. So I will need to import this.
After that only start and end will work
and the app diagram will be given. So
the start is that start and end lm node
is there. You will find a different set
of code instead of writing like this in
some of the ids. This direct app may not
work. If it is not working in that case
you can use from I python display
import image display and then app
whatever is this one get graph draw
mermaid png png that will work. Apart
from this you can directly give app as
well. If it is working well and good you
don't need to do this. So if for you if
directly writing app if it is working
fine otherwise you may have to use this
method
but anyway that is not that important
once you draw it start node llm node and
end node then we will invoke this I
would say my let me create some sample
states my sample state one
I will ask one question app state user
question is what is maybe sample state
two is how to start a presentation Right
now both the answers are blanks. Result
one is app.in invoke sample state one I
want to get the result result two sample
state two result two
so what is ikai the answer is given
Japanese concept roughly translate to a
reason for being and then how to start a
presentation start with a strong opening
line etc etc this is given that is how
you can invoke the graph maybe in fact
Creating a Chatbot Interface with Gradio
for fun what we can do is we can also
create a quick chat interface for from
gradio so you can install gradio this is
one of the easiest way to Check whether
your app or you can create a quick UI
for your app. Prip install gradio. We
have already installed it in the above
list. Somewhere it was mentioned as
gradio. It was already installed.
Otherwise you do p-p install gradio.
Then we will create a chat interface. So
instead of saying this app.in invoke
what what if everything happens in the
back end? It looks pretty good. Chat
interface with gradio.
Import gradio as here. define chatbot
and it takes the user message as the
input and then the history history
anyway we will be storing it someplace
now I'm taking input state as user
question whatever is a user message so
whatever user gives as input the
question so that will be the one that
we'll call it as user question and
answer is blank and this input state
will be passed on to our app app invoke
input state and what we want to give as
result is the answer so result From the
result there will be both the things
there will be user question as well as
answer and I just want to get the
answer. Now I will simply create the
gradio demo. My demo is equal to gr this
is gradio code gr. chat interface we
want to create. There is one more
interface I think gr.in interact or
something. So within gr there are two
options. The one that we have to take is
chat interface. The function is the
chatbot function which takes some input
and it gives some result. That's it. The
function should take input and output.
The input will be given in the chat
interface. Whatever the user enters that
will be taken as input given to chatbot
function and then the output will be
shown to the user. Title is optional. Uh
you can give any title. Once you say
demo.launch
user message will be taken by gradu as
input and given to this chatbot function
and the output will be displayed to the
user. So let's try to do this. It is
giving some warnings that is fine.
And this is the chat interface. Let me
minimize this so that we can see Lang
graph chatbot.
Whatever the name that we have given
that name will appear here. Let me make
it slightly readable.
I think you can see it here. You can
type anything here. If I say hello that
hello will be the user message that will
go to chatbot and the answer will be
given. Let me directly get into the
question. Let's say if I ask the
question like uh what are the benefits
of black coffee
or what are the ways
to
manage time? So what are the time
management? Give me some tips and
tricks.
Give me some tips.
So this has been given to the graph. So
here the graph app.invoke invoke
happened internally and then the output
answer is shown to the user to make uh
how are the ways to manage time or ways
to save time make a to-do list set
realistic goals prioritize your task
planner calendar etc etc all those
things can be even you can ask any
question here the question that you want
to ask uh your LLM or the graph you it
will gradu give you a user interface
sometimes that interface looks good to
interact so that is how we add an LLM
Understanding the Difference Between LLM Nodes and AI Agents
node so basically LLM node must contain
so when you are adding an LLM node that
means in your state somewhere you have a
question that you are passing it on to
LLM and somewhere you are storing that
particular answer given by the LLM node
or within that state the LLM answer you
are storing it in that state.
So that is the LLM node and I would say
this is still not agent because there
are no tools yet. For example, if I ask
a question, what is the stock price of
TCS
or what is the latest
stock price of TCS? There's no tool.
There's no internet. It will say as of
27th August 2021. So, this is not AI
agent. There is no agentic behavior at
this is just an LLM answering your
questions. What is the gold price today?
No, there is no agentic behavior yet
because there is no tool. I'm I'm an AI.
I do not have access to real-time
information. So, we haven't yet built
any AI agent. We have just created an
LLM node. So, we have discussed very
simple graph until now. A graph with
conditional ideas, a graph with LLM
node. But we haven't built an agent so
far. What is an AI agent? It is LLM
reasoning plus some tools. If you give a
tool then LLM will use this tool to give
your answer. Now that becomes agentic
behavior. So if you want to create an AI
agent in langraph you need to give the
tool. Not only lang graph any framework
if you want to create AI agent apart
from LLM apart from the brain apart from
thinking you must also give the tools.
Let us get into creating an AI agent in
Langraph.
continue with the next video in the
playlist. We are covering everything
step by step. If you have any questions
or the comments, please post them in the
comments window below.
```
