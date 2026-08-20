## The Idea

Building blocks for SaaS founders who'd rather focus on their actual product than on tenant isolation, billing webhooks, and role-based access control. The boring infrastructure that every SaaS needs and nobody wants to write twice.

## Architecture

- **Tenant isolation** via Postgres row-level security
- **Billing** via Stripe webhooks + idempotent event handlers
- **RBAC** via a simple role → permission → resource hierarchy
- **API** built on Django REST Framework with OpenAPI docs auto-generated

## Status

Internal use. Considering open-sourcing the RBAC and tenant-isolation primitives separately.
