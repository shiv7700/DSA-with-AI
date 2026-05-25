/**
 * Q14 — Range-Update Range-Query (Two BITs)
 * Difficulty: Hard
 * Expected:   O(log n) per operation · O(n) space
 * Problem:    ../questions/14-range-update-range-query.md
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

class RangeUpdateRangeQuery {
  /**
   * @param {number} n - size of the array (0-indexed [0..n-1])
   */
  constructor(n) {
    // TODO: create two BITs: this.b1 and this.b2, each of size n
  }

  /**
   * Add v to every element in 0-indexed range [l, r]. O(log n).
   * @param {number} l
   * @param {number} r
   * @param {number} v
   */
  addRange(l, r, v) {
    // TODO (convert to 1-indexed, then):
    //   b1.update(l, v);     b1.update(r+1, -v)
    //   b2.update(l, v*(l-1)); b2.update(r+1, -v*r)
  }

  /**
   * Return the prefix sum sum(0..i) — internal helper. O(log n).
   * @param {number} i  0-indexed
   */
  _prefixSum(i) {
    // TODO (1-indexed i+1):
    //   return b1.query(i+1) * (i+1)  -  b2.query(i+1)
  }

  /**
   * Return sum of elements in 0-indexed range [l, r]. O(log n).
   * @param {number} l
   * @param {number} r
   * @return {number}
   */
  sumRange(l, r) {
    // TODO: _prefixSum(r) - _prefixSum(l - 1)
  }
}

// ── quick tests ──────────────────────────────────────────────

const ru = new RangeUpdateRangeQuery(5);
ru.addRange(1, 3, 2);
console.log(ru.sumRange(0, 4)); // 6
console.log(ru.sumRange(1, 3)); // 6
console.log(ru.sumRange(0, 2)); // 4
ru.addRange(0, 4, 1);
console.log(ru.sumRange(0, 4)); // 11
console.log(ru.sumRange(2, 2)); // 3

module.exports = { RangeUpdateRangeQuery, BIT };
