## The Idea

Primary care clinics were drowning in inbound clinical correspondence — letters, test results, referrals — being manually triaged into SystmOne, EMIS, and Docman. Each item took 3-5 minutes of admin time. Across a 40-site network, that was 80+ hours/day of avoidable work.

## Stack Decisions

- **Power Automate + Python** hybrid — Power Automate for the visual workflow orchestration, Python for the OCR + NLP that needed real libraries
- **AutoHotkey** for the desktop integration layer where no API existed
- **Queue-based retries with exponential backoff** — clinical systems fail in cascades, and a stuck document can't disappear
- **Audit log as a first-class artifact** — every action traceable for GDPR/HIPAA

## Results

- 40% reduction in manual triage time across the network
- Zero data loss in 18 months of production
- Audit log passed 3 separate clinical governance reviews

## What's Hard

Healthcare integrations are not about technology — they're about stakeholder management. The technical work was 30% of the project. The other 70% was sign-off from clinical safety, information governance, and Caldicott guardians.
