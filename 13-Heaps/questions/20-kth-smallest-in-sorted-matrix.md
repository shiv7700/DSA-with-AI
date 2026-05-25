# Q20 — Kth Smallest Element in a Sorted Matrix

**Difficulty:** Medium
**Pattern:** Min-heap traversal of a sorted matrix
**Expected:** O(k log k) time · O(k) space

## Problem

Given an `n × n` matrix where each row and each column is sorted in ascending order, return the `k`-th smallest element in the matrix.

Note: it is the k-th smallest element in the sorted order, not the k-th distinct element.

## Examples

### Example 1
```
Input:
matrix = [
  [1,  5,  9],
  [10, 11, 13],
  [12, 13, 15]
],
k = 8
Output: 13
```
All elements sorted: [1, 5, 9, 10, 11, 12, 13, 13, 15]. The 8th is 13.

### Example 2
```
Input:
matrix = [
  [-5]
],
k = 1
Output: -5
```

### Example 3
```
Input:
matrix = [
  [1,  2],
  [1,  3]
],
k = 2
Output: 1
```

## Constraints
- `n == matrix.length == matrix[i].length`
- `1 <= n <= 300`
- `-10^9 <= matrix[i][j] <= 10^9`
- All rows and columns are sorted in non-decreasing order.
- `1 <= k <= n²`

## Hints

<details>
<summary>Hint 1 — treat each row as a sorted list (same as Q10 / Q19)</summary>

This is "merge n sorted lists and find the k-th element." Each row of the matrix is a sorted list. Use a min-heap seeded with the first element of each row.

Pop `k` times — the k-th pop is the answer.
</details>

<details>
<summary>Hint 2 — heap state: (value, row, col)</summary>

Each heap entry is `[value, row, col]`. When you pop `[val, r, c]`, push `[matrix[r][c+1], r, c+1]` if `c+1 < n`.

This naturally traverses the matrix in ascending order.
</details>

<details>
<summary>Hint 3 — alternative: binary search on the value range</summary>

A cleaner O(n log(max-min)) approach: binary search on the answer value. For a candidate `mid`, count how many elements are ≤ `mid` using the sorted structure of each row (binary search each row). If count >= k, narrow the search right; otherwise left.

This uses O(n) space (no heap) and runs in O(n log(max-min)) time.
</details>

## Write your solution
→ [`../solutions/20-kth-smallest-in-sorted-matrix.js`](../solutions/20-kth-smallest-in-sorted-matrix.js)

## Follow-ups
- Can you implement the binary search approach for an O(n log(max-min)) solution?
- **Find K Pairs with Smallest Sums** (Q19) — very similar heap navigation pattern.
- What is the time complexity when k = n²? (All elements — you'd process the whole matrix.)
