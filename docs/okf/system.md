---
type: System
title: Alpaca Agent Tools distribution
description: Public repository that distributes Alpaca's agent plugins and documents how to connect AI coding agents to Alpaca's hosted MCP endpoints.
resource: likec4://alpacahq/agentic
tags: [alpacahq, developer-tools, mcp, generated]
status: active
owners: ["Alpaca (support@alpaca.markets)"]
timestamp: 2026-09-18T04:31:29Z
generated_by: claude-opus-5 / layered-docs 2026-09
source_commit: 6fb47e3294349e0bf3dfd9f811ae59f512f27d00
source_branch: docs/layered-2026-09
generated_at: 2026-09-18T04:31:29Z
confidence: medium
review_status: draft-needs-review
links:
  repository: https://github.com/alpacahq/agentic
  architecture: ../architecture/agentic.c4
---

# Alpaca Agent Tools distribution

## Purpose
This repository is the distribution point for Alpaca's agent plugins and the single setup guide for connecting AI
coding agents to Alpaca's Trading API, Market Data API and Broker API (`README.md`). It is publicly consumable: the
licence is MIT (`LICENSE`) and the README instructs clients to import it from the public GitHub URL or add it by
repository slug (`README.md:48`, `README.md:56`). It exists so that a developer or
broker partner can install a plugin instead of hand-copying MCP client configuration, and sign in with an Alpaca
account through OAuth rather than copying API keys around (`README.md`, "Agent Plugins").

All fourteen tracked files are documentation, plugin manifests, logos and licence (`git ls-files`). There is no server,
application or build code here: the MCP servers the plugins register are hosted elsewhere, and the locally runnable
Trading MCP server and the Alpaca Trading CLI are referenced as separate products (`README.md`, "Run Trading MCP
Locally" and "Alpaca Trading CLI").

> Unverified: `status: active` rests only on the single commit visible in this shallow clone
> (`6fb47e3`, "Update trading plugin metadata and MCP setup docs (#3)"); no release, roadmap or
> other recency signal is tracked in the repository. Confidence: low on the status value.

## Capabilities
- Publishes an `alpaca-plugins` marketplace in three client formats — evidence: `.claude-plugin/marketplace.json`, `.cursor-plugin/marketplace.json`, `.agents/plugins/marketplace.json`
- Ships an `alpaca-trading` plugin registering the live and paper Trading MCP servers, which also expose Market Data tools — evidence: `plugins/alpaca-trading/.claude-plugin/plugin.json`, `README.md`
- Ships an `alpaca-broker` plugin registering the live and sandbox Broker MCP servers — evidence: `plugins/alpaca-broker/.claude-plugin/plugin.json`
- Documents manual remote MCP configuration per client, including VS Code for Broker MCP — evidence: `README.md`, "Manual Remote MCP Configuration"
- Points to the locally runnable Trading MCP server and the Alpaca Trading CLI as alternative routes — evidence: `README.md`

## Interfaces
**Inbound:** none at runtime. The repository is consumed by MCP clients as a plugin marketplace, added by repository
slug (`alpacahq/agentic`) or imported from the GitHub URL (`README.md`, sections "Cursor", "Claude Code", "Codex").

**Outbound:** the plugin manifests declare HTTP MCP endpoints on `api.alpaca.markets`, `paper-api.alpaca.markets`,
`broker-api.alpaca.markets` and `broker-api.sandbox.alpaca.markets`
(`plugins/alpaca-trading/.claude-plugin/plugin.json`, `plugins/alpaca-broker/.claude-plugin/plugin.json`,
`plugins/alpaca-trading/.codex-plugin/plugin.json`, `plugins/alpaca-broker/.cursor-plugin/plugin.json`). The Cursor
and Codex manifests carry OAuth client identifiers; the Claude Code manifests declare transport only (`type: http`
plus a URL). That these endpoints are OAuth-protected is stated in the README, not in those manifests
(`README.md:23`).

## Dependencies
- Alpaca hosted Trading and Market Data MCP endpoints — the target of the `alpaca-trading` plugin — evidence: `plugins/alpaca-trading/.claude-plugin/plugin.json`
- Alpaca hosted Broker MCP endpoints — the target of the `alpaca-broker` plugin — evidence: `plugins/alpaca-broker/.claude-plugin/plugin.json`
- GitHub — repository host and marketplace import source — evidence: `README.md`, `repository` field in every plugin manifest
- Cursor, Claude Code and Codex — the three clients whose manifest formats are maintained here — evidence: the `.cursor-plugin`, `.claude-plugin` and `.codex-plugin` directories
- VS Code — documented manual client for Broker MCP only — evidence: `README.md:199-218`
- Trading MCP Server (a separate open-source repository) — documented as the locally run alternative with API-key authentication — evidence: `README.md:220-222`
- Alpaca Trading CLI — documented as the non-MCP alternative route — evidence: `README.md:224-228`
- Alpaca documentation site — the external destination for Broker MCP, local Trading MCP, CLI and Trading API instructions — evidence: `README.md:14`, `README.md:218`, `README.md:222`, `README.md:228`

## Data & storage
No datastores, queues or schemas are present in the repository. The only persisted artefacts are JSON manifests and
SVG logos (`git ls-files`). The Cursor and Codex manifests carry per-client, per-environment OAuth client identifiers
(`plugins/alpaca-trading/.cursor-plugin/plugin.json`, `plugins/alpaca-broker/.codex-plugin/plugin.json`).

> Unverified: nothing in the repository characterises those identifiers as public or sensitive. Confidence: low on
> their sensitivity.

## Operations
No CI workflows, container images, IaC or deployment manifests are tracked (`git ls-files` shows no `.github/`,
Dockerfile, compose, k8s or terraform files). No delivery mechanism is evidenced. Clients resolve plugin sources as
local paths inside the checkout (`.agents/plugins/marketplace.json`, `source.path: ./plugins/alpaca-trading`), and
add the marketplace by repository slug or GitHub URL (`README.md:48`, `README.md:56`, `README.md:64`). Plugin and
marketplace versions are pinned at `0.1.0` in the manifests.

> Unverified: no release, tagging or review process is evidenced in the repository, and no file states how updates
> reach installed clients — presumably from the repository's default branch, but that is an inference from the client
> `add` commands, not evidence. Confidence: low on how changes are rolled out to installed clients.

## Behaviour (Allium)
none — no Allium specification is tracked in this repository, and no accepted spec exists for it.

## Decisions
- [ADR-0001 Distribute Alpaca MCP access as per-client agent plugins](decisions/ADR-0001-plugins-for-hosted-mcp.md)
- [ADR-0002 Maintain parallel manifests per agent client](decisions/ADR-0002-per-client-manifest-formats.md)

## Evidence
- `README.md`
- `.claude-plugin/marketplace.json`, `.cursor-plugin/marketplace.json`, `.agents/plugins/marketplace.json`
- `plugins/alpaca-trading/.claude-plugin/plugin.json`, `plugins/alpaca-trading/.codex-plugin/plugin.json`, `plugins/alpaca-trading/.cursor-plugin/plugin.json`
- `plugins/alpaca-broker/.claude-plugin/plugin.json`, `plugins/alpaca-broker/.codex-plugin/plugin.json`, `plugins/alpaca-broker/.cursor-plugin/plugin.json`
- `LICENSE`, `.gitignore`
- `git log` at `6fb47e3` — "Update trading plugin metadata and MCP setup docs (#3)"

## Open questions
- No CODEOWNERS or team-level owner is evidenced; the manifests name the organisation and a support address only
  (`owner: {name: Alpaca, email: support@alpaca.markets}` in `.claude-plugin/marketplace.json` and
  `.cursor-plugin/marketplace.json`; `author`/`developerName` in the plugin manifests). Which team maintains the
  repository is unverified.
- `ext_github` is used here in the repository-host sense, while the org external dictionary defines it as GitHub
  API / Apps; the org consistency pass must merge or split that id. The other `ext_*` ids introduced for this
  repository (`ext_claude_code`, `ext_codex`, `ext_vscode`, `ext_alpaca_trading_mcp`, `ext_alpaca_broker_mcp`,
  `ext_alpaca_mcp_server_repo`, `ext_alpaca_trading_cli`, `ext_alpaca_docs`) are proposals for that dictionary.
- The clone available here is shallow (a single commit), so decision history beyond pull request #3 could not be mined. Confidence: low.
- Whether the hosted MCP endpoints are operated from another repository in the organisation could not be evidenced from this repository alone.
