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

Use the [Trading MCP Server](https://docs.alpaca.markets/us/docs/alpaca-mcp-server) for an individual Alpaca trading account and market data. Use the [Broker MCP Server](https://docs.alpaca.markets/us/docs/broker-mcp-server) if you're a broker partner building and operating end-customer investing experiences.

## Prerequisites

- An [Alpaca account](https://alpaca.markets/).
- An MCP client such as [Cursor](https://cursor.com), [Claude Code](https://www.anthropic.com/claude-code), [Codex](https://github.com/openai/codex), or [VS Code](https://code.visualstudio.com/).

## Install from the plugin marketplace

> [!NOTE]
> Hosted MCP access currently supports Cursor, Claude Code, and Codex through plugins. We're currently working on providing our plugins and MCP servers to as many of our users as possible. To request support for another client, open an issue and we will get that sorted as soon as we can.

### Cursor

1. Open the command palette: `Cmd + Shift + P` (macOS) or `Ctrl + Shift + P` (Windows/Linux).
2. Run `Open Customize`, then click **Browse Marketplace**.
3. Click **Add Marketplace**, choose **Import from GitHub**, and enter `https://github.com/alpacahq/agentic`.
4. Install `alpaca-trading`, `alpaca-broker`, or both.

Start one of the installed MCP servers to complete its browser-based OAuth flow.

### Claude Code

```bash
claude plugin marketplace add alpacahq/agentic
```

Start a Claude Code session and run `/plugin`. Select the `alpaca-plugins` marketplace, browse its plugins, and install `alpaca-trading`, `alpaca-broker`, or both. Run `/reload-plugins`, then use `/mcp` to start a server and complete its OAuth flow.

### Codex

```bash
codex plugin marketplace add alpacahq/agentic
```

Install plugins from the `alpaca-plugins` marketplace, then complete the OAuth flow:

```bash
codex mcp login <mcp-name>
```

## Set up remote MCP servers manually

Plugins are the easiest way to connect. For manual setup, copy the JSON for your app below. Use only that app's configuration because each app has its own sign-in settings.

### Trading and Market Data

#### Cursor

```json
{
  "mcpServers": {
    "alpaca-trading": {
      "url": "https://api.alpaca.markets/mcp",
      "auth": {
        "CLIENT_ID": "PCBXWA7PCN3S6662PZK44KLURJ"
      }
    },
    "alpaca-trading-paper": {
      "url": "https://paper-api.alpaca.markets/mcp",
      "auth": {
        "CLIENT_ID": "PCBXWA7PCN3S6662PZK44KLURJ"
      }
    },
    "alpaca-market-data": {
      "url": "https://data.alpaca.markets/mcp",
      "auth": {
        "CLIENT_ID": "PCBXWA7PCN3S6662PZK44KLURJ"
      }
    }
  }
}
```

#### Claude Code

```json
{
  "mcpServers": {
    "alpaca-trading": {
      "type": "http",
      "url": "https://api.alpaca.markets/mcp"
    },
    "alpaca-trading-paper": {
      "type": "http",
      "url": "https://paper-api.alpaca.markets/mcp"
    },
    "alpaca-market-data": {
      "type": "http",
      "url": "https://data.alpaca.markets/mcp"
    }
  }
}
```

#### Codex

```json
{
  "mcpServers": {
    "alpaca-trading": {
      "url": "https://api.alpaca.markets/mcp",
      "oauth": {
        "client_id": "PCIEJZTPCQEBUBAINMQOGDHF7I"
      }
    },
    "alpaca-trading-paper": {
      "url": "https://paper-api.alpaca.markets/mcp",
      "oauth": {
        "client_id": "PCIEJZTPCQEBUBAINMQOGDHF7I"
      }
    },
    "alpaca-market-data": {
      "url": "https://data.alpaca.markets/mcp",
      "oauth": {
        "client_id": "PCIEJZTPCQEBUBAINMQOGDHF7I"
      }
    }
  }
}
```

### Broker

#### Cursor

```json
{
  "mcpServers": {
    "alpaca-broker": {
      "url": "https://broker-api.alpaca.markets/mcp",
      "auth": {
        "CLIENT_ID": "PCBXWA7PCN3S6662PZK44KLURJ"
      }
    },
    "alpaca-broker-sandbox": {
      "url": "https://broker-api.sandbox.alpaca.markets/mcp",
      "auth": {
        "CLIENT_ID": "PCKU56KZNL2JHDU2BFNNNU4KVZ"
      }
    }
  }
}
```

#### Claude Code

```json
{
  "mcpServers": {
    "alpaca-broker": {
      "type": "http",
      "url": "https://broker-api.alpaca.markets/mcp"
    },
    "alpaca-broker-sandbox": {
      "type": "http",
      "url": "https://broker-api.sandbox.alpaca.markets/mcp"
    }
  }
}
```

#### Codex

```json
{
  "mcpServers": {
    "alpaca-broker": {
      "url": "https://broker-api.alpaca.markets/mcp",
      "oauth": {
        "client_id": "PCIEJZTPCQEBUBAINMQOGDHF7I"
      }
    },
    "alpaca-broker-sandbox": {
      "url": "https://broker-api.sandbox.alpaca.markets/mcp",
      "oauth": {
        "client_id": "PCQDJUXZE6UMJSTGGRFLONVLCE"
      }
    }
  }
}
```

## Run the Trading MCP Server locally

The hosted `alpaca-trading` plugin is the simplest option, but if you prefer a locally running MCP server, the open-source [Trading MCP Server](https://github.com/alpacahq/alpaca-mcp-server/) is an option. See the official documentation [here](https://docs.alpaca.markets/us/docs/alpaca-mcp-server).

## Alpaca Trading CLI

The Alpaca Trading CLI provides direct access to the Trading and Market Data APIs from your terminal. Use it for scripts, CI, or focused agent actions where a command-and-structured-output workflow is a better fit than a long-running MCP session.

See the [Trading CLI documentation](https://docs.alpaca.markets/us/docs/alpacas-cli) for installation and usage, or start with the [Trading API documentation](https://docs.alpaca.markets/us/docs/trading-api) for API concepts and capabilities.
