## The Setup

I've written the same ETL scaffolding four times across four companies. Each time, the same problems: schema drift, partial failures, observability gaps. This is the pattern that finally stopped biting me.

## The Three Layers

### 1. Extract

Pure I/O. No transformation logic. Should be idempotent — running it twice shouldn't double your data.

```python
def extract(source: Source) -> Iterator[RawRecord]:
    for batch in source.batches():
        yield from batch
```

### 2. Transform

Pure functions. Easy to unit test. Should be deterministic given the same input.

```python
def transform(record: RawRecord) -> CleanRecord:
    return CleanRecord(
        id=record["id"],
        value=parse_currency(record["amount"]),
        created_at=parse_iso(record["ts"]),
    )
```

### 3. Load

Side-effecting. Should be transactional. Should emit observability events.

```python
def load(records: Iterator[CleanRecord], target: Target) -> LoadResult:
    with target.transaction() as txn:
        count = txn.bulk_insert(records)
    return LoadResult(count=count)
```

## Why This Works

Each layer is independently testable. Each layer can fail without corrupting the others. Each layer has one job, which means debugging is "which layer is broken?" instead of "where in this 800-line function did it go wrong?"

## What's Hard

Schema evolution. When the upstream schema changes and you don't notice, your transform layer silently corrupts downstream data. The fix: schema contracts as part of the extract layer. Reject unknown fields, version the schema, alert on drift.
