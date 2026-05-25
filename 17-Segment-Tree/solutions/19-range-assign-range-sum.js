/**
 * Q19 — Range Assign, Range Sum (Lazy Propagation)
 * Difficulty: Hard
 * Expected:   O(n) build · O(log n) per operation · O(n) space
 * Problem:    ../questions/19-range-assign-range-sum.md
 */

class RangeAssignRangeSum {
  constructor(nums) {
    // TODO: build segment tree with assign lazy propagation
  }

  rangeAssign(left, right, val) {
    // TODO: set every element in nums[left..right] to val
  }

  rangeSum(left, right) {
    // TODO: return sum of nums[left..right]
  }
}

// ── quick tests ──────────────────────────────────────────────
const ras = new RangeAssignRangeSum([1, 2, 3, 4, 5]);
console.log(ras.rangeSum(0, 4)); // 15

module.exports = { RangeAssignRangeSum };
