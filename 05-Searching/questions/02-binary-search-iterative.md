# Q2 — Iterative Binary Search

**Difficulty:** Easy
**Pattern:** Binary search (standard template)
**Expected:** O(log n) time · O(1) space

## Problem

You are given a **sorted** (ascending) array of distinct integers `arr` and a `target` integer. Return the **index** of `target` in the array. If the target does not exist, return `-1`.

You must implement binary search iteratively — using a `while` loop, not recursion.

> **Why this matters:** Binary search is one of the most important algorithms you'll ever learn. The iterative form uses O(1) space and is the version you'll use in production code and write first in interviews. Get the template solid here — everything in the Medium and Hard sections builds on it.

## Examples

### Example 1
```
Input:  arr = [2, 5, 8, 12, 16, 23, 38, 42, 55, 72], target = 23
Output: 5
```

### Example 2
```
Input:  arr = [1, 3, 5, 7, 9], target = 6
Output: -1
```

### Example 3 (single element — found)
```
Input:  arr = [42], target = 42
Output: 0
```

### Example 4 (single element — not found)
```
Input:  arr = [42], target = 7
Output: -1
```

### Example 5 (target at boundaries)
```
Input:  arr = [1, 2, 3, 4, 5], target = 1  →  0
Input:  arr = [1, 2, 3, 4, 5], target = 5  →  4
```

## Constraints
- `1 <= arr.length <= 10^5`
- `-10^9 <= arr[i], target <= 10^9`
- `arr` is sorted in **strictly ascending** order (no duplicates).
- You must implement the search yourself — no `.indexOf()` or similar.

## Hints

<details>
<summary>Hint 1 — set up the pointers</summary>

Start with two pointers: `left = 0` and `right = arr.length - 1`. These represent the current search window — the range of indexes that might still contain the target.
</details>

<details>
<summary>Hint 2 — the loop and the mid calculation</summary>

Loop `while (left <= right)`. Each time, compute `mid = Math.floor((left + right) / 2)`.

- If `arr[mid] === target` → return `mid`.
- If `arr[mid] < target` → target must be to the RIGHT. Move `left = mid + 1`.
- If `arr[mid] > target` → target must be to the LEFT. Move `right = mid - 1`.

When the loop ends without returning, return `-1`.
</details>

<details>
<summary>Hint 3 — why `left <= right` and not `left < right`?</summary>

When the search space has been narrowed to a single element, `left === right`. With `<=` you still check that element. With `<`, you skip it. Try tracing a single-element array to see the bug.
</details>

## Write your solution
→ [`../solutions/02-binary-search-iterative.js`](../solutions/02-binary-search-iterative.js)

## Follow-ups
- What changes if the array is sorted in **descending** order?
- What if the array can contain **duplicate** values? Does standard binary search still find an occurrence? (It does, just not guaranteed to be the first or last one.)
- Compare the number of comparisons your binary search makes vs linear search for a 1000-element array.
