<div align="center">

# ☕ Monocle — AI-Powered GitHub Intelligence

**Semantically index repositories, track real-time commit diffs, and chat with your codebase using zero-waste RAG.**

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-pgvector-336791?logo=postgresql)](https://neon.tech/)
[![Redis](https://img.shields.io/badge/Redis-Upstash-DC382D?logo=redis)](https://upstash.com/)
[![Google Gemini](https://img.shields.io/badge/Google_AI-Gemini_2.5_Flash-4285F4?logo=google)](https://ai.google.dev/)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?logo=clerk)](https://clerk.com/)
[![Stripe](https://img.shields.io/badge/Payments-Stripe-008CDD?logo=stripe)](https://stripe.com/)

[Architecture & Decisions (ADR)](./ARCHITECTURE.md) • [Features](#-key-features) • [Quickstart](#-quickstart) • [Design System](#-cafe--espresso-design-system)

</div>

---

## 📖 Overview

**Monocle** transforms static GitHub repositories into conversational, live-indexed knowledge engines. Powered by a custom **Zero-Waste RAG pipeline**, Neon Postgres with `pgvector`, and Google Gemini 2.5 Flash, Monocle allows developers to:

- 🔍 **Chat with Codebases:** Ask architectural questions and receive sub-second streamed answers with exact line numbers and file citations.
- ⚡ **Zero-Burn Ingestion:** Direct AST vector embedding using `gemini-embedding-001` (768 dimensions), consuming **0 text-generation quota** during repository indexing.
- 📈 **Automated Commit Summaries:** Real-time diff tracking via authenticated Octokit REST with semantic heuristic fallbacks.
- 💡 **Context-Aware Dynamic Suggestions:** AI-generated architectural questions tailored uniquely to the connected repository's modules.
- 💳 **Idempotent Credit System:** Real-time credit balance tracking, per-file indexing costs, and webhook-verified Stripe checkout integration.
- 🎨 **Cafe / Espresso Design System:** Warm cream (`#fbf6ee`) light mode and roasted coffee (`#130f0c`) dark mode crafted with Framer Motion and Radix UI.

---

## 🏛️ System Architecture

```mermaid
graph TD
    Client["Browser / Developer"] --> NextApp["Next.js 16 App Router (Turbopack)"]
    
    subgraph FrontendShell["Frontend Shell"]
        NextApp --> ThemeProv["Theme Switcher (Cafe Light / Espresso Dark)"]
        NextApp --> FluidNav["Fluid Animated Dropdown & Breadcrumbs"]
        NextApp --> ChatStreamUI["Markdown Syntax Highlighter & Citation Cards"]
    end

    subgraph ServiceLayer["Service & Communications"]
        NextApp --> TRPC["tRPC v11 Type-Safe Router"]
        NextApp --> ChatRoute["/api/chat (Vercel AI SDK SSE Stream)"]
        NextApp --> StripeWebhook["/api/stripe/webhook (Atomic Credits)"]
    end

    subgraph QueueLayer["Background Queue Layer"]
        TRPC --> BullMQ["BullMQ Job Dispatcher"]
        BullMQ --> Redis["Upstash Redis Queue"]
        Redis --> IndexWorker["Repository Ingestion Worker"]
        Redis --> CommitWorker["Commit Summarization Worker"]
    end

    subgraph StorageLayer["Storage & Intelligence"]
        IndexWorker --> Embedder["gemini-embedding-001 (768-dim)"]
        Embedder --> NeonDB[("Neon Serverless Postgres + pgvector")]
        ChatRoute --> NeonDB
        ChatRoute --> GeminiFlash["gemini-2.5-flash (Streaming Q&A)"]
    end

    subgraph ExternalLayer["External Infrastructure"]
        IndexWorker --> GitHubAPI["GitHub Octokit API"]
        CommitWorker --> GitHubAPI
        StripeWebhook --> Stripe["Stripe Checkout"]
        TRPC --> Clerk["Clerk Authentication"]
    end
```

---

## ✨ Key Features

### 1. Zero-Waste RAG Pipeline
- Extracts AST and code chunks, stripping binaries and generated lockfiles.
- Directly embeds chunks via `gemini-embedding-001` (768-dim vectors) into Neon `pgvector`.
- Performs cosine similarity matching with relevance thresholds (`> 0.15`) plus heuristic test suite discovery.

### 2. High-Fidelity Streaming AI Chat
- Sub-second Time-To-First-Token (TTFT) via `@ai-sdk/google` and Vercel AI SDK.
- Injects a global repository file tree map alongside top vector matches so the model has complete architectural awareness.
- Syntax highlighting with copyable code blocks, file citations, and one-click answer saving.

### 3. Background Queue & Idempotent Processing
- Decoupled via **BullMQ** on **Upstash Redis**.
- Deduplicates concurrent indexing requests using deterministic job IDs (`repo-index-${projectId}`).
- Paced commit processing with exponential backoff prevents GitHub API or AI rate limits.

### 4. Site-Wide Live Credit Synchronization
- Reactively updates across the topbar pill, sidebar profile dropdown, dashboard metric grid, and billing page via tRPC cache invalidation.
- Stripe webhook idempotency checks prevent duplicate credit allocation.

---

## 🎨 Cafe & Espresso Design System

Monocle features a warm, editorially crafted aesthetic:

| Design Token | Cafe (Light Mode) | Espresso (Dark Mode) | Purpose |
| :--- | :--- | :--- | :--- |
| **`--bg`** | `#fbf6ee` (Warm Cream) | `#130f0c` (Roasted Coffee) | App background canvas |
| **`--surface`** | `#fffdf8` (Warm Off-White) | `#1b1511` (Warm Dark Brown) | Cards, panels, modals |
| **`--surface-warm`**| `#f1e3cf` (Latte Tint) | `#261e18` (Espresso Warm) | Hover states, active pills |
| **`--accent`** | `#9b5b32` (Caramel Amber) | `#c47c4c` (Terracotta) | Primary buttons, links |
| **`--text`** | `#1c1612` (Espresso Black) | `#f5ede3` (Warm Ivory) | Primary typography |
| **`--text-3`** | `#8c7b70` (Muted Warm) | `#8a7b70` (Muted Warm Gray) | Captions, secondary labels |

---

## 🚀 Quickstart

### Prerequisites
- Node.js 18+ (Node.js 20+ recommended)
- PostgreSQL Database with `pgvector` enabled (e.g. [Neon.tech](https://neon.tech))
- Upstash Redis instance (e.g. [Upstash.com](https://upstash.com))
- Google AI Gemini API Key (e.g. [Google AI Studio](https://aistudio.google.com/))
- Clerk Application Keys (e.g. [Clerk.com](https://clerk.com/))
- GitHub Personal Access Token (for private repositories or high-rate commit fetching)

### 1. Clone & Install
```bash
git clone https://github.com/Sajal-kanwal/monocle.git
cd monocle
npm install --legacy-peer-deps
```

### 2. Environment Configuration
Create a `.env` file in the project root directory:

```env
# Database (Neon Serverless Postgres with pgvector)
DATABASE_URL="postgresql://user:password@ep-host.aws.neon.tech/neondb?sslmode=require"

# Redis & Background Queue (Upstash Redis)
REDIS_URL="rediss://default:password@host.upstash.io:6379"

# Google Generative AI (Gemini Flash & Embeddings)
GEMINI_API_KEY="AIzaSy..."
GOOGLE_GENERATIVE_AI_API_KEY="AIzaSy..."

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"

# GitHub API Token
GITHUB_TOKEN="github_pat_..."

# Stripe Billing (Optional for local testing)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### 3. Database Migration
Push the Prisma schema with pgvector extensions:
```bash
npx prisma db push
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| **`npm run dev`** | `next dev` | Starts Turbopack development server on port 3000 |
| **`npm run build`** | `next build` | Compiles optimized production Next.js build |
| **`npm run start`** | `next start` | Serves compiled production build |
| **`npm run lint`** | `next lint` | Executes ESLint validation |
| **`npx tsc --noEmit`**| `tsc --noEmit` | Validates TypeScript types across all routes |
| **`npx prisma studio`**| `prisma studio`| Launches interactive GUI for exploring database records |

---

## 📐 Architecture Decision Records (ADRs)

Detailed documentation of our architectural decisions (Zero-Waste RAG, Dual-Model Quota Strategy, Redis BullMQ Decoupling, and Neon HTTP pgvector mode) is available in [ARCHITECTURE.md](./ARCHITECTURE.md).

---

## 🛡️ License

Distributed under the MIT License. See `LICENSE` for more information.
