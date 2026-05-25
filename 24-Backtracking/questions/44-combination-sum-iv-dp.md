# Q44 — Combination Sum IV → DP (Optimization Drill)

**Difficulty:** Medium
**Pattern:** Converting ordered-combination backtracking to bottom-up DP
**Expected:** O(target · n) time · O(target) space

## Problem

This is the same problem as Q9 (Combination Sum IV): given an array of distinct positive integers `nums` and a `target`, return the number of **ordered** sequences of numbers from `nums` that sum to `target`. Repetition is allowed; order matters.

**The goal of this exercise is to arrive at the DP solution deliberately** by analyzing why the backtracking approach has overlapping subproblems, memoizing it, and then unwrapping the recursion into a bottom-up table.

## Examples

### Example 1
```
Input:  nums = [1, 2, 3], target = 4
Output: 7
```
Ordered sequences: `[1,1,1,1]`, `[1,1,2]`, `[1,2,1]`, `[1,3]`, `[2,1,1]`, `[2,2]`, `[3,1]`.

### Example 2
```
Input:  nums = [9], target = 3
Output: 0
```

## Constraints
- `1 <= nums.length <= 200`
- `1 <= nums[i] <= 1000`
- All elements of `nums` are unique.
- `1 <= target <= 1000`

## Hints

<details>
<summary>Hint 1 — why this differs from Combination Sum I</summary>

In Combination Sum I, order does not matter: `[1, 2]` and `[2, 1]` are the same combination. Here they are different. The key consequence: in the recursion, you iterate over **all** elements of `nums` at each level (not just from `start`), allowing any element to be picked next regardless of what was picked before.
</details>

<details>
<summary>Hint 2 — identify the overlapping subproblem</summary>

`f(remaining)` = number of ordered ways to sum to `remaining`. Two different paths can arrive at the same `remaining` value. For example, reaching `remaining = 2` via `[1, 1]` and via `[2]` are the same sub-problem. Memoize by `remaining`.
</details>

<details>
<summary>Hint 3 — bottom-up DP recurrence</summary>

`dp[0] = 1`. For each `t` from 1 to `target`, `dp[t] = sum of dp[t - num]` for each `num` in `nums` where `t >= num`. The answer is `dp[target]`.
</details>

## Write your solution
→ [`../solutions/44-combination-sum-iv-dp.js`](../solutions/44-combination-sum-iv-dp.js)

## Follow-ups
- Compare the runtime of your backtracking solution (Q9) with the DP solution here on `target = 1000`.
- The "order matters" condition makes this like counting paths in a DAG — can you draw that DAG?
- **Climbing Stairs** — `dp[n] = dp[n-1] + dp[n-2]` is the same structure with `nums = [1, 2]`.
