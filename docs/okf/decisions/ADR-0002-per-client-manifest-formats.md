---
type: Architecture Decision
title: ADR-0002 Maintain parallel manifests per agent client
description: The same two plugins are described three times, once in each client's manifest format, rather than through a single shared descriptor.
status: accepted
date: unknown
deciders: []
supersedes: []
affects: [agentic.catalog, agentic.trading_plugin, agentic.broker_plugin, agentic.setup_guide]
allium: []
evidence: [".claude-plugin/marketplace.json", ".cursor-plugin/marketplace.json", ".agents/plugins/marketplace.json", "plugins/alpaca-trading/.codex-plugin/plugin.json", "plugins/alpaca-broker/.cursor-plugin/plugin.json", "README.md"]
tags: [alpacahq, adr, generated]
timestamp: 2026-09-18T04:31:29Z
generated_by: claude-opus-5 / layered-docs 2026-09
source_commit: 6fb47e3294349e0bf3dfd9f811ae59f512f27d00
source_branch: docs/layered-2026-09
generated_at: 2026-09-18T04:31:29Z
confidence: medium
review_status: draft-needs-review
---

# ADR-0002 Maintain parallel manifests per agent client

## Context
The three supported clients do not share a manifest schema. Cursor nests description and version under `metadata` and
authenticates with an `auth.CLIENT_ID`; the Claude Code format uses `type: http` with no client id in the manifest;
the Codex format uses an `oauth.client_id` plus an `interface` block carrying display name, category, capabilities and
a default prompt (`.cursor-plugin/marketplace.json`, `.claude-plugin/marketplace.json`,
`plugins/alpaca-trading/.codex-plugin/plugin.json`). The README warns readers to "Use only that client's
configuration because each client has its own sign-in settings."

## Decision
Keep one marketplace descriptor and one plugin manifest per client format side by side in the repository, and keep the
same plugin names, versions and endpoint URLs synchronised across them by hand. Three marketplace descriptors are
tracked — `.claude-plugin/marketplace.json`, `.cursor-plugin/marketplace.json` and `.agents/plugins/marketplace.json`
— the last of which describes the same two plugins with local `source.path` entries and an
`authentication: ON_INSTALL` policy; there is no `.codex-plugin` marketplace descriptor, only Codex plugin manifests.

## Consequences
- Endpoint URLs, versions (`0.1.0`) and descriptions are duplicated across six plugin manifests and three marketplace
  descriptors, so a change has to be applied in every copy. The only commit visible in this (shallow) clone touches
  trading plugin metadata and the setup docs by its subject alone ("Update trading plugin metadata and MCP setup
  docs"); its diff could not be inspected, so whether it was applied across all copies is not evidenced.
  Confidence: low.
- OAuth client identifiers differ per client and per environment, which the duplicated manifests make explicit rather
  than hiding behind a shared abstraction (`plugins/alpaca-broker/.cursor-plugin/plugin.json` uses a different
  sandbox client id from its live one).
- The README's per-client JSON blocks are yet another copy of the same endpoint table, kept for users who do not
  install a plugin.

> Unverified: no tooling, test or CI check enforces that the copies stay in step. Confidence: low on how drift is
> prevented.
