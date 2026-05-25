/**
 * Q2 — Search for a Value in a BST
 * Difficulty: Easy
 * Expected:   O(log n) time average · O(1) space (iterative)
 * Problem:    ../questions/02-search-in-bst.md
 */

function searchBST(root, val) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
// Tree: [4,2,7,1,3], val = 2 → node with value 2 (and subtree)
// Tree: [4,2,7,1,3], val = 5 → null
console.log(searchBST(null, 2)); // null — empty tree

module.exports = { searchBST };
