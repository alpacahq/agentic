# Alpaca Agent Tools: Plugins, MCP, and CLI Setup

Connect AI agents to Alpaca's Trading API, Market Data API, and Broker API through hosted plugins, remote MCP servers, a local Trading MCP server, or the Alpaca Trading CLI.

## What You Can Set Up

| Option | Best for | Setup |
| --- | --- | --- |
| Agent plugins | Hosted MCP setup in Cursor, Claude Code, and Codex | [Install plugins](#agent-plugins) |
| Manual remote MCP | Hosted OAuth MCP setup in supported clients, including VS Code for Broker MCP | [Configure remote MCP](#manual-remote-mcp-configuration) |
| Local Trading MCP | Running Trading and Market Data API tools locally with API keys | [Run locally](#run-trading-mcp-locally) |
| Alpaca Trading CLI | Terminal, scripts, CI, and focused agent actions | [Use the CLI](#alpaca-trading-cli) |

Use Trading MCP for an individual Alpaca trading account and market data. Use [Broker MCP](https://docs.alpaca.markets/us/docs/broker-mcp-server) if you're a broker partner building and operating end-customer investing experiences.

## Prerequisites

- An [Alpaca account](https://alpaca.markets/).
- A supported MCP client such as [Cursor](https://cursor.com), [Claude Code](https://www.anthropic.com/claude-code), [Codex](https://github.com/openai/codex), or [VS Code](https://code.visualstudio.com/).

## Agent Plugins

Plugins are the easiest way to connect Cursor, Claude Code, or Codex to Alpaca's hosted OAuth-protected MCP endpoints. No API keys to copy around — sign in with your Alpaca account on first use.

| Plugin | Bundled MCP servers |
| --- | --- |
| `alpaca-trading` | Trading API (live), Trading API (paper) |
| `alpaca-broker` | Broker API (live), Broker API (sandbox) |

| MCP server | Endpoint |
| --- | --- |
| `alpaca-trading` | `https://api.alpaca.markets/mcp` |
| `alpaca-trading-paper` | `https://paper-api.alpaca.markets/mcp` |
| `alpaca-broker` | `https://broker-api.alpaca.markets/mcp` |
| `alpaca-broker-sandbox` | `https://broker-api.sandbox.alpaca.markets/mcp` |

Both Trading MCP servers expose Market Data API tools alongside trading tools, so a single connection covers account, order, position, portfolio, and market data workflows.

Install one or both plugins depending on whether you're building trading or broker workflows.

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

## Manual Remote MCP Configuration

If you don't want to use a plugin, copy the JSON for your client below. Use only that client's configuration because each client has its own sign-in settings.

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

#### VS Code

Add either or both servers to `.vscode/mcp.json`:

```json
{
  "servers": {
    "alpaca-broker-mcp": {
      "type": "http",
      "url": "https://broker-api.alpaca.markets/mcp"
    },
    "alpaca-broker-mcp-sandbox": {
      "type": "http",
      "url": "https://broker-api.sandbox.alpaca.markets/mcp"
    }
  }
}
```

Open the command palette, run `MCP: List Servers`, select a server, and click **Start Server** to begin its OAuth flow. See the [Broker MCP VS Code setup](https://docs.alpaca.markets/us/docs/broker-mcp-server#vs-code) for details.

## Run Trading MCP Locally

Run the open-source [Trading MCP Server](https://github.com/alpacahq/alpaca-mcp-server/) locally when you want API-key authentication or control over the server process and toolsets. See the [Trading MCP Server documentation](https://docs.alpaca.markets/us/docs/alpaca-mcp-server) for setup instructions.

## Alpaca Trading CLI

The Alpaca Trading CLI provides direct access to the Trading and Market Data APIs from your terminal. Use it for scripts, CI, or focused agent actions where a command-and-structured-output workflow is a better fit than a long-running MCP session.

See the [Trading CLI documentation](https://docs.alpaca.markets/us/docs/alpacas-cli) for installation and usage, or start with the [Trading API documentation](https://docs.alpaca.markets/us/docs/trading-api) for API concepts and capabilities.
