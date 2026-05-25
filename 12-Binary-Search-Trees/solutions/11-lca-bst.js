/**
 * Q11 — Lowest Common Ancestor of a BST
 * Difficulty: Medium
 * Expected:   O(log n) time average · O(1) space (iterative)
 * Problem:    ../questions/11-lca-bst.md
 */

function lowestCommonAncestor(root, p, q) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
// Tree: [6,2,8,0,4,7,9,null,null,3,5], p=2, q=8 → node(6)
// Same tree, p=2, q=4 → node(2)
console.log(lowestCommonAncestor(null, null, null)); // null

module.exports = { lowestCommonAncestor };
