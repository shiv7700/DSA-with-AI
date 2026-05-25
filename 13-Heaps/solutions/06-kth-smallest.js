/**
 * Q6 — Kth Smallest Element Using a Heap
 * Difficulty: Easy
 * Expected:   O(n log k) time · O(k) space
 * Problem:    ../questions/06-kth-smallest.md
 */

function kthSmallest(nums, k) {
  // TODO: use a max-heap of size k
  // Maintain the k smallest elements seen so far
  // The root of the max-heap is the k-th smallest
}

// ── quick tests ──────────────────────────────────────────────
console.log(kthSmallest([3, 2, 1, 5, 6, 4], 2));             // 2
console.log(kthSmallest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4));    // 3
console.log(kthSmallest([1], 1));                              // 1

module.exports = { kthSmallest };
