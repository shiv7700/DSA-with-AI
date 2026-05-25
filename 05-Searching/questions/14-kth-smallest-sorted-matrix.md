# Q14 — Kth Smallest Element in a Sorted Matrix

**Difficulty:** Medium
**Pattern:** Binary search on answer space + counting
**Expected:** O(n log(max - min)) time · O(1) space

## Problem

You are given an `n x n` matrix where each row and each column is sorted in ascending order. Find the **k-th smallest** element in the matrix.

Note: you need the k-th smallest in the **sorted order of all elements**, not the k-th distinct element.

> **Two approaches exist:** a min-heap approach (easier to see, O(k log n)) and a binary-search-on-the-answer approach (more elegant, O(n log(max - min))). This problem is in the Searching chapter specifically to practice the binary search approach.

## Examples

### Example 1
```
Input:
matrix = [
  [ 1,  5,  9],
  [10, 11, 13],
  [12, 13, 15]
]
k = 8
Output: 13
```
All elements sorted: [1, 5, 9, 10, 11, 12, 13, 13, 15]. The 8th is 13.

### Example 2
```
Input:
matrix = [[-5]], k = 1
Output: -5
```

### Example 3
```
Input:
matrix = [
  [1, 2],
  [1, 3]
]
k = 2
Output: 1
```

## Constraints
- `n == matrix.length == matrix[0].length`
- `1 <= n <= 300`
- `-10^9 <= matrix[i][j] <= 10^9`
- `1 <= k <= n * n`
- Each row and column is sorted in ascending order.

## Hints

<details>
<summary>Hint 1 — binary search on the answer value</summary>

The k-th smallest value lies between `matrix[0][0]` (minimum) and `matrix[n-1][n-1]` (maximum). Binary search on this range.

For a candidate `mid`, count how many elements in the matrix are ≤ `mid`. Call this `count(mid)`. If `count(mid) >= k`, the answer is ≤ `mid`. If `count(mid) < k`, the answer is > `mid`.
</details>

<details>
<summary>Hint 2 — counting elements ≤ mid efficiently</summary>

Because each row is sorted, you can count elements ≤ `mid` in each row with binary search (`upperBound`). Or use a "staircase" approach:

Start at the top-right corner `(row=0, col=n-1)`. If `matrix[row][col] <= mid`, all elements in this row up to this column are ≤ mid. Add `col + 1` to count and move down (`row++`). If `matrix[row][col] > mid`, move left (`col--`). This counts all elements ≤ mid in O(n).
</details>

<details>
<summary>Hint 3 — why the answer is always in the matrix</summary>

The binary search might produce a `mid` that isn't actually in the matrix. But at the end, `left` will have converged to the smallest value in the matrix that has at least `k` elements ≤ it — which is necessarily a value present in the matrix.
</details>

## Write your solution
→ [`../solutions/14-kth-smallest-sorted-matrix.js`](../solutions/14-kth-smallest-sorted-matrix.js)

## Follow-ups
- **LeetCode 378** — this exact problem.
- If memory isn't a concern, the min-heap approach is simpler to code. When would you prefer the binary search approach?
- **Kth smallest in two sorted arrays** — how does the approach change?
