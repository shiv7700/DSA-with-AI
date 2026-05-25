/**
 * Q38 — Wildcard Matching
 * Difficulty: Hard
 * Expected:   O(m · n) time · O(m · n) space
 * Problem:    ../questions/38-wildcard-matching.md
 */

function isWildcardMatch(s, p) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(isWildcardMatch("aa", "a"));      // false
console.log(isWildcardMatch("aa", "*"));      // true
console.log(isWildcardMatch("cb", "?a"));     // false
console.log(isWildcardMatch("adceb", "*a*b")); // true

module.exports = { isWildcardMatch };
