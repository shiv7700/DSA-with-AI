/**
 * Q3 — Recursive Binary Search
 * Difficulty: Easy
 * Expected:   O(log n) time · O(log n) space (call stack)
 * Problem:    ../questions/03-binary-search-recursive.md
 */

function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(binarySearchRecursive([1, 3, 5, 7, 9, 11, 13], 7));  // 3
console.log(binarySearchRecursive([2, 4, 6, 8, 10], 5));          // -1
console.log(binarySearchRecursive([10, 20, 30, 40, 50], 10));     // 0
console.log(binarySearchRecursive([10, 20, 30, 40, 50], 50));     // 4

module.exports = { binarySearchRecursive };
