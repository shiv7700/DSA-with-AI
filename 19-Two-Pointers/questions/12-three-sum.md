# Q12 — 3Sum

**Difficulty:** Medium
**Pattern:** Two Pointers (sort + fix one + opposite ends)
**Expected:** O(n²) time · O(1) extra space (excluding output)

## Problem

Given an integer array `nums`, return all unique triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, `j != k`, and `nums[i] + nums[j] + nums[k] === 0`.

The solution set must not contain duplicate triplets.

## Examples

### Example 1
```
Input:  [-1, 0, 1, 2, -1, -4]
Output: [[-1, -1, 2], [-1, 0, 1]]
```

### Example 2
```
Input:  [0, 1, 1]
Output: []
```
No three numbers sum to zero.

### Example 3
```
Input:  [0, 0, 0]
Output: [[0, 0, 0]]
```

### Example 4
```
Input:  [-2, 0, 1, 1, 2]
Output: [[-2, 0, 2], [-2, 1, 1]]
```

## Constraints
- `3 <= nums.length <= 3000`
- `-10^5 <= nums[i] <= 10^5`
- No duplicate triplets in the result.

## Hints

<details>
<summary>Hint 1 — reduce to Two Sum II</summary>

Sort the array. Then, for each index `i`, the problem becomes: "find two numbers in `nums[i+1..n-1]` that sum to `-nums[i]`." That's Two Sum II on a sorted sub-array — exactly Q11.
</details>

<details>
<summary>Hint 2 — skipping duplicates</summary>

After sorting, duplicate values are adjacent. To avoid duplicate triplets:
- Skip `i` if `nums[i] === nums[i-1]` (same "fixed" value as last iteration).
- After finding a triplet, skip duplicate values of `left` and `right` by advancing the pointers past consecutive equal values.
</details>

<details>
<summary>Hint 3 — early exit</summary>

If `nums[i] > 0`, you can break the outer loop immediately — no two positive numbers can sum to `-nums[i]` (which would need to be negative) since the array is sorted. This is an optimization, not required for correctness.
</details>

## Write your solution
→ [`../solutions/12-three-sum.js`](../solutions/12-three-sum.js)

## Follow-ups
- Q13 (3Sum Closest) — instead of exact zero, find the triplet sum closest to a target.
- Q14 (4Sum) — add one more "fixed" element outer loop.
- Cross-reference: [02 — Arrays Q16 — 3Sum](../../02-Arrays/questions/16-three-sum.md)
