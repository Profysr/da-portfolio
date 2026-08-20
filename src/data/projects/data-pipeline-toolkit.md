## The Idea

Every team I worked with wrote the same ETL scaffolding over and over — config parser, schema validator, worker pool, retry logic, observability. The toolkit absorbs all of it.

## Stack Decisions

- **Python** for AST parsing of pipeline definitions (typed dataclasses → runtime validation)
- **ClickHouse** as the default target — columnar storage makes analytical loads 10x faster than Postgres
- **Docker** per-worker so multi-tenant pipelines don't trample each other's dependencies
- **Zero-config philosophy**: if you can express it in YAML, you can ship it

## Results

- 1.2M rows migrated in 4.2s on a single-node setup
- Multi-tenant isolation means one team's failed migration doesn't poison another's
- Used in production by 3 internal teams before going open-source
