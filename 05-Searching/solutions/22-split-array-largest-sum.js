/**
 * Q22 — Split Array Largest Sum
 * Difficulty: Hard
 * Expected:   O(n log(sum)) time · O(1) space
 * Problem:    ../questions/22-split-array-largest-sum.md
 */

function splitArray(nums, k) {
  // TODO: your solution here
  // Split nums into k contiguous subarrays to minimize the largest sum.
}

// ── quick tests ──────────────────────────────────────────────
console.log(splitArray([7, 2, 5, 10, 8], 2));     // 18
console.log(splitArray([1, 2, 3, 4, 5], 2));      // 9
console.log(splitArray([1, 4, 4], 3));             // 4

module.exports = { splitArray };
