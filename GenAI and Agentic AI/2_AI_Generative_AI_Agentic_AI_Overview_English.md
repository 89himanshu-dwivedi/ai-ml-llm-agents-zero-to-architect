# AI, Generative AI & Agentic AI — Course Overview

> **Source:** Provided course transcript  
> **Format:** English + Easy Hinglish  
> **Scope:** Only the provided transcript has been reorganized and translated.

---

# Part 1 — English Version

## 1. Introduction to the Course

This video is part of a series. Complete the previous videos in the playlist before starting this video.

The complete playlist information, materials, and code files are available in the video description.

---

## 2. Is Deep Learning Knowledge Required for AI?

A question was asked: Do we need to learn or revise Deep Learning before learning Generative AI and Agentic AI?

The answer is:

- Having Deep Learning knowledge is useful.
- However, you can follow the course even without a strong understanding of Deep Learning.
- If your goal is to get a job, you may be able to learn Generative AI and Agentic AI without having very strong Machine Learning or Deep Learning knowledge.
- If you are already working somewhere and want to shift your job, learning Generative AI and Agentic AI can still be possible without deep ML/DL knowledge.
- However, if you want to build a large application, create your own software, or build and sell your own AI product, deeper ML and DL knowledge may become necessary later.

At a beginner or intermediate level, ML and DL may not be necessary just to perform a job in this area. But if you want to go deeper later, you may need Machine Learning and Deep Learning.

Compared with Machine Learning and Deep Learning, learning Generative AI and Agentic AI is presented as much easier and simpler. The overall purpose of AI is to make things simpler, including coding and related development work.

The instructor also takes some questions in the middle of the session so that learners can clear their doubts and feel less stressed.

---

# 3. Generative AI vs. Agentic AI

Generative AI became prominent around 2023, while Agentic AI emerged more prominently around 2025.

The two are closely connected.

Previously, AI agents were discussed as the final topic of Generative AI, but Agentic AI has now developed into a separate area.

## How Generative AI Works

In Generative AI:

1. You provide an input.
2. This input is called a **prompt**.
3. The prompt is given to a **Large Language Model (LLM)**.
4. The LLM generates the output.

LLMs can generate:

- Text
- Images
- Code
- Videos

The popularity of Generative AI increased significantly because of image and video generation.

However, Generative AI also has limitations.

---

# 4. Limitations of Generative AI and LLMs

An LLM can generate output based on the data it has seen during training.

Earlier versions of AI systems could tell users that their knowledge only went up to a particular date.

For example, if someone asked a question about a recent event that happened after the model's training data, the model might not know the answer.

A standalone LLM has limitations such as:

- It cannot inherently search the internet.
- It cannot inherently access current information.
- It can have limitations with recent facts.
- It can provide an answer based on the information available in its training data.

The transcript gives examples where older AI systems could not answer questions about events that had not happened by the time their training data ended.

---

# 5. Introduction to AI Agents

This is where AI agents come into the picture.

AI agents are described as software programs designed to imitate aspects of how humans complete tasks.

The LLM can be thought of as the **thinking brain**.

A software program is then created around it.

The agent can follow a cycle such as:

**Thought → Action → Observation → Thought → Action → Observation**

### Example

Suppose someone asks:

> Who is the current President of India?

The LLM may not know the current answer.

The agent can then:

1. Think that it does not have the answer.
2. Take an action by searching the internet.
3. Observe the information found.
4. Search another source.
5. Compare or observe the information again.
6. Repeat the process if required.
7. Finally provide the answer.

This is similar to how a human would work.

If someone asks you about a current government official, you may think that you do not know the answer, search for it, check multiple sources, and then provide the result.

The idea is to write a program so that the AI agent can follow a similar process.

The course will later build an agent practically and show:

- What happens in the backend
- Where LLMs fail
- How an agent can improve the result
- How the thought-action-observation cycle works

AI agents can interact with the real world through tools.

For example, they can be given:

- Internet search
- External events
- Current data
- Information beyond the LLM's training data

---

# 6. Impact of AI on Jobs

The instructor describes AI agents as systems that can potentially automate work currently performed by humans.

The transcript discusses both the concern and opportunity around this change.

The argument presented is that:

- Some jobs may be automated.
- At the same time, many new jobs may be created.
- People who upgrade their skills with AI may have an advantage in adapting to changing work.

The suggested approach is to look at the work you currently perform and identify AI tools related to that work.

Instead of only doing the existing job, learn how AI can be used to improve or automate parts of it.

The idea is to build an ecosystem of AI tools around your existing work.

---

# 7. Agentic AI Systems and Examples

The term **Agentic AI** is described as a newer term for systems involving autonomous AI agents.

A single agent can perform a specific task, such as internet research.

An Agentic AI system can involve multiple AI agents working toward specific goals.

These agents can:

- Work autonomously
- Use tools
- Use APIs
- Perform reasoning
- Perform planning
- Use memory
- Collaborate with other agents

## APIs and Tools

If an agent needs weather information, it can use a weather-related API.

If it needs cricket scores, it can use a cricket-related API.

If it needs to book a flight, it can interact with an airline API to:

1. Check flight availability.
2. Check seat availability.
3. Select an available option.
4. Continue the booking process.

If one airline has no availability, the agent can reason about another option and continue planning.

The transcript describes memory as another part of these systems, where information provided by the user can be retained and used during the task.

The overall idea presented is that many tasks currently performed by humans may increasingly be performed by Agentic AI systems, while human involvement can remain where human input is required.

---

# 8. Early Agentic AI Example: Perplexity

The transcript discusses Perplexity as an early example of an Agentic AI-style system.

The distinction described is that instead of simply producing an answer, the system can:

- Search multiple sources
- Search images
- Search YouTube or other internet sources
- Show sources
- Explain the steps or sources used to arrive at an answer

For example, when asking about the box-office collection of a movie, a basic LLM might simply provide an answer or say that it does not know.

A tool-oriented system can instead search multiple sources and combine the information.

The transcript describes this approach as one of the early forms of Agentic AI.

---

# 9. AI in Quantitative Modeling

A question was asked about using LLM-based AI systems for quantitative modelling such as:

- Credit risk
- Market risk

The answer given is that LLMs are primarily language models.

At their core, they work with sequences of words or **tokens** and predict what comes next.

Therefore, an LLM cannot simply replace a traditional numerical quantitative model such as:

- Logistic Regression
- Random Forest
- Other existing quantitative models

The transcript states that directly replacing such models with an LLM would not be reliable.

However, unstructured data can potentially be structured and combined with existing approaches.

A future Agentic AI system may be built specifically for a particular quantitative application, but the transcript states that existing quantitative models cannot simply be replaced by LLMs directly at this point.

---

# 10. Future Outlook for Data Science Professionals

A learner asked how a Data Science professional should plan their learning path given the evolution from:

- Reporting
- Machine Learning
- Deep Learning
- Generative AI
- Agentic AI

The response is that there is no completely fixed learning path because Agentic AI is developing very quickly.

What is considered important today may become outdated after a short period.

The instructor gives an example from preparing this Agentic AI course:

- Preparation started around January or February.
- By June or July, some of the material had already become outdated.
- New concepts had emerged.
- The material had to be updated.
- **MCP (Model Context Protocol)** is mentioned as an example of a concept that became important during this period.

The key message is that AI is currently being learned, upgraded, and developed at the same time.

Therefore, it may take a few years before there is a completely stable learning plan.

The suggested approach is:

- Focus on what is important today.
- Keep learning.
- Keep upgrading.
- Stay relevant.
- Understand that the required skills may change next year.

---

# 11. Core Concepts and Course Structure

A learner asked whether having basic intuition and understanding of terminology is enough to move into newer AI tools.

The response emphasizes that core concepts remain important.

Examples of concepts mentioned include:

- Embeddings
- Vector-related concepts
- Other Generative AI fundamentals

The course is divided into two major parts:

### Part 1 — Generative AI

This includes:

- Fundamentals
- Large Language Models
- LangChain/Lang-related framework concepts
- RAG
- Chatbot building
- Other required Generative AI concepts

### Part 2 — Agentic AI

This includes:

- AutoGen
- Agents
- Agentic AI applications
- MCP
- Projects
- Assignments

The course is designed to be independent.

According to the transcript, basic Python programming knowledge is sufficient to follow the course.

If ML or DL concepts are required while discussing a particular topic, those concepts will be explained in more depth.

---

# 12. No-Code / Visual Coding

The transcript discusses building complex applications without manually writing all the code.

The idea is that users can use visual interfaces, drag-and-drop approaches, and AI systems to create applications.

The instructor describes this as a way of reducing the coding barrier.

The basic idea is:

> Can you build complex applications by describing what you want instead of manually writing all the code?

---

# 13. Natural-Language-Based Coding

The transcript then discusses using natural-language prompts to guide AI systems to generate code.

The key idea is:

> If you know what you want, AI can take care of much of the coding work.

The instructor explains that people often feel coding is difficult because they do not come from a coding or computer-science background.

AI-based coding reduces this barrier by allowing users to describe what they want in natural language.

For example, a user can:

- Describe an application.
- Ask AI to implement it.
- Ask for changes.
- Run the generated application.
- Copy or reuse generated code.
- Upload a screenshot and ask the AI to create something similar.

The transcript presents this as an emerging way of building software.

---

# 14. Lovable — An AI Coding Platform

The transcript discusses **Lovable** as an example of a platform for AI-assisted application development.

The idea is that someone may have an application idea but stop because they do not know how to code.

With such platforms, users can describe their idea and let the system generate the application.

The instructor compares it conceptually to having a large development team that follows clear instructions.

### Example Idea

A professional-specific social network is suggested.

For example:

- A LinkedIn-like platform for Data Scientists
- A LinkedIn-like platform for Lawyers
- A LinkedIn-like platform for Doctors

The user can describe requirements such as:

- Professional-only membership
- Referrals
- Strict entry rules
- Dashboards
- Networking features

The system can generate many files and code in the background.

The transcript says that coding, testing, debugging, deployment, and test cases can increasingly be handled by AI-based coding systems.

The idea is that development processes that previously took months may become much faster.

Other platforms mentioned include:

- Lovable
- Devin
- Advanced AI coding tools
- GitHub Copilot
- Web-based AI coding tools

The transcript describes these as early examples of a future where people from both coding and non-coding backgrounds can create applications with AI assistance.

---

# 15. Impact on Developers

The transcript does not say that developers will become completely useless.

Instead, it explains that developers may need to:

- Learn AI-based coding tools.
- Learn how to use AI to build applications faster.
- Use AI to develop multiple AI agents.
- Adapt to changing development workflows.

The broader point is that AI-generated applications may increase rapidly, including in areas where people previously did not think AI could be used.

At the same time, routine manual work is expected to be automated quickly.

---

# 16. Agentic AI Frameworks

The transcript gives a high-level overview of Agentic AI frameworks.

The detailed sessions on these topics will come later.

The course will have deeper sessions on:

- Prompt Engineering
- Large Language Models
- Chatbot building
- Agent building

A framework is described as something that makes development easier.

Just as Python provides many existing functions and libraries for Data Science, Agentic AI frameworks provide components that make agent development easier.

Agent frameworks can include:

- LLMs
- Tools
- Memory
- Planning
- Collaboration

Frameworks mentioned in the transcript include:

- AutoGen
- LangGraph
- MetaGPT
- Open Agent
- Super Agent
- CrewAI
- No-code tools

The instructor says that it is not possible or necessary to learn every framework.

Instead, learning the fundamentals and becoming comfortable with a few frameworks can make it easier to adapt to other frameworks later.

The course plans to spend significant time on:

- AutoGen
- CrewAI
- A no-code tool

Each framework can have its own strengths and weaknesses.

---

# 17. Why Learn AI Now?

The transcript asks:

> Why are we learning AI right now?

The reason discussed is that AI adoption is already happening across industries.

The transcript references an **Anthropic Economic Index report** and encourages learners to look at the report for more information.

The main message presented is that AI has already entered many workplaces and processes.

The instructor says that people should not think of AI as something that will only enter jobs in the future.

The impact is already happening.

---

# 18. AI's Impact Across Industries

The transcript compares AI's impact with the earlier computer revolution.

When computers were introduced, there was significant concern about job losses because computers could automate many manual tasks.

Over time, computers became normal parts of work and created many new opportunities.

The transcript presents AI in a similar way:

- Some jobs may be automated.
- New jobs can be created.
- Existing workers can improve their skills by adding AI to their work.

The suggested approach is to look at your current job and ask:

> Where can I use AI to make my existing process better?

The transcript emphasizes that there is no single structured answer for every profession.

People need to keep their eyes open and continuously adopt useful AI tools into their existing processes.

---

# 19. AI Adoption Across Industries

The transcript gives examples of AI usage across different sectors.

### Finance

The transcript states that many finance professionals use AI for areas such as:

- Forecasting
- Research
- Checking

### Law

The transcript discusses AI being used in legal work, including contract-related drafting.

### Healthcare

The transcript mentions AI being used for patient paperwork and related processes.

### HR

The transcript mentions AI usage in onboarding processes.

The instructor recommends reviewing the referenced report for the complete details.

The transcript also suggests using AI tools such as NotebookLM to summarize long reports or articles and generate key points.

---

# 20. Recommended Learning Path

The transcript presents two possible learning paths.

## Organic / Complete Learning Path

A more traditional learning path is:

**Coding → Machine Learning → Deep Learning → Generative AI → Agentic AI**

The coding foundation can start with:

- SQL
- Python

After becoming comfortable with coding, the learner can move toward ML/DL and then Generative AI and Agentic AI.

## Essential Learning Path

If the goal is to focus only on essentials, the transcript suggests:

- Python
- Basic Generative AI
- Agentic AI

The course itself follows a two-phase structure.

### Generative AI Phase

Topics include:

- Large Language Models
- Lang-related frameworks
- RAG
- Chatbots
- Generative AI fundamentals

### Agentic AI Phase

Topics include:

- AutoGen
- Agents
- Agentic AI applications
- MCP
- Projects
- Assignments

The course then continues step by step through the upcoming videos.

---

# English Summary

- Deep Learning knowledge is useful but is not presented as mandatory for beginning Generative AI and Agentic AI.
- Generative AI mainly takes a prompt and generates an output through an LLM.
- LLMs have limitations, especially around current information and direct access to the real world.
- AI agents add software-driven actions, tools, observations, reasoning, planning, and external data access around an LLM.
- Agentic AI systems can use multiple agents, APIs, tools, planning, and memory.
- LLMs should not simply replace traditional quantitative models such as Logistic Regression or Random Forest for numerical risk modelling.
- AI is changing jobs and development workflows, so continuous learning and AI adoption are emphasized.
- Natural-language-based AI coding can reduce the barrier to software development.
- Lovable and other AI coding platforms are presented as examples of this change.
- Agentic AI frameworks provide components such as LLMs, tools, memory, planning, and collaboration.
- The course focuses on Generative AI first and Agentic AI second.
- The recommended foundation is Python, followed by Generative AI and Agentic AI, while a deeper path can include ML and DL.

---
