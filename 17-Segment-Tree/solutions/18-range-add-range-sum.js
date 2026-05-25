/**
 * Q18 — Range Add, Range Sum (Lazy Propagation)
 * Difficulty: Hard
 * Expected:   O(n) build · O(log n) per operation · O(n) space
 * Problem:    ../questions/18-range-add-range-sum.md
 */

class RangeAddRangeSum {
  constructor(nums) {
    // TODO: build segment tree with lazy propagation
  }

  rangeAdd(left, right, val) {
    // TODO: add val to every element in nums[left..right]
  }

  rangeSum(left, right) {
    // TODO: return sum of nums[left..right]
  }
}

// ── quick tests ──────────────────────────────────────────────
const rs = new RangeAddRangeSum([1, 2, 3, 4, 5]);
console.log(rs.rangeSum(0, 4)); // 15

module.exports = { RangeAddRangeSum };
