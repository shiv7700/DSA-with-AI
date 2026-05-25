/**
 * Q10 — Range Sum Query 2D — Mutable (LeetCode 308)
 * Difficulty: Medium
 * Expected:   O(m*n*log m*log n) build · O(log m * log n) per op · O(m*n) space
 * Problem:    ../questions/10-range-sum-2d-mutable.md
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

class NumMatrix {
  /**
   * @param {number[][]} matrix
   */
  constructor(matrix) {
    // TODO: your solution here
    // Hint: use a 2D BIT (nested loops) and store vals matrix for set→delta conversion
  }

  /**
   * Set matrix[row][col] = val. O(log m * log n).
   * @param {number} row
   * @param {number} col
   * @param {number} val
   */
  update(row, col, val) {
    // TODO: your solution here
  }

  /**
   * Return sum of sub-rectangle (row1,col1) to (row2,col2). O(log m * log n).
   * @param {number} row1
   * @param {number} col1
   * @param {number} row2
   * @param {number} col2
   * @return {number}
   */
  sumRegion(row1, col1, row2, col2) {
    // TODO: use inclusion-exclusion with 2D prefix queries
  }
}

// ── quick tests ──────────────────────────────────────────────

const matrix = [
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5],
];

const nm = new NumMatrix(matrix);
console.log(nm.sumRegion(2, 1, 4, 3)); // 8
nm.update(3, 2, 2);
console.log(nm.sumRegion(2, 1, 4, 3)); // 10

module.exports = { NumMatrix, BIT };
