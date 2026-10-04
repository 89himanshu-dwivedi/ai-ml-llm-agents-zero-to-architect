# Prompt Engineering & Agentic AI Tools — English

> Structured from the provided transcript. The transcript content, examples, terminology and sequence are preserved. No outside concepts have been added.

# Role Assignment in Prompt Engineering

everything. Hundreds and hundreds of experts. Chad GP can be a doctor. Chad GP can be a coder. Chad GP can be a lawyer. Chad GPT can be a gym trainer.

So you have to give a specific role so that you can limit charge to think in that role only. So you have to give a

character or a role or a persona to charge GPT. So your prompt should always start imagine you are a coder. Imagine

you are a stock market expert. Imagine you are a dietician. Imagine you are a data scientist. Always your prompt

should start with that. Imagine like the question that you have in your mind whom what is who the field expert whom you

will go and ask you have to ask charge to take that role. So for example explain NLP to me. You have to say

imagine you are an NLP expert. Explain generative AI to me. Imagine you are an expert in generative AI and related fields. Imagine you are a Python

developer. Imagine you are a Python data scientist. For example, what is a good diet plan? Then how you should write?

Imagine you are a certified nutritionist with 20 years of experience. Write a deadline extension mail to my client.

How do you do that? Who writes the deadline extension mails? Imagine you are a business communication expert. Imagine you are a MBA marketing expert

or a manager with 20 years experience. How to earn money in the stock market. Imagine you are an experienced stock market expert with a proven track record

or the knowledge. Imagine you're an experienced investment banker. So the first thing that you should always include is a role. You have to tell JPT

what role it has to take. Then you'll get very effective answers. Are you clear on that everyone? Does it make

sense? Yes sir. Yeah. So always start your prompt with a role. The second effective element that

## The Power of Few-Shot Prompting with Examples

you have to add is examples. You always need to give some examples. Most of the times what happens is I have some output

in my mind. I want chat GPT to give me exactly this type of output. But no matter how many times I execute in

charge GPT I'm not getting the output that is there in my mind. I'm thinking chad GPT to give me this answer but it is not giving me somewhere I'm not

satisfied and I'm kind of fed up with charg multiple times I execute it's not giving me this. When you are in that situation it's better to give examples

what you want to include what you want to exclude in the prompt itself. Then ch will respond exactly the way that you are expecting. These examples are known

as shots. You have to give few shots. Few examples are known as few shots. And there's a very famous technique called few short prompting where you just give

examples of how your output should be looking like. So few short prompting is one of the technique that you can use by

giving examples. For example, what I want in the output is just this one only. The output should be the input

should be the overall review and the output should be whether it is a positive review or negative review and what is the main point that was

discussed in that review. So I want to take the review as the input. Maybe in my application I'm just looking for two elements. What is the sentiment? What is

the point that they're talking about? If this is the input, the sentiment is negative and menu card issues. Now if this is the input, usually what chat

does is it will give a very lengthy output two three paragraphs. I don't want all of them. I just want one line output. What is the sentiment? What is

the main point? Now if you want that in your if you have that in your head and if you give this as input and if you give instruction to charge but you do

not give me lengthy output give me the output in one line only. What is the sentiment? Even though if you write all that charge team may not be able to give

you effectively but a better method would be you just give these few shots. This is short one, example one, shot two

which is also known as example two. And if you give this as the final input, the output should be exactly how you are expecting. So here is an example. So

this is the review. This is the output. The review output and this is the review. And I'm just waiting for the output. Typically you will never see

Chity just give you one line answer. But I have given short one short two. It will give me just what I'm looking for.

Some of the few more few short examples are. Let's say if I write burger, I want to highlight what are the harmful substances, what are the average

calories and how many steps are required to burn. If I eat a hamburger, I may have to run four 15,000 steps. If I eat

French fries, I may have to run another 10,000 steps. Burger fresh fries 25,000 steps along with pizza how many steps

that means once we eat all this once we leave home probably next day only we should return to burn all those calories

so I want to exactly have this I want to have this type of output when I say pizza the output should be exactly

harmful substances average calories steps to burn and then fried chicken harmful substances average calories steps to burn so I have given two shots

and I expect the charg to understand what are my requirements and give me exactly the way that I'm looking for here is an example of few shot output

pizza harmful substances average calories steps to burn are 8,000 fried 30 seconds 10,000 steps to burn. This is the output.

Complete the below workout plan for 6 days a week. And I have given one example here. I don't want a very detailed workout plan. I just want a

simple table. Day one just exercise. Two sets push-ups and then chest flers. Then then the bench press for two sets 15 reps. Day two shoulders. Maybe day three

you go for arms. Day four go for the core. Day five go for the legs. That is how I wanted to complete and one of the day is rest. And I want exactly this

type of output. And JPT has understood my requirement because I have given the example. See this is a very simple prompt. I did not give a lot of

explanation. Sometimes instead of giving a very lengthy explanation of how you want the output to be, it's better to simply tell or show one example. Few

short prompting is very effective. A lot of experts use that. So the output looks like this. Day one, day two, chest, rate

three, back, legs, arms, core, rest, etc. So what was point number one? Element one was what? When you're

interacting with large language models in prompt engineering, first element is the role. Second one is

shots, examples or the shorts. The third element is always tell the domain and

## Importance of Domain and Context in Prompts

the context. You have to always tell the domain. Which domain you are talking about? What is your context? That must

be included. For example, if I'm saying give me Python examples, what domain are you talking about? So here I'm saying

Python developer domain. Then this is how like I want to learn Python. But if you are a Python developer, if you want to learn Python as a developer, then you

may have to master the basics, understand the oops concept, data structures, web development, and then real world projects. But that is for a

domain of developer. But I want to learn Python as a data scientist. Then this oops concept doesn't matter. Data structures doesn't matter. So I tell my

domain is I want to become a data scientist. This is my domain importance. Then you see that the answer gets changed. A lot of people highlight this

versus this and say that GGP is inconsistent. No, not really. RGB is just a next word generation engine and the next words are generated based on

what prompt that we give. If you see here master Python fundamentals, data manipulations and analysis is the next

thing. Data visualizations is very important aspect. I'll come to you. And then machine learning and then real world projects. So the domain that you

are thinking which domain are you talking about that need to be highlighted. If I just simply say suggesting a good diet plan it will give

the answer will be given to you. Some random answer some not random some very lengthy answer which is very generic will be given. But if you suggest if you

ask it to give the precise answer if you explain the domain imagine you're a certified nutritionist with extensive

expertise provide a personalized guidance on what constitute a highly effective tailored diet and you give your domain. I live in South India. I'm

a male. My age is 38. My height is this much. My weight is this much. For this you give me the diet plan. Otherwise if

you start giving me all those leos and then all those avocados they're very difficult to find in India. The same thing even if you are in US let's say if

it suggest that go for lentils dal and all that you know some things that are very easily available in India coconut

water or buttermilk or it sambar which are not available in US they may find it difficult domain and context is very

important to be given if you want to earn money in stock market you give the domain I want to like assume you are an

experienced investment banker stock analyst and then I want to go for long-term investing could me could you explain me the key factors and ratios

crucial for evaluating stock or long-term investments list these in an easy to understand format suitable for

beginners So these are the things that you have to look at when you are shortlisting a stock. Explain the philosophy of Bhagat Gita. What is the

domain philosophy of Bhagat Gita to a 12 years old kid in five points. I want to explain a very very in-depth philosophy

but not for everyone. For a 12 years old kid then you have to simplify it so much. Now the domain behind the scenes

is 12 years old kid and then the Bhagadita philosophy can be you know shortlisted or it can be summarized into

five points. You focus on your responsibility. Always focus on your inner peace. There's no point in comparing with others. Self-discovery always look into yourself. No, never

look outside and compare yourself to others. Equality and respect. The respect that you expect from others. Try to give the same respect to others.

Everybody is uh you know almost a god and spirituality. At the end of the day at some point everybody has to move

closer to spirituality. That is where you'll find the overall sense of accomplishment once you're done with the rest of the cars and all that stuff.

So that is the third aspect. What are the three elements that we have discussed in the prompt until now? The

first element that you should add is role. to give a role to your large language model. The second element

examples or the shots doain. The third element domain doain context

context. The fourth element is display and format. A lot of times we would love to

## Display and Format for AI Outputs

see JGP giving in a particular format but we are not getting the exact format that we are expecting. In that case you

can specifically ask what kind of format that you want. You want in bullet points you write I want in bullet points. If you want in tabular values, you have to

mention I would like to see that in tabular values, sections and subsections, code blocks or formatted or markdown format there are different

different type of formats that are available whichever format that you want you can mention. If you want it to be bullet points it will give you bullet points. If you want it to be kind of uh

each section and subsection that will also be mentioning it. So whatever is the format that you are looking for if you're looking for a tabular format that

tabular format is also given. If you want it to be mathematical formulation. If you want it to be code blocks, the

exact format that you are looking for, you don't like codelocks, then you ask it, do not give me code blocks, just give me the simple text. You you have to

particularly tell what kind of display format that you are looking for. That is one element. I'm not saying that you

should forcefully include all these elements into your prompt. I'm saying you have to keep them in your mind and you may have to utilize them whenever

there is a need. And the last element is iterations. This is a very good trick. If some of you are using it, very good.

## Iterative Refinement of Prompts (REDI Framework)

Otherwise, you have to pay attention to this. What is the regular approach that you do? You give a prompt and charge GPT

gives you the output. Let's say 30% of the output is uh good. You like this 30%

of the output. Remaining 70% of the output or maybe 30 to 40 was good. Remaining 60 to 70 was not the way that

you were expecting. This you did not like it. This is good. So in that case what do you do? Tell me honestly we just

rerun that again. We get the output. I like some portion. I did not like some portion. Rer it rerun it. Rerun it until

we get the best output. Sometimes how many times we rerun we may not get the best output. Now that is a wrong approach. What you must do is you you

should not expect your output in one window in one go. You have to give a chance to charge a bet to understand

your context in multiple iterations. So what you must do is you have given the prompt as the input and you got some

output and out of that let's say 30% is accurate. Out of that this 30% I like it. This 70% is inaccurate. What you

have to say is instead of rerunning it you write the prompt in the above output this 30% is good. The first two three

points were good. Include them. Write the output align to that. the rest of the 70% these these this these this this

point this point this point these are not in line with what I'm thinking try to avoid them try to include points from this this this if you tell chity what

has worked what hasn't worked then it'll give you a perfect output maybe this time 80% will be good 20% will be not good again you write the problem this

these four points were good but the last one point is not good change it keep it in my method then it'll change that one point 100% accurate then you take that

final output so expect your output to get in an iterative manner get the initial response have a look at it

resubmit and get better results so instead of resubmitting it without making any changes give a prompt is the prompt for example what is the history

of machine learning I got this output but the output is good but I'm not looking at this format then you say that

give me all the events in the list format so I would say that I have this output which is good the output looks good but give me in the list format

create a sales pitch for online training program adjust the above sales page edge the above always go iteratively take the

above one adjust the above one for data science how can I improve credit score could you give me the output in bullet points with examples it has given me but

it is giving me in dollars that means it is US or other country based I would say edge is the above output to improve civil score in Indian context. So what

I'm trying to say is you can use it or you can ignore it. Instead of getting the output in one shot, try to always go iteratively. Maybe the best answer that

you are looking for you may get in the fourth or fifth iteration. These are the few elements that you should keep in your mind when you are interacting with

large language models like chat GPT. This whole process is known as branch engineering. So what are the five elements? Tell me once again one more

last time. Five elements. The first element is role assign. Assign the role. Second element is

examples. Examples. Examples. The third element is doain or contain context. You have to include the

domain and context. Fourth element is display forat.

Display and format. How do you want to see your output? Fifth element is

some of you already know this. Some of you may be looking at it for the first time. What is the shortcut way to remember this? What is the shortcut way?

Ready. So you look at R E D I. What's my name?

Ready. Yeah. So by part of my name so whenever you're writing a prompt you always remember me re e dd i ro examples

domain display iterations so you must have ready in your prompt otherwise it

may not be perfect but I'm not saying that you should force it keep this in mind when you're interacting with large language models large language models

are very powerful chart GP is very powerful and that's one of the disadvantage by chance if you give if you make a small mistake in the prompt

the output will be very much wrong so try to include these five elements when you are interacting with large language

models not only that everybody Everybody have their own tricks. Some of the new tricks that I have found when I'm

## Advanced Prompting: LLM Clarifying Questions and Chat Memory Management

interacting with large language models is one of the trick that has helped me wonderfully well in the last one or two

years is let the LLM ask you clarifying questions before answering. Usually what

we do we write a prompt we expect the output. Isn't it? I write my prompt I expect the output. So don't ask LLM to directly go to the output. You write

your prompt and don't get the output. You say that in my prompt if you have any doubts if you have any questions ask me questions before you generate the

answer. What large language model does is based on the prompts that you have given, it'll make some assumptions. If you say I want to learn Python, it'll

assume that you're a Python developer. It'll start giving me the output. But instead, you write your prompt. If I miss anything in my prompt, if you have

any questions, ask me questions before you give me the output. You always add that one line. You will see wonders in your output generation. Ask LLM to ask

you questions before it starts generating the output. It may ask you a couple of questions in two, three iterations, then it'll generate the output. Then we will also get to know

what LM is thinking. A lot of times we assume that LLM knows everything, but it assumes something which is not related to us. You can clarify that. So you can

clarify your intent, you can add the missing context. LM will ask you this context is missing. I'm not able to understand that. Can you give me more information on that? It prevents a lot

of rework. It improves the accuracy because LLM is not making false assumptions. So this if you want to

reach the pro level, always ask the prompt, give the prompt also tell large language model, ask me questions before

you give me the answer. Does it make sense? Is it making sense to you? Yes. A lot of times these things look very

simple, obvious. You might be thinking, why the hell are you telling us this? Anybody knows? The thing is consciously making you aware that if you start using

all this that is when you will get the best results and there is one small mistake that a lot of people have seen

doing it. I want to clarify it. Now this large language model let's say if you go to chat GPT and start interacting with

it. If you are starting a new chat that is fine. Let's say if I say I want to learn Python and then you will get the

output and then how many how many players

are there in a cricket team and then I have asked some questions about the cricket and then tomorrow I have logged

in in the same chat I am typing something else give me a good diet plan.

So what happens is this chat GPA it will consider this whole thing as one chat. When you are writing this, it will take

the previous conversation as a context. So sometimes when you are asking a question, it may be important to clear

the previous conversation. Previously I have talked something with chat GPT but right now I want to start a new topic

whole together. So some of you might be already doing it you can start a new chat but within the same chat if you are continuing this chat within the same

chat if you are writing then you must say clear the previous conversations or start a new chat. I don't want any

context from the previous conversations. Then you must explicitly mention start a new chart. You can either start from

here or you can refresh or ignore the ignore my previous discussions or clear the previous chart. Begin a new

conversation. Any of such things you have to write. This is very important especially when you do not want to take the context from your previous

conversations. So that is the point of prompt engineering. Very easy concept. We'll

try to practice it now with a couple of lab exercises on prompt engineering. But before that let me take a couple of

questions. Any questions? Anybody

sir I have a question? Yeah car. So like uh when we uh use the chat JP uh for a longer duration we remain on the

same chat. Uh like for example I want to uh find out some questions about Excel or SQL and later on we just continue the chat

for a longer duration a day or two or three and the space is getting filled up. So it keeps on lagging at a

particular point like it will surely get hanged or will uh delay the texting

speed or uh will not give the proper amount of uh time to write those text or

will give a reply very late. So why is it like so it happens for a like particular chat that you have to go to a

new chat then it will work very smooth. So what chatb does in the background is it will not only take this particular

one line as a prompt it will also consider the rest of the previous things as the context. This is called memory.

It'll keep memory in the it'll have memory in the background. So

whenever you asking a question, this is not Q&A engine. This is chat. When you're chatting with me, you told me sir

uh my name is this. Tomorrow when you are interacting with me, I cannot ask you what is your name. Isn't it? This is a chat. Second day after tomorrow also I

cannot ask you your name because you have already revealed your name. So what when you are chatting with RGBT what you asking it to do is you're asking it to

remember everything that has happened both input and output. So when you're asking 25th or 30th question here when you're having a conversation which is

your dialog is 25th dialogue and chity is 26th dialog 50 dialogues between you and chity it will keep them in the

memory to generate the answer for the 51st dialogue that is the reason why it may get little slow there's a trick for it let's say if you still want to keep

the contact you can copy all this and you can put them in a PPT or PDF file or word file you can attach that you can

start a new chat but I also want to have the context what you can do is you can attach files isn't it you keep all this information in a file attach the file

and start a new chat with that file so these days we have an option to branch this conversation into a new

chat. I think a better option would be always uh keep your uh different different chats in different different uh chat

windows. But yes, like you can uh go to one particular chat but one major thing is chatgity will always have memory in

it. You see whether that memory is needed then keep the memory in a file then it'll be easier for chat GP to process it.

Uh hi good morning. Good morning. Uh ward actually you know I would like to uh clarify one thing. uh the purpose

of uh the prompt refinement of prompt is basically is uh you know I mean lessing

down the cost of the tokens what we are using behind the scene or is it more over you know the goal is getting the

accuracy because what I understand is you know I mean if you are defining the prompt it is not necessary that we will I mean behind the scene we will be using

less tokens so that's that's the confusion I just wanted to what is your perspective on this as of now see if you see one is the cost

the second one is accuracy now as of now we are focusing only on accuracy of the output at this level. Maybe at a later

point of time if I want my chat GPT to use lesser number of tokens. There are other ways to handle it. Yes, even from

the prompt also we can control the tokens. But a better way would be when we are calling it from an API we can always say maximum to maximum tokens is

let's say 256 or like for the people who do not know what is token you can consider one each word as a token and right now charg is free for us but later

on when we are using a paid version for every token that they are giving us they will charge us some money and if we want

to show lesser number of tokens then we can save a little bit of money and for a very big application that will have a huge impact but right now the idea is

not to save the cost right now the idea is to get the best of the best results by fine-tuning your prompt so this this should be your first priority let me get

the best output or the accurate output then immediately with that accurate output can I save some money that should be the approach that we should follow.

Sounds good. Thank you. Thank you sir. Yeah.

Okay. Thank you sir. So I have a doubt regarding the prompt playing. So how it is related to the LLM performance. So

somewhere I have read that uh there's a disadvantage regarding the risk token overload as well as increasing hallucination probability also. So is it

right sir? I think we'll come to that later because there are too many terms that we have not touched at all out of that. Okay.

Maybe once I clarify five, six terms out of that then I'll come to this. Hold on to this. Okay. Okay. Sure. Thank you.

So let's do a couple of examples. What I want you to do is write a short blog post about why time management is

important. Now one of the lest one of the easiest way would be you just copy this. Write a short blog post about why

time management is important. Directly copy paste into charging. That anybody would do. But what I want you to do is I want you to structure this prompt. That

means I want you to follow this role examples domain display and then do it

in two three iterations so that GPT would understand exactly what you are looking for. Maybe you can give a role

what role we can give. Imagine you are so and so person. Example means how much uh like you can include some of the blog post that are there or you can ignore

this aspect. Maybe it's not that easy to give an example here. And then what domain you're talking about when you're saying time management for kids, time

management for working professionals or time management for general public, you must mention that. and display format whether you want it to be bullet points

or paragraphs or including bullet points and paragraphs as well as the tables what display format once you get that output ask it to include something

exclude something include something exclude something do it for two three iterations finalize the best one so go for this exercise all of you the first

exercise go to chat GPT try to structure your prompt using the prompt engineering methodology try to get the output for it

now we will move on to our last part of our discussion for today I'm going to introduce some of the agentic AI tools that are available I'm going to tell you

why they are important But before that I'll pause here and take a couple of questions.

Hi sir, may I may I ask a question? So that last part which is iteration that further you know improvises the

quality of search and the content. So can we have a little deeper insights domain wise like if we get a code how

this iteration could improvise it? Second in the second case if we get a text stuff like like a routine and all how this further iteration layer by

layer can further improvise in two three cases. First a code then a text then but any other you know specific case. So let

me take somebody's uh prompt and put it here. Let's say for the interview questions I have kept it here. So like

Sinoas has written this. Assume you're an interview interviewer and candidates has seven years experience. Ask me 10 interview questions. Data science roles which covers basic to medium. So this

looks like a good prompt. Now I have given it. I go to the output. Okay. One is data and understanding question. How

do you handle missing values? Followup is this statistic is this one probability machine learning. So I think some of them are good and some of them

like I'm not uh really satisfied with business understanding. So rest all are good. The business understanding one I did not like it. So one iteration we got

the output. Now what I would say is add four more questions on business understanding

specifically or related to banking only

because earlier I did not give any banking but now in the next iteration I'm saying related to banking only. So what it'll do is it'll give you the

output already you have that output. Here are the four additional business questions. 11th is credit risk modeling. So you already have that output but you

can also ask keep those 10 questions along with them. If you add these four, it will give me 14 questions. It'll give you 14 questions. Now, within fraud, if

you want to convey or if you want to once you have finally decided it, give me the full list of questions. You you

liked all these questions, but you want them in tabular format. List of questions in a tabular format.

I would say before that add two codebased questions and give me the full

list of questions in the table format. So I want 14 to 16 questions in the overall table format and this is what I

want. Instead of getting this table in one shot in one go it may not be that easy iteratively if you follow you can spend less time but you can reach your

final goal output within uh you know two three iterations. That's what iteration means. Make sense?

So what I'm trying to say when you are saying like when we are saying iterations is you try to reach your final output in one two three iterations

by having a conversation with your chipity so that it understands your context one by one by one. You can tell what you like, what you do not like.

Uh hello sir here I have a question. Yeah. So uh how we are using this in the real time? Suppose we are showcasing any

project. So if you're showcasing this like I have experience in prompt engineering. So how we are going to show it in the real? It's not a good idea to show prompt

engineering in the project experience. Project engineering is like basic communication. Let's say you have good English communication. We generally don't show that as a specific very big

skill set. Isn't it? Prompt engineering is like a your communication with large language model. I do not suggest that I have prompt engineering skill set.

However, if we are applying as a fresher sometimes somebody might want to we may want to tell them that I know this as well. You can do one thing. You can

quickly complete any certification online by IBM or any free certification or course there or anywhere a small engineering certification. You can say

that I have completed engineering certification. Okay. Yes. Yeah. But uh it's not a very big skill that we should highlight and try to push

it like people may not really take it uh you know that seriously. Okay. So then in um resume we can so

that like we have experience into identity is it is it the upcoming sessions we'll cover such projects.

Okay. Your problem engineering is like you you're one of the skill set which you everybody must have. Okay. Thank you.

## Introduction to Agentic AI Tools

There is one trend that everybody must follow. The trend started probably 3 4 months back. Agentic AI tools have

started appearing. These are like specific to one particular task or one particular domain. So charge can do

everything. JBD can summarize the text. JBD can give you interview question. GPT

can work as a life coach and tell you time management related stuff. What if I create an AI agent which will do a

specific job only and it a lot of features are added only related to that specific job. Then I will say that is one of the AI tool. What if charges

but what if I create one AI tool this AI tool which does only one job which is PPD making and that it does one of the

best wonderful job. It cannot do anything else. It cannot do summarization. And it cannot do question and answer. It cannot do anything else. But it can make PPDs and it'll give you

it'll format the PPDs well everything related to PPDs it will do a very good job. So maybe AI PPT maker is one of the

AI tool and when users try it they find it wonderful. So instead of me using LLM and preparing a PPT let this PP maker AI

PPT maker use LLM in the back end let me use this tool. Some people are creating these products some people are creating

these services and selling them and some of them are working wonderfully. So what are agentic AI tools? Why you need to

pay attention to them? One of the best part about this, these are very easy to use. These are too easy to use and you

must be aware of these agentic AI tools. Some of them are free, some of them are paid, some of them have some free credits. You must be trying them out.

Like the way two years back we were trying from here on you must be trying agentic AI tools. If you are still with

Chipity, that means you are using old technology. You have to see specific AI tool that is doing internally it may

have charged language model like Gemini or any other version. We don't care but it is doing a

specific job. AI tools that handle single task like writing one tool AI writer. Let us suppose if you want to

write a short movie, if you want to write a script, if you want to write a novel, yeah, GPD can do it. You can ask a prompt, it will do it. But what if

somebody has created an AI tool which has taken care of everything how the character should be spanning, how the overall blocking should be done, how the

screenplay should be, everything was taken care of where you just need to go put your ID automatically. It will be taking care of everything. That will be

one tool. There are specific tools for designing, summarizing. So AI tools will do one one task. Let me show you some of

the most widely used AI tools that are kind of famous these days. These are the 45 best tools in 2025 tried and tested

uh for AI assistant charging rock cloud for video generation. Cynthsia like video generation like you give the text

it appears like somebody will come and talk synthesia Google way plus opus plus nanob I think a lot of people are trying

it already for automation these these these and all that. Let's try one of the tool. Let me show you. Let's say PP presentation. Kama is one of the best

tool that I have seen very quickly. If I want to create a PPT for example, I want to create a new PPT. Either you can

paste the text. That means you can generate the text in charge GPT and paste it or you can generate here. That means you give your prompt here. The

text will be generated and then PP will be generated or you can take the information from a URL also. Let me do one thing. Let's go to chat GPT and then

try to generate a text for PPT. Then we will go to GMA which is a AI tool which will make the PPD for us. So maybe our

manager asked us, hey can you give a presentation? Please uh uh provide

please provide comprehensive please provide comprehensive content for creating a PPD

creating a PPD on ML versus uh machine learning versus deep learning versus uh

generative AI versus agent AI. include examples

and explanations business cases also. So this is what I

want like even though I can study it but here I want to get it I will get the information from JB first I will spend a

couple of times I will spend a little bit of time in finally finding this output once I'm satisfied with this output I'll copy it from here slide five

is on genai slide six will be on agentic

slide seven will be a comprehensive overview which is comparing slide eight is evolution slide nine is real world business cases like business healthcare

retail slide is key challenges in each of them. Slide 11 is future of AI slide. Okay, final thought slide 13. I'll come

to this AI tool and then I'll simply paste it. You can create a presentation or you can create a web page. They started with presentations. Now web page

or document or social media post as well. We can use a default or traditional or at all. I would say go

for the traditional PPT style and then generate notes from the outline. Summarize it or preserve the exact text.

Preserve means keep the exact text as it is. Otherwise you can put a lot of text and ask it to generate the notes or summarize it. I will say keep it as it

is. Continue your prompt. So it will now generate the PPT for me. You will be surprised the quality of the PPT that it

will prepare.

One slide is done.

It's going on. One out of eight is done. A quick question here. Yeah.

Do you have a paid version of gamma or No, no, this is a free version only. Okay. But uh I think GMA gives you

slides right in one uh right. So it it it kind of stops you beyond a point. But here I just want to

tell you I'm not really uh trying to create anything. I just want to tell you that there are these AI tools like people are trying them and then once

they like everything about it. Let's say something like this will be your final output. Once you like them, if it is solving your purpose, then instead of

going to chat GBT and developing something on top of it, people are right now uh buying this. So there are two opportunities. Either you can solve a

problem and create a product or a service like this and sell this AI tool or the first thing that you should be doing is look out for such AI tools that

will make your life easy. If I want to quickly prepare a PPD that looks good and decent if while I'm presenting it

then you can use this is just one of the example. So you can use something like this. This is the final version of the

PPDML versus DL versus J etc. But yes, Gamma is the paid version like they will give you some free credits beyond that you have to pay. Now there is one

website uh there is an AI for that. There is an AI for that. So there is an

AI for that. So this is a website that has all the tools that are listed. So

not only listed they have all the ratings also. So if I look at the trending uh tools or the leadership

board somewhere there is one leadership board. So this is the list of all the AI tools that are available right now. Chargity is number one. Gemini is number

two. Like sometimes we will be surprised there are some tools that the rest of the world is using. We are not aware of them. A lot of times a lot of students

ask me how do you keep up with the pace at which this agent AI is evolving? How do you know which AI tool to use when?

How do you know all these AI tools? For such question the answer is this website provides a good answer. The whole world must be crazy about a particular AI

tool. If you want to know quickly then you can go to this leadership board. This is this website itself is not paid.

You can uh get the information for free. Free peak AI generator is number three that world is using. Perplexity uh Thea

and then notebook LM is wonderful one. You must try notebook LM. All of you how many of you have not tried notebook LM?

You must try that. Let's say let me give you a quick glimpse of that notebook. LM. Imagine I have a YouTube video. I

have a website which I want to quickly summarize or if I have a YouTube video that I want to quickly understand then

you can create a new notebook and then you can just put you can add either

website link or YouTube link your own PDF document. You can paste the text and then it will give you flashcards. It will give you it will generate quiz

questions out of the text that you have given. The first thing that they have started was audio overview. It'll create a podcast out of the information that

you have given. You have given a PDF file. it will create a podcast and it'll be very interesting to listen to that podcast uh which is totally based on

this particular information. So you can go to this uh there is an AI for that and see what are the AI tools that are

used by the people in the world. These are all the rankings some of them may be very useful for you.

So from here on maybe the world hasn't adopted these AI tools yet but I have a feeling that for every task that we do

there will be an AI tool that will be specifically fine-tuned uh with all the features loaded in it and we will be

using it very quickly. So to create a PPT there will be an AI tool which will be embedded in the PPT or around the PPT

which will quickly give us that PPT to create an Excel dashboard uh an AI tool may come up in future.

So that is the story of large language models prompts engineering and AI tools. One good news that I can tell you as of

now the world is mostly exploring AI in the spaces that were not really touched

earlier. Video generation was not really developed 20 30 years back. Image generation was not there 20 30 years back. Meeting assistance, automation,

research, writing, search engines. They were there. They're getting better. Graphic design, app builder, coding tools, knowledge management, email,

scheduling, presentations, AI assistance. But you might not see immediately data visualization, data analysis, data visualization, data

analysis, data mining, data science related ones. You may not see here because we are already doing it outside. Even if you bring AI, it may not do a

very big job beyond what we are already doing. So to reach here AI to reach or replace a data analyst or a data mining

expert or a data scientist, it may take some time. So our job is somewhat safer comparatively but yes nothing is safe

like maybe there are some companies which are actually creating some AI tools to replace or to increase the productivity quickly. So as of now we

are solving the problems that were not touched earlier but very soon the world will reach here as well. Okay. So we have to have a look at all these AI

tools. We have to get acquainted with all these AI tools. If you are just a data analyst that is not sufficient. You have to be a data analyst who can also

use AI tools that are related to data analysis. If you are a PowerBI data visualization expert you also need to have PowerBI data visualization with

some AI tool. uh as a plug-in. If you are using Excel, you have to quickly plug in 1 2 3 4 5 AI tools into Excel

right now. Immediately after this session, plug in five AI tools that are freely available. Try to experiment with them. Try to plug in chargot, Gemini or

some other visualization, some other PowerBI plugins into Excel itself and see how can you make it much much effective. That is what we should be

looking for. So that is a story of large language

models and prompt engineering. Continue

with the next video in the playlist. We are covering everything step by step. If you have any questions or the comments,

please post them in the comments window below.

## Summary

- Role assignment, examples/few-shot prompting, domain/context, display/format, and iterative refinement are presented as key prompt-engineering elements.
- The transcript explains how roles such as coder, nutritionist, investment banker, interviewer, and other experts can be assigned to an LLM.
- Few-shot prompting is explained through review, food, and workout examples.
- Domain and context are illustrated through Python, diet, stock-market, and Bhagavad Gita examples.
- Display and format instructions include bullets, tables, sections, code blocks, Markdown, mathematical formulations, and plain text.
- Iterative refinement is explained as giving targeted feedback on what worked and what did not work instead of repeatedly rerunning the same prompt.
- The transcript presents REDI as a memory aid for Role, Examples, Domain, Display, and Iterations.
- It also recommends asking the LLM clarifying questions before generating the final answer when information is missing.
- Previous chat context/memory and starting a new chat or explicitly clearing previous context are discussed.
- The transcript distinguishes the immediate goal of output accuracy from later token-cost optimization.
- A time-management blog exercise and an interview-question iteration example demonstrate the method.
- Prompt engineering is described as a useful skill, but not something that necessarily needs to be presented as a major standalone project skill.
- The transcript then introduces specialized/agentic AI tools for specific tasks, including presentation creation.
- It discusses AI-tool discovery/ranking websites, NotebookLM, and the growing number of task-specific AI tools.
- The final message encourages professionals to combine their existing skills with relevant AI tools.
