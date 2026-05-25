# Q3 — Best Time to Buy and Sell Stock II

**Difficulty:** Easy
**Pattern:** Greedy · Collect every upswing
**Expected:** O(n) time · O(1) space

## Problem

You are given an integer array `prices` where `prices[i]` is the price of a stock on day `i`. On any day you may buy **one share** of stock, and on any later day you may sell it. You can hold at most one share at a time, but you can complete **as many transactions as you like** (buying and selling on the same day is allowed).

Return the **maximum profit** you can achieve.

> **Note:** this is **not** the classic "one transaction" problem. Unlimited transactions changes everything.

## Examples

### Example 1
```
Input:  prices = [7, 1, 5, 3, 6, 4]
Output: 7
```
Buy on day 2 (price 1), sell on day 3 (price 5): profit = 4.
Buy on day 4 (price 3), sell on day 5 (price 6): profit = 3.
Total: 7.

### Example 2
```
Input:  prices = [1, 2, 3, 4, 5]
Output: 4
```
Buy on day 1, sell on day 5: profit = 4. (Or buy and sell each consecutive day: 1+1+1+1 = 4.)

### Example 3
```
Input:  prices = [7, 6, 4, 3, 1]
Output: 0
```
Prices only decrease — never buy.

## Constraints
- `1 <= prices.length <= 3 * 10^4`
- `0 <= prices[i] <= 10^4`

## Hints

<details>
<summary>Hint 1 — what's the greedy rule?</summary>

Think about what happens between any two consecutive days. If `prices[i+1] > prices[i]`, you'd want to capture that gain. With unlimited transactions, you can always "buy yesterday, sell today" for every upswing.

The greedy rule: **collect every positive day-over-day difference**.
</details>

<details>
<summary>Hint 2 — why does it work for this problem?</summary>

Any multi-day profit (e.g., buy on day 1, sell on day 4) equals the sum of the consecutive day differences in between. So collecting all positive day-differences is equivalent to capturing every profitable multi-day run. You can't do better than capturing all upswings — and you can always capture them all with back-to-back transactions.

`profit = sum of max(0, prices[i] - prices[i-1]) for all i from 1 to n-1`
</details>

<details>
<summary>Hint 3 — implementation</summary>

```js
let profit = 0;
for (let i = 1; i < prices.length; i++) {
  if (prices[i] > prices[i - 1]) {
    profit += prices[i] - prices[i - 1];
  }
}
return profit;
```

That's the entire solution. One pass, no extra space.
</details>

## Write your solution
→ [`../solutions/03-best-time-buy-sell-stock-ii.js`](../solutions/03-best-time-buy-sell-stock-ii.js)

## Follow-ups
- **Best Time to Buy and Sell Stock** (one transaction only) — uses a different O(n) approach.
- **Best Time to Buy and Sell Stock III** — at most two transactions — requires DP.
- What if there's a transaction fee per sale?
