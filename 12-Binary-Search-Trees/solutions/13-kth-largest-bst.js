/**
 * Q13 — Kth Largest Element in a BST
 * Difficulty: Medium
 * Expected:   O(h + k) time · O(h) space
 * Problem:    ../questions/13-kth-largest-bst.md
 */

function kthLargest(root, k) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
// Tree: [3,1,4,null,2], k=1 → 4
// Tree: [5,3,6,2,4,null,null,1], k=3 → 4
console.log(kthLargest(null, 1)); // undefined/null

module.exports = { kthLargest };
