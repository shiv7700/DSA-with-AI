/**
 * Q5 — Count Occurrences in a Sorted Array
 * Difficulty: Easy
 * Expected:   O(log n) time · O(1) space
 * Problem:    ../questions/05-count-occurrences.md
 */

function countOccurrences(nums, target) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(countOccurrences([1, 2, 4, 4, 4, 7, 9], 4));  // 3
console.log(countOccurrences([1, 2, 3, 4, 5], 6));         // 0
console.log(countOccurrences([5, 5, 5, 5, 5], 5));         // 5
console.log(countOccurrences([7], 7));                      // 1
console.log(countOccurrences([], 3));                       // 0

module.exports = { countOccurrences };
