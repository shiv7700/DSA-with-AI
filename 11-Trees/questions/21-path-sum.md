# Q21 — Path Sum

**Difficulty:** Medium
**Pattern:** DFS recursion · path tracking
**Expected:** O(n) time · O(h) space

## Problem

Given the `root` of a binary tree and an integer `targetSum`, return `true` if there exists a **root-to-leaf path** such that the sum of all nodes along the path equals `targetSum`.

A **leaf** is a node with no children.

## Examples

### Example 1

```
Tree:          5
             /   \
            4     8
           /     / \
          11    13   4
         /  \         \
        7    2         1

targetSum = 22
```

```
Input:  root = [5,4,8,11,null,13,4,7,2,null,null,null,1],  targetSum = 22
Output: true
```

Path: 5→4→11→2. Sum = 5+4+11+2 = 22. ✓

### Example 2

```
Tree:    1
        / \
       2   3

targetSum = 5
```

```
Input:  root = [1, 2, 3],  targetSum = 5
Output: false
```

Paths: 1→2 (sum 3) and 1→3 (sum 4). Neither equals 5.

### Example 3

```
Input:  root = [],  targetSum = 0
Output: false
```

## Constraints

- The number of nodes is in the range `[0, 5000]`.
- `-1000 <= Node.val <= 1000`
- `-1000 <= targetSum <= 1000`

## Hints

<details>
<summary>Hint 1 — subtract as you go down</summary>

Instead of accumulating the sum and comparing at the leaf, subtract the current node's value from `targetSum` as you recurse. At the leaf, check if the remaining value is 0.

`hasPathSum(root, targetSum)` = at a leaf: `root.val === targetSum`. Otherwise: `hasPathSum(left, targetSum - root.val) || hasPathSum(right, targetSum - root.val)`.
</details>

<details>
<summary>Hint 2 — the two base cases</summary>

1. `root === null` → `false` (you've gone off the tree without finding a valid path)
2. `root` is a leaf AND `root.val === targetSum` → `true` (you've found a valid path)

Don't check `root.val === targetSum` at non-leaf nodes — a valid path must end at a leaf.
</details>

<details>
<summary>Hint 3 — the code</summary>

```js
function hasPathSum(root, targetSum) {
  if (root === null) return false;
  if (!root.left && !root.right) return root.val === targetSum;  // leaf check
  const remaining = targetSum - root.val;
  return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);
}
```
</details>

## Write your solution

→ [`../solutions/21-path-sum.js`](../solutions/21-path-sum.js)

## Follow-ups

- **Path Sum II** (Q22): return all paths that sum to target, not just true/false.
- **Path Sum III** (Q23): count paths that don't have to start at the root.
