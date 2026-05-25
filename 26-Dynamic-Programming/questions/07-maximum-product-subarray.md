# Q07 — Maximum Product Subarray

**Difficulty:** Medium
**Pattern:** 1D linear DP — track both max and min (negatives can flip)
**Expected:** O(n) time · O(1) space

## Problem

Given an integer array `nums`, find a contiguous subarray that has the largest product and return that product.

## Examples

### Example 1
```
Input:  nums = [2, 3, -2, 4]
Output: 6
```
Subarray `[2, 3]` has product 6.

### Example 2
```
Input:  nums = [-2, 0, -1]
Output: 0
```
The result cannot be 2 because `[-2, -1]` is not a contiguous subarray of `[-2, 0, -1]` ending at the same place.

### Example 3
```
Input:  nums = [-2, 3, -4]
Output: 24
```
The entire array: `(-2) * 3 * (-4) = 24`.

## Constraints
- `1 <= nums.length <= 2 * 10^4`
- `-10 <= nums[i] <= 10`
- The product of any subarray fits in a 32-bit integer.

## Hints

<details>
<summary>Hint 1 — why maximum subarray's approach breaks here</summary>

A single negative number can turn a small negative product into a large positive one (if multiplied by another negative). So you can't just track the running maximum — a very negative running value might suddenly become the best when multiplied by the next negative number.
</details>

<details>
<summary>Hint 2 — track both the current max and current min</summary>

At each position `i`:
- `maxProd[i]` = max product of subarray ending at `i`
- `minProd[i]` = min product of subarray ending at `i`

Both can matter: the minimum (most negative) product times a negative number could become the maximum.
</details>

<details>
<summary>Hint 3 — the recurrence</summary>

```
newMax = max(nums[i], maxProd * nums[i], minProd * nums[i])
newMin = min(nums[i], maxProd * nums[i], minProd * nums[i])
```

You consider three cases: start fresh at `nums[i]`, extend the previous max, or extend the previous min (which could flip positive via a negative `nums[i]`).
</details>

<details>
<summary>Hint 4 — handle zeros</summary>

When `nums[i] = 0`, the product resets. Starting fresh with `nums[i]` (i.e., 0) handles this naturally — both maxProd and minProd become 0, which is correct.
</details>

## Write your solution
→ [`../solutions/07-maximum-product-subarray.js`](../solutions/07-maximum-product-subarray.js)

## Follow-ups
- Can you return the actual subarray with maximum product?
- What if the array contains very large numbers that overflow 32-bit integers?
