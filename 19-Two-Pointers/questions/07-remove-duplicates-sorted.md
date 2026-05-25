# Q7 — Remove Duplicates from Sorted Array

**Difficulty:** Easy
**Pattern:** Two Pointers (same direction — slow / fast)
**Expected:** O(n) time · O(1) space

## Problem

Given an integer array `nums` sorted in non-decreasing order, remove the duplicates **in place** so that each unique element appears only once. The relative order must be preserved.

Return `k` — the number of unique elements. The first `k` elements of `nums` should hold the unique values; you don't need to worry about what's beyond index `k - 1`.

> **Why return a length instead of a cleaned array?** In-place problems often work this way in interviews: the caller promises to only look at the first `k` elements of the array you modified.

## Examples

### Example 1
```
Input:  [1, 1, 2]
Output: k = 2,  nums = [1, 2, _]
```
The `_` represents values we don't care about.

### Example 2
```
Input:  [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
Output: k = 5,  nums = [0, 1, 2, 3, 4, _, _, _, _, _]
```

### Example 3
```
Input:  [1]
Output: k = 1
```

## Constraints
- `1 <= nums.length <= 3 * 10^4`
- `-100 <= nums[i] <= 100`
- `nums` is sorted in non-decreasing order.

## Hints

<details>
<summary>Hint 1 — why sorted helps</summary>

Because the array is sorted, all duplicates are grouped together. You don't need to search for them — just compare each element with the one just before the current "write head."
</details>

<details>
<summary>Hint 2 — slow / fast pointers</summary>

`slow` starts at 0 — the last confirmed unique position. `fast` starts at 1 and scans forward. If `nums[fast] !== nums[slow]`, a new unique value has been found: advance `slow` and write `nums[fast]` there.
</details>

<details>
<summary>Hint 3 — what to return</summary>

At the end, `slow` is the index of the last unique element. Return `slow + 1` as the new length `k`.
</details>

## Write your solution
→ [`../solutions/07-remove-duplicates-sorted.js`](../solutions/07-remove-duplicates-sorted.js)

## Follow-ups
- **Q21** extends this: allow at most **2** copies of each element instead of 1.
- What if the array is **not** sorted? How would your approach change? (Hint: you'd need a Set.)
- Cross-reference: [02 — Arrays Q4 — Remove Duplicates](../../02-Arrays/questions/04-remove-duplicates.md)
