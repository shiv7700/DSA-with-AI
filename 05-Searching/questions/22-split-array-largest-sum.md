# Q22 — Split Array Largest Sum

**Difficulty:** Hard
**Pattern:** Binary search on the answer space — minimize maximum subarray sum
**Expected:** O(n log(sum)) time · O(1) space

## Problem

Given an integer array `nums` and an integer `k`, split `nums` into `k` non-empty contiguous subarrays. Minimize the **largest sum** among the `k` subarrays and return it.

> **This is Q21 under a different name.** "Painter's Partition" and "Split Array Largest Sum" are the same problem: split a sequence into at most k groups, minimize the maximum group sum. LeetCode 410 uses this exact formulation. Solve it again to lock the pattern in.

## Examples

### Example 1
```
Input:  nums = [7, 2, 5, 10, 8], k = 2
Output: 18

Split options:
[7]       | [2, 5, 10, 8]  → max = 25
[7, 2]    | [5, 10, 8]     → max = 23
[7, 2, 5] | [10, 8]        → max = 18  ✓
[7, 2, 5, 10] | [8]        → max = 24
```

### Example 2
```
Input:  nums = [1, 2, 3, 4, 5], k = 2
Output: 9

Split: [1, 2, 3] | [4, 5] → max(6, 9) = 9 ✓
```

### Example 3 (k equals length)
```
Input:  nums = [1, 4, 4], k = 3
Output: 4   (each element is its own group)
```

## Constraints
- `1 <= nums.length <= 1000`
- `0 <= nums[i] <= 10^6`
- `1 <= k <= min(50, nums.length)`

## Hints

<details>
<summary>Hint 1 — recognize the pattern</summary>

The answer lies between `max(nums)` (when k = n, each element is its own group) and `sum(nums)` (when k = 1). Binary search on this range.
</details>

<details>
<summary>Hint 2 — feasibility: can you split into at most k groups with max sum ≤ mid?</summary>

Greedy: go left to right. Keep a running sum. When adding the next element would exceed `mid`, start a new group. Count groups. If `groups <= k`, feasible.
</details>

<details>
<summary>Hint 3 — dynamic programming alternative</summary>

`dp[i][j]` = minimum largest sum when splitting `nums[0..j]` into `i` groups. Time O(k × n²). The binary search approach is O(n log(sum)) — much faster for large inputs, simpler to implement.
</details>

## Write your solution
→ [`../solutions/22-split-array-largest-sum.js`](../solutions/22-split-array-largest-sum.js)

## Follow-ups
- **LeetCode 410** — this exact problem.
- After solving this chapter, return and also implement the DP solution. Compare the code complexity and runtime for `n = 1000, k = 50`.
- The same approach solves: "minimum number of days to make m bouquets" (LeetCode 1482).
