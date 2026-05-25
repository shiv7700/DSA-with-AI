/**
 * Q3 — Find Min and Max in a BST
 * Difficulty: Easy
 * Expected:   O(h) time · O(1) space
 * Problem:    ../questions/03-min-max-bst.md
 */

function findMin(root) {
  // TODO: your solution here
}

function findMax(root) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
// Tree: 10 / 5 \ 15, with leaves 3,7,12,20
// findMin(root) → 3 · findMax(root) → 20
console.log(findMin(null)); // undefined/null — empty tree edge case
console.log(findMax(null)); // undefined/null

module.exports = { findMin, findMax };
