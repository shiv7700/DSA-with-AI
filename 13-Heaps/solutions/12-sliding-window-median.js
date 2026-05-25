/**
 * Q12 — Sliding Window Median
 * Difficulty: Hard
 * Expected:   O(n log k) time · O(k) space
 * Problem:    ../questions/12-sliding-window-median.md
 */

function slidingWindowMedian(nums, k) {
  // TODO: use two heaps (max-heap for lower half, min-heap for upper half)
  // with lazy deletion to handle elements leaving the window
  // Return an array of medians for each window of size k
}

// ── quick tests ──────────────────────────────────────────────
console.log(slidingWindowMedian([1, 3, -1, -3, 5, 3, 6, 7], 3));
// [1.0, -1.0, -1.0, 3.0, 5.0, 6.0]
console.log(slidingWindowMedian([1, 2, 3, 4, 2, 3, 1, 4, 2], 3));
// [2.0, 3.0, 3.0, 3.0, 2.0, 3.0, 2.0]

module.exports = { slidingWindowMedian };
