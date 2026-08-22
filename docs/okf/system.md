---
type: System
title: Alpaca Agent Tools (agentic)
description: Plugin marketplace and setup documentation that connects AI agent clients to Alpaca's hosted Trading, Market Data, and Broker API MCP servers.
resource: likec4://alpacahq/agentic
tags: [alpacahq, mcp, plugins, generated]
status: active   # last commit 2026-08-18 (git log); version 0.1.0 in manifests
owners: []       # no CODEOWNERS file; manifests name Alpaca (support@alpaca.markets) as owner/author
timestamp: 2026-08-21T21:10:57Z
generated_by: claude-fable-5 / layered-docs 2026-08
source_commit: 6fb47e3294349e0bf3dfd9f811ae59f512f27d00
source_branch: allium/layered-docs-2026-08
generated_at: 2026-08-21T21:10:57Z
confidence: high
review_status: draft-needs-review
links:
  repository: https://github.com/alpacahq/agentic
  architecture: ../architecture/agentic.c4
---

# Alpaca Agent Tools (agentic)

## Purpose
This repository is Alpaca's distribution point for connecting AI agents to the Trading API, Market Data API, and Broker API. It contains no runtime code: it ships plugin-marketplace manifests plus two plugins (`alpaca-trading`, `alpaca-broker`) that point MCP clients at Alpaca's hosted, OAuth-protected MCP endpoints, and a README documenting four setup paths: agent plugins, manual remote MCP configuration, running the Trading MCP server locally, and the Alpaca Trading CLI (`README.md`).

The audience is any Alpaca account holder building agent workflows: individual traders use the Trading MCP; broker partners building end-customer investing experiences use the Broker MCP (`README.md`).

## Capabilities
- Plugin marketplace `alpaca-plugins` importable by Claude Code, Cursor, and Codex — evidence: `README.md:63-65` (`codex plugin marketplace add alpacahq/agentic`), `README.md` (Claude Code and Cursor import steps); three parallel marketplace definitions live in client-specific locations: `.claude-plugin/marketplace.json`, `.cursor-plugin/marketplace.json`, `.agents/plugins/marketplace.json`

> Unverified: the consuming client of the `.agents/plugins/marketplace.json` variant is not named anywhere in the repository — `README.md` contains no occurrence of `.agents`, and that file uses a different schema (`interface.displayName`, structured `source`, `policy`, `category`) from the other two. The `.claude-plugin/` → Claude Code and `.cursor-plugin/` → Cursor mappings are inferred from directory naming only.

- `alpaca-trading` plugin registering hosted Trading MCP servers (live `api.alpaca.markets/mcp`, paper `paper-api.alpaca.markets/mcp`), exposing Trading and Market Data API tools — evidence: `plugins/alpaca-trading/.claude-plugin/plugin.json`, `README.md`
- `alpaca-broker` plugin registering hosted Broker MCP servers (live `broker-api.alpaca.markets/mcp`, sandbox `broker-api.sandbox.alpaca.markets/mcp`) — evidence: `plugins/alpaca-broker/.claude-plugin/plugin.json`
- Copy-paste manual MCP configuration snippets per client, including VS Code for Broker MCP — evidence: `README.md`
- Pointers to the open-source local Trading MCP server and the Alpaca Trading CLI — evidence: `README.md`

## Interfaces
**Inbound:** consumed as a GitHub-hosted plugin marketplace (`claude plugin marketplace add alpacahq/agentic`, Cursor "Import from GitHub", `codex plugin marketplace add`) — evidence: `README.md`.
**Outbound:** none at runtime from this repo itself; the installed plugins direct client traffic to Alpaca's hosted MCP endpoints listed above — evidence: `plugins/*/.claude-plugin/plugin.json`, `README.md`.

## Dependencies
- Alpaca hosted Trading MCP endpoints (live/paper) — target of the trading plugin — evidence `plugins/alpaca-trading/.claude-plugin/plugin.json`
- Alpaca hosted Broker MCP endpoints (live/sandbox) — target of the broker plugin — evidence `plugins/alpaca-broker/.claude-plugin/plugin.json`
- MCP client applications on the plugin install path: Cursor, Claude Code, Codex — evidence `README.md:42` ("Hosted MCP access currently supports Cursor, Claude Code, and Codex through plugins"), `README.md:7-12`
- MCP client applications on the manual remote-MCP configuration path: those three plus VS Code, where VS Code is documented for the Broker MCP only (`.vscode/mcp.json`) — evidence `README.md:199-218`, `README.md:7-12`

## Data & storage
None. The repository holds static JSON manifests, SVG logos, and Markdown; no datastore, queue, or schema (full file list: `git ls-files`).

## Operations
No build, deploy, or CI artifacts exist in the repo — no Dockerfile, compose, k8s, terraform, or workflow files (`git ls-files`). "Deployment" is publishing the repo on GitHub, where clients import it directly.

## Behaviour (Allium)
none — no `.allium` files or `specs/` directory exist in the repository (`git ls-files`).

## Decisions
- [ADR-0000 No recorded decisions](decisions/ADR-0000-no-recorded-decisions.md)

## Evidence
- `README.md` — purpose, setup paths, endpoint table, prerequisites
- `.claude-plugin/marketplace.json`, `.cursor-plugin/marketplace.json`, `.agents/plugins/marketplace.json` — marketplace definitions
- `plugins/alpaca-trading/.claude-plugin/plugin.json`, `plugins/alpaca-trading/.codex-plugin/plugin.json`, `plugins/alpaca-trading/.cursor-plugin/plugin.json` — trading plugin manifests
- `plugins/alpaca-broker/.claude-plugin/plugin.json`, `plugins/alpaca-broker/.codex-plugin/plugin.json`, `plugins/alpaca-broker/.cursor-plugin/plugin.json` — broker plugin manifests
- `git log` — history 2026-06-25 → 2026-08-18, all docs/manifest changes

## Open questions
- Owners: manifests give "Alpaca / support@alpaca.markets" as author; no CODEOWNERS or team named — unverified beyond that.
- Which agent client consumes `.agents/plugins/marketplace.json` is not stated in the repository; its file-to-client attribution is unresolved (confidence: low).
- VS Code appears only in the manual remote-MCP section and only for the Broker MCP (`README.md:199-218`); whether Trading MCP works in VS Code manually is not stated here.
- The hosted MCP servers' internals live outside this repo (README links to docs.alpaca.markets and alpacahq/alpaca-mcp-server); their behaviour is not evidenced here.
