/**
 * Q6 — Range XOR Query, Point Update
 * Difficulty: Easy
 * Expected:   O(n) build · O(log n) per update/query · O(n) space
 * Problem:    ../questions/06-range-xor-point-update.md
 */

class RangeXor {
  constructor(nums) {
    // TODO: build XOR segment tree
  }

  update(index, val) {
    // TODO: point update
  }

  xorRange(left, right) {
    // TODO: range XOR query
  }
}

// ── quick tests ──────────────────────────────────────────────
const rx = new RangeXor([1, 3, 5, 7, 9]);
console.log(rx.xorRange(0, 2)); // 7  (1^3^5)

module.exports = { RangeXor };
