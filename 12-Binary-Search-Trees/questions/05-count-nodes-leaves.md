# Q5 — Count Nodes and Leaves

**Difficulty:** Easy
**Pattern:** Tree recursion — post-order style
**Expected:** O(n) time · O(h) space (recursion stack)

## Problem

Given the root of a Binary Search Tree, write two functions:

1. `countNodes(root)` — returns the **total number of nodes** in the tree.
2. `countLeaves(root)` — returns the number of **leaf nodes** (nodes with no children).

A **leaf** is a node where both `node.left` and `node.right` are `null`.

## Examples

### Example 1

```
Tree:
        10
       /  \
      5    15
     / \     \
    3   7    20

countNodes(root)   →   6
countLeaves(root)  →   3   (leaves are: 3, 7, 20)
```

### Example 2

```
Tree:
    1
     \
      2
       \
        3

countNodes(root)   →   3
countLeaves(root)  →   1   (only leaf: 3)
```

### Example 3 (single node)

```
Tree:   42

countNodes(root)   →   1
countLeaves(root)  →   1   (the root is also a leaf when it has no children)
```

### Example 4 (empty tree)

```
Tree:   null

countNodes(root)   →   0
countLeaves(root)  →   0
```

## Constraints

- The number of nodes in the tree is in the range `[0, 10^4]`.
- Node values are integers.

## Hints

<details>
<summary>Hint 1 — countNodes: think recursively</summary>

The total number of nodes in a tree equals:
```
1 (this node) + countNodes(left subtree) + countNodes(right subtree)
```

Base case: if the node is `null`, there are 0 nodes.

```js
function countNodes(root) {
  if (root === null) return 0;
  return 1 + countNodes(root.left) + countNodes(root.right);
}
```
</details>

<details>
<summary>Hint 2 — countLeaves: how do you know you're at a leaf?</summary>

A leaf has no children: `node.left === null && node.right === null`.

```js
function countLeaves(root) {
  if (root === null) return 0;
  if (root.left === null && root.right === null) return 1;  // it's a leaf!
  return countLeaves(root.left) + countLeaves(root.right);
}
```
</details>

## Write your solution
→ [`../solutions/05-count-nodes-leaves.js`](../solutions/05-count-nodes-leaves.js)

## Follow-ups

- Count only **internal nodes** (nodes that have at least one child). How does this relate to `countNodes` and `countLeaves`?
- Count the number of nodes at a specific **level** (root is level 0).
- For a balanced BST of height h, how many leaves does it have? (Hint: ≈ n/2 for a complete tree.)
