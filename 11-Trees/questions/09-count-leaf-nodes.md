# Q9 — Count Leaf Nodes

**Difficulty:** Easy
**Pattern:** DFS recursion
**Expected:** O(n) time · O(h) space

## Problem

Given the `root` of a binary tree, return the **number of leaf nodes** — nodes that have no children (both `left` and `right` are `null`).

## Examples

### Example 1

```
Tree:        1
           /   \
          2     3
         / \
        4   5

Serialized: [1, 2, 3, 4, 5]
```

```
Input:  root = [1, 2, 3, 4, 5]
Output: 3
```

Leaves: 4, 5, 3.

### Example 2

```
Tree:    1
          \
           2
            \
             3
```

```
Input:  root = [1, null, 2, null, 3]
Output: 1
```

Only leaf: 3.

### Example 3

```
Input:  root = []
Output: 0
```

## Constraints

- The number of nodes is in the range `[0, 10^4]`.
- `-100 <= Node.val <= 100`

## Hints

<details>
<summary>Hint 1 — how do you detect a leaf?</summary>

A leaf has no left child AND no right child: `root.left === null && root.right === null`.

Your function should: check null (return 0), check if it's a leaf (return 1), otherwise recurse on both children and add the counts.
</details>

<details>
<summary>Hint 2 — the structure</summary>

```js
function countLeaves(root) {
  if (root === null) return 0;
  if (root.left === null && root.right === null) return 1;   // it's a leaf
  return countLeaves(root.left) + countLeaves(root.right);
}
```
</details>

## Write your solution

→ [`../solutions/09-count-leaf-nodes.js`](../solutions/09-count-leaf-nodes.js)

## Follow-ups

- Count nodes with **exactly one child** instead.
- Find the **sum of all leaf node values**.
- Find the **deepest leaf** (or all deepest leaves — see Q37).
