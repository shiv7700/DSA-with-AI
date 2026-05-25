# Q16 — Submatrix Sum with Point Updates

**Difficulty:** Hard
**Pattern:** 2D Fenwick Tree — applied
**Expected:** O(log m * log n) per operation · O(m * n) space

## Problem

This is the applied version of Q15. Given a 2D matrix, handle a mixed sequence of:

- `update(row, col, val)` — **set** `matrix[row][col]` to `val` (0-indexed). This is a set, not a delta.
- `sumRegion(row1, col1, row2, col2)` — return the sum of all elements in the sub-rectangle from `(row1, col1)` to `(row2, col2)` (0-indexed, inclusive).

> This is essentially LeetCode 308, which you solved in Q10 — but now you're building it directly on top of your Q15 `BIT2D` class. The goal is to see how naturally the building blocks compose.

## Examples

### Example 1

```
matrix:
1  2  3
4  5  6
7  8  9

sumRegion(0, 0, 1, 1)  → 12    (1+2+4+5)
update(1, 1, 0)                  (matrix[1][1] = 0, was 5)
sumRegion(0, 0, 1, 1)  → 7     (1+2+4+0)
sumRegion(0, 0, 2, 2)  → 40    (1+2+3+4+0+6+7+8+9)
```

### Example 2

```
matrix = [[5]]

sumRegion(0,0,0,0)  → 5
update(0, 0, -5)
sumRegion(0,0,0,0)  → -5
```

## Constraints

- `1 <= rows, cols <= 200`
- `-10^9 <= matrix[i][j], val <= 10^9`
- All indexes are valid.
- At most `5000` calls to `update` and `sumRegion`.

## Hints

<details>
<summary>Hint 1 — compose BIT2D with a vals matrix</summary>

This is the exact same "set vs delta" trick from Q4 and Q10, but now applied to 2D. Keep a shadow `vals` matrix:

```js
update(r, c, val):
  delta = val - vals[r][c]
  vals[r][c] = val
  bit2d.update(r, c, delta)
```

</details>

<details>
<summary>Hint 2 — initialisation</summary>

In the constructor, initialise both `vals` as a copy of the input matrix and build the 2D BIT by calling `update(r, c, matrix[r][c])` for each cell — or directly feed deltas to the underlying BIT.

</details>

<details>
<summary>Hint 3 — rectQuery from Q15</summary>

`sumRegion(r1, c1, r2, c2)` delegates directly to `bit2d.rectQuery(r1, c1, r2, c2)`.

</details>

## Write your solution

→ [`../solutions/16-submatrix-sum-point-updates.js`](../solutions/16-submatrix-sum-point-updates.js)

## Follow-ups

- Measure: for a 200×200 grid with 5000 operations, how many BIT cell accesses does your solution make at most? (Answer: 5000 * log(200) * log(200) ≈ 5000 * 8 * 8 = 320,000 — very fast.)
- If the matrix is very sparse (most cells are zero), can you use a HashMap-backed BIT instead of a 2D array to save memory?
