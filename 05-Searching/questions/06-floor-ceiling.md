# Q6 — Floor and Ceiling in a Sorted Array

**Difficulty:** Easy
**Pattern:** Binary search — variants on lower/upper bound
**Expected:** O(log n) time · O(1) space

## Problem

You are given a **sorted** array `arr` of distinct integers and a value `x` (which may or may not be in the array).

- The **floor** of `x` is the largest element in `arr` that is **≤ x**. If no such element exists, return `-Infinity`.
- The **ceiling** of `x` is the smallest element in `arr` that is **≥ x**. If no such element exists, return `Infinity`.

Implement both `floor(arr, x)` and `ceiling(arr, x)`.

> **Real-world analogy:** You're looking for a meeting room in a hotel. You need one that fits exactly 20 people. The floor of 20 means "the largest room that fits at most 20" (don't overshoot capacity). The ceiling of 20 means "the smallest room that fits at least 20" (don't leave people standing).

## Examples

### Example 1
```
arr = [1, 3, 6, 8, 11, 15]

floor(arr, 7)   →  6   (6 is the largest element ≤ 7)
ceiling(arr, 7) →  8   (8 is the smallest element ≥ 7)
```

### Example 2 (x is in the array)
```
arr = [1, 3, 6, 8, 11, 15]

floor(arr, 6)    →  6
ceiling(arr, 6)  →  6
```

### Example 3 (x is below all elements)
```
arr = [5, 10, 15]

floor(arr, 2)    →  -Infinity
ceiling(arr, 2)  →  5
```

### Example 4 (x is above all elements)
```
arr = [5, 10, 15]

floor(arr, 20)    →  15
ceiling(arr, 20)  →  Infinity
```

## Constraints
- `1 <= arr.length <= 10^5`
- All elements in `arr` are distinct and sorted in ascending order.
- `x` can be any integer.

## Hints

<details>
<summary>Hint 1 — ceiling is the same as lower bound</summary>

The ceiling of `x` is the smallest element ≥ `x` — that's exactly what lower bound computes. Find the lower bound index `i`. If `i === arr.length`, no ceiling exists. Otherwise, `arr[i]` is the ceiling.
</details>

<details>
<summary>Hint 2 — floor from lower bound</summary>

After finding the lower bound index `i` (first index where `arr[i] >= x`):
- If `arr[i] === x`, the floor is `x` itself.
- Otherwise, the element just to the left — `arr[i - 1]` — is the largest element smaller than `x`. That's the floor.
- If `i === 0`, there's nothing to the left. No floor exists.
</details>

<details>
<summary>Hint 3 — alternative: binary search directly</summary>

You can also binary search for each:

For **ceiling**: keep tracking the best candidate. Whenever `arr[mid] >= x`, record `arr[mid]` as a candidate and go left to look for something smaller.

For **floor**: whenever `arr[mid] <= x`, record `arr[mid]` as a candidate and go right to look for something larger.
</details>

## Write your solution
→ [`../solutions/06-floor-ceiling.js`](../solutions/06-floor-ceiling.js)

## Follow-ups
- If `arr` can contain duplicates, how does your answer change?
- Implement a function that returns the index rather than the value.
- **Application:** given a sorted list of meeting times, find the earliest meeting that starts after a given time `t` — that's ceiling of `t`.
