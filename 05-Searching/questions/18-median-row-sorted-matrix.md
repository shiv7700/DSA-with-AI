# Q18 — Median of a Row-wise Sorted Matrix

**Difficulty:** Medium
**Pattern:** Binary search on answer space + counting
**Expected:** O(32 × r × log c) time · O(1) space

## Problem

You are given a `r × c` matrix where each row is sorted in ascending order. The number of elements `r × c` is always **odd** (to ensure a unique median). Find the **median** of all elements in the matrix.

> **Why this is interesting:** You can't just flatten and sort — that's O(r × c × log(r × c)) and needs O(r × c) extra space. The binary search on answer approach solves it in O(r × log c × log(max - min)) time with O(1) space.

## Examples

### Example 1
```
Input:
matrix = [
  [1, 3, 5],
  [2, 6, 9],
  [3, 6, 9]
]
Output: 5
```
All elements: [1, 2, 3, 3, 5, 6, 6, 9, 9] (9 elements). Median is the 5th = 5.

### Example 2
```
Input:
matrix = [
  [1, 1, 1],
  [1, 1, 3],
  [1, 3, 3]
]
Output: 1
```

## Constraints
- `1 <= r, c <= 400`
- `1 <= matrix[i][j] <= 2000`
- `r × c` is odd.
- Each row is sorted in ascending order.

## Hints

<details>
<summary>Hint 1 — the key property of a median</summary>

The median `m` has the property: at least `(r × c + 1) / 2` elements are ≤ `m`, and at least `(r × c + 1) / 2` elements are ≥ `m`. Binary search for the smallest value `x` such that the count of elements ≤ `x` is at least `(r × c + 1) / 2`.
</details>

<details>
<summary>Hint 2 — counting elements ≤ x in the matrix</summary>

Since each row is sorted, use binary search (upper bound) on each row to count elements ≤ `x`. Sum across all rows. This takes O(r × log c).
</details>

<details>
<summary>Hint 3 — search range</summary>

Binary search over the value range `[1, 2000]` (or `[min, max]` of the matrix). For each candidate `mid`, count how many elements ≤ `mid`. If count < target (i.e., median position), search higher. Otherwise search lower.
</details>

## Write your solution
→ [`../solutions/18-median-row-sorted-matrix.js`](../solutions/18-median-row-sorted-matrix.js)

## Follow-ups
- What if `r × c` is even — you need the average of the two middle elements? Adapt the counting approach.
- How does this compare to Q19 (Median of Two Sorted Arrays)?
- Can you find the k-th smallest element in this matrix using the same technique? (Yes — replace the target count with `k`.)
