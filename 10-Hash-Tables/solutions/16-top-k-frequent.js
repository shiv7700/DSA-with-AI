/**
 * Q16 — Top K Frequent Elements
 * Difficulty: Medium
 * Expected:   O(n) time · O(n) space
 * Problem:    ../questions/16-top-k-frequent.md
 */

function topKFrequent(nums, k) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2)); // [1, 2]
console.log(topKFrequent([1], 1));                  // [1]
console.log(topKFrequent([4, 4, 4, 5, 5, 6], 2)); // [4, 5]

module.exports = { topKFrequent };
