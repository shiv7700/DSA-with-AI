# Q23 — Trim a BST

**Difficulty:** Medium
**Pattern:** BST pruning — recursive with range awareness
**Expected:** O(n) time · O(h) space

## Problem

Given the root of a BST and two integers `low` and `high`, trim the BST so that all node values are within the range `[low, high]`. Return the root of the trimmed tree.

You should trim the tree such that all resulting values are in `[low, high]`. Trimming should not change the relative structure of the elements — nodes that remain should maintain their original relationships.

## Examples

### Example 1

```
Input:  root = [1, 0, 2],  low = 1,  high = 2

Before:       After:
    1              1
   / \              \
  0   2              2

Node 0 is removed (0 < 1).
```

### Example 2

```
Input:  root = [3, 0, 4, null, 2, null, null, null, null, 1],
        low = 1,  high = 3

Before:               After:
    3                     3
   / \                   /
  0   4                 2
   \                   /
    2                 1
   /
  1

Nodes removed: 4 (> 3), 0 (< 1).
```

### Example 3

```
Input:  root = [1],  low = 1,  high = 2
Output: [1]  (single node, already in range)
```

## Constraints

- The number of nodes is in the range `[1, 10^4]`.
- `0 <= Node.val, low, high <= 10^4`
- `low <= high`
- All node values are unique.

## Hints

<details>
<summary>Hint 1 — what to do when a node is out of range</summary>

If `node.val < low`: everything in this node's left subtree is also < low (BST property). We can discard both the node and its entire left subtree. But the **right subtree** might contain valid nodes. Return `trim(node.right, low, high)`.

If `node.val > high`: symmetrically, discard this node and its right subtree. Return `trim(node.left, low, high)`.

If `low <= node.val <= high`: keep this node, but trim both its subtrees.
</details>

<details>
<summary>Hint 2 — recursive template</summary>

```js
function trimBST(root, low, high) {
  if (root === null) return null;
  if (root.val < low)  return trimBST(root.right, low, high);  // skip node + left
  if (root.val > high) return trimBST(root.left,  low, high);  // skip node + right
  root.left  = trimBST(root.left,  low, high);
  root.right = trimBST(root.right, low, high);
  return root;
}
```

The elegance here: when a node is out of range, we don't just delete it — we return whatever trimmed subtree takes its place.
</details>

## Write your solution
→ [`../solutions/23-trim-bst.js`](../solutions/23-trim-bst.js)

## Follow-ups

- What is the maximum number of nodes that can be removed in one trim operation?
- Can you do this iteratively? (It's much harder — the recursive solution is preferred.)
- How does trimming relate to range sum (Q8)? Both use the same "prune by BST property" idea.
