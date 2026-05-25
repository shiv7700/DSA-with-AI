/**
 * Q14 — Word Search
 * Difficulty: Medium
 * Expected:   O(m · n · 4^L) time · O(L) space
 * Problem:    ../questions/14-word-search.md
 */

function exist(board, word) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
const board1 = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]];
console.log(exist(board1, "ABCCED")); // true
console.log(exist(board1, "SEE"));    // true
console.log(exist(board1, "ABCB"));   // false

module.exports = { exist };
