# Q06 — Maximum Subarray (Kadane's Algorithm)

**Difficulty:** Easy
**Pattern:** 1D linear DP — Kadane's algorithm
**Expected:** O(n) time · O(1) space

## Problem

Given an integer array `nums`, find the **contiguous subarray** (containing at least one element) with the largest sum and return that sum.

## Examples

### Example 1
```
Input:  nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Output: 6
```
The subarray `[4, -1, 2, 1]` has the largest sum = 6.

### Example 2
```
Input:  nums = [1]
Output: 1
```

### Example 3
```
Input:  nums = [5, 4, -1, 7, 8]
Output: 23
```
The entire array.

## Constraints
- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

## Hints

<details>
<summary>Hint 1 — the key decision at each index</summary>

At each position `i`, you decide: should the best subarray ending at `i` start fresh at `i`, or should it extend the best subarray that ended at `i-1`?

Formally: `dp[i] = max(nums[i], dp[i-1] + nums[i])`.

"Either start a new subarray here, or extend the previous best."
</details>

<details>
<summary>Hint 2 — what dp[i] means vs the final answer</summary>

`dp[i]` is the maximum sum of any subarray that **ends at index i**. The final answer is `max(dp[0], dp[1], ..., dp[n-1])` — the best endpoint wins.
</details>

<details>
<summary>Hint 3 — space optimization gives Kadane's</summary>

You only need the previous value of `dp`. Use one variable `currentSum` (the best sum ending here) and another `bestSum` (the global best seen so far). Update both on each step.
</details>

## Write your solution
→ [`../solutions/06-maximum-subarray.js`](../solutions/06-maximum-subarray.js)

## Follow-ups
- Return the actual subarray (not just the sum). How do you track the start and end indices?
- **Maximum Product Subarray** (Q07) — a trickier cousin where negatives can flip signs.
- What if the array is circular? (Maximum Sum Circular Subarray)
