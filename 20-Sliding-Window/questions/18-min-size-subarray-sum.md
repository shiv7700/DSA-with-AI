# Q18 — Minimum Size Subarray Sum

**Difficulty:** Medium (LeetCode 209)
**Pattern:** Variable-size sliding window (shortest valid)
**Expected:** O(n) time · O(1) space

## Problem

Given an array of **positive integers** `nums` and a positive integer `target`, return the **minimum length** of a contiguous subarray whose sum is **greater than or equal to `target`**. If no such subarray exists, return `0`.

> **Why positives matter:** this problem requires non-negative values so that expanding the window always increases the sum. See notes.md Lesson 10 for why negatives break this.

## Examples

### Example 1
```
Input:  nums = [2, 3, 1, 2, 4, 3],  target = 7
Output: 2
```
The subarray `[4, 3]` has sum 7 and is the shortest with sum ≥ 7.

### Example 2
```
Input:  nums = [1, 4, 4],  target = 4
Output: 1
```
The subarray `[4]` (index 1 or 2) has sum ≥ 4.

### Example 3
```
Input:  nums = [1, 1, 1, 1, 1, 1, 1, 1],  target = 11
Output: 0
```
No subarray sums to ≥ 11.

### Example 4
```
Input:  nums = [1, 2, 3, 4, 5],  target = 15
Output: 5
```
The entire array sums to exactly 15.

## Constraints
- `1 <= target <= 10^9`
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^4`

## Hints

<details>
<summary>Hint 1 — "shortest valid" window template</summary>

Unlike most variable-size window problems where you contract while **invalid**, here you contract while **valid** (to find the shortest). The logic flips:

- Expand `right` as usual.
- Once `windowSum >= target` (window is valid), record `right - left + 1` as a candidate answer, then **contract from the left** to see if you can get a shorter valid window.
- Keep contracting as long as the window stays valid.
</details>

<details>
<summary>Hint 2 — full algorithm outline</summary>

```
left = 0, windowSum = 0, minLen = Infinity

for right = 0 to n-1:
  windowSum += nums[right]

  while windowSum >= target:
    minLen = min(minLen, right - left + 1)
    windowSum -= nums[left]
    left++

return minLen === Infinity ? 0 : minLen
```
</details>

<details>
<summary>Hint 3 — why this is O(n) despite the nested while</summary>

`left` never moves backward. Each element enters the window once (when `right` passes it) and leaves once (when `left` passes it). Total: each element is touched at most twice → O(n).
</details>

## Write your solution
→ [`../solutions/18-min-size-subarray-sum.js`](../solutions/18-min-size-subarray-sum.js)

## Follow-ups
- O(n log n) approach: binary search on the answer. For each starting index `i`, binary search for the smallest `j` such that `sum(i..j) >= target`. This requires a prefix sum array. Can you implement it?
- What if `nums` could contain negatives? (Then the sliding window fails — you'd need a different approach.)
