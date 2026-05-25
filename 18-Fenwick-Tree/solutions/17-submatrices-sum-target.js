/**
 * Q17 — Number of Submatrices That Sum to Target (LeetCode 1074)
 * Difficulty: Hard
 * Expected:   O(m² * n) time · O(m * n) space
 * Problem:    ../questions/17-submatrices-sum-target.md
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
 * @param {number[][]} matrix
 * @param {number} target
 * @return {number}
 */
function numSubmatrixSumTarget(matrix, target) {
  // TODO: your solution here
  //
  // Steps:
  //  1. Build 2D prefix sum: pre[i][j] = sum of top-left rectangle (0,0)→(i-1,j-1)
  //  2. Iterate over all pairs of row boundaries (r1, r2)
  //  3. For each pair, build colSum[c] = sum of column c from r1..r2
  //     using: pre[r2+1][c+1] - pre[r1][c+1]
  //  4. Apply the 1D "subarray sum equals k" hash-map technique on colSum
  //  5. Accumulate and return total count
}

// ── quick tests ──────────────────────────────────────────────

console.log(numSubmatrixSumTarget(
  [[0, 1, 0], [1, 1, 1], [0, 1, 0]],
  0
)); // 4

console.log(numSubmatrixSumTarget(
  [[1, -1], [-1, 1]],
  0
)); // 5

console.log(numSubmatrixSumTarget([[904]], 0)); // 0

module.exports = { numSubmatrixSumTarget, BIT };
