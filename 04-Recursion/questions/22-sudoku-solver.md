# Q22 — Sudoku Solver

**Difficulty:** Hard
**Pattern:** Backtracking — fill one cell at a time, undo on conflict
**Expected:** O(9^m) time — m = number of empty cells · O(81) = O(1) space

## Problem

Write a function `solveSudoku(board)` that fills a partially completed 9×9 Sudoku board **in place**.

Rules:
- Each row must contain digits `1–9` without repetition.
- Each column must contain digits `1–9` without repetition.
- Each of the nine `3×3` sub-boxes must contain digits `1–9` without repetition.
- Empty cells are represented as `'.'`.
- The input puzzle always has a unique solution.

> **Why this problem?** Sudoku Solver is the most famous backtracking problem. The logic is exactly the same as N-Queens: try a digit, recurse, undo if it leads to a dead end. The constraint checking is more complex, but the skeleton is identical.

## Examples

### Example 1
```
Input board:
["5","3",".",".","7",".",".",".","."],
["6",".",".","1","9","5",".",".","."],
[".","9","8",".",".",".",".","6","."],
["8",".",".",".","6",".",".",".","3"],
["4",".",".","8",".","3",".",".","1"],
["7",".",".",".","2",".",".",".","6"],
[".","6",".",".",".",".","2","8","."],
[".",".",".","4","1","9",".",".","5"],
[".",".",".",".","8",".",".","7","9"]

Output board (modified in place):
["5","3","4","6","7","8","9","1","2"],
["6","7","2","1","9","5","3","4","8"],
["1","9","8","3","4","2","5","6","7"],
["8","5","9","7","6","1","4","2","3"],
["4","2","6","8","5","3","7","9","1"],
["7","1","3","9","2","4","8","5","6"],
["9","6","1","5","3","7","2","8","4"],
["2","8","7","4","1","9","6","3","5"],
["3","4","5","2","8","6","1","7","9"]
```

## Constraints
- `board.length == 9`, `board[i].length == 9`
- `board[i][j]` is a digit `'1'–'9'` or `'.'`
- The input is guaranteed to have exactly one solution.
- Modify the board in place.

## Hints

<details>
<summary>Hint 1 — the isValid helper</summary>

Before placing digit `d` at `(row, col)`, check:
1. `d` doesn't appear in row `row`.
2. `d` doesn't appear in column `col`.
3. `d` doesn't appear in the 3×3 box containing `(row, col)`.

The top-left corner of the 3×3 box: `boxRow = Math.floor(row/3)*3`, `boxCol = Math.floor(col/3)*3`.

```js
function isValid(board, row, col, d) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === d) return false;             // same row
    if (board[i][col] === d) return false;             // same col
    const r = Math.floor(row/3)*3 + Math.floor(i/3);
    const c = Math.floor(col/3)*3 + (i % 3);
    if (board[r][c] === d) return false;               // same box
  }
  return true;
}
```
</details>

<details>
<summary>Hint 2 — the backtracking skeleton</summary>

Find the next empty cell (`'.'`). Try each digit `1–9`. If a digit is valid, place it and recurse. If recursion returns `true`, propagate success. Otherwise, undo (set back to `'.'`) and try the next digit.

```js
function solve(board) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] !== '.') continue;    // already filled
      for (let d = 1; d <= 9; d++) {
        const ch = String(d);
        if (isValid(board, r, c, ch)) {
          board[r][c] = ch;                  // place
          if (solve(board)) return true;     // recurse
          board[r][c] = '.';                 // undo
        }
      }
      return false;  // no digit worked → backtrack to previous cell
    }
  }
  return true;  // all cells filled!
}
```
</details>

<details>
<summary>Hint 3 — why "return false" is the backtrack signal</summary>

When `solve` returns `false`, it means: "I tried every digit for this cell, none worked." This tells the caller (the previous recursive call) that its choice was wrong — and the caller should undo and try its next digit.

This cascading `false` return is the "backtrack" signal propagating up the call stack.
</details>

<details>
<summary>Hint 4 — optimization: try the most constrained cell first</summary>

Instead of scanning cells left-to-right, pick the empty cell with the fewest valid digits. This dramatically reduces the search space. But start with the simple version first — it's already fast enough for valid 9×9 puzzles.
</details>

## Write your solution
→ [`../solutions/22-sudoku-solver.js`](../solutions/22-sudoku-solver.js)

## Follow-ups
- LeetCode 37: **Sudoku Solver** — exact same problem.
- Write a Sudoku validator (`isValidSudoku`) — LeetCode 36.
- What's the worst-case number of cells the algorithm fills and unfiles before finding the solution?
