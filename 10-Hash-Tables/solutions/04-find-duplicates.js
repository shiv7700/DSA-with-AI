/**
 * Q4 — Find Duplicates in an Array
 * Difficulty: Easy
 * Expected:   O(n) time · O(n) space
 * Problem:    ../questions/04-find-duplicates.md
 */

function findDuplicates(nums) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(findDuplicates([1, 2, 3, 2, 4, 3])); // [2, 3]  (any order)
console.log(findDuplicates([1, 1, 1, 2, 2]));     // [1, 2]
console.log(findDuplicates([5, 6, 7, 8]));         // []
console.log(findDuplicates([4]));                  // []

module.exports = { findDuplicates };
