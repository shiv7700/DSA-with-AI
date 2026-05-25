# Q17 — Valid Triangle Number

**Difficulty:** Medium
**Pattern:** Two Pointers (sort + fix one largest side + opposite ends)
**Expected:** O(n²) time · O(1) extra space

## Problem

Given an integer array `nums`, return the number of triplets chosen from the array that can form a triangle — meaning the sum of any two sides must be greater than the third.

> **Triangle inequality:** three sides `a ≤ b ≤ c` form a valid triangle if and only if `a + b > c`. (The other two inequalities are automatically satisfied when the sides are sorted.)

## Examples

### Example 1
```
Input:  [2, 2, 3, 4]
Output: 3
```
Valid triplets: (2, 3, 4), (2, 3, 4), (2, 2, 3).

### Example 2
```
Input:  [4, 2, 3, 4]
Output: 4
```

### Example 3
```
Input:  [0, 1, 0]
Output: 0
```

## Constraints
- `1 <= nums.length <= 1000`
- `0 <= nums[i] <= 1000`

## Hints

<details>
<summary>Hint 1 — sort first</summary>

Sort `nums`. Fix the largest side as `nums[k]` (using an outer loop from right to left, or `k = n-1` down to 2). For each `k`, use two pointers `left = 0`, `right = k - 1` to count pairs where `nums[left] + nums[right] > nums[k]`.
</details>

<details>
<summary>Hint 2 — counting valid pairs</summary>

When `nums[left] + nums[right] > nums[k]`: all pairs with the same `right` but any `left` between the current `left` and `right - 1` are also valid (because the array is sorted, smaller `left` values still sum to more than enough). So add `right - left` to the count, then move `right` left.

When the sum is not big enough, move `left` right.
</details>

<details>
<summary>Hint 3 — why fix the largest side?</summary>

After sorting, `nums[k]` is the largest. The triangle inequality only needs `nums[left] + nums[right] > nums[k]`. The other two inequalities (`nums[left] + nums[k] > nums[right]` and `nums[right] + nums[k] > nums[left]`) are automatically satisfied since `nums[k]` is the largest.
</details>

## Write your solution
→ [`../solutions/17-valid-triangle-number.js`](../solutions/17-valid-triangle-number.js)

## Follow-ups
- Compare the structure with Q12 (3Sum). Both sort first and fix one element. Here you're counting, not returning triplets.
- What's the brute-force complexity? O(n³). The two-pointer approach cuts it to O(n²).
