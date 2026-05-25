/**
 * Q6 — Combination Sum
 * Difficulty: Medium
 * Expected:   O(n^(t/m)) time · O(t/m) space
 * Problem:    ../questions/06-combination-sum.md
 */

function combinationSum(candidates, target) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(JSON.stringify(combinationSum([2, 3, 6, 7], 7))); // [[2,2,3],[7]]
console.log(JSON.stringify(combinationSum([2, 3, 5], 8)));     // [[2,2,2,2],[2,3,3],[3,5]]
console.log(JSON.stringify(combinationSum([2], 1)));            // []

module.exports = { combinationSum };
