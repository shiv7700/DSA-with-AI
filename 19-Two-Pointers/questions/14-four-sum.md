# Q14 — 4Sum

**Difficulty:** Medium
**Pattern:** Two Pointers (sort + fix two + opposite ends)
**Expected:** O(n³) time · O(1) extra space (excluding output)

## Problem

Given an integer array `nums` and an integer `target`, return all unique quadruplets `[nums[a], nums[b], nums[c], nums[d]]` such that:
- `a`, `b`, `c`, `d` are distinct indices.
- `nums[a] + nums[b] + nums[c] + nums[d] === target`.

The solution set must not contain duplicate quadruplets.

## Examples

### Example 1
```
Input:  nums = [1, 0, -1, 0, -2, 2],  target = 0
Output: [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]
```

### Example 2
```
Input:  nums = [2, 2, 2, 2, 2],  target = 8
Output: [[2, 2, 2, 2]]
```

### Example 3
```
Input:  nums = [0, 0, 0, 0],  target = 0
Output: [[0, 0, 0, 0]]
```

## Constraints
- `1 <= nums.length <= 200`
- `-10^9 <= nums[i] <= 10^9`
- `-10^9 <= target <= 10^9`

## Hints

<details>
<summary>Hint 1 — reduce to 3Sum, which reduces to 2Sum</summary>

Sort the array. Add an outer loop for index `i` (first element). Inside it, add a second loop for index `j > i` (second element). Now find two more elements from `nums[j+1..n-1]` that sum to `target - nums[i] - nums[j]` — that's Two Sum II.
</details>

<details>
<summary>Hint 2 — skipping duplicates at both outer levels</summary>

At the `i` level: skip if `nums[i] === nums[i-1]` (and `i > 0`).
At the `j` level: skip if `nums[j] === nums[j-1]` (and `j > i + 1`).
After finding a quadruplet, skip duplicate `left` and `right` values as in 3Sum.
</details>

<details>
<summary>Hint 3 — pruning</summary>

You can add an early-exit: if the four smallest possible values (at current i, j, j+1, j+2) are already larger than `target`, break. If the four largest possible values are smaller than `target`, continue to the next `j`.
</details>

## Write your solution
→ [`../solutions/14-four-sum.js`](../solutions/14-four-sum.js)

## Follow-ups
- What's the pattern for K-Sum? (One outer loop per extra element, down to Two Sum II at the innermost level. Time complexity: O(n^(K-1)).)
- Compare with Q12 (3Sum) and Q11 (Two Sum II) — the same two-pointer core, wrapped in more loops.
