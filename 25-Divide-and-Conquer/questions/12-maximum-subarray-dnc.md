# Q12 — Maximum Subarray (D&C version)

**Difficulty:** Medium
**Pattern:** Divide and Conquer — cross-midpoint analysis
**Expected:** O(n log n) time · O(log n) space

## Problem

Given an integer array `nums`, find the subarray with the **largest sum** and return that sum.

You must solve this using **Divide and Conquer** (not Kadane's algorithm). The D&C solution is O(n log n) — intentionally less efficient than Kadane's O(n), but a great exercise in the D&C pattern.

> **Why bother with D&C if Kadane's is faster?** Because this problem demonstrates a powerful D&C idea: the best answer either lives entirely in the left half, entirely in the right half, or crosses the midpoint. Analyzing the "cross" case is a technique that recurs in many harder problems.

## Examples

### Example 1
```
Input:  [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Output: 6
```
Subarray `[4, -1, 2, 1]` has sum 6.

### Example 2
```
Input:  [1]
Output: 1
```

### Example 3 (all negative)
```
Input:  [-3, -1, -2]
Output: -1
```
The subarray must contain at least one element.

## Constraints

- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`
- The subarray must be **contiguous** and contain **at least one element**.

## Hints

<details>
<summary>Hint 1 — the three-region argument</summary>

Split the array at its midpoint. The maximum subarray is in **exactly one** of:

```
nums: [  left half  | mid |  right half  ]

Case A: max subarray is entirely in the LEFT half
Case B: max subarray is entirely in the RIGHT half
Case C: max subarray CROSSES the midpoint (includes mid and extends left and right)
```

The answer is the maximum of (A, B, C). Recursively compute A and B. C requires special work.
</details>

<details>
<summary>Hint 2 — computing the crossing case</summary>

For Case C, the crossing subarray must include `nums[mid]`. So:

- Start at `mid` and scan **left** to find the best left extension. (Keep a running sum; track the max.)
- Start at `mid+1` and scan **right** to find the best right extension.
- The crossing max = left extension max + right extension max.

This takes O(n) work at each level of recursion.
</details>

<details>
<summary>Hint 3 — full structure</summary>

```js
function maxSubArray(nums) {
  return helper(nums, 0, nums.length - 1);
}

function helper(nums, low, high) {
  if (low === high) return nums[low];  // base case: single element

  const mid = Math.floor((low + high) / 2);
  const leftMax  = helper(nums, low, mid);
  const rightMax = helper(nums, mid + 1, high);
  const crossMax = maxCrossing(nums, low, mid, high);

  return Math.max(leftMax, rightMax, crossMax);
}
```

You implement `maxCrossing`.
</details>

## Write your solution

→ [`../solutions/12-maximum-subarray-dnc.js`](../solutions/12-maximum-subarray-dnc.js)

## Follow-ups

- Implement **Kadane's algorithm** as a follow-up. Compare: it's O(n) time, O(1) space vs D&C's O(n log n) time, O(log n) space. For this specific problem, Kadane's is strictly better.
- The "three-region" argument (left, right, cross) is reused in several hard D&C problems. Can you see how **Closest Pair of Points** uses the same idea?
- Return the **subarray itself** (start and end indices), not just the sum.
