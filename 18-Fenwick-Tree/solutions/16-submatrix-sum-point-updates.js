/**
 * Q16 — Submatrix Sum with Point Updates
 * Difficulty: Hard
 * Expected:   O(m*n*log m*log n) build · O(log m * log n) per op · O(m*n) space
 * Problem:    ../questions/16-submatrix-sum-point-updates.md
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

class SubmatrixSum {
  /**
   * @param {number[][]} matrix
   */
  constructor(matrix) {
    // TODO: your solution here
    // Store rows, cols, a shadow vals matrix, and a 2D BIT
    // Build by calling update(r, c, matrix[r][c]) for each cell
  }

  /**
   * Set matrix[row][col] = val. O(log m * log n).
   * @param {number} row
   * @param {number} col
   * @param {number} val
   */
  update(row, col, val) {
    // TODO: compute delta, update vals, call _bitUpdate
  }

  /**
   * Return sum of sub-rectangle (r1,c1) to (r2,c2). O(log m * log n).
   * @param {number} row1
   * @param {number} col1
   * @param {number} row2
   * @param {number} col2
   * @return {number}
   */
  sumRegion(row1, col1, row2, col2) {
    // TODO: delegate to 2D BIT rectQuery
  }

  /** Internal 2D BIT update (1-indexed). */
  _bitUpdate(r, c, delta) {
    // TODO: nested loops
  }

  /** Internal 2D BIT prefix query (1-indexed). */
  _bitQuery(r, c) {
    // TODO: nested loops
  }
}

// ── quick tests ──────────────────────────────────────────────

const sm = new SubmatrixSum([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]);

console.log(sm.sumRegion(0, 0, 1, 1)); // 12  (1+2+4+5)
sm.update(1, 1, 0);
console.log(sm.sumRegion(0, 0, 1, 1)); // 7   (1+2+4+0)
console.log(sm.sumRegion(0, 0, 2, 2)); // 40  (1+2+3+4+0+6+7+8+9)

module.exports = { SubmatrixSum, BIT };
