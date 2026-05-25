# Q7 — Combination Sum II

**Difficulty:** Medium
**Pattern:** Backtracking — each element used at most once, deduplicate via sort + skip
**Expected:** O(2^n) time · O(n) space (excluding output)

## Problem

Given a collection of candidate numbers (`candidates`) and a target number (`target`), find all unique combinations in `candidates` where the candidate numbers sum to `target`. Each number in `candidates` may only be used **once** in the combination. The solution set must not contain duplicate combinations.

## Examples

### Example 1
```
Input:  candidates = [10, 1, 2, 7, 6, 1, 5], target = 8
Output: [[1,1,6],[1,2,5],[1,7],[2,6]]
```
Note that `[1, 7]` appears once despite there being two `1`s in the input.

### Example 2
```
Input:  candidates = [2, 5, 2, 1, 2], target = 5
Output: [[1,2,2],[5]]
```

## Constraints
- `1 <= candidates.length <= 100`
- `1 <= candidates[i] <= 50`
- `1 <= target <= 30`

## Hints

<details>
<summary>Hint 1 — sort and advance start by 1</summary>

Sort first. Unlike Combination Sum I, you advance to `i + 1` when recursing (no reuse). This is the same as the Subsets template.
</details>

<details>
<summary>Hint 2 — deduplicate at the same depth level</summary>

After sorting, if `candidates[i] === candidates[i - 1]` and `i > start`, skip this iteration. You've already explored the subtree rooted at this value at this depth; exploring it again would produce identical combinations.
</details>

<details>
<summary>Hint 3 — pruning the sum</summary>

Sort also enables sum-based pruning: if `candidates[i] > remaining`, break the loop. Everything after is larger and will also overshoot.
</details>

## Write your solution
→ [`../solutions/07-combination-sum-ii.js`](../solutions/07-combination-sum-ii.js)

## Follow-ups
- **Subsets II** — exact same deduplication technique, but without a sum constraint.
- **Combination Sum** — the unlimited-reuse variant.
- How would you count the number of unique combinations without listing them?
