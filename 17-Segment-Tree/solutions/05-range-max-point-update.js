/**
 * Q5 — Range Max Query, Point Update
 * Difficulty: Easy
 * Expected:   O(n) build · O(log n) per update/query · O(n) space
 * Problem:    ../questions/05-range-max-point-update.md
 */

class RangeMax {
  constructor(nums) {
    // TODO: build max segment tree
  }

  update(index, val) {
    // TODO: point update
  }

  maxRange(left, right) {
    // TODO: range max query
  }
}

// ── quick tests ──────────────────────────────────────────────
const rmax = new RangeMax([2, 4, 3, 1, 6, 7, 8, 5]);
console.log(rmax.maxRange(0, 7)); // 8

module.exports = { RangeMax };
