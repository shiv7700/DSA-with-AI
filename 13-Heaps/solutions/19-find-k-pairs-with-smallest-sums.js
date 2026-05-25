/**
 * Q19 — Find K Pairs with Smallest Sums
 * Difficulty: Medium
 * Expected:   O(k log k) time · O(k) space
 * Problem:    ../questions/19-find-k-pairs-with-smallest-sums.md
 */

function kSmallestPairs(nums1, nums2, k) {
  // TODO: seed a min-heap with (nums1[i] + nums2[0], i, 0) for i in 0..min(k,m)-1
  // Pop the minimum sum pair [nums1[i], nums2[j]], collect it
  // Push the next candidate from the same row: (nums1[i] + nums2[j+1], i, j+1)
  // Stop after k pairs
}

// ── quick tests ──────────────────────────────────────────────
console.log(kSmallestPairs([1, 7, 11], [2, 4, 6], 3));  // [[1,2],[1,4],[1,6]]
console.log(kSmallestPairs([1, 1, 2], [1, 2, 3], 2));   // [[1,1],[1,1]]
console.log(kSmallestPairs([1, 2], [3], 3));             // [[1,3],[2,3]]

module.exports = { kSmallestPairs };
