# Q21 — Sudoku Solver

**Difficulty:** Hard
**Pattern:** Backtracking — try digits 1–9 for each empty cell, backtrack on conflict
**Expected:** O(9^m) time · O(1) space — where m is the number of empty cells

## Problem

Write a program to solve a Sudoku puzzle by filling the empty cells. A Sudoku solution must satisfy all of the following rules:

1. Each of the digits `1`–`9` must occur exactly once in each row.
2. Each of the digits `1`–`9` must occur exactly once in each column.
3. Each of the digits `1`–`9` must occur exactly once in each of the nine `3x3` sub-boxes.

Empty cells are indicated by the character `'.'`. You may assume the given Sudoku puzzle has a single unique solution.

**Modify the board in-place.** Do not return a new board.

## Examples

### Example 1
```
Input:
  [["5","3",".",".","7",".",".",".","."],
   ["6",".",".","1","9","5",".",".","."],
   [".","9","8",".",".",".",".","6","."],
   ["8",".",".",".","6",".",".",".","3"],
   ["4",".",".","8",".","3",".",".","1"],
   ["7",".",".",".","2",".",".",".","6"],
   [".","6",".",".",".",".","2","8","."],
   [".",".",".","4","1","9",".",".","5"],
   [".",".",".",".","8",".",".","7","9"]]
Output:
  [["5","3","4","6","7","8","9","1","2"],
   ["6","7","2","1","9","5","3","4","8"],
   ...]   (fully solved board)
```

## Constraints
- `board.length == 9`
- `board[i].length == 9`
- `board[i][j]` is a digit `1`–`9` or `'.'`.
- It is guaranteed that the input board has only one solution.

## Hints

<details>
<summary>Hint 1 — find the next empty cell, try 1–9</summary>

Scan left-to-right, top-to-bottom for the next `'.'`. Try placing digits `'1'` through `'9'`. For each digit that is valid (not already in the row, column, or 3x3 box), place it and recurse. If recursion succeeds, return `true`. Otherwise, reset the cell to `'.'` and try the next digit.
</details>

<details>
<summary>Hint 2 — validity check: row, column, box</summary>

For a given `(row, col, digit)`, check:
1. No identical digit in `board[row][*]`.
2. No identical digit in `board[*][col]`.
3. No identical digit in the 3x3 box starting at `(Math.floor(row/3)*3, Math.floor(col/3)*3)`.
</details>

<details>
<summary>Hint 3 — the recursive return value matters</summary>

Return `true` as soon as any recursive call returns `true`. This stops exploration the moment a complete valid solution is found. If all digits 1–9 fail for an empty cell, return `false` to trigger backtracking in the parent call.
</details>

## Write your solution
→ [`../solutions/21-sudoku-solver.js`](../solutions/21-sudoku-solver.js)

## Follow-ups
- **Valid Sudoku** — check whether a partially filled board violates any rule (no solving required).
- Can you use constraint propagation (like naked singles) to reduce backtracking?
- How does choosing the empty cell with the fewest valid candidates ("minimum remaining values" heuristic) speed things up?
