/**
 * Q15 — 2D BIT Implementation
 * Difficulty: Hard
 * Expected:   O(m*n*log m*log n) build · O(log m * log n) per op · O(m*n) space
 * Problem:    ../questions/15-2d-bit-implementation.md
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

class BIT2D {
  /**
   * @param {number} rows
   * @param {number} cols
   */
  constructor(rows, cols) {
    // TODO: store rows and cols, create a (rows+1) x (cols+1) tree array of zeros
  }

  /**
   * Add delta to 0-indexed cell (r, c). O(log rows * log cols).
   * @param {number} r
   * @param {number} c
   * @param {number} delta
   */
  update(r, c, delta) {
    // TODO: outer loop over rows (1-indexed), inner loop over cols (1-indexed)
    //   for i from r+1 to rows, i += i & -i:
    //     for j from c+1 to cols, j += j & -j:
    //       tree[i][j] += delta
  }

  /**
   * Prefix sum from (0,0) to (r,c) inclusive. O(log rows * log cols).
   * @param {number} r
   * @param {number} c
   * @return {number}
   */
  query(r, c) {
    // TODO: outer loop over rows (1-indexed), inner loop over cols (1-indexed)
    //   for i from r+1 down to 1, i -= i & -i:
    //     for j from c+1 down to 1, j -= j & -j:
    //       s += tree[i][j]
  }

  /**
   * Sum of sub-rectangle (r1,c1) to (r2,c2). O(log rows * log cols).
   * @param {number} r1
   * @param {number} c1
   * @param {number} r2
   * @param {number} c2
   * @return {number}
   */
  rectQuery(r1, c1, r2, c2) {
    // TODO: inclusion-exclusion:
    //   query(r2,c2) - query(r1-1,c2) - query(r2,c1-1) + query(r1-1,c1-1)
  }
}

// ── quick tests ──────────────────────────────────────────────

const b2d = new BIT2D(3, 3);
b2d.update(0, 0, 1);
b2d.update(1, 1, 2);
b2d.update(2, 2, 3);

console.log(b2d.query(0, 0));           // 1
console.log(b2d.query(1, 1));           // 3
console.log(b2d.query(2, 2));           // 6
console.log(b2d.rectQuery(0, 0, 1, 1)); // 3
console.log(b2d.rectQuery(1, 1, 2, 2)); // 5

module.exports = { BIT2D, BIT };
