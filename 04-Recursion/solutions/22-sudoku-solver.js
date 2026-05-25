/**
 * Q22 — Sudoku Solver
 * Difficulty: Hard
 * Expected:   O(9^m) time · O(1) space
 * Problem:    ../questions/22-sudoku-solver.md
 */

function solveSudoku(board) {
  // TODO: your solution here (modifies board in place)
}

// ── quick tests ──────────────────────────────────────────────
const board = [
  ['5','3','.','.','7','.','.','.','.'],
  ['6','.','.','1','9','5','.','.','.'],
  ['.','9','8','.','.','.','.','6','.'],
  ['8','.','.','.','6','.','.','.','3'],
  ['4','.','.','8','.','3','.','.','1'],
  ['7','.','.','.','2','.','.','.','6'],
  ['.','6','.','.','.','.','2','8','.'],
  ['.','.','.','4','1','9','.','.','5'],
  ['.','.','.','.','8','.','.','7','9'],
];
solveSudoku(board);
console.log(board[0]); // ['5','3','4','6','7','8','9','1','2']

module.exports = { solveSudoku };
