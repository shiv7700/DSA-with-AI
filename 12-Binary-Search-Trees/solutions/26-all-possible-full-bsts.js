/**
 * Q26 — All Possible Full BSTs
 * Difficulty: Medium
 * Expected:   O(Catalan(n)) time and space
 * Problem:    ../questions/26-all-possible-full-bsts.md
 */

function generateTrees(n) {
  // TODO: return array of all structurally unique BST roots
}

// ── quick tests ──────────────────────────────────────────────
// n = 3 → [root of tree: 2 with children 1,3] (1 tree)
// n = 1 → [TreeNode(1)]
console.log(generateTrees(1).length); // 1

module.exports = { generateTrees };
