/**
 * Q10 — Find Minimum in Rotated Sorted Array
 * Difficulty: Medium
 * Expected:   O(log n) time · O(1) space
 * Problem:    ../questions/10-min-rotated-array.md
 */

function findMin(nums) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(findMin([3, 4, 5, 1, 2]));        // 1
console.log(findMin([4, 5, 6, 7, 0, 1, 2]));  // 0
console.log(findMin([1, 2, 3, 4, 5]));        // 1
console.log(findMin([2, 1]));                  // 1
console.log(findMin([1]));                     // 1

module.exports = { findMin };
