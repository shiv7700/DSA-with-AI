/**
 * Q31 — Word Break II
 * Difficulty: Hard
 * Expected:   O(n · 2^n) time worst case; O(n²) with memoization
 * Problem:    ../questions/31-word-break-ii.md
 */

function wordBreak(s, wordDict) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(wordBreak("catsanddog", ["cat","cats","and","sand","dog"]));
// ["cats and dog","cat sand dog"]
console.log(wordBreak("pineapplepenapple", ["apple","pen","applepen","pine","pineapple"]));
// ["pine apple pen apple","pineapple pen apple","pine applepen apple"]
console.log(wordBreak("catsandog", ["cats","dog","sand","and","cat"]));
// []

module.exports = { wordBreak };
