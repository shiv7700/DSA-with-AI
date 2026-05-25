/**
 * Q1 — Build a BIT from an Array
 * Difficulty: Easy
 * Expected:   O(n log n) build · O(log n) update/query · O(n) space
 * Problem:    ../questions/01-build-bit.md
 */

class BIT {
  constructor(n) {
    this.n = n;
    this.tree = new Array(n + 1).fill(0);
  }
  update(i, delta) {
    for (; i <= this.n; i += i & -i) this.tree[i] += delta;
  }
  query(i) {
    let s = 0;
    for (; i > 0; i -= i & -i) s += this.tree[i];
    return s;
  }
  rangeQuery(l, r) {
    return this.query(r) - this.query(l - 1);
  }
}

/**
 * Build a BIT from a 0-indexed array.
 * Public methods accept 0-indexed positions.
 */
class NumBIT {
  constructor(nums) {
    // TODO: your solution here
    //  1. Store n = nums.length
    //  2. Create internal BIT of size n
    //  3. For each element, call internal update with 1-indexed position
  }

  /** Add delta to 0-indexed position i. O(log n). */
  update(i, delta) {
    // TODO: convert i to 1-indexed, call internal update
  }

  /** Prefix sum: sum of nums[0..i] (0-indexed). O(log n). */
  query(i) {
    // TODO: convert i to 1-indexed, call internal query
  }

  /** Range sum: sum of nums[l..r] (0-indexed). O(log n). */
  rangeQuery(l, r) {
    // TODO: query(r) - query(l - 1)
  }
}

// ── quick tests ──────────────────────────────────────────────

const bit = new NumBIT([1, 3, 5, 7, 9, 11]);

console.log(bit.query(0));         // 1
console.log(bit.query(2));         // 9
console.log(bit.query(5));         // 36
console.log(bit.rangeQuery(2, 4)); // 21
bit.update(1, 2);
console.log(bit.query(2));         // 11

module.exports = { NumBIT, BIT };
