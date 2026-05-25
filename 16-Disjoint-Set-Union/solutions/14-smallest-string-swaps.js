/**
 * Q14 — Smallest String With Swaps
 * Difficulty: Medium
 * Expected:   O(n log n · α(n)) time · O(n) space
 * Problem:    ../questions/14-smallest-string-swaps.md
 */

function smallestStringWithSwaps(s, pairs) {
  // TODO: union swappable positions, sort chars within each component
}

// ── quick tests ──────────────────────────────────────────────
console.log(smallestStringWithSwaps("dcab", [[0,3],[1,2]]));       // "bacd"
console.log(smallestStringWithSwaps("dcab", [[0,3],[1,2],[0,2]])); // "abcd"

module.exports = { smallestStringWithSwaps };
