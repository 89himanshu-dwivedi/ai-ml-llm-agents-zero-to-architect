# Chatbots & Memory with LangChain --- Proper English Study Notes

> **Source:** Uploaded transcript\
> **Scope:** Chatbots, conversational memory, memory strategies, RAG +
> chatbot, and deployment.\
> **Important:** These notes reorganize the transcript for learning.
> Source concepts/examples are preserved; the final section contains
> clearly separated study additions.

------------------------------------------------------------------------

## 1. Session Goal

This session introduces:

-   Chatbots
-   Conversational memory
-   Conversation Buffer Memory
-   Window Memory
-   Summary Memory
-   Entity Memory
-   Simple chatbot construction
-   RAG + chatbot
-   Conversational Retrieval Chain
-   Multi-PDF RAG
-   Cloud deployment

Core progression:

``` text
Raw LLM
  ↓
Independent calls
  ↓
No automatic conversation context
  ↓
Memory
  ↓
Chatbot
  ↓
RAG + Memory
  ↓
Conversational RAG
  ↓
Cloud Deployment
```

------------------------------------------------------------------------

## 2. Why a Raw LLM Does Not Automatically Understand Follow-ups

Example:

1.  Who won the 2011 Cricket World Cup?
2.  Give me some players in that team.

A human understands "that team" from the previous exchange.

Two independent LLM invocations, however, do not automatically establish
that relationship.

``` text
Question 1 → LLM → Answer 1

Question 2 → LLM → Answer 2
              ↑
       Previous context absent
```

### Key Lesson

> **Connected questions require connected conversation context.**

------------------------------------------------------------------------

## 3. What Makes a Chatbot Different?

A chatbot is a dialogue:

``` text
User → Question
AI   → Answer
User → Follow-up
AI   → Context-aware Answer
```

Therefore the application needs a component that stores:

-   Previous questions
-   Previous answers
-   Conversation context

That component is **memory**.

------------------------------------------------------------------------

## 4. Conversation Buffer Memory

The first memory approach introduced is:

**Conversation Buffer Memory**

Concept:

``` text
Human message
    ↓
AI response
    ↓
Human follow-up
    ↓
AI response
    ↓
Conversation buffer
```

It is the basic, straightforward memory approach presented in the
transcript.

------------------------------------------------------------------------

## 5. Conversation Chain

Regular LLM usage:

``` text
LLM → invoke(question)
```

Memory-enabled conversation:

``` text
LLM
 +
Input
 +
Memory
 ↓
Conversation Chain
 ↓
Context-aware answer
```

The transcript uses `ConversationBufferMemory` and `ConversationChain`.

> The transcript also contains deprecation warnings, so the exact
> tutorial-era API should not be copied blindly into a current LangChain
> project.

------------------------------------------------------------------------

## 6. Token Control in Real Applications

In production, token usage matters because:

-   Multiple users may use the application.
-   Long inputs consume input tokens.
-   Long answers consume output tokens.
-   Long conversation history increases prompt size.
-   Larger prompts increase cost.

The transcript gives example answer limits around **300--500 tokens**.

These are examples, not universal limits.

------------------------------------------------------------------------

## 7. `verbose=True`

`verbose=True` allows the developer to inspect internal processing.

Useful for:

-   Debugging
-   Prompt inspection
-   Memory inspection
-   Error investigation
-   Understanding chain behavior

In production, internal prompts/history normally should not be exposed
to end users.

``` text
Development → verbose can help
Production   → normally hide internals
```

------------------------------------------------------------------------

## 8. Human, AI, and System Messages

### Human Message

The user's input.

### AI Message

The model-generated answer.

### System Message

A predefined instruction controlling behavior.

Example:

``` text
System:
Keep the answer within 50 words.

Human:
What is the capital of India?

AI:
New Delhi.
```

System messages can establish:

-   Role
-   Rules
-   Constraints
-   Output behavior

------------------------------------------------------------------------

## 9. "I Don't Know" and Hallucination

The transcript demonstrates a system instruction telling the model to
truthfully say it does not know when it does not know.

Concept:

``` text
Known context → Answer

Unknown context → I don't know
```

This is intended to reduce hallucination; it does not mathematically
guarantee zero hallucination.

------------------------------------------------------------------------

## 10. Inspecting the Conversation Buffer

Conceptually, the buffer contains:

``` text
Human: Question 1
AI: Answer 1

Human: Question 2
AI: Answer 2

Human: Question 3
AI: Answer 3
```

This lets the developer inspect exactly what conversation context is
being carried forward.

------------------------------------------------------------------------

# 11. The Long-Conversation Problem

Full buffer memory works well for short conversations.

But consider:

``` text
5 → 10 → 20 → 50 → 100 dialogues
```

If all history is repeatedly passed to the model:

``` text
More history
   ↓
More input tokens
   ↓
More cost/latency
   ↓
Eventually context-size constraints
```

This motivates alternative memory strategies.

------------------------------------------------------------------------

# 12. Conversation Buffer Window Memory

Window memory keeps only a fixed number of recent exchanges.

Example:

``` text
Window = 10
```

Only the latest 10 exchanges are retained.

### Benefit

Controls context size.

### Limitation

Older information is lost.

Example:

``` text
Question 5 → important fact

Question 25 → asks about Question 5
```

With a 10-exchange window, Question 5 may no longer be available.

------------------------------------------------------------------------

# 13. Conversation Summary Memory

Summary Memory stores a summary instead of the complete raw
conversation.

``` text
100 messages
     ↓
Summary
     ↓
Smaller context
```

The transcript's pizza-order example demonstrates how:

-   The customer ordered a pizza.
-   The order was not delivered.
-   The customer needed tracking help.
-   A tracking number was provided.

The summary preserves the important context without retaining every
message verbatim.

### Why Does It Need an LLM?

Because the conversation must be summarized:

``` text
Conversation
    ↓
LLM
    ↓
Summary
```

This introduces additional model usage.

------------------------------------------------------------------------

# 14. Chat-Oriented Models

The transcript discusses a chat-specific interface such as `ChatOpenAI`
and contrasts it with the general `OpenAI` interface.

The instructor describes chat-oriented models as intended/fine-tuned for
conversational use.

However, the instructor's own demonstration produced similar results
with both approaches and therefore did not consider the chat-specific
interface mandatory for the shown examples.

> This is the instructor's tutorial-era observation, not a universal
> statement about every current model.

------------------------------------------------------------------------

# 15. Conversation Entity Memory

Entity Memory focuses on important entities rather than preserving every
message.

Examples:

-   Name
-   Location
-   Date/time
-   Specific item
-   Important term

Transcript example:

``` text
Name     → Wangut
Location → Bangalore
Order    → Mobile phone
Time     → Tuesday night, 8 PM
```

Conceptually:

``` text
Long conversation
      ↓
Important entities
      ↓
Entity store
      ↓
Long-term recall
```

An LLM can be used to identify the entities.

The transcript's demo also shows a deprecation warning.

------------------------------------------------------------------------

# 16. Memory Strategy Comparison

  ----------------------------------------------------------------------------
  Memory            Keeps             Benefit           Limitation
  ----------------- ----------------- ----------------- ----------------------
  Buffer            Full conversation Simple            Context grows

  Buffer Window     Recent N          Bounded context   Old context lost
                    exchanges                           

  Summary           Conversation      Compresses        Details can be lost;
                    summary           history           LLM required

  Entity            Important         Long-term key     Specialized/costlier
                    entities          facts             
  ----------------------------------------------------------------------------

The instructor's practical observation is that Buffer Memory was the
most commonly used in their experience, with Summary Memory used for
some longer conversations and Entity Memory relatively uncommon.

------------------------------------------------------------------------

# 17. Long-Running Conversation Example

The transcript discusses early "AI girlfriend" style chat applications
where conversations could run for hundreds of exchanges.

Problem:

``` text
User gives name
      ↓
Hundreds of exchanges
      ↓
System forgets name
      ↓
User becomes frustrated
```

Lesson:

> Long-running conversations need deliberate strategies for retaining
> important information.

Even summaries can lose key details, which motivates entity-focused
approaches.

------------------------------------------------------------------------

# 18. Typical Customer-Care Conversation

The instructor gives a practical observation that approximately **10--15
dialogues** may be sufficient for many customer-care interactions.

Often, users may eventually be transferred to a human executive.

This is an example, not a universal system limit.

------------------------------------------------------------------------

# 19. Building a Simple Chatbot

Architecture:

``` text
User Input
    ↓
Conversation Chain
    ↓
LLM + Memory
    ↓
AI Response
    ↓
Next User Input
    ↓
Repeat
```

The loop continues until the user enters `quit`.

An inactivity timeout such as 30 seconds or 1 minute is also suggested
as an alternative.

------------------------------------------------------------------------

# 20. Example Chatbot Interaction

The transcript demonstrates:

``` text
User: Hello
AI: Hello, nice to meet you.

User: I want to learn Python.
AI: Python is a great programming language...

User: I want to become a data scientist.
AI: Gives a learning path...

User: Give me a list of topics.
AI: Gives relevant topics...

User: quit
```

Memory allows the later interactions to remain connected to earlier
ones.

------------------------------------------------------------------------

# 21. Why LLMs Made Chatbot Development Easier

Traditional chatbot development could take significant time to create
natural human-like interactions.

With LLMs:

``` text
LLM
 +
Memory
 +
Application Logic
 =
Natural conversational chatbot
```

The transcript notes that modern responses can sometimes make it
difficult to distinguish AI from a human.

------------------------------------------------------------------------

# 22. RAG + Chatbot

The next extension is combining RAG with a chatbot.

Regular chatbot:

``` text
User
 ↓
Memory
 ↓
LLM
 ↓
Answer
```

RAG chatbot:

``` text
User
 ↓
Memory + Retrieval
 ↓
Private document context
 ↓
LLM
 ↓
Answer
```

### Main distinction

**Regular chatbot:** generic conversational behavior.

**RAG chatbot:** answers intended to come from specific/private
documents.

------------------------------------------------------------------------

# 23. RAG Pipeline Recap

Normal RAG:

1.  Load documents
2.  Chunk documents
3.  Create embeddings
4.  Store embeddings
5.  Retrieve relevant chunks
6.  Generate an answer

Conversational RAG adds conversation context:

``` text
Current Question
      +
Previous Conversation
      ↓
Context-aware Retrieval
      ↓
Relevant Documents
      ↓
LLM
      ↓
Answer
```

The additional component is memory.

------------------------------------------------------------------------

# 24. Conversational Retrieval Chain

The transcript introduces the:

**Conversational Retrieval Chain**

Mental model:

``` text
Retriever
   +
Memory
   +
LLM
   ↓
Conversational RAG
```

The regular retrieval chain focuses on the current query; conversational
retrieval can incorporate previous dialogue.

------------------------------------------------------------------------

# 25. RAG over Multiple PDFs

The transcript uses multiple credit/CIBIL-related PDFs.

Architecture:

``` text
PDF 1 ─┐
PDF 2 ─┤
PDF 3 ─┤
PDF 4 ─┘
        ↓
Load each PDF
        ↓
Read each page
        ↓
Build text
        ↓
Chunk
        ↓
Embeddings
        ↓
Vector DB
        ↓
Retriever
```

The purpose is to demonstrate that information may be distributed across
multiple PDF files.

------------------------------------------------------------------------

# 26. Demo RAG Details

The transcript mentions:

-   Multiple PDFs
-   An example processed text containing **898 lines**
-   OpenAI embeddings
-   Chroma vector database

The instructor assumes the learner already understands the normal RAG
pipeline.

------------------------------------------------------------------------

# 27. Temperature for RAG

The transcript recommends low temperature, with **0** suggested when in
doubt.

Reasoning:

``` text
RAG
 ↓
Grounded/factual response
 ↓
Less creativity preferred
 ↓
Low temperature
```

This is a tutorial recommendation, not a universal rule for every
model/task.

------------------------------------------------------------------------

# 28. Adding Memory to RAG

The architecture becomes:

``` text
User Question
      +
Conversation Memory
      ↓
Context-aware Retrieval
      ↓
Private Documents
      ↓
LLM
      ↓
Answer
```

The demonstration uses Conversation Buffer Memory.

------------------------------------------------------------------------

# 29. `chat history missing` Error

The RAG chatbot demonstration produces a:

> `chat history missing`

error.

The transcript explains that memory needs to be connected using the
expected memory key.

Concept:

``` text
Memory
  ↓
memory_key
  ↓
chat_history
```

### Lesson

When combining retrieval, memory, and a conversation chain, the chain
must know where conversation history is stored.

------------------------------------------------------------------------

# 30. Greeting Problem

If the user says:

> Hi

the RAG chatbot may respond:

> I don't know the answer.

Why?

Because it is operating primarily as a document-grounded system and may
treat the greeting as a document question.

A better application design can explicitly handle:

``` text
Greeting
 ↓
Normal greeting response

Document question
 ↓
RAG retrieval
 ↓
Grounded response
```

------------------------------------------------------------------------

# 31. Testing the RAG Chatbot

The transcript tests:

-   What is CIBIL score?
-   Does it increase?
-   Does it decrease?
-   How can it be increased?
-   What is cricket score?
-   What is the capital of India?
-   What is the capital of France?

The desired grounding behavior is:

``` text
Relevant source question
       ↓
Answer

Out-of-context question
       ↓
I don't know
```

The instructor notes that the India example may be explained by
information being present/referenced in the documents or by model
generation.

------------------------------------------------------------------------

# 32. RAG Grounding Principle

A private-document chatbot should not automatically answer everything
simply because the underlying model knows the information.

Desired behavior:

``` text
Allowed source contains information
        ↓
       Answer

Allowed source does not contain information
        ↓
    I don't know
```

Out-of-context tests are therefore important.

------------------------------------------------------------------------

# 33. RAG Chatbot Conversation Limits

Two options discussed:

### Hard limit

Stop after a configured number such as 5 or 10 conversations.

### Quit command

Stop when the user enters the configured exit command.

------------------------------------------------------------------------

# 34. Does Every RAG Need a Chatbot?

No.

The transcript explicitly gives the practical observation that a normal
RAG Q&A engine is often sufficient inside companies.

Conversational RAG is useful when:

-   Follow-up questions matter.
-   Previous dialogue affects the current question.
-   A conversational user experience is required.

For independent questions, regular RAG may be simpler.

------------------------------------------------------------------------

# 35. Deployment

Backend:

-   RAG
-   Retrieval
-   Memory
-   LLM
-   Application logic

Frontend:

-   Chat interface
-   File upload
-   User interaction

Cloud examples mentioned:

-   AWS
-   GCP
-   Azure
-   Hugging Face Spaces

------------------------------------------------------------------------

# 36. Hugging Face Spaces

The demonstration uses Hugging Face Spaces.

User flow:

1.  Upload files.
2.  Submit.
3.  Backend performs RAG processing.
4.  User asks questions.
5.  Answers appear in the frontend.

``` text
User
 ↓
Web UI
 ↓
Upload PDF
 ↓
Backend
 ↓
Load → Chunk → Embed → Store
 ↓
Retriever + Memory + LLM
 ↓
Answer
 ↓
Web UI
```

------------------------------------------------------------------------

# 37. Generic File-Based RAG Chatbot

The application is made generic rather than tied to only the
credit-score PDFs.

``` text
Upload supported files
        ↓
RAG processing
        ↓
Chat with document knowledge
```

The demonstration initially limits the UI to PDFs and notes that other
file types can be supported by extending the application.

------------------------------------------------------------------------

# 38. Cloud Scaling

Resource requirements depend on usage:

``` text
1 user
 ↓
Lower resources

1,000 users
 ↓
More resources

1,000,000 users
 ↓
Much larger infrastructure
```

Actual requirements depend on:

-   User count
-   Request rate
-   Model
-   Retrieval workload
-   File processing
-   Overall architecture

------------------------------------------------------------------------

# 39. Hugging Face Space Configuration

The transcript mentions:

-   Space name
-   Docker / Gradio / Static options
-   CPU/resources
-   Public/private access

Resources should be selected according to expected usage.

------------------------------------------------------------------------

# 40. API Keys and Environment Variables

The OpenAI API key should be stored as a secret/environment variable
rather than hard-coded.

Conceptually:

``` text
Secret
  ↓
Environment variable
  ↓
Backend reads it
```

------------------------------------------------------------------------

# 41. Application Files

### `README`

User-facing information/instructions.

### `app.py`

Main RAG + chatbot application.

### HTML template

Controls the demonstrated frontend structure/appearance.

### `requirements`

Lists packages required by the application.

The deployment environment installs these dependencies.

------------------------------------------------------------------------

# 42. Frontend vs Backend

  Frontend           Backend
  ------------------ ------------------
  Chat UI            Document loading
  File upload        Chunking
  Sidebar            Embeddings
  Icons/layout       Vector database
  User interaction   Retrieval
  Display answer     Memory + LLM

------------------------------------------------------------------------

# 43. Data Scientist vs DevOps

Data scientist/developer may focus on:

-   Model/application development
-   RAG
-   Application logic

Deployment/DevOps teams commonly handle:

-   Servers
-   Infrastructure
-   Access
-   Scaling
-   Deployment
-   Maintenance

The exact split depends on the organization.

------------------------------------------------------------------------

# 44. Complete Conversational RAG Architecture

``` text
                    USER
                      │
                      ▼
                Chat Interface
                      │
                      ▼
               User Question
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
   Conversation Memory       Current Query
          │                       │
          └───────────┬───────────┘
                      ▼
             Context-Aware Retrieval
                      │
                      ▼
                Vector Database
                      │
                      ▼
              Relevant Chunks
                      │
                      ▼
                     LLM
                      │
                      ▼
              Grounded Response
```

------------------------------------------------------------------------

# 45. Interview Questions --- Junior

1.  Why does a chatbot need memory?
2.  What is Conversation Buffer Memory?
3.  Why can two raw LLM calls be independent?
4.  What does `verbose=True` do?
5.  What are Human, AI, and System messages?
6.  What is Window Memory?
7.  What is Summary Memory?
8.  What is Entity Memory?

------------------------------------------------------------------------

# 46. Interview Questions --- Mid-Level

1.  Buffer vs Window Memory?
2.  Why does Buffer Memory create token problems?
3.  Why does Summary Memory need an LLM?
4.  What is an entity in Entity Memory?
5.  Why are RAG and memory separate concepts?
6.  What is a Conversational Retrieval Chain?
7.  Why might a RAG chatbot respond "I don't know" to "Hi"?
8.  What causes a chat-history configuration error?

------------------------------------------------------------------------

# 47. Interview Questions --- Senior / Architect

1.  How would you design memory for a long-running chatbot?
2.  How would you choose Buffer vs Summary vs Entity memory?
3.  When should RAG be conversational?
4.  How would you test out-of-scope questions?
5.  How would you keep a private-document chatbot grounded?
6.  How would you ingest multiple PDFs?
7.  How would you deploy the chatbot?
8.  How would you manage API secrets?
9.  How would you scale the system?
10. How would you move the notebook prototype to production?

------------------------------------------------------------------------

# 48. Errors & Gotchas

-   Independent invokes do not automatically share conversation context.
-   Unlimited buffer memory can become expensive.
-   Window memory can discard useful old information.
-   Summary memory can lose details.
-   Entity memory is specialized.
-   RAG does not automatically provide conversation memory.
-   Memory does not automatically provide document retrieval.
-   Greetings may need special handling.
-   Chat-history keys must be configured correctly.
-   Tutorial APIs can be deprecated.
-   Low temperature is a recommendation, not a universal guarantee.
-   Not every RAG application needs conversational memory.
-   API keys must not be exposed in application code.
-   Scaling requires architecture decisions, not just more CPU.

------------------------------------------------------------------------

# 49. Key Numbers / Examples

  Item                        Transcript Example
  --------------------------- ------------------------
  Basic memory example        2011 Cricket World Cup
  Example answer limit        300--500 tokens
  Long-history examples       50/60/100+ dialogues
  Window example              Last 10 exchanges
  Customer-care observation   \~10--15 dialogues
  RAG documents               Multiple PDFs
  Demo text                   898 lines
  Vector DB                   Chroma
  Embeddings                  OpenAI
  RAG temperature             0 / low
  Deployment                  Hugging Face Spaces
  Cloud examples              AWS, GCP, Azure

------------------------------------------------------------------------

# 50. Final Revision

``` text
Raw LLM
   ↓
Independent invocation
   ↓
No automatic previous context
   ↓
Memory
   ↓
Chatbot
   ↓
Add RAG
   ↓
Conversational RAG
   ↓
Private-document chatbot
   ↓
Cloud deployment
```

### Golden Mental Model

**LLM = generation**

**Memory = conversation context**

**Retriever = relevant information finder**

**Vector DB = retrieval storage**

**RAG = retrieval + generation**

**Conversational RAG = RAG + memory**

**Deployment = frontend + backend + secrets + infrastructure**

------------------------------------------------------------------------

# 51. Additional Study Notes --- Clearly Separated from Transcript

> These points are **assistant-added study guidance**, not direct
> transcript content.

## Modern Memory as Layers

``` text
Session State
    ↓
Recent Conversation
    ↓
Summary
    ↓
Long-term facts
    ↓
RAG / External Knowledge
    ↓
LLM
```

## Production Evaluation

Evaluate:

-   Retrieval quality
-   Groundedness
-   Answer correctness
-   Context relevance
-   Conversation continuity
-   Out-of-scope behavior
-   Latency
-   Token/cost
-   Failure handling

## Security

For a private-document chatbot consider:

-   Authentication
-   Authorization
-   Tenant isolation
-   Document-level access control
-   Secret management
-   Prompt injection
-   Data leakage
-   Privacy/logging controls

------------------------------------------------------------------------

# 52. Complete Source Transcript --- Preserved Below

The full uploaded transcript is included below as the source-of-truth
reference so that the structured notes do not silently drop source
material.

``` text
Introduction to Chatbots and Memory
Hi, this is Wenut. We just turned into wanker ready classes. This video is part
of a series. Complete the previous videos in this playlist before you start
this video. The complete playlist information, the material and the code file information is given in the video
description below. Today we are going to get introduced to chatbots which is an extension of
Understanding Chatbot Memory with LangChain
whatever we have discussed and the chatbots require memory. So what is memory? how chatbot works. Let us try to
see. Now let me give you one of the classic example that we regularly use. Let's say once I install, once I give
the packages etc. So I would say from langchain llm I'm going to give you this
code in some time from langchain. Llms import openai. That's what we will say. And then I would say my llm is equal to
open AI. My llm is open AI and I can keep whatever is the temperature. Let me
leave it to the default value. Now if I say llm.invoke if I ask this question who won the 2011
world cup is it India 2011 world cup? Yes sir. Huh? Who won the 2011 cricket world cup?
Obviously open AAI should be able to give us this answer because multiple places this would have been recorded. The data would have been trained.
Definitely open AI will have the ability to give us this answer that this is the team that has won the 2011 cricket
world. There is a deprecation warning we give Indian cricket team won the 2011 world cup. Now let me ask the second question. My question next time is can
you give me some players? Can you give me some players in that team? Do you
remember any of the players? Let's verify some players in the Italian national footballer. Buffoon Leonardo.
This one. This one. This one. This one. Tell me any of these guys matching with the Indian cricket team. No, it's directly saying that some of the players
in the Italian national football team. Now when I say in that team, what I meant to say earlier I have asked a
question who won the cricket world cup. When I say in that team, I'm referring to that particular team. For us, it seems that these two questions are
connected. But when you see the actual procedure here, this is first time you have invoked LLM and again you have
invoked LM. Have you ever told LLM that my first question is connected to the second question? This is just an independent invoke statement. This is
another independent invoke statement. Again you will do this kind of invoke 500 2,000 5,000 times. How can you expect LLM to connect every question
that you have given so all the questions that you are giving all the prompts that you are giving they're all disconnected these are all independent invoke
statements. If you want to build a chatbot kind of environment what is a chatbot kind of environment user will ask a question will respond user will
ask another question in the chat it's not question it is a dialogue in the chat box isn't it? Yeah, connected
questions, connected answers. It's it's not even a question. I would say we we can call them as this is a interaction. This is a dialogue that is happening
between the LLM and the user. In this case, we cannot directly write like this. We have to introduce another
component called memory. We want the LLM to have memory. That means we want it to have some kind of another component
where all these questions are saved, all these answers are saved, all these context is getting saved which is in the memory. One of the basic form of the
memory that is used is conversation buffer memory. There are other variations as well but by default everybody uses conversation buffer
memory. So let me write it conversation buffer. The name itself is self-explanatory isn't it? You're having
a conversation you are keeping all that buffer of your dialog in the memory. So how do I get that from lang chain from
lang chain import from lang chain dot memory
import conversation buffer memory. And then when you want to do the regular LLM
stuff, you just say lm.invoke. But if you want to do anything related to memory, the chain for that is conversation chain. So how does this
whole thing work? As usual, you will give your LLM and then you give your prompt otherwise directly we are giving our prompt here
Exploring Conversation Buffer Memory
in the form of the question. After that you give your memory and then the conversation chain. Conversation chain.
Now tell me what is your LLM? My LLM is open AI. Whatever is the temperature,
whatever are the tokens. See right now I'm not paying a lot of attention to tokens. But when you are joining a company, when you are working on a
project, you yourself will realize that oops here I don't want the user to use up as many tokens as possible. When you are discussing with your team, you will
realize that here I want to limit the number of tokens. The question that the user will ask should be only this much lengthy and then the answer that I want
to give has to be short and crisp. So I want to limit it to the number of tokens. Not only here even inside your system prompt you will write that do not
give lengthy answers. Always limit your answer into let's say 500 tokens or 300 tokens like that because you want to
because your app is open to multiple users and you don't want them to use as many tokens as possible that is going to be built to you later on. You give the
LLM and you simply mention this memory is equal to conversation buffer memory. You just simply mention that
automatically the memory will be stored in the buffer. Then you will say my conversation whatever dialogue or
conversation is equal to conversation chain use my lm which is open use my memory. Now there is an option for verbos equal to true. You will get to
see what is happening in the background. If I am not keeping that directly you will get the output first I will run it without wear then I will show you what
happens in the background. So once you define this conversation once you do this conversation buffer memory I think
I have to execute that first. Now I have created this conversation chain I think this comma will also be removed.
Now let me instead of saying lm.invoke I will say conversation.invoke or conversation.predict dot predict. Let me
ask the same question without any change. Who won the 2011 cricket world cup?
This answer anyway we expected I think conversation. Predict in fact we have to give another specific parameter called
input 2011 cricket world cup was won by India. Then I will ask the question.
Anyway I think we will expect the right answer here. Give me some players in that team.
Some of the players are Virat Kohli, Yuras Singhir Khan, Harban Singh etc. Definitely it is not giving some random football team. The point that I'm trying
to make here is if you want to ask connected questions if you want to build a chatbot if you feel that question followed by answer again the question is
followup question to the previous question then you have to introduce memory. Memory is very important when you want to build a chatbot kind of
scenario. Memory is not used always. You don't really require memory in all the scenarios. If you feel that question and
answers are independent in that case memory is not required. But if you feel if you want to build a chatbot if you want to build a Q&A engine memory is not
required. If you want to build a chatbot, memory is required. There is a misconception when we are using charge GPT memory is already inbuilt. So that
people think that okay when I'm using LLM anyway I'm using open AI charg definitely I will get the connected answers. This over here will not work
exactly like the way how things work in charge GPT already memory is induced over there. That GP is a very well-developed agent that we are working
but here it is a large language model is very much raw form that we are using it here. So that is the conversation buffer
memory very basic form of the memory that I want you to do right now. Now there is an option called verbose equal
to true. Let us see what is that. So I will redefine all this. This time I'll keep an extra option called verbose
equal to true. In some cases this verbose is particularly useful. So what this will do is what is happening in the back end? What are all the questions
that are kept in the memory? Everything we can see them. So as usual we will write conversation dot predict
and then ask the question what is the
capital of India? Now when I execute this I think we have to give input is equal to extra
parameter. Now the one that you see in green color
that is the inside the system and you say web equal to true you will get to see what is happening inside the system. So inside the system it was already
written one of the prompt when you say memory one of the prompt is already written the prompt after formatting the following is a friendly conversation between human and AI. AI is talkative
and provides a lot of specific details from its content. If AI does not know the answer to the question it truthfully says I do not know the answer. So why
that last line is added? Tell me why that last line is added. This is to avoid what? We don't want the nation. We
don't want any kind of hallucination. That is why it is saying what is the capital of India. The current conversation. What is the capital of India? Di is the capital of India. So
whatever you see in green color that happens behind the scenes. When you say that equal to true, you will get to see what is inside the system. So right now
human question is there and AI answer is there. If I'm asking a second question, what is that city distance
from Mumbai?
The distance between New Delhi it is automatically taken New Delhi and that is the capital of India and then Mumbai
is what we have given approximately 1421 km. If you see the green color the following is the friendly conversation etc etc and the current conversation
this is what is kept in the memory the conversation buffer chain or whatever is the memory that we are talking about that is kept here human said what is the
capital of India AI the capital of India is this one that is also kept in the memory now when I ask the third question I have asked with spelling mistakes but
it's okay when I ask the second question all this has been kept in context because this whole current conversation is kept in context and AI answer is
given based on that when I said what is the distance from that city it has understood that from the current conversation the city that I'm talking
about is Delhi so the prompt that you see here this is known as system prompt or system message. Sometimes you can
give a fixed role to the system that you are AI or you are an expert in something. So there are a couple of types of messages. You have human
message the question that human is asking or the dialogue that human is saying. AI message that is something that LLM is generating. System message
is something like you have set it prior to whatever is happening. If you are building some of the tools or some of the automation, you may want to give
that a system message which is kind of standard and static. For example, if you want to set a rule that I do not want the answer to be very lengthy. Let the
answer be always in 50 words. That you can set up in the system message. You can somehow in the prompt you can say that the system message is the answer
should be always within 50 words or 50 tokens something like that. So system message is something that will define
internally. Nobody will get to see that unless verbose equal to true. Usually we don't keep verbos equal to true in the
final production ready project because we don't want the user to see all of this before seeing the final answer. But in some cases when I want to see what is
happening in the back end. If I'm getting an error, why am I getting that error? If I want to see if I want to know what is happening in the back end then I can see verbose equal to true.
Otherwise if I want to just access only memory whatever is there in the memory then I can see something called memory buffer. I will go to conversation that
we had conversation dotmemory buffer
conversation memory buffer. So this is the exact conversation that
is happening between the human and ax. Human asked question one AI replied human asked question two then AI
replied. Once again, let's quickly see one more example. I just want you to be a little comfortable with this. So, from lang
Different Types of Memory: Summary and Entity Memory
chain memory, help me with this. From lang chain memory, lang chain domemory import.
What is the name of that? What is the keyword? Conversation buffer memory. From langchain.chains,
import conversation chain. Anyway, we have done it once. From langchain.memory, import conversation buffer memory. From
langchain memory, import from langchain.chains, import conversation chain. Probably one of the spelling
mistake that I would have done. Then I would give my NLM followed by I will declare my memory. We will see a couple
of different types of memories where people may not use them but it's good to know what are the other forms of the memory. And then finally conversation.
My LLM is open AI. My memory is conversation
buffer memory. And then my conversation finally is
conversation chain use my lm use my memory. I would like to keep equal to true for this particular example.
Let me start with the first conversation. I would say conversation.predict
and then I would say input. Let me just start with hello. What does it say? Let's see. Since it is already a
conversation chain. So it'll say hello, it's nice to meet you etc. It's automatically since it is memory means it is meant for chatbot kind of thing.
Once somebody says hello, it's nice to meet you. My name is AI. I am an artificial intelligence designed to assist human communicate etc etc etc. It
is say then I would like to ask what is the main difference between classification and regression? What is the main difference between
classification and regression? That is my question.
Now in the buffer you can see that the conversation human side value and then this is answer. This is the main for
classification regression supports some of these etc etc. Let me ask one more question within this one.
Then I will ask the question which one is most widely used? Which one is most
widely used in the industry? We know that classification is the one that has maximum number of applications. It
really depends on the specific problem. Both classification their own strengths and weakness. For example, classification. It's important to consider the problem etc et anyway it
has given politically correct answer. I would say
give me the differences in a tabular format. Let us see whether it can give it or not. Give me the differences in a
markdown table format. A particular format that we can actually easily keep it on a website or
somewhere. So this is the table format. Now if I want to see what is happening behind the scenes, I would say print the
conversation dotmemory.buffer. So this is the conversation that has happened. Human said hello. Here I gave
a reply. What is the main difference? Human second question. What is a reply? This reply reply and then final output.
It is just one more component that has been added. The most widely used form of the memory is conversation buffer
memory. But if at all you have to build some chat bots which are very complex which uh may see the customer or the
user having more than five 10 15 20 or maybe the conversation is running up to 100 dialogues that means human has asked
something AI has given a reply human has asked another connected question AI has given a reply but this whole conversation went until 100 dialog
usually chats bots don't encourage you to go until those many dialogues isn't it after four five or maybe 10 dialog
they will say that wait I will connect you to the next available executive don't read my brain that's what the chatbot says isn't it most of the cases
Because by the time 100 dialogues are written by the customer or the user it would have been 1 hour or something we don't want to take that much of the
system time but in a particular scenario user is authentically asking these dialogues in that case this conversation
buffer memory may not be a good idea because this whole conversation buffer goes as an input prompt. Now if I go to
the 100 dialog can you tell me what is the problem that will arise? Do you think my LLM will be able to give the proper answers later on after 100 dialog
after 50 or 60 conversations what is the issue? token size will be the input token size the input tokens as
the input prompt itself will be having too many tokens lm will one day will say that the input tokens are too lengthy I'll not be able to take this as the
input it will give it up and say that I cannot give the output the input token size is too much so somehow we want to
keep that memory but we want to summarize all this so there is an alternative option called conversation
summary memory what we have seen is conversation buffer memory the other options are conversation buffer window
memory what it will do is you can define a window let us suppose if my window size is 10 only the last 10 conversations input and output will be
taken into consideration. Anything before that will be totally deleted. Now sometimes if the user's 25th question is related to his fifth question that will
be lost because only the last 10 question and answers will be considered. So if you want to limit it to a particular window then you can keep a
window size but you have to tell the user that we are tracking only last 10 or last 15 of your conversations that is consider conversation buffer window
memory where you will give the window size. This is generally not suggested. If you ask me the second option instead of the conversation buffer memory where
it will keep the whole buffer the alternative to that could be conversation summary memory. What is conversation summary memory? Instead of
keeping the whole buffer keeps a summary of it. Keep the summary of it. At least I will have a small short summary of what all
has happened so that if I'm answering the next question at least I can answer it. So that is a conversation summary memory. So we may have to summarize all
that information that summary memory which will automatically take care of it. Sometimes if it is going too far ahead, sometimes if the dialogues are
going too much, let's say we are talking about usually 10 dialogues or 15 dialogues are sufficient for regular chatbots which are customer care agents.
Tell me for customer care agents when the customer logs in hardly he will spend 10 to 15 minutes within 10 to 15 dialog. So conversation buffer memory
what we have seen that is sufficient almost everybody that I have interacted with they're using that but if you want to go one step further you may want to
use conversation summary memory. But what has happened there is an interesting thing that has happened when open AI gave this API for the first time
in US. So what people like everybody thought that in the industry people would be building very good chat bots
for customer care executives etc etc. But the initial set of chat bots that were built by most of the people uh most
of the companies tech companies were like some of the tech companies I would say they were AI girlfriends which were like they will be one imaginary AI
girlfriend where a lot of people will be talking to it or individually they'll be talking to it and the conversations were going not just 100 conversations it will
be like a dialogue will go until maybe thousand conversations throughout the night somebody will start at 700 p.m. and they keep on talking to it
throughout the night. It went on till maybe 500, 600, 700 conversations. It may sound hypothetical it has actually
happened. Now people now the whole like he starts by saying that my name is Alex. By the time it is midnight 12 the
particular tool used to forget what is his name. Then again it used to ask hey what is your name? Then people used to get really really upset. They used to
unsubscribe to that particular tool. To avoid that again people were searching for it. Even the summary was not a you know summary there you will be losing
some key information in some cases. So an alternative to that is conversation entity memory where you will focus on
you will summarize you will keep a buffer you will focus on certain key entities that will be stored for very lengthy period such as key entities like
names what is his place I'm calling from New York or what is the date that he's talking about specific items specific terms these are known as entities so you
will have an extra space called entity store I'm not sure the kind of industry ready chatbots that we are building they
require this they may not require this but if at all if you're thinking that my chatbots requires a very lengthy context conversation window the second
alternative that I give is summary memory. The third alternative is entity memory. Summary memory handles the things very well until hundreds of
dialogues. Entity memory can even handle it almost like thousands of dialogues. Let us see some of the examples of it.
But the context, have you got the context why we need summary memory or why we need entity memory? At least the context wise, have you got the idea?
Yes. Y when the dialogs are going too much. So let's say if you want to implement summary memory. So from lang chain
conversation memor, let me give a hint to Google like summary memory
from langchain.chain change conversation dot memory import conversation summary memory so my memory is will be defined
as conversation summary memory this time my conversation use my LLM apparently open AAI is the LLM that I'm using I
want to make a statement about my LLM here openai now what openai did a couple of years back just for this type of chat
bots they have created another model called chat open AAI so they have fine- tuned it that will work perfectly for
chat bots that will work perfectly for these memory related conversations so sometimes You may see chat openai also.
So first we need to get that. So from from lang chain. So let me say chat
openai. Now from langchain chat models import chat open aai. Now that used to
be used by a lot of people but to be honest with you whether we are using chat openai which is very much fine tuned version of open AAI for
conversations and memory whether we are using open AAI both of them are giving similar results to me. So you don't need to particularly use chat open AAI. Even
if you use open AAI also that is fine. So I would directly use open AAI because only in open AAI you have open AAI and
chat open AAI but in other tools like in other large language models like go here you have only one model. So I will directly go ahead with my LLM. So the
reason why I'm saying chat open is available next time when you see it you just need to remember that it is specifically fine tuned for chat kind of
or your chat bots kind of stuff. I would say open AI I'm still using open only my
lm memory is this one. Now if you see here memory equal to conversation summary memory again in that I have given lm. Can somebody explain me why
this extra command earlier I was simply writing memory equal to conversation uh buffer memory but now I'm saying conversation summary memory again I'm
giving an LM here why this LM is needed in the memory itself because earlier when I declared memory if I declare
memory here conversation buffer memory that is sufficient but here I'm declaring conversation summary memory and again I'm giving LLM there is a
particular reason for it why you said to read from the summary get the summary to get the get the summary also you have to use an
LLM isn't it so this is your overall buffer memory now this buffer memory need to bear Right? Who will summarize
this? You need an LLM, isn't it? So, this will what it will do. It will take the buffer and then it will summarize using an LLM. Again, this is
conversation that is the same LLM that we are using. Conversation use my LLM. Use my memory. And again, within the memory for summarization, that LLM has
been used. I will keep the verbose equal to true. I'll keep verbos equal to true to see how this summarization is happening. So, let me execute this. Now,
I will say my conversation dot predict
input. Let me start with hello.
Hello there. How are you doing? I have ordered a pizza or first I need help
with my order. That is what the customer is saying and he's talking to a chatbot. But the customer should feel that they're not talking to chatbots. They
should feel that there's an agent talking to them. That sound delicious. What kind of pizza did you order and etc etc. Now see the current conversation.
Earlier it was just input output input output. But if you see if I ask the next question then you will see the summary
that is being the order is not delivered yet. Can you
help me with the tracking?
Now if you see the green color text here the human greets AI and ask how is it doing? AI responds by asking human's
wellbeing. The human informs AI about ordering a pizza and needing help with the order. AI offers assistance etc. Absolutely. Do you have the tracking
tracking number handy? So let me say my tracking number is
IDC 1 4 5 6 9.
So the whole point that I'm trying to highlight here is in the buffer you will have only the summarization of the whole
information. Earlier if we go in the buffer we used to see this whole information. Let me show you exactly
what is there in the buffer. Conversation dotmemory.buffer. If I see in this conversation
since it is summarization of it conversation dot memory dot buffer
the human grids AI etc etc this one the four dialogs that the earlier conversation buffer memory used to keep those four dialogues are not kept a
summarization of all the dialogs are kept here so that this context will stay even if the user is going into 50 dialogues even 60 dialog summary can
help there usually closation buffer memory is sufficient the first version that we have seen that is where everybody that is the one that everybody
uses. But if you want to go one step further, I would suggest you to go for conversation summary memory. But if you want to take it even further running
beyond 100 dialogues which is not a very regular scenario in that case just for the sake of knowing it, you can use
something called conversation entity memory. This is conversation entity memory.
If you see what exactly is there in the prompt template inside the conversation entity memory, how it keeps all these
entities intact. I think first we have to get that conversation entity memory. So first let me get that from
blank chain. Conversation entity memory. Yeah. So internally if you see what is there in entity you are an AI assistant
human powered by large language models train. You're designed to be able to assist with range white task you are consistently improving etc etc. So
basically you keep the context entities. It will keep the current conversation but most importantly it will keep all the entities. Even if the current
conversation is not really helping us the entities will help us to keep it for a long duration. Let me show you one
example. I have defined my memory as conversation entity memory. Here also LM is needed or not for conversation entity
memory. Yes, needed right because who will tell what are the entities? So conversation entity memory lm is needed conversation is this
one. My prompt is conversation entity memory conversation template. I think this need to be given separately here.
Let me just rewrite that my memory is equal to conversation entity memory. Yeah. So we have declared this. Please
use migration guide and so on. Looks like there is a deprecation warning. But even with this deprecation warning, I assume that it is going to work. So I
have defined my conversation. So then I would say my conversation dotpredict. Hello, my name is Wangut. Intentionally
I'm giving this information. So there is a name called Wangut. I'm from Bangalore. I need help with my order.
So all this green one is what is happening internally. So if you see the context entities and Bangalore is kept.
Now I will give another information that conversation. predict are you with me all of you
you're following me right so we are just trying out another type of memory which is entity memory I'm trying I'm trying to highlight that it is storing certain
entities entities means names places time conversation dotpredict input is I have ordered mobile phone on Tuesday
night 8 p.m. So I want this particular one to keep those entities. So Wankert, Bangalore location. So it is keeping all
those uh relations. Bangalore is the location of the human. Ward is currently residing in this one and he needs etc
etc. So basically it is trying to keep the information in such a format that we can recollect it after a long
conversation also. But to be honest with you, I haven't really seen any of the applications really using conversation
entity memory. It also looks a little bit costlier from the point of view of tokens. I have seen a couple of applications that are using conversation
summary memory but 99% of the applications that I have seen are using conversation buffer memory. Usually that
solves the purpose. Now if I want to build a simple chatbot application here
Building a Simple Chatbot Application
what we need to do is we just need to write everything in a loop. First you will take the user input.
You will take the user input.
It has to be a text box. So I would take input and then you can give a text here. I would say user message your message.
So that is the user input. I would define my llm is equal to open AI and then my memory is conversation buffer
memory. My conversation is conversation chain etc etc. This is the one. Now I will write the whatever is the user
message etc etc. User will keep the message here. I'll stop it here and then I will write the while loop. While user
input is let's say if user says quit then it will stop otherwise this chatbot will keep on running. So while user input is not quit while user input is
not equal to quit. This quit has to be in quotes. If the user input is not quit this is not equal to symbol then what
you must do if the user is saying do not quit you just need to answer the user question. So what we will print? Print
AI message whatever is a conversation. Predict. So user has given one input which is not quer that means user has asked a question. So if the user says hi
then we would like to go to conversation.prodict interpret it give the input as a user input get the output and then we would like to give the
output then again we will go to the user input but if the user input in fact we don't need to write the second one but
to make it a little cleaner or easy to read if the user input is quit I would say clear the memory break wherever you
are so we will start with user input and then we will keep all this handy with us if the user input is not quit then we
would give the conversation if the user input is quit we will stop the conversation once I execute this so it started with user input your message I
would say hello the user will get to see only Whatever you see below this one. So user will get to see everything from here. Isn't it? Hello, it's nice to meet
you, etc., etc. I want to learn Python.
Python is great program. I want to become a data scientist.
Give me a learning path to keep on going. Sure, become a data scientist. Important
to strong foundations, etc., etc. Suggest me a list of topics.
Sure it's important topics to cover etc etc. When this whole chat will end tell me
after writing quick when the user says quit then this chat will end. Got it? Or
you can also make it time bound. If the user is not responding for maybe 30 seconds or 1 minute then also you automatically you will take the quit and
end. So creating a chatbot is that easy. Earlier there were days people used to spend months and months to create chat
bots that are giving responses like this. Responses like humans were particularly impossible. But now with the advent of LLMs you can get
responses. Sometimes it's very difficult to judge whether AI is what you're talking to or whether it is human that you are talking to.
Integrating Chatbots with RAG for Private Documents
Now the final most important aspect within this is we have discussed rag but it was Q&A rag question and answer. But
what if I build a rag that is chat based. I have built a rag earlier but
what if we want to build a chatbot on top of rag? Can somebody explain me this concept? What am I talking about chatbot
on top of rag? What is it? You have a chatbot. Usually a chatbot gives the responses using LLM. But when I say
chatbot on top of rag, what am I exactly? Private chatbot. So I want to have a chatbot. But this chatbot is not
a generic chatbot. This chatbot will give me the answers particularly from the private documents. Private documents. If you want to talk
to specific to something, if you want to talk to your private documents, what is the way that you can handle that situation? Earlier we have talked about
it. What is it? If you want to have your private documents conversation, then you must go to rag. So I want to mix rag
with chatbot. So what we will do is the rest of the steps in rag will be same at the end instead of uh retrieval after
retrieval we will add another element called memory into it. Yeah. Shall we quickly recap rag what were the steps
step one in rag was what? Loading loading that will remain the same. Loading the docs that will remain the same. First I had to build rag isn't
it? Step two converting into chunks that will remain the same. Step three
that will remain the same. Yes sir. Step four storing storing that will remain the same. Yeah,
because this has nothing to do with user asking the question. Step five was retrieval. Instead of that,
now earlier it was simple retrieval. But can I now just simply take the user question and retrieve the document just
like that? No, it has to be retrieval plus I have to take the user previous questions context also. That means retrieval plus
memory. So that is where the chatbot comes into the picture, isn't it? Earlier we have used retrieval chain.
Now we will be using conversational chain. Retrieval
chain. conversational retrieval chain. So let us see all of that. The rag part I'm assuming that you are already
comfortable with it. So the files that we will be using I will just go ahead and execute that part.
So pi PDF is what I'm installing it here. If you want to read the PDF files I think in the last session somebody was
asking a question if I have multiple PDFs what I do this time we will take multiple PDF files. The only extra line of code that you will be adding is
instead of going every page you will go to every PDF file. So conversational retrieval chain is what you will be using. So here I'm getting all the C
build docs. I have multiple documents. I have stored them on GitHub. I have stored them in a zip file. I will get
all those zip files. Right now there is nothing here. I will get the zip files. I'll unzip them and then I will show all the PDF files. So you have the PDF file.
Civil score Indiapdf credit score tips dop civil score understanding PDF. All
these files are there. Now what I'm trying to say here is I have imported one zip file here that is all civil docs
set one zip. After unzipping I will get all these files. Guys, these are all multiple PDF files. Intentionally, I have taken multiple PDF files because
what if your information is in multiple PDF files? How do you build a rag on top of it? Usually, no matter how many files
are there, I will start with full text which is blank. At the end of the day, I want to take all this full text on top of it. I will build rag for PDF file and
PDF files. I will load each PDF file again. I will take pages. For page in pages, do you remember for page in pages like I will go through every page and
then I'll keep on adding it to the full text. So, overall number of lines. So I'm reading PDF file one, PDF file 2,
PDF file 3, etc. et. This is a sample one. There are 898 lines, these many words, these many characters. Step two
is split the data into chunks. Step three is creating embings, storing them in a vector database. So embeddings is
open emitting that I'm using. Vector database is chroma database that I'm using. I'm just browsing through this
assuming that you're already comfortable with it until here. This is a regular rack. The
remaining one anyway I'll write the code. Once you store them in the vector database you say my retriever is civil whatever is the database name and then
what is civil score. So this is the regular rag one once you define the retriever you will ask a
question you will get the answer there is some warning etc that you ignore the answer also you will not get it like these are all just the four retrieved
documents but now the actual conversation chain starts I will say my llm is equal to open AI
now temperature has to be high or low here tell me when you are dealing with rad temperature has to be high or low
when you are in doubt when you want to do the right thing what is the temperature that I generally suggest zero zero yeah because when you in doubt it's
always better to keep the creativity low isn't it temperature is zero max tokens anyway leave it to the default one my
temperature is low then I have to also define memory because this is going to be a chatbot this is not a Q&A engine conversation buffer memory now I'm going
to define not the regular Q&A rag I want to define conversational rag so my conversation or rag chatbot we can call
it as rag chatbot what is the difference between a regular chatbot and a rag chatbot what is the difference
it's a private specific things specific answers it's not lm so regular chatbot is lm Whereas the rag chatbot is
only from the private documents you will get the answers. Conversational retrieval chain from llm you use my lm
use my retriever. This is where rag is coming into the picture. The whole rag is wrapped into one thing. What is it? Retriever use my memory. I will not keep
equal to true just to get the answers. Let us see. So let me define lm define memory. Define this one. Now let me
build a chatbot here. User input is user will give the message. If the user is not saying quit then what is the name of
this right chatbot? So from from the right chatbot we will get the answer. This is the A output and then the next user input. We will go to the next user
input. Once I give it, it will ask a question to the user. I will say hi. Then it is throwing an error chat
history missing input case. I think we have to add one extra parameter somewhere in this particular place when
we are mentioning the memory. We have to somehow keep all this memory. So there is something called memory key which
will be connecting this rag will be looking for certain memory. So we have to say memory key is chat history return all the messages equal to true. this
extra parameter need to be given so that rag will be referring to that later on with that one now I would say your message I would say hi
hi I'm sorry I don't know the answer to that question why it is saying that any l would have told hi welcome to this uh whole thing welcome to a I'm the AI guy
etc etc but why are we getting this rag is civil one when we say hi it's from the civil point of view it says I do not know the answer I think this is a very
bad answer we would have given a system as saying that if somebody greets hi you will greet them back or something like that we would have told in the prompt somewhere here but anyway I don't know
the answer to that question let's ask the specific question what is civil score if it says I don't know the answer we will kill it isn't it civil score is
a three-digit numeric number etc etc does it increase does it increase yes
higher civil score typically indicates higher credit does civil score decrease
on its own it doesn't decrease a lower civil score typically indicates how to increase civil score again these
questions I'm asking random questions but the answer has to be there in the rack then only it will tell us How to
increase the civil some effective strategies for improving civil score include making timely payments etc etc. Probably this information would have
been there in those PDF files that we have done. What is cricket score?
What is expected answer? Don't know. I do not know the answer. A civil score. It is reading that as civil
only. What is cricket score?
It is actually taking cricket score as civil score. Let me ask another random question. What is the capital of India?
The capital of India is New Delhi. Probably in one of the PDFs it must have been there otherwise it is
hallucinating. Let me ask what is the capital of France?
I don't know. At least I'm saved. Everybody was nervous right? Why? Because the whole point of rack was to
say this answer. I do not know if I'm asking any out of the context question. Probably somewhere India would have been referred or in one of the document there
would have been a reference to New Delhi or something. That's why it would have told that okay again finally how do I come out of this chatbot either you can
put a hard rule of five or 10 conversations or here we have given the rule that if the user enters with
this is so building a chatbot rag chatbot is the one that uh probably inside the companies they are building
usually rack Q&A engine is sufficient you don't really need to build a chatbot but if at all you want to build a rag on top of it you want to add a rapper
called chatbot then you can follow this conversation retrieval chain I think in our last session somebody asked What if
Deploying Chatbots on Hugging Face Spaces
I want to make this as a UI front end UI? Now this is in the back end. Now if
somebody like let us suppose if we give this whole stuff to DevOps team, those DevOps guys will go to the server. On the server they will implement it like
in the front end only this thing will appear. Everything happens in the back end. How does that happen? Now for that
we need cloud access. Maybe some companies use AWS. Some companies deploy them on GCP or some companies depending
on whichever is the cloud provider like Azure they may be deploying these tools in there. Typically how it happens is
right now I have deployed it on hugging face spaces. This is also kind of cloud. So this is the front end. I will also
show you the back end after that. So I have taken this chatbot rag based chatbot. I have made it a generic
chatbot which means like anybody can drag and drop their files here. If you drop the civil files this becomes civil
files chatbot. If you drop any other files like let's drop some files here. Let me
browse the same set of files. Any PDF files you can drop. I have limited it to PDF. But if you take this tool further,
you can also read any type of files. Once we say submit, it is running. That whole rack processing is happening in the back end.
Once that is done, you can ask the question, what is cil score? This
question will go to my back end rag. The answer will be read. The answer will appear like this.
Does civil score increase?
Yes. Does it decrease?
Now this is a typical chatbot who just looks like your uh chatgptt isn't it? But if you drop any files here it will be a chatboard for anything. Typically
anybody can take this you can just simply download this your chatbot project is done because all that you need to do is you can drag and drop any
type of files here. So how this is typically done. You will go to the cloud provider. So here in hugging face they
have given something called hugging face spaces. You can create a new space. In that new space you have to give a name
and you have to choose what type of uh environment that you want to host it. Is it a docker, Gladio or static? What is
the CPU? Let's say if uh one user is using at a time. If thousand users are using per minute, then you may want to
give more power. If a million users are accessing it, you may want to use more and more. And then you can make it public or private etc etc. You create
the space. Once you create a space, if you go to that space, what you need to do is you need to upload some files.
In that space, you have to upload environmental file open AI API key. So in the settings somewhere, I have to
give the OpenAI API key. Where is it? In the variable secret I have to give my open AI API key. So that is
environmental variable. You remember in Google also we have this key symbol in that we have given our environmental variable. Yes or no? Yes sir.
Let me show you that. So here in Google Collab the environment is this one. But if you are on hugging face you have
to keep opening environmental variable. In the settings you have to give that. Again if I click on files this comes automatically. Readme file is to create
like if you want to give some information to the users that this is how you use it you can give a readme file. app. py whatever is the complete
application that we have the rag along with the chatbot etc everything you keep it in this app. py and then HTML
template just how the front end should look like. So if you see our application there is a symbol there is a man in the
tuxedo that appears when somebody types something. So what should be the font whether what should be the symbol here
what should be the left sidebar etc that is the HTML part usually that is not expected from you that you should know all of that if you are building this if
you're building this application inside Python that is your job as a data scientist usually the deployment usually
the devops team mostly comes into the picture or you along with the devop team will be deploying it okay and then if
you go to files what are the other files let us see app html requirements
requirements is nothing the list of packages that need to be installed. The moment you put all these packages in requirements, automatically this cloud
environment will automatically install all those packages and then it will create this application. If your HTML is
proper, then it'll give you this front end and then browse files the files and make this front end look like this. This
is how the final deployment happens. But again, this is not part of a data scientist journey that they have to take care of the deployment. They have to
take care of the maintenance of this, what should be the server, who is accessing the server, etc., etc. Usually separate teams generally tend to take
care of this one. Yeah, you focus on development of these models, development of these applications, pass it on to the
deployment team. Yeah, that is the story of memory or chat
bots.
Continue with the next video in the playlist. We are covering everything step by step. If you have any questions
or the comments, please post them in the comments window below.
```
