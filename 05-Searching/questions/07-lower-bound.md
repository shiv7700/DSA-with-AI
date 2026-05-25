# Q7 — Lower Bound

**Difficulty:** Easy
**Pattern:** Binary search — lower bound template
**Expected:** O(log n) time · O(1) space

## Problem

You are given a **sorted** array `arr` of integers (may contain duplicates) and a value `x`. Return the **index of the first element that is ≥ x**.

If every element is less than `x`, return `arr.length` (meaning `x` would be inserted at the end).

This is also known as finding the **insertion point** to keep the array sorted when inserting `x` from the left.

> **Why this is its own problem:** Lower bound is a foundational binary search variant. Once you have it, upper bound, first/last occurrence, count occurrences, floor, and ceiling all become one-liners. It's worth internalizing this template on its own.

## Examples

### Example 1 (x is in the array, single occurrence)
```
Input:  arr = [1, 3, 5, 7, 9], x = 5
Output: 2
```
`arr[2] = 5` is the first element ≥ 5.

### Example 2 (x is in the array, multiple occurrences)
```
Input:  arr = [1, 3, 5, 5, 5, 7], x = 5
Output: 2
```
The **first** `5` is at index 2.

### Example 3 (x is between elements)
```
Input:  arr = [1, 3, 5, 7, 9], x = 6
Output: 3
```
`arr[3] = 7` is the first element ≥ 6.

### Example 4 (x is smaller than everything)
```
Input:  arr = [3, 5, 7], x = 1
Output: 0
```

### Example 5 (x is larger than everything)
```
Input:  arr = [3, 5, 7], x = 9
Output: 3
```
`3` is `arr.length` — x would be inserted at the end.

## Constraints
- `0 <= arr.length <= 10^5`
- `-10^9 <= arr[i], x <= 10^9`
- `arr` is sorted in non-decreasing order.

## Hints

<details>
<summary>Hint 1 — this is a DIFFERENT template than standard binary search</summary>

The lower bound template uses `right = arr.length` (not `arr.length - 1`) and `while (left < right)` (not `<=`). Using the wrong template here will give you off-by-one errors.

| Template | right init | loop condition |
|---|---|---|
| Standard (exact match) | `arr.length - 1` | `left <= right` |
| Lower bound | `arr.length` | `left < right` |
</details>

<details>
<summary>Hint 2 — the key branch decision</summary>

In the loop:
- If `arr[mid] < x`: mid is too far left. Everything up to and including mid is less than x. Move `left = mid + 1`.
- Otherwise (`arr[mid] >= x`): mid could be the answer, but there might be an earlier one. Move `right = mid` (not `mid - 1` — you don't want to exclude mid).

At the end, `left === right` and both point to the first index ≥ x.
</details>

## Write your solution
→ [`../solutions/07-lower-bound.js`](../solutions/07-lower-bound.js)

## Follow-ups
- Implement `upperBound` (first index > x) by changing one comparison: `arr[mid] <= x` → move left.
- Use lower bound to implement `findFirst(arr, target)` in a single line.
- In C++ STL, this is `std::lower_bound`. In Java, `Arrays.binarySearch` returns `-(insertionPoint) - 1` when not found — compute the equivalent insertion point from that.
