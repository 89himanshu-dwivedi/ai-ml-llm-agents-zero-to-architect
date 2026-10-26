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

