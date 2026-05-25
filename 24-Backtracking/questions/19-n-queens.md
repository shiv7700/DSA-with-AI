# Q19 — N-Queens

**Difficulty:** Hard
**Pattern:** Backtracking — place one queen per row, prune by column and diagonals
**Expected:** O(n!) time · O(n) space (excluding output)

## Problem

The **n-queens** puzzle asks you to place `n` queens on an `n x n` chessboard such that no two queens attack each other. A queen attacks along its row, column, and both diagonals.

Given an integer `n`, return **all distinct solutions** to the n-queens puzzle. Each solution represents a board configuration as a list of `n` strings, where `'Q'` denotes a queen and `'.'` denotes an empty cell.

## Examples

### Example 1
```
Input:  n = 4
Output: [[".Q..","...Q","Q...","..Q."],
         ["..Q.","Q...","...Q",".Q.."]]
```

### Example 2
```
Input:  n = 1
Output: [["Q"]]
```

## Constraints
- `1 <= n <= 9`

## Hints

<details>
<summary>Hint 1 — place one queen per row</summary>

Since no two queens can share a row, place exactly one queen in each row. Recurse row by row (row 0 to row n-1), trying each column for the current row.
</details>

<details>
<summary>Hint 2 — three pruning sets</summary>

A placement at `(row, col)` conflicts with a previous queen if they share:
- The same **column** → track with a Set `cols`.
- The same **main diagonal** → all cells on a main diagonal share the same `row - col` value. Track with Set `diag1`.
- The same **anti-diagonal** → all cells on an anti-diagonal share the same `row + col` value. Track with Set `diag2`.

Before placing, check all three sets. After recursing, remove the values from all three sets.
</details>

<details>
<summary>Hint 3 — reconstructing the board</summary>

When `row === n`, all queens are placed. Build the board from a stored array of queen column positions: for each row, generate a string of `.` except at the queen's column.
</details>

## Write your solution
→ [`../solutions/19-n-queens.js`](../solutions/19-n-queens.js)

## Follow-ups
- **N-Queens II** — return only the count of valid solutions.
- How many solutions exist for n = 8? (Answer: 92)
- Can you solve N-Queens non-recursively using an explicit stack?
