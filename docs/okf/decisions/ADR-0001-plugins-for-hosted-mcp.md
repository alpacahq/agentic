---
type: Architecture Decision
title: ADR-0001 Distribute Alpaca MCP access as per-client agent plugins
description: Alpaca ships installable agent plugins that point at hosted OAuth-protected MCP endpoints instead of asking users to paste API keys into client configuration.
status: accepted
date: unknown
deciders: []
supersedes: []
affects: [agentic.catalog, agentic.trading_plugin, agentic.broker_plugin]
allium: []
evidence: ["README.md", ".claude-plugin/marketplace.json", "plugins/alpaca-trading/.claude-plugin/plugin.json", "plugins/alpaca-broker/.claude-plugin/plugin.json"]
tags: [alpacahq, adr, generated]
timestamp: 2026-09-18T04:31:29Z
generated_by: claude-opus-5 / layered-docs 2026-09
source_commit: 6fb47e3294349e0bf3dfd9f811ae59f512f27d00
source_branch: docs/layered-2026-09
generated_at: 2026-09-18T04:31:29Z
confidence: medium
review_status: draft-needs-review
---

# ADR-0001 Distribute Alpaca MCP access as per-client agent plugins

## Context
The alternative routes documented alongside plugins are hand-editing a client's MCP configuration and supplying API
keys, or running a server locally; the README presents all four routes as current and co-existing (`README.md:5-12`,
`README.md:220-228`), so no before/after chronology is evidenced. The README states the intent directly: "Plugins are the easiest way
to connect Cursor, Claude Code, or Codex to Alpaca's hosted OAuth-protected MCP endpoints. No API keys to copy around
— sign in with your Alpaca account on first use." (`README.md`, "Agent Plugins").

## Decision
Publish a marketplace named `alpaca-plugins` from this repository containing two plugins, `alpaca-trading` and
`alpaca-broker`, whose manifests declare hosted HTTP MCP endpoints authenticated by OAuth rather than API keys
(`.claude-plugin/marketplace.json`, `plugins/alpaca-trading/.claude-plugin/plugin.json`,
`plugins/alpaca-broker/.claude-plugin/plugin.json`). Manual configuration, a locally run Trading MCP server and the
Alpaca Trading CLI remain documented as alternatives for users who need API-key authentication or a non-MCP workflow
(`README.md`, "Manual Remote MCP Configuration", "Run Trading MCP Locally", "Alpaca Trading CLI").

## Consequences
- The repository carries no runtime code; it is a distribution and documentation artefact only (`git ls-files`).
- The split between trading and broker audiences is encoded in the plugin boundary: the README directs individual
  account holders to Trading MCP and broker partners to Broker MCP.
- Each plugin bundles a production and a non-production endpoint (paper for trading, sandbox for broker), so a user
  selects the environment by starting the corresponding server rather than by editing configuration
  (`plugins/alpaca-trading/.claude-plugin/plugin.json`, `plugins/alpaca-broker/.claude-plugin/plugin.json`).
- Client coverage is limited to those with plugin support; the README records this as a known gap and invites issues
  for other clients.
