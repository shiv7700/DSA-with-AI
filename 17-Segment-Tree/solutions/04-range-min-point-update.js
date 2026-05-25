/**
 * Q4 — Range Min Query, Point Update
 * Difficulty: Easy
 * Expected:   O(n) build · O(log n) per update/query · O(n) space
 * Problem:    ../questions/04-range-min-point-update.md
 */

class RangeMin {
  constructor(nums) {
    // TODO: build min segment tree
  }

  update(index, val) {
    // TODO: point update
  }

  minRange(left, right) {
    // TODO: range min query
  }
}

// ── quick tests ──────────────────────────────────────────────
const rm = new RangeMin([3, 1, 4, 1, 5, 9, 2, 6]);
console.log(rm.minRange(0, 7)); // 1

module.exports = { RangeMin };
