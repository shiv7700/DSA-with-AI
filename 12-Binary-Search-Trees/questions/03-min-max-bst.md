# Q3 — Find Min and Max in a BST

**Difficulty:** Easy
**Pattern:** BST property — leftmost = min, rightmost = max
**Expected:** O(h) time · O(1) space  (h = height = O(log n) for balanced)

## Problem

You are given the root of a Binary Search Tree. Write two functions:

1. `findMin(root)` — returns the **minimum** value in the BST.
2. `findMax(root)` — returns the **maximum** value in the BST.

Assume the BST is non-empty.

## Examples

### Example 1

```
Tree:
        10
       /  \
      5    15
     / \  /  \
    3   7 12  20

findMin(root)   →   3
findMax(root)   →   20
```

Trace for `findMin`: 10 → 5 → 3. Node 3 has no left child. Return 3.
Trace for `findMax`: 10 → 15 → 20. Node 20 has no right child. Return 20.

### Example 2

```
Tree:
    5
     \
      10
       \
        20

findMin(root)   →   5   (the root — no left children anywhere)
findMax(root)   →   20  (the rightmost leaf)
```

### Example 3 (single node)

```
Tree:  42

findMin(root)   →   42
findMax(root)   →   42
```

## Constraints

- The tree has at least 1 node.
- Node values are integers that may be negative.
- Do not use any sorting or traversal of all nodes — use the BST property directly.

## Hints

<details>
<summary>Hint 1 — where does the minimum live?</summary>

In a BST, every left child is smaller than its parent. So the smallest value is the one you reach by going left as far as possible. When you can't go left anymore, you've found it.
</details>

<details>
<summary>Hint 2 — iterative templates</summary>

```js
function findMin(root) {
  let curr = root;
  while (curr.left !== null) curr = curr.left;
  return curr.val;
}

function findMax(root) {
  let curr = root;
  while (curr.right !== null) curr = curr.right;
  return curr.val;
}
```
</details>

<details>
<summary>Hint 3 — what about returning the node itself?</summary>

Many BST operations (like delete) need the node, not just the value. You may want to write a helper `_findMinNode(node)` that returns the node object. Then `findMin(root)` calls `_findMinNode(root).val`.
</details>

## Write your solution
→ [`../solutions/03-min-max-bst.js`](../solutions/03-min-max-bst.js)

## Follow-ups

- What is the minimum value in an **empty** BST? Handle that edge case.
- Could the minimum ever be the root? Give an example.
- Could the minimum ever be a non-leaf node? Give an example.
- If you delete the minimum, what happens? (Think about which of the three deletion cases applies.)
