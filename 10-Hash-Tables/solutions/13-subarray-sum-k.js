/**
 * Q13 — Subarray Sum Equals K
 * Difficulty: Medium
 * Expected:   O(n) time · O(n) space
 * Problem:    ../questions/13-subarray-sum-k.md
 */

function subarraySum(nums, k) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(subarraySum([1, 1, 1], 2));               // 2
console.log(subarraySum([1, 2, 3], 3));               // 2
console.log(subarraySum([1, -1, 1, -1, 1], 0));       // 4
console.log(subarraySum([1], 0));                      // 0

module.exports = { subarraySum };
