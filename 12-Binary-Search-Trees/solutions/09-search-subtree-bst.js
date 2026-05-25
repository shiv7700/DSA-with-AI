/**
 * Q9 — Search BST (return subtree)
 * Difficulty: Easy
 * Expected:   O(log n) time average · O(log n) space
 * Problem:    ../questions/09-search-subtree-bst.md
 */

function searchSubtreeBST(root, val) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
// root = [4,2,7,1,3], val = 2 → node(2) with children 1,3
// root = [4,2,7,1,3], val = 5 → null
console.log(searchSubtreeBST(null, 2)); // null

module.exports = { searchSubtreeBST };
