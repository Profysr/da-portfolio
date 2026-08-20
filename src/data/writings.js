export const writings = [
  {
    id: "blog-1",
    slug: "why-dashboards-lie",
    title: "Why your dashboard lies to you",
    excerpt:
      "How common chart choices can mislead stakeholders — and how to fix them.",
    date: "2025-07-14",
    tags: ["Analytics", "Visualization"],
    readTime: "8 min",
    content: `## The Setup

Most dashboards follow a similar pattern: extract data, aggregate, render. The pipeline is fine. The choices inside that pipeline are where the lying happens.

## The Three Classic Lies

### 1. Truncated Y-Axes

A bar chart that starts at 50 instead of 0 makes a 10% change look like a 50% change. Stakeholders panic, decisions get made, reality never matches up.

**Fix:** Default to zero-baseline for bar charts. If you genuinely need a non-zero baseline, mark it explicitly on the chart and explain why.

### 2. Cherry-Picked Time Windows

"This metric is up 40%!" — over what window? If the window starts at a known trough, any number is impressive.

**Fix:** Show the full year by default. Allow the user to zoom into windows, but never let the default view be misleading.

### 3. Stacked Areas That Don't Add Up

Stacked area charts look pretty. They're also a nightmare when the components don't share a meaningful scale (revenue + headcount, for instance). The visual encoding implies relationships that the data doesn't support.

**Fix:** Use small multiples instead. One chart per metric, arranged in a grid. Loses the "wow" factor, gains actual understanding.

## What I Learned

The biggest mistake is choosing chart types by aesthetics, not by what the data is trying to say. Every chart type encodes assumptions. Your job is to make sure those assumptions are honest ones.

The 80/20 here: most misleading dashboards are misleading because of one of the three issues above. Audit your own.`,
  },
  {
    id: "blog-2",
    slug: "repeatable-etl-pattern",
    title: "Setting up a repeatable ETL pattern with Python",
    excerpt:
      "A pragmatic approach to building data pipelines that are easy to test and maintain.",
    date: "2025-06-03",
    tags: ["Python", "ETL"],
    readTime: "12 min",
    content: `## The Setup

I've written the same ETL scaffolding four times across four companies. Each time, the same problems: schema drift, partial failures, observability gaps. This is the pattern that finally stopped biting me.

## The Three Layers

### 1. Extract

Pure I/O. No transformation logic. Should be idempotent — running it twice shouldn't double your data.

\`\`\`python
def extract(source: Source) -> Iterator[RawRecord]:
    for batch in source.batches():
        yield from batch
\`\`\`

### 2. Transform

Pure functions. Easy to unit test. Should be deterministic given the same input.

\`\`\`python
def transform(record: RawRecord) -> CleanRecord:
    return CleanRecord(
        id=record["id"],
        value=parse_currency(record["amount"]),
        created_at=parse_iso(record["ts"]),
    )
\`\`\`

### 3. Load

Side-effecting. Should be transactional. Should emit observability events.

\`\`\`python
def load(records: Iterator[CleanRecord], target: Target) -> LoadResult:
    with target.transaction() as txn:
        count = txn.bulk_insert(records)
    return LoadResult(count=count)
\`\`\`

## Why This Works

Each layer is independently testable. Each layer can fail without corrupting the others. Each layer has one job, which means debugging is "which layer is broken?" instead of "where in this 800-line function did it go wrong?"

## What's Hard

Schema evolution. When the upstream schema changes and you don't notice, your transform layer silently corrupts downstream data. The fix: schema contracts as part of the extract layer. Reject unknown fields, version the schema, alert on drift.`,
  },
  {
    id: "blog-3",
    slug: "git-contributions-as-portfolio",
    title: "Git contributions as a portfolio signal",
    excerpt:
      "What open-source commits tell hiring managers — and how to shape yours.",
    date: "2025-04-22",
    tags: ["Career", "Open Source"],
    readTime: "6 min",
    content: `## The Setup

If you're a developer, your GitHub profile is your portfolio. Whether you treat it that way or not, hiring managers are looking at it. Here's what they actually see.

## What Hiring Managers Look For

1. **Consistency** — a long, flat commit graph beats a spiky one with heroic 3am pushes
2. **Range** — work in multiple languages, multiple domains, multiple sizes of contribution
3. **Code quality** — readable diffs, sensible tests, sensible commit messages
4. **Collaboration** — merged PRs from forks, reviewed PRs on others' repos

## What They Don't Look For

- Commit count as a vanity metric
- Green-square density on its own (it's an output, not a signal)
- Side projects that were abandoned after a week

## How to Shape Yours

The boring truth: the best way to have a strong GitHub profile is to do interesting work consistently over time. There's no shortcut.

If you're starting from zero: pick one project, contribute regularly, write good commit messages. After six months you'll have a profile. After two years you'll have a story.

## The Caveat

Some hiring managers are bad at reading GitHub profiles. They count commits or grep for keywords. Don't optimize for them. Optimize for the ones who actually know what they're looking at.`,
  },
];
