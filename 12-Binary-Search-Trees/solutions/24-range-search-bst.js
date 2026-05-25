/**
 * Q24 — Range Search in BST
 * Difficulty: Medium
 * Expected:   O(log n + k) time · O(h + k) space
 * Problem:    ../questions/24-range-search-bst.md
 */

function rangeSearchBST(root, low, high) {
  // TODO: return sorted array of values in [low, high]
}

// ── quick tests ──────────────────────────────────────────────
// Tree: [10,5,15,3,7,12,20], low = 6, high = 14 → [7,10,12]
console.log(rangeSearchBST(null, 6, 14)); // []

module.exports = { rangeSearchBST };
