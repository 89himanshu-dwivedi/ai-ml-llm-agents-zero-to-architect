# LangGraph Deep Dive — Introduction & Motivation (Hinglish Notes)

> **Source handling:** These are reorganized study notes based on the supplied lesson transcript. The complete original transcript is preserved verbatim in **Appendix A** at the end. Instructor claims about framework behavior are presented as claims made in the lesson, not as independently benchmarked guarantees.

## 1. Lesson Overview

Is video mein LangGraph Deep Dive series ka introduction diya gaya hai. Instructor batate hain ki course ke do parts hain aur future updates, packages, ya features ke basis par ek third part bhi add ho sakta hai.

Course ka learning style theory-only nahi hai. Concepts ko examples aur case studies ke through samjhaya jayega, aur complexity step by step badhegi. Transcript mein total 12 examples/case studies ka zikr hai.

## 2. Prerequisites

Course start karne se pehle in topics ke basics aane chahiye:

1. **Generative AI (GenAI)** — basic understanding.
2. **LLMs** — Large Language Models kya hote hain.
3. **RAG** — Retrieval-Augmented Generation ka basic idea.
4. **LangChain basics**, including:
   - Inputs and outputs
   - Memory management
   - Chains
   - LangChain agents
   - ReAct agents
   - Related code, functions, and terminology

Instructor ke mutabik LangChain ka expert hona zaroori nahi, lekin fundamentals clear hone chahiye, kyunki LangGraph padhte waqt LangChain-related terms ka reference aayega.

## 3. Course Structure and Topics

### Part 1 — Basics to Intermediate

Transcript mein Part 1 ke topics mein ye shamil hain:

- LangGraph ki motivation: is framework ki zaroorat kyun padi?
- Core components: **State, Nodes, Edges**
- Conditional edges
- LLM node add karna
- Simple agent banana
- Tools ke saath AI agents banana
- LangGraph agents mein tools integrate karna
- Memory manage karna
- RAG agent banana

Instructor ka kehna hai ki Part 1 ke baad learner ko LangGraph projects ko samajhne ka achha base milna chahiye.

### Part 2 — Intermediate to Advanced

Part 2 mein comparatively advanced concepts aur zyada complex case studies cover karne ka plan hai. Transcript future mein naye concepts ya end-to-end case studies add kiye jaane ki possibility bhi mention karta hai.

### Example-based learning

- Transcript ke mutabik course mein **12 examples/case studies** banaye gaye hain.
- Har example ke saath complexity gradually increase hoti hai.
- Examples different industries aur use cases se liye jaate hain.
- Instructor kehte hain ki pehle six examples se bhi LangGraph ka useful foundation mil sakta hai.

## 4. LangChain vs LangGraph — Lesson ka Main Motivation

### LangChain kya provide karta hai?

Lesson ke according, LangChain se LLM applications banane ke liye prompts/prompt templates, chains, tools, memory-related functions, retrieval, aur agents jaise building blocks milte hain.

### LangGraph kyun introduce kiya gaya?

Instructor complex agentic workflows mein control aur reliability ki challenges discuss karte hain. Lesson mein LangChain-based complex agents ke saath ye issues dikhaye gaye hain:

- Agent kabhi unexpected route choose kar sakta hai.
- Galat tool select ho sakta hai.
- Tool calls ka sequence expected flow se alag ho sakta hai.
- Agent loop mein phans sakta hai.
- Context length ya request-size errors aa sakte hain.
- Iteration limit ke kaaran agent ruk sakta hai.
- Debugging aur observability difficult ho sakti hai.
- Multiple tools ko combine karne wale questions par results inconsistent ho sakte hain.

**Important nuance:** Ye lesson ka comparison aur demonstration hai; ise har LangChain application ke liye universal rule ya guarantee na samjhein. Framework selection actual workflow, current versions, implementation, testing, and operational requirements par depend karta hai.

### Kab kaunsa approach?

| Use case | Lesson mein suggested direction |
|---|---|
| Simple chatbot | LangChain se kaam ho sakta hai |
| Simple RAG application | LangChain se kaam ho sakta hai |
| Prompt pipeline / sequential steps | LangChain useful ho sakta hai |
| Basic, relatively simple agent with limited tools | LangChain sufficient ho sakta hai |
| Branching and conditional routing | LangGraph useful |
| Loops and controlled retries | LangGraph useful |
| Persistent state / checkpointing | LangGraph useful |
| Human approval / human-in-the-loop | LangGraph useful |
| Workflow pause karke user input ke baad resume karna | LangGraph useful |
| Multiple agents or complex tool coordination | LangGraph useful |

Yeh table lesson ki framing ko summarize karta hai; actual implementation mein capabilities aur libraries overlap kar sakti hain.

## 5. LangGraph ka Core Idea: Workflow as a Graph

LangGraph mein workflow ko ek graph ke roop mein model kiya ja sakta hai, jisme nodes ko edges connect karti hain.

### 5.1 Nodes

Node workflow ka ek step ya component represent kar sakta hai—jaise input process karna, LLM call karna, tool run karna, data transform karna, ya decision lena.

General graph theory mein nodes ko **vertices** bhi kaha jaata hai.

### 5.2 Edges

Edges nodes ke beech connection ya transition represent karti hain. Ye batati hain ki workflow ek step se doosre step tak kaise move karega.

### 5.3 Conditional edges

Conditional edges ke through workflow condition ke basis par different paths choose kar sakta hai. Example: query SQL data maangti hai to database step par route karein; document-based answer chahiye to retrieval step par.

### 5.4 Linear vs non-linear workflow

- **Linear workflow:** Step 1 → Step 2 → Step 3 → final answer.
- **Non-linear workflow:** Condition ke basis par branching, loops, retries, alternative paths, pauses, aur resumption ho sakti hai.

Complex agentic systems mein har request ke liye ek hi fixed sequence kaafi nahi hota. Explicit routing workflow ko zyada inspectable aur controllable bana sakti hai.

## 6. State — Stateful Workflow ka Basic Idea

Lesson state ko ek central, evolving data structure ke roop mein introduce karta hai. Instructor shuruat mein ise dictionary jaisa samjhate hain jo workflow ki information hold karta hai.

- State graph ke nodes ke beech pass hoti hai.
- Nodes state ki information read kar sakte hain aur update kar sakte hain.
- Traditional sequential chains mein aksar output agle step ko pass hota hai; LangGraph-style workflows mein shared workflow state important role play karti hai.
- Transcript state ko ek major topic batata hai jise baad ke examples se detail mein samjhaya jayega.

**Simple analogy:** Ek project file samjho. Har workflow step us file ko read karta hai aur zaroorat ke mutabik naye results add karta hai. Agla step updated file ke saath kaam karta hai.

## 7. Graph Theory — General Examples

Transcript pehle general graph theory samjhata hai, phir LangGraph par apply karta hai.

### 7.1 Social networks

- Nodes logon ko represent kar sakte hain.
- Edges friendship ya connection represent kar sakti hain.
- Graph connections ko dekhna relational tables ke comparison mein kuch relationship questions ko samajhne mein convenient ho sakta hai.

### 7.2 City maps and routes

- Nodes cities, intersections, ya locations ho sakte hain.
- Edges roads ya routes ho sakti hain.
- Graphs ka use do locations ke beech possible routes aur shortest path analyze karne mein ho sakta hai.

### 7.3 Web pages

- Nodes web pages represent kar sakte hain.
- Edges links/navigation relationships represent kar sakti hain.
- Isse page connections aur network structure analyze kiye ja sakte hain.

### 7.4 Fraud patterns

Banking transactions ya relationships ko graph ke form mein dekhne se unusual connections ya patterns investigate karne mein help mil sakti hai. Graph khud fraud prove nahi karta; findings ko validate karna zaroori hai.

## 8. Traditional Agent Challenges Shown in the Lesson

Instructor ek healthcare multi-tool agent ka demo discuss karte hain. Agent ko chaar tools diye gaye hain:

1. **SQL tool** — database se records fetch karta hai.
2. **Python tool** — calculations ya data analysis karta hai.
3. **RAG tool** — documents se relevant information retrieve karta hai.
4. **Web search tool** — websites se additional information retrieve karta hai.

Lesson ke sample questions ko answer karne ke liye kabhi do ya teen tools ki zaroorat padti hai. Instructor ke demo mein kuch runs mein context-length errors, iteration-limit stops, unexpected tool routing, ya generic answers dikhaye gaye.

### Lesson mein mention kiye gaye errors / issues

- “Model has reached the maximum context length”
- “Request is too large”
- “Agent stopped due to iteration limit”
- Wrong tool selection / poor routing
- Tool sequence expected order mein na chalna
- Final answer generic ya insufficiently grounded hona
- Debugging / tracing difficult hona

Instructor ka proposed direction hai ki same kind of multi-tool example ko LangGraph mein rebuild karke explicit workflow control aur routing dikhayi jaaye. Transcript ke performance claims ko actual tests se validate karna chahiye; LangGraph use karna errors ko automatically eliminate karne ki guarantee nahi hai.

## 9. Healthcare Multi-Tool Example — Workflow

Lesson ka example ek healthcare assistant hai jo patient information aur clinical reference material ko combine karta hai.

1. User question receive karo.
2. SQL tool se relevant patient records retrieve karo.
3. Zaroorat ho to Python tool se calculation ya data analysis karo.
4. RAG tool se approved medical documents / guidelines mein relevant material retrieve karo.
5. Zaroorat ho to web search se additional source information retrieve karo.
6. Results ko combine karke response prepare karo.
7. Response mein sources, uncertainty, and limitations ko clear rakho.

**Safety note:** Is example ko educational prototype ya clinician-support workflow ke roop mein treat karo. Patient care ke decisions qualified clinicians, validated clinical rules, appropriate data governance, and approved sources ke under hone chahiye. Public web search ko bina validation ke clinical authority nahi maana jaana chahiye.

## 10. Practical Takeaways

- LangGraph seekhne se pehle GenAI, LLMs, RAG, aur LangChain basics revise karo.
- Nodes, edges, conditional routing, aur state ko achhe se samjho.
- Simple linear workflows aur complex branching workflows ka difference identify karo.
- Multi-tool agent banate waqt tool selection, state, error handling, tracing, and evaluation plan karo.
- Sirf successful example run karna enough nahi—multiple test cases, failure cases, and repeatability check karo.
- Framework ke baare mein broad claims ko apne use case aur current versions ke against verify karo.

## 11. Revision Summary

LangGraph Deep Dive course ka objective graph-based workflow orchestration ko examples ke through samjhana hai. Core ideas hain **nodes, edges, conditional routing, and state**. Lesson LangChain ko simpler LLM workflows ke liye aur LangGraph ko explicit branching, loops, retries, checkpointing, human-in-the-loop, and complex tool orchestration ke liye discuss karta hai. Course healthcare multi-tool agent ko ek motivating case study ke roop mein use karta hai.

## 12. No-Skip Checklist

- [ ] Course series introduction and two-part structure
- [ ] Future Part 3 possibility mentioned in transcript
- [ ] GenAI, LLMs, RAG, and LangChain prerequisites
- [ ] LangChain inputs/outputs, memory, chains, agents, ReAct agents
- [ ] Part 1 topics: motivation, state, nodes, edges, conditional edges, LLM nodes, agents, tools, memory, RAG
- [ ] Part 2 advanced concepts
- [ ] 12 examples/case studies and gradual complexity
- [ ] LangChain vs LangGraph motivation
- [ ] Linear vs non-linear workflows
- [ ] Branching, loops, retries, memory, human approval, checkpointing, resumability
- [ ] Graph, node/vertex, and edge definitions
- [ ] State as central evolving data / dictionary analogy
- [ ] Traditional-agent issues: loops, wrong tools, poor routing, debugging, observability
- [ ] Context length, request-size, and iteration-limit errors
- [ ] Healthcare agent with SQL, Python, RAG, and web search
- [ ] Graph theory examples: social network, city routes, web pages, fraud patterns
- [ ] Practical takeaways and safety caveats
- [ ] Complete original transcript preserved in Appendix A

## Appendix A — Original Source (Preserved Verbatim)

The full source transcript supplied by the user is included below without intentional edits.


```text

Search in video
Introduction to the LangGraph Deep Dive
This video is part of a series. Complete
the previous videos [music] in this
playlist before you start this video.
The complete playlist information, the
material and the code file information
is given in the video description below.
Welcome to this new series Langraph Deep
Dive. As of now, Langraph deep dive has
two parts part one and part two. In
future depending on the updates,
depending on the new packages and new
features we will be probably recording
another part as well part three. As of
now we have two parts the prerequisites
for this course you must know what is
gen at least the basics of it what are
LLMs what is a rag and you must know
lang chain framework lang chain and
langraph framework uh built by the same
lang chain team. So you must know what
is langchain framework because while we
are discussing lang graph there will be
a lot of reference to lang chain related
terms. I'm not saying that you should be
an expert in it but at least the basics
of lang chain lang chain input and
output memory management in lang chain
and then uh what are chains inside lang
chain how to build lang chain agents
react agent so such kind of uh code and
the functions related to lang chain you
must know. So this is the prerequisite.
Now let's go ahead with the contents.
There are two parts in this whole
Course Contents and Structure
course. This is the uh contents for the
list of contents for the part one. We'll
start with the motivation. Why even we
need lang graph? Why? What is the main
reason for introduction of langraph?
What are the main components in
langraph? There are few things like
states, nodes, edges. What exactly are
those? I'm going to give complete
clarity on those so that you're very
comfortable with the langraph later on.
What are conditional edges? There are
different type of edges. What are
conditional edges? How do you add an LLM
node? How do you work with simple agent
within langraph and building AI agent
with tools? How do you integrate tools
with the AI agents within langraph? How
do you manage the memory? And how do you
build a rag agent? So this part one is
like basics of langraph. Sometimes even
if you stop with part one, you should be
able to understand any of the project
within uh langraph. Later on we will be
going into slightly advanced concepts in
part two. this whole course uh the lang
graph concepts the concepts are pretty
simple and they are not that complicated
to discuss a lot so to understand lang
graph course I thought that it's better
understood by taking a lot of case
studies and examples while we are doing
those examples while we are doing those
case studies that is when you get a lot
of doubts that is how you can learn it
confidently so that is why this
particular course we will be learning
lang graph through 12 examples so or
case studies so example by example we
will be increasing the complexity so we
will be starting with lang graph there
will be one example after that
conditional exits related example llm
node related case study building an AI
agent case study agent uh AI agents with
memory there will be one case study so
one by one one by one from different
different industries with different
different case studies we will be
working total as of now I have created
12 complex examples one by one by one we
will be doing these and the complexity
keeps on increasing as we pass through
these uh examples one by one later on if
required if there are new concepts that
are introduced or if we want to do some
other end to end case studies. I will be
adding few more examples as well. As of
now, these f first six examples are
sufficient for you to get a good idea on
the langraph and then these are the ones
that will add lot of confidence to you.
So let's get started with our first
The Motivation: Why LangGraph vs. LangChain
concept like what exactly is the
motivation why langraph has been
introduced because already lang chain
was there and the same team which is uh
working with lang chain why they have to
create langraph that is the first
question I'll try to answer. What is the
reason for introducing a new framework
called langraph? Langchain is the one
that comes to our mind if I want to
build any LLM based applications. One of
the most widely used framework in the
world. Everybody with both hands they
have accepted lang chain framework.
Already companies a lot of developers
they have started using lang chain
framework and they have started building
a applications around it. Lang chains
provide chains they provide prompt
templates. They provide tools they
provide ways to functions to manage the
memory and retrieval works perfectly. We
can create agents. Three, four different
type of agents we can create using lang
chain. Then why do we need langraph? Now
this is where the real twist came in.
Lang chain was very easy to get started.
But when it comes to industry, it's not
about ease, it's also about accuracy and
there are multiple other factors that
come into the picture. So if you want to
build complex AI applications, people
started facing a lot of problems with
the existing lang chain framework and
functions. They're not giving errors as
such but reliable agents if you want to
build when you want to really build
reliable agents that is where lang chain
framework started showing some of the
caveats which are not that easy to
implement or which are not that easy to
solve when you are working with complex
AI agents. That's why later on this
feedback has gone to the lang chain
team. They have created something called
lang graph by solving some of the
problems that langchain was posing. So
that is why lang graph has been
introduced. So lang chain you can build
LLM apps quickly. Yes, you can still use
it in some applications but specifically
if you want to build AI agents if you
want to build AI agent workflows then
langraph can be used. So lang chain
maybe probably simple AI agent. So if
you ask me where can I use lang chain?
Where can I use langraph? So lang chain
is useful if you are building a simple
rack application fine go ahead. Lang
chain you can use if you're building a
simple chatbot if you are having
multiple prompts and if you want to
create prompts pipeline if you want to
create basic agents which are
deterministic which are not really
complex they are not connected to
multiple tools if an agent is connected
to a single tool or two tools and agent
that doesn't get really complex
questions if you are building a chatbot
that is not really complex or it is just
giving basic first level information in
those cases if you have workflows that
are sequential step one will happen
after that step two will happen after
that the output of step two goes to step
three output of step four goes to step
five. In that case, you can use lang
chain. So when your overall process is
linear, user will ask a question and
then we'll do step one, step two and
finally we give the answer go for lang
chain. But if your workflows are
nonlinear and most of the complex real
world agentic AI systems are nonlinear.
You may have to do branching. You may
have to do a lot of loops. You may have
to do a lot of retries. You may have to
persist with some of the memory. You may
have to ignore some memory. You may have
to take human's approval. You may have
to do this human in the loop. Sometimes
you may have to do conditional routing.
If this happens, I would do this. If
this happens, I would choose this tool.
If the user question is like this and if
the answer is similar to this, then I
will choose tool one. Otherwise, I will
choose tool two. If you want to build
multiple agents, if you want them to
collaborate, talk to each other, send
some messages to each other. In that
case, if you want resumability, if you
want the agent to stop at a point, then
the human will give some input and then
agent has to resume that workflow. In
that case when you want to do
checkpointing that means until this
point whatever has happened I want to
take a copy of that after that whatever
has happened until that particular point
I want to take a copy basically when you
want to build complex agentic AI
workflows then you may need a complex
system that is lang graph we're going to
get details and the overall deep dive of
all these topics that are discussed here
I'm just introducing why exactly lang
Understanding Core Concepts: Graphs, Nodes, and Edges
graph has been introduced the core idea
of langraph Graph Lang graph treats AI
workflows like a graph. So this is the
major first important point probably the
new term that I have introduced is
graph. So graph will have nodes and
edges. So this is a node. It is an edge.
This is connected to this node. This
node is connected to this one. This node
is connected to this. This node is
connected to this edge. This this node
is connected to this node using this
edge. So this is an edge. This is a
node. So the lang graph the name itself
suggests us. So lang means large
language models. they are connected via
graphs or we are going to treat agentic
workflows as graphs. How is it that
done? So that is a very important
discussion that we are going to have a
little later. So rather than a simple
linear sequence like step one followed
by step two followed by step three we
are going to create graph. So you will
have input there will be router function
after that maybe we will go to node A or
node B or node C. After that depending
on that we will go to decision node and
then we will end. So in langraph
whatever we have discussed until now you
will see a totally different approach.
Yes, it is little complex. That is the
complex. The complexity will add the
accuracy. If something is very generic,
very simple, then we may get unexpected
results or wild results. Whereas if you
have defined the workflow in a very
strict, stringent manner, then there
will be no ambiguity, then there will be
more accuracy. So you will hear the
terms like nodes, you'll be creating
nodes, you'll be connecting the nodes
with edges. I'm going to show you in
fact we are going to do multiple
examples where we will create nodes,
where we will create edges. And there is
something called state which is one of
the most important topic stateful
workflows. These are known as lang graph
workflows are known as stateful
workflows. So traditional chains pass
the output directly. Lang graph
maintains a central evolving state. So
there's a concept called state which
I'll spend a lots and lots of time on
the state. I'll give multiple examples
of this state. So as of now you can
think state as a kind of dictionary
The Need for Stateful Workflows
which will keep all the information and
the state flows through the graph.
within the graph the states goes from
one node to other node while the node
updates some information in that state
as of now that is very confusing to
understand but as of now I'm not
expecting you to understand state I will
show you maybe five six examples I will
try to give you multiple analogies then
only you'll understand state so langraph
has introduced nodes edges states to
make the agentic AI workflow much more
strict so agents in the lang chain they
have uh behaved very unpredictably later
on lang graph has solved that problem.
Lang graph gives explicit workflow
control. We're going to see all these
details. As of now, I'm just throwing
some statements. Lang graph does this.
Langraph does that. Lang graph solves
this problem. Whatever the lang chain
has having, but I'm going to show it is
not very simple within a short I can
show you that this is what langraph
does. This is what langraph is and this
is how it is better than lang chain. No,
these are all concepts that require
multiple aspects are involved in this.
We are going to go through all of them.
Limitations of Traditional LangChain Agents
So the challenge with lang chain
sometimes you may get infinite loops.
For this I will show an example. I will
show a lang chain AI agent which is
little complex where the AI agent
overall we build it. It answers some
questions but most often the problems
that we see is it may get into infinite
loop. Sometimes the tool misuse we want
it to use tool A uh but it ends up using
tool B. The user asks a question to this
question the agent should call tool C
but mistakenly it calls tool D. tool
misuse, poor routing. After talking to
tool C, it should go to tool D, but
instead of that, it will go to tool B.
I'm talking about lang chain AI agents
that were behaving very wildly earlier.
Hard debugging. One of the biggest
issues with lang chain AI agents is
everything looks like a black box and
the route what route it has taken, the
AI agent has taken to give us a final
answer. Now that is totally decided by
langchain AI agent which is very hard to
debug. what route it is taking and the
two people solving the same problem may
see that their AI agent is behaving it
slightly or very differently in these
two systems and very difficult
observabilities. So there are so many
problems especially related to lang
chain AI agents if you are building the
complex AI agents and langraph very
particularly they have seen these
problems and they have created the
features functions all these
functionalities are just created so to
solve all these problems that we were
seeing in lang chain. So in lang graph
you have explicit control whatever you
have defined where AI agent can go when
it stops there will be conditional based
transition there will be retry logic
there will be failure path there will be
tracing there will be a lot of solutions
to the problems that we have seen
earlier maybe to give you a better
understanding what we will do right now
is I will try to give you a demo of a
lang chain based agent a slightly
complex agent this agent you might have
seen it already so this agent talks to
four tools. Tool A, tool B, tool C, tool
D. An SQL tool which pitches certain
records from the database. A Python tool
which does some calculations, a rack
tool which consults some of the
documents, a verb search tool which will
retrieve some information from the
website. So we are talking about a
healthcare multi-tool agent which has
SQL tool, Python tool, rag tool and your
web tool. Now when we build that agent,
Hands-on Demonstration: LangChain Agent Challenges
building that AI agent itself is a
complex task. So the demo that I'm going
to show it here is I don't expect you to
build that AI agent right away. Right
now I want you to just observe the
problems with it. So this is the code
for the AI agent. So this is our lang
graph code. In that lang graph code in
the beginning multi-tool healthcare AI
assistant agent I haven't given the code
inside our langraph. I have given you
directly the code file link. Once you
click on that so the section that I'm
discussing is problems with lang. In
this if I click on this code link it'll
uh land it'll give you this particular
location where this whole code has been
given. If you execute the whole code if
you reach to the end so multi-tool
healthcare assistant and then the
objective and then the tool description
database file. So tool one is SQL tool
you create that tool two is rag tool
tool three is web search tool four is
python. After creating those four tools
we create the AI agent which is a react
agent and then the final test cases.
These are the test cases that I want to
talk. So if I give this particular let's
say if I go to these 10 more complex
questions intentionally I have given
complex question so that the AI agent
has to consult two or three tools to
give you that answer. So question number
one find a diabetic uh patient with H1
back above 9. Explain why they are
considered as high risk according to
clinical guidelines. So here we have to
do SQL tool as well as we may have to do
web search we may have to rag do rag etc
etc multiple tools need to be consulted.
So if I go back to the output, let me do
one thing. I will just clear all the
outputs. Let me go to question number
one and execute it. Let us see what is
the path that it takes. First it has
gone to SQL database. That's very good.
So it has a thought observation action.
Thought observation action. First it
will go to SQL database. I think later
on it has to go to rag tool. But in this
whole process the problem that agent
faces is see you will see already that
there is might be some error that it has
faced. Error 400 model has reached the
maximum context length. So this is one
of the common problem with lang chain
based AI agents. Let me ask another
question. Identify identify the patients
with low SPO2 less than 90% and
summarize emergency respiratory case
recommendations for such cases. Here
also we have to first get into SQL tool
and then we may have to connect to rack
tool and we may have to connect to our
website tool as well. Now it says again
model has reached the maximum context
length. This is one of the common error.
We will see other errors as well. So
this is question number three. So that
means we have built a complex AI agent.
But what is the use if AI agent keeps on
throwing these type of errors? What is
the real use? If the user finally sees
this answer here I got an answer based
on our revised query search results
guidelines on cardiovascular factors. We
can see that etc etc. Yeah I got an
answer. Sometimes we may get an answer
but the answer says that you know what I
cannot give you more data. You may have
to search for yourself. Sometimes that
can also be the answer. So let us see
let us give some more complex questions
here. One more complex question I have
given models context length. So this is
so what I'm saying is out of the four or
five instances that we have executed we
got the answer only once. One question
out of five questions if we are getting
the answer then we can't really trust on
that system we can't really go ahead and
deploy it. Not every time we can tell
the user that agent has increased some
error we are not agent stopped due to
iteration limit. This is another new
error that we may get. So the kind of
errors that you get when you are working
with lang chain AI agents one of them is
agent stop due to iteration limit agent
stop due to models context length agent
stopped like request is too large again
model context length sometimes you will
get the output the relevant diabetes
hypertention etc these are the
guidelines but you cannot like what it's
saying cannot be accurately summarized
without specific patient data it is
important for qualified healthcare etc
et so it gives some generic answer which
I do not want you can also try this So
the model that I have used for this is
our open AAI model. You may want to give
that open AAI API key or you can use any
other uh large language model. You can
try these 10 questions. Initially I have
given those 10 questions which have to
use multiple tools. If we have to use
one or two tools, the agent is working
perfectly. If you are using only SQL
tool, if you're using only that, if your
question has to fetch the information
only from one tool, it is working
perfectly. But if you have to use
multiple tools then our AI agent is
failing. So that is one of the problem
with lang chain not one. I think this is
the major problem with lang chain AI
agents. A lot of people have started
observing these cracks once they started
building these AI agents. The feedback
has gone to the lang chain team. Then
they have created langraph. So in
conclusion what I'm saying is lchain AI
agents they have large challenges. The
agents until now are behaving very
wildly in the sense you don't really
know what is the next step the agent is
going to take and most of the times
agents are throwing some error. Most of
the agents are not able to give you the
autonomous decisions based on let us
suppose agent is not supposed to or
agent is not able to optimize your quiry
and take the right path so that it can
save the token so that it can give you
the right result. If agent is not able
to do it as a real developer you also do
not have the flexibility to tell the
agent to take the right path. That is
the biggest issue. Agent is taking a
particular path and as a developer you
do not have the freedom. You do not have
the features to tell the agent to take
the correct path. The simple workflows
are fine with lang chain you can achieve
them but for complex workflows we would
like to have more control. And the
solution for all these problems
surprisingly the same example right at
the end of our langraph course we're
going to do the same example you will be
shocked totally pleasantly surprised to
know that all the answers will be given
by lang graph perfectly you will not see
this type of error probably out of 10
out of 20 you may get one error the
error percentage is maybe probably 2% or
5% but you will not get these type of
errors frequently in fact the same
example so the starting point is
multi-tool AI agent with lang chain the
ending point of lang Lang graph is also
same but we will be building an
alternative system. We will be building
the same instead of lang chain we will
be building the same in lang graph and
you will see that all the results are
given to you perfectly. So lang graph
helps you to coordinate complex AI
behaviors reliably. Reliability is the
most important factor when you are
building enterprise level AI agents. Let
us get into the details of langraph. We
are going to discuss multiple components
inside langraph. We are going to build
multiple AI agents using lag graph.
Introduction to Graph Theory in AI Workflows
Let us see some of the main components
in langraph. If we have a good
understanding of these components then
following the rest of the concepts in
langraph becomes much much easier. Maybe
in the beginning these components are
little complex to understand but if we
go through several examples then you
feel that they are quite uh simple
concepts within langraph. One of the
biggest differentiating factor compared
to other agentic AI frameworks versus
langraph is in langraph as the name
suggests everything revolves around
graph theory. Langraph applies graph
theory concepts to agentic AI workflows.
Why graph theory has to be applied to
agentic AI workflows? Because somehow if
you are using these graphs, if you're
using these nodes and edges, somehow
that is helping us to build these AI
agents much more robustly so that
without any ambiguity we can clearly
tell what we want so that AI agent gives
us the right output. All the workflows
are expressed as a graphs. I'm going to
go very much details into this. In the
graph you have nodes and edges. Forget
about lang graph. In general, if you
take any graph, you will have nodes and
edges. Nodes are connected via edges or
node A is connected to node C by using
this edge. This is node A or it is also
known as vertex. Vertex A is connected
to vertex B and vertex B is not
connected to vertex C. Vertex B is
connected to vertex E. Again, vertex E
or the node E is connected to node B. So
nodes are the objects or the entities in
general graph that I'm talking about.
Not the LAN graph. Nodes are the objects
or the entities. They can represent
anything. A node can be a person. In
general graph theory, a node can be a
person. A node can be a city. A node can
be a web page. Edges are the connection
between the nodes. So in general graph
theory, if you take you have the nodes
and edges. Now this is a graph.
So what is the use of the graph theory?
If you take a social network instead of
representing our data in a standard
relational shaped database, it may be a
little difficult. If you actually see
your data in the form of a graph, for
example, Ali is connected to Dave. Dave
is connected. Let's say Bo is connected
to cat. Ali is connected to cat. Ali is
connected to Bo. But Dave is not
connected to Bob. Dave is not connected
to cat.
So the connections between the nodes
nodes are people here. Ages is kind of
connections or the friendships in the
city map. A is connected to B. B is
connected to C. C is connected to E. So
this is like city A, city B or the
intersection if whether this can be a
road or this can be an intersection. A
can be an intersection. Intersection A.
From A you can go to B. From B you can
go to C. Probably if you're using Uber
or Ula any of these taxis, how do they
do this? How do they find the shortest
path between two points? For example, if
you want to go from point A to point E,
which road, which route is the shortest
one. Is it going from A to B to C to E
or going from A to D to E? That kind of
analysis can be done quickly so that you
can get the shortest path between any
given two points or you can find the
influential hubs in the network within
the web pages. Page one. From page one,
you can navigate to page two and page
three. from page two you can actually
navigate back to page one you can
navigate to page three you can also
navigate from page three to page four so
all these type of data or information
can be represented easily by using
graphs so I'm talking about the standard
graphs which are used in representing
some complex information instead of
representing that information using the
standard tables or the relational
databases if you represent it in the
graph theory manner like this it will be
easy to get give the final picture or
even we can detect the fraud by looking
for some unusual connections or patterns
in the banking transactions. So this is
the standard graph. Now we will see the
graph inside the lag graph which is
slightly different.
Continue with the next video in the
playlist. We are covering everything
step by step. If you have any questions
or the comments, please post them in the
comments window below.

```
