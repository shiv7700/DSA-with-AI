# Q24 — Knight's Tour

**Difficulty:** Hard
**Pattern:** Grid backtracking with Warnsdorff's heuristic — visit every cell exactly once
**Expected:** O(8^(n²)) time naive · O(n²) space

## Problem

Given an integer `n`, find a **Knight's Tour** on an `n x n` chessboard — a sequence of knight moves such that the knight visits every cell on the board exactly once. The knight starts at cell `(0, 0)`.

Return the `n x n` matrix where `board[i][j]` is the move number (1-indexed) at which the knight visits cell `(i, j)`. If no complete tour exists for the given `n`, return an empty array.

A knight moves in an "L" shape: two squares in one direction and one square perpendicular (8 possible moves total).

## Examples

### Example 1
```
Input:  n = 5
Output: (one valid tour)
  [[ 1, 12, 21, 18,  3],
   [20, 17,  2, 13, 22],
   [11, 24, 19,  4, 15],
   [16,  7, 14, 23,  8],
   [25, 10,  5,  6,  9]]
```

### Example 2
```
Input:  n = 1
Output: [[1]]
```

## Constraints
- `1 <= n <= 6` (for reasonable runtime without heuristics; n=5 and n=6 require Warnsdorff's)

## Hints

<details>
<summary>Hint 1 — basic backtracking structure</summary>

Start at `(0, 0)`, mark it as move 1. At each step, try all 8 knight moves from the current position. Move to an unvisited valid cell, mark it with the next move number, recurse, and unmark on backtrack.
</details>

<details>
<summary>Hint 2 — Warnsdorff's heuristic for efficiency</summary>

Pure backtracking is extremely slow for n >= 5. Warnsdorff's rule: at each step, choose the neighbor with the **fewest onward moves** (fewest accessible unvisited neighbors). Sort the 8 candidate moves by this count before trying them. This heuristic makes the tour O(n²) in practice.
</details>

<details>
<summary>Hint 3 — valid move check</summary>

A move to `(nr, nc)` is valid if `0 <= nr < n`, `0 <= nc < n`, and `board[nr][nc] === 0` (unvisited). Mark visited cells with their move number; unvisited cells stay 0.
</details>

## Write your solution
→ [`../solutions/24-knights-tour.js`](../solutions/24-knights-tour.js)

## Follow-ups
- Is a Knight's Tour always possible for all n? (No — it's impossible for n = 2, 3, and some others.)
- Can the tour be made **closed** (the last position can reach back to the first)?
- How does Warnsdorff's heuristic compare to pure backtracking on n = 6?
