# Fine-Tuning — LoRA · QLoRA · PEFT
## Phase 9 · Visual-first · Teach the model new behavior — cheaply, without retraining billions of weights

> **NO-SKIP VERSION:** Your uploaded Phase 9 script is preserved in full below. I have not replaced or summarized its source sections. Only focused AI Engineering additions are added before and after the source.

## Core mental model

```text
Prompting
→ one-off / fast behavior control

RAG
→ current or private knowledge

Fine-Tuning
→ stable behavior, style, format, domain workflow

LoRA / QLoRA
→ efficient parameter-efficient fine-tuning
```

**Golden rule:** knowledge → RAG, behavior → fine-tune, one-off → prompt, both → combine.

## Fine-tuning is NOT a live knowledge mechanism

```text
Changing facts
   ↓
RAG / retrieval
   ↓
current context
   ↓
LLM

Stable behavior
   ↓
fine-tuning
   ↓
specialized response behavior
```

## LoRA / QLoRA in one picture

```text
Full FT:
Base model → update ALL weights → huge compute/storage

LoRA:
Base model ❄️ frozen + small A/B adapter → train only adapter

QLoRA:
4-bit frozen base + LoRA adapter + memory-efficient optimizer
```

---

# SOURCE CONTENT — PRESERVED 100%

The following is the uploaded script itself. Every source section, bullet, table, code block, number, and interview question is retained.

---

🎛️ Fine-Tuning — LoRA · QLoRA · PEFT
Phase 9 · Visual-first · Teach the model new behavior — cheaply, without retraining billions of weights

Full FT vs PEFT
LoRA
QLoRA
RAG vs Fine-Tune
Interview Mode
The 10-Step Path
Problem it solves
Why invented
Without it
Analogy
Visual architecture
Internal working
Code
Production
Scaling
Interview Qs
Fine-Tuning
Why
New behavior / style
Domain tone & format
Compress prompts
Methods
Full Fine-Tune
PEFT
LoRA
QLoRA
Adapters
Prefix tuning
Data
Instruction pairs
Chat format
Quality > quantity
Trade-offs
Cost
Catastrophic forgetting
Static knowledge
Alternatives
Prompt engineering
RAG
Tool / function calling
Mind map — the whole Phase 9 at a glance
Step 1 · Problem
What problem does fine-tuning solve?
A base LLM is a brilliant generalist, but it doesn't know your tone, your output format, your domain jargon, or your edge-case behavior. You can describe those in the prompt — but long prompts are expensive, fragile, and only go so far. Fine-tuning bakes the behavior into the weights so the model just does it.

long fragile prompt
fine-tune on
your examples
Base LLM
generalist
Inconsistent
style & format
Specialist LLM
consistent behavior
Fine-tuning moves behavior from the prompt into the model itself
Key framing: Fine-tuning changes how the model responds (behavior, format, style), not what facts it can look up. Facts that change → use RAG. Behavior that's stable → fine-tune.
Step 2 · Why invented
Why was PEFT / LoRA invented?
Full fine-tuning updates all billions of parameters. For a 7B model that means storing a full copy of optimizer states + gradients — tens of GB of VRAM and a fresh multi-GB checkpoint per task. That's unaffordable for most teams and impossible to host at scale (one full model per customer?).

PEFT / LoRA
Train tiny adapter
~0.1–1% of params
Freeze base weights
Few-MB checkpoint
swap per task
Full Fine-Tune
Huge VRAM
+ full checkpoint per task
Update ALL weights
~7B params
PEFT freezes the base and trains a small add-on — 100–1000× fewer trainable params
LoRA (Low-Rank Adaptation) was the breakthrough: instead of editing a weight matrix $W$, you learn a tiny low-rank update $\Delta W = B A$ and add it: $W' = W + BA$. QLoRA went further — quantize the frozen base to 4-bit so you can fine-tune a 65B model on a single 48GB GPU.

Step 3 · Without it
What happens if we DON'T fine-tune?
Pain without fine-tuning
Bloated, brittle mega-prompts repeated on every call → high token cost
Inconsistent format — sometimes JSON, sometimes prose
Model ignores niche domain conventions & tone
Few-shot examples eat the context window
What fine-tuning gives you
Short prompts — behavior is in the weights
Reliable, repeatable output structure
On-brand tone & domain language by default
Often a smaller model can now match a bigger one
But: fine-tuning won't fix missing or changing facts. If the answer needs yesterday's data, no amount of fine-tuning helps — that's RAG's job.
Step 4 · Analogy
Real-world analogy
Hiring a brilliant new graduate. They already know everything (the base model).
• Prompting = handing them a sticky note of instructions for each task.
• RAG = giving them access to your company wiki to look facts up.
• Fine-tuning = a week of onboarding so they internalize your house style, tone, and workflow — now they just behave correctly without the sticky notes.
• LoRA = instead of rewiring their brain, you give them a small "company handbook" they consult instinctively. QLoRA = they read a compressed pocket version, so even a junior with limited memory can onboard.
Step 5 · Visual architecture
How LoRA plugs into a transformer layer
× α/r scale
Input x
Frozen weight W
❄️ not trained
A: down-project
d × r
B: up-project
r × d
＋
Output h
Only the small low-rank matrices A & B (rank r, e.g. 8–64) are trained; W stays frozen
The QLoRA stack
Base model weights
Quantize to 4-bit NF4
❄️ frozen
Forward pass
dequant on the fly
LoRA adapters
trained in 16-bit
Paged optimizer
handles memory spikes
QLoRA = 4-bit frozen base + 16-bit LoRA adapters + paged optimizer → big models on one GPU
Step 6 · Internal working
The training loop, end to end
Optimizer
Loss
Frozen Base + LoRA
Tokenizer
Dataset (instruction pairs)
Optimizer
Loss
Frozen Base + LoRA
Tokenizer
Dataset (instruction pairs)
repeat for N epochs → save tiny adapter
prompt + ideal completion
token ids
predicted next-token logits
cross-entropy vs target
gradients (LoRA params only)
update A & B (base untouched)
Standard causal-LM training — but gradients flow only into the adapter
Knob	What it controls	Typical
r (rank)	Adapter capacity	8–64
alpha	Scaling of the update (α/r)	16–32
target_modules	Which layers get adapters	q_proj, v_proj (+k,o,mlp)
dropout	Regularization on adapter	0.05–0.1
learning_rate	Step size	1e-4 – 2e-4
epochs	Passes over data	1–3 (more → overfit)
Step 7 · Code
QLoRA fine-tune with 🤗 PEFT + bitsandbytes
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
from trl import SFTTrainer
import torch

# 1) Load base in 4-bit (QLoRA)
bnb = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16,
    bnb_4bit_use_double_quant=True,
)
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-3.1-8B", quantization_config=bnb, device_map="auto")
tok = AutoTokenizer.from_pretrained("meta-llama/Llama-3.1-8B")

# 2) Attach LoRA adapters
model = prepare_model_for_kbit_training(model)
lora = LoraConfig(
    r=16, lora_alpha=32, lora_dropout=0.05,
    target_modules=["q_proj", "v_proj", "k_proj", "o_proj"],
    task_type="CAUSAL_LM")
model = get_peft_model(model, lora)
model.print_trainable_parameters()   # ~0.2% of params 🎉

# 3) Train on instruction pairs
trainer = SFTTrainer(
    model=model, tokenizer=tok, train_dataset=dataset,
    dataset_text_field="text", max_seq_length=1024)
trainer.train()

# 4) Save just the tiny adapter (few MB)
model.save_pretrained("./adapter-support-bot")
Serving: swap adapters on one base
from peft import PeftModel
base = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3.1-8B")
# load a 5-MB adapter per customer/task instead of a 16-GB model
model = PeftModel.from_pretrained(base, "./adapter-support-bot")
Data format matters most. 500–2,000 high-quality instruction→response pairs in a consistent chat template usually beat 100k noisy ones. Garbage in → confidently wrong out.
Step 8 · Production
Production deployment pattern
Offline pipeline
tenant A
tenant B
versioned
Adapter registry
Train LoRA
Eval set
Curated data
User request
Router
Inference server
one shared base model
Adapter A
hot-swapped
Adapter B
Response
One base model in VRAM, many lightweight adapters served per tenant (e.g. via vLLM / LoRAX / S-LoRA)
Concern	Practice
Versioning	Treat adapters like model artifacts — semver, registry, rollback
Evaluation	Held-out eval set + LLM-as-judge + regression gate before promote
Safety	Re-run safety/red-team suite — fine-tuning can erode guardrails
Multi-tenant	S-LoRA / LoRAX serve many adapters on one base concurrently
Step 9 · Scaling
Scaling concerns & cost
Method	Trainable params	VRAM (7B)	Checkpoint	When
Full FT	100%	~80 GB+	~14 GB	Max quality, big budget, base shift
LoRA	~0.1–1%	~18 GB	~10–50 MB	Default choice for most teams
QLoRA	~0.1–1%	~6–10 GB	~10–50 MB	Big model, single/limited GPU
⚠️ Scaling pitfalls
Catastrophic forgetting — overtraining erases general ability
Static knowledge — retrain to update any fact
Overfitting on small data (too many epochs / high rank)
Eval drift — looks great on train, fails in prod
✅ Scaling wins
Hundreds of adapters on one base = cheap multi-tenant
Tiny artifacts → fast deploy, easy A/B & rollback
Smaller fine-tuned model can replace a bigger generic one
Combine with RAG: fine-tune behavior, retrieve facts
Decision Tree
RAG vs Fine-Tuning vs Prompting — choose correctly
yes
no
yes
What do you need
to change?
New / changing
FACTS & knowledge
New BEHAVIOR
style, format, tone
Just a one-off
task tweak
✅ Use RAG
retrieve fresh context
Stable & repeated
at scale?
✅ Fine-Tune
LoRA / QLoRA
✅ Prompt engineering
few-shot
Also need
consistent behavior?
✅ RAG + Fine-Tune
best of both
The interview-winning rule: knowledge → RAG, behavior → fine-tune, both → combine
Decision Guide
When to use · When NOT · Alternatives · Trade-offs
✅ Fine-tune WHEN
You need a consistent output format / schema
You need a specific tone, persona, or domain style
Prompts are getting huge & expensive to compress
A smaller, cheaper model would suffice if specialized
Behavior is stable and reused at high volume
🚫 Do NOT fine-tune WHEN
The need is fresh/changing facts → use RAG
You have <a few hundred quality examples
Requirements still shifting weekly
Prompt engineering already meets the bar
You can't build an eval set to measure it
How to identify it in an interview
Trigger phrases: "consistent JSON output," "brand voice," "domain-specific tone," "reduce prompt size," "distill a big model into a small one," "model keeps ignoring our format." These signal behavior, not knowledge — the answer is fine-tuning (usually LoRA/QLoRA), possibly alongside RAG.

Common mistakes
✗
Fine-tuning to inject facts that change → stale model. Use RAG.
✗
Too many epochs / rank too high on tiny data → overfitting & forgetting.
✗
No held-out eval set → "feels better" with no proof; regressions ship.
✗
Skipping the safety re-eval — fine-tuning can quietly remove guardrails.
✗
Inconsistent data formatting/chat template → model learns noise.
Alternatives & trade-offs
Option	Strength	Trade-off
Prompt engineering	Zero training, instant iterate	Token cost, brittle, limited control
RAG	Fresh, citable facts	Doesn't change behavior/style
LoRA / QLoRA	Cheap behavior change, tiny artifacts	Static knowledge, needs good data + eval
Full fine-tune	Max control / quality	Expensive, huge checkpoints, forgetting risk
Step 10 · Interview Mode
Interview questions & model answers
RAG or fine-tuning — how do you decide?
Explain LoRA mathematically.
What does the "Q" in QLoRA add?
What is catastrophic forgetting and how do you avoid it?
How much data do you need?
How do you serve many fine-tuned variants cost-effectively?
How do you evaluate a fine-tune?
Can you fine-tune and still keep facts current?

---

# Important AI Engineering Additions — Only High-Value Concepts

## 1. The real fine-tuning workflow

```text
Business requirement
       ↓
Define target behavior
       ↓
Collect + curate examples
       ↓
Train LoRA / QLoRA
       ↓
Held-out evaluation
       ↓
Safety + regression testing
       ↓
Register adapter
       ↓
Deploy
       ↓
Monitor
       ↓
Rollback / retrain if needed
```

Training is only one part. **Data quality + evaluation + deployment discipline** matter equally.

## 2. Dataset quality > raw dataset size

A smaller clean dataset can outperform a much larger noisy dataset.

Look for:
- representative production cases
- consistent output format
- correct labels
- realistic edge cases
- minimal contradictions
- consistent chat/template formatting

The exact number of examples is task/model dependent; there is no universal magic number.

## 3. Train / validation / test split

```text
Curated examples
      │
      ├── Train → model learns
      ├── Validation → tune decisions
      └── Held-out Test → final comparison
```

Never judge success only on training examples.

## 4. Baseline first

Before training:

```text
Base model + best prompt
        ↓
Evaluation
        ↓
Baseline
```

After training:

```text
Fine-tuned model
        ↓
Same evaluation
        ↓
Compare
```

If fine-tuning does not provide meaningful improvement, the extra complexity may not be justified.

## 5. Catastrophic forgetting

Aggressive fine-tuning can improve target behavior while degrading unrelated abilities.

Reduce risk with:
- appropriate learning rate
- controlled epochs
- sensible rank
- representative data
- held-out general capability tests
- regression/safety evaluation

## 6. LoRA rank is a capacity knob

```text
Lower r → smaller adapter → lower capacity/cost

Higher r → larger adapter → more capacity/cost
                         → potentially more overfitting
```

Choose rank using validation results, not simply "higher is better."

## 7. Quantization vs LoRA

Keep the concepts separate:

```text
Quantization → reduce numerical precision / memory

LoRA → train low-rank adapter

QLoRA → quantized frozen base + LoRA training
```

This distinction is important in interviews.

## 8. LoRA vs QLoRA

| | LoRA | QLoRA |
|---|---|---|
| Base | Frozen | Frozen + quantized |
| Adapter | Trainable | Trainable |
| Memory | Lower than full FT | Often lower than standard LoRA |
| Main use | Efficient PEFT | Very memory-constrained fine-tuning |
| Trade-off | More memory than QLoRA | More quantization complexity |

Actual memory depends on model, sequence length, batch size, optimizer, and implementation.

## 9. RAG vs Fine-Tuning — interview answer

If the requirement is:

> "Answer using company documents that change over time."

Use **RAG**.

If the requirement is:

> "Always respond in our stable company style/format."

Fine-tuning may be appropriate.

If both are required:

```text
Fine-tuned behavior
       +
RAG context
       ↓
Stable behavior + current facts
```

## 10. Adapter-based multi-tenant architecture

```text
             Shared base model
          ┌────────┼────────┐
          ▼        ▼        ▼
      Adapter A Adapter B Adapter C
       Tenant A  Tenant B  Tenant C
```

Benefits:
- small artifacts
- cheaper storage/deployment
- easier rollback
- A/B testing
- one shared base

Still enforce tenant isolation and access control.

## 11. Adapter lifecycle

```text
Data → Train → Evaluate → Register → Approve → Deploy → Monitor → Rollback
```

Treat adapters like production model artifacts.

## 12. What to evaluate

Do not only ask "does it look better?"

Measure the behavior you actually wanted:

- schema/JSON validity
- classification quality
- instruction adherence
- consistency
- domain behavior
- safety/refusal behavior
- latency
- cost
- throughput
- regression against baseline

## 13. Production checklist

### Data
- [ ] Representative examples
- [ ] Consistent formatting
- [ ] Correct labels
- [ ] Train/validation/test split
- [ ] Edge cases
- [ ] No obvious leakage

### Training
- [ ] Rank tested
- [ ] Target modules tested
- [ ] Learning rate controlled
- [ ] Epochs controlled
- [ ] Overfitting monitored

### Evaluation
- [ ] Baseline
- [ ] Held-out test
- [ ] Regression testing
- [ ] Safety/red-team testing

### Deployment
- [ ] Adapter registry
- [ ] Versioning
- [ ] Rollback
- [ ] Monitoring
- [ ] Access control

---

# Interview Cheat Sheet

| Phrase in interview | Think |
|---|---|
| Fresh/current facts | RAG |
| Brand/company tone | Fine-tuning or prompting |
| Consistent JSON | Fine-tuning / structured output |
| Prompt is huge | Consider fine-tuning |
| One-off behavior | Prompt engineering |
| Many customers, same base | Adapter architecture |
| Limited GPU memory | QLoRA |
| Maximum model adaptation | Full fine-tuning |

---

# Advanced Interview Q&A

### Why is LoRA cheaper?
Because the base model is frozen and only small low-rank adapter parameters are trained.

### Why is QLoRA more memory efficient?
Because the frozen base is quantized, commonly to 4-bit, while the adapter remains trainable.

### Does LoRA replace RAG?
No. RAG remains better suited for fresh/changing knowledge.

### What if rank is too high?
More capacity, compute, and storage; potentially greater overfitting.

### What if rank is too low?
The adapter may not have enough capacity for the target behavior.

### Why rerun safety tests?
Fine-tuning changes behavior and can unintentionally weaken existing safety behavior.

### Why save only adapters?
Because the frozen base can be shared across tasks/tenants while adapters contain the specialization.

---

# One-Page Revision

**Fine-Tuning:** stable behavior customization.

**PEFT:** parameter-efficient fine-tuning family.

**LoRA:** frozen base + low-rank trainable adapter.

**QLoRA:** quantized frozen base + LoRA.

**RAG:** current/private knowledge.

**Prompting:** fast one-off control.

**Full FT:** all weights updated; highest resource requirement.

### Golden rules

1. Knowledge → RAG.
2. Stable behavior → fine-tuning.
3. One-off → prompting.
4. LoRA freezes the base and trains a small adapter.
5. QLoRA reduces memory with a quantized base.
6. Data quality matters more than blindly adding examples.
7. Use held-out evaluation.
8. Compare against a baseline.
9. Run safety/regression tests.
10. Version and monitor adapters.
11. Do not bake changing facts into weights when RAG is the better fit.
12. Start with the simplest solution that meets the requirement.

---

# Phase 8 → Phase 9

```text
P8 MCP
   ↓
Standardized AI ↔ tools/data integration
   ↓
P9 Fine-Tuning
   ↓
Stable specialized model behavior
```

They solve different problems and can coexist:

```text
MCP → how AI connects to capabilities
Fine-Tuning → how the model behaves
```

---

# AI Engineering Big Picture — P5 → P9

```text
P5 RAG
   ↓
Current/private knowledge

P6 Function Calling
   ↓
Actions

P7 Agents
   ↓
Goal-oriented loops

P8 MCP
   ↓
Reusable capability integration

P9 Fine-Tuning
   ↓
Stable specialized behavior
```

A production system can combine them:

```text
                 AI Application
                       │
              ┌────────┴────────┐
              ▼                 ▼
       Fine-tuned LLM         Agent
       stable behavior          │
                                ▼
                            MCP / tools
                                │
                  ┌─────────────┼────────────┐
                  ▼             ▼            ▼
                 RAG          APIs/DB     Tools
                  │
                  ▼
             Current facts
```

---

# Final Summary

Fine-tuning is primarily a **behavior customization technique**.

The key distinction:

> **Fine-tuning changes how the model responds; RAG supplies information the model needs at runtime.**

Practical hierarchy:

```text
One-off behavior
    → Prompt

Current/private facts
    → RAG

Stable repeated behavior
    → LoRA / QLoRA

Stable behavior + current facts
    → Fine-tuning + RAG

Maximum model-specific adaptation
    → Full fine-tuning
```

The production process is:

**curate data → train → evaluate → safety test → version → deploy → monitor → rollback.**

---

# LinkedIn Post

Fine-tuning is often misunderstood as "putting new knowledge into the model."

A better mental model is:

**Fine-tuning = teaching stable behavior.**

The distinction:

🔹 Prompting → one-off behavior  
🔹 RAG → current/private knowledge  
🔹 Fine-tuning → stable behavior/style/format  
🔹 LoRA → efficient parameter-efficient tuning  
🔹 QLoRA → quantized base + LoRA for lower memory

The production workflow matters just as much as training:

Data → Training → Evaluation → Safety → Versioning → Deployment → Monitoring

And one rule is extremely useful:

**Knowledge → RAG.  
Behavior → Fine-tune.  
Both → combine them.**

For most teams, PEFT methods such as LoRA/QLoRA can be much more practical than full fine-tuning because the base model remains frozen and the specialization is stored in lightweight adapters.

#AIEngineering #FineTuning #LoRA #QLoRA #PEFT #LLM #RAG #GenerativeAI
