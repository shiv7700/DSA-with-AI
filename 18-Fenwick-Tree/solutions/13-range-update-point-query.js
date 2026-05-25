/**
 * Q13 — Range-Update Point-Query (Difference Array BIT)
 * Difficulty: Hard
 * Expected:   O(log n) per operation · O(n) space
 * Problem:    ../questions/13-range-update-point-query.md
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

class RangeUpdatePointQuery {
  /**
   * @param {number} n - size of the array (0-indexed [0..n-1])
   */
  constructor(n) {
    // TODO: create a BIT of size n (BIT is 1-indexed internally)
  }

  /**
   * Add v to every element in 0-indexed range [l, r]. O(log n).
   * @param {number} l
   * @param {number} r
   * @param {number} v
   */
  addRange(l, r, v) {
    // TODO: bit.update(l+1, v),  bit.update(r+2, -v)  (guard r+2 <= n)
  }

  /**
   * Return the current value of element at 0-indexed index i. O(log n).
   * @param {number} i
   * @return {number}
   */
  pointQuery(i) {
    // TODO: bit.query(i+1)  — prefix sum of difference array = actual value
  }
}

// ── quick tests ──────────────────────────────────────────────

const rq = new RangeUpdatePointQuery(5);
rq.addRange(1, 3, 2);
console.log(rq.pointQuery(0)); // 0
console.log(rq.pointQuery(1)); // 2
console.log(rq.pointQuery(3)); // 2
console.log(rq.pointQuery(4)); // 0
rq.addRange(0, 4, 1);
console.log(rq.pointQuery(2)); // 3
rq.addRange(2, 2, 5);
console.log(rq.pointQuery(2)); // 8

module.exports = { RangeUpdatePointQuery, BIT };
