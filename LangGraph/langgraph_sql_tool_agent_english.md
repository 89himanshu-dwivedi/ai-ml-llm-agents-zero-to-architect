# LangGraph SQL Tool Agent — English Notes

## 1. Quick Summary
A SQL Tool Agent translates natural-language questions into SQL, executes the query against a database, and returns a human-readable result. The transcript builds the example around a healthcare Electronic Health Records (EHR) SQLite database.

Core workflow: **User Question → List Tables → Get Schema → Generate SQL → Execute Query → Result**.

## 2. Project Goal and Use Case
- The user asks a database question in plain English.
- The agent inspects the actual tables and schema before writing SQL.
- The generated query is executed and the result is returned.
- Example entities include patients, providers/doctors, encounters, departments, diagnoses, vitals, medications, allergies, lab orders, and lab results.
- LangGraph provides an explicit, repeatable, inspectable workflow that is easier to debug node by node.

## 3. EHR Database Overview
The transcript mentions tables such as `patients`, `providers`, `departments`, `encounters`, `diagnosis`, `allergies`, `lab_orders`, `lab_results`, `medication`, and `vitals`. `encounters` is described as the central transactional table representing patient-doctor visits and related clinical interactions.

## 4. Architecture / Nodes
1. **List Tables node** — obtains the available table names.
2. **Get Schema node** — inspects table/column names, data types, keys, and optional sample rows.
3. **Generate Query node (LLM)** — uses the user question, schema, and strict SQL rules to generate SQL.
4. **Execute Query node** — runs the generated SQL through the database tool.
5. **END** — the query result is available in state for the final response.

Graph path: `START → list_tables → get_schema → generate_query → execute_query → END`.

## 5. Database Connection and Toolkit
The transcript uses SQLAlchemy `create_engine` to connect to the SQLite database and a LangChain `SQLDatabase` wrapper to make it compatible with the toolkit. An option such as `sample_rows_in_table_info=3` can include sample rows with schema context; more sample rows can increase prompt tokens and cost.

Tools listed from the SQL Database Toolkit:
- `sql_db_query` — executes a query
- `sql_db_schema` — retrieves schema information
- `sql_db_list_tables` — lists tables
- `sql_db_query_checker` — optional query-checking tool

## 6. State and Message Handling
- A custom state can use `TypedDict` with `Annotated[list, add_messages]`.
- The transcript also introduces LangGraph's built-in `MessagesState`/`MessageState` alternative, with a built-in message reducer.
- Nodes return or append outputs to messages so later nodes can consume earlier outputs.
- Manually extending a sample state is shown for notebook testing; in graph execution, LangGraph orchestrates state updates.

## 7. Safe SQL Generation Rules
Prompt guardrails in the transcript:
- Generate **only `SELECT` queries**.
- Do not use `INSERT`, `UPDATE`, `ALTER`, `CREATE`, or other data-changing/destructive operations.
- Use only tables and columns present in the schema.
- Return only the SQL query.
- Query validation before execution is suggested as an optional improvement.

### Practical Production Safety (Additional Guidance)
- Do not rely on prompts alone: give the database connection read-only permissions.
- Validate SQL with a parser/allowlist; enforce single-statement execution, permitted tables/columns, `SELECT` only, and query limits.
- Use timeouts, row limits, audit logs, sensitive-column controls, and parameterized values.
- Patient/health data is sensitive: apply access controls, data minimization, masking, and applicable compliance requirements.
- Treat user questions and database content as untrusted input; address prompt-injection and data-exfiltration risks.

## 8. Graph Orchestration
- Initialize `StateGraph` with the message state.
- Add `list_tables`, `get_schema`, `generate_query`, and `execute_query` nodes.
- Connect sequential edges: START → list tables → schema → generate query → execute query → END.
- Compile the graph, inspect its diagram, and test it with `invoke`.

## 9. Test Examples in the Transcript
- “How many patients are there?” — the transcript's demo result is 1,000 patients.
- “How many doctors/providers are there?” — the transcript's demo result is 60.
- “Count of providers in each department; show the top five departments by name and count.”
- “Count of patients by gender” — transcript result: Female 348, Male 333, Others 319.
- “Top five departments with the highest number of providers.”
- “How many encounters are recorded by each encounter type?” — an example involving ER, IPD, and OPD categories.
- “Average age of patients by gender.”

*These are results reported for the transcript's demo dataset; do not assume the same values for another database.*

## 10. Optional Query Checker / Retry Loop
The transcript suggests checking generated SQL with `sql_db_query_checker`. If the checker identifies a problem, a conditional edge could route the workflow back to regenerate SQL and then execute it. This additional loop is not implemented in the demo shown.

## 11. Common Gotchas
- Doctors may be stored under the table/entity name `providers`; inspect the schema.
- Generating SQL without schema context can lead to incorrect table or column guesses.
- Sample rows may improve accuracy but increase token usage and cost.
- A query checker is optional, but production permissions and validation remain necessary.
- Never assume LLM-generated SQL is inherently safe or correct.
- Demonstration counts depend on the dataset.

## 12. Interview / Revision Questions
1. What is the end-to-end flow of a natural-language-to-SQL agent?
2. Why fetch tables and schema before generating SQL?
3. What roles do SQLAlchemy and the LangChain `SQLDatabase` wrapper play?
4. What are the four tools in the SQL Database Toolkit?
5. What is the benefit of `MessagesState`?
6. Why are database-level read-only permissions necessary in addition to a prompt-level `SELECT` restriction?
7. How could a query checker be added to the graph?
8. How should ambiguous questions and unknown schema names be handled?
9. What security controls are needed for sensitive healthcare data?
10. What is the benefit of inspecting/debugging a sequential workflow in LangGraph?

## 13. Board-Level Answer
A LangGraph SQL Tool Agent converts a natural-language request into a database answer through a controlled sequence: discover tables, inspect schema, generate constrained SQL, validate it, execute it using least-privilege database access, and return a bounded result. LangGraph makes the steps observable and modifiable. Production systems should enforce read-only permissions, query validation, limits, timeouts, auditability, and sensitive-data controls rather than relying only on an LLM prompt.

## 14. No-Skip Checklist
- [ ] Project purpose and safe-SQL goal
- [ ] EHR database and entities
- [ ] SQLite / SQLAlchemy connection
- [ ] `SQLDatabase` wrapper and sample rows
- [ ] LLM and state / message reducer
- [ ] SQL Database Toolkit and its four tools
- [ ] List tables node
- [ ] Get schema node
- [ ] Generate SQL prompt and restrictions
- [ ] Execute query node
- [ ] Sequential graph, compile, invoke
- [ ] Simple, ambiguous, and aggregate test questions
- [ ] Optional query checker / retry idea
- [ ] Original transcript preserved in Appendix A

## 15. Additional Points Added (Separate from Original Source)
The production safety recommendations in Section 7 and the gotchas/interview questions above are explanatory additions. They are not claims that the transcript demonstrated all these controls in code.

## Appendix A — Original Source Preserved
The transcript below is preserved with its source wording, sequence, and repetitions. Spelling/recognition errors present in the automated transcript have not been silently corrected.
