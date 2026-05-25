# Q21 — N-Queens

**Difficulty:** Hard
**Pattern:** Backtracking — place one queen per row, undo on conflict
**Expected:** O(n!) time (with pruning, faster in practice) · O(n²) space

## Problem

Place `n` queens on an `n × n` chessboard so that no two queens threaten each other.

Two queens threaten each other if they are on the same **row**, **column**, or **diagonal**.

Return all distinct solutions. Each solution is represented as an array of `n` strings, where `'Q'` indicates a queen and `'.'` indicates an empty cell.

> **Why this problem?** N-Queens is the classic backtracking problem. It perfectly illustrates the "try a placement, recurse deeper, undo if it fails" loop. Once you can solve N-Queens, you can solve almost any backtracking problem by recognizing the same structure.

## Examples

### Example 1 — n = 4
```
Input:  n = 4
Output:
[
  [".Q..",
   "...Q",
   "Q...",
   "..Q."],
  ["..Q.",
   "Q...",
   "...Q",
   ".Q.."]
]
```
There are exactly 2 solutions for n=4.

### Example 2 — n = 1
```
Input:  n = 1
Output: [["Q"]]
```

### Example 3
```
Input:  n = 2   → []   (no solution exists)
Input:  n = 3   → []   (no solution exists)
```

## Constraints
- `1 <= n <= 9`
- Return all distinct solutions.

## Hints

<details>
<summary>Hint 1 — key observation: one queen per row</summary>

Since no two queens can be in the same row, and we have `n` queens and `n` rows, there's exactly one queen in each row. This means we can place queens row by row, deciding the column for each row.

State: which row we're currently placing a queen in. When we've placed queens in all `n` rows, we have a valid solution.
</details>

<details>
<summary>Hint 2 — the "is safe" check</summary>

Before placing a queen at `(row, col)`, check that:
1. **Column**: no other queen is already in column `col`.
2. **Diagonal (↘)**: no queen on the same major diagonal — check `row - col` is unique.
3. **Anti-diagonal (↙)**: no queen on the same anti-diagonal — check `row + col` is unique.

We don't need to check the current row because we're placing one queen per row and haven't placed one in this row yet.

Use three `Set`s to track used columns, diagonals, and anti-diagonals.
</details>

<details>
<summary>Hint 3 — the backtracking skeleton</summary>

```js
function solveNQueens(n) {
  const solutions = [];
  const board = Array.from({ length: n }, () => Array(n).fill('.'));
  const cols = new Set(), diag1 = new Set(), diag2 = new Set();

  function backtrack(row) {
    if (row === n) {
      solutions.push(board.map(r => r.join('')));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue;
      // place queen
      board[row][col] = 'Q';
      cols.add(col); diag1.add(row - col); diag2.add(row + col);
      // recurse
      backtrack(row + 1);
      // undo (backtrack)
      board[row][col] = '.';
      cols.delete(col); diag1.delete(row - col); diag2.delete(row + col);
    }
  }

  backtrack(0);
  return solutions;
}
```
</details>

<details>
<summary>Hint 4 — trace for n=4, row=0</summary>

```
row=0: try col=0
  not safe check (no conflicts yet) → place Q at (0,0)
  row=1: try col=0 → conflict (same col) → skip
         try col=1 → conflict (diag) → skip
         try col=2 → safe → place Q at (1,2)
           row=2: try col=0 → safe? col0 free, diag 2-0=2 vs 0-0=0 ok, anti 2+0=2 vs 0+0=0 ok... let's see
           ... (pruning kills most paths)
  ...eventually finds (0,1),(1,3),(2,0),(3,2) and (0,2),(1,0),(2,3),(3,1)
```

The full trace is complex but the structure is clear: place, recurse, undo.
</details>

## Write your solution
→ [`../solutions/21-n-queens.js`](../solutions/21-n-queens.js)

## Follow-ups
- LeetCode 51: **N-Queens** — exact same problem.
- LeetCode 52: **N-Queens II** — return just the count of solutions.
- How many solutions are there for n=1 through n=9? (1, 0, 0, 2, 10, 4, 40, 92, 352)
