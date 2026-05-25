/**
 * Q5 — Intersection of Two Arrays
 * Difficulty: Easy
 * Expected:   O(n + m) time · O(min(n, m)) space
 * Problem:    ../questions/05-array-intersection.md
 */

function arrayIntersection(nums1, nums2) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(arrayIntersection([1, 2, 2, 1], [2, 2]));         // [2]
console.log(arrayIntersection([4, 9, 5], [9, 4, 9, 8, 4]));   // [4, 9] or [9, 4]
console.log(arrayIntersection([1, 2, 3], [4, 5, 6]));          // []
console.log(arrayIntersection([1, 1, 1], [1, 1]));             // [1]

module.exports = { arrayIntersection };
