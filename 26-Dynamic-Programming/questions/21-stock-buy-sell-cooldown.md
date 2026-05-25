# Q21 — Best Time to Buy and Sell Stock with Cooldown

**Difficulty:** Medium
**Pattern:** 1D DP with state machine — hold / sold / rest states
**Expected:** O(n) time · O(1) space

## Problem

You have an array `prices` where `prices[i]` is the price of a stock on day `i`. You may buy and sell on multiple occasions, but:
- After you sell a stock, you must wait one day before buying again (cooldown).
- You may not hold more than one share at a time.

Return the maximum profit you can achieve.

## Examples

### Example 1
```
Input:  prices = [1, 2, 3, 0, 2]
Output: 3
```
Buy on day 0 (1), sell on day 1 (2), cooldown on day 2, buy on day 3 (0), sell on day 4 (2). Profit = 1 + 2 = 3.

### Example 2
```
Input:  prices = [1]
Output: 0
```

## Constraints
- `1 <= prices.length <= 5000`
- `0 <= prices[i] <= 1000`

## Hints

<details>
<summary>Hint 1 — identify the states</summary>

At the end of each day, you are in one of three states:
1. **hold** — you're holding a stock.
2. **sold** — you just sold a stock today (this triggers a cooldown tomorrow).
3. **rest** — you're in cooldown or just choosing not to trade (available to buy tomorrow).
</details>

<details>
<summary>Hint 2 — the transitions</summary>

```
hold  = max(hold,            rest - prices[i])   // keep holding OR buy today (from rest only)
sold  = hold + prices[i]                          // sell today (from hold)
rest  = max(rest, sold)                           // cooldown carries previous sold or rest
```

Apply transitions simultaneously (compute new values before overwriting old ones).
</details>

<details>
<summary>Hint 3 — initial values</summary>

On day 0 (before any transactions):
- `hold = -prices[0]` (if you decide to buy on day 0)
- `sold = -Infinity` (impossible to have just sold before day 0)
- `rest = 0` (you start in rest with 0 profit)
</details>

<details>
<summary>Hint 4 — the answer</summary>

After processing all days, return `max(sold, rest)`. You can never end in the `hold` state profitably (you'd have to sell first).
</details>

## Write your solution
→ [`../solutions/21-stock-buy-sell-cooldown.js`](../solutions/21-stock-buy-sell-cooldown.js)

## Follow-ups
- **Best Time to Buy and Sell Stock with Transaction Fee** — same structure but subtract a fee on each sell.
- **Best Time to Buy and Sell Stock III** — at most 2 transactions (add a transaction count to the state).
