/**
 * Q19 — Word Squares
 * Difficulty: Hard
 * Expected:   O(N × L × 26^L) worst case · O(N × L) space
 * Problem:    ../questions/19-word-squares.md
 */

function wordSquares(words) {
  // TODO: trie with word-index lists + backtracking
}

// ── quick tests ──────────────────────────────────────────────
console.log(wordSquares(["area","lead","wall","lady","ball"]));
// [["ball","area","lead","lady"],["wall","area","lead","lady"]]

module.exports = { wordSquares };
