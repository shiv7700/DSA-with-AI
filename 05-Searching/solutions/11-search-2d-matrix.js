/**
 * Q11 — Search a 2D Matrix
 * Difficulty: Medium
 * Expected:   O(log(m × n)) time · O(1) space
 * Problem:    ../questions/11-search-2d-matrix.md
 */

function searchMatrix(matrix, target) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
const m1 = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]];
console.log(searchMatrix(m1, 3));   // true
console.log(searchMatrix(m1, 13));  // false

const m2 = [[1, 2, 3, 4, 5]];
console.log(searchMatrix(m2, 3));   // true

const m3 = [[1], [2], [3]];
console.log(searchMatrix(m3, 2));   // true
console.log(searchMatrix(m3, 4));   // false

module.exports = { searchMatrix };
