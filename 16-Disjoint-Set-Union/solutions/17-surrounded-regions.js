/**
 * Q17 — Surrounded Regions
 * Difficulty: Medium
 * Expected:   O(m · n · α(m · n)) time · O(m · n) space
 * Problem:    ../questions/17-surrounded-regions.md
 */

function solve(board) {
  // TODO: modify board in place — flip 'O' to 'X' if not connected to border
  // DSU approach: virtual boundary node, or DFS from edges
}

// ── quick tests ──────────────────────────────────────────────
const board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]];
solve(board);
console.log(board); // "O" at (3,1) remains; others captured

module.exports = { solve };
