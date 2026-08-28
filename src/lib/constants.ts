import { CaseStudy, ArchiveItem, SearchItem, FunResponse, ExperienceEntry } from '@/types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    number: 'Casestudy 01',
    title: 'Monocle',
    subtitle: 'AI-Powered GitHub Intelligence & Codebase RAG',
    tasks: ['Next.js 16', 'TypeScript', 'pgvector', 'BullMQ', 'Gemini 2.5 Flash', 'tRPC'],
    slug: 'monocle',
    baseImage: '/images/projects/monocle-cover.jpg',
    hoverImage: '/images/projects/ledgercore-cover.jpg',
    domain: 'Applied AI & Developer Tools',
    year: '2026',
    headline: 'Semantically index repositories & chat with codebases',
    headlineAccent: 'with zero-waste streaming RAG.',
    overview:
      'Monocle transforms GitHub repositories into conversational, live-indexed knowledge engines. Powered by a custom zero-waste RAG pipeline, Neon Serverless Postgres with pgvector, and Google Gemini 2.5 Flash, developers can query complex multi-file architectures with sub-second streamed answers, exact line numbers, and verified file citations.',
    capabilities: [
      {
        title: 'Zero-Waste RAG Pipeline',
        body: 'Extracts AST and code chunks, directly embedding them with gemini-embedding-001 (768-dim vectors) into Neon pgvector, consuming zero text-generation quota during repository indexing.',
      },
      {
        title: 'Sub-Second Streaming Code Chat',
        body: 'Delivers rapid Time-To-First-Token via @ai-sdk/google and Vercel AI SDK, injecting global repository file tree maps alongside vector matches for full architectural context.',
      },
      {
        title: 'Decoupled Background Ingestion',
        body: 'BullMQ job dispatcher over Upstash Redis deduplicates concurrent indexing requests using deterministic job IDs (repo-index-${projectId}) with exponential backoff.',
      },
      {
        title: 'Automated Commit Diff Tracking',
        body: 'Polls real-time commit diffs via Octokit REST with semantic heuristic fallbacks and dynamic contextual questions tailored uniquely to the codebase.',
      },
      {
        title: 'Live Idempotent Credit System',
        body: 'Stripe webhook-verified credit allocations with real-time balance synchronization across topbar, sidebar, and dashboard metric grids via tRPC cache invalidation.',
      },
    ],
    stack: [
      { name: 'Next.js 16 App Router', role: 'Turbopack & UI Shell' },
      { name: 'Neon Serverless Postgres', role: 'pgvector Hybrid Search' },
      { name: 'Google Gemini 2.5 Flash', role: 'Streaming Inference' },
      { name: 'BullMQ + Upstash Redis', role: 'Async Queue Dispatcher' },
      { name: 'tRPC v11', role: 'End-to-End Type Safety' },
      { name: 'Clerk & Stripe', role: 'Auth & Credit Billing' },
    ],
    metrics: [
      { value: '768-dim', label: 'Vector Embeddings' },
      { value: '<800ms', label: 'Time-To-First-Token' },
      { value: '0 Quota', label: 'Ingest Gen Burn' },
      { value: '100%', label: 'Type-Safe RPC Boundaries' },
    ],
    decisions: [
      {
        title: 'Direct AST embedding over LLM-based chunk summarization',
        body: 'Embedding raw AST chunks directly saves API generation quota and eliminates summarization hallucinations during repository ingestion.',
      },
      {
        title: 'BullMQ queue decoupling over synchronous API handlers',
        body: 'Large repository ingestion spans minutes; decoupling work to asynchronous background queues avoids serverless gateway timeouts.',
      },
    ],
    repoUrl: 'https://github.com/Sajal-kanwal/monocle',
    liveUrl: 'https://monocle-ai.vercel.app/',
    aliases: ['repo-lens'],
  },
  {
    number: 'Casestudy 02',
    title: 'Solidius',
    subtitle: 'Double-Entry Ledger & Wallet Engine',
    tasks: ['NestJS', 'PostgreSQL 18', 'Prisma', 'TypeScript', 'Outbox Workers'],
    slug: 'solidius',
    baseImage: '/images/projects/ledgercore-cover.jpg',
    hoverImage: '/images/projects/loom-cover.jpg',
    domain: 'Distributed Backend Systems',
    year: '2026',
    headline: 'Money that can never be',
    headlineAccent: 'silently lost or double-spent.',
    overview:
      'Solidius (LedgerCore) is a high-throughput, production-grade ledger and wallet engine built on immutable double-entry accounting. Balances are derived strictly from INSERT-only journal entries, transfers acquire row locks in deterministic order to eliminate deadlocks under concurrency, and mutating endpoints are protected with cryptographic distributed idempotency.',
    capabilities: [
      {
        title: 'Immutable Double-Entry Core',
        body: 'Balances are never updated in place. Every monetary movement writes paired debit and credit entries, enforcing sum(debits) == sum(credits) per currency in the same atomic transaction.',
      },
      {
        title: 'Deadlock-Free Concurrency',
        body: 'Transfers sort target account rows by UUID before SELECT ... FOR UPDATE, guaranteeing all concurrent workers acquire locks in identical order to eliminate deadlock cycles.',
      },
      {
        title: 'Distributed Idempotency',
        body: 'Every write requires an idempotency key bound to a SHA-256 fingerprint of the request payload, safely returning cached responses on retry and rejecting mismatched duplicates.',
      },
      {
        title: 'Transactional Outbox & Signed Webhooks',
        body: 'Domain events commit atomically with ledger writes and are dispatched by FOR UPDATE SKIP LOCKED background workers with HMAC-SHA256 signatures and 5-minute replay windows.',
      },
      {
        title: 'Continuous Reconciliation Auditing',
        body: 'A scheduled worker runs 6 mathematical invariant checks across the ledger and records findings by severity to guarantee long-term data integrity.',
      },
    ],
    stack: [
      { name: 'NestJS', role: 'Modular Enterprise API' },
      { name: 'PostgreSQL 18', role: 'Ledger of Record' },
      { name: 'Prisma', role: 'Typed Data Access' },
      { name: 'Argon2id', role: 'Credential Security' },
      { name: 'Outbox Workers', role: 'Reliable Event Sourcing' },
      { name: 'HMAC-SHA256', role: 'Signed Webhook Delivery' },
    ],
    metrics: [
      { value: '13', label: 'Normalised Tables' },
      { value: 'Insert-Only', label: 'Journal Entries' },
      { value: '6', label: 'Reconciliation Checks' },
      { value: '4', label: 'RBAC Roles' },
    ],
    decisions: [
      {
        title: 'Pessimistic locks over optimistic retries',
        body: 'Transfers are short, contended, and must not fail spuriously. Sorted SELECT ... FOR UPDATE gives a bounded wait under load instead of a retry storm that degrades as traffic grows.',
      },
      {
        title: 'Derived balances over mutable totals',
        body: 'A mutable balance column is faster to read and impossible to audit. Projecting balances from entries keeps the journal as the single source of truth.',
      },
    ],
    repoUrl: 'https://github.com/Sajal-kanwal/Solidius',
    liveUrl: 'https://solidius.onrender.com/api/docs',
    aliases: ['ledgercore'],
  },
  {
    number: 'Casestudy 03',
    title: 'Loom',
    subtitle: 'Grounded RAG Over SEC Filings',
    tasks: ['FastAPI', 'React 19', 'Supabase pgvector', 'Pydantic AI', 'OpenAI'],
    slug: 'loom',
    baseImage: '/images/projects/loom-cover.jpg',
    hoverImage: '/images/projects/monocle-cover.jpg',
    domain: 'Applied AI & Financial Intelligence',
    year: '2026',
    headline: 'An answer an equity analyst can',
    headlineAccent: 'defend, line by line.',
    overview:
      'Loom is an internal research assistant for an equity research firm whose core product is accuracy. It answers complex questions about a curated corpus of 10-K filings and binds every factual claim to a retrieved passage with filing, page, and excerpt, backed by hybrid search and fail-closed grounding validation.',
    capabilities: [
      {
        title: 'Hybrid Retrieval With Rank Fusion',
        body: 'Dense pgvector search and Postgres full-text search run as dual bounded queries, fused in Python via Reciprocal Rank Fusion (RRF at k=60) for lexical precision and semantic recall.',
      },
      {
        title: 'Structure-Aware Chunking',
        body: 'Passages are cut at 512 tokens with 12% overlap, keeping financial tables atomic up to 1500 tokens with ±1 neighbor context stitching so numbers never lose their headers.',
      },
      {
        title: 'Fail-Closed Grounding',
        body: 'A two-phase validator confirms citations map to passages retrieved for that request, with an LLM-as-a-judge pass behind it. Unsupported answers trigger explicit errors rather than hallucinations.',
      },
      {
        title: 'Typed Agent Boundary',
        body: 'Pydantic AI drives generation with explicit dependencies and typed grounded-answer schemas, keeping retrieval and validation testable without invoking live models.',
      },
      {
        title: 'Streamed Retrieval Stages',
        body: 'Answers stream to the React 19 UI over SSE in the AI SDK part format, surfacing real-time retrieval progress and citations while text is generated.',
      },
    ],
    stack: [
      { name: 'FastAPI', role: 'Turn Orchestration' },
      { name: 'React 19', role: 'Chat Surface' },
      { name: 'Supabase pgvector', role: 'Hybrid HNSW + GIN Index' },
      { name: 'Pydantic AI', role: 'Typed Agent Framework' },
      { name: 'OpenAI GPT-4o', role: 'Generation & Embeddings' },
      { name: 'Alembic', role: 'Schema Migrations' },
    ],
    metrics: [
      { value: '5', label: 'Issuers Indexed' },
      { value: '2021–2025', label: 'Fiscal Years' },
      { value: 'k=60', label: 'RRF Fusion Constant' },
      { value: '1500 Tok', label: 'Table Chunk Ceiling' },
    ],
    decisions: [
      {
        title: 'Hybrid over pure vector search',
        body: 'Filings turn on exact tokens — segment names, statute references, and line items. Combining lexical search with vector retrieval ensures precise matching.',
      },
      {
        title: 'Fail closed over best effort',
        body: 'In equity research, a confident wrong answer costs more than an explicit refusal. Validation failure surfaces as a clean system error.',
      },
    ],
    repoUrl: 'https://github.com/Sajal-kanwal/loom',
    liveUrl: 'https://loomquill.vercel.app/',
  },
  {
    number: 'Casestudy 04',
    title: 'Spendora',
    subtitle: 'Real-Time Financial Telemetry & Expense Intelligence',
    tasks: ['Next.js 15', 'PostgreSQL', 'Prisma', 'Clerk', 'Zod', 'Recharts'],
    slug: 'spendora',
    baseImage: '/images/projects/spendora-cover.jpg',
    hoverImage: '/images/projects/monocle-cover.jpg',
    domain: 'Full-Stack FinTech',
    year: '2025',
    headline: 'Illuminating financial habits with',
    headlineAccent: 'real-time telemetry and predictive forecasting.',
    overview:
      'Spendora is a full-stack personal finance and telemetry platform with real-time transaction tracking, interactive Recharts analytics, pre-aggregated history tables for O(1) chart lookups, and end-to-end type safety from PostgreSQL through Prisma and Zod runtime validation.',
    capabilities: [
      {
        title: 'Zero-Client-Bundle Data Layer',
        body: 'Architected with Next.js Server Components and React Suspense boundaries, improving First Contentful Paint by 40% (1.2s to 0.72s) on cold loads.',
      },
      {
        title: 'Pre-Aggregated History Tables',
        body: 'Engineered MonthHistory and YearHistory rollups that turn expensive dynamic aggregations into instantaneous O(1) lookup queries for charts.',
      },
      {
        title: 'Atomic Transactional Writes',
        body: 'Executes category updates and journal entries within prisma.$transaction blocks to guarantee complete ACID consistency across all records.',
      },
      {
        title: 'End-to-End Type Safety',
        body: 'Schema-first type inference connecting PostgreSQL schemas to Prisma models and Zod runtime validation at API and form boundaries.',
      },
      {
        title: 'Composite Query Indexing',
        body: 'Eliminated full-table scans by indexing (user_id, date, category), driving p95 query latency under 200ms for a 4× throughput improvement.',
      },
    ],
    stack: [
      { name: 'Next.js 15 App Router', role: 'Full-Stack Framework' },
      { name: 'PostgreSQL', role: 'ACID Relational Core' },
      { name: 'Prisma ORM', role: 'Type-Safe Data Layer' },
      { name: 'Clerk', role: 'JWT Authentication' },
      { name: 'Zod & React Hook Form', role: 'Runtime Validation' },
      { name: 'Recharts & Tailwind CSS', role: 'Interactive Visuals' },
    ],
    metrics: [
      { value: 'O(1)', label: 'History Chart Lookups' },
      { value: '<200ms', label: 'p95 Query Latency' },
      { value: '40%', label: 'FCP Improvement' },
      { value: '100%', label: 'Type Safety Coverage' },
    ],
    decisions: [
      {
        title: 'Pre-aggregated history tables over runtime SUM queries',
        body: 'Calculating monthly and yearly totals on every dashboard load scales poorly. Pre-aggregating at write time guarantees instant chart rendering.',
      },
      {
        title: 'Server Actions with Zod validation',
        body: 'Handling mutations via Server Actions eliminates client API boilerplate while enforcing strict server-side authorization and validation.',
      },
    ],
    repoUrl: 'https://github.com/Sajal-kanwal/Spendora',
    liveUrl: 'https://spendora-vue.vercel.app/',
  },
  {
    number: 'Casestudy 05',
    title: 'Flux',
    subtitle: 'Shanghai Metro Passenger Mobility Intelligence',
    tasks: ['Python', 'Pandas', 'SciPy.stats', 'NumPy', 'Tableau'],
    slug: 'flux',
    baseImage: '/images/projects/shanghai-cover.jpg',
    hoverImage: '/images/projects/vendor-cover.jpg',
    domain: 'Data Science & Mobility Intelligence',
    year: '2025',
    headline: 'Decoding urban transit dynamics with',
    headlineAccent: 'rigorous statistical distributions.',
    overview:
      'Flux is an exploratory data analysis and inferential statistics pipeline processing over 3.6 million passenger transaction records from the Shanghai Metro merged with localized weather data. Proves Poisson arrival failure, fits Negative Binomial overdispersion, and validates the Central Limit Theorem via Monte Carlo simulations.',
    capabilities: [
      {
        title: 'Overdispersion Testing & Distribution Fitting',
        body: 'Calculated a dispersion ratio of ~388.7 (variance/mean), formally rejecting the Poisson process via Kolmogorov-Smirnov test and fitting a Negative Binomial model to prevent underestimating peak overcrowding.',
      },
      {
        title: 'Empirical Central Limit Theorem Simulation',
        body: 'Designed Monte Carlo sampling simulations (n=100) demonstrating convergence of highly skewed passenger distributions into Gaussian normal curves (Jarque-Bera p > 0.05).',
      },
      {
        title: 'Weather Impact Sensitivity Modeling',
        body: 'Quantified meteorological effects, proving rain heavily depresses discretionary leisure travel (NHBinFlow) while non-discretionary commuter flow (CinFlow) remains rigid.',
      },
      {
        title: 'Spatiotemporal Mobility Signatures',
        body: 'Identified distinct weekday dual-peak "M" commuter profiles (7–9 AM, 5–7 PM) versus weekend single-peak bell curves across 16 metro lines and critical transfer hubs.',
      },
      {
        title: 'Operational Strategy & Policy Engineering',
        body: 'Translated statistical confidence intervals into transit policies, including gap-train insertions at residential bottlenecks and weather-contingent staff redeployment.',
      },
    ],
    stack: [
      { name: 'Python & Pandas', role: 'Vectorized Data Processing' },
      { name: 'SciPy.stats', role: 'Distribution Fitting & Tests' },
      { name: 'NumPy', role: 'Monte Carlo Simulation' },
      { name: 'Matplotlib & Seaborn', role: 'Diagnostic Visualizations' },
      { name: 'Tableau', role: 'Interactive Transit Dashboards' },
    ],
    metrics: [
      { value: '3.6M+', label: 'Passenger Flow Records' },
      { value: '388.7', label: 'Variance-to-Mean Ratio' },
      { value: '95% CI', label: '[6.01M, 6.45M] Daily Flow' },
      { value: '16', label: 'Metro Lines Modeled' },
    ],
    decisions: [
      {
        title: 'Negative Binomial over Poisson distribution',
        body: 'The extreme overdispersion (variance 400x mean) causes standard Poisson models to drastically underestimate peak crowd risks.',
      },
      {
        title: 'In-memory vectorized Python over distributed Spark',
        body: 'Processing 3.6 million rows in-memory via Pandas avoids cluster serialization overhead and executes statistical tests in seconds.',
      },
    ],
    repoUrl: 'https://github.com/Sajal-kanwal/flux',
    aliases: ['shanghai-metro', 'shanghai'],
  },
  {
    number: 'Casestudy 06',
    title: 'Airbnb Snowflake & dbt Pipeline',
    subtitle: 'Cloud-Native Medallion Data Engineering Pipeline',
    tasks: ['Snowflake', 'dbt Core', 'AWS S3', 'SQL', 'Jinja', 'SCD Type 2'],
    slug: 'airbnb-snowflake-dbt',
    baseImage: '/images/projects/airbnb-cover.jpg',
    hoverImage: '/images/projects/warehouse-cover.jpg',
    domain: 'Cloud Data Engineering',
    year: '2025',
    headline: 'Enterprise cloud analytics transforming',
    headlineAccent: 'raw rental transactions into Gold reporting.',
    overview:
      'Production-grade cloud data engineering pipeline implementing a Medallion Architecture (Bronze to Silver to Gold) on Snowflake and dbt Core. Ingests raw Airbnb booking, listing, and host data via AWS S3 stages with automated SCD Type 2 historization snapshots and Jinja-driven incremental models.',
    capabilities: [
      {
        title: 'Medallion Architecture on Snowflake',
        body: 'Structured Bronze (raw external stage), Silver (cleansed, standardized, typed), and Gold (dimensional Star Schema marts) isolation within Snowflake.',
      },
      {
        title: 'SCD Type 2 Historization Snapshots',
        body: 'Implemented dbt snapshot pipelines tracking historical state changes in Superhost status and listing prices over time without state loss.',
      },
      {
        title: 'Cost-Optimized Incremental Models',
        body: 'Engineered dbt incremental models processing only new or updated records (is_incremental()), slashing warehouse compute costs.',
      },
      {
        title: 'Dynamic Jinja Meta-Programming',
        body: 'Constructed reusable SQL generation macros and config blocks, drastically reducing boilerplate code across transformation models.',
      },
      {
        title: 'Automated Data Quality Assertions',
        body: 'Integrated comprehensive dbt schema tests, uniqueness assertions, not-null constraints, and referential integrity validations.',
      },
    ],
    stack: [
      { name: 'Snowflake', role: 'Decoupled Cloud Warehouse' },
      { name: 'dbt Core', role: 'Transformation & Lifecycle' },
      { name: 'AWS S3', role: 'Data Lake Staging' },
      { name: 'Jinja Macros', role: 'Dynamic SQL Generation' },
      { name: 'dbt Snapshots', role: 'SCD Type 2 Historization' },
    ],
    metrics: [
      { value: '3-Tier', label: 'Medallion Architecture' },
      { value: 'SCD Type 2', label: 'Historical Snapshots' },
      { value: 'Zero Loss', label: 'Attribute State Tracking' },
      { value: '100%', label: 'Automated Test Coverage' },
    ],
    decisions: [
      {
        title: 'Decoupled Snowflake compute and AWS S3 storage',
        body: 'Independent scaling allows inexpensive long-term raw data staging in S3 while scaling warehouse compute only during transformation runs.',
      },
      {
        title: 'ELT architecture over legacy ETL',
        body: 'Loading raw data into Snowflake stages preserves original fidelity and enables rapid SQL-based transformation iteration in dbt.',
      },
    ],
    repoUrl: 'https://github.com/Sajal-kanwal/airbnb-snowflake-dbt',
  },
  {
    number: 'Casestudy 07',
    title: 'SQL Data Warehouse & BI Analytics',
    subtitle: 'Enterprise Medallion Warehouse & BI Star Schema',
    tasks: ['SQL Server', 'PostgreSQL', 'Kimball Star Schema', 'SCD Type 2', 'T-SQL'],
    slug: 'sql-data-warehouse-analytics-project',
    baseImage: '/images/projects/warehouse-cover.jpg',
    hoverImage: '/images/projects/airbnb-cover.jpg',
    domain: 'Data Warehousing & Business Intelligence',
    year: '2025',
    headline: 'Reconciling ERP & CRM data silos into',
    headlineAccent: 'a single, high-performance Star Schema.',
    overview:
      'End-to-end data warehouse engineering project integrating siloed CRM and ERP source systems into an optimized Kimball dimensional star schema. Implements Medallion staging, automated data quality cleansing, SCD Type 2 dimension historization, and complex analytical CTE reporting.',
    capabilities: [
      {
        title: 'Master Data Integration (CRM + ERP)',
        body: 'Reconciled disparate customer demographics, product catalogs, and transaction records across siloed enterprise business systems.',
      },
      {
        title: 'Data Quality & Cleansing Automation',
        body: 'Resolved duplicate customer records, out-of-bounds dates, compound SKU key prefixes, and formatting inconsistencies using advanced T-SQL.',
      },
      {
        title: 'Kimball Dimensional Modeling',
        body: 'Constructed a high-performance Gold Star Schema with central fact tables and denormalized dimension tables for rapid BI aggregation.',
      },
      {
        title: 'SCD Type 2 Analytical Historization',
        body: 'Dynamically generated dimension validity windows (start_date, end_date) using SQL window functions (LEAD/LAG) to track attribute drift.',
      },
      {
        title: 'Advanced BI Reporting Queries',
        body: 'Authored multi-CTE queries calculating Customer Lifetime Value (CLV), RFM customer segmentation cohorts, and product margin analyses.',
      },
    ],
    stack: [
      { name: 'Transact-SQL / PostgreSQL', role: 'Relational Warehouse Core' },
      { name: 'Kimball Modeling', role: 'Star Schema & Dimensions' },
      { name: 'Medallion Architecture', role: 'Bronze, Silver, Gold' },
      { name: 'Advanced CTEs', role: 'Analytical BI Marts' },
      { name: 'BULK INSERT Engine', role: 'High-Throughput Ingestion' },
    ],
    metrics: [
      { value: '2 Silos', label: 'CRM & ERP Unified' },
      { value: '100%', label: 'Duplicate Removal' },
      { value: 'Star Schema', label: 'Gold Reporting Layer' },
      { value: 'SCD Type 2', label: 'Dimension Historization' },
    ],
    decisions: [
      {
        title: 'Star schema over normalized 3NF for reporting marts',
        body: 'Denormalized dimensions eliminate complex multi-table joins and significantly accelerate analytical dashboard queries.',
      },
      {
        title: 'Database-generated surrogate keys',
        body: 'Surrogate keys decouple the warehouse from source ERP/CRM identifier changes, ensuring durable analytical integrity.',
      },
    ],
    repoUrl: 'https://github.com/Sajal-kanwal/sql-data-warehouse-analytics-project',
  },
  {
    number: 'Casestudy 08',
    title: 'Vendor Performance Analysis',
    subtitle: 'Supply Chain Telemetry & ML Feature Store',
    tasks: ['Python', 'SQL', 'Pandas', 'Scikit-Learn', 'Feature Engineering', 'ETL'],
    slug: 'vendor-performance-analysis',
    baseImage: '/images/projects/vendor-cover.jpg',
    hoverImage: '/images/projects/shanghai-cover.jpg',
    domain: 'Supply Chain & Machine Learning',
    year: '2025',
    headline: 'Unifying 15.6 million retail transactions into',
    headlineAccent: 'actionable vendor intelligence and ML features.',
    overview:
      'End-to-end data pipeline and analytics platform processing 15.6M+ transaction rows across 6 retail operational databases. Generates vendor financial telemetry, inventory turnover metrics, and an ML-ready feature store with 17+ engineered attributes for predictive modeling.',
    capabilities: [
      {
        title: 'High-Throughput Multi-Table ETL',
        body: 'Unified 15.6 million rows across 6 tables (sales, purchases, pricing catalogs, inventory snapshots, and vendor freight invoices).',
      },
      {
        title: 'Vendor Financial Telemetry',
        body: 'Synthesized vendor performance across gross margins, freight-to-cost ratios, stock-to-sales velocity, and return on inventory.',
      },
      {
        title: 'ML Feature Store Engineering',
        body: 'Engineered 17+ predictive features including lead time variance, pricing power, and inventory turnover ready for Scikit-Learn pipelines.',
      },
      {
        title: 'Automated Data Quality Framework',
        body: 'Multi-stage validation asserting schema constraints, foreign key coherence, and outlier detection with automated JSON quality reports.',
      },
      {
        title: 'Memory & Performance Optimization',
        body: 'Chunked data loading and vectorized Pandas/SQL operations avoiding memory bottlenecks across multi-gigabyte transaction datasets.',
      },
    ],
    stack: [
      { name: 'Python & Pandas', role: 'Vectorized ETL Pipeline' },
      { name: 'SQL & PostgreSQL', role: 'Analytical Aggregations' },
      { name: 'Scikit-Learn', role: 'ML Feature Engineering' },
      { name: 'Data Quality Engine', role: 'Schema & Outlier Auditing' },
      { name: 'Telemetry Subsystem', role: 'Pipeline Execution Logging' },
    ],
    metrics: [
      { value: '15.6M+', label: 'Transaction Rows Ingested' },
      { value: '6 Tables', label: 'Operational Sources Unified' },
      { value: '17+', label: 'Engineered ML Features' },
      { value: '1.6 GB', label: 'Raw CSV Datasets' },
    ],
    decisions: [
      {
        title: 'Pre-aggregating vendor summaries vs on-demand queries',
        body: 'Pre-computing vendor metrics during ETL dramatically cuts dashboard response times and provides a structured feature store for ML.',
      },
      {
        title: 'Formal data quality verification step',
        body: 'Preventing corrupted or out-of-range purchase data from polluting downstream financial calculations and ML training sets.',
      },
    ],
    repoUrl: 'https://github.com/Sajal-kanwal/Vendor-Performance-Analysis',
    aliases: ['vantage'],
  },
];

// Archive items replaced by Skills Section
export const ARCHIVE_ITEMS: ArchiveItem[] = [];

export const SEARCH_ITEMS: SearchItem[] = [
  { label: 'Home', keywords: ['home', 'landing', 'main'], url: '/' },
  { label: 'About', keywords: ['about', 'about me', 'bio', 'skills', 'education'], url: '/about' },
  { label: 'Contact', keywords: ['contact', 'email', 'get in touch', 'reach out'], url: '/contact' },
  { label: 'Monocle', keywords: ['monocle', 'github', 'repo', 'ai', 'rag', 'gemini', 'chat', 'codebase'], url: '/monocle' },
  { label: 'Solidius', keywords: ['solidius', 'ledgercore', 'ledger', 'wallet', 'double entry', 'fintech', 'nestjs'], url: '/solidius' },
  { label: 'Loom', keywords: ['loom', 'sec', '10-k', 'rag', 'grounding', 'financial', 'pydantic', 'fastapi'], url: '/loom' },
  { label: 'Spendora', keywords: ['spendora', 'finance', 'telemetry', 'expense', 'dashboard', 'recharts', 'prisma'], url: '/spendora' },
  { label: 'Flux', keywords: ['flux', 'shanghai', 'metro', 'transit', 'statistics', 'clt', 'eda', 'mobility'], url: '/flux' },
  { label: 'Airbnb Snowflake dbt', keywords: ['airbnb', 'snowflake', 'dbt', 'data engineering', 'medallion', 'scd', 's3', 'pipeline'], url: '/airbnb-snowflake-dbt' },
  { label: 'SQL Data Warehouse Analytics', keywords: ['sql', 'warehouse', 'star schema', 'kimball', 'bi', 'analytics', 'etl', 'medallion'], url: '/sql-data-warehouse-analytics-project' },
  { label: 'Vendor Performance Analysis', keywords: ['vendor', 'performance', 'vantage', 'supply chain', 'ml', 'feature store', 'retail'], url: '/vendor-performance-analysis' },
];

export const FUN_RESPONSES: FunResponse[] = [
  { triggers: ['hello', 'hi', 'hey'], message: ['Hi there 👋 Search anything!'] },
  { triggers: ['howdy'], message: ['Howdy 🤠'] },
  { triggers: ['good morning', 'morning'], message: ['Good morning ☀️'] },
  { triggers: ['good afternoon', 'afternoon', 'lunch'], message: ['Good afternoon. Time flies!'] },
  { triggers: ['good evening', 'evening', 'night', 'dinner', 'good night'], message: ['Late night browsing? 🌙'] },
  { triggers: ['sleep', 'go to bed'], message: ['Go to bed too! 😴'] },
  { triggers: ['sydney', 'sajal', 'sajal kanwal', 'kanwal'], message: ["Yes, Sajal is here. He's busy engineering systems 💻"] },
  { triggers: ['who made this'], message: ['Guess who! 😎 Sajal Kanwal built this.'] },
  { triggers: ['who are you'], message: ["I'm Sajal's portfolio assistant! 🚀"] },
  { triggers: ['are you human'], message: ['Depends on how you define human 🤔'] },
  { triggers: ['what are you hiding'], message: ['Shh… check out Monocle or Solidius 🤫'] },
  { triggers: ['secret'], message: ["Tell me yours first, then I'll tell you 😏"] },
  { triggers: ['what do you do', 'job'], message: ["I guide you through Sajal's AI & data engineering projects 💃"] },
  { triggers: ['cool', 'nice', 'awesome', 'amazing', 'fabulous', 'sick'], message: ['You think so? Thanks!'] },
  { triggers: ['wow', 'whoa', 'woah', 'ooo'], message: ['I take it as a compliment!'] },
  { triggers: ['meow', 'miaow', 'purr', 'cat', 'kitty'], message: ['Purrrr 🐈‍⬛🐾'] },
  { triggers: ['bark', 'dog', 'puppy', 'woof'], message: ['Woof Woof 🐕 🐾'] },
  { triggers: ['shit'], message: ['🫢😧'] },
  { triggers: ['pretty', 'beautiful'], message: ['Thank you 🫶'] },
  { triggers: ['bestie', 'friend', 'friends'], message: ['🫵🤝'] },
  { triggers: ['coffee', 'expresso'], message: ['Go tell Sajal your favourite coffee shop ☕️'] },
  { triggers: ['starbucks'], message: ['Yes, my favourite ☕✨'] },
  { triggers: ['tim hortons', 'tims'], message: ['Iced capp with croissant for all seasons 🥐'] },
  { triggers: ['happy new year', 'new year', '2026'], message: ['Happy New Year! 🎉'] },
  { triggers: ['2025'], message: ['Hope your 2025 was amazing! 💫'] },
  { triggers: ['merry christmas', 'christmas'], message: ['Merry Christmas! 🎄🎅'] },
  { triggers: ['portfolio', 'website'], message: ["You're already here! Enjoy exploring!"] },
  { triggers: ['project', 'work', 'casestudy', 'case study'], message: ["Sajal's flagship projects are Monocle, Solidius, Loom, and Airbnb Snowflake Pipeline ✨"] },
  { triggers: ['help'], message: ['Try searching for home, about, or project names (e.g. Monocle, Solidius, Loom, Snowflake, Spendora).'] },
  { triggers: ['yes'], message: ['😏'] },
  { triggers: ['no'], message: ['😏'] },
  { triggers: ['okay'], message: ['👌'] },
  { triggers: ['what'], message: ['Need help?'] },
  { triggers: ['you'], message: ['Yes, you 🫵'] },
  { triggers: ['?'], message: ['Fingers crossed 🤞'] },
  { triggers: ['!'], message: ['‼️🫢'] },
  { triggers: ['.'], message: ['Yes, period.'] },
  { triggers: ['email'], message: ['Contact me via sajal.kanwal02@gmail.com!'] },
  { triggers: ['linkedin', 'li'], message: ['Find me @sajal-kanwal on LinkedIn!'] },
  { triggers: ['instagram', 'ins'], message: ['Find me @sajal-kanwal on GitHub!'] },
];

export const EXPERIENCES: ExperienceEntry[] = [
  {
    title: 'Top 10 - AWS College Hackathon',
    type: 'Hackathon',
    dates: '2025 Jan',
    company: 'Hack The Future',
    location: 'Remote',
    logoSrc: '/images/profile/man.png',
  },
  {
    title: 'Top 50 - Hack the Future',
    type: 'Hackathon',
    dates: '2025 Apr',
    company: 'GeeksforGeeks',
    location: 'Remote',
    logoSrc: '/images/profile/man.png',
  },
  {
    title: 'B.Tech CSE (DS & ML)',
    type: 'Student',
    dates: '2023 Aug–Present',
    company: 'Lovely Professional University',
    location: 'Phagwara, Punjab',
    logoSrc: '/images/profile/man.png',
  },
];

export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/in/sajal-kanwal',
  github: 'https://github.com/Sajal-kanwal',
  instagram: 'https://www.instagram.com/anytng.sajal',
  email: 'mailto:sajal.kanwal02@gmail.com',
  calendly: 'mailto:sajal.kanwal02@gmail.com',
};

