## The Idea

The production RPA suite (`rpa-clinical-automation-suite`) has hundreds of automation primitives. Most of them are reusable across clinics — but the abstraction layer to compose them has been buried inside project-specific Power Automate flows. This is the extraction.

## Components

- **Action registry** — typed primitives for each EHR system (SystmOne, EMIS, Docman)
- **Flow composer** — declarative JSON DSL that Power Automate can call into
- **Audit bridge** — uniform logging regardless of which EHR the action targets

## Status

Extraction in progress. About 60% of actions ported.
