/**
 * Q14 — Kth Smallest Element in a Sorted Matrix
 * Difficulty: Medium
 * Expected:   O(n log(max - min)) time · O(1) space
 * Problem:    ../questions/14-kth-smallest-sorted-matrix.md
 */

function kthSmallest(matrix, k) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
const m1 = [[1, 5, 9], [10, 11, 13], [12, 13, 15]];
console.log(kthSmallest(m1, 8));   // 13

const m2 = [[-5]];
console.log(kthSmallest(m2, 1));   // -5

const m3 = [[1, 2], [1, 3]];
console.log(kthSmallest(m3, 2));   // 1

module.exports = { kthSmallest };
