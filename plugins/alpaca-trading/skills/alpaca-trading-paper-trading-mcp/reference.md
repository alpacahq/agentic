# Paper Trading MCP Reference

Companion to [SKILL.md](SKILL.md). Read the workflow and guardrails there first.

## MCP server setup

Current MCP v2 installations use `uvx alpaca-mcp-server` with credentials in server configuration:

```json
{
  "mcpServers": {
    "alpaca-paper-trading": {
      "command": "uvx",
      "args": ["alpaca-mcp-server"],
      "env": {
        "ALPACA_API_KEY": "configured-outside-chat",
        "ALPACA_SECRET_KEY": "configured-outside-chat",
        "ALPACA_PAPER_TRADE": "true"
      }
    }
  }
}
```

`ALPACA_PAPER_TRADE` defaults to `true`; set it explicitly so paper mode is visible in configuration rather than inherited.

Never paste real credentials into chat, tool arguments, artifacts, or committed configuration.

## Runtime discovery

1. Discover the Alpaca Trading namespace.
2. Inspect namespace status and authenticate through the supported MCP flow when required.
3. Inspect each tool's current schema before calling it.
4. Select the asset-specific stock, option, or crypto order tool exposed by that schema.
5. Discover account, asset, clock, order lookup, cancellation, replacement, and position tools independently.

Do not carry V1 tool knowledge into V2. V2 is a rewrite, and a tool name can be identical to its V1 counterpart while the schema underneath differs — a call that resolves by name can still fail on parameters. Never invent a parameter absent from the discovered schema. Rediscover after a schema error.

## Paper verification

An account response alone does not prove the server is using paper. Before every submission, require trusted server configuration or tool metadata showing paper mode, then verify that the account is active and not blocked.

The paper flag is readable only from the client's MCP configuration, which also holds the API credentials in the same `env` block. Extract that single field; never read, print, or echo the file or the server entry as a whole. Treat an absent flag as paper, because the server defaults to it, but treat an unidentifiable server entry or an unparsable config as inconclusive rather than absent — the two look identical in a naive read and only one of them passes.

Stop if paper mode cannot be proven. Do not fall back to CLI, SDK, or REST calls for Alpaca data; reading the local config for this gate reaches no Alpaca endpoint and is not that fallback.

## MCP execution rules

- Build and display the exact discovered tool arguments before confirmation.
- Generate a unique client order ID when the selected schema supports it.
- Derive valid order types, time-in-force values, prices, and quantity rules from the asset-specific schema.
- Capture relevant MCP requests and responses explicitly because tool calls do not automatically create run artifacts.
- Never pass credentials as tool arguments.
- After an ambiguous submission failure, use a discovered client-order-ID lookup before retrying.
- On authentication or authorization failure, stop and ask the user to repair server configuration.
- Gate the unscoped and irreversible tools. Bulk cancellation, bulk liquidation, single-position liquidation, and options exercise instructions all reach holdings the session never created. Enumerate the affected orders or positions, then require an explicit confirmation that per-order confirmation mode cannot waive.
- Treat liquidation as order entry, not deletion. The close tools submit market sell orders, so they respect market hours, queue to the next open when the market is closed, and fill at a price unknown at approval time. Track the returned order to a terminal state before reporting the position closed.

## Validation

Verify account status, buying power, asset tradability, market session, and asset-specific permissions before submission. For options, confirm contract or leg details and position intent from the current schema. For crypto, verify pair format, precision, minimum size, and supported order combinations.

Persist submit, status, cancel, and replace events in `orders.json` and `order_log.csv`, excluding credentials and unrelated account data.
