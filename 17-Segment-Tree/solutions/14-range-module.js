/**
 * Q14 — Range Module
 * Difficulty: Medium
 * Expected:   O(log n) per operation · O(n log n) space
 * Problem:    ../questions/14-range-module.md
 */

class RangeModule {
  constructor() {
    // TODO: initialise data structure
  }

  addRange(left, right) {
    // TODO: track [left, right)
  }

  queryRange(left, right) {
    // TODO: return true if [left, right) is fully tracked
  }

  removeRange(left, right) {
    // TODO: stop tracking [left, right)
  }
}

// ── quick tests ──────────────────────────────────────────────
const rm = new RangeModule();
rm.addRange(10, 20);
rm.removeRange(14, 16);
console.log(rm.queryRange(10, 14)); // true

module.exports = { RangeModule };
