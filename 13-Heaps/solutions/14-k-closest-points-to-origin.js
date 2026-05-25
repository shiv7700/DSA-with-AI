/**
 * Q14 — K Closest Points to Origin
 * Difficulty: Medium
 * Expected:   O(n log k) time · O(k) space
 * Problem:    ../questions/14-k-closest-points-to-origin.md
 */

function kClosest(points, k) {
  // TODO: use a max-heap of size k ordered by squared Euclidean distance
  // Compare x*x + y*y (no need to compute the actual square root)
  // Evict the farthest point when heap exceeds size k
}

// ── quick tests ──────────────────────────────────────────────
console.log(kClosest([[1, 3], [-2, 2]], 1));           // [[-2, 2]]
console.log(kClosest([[3, 3], [5, -1], [-2, 4]], 2));  // [[3,3],[-2,4]]

module.exports = { kClosest };
