# Q11 — Search a 2D Matrix

**Difficulty:** Medium
**Pattern:** Binary search — treat matrix as a flattened sorted array
**Expected:** O(log(m × n)) time · O(1) space

## Problem

You are given an `m x n` matrix `matrix` with the following properties:
1. Each row is sorted in ascending order from left to right.
2. The first integer of each row is greater than the last integer of the previous row.

Given a `target` integer, return `true` if `target` is in the matrix, or `false` otherwise.

You must solve it in **O(log(m × n))** time.

> **Key insight:** Because of the two properties, the matrix is equivalent to one big sorted 1D array if you "unwrap" it row by row. A single binary search over this virtual 1D array lets you find any element in O(log(m × n)).

## Examples

### Example 1
```
Input:
matrix = [
  [1,  3,  5,  7],
  [10, 11, 16, 20],
  [23, 30, 34, 60]
]
target = 3
Output: true
```

### Example 2
```
Input:
matrix = [
  [1,  3,  5,  7],
  [10, 11, 16, 20],
  [23, 30, 34, 60]
]
target = 13
Output: false
```

### Example 3 (single row)
```
matrix = [[1, 2, 3, 4, 5]], target = 3
Output: true
```

### Example 4 (single column)
```
matrix = [[1], [2], [3]], target = 2
Output: true
```

## Constraints
- `m == matrix.length`, `n == matrix[0].length`
- `1 <= m, n <= 100`
- `-10^4 <= matrix[i][j], target <= 10^4`
- The matrix satisfies the two sorting properties described above.

## Hints

<details>
<summary>Hint 1 — map a 1D index to a 2D position</summary>

If you treat the matrix as a flattened array of `m * n` elements, element at 1D index `i` maps to:
- row: `Math.floor(i / n)`
- column: `i % n`

So `matrix[Math.floor(i / n)][i % n]` is the element at "virtual index" `i`.
</details>

<details>
<summary>Hint 2 — run a single binary search</summary>

Binary search over `[0, m * n - 1]`. In the loop, compute `mid`, convert it to `(row, col)` using the formula above, read `matrix[row][col]`, and proceed as normal binary search.
</details>

<details>
<summary>Hint 3 — alternative two-step approach</summary>

First binary search the first column to find which row the target should be in. Then binary search that row. This is O(log m + log n) = O(log(m * n)) — same complexity, two passes instead of one.
</details>

## Write your solution
→ [`../solutions/11-search-2d-matrix.js`](../solutions/11-search-2d-matrix.js)

## Follow-ups
- **LeetCode 74** — this exact problem.
- **LeetCode 240** — "Search a 2D Matrix II" — the matrix is sorted differently (each row and each column is sorted, but rows don't connect). Binary search no longer works; you use a "staircase" search from the top-right corner.
- What if the matrix has `n` columns but none of the "row-to-row" continuity guarantee? How does your approach change?
