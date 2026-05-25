# Q14 — Mirror / Invert a Binary Tree

**Difficulty:** Easy
**Pattern:** DFS recursion · postorder
**Expected:** O(n) time · O(h) space

## Problem

Given the `root` of a binary tree, **invert** it — mirror it left-to-right — and return the root.

Inverting means: for every node, swap its left and right children, recursively all the way down.

## Examples

### Example 1

```
Before:          After:
     4                4
   /   \            /   \
  2     7    →     7     2
 / \   / \        / \   / \
1   3 6   9      9   6 3   1
```

```
Input:  root = [4, 2, 7, 1, 3, 6, 9]
Output:        [4, 7, 2, 9, 6, 3, 1]
```

### Example 2

```
Before:    2         After:    2
          / \                 / \
         1   3               3   1
```

```
Input:  root = [2, 1, 3]
Output:        [2, 3, 1]
```

### Example 3

```
Input:  root = []
Output: []
```

## Constraints

- The number of nodes is in the range `[0, 100]`.
- `-100 <= Node.val <= 100`

## Hints

<details>
<summary>Hint 1 — think about what the recursive call should handle</summary>

If you could magically invert the left subtree and magically invert the right subtree, what would you do with the root?

You'd **swap** `root.left` and `root.right` — since both are now already inverted versions of the original subtrees.

That's the whole algorithm.
</details>

<details>
<summary>Hint 2 — order matters: postorder vs preorder</summary>

You can actually swap before or after recursing — both work here. Why?

- **Postorder** (recurse, then swap): invert the children, then swap them at the current node.
- **Preorder** (swap, then recurse): swap at the current node, then recurse into what are now the swapped children.

Both produce the same result. The simplest to write:

```js
function invertTree(root) {
  if (root === null) return null;
  [root.left, root.right] = [root.right, root.left];  // swap
  invertTree(root.left);
  invertTree(root.right);
  return root;
}
```
</details>

## Write your solution

→ [`../solutions/14-invert-binary-tree.js`](../solutions/14-invert-binary-tree.js)

## Follow-ups

- Write an iterative version using a queue (BFS).
- How would you invert only the nodes at even depths?
