# Q13 — Maximum Value in a Binary Tree

**Difficulty:** Easy
**Pattern:** DFS recursion
**Expected:** O(n) time · O(h) space

## Problem

Given the `root` of a **binary tree** (not necessarily a BST), find the **maximum value** among all nodes.

> Note: unlike a BST where you can navigate directly to the max, in a plain binary tree you must visit every node.

## Examples

### Example 1

```
Tree:        1
           /   \
          2     3
         / \
        4   5
```

```
Input:  root = [1, 2, 3, 4, 5]
Output: 5
```

### Example 2

```
Tree:    -1
        /   \
      -5    -2
```

```
Input:  root = [-1, -5, -2]
Output: -1
```

All values are negative — the max is -1 (the root).

### Example 3

```
Input:  root = []
Output: -Infinity  (or null — document your choice)
```

## Constraints

- The number of nodes is in the range `[1, 10^4]`.
- `-10^4 <= Node.val <= 10^4`

## Hints

<details>
<summary>Hint 1 — the pattern</summary>

```
max(null) = -Infinity
max(root) = Math.max(root.val, max(root.left), max(root.right))
```

Use `-Infinity` as the base case so any real node value beats it.
</details>

## Write your solution

→ [`../solutions/13-maximum-value.js`](../solutions/13-maximum-value.js)

## Follow-ups

- Find the **minimum value** instead.
- Find the **second largest value** in the tree.
