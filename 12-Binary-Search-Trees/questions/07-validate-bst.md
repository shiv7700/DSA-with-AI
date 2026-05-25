# Q7 — Validate a BST

**Difficulty:** Easy–Medium
**Pattern:** Recursive with min/max bounds — propagate constraints down the tree
**Expected:** O(n) time · O(h) space

## Problem

Given the root of a binary tree, determine whether it is a valid **Binary Search Tree**.

A valid BST is defined as:
- The left subtree of a node contains only nodes with values **strictly less than** the node's value.
- The right subtree of a node contains only nodes with values **strictly greater than** the node's value.
- Both the left and right subtrees are also valid BSTs.

> **The famous trap:** checking only that `left.val < node.val < right.val` for each node is **not enough**. You must ensure the entire left subtree is less than the node and the entire right subtree is greater.

## Examples

### Example 1 — Valid BST

```
Input:
        5
       / \
      3   8
     / \   \
    1   4   9

Output: true
```

Check globally: all of (1, 3, 4) < 5, and all of (8, 9) > 5. ✓

### Example 2 — Invalid BST (classic trap)

```
Input:
        5
       / \
      1   6
         / \
        3   7

Output: false
```

Node 3 is in the right subtree of 5, but 3 < 5. This violates the global BST rule even though node 6's local check (3 < 6 < 7) passes.

### Example 3 — Invalid BST (another trap)

```
Input:
        5
       / \
      4   6
     /
    7

Output: false

7 is in the left subtree of 5, but 7 > 5. Invalid.
```

### Example 4

```
Input:    2
         / \
        1   3

Output: true
```

## Constraints

- The number of nodes in the tree is in the range `[1, 10^4]`.
- `-2^31 <= Node.val <= 2^31 - 1`

## Hints

<details>
<summary>Hint 1 — why local checks aren't enough</summary>

Looking at just `left.val < node.val < right.val` misses the "global constraint." A node deep in the left subtree might be larger than the root — and you'd never catch it by only checking immediate parent-child pairs.

Example 2 above demonstrates this: 3 < 6 locally, but 3 < 5 globally (and 3 is in 5's RIGHT subtree, violating the rule).
</details>

<details>
<summary>Hint 2 — the correct approach: pass valid ranges</summary>

Give each node a valid range `(min, max)`. The node's value must be strictly inside that range.

- The root's range is `(-Infinity, +Infinity)`.
- When you go **left**, the current node's value becomes the new **max** (everything left must be < current).
- When you go **right**, the current node's value becomes the new **min** (everything right must be > current).

```js
function isValidBST(root, min = -Infinity, max = Infinity) {
  if (root === null) return true;
  if (root.val <= min || root.val >= max) return false;
  return isValidBST(root.left,  min,       root.val)
      && isValidBST(root.right, root.val,  max);
}
```
</details>

<details>
<summary>Hint 3 — alternative: inorder check</summary>

Inorder traversal of a valid BST always produces strictly increasing values. So: do inorder traversal and check that each visited value is strictly greater than the previous one.

```js
function isValidBST(root) {
  let prev = -Infinity;
  function inorder(node) {
    if (!node) return true;
    if (!inorder(node.left)) return false;
    if (node.val <= prev)    return false;
    prev = node.val;
    return inorder(node.right);
  }
  return inorder(root);
}
```
</details>

## Write your solution
→ [`../solutions/07-validate-bst.js`](../solutions/07-validate-bst.js)

## Follow-ups

- What if duplicate values are allowed (using `<=` instead of `<`)? How does the validation change?
- Can you do this iteratively using an inorder traversal with a stack?
- What's the minimum number of nodes you need to construct an invalid BST that would fool the naive (local-only) check?
