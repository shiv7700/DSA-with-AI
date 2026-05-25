/**
 * Q7 — Validate a BST
 * Difficulty: Easy–Medium
 * Expected:   O(n) time · O(h) space
 * Problem:    ../questions/07-validate-bst.md
 */

function isValidBST(root) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
// [5,3,8,1,4,null,9] → true
// [5,1,6,null,null,3,7] → false (3 is in right subtree of 5 but 3 < 5)
console.log(isValidBST(null)); // true — empty tree is valid

module.exports = { isValidBST };
