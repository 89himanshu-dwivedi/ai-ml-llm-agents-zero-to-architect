# LangGraph Conditional Edges — English Notes

> The original transcript is preserved verbatim in Appendix A. Additional recommendations are kept separate from lesson content.

## 1. Conditional Edges
Conditional edges choose the next node based on current state and a routing function's result. Fixed edges define one transition; conditional edges allow branching.
- ATM: sufficient balance → deduct; otherwise → reject.
- Support ticket: technical issue → technical team; billing issue → billing team.

## 2. Routing Function
A routing function reads state and returns a route label such as `deduct` or `reject`. The label must match the conditional-edge mapping; mismatches between route labels and node names can cause routing errors.

## 3. ATM Transaction Example
State fields:
| Field | Type | Meaning |
|---|---|---|
| `account_balance` | `int` | Account balance |
| `withdrawal_amount` | `int` | Requested withdrawal |
| `is_authenticated` | `bool` | Authentication status |
| `transaction_successful` | `bool` | Result of balance checking |

Four nodes:
1. **Authenticate:** the demo sets authentication to `True`.
2. **Check balance:** checks whether balance is greater than or equal to the withdrawal amount.
3. **Deduct money:** subtracts the withdrawal amount and marks success.
4. **Reject transaction:** marks failure and leaves the balance unchanged.

Routing: `transaction_successful == True` → `deduct`; otherwise → `reject`.

`START → authenticate → check_balance → conditional routing → deduct_money OR reject_transaction → END`

Lesson examples: a ₹1,000 balance with a ₹1,200 withdrawal is rejected; a ₹1,000 balance with a ₹500 withdrawal is deducted, leaving ₹500. Some transcript values are inconsistent due to speech-to-text errors; the intended logic is summarized here.

## 4. State as Shared Memory
State is a shared data structure that nodes read and update. Nodes work with workflow state and return updates.
- State = current workflow data.
- Node = processing step.
- Edge = connection/transition.
- Conditional edge = chooses a path based on state or a decision.

## 5. Graph Construction Sequence
1. Define state using `TypedDict`.
2. Create an initial state.
3. Write and individually test node functions.
4. Create `StateGraph`.
5. Register nodes with `add_node(...)`.
6. Add fixed transitions with `add_edge(...)`.
7. Configure the conditional edge and routing function.
8. Connect branch nodes to `END`.
9. Compile.
10. Test inputs with `invoke(...)`.

Type hints document and support type-checking; do not assume every constraint is automatically enforced at runtime.

## 6. Customer Service Ticket Classifier Exercise
State fields:
| Field | Type | Meaning |
|---|---|---|
| `issue_type` | `str` | Issue category |
| `assigned_team` | `str` | Selected team |
| `ticket_status` | `str` | Assignment/status result |

Nodes:
1. **Classify issue** — sets the assigned team.
2. **Assign technical team**
3. **Assign billing team**

Routing: technical → `technical` route; billing → `billing` route.

`START → classify_issue → conditional routing → assign_technical_team OR assign_billing_team → END`

The lesson's simplified `else` branch may send any non-technical issue to billing. Production implementations should validate allowed categories and provide a fallback/review route for unknown issues.

## 7. Instructor's Learning Advice
- Observe the flow before writing the code yourself.
- Practise both examples and both lab exercises.
- Understand state, nodes, edges, and conditional routing before proceeding to LLM/tool nodes.
- Ask for line-by-line explanations when confused.

## 8. Quick Revision
- Conditional edge: chooses the next node based on a condition.
- Routing function: returns the next route label.
- ATM: deduct or reject after balance checking.
- Ticket classifier: route to technical or billing.
- Node and route labels must match.
- Test both success and failure paths.

## 9. No-Skip Checklist
- [ ] Conditional edges and sequential vs. branching flow
- [ ] Routing function and route labels
- [ ] ATM state fields and type annotations
- [ ] Authenticate, check balance, deduct, and reject nodes
- [ ] Shared-state explanation
- [ ] Conditional mapping and graph construction
- [ ] Sufficient/insufficient balance examples
- [ ] Ticket classifier state, nodes, and routes
- [ ] Instructor's practice advice
- [ ] Complete original transcript in Appendix A

## 10. Additional Points Added — Production Safety
- The demo authenticates everyone by setting `True`; this is not real authentication.
- Explicitly define the equal-balance boundary condition.
- Validate zero/negative withdrawals, account status, currency precision, and limits.
- Real banking needs safe transaction atomicity, concurrency control, authorization, and audit logging.
- Unknown ticket categories should not automatically become billing tickets.
- Test failures, missing fields, invalid labels, and unexpected issue types.

## Appendix A — Original Source (Preserved Verbatim)

```text
Introduction to Conditional Edges
This video is part of a series. Complete the previous videos [music] in this
playlist. Before you start this video, the complete playlist information, the
material and the code file information is given in the video description below.
We will move on to some more details. Another type of edge that you will see very frequently is a conditional edge.
So let us understand what exactly is a conditional edge. And this is one of the integral part of langraph. You will be
using conditional edge at multiple occasions. Conditional edges in the lang graph will let you to execute
Why Use Non-Linear Workflows in LangGraph
dynamically based on the current state rather than always going to the next step in a sequential manner. Sometimes
from here you may want to move to this node instead of this node. So until now one of the problem in lang chain agent
is you can only go in a sequential manner one step after the other but now in lang graph it is letting you choose
either this node or this node. This is one of the reason why graph architecture was introduced. Not only between these
two, you can choose probably between three like node one, node two, after node two, you may want to go into node 3
A or 3 B or 3 C any one of them based on the condition. And how do you do that? By adding the conditional edges.
Conditional edges are very important because you may want to take certain decision at this node and move on to the
next decision or move on to the next node. So conditional edges have to have a new function called routing function.
Routing Functions Explained
You may have to create a routing function. Decide what should be done next. And this is one of the pseudo code
for the routing function. You will be adding a conditional h. And you will say source node. Let us suppose this is my
source node. And after this source node, I may want to go to node A or this node. This is one of the target or this is
another target. One of these two nodes I want to go. Let's say this is option A or option B. So let me just put this is
option A. This is option B. Now here you will write a routing function. That function will decide. You will give a
condition here. In that function you will get the two outputs. If the output is yes, then you will go to A. If the
output is no, then you will go to B. Or within the output, you can give the conditions. If we satisfy one condition, I'll go to A. If I satisfy another
condition, I will go to node B. In fact, through a couple of examples, we will see this. Otherwise, we can end this
also. So let us see how conditional edges work. As of now, we have seen only
simple graphs. Let us try to complicate it little bit. And while we are doing it, I will also introduce few more
terminologies that are very widely used in Langra. Let's go back to our code file. In that code file, we will go to
Hands-on ATM Transaction Example
example two where it says conditional edges. So all of you come to example two which is conditional edge. Try not to
code it uh code as it is with me. First you try to observe how how am I doing it. later on once you take the notes
once you make all the modifications once you understand what is happening then you can go ahead and code later on so
first as usual once again we will try to import from typing import typed date
from langraph.graph graph import state graph now I'm trying to create a state here so what I'll do is this particular
example we are creating something called ATM state so I have account balance withdrawal amount is authenticated or
not transaction successful or not so account balance is integer withdrawal amount is integer authenticated or not
is boolean transaction successful or not is also boolean now the overall logic
here is if the withdrawal amount is more than more than account balance we want to reject it if the withdrawal amount is
less than account balance balance then we want to accept the transaction. First we will authenticate. So the overall
structure will go like this. I have the first node which will authenticate whether the user enters the right ATM
pin or not. Fine. Once it is authenticated we will hit this node called check balance. If the check
balance uh at the end of it if the routing function gives that okay I have checked the balance balance is higher
than the withdrawal one then I will go ahead to the deduct node. If the balance checked is less than or if the balance
is less than whatever is withdrawal amount then we will reject then we will execute this deduct money node either
that or we will be executing reject transaction node. So let us see that whole process initially I'm not
expecting you to write this code as it is on your own based on this requirement. Maybe you may have to see from me once or twice you may have to
practice then only you will get a complete understanding of it. So first you define the state.
Once you define the state until now I have just uh left it. What you can do is you can create uh in fact you can see
what is happening inside that. So let us try to use this particular
feature called annotations. I would say print ATM state
annotations. So account balance is class type integer
and then integer is authenticated etc. So as soon as you create a state it may be a good idea to check that. Not only
that one of the habit that I have is I will just create some sample state or I will call it as initial state and
actually create that ATM state object. So initial state account balance is,000
withdrawal amount is 200 is authenticated false transaction successful. So if I print the initial state it will look like this. So if I
pass on this initial state it should automatically go to the withdrawal or it should be accepting a transaction because withdrawal amount is 200. later
on if I pass 1200 then it should be rejected but as of now nothing is happening because we have just created the initial state okay now we will
create the nodes it's time for us to create the node we have just created the state now we will try to create the
nodes there will be four nodes four nodes node one authentication node to check balance
node 3 a deduct money node 3 b reject transaction so let us try to create that uh structure I would say we will have uh
node one which is related to authentication
node two that is related to check balance node 3 A now this is 3 A I'm
saying because one of these uh nodes one of either 3 A or 3 B can happen node 3 A
is your deduct money
node 3B is a reject transaction
You don't want to let that transaction go through.
Applying Type Hints and State Annotations
So node one authentication def authenticate
state ATM state. So until now we have written this as simply state. State state is the input. But now what we are
doing is I'm saying the state must be of the structure as ATM state. This is known as type hint in the technical
terms or it is also known as type annotation. You're annotating you're telling the state whatever you're
passing on it has to be exactly like the ATM state. That means it should have account balance in integer format. It
should have withdrawal amount in integer format. It authentication should be in boolean format. So this is known as type
hint. You want your state to be exactly precisely like this. The structure must match with ATM state only. If you are
giving this structure food order then it will fail. Or if you are giving this as input to that particular graph like you
may think that graph takes something as input. Graph takes state as input. So here I'll come here and say my graphs
take uh state as input. I will directly go ahead any input as a state. It may not work. You have to give ATM state
structure only. How do you force it? By using this type hint. So type hint is a way to tell Python that I want this
structure only by this authenticate function. It should take state as input and it should be in ATM state structure
only. It should have exactly four values and they have to be in that particular format. So as soon as you go to this
authenticate function or later on it is going to be node. We will be printing authenticating user. It is always a good
idea to print what that node does. We can write a simulator in checking uh
function but right now we are not yet doing that. We're just taking static nodes which will just do one particular
job. So what it'll do is it will go to is authenticated and it is going to make it true. So that means whichever user
comes in we are simply saying you are authenticated you're authenticated everybody is authenticated and I have created an initial state which has 1,000
account balance which has withdrawal amount 200 is authenticated is false as soon as we pass on this initial state so
what I'm saying is state after authenticate so I will take this authenticate so what I'll do is this is
our first node once that node is created this is simply checking how that node is working so
how is this node working I will take this authenticate I'm passing on initial state. What is initial state? Account balance 1,000, withdrawal amount this
one, this one, etc. So once you pass it on the initial state, the state will be updated authenticating the user. Uh
account balance is,000 as per initial state, withdrawal amount is 200 as per initial state. And then is authenticated
true. So the only thing that has happened is is authentication earlier it was false. Now we are making it as true.
Is transaction successful? False. It is giving us false only. We haven't really checked the transaction yet. Now I will
check the check balance def check balance. If the account balance is
greater than withdrawal amount greater than or equal to withdrawal amount, I will say transaction successful. Else I
will say transaction successful is false. So what I'm doing in this
particular node is whether we are kind of checking the balance. If the account
balance checking with the account balance I would say if the account balance is greater than withdrawal amount then we will go to a particular
uh one which is transaction successful I would mark it as if the account balance
is more transaction successful will be marked as true otherwise that particular uh key will be marked as false once I
execute this and then if I do a similar stuff here but this time I will check check balance hey what happened to check
balance I'm passing on initial state since I'm passing on initial state uh to
this check balance. So it is going account balance is 1,000 withdrawal amount is 200 is authenticated right
now. The only thing that will happen here is this check balance is uh given as true because we have taken withdrawal
amount is 200. Let me take another state or initial state itself. If I put 1200 here and then if I pass on that initial
state then it is saying transaction successful is false because we are
taking withdrawal amount is 1200. So it will be taking as false. Again this is
just a node and this is not the graph execution. We are just on the fly we are checking how the functions are working
with a sample initial state. Later on in the graph this will be connected to this. This will be connected to this. All those connections will happen. This
is just on the fly checking only quickly debugging whether each of the node each of the function is working or not. Now
node 3 a which is deduct money. Node 3 which is reject. So let us write the function for deduct money. Simply
whatever is the account balance minus withdrawal amount is what the deduct money node is going to do. Deduct money
take the state as input ATM state. The beauty of lang graph is everywhere it is state and state is sharing the memory
across all the nodes. So the output of authenticate is not the input of check balance. The output of check balance is
not the input of deduct money. That is a confusion people tend to have. Whenever lang graph is seen people think that
state will first go here and authenticate will output the state. The output of authenticate will be input of
check balance. The output of check balance will be input of this. No, that is not true. State is like a canvas. So
here this will do something to the state. Again this node will do something to the state. So at any point every node
has access to the state. It's not like one of the nodes output is other nodes input. That is a wrong understanding.
State is like shared memory across all the nodes. As of now we have created uh
our authentication check balance. Now deduct money. What are we doing? We are creating a node called deduct money
which is taking state as input. And what all we have in the state we have uh account balance withdrawal amount is
authenticated transaction successful. So if the account balance so whatever is
the account balance if it is higher then we will be getting into this node. We haven't yet decided that routing logic.
So as of now if somebody hits deduct money if somebody hits that deduct money node automatically after checking
balance if we hit that deduct money node then this will happen what will happen your new account balance so we will go
to state account balance we will update it with whatever is the original account balance minus the withdrawal amount. So this is the updated account balance and
transaction successful we will say transaction is successful and we will mark it as true and then we will return
that state and rejection means we will take a similar function we will say we will not be able to deduct any money. We
will say print rejecting the transaction. We will say transaction successful will be marked as false and there will be no change in the account
balance. We will not be making any updates. So totally we have created four nodes. First we will authenticate then we will check the balance. Then either
we will hit the deduct money node or we will hit the reject money node or reject the transaction node. Now we will write
the most important or the new concept called the routing logic. So this is
routing function or the routing logic.
Implementing Logic and Building the Graph
def decide next. You can give any name here or def routing or what next or the
transaction decision or something like that. I'm naming it as a decide next
and this is also taking mostly most of the AJS almost every function takes the state only as input because state is the
one that keeps the keeps track of all the pieces of information and that is the beauty that is what we want in
future later on if we want to take the memory into account if you want to keep the right context it's better that we
keep all the required information in a central repository from there whatever pieces needed we can take every node can
take from there so I will write state it must be ATM Right? If the transaction is
successful equal to true then whenever it says transaction successful then you simply return deduct. So what this
function does it will return two words one is a deduct the other one is reject. If the transaction successful
automatically transaction successful equal to true that means we have checked the balance and it is more than the withdrawal balance. So this function is
giving us two values at the end. If the transaction successful in the state, if it says transaction is successful, we
will deduct. We will just give a word as output called deduct. Otherwise, we will give a word called reject. If you want
to quickly test this, so this is the function. If you want to quickly test this function, until now, we have written a couple of test cases. So these
are the two test cases that we have written. We will once again write one more test case. I will say decide next.
And then if I give initial state. So there we have seen transaction successful equal to true then only
deduct. But here in transaction successful like if you see the initial state if you try to print that initial
state the transaction is transaction successful it is false. That is the reason why it is returning reject. If
transaction successfully equal to true then it will reject. It will give the output accept. So this is a very simple
function. This will be the routing function which will be used later on. This is a simple function. It is returning two words. One of the two
words either deduct or reject. Now let us create the graph. Then we will be connecting all of those. We will create
the graph and we will be connecting those nodes and edges. So the graph is I
would say my workflow equal to state graph ATM state. I want to create a
state graph and it is stay starting with uh ATM state is the structure that we have to follow. We will put all the
nodes later on we will add the connection logic. So all the nodes there are four nodes that we have created.
Workflow.add node. First node is authenticate, check balance, product money, reject transaction, four nodes
need to be added. Authenticate, I would say authenticate node. But by now you know what is all of this about simply I
can say either authenticate or authenticate node. Check balance node, deduct money node, reject transaction
node. This is a function. This is the name that we have given. Later on I will be referring to this particular name. So
these are the nodes. Now we will start the edge connections. Initially let me
set the start point. You can set it later on also. Even if you do not do it also automatically
langraph tend to set it. Start entry point is authenticate. That means after start you will be connected to authenticate. Now after authenticate you
will be connected to check balance. So workflow addage authenticate and check balance both of them will be done. And
then comes the actual complicated node which is conditional edge. Because once
you are done with check balance you cannot directly connect it. Check balance can be connected to deduction of money. Check balance can be connected to
rejection of transaction. So let us say conditional edge.
I want to add a conditional edge. So edge means you are giving two nodes. So here try to understand I want to connect
check balance node. Check balance node I want to connect it
to deduct money. either that or I want to
connect check balance node with reject transaction. So usually when you are
adding an edge so node one node two you will say check balance deduct node one is check balance node two is reject. So
that is usual edge but here it is conditional edge that means your node one will be anyway check balance. So you will write like this workflow dot add
conditional edge the first one is check balance then you write the router function. What is a router function?
Decide next. And what does it give? Deduct or reject. So if it gives deduct as the output and it should match. So it
says if it gives deduct as the output then what is a node that I'll go to? Deduct money. If that gives reject as
the output then I will go to reject transaction. So this node is connected to either deduct money or reject
transaction. Usually when you are adding an edge one node node one and node two is what you will give. here node one and
node 3 a or 3b based on this function. So you write the node name then you write the function and then the function
is rejecting two uh the function is giving us two values. It is resulting in two values either deduct or reject. If
it is deduct then detect money node will be taken. In fact once we are done with this we will connect both of them to end
points. This will once you go to deduct money also you will go to end. Once you go to reject transaction also you will go to end. In fact there is uh something
called start and end automatically the way that we have taken start graph from lang graph.graph. We can also get start
and end nodes are also available there. So you can simply say state graph comma e and d upper cases. So instead of
saying end my graph you can say this can be connected. So I will add one more edge workflow dot add it deduct money is
connected to end node. Reject transaction is connected to end node. Either you go to this one or this one. Both of them will be going to end node.
Once you compile if everything is working fine there will be no problem. Then once you print that then you will
see that start node is connected to authentication that is connected to check balance. After that router function the router function is not
shown on this one but router function gives deduct or reject. If the router function says deduct we go to deduct
money node. If it says reject we go to reject money node. Or if we say the names here as the router function decide next it says that uh option one. And if
it says option two, option one is like uh if the transaction successfully is
true that means we go for deduction. So in that case it should match here. Here whatever we are saying earlier we
have created that that is why it is working. So let me create a new one. Let's say decide next one. Now if I'm
using decide next one if I try to
since we haven't updated here we have to put one and two here. Once you do that even on the graph it will be updated. So
next time onwards whenever there is one then it will be deduct money if it is option two then it will be reject
transaction. So whatever is the output here it should match exactly this one.
So otherwise which node to go when that conditional will not be able to decide. So we will keep it back to the original.
So we will keep it as decide next only. Decide next will give us two values either rejection or acceptance. So
deduct or reject will be the output. So once you have constructed your overall graph and our app is also ready now we
are ready to test it with a couple of uh sample states already we have created one sample state called initial state
account balance is 1,000 withdrawal amount is 1 1200 I think if we run it through our app if we invoke it then it
should work let me just delete these two and then this is our initial state anyway if you print the initial state you can see that account balance 1,000
withdrawal amount 1200 authenticated false transaction is false so let me simply Say my result is equal to app dot
invoke. You can write this whole thing here inside this or you can simply say initial state. And then if I simply say
initial state, we'll first go to the first node. First node prints authenticating user. And then we'll go
to the second node. It says checking the balance. Third node. Here the conditional routing will happen. It says
rejecting the transaction because it says withdrawal amount is 1200. Withdrawal amount is 1,200. It is
rejecting the transaction. Is authenticated? True. Is transaction successful? False. That is why it has
gone to the reject transaction node. If we change it slightly, if I create another state, let me call it as a
sample state. And then here if I give withdrawal amount is actually 500.
If I give that, in fact here I have to make it as sample state. Account balance 1,000. Withdrawal amount is 500. Is
authenticated. False. transaction successful false and it says withdrawal amount is 500 since we have given s
transaction oh simply I'm just printing the sample state here what we should do is I have to say app dot invoke so let's
invoke this app for this sample state now see the result account balance has
now become 500 earlier it was 1,000 in the beginning but it has become 500 state got updated this particular value
withdrawal amount is 500 authenticated true so this is at the end of this at the end of your result. This is a
result. So, transaction successful is equal to true. Again, what I'm trying to tell you here is we are just getting a
hang of what is a state, how the stateful memory flows from one node to other node, how the shared memory
concept works, how this conditional edges work. We haven't yet really
reached an AI. We are itching to get started with AI node. Probably our next exercise we are going to get into LLM
node very quickly. We will let the LLM tell. We will add brain to this whole system. But before that I want you to
make sure that you understand whatever is happening here. So try to go through it a couple of times here. When we are
talking about a conditional edge we have to create a router function what should happen and then based on that only that
router function gets into this conditional edge as input. You have node A and based on the conditional function
that you have created earlier you can get into either node uh 3B or 3 A
depending on whatever is the condition that you are getting. So generally we tend to give a type in called lit which we will do it later on otherwise if you
keep these consistent that is also fine deduct reject and the same names should be used here and these names are the
names of the nodes they should also match let's say if I make this as deduct money one or rejecting transaction if
you write it like that if you just execute it says that I don't know what is deduct money one check balance node
and deduct money branch out deduct money one I don't know what is that let's say if you fix that then the next one will be giving you an error I don't know what
is reject transaction node So the names of these nodes should exactly match perfectly otherwise it will throw an
error and these names deduct and reject they should also match with whatever our conditional routing function values are.
So try to do this exercise do this example then we will go to our next section which is adding an LLM node.
Slowly we will get into this AI agent as soon as possible.
Lab Exercise: Customer Service Ticket Classifier
Let us do one lab exercise to get a better understanding of uh conditional edges. So you're supposed to create a
graph which has conditional edge in it. So we are going to do a customer service type of or customer care agent type of
graph here. Not really getting into lms and all that. So what we need to do is we need to create a type dictionary
which says ticket state and it has issue type assign team and ticket status. If
the issue type is technical, it should be assigned to technical team and if the issue type is billing related and it
should then it should be assigned to billing team. So all the instructions are given one by one here. First you
create the state and then create a node function called classify the issue that checks the issue type and assigns
technical team or billing team to the exact assigned team and then create a node that is called assigned technical
team. This is where the actual bifurcation happens. If it says that either assigning to technical team or
the actual billing team and then we may have to route that router function depending on the issue type. If the
issue type is technical then uh we have to get into technical or if it is billing we have to get into the billing
side bill state graph using the ticket state and all the nodes. So you start with the ticket state try to go through
each and every instruction here very much carefully and then try to create this particular graph. I'll be showing
the solution but before that give it a thought. Make sure that you attempt it and then you go through the solution
that I'm going to give you right now. So I'm at this section lab exercise which lab exercise after example two before
example three lab exercise conditional ages that is where I am. So let me add a lot of code cells and try to write from
typing import type date and then instead of ATM state I will be writing ticket
state. My ticket state
it will be a typed take and issue type is a string. Assignment team or assigned
team that is also string and ticket status is also string. We can quickly test that. Usually what we do is initial
state we can fill it with some values. I would say initial state is it's a technical team assigned to nothing and
ticket status is nothing. So issue type is technical. So ideally this initial state or let me say sample state. So the
sample state or sample ticket should be assigned to technical team ideally. So let's create the nodes. So you will have
node one. So that is uh classify the issue. So we
have only two nodes. Node one is connected either 2 A or 2 B. Classify the issue. Once you classify the issue,
so either technical or billing then you would say node two that is assigned to technical team
assigned to tech team and then this is 2 A node either tech team or node 2 B
which is assigned to billing team.
So first we will classify the issue. We will write a function for classifying the issue def classify the issue. And
I'm taking a ticket uh state as the input. Print classifying the issue. I'm just printing whenever this function is
being called. If the issue type is technical then assign team I'll go here. As of now that is blank. Uh in the
sample state I will just mention as technical and then issue type is technical then assign team will be
technical. So else how do we write else? If the issue type is billing team, in fact you can directly write else assign
team equal to billing or to be on the safe side, we can write the name of the issue as well. So else you are assigning
it to billing team. Finally return the state. So if you just want to quickly check whether this is working or not, I
will say classify the issue. Now what is the state that we'll pass on? We will pass on this state called sample state.
sample state sample state I will get it here and put
it here and then it will say sample state since it is technical assigned team is technical if I say HR then also
it will be assigned to billing only because we just wrote the else condition so if I say HR since it is non-technical then it'll be simply assigned to billing
billing team but let me keep that technical back so this classify issue is working now
let me write node two way either assign it to technical team or assign it to billing team and then I will say ticket
stats. So we just need to go here ticket status is yes we are done I am done with this node assigned to technical team or
ticket status is assigned to billing team. So I will simply say define a node
or define a function assigned to technical team. Take the state as input. If ticket status is if the ticket status
we have to check like we will be writing if then else in the router function. But here simply if you reach this node
automatically ticket status will be assigned to technical team. Automatically you will be doing that. In
fact the same way if you reach that billing one if you reach here automatically it is uh assigned to the
billing team. So if you come here automatically ticket status will be changed. If you come here automatically
ticket status will be changed to billing team. But which node to come that is where the actual condition this whole
exercise the lab exercise is about writing the routing function. Let me write that routing function
defither assign to. So you can write decide the ticket path. So you will take the input
as ticket state. If it says assign team is technical team. So here we have done
that. If it is technical then we will say assign team is technical team then I would say technical or billing. Either
you can put a condition on this or you can put a condition on this as well. issue type if the issue type is technical then return technical
otherwise you return billing any one of them so this will also work as routing function or other one also because you
are taking state as input in the state there are three values one is issue type assign team and ticket status you can
use issue type as well for routing or you can use assign team also for routing I'm using assign team for routing you
can go to technical team or you can go to billing team that is a routing function now it's time to quickly create
this graph you can check whether this decide ticket path is it working or not by giving our
sample state.
So it's going to billing because we have earlier taken as HR. So now if I execute
it since it is technical then it will say technical sample state assign team since uh we
haven't done this one. So issue type is not the one after executing this only it will come here probably I will also
apply classifying issue. So on that sample state first I'll classify the issue that will actually change the
sample state and then that will be indeed given to decide ticket path. You try to understand what's happening here.
First I have classified the issue there. We will go to assign team and technical and return a state. So that state is
further passed on to decide ticket type and then that is technical. Now we will
try to create the graph. As usual, we'll say my workflow
is equal to stateful graph state graph. We will add 1 2 3. So, node 1, node 2 a,
node 3 b, node 2 b. So, add node classify issue, assign technical team, assign billing team
and then we will get into edges. First edge like entry point is direct
workflow dot set entry point. Your entry point is classify the issue
and then classify the issue is connected to either assign technical team or billing. So that means here we are going to create a conditional age. Conditional
age the first age is classify issue and the function name is decide ticket path. Decide ticket path. It gives us either
technical or billing. If it gives technical I will go to assign technical team. If it is a billing I will go to assign billing team node. Once you're
done with that condition is done then you connect both of those to end. And then finally you compile it and try to
draw it. Start classify the issue uh and the routing function not shown here but that is hidden. If the routing function
returns billing go to assign billing team. If the routing function returns technical go to the assign technical team node and then finally you're going
to end. After that I will just test it with our sample one. So I will write once again sample state. Sample state is
a technical nothing nothing. So I would say my result
equal to app.in sample state issue is technical assigned team is technical ticket status is assigned to
technical team let's say if I say HR since we are saying either or or let us see what does it give us. So anything
that is other than technical is assigned to billing team. If this is billing team assigned to billing team. So
even if I say everything as HR HR HR it doesn't matter because whatever you
are giving it as initial that doesn't matter later on that will be accessed and it will be changed to depending on
whatever you are giving in this logic. So if you say technical no matter what you give finally assign to technical
team technical assigned to technical team assign to technical team. I want you to take these four exercises
Key Takeaways and Preparing for AI Agents
like we have done basic langraph example and then lab exercise conditional age
and then lab exercise of conditional age. There is nothing much to learn in terms of the AI agents here. But there
is a lot to learn about langraph and its architecture and people really give up in langraph because of these things only
because of the state how to build the graph. People say learning langraph there is a steep learning curve. But I
can promise you if you go through these four examples once again if you do these two lab exercises and two examples I
have given maybe you just do not give it up right now. You try to go through this couple of times if you're comfortable
then you can follow the rest of the course quite easily. If you leave this, let us suppose if you have some doubts, if you're not able to understand
whatever I have taught here and it is not very clear, then do not proceed further. Stop here. Make sure that you
use some other resources. Make sure that you do some internet searching. You may use chatb you may use claude. Take my
code, put it in the cloud. Try asking claude to explain you or try asking Chad GP to explain you each line by line
code. Ask each and every question that you have related to the concepts that I have discussed until now. There should
be zero compromise on whatever we have discussed until now. before you go to the next step because the next step is
going to be LLM node we are slowly entering the AI agents AI tools rag etc
there I'm going to assume that you already know what is a state you already know what is a graph you already know what is a conditional edge how do these
work so this is a kind of uh the initial basics of lang graph uh that I have
given you the fundamental primitive concepts or the building blocks the basic components that we have discussed
once you are good with basic components you are good to go with the actual lang Lang graph agentic workflows.
Conditional edges are one of the most important topic within langraph. [clears throat] You will find conditional edges in multiple other AI
agents that we are going to create in future. There will be so many graphs where you will be finding conditional
edges. Make sure that you understand this concept thoroughly before going ahead. We haven't yet started AI agent.
For that we need to have LLM node. For that we need to have tool nodes. And then we are going to connect them later
on. We are going to get there. But these fundamentals like what is state, what is age, what is conditional age. You have
to be very confident in these topics for you to proceed further.

```
