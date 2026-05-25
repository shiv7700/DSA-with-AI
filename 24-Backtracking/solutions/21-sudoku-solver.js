/**
 * Q21 — Sudoku Solver
 * Difficulty: Hard
 * Expected:   O(9^m) time · O(1) space (m = empty cells)
 * Problem:    ../questions/21-sudoku-solver.md
 */

function solveSudoku(board) {
  // TODO: your solution here (modify board in-place)
}

// ── quick tests ──────────────────────────────────────────────
const board3 = [
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
];
solveSudoku(board3);
console.log(board3[0].join("")); // "534678912"

module.exports = { solveSudoku };
