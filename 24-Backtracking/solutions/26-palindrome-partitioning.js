/**
 * Q26 — Palindrome Partitioning
 * Difficulty: Medium
 * Expected:   O(n · 2^n) time · O(n) space (excluding output)
 * Problem:    ../questions/26-palindrome-partitioning.md
 */

function partition(s) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(JSON.stringify(partition("aab"))); // [["a","a","b"],["aa","b"]]
console.log(JSON.stringify(partition("a")));   // [["a"]]

module.exports = { partition };
