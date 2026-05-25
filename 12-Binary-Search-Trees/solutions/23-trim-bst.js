/**
 * Q23 — Trim a BST
 * Difficulty: Medium
 * Expected:   O(n) time · O(h) space
 * Problem:    ../questions/23-trim-bst.md
 */

function trimBST(root, low, high) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
// root = [1,0,2], low = 1, high = 2 → [1,null,2]
console.log(trimBST(null, 1, 2)); // null

module.exports = { trimBST };
