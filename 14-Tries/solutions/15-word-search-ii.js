/**
 * Q15 — Word Search II
 * Difficulty: Hard
 * Expected:   O(M × N × 4^L) worst case · O(K × L) space
 * Problem:    ../questions/15-word-search-ii.md
 */

function findWords(board, words) {
  // TODO: trie + DFS backtracking on grid
}

// ── quick tests ──────────────────────────────────────────────
console.log(findWords(
  [['o','a','a','n'],['e','t','a','e'],['i','h','k','r'],['i','f','l','v']],
  ["eat","oath","pea","rain"]
)); // ["eat","oath"]

module.exports = { findWords };
