# Q10 — Height / Max Depth

**Difficulty:** Easy
**Pattern:** DFS recursion · postorder
**Expected:** O(n) time · O(h) space

## Problem

Given the `root` of a binary tree, return its **maximum depth** — the number of nodes along the longest path from the root down to a leaf.

(This is sometimes called the "height" of the tree. Here: max depth = number of nodes, so a single-node tree has max depth 1.)

## Examples

### Example 1

```
Tree:        3
           /   \
          9    20
              /  \
             15   7

Serialized: [3, 9, 20, null, null, 15, 7]
```

```
Input:  root = [3, 9, 20, null, null, 15, 7]
Output: 3
```

Longest path: 3→20→15 (or 3→20→7). 3 nodes.

### Example 2

```
Input:  root = [1, null, 2]
Output: 2
```

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
<summary>Hint 1 — think recursively</summary>

The max depth of a tree rooted at `root` is:
- 0 if the tree is empty.
- 1 + max(depth of left subtree, depth of right subtree) otherwise.

Why `1 +`? Because you're adding the root node itself to whatever the tallest subtree depth is.
</details>

<details>
<summary>Hint 2 — the solution</summary>

```js
function maxDepth(root) {
  if (root === null) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
```

Three lines. Trace through Example 1 to confirm.
</details>

<details>
<summary>Hint 3 — iterative approach with BFS</summary>

Level-order traversal (Q4) naturally gives you the depth: count the number of levels.

```js
function maxDepth(root) {
  if (!root) return 0;
  let depth = 0;
  const queue = [root];
  while (queue.length > 0) {
    depth++;
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (node.left)  queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return depth;
}
```
</details>

## Write your solution

→ [`../solutions/10-height-max-depth.js`](../solutions/10-height-max-depth.js)

## Follow-ups

- Find the **minimum depth** (see Q11) — it's slightly trickier because of how null children are handled.
- How does this solution change if the question asks for edge-count height instead of node-count depth?
