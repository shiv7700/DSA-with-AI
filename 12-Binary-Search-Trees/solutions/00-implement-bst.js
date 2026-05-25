/**
 * Q0 — Implement a Full BST Class
 * Difficulty: Easy–Medium
 * Expected:   O(log n) average insert/search/delete · O(n) traversal
 * Problem:    ../questions/00-implement-bst.md
 */

class BSTNode {
  constructor(val) {
    this.val   = val;
    this.left  = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    // TODO: initialize root
  }
  insert(val)          { /* TODO */ }
  search(val)          { /* TODO: return boolean */ }
  delete(val)          { /* TODO */ }
  min()                { /* TODO: return minimum value */ }
  max()                { /* TODO: return maximum value */ }
  inorder()            { /* TODO: return number[] */ }
  successor(val)       { /* TODO: return number | null */ }
  predecessor(val)     { /* TODO: return number | null */ }
}

// ── quick tests ──────────────────────────────────────────────
const bst = new BST();
bst.insert(10); bst.insert(5); bst.insert(15);
console.log(bst.search(5));   // true
console.log(bst.inorder());   // [5, 10, 15]

module.exports = { BST, BSTNode };
