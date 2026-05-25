/**
 * Q3 — Permutations
 * Difficulty: Medium
 * Expected:   O(n · n!) time · O(n) space (excluding output)
 * Problem:    ../questions/03-permutations.md
 */

function permute(nums) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(JSON.stringify(permute([1, 2, 3]))); // [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
console.log(JSON.stringify(permute([0, 1])));     // [[0,1],[1,0]]

module.exports = { permute };
