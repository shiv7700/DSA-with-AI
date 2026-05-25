/**
 * Q14 — Continuous Subarray Sum (Multiple of K)
 * Difficulty: Medium
 * Expected:   O(n) time · O(k) space
 * Problem:    ../questions/14-continuous-subarray-sum.md
 */

function checkSubarraySum(nums, k) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(checkSubarraySum([23, 2, 4, 6, 7], 6));  // true
console.log(checkSubarraySum([23, 2, 6, 4, 7], 6));  // true
console.log(checkSubarraySum([23, 2, 6, 4, 7], 13)); // false
console.log(checkSubarraySum([5, 0, 0, 0], 3));       // true

module.exports = { checkSubarraySum };
