/**
 * Q19 — Median of Two Sorted Arrays
 * Difficulty: Hard
 * Expected:   O(log(min(m, n))) time · O(1) space
 * Problem:    ../questions/19-median-two-sorted-arrays.md
 */

function findMedianSortedArrays(nums1, nums2) {
  // TODO: your solution here
  // Tip: binary search on partitions of the shorter array.
}

// ── quick tests ──────────────────────────────────────────────
console.log(findMedianSortedArrays([1, 3], [2]));       // 2.0
console.log(findMedianSortedArrays([1, 2], [3, 4]));    // 2.5
console.log(findMedianSortedArrays([0, 0], [0, 0]));    // 0.0
console.log(findMedianSortedArrays([], [1]));            // 1.0
console.log(findMedianSortedArrays([2], []));            // 2.0

module.exports = { findMedianSortedArrays };
