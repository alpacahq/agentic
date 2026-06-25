# Alpaca Plugins for AI Coding Agents

Official [Alpaca](https://alpaca.markets) plugins for **Cursor**, **Claude Code**, and **Codex** — bring Alpaca's Broker API, Trading API, and Market Data API into your AI coding agent as MCP tools.

Each plugin is a thin wrapper that connects your agent to one of Alpaca's hosted, OAuth-protected MCP endpoints. No API keys to copy around — sign in with your Alpaca account on first use.

## Plugins

| Plugin | Bundled MCP servers |
| --- | --- |
| `alpaca-trading` | Trading API (live), Trading API (paper), Market Data API |
| `alpaca-broker` | Broker API (live), Broker API (sandbox) |

Endpoints:

| MCP server | Endpoint |
| --- | --- |
| `alpaca-trading` | `https://api.alpaca.markets/mcp` |
| `alpaca-trading-paper` | `https://paper-api.alpaca.markets/mcp` |
| `alpaca-market-data` | `https://data.alpaca.markets/mcp` |
| `alpaca-broker` | `https://broker-api.alpaca.markets/mcp` |
| `alpaca-broker-sandbox` | `https://broker-api.sandbox.alpaca.markets/mcp` |

Both plugins are packaged for all three agents in this repo. Install one or both depending on whether you're building trading or broker workflows.

## Prerequisites

- An [Alpaca account](https://alpaca.markets/).
- One of: [Cursor](https://cursor.com), [Claude Code](https://www.anthropic.com/claude-code), or [Codex](https://github.com/openai/codex).

## Install

### Cursor

In Cursor, open the plugin settings, add the `alpacahq/agentic` marketplace, and install the plugins you want. You'll be prompted to sign in with your Alpaca account on first use.

### Claude Code

```bash
claude plugin marketplace add alpacahq/agentic
```

Then install plugins from the `alpaca-plugins` marketplace. OAuth runs automatically on first use.

### Codex

```bash
codex plugin marketplace add alpacahq/agentic
```

Install plugins from the `alpaca-plugins` marketplace, then complete the OAuth flow:

```bash
codex mcp login <plugin-name>
```

## Authentication

All plugins authenticate against `authx.alpaca.markets` (or the sandbox auth host for `alpaca-broker-sandbox`) using OAuth. Your agent only ever holds a short-lived token scoped to the API you signed in to — there are no long-lived API keys stored in plugin manifests or your editor settings.

## Repository structure

```
.cursor-plugin/marketplace.json     # Cursor marketplace manifest
.claude-plugin/marketplace.json     # Claude Code marketplace manifest
.agents/plugins/marketplace.json    # Codex marketplace manifest
plugins/<plugin-name>/
  .cursor-plugin/plugin.json
  .claude-plugin/plugin.json
  .codex-plugin/plugin.json
```

Each plugin folder is shared across platforms; only the per-platform manifest differs.
