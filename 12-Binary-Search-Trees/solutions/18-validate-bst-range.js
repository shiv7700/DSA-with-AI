/**
 * Q18 — Validate BST (with range check)
 * Difficulty: Medium
 * Expected:   O(n) time · O(h) space
 * Problem:    ../questions/18-validate-bst-range.md
 */

function isValidBSTRange(root) {
  // TODO: use -Infinity/+Infinity bounds to handle integer edge cases
}

// ── quick tests ──────────────────────────────────────────────
// [2147483647] → true (single node with MAX_VALUE)
// [5,4,6,null,null,3,7] → false
console.log(isValidBSTRange(null)); // true

module.exports = { isValidBSTRange };
