# Q10 — Range Sum Query 2D — Mutable (LeetCode 308)

**Difficulty:** Medium
**Pattern:** 2D Fenwick Tree
**Expected:** O(m * n * log m * log n) build · O(log m * log n) per update/query · O(m * n) space

## Problem

This is [LeetCode 308 — Range Sum Query 2D - Mutable](https://leetcode.com/problems/range-sum-query-2d-mutable/).

Implement the `NumMatrix` class:

- `NumMatrix(matrix)` — initialise with a 2D integer matrix.
- `update(row, col, val)` — set `matrix[row][col]` to `val`.
- `sumRegion(row1, col1, row2, col2)` — return the sum of elements inside the rectangle defined by its **upper-left corner** `(row1, col1)` and **lower-right corner** `(row2, col2)` (0-indexed, both inclusive).

## Examples

### Example 1

```
Input matrix:
3  0  1  4  2
5  6  3  2  1
1  2  0  1  5
4  1  0  1  7
1  0  3  0  5

NumMatrix.sumRegion(2, 1, 4, 3)  →  8   (2+0+1 + 1+0+1 + 0+3+0)
NumMatrix.update(3, 2, 2)
NumMatrix.sumRegion(2, 1, 4, 3)  →  10  (same region but matrix[3][2] changed from 0 to 2)
```

### Example 2

```
matrix = [[1]]

sumRegion(0, 0, 0, 0)  → 1
update(0, 0, 5)
sumRegion(0, 0, 0, 0)  → 5
```

## Constraints

- `m == matrix.length`
- `n == matrix[0].length`
- `1 <= m, n <= 200`
- `-10^5 <= matrix[i][j] <= 10^5`
- `0 <= row < m`, `0 <= col < n`
- `-10^5 <= val <= 10^5`
- At most `10^4` calls to `update` and `sumRegion`.

## Hints

<details>
<summary>Hint 1 — extend 1D BIT to 2D</summary>

The 2D BIT wraps the same idea: each cell `tree[i][j]` stores a partial sum over a sub-rectangle. The update and query loops are just nested versions of the 1D loops:

```js
update(r, c, delta):
  for i from r to rows: (i += i & -i)
    for j from c to cols: (j += j & -j)
      tree[i][j] += delta

query(r, c):
  s = 0
  for i from r down to 1: (i -= i & -i)
    for j from c down to 1: (j -= j & -j)
      s += tree[i][j]
  return s
```

</details>

<details>
<summary>Hint 2 — rect query via inclusion-exclusion</summary>

To get the sum of rectangle `(r1, c1)` to `(r2, c2)`:

```
rectSum = query(r2, c2)
        - query(r1 - 1, c2)
        - query(r2, c1 - 1)
        + query(r1 - 1, c1 - 1)   ← added back because it was subtracted twice
```

This is the same inclusion-exclusion you use for 1D range sums, extended to two dimensions.

</details>

<details>
<summary>Hint 3 — set vs delta for update</summary>

LeetCode gives you `update(row, col, val)` as a set operation. You need to store the current matrix values to compute the delta:

```js
const delta = val - this.vals[row][col];
this.vals[row][col] = val;
this._bitUpdate(row + 1, col + 1, delta);
```

</details>

## Write your solution

→ [`../solutions/10-range-sum-2d-mutable.js`](../solutions/10-range-sum-2d-mutable.js)

## Follow-ups

- What is the time complexity for `q` queries and `u` updates on an `m × n` grid? (Answer: O((m*n + q + u) * log m * log n).)
- How does a 2D Segment Tree compare to a 2D BIT for this problem?
- Can you support range-updates in the 2D case? (This gets complex — look into 2D difference arrays.)
