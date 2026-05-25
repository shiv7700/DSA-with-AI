/**
 * Q17 — Convert BST to Sorted Doubly Linked List
 * Difficulty: Medium
 * Expected:   O(n) time · O(h) space
 * Problem:    ../questions/17-bst-to-dll.md
 */

function bstToDLL(root) {
  // TODO: return head of circular doubly linked list
  // Repurpose left → prev, right → next (in place, no new nodes)
}

// ── quick tests ──────────────────────────────────────────────
// Tree: [4,2,5,1,3] → circular DLL: 1 ⇄ 2 ⇄ 3 ⇄ 4 ⇄ 5 (circular)
console.log(bstToDLL(null)); // null

module.exports = { bstToDLL };
