# Q22 — Valid Sudoku (Checker)

**Difficulty:** Medium
**Pattern:** Constraint checking — sets to detect row/column/box duplicates
**Expected:** O(1) time · O(1) space — the board is always 9x9

## Problem

Determine if a `9 x 9` Sudoku board is **valid**. Only the filled cells need to be validated according to the following rules:

1. Each row must contain the digits `1`–`9` without repetition.
2. Each column must contain the digits `1`–`9` without repetition.
3. Each of the nine `3 x 3` sub-boxes must contain the digits `1`–`9` without repetition.

**Note:** A valid board does not need to be solvable. Empty cells (represented by `'.'`) are not checked.

## Examples

### Example 1
```
Input:  board =
  [["5","3",".",".","7",".",".",".","."],
   ["6",".",".","1","9","5",".",".","."],
   [".","9","8",".",".",".",".","6","."],
   ["8",".",".",".","6",".",".",".","3"],
   ["4",".",".","8",".","3",".",".","1"],
   ["7",".",".",".","2",".",".",".","6"],
   [".","6",".",".",".",".","2","8","."],
   [".",".",".","4","1","9",".",".","5"],
   [".",".",".",".","8",".",".","7","9"]]
Output: true
```

### Example 2
```
Input:  board = (same as above but with two 8s in row 0)
Output: false
```

## Constraints
- `board.length == 9`
- `board[i].length == 9`
- `board[i][j]` is a digit `1`–`9` or `'.'`.

## Hints

<details>
<summary>Hint 1 — one pass, three sets</summary>

Use three arrays of Sets: `rows[9]`, `cols[9]`, `boxes[9]`. For each cell `(r, c)` with digit `d`, check and add `d` to `rows[r]`, `cols[c]`, and `boxes[Math.floor(r/3)*3 + Math.floor(c/3)]`. If any Set already contains `d`, return false.
</details>

<details>
<summary>Hint 2 — box index formula</summary>

The 9 boxes are indexed 0–8 in reading order. The box containing cell `(r, c)` has index `Math.floor(r / 3) * 3 + Math.floor(c / 3)`.
</details>

<details>
<summary>Hint 3 — skip dots</summary>

Skip cells where `board[r][c] === '.'`. Only filled cells need validation.
</details>

## Write your solution
→ [`../solutions/22-valid-sudoku.js`](../solutions/22-valid-sudoku.js)

## Follow-ups
- **Sudoku Solver** — use this validity check inside the backtracking solver.
- How would you adapt this to validate a partially-completed board mid-solve?
- Can you check validity using bitmasks instead of Sets for better constants?
