# Alpaca Trading API

Connects your agent to Alpaca's Trading and Market Data APIs through hosted, OAuth-protected MCP servers. Use it for account, order, position, portfolio, and market data workflows.

## MCP servers

| Server | Endpoint |
| --- | --- |
| `alpaca-trading` | `https://api.alpaca.markets/mcp` |
| `alpaca-trading-paper` | `https://paper-api.alpaca.markets/mcp` |

## Setup

You need an [Alpaca Trading API dashboard](https://app.alpaca.markets) account.

```bash
claude plugin marketplace add alpacahq/agentic
```

Run `/plugin`, install `alpaca-trading` from the `alpaca-plugins` marketplace, then run `/reload-plugins`. Use `/mcp` to start a server and approve access in the Alpaca Trading API dashboard.

For Cursor and Codex, see the [repository README](https://github.com/alpacahq/agentic#agent-plugins).

## Links

- [Alpaca documentation](https://docs.alpaca.markets)
- [Privacy policy](https://s3.amazonaws.com/files.alpaca.markets/disclosures/PrivacyPolicy.pdf)
