/**
 * Q18 — Median of a Row-wise Sorted Matrix
 * Difficulty: Medium
 * Expected:   O(r × log c × log(max - min)) time · O(1) space
 * Problem:    ../questions/18-median-row-sorted-matrix.md
 */

function matrixMedian(matrix) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
const m1 = [[1, 3, 5], [2, 6, 9], [3, 6, 9]];
console.log(matrixMedian(m1));  // 5

const m2 = [[1, 1, 1], [1, 1, 3], [1, 3, 3]];
console.log(matrixMedian(m2));  // 1

module.exports = { matrixMedian };
