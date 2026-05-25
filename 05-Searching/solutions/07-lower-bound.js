/**
 * Q7 — Lower Bound
 * Difficulty: Easy
 * Expected:   O(log n) time · O(1) space
 * Problem:    ../questions/07-lower-bound.md
 */

function lowerBound(arr, target) {
  // TODO: return first index i such that arr[i] >= target.
  // Return arr.length if target is greater than all elements.
}

// ── quick tests ──────────────────────────────────────────────
console.log(lowerBound([1, 3, 5, 7, 9], 5));     // 2
console.log(lowerBound([1, 3, 5, 5, 5, 7], 5));  // 2 (first 5)
console.log(lowerBound([1, 3, 5, 7, 9], 6));     // 3 (first element >= 6 is 7)
console.log(lowerBound([3, 5, 7], 1));            // 0
console.log(lowerBound([3, 5, 7], 9));            // 3 (arr.length)

module.exports = { lowerBound };
