# Q11 — Lowest Common Ancestor of a BST

**Difficulty:** Medium
**Pattern:** BST property — no recursion into subtrees needed
**Expected:** O(log n) time average · O(1) space (iterative)

## Problem

Given a BST and two nodes `p` and `q`, find their **Lowest Common Ancestor (LCA)**.

The LCA of two nodes is the deepest node that is an ancestor of both. A node is considered an ancestor of itself.

> **BST advantage:** unlike a general binary tree where LCA requires O(n) traversal, in a BST you can exploit the sorted property to walk directly to the answer in O(log n).

## Examples

### Example 1

```
Tree:
        6
       / \
      2   8
     / \ / \
    0  4 7  9
      / \
     3   5

p = 2,  q = 8
Output: 6

Because:
- 6 is an ancestor of 2 (left subtree) ✓
- 6 is an ancestor of 8 (right subtree) ✓
- No deeper node is an ancestor of both.
```

### Example 2

```
Same tree.
p = 2,  q = 4
Output: 2

Because 2 is the ancestor of 4 (in 2's right subtree),
and 2 is an ancestor of itself.
→ LCA = 2
```

### Example 3

```
Same tree.
p = 3,  q = 5
Output: 4

3 and 5 are both in 4's subtree. 4 is the deepest such common ancestor.
```

## Constraints

- The number of nodes is in the range `[2, 10^5]`.
- `-10^9 <= Node.val <= 10^9`
- All node values are unique.
- `p` and `q` are different nodes and both exist in the tree.

## Hints

<details>
<summary>Hint 1 — the key insight</summary>

Walk down from the root. At any node:
- If **both** p and q are in the left subtree (both < current): go left.
- If **both** are in the right subtree (both > current): go right.
- If they **split** (one left, one right) — or one of them IS the current node — the current node is the LCA.

That's it. No need to explore both sides.
</details>

<details>
<summary>Hint 2 — iterative implementation</summary>

```js
function lowestCommonAncestor(root, p, q) {
  let curr = root;
  while (curr) {
    if (p.val < curr.val && q.val < curr.val) {
      curr = curr.left;               // both on the left
    } else if (p.val > curr.val && q.val > curr.val) {
      curr = curr.right;              // both on the right
    } else {
      return curr;                    // they split here → LCA
    }
  }
}
```

This is O(log n) time and O(1) space — much better than the general binary tree solution.
</details>

## Write your solution
→ [`../solutions/11-lca-bst.js`](../solutions/11-lca-bst.js)

## Follow-ups

- LCA in a general binary tree (not a BST) is a classic hard problem. Look it up after solving this — the BST version should make it clear what the BST property buys you.
- What if p or q might not exist in the tree? How does the algorithm change?
- Can you find the LCA of **three** nodes? How would you extend the approach?
