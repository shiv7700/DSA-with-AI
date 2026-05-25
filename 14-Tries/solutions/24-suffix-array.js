/**
 * Q24 — Build a Suffix Array — Longest Repeated Substring
 * Difficulty: Hard
 * Expected:   O(n log² n) build · O(n) LRS query · O(n) space
 * Problem:    ../questions/24-suffix-array.md
 */

function longestRepeatedSubstring(s) {
  // TODO: build suffix array + LCP array, return max LCP entry
}

// ── quick tests ──────────────────────────────────────────────
console.log(longestRepeatedSubstring("banana")); // "ana"
console.log(longestRepeatedSubstring("abcabc")); // "abc"
console.log(longestRepeatedSubstring("abcd"));   // ""

module.exports = { longestRepeatedSubstring };
