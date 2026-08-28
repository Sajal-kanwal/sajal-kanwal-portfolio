# SQL Data Warehouse & BI Analytics — Exhaustive Project Deep-Dive

> A comprehensive reference covering every architectural decision, technology choice, trade-off, and interview talking point for the SQL Data Warehouse & Business Intelligence Analytics project.

---

## Table of Contents

1. [Project Purpose & Motivation](#1-project-purpose--motivation)
2. [Problem Statement](#2-problem-statement)
3. [Data Landscape & Schema Architecture](#3-data-landscape--schema-architecture)
4. [Technology Stack — Every Choice Explained](#4-technology-stack--every-choice-explained)
5. [Architecture — Layer-by-Layer Pipeline Flow](#5-architecture--layer-by-layer-pipeline-flow)
6. [Cleaning & Transformation Deep-Dive](#6-cleaning--transformation-deep-dive)
7. [Analytics & BI Reporting Layer](#7-analytics--bi-reporting-layer)
8. [Design Principles & Patterns](#8-design-principles--patterns)
9. [Trade-offs & Alternative Approaches](#9-trade-offs--alternative-approaches)
10. [What Was Learnt](#10-what-was-learnt)
11. [Enterprise Scaling & Future Roadmap](#11-enterprise-scaling--future-roadmap)
12. [Interview Walkthrough Guide](#12-interview-walkthrough-guide)

---

## 1. Project Purpose & Motivation

### Why This Project Was Built

This project was built to demonstrate **end-to-end data warehouse engineering and business intelligence analytics** capabilities. It shows an interviewer that the engineer can transition from raw, messy source system data to structured, business-ready star schemas. Specifically, this project demonstrates:

*   **Medallion Architecture Implementation**: Designing a structured three-tier database (Bronze $\rightarrow$ Silver $\rightarrow$ Gold) within an enterprise SQL Server database.
*   **Master Data Integration (CRM + ERP)**: Reconciling disparate, siloed source datasets (CRM sales/demographics and ERP location/categories) into unified, single-source-of-truth tables.
*   **Data Cleaning & Quality Automation**: Resolving real-world database issues, including duplicate customer records, out-of-bounds dates, mismatched keys, inconsistent casing, and string whitespaces using advanced Transact-SQL (T-SQL).
*   **Historization & Slowly Changing Dimensions (SCD Type 2)**: Dynamically building validity windows (`start_date` and `end_date`) using analytical window functions to track product attributes over time.
*   **High-Performance Ingestion**: Implementing SQL Server's native `BULK INSERT` engines with table-level locking optimizations for fast dataset loading.
*   **Advanced BI Analytics**: Constructing complex business intelligence reporting queries utilizing Common Table Expressions (CTEs), window functions, and business cohort segmentations.

### What Problem It Solves

In most retail or enterprise operations, customer and sales transaction data reside in siloed systems (e.g., customer interactions are tracked in a CRM, while product billing, locations, and inventory are managed in an ERP). Joining these tables directly in their raw form is nearly impossible due to mismatched keys, formatting differences (such as prefixed IDs), duplicate entries, and inconsistent values.

This pipeline automates the ingestion, normalization, and cleansing of these files, transforming raw CSV sources into an optimized **Gold Star Schema**. This schema serves as the foundation for BI reports, mapping metrics like customer lifetime value, RFM-style cohorts, and product margins directly to clean dimensions.

---

## 2. Problem Statement

### Raw Data Inputs

The project processes multiple CSV datasets split across two business systems (CRM and ERP), containing typical real-world quality issues:

*   **CRM System Files** (`source_crm/`):
    *   `cust_info.csv` — Customer profile data with duplicates, inconsistent marital statuses (`S`/`M`), and gender formats (`M`/`Male`/`F`/`Female`).
    *   `prd_info.csv` — Product catalog with compound keys (e.g., containing category prefixes like `BK-M18B-40`) and historical price adjustments.
    *   `sales_details.csv` — Point-of-sale transaction details with zero prices, invalid order dates, and mathematically inconsistent sales amounts.
*   **ERP System Files** (`source_erp/`):
    *   `cust_az12.csv` — ERP customer details with birthdates mapped in the future and ID keys prefixed with `"NAS"` (e.g. `"NAS11000"`).
    *   `loc_a101.csv` — Customer location details with short country codes (e.g., `'US'`, `'DE'`) and hyphenated customer IDs.
    *   `px_cat_g1v2.csv` — Product categories mapping ID codes to descriptive categories and subcategories.

### Pipeline Outputs

1.  **Bronze Schema**: Staging tables loaded directly from raw CSV files with zero modifications.
2.  **Silver Schema**: Standardized, clean, and deduplicated tables featuring proper types, stripped prefixes, and historized date ranges.
3.  **Gold Schema**: Star schema database views exposing:
    *   `dim_customers` — Enriched customer demographic dimension.
    *   `dim_products` — Currently active product dimension with surrogate keys.
    *   `fact_sales` — Transactional fact table linking to dimensions.
4.  **Reporting Views**:
    *   `report_customers` — Customer cohort metrics including Recency, Average Order Value (AOV), and Average Monthly Spend.
    *   `report_products` — Product profitability metrics highlighting gross margins and sales velocity.
5.  **Quality Validation Reports**: Automated constraints testing for primary key uniqueness, foreign key coverage, and blank columns.

---

## 3. Data Landscape & Schema Architecture

The warehouse models data through three schemas using SQL Server views and tables to isolate transformations.

```
                      +-----------------------------+
                      |   Source Systems (CSVs)     |
                      |  - CRM Sales & Products     |
                      |  - ERP Customers & Locations|
                      +-----------------------------+
                                     │
                                     ▼ (BULK INSERT / TABLOCK)
+───────────────────────────────────────────────────────────────────────────+
│ DataWarehouse Database (SQL Server)                                       │
│                                                                           │
│   +───────────────────────────────────────────────────────────────────+   │
│   │ bronze Schema (Raw Staging Tables)                                │   │
│   │ - crm_cust_info, crm_prd_info, crm_sales_details                  │   │
│   │ - erp_cust_az12, erp_loc_a101, erp_px_cat_g1v2                    │   │
│   +───────────────────────────────────────────────────────────────────+   │
│                                    │                                      │
│                                    ▼ (silver.load_silver Stored Proc)     │
│   +───────────────────────────────────────────────────────────────────+   │
│   │ silver Schema (Standardized & Deduplicated Tables)                 │   │
│   │ - crm_cust_info, crm_prd_info, crm_sales_details                  │   │
│   │ - erp_cust_az12, erp_loc_a101, erp_px_cat_g1v2                    │   │
│   +───────────────────────────────────────────────────────────────────+   │
│                                    │                                      │
│                                    ▼ (ddl_gold.sql Views)                 │
│   +───────────────────────────────────────────────────────────────────+   │
│   │ gold Schema (Star Schema Views)                                   │   │
│   │  [dim_customers] <─────── [fact_sales] ───────> [dim_products]    │   │
│   +───────────────────────────────────────────────────────────────────+   │
│                                    │                                      │
│                                    ▼ (Business Intelligence CTEs)         │
│   +───────────────────────────────────────────────────────────────────+   │
│   │ BI Reporting Layer (gold.report_*)                                │   │
│   │ - report_customers (RFM Cohorts, lifespans, AOV)                  │   │
│   │ - report_products (Gross Profit, Margin %, Sales Velocity)        │   │
│   +───────────────────────────────────────────────────────────────────+   │
+───────────────────────────────────────────────────────────────────────────+
```

### Table Mappings

#### Dimensions (`gold.dim_customers` & `gold.dim_products`)
*   **`gold.dim_customers`**: Merges CRM `silver.crm_cust_info` with ERP customer data (`silver.erp_cust_az12`) and locations (`silver.erp_loc_a101`) via customer keys. Automatically generates a sequential integer surrogate key.
*   **`gold.dim_products`**: Combines CRM product listings (`silver.crm_prd_info`) with ERP category mappings (`silver.erp_px_cat_g1v2`), filtering for active, non-historized records (`WHERE prd_end_dt IS NULL`).

#### Facts (`gold.fact_sales`)
*   **`gold.fact_sales`**: Acts as the transaction hub. Links Point-of-Sale details from `silver.crm_sales_details` directly to the `customer_key` and `product_key` fields of the dimension views.

---

## 4. Technology Stack — Every Choice Explained

### Microsoft SQL Server (Express / Developer Edition)
*   **Why Chosen**: SQL Server is an industry-standard, enterprise-grade relational database management system (RDBMS) widely deployed across corporate finance, retail, and healthcare environments. It provides native support for stored procedures, robust transaction isolation levels (ACID compliance), complex window function optimizations, and fast bulk operations.
*   **Why not PostgreSQL**: While PostgreSQL is a fantastic open-source database, SQL Server is frequently the target for corporate BI workloads. Working with SQL Server allows the project to demonstrate expertise in Microsoft ecosystem specific optimization parameters (like `TABLOCK` hints and T-SQL syntax).
*   **Why not SQLite**: SQLite lacks schema separation (cannot easily segregate `bronze`, `silver`, and `gold` environments), does not support connection pooling, is single-writer only, and lacks the advanced analytical window functions (like `LEAD`/`LAG` over date calculations) and robust stored procedures needed for data warehousing.

### Transact-SQL (T-SQL)
*   **Why Chosen**: T-SQL extends SQL with procedural programming capabilities (variables, loops, error-handling blocks). It runs directly on the database engine, eliminating network latency. Standardizing the pipeline on T-SQL stored procedures demonstrates database-native ETL capabilities that do not rely on heavy external execution servers.
*   **Why not Python / Pandas**: Python is excellent for data science but moving 10M+ rows back and forth between a database and a Python runtime creates massive network bottlenecks. Processing data *in-database* using SQL Server's query compiler is significantly faster and aligns with the modern ELT (Extract, Load, Transform) paradigm.

### SSMS (SQL Server Management Studio)
*   **Why Chosen**: The premium client tool for managing and scripting SQL Server databases. It provides execution plan analysis, visual query profiling, database tuning advice, and complete administration logs.

### Medallion Architecture (Bronze $\rightarrow$ Silver $\rightarrow$ Gold)
*   **Why Chosen**: Standardizing on the Medallion pattern keeps data pipelines structured. If a transformation error is detected, the raw data remains safe in the Bronze layer; the pipeline can simply be re-run with zero external API/CSV fetch overhead.

---

## 5. Architecture — Layer-by-Layer Pipeline Flow

### Layer 1: Data Ingestion (Bronze Layer)
*   **Stored Procedure**: `bronze.load_bronze` ([proc_load_bronze.sql](file:///d:/Resume%20Projects/sql-data-warehouse-analytics-project/scripts/bronze/proc_load_bronze.sql))
*   **Pattern**: Full Reload (Truncate & Load). Staging tables are truncated on every execution run. This ensures that the staging database does not grow infinitely and guarantees that only active source file data is held.
*   **Performance Optimization**: Uses SQL Server's native `BULK INSERT` command combined with the `TABLOCK` hint:
    ```sql
    BULK INSERT bronze.crm_cust_info
    FROM 'D:\...\datasets\source_crm\cust_info.csv'
    WITH (
        FIRSTROW = 2,
        FIELDTERMINATOR = ',',
        TABLOCK
    );
    ```
    *   **The `TABLOCK` Secret**: In SQL Server, the `TABLOCK` hint specifies that a table-level lock is acquired for the duration of the bulk insert. This enables **minimal logging** (saving transaction log space and disk writes) and allows the engine to insert data in parallel, speeding up load times by up to $10\times$ compared to standard row-by-row inserts.
*   **Error Auditing**: Implements a global `TRY...CATCH` block. On exception, it rollback active transactions and prints out specific error details: `ERROR_MESSAGE()`, `ERROR_NUMBER()`, and `ERROR_STATE()`.

### Layer 2: Cleanse & Standardize (Silver Layer)
*   **Stored Procedure**: `silver.load_silver` ([proc_load_silver.sql](file:///d:/Resume%20Projects/sql-data-warehouse-analytics-project/scripts/silver/proc_load_silver.sql))
*   **Pattern**: Row-Level Cleansing and Normalization. Extracted raw text fields from Bronze are cast into structured types (integers, dates, decimals), trimmed of whitespace, and standardized.
*   **Execution**: Full batch transformation that truncates `silver` tables and repopulates them with standardized datasets.

### Layer 3: Dimensional Modeling (Gold Layer)
*   **Views Creation**: `scripts/gold/ddl_gold.sql` ([ddl_gold.sql](file:///d:/Resume%20Projects/sql-data-warehouse-analytics-project/scripts/gold/ddl_gold.sql))
*   **Pattern**: Star Schema (Fact and Dimension views). Rather than storing the Gold layer as physical tables, it is exposed as relational views.
*   **Why Views over Tables**: In an analytics warehouse, views ensure that **computations are dynamic and real-time**. When a new record is added to the Silver layer, the Gold views reflect the update instantly without running a separate synchronization job. It saves storage overhead and simplifies schema migrations.

---

## 6. Cleaning & Transformation Deep-Dive

This section outlines the specific SQL patterns used inside `silver.load_silver` to resolve messy data.

### 1. Customer Record Deduplication
The CRM table `bronze.crm_cust_info` contained multiple records for individual customers (e.g., updated address files or multiple registration attempts). We isolate the single most recent record using a window partition:
```sql
SELECT cst_id, cst_key, TRIM(cst_firstname), ...
FROM (
    SELECT *,
        ROW_NUMBER() OVER (PARTITION BY cst_id ORDER BY cst_create_date DESC) AS flag_last
    FROM bronze.crm_cust_info
    WHERE cst_id IS NOT NULL
) t
WHERE flag_last = 1;
```
*   **Interviewer Insight**: We partition by `cst_id` and order by `cst_create_date DESC`. The query assigns `1` to the most recent record. Filtering on `flag_last = 1` filters out all historical duplicates, guaranteeing that customer dimensions hold unique, active profiles.

### 2. Slowly Changing Dimensions (SCD Type 2) in Products
Product records (`bronze.crm_prd_info`) can change prices or lines over time. Instead of overwriting historical records (SCD Type 1) or duplicating them, the pipeline builds Type 2 historical intervals using the `LEAD()` analytical window function:
```sql
SELECT
    prd_id,
    prd_nm,
    CAST(prd_start_dt AS DATE) AS prd_start_dt,
    CAST(
        LEAD(prd_start_dt) OVER (PARTITION BY prd_key ORDER BY prd_start_dt) - 1 
        AS DATE
    ) AS prd_end_dt
FROM bronze.crm_prd_info;
```
*   **The Logic Explained**: `LEAD(prd_start_dt)` retrieves the start date of the *next* version of that product. By subtracting 1 day (`- 1`), we set the current version's `prd_end_dt` to exactly one day before the next one starts. If no next version exists, `LEAD()` returns `NULL`, signifying that the record is the currently active catalog version.

### 3. Key Alignment & Prefix Stripping
ERP keys in `bronze.erp_cust_az12` were stored with a `"NAS"` prefix (e.g. `NAS11005`), whereas the CRM system stored customer IDs as plain integers (e.g. `11005`). Direct joins between these tables would fail. The pipeline cleans this key format mismatch using a conditional substring replacement:
```sql
CASE
    WHEN cid LIKE 'NAS%' THEN SUBSTRING(cid, 4, LEN(cid))
    ELSE cid
END AS cid
```
*   **Interviewer Insight**: By checking if the ID starts with `'NAS'`, we extract the string starting at character 4 to the end, converting `"NAS11005"` into `"11005"`. This aligns the keys and enables seamless joins between ERP location files and CRM sales facts.

### 4. Categorical Mapping & Standardization
*   **Marital Status**: CRM records contained shortcodes like `'S'` and `'M'`. These are normalized using a `CASE` block to `'Single'` and `'Married'`, with a catch-all mapping other values to `'n/a'`.
*   **Gender**: Standardizes variations like `'M'`, `'Male'`, `'F'`, `'Female'` into clear, readable categories:
    ```sql
    CASE 
        WHEN UPPER(TRIM(cst_gndr)) = 'F' THEN 'Female'
        WHEN UPPER(TRIM(cst_gndr)) = 'M' THEN 'Male'
        ELSE 'n/a'
    END AS cst_gndr
    ```
*   **Country Code Lookup**: Standardizes inconsistent geographic entries in the location table (e.g. mapping `'DE'` to `'Germany'`, and both `'US'` and `'USA'` to `'United States'`).

### 5. Sales Arithmetic & Price Recalculation
In the transaction table, raw logs occasionally had empty sales values or math mismatches. The pipeline uses conditional logic to auto-derive correct values:
*   **Sales Amount Correction**: If `sales_amount` is missing, negative, or does not equal `quantity * unit_price`, it is recalculated as `quantity * ABS(price)`.
*   **Unit Price Derivation**: If unit price is missing or invalid, it is back-calculated via `sales_amount / NULLIF(quantity, 0)`.
    > [!IMPORTANT]
    > The use of `NULLIF(quantity, 0)` is a critical database safety guard. If quantity is 0, `NULLIF` turns the denominator into `NULL`, causing the division to return `NULL` instead of throwing a runtime "divide by zero" exception.

---

## 7. Analytics & BI Reporting Layer

With data structured in the Gold layer, the repository provides 13 analytical scripts (`scripts/analytics/`) evaluating business metrics.

### Customer Reporting View (`gold.report_customers`)
This view ([12_report_customers.sql](file:///d:/Resume%20Projects/sql-data-warehouse-analytics-project/scripts/analytics/12_report_customers.sql)) compiles customer behavioral KPIs:
*   **Recency**: Months since last order (`DATEDIFF(month, last_order_date, GETDATE())`).
*   **Lifespan**: Total duration in months between customer's first and last order.
*   **Average Order Value (AOV)**: Total sales divided by total order count.
*   **Average Monthly Spend**: Total spend divided by lifespan in months (falling back to total sales if lifespan is 0).
*   **Demographic Age Groups**: Segments customers into age bands (`'Under 20'`, `'20-29'`, `'30-39'`, etc.) based on calculated age.
*   **Value Segmentation**: Segments customers based on loyalty metrics:
    *   `'VIP'`: Lifespan $\ge 12$ months AND total sales $> \$5,000$.
    *   `'Regular'`: Lifespan $\ge 12$ months AND total sales $\le \$5,000$.
    *   `'New'`: Lifespan $< 12$ months.

### Product Reporting View (`gold.report_products`)
This view ([13_report_products.sql](file:///d:/Resume%20Projects/sql-data-warehouse-analytics-project/scripts/analytics/13_report_products.sql)) exposes product metrics:
*   **Product Performance Segments**:
    *   `'High-Performer'`: Total sales $> \$50,000$.
    *   `'Mid-Range'`: Total sales between $\$10,000$ and $\$50,000$.
    *   `'Low-Performer'`: Total sales $< \$10,000$.
*   **Financial Indicators**: Measures total orders, sales quantity, unique customer reach, cost margins, average selling price, and monthly run rate.

### Advanced CTE Analytical Scripts
*   **Year-over-Year (YoY) Product Benchmarking** (`09_performance_analysis.sql`): Uses `LAG()` window partitions to compare a product's current year sales against its previous year's sales:
    ```sql
    LAG(current_sales) OVER (PARTITION BY product_name ORDER BY order_year) AS py_sales
    ```
    It flags performance status as `'Increase'` or `'Decrease'` relative to the prior period.
*   **Cumulative Sales & Running Totals** (`08_cumulative_analysis.sql`): Computes running totals over time using cumulative sum windowing:
    ```sql
    SUM(sales_amount) OVER (ORDER BY order_date ROWS UNBOUNDED PRECEDING) AS cumulative_sales
    ```
*   **Dense Ranking & Category Lead** (`06_ranking_analysis.sql`): Employs `DENSE_RANK() OVER (PARTITION BY category ORDER BY total_sales DESC)` to rank products within their respective categories without skipping ranks for ties.

---

## 8. Design Principles & Patterns

1.  **Medallion Storage Separation**: Keeps staging and transformation separate. Raw data is loaded into `bronze` tables directly, transformations clean data into `silver` tables, and modeling views expose the structured `gold` schema.
2.  **Surrogate Key Strategy**: Dimension tables in the Gold layer utilize generated surrogate keys (`customer_key`, `product_key`) rather than relying on natural business keys (`customer_id`, `product_id`). This insulates the warehouse model from upstream key modifications or schema updates in the transactional source systems.
3.  **Idempotency**: Stored procedures are designed to run repeatedly without duplicate side effects. Staging tables are truncated before loading, and Silver updates overwrite target rows rather than appending duplicate datasets.
4.  **Transaction Safety (ACID)**: Insert operations are protected within structured `BEGIN TRANSACTION...COMMIT` structures. If an error is caught in the `TRY` block, the `CATCH` block rolls back changes, preserving data integrity.
5.  **Schema views for flexibility**: Gold layer outputs are exposed as database views. This avoids unnecessary physical database duplication, allows real-time updates from Silver tables, and simplifies column modification.

---

## 9. Trade-offs & Alternative Approaches

| Architectural Decision | Chosen Strategy | Alternative Option | Engineering Rationale & Trade-off |
| :--- | :--- | :--- | :--- |
| **ETL Orchestration** | Stored Procedures | dbt (Data Build Tool) | Stored procedures compile and run natively within SQL Server with zero external infrastructure overhead. However, dbt would provide better version control, lineage tracking, and test integration. |
| **Gold Layer Storage** | Database Views | Physical Tables (`CREATE TABLE`) | Views provide real-time updates and consume zero disk storage. The trade-off is computational overhead; dynamic joins are computed on-the-fly, which can degrade read performance at extreme scale. |
| **Ingestion Engine** | Native `BULK INSERT` | Python / SSIS Packages | `BULK INSERT` with `TABLOCK` minimizes transaction logging and runs extremely fast. SSIS packages or Python loaders would offer advanced API connectivity but add orchestration complexity. |
| **Historization** | Slowly Changing Dimension Type 2 | Slowly Changing Dimension Type 1 | SCD Type 2 preserves historical sales contexts by mapping transactions to correct prices during that time interval. The trade-off is table complexity compared to simple Type 1 overwrites. |

---

## 10. What Was Learnt

1.  **Analytical SQL Mastery**: Leveraging advanced window functions (`LEAD()`, `LAG()`, `ROW_NUMBER()`, `DENSE_RANK()`) to perform complex data deduplication, date partitioning, and cohort tracking.
2.  **Master Data Reconciliation**: Resolving differences in schema structures, primary key values (prefixed vs numeric), and casing styles across separate CRM and ERP platforms.
3.  **Bulk Loading Performance**: Understanding the role of `TABLOCK` hints in reducing transaction log allocations and enabling parallel loads.
4.  **Data Warehouse Normalization**: Designing star schemas (dimensions and facts) with surrogate keys to isolate analytics models from source changes.
5.  **Real-world Data Quality Handling**: Handling division-by-zero errors (`NULLIF`), invalid dates, future birthdates, and whitespace issues within automated T-SQL scripts.

---

## 11. Enterprise Scaling & Future Roadmap

To scale this warehouse layout for large enterprise operations, the following roadmap is proposed:

```
                            [ Existing Pipeline ]
                                      │
                                      ▼
                        [ Phase 1: Performance Tuning ]
                         - Add Clustered Indexing
                         - Materialize Gold Views as Tables
                                      │
                                      ▼
                        [ Phase 2: Orchestration (dbt) ]
                         - Move SQL code to dbt models
                         - Define Data Tests & Assertions
                                      │
                                      ▼
                      [ Phase 3: Cloud Scale Architecture ]
                         - Store CSVs in Cloud Buckets (S3/ADLS)
                         - Process using Snowflake / Databricks
```

*   **Clustered Indexes & Index Optimization**: Create clustered columnstore indexes on `fact_sales` and indexes on surrogate join keys to speed up reporting queries.
*   **Materialization of Gold Tables**: Convert Gold views into physical tables populated by incremental load tasks to avoid on-the-fly execution overhead.
*   **Migration to dbt (Data Build Tool)**: Migrate T-SQL stored procedures to dbt models for version control, automated documentation, and code testing.
*   **Cloud Data Platform Migration**: Port the T-SQL logic to Snowflake, Databricks, or Google BigQuery. CSV files would be stored in object stores (like AWS S3 or Azure ADLS) and ingested via cloud copy pipelines, enabling processing of billions of records.

---

## 12. Interview Walkthrough Guide

### Opening Pitch (30 seconds)
> "I built an end-to-end SQL Data Warehouse and Business Intelligence Analytics project that ingests raw, messy ERP and CRM data files, cleanses and standardizes them using T-SQL stored procedures, and structures them into a query-optimized Gold Star Schema. The pipeline implements slowly changing dimensions (SCD Type 2), duplicates resolution using partition window functions, and bulk inserts optimized with lock hints, providing business analysts with views mapping customer cohort lifetime metrics and product profit margins."

### Architecture Walkthrough (2 minutes)
Walk the interviewer through the three Medallion tiers:
1.  **Bronze (Ingestion)**: Native `BULK INSERT` with `TABLOCK` locks for speed and transaction log savings.
2.  **Silver (Cleansing)**: Explain stripping the `"NAS"` prefix on customer IDs to align ERP and CRM systems, standardizing gender/marital codes, and calculating product pricing history windows using `LEAD()`.
3.  **Gold (Star Schema)**: Creating surrogate-keyed dimension views (`dim_customers`, `dim_products`) and connecting them to transaction facts (`fact_sales`).
4.  **Reporting Views**: Highlight using CTEs, window functions, and business cohort logic to segment customer profiles (VIP, Regular, New) and rank product gross margins.

### Critical Interview Q&As

**Q: Why did you expose the Gold layer as Views instead of Tables?**
> "Exposing the Gold layer as views is a lightweight approach. It ensures that when new records are processed in the Silver layer, the BI views update dynamically without requiring a separate sync step. It also avoids physical storage duplication. At larger scale, I would convert these to materialized tables or indexed views to avoid query execution overhead."

**Q: Explain how you implemented Slowly Changing Dimensions (SCD Type 2) in the SQL code.**
> "In the Silver product loading process, I used the `LEAD()` window function partitioned by product key and ordered by start date. `LEAD()` fetches the next version's start date, and subtracting one day gives us the `prd_end_dt` for the current version. If there is no next version, `LEAD()` returns `NULL`, marking the product record as active."

**Q: How did you handle duplicate customer records in the source data?**
> "I used a subquery with the `ROW_NUMBER()` window function, partitioning by customer ID and ordering by create date descending. This assigned an index of `1` to the most recent record. In the outer query, I filtered for rows where this index equaled `1`, discarding older duplicate entries."

**Q: How would you scale this pipeline if data volume grew 100x?**
> "To scale by $100\times$, I would: first, replace SQL Server Express with a cloud-native database like Snowflake or BigQuery; second, replace T-SQL stored procedures with dbt to run transformations in parallel; and third, migrate from views to physical tables featuring Clustered Columnstore Indexes on the sales facts to optimize join queries."

---

## Project Structure Reference

```
sql-data-warehouse-analytics-project/
├── datasets/                            # Project dataset storage
│   ├── source_crm/                      # Raw CRM CSV files (cust_info, prd_info, sales_details)
│   ├── source_erp/                      # Raw ERP CSV files (cust_az12, loc_a101, px_cat_g1v2)
│   ├── gold_flat_files/                 # Flat-file exports of the final Gold layer
│   └── database_backups/                # SQL Server database backups (.bak)
├── docs/                                # Technical documentation and assets
│   ├── architecture.md                  # Premium pipeline architecture documentation
│   ├── data_catalog.md                  # Detailed definitions of dimension/fact fields
│   ├── naming_conventions.md            # Database & coding naming standards
│   ├── data_architecture.png            # Visual architecture diagram
│   ├── data_flow.png                    # Data flow mapping
│   ├── data_model.png                   # Star schema entity-relationship diagram
│   ├── ETL.png                          # ETL execution pipeline diagram
│   └── Project Roadmap.png              # Analytics implementation stages
├── scripts/                             # Database & ETL scripts
│   ├── init_database.sql                # Setup database and schemas (bronze, silver, gold)
│   ├── bronze/                          # Bronze layer creation and load stored procedures
│   │   ├── ddl_bronze.sql               # Bronze table DDL
│   │   └── proc_load_bronze.sql         # Bulk insert procedure with TABLOCK
│   ├── silver/                          # Silver layer cleaning and load stored procedures
│   │   ├── ddl_silver.sql               # Silver table DDL
│   │   └── proc_load_silver.sql         # Transform, cleanse, and SCD Type 2 logic
│   ├── gold/                            # Gold layer dimension and fact views
│   │   └── ddl_gold.sql                 # Dimension & fact views (surrogate keys)
│   └── analytics/                       # Analytics and BI reporting queries
│       ├── 01_database_exploration.sql  # Row counts and exploration queries
│       ├── ...                          # exploration scripts 02 - 11
│       ├── 12_report_customers.sql      # Customer cohort and RFM metrics view
│       └── 13_report_products.sql       # Product profit margin analytics view
└── tests/                               # Automated data quality checks
    ├── quality_checks_silver.sql        # Silver constraints and key validation
    └── quality_checks_gold.sql          # Gold integrity and join coverage tests
```
