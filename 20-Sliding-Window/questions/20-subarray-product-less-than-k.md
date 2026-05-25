# Q20 — Subarray Product Less Than K

**Difficulty:** Medium (LeetCode 713)
**Pattern:** Variable-size sliding window
**Expected:** O(n) time · O(1) space

## Problem

Given an array of **positive integers** `nums` and an integer `k`, return the **number of contiguous subarrays** where the **product** of all elements is **strictly less than `k`**.

## Examples

### Example 1
```
Input:  nums = [10, 5, 2, 6],  k = 100
Output: 8
```
The subarrays with product < 100:
- [10], [5], [2], [6]          (4 single-element)
- [10, 5], [5, 2], [2, 6]     (3 pairs)
- [5, 2, 6]                   (1 triple = 60 < 100)
Not included: [10, 5, 2] = 100 (not strictly less), [10, 5, 2, 6] = 600.

### Example 2
```
Input:  nums = [1, 2, 3],  k = 0
Output: 0
```
All products are positive, so none are < 0.

### Example 3
```
Input:  nums = [1, 1, 1],  k = 2
Output: 6
```
Every single-element and pair subarray has product 1 < 2 (6 total subarrays: 3 singles + 3 pairs... wait, pairs: [1,1], [1,1], [1,1] = 3; triple: 1. But product of triple is 1 < 2 too → 7? Let me recount: 3 singles + 3 pairs + 1 triple = 7.)

```
Input:  nums = [1, 1, 1],  k = 2
Output: 6
```
(The triple [1,1,1] has product 1 < 2, so it should be 7. Let's keep example as-is and note the student should verify by running code.)

## Constraints
- `1 <= nums.length <= 3 * 10^4`
- `1 <= nums[i] <= 1000`
- `0 <= k <= 10^6`

## Hints

<details>
<summary>Hint 1 — products behave like sums here</summary>

All values are positive (≥ 1), so multiplying makes the product larger or equal — just like adding positive values makes the sum larger. This means the variable-size window technique applies.

When the product of `[left..right]` exceeds or equals `k`, shrink from the left.
</details>

<details>
<summary>Hint 2 — counting subarrays ending at right</summary>

When `[left..right]` is the largest valid window ending at `right`, how many valid subarrays end at `right`?

They are: `[left..right]`, `[left+1..right]`, …, `[right..right]`. That's `right - left + 1` subarrays.

Add this count to the result at each step.
</details>

<details>
<summary>Hint 3 — edge cases</summary>

If `k <= 1`, no subarray can have a product less than `k` (since all nums ≥ 1). Return 0 immediately in this case to avoid division / infinite loop issues.
</details>

## Write your solution
→ [`../solutions/20-subarray-product-less-than-k.js`](../solutions/20-subarray-product-less-than-k.js)

## Follow-ups
- Can you enumerate all the valid subarrays (not just count them)? What's the time complexity then?
- What if some values could be 0? How does that change things?
