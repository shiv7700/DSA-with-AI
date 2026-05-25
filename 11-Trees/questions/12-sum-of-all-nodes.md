# Q12 — Sum of All Nodes

**Difficulty:** Easy
**Pattern:** DFS recursion · universal template
**Expected:** O(n) time · O(h) space

## Problem

Given the `root` of a binary tree, return the **sum of all node values** in the tree.

## Examples

### Example 1

```
Tree:        1
           /   \
          2     3
         / \   /
        4   5 6
```

```
Input:  root = [1, 2, 3, 4, 5, 6]
Output: 21
```

1 + 2 + 3 + 4 + 5 + 6 = 21.

### Example 2

```
Tree:    -1
        /   \
       2     3
```

```
Input:  root = [-1, 2, 3]
Output: 4
```

### Example 3

```
Input:  root = []
Output: 0
```

## Constraints

- The number of nodes is in the range `[0, 10^4]`.
- `-10^4 <= Node.val <= 10^4`

## Hints

<details>
<summary>Hint 1 — direct application of the template</summary>

```
sum(null) = 0
sum(root) = root.val + sum(root.left) + sum(root.right)
```
</details>

## Write your solution

→ [`../solutions/12-sum-of-all-nodes.js`](../solutions/12-sum-of-all-nodes.js)

## Follow-ups

- Return the **sum of nodes at a specific depth** only.
- Return the **sum of leaf nodes only**.
- Return the **sum of each level** as an array.
