/**
 * Q15 — Word Search II (Trie + Backtracking)
 * Difficulty: Hard
 * Expected:   O(m · n · 4 · 3^(L-1)) time · O(sum of word lengths) space
 * Problem:    ../questions/15-word-search-ii.md
 */

function findWords(board, words) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
const board2 = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]];
console.log(findWords(board2, ["oath","pea","eat","rain"])); // ["eat","oath"]
console.log(findWords([["a","b"],["c","d"]], ["abcb"]));     // []

module.exports = { findWords };
