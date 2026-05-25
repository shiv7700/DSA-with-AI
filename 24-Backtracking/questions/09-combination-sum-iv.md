# Q9 — Combination Sum IV (DP Boundary)

**Difficulty:** Medium
**Pattern:** Backtracking enumeration → memoized recursion → bottom-up DP
**Expected:** O(target · n) time · O(target) space (DP solution)

## Problem

Given an array of **distinct** integers `nums` and a target integer `target`, return the number of possible combinations that add up to `target`. The order of the numbers in a combination matters — `[1, 2]` and `[2, 1]` are treated as different combinations.

## Examples

### Example 1
```
Input:  nums = [1, 2, 3], target = 4
Output: 7
```
The seven ordered combinations: `[1,1,1,1]`, `[1,1,2]`, `[1,2,1]`, `[1,3]`, `[2,1,1]`, `[2,2]`, `[3,1]`.

### Example 2
```
Input:  nums = [9], target = 3
Output: 0
```

## Constraints
- `1 <= nums.length <= 200`
- `1 <= nums[i] <= 1000`
- All elements of `nums` are **unique**.
- `1 <= target <= 1000`

## Hints

<details>
<summary>Hint 1 — enumerate first to feel the overlap</summary>

Write a pure backtracking solution first (no memo). Try it on `nums = [1, 2, 3], target = 4`. Notice that computing "how many ways to reach sum 2 from 0?" is done multiple times via different paths. These are overlapping subproblems.
</details>

<details>
<summary>Hint 2 — memoize the recursive call</summary>

The recursion only depends on `remaining`. Add a `memo` map: before recursing, check `memo.get(remaining)`; after computing, store the result. This reduces the time from exponential to O(target · n).
</details>

<details>
<summary>Hint 3 — convert to bottom-up DP</summary>

Define `dp[i]` = number of ordered combinations summing to `i`. Base case: `dp[0] = 1`. For each `i` from 1 to `target`, for each `num` in `nums`: if `i >= num`, add `dp[i - num]` to `dp[i]`. The answer is `dp[target]`.
</details>

## Write your solution
→ [`../solutions/09-combination-sum-iv.js`](../solutions/09-combination-sum-iv.js)

## Follow-ups
- **Climbing Stairs** — a simpler version of this exact DP pattern.
- **Coin Change** — how many ways to make change (order doesn't matter — a different DP formulation).
- How does removing the "order matters" constraint change the DP recurrence?
