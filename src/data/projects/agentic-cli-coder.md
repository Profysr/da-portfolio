## The Idea

Most "AI coding assistants" are cloud-only and send your entire repo to someone else's GPU. For refactoring work on legacy codebases — where IP matters — that's a dealbreaker.

## What It Does

- Runs entirely on local LLMs (Ollama, LM Studio)
- Reads a target file + a refactor instruction
- Proposes a diff; you review and apply
- Persists a memory of your style preferences across runs

## Status

Experimental. Works well for small-to-medium refactors; struggles with cross-file changes that need a coherent plan.
