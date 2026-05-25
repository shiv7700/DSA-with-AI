# Q26 — Maximal Square

**Difficulty:** Medium
**Pattern:** 2D grid DP — largest square of 1s
**Expected:** O(m × n) time · O(n) space

## Problem

Given an `m × n` binary matrix (containing only `'0'` and `'1'`), find the **largest square** containing only `1`s and return its area.

## Examples

### Example 1
```
Input:
matrix = [
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]
]
Output: 4
```
A 2×2 square of 1s at rows 1-2, columns 2-3. Area = 4.

### Example 2
```
Input:
matrix = [
  ["0","1"],
  ["1","0"]
]
Output: 1
```

### Example 3
```
Input:
matrix = [["0"]]
Output: 0
```

## Constraints
- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 300`
- `matrix[i][j]` is `'0'` or `'1'`.

## Hints

<details>
<summary>Hint 1 — what dp[r][c] means</summary>

`dp[r][c]` = the side length of the largest square whose **bottom-right corner** is at `(r, c)`.

If `matrix[r][c] === '0'`, then `dp[r][c] = 0` (no square ends here).
</details>

<details>
<summary>Hint 2 — the elegant recurrence</summary>

If `matrix[r][c] === '1'`:

`dp[r][c] = min(dp[r-1][c], dp[r][c-1], dp[r-1][c-1]) + 1`

Why min? Because a square ending at `(r, c)` can only be as large as the smallest of the squares ending at the three adjacent cells. If any of them is smaller, there's a gap limiting the square's size.
</details>

<details>
<summary>Hint 3 — track the maximum</summary>

Keep a variable `maxSide` and update it to `Math.max(maxSide, dp[r][c])` at each cell. Return `maxSide * maxSide` at the end.
</details>

## Write your solution
→ [`../solutions/26-maximal-square.js`](../solutions/26-maximal-square.js)

## Follow-ups
- **Maximal Rectangle** — find the largest rectangle (not just square) of 1s. Uses a different approach (stack).
- **Count Square Submatrices with All Ones** — the same DP gives you the count if you sum all `dp[r][c]` values.
