# Q09 — Coin Change II

**Difficulty:** Medium
**Pattern:** 1D DP — unbounded choice, count combinations
**Expected:** O(n × amount) time · O(amount) space

## Problem

You are given an integer array `coins` representing coin denominations and an integer `amount`. Return the **number of distinct combinations** that add up to exactly `amount`.

The order of coins does **not** matter (`[1, 5]` and `[5, 1]` are the same combination).

## Examples

### Example 1
```
Input:  coins = [1, 2, 5], amount = 5
Output: 4
```
Combinations: `[5]`, `[2, 2, 1]`, `[2, 1, 1, 1]`, `[1, 1, 1, 1, 1]`.

### Example 2
```
Input:  coins = [2], amount = 3
Output: 0
```
No combination adds up to 3.

### Example 3
```
Input:  coins = [10], amount = 10
Output: 1
```

## Constraints
- `1 <= coins.length <= 300`
- `1 <= coins[i] <= 5000`
- All values in `coins` are distinct.
- `0 <= amount <= 5000`

## Hints

<details>
<summary>Hint 1 — counting combinations vs permutations</summary>

If you loop over amounts in the outer loop and coins in the inner loop (like Coin Change I), you'll count permutations (orderings). To count **combinations** (unordered), put coins in the outer loop and amounts in the inner loop. This ensures each coin is either "available" or "not" for a given range of amounts.
</details>

<details>
<summary>Hint 2 — the recurrence</summary>

`dp[a] += dp[a - coin]` for each coin `c` and each amount `a >= c`.

`dp[0] = 1` (there is one way to make 0: use no coins).
</details>

<details>
<summary>Hint 3 — why loop order matters</summary>

```js
// Counts combinations (each coin processed in full before the next)
for (const coin of coins) {
  for (let a = coin; a <= amount; a++) {
    dp[a] += dp[a - coin];
  }
}

// Would count permutations (all coins available at each amount)
for (let a = 1; a <= amount; a++) {
  for (const coin of coins) { ... }
}
```
</details>

## Write your solution
→ [`../solutions/09-coin-change-ii.js`](../solutions/09-coin-change-ii.js)

## Follow-ups
- **Combination Sum IV** — same problem but counting ordered combinations (permutations).
- How would you enumerate (print) all valid combinations instead of just counting them?
