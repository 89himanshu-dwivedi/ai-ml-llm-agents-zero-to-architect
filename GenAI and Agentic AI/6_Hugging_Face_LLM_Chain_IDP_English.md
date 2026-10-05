# Hugging Face, Prompt Templates, LLM Chains, IDP, and PDF-Based LLM Applications

## 1. Introduction to the Course and Hugging Face

This video is part of a series, and the previous videos in the playlist should be completed before starting this video. Playlist information, materials, and code files are available in the video description.

If you want to use other free models, they are available on **Hugging Face**.

## 2. Overview of Models on Hugging Face

Hugging Face is introduced as a hub containing many models. Companies can keep their released models there.

Examples mentioned include:

- Meta's Llama models, including Llama 3.1.
- Google's models.
- Models designed for specific tasks.

You do not always need a large language model for every application. Sometimes you only need a small or highly specific model.

### Language Translation

If an application only needs translation, such as French or Spanish to English, a dedicated translation model can be used instead of a large general-purpose model.

The transcript gives **FL T5** as an example of a language-translation model.

### Sentiment Analysis

If an application only needs sentiment analysis or emotion detection, a large language model may be unnecessary. A text-classification model can be used for the specific task.

The transcript suggests sorting models by downloads or likes when searching for a model. A model with many downloads may indicate that many people are using it.

### Summarization

If the application's only purpose is summarization, a dedicated summarization model can be used instead of a general LLM.

The transcript describes Hugging Face as having a very large number of models for tasks such as:

- Text generation
- Image-to-text
- Text-to-video
- Text classification
- Sentiment analysis
- Emotion detection
- Summarization

## 3. DeepSeek and Open-Source LLMs

Some companies release open-source large language models and keep them on Hugging Face.

The transcript uses **DeepSeek** as an example and discusses it as a lower-cost or potentially free option for personal use.

To access Hugging Face models through code:

1. Create a Hugging Face login/account.
2. Go to account settings.
3. Open the access-token area.
4. Create/get an API key or access token.
5. Use that token to access Hugging Face models.

The transcript says this exercise may be done later because Hugging Face can be somewhat slower than the other providers used in the course.

If a company does not provide access to another LLM provider, the transcript suggests asking whether Hugging Face can be used.

## 4. Using Hugging Face with LangChain

The transcript demonstrates using a Hugging Face model through LangChain.

The token is stored in an environment variable, referred to as a Hugging Face Hub API token.

The transcript introduces:

- `langchain_huggingface`
- Chat Hugging Face
- Hugging Face Endpoint
- Model repository ID

A Hugging Face model has a **repository ID**. Examples involve Meta Llama and DeepSeek models.

The repository ID identifies the particular model that should be called.

The transcript explains that the newer approach involves defining a chat model first and then using that chat model.

Example:

```text
Write a poem on machine learning.
```

The transcript observes that DeepSeek may produce a longer response and may be slower because the model is hosted through a public cloud.

It also discusses a step-by-step thinking style in the output. Some users may like this style, while others may prefer a direct answer.

The transcript presents three broad ways of accessing LLMs:

1. OpenAI
2. Another free model/provider such as Google/Gemini
3. Hugging Face

The key message is that lack of access to one particular LLM should not be treated as a reason for not building an LLM-based application.

## 5. Guardrails and Why Prompt Templates Matter

The transcript returns to guardrails.

Imagine an application whose only purpose is to write poems. You may want users to follow the application's rules.

For example:

- The application may allow a four-line poem.
- A user should not be able to ask for a 200-line or 2,000-line poem.
- A user should not be able to use the application for unrelated personal tasks.
- Excessive output can increase token usage and cost.

Instead of keeping the prompt completely open-ended, the transcript introduces a **prompt template**.

### Prompt Template

A prompt template lets the application developer control most of the prompt while leaving only a limited part for the user.

Example:

```text
Write a four-line poem on the subject {subject_name}.
```

Here:

- The complete structure is controlled by the application.
- `subject_name` is the variable.
- The user can choose the subject.
- The user cannot change the overall instruction.

The variable is represented inside curly braces.

The user could provide:

- `data science`
- `Father's Day`
- `machine learning`

Additional rules can also be placed inside the template, such as:

- Do not write more than four lines.
- Do not use more than a specified number of tokens.
- Other application-specific rules.

The user has limited freedom while the application controls the main prompt.

## 6. LLM Chains and Prompt Templates

The transcript introduces **LLM Chain**.

There are three main elements:

1. LLM
2. Prompt / Prompt Template
3. LLM Chain

The LLM Chain connects the prompt template and the LLM.

Conceptually:

```text
User Input
   ↓
Prompt Template
   ↓
LLM
   ↓
Output
```

The transcript describes using an LLM such as OpenAI and a prompt template such as:

```text
Write a four-line poem on the subject {subject_name}.
```

The chain is invoked with input such as:

```text
data science
```

The resulting prompt effectively becomes:

```text
Write a four-line poem on the subject data science.
```

The user can change the subject but cannot bypass the application's main rules.

## 7. Another Prompt Template Example

The transcript gives another example where the application should return historically significant steps in a field.

Possible user inputs include:

- Organic chemistry
- Computer science
- Physics
- AI
- Machine learning

The fixed template is essentially:

```text
Write down the historically significant steps in the field of {field_name}.
```

Here:

- The wording and purpose are controlled by the application.
- `field_name` is the variable.
- The user chooses only the field.

The transcript demonstrates invoking the chain with `machine learning` and `AI`.

The larger purpose is not simply to make prompts easier to write. The template prevents users from turning the application into something different from its intended purpose.

## 8. Why Prompt Templates Are Important

The transcript explains that an open-ended prompt gives the user too much freedom.

For example, if an application is designed only to generate poems, the user could otherwise ask:

- What is the capital of India?
- Give me Python code.
- Solve a mathematical problem.
- Summarize something.
- Do something unrelated to poems.

A prompt template helps ensure that the application continues to perform its intended core job.

The user is given only a limited variable, while the rest of the prompt remains under application control.

### Template Analogy

The transcript compares a template to a fixed signboard or play card.

Most parts remain fixed:

- Company name
- Employee ID
- Slogan
- Other fixed information

Only a specific blank area changes, such as where a person's photo is placed.

This allows everyone to follow the same structure while changing only the permitted part.

## 9. Communicating with an LLM from Python

Previously, the user communicated with LLMs through a chat application or website.

Now the LLM is accessed from Python code.

Basic flow:

```text
Python Code
   ↓
Prompt
   ↓
LLM
   ↓
Response
```

The response can later be used to build applications and solve industry problems.

The transcript introduces **Intelligent Document Processing (IDP)** as an example.

# 10. Intelligent Document Processing (IDP) with LLMs

The transcript discusses IDP as a job/process that has been significantly affected by generative AI.

Previously, IDP teams wrote a lot of code to scan documents such as:

- Images
- PDF files
- Invoices
- Forms
- Claims documents
- Medical records

The purpose was to extract specific information.

### Example: Invoice Processing

From an invoice, an IDP system may need to extract:

- Overall invoice amount
- Client email address
- Items
- Item prices
- Quantities
- Bank account details

### Other IDP Use Cases

The transcript mentions:

- Customer onboarding
- Physical-form processing
- Insurance claims processing
- Car insurance claims
- Life insurance claims
- Health insurance claims
- Hospital documents
- Email attachment processing
- Medical records management

Before LLMs, this could require significant coding effort and accuracy could be limited.

The transcript states that LLM-based processing has significantly increased accuracy and processing speed.

## 11. Traditional IDP vs. LLM-Based IDP

### Traditional Approach

Earlier, developers could use:

- Regular expressions
- OCR (Optical Character Recognition)
- Python functions
- Pattern matching

Regular expressions could identify patterns resembling email addresses, dates, or numbers.

The transcript points out that this becomes difficult when information does not have a simple predictable pattern, such as bank-account-related information.

### LLM-Based Approach

The transcript demonstrates:

```text
Image
  ↓
Image-to-Text
  ↓
Invoice Text
  ↓
Prompt Template
  ↓
LLM
  ↓
Extracted Information
```

First, the image is converted into text.

Then the invoice text is given to the LLM with a controlled prompt.

Examples:

```text
Take this invoice text and give me the email address.
```

```text
Take this invoice text and give me the total amount.
```

```text
Take this invoice text and give me the account details.
```

## 12. Image-to-Text Step

The transcript demonstrates using a Python package referred to in the recording as **PyreSct / PyTesseract-like OCR tooling** to convert an image into text.

The basic idea is:

1. Open the image.
2. Pass the image to the image-to-text function.
3. Store the resulting invoice text.
4. Give that text to the LLM.

The transcript emphasizes that this image-to-text step is needed when the original input is an image.

It also notes that modern LLMs can process images directly, depending on the provider and available model.

The transcript mentions image-capable models from providers such as OpenAI or Gemini as another way to extract text from images.

## 13. LLM Chain for Invoice Extraction

The same three elements are used:

1. LLM
2. Prompt Template
3. LLM Chain

For IDP, the transcript recommends **temperature = 0** because the task is factual extraction rather than creative generation.

Example:

```text
Take the information from {invoice_text}
and print the item-wise price and quantity.
```

The invoice text is the variable.

The prompt template receives the invoice text and creates the final prompt.

The LLM Chain connects:

```text
LLM + Prompt Template
```

and invokes it with the invoice text.

### Output Keys

The transcript introduces named output keys.

Examples:

- `item_wise_price_quantity`
- `email`
- `bank_details`

This makes extracted information easier to identify and store.

If the goal changes from extracting item-wise price and quantity to extracting an email address, the LLM and general chain structure remain the same. The prompt template and output key are changed.

## 14. Scaling the IDP Example

The transcript explains that the example is small but can be expanded:

```text
Multiple Invoices
      ↓
Extract Text
      ↓
Extract Required Fields
      ↓
Store Results
      ↓
Database / DataFrame / Table / File
```

For thousands of images, results can be stored in:

- A database
- A DataFrame
- A dictionary
- A table
- Individual files

A loop can process different invoices, extract required fields, and store results.

The transcript suggests this can become a properly structured product or project.

# 15. Extracting Information from PDF Files

The transcript then moves from images/invoices to PDF files.

A user may have a private PDF and want the LLM to answer questions based on that PDF.

Example:

```text
Regulatory Rules in Credit Risk Models
```

The requirement is that the LLM should answer using the document rather than simply relying on its general knowledge.

### PDF Processing Flow

The transcript describes:

1. Install/use a PDF loader.
2. Load the PDF.
3. Extract the text.
4. Store the PDF information in a document format.
5. Put the document text into a prompt.
6. Ask the LLM to answer based on that text.

The transcript mentions a PDF loader from LangChain.

## 16. PDF + Prompt Template + LLM Chain

The same structure is repeated:

```text
LLM
   +
Prompt Template
   ↓
LLM Chain
```

A prompt template might say:

```text
Read the following text and summarize it into 10 short points.

{input_pdf_text}
```

The PDF text becomes the input variable.

The transcript also gives a question-answering example:

```text
Read the following text and tell me what is [specific topic].
Do not make up anything.
```

The purpose is to make the model stick to the provided document rather than generate an answer from its own knowledge.

## 17. Temperature for Factual Document Questions

The transcript repeatedly emphasizes that when the task is factual, **temperature = 0** is the safer choice.

The reasoning presented is:

- Creative tasks can use higher temperature.
- Factual extraction or document-based answers should use lower temperature.
- When in doubt in this type of application, use 0.

## 18. Limitation of Putting an Entire PDF into the Prompt

If the whole PDF is inserted into the prompt, the complete prompt becomes:

```text
Instructions
+
Question
+
Entire PDF Text
```

The input text itself consumes tokens.

The transcript explains that there is a limit to how much text can be included in a prompt because the model has a context/input limit.

Therefore:

- A small document can sometimes be placed directly into the prompt.
- A very large document should not simply be inserted in full.
- Large amounts of text can exceed the available context.
- The model may not be able to process the entire document as one prompt.

## 19. RAG for Larger Documents

For larger documents, the transcript introduces **RAG (Retrieval-Augmented Generation)**.

The stated idea is:

- If the document is very small, loading the full document and putting it into the prompt may be acceptable.
- If the document is large, use RAG.
- RAG is the dedicated technique for answering questions based on larger document collections.

The transcript says RAG will be covered in the next topic/session.

## 20. Conclusion and Upcoming Topics

The session covered:

- How LLM APIs work.
- Different ways of accessing LLMs.
- Hugging Face and its model hub.
- Specific models for specific tasks.
- Prompt templates.
- Guardrails.
- LLM Chains.
- Communicating with LLMs from Python.
- Intelligent Document Processing (IDP).
- Extracting information from images and invoices.
- Extracting information from PDF files.
- Using document text with prompt templates.
- The limitation of putting large documents directly into prompts.
- The need for RAG for larger documents.

The transcript suggests taking the IDP example one step further and creating a small project from it.

The upcoming sessions are described as continuing into RAG and related topics.

## Summary

The main flow taught in this session is:

```text
LLM
+
Prompt Template
↓
LLM Chain
↓
Application Output
```

For document processing:

```text
Image / PDF
↓
Text Extraction
↓
Prompt Template
↓
LLM
↓
Structured Information / Answer
```

Hugging Face is introduced as a source of many models, including models designed for specific tasks. Prompt templates are used to keep users within the intended scope of an application. LLM Chains connect the model and prompt. IDP shows how LLMs can be used to extract information from invoices and documents. For small documents, the document text can be placed directly into the prompt; for larger documents, the transcript introduces RAG as the next technique to learn.
