# Q19 — Partition Equal Subset Sum

**Difficulty:** Medium
**Pattern:** Knapsack (0/1) — subset sum boolean DP
**Expected:** O(n × sum) time · O(sum) space

## Problem

Given an integer array `nums`, return `true` if you can partition it into **two subsets** such that the sum of elements in each subset is equal.

## Examples

### Example 1
```
Input:  nums = [1, 5, 11, 5]
Output: true
```
Subsets: `[1, 5, 5]` and `[11]`. Both sum to 11.

### Example 2
```
Input:  nums = [1, 2, 3, 5]
Output: false
```
No valid partition exists.

## Constraints
- `1 <= nums.length <= 200`
- `1 <= nums[i] <= 100`

## Hints

<details>
<summary>Hint 1 — reduce to subset sum</summary>

If the total sum is odd, the answer is immediately `false` (you can't split an odd number equally). Otherwise, you need to check if any subset sums to `totalSum / 2`. This is the classic **Subset Sum** problem.
</details>

<details>
<summary>Hint 2 — define dp</summary>

`dp[w]` = `true` if some subset of the numbers seen so far sums to exactly `w`. Start with `dp[0] = true` (the empty subset sums to 0) and all others `false`.
</details>

<details>
<summary>Hint 3 — the 0/1 knapsack update (traverse capacity backwards!)</summary>

For each number `num` in `nums`, update the dp array:

```js
for (let w = target; w >= num; w--) {
  dp[w] = dp[w] || dp[w - num];
}
```

Traverse from high to low to ensure each number is used **at most once** (0/1 knapsack property).
</details>

<details>
<summary>Hint 4 — early exit</summary>

If `dp[target]` becomes `true` during the loop, you can return early.
</details>

## Write your solution
→ [`../solutions/19-partition-equal-subset-sum.js`](../solutions/19-partition-equal-subset-sum.js)

## Follow-ups
- **Target Sum** (Q20) — assign `+` or `-` to each element to reach a target.
- **Last Stone Weight II** — minimizing the difference between two partitions.
- **Subset Sum Count** — count the number of subsets summing to `target`.
