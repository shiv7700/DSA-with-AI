# Q08 — Coin Change

**Difficulty:** Medium
**Pattern:** 1D DP — unbounded choice, minimize
**Expected:** O(n × amount) time · O(amount) space

## Problem

You are given an integer array `coins` representing coin denominations and an integer `amount`. Return the **fewest number of coins** needed to make up exactly `amount`. If no combination of coins can make exactly `amount`, return `-1`.

You may use each coin denomination **an unlimited number of times**.

## Examples

### Example 1
```
Input:  coins = [1, 5, 10], amount = 12
Output: 3
```
10 + 1 + 1 = 12, using 3 coins.

### Example 2
```
Input:  coins = [2], amount = 3
Output: -1
```
There is no way to make 3 with only 2-cent coins.

### Example 3
```
Input:  coins = [1, 2, 5], amount = 11
Output: 3
```
5 + 5 + 1 = 11, using 3 coins.

## Constraints
- `1 <= coins.length <= 12`
- `1 <= coins[i] <= 2^31 - 1`
- `0 <= amount <= 10^4`

## Hints

<details>
<summary>Hint 1 — define the state</summary>

Let `dp[a]` = the minimum number of coins needed to make exactly `a` cents. Your answer is `dp[amount]`.
</details>

<details>
<summary>Hint 2 — the recurrence</summary>

For each amount `a` and each coin `c` (where `c <= a`):

`dp[a] = min(dp[a], dp[a - c] + 1)`

Read: "I can make `a` by using one coin `c` and solving the remaining `a - c`."
</details>

<details>
<summary>Hint 3 — initialize with Infinity</summary>

`dp[0] = 0` (zero coins make zero cents). All other cells start as `Infinity` (unknown / impossible). After the loop, if `dp[amount]` is still `Infinity`, return -1.
</details>

<details>
<summary>Hint 4 — fill order</summary>

Fill `dp[1]` through `dp[amount]` in order. For each `a`, loop over all coins. Since coins can be reused (unbounded), you don't need to iterate over them in any special order.
</details>

## Write your solution
→ [`../solutions/08-coin-change.js`](../solutions/08-coin-change.js)

## Follow-ups
- **Coin Change II** (Q09) — count the number of distinct combinations that sum to `amount`.
- What if each coin can be used at most once? (0/1 Knapsack variant)
- **Perfect Squares** (LC 279) — the same recurrence, where "coins" are perfect squares.
