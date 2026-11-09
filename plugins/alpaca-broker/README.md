# Alpaca Broker API

Connects your agent to Alpaca's Broker API through hosted, OAuth-protected MCP servers. Use it if you're an Alpaca broker partner building and operating end-customer experiences.

## MCP servers

| Server | Endpoint |
| --- | --- |
| `alpaca-broker` | `https://broker-api.alpaca.markets/mcp` |
| `alpaca-broker-sandbox` | `https://broker-api.sandbox.alpaca.markets/mcp` |

## Setup

You need an [Alpaca Broker API dashboard](https://broker-app.alpaca.markets) account.

```bash
claude plugin marketplace add alpacahq/agentic
```

Run `/plugin`, install `alpaca-broker` from the `alpaca-plugins` marketplace, then run `/reload-plugins`. Use `/mcp` to start a server and approve access in the Broker API dashboard.

For Cursor and Codex, see the [repository README](https://github.com/alpacahq/agentic#agent-plugins).

## Links

- [Alpaca documentation](https://docs.alpaca.markets)
- [Privacy policy](https://s3.amazonaws.com/files.alpaca.markets/disclosures/PrivacyPolicy.pdf)
