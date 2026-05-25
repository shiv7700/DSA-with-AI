/**
 * Q22 — Valid Sudoku (Checker)
 * Difficulty: Medium
 * Expected:   O(1) time · O(1) space (fixed 9×9 board)
 * Problem:    ../questions/22-valid-sudoku.md
 */

function isValidSudoku(board) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
const validBoard = [
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
console.log(isValidSudoku(validBoard)); // true

module.exports = { isValidSudoku };
