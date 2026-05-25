/**
 * Q2 — Iterative Binary Search
 * Difficulty: Easy
 * Expected:   O(log n) time · O(1) space
 * Problem:    ../questions/02-binary-search-iterative.md
 */

function binarySearch(arr, target) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(binarySearch([2, 5, 8, 12, 16, 23, 38, 42, 55, 72], 23));  // 5
console.log(binarySearch([1, 3, 5, 7, 9], 6));                          // -1
console.log(binarySearch([42], 42));                                     // 0
console.log(binarySearch([42], 7));                                      // -1
console.log(binarySearch([1, 2, 3, 4, 5], 1));                          // 0
console.log(binarySearch([1, 2, 3, 4, 5], 5));                          // 4

module.exports = { binarySearch };
