/**
 * Q9 — Search in Rotated Sorted Array
 * Difficulty: Medium
 * Expected:   O(log n) time · O(1) space
 * Problem:    ../questions/09-search-rotated-array.md
 */

function search(nums, target) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(search([4, 5, 6, 7, 0, 1, 2], 0));   // 4
console.log(search([4, 5, 6, 7, 0, 1, 2], 3));   // -1
console.log(search([1, 3, 5], 3));                // 1
console.log(search([1], 1));                      // 0
console.log(search([3, 1], 1));                   // 1

module.exports = { search };
