# Vendor Performance Analysis — Exhaustive Project Deep-Dive

> A comprehensive reference covering every architectural decision, technology choice, trade-off, and interview talking point for the Vendor Performance Analysis project.

---

## Table of Contents

1. [Project Purpose & Motivation](#1-project-purpose--motivation)
2. [Problem Statement](#2-problem-statement)
3. [Data Landscape](#3-data-landscape)
4. [Technology Stack — Every Choice Explained](#4-technology-stack--every-choice-explained)
5. [Architecture — Layer-by-Layer](#5-architecture--layer-by-layer)
6. [Module Deep-Dives](#6-module-deep-dives)
7. [Design Principles & Patterns](#7-design-principles--patterns)
8. [Trade-offs & Alternative Approaches](#8-trade-offs--alternative-approaches)
9. [What Was Learnt](#9-what-was-learnt)
10. [ML/DL Foundation — Future Roadmap](#10-mldl-foundation--future-roadmap)
11. [Interview Walkthrough Guide](#11-interview-walkthrough-guide)

---

## 1. Project Purpose & Motivation

### Why This Project Was Built

This project was built to demonstrate **end-to-end data engineering and analytics** capabilities — from raw CSV ingestion through to ML-ready feature stores. It shows a recruiter/interviewer that the student can:

- Handle **real-world scale data** (15.6M+ records, 1.6GB raw CSVs)
- Build **production-quality ETL pipelines** (not just Jupyter notebook prototyping)
- Write **analytical SQL** (complex CTEs joining 6 tables)
- Implement **data quality frameworks** (not just `df.dropna()`)
- Engineer **ML-ready features** with clear business semantics
- Follow **software engineering best practices** (config management, logging, testing, retry logic)

### What Problem It Solves

A multi-store retail/distribution operation needed to evaluate vendor performance across dimensions of profitability, inventory efficiency, pricing power, and logistics cost. The raw data sits across 6 disconnected tables — purchases, sales, inventory (begin/end), purchase prices, and vendor invoices. Without aggregation, no actionable insight is possible.

This pipeline transforms those 6 raw tables into a single `vendor_sales_summary` table with derived business metrics, and further into an `ml_feature_store` table ready for model consumption.

---

## 2. Problem Statement

**Input**: 6 CSV files totaling 15.6M rows from a retail operation:
- `sales.csv` — 12.8M point-of-sale transaction records
- `purchases.csv` — 2.4M vendor purchase order records
- `purchase_prices.csv` — 12K product pricing catalog entries
- `begin_inventory.csv` — 207K period-start inventory snapshots
- `end_inventory.csv` — 224K period-end inventory snapshots
- `vendor_invoice.csv` — 5.5K vendor invoices with freight costs

**Output**: 
1. A denormalized `vendor_sales_summary` table with 20+ columns including derived financial metrics
2. An `ml_feature_store` table with 17+ engineered features ready for scikit-learn/PyTorch
3. Data quality validation reports (JSON)
4. Pipeline execution logs with sync history

---

## 3. Data Landscape

### Table Schemas

**purchases** — Core procurement data:
- `InventoryId`, `Store`, `Brand`, `Description`, `Size`
- `VendorNumber`, `VendorName`
- `PONumber`, `PODate`, `ReceivingDate`, `InvoiceDate`, `PayDate`
- `PurchasePrice`, `Quantity`, `Dollars`, `Classification`

**purchase_prices** — Product pricing reference:
- `Brand`, `Description`, `Price` (retail), `Size`, `Volume`
- `Classification`, `PurchasePrice`, `VendorNumber`, `VendorName`

**sales** — Point-of-sale transactions:
- `SalesQuantity`, `SalesDollars`, `SalesPrice`, `VendorNo`, `Brand`, `ExciseTax`

**vendor_invoice** — Vendor billing with freight:
- `VendorNumber`, `VendorName`, `InvoiceDate`, `PONumber`
- `Quantity`, `Dollars`, `Freight`, `Approval`

**begin_inventory / end_inventory** — Inventory snapshots:
- `InventoryId`, `Store`, `City`, `Brand`, `Description`
- `Size`, `onHand`, `Price`, `startDate/endDate`

### Key Data Relationships
- `purchases.Brand` → `purchase_prices.Brand` (product catalog join)
- `purchases.VendorNumber` → `sales.VendorNo` (vendor-brand performance)
- `purchases.VendorNumber` → `vendor_invoice.VendorNumber` (freight costs)
- All tables share `Brand` as the product dimension key

---

## 4. Technology Stack — Every Choice Explained

### Python 3.10+

**Why Python**: Industry standard for data engineering and analytics. The entire data science ecosystem (pandas, scikit-learn, PyTorch) lives here. Using Python ensures the pipeline feeds directly into ML workflows without language boundaries.

**Why not R**: R excels at statistical analysis and visualization but lacks production engineering libraries (connection pooling, scheduling, HTTP clients). Since this project emphasizes *engineering* as much as *analysis*, Python is the clear choice.

**Why not Java/Scala (Spark)**: The dataset (15.6M rows, 1.6GB) is large but not "big data" scale. Spark introduces cluster management complexity that doesn't pay off below ~100GB. Pandas handles this dataset in-memory on a single machine with 16GB RAM.

### MySQL 8.0+ (InnoDB Engine)

**Why MySQL over SQLite**: The basic version of this project used SQLite. The production version upgrades to MySQL because:
- **Connection pooling** — SQLite is single-writer; MySQL handles concurrent reads/writes from the pipeline, notebooks, and quality checks simultaneously
- **InnoDB transactions** — ACID compliance with rollback on batch insert failures
- **Type system** — Proper DATETIME, DECIMAL types vs SQLite's dynamic typing
- **Scalability signal** — Shows interviewers you can work with production databases, not just file-based stores

**Why not PostgreSQL**: Both are excellent. MySQL was chosen because the retail industry heavily uses MySQL. PostgreSQL would be an equally valid choice and offers better JSON support and window functions.

**Why not a data warehouse (BigQuery, Redshift)**: Cloud warehouses are overkill for a single-machine pipeline. They also introduce cost, authentication complexity, and network latency. The architecture is designed so swapping MySQL for a warehouse is a config change (SQLAlchemy connection string).

### SQLAlchemy 2.0

**Why SQLAlchemy over raw mysql-connector**: SQLAlchemy provides:
- **Connection pooling** (`pool_size`, `max_overflow`, `pool_recycle`) — reuses connections instead of creating new ones per query
- **`pool_pre_ping`** — detects and replaces stale connections before they cause query failures
- **Dialect abstraction** — switch from MySQL to PostgreSQL by changing one connection string
- **`text()` for parameterized queries** — prevents SQL injection

**Why not an ORM (Django, SQLAlchemy ORM)**: The project uses raw SQL (CTEs) for analytical queries. ORM abstractions add overhead and make complex aggregations harder to express. SQLAlchemy Core (connection + `read_sql`) is the right middle ground.

### Pandas 2.0+

**Why Pandas over Polars**: Pandas is the industry standard and what interviewers expect. Polars is faster for large datasets but has a smaller ecosystem and less interview relevance. The performance difference is negligible for this dataset size.

**Why not PySpark**: Same reasoning as the MySQL vs Spark decision — the dataset fits in memory. PySpark's distributed processing overhead would slow things down, not speed them up.

### GSAP, schedule, paramiko, requests

- **`schedule`** — Lightweight Python job scheduler for the real-time pipeline. Alternative was `APScheduler` (more features but heavier) or `cron` (OS-level, not portable). `schedule` keeps everything in-process and testable.
- **`paramiko`** — SFTP client library. The only serious Python option for SSH/SFTP.
- **`requests`** — HTTP client for API data sources. `httpx` is a modern alternative with async support, but `requests` is more universally known.
- **`pyarrow`** — Parquet file format support. Essential for columnar storage if data sources provide Parquet files.

### python-dotenv

**Why `.env` files over environment variables directly**: `.env` files are version-controllable via `.env.example` (template without secrets), developer-friendly (one file to edit), and work identically across Windows/Mac/Linux. The alternative — raw `os.environ` — requires each developer to manually `export` variables.

### pytest

**Why pytest over unittest**: pytest has cleaner syntax (no `self.assert*` methods), powerful fixtures, parametrize decorators, and better error messages. `unittest` is verbose and Java-influenced. pytest is the Python testing standard.

### Logging (RotatingFileHandler)

**Why rotating file logs over print statements**: 
- `print()` goes to stdout and is lost when the process exits
- Rotating handlers prevent log files from consuming disk space (10MB max, 5 backups)
- Structured format (`timestamp | level | module | message`) enables log aggregation tools (ELK, Splunk) in production

---

## 5. Architecture — Layer-by-Layer

### Layer 1: Configuration (`config.py`)

**Purpose**: Single source of truth. Every module imports `get_config()` instead of hardcoding values.

**Design decisions**:
- **Frozen dataclasses** (`@dataclass(frozen=True)`) — prevents accidental mutation of config values at runtime
- **Singleton pattern** — `_cached_config` ensures `.env` is read only once, even if 10 modules import `get_config()`
- **`ensure_dirs()`** — auto-creates `data/`, `logs/`, `output/` directories on first run

**Alternative**: YAML config files. Trade-off: YAML requires a parser dependency and doesn't integrate with environment variables (12-factor app principle). `.env` is simpler and Heroku/Docker-native.

### Layer 2: Ingestion

#### `mysql_database_loader.py` — Batch CSV→MySQL

**Architecture pattern**: Class-based (`CSVToMySQLLoader`) with dependency injection (`DatabaseConfig` dataclass).

**Key decisions**:
- **Connection pooling** (`MySQLConnectionPool`, `pool_size=5`) — reuses connections across table loads instead of connect/disconnect per file
- **Batch inserts** (`batch_size=1000`) — `executemany()` with 1000-row batches balances memory usage vs round-trip overhead. Too small (10) = too many round trips. Too large (100K) = memory spikes on 12.8M-row sales table.
- **Auto-schema inference** (`_infer_mysql_type`) — maps pandas dtypes to MySQL types automatically. `int64→BIGINT`, `float64→DOUBLE`, `object→VARCHAR(N)` where N is 2× the max observed string length (safety margin for future data).
- **Auto-increment `id` primary key** — added to every table for referential integrity, even if the source CSV lacks one.
- **Sanitized table names** — filenames like `purchase_prices.csv` become `purchase_prices` (lowercase, alphanumeric+underscore only). Prevents SQL injection via filenames.
- **JSON report generation** — every load produces a structured report: file, table, rows attempted, rows inserted, success rate. This is auditable.

**Performance result**: 15.6M rows across 6 tables, 100% success rate.

#### `real_time_data_pipeline.py` — Multi-Source ETL

**Architecture pattern**: Strategy pattern via abstract base class.

```
DataExtractor (ABC)
├── APIExtractor      — REST API (requests library)
├── FTPExtractor      — FTP servers (ftplib)
├── SFTPExtractor     — SFTP servers (paramiko)
├── LocalFileExtractor — Local filesystem
└── DatabaseExtractor — Cross-database SQL queries
```

**Why the Strategy pattern**: Each data source has completely different connection/authentication/parsing logic, but the pipeline orchestrator (`RealTimeDataPipeline.sync_data_source()`) treats them identically through the `DataExtractor.extract()` interface. Adding a new source (e.g., S3, Kafka) means writing one new class — zero changes to the orchestrator.

**Sync modes**:
| Mode | SQL Operation | Use Case |
|---|---|---|
| `full` | `TRUNCATE` + `INSERT` | Small reference tables that get fully replaced |
| `incremental` | `INSERT` only rows > `last_sync_time` | Large transactional tables (append-only) |
| `upsert` | `INSERT ... ON DUPLICATE KEY UPDATE` | Master data that gets updated in-place |

**Scheduling**: `schedule.every(N).seconds.do(fn)` — in-process scheduler. Each data source has its own `schedule_interval`. The pipeline runs an infinite loop (`while self.running: schedule.run_pending(); time.sleep(1)`) with graceful `SIGINT` shutdown.

**Metadata tracking**: Two internal MySQL tables:
- `pipeline_sync_history` — audit log per sync (start/end time, row count, status, error message)
- `pipeline_data_quality` — data integrity metrics (null counts, duplicate counts, data hashes)

**Email alerting**: On sync failure, sends HTML email via SMTP. Configurable via `.env`. Default: disabled.

### Layer 3: Validation (`data_quality.py`)

**Architecture pattern**: Profile-based declarative validation.

Each table has a validation profile (dict) defining:
- `required_columns` — columns that must exist
- `numeric_columns` — columns that must be numeric dtype
- `non_nullable` — columns with zero-tolerance for nulls
- `range_checks` — business-rule bounds (e.g., `PurchasePrice ∈ [0, 10000]`)
- `null_threshold` — max acceptable null percentage (default 10%)

**5 check categories**:
1. **Schema** — are all required columns present?
2. **Nulls** — do any columns exceed the null threshold? Are non-nullable columns clean?
3. **Duplicates** — full-row duplicate detection
4. **Ranges** — do values fall within business-rule bounds?
5. **Outliers** — z-score based detection (configurable threshold, default 3.0). Checks if >5% of values are outliers (acceptable threshold).
6. **Dtypes** — are numeric columns actually stored as numeric?

**Output**: Structured JSON report with per-check pass/fail, violation counts, and summary statistics.

**Why not Great Expectations**: Great Expectations is the industry standard for data quality, but it's a heavy dependency (100+ MB) with its own config ecosystem. This custom framework demonstrates the student *understands the principles* behind DQ validation, not just how to `pip install` a library.

### Layer 4: Transformation (`get_vendor_summary.py`)

**SQL strategy**: Common Table Expressions (CTEs) — three CTEs joined in a final SELECT:

```sql
WITH FreightSummary AS (
    -- Aggregate freight cost per vendor from vendor_invoice
    SELECT VendorNumber, SUM(Freight) AS FreightCost
    FROM vendor_invoice GROUP BY VendorNumber
),
PurchaseSummary AS (
    -- Aggregate purchase quantity/dollars per vendor-brand
    -- JOIN with purchase_prices to get retail price and volume
    SELECT ... FROM purchases p JOIN purchase_prices pp ON p.Brand = pp.Brand
    WHERE p.PurchasePrice > 0  -- exclude zero-price records
    GROUP BY vendor, brand, price, volume
),
SalesSummary AS (
    -- Aggregate sales metrics per vendor-brand
    SELECT ... FROM sales GROUP BY VendorNo, Brand
)
SELECT ...
FROM PurchaseSummary ps
LEFT JOIN SalesSummary ss ON ps.VendorNumber = ss.VendorNo AND ps.Brand = ss.Brand
LEFT JOIN FreightSummary fs ON ps.VendorNumber = fs.VendorNumber
ORDER BY ps.TotalPurchaseDollars DESC
```

**Why CTEs over subqueries**: CTEs are more readable, debuggable (you can run each CTE independently), and self-documenting. Subqueries nest deeply and become unreadable with 3+ levels.

**Why LEFT JOIN (not INNER JOIN)**: Some vendor-brands have purchases but no sales (new products, slow movers). LEFT JOIN preserves these rows so we can identify underperforming products. INNER JOIN would silently drop them.

**Derived metrics** (computed in Python after SQL extraction):
| Metric | Formula | Business Meaning |
|---|---|---|
| GrossProfit | Sales$ − Purchase$ | Raw profitability |
| ProfitMargin (%) | (Profit / Sales$) × 100 | Percentage margin |
| StockTurnover | SalesQty / PurchaseQty | Inventory velocity |
| SalesToPurchaseRatio | Sales$ / Purchase$ | Revenue per dollar invested |
| FreightToSalesRatio (%) | (Freight / Sales$) × 100 | Logistics cost burden |
| PriceMarkup (%) | ((Retail − Cost) / Cost) × 100 | Pricing power |

**Division-by-zero handling**: All ratio computations use `np.where(denominator != 0, numerator/denominator, 0.0)`. This prevents `inf` values that would break ML models downstream.

### Layer 5: Analysis (Jupyter Notebooks)

**`eda.ipynb`** (28 cells):
- Connects to MySQL via `db_connect.py`
- Profiles all 6 raw tables (row counts, column types, sample data)
- Builds the `vendor_sales_summary` table via the same CTE SQL
- Builds a `vendor_brand_summary` variant
- Data cleaning: whitespace stripping, null imputation, type coercion
- Creates derived columns and saves back to MySQL

**`vendor_performance_analysis.ipynb`** (24 cells):
- Loads `vendor_sales_summary` from MySQL
- Descriptive statistics (`df.describe().T`)
- Distribution analysis: histograms for all numeric columns
- Outlier detection: box plots + IQR method + z-scores
- Log transformations for right-skewed financial data
- Volume categorization (Mini/Half/Standard/Large/Magnum)
- Bimodal distribution detection in GrossProfit (two vendor tiers)
- Margin tier segmentation (loss/low/medium/high)
- Correlation matrix heatmap
- Normality tests (Shapiro-Wilk) for key business metrics
- Count plots for categorical columns

### Layer 6: Feature Engineering (`feature_engineering.py`)

**7 feature layers, 17+ features**, all prefixed with `feat_` for namespace separation:

| Layer | Features | Business Purpose |
|---|---|---|
| **Profitability** | `feat_profit_per_unit`, `feat_profit_tier` (categorical), `feat_net_profit_after_freight`, `feat_is_profitable` (binary) | Target variables, margin classification |
| **Volume** | `feat_volume_category`, `feat_quantity_ratio`, `feat_demand_velocity` | Product sizing, demand signals |
| **Pricing** | `feat_price_gap`, `feat_price_gap_pct`, `feat_price_competitiveness`, `feat_excise_burden` | Pricing strategy inputs |
| **Inventory** | `feat_sell_through_rate`, `feat_overstock_flag`, `feat_revenue_per_purchase_dollar` | Stock optimization |
| **Vendor Aggregates** | `feat_vendor_brand_count`, `feat_vendor_total_revenue`, `feat_vendor_avg_margin`, `feat_vendor_revenue_share` | Portfolio analysis |
| **Statistical** | `feat_log_sales`, `feat_log_purchases`, `feat_log_profit`, `feat_zscore_profit_margin` | Distribution normalization |
| **Categorical** | `feat_vendor_frequency` | Frequency encoding for models |

**Design principle**: Every feature has a docstring explaining its *business meaning*, not just its formula. This is critical for ML model interpretability.

### Layer 7: Utilities

**`utils/decorators.py`**:
- `@timer` — logs execution duration. Supports both `@timer` and `@timer(log_level="DEBUG")` syntax.
- `@retry(max_attempts=3, delay=2.0, backoff=2.0)` — exponential backoff for transient DB failures. Logs each attempt and raises on final failure.
- `@validate_dataframe(required_columns=[...], min_rows=1)` — schema enforcement via decorator. Uses `inspect.signature()` to resolve the DataFrame argument by name.

**`utils/logging_config.py`**:
- `setup_logger(name)` — creates a logger with rotating file handler (10MB, 5 backups) + console handler
- Prevents duplicate handlers on repeated calls (checks `logger.handlers`)
- Consistent format: `2026-05-19 12:00:00 | INFO    | module_name               | message`

### Layer 8: Testing

**`tests/test_data_quality.py`** — 12 test classes covering:
- Schema validation (pass + fail with missing columns)
- Null checks (non-nullable constraints)
- Range violations (out-of-bounds values)
- Duplicate detection
- Report structure validation
- Custom profile support
- All tests use synthetic DataFrames — **zero database dependency**

**`tests/test_feature_engineering.py`** — 11 test classes covering:
- Feature pipeline completeness (returns DataFrame, creates 15+ feat_ columns)
- Original column preservation
- Row count preservation
- No NaN in numeric features
- Individual feature computation validation with known inputs/outputs
- Division-by-zero safety (all-zero DataFrame produces no `inf` values)
- Input validation (missing columns raise `ValueError`, empty DataFrame raises `ValueError`)

---

## 6. Design Principles & Patterns

1. **Separation of Concerns** — each `.py` file has one responsibility. Config doesn't know about SQL. SQL doesn't know about features. Features don't know about the pipeline.

2. **Strategy Pattern** — `DataExtractor` ABC with 5 concrete implementations. Adding a new source = one new class, zero orchestrator changes.

3. **Singleton Pattern** — `get_config()` caches the config object. Read `.env` once, use everywhere.

4. **Decorator Pattern** — `@timer`, `@retry`, `@validate_dataframe` add cross-cutting concerns without modifying function logic.

5. **Profile-Based Validation** — DQ checks are configured declaratively (dict), not imperatively (code). Adding a new table's validation = adding a dict entry.

6. **Convention over Configuration** — all engineered features use `feat_` prefix. `get_feature_columns()` and `get_numeric_features()` use this convention to auto-discover features.

7. **Fail-Safe Defaults** — division-by-zero returns 0.0 (not `inf` or `NaN`). Missing `.env` uses defaults. Missing directories are auto-created.

---

## 7. Trade-offs & Alternative Approaches

| Decision | Chosen | Alternative | Why Chosen |
|---|---|---|---|
| Database | MySQL | PostgreSQL, SQLite | MySQL is retail-industry standard; upgrade from SQLite basic version |
| ORM | SQLAlchemy Core | Django ORM, raw SQL | Core gives pooling + dialect abstraction without ORM overhead |
| Scheduler | `schedule` library | APScheduler, Celery, cron | Lightweight, in-process, no external dependencies |
| DQ Framework | Custom | Great Expectations, Deequ | Demonstrates understanding of DQ principles; lighter footprint |
| Feature Store | Custom table | Feast, Hopsworks | No infrastructure overhead; demonstrates the concept |
| Config | `.env` + dataclasses | YAML, TOML, pydantic-settings | `.env` is 12-factor compliant and Docker-native |
| Testing | pytest + synthetic data | Integration tests with real DB | Tests run anywhere without MySQL; faster CI |
| Batch size | 1000 rows | 100 / 10000 / bulk LOAD DATA | 1000 balances memory vs round-trips for mixed file sizes |

---

## 8. What Was Learnt

1. **ETL pipeline design** — Extract-Transform-Load is not just `pd.read_csv()` + `to_sql()`. Production ETL needs batching, error handling, retry logic, and audit logging.
2. **Connection pooling** — why creating a new DB connection per query is expensive (TCP handshake, auth) and how pools solve this.
3. **CTE-based SQL** — writing readable, maintainable analytical queries that join 6 tables.
4. **Data quality engineering** — schema validation, range checks, outlier detection as automated pipeline steps.
5. **Feature engineering for ML** — transforming business metrics into model-consumable features with clear semantics.
6. **Software engineering practices** — config management, logging, decorators, testing, `.gitignore`, `requirements.txt`.
7. **Strategy pattern in practice** — abstracting multiple data sources behind a common interface.
8. **Division-by-zero and edge case handling** — `np.where()` guards on every ratio computation.

---

## 9. ML/DL Foundation — Future Roadmap

| Model | Task | Key Features |
|---|---|---|
| **Demand Forecasting** | Regression / Time Series | `feat_demand_velocity`, `feat_sell_through_rate`, `feat_log_sales` |
| **Vendor Scoring** | Classification / Ranking | `feat_vendor_avg_margin`, `feat_vendor_brand_count`, `feat_profit_tier` |
| **Price Optimization** | Regression | `feat_price_gap_pct`, `feat_price_competitiveness`, `feat_excise_burden` |
| **Anomaly Detection** | Unsupervised | `feat_overstock_flag`, `feat_quantity_ratio`, `feat_zscore_profit_margin` |

The `feat_is_profitable` column serves as a ready-made binary classification target.

---

## 10. Interview Walkthrough Guide

### Opening (30 seconds)
> "I built an end-to-end data analytics pipeline that processes 15.6 million transactional records from a retail operation. It ingests raw CSVs into MySQL, validates data quality, generates vendor performance summaries using CTE-based SQL, and produces ML-ready features — all with production engineering practices like connection pooling, retry logic, and automated testing."

### Architecture Walk (2 minutes)
Walk through the 6-layer architecture: **Ingestion → Validation → Transformation → Analysis → Feature Engineering → ML (future)**. Emphasize separation of concerns.

### Deep-Dive Questions & Answers

**Q: Why MySQL over SQLite?**
> "The basic version used SQLite. I upgraded to MySQL because it supports connection pooling for concurrent access, InnoDB transactions for batch insert rollback, and proper data types. It also signals production-database experience to interviewers."

**Q: How do you handle data quality?**
> "I built a profile-based validation framework with 5 check categories: schema completeness, null thresholds, business-rule range validation, z-score outlier detection, and data type verification. Each table has a declarative profile. The output is a structured JSON report."

**Q: Explain the feature engineering approach.**
> "I engineered 17+ features across 7 layers — profitability, volume, pricing, inventory, vendor aggregates, statistical normalization, and categorical encoding. Every feature has a `feat_` prefix for namespace separation and a docstring explaining its business meaning. All ratio computations have division-by-zero guards using `np.where()`."

**Q: How would you scale this to 100x the data?**
> "Three changes: (1) Replace pandas with PySpark or Polars for distributed/parallel processing, (2) Replace MySQL with a columnar warehouse like BigQuery or Redshift, (3) Replace the `schedule` library with Airflow for DAG-based orchestration. The architecture's separation of concerns makes each swap independent."

**Q: Why not use Great Expectations for DQ?**
> "I could, and in a team setting I would. I built a custom framework here to demonstrate that I understand the *principles* behind data quality validation — schema checks, range validation, statistical outlier detection — rather than just knowing how to pip install a library."

### Closing (15 seconds)
> "The project is designed as a foundation for ML/DL work. The feature store is ready for scikit-learn or PyTorch consumption, and I have concrete plans for demand forecasting and vendor scoring models."

---

## Project Structure Reference

```
Vendor-Performance-Analysis/
├── config.py                         # Centralized .env-based configuration
├── db_connect.py                     # MySQL connection (SQLAlchemy + pooling)
├── mysql_database_loader.py          # Enterprise CSV → MySQL batch loader
├── real_time_data_pipeline.py        # Multi-source ETL with scheduling + alerts
├── get_vendor_summary.py             # CTE-based vendor summary generator
├── data_quality.py                   # Profile-based DQ validation framework
├── feature_engineering.py            # 7-layer ML feature engineering
├── eda.ipynb                         # Exploratory Data Analysis notebook
├── vendor_performance_analysis.ipynb # Statistical analysis + visualization
├── utils/
│   ├── logging_config.py             # Rotating file + console logging
│   └── decorators.py                 # @timer, @retry, @validate_dataframe
├── tests/
│   ├── test_data_quality.py          # DQ validation tests (synthetic data)
│   └── test_feature_engineering.py   # Feature computation tests
├── data/                             # Raw CSVs (gitignored)
├── docs/architecture.md              # Architecture documentation
├── requirements.txt                  # Pinned dependencies
├── .env.example                      # Environment variable template
└── .gitignore                        # Comprehensive ignore rules
```
