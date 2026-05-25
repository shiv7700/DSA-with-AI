/**
 * Q21 — Closest Value in BST
 * Difficulty: Medium
 * Expected:   O(log n) time average · O(1) space
 * Problem:    ../questions/21-closest-value-bst.md
 */

function closestValue(root, target) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
// Tree: [4,2,5,1,3], target = 3.714286 → 4
// Same tree, target = 2.5 → 2 (tie broken by smaller)
console.log(closestValue(null, 3.7)); // null/undefined

module.exports = { closestValue };
