# Q6 — Height of a BST

**Difficulty:** Easy
**Pattern:** Tree recursion — post-order (compute from leaves up)
**Expected:** O(n) time · O(h) space (recursion stack)

## Problem

Given the root of a Binary Search Tree, return its **height**.

Height is defined as the number of **edges** on the longest path from the root to a leaf. (Some definitions use number of nodes — this problem uses edges.)

- A single-node tree has height **0**.
- An empty tree has height **-1**.

> **Why height matters:** the height determines BST performance. O(log n) height means fast operations; O(n) height (a skewed tree) means slow operations. Height is the single most important structural property of a BST.

## Examples

### Example 1

```
Tree:
        10
       /  \
      5    15
     / \  /  \
    3   7 12  20

Height = 2

Paths:
  10 → 5 → 3   (2 edges)
  10 → 5 → 7   (2 edges)
  10 → 15 → 12 (2 edges)
  10 → 15 → 20 (2 edges)
Longest = 2 edges
```

### Example 2

```
Tree:
    1
     \
      2
       \
        3
         \
          4

Height = 3   (skewed/unbalanced — 3 edges from root to deepest leaf)
```

### Example 3

```
Tree:   42
Height = 0   (single node — no edges)
```

### Example 4

```
Tree:   null
Height = -1
```

## Constraints

- The number of nodes is in the range `[0, 10^4]`.

## Hints

<details>
<summary>Hint 1 — think about it from the leaves up</summary>

The height of any node is: `1 + max(height(left), height(right))`.

The height of a leaf node is 0. The height of `null` is -1. Let those base cases flow up and the whole tree is computed automatically.
</details>

<details>
<summary>Hint 2 — implementation</summary>

```js
function heightBST(root) {
  if (root === null) return -1;
  return 1 + Math.max(heightBST(root.left), heightBST(root.right));
}
```

This visits every node exactly once: O(n). At each node you do constant work. The recursion stack depth equals the height: O(h).
</details>

<details>
<summary>Hint 3 — some definitions count nodes, not edges</summary>

If a problem defines height as "number of nodes on the longest path" (so a single node has height 1), just change the base cases:
- `null` → return 0 (instead of -1)
- leaf → return 1 (computed automatically: `1 + max(0, 0) = 1`)

Make sure you read the problem's definition carefully before coding.
</details>

## Write your solution
→ [`../solutions/06-height-bst.js`](../solutions/06-height-bst.js)

## Follow-ups

- Find the **minimum** depth of the tree (shortest path to a leaf). Be careful: a node with one child is not a leaf.
- A tree is **balanced** (in the AVL sense) if for every node, `|height(left) - height(right)| <= 1`. Write a function that checks this.
- Prove (informally) why a balanced BST of n nodes has height O(log n).
