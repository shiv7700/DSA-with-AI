/**
 * Q20 — Short Encoding of Words
 * Difficulty: Hard
 * Expected:   O(N × L) time · O(N × L) space
 * Problem:    ../questions/20-short-encoding.md
 */

function minimumLengthEncoding(words) {
  // TODO: reversed trie — count leaf paths + 1 per leaf
}

// ── quick tests ──────────────────────────────────────────────
console.log(minimumLengthEncoding(["time","me","bell"])); // 10  ("time#bell#")

module.exports = { minimumLengthEncoding };
