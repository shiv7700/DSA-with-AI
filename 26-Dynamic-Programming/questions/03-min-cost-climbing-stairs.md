# Q03 — Min Cost Climbing Stairs

**Difficulty:** Easy
**Pattern:** 1D linear DP — cost minimization
**Expected:** O(n) time · O(1) space

## Problem

You are given an integer array `cost` where `cost[i]` is the cost of stepping onto stair `i`. Once you pay the cost, you can climb one or two steps.

You may start from index `0` or index `1`. Return the minimum cost to reach the top of the floor (one step past the last stair).

## Examples

### Example 1
```
Input:  cost = [10, 15, 20]
Output: 15
```
Start at index 1 (cost 15), then jump 2 steps to the top. Total: 15.

### Example 2
```
Input:  cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
Output: 6
```
Path: index 0 → 2 → 3 → 4 → 6 → 7 → 9 → top. Total: 1+1+1+1+1+1 = 6.

## Constraints
- `2 <= cost.length <= 1000`
- `0 <= cost[i] <= 999`

## Hints

<details>
<summary>Hint 1 — define dp[i] clearly</summary>

Let `dp[i]` = the minimum total cost to reach step `i` (i.e., the cost you've paid *before* stepping onto `i`). The "top" is a virtual step at index `n` (one past the last stair).
</details>

<details>
<summary>Hint 2 — the recurrence</summary>

To arrive at step `i`, you either:
- Stepped from `i-1`, paying `cost[i-1]` then moving 1 step: `dp[i-1] + cost[i-1]`
- Stepped from `i-2`, paying `cost[i-2]` then moving 2 steps: `dp[i-2] + cost[i-2]`

Take the minimum: `dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2])`.
</details>

<details>
<summary>Hint 3 — base cases and where to return</summary>

`dp[0] = 0` and `dp[1] = 0` (you can start at either position for free). Return `dp[n]` where `n = cost.length`.
</details>

<details>
<summary>Hint 4 — space optimization</summary>

`dp[i]` only depends on `dp[i-1]` and `dp[i-2]`. Replace the array with two variables.
</details>

## Write your solution
→ [`../solutions/03-min-cost-climbing-stairs.js`](../solutions/03-min-cost-climbing-stairs.js)

## Follow-ups
- What if you could take 1, 2, or 3 steps?
- **House Robber** (Q04) — same "skip adjacent" pattern, but maximizing instead of minimizing.
