/**
 * Q20 — Range Add, Range Min/Max (Lazy Propagation)
 * Difficulty: Hard
 * Expected:   O(n) build · O(log n) per operation · O(n) space
 * Problem:    ../questions/20-range-add-range-minmax.md
 */

class RangeAddMinMax {
  constructor(nums) {
    // TODO: build segment tree storing both min and max with lazy add
  }

  rangeAdd(left, right, val) {
    // TODO: add val to every element in nums[left..right]
  }

  rangeMin(left, right) {
    // TODO: return minimum in nums[left..right]
  }

  rangeMax(left, right) {
    // TODO: return maximum in nums[left..right]
  }
}

// ── quick tests ──────────────────────────────────────────────
const ramm = new RangeAddMinMax([3, 1, 4, 1, 5, 9, 2, 6]);
console.log(ramm.rangeMin(0, 7)); // 1
console.log(ramm.rangeMax(0, 7)); // 9

module.exports = { RangeAddMinMax };
