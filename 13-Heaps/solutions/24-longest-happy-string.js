/**
 * Q24 — Longest Happy String
 * Difficulty: Medium
 * Expected:   O(n log 3) = O(n) time · O(1) space
 * Problem:    ../questions/24-longest-happy-string.md
 */

function longestDiverseString(a, b, c) {
  // TODO: build a max-heap with (count, char) entries (omit zeros)
  // Greedily place the most frequent character; if it would create 3 consecutive,
  // place the second-most frequent instead
  // Stop when no valid character can be placed
}

// ── quick tests ──────────────────────────────────────────────
console.log(longestDiverseString(1, 1, 7)); // length 9, e.g. "ccaccbcc"
console.log(longestDiverseString(2, 2, 1)); // length 5, e.g. "aabbc"
console.log(longestDiverseString(7, 1, 0)); // "aabaa"

module.exports = { longestDiverseString };
