---
type: Architecture Decision
title: ADR-0000 No recorded decisions
description: No explicit architecture decision records exist in this repository; implicit decisions are noted below with their evidence.
status: proposed
date: unknown
deciders: []
supersedes: []
affects: [agentic]
allium: []
evidence: [README.md, .claude-plugin/marketplace.json, plugins/alpaca-trading/.claude-plugin/plugin.json, plugins/alpaca-broker/.claude-plugin/plugin.json]
tags: [alpacahq, adr, generated]
timestamp: 2026-08-21T21:10:57Z
generated_by: claude-fable-5 / layered-docs 2026-08
source_commit: 6fb47e3294349e0bf3dfd9f811ae59f512f27d00
source_branch: allium/layered-docs-2026-08
generated_at: 2026-08-21T21:10:57Z
confidence: low
review_status: draft-needs-review
---

# ADR-0000 No recorded decisions

## Context
The repository contains no `docs/adr*`, `ADR*`, or `DECISIONS*` files, and its commit/PR messages (`git log`, 2026-06-25 → 2026-08-18) describe what changed ("Rename trading plugin (#1)", "Document MCP setup paths (#2)", "Update trading plugin metadata and MCP setup docs (#3)") without recording rationale.

## Decision
No explicit decisions are recorded. The following decisions *appear* to have been made implicitly (confidence: low; stated only as far as the files evidence them):

- **Distribute agent connectivity as plugin-marketplace manifests rather than code**: the repo ships parallel marketplace/plugin manifests for Claude Code, Cursor, and Codex-style clients and no runtime code (`.claude-plugin/marketplace.json`, `.cursor-plugin/marketplace.json`, `.agents/plugins/marketplace.json`, `plugins/*`).
- **Prefer hosted, OAuth-protected MCP endpoints over local API-key setups as the primary path**: plugins point at `api.alpaca.markets/mcp`, `paper-api.alpaca.markets/mcp`, `broker-api.alpaca.markets/mcp`, `broker-api.sandbox.alpaca.markets/mcp`; README frames plugins as "the easiest way" and positions the local server and CLI as alternatives (`README.md`).
- **Split Trading (live/paper) and Broker (live/sandbox) into two separate plugins** targeting different audiences — individual accounts vs. broker partners (`README.md`, `plugins/alpaca-trading/`, `plugins/alpaca-broker/`).

> Unverified: who made these choices and when; the rationale above is inferred from the artifacts, not from any recorded discussion.

## Consequences
Documentation of *why* lives outside the repo (docs.alpaca.markets links in `README.md`); future decision records would need to be introduced here to be traceable.
