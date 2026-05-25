/**
 * Q6 — Union of Two Arrays
 * Difficulty: Easy
 * Expected:   O(n + m) time · O(n + m) space
 * Problem:    ../questions/06-array-union.md
 */

function arrayUnion(nums1, nums2) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(arrayUnion([1, 2, 3], [3, 4, 5])); // [1, 2, 3, 4, 5]
console.log(arrayUnion([1, 1, 2], [2, 2, 3])); // [1, 2, 3]
console.log(arrayUnion([7, 8, 9], [7, 8, 9])); // [7, 8, 9]
console.log(arrayUnion([], [1, 2]));             // [1, 2]

module.exports = { arrayUnion };
