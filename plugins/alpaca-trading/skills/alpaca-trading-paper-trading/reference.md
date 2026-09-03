# Paper Trading Reference

Companion to [SKILL.md](SKILL.md). Read the workflow and guardrails there first.

## Authoritative sources

- [Trading API](https://docs.alpaca.markets/us/docs/trading-api)
- [Working with orders](https://docs.alpaca.markets/us/docs/working-with-orders)
- [Orders at Alpaca](https://docs.alpaca.markets/us/docs/orders-at-alpaca)
- [Paper trading](https://docs.alpaca.markets/us/docs/paper-trading)
- [Working with accounts](https://docs.alpaca.markets/us/docs/working-with-account)
- [Working with positions](https://docs.alpaca.markets/us/docs/working-with-positions)
- [Working with assets](https://docs.alpaca.markets/us/docs/working-with-assets)
- [Options trading](https://docs.alpaca.markets/us/docs/options-trading)
- [Crypto trading](https://docs.alpaca.markets/us/docs/crypto-trading)

Verify current SDK types or API schemas before constructing an order. Supported order types, time-in-force values, extended-hours behavior, and quantity rules differ by asset class.

## REST operations

Use `https://paper-api.alpaca.markets` and verify it before every submission.

| Operation | Method and path |
|---|---|
| Account | `GET /v2/account` |
| Account configuration | `GET /v2/account/configurations`, `PATCH /v2/account/configurations` |
| Portfolio history | `GET /v2/account/portfolio/history` |
| Clock | `GET /v2/clock` |
| Calendar | `GET /v2/calendar` |
| Asset | `GET /v2/assets/{symbol_or_asset_id}` |
| Submit order | `POST /v2/orders` |
| List orders | `GET /v2/orders` |
| Get order | `GET /v2/orders/{order_id}` |
| Get by client order ID | `GET /v2/orders:by_client_order_id` |
| Replace order | `PATCH /v2/orders/{order_id}` |
| Cancel order | `DELETE /v2/orders/{order_id}` |
| Cancel all orders | `DELETE /v2/orders` |
| List positions | `GET /v2/positions` |
| Get position | `GET /v2/positions/{symbol_or_asset_id}` |
| Close position | `DELETE /v2/positions/{symbol_or_asset_id}` |
| Close all positions | `DELETE /v2/positions` |
| List option contracts | `GET /v2/options/contracts` |
| Get option contract | `GET /v2/options/contracts/{symbol_or_id}` |
| Exercise option position | `POST /v2/positions/{symbol_or_contract_id}/exercise` |
| Do not exercise option position | `POST /v2/positions/{symbol_or_contract_id}/do-not-exercise` |

Resolve option contracts through the contracts endpoints before submitting an option order; the OCC symbol alone does not confirm that a contract exists or is tradable. Cancel-all and close-all act on the whole account with no per-item confirmation, so preview the affected set first.

Confirm exact parameters and authentication headers against the current API specification.

## Validation rules

- Require `symbol`, `side`, one of quantity or notional, order type, and time in force.
- Require all prices implied by the selected order type or order class.
- Generate a unique `client_order_id` for each logical order.
- Verify paper configuration, account status, buying power, asset tradability, and asset-specific permissions.
- For options, resolve the contract and confirm every leg, position intent, multiplier, expiration, and approval requirement.
- For crypto, verify the pair, precision, minimum size, and supported order combinations.
- After an ambiguous timeout, query by client order ID before retrying.

## Portfolio formulas

```text
estimated_equity_notional = quantity × reference_price
estimated_option_premium = contracts × option_price × contract_multiplier
position_concentration_pct = abs(position.market_value) / equity × 100
buying_power_change = buying_power_after - buying_power_before
```

Prefer authoritative account and position fields when available, and label estimates.
