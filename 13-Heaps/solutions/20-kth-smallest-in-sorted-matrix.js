/**
 * Q20 — Kth Smallest Element in a Sorted Matrix
 * Difficulty: Medium
 * Expected:   O(k log k) time · O(k) space
 * Problem:    ../questions/20-kth-smallest-in-sorted-matrix.md
 */

function kthSmallestInMatrix(matrix, k) {
  // TODO: use a min-heap seeded with (matrix[i][0], i, 0) for each row i
  // Pop k times; the k-th popped value is the answer
  // After popping (val, r, c), push (matrix[r][c+1], r, c+1) if c+1 < n
}

// ── quick tests ──────────────────────────────────────────────
console.log(kthSmallestInMatrix([[1,5,9],[10,11,13],[12,13,15]], 8));  // 13
console.log(kthSmallestInMatrix([[-5]], 1));                            // -5
console.log(kthSmallestInMatrix([[1,2],[1,3]], 2));                     // 1

module.exports = { kthSmallestInMatrix };
