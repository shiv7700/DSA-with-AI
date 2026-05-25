# 12 — Binary Search Trees

> A Binary Search Tree is just a tree with one golden rule: **left < root < right**, at every single node. That one rule unlocks O(log n) search, insert, and delete — and makes inorder traversal produce a sorted sequence automatically.

## Learn Path

1. **Read [`notes.md`](./notes.md) first** — what makes a BST special, traversals, insertion, deletion, the unbalanced-tree failure mode, balanced BST preview, and when to reach for a BST over a hash map.
2. Solve questions in order. Each lives in `questions/<NN>-<slug>.md`.
3. Write your solution in the matching `solutions/<NN>-<slug>.js`.
4. Tick off the checklist below as you finish.

## Progress

### Implement First
- [ ] [00 — Implement a Full BST Class](./questions/00-implement-bst.md)

### Easy (warm-up)
- [ ] [01 — Insert a Value into a BST](./questions/01-insert-into-bst.md)
- [ ] [02 — Search for a Value in a BST](./questions/02-search-in-bst.md)
- [ ] [03 — Find Min and Max in a BST](./questions/03-min-max-bst.md)
- [ ] [04 — Inorder Traversal (sorted output)](./questions/04-inorder-traversal.md)
- [ ] [05 — Count Nodes and Leaves](./questions/05-count-nodes-leaves.md)
- [ ] [06 — Height of a BST](./questions/06-height-bst.md)
- [ ] [07 — Validate a BST](./questions/07-validate-bst.md)
- [ ] [08 — Range Sum of BST](./questions/08-range-sum-bst.md)
- [ ] [09 — Search BST (return subtree)](./questions/09-search-subtree-bst.md)

### Medium
- [ ] [10 — Delete a Node in BST](./questions/10-delete-node-bst.md)
- [ ] [11 — Lowest Common Ancestor of BST](./questions/11-lca-bst.md)
- [ ] [12 — Kth Smallest Element in BST](./questions/12-kth-smallest-bst.md)
- [ ] [13 — Kth Largest Element in BST](./questions/13-kth-largest-bst.md)
- [ ] [14 — Inorder Successor and Predecessor](./questions/14-successor-predecessor-bst.md)
- [ ] [15 — Convert Sorted Array to Height-Balanced BST](./questions/15-sorted-array-to-bst.md)
- [ ] [16 — Convert Sorted Linked List to BST](./questions/16-sorted-list-to-bst.md)
- [ ] [17 — Convert BST to Sorted Doubly Linked List](./questions/17-bst-to-dll.md)
- [ ] [18 — Validate BST (with range check)](./questions/18-validate-bst-range.md)
- [ ] [19 — Two Sum in BST](./questions/19-two-sum-bst.md)
- [ ] [20 — Floor and Ceil in BST](./questions/20-floor-ceil-bst.md)
- [ ] [21 — Closest Value in BST](./questions/21-closest-value-bst.md)
- [ ] [22 — K Closest Values in BST](./questions/22-k-closest-bst.md)
- [ ] [23 — Trim a BST](./questions/23-trim-bst.md)
- [ ] [24 — Range Search in BST](./questions/24-range-search-bst.md)
- [ ] [25 — Construct BST from Preorder Traversal](./questions/25-bst-from-preorder.md)
- [ ] [26 — All Possible Full BSTs](./questions/26-all-possible-full-bsts.md)
- [ ] [27 — Unique BSTs Count (Catalan)](./questions/27-unique-bsts-count.md)

### Hard
- [ ] [28 — Recover BST (two swapped nodes)](./questions/28-recover-bst.md)
- [ ] [29 — Merge Two BSTs into a Balanced BST](./questions/29-merge-two-bsts.md)
- [ ] [30 — Largest BST Subtree](./questions/30-largest-bst-subtree.md)
- [ ] [31 — Serialize and Deserialize BST](./questions/31-serialize-deserialize-bst.md)
- [ ] [32 — Count of Smaller Numbers After Self](./questions/32-count-smaller-after-self.md)

### Self-Balancing BSTs
- [ ] [33 — Implement an AVL Tree](./questions/33-avl-tree.md)
- [ ] [34 — Implement a Red-Black Tree](./questions/34-red-black-tree.md)
- [ ] [35 — AVL vs Red-Black: When to Use Which](./questions/35-avl-vs-red-black.md)
- [ ] [36 — Splay Trees](./questions/36-splay-tree.md)

## Related Topics

- [11 — Binary Trees](../11-Binary-Trees/) — BSTs are a special case of binary trees. Read that chapter first if you haven't.
- [10 — Hash Tables](../10-Hash-Tables/) — the main alternative to BST for key-value lookup.
- [13 — Heaps](../13-Heaps/) — another specialized tree — O(1) min/max but no search.
- [05 — Searching](../05-Searching/) — binary search on arrays is the same *idea* as BST search, on a different data structure.
