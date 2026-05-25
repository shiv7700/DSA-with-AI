# Q11 — Minimum Depth

**Difficulty:** Easy
**Pattern:** DFS recursion · careful null handling
**Expected:** O(n) time · O(h) space

## Problem

Given the `root` of a binary tree, return the **minimum depth** — the number of nodes along the **shortest** path from the root down to the **nearest leaf** node.

> ⚠️ **Important:** the path must end at a **leaf** (a node with no children). A node with only one child is not a leaf.

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
Output: 2
```

Shortest path to a leaf: 3→9 (length 2). Node 9 is a leaf (no children).

### Example 2

```
Tree:    2
          \
           3
            \
             4
              \
               5
                \
                 6
```

```
Input:  root = [2, null, 3, null, 4, null, 5, null, 6]
Output: 5
```

There's only one path: 2→3→4→5→6. It has 5 nodes.

### Example 3

```
Input:  root = []
Output: 0
```

## Constraints

- The number of nodes is in the range `[0, 10^5]`.
- `-1000 <= Node.val <= 1000`

## Hints

<details>
<summary>Hint 1 — why is this trickier than max depth?</summary>

For max depth: `1 + max(left, right)` — and if a child is null, `maxDepth(null) = 0`, which is fine.

For min depth, naively writing `1 + min(left, right)` has a bug. Consider a node with only a right child. `left = null`, so `minDepth(null) = 0`. `min(0, rightDepth)` = 0. Then the result is 1 + 0 = 1, suggesting the current node is a leaf — but it's not!

You must treat null children differently for min depth.
</details>

<details>
<summary>Hint 2 — handling the three cases</summary>

At any node:
1. **Leaf** (no children): return 1. This is the actual base case.
2. **Only left child**: the right path doesn't exist, so minimum must go through the left. Return `1 + minDepth(root.left)`.
3. **Only right child**: similarly, return `1 + minDepth(root.right)`.
4. **Both children**: return `1 + Math.min(minDepth(root.left), minDepth(root.right))`.
</details>

<details>
<summary>Hint 3 — BFS is elegant here</summary>

BFS naturally finds the shortest path. Stop as soon as you dequeue a leaf node — you're guaranteed it's at the minimum depth.

```js
function minDepth(root) {
  if (!root) return 0;
  const queue = [[root, 1]];   // [node, depth]
  while (queue.length > 0) {
    const [node, depth] = queue.shift();
    if (!node.left && !node.right) return depth;  // first leaf!
    if (node.left)  queue.push([node.left,  depth + 1]);
    if (node.right) queue.push([node.right, depth + 1]);
  }
}
```
</details>

## Write your solution

→ [`../solutions/11-minimum-depth.js`](../solutions/11-minimum-depth.js)

## Follow-ups

- How does the BFS approach compare in time/space to the recursive approach for a very unbalanced tree?
- Can you solve it without a `[node, depth]` pair in the queue — by just counting levels like Q4?
