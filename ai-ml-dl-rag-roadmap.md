# AI / ML / DL / RAG — Deep Roadmap

**Part 1 of 3 — AI Forward Deployed Engineer path.** The technical foundation: software engineering, classic ML/DL, and modern AI engineering (LLMs, RAG, agents, MCP, fine-tuning), through production hardening and GenAIOps/security.

> Companion files:
> - **`fde-roadmap.md`** — Enterprise Integration → AI System Design → the Forward Deployed Layer → the AI Engineer (Forward Deployment) role.
> - **`salesforce-ai-fde-roadmap.md`** — Agentforce, Data 360, Einstein Trust Layer, and Salesforce-specific FDE skills.

---

## 📌 Levels in This File

1. [Software Engineering Foundation](#1-software-engineering-foundation)
2. [AI / ML Fundamentals](#2-ai--ml-fundamentals)
3. [AI Engineering](#3-ai-engineering)
4. [Production AI Engineering](#4-production-ai-engineering)
5. [GenAIOps + AI Security](#5-genaiops--ai-security)

---

## 1. Software Engineering Foundation

<details>
<summary><b>Programming Fundamentals</b></summary>

Variables & Scope · Data Types · Control Flow · Functions · Recursion · Modules & Packages · File I/O · Error Handling · Iterators & Generators · Comprehensions · Standard Library · Code Organization
</details>

<details>
<summary><b>Python Core</b></summary>

Interpreter & Bytecode · Mutable vs Immutable · References & Copying · Truthiness · String Formatting · Slicing · Unpacking · *args & **kwargs · Closures · Decorators · Context Managers · Virtual Environments · pip & Dependency Pinning
</details>

<details>
<summary><b>Python Data Structures</b></summary>

list · tuple · dict · set & frozenset · collections.deque · defaultdict · Counter · namedtuple · dataclasses · heapq · bisect · array vs list · Operation Complexity Table
</details>

<details>
<summary><b>Python OOP</b></summary>

Classes & Instances · __init__ vs __new__ · Instance vs Class Attributes · Inheritance · Multiple Inheritance & MRO · Composition over Inheritance · Abstract Base Classes · Protocols & Duck Typing · Dunder Methods · Properties · Class & Static Methods · __slots__ · Encapsulation · SOLID Principles
</details>

<details>
<summary><b>Python Advanced</b></summary>

Metaclasses · Descriptors · functools (lru_cache, partial, wraps) · itertools · Generators & yield from · Custom Context Managers · Monkey Patching · Reflection & Introspection · Weak References · Garbage Collection · C Extensions & Cython · Packaging & Distribution
</details>

<details>
<summary><b>Type Systems</b></summary>

Static vs Dynamic Typing · Type Hints · Optional & Union · Generics & TypeVar · Protocol · Literal & Final · TypedDict · NewType · Callable Types · mypy / pyright · Runtime Validation · Pydantic Models · Type-Safe API Contracts
</details>

<details>
<summary><b>Async Programming</b></summary>

Blocking vs Non-Blocking · Event Loop · async / await · Coroutines vs Tasks · asyncio.gather · TaskGroup · Timeouts & Cancellation · Async Context Managers · Async Generators · Semaphores & Rate Limiting · httpx / aiohttp · Async DB Drivers · Mixing Sync & Async · Debugging Async Code
</details>

<details>
<summary><b>Concurrency</b></summary>

Process vs Thread · GIL · threading Module · multiprocessing · concurrent.futures · Race Conditions · Locks & Mutex · Deadlock · Semaphore · Thread-Safe Queue · Thread Pool Sizing · CPU-bound vs IO-bound · Shared State · Idempotency
</details>

<details>
<summary><b>Memory & Performance</b></summary>

Reference Counting · Garbage Collection · Memory Profiling · sys.getsizeof · Generators for Streaming · Copy vs Deepcopy · Object Interning · Caching Strategies · cProfile & py-spy · timeit & Benchmarking · Vectorization with NumPy · Batch Processing · Memory Leaks · Large Payload Handling
</details>

<details>
<summary><b>Arrays & Strings</b></summary>

Two Pointers · Sliding Window · Prefix Sum · Kadane's Algorithm · In-Place Modification · Sorting-Based Tricks · Hash Map Counting · Anagram & Palindrome · Substring Search · String Building · Matrix Traversal · Binary Search on Answer
</details>

<details>
<summary><b>Linked Lists</b></summary>

Singly Linked List · Doubly Linked List · Circular List · Dummy Head Node · Fast & Slow Pointers · Cycle Detection · Reverse a List · Merge Two Lists · Find Middle · Remove Nth from End · LRU Cache Design · List vs Array Trade-offs
</details>

<details>
<summary><b>Stacks & Queues</b></summary>

Stack Operations · Queue Operations · Deque · Monotonic Stack · Min Stack · Balanced Parentheses · Next Greater Element · Queue with Two Stacks · Circular Queue · Priority Queue / Heap · BFS with Queue · DFS with Stack
</details>

<details>
<summary><b>Trees</b></summary>

Binary Tree · Binary Search Tree · In / Pre / Post Order Traversal · Level Order BFS · Depth & Height · Balanced Trees · AVL & Red-Black · Trie · Segment Tree · Heap as Tree · Lowest Common Ancestor · Serialize & Deserialize · Recursion on Trees
</details>

<details>
<summary><b>Graphs</b></summary>

Adjacency List vs Matrix · Directed vs Undirected · Weighted Graphs · BFS · DFS · Topological Sort · Cycle Detection · Dijkstra · Bellman-Ford · Union-Find · Connected Components · Minimum Spanning Tree · Shortest Path Variants · Graphs in Real Systems
</details>

<details>
<summary><b>Sorting & Searching</b></summary>

Bubble / Insertion / Selection · Merge Sort · Quick Sort · Heap Sort · Counting & Radix Sort · Stability · In-Place vs Extra Space · Python's Timsort · Custom Sort Keys · Binary Search · Search in Rotated Array · Lower / Upper Bound · Search in 2D Matrix
</details>

<details>
<summary><b>Dynamic Programming</b></summary>

Overlapping Subproblems · Optimal Substructure · Memoization (Top-Down) · Tabulation (Bottom-Up) · State Definition · Transition Equation · 1D DP · 2D DP · Knapsack · Longest Common Subsequence · Longest Increasing Subsequence · Coin Change · Edit Distance · Space Optimization
</details>

<details>
<summary><b>Big-O Complexity</b></summary>

Time Complexity · Space Complexity · Best / Average / Worst Case · Amortized Analysis · Common Growth Rates · Recursion Complexity · Master Theorem · Complexity of Python Built-ins · Trade-off Analysis · Practical vs Asymptotic Cost
</details>

<details>
<summary><b>SQL Fundamentals</b></summary>

SELECT & WHERE · JOIN Types · GROUP BY & HAVING · Aggregate Functions · Subqueries · CTE (WITH) · Window Functions · UNION vs UNION ALL · NULL Handling · CASE Expressions · DISTINCT · LIMIT & Pagination · EXISTS vs IN · EXPLAIN & Query Plans
</details>

<details>
<summary><b>Database Design</b></summary>

Entities & Relationships · Primary & Foreign Keys · Normalization (1NF-3NF) · Denormalization · One-to-Many & Many-to-Many · Indexes · Composite Index · Index Selectivity · Constraints · Schema Migration · OLTP vs OLAP · Star Schema · Partitioning · SQL vs NoSQL Choice
</details>

<details>
<summary><b>Transactions & Isolation</b></summary>

ACID · BEGIN / COMMIT / ROLLBACK · Read Uncommitted · Read Committed · Repeatable Read · Serializable · Dirty Read · Non-Repeatable Read · Phantom Read · Optimistic vs Pessimistic Locking · Deadlock Handling · Connection Pooling · Long-Running Transactions
</details>

<details>
<summary><b>Git</b></summary>

Repository & Working Tree · Staging Area · Commit · Branch · Merge · Rebase · Cherry-Pick · Stash · Reset vs Revert · Reflog · Tags · .gitignore · Conflict Resolution · Interactive Rebase · git bisect
</details>

<details>
<summary><b>GitHub Workflow</b></summary>

Fork & Clone · Feature Branch · Pull Request · Code Review · Required Checks · Protected Branches · Squash vs Merge Commit · Issues & Projects · GitHub Actions · Repository Secrets · Releases & Tags · CODEOWNERS · Conventional Commits · Trunk-Based Development
</details>

<details>
<summary><b>Linux & CLI</b></summary>

File System Layout · Permissions & chmod · Users & sudo · Processes & ps · kill & Signals · Pipes & Redirection · grep / sed / awk · find / xargs · tar & Compression · ssh & scp · curl · Environment Variables · systemd Services · Logs & journalctl · Shell Scripting
</details>

<details>
<summary><b>Networking Basics</b></summary>

OSI vs TCP/IP Model · IP Addressing · TCP vs UDP · DNS Resolution · HTTP Methods · HTTP Status Codes · Headers & Cookies · HTTPS & TLS Handshake · Certificates · Ports & Firewalls · Proxy & Reverse Proxy · Load Balancer Basics · Latency vs Bandwidth · WebSockets · CORS
</details>

<details>
<summary><b>Testing</b></summary>

Unit Tests · Integration Tests · End-to-End Tests · pytest Basics · Fixtures · Parametrize · Mocking & Patching · Test Doubles · Coverage · Test Pyramid · Arrange-Act-Assert · Flaky Tests · Snapshot Testing · Contract Testing · Testing Async Code
</details>

<details>
<summary><b>Debugging</b></summary>

Read the Stack Trace · Reproduce the Bug · Bisect the Problem · pdb / breakpoint() · IDE Debugger · Logging Levels · Structured Logging · print vs Logger · Debugging in Production · Remote Debugging · CPU & Memory Profiling · Debugging Concurrency · Root Cause Analysis · Postmortem
</details>

<details>
<summary><b>Code Quality</b></summary>

Readability · Naming · Function Size · DRY vs Premature Abstraction · Pure Functions · Side Effects · Cyclomatic Complexity · Linting (ruff / flake8) · Formatting (black) · Pre-Commit Hooks · Static Analysis · Docstrings · Code Review Checklist · Technical Debt · Refactoring
</details>

<details>
<summary><b>REST APIs</b></summary>

Resources & URIs · HTTP Verbs · Status Codes · Request & Response Body · Idempotency · Pagination · Filtering & Sorting · Versioning · Authentication · Rate Limiting · Error Response Format · OpenAPI Spec · Webhooks · REST vs GraphQL vs gRPC
</details>

<details>
<summary><b>FastAPI</b></summary>

Path & Query Parameters · Request Body & Pydantic · Response Models · Dependency Injection · Async Endpoints · Middleware · Background Tasks · Streaming Responses · Exception Handlers · Auth & OAuth2 · CORS · Automatic Docs (Swagger) · Routers & Project Layout · TestClient · Uvicorn & Deployment
</details>

<details>
<summary><b>Engineering Practices</b></summary>

Requirements Clarification · Design Docs · ADR (Architecture Decision Record) · Estimation · Trunk-Based Development · Code Review Culture · CI/CD Discipline · Feature Flags · Observability by Default · On-Call & Runbooks · Postmortems · Documentation · Pair Programming · Continuous Learning
</details>

---

## 2. AI / ML Fundamentals

<details>
<summary><b>ML Problem Framing</b></summary>

Business Problem → ML Problem · Is ML Even Needed? · Supervised vs Unsupervised · Classification vs Regression · Ranking & Recommendation · Target Variable Definition · Label Availability · Baseline First · Success Metric Selection · Offline vs Online Metric · Latency & Cost Constraints · Cost of a Wrong Prediction · Scoping the MVP
</details>

<details>
<summary><b>Linear Algebra</b></summary>

Scalars & Vectors · Matrices · Matrix Multiplication · Transpose · Identity & Inverse · Dot Product · Norms (L1 / L2) · Cosine Similarity · Linear Independence · Rank · Eigenvalues & Eigenvectors · SVD · Vector Spaces · NumPy Broadcasting · Tensors
</details>

<details>
<summary><b>Calculus for ML</b></summary>

Functions & Limits · Derivative Intuition · Partial Derivatives · Gradient · Chain Rule · Jacobian · Hessian · Convexity · Local vs Global Minima · Gradient Descent Intuition · Learning Rate Effect · Backpropagation Math · Saddle Points
</details>

<details>
<summary><b>Probability</b></summary>

Sample Space & Events · Conditional Probability · Independence · Bayes' Theorem · Random Variables · Expectation & Variance · Bernoulli & Binomial · Normal Distribution · Poisson · Joint & Marginal · Likelihood · Maximum Likelihood Estimation · Entropy · KL Divergence · Softmax as Probability
</details>

<details>
<summary><b>Statistics</b></summary>

Mean / Median / Mode · Variance & Std Deviation · Percentiles & Quantiles · Skew & Outliers · Sampling · Central Limit Theorem · Confidence Intervals · Hypothesis Testing · p-value · Type I & Type II Errors · A/B Test Basics · Sample Size · Correlation vs Causation · Simpson's Paradox
</details>

<details>
<summary><b>Data Collection</b></summary>

Data Sources · Databases & Warehouses · APIs & Scraping · Logs & Events · Third-Party Data · Labeling Strategy · Annotation Guidelines · Inter-Annotator Agreement · Sampling Bias · How Much Data Is Enough · Licensing & Consent · PII Handling · Dataset Versioning
</details>

<details>
<summary><b>Data Cleaning</b></summary>

Missing Values · Imputation Strategies · Duplicates & Dedup · Outlier Detection · Type Casting · Encoding Issues · Inconsistent Categories · Date & Timezone Normalization · Text Normalization · Unit Standardization · Data Validation Rules · Leakage Check · Train / Test Contamination · Data Quality Metrics
</details>

<details>
<summary><b>Feature Engineering</b></summary>

Numeric Scaling · Standardization vs Normalization · One-Hot Encoding · Ordinal Encoding · Target Encoding · Binning · Interaction Features · Polynomial Features · Date / Time Features · Text Features (TF-IDF) · Aggregation Features · Lag & Rolling Features · Feature Selection · Feature Store · Train / Serve Skew
</details>

<details>
<summary><b>Regression</b></summary>

Linear Regression · Multiple Regression · Polynomial Regression · Ridge (L2) · Lasso (L1) · Elastic Net · Linear Model Assumptions · Residual Analysis · Multicollinearity · MSE / RMSE / MAE · R² & Adjusted R² · Heteroscedasticity · Robust Regression · Quantile Regression
</details>

<details>
<summary><b>Classification</b></summary>

Logistic Regression · Sigmoid & Decision Boundary · Multi-Class (Softmax) · One-vs-Rest · Naive Bayes · k-Nearest Neighbours · Support Vector Machines · Kernel Trick · Class Imbalance · Threshold Tuning · Cost-Sensitive Learning · Multi-Label Classification · Probability vs Label Output
</details>

<details>
<summary><b>Decision Trees</b></summary>

Tree Structure & Splits · Gini Impurity · Entropy & Information Gain · Recursive Partitioning · Depth & Leaf Size · Pruning · Categorical Feature Handling · Missing Value Handling · Feature Importance · Overfitting in Trees · Regression Trees · Interpretability Advantage
</details>

<details>
<summary><b>Ensemble Models</b></summary>

Bagging · Random Forest · Boosting · AdaBoost · Gradient Boosting · XGBoost · LightGBM · CatBoost · Stacking · Blending · Voting Classifiers · Bias-Variance Effect · Hyperparameter Tuning · When Trees Beat Deep Learning
</details>

<details>
<summary><b>Clustering</b></summary>

k-Means · Choosing k (Elbow / Silhouette) · k-Means++ Initialization · Hierarchical Clustering · Dendrograms · DBSCAN · Density vs Centroid Methods · Gaussian Mixture Models · Distance Metrics · Scaling Before Clustering · Cluster Evaluation · Customer Segmentation · Clustering Embeddings
</details>

<details>
<summary><b>Dimensionality Reduction</b></summary>

Curse of Dimensionality · PCA · Explained Variance · Whitening · t-SNE · UMAP · Autoencoders · Selection vs Extraction · Random Projection · Matrix Factorization · Visualizing Embeddings · Compression vs Information Loss
</details>

<details>
<summary><b>Anomaly Detection</b></summary>

Point / Contextual / Collective · z-score & IQR Thresholds · Isolation Forest · One-Class SVM · Local Outlier Factor · Autoencoder Reconstruction Error · Time-Series Anomalies · Rare-Event Imbalance · Labelled vs Unlabelled Setting · Alert Threshold Tuning · False Positive Cost · Fraud & Monitoring Use Cases
</details>

<details>
<summary><b>Model Evaluation</b></summary>

Train / Validation / Test Split · Accuracy · Confusion Matrix · Precision · Recall · F1 Score · ROC Curve & AUC · Precision-Recall Curve · Log Loss · Regression Metrics · Macro vs Micro Averaging · Metric Choice by Business Cost · Baseline Comparison · Error Analysis · Slice-Based Evaluation
</details>

<details>
<summary><b>Calibration</b></summary>

Predicted Probability vs Reality · Reliability Diagram · Expected Calibration Error · Brier Score · Platt Scaling · Isotonic Regression · Temperature Scaling · Overconfidence in Deep Nets · Calibration After Resampling · Why Calibration Drives Decisions · Threshold from Calibrated Scores
</details>

<details>
<summary><b>Cross-Validation</b></summary>

Holdout Split · k-Fold · Stratified k-Fold · Leave-One-Out · Group k-Fold · Time-Series Split · Nested Cross-Validation · CV for Hyperparameter Tuning · Variance of CV Estimates · Leakage Inside CV · Preprocessing Inside the Fold · When Not to Use CV
</details>

<details>
<summary><b>Bias & Variance</b></summary>

Underfitting · Overfitting · Bias-Variance Trade-off · Learning Curves · Model Capacity · Train vs Validation Gap · Signal vs Noise · More Data vs Better Model · Effect of Ensembling · Effect of Regularization · Diagnosis Checklist · Irreducible Error
</details>

<details>
<summary><b>Regularization</b></summary>

L1 (Lasso) · L2 (Ridge) · Elastic Net · Dropout · Early Stopping · Weight Decay · Data Augmentation · Batch Normalization Effect · Label Smoothing · Max-Norm Constraint · Noise Injection · Tuning Regularization Strength · Regularization vs More Data
</details>

<details>
<summary><b>Optimization</b></summary>

Loss Functions · Gradient Descent · Batch / Mini-Batch / Stochastic · Learning Rate · Momentum · Nesterov · RMSProp · Adam · AdamW · LR Schedules · Warmup · Gradient Clipping · Vanishing & Exploding Gradients · Convergence Diagnostics · Optimizer Memory Cost
</details>

<details>
<summary><b>Neural Networks</b></summary>

Neuron & Perceptron · Layers · Weights & Biases · Activation Functions · ReLU / GELU / Sigmoid / Tanh · Forward Pass · Loss Computation · Backpropagation · Weight Initialization · Universal Approximation · MLP Architecture · Depth vs Width · Overfitting in Neural Nets · Softmax Output Layer
</details>

<details>
<summary><b>Deep Learning</b></summary>

CNN · Convolution & Pooling · RNN · LSTM & GRU · Sequence Modelling · Encoder-Decoder · Attention Mechanism · Residual Connections · Batch vs Layer Normalization · Transfer Learning · Pretraining & Fine-Tuning · GPU Training · Mixed Precision · Gradient Accumulation · Catastrophic Forgetting
</details>

<details>
<summary><b>NLP Fundamentals</b></summary>

Tokenization · Stemming & Lemmatization · Stop Words · Bag of Words · TF-IDF · n-grams · Word2Vec & GloVe · Contextual Embeddings · Named Entity Recognition · Part-of-Speech Tagging · Text Classification · Sequence Labelling · Language Modelling · Perplexity · Multilingual Text
</details>

<details>
<summary><b>Transformers</b></summary>

Self-Attention · Query / Key / Value · Scaled Dot-Product · Multi-Head Attention · Positional Encoding · Feed-Forward Block · Residual + LayerNorm · Encoder vs Decoder · Causal Masking · Cross-Attention · Context Length & O(n²) Cost · KV Cache · BERT vs GPT Families · Rotary Embeddings (RoPE) · Flash Attention
</details>

<details>
<summary><b>Embeddings</b></summary>

Vector Representation · Word vs Sentence Embeddings · Bi-Encoder vs Cross-Encoder · Contrastive Learning · In-Batch & Hard Negatives · Pooling (CLS / Mean) · Symmetric vs Asymmetric Search · Query / Passage Prefixes · Dimensionality Choice · Cosine vs Dot vs Euclidean · Normalization · MTEB & Model Selection · Domain Adaptation · Embedding Drift · Failure Modes (Negation, IDs)
</details>

<details>
<summary><b>PyTorch</b></summary>

Tensors · Autograd · nn.Module · Layers & Parameters · Loss Functions · Optimizers · Dataset & DataLoader · Device Placement (CPU / GPU) · Saving & Loading Checkpoints · train() vs eval() Mode · torch.no_grad · Custom Layers · torch.compile · Distributed Training Basics · Debugging Tensor Shapes
</details>

<details>
<summary><b>Training Loops</b></summary>

Epoch & Batch · Forward Pass · Loss Calculation · Backward Pass · Optimizer Step · zero_grad · Validation Loop · Metric Logging · Checkpointing · Early Stopping · LR Scheduler Step · Gradient Accumulation · Mixed Precision (AMP) · Seeds & Reproducibility · Overfit-on-10-Samples Check
</details>

<details>
<summary><b>Experiment Tracking</b></summary>

Run vs Experiment · Hyperparameter Logging · Metric Logging · Artifact Storage · Dataset Version Linking · Code Version Linking · MLflow · Weights & Biases · TensorBoard · Comparing Runs · Reproducibility · Model Registry · Promotion Stages · One-Change-Per-Experiment Rule
</details>

<details>
<summary><b>ML Lifecycle</b></summary>

Problem Definition · Data Collection · Exploratory Data Analysis · Feature Engineering · Model Training · Evaluation · Model Selection · Packaging · Deployment · Monitoring · Drift Detection · Retraining Triggers · Rollback · Model Governance · Decommissioning
</details>

---

## 3. AI Engineering

<details>
<summary><b>LLM Fundamentals</b></summary>

What an LLM Actually Does · Next-Token Prediction · Tokens vs Words · Context Window · Base vs Instruct Models · System / User / Assistant Roles · Temperature & Sampling · Determinism & Seeds · Hallucination Is By Design · Knowledge Cutoff · Emergent Abilities · Open vs Closed Models · Model Families · Reasoning Models · Limits of LLMs
</details>

<details>
<summary><b>Model Selection</b></summary>

Quality vs Latency vs Cost · Public Benchmark Caution · Task-Specific Evaluation · Small vs Large Models · Reasoning vs Fast Models · Context Window Needs · Multilingual Support · Tool-Calling Support · Structured Output Support · Data Residency Constraints · Vendor Lock-In · Model Deprecation Risk · Cheap → Expensive Routing · Build Your Own Eval Set
</details>

<details>
<summary><b>Inference Controls</b></summary>

temperature · top_p · top_k · max_tokens · Stop Sequences · Frequency & Presence Penalty · seed · Logit Bias · Streaming · System Prompt · JSON / Response Format · Tool Choice · Parallel Tool Calls · Limits of Reproducibility
</details>

<details>
<summary><b>Prompt Engineering</b></summary>

Role & Task Definition · Context Injection · Explicit Constraints · Output Format Spec · Few-Shot Examples · Chain-of-Thought · Zero-Shot vs Few-Shot · Delimiters & Structure · Negative Instructions · Instruction Ordering · Prompt Length vs Quality · Self-Consistency · Prompt Injection Defence · Iterating with a Test Set
</details>

<details>
<summary><b>Prompt Templates</b></summary>

Variable Interpolation · Jinja / f-string Templating · Template Versioning · Prompt Registry · Prompt Separated from Code · Multi-Turn Templates · System vs User Split · Reusable Fragments · Localization · Template Testing · Diffing Prompt Changes · Rolling Back a Prompt
</details>

<details>
<summary><b>Structured Outputs</b></summary>

Why JSON over Free Text · JSON Mode · Tool / Function Schema · Pydantic Models · JSON Schema · Constrained / Grammar Decoding · Validation & Retry · Partial Parse Handling · Enum & Literal Fields · Nested Objects · Optional Fields & Defaults · Streaming Structured Output · Schema Evolution
</details>

<details>
<summary><b>Function Calling</b></summary>

Tool Definition · Parameter Schema · Tool Descriptions Matter · Model Chooses the Tool · Executing the Call · Returning Tool Results · Multi-Step Tool Loops · Parallel Tool Calls · Tool Errors & Retry · Tool Allowlists · Too Many Tools Problem · Idempotent Write Tools · Human Approval for Writes
</details>

<details>
<summary><b>LLM APIs</b></summary>

Chat Completions API · Responses / Messages API · Streaming (SSE) · Batch API · Embeddings API · Rate Limits (RPM / TPM) · Retries & Backoff · Timeouts · Error Codes · Token Usage Reporting · Cost per Request · SDK vs Raw HTTP · Provider Abstraction Layer · API Key Management
</details>

<details>
<summary><b>Token Management</b></summary>

Tokenizer Basics · Counting Tokens · Input vs Output Cost · Context Budget Planning · Truncation Strategies · Conversation Summarization · Sliding Window History · Chunk Budget in RAG · Reserving Space for Output · Long Document Handling · Token Cost of Non-English · Cost Estimation Formula
</details>

<details>
<summary><b>RAG Architecture</b></summary>

Why RAG over Fine-Tuning · Indexing Pipeline · Query Pipeline · Retrieve → Augment → Generate · Top-k Selection · Context Assembly · Citations & Grounding · Refusal ("I don't know") · Freshness & Reindexing · Permission-Aware Retrieval · RAG Failure Modes · Caching Layers · End-to-End Latency Budget
</details>

<details>
<summary><b>Document Processing</b></summary>

PDF Parsing · OCR · HTML & Markdown Extraction · Office Documents · Table Extraction · Images & Diagrams · Layout Preservation · Header / Footer Removal · Language Detection · Metadata Extraction · Deduplication · Incremental Ingestion · Parsing Failure Handling
</details>

<details>
<summary><b>Chunking</b></summary>

Fixed-Size Chunking · Sentence-Based · Paragraph-Based · Recursive Character Splitting · Semantic Chunking · Chunk Size Selection · Overlap · Token vs Character Count · Preserving Headings · Metadata per Chunk · ACL Tags per Chunk · Tables & Code Blocks · Parent-Child Chunks · Contextual Chunk Headers
</details>

<details>
<summary><b>Embeddings & Indexing</b></summary>

Embedding Model Choice · Batch Embedding · Vector Normalization · Index Build · Metadata Fields · Namespace / Collection Design · Upsert vs Rebuild · Incremental Indexing · Deletes & Tombstones · Re-embedding on Model Change · Index Size & Cost · Backfill Strategy · Index Versioning
</details>

<details>
<summary><b>Vector Databases</b></summary>

pgvector · Pinecone · Qdrant · Weaviate · Milvus · FAISS · Flat vs HNSW vs IVF · ef_search / ef_construction · Distance Metrics · Metadata Filtering · Pre-Filter vs Post-Filter · Hybrid Search Support · Sharding & Replication · Backup & Recovery · Choosing a Vector DB
</details>

<details>
<summary><b>Sparse Retrieval</b></summary>

Keyword Search · BM25 · TF-IDF · Inverted Index · Exact Match Strength · Stemming & Analyzers · Elasticsearch / OpenSearch · Field Boosting · Phrase & Proximity Queries · Filters & Facets · When Sparse Beats Dense · The IDs & Codes Problem
</details>

<details>
<summary><b>Hybrid Retrieval</b></summary>

Dense + Sparse Combination · Reciprocal Rank Fusion (RRF) · Weighted Score Fusion · Score Normalization · Query Routing · Metadata Pre-Filtering · Multi-Index Search · Recall vs Precision Tuning · Latency Cost of Hybrid · Tuning the Blend Weight · Measuring the Gain
</details>

<details>
<summary><b>Reranking</b></summary>

Cross-Encoder Rerankers · Cohere / BGE / Jina Rerankers · LLM-as-Reranker · Retrieve-Many → Rerank-Few · top_n Selection · Latency Budget · Cost per Rerank · MMR & Diversity · Position Bias · When Reranking Doesn't Help · Measuring Rerank Lift
</details>

<details>
<summary><b>RAG Evaluation</b></summary>

Retrieval vs Generation Metrics · Recall@k · Precision@k · MRR & NDCG · Groundedness / Faithfulness · Answer Relevance · Context Precision · Golden Question Set · LLM-as-Judge · Human Review Sample · CI Regression Gate · Access-Violation Test · Error Taxonomy · Ragas / DeepEval
</details>

<details>
<summary><b>Agent Fundamentals</b></summary>

Workflow vs Agent · When NOT to Use an Agent · ReAct Loop · Thought → Action → Observation · Goal & Termination Conditions · Max Iterations · Tool Selection · State Between Steps · Reflection & Self-Critique · Determinism vs Autonomy · Cost of an Agent Loop · Agent Failure Modes
</details>

<details>
<summary><b>Agent Orchestration</b></summary>

Single vs Multi-Agent · Supervisor Pattern · Sequential Pipeline · Parallel Fan-Out · Critic / Reviewer Agent · Structured Handoff Schema · Routing Logic · Shared State Object · LangGraph · Checkpointers & Resume · Human-in-the-Loop Interrupt · Loop & Deadlock Prevention · Step-Level Observability
</details>

<details>
<summary><b>Agent Memory</b></summary>

Short-Term (Working) Memory · Long-Term Memory · Episodic Memory · Semantic Memory · Scratchpad · Conversation Summarization · Vector Memory Store · Memory Retrieval Policy · Memory Write Policy · Context Budget for Memory · Staleness & Conflicts · Privacy & Deletion · Per-User Isolation
</details>

<details>
<summary><b>MCP</b></summary>

The M×N Integration Problem · Host / Client / Server · stdio Transport · Streamable HTTP · Tools · Resources · Prompts · Who Controls What · MCP vs Function Calling · Building an MCP Server · MCP Inspector · Tool Design Rules · Auth & Scopes · Tool Poisoning Risk · Server Registry & Approval
</details>

<details>
<summary><b>Fine-Tuning</b></summary>

When NOT to Fine-Tune · RAG vs Fine-Tuning · Supervised Fine-Tuning (SFT) · Preference Tuning (DPO) · Continued Pretraining · Dataset Size & Quality · Chat Template Data Format · Loss on Assistant Tokens Only · Train / Eval Split · Signs of Overfitting · Catastrophic Forgetting · Evaluating vs the Base Model · Cost & Training Time · Serving a Fine-Tuned Model
</details>

<details>
<summary><b>LoRA / QLoRA</b></summary>

Low-Rank Adaptation Idea · Rank (r) & Alpha · Target Modules · Trainable Parameter Count · QLoRA & 4-bit Quantization · Memory Savings Math · Adapter Merging · Multi-Adapter Serving · PEFT Library · Hyperparameters That Matter · LoRA vs Full Fine-Tune · Adapter Versioning
</details>

<details>
<summary><b>Model Optimization</b></summary>

Quantization (INT8 / INT4) · GPTQ / AWQ · Pruning · Knowledge Distillation · Flash Attention · KV Cache Optimization · Continuous Batching · Speculative Decoding · Tensor Parallelism · vLLM / TGI / SGLang · ONNX Runtime · Throughput vs Latency · Measuring Quality Loss
</details>

<details>
<summary><b>Multimodal AI</b></summary>

Vision-Language Models · Image Input to LLMs · OCR vs VLM · Document Understanding · Chart & Table Reading · Image Generation · Speech-to-Text (ASR) · Text-to-Speech · Speech-to-Speech Models · Video Understanding · Multimodal Embeddings · Token Cost of Images · Multimodal Evaluation
</details>

<details>
<summary><b>AI Data Pipelines</b></summary>

Source Connectors · Change Data Capture · Batch vs Streaming Ingestion · Parsing & Normalization · PII Redaction · Chunk & Embed Stage · Upsert to Vector Store · Delete Propagation · Idempotency & Watermarks · Backfill & Reindex Jobs · Airflow / Prefect · Retry & Dead-Letter Queue · Pipeline Monitoring · Cost per Document
</details>

<details>
<summary><b>Human-in-the-Loop</b></summary>

When Approval Is Required · Approval UI Patterns · Confidence Thresholds · Escalation Rules · Review Queues · Random Sampling for QA · Feedback Capture (Thumbs / Edits) · "Agent Edited" as a Signal · Feedback → Eval Cases · Annotator Guidelines · Reviewer Fatigue · Autonomy Ramp-Up Plan
</details>

<details>
<summary><b>AI Application Architecture</b></summary>

Layered Architecture · API Gateway · LLM Gateway / Proxy · Retrieval Service · Tool / Action Service · Prompt & Config Store · Async Job Queue · Streaming to the Client · Session & State Store · Caching Layers · Multi-Tenancy · Secrets & Config · Observability Hooks · Failure Isolation
</details>

<details>
<summary><b>Production AI Patterns</b></summary>

Model Routing · Fallback Chains · Prompt Caching · Semantic Caching · Retry with Backoff · Circuit Breaker · Graceful Degradation · Token-Based Rate Limiting · Timeout Budgets · Async / Background Generation · Streaming First Token · Input & Output Guardrails · Shadow Deployment · Canary & Rollback · Cost Guardrails
</details>

---

## 4. Production AI Engineering

<details>
<summary><b>Docker Fundamentals</b></summary>

Image vs Container · Dockerfile · Layers & Build Cache · Base Images · RUN / COPY / CMD / ENTRYPOINT · Build Context & .dockerignore · Tags & Registries · Volumes · Bind Mounts · Networking & Port Mapping · Environment Variables · docker compose · Container Lifecycle · Logs & exec
</details>

<details>
<summary><b>Docker Production</b></summary>

Multi-Stage Builds · Slim & Distroless Images · Non-Root User · Image Size Optimization · Layer Caching in CI · Pinning Base Image Digests · Vulnerability Scanning · Secrets Never in the Image · Health Checks · Resource Limits · Graceful Shutdown (SIGTERM) · Logging to stdout · Registry Authentication · Image Signing · GPU Containers
</details>

<details>
<summary><b>CI/CD</b></summary>

Pipeline Stages · Lint → Test → Build → Deploy · Build Artifacts · Dependency Caching · Matrix Builds · Branch & PR Triggers · Environment Promotion · Approval Gates · Secrets in CI · OIDC to Cloud (No Static Keys) · Deployment Automation · Rollback Automation · AI Eval Gates · Pipeline Speed · Flaky Pipeline Debugging
</details>

<details>
<summary><b>Cloud Fundamentals</b></summary>

Regions & Availability Zones · Shared Responsibility Model · IAM Users vs Roles · Least Privilege · Compute Options · Object Storage · Block vs File Storage · Managed Databases · VPC & Subnets · Security Groups · NAT Gateway · Managed vs Self-Hosted · On-Demand / Spot / Reserved · Tagging & Cost Allocation · Quotas & Service Limits
</details>

<details>
<summary><b>AWS / GCP / Azure</b></summary>

EC2 / Compute Engine / VMs · Lambda / Cloud Functions · ECS & Fargate · EKS / GKE / AKS · S3 / GCS / Blob Storage · RDS / Cloud SQL · DynamoDB / Firestore / Cosmos · SQS & SNS / Pub-Sub / Service Bus · API Gateway · CloudWatch / Cloud Logging / Monitor · Secrets Manager / Key Vault · Bedrock / Vertex AI / Azure OpenAI · SageMaker · Load Balancers · Cross-Cloud Equivalence Map
</details>

<details>
<summary><b>Kubernetes Core</b></summary>

Cluster & Nodes · Pod · ReplicaSet · Deployment · Service · Ingress · ConfigMap · Secret · Namespace · Labels & Selectors · kubectl Basics · Rolling Update · Job & CronJob · StatefulSet · PersistentVolume & Claim
</details>

<details>
<summary><b>Kubernetes Production</b></summary>

Resource Requests & Limits · Liveness / Readiness / Startup Probes · HorizontalPodAutoscaler · Pod Disruption Budget · Node Affinity & Taints · Init Containers · Sidecars · RBAC · Network Policies · External Secrets · Helm Charts · Cluster Autoscaler · GPU Node Pools · Debugging CrashLoopBackOff · Debugging OOMKilled
</details>

<details>
<summary><b>Load Balancing</b></summary>

L4 vs L7 · Round Robin · Least Connections · Weighted Routing · Consistent Hashing · Sticky Sessions · Health Checks · Connection Draining · Ingress Controller · nginx / Envoy Reverse Proxy · Global vs Regional LB · TLS Termination · Timeouts at the LB · Streaming Through a LB
</details>

<details>
<summary><b>Caching</b></summary>

Cache-Aside · Read-Through · Write-Through · Write-Behind · TTL & Expiry · Eviction Policies (LRU / LFU) · Redis · In-Process Cache · CDN Caching · Cache Key Design · Cache Invalidation · Version-Keyed Invalidation · Stampede & Dogpile · Prompt Cache · Semantic Cache · Hit Rate Monitoring
</details>

<details>
<summary><b>Message Queues</b></summary>

Producer & Consumer · Queue vs Topic · SQS · RabbitMQ · Kafka · Partitions & Ordering · Consumer Groups · At-Least-Once Delivery · Idempotent Consumers · Visibility Timeout · Dead-Letter Queue · Backpressure · Retry with Backoff · Fan-Out Pattern · Outbox Pattern · Consumer Lag Monitoring
</details>

<details>
<summary><b>LLM Gateways</b></summary>

Why a Gateway · Single Entry Point · Provider Abstraction · API Key Vaulting · Per-Tenant Quotas · Token Accounting · Request & Response Logging · PII Redaction at the Edge · Caching Layer · Retry & Fallback · Model Allowlists · Cost Attribution · LiteLLM / Portkey · Streaming Pass-Through · Gateway as a Single Point of Failure
</details>

<details>
<summary><b>Model Routing</b></summary>

Rules-Based Routing · Complexity-Based Routing · Classifier Router · Cheap-First with Escalation · Task-Type Routing · Cost vs Quality Policy · Latency-Based Routing · Region / Residency Routing · Provider Failover · Canary Routing · Routing Metrics · Evaluating the Router · Avoiding Router Complexity
</details>

<details>
<summary><b>Token Optimization</b></summary>

Shorter System Prompts · Prompt Compression · Context Pruning · Dropping Old Turns · Summarizing History · Fewer / Smaller Chunks · Structured Output over Prose · max_tokens Discipline · Prompt Caching Discount · Batch API Discount · Smaller Model for Simple Tasks · Stop Sequences · Tokens per Request Metric · Output Tokens Dominate the Bill
</details>

<details>
<summary><b>Latency Engineering</b></summary>

Latency Budget · TTFT vs Total Time · Streaming Changes Perception · Prefill vs Decode · Parallel Retrieval · Speculative Prefetch · Connection Reuse · Region Proximity · Cold Starts · p50 vs p95 vs p99 · Tail Latency · Timeout Hierarchy · Removing Sequential Hops · Measuring Each Stage
</details>

<details>
<summary><b>Scalability</b></summary>

Vertical vs Horizontal Scaling · Stateless Services · Externalizing Session State · Sharding · Read Replicas · Connection Pool Limits · Queue-Based Load Levelling · Rate Limiting · Bulkheads · GPU Concurrency Limits · Batch Processing · Fan-Out Cost · Bottleneck Identification · Scaling the Vector DB
</details>

<details>
<summary><b>Autoscaling</b></summary>

Horizontal Pod Autoscaler · CPU vs Custom Metrics · Queue-Depth Scaling · Scale-to-Zero · Cluster Autoscaler · Warm Pools · Cold Start Impact · Scale-Up vs Scale-Down Policy · Thrashing & Stabilization Window · GPU Autoscaling Challenges · Cost of Over-Provisioning · Predictive vs Reactive Scaling
</details>

<details>
<summary><b>Infrastructure as Code</b></summary>

Declarative vs Imperative · Terraform · State File & Locking · Modules · Variables & Outputs · Plan vs Apply · Drift Detection · Importing Existing Resources · Workspaces & Environments · Pulumi / CDK · CloudFormation · Policy as Code · Secrets in IaC · Reviewing Infra in PRs
</details>

<details>
<summary><b>Secrets & Configuration</b></summary>

Env Vars vs Secret Store · Secrets Manager / Key Vault · HashiCorp Vault · Kubernetes Secrets & Their Limits · Rotation · Never Commit Secrets · Secret Scanning · Least-Privilege Access · Config vs Secret · Config per Environment · Runtime Config Reload · Encryption at Rest · Auditing Secret Access
</details>

<details>
<summary><b>Observability</b></summary>

Logs · Metrics · Traces · Distributed Tracing · OpenTelemetry · Correlation / Request ID · Structured JSON Logs · Log Levels & Sampling · Dashboards · Metric Cardinality Cost · A Span per LLM Call · Token & Cost Metrics · Capturing Prompt / Response Safely · Alerting · Retention & Cost
</details>

<details>
<summary><b>SLI / SLO / SLA</b></summary>

Service Level Indicator · Service Level Objective · Service Level Agreement · Error Budget · Availability SLO · Latency SLO · Quality SLO for AI · Groundedness SLO · Choosing Good SLIs · Burn Rate Alerts · Error Budget Policy · Reporting to Customers · SLO vs Reality
</details>

<details>
<summary><b>Reliability Patterns</b></summary>

Retry with Exponential Backoff · Jitter · Circuit Breaker · Bulkhead Isolation · Timeout Everywhere · Fallback Response · Graceful Degradation · Idempotency Keys · Dead-Letter Queue · Health Checks · Handling 429 Rate Limits · Chaos Testing · Fail Fast over Slow Success
</details>

<details>
<summary><b>Disaster Recovery</b></summary>

RTO & RPO · Backup Strategy · Restore Drills · Multi-AZ · Multi-Region · Active-Active vs Active-Passive · Database Failover · Vector Index Rebuild Plan · Config & Secret Recovery · Outage Runbook · LLM Provider Outage Fallback · DR Drills · Data Loss Scenarios
</details>

<details>
<summary><b>Capacity Planning</b></summary>

Traffic Estimation · Peak vs Average · QPS Calculation · Tokens per Second · GPU Memory Math · Concurrency per Replica · Headroom Target · Growth Forecast · Provider Quota Requests · Provisioned Throughput · Batch Windows · Cost Modelling · Buy More vs Optimize
</details>

<details>
<summary><b>Load Testing</b></summary>

Baseline Load Test · Stress Test · Soak Test · Spike Test · k6 / Locust / JMeter · Realistic Prompt Mix · Token Distribution in Tests · Measuring p95 / p99 · Finding the Knee Point · Testing Against Rate Limits · Load Testing Vector Search · Cost of Load Testing LLMs · Acting on the Results
</details>

<details>
<summary><b>Deployment Strategies</b></summary>

Recreate · Rolling Update · Blue-Green · Canary · Shadow / Mirror · Feature Flag Release · Progressive Rollout · Automated Rollback Triggers · Database Migration Ordering · Backward-Compatible Changes · Deployment Windows · Prompt & Model Version Rollout · Rollback Speed
</details>

<details>
<summary><b>Feature Flags</b></summary>

Boolean Flags · Percentage Rollout · User / Tenant Targeting · Kill Switch · Config-Driven Behaviour · Flag Lifecycle & Cleanup · Flags vs Long-Lived Branches · Testing Both Paths · LaunchDarkly / Unleash · Flag for Model Version · Flag for Autonomy Level · Flag Debt
</details>

<details>
<summary><b>Production Runbooks</b></summary>

Alert → Runbook Mapping · Symptom Description · First 5 Minutes · Diagnostic Commands · Escalation Path · Rollback Steps · Kill Switch Location · Known Failure Playbooks · On-Call Contacts · Customer Comms Template · Post-Incident Steps · Keeping Runbooks Current
</details>

<details>
<summary><b>Cost Engineering</b></summary>

Cost per Request · Cost per User · Token Cost Breakdown · GPU Hour Cost · Storage & Egress Cost · Vector DB Cost · Idle Resource Waste · Rightsizing · Spot & Reserved Instances · Caching ROI · Model Downgrade Savings · Budget Alerts · Cost Attribution by Tenant · Weekly Cost Review · Unit Economics
</details>

<details>
<summary><b>Performance Tuning</b></summary>

Profile Before Optimizing · Find the Real Bottleneck · Database Query Tuning · N+1 Query Problem · Connection Pooling · Async & Concurrency · Batching Requests · Payload Size Reduction · Compression · Serialization Cost · GPU Utilization · Memory Pressure · Caching the Hot Path · Measuring the Improvement
</details>

<details>
<summary><b>Operational Excellence</b></summary>

On-Call Rotation · Alert Hygiene (No Noise) · Incident Severity Levels · Incident Commander Role · Blameless Postmortems · Action Item Follow-Through · Change Management · Documentation Discipline · Game Days · Toil Reduction · Automation over Heroics · Weekly Ops Review · Handover to Customer Team
</details>

---

## 5. GenAIOps + AI Security

<details>
<summary><b>LLM Evaluation</b></summary>

Why Accuracy Doesn't Apply · Task-Specific Metrics · Exact Match & F1 · Limits of BLEU / ROUGE · LLM-as-Judge · Judge Prompt Design · Judge Bias & Position Effects · Pairwise Comparison · Rubric Scoring · Human Evaluation · Inter-Rater Agreement · Sample Size for Eval · Offline vs Online Eval · Cost of Evaluation
</details>

<details>
<summary><b>RAG Evaluation</b></summary>

Retrieval Recall@k · Context Precision · Groundedness · Faithfulness · Answer Relevance · Citation Correctness · Refusal Correctness · Retrieval vs Generation Blame · Golden Set Construction · Hard Negative Questions · Permission Leak Tests · Ragas / TruLens · Per-Source Breakdown · Tracking Over Time
</details>

<details>
<summary><b>Agent Evaluation</b></summary>

Outcome Metrics (Task Success) · Trajectory Evaluation · Correct Tool Selection · Tool Argument Accuracy · Step Efficiency · Loop / Stall Detection · Recovery from Errors · Mock Backend Tests · Deterministic Replay · Cost per Task · Latency per Task · Safety Violations · Human Escalation Rate · Failure Taxonomy
</details>

<details>
<summary><b>Evaluation Datasets</b></summary>

Golden Question Set · Start with 30-50 Cases · Real User Queries · Edge Cases · Adversarial Cases · Refusal Cases · Expected Output vs Rubric · Dataset Versioning · Splitting by Scenario · Avoiding Test Leakage · Growing the Set from Production · Labelling Guidelines · Reviewing Stale Cases
</details>

<details>
<summary><b>Regression Testing</b></summary>

Baseline Snapshot · Pass / Fail Thresholds · Blocking vs Warning Gates · Prompt Change Regression · Model Upgrade Regression · Retrieval Change Regression · Handling Non-Determinism · Repeat Runs & Averaging · Diffing Outputs · CI Integration · Test Runtime & Cost · Quarantining Flaky Cases · Reporting to the Team
</details>

<details>
<summary><b>Observability</b></summary>

Trace per Request · Span per Model Call · Span per Tool Call · Span per Retrieval · Prompt & Response Capture · Token Counts on Spans · Latency Breakdown · User & Session Attribution · Sampling Strategy · PII Scrubbing in Traces · Retention Policy · LangSmith / Langfuse / Phoenix · OpenTelemetry GenAI Conventions · From Trace to Eval Case
</details>

<details>
<summary><b>LLM Tracing</b></summary>

Trace ID Propagation · Nested Spans · Multi-Turn Session View · Agent Step Timeline · Tool Input / Output Capture · Retrieved Chunks Capture · Error & Retry Visibility · Cost per Trace · Searching Traces · Replaying a Trace · Linking Trace to Feedback · Debugging with Traces · Trace Storage Cost
</details>

<details>
<summary><b>Quality Monitoring</b></summary>

Online Quality Signals · Thumbs Up / Down Rate · Edit Rate ("Agent Edited") · Abandonment Rate · Escalation to Human Rate · Refusal Rate · Empty Retrieval Rate · Automated Judge on a Sample · Slice Monitoring (Tenant / Topic) · Quality Dashboards · Alerting on Quality Drop · Weekly Review Ritual · Feedback Clustering
</details>

<details>
<summary><b>Cost Monitoring</b></summary>

Tokens per Request · Cost per Request · Cost per User / Tenant · Cost per Feature · Daily Spend Tracking · Budget Alerts · Spend Anomaly Detection · Cache Hit Savings · Retry Cost Waste · Agent Loop Cost Explosions · Cost Attribution Tags · Monthly Spend Forecast · Enforcing Cost Guardrails
</details>

<details>
<summary><b>Guardrails</b></summary>

Input Validation · Output Validation · Topic Restriction · PII Detection & Masking · Toxicity Filters · Profanity & Brand Safety · Schema Enforcement · Grounding Check Before Send · Confidence-Based Refusal · Rate & Length Limits · Deny-Lists · Guardrail Latency Cost · Layered Defence · Guardrails Are Not a Full Fix
</details>

<details>
<summary><b>Prompt Injection</b></summary>

Direct Injection · "Ignore Previous Instructions" · Instruction vs Data Confusion · Delimiter Defence · System Prompt Hardening · Input Sanitization · Privilege Separation · Never Trust Model Output · Injection Test Suite · Detection Heuristics · Limiting the Blast Radius · Why There Is No Complete Fix
</details>

<details>
<summary><b>Indirect Prompt Injection</b></summary>

Malicious Content in Documents · Poisoned Web Pages · Injected Email / Ticket Content · Injection via Tool Results · Injection via RAG Chunks · Tagging Untrusted Sources · Sanitizing Before Context · Least-Privilege Tools · Human Approval for Sensitive Actions · Egress Restrictions · Detection & Alerting · Real Attack Scenarios
</details>

<details>
<summary><b>Data Exfiltration</b></summary>

Sensitive Data in Prompts · Model Repeating Secrets · Markdown Image Exfiltration · URL Parameter Exfiltration · Tool-Based Exfiltration · Cross-Tenant Leakage · Retrieval Permission Bypass · Logs & Traces as a Leak Path · Outbound Domain Allowlist · Output Scanning · DLP Integration · Zero Data Retention Settings
</details>

<details>
<summary><b>Tool Security</b></summary>

Least-Privilege Tool Scopes · Read vs Write Tools · Human Approval for Writes · Tool Allowlists per Agent · Parameter Validation · No Generic SQL / Shell Tool · Confused Deputy Problem · User Context Propagation · Rate Limiting Tools · Tool Output Size Limits · Tool Error Message Leakage · Audit Log per Tool Call · Tool Poisoning & Rug Pull
</details>

<details>
<summary><b>Red Teaming</b></summary>

Threat Modelling First · Attacker Personas · Prompt Injection Attempts · Jailbreak Attempts · Data Extraction Attempts · Permission Escalation Attempts · Tool Abuse Attempts · Automated Attack Suites · Manual Creative Testing · Severity Rating · Fix & Retest Loop · Red Team Suite in CI · External Red Team Engagement
</details>

<details>
<summary><b>Jailbreak Testing</b></summary>

Role-Play Jailbreaks · Encoding & Obfuscation · Multi-Turn Escalation · Hypothetical Framing · Language Switching · Token Smuggling · Refusal Consistency · Over-Refusal (False Positives) · Jailbreak Test Corpus · Attack Success Rate · Differences Across Model Versions · Patch via Prompt vs Guardrail
</details>

<details>
<summary><b>Privacy & PII</b></summary>

PII Categories · Detection (Regex vs Model) · Masking & Tokenization · Pseudonymization · Data Minimization · Purpose Limitation · Consent · Retention Limits · Right to Erasure · Deleting from the Vector Index · PII in Logs & Traces · Cross-Border Transfer · DPIA · Vendor Data Processing Terms
</details>

<details>
<summary><b>Data Governance</b></summary>

Data Classification · Data Ownership · Data Catalog · Lineage · Access Policies · Row & Column Level Security · Data Contracts · Quality Rules · Approved Data for AI · Training Data Provenance · Retention & Archival · Deletion Propagation · Governance Board · Audit Trails
</details>

<details>
<summary><b>Model Drift</b></summary>

Concept Drift · Data Drift · Prediction Drift · Provider Model Updates · Silent Behaviour Change · Detection with a Fixed Eval Set · Statistical Drift Tests · Alerting Thresholds · Pinning Model Versions · Re-Baselining · Retraining Triggers · Prompt Drift vs Model Drift · Communicating Drift to Customers
</details>

<details>
<summary><b>Embedding Drift</b></summary>

Embedding Model Version Change · Mixed-Version Index Corruption · Full Re-Embedding Cost · Query / Document Model Mismatch · Domain Vocabulary Shift · Recall Degradation Over Time · Monitoring Recall@k on a Golden Set · Index Version Pinning · Blue-Green Index Swap · Backfill Strategy · Detecting Stale Chunks
</details>

<details>
<summary><b>AI Incident Response</b></summary>

What Counts as an AI Incident · Severity Classification · Detection Sources · Kill Switch · Disabling a Tool or Agent · Rolling Back a Prompt / Model · Containing Data Exposure · Preserving Traces as Evidence · Customer Notification · Regulator Notification · Root Cause Analysis · Adding a Regression Test · Postmortem & Prevention
</details>

<details>
<summary><b>AI Supply Chain</b></summary>

Model Provenance · Hugging Face Model Trust · Malicious Weights (Pickle) · Dataset Poisoning · Third-Party Prompt Libraries · MCP Server Trust · Agent Framework Dependencies · Package Typosquatting · SBOM · Model Cards & Licences · Vendor Security Review · Pinning Versions · Internal Mirror / Registry
</details>

<details>
<summary><b>Dependency Security</b></summary>

CVE Scanning · Lockfiles · Pinning Versions · Automated Update PRs · Transitive Dependencies · License Compliance · Container Image Scanning · Base Image Updates · Supply Chain Attacks · Minimal Dependencies Principle · Private Package Registry · Patch SLA · Signed Artifacts
</details>

<details>
<summary><b>Secrets Security</b></summary>

No Secrets in Code or Prompts · Secret Store Usage · Short-Lived Credentials · Rotation Policy · Scoped Keys per Service · Detecting Leaked Keys · Revocation Playbook · Secrets in CI/CD · Secrets in Container Images · Secrets in Logs · Customer Credential Handling · Key Encryption (KMS) · Break-Glass Access
</details>

<details>
<summary><b>Identity Security</b></summary>

Authentication vs Authorization · MFA · SSO & Federation · Service Accounts · Machine-to-Machine Auth · Token Lifetimes · Refresh Token Handling · JWT Verification Mistakes · Scope Design · On-Behalf-Of Flow · Agent Identity · Propagating User Identity to Tools · Session Management · Privileged Access Review
</details>

<details>
<summary><b>Network Security</b></summary>

TLS Everywhere · Certificate Validation · Private Endpoints · VPC Peering & PrivateLink · Egress Allowlisting · Firewall Rules · Zero Trust Networking · Service Mesh mTLS · WAF · DDoS Protection · IP Allowlisting · Bastion / Jump Host · No Public Database · Controlling Agent Outbound Calls
</details>

<details>
<summary><b>Compliance</b></summary>

SOC 2 · ISO 27001 · GDPR · DPDP Act · HIPAA · PCI DSS · EU AI Act Risk Tiers · Automated Decisions (GDPR Art. 22) · Data Residency · Audit Evidence Collection · Control Mapping · Policy Documentation · Security Questionnaires · Continuous Compliance
</details>

<details>
<summary><b>Responsible AI</b></summary>

Fairness & Bias Testing · Representational Harm · Transparency to Users · Disclosing That It Is AI · Explainability · Human Oversight · Contestability & Appeal · Accessibility · Environmental Cost · Acceptable Use Policy · Model Cards · Ethics Review · Documented Limitations
</details>

<details>
<summary><b>Release Governance</b></summary>

Change Approval · Who Can Deploy a Prompt · Model Version Approval · Eval Sign-Off Criteria · Security Review Gate · Documented Risk Acceptance · Staged Rollout Policy · Rollback Authority · Release Notes for AI Changes · Audit Trail of Changes · Emergency Change Process · Communicating Changes to Customers
</details>

<details>
<summary><b>AI Security Testing</b></summary>

Threat Model per Feature · Automated Injection Suite · Jailbreak Suite · Permission Bypass Tests · Cross-Tenant Isolation Tests · Tool Abuse Tests · XSS from LLM Output · Denial-of-Wallet Tests · Fuzzing Tool Inputs · Security Tests in CI · Severity & Fix SLA · Pen Test Scope for AI · Retesting After Fixes
</details>

---

