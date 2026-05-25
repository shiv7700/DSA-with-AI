# Q12 — Best Time to Buy and Sell a Stock

**Difficulty:** Medium
**Pattern:** Single pass / running minimum
**Expected:** O(n) time · O(1) space

## Problem

You are given an array `prices`, where `prices[i]` is the price of a stock on day `i`. You can make **at most one transaction** — buy on one day and sell on a strictly later day. Return the **maximum profit** you can achieve.

If no profitable trade is possible, return `0`.

> **Important:** you must buy **before** you sell. You cannot "sell" on day 0 and "buy" on day 5.

## Examples

### Example 1
```
Input:  prices = [7, 1, 5, 3, 6, 4]
Output: 5
```
Buy on day 1 (price = 1), sell on day 4 (price = 6). Profit = `6 - 1 = 5`.

### Example 2
```
Input:  prices = [7, 6, 4, 3, 1]
Output: 0
```
The price only ever falls. No profitable trade is possible.

### Example 3
```
Input:  prices = [2, 4, 1]
Output: 2
```
Buy on day 0 (price = 2), sell on day 1 (price = 4). Profit = 2. (Day 2 has a lower price but we already had to commit to the sale.)

### Example 4 (single day)
```
Input:  prices = [5]
Output: 0
```

## Constraints
- `1 <= prices.length <= 10^5`
- `0 <= prices[i] <= 10^4`
- Only one buy and one sell. Buy day must be strictly before sell day.

## Hints

<details>
<summary>Hint 1 — brute force (too slow)</summary>

Try every (buy day, sell day) pair: O(n²). Times out for `n = 100,000`.
</details>

<details>
<summary>Hint 2 — the key insight</summary>

For each day, ask yourself: "If I sold **today**, what's the best profit I could have made?"

The answer is: **today's price minus the lowest price I've seen so far**. So as you walk through the array, you only need to track two things:
- the minimum price seen up to now
- the best profit seen so far
</details>

<details>
<summary>Hint 3 — the single-pass loop</summary>

```
minPrice = Infinity
maxProfit = 0

for each price p:
    minPrice = min(minPrice, p)
    maxProfit = max(maxProfit, p - minPrice)

return maxProfit
```

That's the whole algorithm. O(n) time, O(1) space.
</details>

## Write your solution
→ [`../solutions/12-best-time-to-buy-sell-stock.js`](../solutions/12-best-time-to-buy-sell-stock.js)

## Follow-ups
- **Best Time II** — unlimited transactions allowed.
- **Best Time III** — at most two transactions.
- **Best Time IV** — at most `k` transactions.
- With a cooldown day after each sale, or a fixed fee per transaction.

These variants are part of the Dynamic Programming topic later.
