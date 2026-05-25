# Q29 — 0/1 Knapsack

**Difficulty:** Medium
**Pattern:** 2D knapsack DP — classic include/exclude
**Expected:** O(n × W) time · O(W) space

## Problem

You have `n` items. Item `i` has weight `weights[i]` and value `values[i]`. Your knapsack has a maximum weight capacity of `W`. Each item can be included **at most once**. Return the maximum total value you can carry.

## Examples

### Example 1
```
Input:
  weights = [1, 2, 3]
  values  = [6, 10, 12]
  W = 5

Output: 22
```
Take items 1 and 2 (weight 2+3=5, value 10+12=22).

### Example 2
```
Input:
  weights = [2, 3, 4, 5]
  values  = [3, 4, 5, 6]
  W = 5

Output: 7
```
Take item 0 (weight 2, value 3) and item 1 (weight 3, value 4). Total weight = 5, total value = 7.

## Constraints
- `1 <= n <= 100`
- `1 <= weights[i] <= 100`
- `1 <= values[i] <= 100`
- `1 <= W <= 500`

## Hints

<details>
<summary>Hint 1 — 2D DP state</summary>

`dp[i][w]` = maximum value using items `0..i-1` with weight limit `w`.

For each item `i`, either skip it (same value as `dp[i-1][w]`) or take it (add `values[i-1]` to the best solution without this item and with `w - weights[i-1]` capacity remaining).
</details>

<details>
<summary>Hint 2 — the recurrence</summary>

```
if weights[i-1] > w:
  dp[i][w] = dp[i-1][w]   // can't fit
else:
  dp[i][w] = max(dp[i-1][w], dp[i-1][w - weights[i-1]] + values[i-1])
```
</details>

<details>
<summary>Hint 3 — collapse to 1D (traverse backwards)</summary>

Use a single 1D `dp[0..W]` array. For each item, traverse from `W` down to `weights[i]`. Traversing backwards ensures each item is used at most once (a forward pass would allow reuse).

```js
for (const [w, v] of zip(weights, values)) {
  for (let cap = W; cap >= w; cap--) {
    dp[cap] = Math.max(dp[cap], dp[cap - w] + v);
  }
}
```
</details>

## Write your solution
→ [`../solutions/29-01-knapsack.js`](../solutions/29-01-knapsack.js)

## Follow-ups
- **Unbounded Knapsack** — each item can be used any number of times (traverse forwards, not backwards).
- **Partition Equal Subset Sum** (Q19) — knapsack disguised as a partition problem.
- Reconstruct which items were selected.
