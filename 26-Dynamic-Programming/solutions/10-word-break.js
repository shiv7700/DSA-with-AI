/**
 * Q10 — Word Break
 * Difficulty: Medium
 * Expected:   O(n² × m) time · O(n) space
 * Problem:    ../questions/10-word-break.md
 */

function wordBreak(s, wordDict) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(wordBreak("leetcode", ["leet", "code"]));                      // true
console.log(wordBreak("applepenapple", ["apple", "pen"]));                 // true
console.log(wordBreak("catsandog", ["cats", "dog", "sand", "an", "cat"])); // false

module.exports = { wordBreak };
