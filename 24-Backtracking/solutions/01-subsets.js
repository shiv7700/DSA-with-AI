/**
 * Q1 — Subsets
 * Difficulty: Easy
 * Expected:   O(n · 2^n) time · O(n) space (excluding output)
 * Problem:    ../questions/01-subsets.md
 */

function subsets(nums) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(JSON.stringify(subsets([1, 2, 3]))); // [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
console.log(JSON.stringify(subsets([0])));         // [[], [0]]

module.exports = { subsets };
