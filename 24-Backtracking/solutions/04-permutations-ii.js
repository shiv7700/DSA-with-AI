/**
 * Q4 — Permutations II (with Duplicates)
 * Difficulty: Medium
 * Expected:   O(n · n!) time · O(n) space (excluding output)
 * Problem:    ../questions/04-permutations-ii.md
 */

function permuteUnique(nums) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(JSON.stringify(permuteUnique([1, 1, 2]))); // [[1,1,2],[1,2,1],[2,1,1]]
console.log(JSON.stringify(permuteUnique([1, 2, 3]))); // 6 unique permutations

module.exports = { permuteUnique };
