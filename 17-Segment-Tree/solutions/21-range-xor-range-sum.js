/**
 * Q21 — Range XOR Update, Range Sum (Lazy Propagation)
 * Difficulty: Hard
 * Expected:   O(n) build · O(log n) per operation · O(n) space
 * Problem:    ../questions/21-range-xor-range-sum.md
 */

class RangeXorRangeSum {
  constructor(nums) {
    // TODO: build segment tree for 0/1 array with flip lazy
  }

  rangeFlip(left, right) {
    // TODO: XOR every element in nums[left..right] with 1
  }

  rangeSum(left, right) {
    // TODO: return count of 1s in nums[left..right]
  }
}

// ── quick tests ──────────────────────────────────────────────
const rxs = new RangeXorRangeSum([0, 1, 0, 1, 1, 0, 0, 1]);
console.log(rxs.rangeSum(0, 7)); // 4

module.exports = { RangeXorRangeSum };
