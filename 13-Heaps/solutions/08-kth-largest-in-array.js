/**
 * Q8 — Kth Largest Element in an Array
 * Difficulty: Medium
 * Expected:   O(n log k) time · O(k) space
 * Problem:    ../questions/08-kth-largest-in-array.md
 */

function findKthLargest(nums, k) {
  // TODO: use a min-heap of size k
  // Maintain the k largest elements seen so far
  // The root (minimum of those k) is the k-th largest
}

// ── quick tests ──────────────────────────────────────────────
console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2));            // 5
console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4));   // 4
console.log(findKthLargest([1], 1));                             // 1

module.exports = { findKthLargest };
