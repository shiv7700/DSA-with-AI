/**
 * Q6 — Floor and Ceiling in a Sorted Array
 * Difficulty: Easy
 * Expected:   O(log n) time · O(1) space
 * Problem:    ../questions/06-floor-ceiling.md
 */

function floor(arr, x) {
  // TODO: return largest element <= x, or -Infinity if none exists
}

function ceiling(arr, x) {
  // TODO: return smallest element >= x, or Infinity if none exists
}

// ── quick tests ──────────────────────────────────────────────
const arr = [1, 3, 6, 8, 11, 15];
console.log(floor(arr, 7));    // 6
console.log(ceiling(arr, 7));  // 8
console.log(floor(arr, 6));    // 6
console.log(ceiling(arr, 6));  // 6
console.log(floor([5, 10, 15], 2));    // -Infinity
console.log(ceiling([5, 10, 15], 2));  //  5
console.log(floor([5, 10, 15], 20));   //  15
console.log(ceiling([5, 10, 15], 20)); //  Infinity

module.exports = { floor, ceiling };
