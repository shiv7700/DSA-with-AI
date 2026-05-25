/**
 * Q3 — Range Sum Query, Point Update
 * Difficulty: Easy
 * Expected:   O(n) build · O(log n) per update/query · O(n) space
 * Problem:    ../questions/03-range-sum-point-update.md
 */

class NumArray {
  constructor(nums) {
    // TODO: build segment tree
  }

  update(index, val) {
    // TODO: point update
  }

  sumRange(left, right) {
    // TODO: range sum query
  }
}

// ── quick tests ──────────────────────────────────────────────
const na = new NumArray([1, 3, 5]);
console.log(na.sumRange(0, 2)); // 9

module.exports = { NumArray };
