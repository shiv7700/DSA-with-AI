# Q13 — Product of Array Except Self

**Difficulty:** Medium
**Pattern:** Prefix and suffix products
**Expected:** O(n) time · O(1) extra space (not counting the output array)

## Problem

Given an integer array `nums`, return an array `answer` where `answer[i]` is the **product of every element in `nums` except `nums[i]` itself**.

Two rules:
- You may **not** use division. (Division has problems with zeros and floating-point precision.)
- Your solution must run in **O(n)** time.

The output array does not count toward the extra space limit.

## Examples

### Example 1
```
Input:  nums = [1, 2, 3, 4]
Output: [24, 12, 8, 6]
```
Explanation:
- `answer[0] = 2 * 3 * 4 = 24`
- `answer[1] = 1 * 3 * 4 = 12`
- `answer[2] = 1 * 2 * 4 = 8`
- `answer[3] = 1 * 2 * 3 = 6`

### Example 2 (with a zero)
```
Input:  nums = [-1, 1, 0, -3, 3]
Output: [0, 0, 9, 0, 0]
```
Every position except index 2 has the zero in its product, so they all become 0. Index 2 itself excludes the zero, so its product is `-1 * 1 * -3 * 3 = 9`.

### Example 3 (two zeros)
```
Input:  nums = [0, 0, 4]
Output: [0, 0, 0]
```
Every position still has at least one zero in its product.

## Constraints
- `2 <= nums.length <= 10^5`
- `-30 <= nums[i] <= 30`
- The product of any prefix or suffix of `nums` fits in a 32-bit integer.
- **No division allowed.**
- Output array does not count toward space complexity.

## Hints

<details>
<summary>Hint 1 — two helper arrays (easier to think about first)</summary>

Build two helper arrays:
- `left[i]`  = product of every element to the **left** of index `i`.
- `right[i]` = product of every element to the **right** of index `i`.

Then `answer[i] = left[i] * right[i]`.

This works, but uses O(n) extra space.
</details>

<details>
<summary>Hint 2 — two passes, just one output array (O(1) extra)</summary>

You can fold both helper arrays into the output array:

1. **First pass (left to right):** fill `answer[i]` with the product of everything to the left of `i`. Keep a running variable `leftProduct`.

2. **Second pass (right to left):** keep a running variable `rightProduct`. Multiply `answer[i]` by `rightProduct`, then update `rightProduct *= nums[i]`.

After both passes, `answer` holds the correct values. No division. No extra arrays beyond the output.
</details>

## Write your solution
→ [`../solutions/13-product-except-self.js`](../solutions/13-product-except-self.js)

## Follow-ups
- What if you **were** allowed to use division? You'd still need to handle zero cases carefully (count how many zeros — 0, 1, or many — and branch).
- What if the array contains very large numbers and you need the result modulo some prime?
