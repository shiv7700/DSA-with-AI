/**
 * Q14 — Inorder Successor and Predecessor in a BST
 * Difficulty: Medium
 * Expected:   O(log n) time average · O(1) space (iterative)
 * Problem:    ../questions/14-successor-predecessor-bst.md
 */

function successor(root, val) {
  // TODO: your solution here
}

function predecessor(root, val) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
// Tree: [20,8,22,4,12,null,null,null,null,10,14]
// successor(8) → 10 · predecessor(12) → 10
console.log(successor(null, 8));    // null
console.log(predecessor(null, 12)); // null

module.exports = { successor, predecessor };
