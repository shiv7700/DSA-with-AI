# Q10 — Find Minimum in Rotated Sorted Array

**Difficulty:** Medium
**Pattern:** Binary search — finding the rotation pivot
**Expected:** O(log n) time · O(1) space

## Problem

You are given a **sorted** array of distinct integers that has been **rotated** at some unknown pivot. Find and return the **minimum element** of the array.

You must solve it in **O(log n)** time.

> **The pivot is the minimum.** If `[0, 1, 2, 4, 5, 6, 7]` was rotated to become `[4, 5, 6, 7, 0, 1, 2]`, the minimum is `0` — it's the element that broke the sorted order.

## Examples

### Example 1
```
Input:  nums = [3, 4, 5, 1, 2]
Output: 1
```

### Example 2
```
Input:  nums = [4, 5, 6, 7, 0, 1, 2]
Output: 0
```

### Example 3 (no rotation — already sorted)
```
Input:  nums = [1, 2, 3, 4, 5]
Output: 1
```

### Example 4 (rotated at last position)
```
Input:  nums = [2, 1]
Output: 1
```

### Example 5 (single element)
```
Input:  nums = [1]
Output: 1
```

## Constraints
- `1 <= nums.length <= 5000`
- `-5000 <= nums[i] <= 5000`
- All elements are distinct.
- `nums` is sorted in ascending order and then rotated.

## Hints

<details>
<summary>Hint 1 — when is the left half sorted vs unsorted?</summary>

The minimum is the "start" of the original sorted array — the break point in the rotation.

Compare `nums[mid]` with `nums[right]`:
- If `nums[mid] > nums[right]`: the minimum is somewhere in the **right half** (because the break point is to the right of mid).
- If `nums[mid] <= nums[right]`: the minimum is in the **left half** (including mid — because mid might be the minimum).
</details>

<details>
<summary>Hint 2 — pointer movement</summary>

When `nums[mid] > nums[right]`: `left = mid + 1` (skip the left half, minimum is in the right).

When `nums[mid] <= nums[right]`: `right = mid` (the answer could be mid itself, so don't exclude it with `mid - 1`).

At the end, `left === right` and both point at the minimum.
</details>

<details>
<summary>Hint 3 — why compare with right, not left?</summary>

Comparing `nums[mid]` to `nums[right]` reliably tells you which side the pivot is on. Comparing to `nums[left]` can be ambiguous when `left === mid`, which happens on a 2-element array.
</details>

## Write your solution
→ [`../solutions/10-min-rotated-array.js`](../solutions/10-min-rotated-array.js)

## Follow-ups
- Once you find the index of the minimum, you also know the rotation offset. How would you use that to implement a full binary search in a rotated array (Q9 revisited)?
- What if the array may have **duplicates**? (LeetCode 154 — duplicate handling requires skipping `nums[left] === nums[right]` cases.)
