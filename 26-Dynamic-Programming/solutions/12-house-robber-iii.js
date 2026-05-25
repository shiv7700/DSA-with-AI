/**
 * Q12 — House Robber III (Binary Tree)
 * Difficulty: Medium
 * Expected:   O(n) time · O(h) space
 * Problem:    ../questions/12-house-robber-iii.md
 */

// TreeNode definition (for reference)
// function TreeNode(val, left, right) {
//   this.val = (val === undefined ? 0 : val);
//   this.left = (left === undefined ? null : left);
//   this.right = (right === undefined ? null : right);
// }

function rob(root) {
  // TODO: your solution here
  // Hint: return [skipRoot, robRoot] from a helper, take max at the top.
}

// ── quick tests ──────────────────────────────────────────────
// Build: 3 -> (2 -> (null, 3)), (3 -> (null, 1))
const n = (v, l = null, r = null) => ({ val: v, left: l, right: r });
const tree1 = n(3, n(2, null, n(3)), n(3, null, n(1)));
console.log(rob(tree1)); // 7

const tree2 = n(3, n(4, n(1), n(3)), n(5, null, n(1)));
console.log(rob(tree2)); // 9

module.exports = { rob };
