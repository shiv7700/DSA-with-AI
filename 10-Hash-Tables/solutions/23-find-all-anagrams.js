/**
 * Q23 — Find All Anagrams in a String
 * Difficulty: Medium
 * Expected:   O(n) time · O(k) space
 * Problem:    ../questions/23-find-all-anagrams.md
 */

function findAnagrams(s, p) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(findAnagrams('cbaebabacd', 'abc')); // [0, 6]
console.log(findAnagrams('abab', 'ab'));         // [0, 1, 2]
console.log(findAnagrams('aa', 'bb'));           // []

module.exports = { findAnagrams };
