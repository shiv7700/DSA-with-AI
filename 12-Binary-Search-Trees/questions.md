# Binary Search Trees (BST)

> BST = "left < root < right" for every node. That single invariant unlocks O(log n) search, insert, delete — but only if balanced.

## Concept Check

1. The BST invariant. Is it "≤" or strict "<"? (depends on duplicates policy)
2. Inorder traversal of a BST yields what?
3. Why is BST O(log n) average but O(n) worst case?
4. What is a balanced BST? Name 3 self-balancing variants: AVL, Red-Black, Splay.
5. When would you choose a BST over a hash map?
6. Why does V8 not expose a built-in BST? (Map keeps insertion order, not sort order.)

## Implement First

```js
class BSTNode {
  constructor(val) { this.val = val; this.left = null; this.right = null; }
}

class BST {
  insert(val)   { /* O(log n) avg */ }
  search(val)   { /* */ }
  delete(val)   { /* 3 cases */ }
  min()         { /* */ }
  max()         { /* */ }
  successor(x)  { /* inorder successor */ }
  predecessor(x){ /* inorder predecessor */ }
}
```

## Easy

1. Insert a value into a BST.
2. Search for a value in a BST.
3. Find min and max in a BST.
4. Print BST in sorted order (inorder).
5. Count nodes / leaves in a BST.
6. Height of a BST.
7. Check if a given binary tree is a BST (full validation).
8. Range sum of BST — sum of nodes with values in `[low, high]`.
9. Search in a BST — return subtree rooted at the matched node.

## Medium

10. **Delete a Node in BST** — handle 3 cases (leaf / one child / two children).
11. **Lowest Common Ancestor of BST** — use BST property, no recursion needed.
12. **Kth Smallest Element in BST** — iterative inorder.
13. **Kth Largest Element in BST**.
14. **Inorder Successor / Predecessor in BST**.
15. **Convert Sorted Array to Height-Balanced BST**.
16. **Convert Sorted Linked List to BST**.
17. **Convert BST to Sorted Doubly Linked List** — in place.
18. **Validate BST** — must use range or inorder check.
19. **Two Sum in BST** — find two nodes summing to target, O(n) time, O(h) space.
20. **Floor and Ceil in BST**.
21. **Closest Value in BST** to a target.
22. **K Closest Values in BST**.
23. **Trim a BST** — keep only nodes in `[low, high]`.
24. **Range Search in BST**.
25. **Construct BST from Preorder Traversal**.
26. **All Possible Full BSTs** of `n` nodes (Catalan).
27. **Unique BSTs** — number of structurally unique BSTs with `n` nodes.

## Hard

28. **Recover BST** — two nodes were swapped; restore in O(1) extra space (Morris).
29. **Merge Two BSTs** into a balanced BST.
30. **Largest BST Subtree** in a binary tree.
31. **Serialize and Deserialize BST** — more compact than for general binary tree.
32. **Count of Smaller Numbers After Self** — using BST or BIT.

## Self-Balancing BSTs (conceptual + implementation)

33. Implement **AVL Tree** — rotations on insert/delete to maintain |balance factor| ≤ 1.
34. Implement **Red-Black Tree** — insertion fix-ups.
35. Compare AVL vs Red-Black — when is each preferred?
36. What is a Splay tree and when is it useful?
