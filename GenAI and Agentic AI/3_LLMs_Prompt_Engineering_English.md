# LLMs & Prompt Engineering — English Transcript

> Cleaned and structured from the provided transcript. The content and meaning are preserved.

# Introduction to LLMs & Prompt Engineering

This video is part of a series. Complete

the previous videos in this playlist

before you start this video. The

complete playlist information, the

material and the code file information

is given in the video description below.

Today we will discuss the most

fundamental concept called LLMs which is

the only building block where the whole

geni got started. So let's understand

LLM. and interacting with LLM is done by

using prompt engineering. These are the

two topics which became very famous when

JAI came into the picture. Let's

understand what are these. Imagine you

have 100 experts at your service.

Imagine a friend who can correct your

English grammar effortlessly. Whenever

you write something, the friend will

come and tell you this is how you can

rewrite. This is how you can change the

grammar etc. Think of an expert

philosopher who's offering deep insights

on your site. So basically he's trying

to tell you whatever you're thinking

whether it is right or wrong. Think of a

gym trainer who is trying to tell you,

who is motivating you exactly what you

need to do, what kind of exercises you

need to do, what kind of diet you need

to follow, what suits you, what doesn't

suit you. Think of an interview panelist

who is uh taking a mock interview of

you. Imagine hundreds and hundreds of

experts in the field uh staying with you

always and guiding you. That is nothing

but LLM. LLM is more than hundreds of

experts in your pocket. An LLM is like

having a teacher, a lawyer, a

philosopher. Whenever you need help from

the lawyer, LLM can become your lawyer.

Whenever you need help from a

philosopher, LLM can become a

philosopher. Whenever you need a help

from doctor, LLM can become a doctor.

LLM can help you in troubleshooting your

code as well. So what exactly is an LLM?

## Evolution from Small to Large Language Models

First of all, this LLM term itself, it

came maybe one or two years back. That's

it. But what if I tell you, have you

ever heard of this term language model

before 5 years? Let's say if I take you

to 2020 or maybe 2018, 2015. During that

time, have you ever heard of a language

model? Did you ever use a language model

earlier? If I ask you that question, a

lot of you may say that no, I may not

have heard of it. But the thing is you

have been using I have been using

everybody among here we have been using

language models already much before but

those are small language models for

example we were interacting with simple

chat bots which were trying to

understand our question and give us some

standard message where is my parcel and

all that we were looking at customer

reviews based on that whether it's a

positive review or negative review and

what are the main points that were

discussed in that review that was also

an example of language model 7 8 years

back itself we were using mobile phone

as soon as you type something there is a

suggestion that is given to you what

could be the next best word following

whatever you have written here that is

also an example of language model. These

are all language models or in today's

terminology you can call them as small

language models or regular language

models simple language models. What are

the language models? These language

models take a review as input and

predict what is the sentiment in that

review positive or negative. Predicting

the next word while we are writing the

text, predicting the next word that is

also a language model. Finding the

keywords in the text if you post

something on LinkedIn or something you

will get the hashtags that are suggested

that is also an example of small

language model. So we have been using

language models already but what is

special nowadays we have got introduced

to large language models. The short term

for that is LLMs. LLM stands for large

## Core Functionality of Large Language Models

language model. So at the core of it if

you ask me what does a large language

model do? A large language model some

people say it is just autocomplete on

steroids. That means it'll just try to

predict the next word or it'll try to

predict whatever you have written. It'll

try to complete whatever the partial

sentence you have written. For example,

if I write if I give this as input to a

large language model. Oh what a lovely.

Then it'll try to predict what is the

next best word. Oh, what a lovely car.

Oh, what a lovely weather. Oh, what a

lovely flower. Then it'll predict, okay,

the most probable word is car. Then this

will be given as input to large language

model. Oh, what a lovely car. What could

be the next best word? Then it'll

predict, okay, I could be the next best

word. Again, this will be given to large

language model as an input. Oh, what a

lovely car. I would like to buy it 8.

Have you observed when chip came for the

first time, you can actually see word by

word it is generating. Did you ever

observe that? You do not get the output

from chip or gemini or co-pilot within

one shot. You will see token by token

word by word it is generating the output

and it'll keep on doing it until it hits

the meaningful stopping point then it'll

stop. So at the core of the large

language model every large language

model that you see today what they'll do

they will predict what is the next best

word this word technically it is known

as token what is the next best token and

it'll keep on doing it and it'll predict

these tokens based on the context that

you have given and it looks so accurate.

It looks like you know it is answering

our questions but large language model

doesn't answer our questions. It just

goes on autocomplete and it'll stop at a

point where it feels that okay this is

the meaningful stopping point. So that

is the core functionality of a large

language model. It keeps on predicting

the next word by taking the words until

that point as the input. It is so

perfect that it looks like it is

understanding our question. It is giving

us an answer. For example, if you say

write code for or write Python code for

importing a data set, importing a data

set. If you give that as input, what you

think is maybe RGB is taking this as

question and it is trying to give me an

answer. No, that doesn't happen. This

input, this input is known as prompt. So

you have given this prompt. Write code

for importing a data set in Python. That

is the prompt. What is the next best

word that it will predict? The code for

again this whole thing. Write code for

importing the data set in Python. The

code for will be given as input to LLM.

Importing a data set in Python is all

that is given as input. Then it'll start

writing the code. Import pandas as PD.

Again that will be given as input.

Import pandas as PD. And then it'll try

to give you the answer. So it is not

really formulating the answer based on

your question. It is simply generating

the next best word and the next best

word probability. It is finding it so

accurately for a general common user. It

looks like a Q&A engine but it is not.

## Why are Models Called "Large Language Models"?

But why are they called large language

models? Why can't we simply call them as

language models? Because here also it is

predicting the next best word. Here also

predicting the next best word. Why are

we calling them as large language

models? These models are quite accurate.

There is a reason for it. Large language

models are called as large because of

three main reasons. There's a large

amount of data that have been used while

building these models. These models are

so accurate because they have literally

information about everything in this

world. Large amount of data. These are

very complex models with large number of

parameters. Models complexity is defined

by how many parameters are there. Too

many parameters are here and then large

scale computations. So basically these

models are not the regular models that

we see in our day-to-day life. For

example, to build a large language

model, almost the whole internet of

data. Until now, human mankind, whatever

is the data that we have produced, the

whole of the data has been used for

building these models, for considering,

for training this model, we have used

the whole books and literature, all the

scientific articles, journals, all the

websites, billions and billions of

websites are there, all the blog posts,

all the social media forums,

discussions, all the news articles, even

the dictionaries, all the encyclopedias,

open source data sets, GitHub

repositories, code repositories. Why we

get so valuable code, so much accurate

code? Because all the code, the complete

code is on this GitHub. And if you can

uh train all that GitHub coding

repositories, you are bound to get good

coding suggestions for sure. For

example, if I want to build a sentiment

analysis model. I'm talking about a

small language model. Sentiment analysis

model. What this model does, it will

take the review as input. It will

predict whether it is a positive review

or whether it is a negative review. To

build this model, what we can do is we

can do we can take 5,000 positive

reviews for training. We can take 5,000

negative reviews.

Using these 10,000 reviews, you can

build a very decent sentiment analysis

model. So that is the only data that we

require. 5,000 positive reviews, 5,000

negative reviews. Now that is why this

is a small language model. The data that

is used is not that much. But here we

are literally using like compare 10,000

reviews versus this whole internet of

data. Definitely this is very large

amount of data. That is one reason why

these are known as large language models

and these models are called as large

language models because we have used

number of parameters. For comparison

I'll tell you one of the standard model

that we use credit risk model credit

scoring model or credit risk model. What

is the credit scoring bureau in India?

Your civil score. If you look at your

civil score, civil score is created by

using this credit risk model. That is

also a model. So to build the civil

score or to create this credit risk

model hardly we use 50 to 100

parameters.

We try to look at what is your credit

utilization, how many times you paid

late, how many loans you already have,

how many bank accounts you have, how

many time how much is the amount that

you owe to the banks, what is your debt

to income ratio, what is the amount of

money that you're spending on credit

card and other accounts. So all these

factors are considered hardly 50 to 100

factors that we consider. So we can say

there are 50 to 100 maybe max to max 100

parameters are there in my credit risk

model. 100 parameters. So if you take

any civil score or your credit score, if

you ask me what is the complexity of

this model, I will say we have the

complexity of the model where we have

used 100 parameters. Now if you compare

that to a large language model, let me

compare it to a large language model. In

a credit risk model, I have used 100

parameters. How many parameters shall we

use for building a large language model?

Because the data is too much. How many

parameters were used? Is it thousand

parameters? No, little more than that.

Is it 10,000 parameters? No. Is it like

one lakh parameters? No. Is it 1 million

parameters? No, more than that. 10

million, 100 million, hundreds and

hundreds of millions parameters. GPT2 or

GPT3 is when we started observing even

like GPT 3.5 onwards is what people have

paid attention to. Previously also GPT

was there in 2018. We have used it for

small language translation purposes in

the research but nobody paid attention

at that time itself. 110 million

parameters. Look at this 110 million

versus 100 parameters for a credit risk

model. Obviously we should not be

comparing both of them. But for the sake

of looking at the complexity of these

models I'm trying to tell you when I

compare with the credit risk model these

models are very very complex. GP2 model

by OpenAI 1.5 billion parameters 175

billion and the number is going into

trillions of parameters as well

trillions and trillions of parameters

were used which means these models are

very very large largely complex models

that is the reason why these are known

as large language models they're

language models that's all right they're

large because of some factors obviously

when you are having these many

parameters you need a lot of computation

power for running these models in an

interview open CEO Sam Olsman what he

says is they have spent just for the

processing I'm not talking about the

human resource and so on just for the

backend processing they have spent

nearly 00 million that comes around 900

crores in our Indian rupees just for

building a model they have spent around

900 crores. One of the question that

some people ask me is can we build a

large language model on our own? Can our

company build a large language model?

Why can't a group of friends in the

college build a large language model if

they do sufficient enough of research?

It's not just about research. It's also

about this computation power. That is

the reason why in India you may not see

large language models being built very

frequently. You need a lots and lots of

uh VC backup. If you want to build like

somebody pumping in thousand crores just

for processing is not a joke. OpenAI has

taken that risk. They have the backup

from Elon Musk when they were building

these models. Somehow he could help them

and they have built this model and rest

of the companies have seen the

potential. Now everybody is investing in

it. And what are the results? The

results are wonderful. You have built

large language model which is using so

many parameters, so much of data, so

much of processing power and the results

that it is giving is too good, isn't it?

While generating the code, it is

generating the code that is better than

a human being. Yes, obviously there will

be errors. A lot of people highlight

this is the error chity

could not do. I have seen a lot of

people coming up with a very difficult

example where chad GPT get confused and

gives a wrong answer that itself is a

win for charge GPT because for rest all

examples it is giving best answers

somebody has to really really struggle a

lot think a lot to confuse chargy so

whenever you see examples on social

media try to mock LLMs you try to ignore

them because it's not easy for every

model if you give the right context

definitely it'll give the right answer

so they have given the best of the best

answers almost uh until now humans have

better intelligence than the machines

slowly machines have taken over recently

in one of the research paper one of the

experiment they found that mathematics,

Olympia paper until now humans are

scoring better than machines. Very

recently these large language models

scored better than humans. So just now

we are at that phase where actually

artificial intelligence is taking over

the regular human intelligence. It's

good in a lot of senses. Maybe it's

dangerous in some sense as well. So they

have done a good job in generating the

code, generating the creative content,

sophisticated Q&A and there are so many

applications generating the images,

generating the videos, summarizing the

text in a best manner. All these

applications are done by these large

language models. So that is a large

language model. I'll go in depth details

## Famous Large Language Models & LLM Arena

of that. But before that I'll take one

question. Anybody having a quick

question?

That's good. Let's carry on some of the

famous large language models. As of

today, if you see, I think almost all

the big companies either they are

building a large language model by

themselves or they are partnering with a

small company that has built the large

language model. Almost any company that

you take, they have a large language

model. This whole large language models

have started around 2020 but they took

off from 2022 onwards when charge GPT

got released that is when people started

paying attention as of now the buzz is

around open AI this is JGP openai

copilot Gemini and this is anthropic

cloud anthropic which is doing a lot of

good research and providing good models

and one odd person in this list will be

deepseek these are all paid models these

are all very complex what deepseek has

done is I don't know whether that is

true or not they have used very less

number of parameters very less complex

models here openai has spent around

1,000 crores for building the model.

What Deep Seek tells is almost 100th

part of that within 10 crores they have

built this model and it is giving

accuracy as much as this one. Now we do

not know what exactly is the validation

behind that claim but Deepc got famous

because it is at par. The accuracy of

Deepsec is at par with the rest of the

models and it is open source for

individual usage. Now these large

language models have been kept on

evolving even if I see last three years

data the large language model that is

number one today may not be number one

in the next week. So there is one

website called LM Arena. In that website

you will see what are the large language

models that are top as of today. If just

for the sake of uh knowing what are the

large language models that are famous

you can go to LM arena.

This is LM arena. You click on that and

then you will see what are the large

language models that are number one,

number two, number three as of today.

So there is something called leadership

board. If I click on that leadership

board you can see that earlier the table

used to be like this. They used to have

just one table with some scoring. This

was some time back. I would say probably

this is the slide from last year. 01

preview was the best model followed by

charg followed by 01 mini followed by

Gro 2. So but nowadays if you see today

the same list will not be here lot of

new models have been already created for

text prediction you can see Gemini 2.5

pro these are the top models for website

development for coding purpose these are

the top models for vision image related

stuff these are the top models textto

image stuff these are the top models so

if you want to know what are the top

models you can look at them here and it

need not be a model it need not be only

in top 10 to give us the best results

even the model at the 50th or 70th or

100th position also we may get very good

results so this is the place where

you'll see all the different models

these are all the large language models

and these are all the versions Let's say

if if you see GPT 1 is not same as GP2.

GPT1 was let us suppose if you take GP1

they might have taken let's say 20

terabytes of data. I'm just kind of

giving you an example. They will take

definitely much much higher than this

data. They might have used 1 10 million

parameters. What is GPT2? These guys

have taken much more data. They have

built a much more complex model. These

guys have taken many more images and

scanned the documents and then they have

built a complex model. So these are all

the various versions of the models. With

the model one to model two they will use

more and more data, more fine-tuning,

more parameters. different uh type of

enhancements would have been done before

*[clears throat]*

model. So these are all different

different models. I think in the last

session there were a lot of questions

around what are all these what is GP1

what is GP2 what is GP 3.1 3.2 these are

all the different versions of the model.

So model one was released let us suppose

in 2024 after 6 months they have used

some more data they have done some more

fine tuning they have released model 2

which works better than model one. So

these are all the large language models.

This is the list of large language

models.

What we generally what I generally do is

I'll try to see which are the ones that

are open source. Which are the ones that

are giving some open source access for

practice so that we can use it in our

course. So I have found a couple of

models which are open source. We can use

them. But I always suggest it's better

to use a paid version of the model to

see the full potential of this

generative AI.

## Interacting with LLMs: User Interface vs. APIs

There are two ways to interact with

LLMs. is you go to their user interface

and then you use that as a user. That

means if I want to use Jad GPT I will go

to the interface or if I want to use

Gemini I will go to their interface and

use it. So that is one way of using it.

So this is chat GPT this is the user

interface I write whatever question that

I have here I get the answer that is a

regular way but when you join a company

when you are inside a company when you

are working with it this is not how the

company wants you to work with you will

not be going to charge JP you will not

be writing something there and copy

pasting it from here. No, that doesn't

happen when you are working on

generative way applications, large

language model applications. You will be

using large language model APIs as a

developer from the back end. And this is

what we will be focusing a lot in our

course. Everybody uses large language

models from the uh user interfaces. You

go to Gemini website, you go to copilot

interface and you write something there,

you'll get the output that is a regular

general user type. But what we have to

learn is how to use their APIs in the

back end and how to build applications

using these large language models. That

is what we'll focus on. I'm not really

touching a lot on this. You have already

seen a lot of uh usage of uh using the

user interface. You can write a prompt,

you will get the output.

## Live Demo: Python Coding with Google Colab & Gemini

Now what uh we will try to highlight

here is nowadays these AI agents where

in the back end there's a large language

model. They are almost embedded into

everything. As of now, if you open any

coding window, if you open any coding

ID, you will see that at one of the

corner you will see that copilot is

working along with you to help you with

coding or Gemini is working along with

you to help you with coding. one or the

other large language model is making

your coding job easy. Earlier let us

suppose if uh somebody doesn't know

Python they cannot there is no way they

can complete an application or they can

do some analysis. But nowadays if you do

not know Python as well if you spend

some time if you're willing to spend

time that is sufficient you don't need

to know coding. For example if we let us

do one exercise totally we will take

help of large language model. We will

try to write hardly one or two

characters of code. Beyond that we will

not write. We will ask the LLM to write

the code for us. First I'll show it to

you then I'll give you a chance to work

on it. So what I'll do is I will go to

Google Collab. While I'm doing it, I

will request you not to do it. You just

observe it and then I'll give you a

chance. Otherwise, most of the times

what happens is people they start

writing whenever I write here and they

miss the point. Later on they ask me to

repeat. That's not good. So I'll open

Google Collab. Just observe this. I'll

open a new notebook.

Obviously you have to log into Google to

open a new notebook. If I click on plus

code, I can add coding cells here. As

soon as you see here you can see this is

my Python working environment. You can

see the instruction that is given start

coding that means you can code or what

is the option what is the second option

either you can code or generate with AI.

So here here you can see what is the

symbol for this is for Gemini. You can

write whatever you want to here and then

automatically you will get the code. So

for example here our requirement is I'm

your manager and I give you this

requirement. Import the data set from

this one. Let's say there is one bank

market. CSV. You have to import it which

means you have to write the Python code

for it. You have to print the write the

code for printing the column names.

write a code for drawing a bar chart for

a variable called education in there. So

education, how many people are from uh

graduation level, post-graduation level,

how many people are from secondary or

primary that is a bar chart that I want

to see write the code for histogram

chart for balance and age. So this is a

code that we have to write and imagine I

do not know coding earlier it would be

very difficult or I have to go to the

whatever is the documentation from there

I may have to learn but here I'll just

come here and what I'll do is I'll just

take this data and I will ask the gemini

which is the large language model just

to help me with the coding. So let me

just go to the data set and show you. So

the data set name is bank market data

bank_market CSV I guess.

Let me get the exact data set here.

And then I asked Gemini, you have to

import this data set for me. Can you

please suggest me the code? Then Gemini

will try to tell me you can use this

piece of code for it. So let's go here

and open the data set. This is the data

set. I'll copy the link. I will say here

now either I can write the code or I can

generate with AI. So I'll click on

generate with AI. So you come here write

code for importing the data set. This is

the location and just I will hit enter.

Now it's working. It'll try to

understand what am I trying to ask and

then it'll try to suggest me the code.

In the initial instance, it has to

connect to the cloud. Yeah, it has given

me the output. It says important SPD,

URL, response, etc., etc. It has given

me a very lengthy code. I can also ask

for a simple code. You can accept and

run or you can cancel and you can ask

for a different version of the code. I

will just cancel it and then I will ask

for a different version of this code. I

will rewrite this again and I will

simply say write code for importing the

data set. This time I expect it to give

me a slightly lesser amount of code. I

think it's giving the same one. I'll

just say accept and run. So I just I

have accepted the code. To execute this

code, all that you need to do is you

simply click on this.

So what it is doing it is not only

importing the code, it is trying to get

me if the response was successful. Then

you will get a string. If the response

like if it is importing is not

successful, you'll get it. So what I'll

do is I'll just simply delete everything

and then I can work with it. Otherwise,

I will just leave it as it is. So here

the data importing has been done. So

what I'm trying to tell you here is this

much amount of code I did not know

earlier, but still I could manage to

import the data set. What are the other

requirements? Print the column names. So

I'll tell you one more shortcut here.

You don't need to ask Gemini always. You

can let it know your intention. If I

write a comment here, which means I'm

not asking Gemini, but I'm writing a

comment which I want to write my own

code, but I want Gemini to help me along

the way. So code for printing the column

names.

Code for printing the column names.

So if now if you see that I haven't

written any code. You see that there is

a suggestion. Can you read that like in

the gray color DF doc columns? DF is the

data set name. Columns is the column if

I just execute it. So I'm not even

asking to generate the code. I'm just

writing my own code. Along the way, this

Gemini is automatically helping me.

Maybe this is what you are thinking to

write. And this is the suggested code.

Let me write code for

drawing the bar chart for the column.

The column is education. Where is it?

Education is the column. I want to draw

the bar chart.

You can ask Jim you can go to charg and

uh get the code but what I'm trying to

tell you is within the coding

environment itself you will see the

suggestions. So if this is getting

connected then you will get these

suggestions easily. If it is not then

what you can do is import you start

quick uh kind of uh you just give a

prompt. So you know what large language

model does isn't it? It will try to take

what all you have written as input and

if something is not suggested you can

actually start writing some wrong code

automatically. It will try to suggest

you what is the rest of the code. So it

did not suggest earlier when I was

waiting here it did not suggest. So

since I know that for everything we need

to import a particular package I started

writing import automatically. It will

try to suggest the best part of the

code. Now if you do not like this then

you can always go to generate with AI.

The above bar chart is not good. I want

it to be 3D chart or you can always go

to RGPD and get the code for it as well.

So what I'm trying to say is the coding

is no more a barrier. If you are

thinking that I'm not good with coding I

may not survive in JA then you are

cheating yourself. Nowadays nobody likes

to code. It is automatically taken care.

You just need to choose the right

option. That's it. In fact, you can ask

the large language model to give you bar

chart 10 kind of bar charts. Code for

creating 10 different kinds of bar

chart. You choose the right bar chart.

That's it. This is just the starting the

whole coding will be much much easier in

future as well. What we will do is we

will do a quick lab exercise. Let me

explain you what is the requirement

here. I want you to import this data

set. I will be pasting this data set

link in the chat window. Write the code

for importing this data set. Draw a geo

chart to show the country wise units

sold in the above data set. So what you

need to do is you need to draw a

geographical chart. If the units sold

are high, maybe that country will appear

in red color, units sold are low. If the

sales is low, that will appear in green

or vice versa. So I want to see in each

country how much was the sales. That is

the like I don't want you to go to the

documentation and write it. What I want

you to do is use LLM. Now this is not an

easy task. Even if you ask me to write

the code, I may have to search here and

there. But still what I want you to do

is I want you to feel confident that

even if I want to do a difficult task,

LLM will help me. Finally, we will

achieve this. Drawing the geographical

chart with countrywide units sold. Write

code to find the frequency count of the

variable customer country. So in each

country how many customers are there

that I want to write the code and I want

to find the frequency count. Write code

to draw bar chart for the column product

sold. How many products are sold by each

country? That is what I want to know. So

this is the requirement.

All right.

So here what I'm trying to highlight is

no matter what background you have in

coding, whether you are good at coding,

then it'll make this whole process

accelerated. Even if you're not good at

coding, you can learn coding very

easily. Almost a large language model

will handhold you. So from here on, I

want to give you the confidence that

even if you have very bit very little

knowledge in Python, you should be able

to thrive very well in this whole world

of coding. You should not be taking the

back foot just by thinking that you do

not know coding. Coding doesn't matter

anymore.

## Understanding Prompt Engineering: LLMs vs. Google Search

Now we will move on to our next part of

the important discussion. The whole

point of this uh uh presentation today,

today I want to talk about large

language model, prompt engineering and

some of the AI tools. Before I go to the

second topic prompt engineering, I'll

try to take a pause here and take a

couple of questions from you.

The prompt engineering was one of the

most prominent topic or the most

prominent word that came into the

picture when people started using large

language models for the first time and

charged in 2022 got released for the

first time. Everybody was using it but

largely there were so many complaints

that charged. I'm getting this answer.

You're not getting that answer. Then

people started saying that it's not the

problem with chargity, it's the problem

with your input that you are giving. The

input is known as prompt. And people

came up with a proper structure. If you

give the prompt in a particular manner,

then only you will get the right

results. Then this whole terminology of

prompt engineering came into the

picture. One major important point that

we need to know here is from our

childhood maybe whatever is your age

from past 20 years you might be using

Google. Whenever we are into Google, we

go to Google and in the search bar we

put one or two or three search strings.

Then what Google does is based on your

search strings it will browse the

billions and billions of websites and

try to tell you this is the best website

that is matching your requirement. This

is the next best website this is the

next best website. So from our childhood

everybody when they are using internet

when they're searching for the answers

in the internet they have the habit of

using Google and they have the habit of

keeping some keywords. Google will look

at that keyword search and then it'll

try to give you the websites that are

matching that keyword. Now when we go to

chatgity that is a mistake that I have

seen people doing. They treat chat GPT

almost like Google. Whatever I'm

searching in Google, now I'll search in

Chad GPT. But the thing is, Chad GPT is

not a search engine. Google is a search

engine. It will search for the websites.

Chad GGPT is a large language model.

When you're interacting with a large

language model, you cannot really follow

the same procedure that you were

following. How how you were interacting

with the search engine. So, chat GPT

expects you to give a prompt. It has to

be very lengthy. It has to be very much

detailed. Google is expecting expecting

you to give a search string. It it can

be short. It can be little phrases only.

So, chat GPT is not same as Google

search. Working with chargity is via

prompt is not same as working with

Google via a search string. This is one

important point that you need to make a

note of. If you ask yourself whatever I

do in Google if I'm doing the same in

charge you are doing it wrong. Whatever

I do in Google if I'm giving a very

detailed if I'm doing a following a very

different approach if I'm being very

detailed if I'm being contextually

correct if I'm giving all the examples

if I'm making an effort to write four

five lines every time I interact with

chargity at least I write four lines of

description in charge so that it can

understand the context then you are

doing it right. But in charge also I'm

just writing one line expecting it to

give an answer then you're not doing it

right. You may get the answer but it is

not an effective answer. Charge GPT is a

large language model. It is a next word

generation engine. It expects more and

more context from you. It is not like

Google search. This is mistake number

one a lot of people do but once they are

aware of it obviously everybody will

correct. From here from this point of

onwards I would like to tell you that

you have to get out of this habit of

doing the same what we have done in

Google. In chat GBT it has to be very

different. You have to avoid very brief

very small queries. Typically that we

use in Google those things we should not

be doing here. You have to structure

your prompt. So you have to meticulously

design your prompt. That is nothing but

prompt engineering. Prompt engineering

is pro the process of meticulously

designing your prompt. So that inside

your input prompt you can include the

context. You can include the intended

tone. You can you may have to include

## Issues with Zero-Shot Prompting

the anticipated potential ambiguities.

Everything that you think are needed for

getting this output. All these need to

be included. So how that is done? Let us

see. The typical standard method is I

will go to chart and I just write

whatever is there in my mind. How to

become a data scientist. Even then chat

GPT will give me the answer. Usually the

answer is very lengthy. Whatever comes

to your mind if you just go ahead and

write in chat GPT that is known as zero

short prompting. It misses so many

important aspects. Asking the model

directly without giving any examples.

Zero shot. Short means example. Zero

shot. I have given no examples. I have

given no context of what I am looking

for. How to become a data scientist. So

what is your experience? Are you a kid

of six years? Then how to become a data

scientist has a very different answer.

First you go to school, then college,

then take this course. Then you can

become a data scientist. If you're

already let's say 25 years, you just

completed your graduation, how to become

a data scientist, you have a different

path. If you're already a software

developer who is already let's say you

have 30 years and 5 years experience in

industry, how to become a data

scientist, it has a different path. Now

you think that okay anyway I'm

interacting with it will think that it

will never assume I'm a 6 years old kid.

It will never assume I'm a 25 years old

guy. It will never assume that I will

I'm a software developer because we look

at the world everything from our point

of view.

You have to become a data scientist.

Then I will say see how nonsense it is.

Nonsense. How does LGBT know who you

are? Isn't it? So this is known as zero

shot prompting. Zero shot. No examples,

no shots. What are the other examples of

zero shoting? What is NLP? Whereby you

are an expert or you a beginner or you a

non technical guy or you a technical

guy. Based on that your chatb answer

will differ. Give me some Python basic

examples. I think that Python basic

examples. I want to learn data science.

That is why Python will give me only

data science examples. How is that true?

Python is a multi-purpose language. It

may give examples from various other

applications as well. These are all

known as zero shot prompting. But still

you will get the answers. I'm not saying

that charg will not give the answers but

answers are quite broad. So explain NLP

charge doesn't know whether you're a

beginner or an expert. Give me Python

examples you whether you're a developer

or a data scientist. Python doesn't

know. Give me like how to earn money

from the stock market. But I just want

to earn money. Nothing else. I have only

one clear goal in my mind. I want to

earn money. Now this is a very generic

prompt. Are you a short-term investor or

you a long-term investor? What is your

investment capital? What is your risk

appetite? Based on all this, the answer

would differ. Give me a good diet plan.

So I have good intention only. I want to

know the good diet plan. But it depend

the good diet plan for let's say a 25

years old may be very little very

dangerous for a 75 years old person. A

very good diet plan for male could be

not be a good diet plan for female. A

good diet plan will vary based on the

location, gender, age. Eventually it

tells you this is the diet plan. Maybe

the items that it is suggesting maybe

they are available in US they may not be

available in India. So these are all

known as zero short prompting and the

issues with zero shot prompting is you

miss the context, you miss the examples

or the specific tone. Even then chatb

will give you answers. The answers are

typically quite broad, very unspecific,

very generic. Even though you get the

answer, you try to repeat multiple times

to get the best answer. You may get

repetitive output. After trying it four

or five times, if you're not satisfied,

we can quickly blame JGP saying this is

nonsense. Everybody is kind of super

praising it. I don't find it useful.

With that conclusion, we go back and

then leave JGP for a week or two. When I

say JPD, I mean to say all the large

language model. The thing is the quality

of the output depends on what is the

quality of your input prompt.

## Improvement over Zero-Shot Prompting

You may have to structure your prompt so

that you include all the required

elements so that CAD GPD understands

exactly what you are looking for. That

is known as prompt engineering. So I'll

give you five elements that you can

include in your prompt that have worked

for me that you can also try. On top of

these five elements you can add your own

elements. You can add your own flavor

and get the best results out of chip. So

let's go how to structure this prompt

that is nothing but prompt engineering.

Prompt engineering is a very simple very

easy topic. We cannot consider this as

electrical engineering or computer

science engineering. I have done prompt

engineering. So it doesn't take four

five years. It hardly takes half an hour

to become a good prompt engineer.

Continue with the next video in the

playlist. We are covering everything

step by step. If you have any questions

or the comments, please post them in the

comments window below.

## Summary

- The transcript introduces Large Language Models (LLMs) as a fundamental building block of modern generative AI.
- It explains the evolution from smaller language models to large language models.
- The core idea presented is next-token prediction based on the context provided in the prompt.
- It explains why LLMs are called “large,” focusing on large amounts of data, large numbers of parameters, and large-scale computation.
- It introduces examples of well-known LLMs and discusses the changing landscape of model rankings through LM Arena.
- It distinguishes using an LLM through a user interface from using LLM APIs to build applications.
- The transcript demonstrates AI-assisted Python coding using Google Colab and Gemini.
- It explains prompt engineering and contrasts interacting with an LLM with using Google Search.
- It introduces zero-shot prompting and explains why generic prompts can produce broad or unspecific answers.
- It concludes by introducing prompt engineering as the process of structuring prompts with the necessary context and other required elements.
