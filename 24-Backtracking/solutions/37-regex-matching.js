/**
 * Q37 — Regular Expression Matching
 * Difficulty: Hard
 * Expected:   O(m · n) time · O(m · n) space
 * Problem:    ../questions/37-regex-matching.md
 */

function isMatch(s, p) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(isMatch("aa", "a"));    // false
console.log(isMatch("aa", "a*"));   // true
console.log(isMatch("ab", ".*"));   // true
console.log(isMatch("aab", "c*a*b")); // true

module.exports = { isMatch };
