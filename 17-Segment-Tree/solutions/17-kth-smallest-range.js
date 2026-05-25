/**
 * Q17 — K-th Smallest Number in a Range
 * Difficulty: Medium (advanced)
 * Expected:   O(n log n) build · O(log² n) per query · O(n log n) space
 * Problem:    ../questions/17-kth-smallest-range.md
 */

class MergeSortTree {
  constructor(nums) {
    // TODO: build merge sort tree (segment tree of sorted arrays)
  }

  kthSmallest(left, right, k) {
    // TODO: k-th smallest in nums[left..right]
  }
}

// ── quick tests ──────────────────────────────────────────────
const mst = new MergeSortTree([3, 1, 4, 1, 5, 9, 2, 6]);
console.log(mst.kthSmallest(0, 4, 1)); // 1

module.exports = { MergeSortTree };
