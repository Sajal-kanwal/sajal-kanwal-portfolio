# Airbnb End-to-End Data Engineering Pipeline — Exhaustive Project Deep-Dive

> A comprehensive reference covering every architectural decision, technology choice, trade-off, and interview talking point for the Airbnb Snowflake & dbt Data Engineering project.

---

## Table of Contents

1. [Project Purpose & Motivation](#1-project-purpose--motivation)
2. [Problem Statement](#2-problem-statement)
3. [Data Landscape & Medallion Architecture](#3-data-landscape--medallion-architecture)
4. [Technology Stack — Every Choice Explained](#4-technology-stack--every-choice-explained)
5. [Core ETL & Ingestion Flow](#5-core-etl--ingestion-flow)
6. [dbt Transformation Layer Deep-Dive](#6-dbt-transformation-layer-deep-dive)
7. [Slowly Changing Dimensions (SCD Type 2) Snapshots](#7-slowly-changing-dimensions-scd-type-2-snapshots)
8. [Data Quality & Testing Strategy](#8-data-quality--testing-strategy)
9. [Design Principles & Trade-offs](#9-design-principles--trade-offs)
10. [What Was Learnt](#10-what-was-learnt)
11. [Enterprise Scaling & Future Roadmap](#11-enterprise-scaling--future-roadmap)
12. [Interview Walkthrough Guide](#12-interview-walkthrough-guide)

---

## 1. Project Purpose & Motivation

### Why This Project Was Built

This project was built to demonstrate **modern, cloud-native data engineering** practices using the industry standard stack: **AWS S3, Snowflake, and dbt (Data Build Tool)**. It provides a production-grade blueprint for transforming raw, transactional business records into analytics-ready datasets. Specifically, this project demonstrates:

*   **Cloud Data Warehousing**: Leveraging Snowflake's decoupled storage/compute architecture and S3 stages for scalable data ingestion.
*   **Modern Analytics Engineering (dbt)**: Using dbt Core to manage the lifecycle of SQL transformations, compilation, testing, and deployment.
*   **Medallion Architecture Implementation**: Designing a structured database layout (Bronze $\rightarrow$ Silver $\rightarrow$ Gold) within a cloud warehouse to isolate concerns and guarantee data quality.
*   **Advanced Jinja & Meta-Programming**: Writing dynamic, reusable SQL models utilizing dbt config macros and Jinja loops to dramatically reduce code redundancy (DRY principle).
*   **SCD Type 2 Historization**: Building timestamp-based snapshot pipelines to capture historical state changes in listings and hosts over time.
*   **Incremental Data Loading**: Implementing optimized incremental models in dbt to process only new or updated records, safeguarding cloud compute budgets.

### What Problem It Solves

Siloed transactional data (such as Airbnb property listings, host profiles, and customer bookings) is prone to format drifting, historical state overwrites, and scale issues. When analysts or ML models query this data directly, they face challenges:
1.  **State Loss**: If a host becomes a "Superhost" or a listing changes its "price per night," standard systems overwrite the old value. Historical reports querying previous months will produce inaccurate revenue or performance metrics.
2.  **Messy Data**: String fields contain whitespaces, casing differences, or incorrect symbols, and booking values are not computed at the database level.
3.  **Compute Bottlenecks**: Full-reload pipelines become extremely slow and expensive as volumes grow to millions of rows.

This project solves these issues by establishing a staging area using AWS S3 and Snowflake external stages, processing updates incrementally via dbt, tracking historical attribute drift through snapshots, and combining data into a consolidated, denormalized Gold reporting layer.

---

## 2. Problem Statement

### Raw Data Inputs

The pipeline processes three transactional CSV datasets (`SourceData/`) representing core Airbnb business components:

1.  **`bookings.csv`** — Booking transactions:
    *   `booking_id` (string), `listing_id` (numeric), `booking_date` (timestamp), `nights_booked` (numeric), `booking_amount` (numeric), `cleaning_fee` (numeric), `service_fee` (numeric), `booking_status` (string), `created_at` (timestamp).
2.  **`hosts.csv`** — Host profile data:
    *   `host_id` (numeric), `host_name` (string), `host_since` (date), `is_superhost` (boolean), `response_rate` (numeric), `created_at` (timestamp).
3.  **`listings.csv`** — Airbnb property listing details:
    *   `listing_id` (numeric), `host_id` (numeric), `property_type` (string), `room_type` (string), `city` (string), `country` (string), `accommodates` (numeric), `bedrooms` (numeric), `bathrooms` (numeric), `price_per_night` (numeric), `created_at` (timestamp).

### Pipeline Outputs

*   **Bronze Schema**: Raw staging tables in Snowflake with incremental constraints.
*   **Silver Schema**: Standardized tables featuring:
    *   Underscore-normalized host names (replacing spaces).
    *   Response rate quality classifications (`VERY GOOD`, `GOOD`, `FAIR`, `POOR`).
    *   Total booking amount calculated dynamically via macro multiplication.
    *   Price tags (`low`, `medium`, `high`) computed at the row level.
*   **Gold Schema**:
    *   `obt` (One Big Table) — Fully denormalized reporting flat table joining bookings, listings, and hosts.
    *   `fact` — Enriched analytical table dynamically joined with snapshot dimensions.
*   **SCD Type 2 Dimensions**:
    *   `dim_bookings`, `dim_hosts`, `dim_listings` — Snapshotted tables tracking historical updates.

---

## 3. Data Landscape & Medallion Architecture

The project segregates schemas within Snowflake using dbt to keep the pipeline clean and traceable.

```
                      +-------------------------------+
                      |   Source Data (S3 CSVs)       |
                      |  - Bookings, Listings, Hosts  |
                      +-------------------------------+
                                      │
                                      ▼ (Snowflake COPY INTO Stage)
+─────────────────────────────────────────────────────────────────────────────+
│ Snowflake Cloud Data Warehouse                                              │
│                                                                             │
│   +─────────────────────────────────────────────────────────────────────+   │
│   │ staging Schema (Raw External Ingestion Tables)                      │   │
│   │ - HOSTS, LISTINGS, BOOKINGS                                         │   │
│   +─────────────────────────────────────────────────────────────────────+   │
│                                      │                                      │
│                                      ▼ (dbt run --select bronze.*)          │
│   +─────────────────────────────────────────────────────────────────────+   │
│   │ bronze Schema (Raw Append-Only Tables)                              │   │
│   │ - bronze_bookings, bronze_hosts, bronze_listings                    │   │
│   +─────────────────────────────────────────────────────────────────────+   │
│                                      │                                      │
│                                      ▼ (dbt run --select silver.*)          │
│   +─────────────────────────────────────────────────────────────────────+   │
│   │ silver Schema (Cleaned & Standardized Tables)                       │   │
│   │ - silver_bookings, silver_hosts, silver_listings                    │   │
│   +─────────────────────────────────────────────────────────────────────+   │
│                                      │                                      │
│                                      ▼ (dbt run --select gold.obt)          │
│   +─────────────────────────────────────────────────────────────────────+   │
│   │ gold Schema (One Big Table View)                                    │   │
│   │ - obt (Flat reporting layer joining all Silver models)              │   │
│   +─────────────────────────────────────────────────────────────────────+   │
│                                      │                                      │
│                            ┌─────────┴─────────┐                            │
│                            ▼ (dbt ephemeral)   ▼ (dbt snapshot)             │
│   +───────────────────────────────+   +─────────────────────────────────+   │
│   │ gold.ephemeral (dbt CTEs)     │   │ gold (SCD Type 2 Snapshots)     │   │
│   │ - bookings, hosts, listings   │   │ - dim_bookings, dim_hosts,      │   │
│   │   (selects subset from obt)   │   │   dim_listings                  │   │
│   +───────────────────────────────+   +─────────────────────────────────+   │
│                            │                           │                    │
│                            └─────────┬─────────────────┘                    │
│                                      ▼ (dbt run --select gold.fact)         │
│   +─────────────────────────────────────────────────────────────────────+   │
│   │ gold Schema (Final Fact Layer)                                      │   │
│   │ - fact (Fact view dynamically joined to snapshots)                  │   │
│   +─────────────────────────────────────────────────────────────────────+   │
+─────────────────────────────────────────────────────────────────────────────+
```

---

## 4. Technology Stack — Every Choice Explained

### Snowflake Cloud Data Warehouse
*   **Why Chosen**: Snowflake is the premier cloud data warehouse. It separates **storage and compute**, meaning you can scale data storage up to petabytes cheaply while running compute warehouses on-demand, charging only for the seconds used. Features like **Auto-Suspend** (automatically shutting down virtual warehouses when not in use) and **Zero-Copy Cloning** make it ideal for cost-efficient data pipelines.
*   **Why not PostgreSQL**: PostgreSQL is a transactional (OLTP) database. It stores data in rows, which is slow for analytical queries (OLAP) joining millions of transactions. Snowflake stores data in **columnar format**, optimizing aggregate reads (e.g. calculating average booking amounts across years).
*   **Why not AWS Redshift**: Redshift requires active cluster management and sizing. Snowflake is fully serverless and zero-management, scaling resources up or down dynamically.

### dbt (Data Build Tool)
*   **Why Chosen**: dbt has revolutionized data engineering by bringing software engineering best practices (version control, modularity, automated testing, documentation) to SQL. Instead of writing long, complex stored procedures with fragile execution orders, dbt allows engineers to write modular `SELECT` models. dbt automatically compiles the code, tracks the dependency lineage graph, and runs models in the correct order.
*   **Key Features Used**: Incremental materializations, Jinja loops for dynamic SQL creation, and snapshot engines for SCD Type 2.

### AWS S3 (Simple Storage Service)
*   **Why Chosen**: Secure, durable object storage serving as the landing zone for raw transaction CSVs. S3 stages allow Snowflake to bulk load data natively using parallel S3 API streams.

### Python & uv Package Manager
*   **Why Chosen**: Python handles development environments. `uv` is a Rust-based Python package resolver used to install `dbt-core` and `dbt-snowflake` packages up to $10\times$ faster than standard pip.

---

## 5. Core ETL & Ingestion Flow

The pipeline ingests data through Snowflake files and stages before transforming it with dbt.

### Step 1: File Format & Stage Creation
The DDL scripts define a standardized CSV file format and configure a staging pointer mapping S3 storage:
```sql
CREATE OR REPLACE FILE FORMAT csv_format
  TYPE = 'CSV' 
  FIELD_DELIMITER = ','
  SKIP_HEADER = 1
  ERROR_ON_COLUMN_COUNT_MISMATCH = FALSE;

CREATE OR REPLACE STAGE snowstage
  FILE_FORMAT = csv_format
  URL='s3://airbnb-raw-landing-zone/';
```

### Step 2: Parallel Copy Operations
To populate the staging schema with minimal write times, Snowflake uses S3-parallel copy commands:
```sql
COPY INTO staging.bookings
FROM @snowstage
FILES=('bookings.csv')
CREDENTIALS=(aws_key_id = 'xxxx', aws_secret_key = 'xxxx');
```
*   **Interviewer Insight**: By referencing `@snowstage`, Snowflake splits the ingestion workload across multiple compute threads, loading data concurrently.

---

## 6. dbt Transformation Layer Deep-Dive

This section covers the T-SQL/Snowflake patterns utilized within the dbt project.

### 1. Incremental Ingestion (Bronze Layer)
To optimize warehouse compute costs, Bronze models are configured as **incremental**. During the initial run, they perform a full table scan. In subsequent runs, they process only new records:
```sql
{{ config(materialized='incremental') }}

SELECT * FROM {{ source('staging', 'bookings') }}

{% if is_incremental() %}
    WHERE CREATED_AT > (SELECT COALESCE(MAX(CREATED_AT), '1900-01-01') FROM {{ this }})
{% endif %}
```
*   **How it works**: The `is_incremental()` macro checks if the target table already exists in Snowflake. If it does, dbt compiles the `WHERE` clause, comparing the raw table's timestamps against the maximum timestamp already loaded in the warehouse (`{{ this }}`). This reduces the volume of data scanned by up to $99\%$.

### 2. Standardizing & Custom Macros (Silver Layer)
The Silver layer cleanses fields and implements reusable macro structures.
*   **Spaces-to-Underscores Mapping** (`silver_hosts.sql`):
    ```sql
    REPLACE(HOST_NAME, ' ', '_') AS HOST_NAME
    ```
*   **Custom Multiplication Macro** (`silver_bookings.sql`): Calculates booking values using a custom rounding macro:
    ```sql
    {{ multiply('NIGHTS_BOOKED', 'BOOKING_AMOUNT', 2) }} AS TOTAL_AMOUNT
    ```
    *   *Definition* (`macros/multiply.sql`):
        ```sql
        {% macro multiply(x, y, precision) %}
            round({{x}} * {{y}}, {{precision}})
        {% endmacro %}
        ```
*   **Dynamic Price Tagging Macro** (`silver_listings.sql`): Categorizes listing prices using a custom macro to standardize classification rules:
    ```sql
    {{ tag('CAST(PRICE_PER_NIGHT AS INT)') }} AS PRICE_PER_NIGHT_TAG
    ```
    *   *Definition* (`macros/tag.sql`):
        ```sql
        {% macro tag(col) %}
            CASE 
                WHEN {{ col }} < 100 THEN 'low'
                WHEN {{ col }} < 200 THEN 'medium'
                ELSE 'high'
            END
        {% endmacro %}
        ```

### 3. Jinja-Driven Joins (Gold Layer - OBT & Fact)
Writing manual `LEFT JOIN` structures for large tables is tedious and error-prone. The Gold models (`obt.sql` and `fact.sql`) use Jinja loops to dynamically construct the SELECT list and join conditions from a centralized configuration list:
```sql
{% set configs = [
    {
        "table" : "AIRBNB.SILVER.SILVER_BOOKINGS",
        "columns" : "SILVER_bookings.*",
        "alias" : "SILVER_bookings"
    },
    { 
        "table" : "AIRBNB.SILVER.SILVER_LISTINGS",
        "columns" : "SILVER_listings.HOST_ID, ...",
        "alias" : "SILVER_listings",
        "join_condition" : "SILVER_bookings.listing_id = SILVER_listings.listing_id"
    },
    {
        "table" : "AIRBNB.SILVER.SILVER_HOSTS",
        "columns" : "SILVER_hosts.HOST_NAME, ...",
        "alias" : "SILVER_hosts",
        "join_condition" : "SILVER_listings.host_id = SILVER_hosts.host_id"
    }
] %}

SELECT 
    {% for config in configs %}
        {{ config['columns'] }}{% if not loop.last %},{% endif %}
    {% endfor %}
FROM
    {% for config in configs %}
    {% if loop.first %}
        {{ config['table'] }} AS {{ config['alias'] }}
    {% else %}
        LEFT JOIN {{ config['table'] }} AS {{ config['alias'] }}
        ON {{ config['join_condition'] }}
    {% endif %}
    {% endfor %}
```
*   **Interviewer Insight**: This pattern makes adding columns or joining additional tables highly maintainable. Instead of altering raw SQL, an engineer simply adds a new key-value pair to the Jinja config list. dbt dynamically loops through the list to compile the SELECT list and corresponding JOIN clauses.

---

## 7. Slowly Changing Dimensions (SCD Type 2) Snapshots

To track changes to property details (e.g. price per night) or host profiles (e.g. superhost status), the pipeline implements **dbt Snapshots** (`snapshots/`).

```
                              [ Source Data ]
                             (Host ID: 5, Superhost: False)
                                     │
                                     ▼ (dbt snapshot)
                        +──────────────────────────+
                        |   dim_hosts Snapshot     |
                        |   dbt_valid_from: T1     |
                        |   dbt_valid_to: 9999     |
                        +──────────────────────────+
                                     │
                             (Update Occurs)
                             (Host ID: 5, Superhost: True)
                                     │
                                     ▼ (dbt snapshot)
             ┌───────────────────────┴───────────────────────┐
             ▼ (Historical Record Close)                     ▼ (New Active Record Open)
    +──────────────────────────+                    +──────────────────────────+
    |   dim_hosts Snapshot     |                    |   dim_hosts Snapshot     |
    |   dbt_valid_from: T1     |                    |   dbt_valid_from: T2     |
    |   dbt_valid_to: T2       |                    |   dbt_valid_to: 9999     |
    +──────────────────────────+                    +──────────────────────────+
```

### Snapshot Configuration (`snapshots/dim_listings.yml`)
```yaml
snapshots:
    - name: dim_listings
      relation: ref('listings') # Reference to the ephemeral model (listings)
      config:
        schema: gold
        database: AIRBNB
        unique_key: LISTING_ID
        strategy: timestamp
        updated_at: LISTING_CREATED_AT
        dbt_valid_to_current: "to_date('9999-12-31')"
```

*   **How it works**: dbt creates a snapshot table containing technical columns: `dbt_scd_id`, `dbt_updated_at`, `dbt_valid_from`, and `dbt_valid_to`.
    *   When dbt runs the snapshot, it compares the `updated_at` timestamp.
    *   If a row has changed, it sets the old record's `dbt_valid_to` date to the current timestamp and inserts a new row with `dbt_valid_from` set to the current timestamp and `dbt_valid_to` set to `9999-12-31` (representing active).
    *   This provides analysts with a complete history of listing attributes, allowing them to verify listing prices at any specific point in time.

---

## 8. Data Quality & Testing Strategy

The pipeline implements automated testing to validate schema structure and data quality.

### 1. Generic Tests (`sources.yml`)
Generic tests validate column parameters on every model execution:
*   `unique`: Verifies that key fields (like `booking_id`) contain zero duplicates.
*   `not_null`: Ensures critical fields (like `listing_id`) do not contain blank or null records.
*   `relationships`: Asserts referential integrity (e.g., verifying that `listing_id` in bookings exists in the listings table).

### 2. Custom Singular Tests (`tests/source_tests.sql`)
Singular tests define custom business validation rules. In this project, `tests/source_tests.sql` checks for booking pricing anomalies:
```sql
{{ config(severity='warn') }}

SELECT 
    1
FROM 
    {{ source('staging','bookings') }}
WHERE 
    BOOKING_AMOUNT < 200
```
*   **Interviewer Insight**: This query looks for bookings under \$200, which might indicate pricing errors or system bugs. If any matching rows are found, the test returns a warning alert during `dbt test`, allowing engineers to review the anomalous records.

---

## 9. Design Principles & Trade-offs

1.  **Ephemerals for Intermediate Logic**: Ephemeral models (`gold/ephemeral/`) are compiled as CTEs inside the snapshot source queries. This keeps the database clean by avoiding staging table clutter while preserving clean code modularity.
2.  **Custom Schema Routing**: Overrides dbt's default schema generation using a custom `generate_schema_name` macro. Rather than outputting schema names with developer prefixes (e.g. `dev_bronze`), it puts bronze models directly in `BRONZE`, silver in `SILVER`, and gold/snapshots in `GOLD`, keeping production schemas clean.
3.  **ELT Paradigm**: Extracts and loads raw CSV files directly into Snowflake staging tables before executing transformations in-warehouse. This leverages Snowflake's compute engine, which is much faster than executing processing jobs on external Python/Spark servers.

### Trade-offs: Incremental Loading vs. Full Table Refreshes
*   **Incremental Loading (Chosen)**: Significantly reduces run times and costs for large tables by only loading changed records. The trade-off is pipeline complexity; if schema structures change, a `--full-refresh` flag must be passed to rebuild tables.
*   **Full Refreshes (Alternative)**: Simpler to implement but becomes slow and expensive as tables grow, requiring full reads and writes of the entire dataset on every execution.

---

## 10. What Was Learnt

1.  **Snowflake Optimization**: Designing cloud schemas that leverage Snowflake's decoupled storage/compute structure and parallel S3 load stages.
2.  **dbt Lifecycle Management**: Implementing the full dbt lifecycle, including models compilation, testing, documentation rendering, and snapshots management.
3.  **Dynamic SQL Generation**: Leveraging Jinja and dbt macros to write dynamic, reusable transformation models.
4.  **Point-in-Time Analytical Consistency**: Tracking historical record changes using Slowly Changing Dimensions (SCD Type 2) to maintain clean historical reports.
5.  **Compute Cost Governance**: Implementing incremental load strategies in dbt to minimize data scans and reduce Snowflake compute costs.

---

## 11. Enterprise Scaling & Future Roadmap

To scale this pipeline for a production environment, the following roadmap is proposed:

```
                            [ Existing Pipeline ]
                                      │
                                      ▼
                        [ Phase 1: CI/CD Pipeline ]
                         - GitHub Actions Integration
                         - Run dbt build on Pull Requests
                                      │
                                      ▼
                        [ Phase 2: Orchestration ]
                         - Orchestrate via Apache Airflow
                         - Schedule dbt runs and S3 copies
                                      │
                                      ▼
                         [ Phase 3: Observability ]
                         - Integrate Monte Carlo or Elementary
                         - Slack alerts for schema changes
```

*   **GitHub Actions CI/CD Integration**: Automatically run `dbt build` on pull requests to test and validate changes in a staging environment before deploying to production.
*   **Orchestration with Apache Airflow**: Schedule S3 copies, dbt models, and snapshots using Airflow DAGs, enabling complex workflows and alert routing.
*   **Data Observability**: Integrate tools like Elementary to monitor data quality trends, track execution times, and send Slack notifications for model failures or schema changes.
*   **Data Masking**: Implement Snowflake security policies to mask sensitive host or customer details (PII) at rest and during query execution.

---

## 12. Interview Walkthrough Guide

### Opening Pitch (30 seconds)
> "I built an end-to-end cloud data pipeline that ingests raw Airbnb bookings, hosts, and listings data from AWS S3 stages into Snowflake. The transformation pipeline utilizes a Medallion architecture managed by dbt. Key features include incremental models to optimize warehouse costs, slowly changing dimensions (SCD Type 2) snapshots to track host and listing attribute history over time, and Jinja loops to dynamically compile joins, creating analytics-ready tables."

### Architecture Walkthrough (2 minutes)
Walk the interviewer through the tiers:
1.  **Ingestion**: S3 landing zone and Snowflake stages executing COPY INTO commands.
2.  **Bronze (Raw Staging)**: Raw tables configured with incremental load filters.
3.  **Silver (Cleaned)**: Standardizing host name formats, categorizing response rates, and applying custom macros (`multiply`, `tag`) to calculate and tag booking values.
4.  **Gold (Analytical)**: Exposing ephemeral models and snapshotted dimensions (`dim_listings`, `dim_hosts`) to build the One Big Table (OBT) and final Fact views.
5.  **Data Quality**: Running automated validations and pricing anomaly tests.

### Critical Interview Q&As

**Q: Why use dbt over writing SQL Server stored procedures?**
> "dbt brings software engineering best practices to database SQL. It manages model compilation, dependency lineage, version control, and automated testing natively. Instead of writing complex, hard-to-maintain stored procedures, dbt allows us to write modular SELECT models, compiling the correct execution order automatically."

**Q: Explain how dbt's Incremental Materialization works.**
> "In incremental models, dbt only processes new or changed records. The `is_incremental()` macro checks if the target table already exists in the database. If it does, dbt compiles a filter clause (e.g. checking if `created_at` is greater than the max timestamp in the existing table), scanning and processing only the new rows to save compute costs."

**Q: What is the benefit of a custom `generate_schema_name` macro?**
> "By default, dbt appends custom schemas to the target schema name (e.g. `dev_bronze`). A custom schema macro overrides this behavior, routing models directly to clean schemas (like `BRONZE`, `SILVER`, and `GOLD`) in Snowflake, keeping production environments clean and organized."

**Q: How would you scale this to billions of records?**
> "First, I would optimize Snowflake clustering keys on the fact table to speed up partition pruning; second, I would run dbt on a production orchestrator like Apache Airflow to handle job dependencies; and third, I would implement zero-copy cloning to spin up isolated testing databases without duplicating storage costs."

---

## Project Structure Reference

```
airbnb-snowflake-dbt/
├── pyproject.toml                      # Python dependencies (dbt-core, dbt-snowflake, uv)
├── main.py                             # Main execution script (empty entrypoint)
├── DDL/                                # Database schema definitions
│   ├── ddl.sql                         # Table creation scripts (HOSTS, LISTINGS, BOOKINGS)
│   └── resources.sql                   # S3 file formats and copy stages
├── SourceData/                         # Raw CSV data files (bookings, hosts, listings)
├── Notes/                              # Notes and diagrams
│   └── snowflake-dbt.png               # Project lineage & architecture diagram
└── aws_dbt_snowflake_project/         # Main dbt project folder
    ├── dbt_project.yml                 # dbt project settings & materialized mappings
    ├── ExampleProfiles.yml             # Snowflake connection configuration template
    ├── analyses/                       # Ad-hoc analysis queries (explore, if_else, loop)
    ├── seeds/                          # Static reference tables
    ├── macros/                         # Reusable Jinja functions
    │   ├── generate_schema_name.sql    # Custom schema naming override
    │   ├── multiply.sql                # Booking price multiplication macro
    │   ├── tag.sql                     # Listing pricing category tagger
    │   └── trimmer.sql                 # Text trimming utility
    ├── snapshots/                      # Slowly Changing Dimensions (SCD Type 2) configs
    │   ├── dim_bookings.yml            # Bookings snapshot mapping
    │   ├── dim_hosts.yml               # Hosts snapshot mapping
    │   └── dim_listings.yml            # Listings snapshot mapping
    ├── tests/                          # Custom data quality tests
    │   └── source_tests.sql            # Pricing anomaly validation test
    └── models/                         # dbt transformations
        ├── sources/
        │   └── sources.yml             # Data source definitions
        ├── bronze/                     # Raw append-only layer
        │   ├── bronze_bookings.sql     
        │   ├── bronze_hosts.sql        
        │   └── bronze_listings.sql     
        ├── silver/                     # Standardized, validated layer
        │   ├── silver_bookings.sql     
        │   ├── silver_hosts.sql        
        │   └── silver_listings.sql     
        └── gold/                       # Enriched analytics layer
            ├── fact.sql                # Fact table joined to snapshots
            ├── obt.sql                 # One Big Table denormalized view
            └── ephemeral/              # Ephemeral models serving snapshots
                ├── bookings.sql        
                ├── hosts.sql           
                └── listings.sql        
```
