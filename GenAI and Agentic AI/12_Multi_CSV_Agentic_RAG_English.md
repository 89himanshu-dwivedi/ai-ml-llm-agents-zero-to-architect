
# Multi-CSV Analysis, Custom Tools, Agentic RAG & Multi-Agent AI — English

> **Source coverage:** The uploaded transcript is fully preserved verbatim at the end. The study sections above reorganize the material for learning without silently omitting source content.
>
> **Important:** “Assistant-Added Study Guidance” is clearly separated from transcript-derived material.

## 1. Multi-CSV File Analysis

Multiple CSV files can be analyzed through an AI agent in a way similar to single-file analysis.

Example files:
- `orders.csv`
- `slots.csv`

Both paths are supplied to the CSV agent. Internally, the files are read as DataFrames. Natural-language questions can then be answered by generating and executing Python code against those DataFrames. fileciteturn4file0L5-L14

```text
User Question
     ↓
AI Agent
     ↓
CSV Files → DataFrames
     ↓
LLM understands requirement
     ↓
Python code generated
     ↓
Python executed
     ↓
Result
     ↓
Plain-English Answer
```

## 2. CSV Agent and Toolkit

In the transcript's LangChain terminology, this type of system is described as a **toolkit**: a collection of multiple tools. Internally it may use Python, calculator, SQL, and other capabilities. In general terminology, it may be called a CSV analysis agent. fileciteturn4file0L15-L23

## 3. ReAct Agent

**ReAct = Reasoning + Acting.**

The agent reasons about the user's requirement, chooses an action/tool, executes it, observes the result, and continues until it can produce an answer.

```text
Question → Reason → Action → Observation → Reason → Final Answer
```

## 4. `allow_dangerous_code=True` and Security

CSV/Pandas agents may generate and execute Python. The transcript explains the security concern behind the explicit `allow_dangerous_code=True` option.

Potential risks mentioned:
- Prompt injection
- Unauthorized operations
- Database damage
- Access to restricted website locations/resources
- Dangerous scripts/code execution

Therefore, these agents must be used carefully, especially around sensitive data. fileciteturn4file0L25-L36

> **Key idea:** Python execution gives the agent power, but also creates a security boundary that must be controlled.

## 5. Questions Across Multiple CSVs

A user can ask:

> What column names are common in both datasets?

The agent can generate logic conceptually similar to:

```python
common_columns = set(df1.columns).intersection(set(df2.columns))
```

The transcript demonstrates this kind of generated DataFrame/set-intersection logic. fileciteturn4file0L39-L55

## 6. Natural-Language Joins

A user can ask:

> If I perform an inner join based on unique ID, how many records will be in the resulting dataset?

The agent can merge the DataFrames, apply the join, calculate the result, and return a plain-English answer. Outer joins can be handled similarly. fileciteturn4file0L56-L60

## 7. The Bigger AI-Agent Vision

The transcript describes a long-standing vision:

```text
Plain-English Requirement
        ↓
Convert to Code
        ↓
Python / SQL / Java
        ↓
Execute on Data
        ↓
Interpret Output
        ↓
Plain-English Answer
```

What once looked like a difficult dream is becoming practical with agentic systems. At the same time, the transcript emphasizes that security concerns are a major reason organizations remain cautious. fileciteturn4file0L61-L79

## 8. Turning the Agent into a Web Application

The agent can be hidden behind a normal web or mobile interface.

```text
Web/Mobile UI
     ↓
Upload CSV
     ↓
Ask Question
     ↓
Backend Agent
     ↓
Tools / Python / LLM
     ↓
Data Analysis
     ↓
Answer
     ↓
UI
```

The end user does not need to see the agent internals. fileciteturn4file0L80-L100

## 9. Cloud Deployment

The transcript describes a simple application structure:
- `requirements.txt` for packages
- `app.py` for application logic
- Environment variables for API keys
- Cloud infrastructure
- Hugging Face Spaces as an example

Conceptually:

```text
Cloud Application
├── requirements.txt
├── app.py
└── Environment Variables
      └── API Keys
```

The transcript also discusses larger compute/RAM/storage requirements when user volume grows. fileciteturn4file0L84-L106

## 10. Deployed CSV Analysis

A user can upload a CSV and ask natural-language questions such as:

> What are the minimum, maximum and average values of age?

The backend agent performs the analysis and returns the answer in the UI. fileciteturn4file0L107-L116

## 11. AI Agents Inside Applications

The transcript presents a future in which applications contain agents that understand natural-language requests and interact with APIs.

Movie-booking example:
- Day
- Time range
- Movie
- Family requirement
- Seat constraints
- Availability
- Booking

MCP is introduced as an important concept for making multi-API interaction easier. fileciteturn4file0L117-L130

## 12. Custom Tools

If no ready-made tool exists for a specific business task, create a custom tool.

Transcript examples include:
- Extracting a particular heading from scanned documents
- Extracting usernames
- Processing insurance claims
- Extracting selected fields from reports
- Looking for specific information in X-ray/report workflows

The task can be implemented as a Python function and exposed as a tool. fileciteturn4file0L132-L152

```text
Business Logic
     ↓
Python Function
     ↓
Tool Decorator
     ↓
Agent Tool
     ↓
Agent Selects It
```

## 13. Tool Descriptions Matter

The transcript demonstrates a custom date tool alongside Wikipedia.

If the user asks:

> What is today's date?

the agent should recognize that Wikipedia is not the appropriate capability and select the date tool.

A good tool description should explain:
- What it does
- When to use it
- What input it needs
- What it returns
- What it should not be used for

This description helps the agent select the appropriate tool. fileciteturn4file0L166-L181

## 14. Agents Can Make Mistakes

The transcript shows that an agent can sometimes obtain the right intermediate observation but still return a wrong conclusion.

```text
Thought
 ↓
Action
 ↓
Observation
 ↓
Thought
 ↓
Final Answer
```

Possible future mitigation approaches discussed:
- Run the same task through multiple agents.
- Compare outputs.
- Use manager/reviewer agents.
- Use supervisor agents for validation. fileciteturn4file0L184-L199

## 15. Pre-existing AI Agents

Organizations do not always build every agent themselves. The transcript describes searching for existing agents, evaluating them, and potentially licensing them.

For data analysis, the **Pandas DataFrame Agent** is introduced. It can generate Python code against a DataFrame and return the result. fileciteturn4file0L200-L227

```text
CSV
 ↓
Pandas DataFrame
 ↓
Pandas DataFrame Agent
 ↓
Question
 ↓
Python Code
 ↓
Execution
 ↓
Answer
```

## 16. Agent Limitations

Important limitations demonstrated in the transcript:
- Wrong answers
- Iteration limits
- Time limits
- Token/rate limits
- Model context-length limits
- Occasional success after rerunning the same agent

Agents are powerful, but not guaranteed to be correct. fileciteturn4file0L228-L249

## 17. Real-World Misuse and Side Effects

The transcript discusses AI-generated fake media and fraudulent use cases as examples of how powerful AI can be misused.

```text
More Capability
      ↓
More Automation
      ↓
More Power
      ↓
More Potential Misuse
```

## 18. Agentic RAG

A major concept is **Agent + RAG**.

Normal RAG directly retrieves information from a knowledge base.

Agentic RAG makes RAG one of the agent's tools, so the agent decides when to use it.

```text
                 AI AGENT
                    |
        ┌───────────┼───────────┐
        ↓           ↓           ↓
     Tool 1      Tool 2       RAG
                                  |
                                  ↓
                         Private Documents
```

fileciteturn4file0L256-L283

## 19. Why RAG Matters in Companies

Companies usually want agents to focus on their own data rather than the entire world of information.

Examples:
- Internal policies
- Contracts
- Product documents
- Client information
- Financial reports
- Private PDFs

## 20. Agentic RAG Decision Flow

```text
User Question
      ↓
    Agent
      ↓
Is RAG appropriate?
      |
   ┌──┴──┐
  YES    NO
   |      |
   ↓      ↓
  RAG   Other Tool
   |      |
   └──┬───┘
      ↓
 Final Answer
```

Airline example:
- Cheapest flight → flight/database tool
- Cancellation policy → RAG over terms-and-conditions PDF

The RAG capability is simply one tool among several. fileciteturn4file0L263-L278

## 21. Regular RAG — Five Steps

The transcript recaps five RAG stages:

1. **Load documents**
2. **Chunk documents**
3. **Create embeddings**
4. **Store in vector database**
5. **Retrieval Q&A**

The Microsoft earnings transcript example contains:
- 39 pages
- Approximately 750 lines
- Approximately 8,000 words
- 10% chunk overlap

Vector-store examples mentioned:
- FAISS
- Chroma
- Pinecone

fileciteturn4file0L284-L305

## 22. Convert RAG into a Tool

Existing retrieval/Q&A can be wrapped as a tool.

```text
Documents
 ↓
Chunks
 ↓
Embeddings
 ↓
Vector DB
 ↓
Retriever
 ↓
Q&A Chain
 ↓
RAG Tool
 ↓
Agent
```

The tool description should tell the agent exactly when to use it, e.g. only for Microsoft earnings questions. fileciteturn4file0L305-L317

## 23. Microsoft Earnings Agentic-RAG Example

Question:

> What is happening with Copilot adoption?

The agent can reason that the Microsoft earnings RAG is the appropriate tool, send the query to it, observe the retrieved information, and produce a final answer. fileciteturn4file0L317-L325

## 24. Multiple Tools

Example tools:
1. Microsoft Earnings RAG
2. Yahoo Finance

The agent can route:
- Earnings questions → RAG
- Stock/news questions → Yahoo Finance

fileciteturn4file0L326-L340

## 25. Tool Capability Mismatch

A key limitation demonstrated in the transcript:

> Having a tool does not mean the tool has the exact capability required.

The demonstrated Yahoo Finance News capability struggled with an exact current stock-price query.

## 26. Complex Multi-Tool Queries

Example:

> What does Microsoft's latest financial report say? Compare it with Google.

This requires:
- Microsoft financial information
- Google financial information
- Comparison
- Synthesis

If the available tools do not provide enough reliable Google information, the agent may retry, choose the wrong tool, say it does not know, or provide incomplete output. This illustrates single-agent limitations. fileciteturn4file0L364-L385

## 27. Why Multi-Agent Systems Emerged

A natural next idea is to use multiple agents.

```text
                 User Task
                    ↓
        ┌───────────┼───────────┐
        ↓           ↓           ↓
     Agent 1     Agent 2     Agent 3
        ↓           ↓           ↓
        └───────────┼───────────┘
                    ↓
              Manager Agent
                    ↓
             Review / Validate
                    ↓
               Final Answer
```

The transcript discusses:
- Multiple agents doing the same task
- Comparing outputs
- Manager agents
- Supervisor agents
- Summarization and accuracy checking

fileciteturn4file0L385-L402

## 28. Multi-Agent Orchestration

Multiple agents create a new engineering problem: orchestration.

Questions include:
- How does Agent 1 output reach Agent 2?
- What happens when an agent fails?
- Where is state stored?
- What is the execution order?
- Who validates the result?
- Who produces the final response?

```text
Agent 1
  ↓
Agent 2
  ↓
Agent 3
  ↓
Supervisor
  ↓
Final Result
```

These challenges lead to agentic AI frameworks. fileciteturn4file0L397-L407

## 29. GenAI → AI Agent → Agentic AI

### Generative AI

```text
LLM
 ↓
Generate Response
```

### AI Agent

```text
LLM + Tools + Planning/Action
              ↓
       Autonomous Task
```

### Multi-Agent / Agentic AI

```text
Multiple Agents
      +
Tools
      +
Memory
      +
Planning
      +
Collaboration
      +
Orchestration
      ↓
Complex Task
```

fileciteturn4file0L403-L407

## 30. Agentic AI Frameworks

Frameworks/approaches mentioned:
- AutoGen
- LangGraph
- CrewAI
- MetaGPT
- OpenAgents
- SuperAgent
- n8n/no-code workflows
- MCP as an important related development

The transcript explicitly says not to assume one framework is universally best. Each has strengths and weaknesses. fileciteturn4file0L407-L425

## 31. Framework-Level Observations

| Framework / Approach | Transcript-Level Observation |
|---|---|
| AutoGen | Relatively easy to learn |
| CrewAI | Less code |
| LangGraph | More options, comparatively harder |
| No-code tools | Little/no coding |
| MCP | Important development for tool/API interaction |

## 32. No-Code Agentic AI

No-code means workflows can be created largely through configuration.

```text
Traditional:
Code → Configure → Deploy

No-Code:
Select Nodes → Connect → Configure → Run
```

The transcript discusses n8n as a no-code/low-code approach and notes that people without data-science backgrounds can use such tools to automate work. fileciteturn4file0L413-L430

## 33. Learning Strategy

Do not try to memorize every framework independently.

Build fundamentals:

```text
LLM
 ↓
Prompt
 ↓
Tool
 ↓
Agent
 ↓
Planning
 ↓
Memory
 ↓
RAG
 ↓
Multi-Agent
 ↓
Orchestration
```

Once fundamentals are strong, adapting to another framework becomes easier. fileciteturn4file0L415-L424

## 34. Learning Roadmap

```text
GenAI
  ↓
Single AI Agent
  ↓
Tools
  ↓
Custom Tools
  ↓
RAG
  ↓
Agentic RAG
  ↓
Multiple Tools
  ↓
Multi-Agent
  ↓
Agentic Frameworks
  ↓
MCP
```

The transcript identifies AutoGen, n8n, CrewAI and MCP as upcoming topics. fileciteturn4file0L430-L435

## 35. Simple / Advanced / Super-Advanced

### Simple
- CSV Agent
- Natural-language data analysis
- ReAct
- Tool
- Custom Tool
- RAG

### Advanced
- Multiple CSV analysis
- Multiple tools
- Tool routing
- Tool descriptions
- Cloud deployment
- Agent + RAG
- Agentic RAG

### Super-Advanced
- Multi-agent collaboration
- Supervisor/manager agents
- Orchestration
- Validation
- Enterprise security
- MCP
- Human-in-the-loop
- Evaluation and observability

## 36. Real-World Use Cases

### Data Analytics
CSV → Agent → Python/DataFrame → Answer

### Enterprise Knowledge
Question → Agent → RAG → Internal Documents → Answer

### E-Commerce
Agent → Product Search + Inventory + Payment + Order tools

### Airline/Travel
Flight Search → Database/API  
Policy → RAG  
Booking → Booking API  
Confirmation → Notification

## 37. Errors & Gotchas

1. `allow_dangerous_code=True` creates execution risk.
2. Agents can produce wrong answers.
3. Weak tool descriptions can cause poor routing.
4. A tool may not have the required capability.
5. Iteration limits can stop an agent.
6. Time limits can stop an agent.
7. Token/context limits can break execution.
8. More agents mean more orchestration complexity.
9. Sensitive data requires strong controls.

## 38. Limits

| Limitation | Impact |
|---|---|
| Wrong reasoning | Incorrect answer |
| Tool-selection error | Wrong source/action |
| Capability mismatch | Unable to answer |
| Token limits | Agent stops |
| Context limits | Execution failure |
| Time limits | Agent stops |
| Security risks | Unsafe actions |
| Multi-agent complexity | Orchestration burden |
| Data access | Privacy/security concerns |
| External APIs | Failure/latency |

## 39. Best Option — What to Use

| Requirement | Suitable Approach |
|---|---|
| Simple document Q&A | RAG |
| CSV analysis | DataFrame/CSV Agent |
| One external capability | Tool |
| Custom business operation | Custom Tool |
| Multiple capabilities | Single Agent + Multiple Tools |
| Company knowledge + tools | Agentic RAG |
| Complex parallel tasks | Multi-Agent |
| Complex orchestration | Agentic Framework |
| Many APIs/tools | Agent + appropriate integration |

## 40. Interview Questions — Junior

### Q1. What is a CSV Agent?
An agent-based system that analyzes CSV data, often through DataFrames and generated Python, and answers natural-language questions.

### Q2. What is ReAct?
Reasoning + Acting: the agent reasons about a task and uses actions/tools.

### Q3. What is a toolkit?
A collection of multiple tools.

### Q4. Why is `allow_dangerous_code=True` risky?
Because generated Python can be executed.

### Q5. What is a custom tool?
A business-specific capability exposed to an agent for invocation.

## 41. Interview Questions — Mid-Level

### Q6. Why are tool descriptions important?
They help the agent decide which tool matches a user request.

### Q7. What is Agentic RAG?
RAG exposed as one of an agent's tools, with the agent deciding when retrieval should be used.

### Q8. Common agent failures?
Wrong answers, wrong tools, iteration/time/token/context limits.

### Q9. Why multiple tools?
To give one agent access to different capabilities.

### Q10. Why multi-agent systems?
To use specialized agents, multiple perspectives, review, and orchestration to address limitations of a single agent.

## 42. Interview Questions — Senior / Architect

### Q11. Design an enterprise Agentic RAG architecture.

```text
UI
 ↓
API Gateway
 ↓
Agent Orchestrator
 ├── RAG
 ├── SQL
 ├── Business APIs
 ├── Search
 └── Custom Tools
 ↓
Validation / Guardrails
 ↓
Response
```

### Q12. How would you secure code-executing agents?
Discuss sandboxing, least privilege, network restrictions, file-system restrictions, tool allowlists, input/output validation, audit logs, and human approval for sensitive actions.

### Q13. When would you prefer deterministic workflow orchestration?
When the process is predictable, regulated, or deterministic and explicit control/testing is valuable.

### Q14. When should you use multi-agent architecture?
When work naturally decomposes into specialized/parallel roles and the benefit justifies orchestration complexity.

### Q15. How would you evaluate an agent?
Measure task success, tool-selection accuracy, groundedness, failure rate, latency, cost, safety violations, and retry rate.

## 43. Quick Revision Cheat Sheet

```text
CSV Agent
   ↓
Natural Language → DataFrame → Python → Answer

ReAct
   ↓
Reason → Act → Observe → Repeat

Custom Tool
   ↓
Python Function → Description → Agent

RAG
   ↓
Documents → Chunks → Embeddings → Vector DB → Retrieval

Agentic RAG
   ↓
RAG = One of the Agent's Tools

Multi-Tool Agent
   ↓
Agent chooses capabilities

Multi-Agent
   ↓
Multiple specialized agents + orchestration

Frameworks
   ↓
AutoGen / LangGraph / CrewAI / etc.

Future
   ↓
MCP + Tool/Agent Integration
```

## 44. Assistant-Added Study Guidance

> This section is additional study guidance, not direct transcript content.

### Security First
Code-executing agents should not receive unrestricted production access.

### Deterministic Workflow vs Agent
If a process is fixed (`A → B → C → D`), a conventional workflow may be easier to control. If the path depends dynamically on the question and available tools, an agent can be useful.

### Strong Agentic-RAG Definition
> **Agentic RAG is an agent architecture in which retrieval over a knowledge base is exposed as one of the agent's tools, allowing the agent to decide when retrieval is appropriate as part of a larger task.**

### One-Line Mental Model
> **The LLM reasons, tools perform actions, RAG supplies domain knowledge, agents coordinate actions, and multi-agent systems coordinate multiple agents.**

## 45. Complete Original Source Transcript — Verbatim

Introduction to Multi-CSV File Analysis
Hi, this is Wenut. We just turned into wanker ready classes. This video is part
of a series. Complete the previous videos in this playlist [music] before
you start this video. The complete playlist information, the material and the code file information is given in
[music] the video description below. Now I will show you an agent working
with multiple CSV files.
The process of working with multiple CSV files is very similar to working with single files. We use this agent called
create CSV agent. We give file one file two. So I have imported orders. CSV
slots. CSV. You just give the both the file paths orders. CSV and then slots
CSV whatever is CSV file one CSV file two. Automatically you can ask questions related to both the files. Both of them
will be internally read as data frames and then any question that you ask it will be implemented on those data frames. It will be converted into Python
code and then it'll be implemented on those data frames. So I'm getting these two files. One is orers dot CSV, one is
slots dot csv. So let's write the code related to this. I would say my agent is
equal to create csv agent. So what does this do? This is a it is an
Understanding CSV Agent and Its Security Implications
agent but in our lang terminology this is known as a toolkit. A toolkit is a collection of multiple tools put
together. Internally it is using calculator tool. Internally it is using python tool. Internally it may be using SQL. Internally if it is using multiple
tools together that is known as toolkit but in general terminology if you ask me what exactly this should be known as these are now really sold as AI agents.
AI agents doing a certain job. So if you see in the rest of the world people call it as CSV analysis agent. What is this
CSV analysis agent will do? If you upload any CSV file it will be able to analyze it. You ask any question to the CSV file you should be able to get the
answers. So my llm is my open AAI and then the next parameter is the path
of the two files that you have to give orders CSV and then slots CSV. Agent type this is known as react agent. For
react agent the code goes like this. Agent type zero short react description. So basically react stands for reasoning
and acting. It is trying to reason out what is the action plan based on your question and try to action try to do the
action. Now this particular line allow dangerous code equal to true. It was not part of the code earlier. Earlier the code used to look like this but recently
they have added this option because Python code is getting executed. If your Python code is getting executed there can be some prompt injection attack. The
user might ask something that will shatter your database or that will go to the locations in your website which they
are not allowed to go. So Python code can run some con scripts also. So this is kind of little dangerous. These kind
of agents are little dangerous because they are not only working on giving you the output to give you the output. They are running a Python code behind the
scenes. Somebody can misuse it. So they are saying be careful. So instead of saying be careful and saying I'm taking a consistent from you that allow
dangerous code equal to true since I know that there is nothing very uh big significant data here. So I will go
ahead allow dangerous code equal to true. If I don't want allow dangerous code equal to true. If my dangerous code should not be run then I cannot use this
agent. As simple as that. Use this agent only when you can run the Python code. So verbose equal to true. Basically they are saying do not use this agent if you
are working with sensitive data. If you're working with sensitive scenarios whereos equal to true will show me what
is happening behind the scenes. Since we have seen multiple times what is happening behind the scenes. I will not be interested in web equal to true. I
will just keep it as it is. Hello dangerous code equal to true.
I think we will just wrap this here. So this is the agent. Then we will ask a
Common Operations with Multiple CSV Files
question. So we will try to ask a question which is related to both the data sets. There is orders data. There is your uh slots data. So let me ask
agent.run. How many rows and columns are there? What are the column names that
are common in both the data sets? So let me ask what are the column names in both
the data sets. When I say both the data sets I want the LLM to understand my question try to reason out try to give
me the answer properly. Let us see whether it can do it. It is executing some iterations. If we would have kept web equal to true we could have seen
what is happening behind the scenes. But right now it is working the column names in the both the data sets. I think it has just given data set one. This is
called for df1 and then for df2 data frame one data frame two. Now let me ask the question that was suggested earlier.
What are the columns that are common? What are the columns
that are common in both the data sets? So there are some columns like unique ID
is common, add ID is common. Looks same and then time I think it may not be. So there are some columns that are common
in both the data sets. So you have client product code, ad ID, product ID, unique ID, network ID, there are some
columns that are formal. So what I'm trying to tell you here is if I keep verbos equal to true then you will see that there is a code that is run on data
frame one as well as dataf frame two verbos.
Now if I execute this once again then I will see what is happening behind the scene. So it has actually written a python code. So set df columns that
means it has taken all the data frame one columns the set will give you all the unique ones and then there's an operation called intersection like this
kind of code even we do not write. If you are finding the common columns maybe you will be using a different Python code. So it is giving us the most
optimized Python code. It has taken data frame one columns data frame two columns taken intersection which are the common ones and this is a output.
So let me try to do since there are two data sets. Let me try to do some inner join or outer join. Let me ask a question. If I do an inner join based on
unique ID, how many records will be there in the resultant data set? I'm not saying do an inner join. I'm saying if I do it, how many columns will be there in
that inner join? So it is trying to do the data set merge and then trying to find the answer. So there will be eight
records in the resultant data set. If I do an inner join, if I do an outer join, if I do an outer join based on unique
ID, how many records will be there? So it is writing the code and then it is trying to give us the answer. So what
I'm trying to tell you here is earlier this was like a huge dream for maximum number of data scientists where you just
Evolution of AI Agents: From Dream to Reality
write your plain English. You take the requirement from the user in plain English and you convert it into code. Be
it SQL code, be it Java code, be Python code. Try to implement it on the data set and give the output in plain
English. The original output may be something else but somebody has to interpret that output and give the output in plain English. Now that was
that was like a dream like in the sense people never thought that it will be ever fulfilled. So you will take the input from your user in the general
talking language English and then do all your uh processing internally. You convert it into Python code. You first
understand the user requirement convert into Python code implement the Python code and then once you get the output after processing don't show the output
you convert the output output also should be the answer in plain English
the general talking language now that was like people used to think around five six years back or maybe 10 years back this was not even in the thought
but five six years back people used to think can we build something like this how beautiful it would be but nowadays with just two lines of code hardly there
is one function that we have written that is it this is the only code that we have written and this is so powerful that it is able to give us this So right
now the companies have not implemented all these yet because this is too powerful and there are some security issues that you see here right so some
things may look very fancy to us but there are some security concerns everybody every company is looking at even here we are simply using LLM equal
to open AAI companies are not even trusting open a lm but they are tracking my data so there are some companies that
are still looking at this trend trying to understand what is that a point where we can see 100% security then only we
will get into that some companies are just trying out on the trail basis in the sense in some teams they are giving some small challenges asking them to
solve them Some companies are going full-fledged. In some teams, I have seen they have totally totally changed the way that they are working because these
kind of things allow dangerous code equal to true. These kind of things are very much given higher attention when you are working in an industry setup.
Now this whole thing if we can wrap it into an application then we can uh totally avoid this coding also from the user. You just give one uh form in that
form you give a place to the user where he will write the question. You do everything in the back end. Maybe we can put it on cloud or maybe we can put it
on web application, mobile application where the user will give the input and we will give the output. That is it. Nothing else user will get to know. If
at all you are creating any web app like that. This is how it is done. I'm not sure you will be doing it. Definitely you'll be doing it with the team that is
taking care of the operations side of it. But if at all they're doing it, how do they do it? First they create a file called requirements.txt. In that
requirements txt, imagine we are implementing this on a cloud cloud environment on AWS or GCP or somewhere.
So how this tool is implemented? What is this tool doing? It will have a clean UI. User will write the question here.
He will upload the data set probably here somewhere. He will write the question here. Once he writes a question maybe it look like this AI assistant. So
you will upload user will upload a CSV file and then he will write the question here. In the back end every processing will happen. We will give the output
here itself. If I want to create something like that. The process is pretty simple. We will create a text file which has all the packages in it.
This is one way of doing it. And then whatever is your code, you put that in app. py and an executable file. And then
finally you upload this app. vi requirements txt into the cloud environment. So I have used hugging face
cloud environment hugging face spaces. So let me restart this space. So if you go to my space and see what are the
files. So I have uh uploaded environment. What
is that environment variable containing? Can somebody tell me what is that environment sample? What it contains?
We are using an lm. In that lm there is an API key. All the API keys will be stored in this environment variable and
then app. py an executable file which we have created out of the code that we have here
this whole thing is the app py I'm kind of writing the title subtitle and then finally when the user asks the question
and this is the only piece of the code this is a python code so we are saying ask the question to the user if the user question is not none that means if the
user is asking a question we are sending the question to the agent we are getting the result and then we are showing the result this is a very simple code that
we have written to showcase it to the user so that is apppi requirement txt
contains all the package that must be there. So once we are done with that then we have to do the configuration in
the settings also that means what is your like how many users will be using if you feel millions and millions of users are using then you may have to
take a larger space where for which you have to pay almost like $23 per hour if you feel that too many users are using
you have to spend some amount so that you can take a much larger space on RAM and all that and then uh persistent
storage these are all the cloud or the server related stuff where here we are giving the open AI API key etc etc so
all these configurations we will do after that We see the front end. How does that look like?
Deploying AI Agents as Web Applications
Drag and drop your files here. So, let me browse for the files. I'm uploading. Bank market CSV file.
Now you can ask questions related to bank market.csv. What are the column names? What are the column names?
The column names are customer number, age, job, medical status, etc., etc. Let me ask a question on age.
What is the minimum, maximum and average value of age?
The minimum. So here user is asking a question in plain English back end there's a lot of processing that is happening and the answer is the minimum
maximum average value of age is this much. So all in all what I'm trying to say here is we can create web
applications as well based on the agents that we have. You don't need to show anything related to agent. The user will
finally get to see a chatbot or the user will finally get to see a simple Q&A engine web page and then they will be
interacting with it in the back end. Our agent will be running and the future will be completely filled with these
agents that we have seen. Whatever you have seen here an AI agent is working in the back end user is interacting with it
in a web application or a mobile application. I think our whole future will be like that. Now every app inside
your mobile phone right now it may be static there is no AI agent I can promise you you wait for two years every
application will have an AI agent sitting along with that application you will not have any doubts related to that
application if you have any doubts let's say if you are having book my show application there'll be an AI agent sitting inside book my show so you can
have a natural language conversation with it you can tell the book my show agent that today is Sunday in the evening between 5:00 to 6:00 p.m. I want
to go to a movie with my family and it is this movie. Can you check whether the tickets are available or not? Make sure
that the ticket should be on the last 10 rows only. Do you think the AI agent will understand our requirement and will be able to book the ticket in book my
show? Do you think that is possible? Yes sir. Is it already achieved by some of the applications? Have you seen any of the
Instaar deals like that people are trying to do that crazy stuff? Buying some stuff on Amazon, booking some tickets already happening.
In fact, at the end of this course, there's a concept called MCP server, which will make this whole concept of
interacting with multiple APIs much much easier. As of now, it is not 100% implemented, but in future, you will
have every application, every website, everything that involves human interaction will have an AI agent
working with the human to make our life much much easier. Things are going to be much much faster, easier, better.
Before I move on, are there any quick questions? Anybody?
Creating Custom Tools for AI Agents
Now let's go to a very interesting topic called custom tools. Now an AI agent can do the job. Okay. To do the job it will
use a brain which is nothing but uh your LLM. It will use an action plan. What is
action plan? In reality tell me you know general terms action plan is nothing but it's equivalent to almost a prompt
internal prompt and then it will use tools. Tools are the ones that will overcome the limitation of LL. And then
finally it will give you the output. Now what if the tool that you were thinking so you are working on a certain project
in a certain company let's say you are working for an e-commerce company in your team you are doing a certain task and that is a task for which you want to
create an AI agent you want to replace your job that particular task you want it to be done by an AI agent now for
that there is no ready tool for it in that case how do you do how do you create an AI agent which will do your work your specific work maybe your AI
agent you just want it to do I want my AI agent to look at the scanned documents in the scanned documents I want it to look at only the first
heading Or in this I want to just get the username. I want the agent to search the whole document. Maybe this is healthare example. Somebody has
submitted some healthare insurance claim. In that claim we have scanned it. In that claim I want it to go through certain details and extract exactly
these details. Or I want my AI agent to go through this X-ray exactly look for certain details. Or I want it to go
through this particular report. I want it to just report me these two things. Now that is not a readymate tool. That is not internet searching or that is not
a tool that is built outside. In that case, how do you build an AI agent that will do your work? So here there is a
very easy way that they have given. Whatever you want to do, you write it as a Python function. You write it as a Python function. You must be knowing
what you want. If you're already knowing what you want, then you must be doing the Python. You must be knowing the
Python code related to it. So you write the Python function for it. And then at the top you say add the rate tool. This
is called a decorator. You just add a decorator. Add the rate tool. That is it. This becomes a tool for you. So if
you want your AI agent to do your specific job, then you have to create a tool. that tool will be nothing but a
Python function and you convert it into tool by just adding a decorator called add rate tool. So how does that work? Let's do an example. For example, if I
give a Wikipedia tool. So let me show you one example. Then we will get a real feel of what is this custom tool all
about. Let's say first I will say my LLM we
have to say LLM is OpenAI. My tools is
my tools is equal to load
tools Wikipedia. I'm using Wikipedia intentionally. I will ask a question that is not related to Wikipedia. I will
say my agent is initialize agent and then tools. I will use Wikipedia tool. I
will use LLM. Agent type is this one. Now let me ask a question that is not found in Wikipedia. If I ask what is
capital of India, it will give me. If I ask what is today's date. Now I want to get the date. Now the tool that I'm
giving is Wikipedia. But I want to get the date. It will give me some random date because from Wikipedia there is no way you can get today's date. So it is
thinking thinking maybe let me keep equal to false. So that we will see after how many iterations it will give me the output.
So it thought it thought finally today's is insert current. It is asking to insert by ourself. It is not giving the
current date. Let me execute. Let us see whether in it process does it take any other route. Sometimes it will say according to this calendar today's date
is this one get today's date this is not a valid tool valid tool it's not a valid tool it is trying to make that today's date is insert current date so I want to
know today's date but I don't have the right tool for it in that case I will write my own function I know Python
function can easily get me today's date so I will define a function I will call it as date tool now what it will take it
will just take text as the input and it will give me string as the output so
this is the format that we have to follow when we are creating this tool now here You have to give a detailed
description. You have to make this function visible to the agent. When somebody asks what is today's date, then
the agent in its action plan, it will be searching for the tools that can give the today's date. So here you have to say this function is very useful when
somebody is asking for today's date or date or anything related to date. So here we have to write a dock string where we give a clear instruction to the
agent. Later on the agent will read this and then try to choose this tool over the other tool. This function takes the input as an empty string. It doesn't
need any input. Returns the current date. Only use this function for the current date and time. Do not use for
use it for anything else any other task. So if anybody is asking for date and time anything related to current date
and time use that only for that. So that means you write a function you also make this function visible by giving a detailed description so that AI agent
when it is searching for the right tool it is saying that Wikipedia is not the right tool. Wikipedia is not the right tool. Later on when I give Wikipedia as
well as this tool you think that Wikipedia is not the right tool but the date tool may be the right one because looking at the description I might have
a feeling that this is the right tool. So I'm just writing my function import date return date time return in a particular format maybe year month date
whichever format that we want to give we can return the date. So this is the function to make it a tool. You go at the top you call it as you just say this
is a tool you just this is known as decorator you just say add the rate tool this will become a tool the tool name will be date tool somewhere we are
missing a comma or a full stop. Let us see where is that add rate tool def tool and then this one
this one import date time is a tool which we have yeah so this is
date tool is one. So what I'll do is I'll go here this time I will take the same code but I'll add one extra line
tools dot append I will append the extra tool tools dot append so Wikipedia is also there
keep that Wikipedia no problem but append this date tool so I will have two tools right now now when I say tools I
will be using Wikipedia as well as date tool then if somebody says what is today's date
use date tool to get the current date automatically it is saying that current today's date is this much is this right
2021 10. So the observation is 20 25 11 16 that is observation it made but this is
not the current date. There must be an error and it is giving us this output. Let us see let us execute once again.
Internally it is getting the right answer but previous time it has thrown us some wrong answer. Maybe in its
thoughts it has got the wrong conclusion finally gave us that output. Now that is one of the points that you need to note down with agents. Agents are errorprone
because at the end of the day when they are generating that thought action observation those kind of traces sometimes they may take wrong decisions.
As of now we have to live with them but later on there are some solutions for it. On top of this agent we will bring another agent into the picture to check
whether this is right or wrong or we'll give the same task to two agents whether if two agents are matching or not. Then only we'll get the answer. Those kind of
things can be done later on. So the final answer is this one which is accurate. So this is how you create your own tool
or you have whatever the work that you want to do. You put it inside a function. You add a decorator on top of
it. You call it as a tool. And if the user is asking a question, you can use that certain tool. This is highly useful
if you want to build an AI agent doing a very specific task that is related to your own work.
Pre-existing AI Agents: Pandas DataFrame Agent
But to be honest with you, whatever we have done here until now, this is building your own AI agents, building your own tools with your own hand. But
as of now, companies are not really building their own agents. If I talk to a lot of experts, they're using or they're searching for AI agents that
somebody has developed and they're trying to buy the license of it. That is what the maximum number of times people
are doing. So what exactly that means? Somebody has created a agent to do this specific task and it can do maximum
amount of our work. Remaining things we will be doing that is what is happening maximum number of times as of now. There
are so many pre-existing AI agents available. one such AI agent if you want to do data analysis. We have seen 38 CSV
right for data analysis there is one more tool called uh or there is one more agent called create pandas dataf frame
agent there's something called pandas dataf frame agent pandas dataf frame agent now this agent also does the same
thing if you are asking any question it will get converted into python code and that python code will be giving us output quickly let me show you how does
this work this is dataf frame agent that I'm creating create pandas dataf frame agent
my lm data frame equal to data frame so that means first you have to get the data data frame. So I will say my data
frame equal to let us take any one of the data frame. Let's say bank market dot CSV if we get
let us see whether bank market data if we have it or already data sets that we have
imported from there we will try to get one. So there is one bank market CSV I'll copy the path I'll just put it
here. This is the data frame.
So use that data frame repos equal to true. Agent type
agent type zero short allow danger code equal to true. Now this is very much similar to the CSV file agent that we have created earlier. Create pandas data
frame not defined. So we have to get this agent from somewhere. Which package is that? From
which package is this one? Let me check. From lang chain experimental agent toolkits create pandas dataf frame
agent. This is the one that we have to use. From lang chain experimental we are
going to get create pandas dataf frame agent. V8 [snorts] pandas dataf frame agent
agent. The name is create pandas dataf frame agent. Now if I ask any question to
df.gent all that I need to do is you write df.agent invoke.
If I ask a question how many rows and how many columns are there in the data set since I put where equal to true I'll
get to see what is happening. I need to find the size of the data frame. Python
code will be written. Number of rows and number of columns are given. So it is just like the previous agent that we
have seen. It'll create a Python code inside and then we will get the output. Even though agents look extremely
Limitations and Challenges of AI Agents
extremely powerful, I want to highlight certain issues with the agent because in sessions like this, it is very natural
to get carried away thinking that agents are doing everything. There is a very high chance that there is a huge
adoption in the companies. But it is not true. Companies are little reluctant. Now they are being little careful
because there are some common issues with agents. Agents can do mistakes. I have seen nowadays some of the
companies, some of the agents or some of the softwares are actually mentioning this. We're sorry. There is a chance
that agent can do mistake. It may give you wrong answer. Has anyone seen this? You're working on something which is very powerful tool. But it says that it
can do mistakes. So agents can do mistakes. For example, you asked for the current rate. It has got the current
rate internally when you see verbos. But finally, it has given us something else due to some error or due to some uh
something wrong in its overall action plan execution. And there's one more error that you may get. Right now we
haven't got it. Somehow this is solved. But uh there is still a possibility that agent stopped due to iteration limit or
time limit. Can somebody try to explain me what exactly this mean when we may get this?
What is the meaning of this one? Anybody give it a shot? Agent stop due to iteration limit or rate limit. What's
the meaning of this? So the tokens got over uh because the agent in its thinking process it has taken so many iterations
that you have a tok token limit right for 1 minute you can use these many tokens only or overall you have these many tokens and your tokens got over
then you have agent stop due to iteration limit or rate limit so even time limit also like you have gone for
too much time I cannot wait for infinite time limit issue this is one of the issue that you may see when you are working with agents and so this is one
of the example agent stopped due to iteration limit or time limit it kept on searching for the answer it has got the right tool also So but still it could
not able to trace out the right answer but the same agent if I rerun reexecute it worked the same agent I just need to
reexecute the other issue that you may get is error 440 maximum model context length is passed that means your tokens
got over so agents are prone to errors I would not say they are 100% accurate but they are getting better and better the whole world this whole world is now
after agentic AI so everybody is doing a lot of research around them so definitely for the problems that we have right now there will be very clean
solutions already we have seen the side effects of it I have seen a lot of People are using video generation AI agents and they're trying to create a
lot of fake videos that just look like uh generated by humans and then now people are finding it very difficult whether something that is a video shared
whether it is real video or fake video. Recently I think yesterday day before yesterday I read one news that a lot of people are taking the pictures of their
food and using AI to make it really rotten or something in US and then trying to get a lot of refunds that has
become a very big headache for several dairy companies. So these are some of the side effects but we will see the
brighter side. Now if I want to see the ultimate
ultimate use of agents. So that will be if I can include a rag inside an agent which will be agentic rack. What is
that? I have an AI agent. What an AI agent can do? It can think it can use my
tools. It can give me the answer. But what if I want to include rag capability into AI agent? Tell me what is rag
capability? What is speciality of rag? Specialty of rag is what? Why you bring rag into the picture? What is the whole
thing about rag? When agent is thinking, when agent is using the tools, when agent is using LLM, it looks at the whole world of data. But you are working
on a specific problem. Why become very famous? Because in companies, we don't care about the whole world of data. We want to focus on our data only. When I'm
working for a certain company, certain client, I want my AI agent to focus on my problem statement only, my data only.
That is where V comes into the picture. Right? Now, what if I want to use an AI agent that is thinking autonomously? What if I want an AI agent that is using
all my tools, but it is also using my rack? That means if the user asks a question first I want my AI agent to
look at the rack. If it finds the answer from the rack, it will answer. If it doesn't find the answer from the rag, it will go to the other one. So I want tool
one. User has asked a question. Agent can use tool one. Agent can use tool two or agent can use tool three or tool
four. The tool four happens to be rag only. Imagine you are an airline company and then you have created an AI agent
that is interacting with users and it is trying to book the tickets. The first user has asked check for the flights in
uh the month of August. Tell me when do I have the cheapest flight. Then I want the AI agent to look at all the tools go
to that tool where there is a flight information. Maybe the user request will be converted into an SQL query. That SQL
query will be run in a second table. It will get the output. But if the user is asking what are the terms and conditions
for the cancellation now for that I don't want the AI agent to write an SQL query. I want it to search for our terms
and conditions that PDF file. In that PDF file the cancellation terms are written, the cancellation charges are written. I want the agent to identify
Agentic RAG: Combining RAG with AI Agents
that okay based on the user question I have to use rag tool to answer this question. I want you to look at this. Okay, these are these are the
cancellation terms and conditions. Are you getting what I'm trying to say here? Rag is just direct question and answer
to the user. Agentic rag will combine your rag. Your rag will be one of the tool inside the agent. Inside an agent
agent can do a lot of task. One of the tool happens to be your rag. In that
case that is known as agentic rack. This is the ultimate thing that can go as one very good project on your CV. This will
be our assignment also. Pay a lot of attention. One of the assignment that you have done earlier probably it was a chatbot one. The other one is agentic
rack. Okay. So for this we will go back to our regular rack and then we will wrap it as a tool. So the whole process
is pretty simple. You just create your regular whatever rack that you have. So you create your regular rack and then
you term it as a tool and then you put it inside an agent. Let us see how does that work. Let me go through that whole
process. I'm not repeating what exactly is rag. I'm thinking that you're already
comfortable with it. All the steps inside the rack. Just to make sure that we all remember the steps of rag. What
are the steps? Once again, tell me what are the steps inside the rag. First, there are five steps. Step one is
loading of the documents. You load the documents. So, here I'm loading the documents. This is the real
Microsoft transcript. Microsoft uh Microsoft fourth quarter endings
conference call January 30, 2025. This is a transcript where they are trying Satya spoke about what is the company's
current revenue, what is the future expected revenue, how much they have made it from quantum servers, how much
they have made it from LinkedIn, how much they have made it from postsQL and what are who are their uh competitors or
the models that they're using. Obviously, he has to give a lot of details. This is a earnings call. So, this is the financial report that I have
taken. I want to create a rag around this. So I have taken this full data. This is the data. How many pages are
there? 39 pages. 750 lines 8,000 words. Once you load the data, divide the data
into chunks. Chunk overlap 10% is what I have kept. And then I'm storing them in a database. After after building them
into chunks, we have to create the embeddings and store them in a vector database. I'm using F vector database.
This vector database is given by Facebook. You can use chroma also. You can use fine cone also. You can use any vector database. And then retrieval Q&A.
Once you have the documents on the vector database, you can do retrieval Q and until here we have done it multiple times. So let us do some examples of the
retrieval Q and the regular rack Q&A. Step five, the final step is ra Q and A.
So what is the LinkedIn revenue? So it will look at this whole thing and somewhere LinkedIn uh will be there.
What is the LinkedIn revenue? It'll try to give us the answer whether it has
grown or something. We'll try to print the response.
This is the query and this is the result. I I should have printed only result. The LinkedIn revenue increase from 9% and 8% in increase 9% and 8% in
constant currency. I don't know what it means. Maybe 9% is a regular increment probably in constant currency 8%
increment. They are saying there is some growth in the link. So that is pretty straightforward. Now what we want to do is this is rack. I want to create an AI
agent. I want to create an AI agent that will use this rag as a tool. That means this
AI agent is quite big. It will do several other things. Out of them, one of them is this rag tool. If there is a
discussion about Microsoft earnings, then it will use this rack. If there is something else, if somebody is asking about something else, it will not use
this rag. So, let us see how it is done. So, from langchain.tagents
get this tool. Now, until now, we have the rag. The rag or the retriever is as of now the name is Q&A chain. Now, that
will be converted into a tool. So let me call it as rag tool. Like the earlier time we have created our own custom
tool. So you have to create rag tool. There is a function called tool. You can name this rag tool. I'm naming it as Microsoft earnings rag. And then this is
the retriever and chain.run is the function. And whenever you are creating a tool you have to give the description.
That means you have to tell the agent when to use this. So you better to give a detailed description. Useful for answering questions about Microsoft
earnings. In fact better way to write that would be use it only when there is a discussion about Microsoft earnings. Do not use it in any other discussions.
that is also a good option. Try not to use it anywhere else. So I'm creating this whole rag as a tool which will be
later used inside an agent. So this is the rag tool that I have created. Now let me create my agent AI agent initialize AI agent. As of now I'm using
just one tool rag tool and web equal to true. Later on I will use two tools. Now if somebody asks the question let's say
somebody is asking the question related to copilot. What is happening with copilot? Microsoft also pushing it very
aggressively. What is the news about c-ilot adoption? Then when I say agent run then the agent will realize that we
need to find source that can provide the information about co-pilot adoption. That was the thought it was generated. Then the action is Microsoft earnings
rag. It has gone there and then it has given the input as copilot adoption. Then the rack came into the picture. Rack has given this output to finish the
chain and the final thought would be with this information all down understanding copilot adoption. Final answer copilot adoption has seen a strong growth and momentum etc etc etc.
This is what is giving it as the answer. Let me try to say agent response. If we try to print the agent response
copiloted adoption has a strong growth momentum over 100 million monthly users etc etc has now what I'll try to do is
this is one tool what if the information is not in this this is Microsoft earnings transcript but what if I want
to know Microsoft stock price right now this is earning stock earnings only I want to know the stock price after
knowing the stock price based on the earnings based on my analysis I want to place an order now for that I need another tool once I place an order I
want to get a confirmation that is another tool once I get the confirmation finally I want to update the final user
that we have placed an order. We have bought so and so 200 stocks of Microsoft. So there will be multiple tools working in there. So let me show
you how these multiple tools work. Let me show you one extra tool. So we already have one rag tool which will
give you anything about Microsoft earnings. Now what if I want stock price? If you want stock price then you
need Google Finance or Yahoo Finance for getting the current stock price.
If I want to know what is the current stock price or if I want to know whether there's an increment, whether there's a decrement, whether there has been uh
some ups and downs inside Microsoft, I can look at this Yahoo Finance, which means first I have to install that Yahoo
Finance, I have to get that Yahoo Finance tool from Langchain community tools, Yahoo Finance News, get this tool. So I have two tools now. Any
question that is asked about Microsoft earnings, I will go to rag tool. Any question that is asked about stock prices, I will go to Yahoo Finance tool.
When I say I, I'm thinking my agent will go there. So I will say my agent is equal to initialize agent. Tools are rag
tools. Use rag tool for rag related questions. Yahoo finance tool for Yahoo Finance related questions. LM equal lm
and then web equal to true.
Where post equal to true. This is the one. Now if I ask a query, let's ask a query
that is related to Yahoo Finance. What happened with Microsoft stocks today or
what is the current stock price? What is the current stock price of Microsoft? So
let me ask the same question in Google just to get a confirmation. What is the current stock price of
Microsoft Py 10.18? Let's see whether Yahoo Finance can answer that or not. Since I was equal to true, we should get
the right answer.
So it is thinking that I have given RAD tool I have given Yahoo Finance tool but it says I have to use Yahoo Finance news
tool to find the current stock price of Microsoft and then it is going to Yahoo Finance news tool. So the next question that I'll ask is using rag as well as
Yahoo Finance. I'll try to ask something that will use both of them.
It says I don't know but still it's going on. One of the thought is one of the thought is this confirms Microsoft is strong growing company but we need to
still know the stock of the current price etc etc. It has gone to Microsoft earnings rag probably first it went to
Yahoo Finance news find it Microsoft earnings rag again it says I do not know again it is going back to Microsoft
earnings rag which is a wrong action now it has corrected the action the agent you see it is going to Yahoo finance news and then it is giving the input as
Microsoft these articles again it is not able to find that in those news articles again
uh it is going back to the Microsoft earnings and then probably it could have ended saying I do not know the answer or
some fake answer it would have The current stock was not explicitly started because finally it is not able to find it. Let me ask a question once again.
Probably this is Yahoo Finance news tool. The news tool may not be able to give us that exact stock price. So let's ask a question that Yahoo Finance news
can answer. So let's say what happened. So in the news usually they say whether the stock
price has increased or decreased or whether it is going well or not. So let me say what happened
today with Microsoft stocks. So this a news tool can definitely answer
whether the stock has increased or decreased that it should be able to answer. Yahoo Finance news we should now we should get the right response from
the agent
Microsoft saw an increase in the value of their expanding data center etc etc that is what is AI plans etc et so
basically the news related to Microsoft is what it is giving now let's ask a question that is related to both the rag
which is Microsoft earnings call as well as Yahoo Finance so let's ask a question it says that what's does the latest
Microsoft's latest financial report say that means here I want you to use rag compare them with Google so when you are comparing it with Google do you find it
in rag no you will not find it so you have to use yahoo finance for comparison and give me a report and give me a four
bullet point summary let us see whether it will work or not I wanted to use rag
which is using it says I don't know I don't know I don't know I think already it has taken the wrong path I'm unable to answer this question but let me just
again once do this now it is going in the right thing I think again I don't know the answer.
Let us see action input Microsoft Yahoo Finance.
Microsoft latest financial report shows that companies making significant investments in AI data center extraction etc etc. Microsoft repaid this one but
about Google there is not much. So I'll not uh let me ask the question in a slightly in-depth manner so that I hope
that the agent understands the question. What does Microsoft latest financial report say? Compare it
compare it with Google. Let me just give that I don't need any summary or anything. Let's give one more chance.
See whether it is able to give us the final results. It is doing what we are thinking it to do. It is using the rag as well as Yahoo Finance News and then
without any referential financial news to compare. We cannot accurately compare etc. It is giving us some logic.
Since this question is slightly involved probably it is not able to find out the documents related to Google or comparison of Google in the tool that we
have given. If you give sufficient amount of tools, it should be using all these tools.
It is getting the output as I do not know. I do not know. I do not know.
I should also check Yahoo Financial News Google latest financial report. That is what it says. No news found for the company. Search for Google ticker. It
hasn't found any news. I think it is uh finding it difficult for finding the name company name. There for every
company there is a shortcut ticker name for Microsoft it is MSFT probably for Google it is searching for something it
is not able to find out about Microsoft they are giving the information but about Google and comparison there is not much of information now you can very
clearly see this is a limitation here now what has happened is people have
found these limitations with single agent later on they have come up with something called agentic AI frameworks
so whatever we have seen until now single agent one agent single agent which is working with
multiple tools agent is able to give the answer sometimes agent is not able to give the answer but whatever is the agent that we created we have created
with our own hands everything we have written our own code and then we got the output but later on people found that
this single agent if I can create a single agent which can do a certain task why can't I create multiple agents agents let's say I will give the same
task to five agents I'll give the same task to five agents if all the five agents are giving similar results or
maybe I will collect the results then I will get the output maybe I'll give the task to five agents and Then I will create two manager agents which will
review and summarize. I'll create another subordinate or supervisor agent which will try to find out whether it is accurate or inaccurate. Why don't I
create a team of agents? Why don't I create a swamp of agents? Why don't I create a crew of agents? Huge number of agents which are doing maybe the same
task multiple times from multiple points of view or different different subtasks they are doing and collating finally giving me the right answer. So people
have started looking at this each agent as one human resource and whatever one human resource is doing what if we put
several human beings there to do a larger task. Now then the things come into the picture like if you're working with one AI agent that is fine you can
handle it. If you're working with multiple AI agents how do you orchestrate? You have to write the code for not only creating the agents you
have to write the code for orchestrating the agents. First agent output will go to second agent. Second agent output will go to the third agent. Third agent
output will go to the fourth agent. So you have to orchestrate this. Where do you store all this? What if the first agent fails? What should the second
agent do? So there it's not only about creating agents. It's also about working with agents and orchestration. Where do
you store etc etc. There are so many complications that have come into the picture. Now that is where this agent AI frameworks have come into the picture.
Whenever somebody says agent AI framework, you can think multiple agents are coming into the picture. So you have
genai which is kind of LM which is generating the next item in the sequence. So you have AI agent which is
autonomous which is using tools to do certain task which geni was not able to do. You have agentic AI. Now the
original agentic AI is working with working with multiple agents multiple agents to achieve a certain task. So
that is where we are slowly moving into right now. So some of the agent AI frameworks that are available right now
I would not say one of them is perfect the other one is not good. There is nothing like that. It may happen that maybe one of two of them will be adopted
by the companies or it may happen that all of them will be ignored. Some other agent framework may come up. So some of the agent frameworks that are available
right now or autogen langraph crewi metagp open agents and then super agent
n is no code agent. As we speak, I think just one week or two weeks back, our open AAI also has come up with another
no code agentic AI framework. I'm still exploring it, but it is not really taken
Introduction to Multi-Agent Systems and Frameworks
seriously by several developers. Maybe later on if Google comes up with some no code one. No code means here you don't need to write any code directly. You
just need to select some nodes automatically it will work. So what is an agent framework? Inside that you will have LLM. Inside that you will have
tools, you will have memory, planning, collaboration between the agents. So there are multiple frameworks. Each
framework have their own strengths and weaknesses. We should not give preference to one framework ignore the other ones or we should not think that
all the frameworks must be learned. So what we will do is we will learn the fundamentals which will be useful for any framework. So that means here we
will try to learn a couple of frameworks. We will try to learn autogen. We'll try to learn crew AI. We'll try to learn NAL. Even if there
are 20 other AI agent AI framework, you should be able to handle any of them with these. Let's say if somebody is interested in langraph with the
knowledge of these you should be able to implement this as well. So there are some advantages for langraph. There are
some advantages for autogen. There are some advantages for crew AI. Autogen is very easy to learn. It looks very simple. Crew AI also there is less
amount of code. In langraph you may get a lot of options but it is very not that easy compared to others like that. Every
identifi framework has some advantages, some disadvantages. Some of them are open source which means we can practice
in our classroom here. Some of them are paid versions. Some of them are encouraged in certain companies. Some of them are disagreed in some certain companies. Some of the agent frameworks
do not have any code at all. N is very very famous. Now this is like a super power that you will feel that neither
you're writing the code but just by staying at home I have seen people yes they are not even from data science background they do not know anything. So
somebody who is not even from data science background he's totally different maybe marketing guy or something he learned n10 in two days now he can create a agents which are very
very powerful that will automate his whole job and then he was making lots and lots of money. So here you have a chance to create lot of AI agents you
can deploy very easily or quickly. So our next topic of discussion would be
agentic AI frameworks. The framework that we will start with is autogen. Later on we will go to NAN. Later on we
will go to crew AI. And then we will also discuss another important concept called MCP model context protocol which
is uh one of the very important uh development that has happened this year. What is that and all that? We will be
learning all this. So until now I have created a platform of genai and a single AI agent. Slowly
we will move on to agentic AIs. Any questions? Anybody? Continue
with the next video in the playlist. We are covering everything step by step. If you have any questions or the comments,
please post them in the comments window below.
