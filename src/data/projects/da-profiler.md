## The Idea

I've watched three different teams debug the same Django N+1 query bug in production. Every time, the workflow is the same: enable Django debug toolbar, capture the SQL, manually correlate request → query → ORM call. There should be a tool that does this in one shot.

## What It Does

- Captures every SQL query issued during a single request lifecycle
- Groups queries by ORM call site so duplicate SELECTs collapse into a single "N+1 detected" entry
- Surfaces the line of Python code that triggered each query
- Exports a timeline view for sharing in PR reviews

## Status

Early prototype. Working on the grouping heuristics next.
