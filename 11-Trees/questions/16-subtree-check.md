# Q16 — Check if a Tree is a Subtree of Another

**Difficulty:** Easy
**Pattern:** DFS recursion · reuse isSameTree
**Expected:** O(m × n) time · O(m + n) space (m, n = tree sizes)

## Problem

Given the roots of two binary trees `root` and `subRoot`, return `true` if `subRoot` is a **subtree** of `root`.

A subtree of `root` is a tree that consists of a node in `root` and all its descendants. The tree `root` itself is also a subtree of itself.

## Examples

### Example 1

```
root:        3          subRoot:   4
           /   \                  / \
          4     5                1   2
         / \
        1   2

Input:  root = [3,4,5,1,2],  subRoot = [4,1,2]
Output: true
```

The subtree rooted at node 4 in `root` is identical to `subRoot`.

### Example 2

```
root:        3          subRoot:   4
           /   \                  / \
          4     5                1   2
         / \
        1   2
           /
          0

Input:  root = [3,4,5,1,2,null,null,null,null,0],  subRoot = [4,1,2]
Output: false
```

The node 4 in `root` has an extra node 0 — it doesn't exactly match `subRoot`.

## Constraints

- The number of nodes in `root` is in the range `[1, 2000]`.
- The number of nodes in `subRoot` is in the range `[1, 1000]`.
- `-10^4 <= Node.val <= 10^4`

## Hints

<details>
<summary>Hint 1 — reuse your isSameTree function from Q15</summary>

At each node of `root`, check: is the subtree rooted here identical to `subRoot`? If yes, return `true`. If not, check the left and right subtrees.

This is `isSameTree(root, subRoot) || isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot)`.
</details>

<details>
<summary>Hint 2 — base cases</summary>

- `subRoot === null`: an empty tree is a subtree of anything — return `true`.
- `root === null`: you've exhausted all nodes without a match — return `false`.
</details>

## Write your solution

→ [`../solutions/16-subtree-check.js`](../solutions/16-subtree-check.js)

## Follow-ups

- The O(m×n) solution visits every node of `root` and at each runs `isSameTree` in O(n). Can you do better? (Hint: serialization to string and substring match, or hashing subtrees.)
