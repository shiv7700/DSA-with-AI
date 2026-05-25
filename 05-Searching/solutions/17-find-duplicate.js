/**
 * Q17 — Find the Duplicate Number
 * Difficulty: Medium
 * Expected:   O(n log n) binary search · O(n) Floyd's · O(1) space
 * Problem:    ../questions/17-find-duplicate.md
 */

// Approach A: binary search on the value range
function findDuplicateBinarySearch(nums) {
  // TODO: your solution here
}

// Approach B (bonus): Floyd's tortoise and hare (O(n) time)
function findDuplicateFloyd(nums) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(findDuplicateBinarySearch([1, 3, 4, 2, 2]));  // 2
console.log(findDuplicateBinarySearch([3, 1, 3, 4, 2]));  // 3
console.log(findDuplicateBinarySearch([1, 1]));            // 1

module.exports = { findDuplicateBinarySearch, findDuplicateFloyd };
