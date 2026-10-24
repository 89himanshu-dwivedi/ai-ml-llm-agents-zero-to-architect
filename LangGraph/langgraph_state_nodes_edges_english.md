# LangGraph Fundamentals — State, Nodes, Edges, and First Graphs (English)

> **Source preservation:** These structured notes are followed by the complete original transcript in Appendix A. Additional context is separated from the instructor's content.

## 1. Lesson Goal
This lesson introduces three LangGraph fundamentals: **State**, **Nodes**, and **Edges**. It first builds a simplified bank/ATM workflow, then gives a food-delivery workflow as a practice exercise. The focus is graph fundamentals, not advanced AI-agent behavior.

## 2. Modeling a Workflow as a Graph
A graph has nodes (steps) and edges (connections/transitions). Banking example: authentication → balance check → deduction/approval if funds are sufficient; rejection if funds are insufficient → end. The instructor says explicit graph design can make workflow behavior clearer, although constructing graphs may initially feel more complex.

**Important:** The ATM demo is simplified. It does not implement real PIN validation, account lookup, a sufficient-funds decision, or secure transaction processing.

## 3. State
State can be imagined as a shared canvas, sheet of paper, or dictionary flowing through the graph. It contains fields/keys and values. Nodes read state, perform processing, and return updates; the updated state is passed onward. The transcript demonstrates `TypedDict`.

| Field | Type | Meaning |
|---|---|---|
| `logged_in` | `bool` | Login status |
| `bank_balance` | `int` | Demo account balance |

The speech-to-text transcript uses both `login` and `logged_in`; the underlying idea is a Boolean login flag and an integer balance.

## 4. Nodes
In the beginner example, a node is a Python function. Typical flow: receive state → read fields → perform processing (such as an LLM call, database query, or tool run) → return updated state.

- **Login node:** prints a message and sets the login flag to `True`.
- **Balance node:** prints a message and sets the balance to a fixed demo value.

These are not real authentication or balance-checking functions; their values are hard-coded.

## 5. Edges
Edges define the next execution step. The bank example is:

`START → login_node → balance_node → END`

The lesson also demonstrates explicitly setting entry and finish points.

## 6. Graph-Building Sequence
1. Install packages from a requirements file.
2. Optionally check the installed LangGraph version.
3. Define state with `TypedDict`.
4. Write node functions.
5. Create `StateGraph` with the state schema.
6. Register nodes using `add_node(...)`.
7. Connect nodes using `add_edge(...)`.
8. Set entry and finish points.
9. Compile the graph.
10. Run the compiled app using `invoke(...)`.
11. Inspect the final state.

`StateGraph` is the graph builder. After nodes and edges are defined, compilation produces an executable application. A graph node's registered name and its attached Python function are conceptually distinct.

## 7. ATM Demo — Conceptual Flow
Example initial state:

```python
{"logged_in": False, "bank_balance": 0}
```

The login node sets the flag to `True`; the balance node assigns a fixed value. The final state therefore changes from the initial state. The key lesson is that a node receives state, updates it, and returns the updated result.

**Production caveat:** A banking workflow must not validate a PIN/password by hard-coding success. Real authentication, authorization, account lookup, transaction atomicity/idempotency, audit logs, error handling, and sensitive-data protection are required.

## 8. Food-Delivery Lab Exercise
Required state:

| Field | Type | Initial example |
|---|---|---|
| `order_confirmed` | `bool` | `False` |
| `food_prepared` | `bool` | `False` |
| `delivery_status` | `str` | Empty string |

Three nodes:
1. `confirm_order` → set order confirmation to `True`
2. `prepare_food` → set food prepared to `True`
3. `deliver_food` → set delivery status to `"delivered"`

Graph: `START → confirm_node → prepare_node → deliver_node → END`

Define the state, write the three functions, create `StateGraph`, add nodes and edges, set entry/finish points, compile, invoke with initial state, and inspect output. Because updates are hard-coded, the final state becomes true/true/`"delivered"` even if initial values were false/false/blank.

This is a graph-practice exercise, not a production delivery system; payment, inventory, restaurant availability, and courier tracking are not implemented.

## 9. Instructor's Practice Advice
- Type and run the code yourself rather than only copying it.
- Understand each line and each state update.
- Practise state, nodes, edges, compilation, and invocation repeatedly.
- Ask for line-by-line explanations when confused.
- Create similar beginner exercises.
- Move to conditional edges and LLM nodes after the fundamentals are clear.

## 10. Quick Revision
- **State:** shared workflow data.
- **Node:** processing step; a Python function in the beginner demo.
- **Edge:** transition between nodes.
- **StateGraph:** graph builder using a state schema.
- **Compile:** turn the graph into an executable app.
- **Invoke:** run the compiled workflow with input state.
- **ATM:** hard-coded login/balance updates.
- **Food delivery:** confirm order → prepare food → mark delivered.

## 11. No-Skip Checklist
- [ ] Graphs and banking transaction example
- [ ] State as canvas/dictionary/shared memory
- [ ] `TypedDict` and bank-state fields
- [ ] Nodes as Python functions; login and balance nodes
- [ ] Edges and sequential flow
- [ ] Package installation and version check
- [ ] `StateGraph`, add nodes/edges, entry/finish, compile, draw, invoke
- [ ] ATM test and hard-coded behavior
- [ ] Food-delivery state, three nodes, expected output
- [ ] Instructor's practice advice and next steps
- [ ] Additional production caveats
- [ ] Full original transcript in Appendix A

## 12. Additional Points Added — Production Perspective
- Validate business conditions before proceeding to later nodes.
- Define failure paths for failed authentication, insufficient funds, tool errors, timeouts, and invalid state.
- Test invariants, such as preventing transactions after failed authentication.
- Use tracing/logging without exposing PINs, credentials, secrets, or unnecessary customer data.
- Verify package commands and APIs against pinned project versions and current official documentation.

## Appendix A — Original Source (Preserved Verbatim)

```text
Introduction to LangGraph and Agentic Workflows
This video is part of a series. Complete
the previous videos [music] in this
playlist before you start this video.
The complete playlist information, the
material and the code file information
is given in the video description below.
In Langraph, we build the AI agents by
representing them or by modeling those
AI agents as graphs. So you will have
the nodes and edges and this is actually
AI agent or a typical graph inside the
langraph. So long lang graph
orchestrates the complex AI agent
workflows in the form of a graph. For
example in a banking transaction AI
agent first we have an authentication
node. After that it is connected to
checking the balance node. If there is
sufficient balance then it will be
connected to deduction node and then we
will end the transaction. Otherwise we
will do the reject node. So this is a
reject node which will give some other
output and then we will end the
transactions. These graphs are not that
easy to construct to be honest with you.
At a beginner level it will be very
confusing. It may not be that easy to
construct compared to other frameworks
like autogen or lang chain. Compared to
that langraph is little difficult to
follow but that complexity is needed
because when we are building enterprise
level industry grade applications that
complexity helps us in defining the
agentic logic agentic behavior without
any ambiguity. At the end of the day it
is not the ease of programming language
people look for. At the end of the day,
how accurate is your agent? How
non-ambiguous your results are? And if
you want to really give right
instructions, then we need a little bit
of complexity. And graphs will give us a
lot of flexibility to write in the
manner that we want the final output to
be. So you can construct the agents.
Yes, construction takes time, but the
results are much more accurate. The
graphs inside the langraph are state
graphs. So understand this word state.
State is one of the very important
concept. So what exactly is state? Let
us spend some time on it.
Understanding State, Nodes, and Edges
So the three major components inside the
langraph are state, node, edges. State,
nodes and edges. First of all, what is a
state? State is like a sheet of paper or
it is like canvas. And this state flows
through your graph. So inside the graph,
this state grows. Let us say here this
is the state and then the state goes
from here to here and then the state
goes from here to here and finally from
the state we give something as output.
State is like a blank canvas where you
have certain fields
and these fields will be updated by the
nodes or some of the fields will be
modified. Sometimes we may add some
information. Sometimes we may modify
some information that is there inside
this state. State is where the latest
information from the graph is graphed
and the calculations are stored. It is a
shared data structure or the shared
memory. Usually it is a dictionary or
specifically type dictionary. In a
dictionary if you have the keys and
values in usually you have the keys and
for every key you have the value and if
you particularly mention a particular
key to be a particular type then that is
known as type dictionary. For the ease
of understanding simply right now you
see that state as a dictionary. So a
dictionary is the object. A state is a
dictionary object and the state goes
from one node to other node. I'm going
to give a bit more details once we see
our first example. Then you will see
what exactly is a state. Now the state
is the one that keeps the whole
information. State initially this is a
blank slate. Later on you will have the
field information. Finally at the end of
the graph from there we will take the
final output. Every node can read from
the state and it can write to it. So
state flows from one node to other node
in authentication. So you will take some
information. This authenticate node
takes some information from this
dictionary and then probably after this
it will fill some information inside
this check balance takes some reads some
information from a field and updates a
particular field. Node is simply a
Python function. So as of now state is
like a a blank canvas paper where we
will be keeping on updating the
information or we will be drawing the
information from there. Node is a Python
function. Each node takes the current
state information from the current state
does something doing something could be
lm call or quering a database running a
tool and return the updates to the
state. I'm going to give you some more
details as we go to the first example
then you will understand it. So the
three major factors are state, nodes and
edges. Nodes and edges are easy for you
to understand in graph theory. This node
is something that does something and
then edge is like how each node is
connected to other node. So every node
is a Python function and then it is
connected to an edge. So let us see our
first example to understand otherwise
theoretically it may be a little
confusing. Let us take a very simple
example just for the sake of
understanding state for the sake of
understanding node and edge we are doing
this example. So imagine I have one
specific problem statement. I want to
create a graph where I want to approve a
particular ATM transaction. We want to
check the balance. In fact this is a
graph that we will uh build right now.
So as soon as the user comes we would
like to authenticate the user whether
the user is authenticated or not that
means whether the user is entering the
right pin or not. So we will write a
Python function which will find out
whether the PIN is correct or not. Once
the ATM pin entered that is correct then
we check the balance. If the balance is
sufficient enough then we will prove for
deduction. If the balance is not
sufficient then we will reject the
transaction. Let us try to create this
workflow inside LAN graph and try to
understand these three concepts state
node and edge.
Setting Up the Environment and Basic Concepts
Let's go to our code file. Let's start
coding. We will start creating the
states. We'll start creating these nodes
and we will also connect these nodes
with edges. First I'll try to code and
show it to you. You just take the notes.
After that I'll give you a chance to
write this particular piece of code.
Then you can write it. First try to
observe and understand whatever we are
trying to do inside our first graph that
we are going to create using langraph.
So first we have to install the
packages. I have kept all the package
requirements in one place. If you
execute this piece of code, all the
required packages will be stored inside
requirements. .txt. I'm not only talking
about the packages that are used in only
example one. Later on we will be using
multiple packages. I have kept all of
them in one place here. Later on also
I'm going to discuss where and when
which package is needed. Within one shot
once you execute it all the packages
will be installed. pip install
requirements this particular txt file
and everything that read that file and
start installing everything and you can
see as of now the version that I'm using
if I say pip show lang graph the version
that I'm using it will be displayed so
lang graph is installed successfully we
will start creating our first graph
which is a very simple graph that we are
going to create even before we start
coding we should have a imaginary
picture of the graph that we want to
create first we will start the graph and
I want to create something called login
node where we are checking whether the
user password is correct or not. But in
this example, we will not write any
logic. As soon as we hit the password
node, we will say that the password is
correct, login is correct, you go ahead
and then the next node is we are going
to check the balance. We should write a
complex Python function which will check
the balance. But here we will not write
anything. As soon as we hit this check
balance node, we will automatically go
to the balance field and we will update
the balance as the balance is 1,000
rupees or $1,000 directly. We will
update it and then finally we end this.
So the overall graph that we want to
have is first we need to have this uh
state. State is like a dictionary or you
can imagine this as a blank canvas or
imagine this as a piece of paper which
is running through the graph. As of now
state is a dictionary which has two keys
in it. The first key is whether the user
has login or not. There will be a value
of true or false. That means this will
be of the type of boolean. That is why
it is known as typed dick. So I want to
have this dictionary as the type
mentioned. So this is the typed
dictionary. Typed dict is what the state
will be mentioned as. And then there
will be one more field or one more key
called balance inside this the balance
within this particular
bank account. What is the balance? And
this is integer. So this is the state.
I'm not talking about the start node.
I'm talking about the state uh place
where the information will be updated or
updated. And this state will be flowing
as soon as the state reaches here. And
this is a Python function. This node
here is a Python function. And what does
this Python function will do? It will go
to this state. Wherever login is there,
it has to be boolean. It will simply
make it true. That is it. We are not
doing anything fancy here. I will go to
this state. I will make this login as
true. And the balance will be kept as it
is. As of now, there is nothing in the
balance. And then it is connected to
another node. This is the edge. It says
that after this node, you should be
connected to balance. Again once we hit
this balance node already login was
given as true. Now once you hit the
balance node balance I just want to
update it as balance equal to $1,000,000
and that is it and then we will end it.
So at the end of it if you see the state
you will see that login is true and
balance is,000. We're going to define
this now programmatically. Let us go to
our code file and start coding for this.
So let's go to our code file.
Creating the Bank Transaction State and Nodes
In here first we have to mention the
state.
So from typing import typed dictionary.
So that is how we are going to define
our state as a type dictionary. You know
what is a dictionary? It has keys and
values. If you fix what type of keys are
there or if you fix what should be the
format of the values then that is a type
dictionary. So we're going to see an
example of the type dictionary. So let
us define our basic state. Let me define
the state as bank state. So you write
class my state is bank state. You can
give any name here. And the bank state
is of the type typed dictionary. And the
bank state has two keys which is logged
in and it is of the boolean type. It
doesn't take anything other than
boolean. We will get an error if we try
to put anything other than boolean true
or false. And the bank balance it is
integer. So this is the actual canvas or
this is the dictionary. This is the
shade information that will run through
the whole graph. inside the graph when
we build the graph wherever we want to
get this information on login status
wherever we want to get this information
on balance we can get it one of the
reason why lang graph is very effective
because of this state definition we can
access this state from anywhere inside
the graph later on once we build it so I
have built this state our state is bank
state this is the one that we will be
keeping on referring to whenever I want
to get some information as of now our
graph is going to be pretty simple we
want only two pieces of information
whether the user has logged in or not
whether the balance how much is the
balance that the user has this is the
structure of our particular state now
what we will do is we will try to get
the nodes defined so let us define one
by one a node
so first let me call this as step one
which is defining the state always your
first step is define the state what is
your state where you will state is like
one one central repository of
information inside the lang graph or
inside your graph where you are going to
ask all the questions get all the
answers from that state then we will go
to step two define your nodes
define the nodes we have two nodes so
the first node is the login node and the
second node is the check balance node
so login node a node inside python is
simply [clears throat] a python function
you define my node my node is a login
and it takes the input as the state
only. So it will do some modification.
It'll read some information from state.
Again it will pass the information to
state only. It will return state only as
the output. So I will check the login. I
here ideally I should do the checkup. I
should do the password checking logic.
But I will simply print as soon as
somebody hits this node. I will simply
print checking the password. That's it.
We are not really checking any password.
And we will go to state whichever is
input. later on it will be bank state.
Inside that I will simply put login
equal to state. So whatever you are
giving as input in that state I will go
to login field I'll put it as true and
then I'll return the state to you. So
that is the first node that you have
created and then we will go to the
second node checking the balance again I
will define another Python function here
we will not do anything complex again
check the balance it will take the state
as input. This time what it'll do is
it'll just print fetch in the balance
and then it'll go to balance and it'll
just make it as $1,000. So these are the
two nodes or the two Python functions
that we have created. Once you have step
one which is uh you define the state,
step two which is uh define the nodes,
it is time for us to create the graph.
So let us start creating the graph. Let
us start constructing the graph by
giving the nodes and edges.
Building and Compiling the StateGraph
dot graph
import state graph. So the state graph
is the main engine inside the lang
graph. It helps us to create the nodes.
It helps us to connect them through the
edges. So every time you will be writing
this particular line before you build
the graph state graph. This is given to
us by lang graph team. So that will help
us to create the graph structure very
quickly. So state graph and we will
create our first workflow object and we
will tell that bank state is the type of
the workflow object that will be moving.
So that is a state object. So I would
say my workflow is equal to state graph
and bank state. This is the style. So
the information that I will be running
through the graph that has two fields in
it. One is logged in and the other one
is balance. And we should be able to
access that information from anywhere
inside this graph. So you will say my
workflow equal to state graph bank state
and depending on your state depending on
the problem statement this may change
whatever is the state that we have
defined earlier that we will be writing
it here and then after creating these
graphs this is just the starting of it
we will start giving the nodes here and
then after giving the nodes we will
start giving the edges after that you
have to actually compile the graph then
only you can actually draw it and then
after drawing it you will get an idea on
how the graph looks like and then maybe
you can run the graph graph. So what are
the nodes? So this is the so we have
just started building the graph and then
we will start the addition of the nodes.
I will say my workflow dot add node and
then the way we should write it is what
is the name of the node that you want to
give. Finally what do you want to call
it? I would like to call it this node as
login node.
This you can give any name the one that
you are giving the code inside the code.
So I am naming it as login node. Next
time onwards inside the graph I will be
referring to it as login node. And the
function that you have created, what is
a function? The function is login. So
you write this login here. You can give
any name here. Usually I tend to give
the name of the node as the node. So you
can say this is login node. What job
does it does? Every node is a function.
And this is the function. It simply
takes the bank state information. And
then if you pass it through this node,
it will just say login equal to true.
And then there is one more node that we
have created. What is that? That is
checking the balance. So I will say
check balance node or balance node. So I
would say workflow do add I would say
this is a balance node. It will just
check the balance or you can also call
it as check balance node. So these two
nodes are given but edges are not yet
given. We haven't yet connected those
nodes. So let us start connecting those
nodes by adding some edges. So I will
say workflow dot add age
workflow do add age login node is
connected to balance node. So first you
will go to login node. Something will
happen to that bank state. What will
happen? Login should be marked as true.
Then you are connecting it to balance
node. So after this step you go to the
second step. You can give starting and
ending point. Sometimes you can ignore
also automatically the state graph will
take care of it. But to be on the safe
side I will say the set entry point
entry is login nodes. That means start
will be connected to login node. Set
finish point this will be connected to
the end node. Even if you ignore this it
works. But simply for the sake of
completion I am giving it here. And we
are trying to compile it here.
So without compilation it will not work
because if you go to the state graph and
if you try to see the state graph is a
builder class. It cannot be used
directly for execution. So simply
directly I cannot say workflow.run. I
have to first compile it. After
compilation so I'm storing everything
inside something called app. So I can
draw it directly app itself. If I just
say it, it should draw it. Otherwise if
this is not working you can use ipython
display and you can draw it simply first
let me directly go ahead try to draw it
so I have the start node automatically
created by state graph the start node is
directly created we haven't given it and
end node is automatically given so this
is internally inside the system then
login node and then balance node login
node balance node if I say login one
node balance one node so the names are
given here since it is login one again
login one need to be connected to
balance one Again here this is login one
just to show you that the names that you
give will define whatever is the graph
that you are getting. So login one login
one but anyway we don't want that simply
I will say login node and balance node.
So once the app is ready app in the
sense here it is our workflow once you
compile it you got that app we can test
it. So whatever you pass it on to this
you will get the output. So let us go to
Testing the ATM Workflow with Invoke
our execution. I would say my final
result. Now you can invoke it. App
do.invoke invoke I said login equal to
false so there is no login but once you
go through this graph automatically once
you hit the login node so here in the
beginning I'm passing this information
what is the information that I'm passing
on login is so this is a dictionary not
just the dictionary it is a typed
dictionary so that means it has to be
given with the proper format only so it
is login is false I have given balance
is zero so what is the expected output
even without doing this you try to come
up with the output what is the output
that you will get you will once you hit
the login node this false will be
converted as true. Once you hit the
balance node that will be converted as
th00and we are not doing really any AI
agent creation here just for us to
understand what is state what is graph
what is node what is edge how are they
connected what is the basic graph we are
creating one of the simplest graph that
is possible later on we are going to get
into AI agents and how can we use uh
these uh one of the node will be llm
node one of the node will be tool node
we will connect lm node to the tool node
then we will get the final result but
that will be later on as of now I have
just given this and what is my result
checking password so once it It's this
node we are printing checking password
after that it will be automatically
flagged as true and then checking
balance or fetching balance
automatically it will be flagged as
thousand once again let us suppose if I
give this as $500 and this one I would
say this is false so whatever happens
here whatever is the input that you pass
on once you give this finally login will
be false balance will be 500 even if you
give true here because we are hard
coding anything that comes inside we are
making it as false and 500 even if you
give 800 here balance will be marked -
500. This is a very simple lang graph
example I'm giving you just to get an
idea of what is state, what is a type
dictionary, how does this langraph work,
how does this whole definition of the
langraph work. If you're not able to
understand this, I want you to go
through this multiple times. I want you
to give this information. Probably you
can use other ways of understanding
this. Probably you can go through line
by line and make sure that you are
comfortable with this. Then we will move
on to the next example where we will try
to get into a little bit of
complication. Probably we'll try to add
a conditional edge and then later on we
will get into LLM nodes and different
type of nodes.
Understanding what is state, what are
nodes, what are how do you build your
first graph inside langraph is very
important. We have seen one example to
strengthen our overall understanding. We
will try to create another quick graph.
Lab Exercise: Building a Food Delivery Graph
Now this will be your first exercise.
What you need to do is you have to
create a simple food delivery process
graph. Again we are not yet into AI
agents. We are just practicing the
basics of lang graph. So the
requirements are given here. Use typed
dictionary to create a state. State
should contain order confirmed a
boolean. Food prepared a boolean.
Delivery status a string. It must
contain three functions or three nodes.
Confirm order which is connected to
prepare food which is connected to
delivering food or deliver food. And
then finally we create the graph confirm
node connected to prepare node connected
to state node. And then finally invoke
the workflow with the initial state.
Maybe if order confirmed is false, food
prepared is false, delivery status is
blank, we want to print the final
output. So again we are doing this for
the sake of practice. Let us do this
exercise. Let's head back to our code
file and try to create this graph. Try
to first create the state and then three
nodes and then the graph. We will ino
invoke the graph. Once we do it a couple
of times, then only we get that uh
overall confidence. Let's go back to our
code file
in our code file I mean this section if
you go to example one just below that
lab exercise basic graph creation that
is where I am. So what the solution is
already given but what we will do is we
will try to create some blank code cells
and then try to understand the
requirement. Anyway the requirement was
given very clearly. You first create a
state by taking these three keys. So
what we will do is from typing I'll try
to reimport once again just for the sake
of practice. From typing import the type
dictionary from langraph.graph import
the state graph. The first one is define
the state. Let us give the state as food
order state. So I would say let us
define the class.
It is suggesting bank state. We are
saying food order state. It will be a
type dictionary and it should have order
confirmed it's a boolean. Put prepared
it's a boolean. Delivery status it is a
string. So that first you have to define
the state. After state the second thing
is nodes. The next step that you will be
getting into is node. Node one is one
node for confirm order. Confirm order.
That is one node. There's one node for
prepare food and then there is one node
for deliver food.
You can also try this.
So confirm order again it will be a
function def and then I would say
confirm order.
Here there is a slightly complex code
that is given. So the way it says is it
is taking state as input and it should
be of the type food order state.
Directly you can just write state and
leave it. But if you write like this,
the state must follow the structure of
whatever this food order state is. And
the output should be in the form of food
order state. So you can write this or if
you want to make it a slightly simpler,
you can simply say this is state. We
will get into this type hints later on.
As of now, I'll try to make it much much
simpler. It will take a state as input
and it is printing confirming the order.
So it will go to the state wherever
there is order confirmation. It will
mark it as true and then return the
state. So the earlier one whatever AI
has suggested that is also correct but
we will not use that later on we will
get in there. The next one is prepare
food. So I will say def prepare food
take the input as state and then print
prepare food and food preparation also
marked as true. And the last one is
delivered food. Again define deliver
food delivering food and we are marking
it as delivered. So these are the three
nodes that we have created. So state is
done nodes are done. The next one is
graph. So let's create the graph. Let us
see whether that execution. So this one
executed food order state is created and
the nodes are created. Let's create the
graph. So my workflow the graph workflow
is equal to state graph. State graph is
given by lang graph for us to create
this graph and edges. So the first node
adding nodes is direct. So first node is
add node confirm node. So confirm order.
So this is the confirm order function
and this name you can give anything. So
I'm giving it as confirm node. Usually
for name uh nodes name I tend to give it
as underscore node. So this is prepare
order node deliver node and there is a
linear sequential order only we are just
connecting them. So I would say add
edges
or connect the nodes by using workflow
dot addage. Confirm node should be
connected to prepare node and prepare
node should be connected to delivery
node. And then we will get into start
and end point. Actually, even if you
skip this, it still automatically
creates start and end points. But I
think uh as a good habit, we will give
these start and end points.
I would say workflow dot set entry point
workflow dot set entry point.
Set
entry point. Set finish point. Entry
point is confirm node. Finish point is
delivery node. Workflow.compile. A lot
of people do not draw it but I tend to
draw it. There is you can use IPython
display for drawing otherwise you can
directly just print this automatically
it'll be drawn. State graph is not
defined. Somehow it says state graph is
not defined. So let us try to import
that state graph. Where is it? Actually
we have imported it but somehow it's not
showing it here but anyway we will try
to write from langraph. Graph import the
state graph
name food order state is not defined.
Looks like we we might have been
disconnected from the runtime. So that
is why it was not detecting or we may
not have executed it earlier. So start
node which is the default node is
connected to confirm node, prepare node
and deliver node. What does that confirm
node does? What does this function do?
Simply go to auto confirmation, mark it
as true. Whatever you pass it as input
everything will be marked as true.
Whatever you pass it on as input food
prepare that will be marked as true.
When whatever is the status it will be
marked as delivered. So this is a very
straightforward, very simple, very uh
primitive graph that we are creating.
Now let us execute the workflow.
Execute the workflow.
My result is app.invoke and saying order
confirmation is false that will be
converted to true. Food prepared is
false that will be converted to delivery
status is blank that will be given as
delivered in the output. When you print
the output you will see true food
prepared true delivery status delivered.
Summary and Next Steps
Even if I say delivery status is uh NA
that will also be given as delivered
because that function does nothing. It
just marks everything as true. If I say
true also true. If I say false also
true. Again we are not doing anything
fancy here. I'm just doing this to make
you comfortable with the terminology of
the state terminology of uh nodes and
edges. Otherwise the later on topics the
topics that we are going to discuss
later on the examples will be very much
confusing. I think the code will be very
much confusing if we do not follow this.
So this is one more example similar to
this. You can pass on this code in chip
or clot and ask for five or 10 more
examples like this. You can ask clot to
explain each and every line of the code.
Wherever you are getting confused, you
can ask it to give you a better
explanation. Maybe some artifacts to
explain you much much uh easier. So try
your best. Do not skip this one. Make
sure that you do an exercise like this.
Make sure that you are comfortable. You
make sure that you're understanding what
is happening here. Then only you proceed
further.
You have created your first graph. You
got to know what is state, what are
nodes, what are edges. If you're doing
this for the first time, definitely all
these will feel little overwhelming.
There are a couple of more fundamental
concepts like that. Once we are done
with the fundamental concepts, the rest
of the langraph flows very smoothly.
Let's go to conditional lm node. Once we
discuss all these basics, once you are
comfortable, I'll also give you a couple
of more exercises, examples as well for
you to practice. Once you are very
comfortable with them then only we will
go to the advanced concepts. So make
sure that you practice before you go to
the next step.

```
