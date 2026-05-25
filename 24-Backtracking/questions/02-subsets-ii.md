# Q2 — Subsets II (with Duplicates)

**Difficulty:** Medium
**Pattern:** Backtracking — include/exclude with duplicate skipping after sorting
**Expected:** O(n · 2^n) time · O(n) space (excluding output)

## Problem

Given an integer array `nums` that **may contain duplicate elements**, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.

## Examples

### Example 1
```
Input:  nums = [1, 2, 2]
Output: [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]]
```
The two `2`s are treated as indistinguishable; `[1, 2]` appears only once.

### Example 2
```
Input:  nums = [0]
Output: [[], [0]]
```

## Constraints
- `1 <= nums.length <= 10`
- `-10 <= nums[i] <= 10`

## Hints

<details>
<summary>Hint 1 — sort first</summary>

Sorting the array brings equal elements adjacent to each other. This is a prerequisite for the duplicate-skipping logic to work correctly.
</details>

<details>
<summary>Hint 2 — when to skip</summary>

Inside the loop, if `nums[i] === nums[i - 1]` and `i > start`, you are about to make the same choice at the same recursion depth that you already made in the previous iteration. Skip it. The key is `i > start` — do NOT use `i > 0`, which would also skip the element when it is the first valid choice at this depth.
</details>

<details>
<summary>Hint 3 — why i > start matters</summary>

Consider `nums = [2, 2]` with `start = 0`. When `i = 1`, `nums[1] === nums[0]` but `i > start` (1 > 0) is true, so we skip — correct, because `[2]` from the second `2` would duplicate `[2]` from the first. However, `[2, 2]` is still generated because it comes from `i = 0` going deeper to `i = 1`, not from the top-level loop skipping.
</details>

## Write your solution
→ [`../solutions/02-subsets-ii.js`](../solutions/02-subsets-ii.js)

## Follow-ups
- **Combination Sum II** — similar duplicate-skipping applies when looking for subsets that sum to a target.
- **Permutations II** — the same idea (sort + skip at same depth) handles duplicates in permutations.
