/**
 * Q20 — Floor and Ceiling in a BST
 * Difficulty: Medium
 * Expected:   O(log n) time average · O(1) space
 * Problem:    ../questions/20-floor-ceil-bst.md
 */

function floorBST(root, target) {
  // TODO: largest value <= target, or null
}

function ceilBST(root, target) {
  // TODO: smallest value >= target, or null
}

// ── quick tests ──────────────────────────────────────────────
// Tree: [8,4,12,2,6,10,14], target = 5
// floorBST → 4 · ceilBST → 6
console.log(floorBST(null, 5)); // null
console.log(ceilBST(null, 5));  // null

module.exports = { floorBST, ceilBST };
