/**
 * Q9 — Top K Frequent Elements
 * Difficulty: Medium
 * Expected:   O(n log k) time · O(n) space
 * Problem:    ../questions/09-top-k-frequent-elements.md
 */

function topKFrequent(nums, k) {
  // TODO: build a frequency map, then use a min-heap of size k on (frequency, value) pairs
  // Return the k most frequent elements in any order
}

// ── quick tests ──────────────────────────────────────────────
console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2));         // [1, 2]
console.log(topKFrequent([1], 1));                          // [1]
console.log(topKFrequent([4, 4, 4, 5, 5, 6, 6], 2));      // [4, 5] or [4, 6]

module.exports = { topKFrequent };
