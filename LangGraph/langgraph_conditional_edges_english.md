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

