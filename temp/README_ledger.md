# LedgerCore

[![NestJS](https://img.shields.io/badge/Framework-NestJS%20v10-red.svg)](https://nestjs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-v24.14.0-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%2018-blue.svg)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/ORM-Prisma%20v5-indigo.svg)](https://www.prisma.io/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript%205-blue.svg)](https://www.typescriptlang.org/)

**LedgerCore** is a enterprise-grade, correctness-first, **double-entry financial ledger and wallet engine** built with Node.js 24, TypeScript, NestJS, and PostgreSQL 18.

It models every monetary movement as an **immutable, balanced accounting event** ($\sum \text{Debits} = \sum \text{Credits}$ per currency), derives account balances dynamically from ledger history, and treats transactional consistency under extreme concurrency as the primary system requirement.

---

## 🌟 Executive Summary

Traditional application architectures store a mutable `balance` column in a database table (`UPDATE wallets SET balance = balance + X`). This pattern is fundamentally flawed for financial systems:
- **Lost Updates & Double Spending**: Concurrent requests race against stale balances.
- **Balance Drift**: Partial system crashes create untraceable money creation or loss.
- **Zero Auditability**: Overwriting balance fields destroys the historical record of *why* money moved.

**LedgerCore solves these flaws through 5 strict engineering guarantees:**
1. **Double-Entry Accounting Invariant**: $\sum \text{Debits} - \sum \text{Credits} = 0$ for every posted transaction per currency.
2. **Immutable Ledger History**: Ledger entries are **INSERT-ONLY**. Corrections and refunds are posted as mirror reversing entries.
3. **Deadlock-Free Row-Level Locking**: Deterministic UUID ordering (`SELECT ... FOR UPDATE`) prevents database deadlocks during concurrent transfers.
4. **Distributed Idempotency Engine**: Scoped request fingerprinting prevents duplicate charges or retried mutations.
5. **Transactional Outbox & Automated Reconciliation**: Asynchronous side-effects are committed in the same database transaction as financial writes, while automated background workers continuously audit ledger integrity.

---

## 🏗 System Architecture

```mermaid
graph TB
    subgraph "Clients & External Gateways"
        Client[Mobile / Web Application]
        Provider[Mock Payment Provider Gateway]
    end

    subgraph "NestJS API Server"
        Middleware[RequestIdMiddleware]
        Filter[GlobalExceptionFilter]
        Idempotency[IdempotencyInterceptor]
        
        AuthMod[Auth & Users Module]
        WalletMod[Wallets Module]
        TransferMod[Transfers Module]
        WebhookMod[Webhooks Gateway]
        AdminMod[Admin Module]
        ReconMod[Reconciliation Module]
        AuditMod[Audit Module]
    end

    subgraph "Core Ledger Engine"
        PostingSvc["PostingService<br/>(Double-Entry Validation)"]
        BalanceSvc["BalanceService<br/>(Derived Balances)"]
        AccountSvc["AccountService<br/>(Sorted Row Locking)"]
        ReversalSvc["ReversalService<br/>(Mirror Transactions)"]
    end

    subgraph "Background Worker Engine"
        OutboxWorker["Outbox Worker<br/>(At-Least-Once Delivery)"]
        ReconWorker["Reconciliation Worker<br/>(Daily Automated Audit)"]
    end

    subgraph "Database (PostgreSQL 18)"
        DB[(13 PostgreSQL Tables<br/>CHECK Constraints & FKs)]
    end

    Client -->|JWT + X-Request-Id + Idempotency-Key| Middleware
    Provider -->|HMAC-SHA256 Signature| WebhookMod
    Middleware --> Filter --> Idempotency
    
    Idempotency --> TransferMod & WebhookMod & WalletMod & AdminMod
    
    TransferMod --> AccountSvc --> PostingSvc
    WebhookMod --> AccountSvc --> PostingSvc
    AdminMod --> ReversalSvc --> PostingSvc

    PostingSvc & BalanceSvc & ReversalSvc & AuthMod & ReconMod & AuditMod --> DB
    
    OutboxWorker -->|Poll & Claim via FOR UPDATE SKIP LOCKED| DB
    ReconWorker -->|Run 6 Integrity Checks & Write Findings| DB
```

---

## 📊 Database Schema (13 Relational Tables)

```mermaid
erDiagram
    users ||--o{ user_roles : "has"
    users ||--o{ sessions : "creates"
    users ||--o{ wallets : "owns"
    users ||--o{ ledger_transactions : "initiates"
    users ||--o{ audit_logs : "triggers"

    wallets ||--o{ ledger_accounts : "provisioned with"
    ledger_accounts ||--o{ ledger_entries : "contains"
    ledger_transactions ||--o{ ledger_entries : "groups"
    ledger_transactions ||--o{ provider_webhook_events : "originates from"
    
    reconciliation_reports ||--o{ reconciliation_findings : "contains"
```

---

## ⚡ Core Features & Module Overview

- **Authentication & Refresh Rotation**: Argon2id password hashing (`timeCost: 3`, `memoryCost: 65536`), short-lived JWT access tokens, and refresh token family rotation with automated reuse detection.
- **RBAC Security**: 4 granular roles (`customer`, `support`, `finance_ops`, `admin`) enforced on all endpoints via `RolesGuard`.
- **Chart of Accounts Provisioning**: Automatic creation of currency-specific `liability` accounts for wallets and `clearing`/`revenue` system accounts.
- **Double-Entry Engine**: Validates $\ge 2$ entries per transaction, positive BigInt minor amounts, currency matching, and exact debit/credit balance.
- **Deadlock-Free Transfer Engine**: Sorts account UUIDs lexicographically before acquiring PostgreSQL row-level locks (`SELECT ... FOR UPDATE`).
- **Distributed Idempotency**: Global NestJS interceptor backed by PostgreSQL (`idempotency_keys`), returning cached responses on retries and throwing `409 Conflict` on concurrent requests or body key mismatches.
- **HMAC Webhook Gateway**: Verifies payment provider webhooks via timing-safe HMAC-SHA256 (`crypto.timingSafeEqual`) and rejects expired timestamps.
- **Immutable Transaction Reversals**: Creates mirror transactions (swapping debits/credits) and updates original status to `reversed` without mutating historical entries.
- **Atomic Transactional Outbox**: Emits outbound side-effect events inside the exact same DB transaction as financial writes.
- **Automated Reconciliation Engine**: Background worker runs 6 automated integrity audits (unbalanced transactions, low entry counts, orphan entries, duplicate provider events, stuck idempotency keys, failed outbox events) and logs findings to `reconciliation_findings`.

---

## 🚀 Getting Started & Operational Guide

### 1. Prerequisites
- **Node.js**: `v24.14.0` (or `v20+`)
- **PostgreSQL**: `18.4` (or Docker Desktop)
- **Git** & **npm**

### 2. Environment Setup
Create a `.env` file in the project root:

```ini
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ledgercore?schema=public"
PORT=3000
NODE_ENV=development
JWT_ACCESS_SECRET="ledgercore-super-secret-access-token-key-2026"
JWT_ACCESS_TTL=900
REFRESH_TOKEN_SECRET="ledgercore-super-secret-refresh-token-key-2026"
ARGON2_TIME_COST=3
ARGON2_MEMORY_COST=65536
MOCK_PROVIDER_WEBHOOK_SECRET="ledgercore-webhook-hmac-secret-key"
OUTBOX_MAX_ATTEMPTS=5
IDEMPOTENCY_RETENTION_HOURS=72
```

### 3. Installation & Database Migration

```bash
# Install dependencies
npm install

# Start PostgreSQL via Docker Compose (if not running natively)
docker-compose up -d postgres

# Run Prisma database migrations (applies DDL & CHECK constraints)
npx prisma migrate dev

# Seed system accounts (provider clearing & system revenue)
npx prisma db seed
```

### 4. Build & Test Verification

```bash
# Typecheck TypeScript (0 errors)
npm run typecheck

# ESLint validation (0 errors)
npm run lint

# Run Unit Tests (7/7 pass)
npm test

# Production Build
npm run build
```

### 5. Running the Application

```bash
# Terminal 1: Start NestJS API Server (Listening on port 3000)
npm run start:dev

# Terminal 2: Start Background Worker Process
npm run worker:prod

# Terminal 3: Execute End-to-End Automated Functional Flow
bash scripts/demo.sh
```

---

## 🎓 Interview & System Design Showcase

LedgerCore is designed as a technical portfolio project for Senior Backend / Financial Systems Software Engineering interviews:

- **60-Second Elevator Pitch**: Available in [PROJECT_PRESENTATION_AND_INTERVIEW_GUIDE.md](./PROJECT_PRESENTATION_AND_INTERVIEW_GUIDE.md).
- **Top Senior Engineering Q&A**: Deep dives on ACID isolation levels, deadlock prevention via sorted locks, idempotency state machines, and outbox event guarantees.
- **Detailed System Walkthrough**: Step-by-step documentation in [walkthrough.md](./walkthrough.md).

---

## 📁 Repository Structure

```text
LedgerCore/
├── prisma/
│   ├── schema.prisma              # 13 Models, 12 Enums, Indexes & FKs
│   ├── seed.ts                    # System Accounts & Seed Script
│   └── migrations/                # Versioned SQL Migrations
├── src/
│   ├── common/                    # Shared Infrastructure
│   │   ├── database/              # PrismaService & TransactionHelper
│   │   ├── errors/                # GlobalExceptionFilter & DomainException
│   │   ├── idempotency/           # IdempotencyInterceptor & Fingerprinting
│   │   ├── logging/               # LoggerService & RequestIdMiddleware
│   │   └── observability/         # Prometheus Metrics & Health Module
│   ├── modules/                   # Core Domain Modules
│   │   ├── admin/                 # Admin Reversals & Ledger Inspection
│   │   ├── audit/                 # Append-Only Audit Logging
│   │   ├── auth/                  # Argon2id + JWT + Refresh Rotation
│   │   ├── authorization/         # RBAC Guards & Wallet Ownership
│   │   ├── ledger/                # Posting, Balance & Reversal Engine
│   │   ├── outbox/                # Outbox Admin Replay Controller
│   │   ├── reconciliation/        # Audit Report APIs
│   │   ├── transfers/             # Concurrent Transfer Controller
│   │   ├── wallets/               # Wallet Lifecycle & Derived Balances
│   │   └── webhooks/              # HMAC Webhook Ingestion Gateway
│   ├── workers/                   # Standalone Background Worker Process
│   ├── app.module.ts              # Root NestJS Module Wiring
│   ├── main.ts                    # REST API Entry Point (/api)
│   └── worker.ts                  # Worker Application Entry Point
├── test/                          # Comprehensive Integration & Concurrency Test Suites
│   ├── concurrency/               # Concurrent Transfers & Idempotency Stress Tests
│   └── setup/                     # TestApp & TestDatabase Infrastructure
├── scripts/
│   └── demo.sh                    # End-to-End Functional Demo Script
└── docker-compose.yml             # Dockerized Multi-Container Configuration
```

---

## 📜 License

UNLICENSED — Built for demonstration, portfolio, and high-reliability financial backend architecture.
