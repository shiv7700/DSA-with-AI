# Q14 — Maximum Subarray Sum (Kadane's Algorithm)

**Difficulty:** Medium (a "must-know" classic)
**Pattern:** Kadane's algorithm · one-dimensional DP
**Expected:** O(n) time · O(1) space

## Problem

Given an integer array `nums`, find a **contiguous subarray** (a slice of consecutive elements, at least one long) whose sum is as large as possible. Return that sum.

A "subarray" means a continuous slice — `nums[i..j]` for some `i <= j`. The empty subarray is not allowed.

## Examples

### Example 1
```
Input:  nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Output: 6
```
The subarray `[4, -1, 2, 1]` has the largest sum: `4 + (-1) + 2 + 1 = 6`.

### Example 2
```
Input:  nums = [1]
Output: 1
```

### Example 3 (all negative)
```
Input:  nums = [-3, -1, -4, -2]
Output: -1
```
Best you can do is pick the single largest element. (You **must** pick at least one.)

### Example 4
```
Input:  nums = [5, 4, -1, 7, 8]
Output: 23
```

## Constraints
- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`
- The subarray must contain at least one element.

## Hints

<details>
<summary>Hint 1 — brute force</summary>

Try every possible (start, end) pair and compute the sum: O(n²). With prefix sums, you can compute each sum in O(1) — but you're still examining O(n²) pairs.
</details>

<details>
<summary>Hint 2 — the Kadane idea</summary>

At each index `i`, ask: "Does it help me to **extend** the best subarray ending at `i - 1`, or should I **start over** at `i`?"

You restart whenever the running sum has gone negative — a negative running sum can only hurt the next sum, so cut your losses and start fresh.
</details>

<details>
<summary>Hint 3 — the algorithm</summary>

```js
let cur = nums[0];
let best = nums[0];

for (let i = 1; i < nums.length; i++) {
  cur = Math.max(nums[i], cur + nums[i]);   // restart or extend?
  best = Math.max(best, cur);
}

return best;
```

That's Kadane's algorithm. Linear time, constant space.
</details>

## Write your solution
→ [`../solutions/14-maximum-subarray.js`](../solutions/14-maximum-subarray.js)

## Follow-ups
- Return the actual subarray (the start and end indexes), not just its sum.
- **Maximum Product Subarray** — different recurrence; you need to track both min and max because negatives can flip signs.
- **Maximum Sum Circular Subarray** — the array wraps around.
- Solve it via **divide and conquer** in O(n log n) — a great exercise for understanding the D&C paradigm.
