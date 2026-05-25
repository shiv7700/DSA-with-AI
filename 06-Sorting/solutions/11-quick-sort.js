/**
 * Q11 — Quick Sort
 * Difficulty: Medium
 * Expected:   O(n log n) average · O(n²) worst · O(log n) space
 * Problem:    ../questions/11-quick-sort.md
 */

function quickSort(arr, low = 0, high = arr.length - 1) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(quickSort([3, 6, 8, 10, 1, 2, 1])); // [1, 1, 2, 3, 6, 8, 10]

module.exports = { quickSort };
