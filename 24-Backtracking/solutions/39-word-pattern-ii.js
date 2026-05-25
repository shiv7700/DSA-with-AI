/**
 * Q39 — Word Pattern II
 * Difficulty: Hard
 * Expected:   O(n · m^n) time · O(n + m) space
 * Problem:    ../questions/39-word-pattern-ii.md
 */

function wordPatternMatch(pattern, s) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(wordPatternMatch("aab", "dogdogcat")); // true
console.log(wordPatternMatch("aab", "dogcatcat")); // true
console.log(wordPatternMatch("aab", "dogdogdogdog")); // false

module.exports = { wordPatternMatch };
