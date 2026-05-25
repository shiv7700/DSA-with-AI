/**
 * Q2 — Subsets II (with Duplicates)
 * Difficulty: Medium
 * Expected:   O(n · 2^n) time · O(n) space (excluding output)
 * Problem:    ../questions/02-subsets-ii.md
 */

function subsetsWithDup(nums) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(JSON.stringify(subsetsWithDup([1, 2, 2]))); // [[], [1], [1,2], [1,2,2], [2], [2,2]]
console.log(JSON.stringify(subsetsWithDup([0])));        // [[], [0]]

module.exports = { subsetsWithDup };
