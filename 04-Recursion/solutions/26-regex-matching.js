/**
 * Q26 — Regular Expression Matching (Recursive Version)
 * Difficulty: Hard
 * Expected:   O(m × n) time with memo · O(m × n) space
 * Problem:    ../questions/26-regex-matching.md
 */

function isMatch(s, p) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(isMatch('aa', 'a'));  // false
console.log(isMatch('aa', 'a*')); // true

module.exports = { isMatch };
