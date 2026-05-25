# Q14 — Inorder Successor and Predecessor in a BST

**Difficulty:** Medium
**Pattern:** BST walk — track candidate nodes as you descend
**Expected:** O(log n) time average · O(1) space (iterative)

## Problem

Given the root of a BST and a value `val`, find:

1. **`successor(val)`** — the smallest value in the BST that is **strictly greater** than `val`. Return `null` if none exists.
2. **`predecessor(val)`** — the largest value in the BST that is **strictly less** than `val`. Return `null` if none exists.

You may assume `val` exists in the BST.

## Examples

### Example 1 — successor

```
Tree:
        20
       /  \
      8    22
     / \
    4   12
       /  \
      10   14

successor(8)    → 10
successor(14)   → 20
successor(22)   → null   (22 is the max, no successor)
successor(10)   → 12
```

### Example 2 — predecessor

```
Same tree.

predecessor(12)  → 10
predecessor(8)   → 4
predecessor(4)   → null  (4 is not the min in this tree, but depends on BST)
predecessor(20)  → 14
```

Wait — let's check `predecessor(4)` more carefully. The tree above has 4 as the leftmost node in 8's left subtree. Values less than 4 would be in the range (-∞, 4). There are no nodes in that range, so `predecessor(4)` → `null`.

## Constraints

- The tree has at least 1 node.
- `val` exists in the BST.
- All node values are unique.

## Hints

<details>
<summary>Hint 1 — successor: two cases</summary>

**Case A:** The target node has a **right subtree**. The successor is the leftmost node in that right subtree (the minimum of the right subtree).

**Case B:** The target node has **no right subtree**. Walk down from the root. Every time you go **left** (because target < current), record the current node as a potential successor. The last such recorded node is the successor.

Why? When you go left, the current node is larger than your target. As you go deeper, you might find something even closer. The last node you "turned left at" is the deepest ancestor that's still larger than the target.
</details>

<details>
<summary>Hint 2 — successor implementation</summary>

```js
function successor(root, val) {
  let result = null;
  let curr = root;
  while (curr !== null) {
    if (val < curr.val) {
      result = curr;       // curr is a candidate (it's > val)
      curr = curr.left;    // go left to look for something closer
    } else {
      curr = curr.right;   // val >= curr.val, successor must be to the right
    }
  }
  return result ? result.val : null;
}
```

Note: when `val === curr.val`, we go right to find the min of the right subtree (if it exists), which will eventually become `result` when we turn left there. This naturally covers Case A.
</details>

<details>
<summary>Hint 3 — predecessor implementation</summary>

Mirror of successor: turn right → record candidate, turn left → move right.

```js
function predecessor(root, val) {
  let result = null;
  let curr = root;
  while (curr !== null) {
    if (val > curr.val) {
      result = curr;       // curr is a candidate (it's < val)
      curr = curr.right;   // go right to look for something closer
    } else {
      curr = curr.left;    // val <= curr.val, predecessor must be to the left
    }
  }
  return result ? result.val : null;
}
```
</details>

## Write your solution
→ [`../solutions/14-successor-predecessor-bst.js`](../solutions/14-successor-predecessor-bst.js)

## Follow-ups

- How do successor/predecessor relate to the deletion algorithm in Q10?
- If nodes had parent pointers, how would you find the successor? (Go to the right subtree if it exists, otherwise walk up until you find the first left-turn.)
- Write a function that returns the successor and predecessor simultaneously in one pass.
