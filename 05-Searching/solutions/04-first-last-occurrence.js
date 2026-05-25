/**
 * Q4 — First and Last Occurrence
 * Difficulty: Easy
 * Expected:   O(log n) time · O(1) space
 * Problem:    ../questions/04-first-last-occurrence.md
 */

function searchRange(nums, target) {
  // TODO: your solution here
  // Return [firstIndex, lastIndex], or [-1, -1] if not found.
}

// ── quick tests ──────────────────────────────────────────────
console.log(searchRange([2, 4, 5, 5, 5, 5, 7, 9, 9], 5));  // [2, 5]
console.log(searchRange([1, 2, 3, 4, 5], 3));               // [2, 2]
console.log(searchRange([1, 2, 3, 4, 5], 6));               // [-1, -1]
console.log(searchRange([7, 7, 7, 7, 7], 7));               // [0, 4]
console.log(searchRange([], 5));                             // [-1, -1]

module.exports = { searchRange };
