/**
 * Q3 — Range Sum Query with Point Updates
 * Difficulty: Easy
 * Expected:   O(n log n) build · O(log n) update · O(log n) rangeQuery · O(n) space
 * Problem:    ../questions/03-range-sum-point-update.md
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

class RangeSumBIT {
  /**
   * @param {number[]} nums - 0-indexed input array
   */
  constructor(nums) {
    // TODO: your solution here
  }

  /**
   * Add delta to 0-indexed position i.
   * @param {number} i
   * @param {number} delta
   */
  update(i, delta) {
    // TODO: your solution here
  }

  /**
   * Return sum of nums[l..r] (0-indexed, inclusive).
   * @param {number} l
   * @param {number} r
   * @return {number}
   */
  rangeQuery(l, r) {
    // TODO: your solution here
  }
}

// ── quick tests ──────────────────────────────────────────────

const rs = new RangeSumBIT([1, 3, 5]);
console.log(rs.rangeQuery(0, 2)); // 9
rs.update(1, 2);
console.log(rs.rangeQuery(0, 2)); // 11
console.log(rs.rangeQuery(1, 2)); // 10

const rs2 = new RangeSumBIT([0, 0, 0, 0, 0]);
rs2.update(2, 100);
console.log(rs2.rangeQuery(0, 4)); // 100
console.log(rs2.rangeQuery(0, 1)); // 0
console.log(rs2.rangeQuery(2, 4)); // 100

module.exports = { RangeSumBIT, BIT };
