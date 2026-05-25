# Q6 — Combination Sum

**Difficulty:** Medium
**Pattern:** Backtracking — unlimited reuse of candidates, prune when remaining < 0
**Expected:** O(n^(t/m)) time · O(t/m) space — where t is target and m is smallest candidate

## Problem

Given an array of **distinct** integers `candidates` and a target integer `target`, return a list of all **unique combinations** of `candidates` where the chosen numbers sum to `target`. The same number may be chosen from `candidates` an **unlimited number of times**. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

## Examples

### Example 1
```
Input:  candidates = [2, 3, 6, 7], target = 7
Output: [[2,2,3],[7]]
```
`2+2+3 = 7` and `7 = 7` are the only combinations.

### Example 2
```
Input:  candidates = [2, 3, 5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]
```

### Example 3
```
Input:  candidates = [2], target = 1
Output: []
```
No combination sums to 1 using only 2s.

## Constraints
- `1 <= candidates.length <= 30`
- `2 <= candidates[i] <= 40`
- All elements of `candidates` are **distinct**.
- `1 <= target <= 40`

## Hints

<details>
<summary>Hint 1 — allow re-use by not advancing start</summary>

In the Subsets template, you pass `i + 1` to prevent reusing the current element. Here, pass `i` instead — the same candidate can be picked again.
</details>

<details>
<summary>Hint 2 — track remaining sum, prune on overshoot</summary>

Pass `remaining = target - sum so far` through the recursion. If `remaining === 0`, record a clone. If `remaining < 0`, return immediately — further additions will only make it worse.
</details>

<details>
<summary>Hint 3 — sort to enable early loop exit</summary>

Sort `candidates` first. Then inside the loop, if `candidates[i] > remaining`, you can `break` (not just `continue`) because all subsequent candidates are also too large. This converts a full tree traversal into a pruned one.
</details>

## Write your solution
→ [`../solutions/06-combination-sum.js`](../solutions/06-combination-sum.js)

## Follow-ups
- **Combination Sum II** — each number may only be used once and the input may contain duplicates.
- **Combination Sum III** — pick exactly `k` numbers from 1–9.
- **Combination Sum IV** — count the number of ordered arrangements (this one is DP, not backtracking).
