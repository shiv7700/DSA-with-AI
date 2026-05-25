# Q13 — Unique Paths

**Difficulty:** Easy
**Pattern:** 2D grid DP — counting paths
**Expected:** O(m × n) time · O(n) space

## Problem

A robot is located at the top-left corner of an `m × n` grid. The robot can only move **right** or **down** at each step. The robot is trying to reach the bottom-right corner. How many distinct paths are there?

## Examples

### Example 1
```
Input:  m = 3, n = 7
Output: 28
```

### Example 2
```
Input:  m = 3, n = 2
Output: 3
```
Three paths: right-down-down, down-right-down, down-down-right.

### Example 3
```
Input:  m = 1, n = 1
Output: 1
```

## Constraints
- `1 <= m, n <= 100`

## Hints

<details>
<summary>Hint 1 — where can you arrive from?</summary>

Any cell `(r, c)` can only be reached from the cell above `(r-1, c)` or the cell to the left `(r, c-1)`. So `dp[r][c] = dp[r-1][c] + dp[r][c-1]`.
</details>

<details>
<summary>Hint 2 — base cases</summary>

The entire first row can only be reached by moving right all the way: `dp[0][c] = 1` for all `c`. The entire first column can only be reached by moving down: `dp[r][0] = 1` for all `r`.
</details>

<details>
<summary>Hint 3 — space optimization</summary>

Since `dp[r][c]` only uses `dp[r-1][c]` (above) and `dp[r][c-1]` (already computed in current row), you can reduce to a single 1D array of length `n` and overwrite it row by row.
</details>

## Write your solution
→ [`../solutions/13-unique-paths.js`](../solutions/13-unique-paths.js)

## Follow-ups
- **Unique Paths II** (Q14) — the grid has obstacles.
- This has a pure combinatorial formula: `C(m+n-2, m-1)`. Can you derive it and implement it?
