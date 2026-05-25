# Q24 — Binary Tree Right Side View

**Difficulty:** Medium
**Pattern:** BFS · last node per level
**Expected:** O(n) time · O(n) space

## Problem

Given the `root` of a binary tree, imagine yourself standing on the **right side** of the tree. Return the values of the nodes you can see, ordered from top to bottom.

You see the **rightmost node at each level**.

## Examples

### Example 1

```
Tree:        1          ← you see 1
           /   \
          2     3       ← you see 3
           \
            5           ← you see 5

Serialized: [1, 2, 3, null, 5]
```

```
Input:  root = [1, 2, 3, null, 5]
Output: [1, 3, 5]
```

### Example 2

```
Tree:    1
          \
           3

Input:  root = [1, null, 3]
Output: [1, 3]
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
<summary>Hint 1 — level-order is the natural fit</summary>

After processing each level in BFS, the last node you processed is the rightmost one.

Take your Q4 solution and instead of pushing all nodes in a level to the result, push only the **last node of each level**.
</details>

<details>
<summary>Hint 2 — the change from Q4</summary>

```js
for (let i = 0; i < levelSize; i++) {
  const node = queue.shift();
  if (i === levelSize - 1) result.push(node.val);   // ← only last node
  if (node.left)  queue.push(node.left);
  if (node.right) queue.push(node.right);
}
```
</details>

<details>
<summary>Hint 3 — DFS alternative</summary>

You can also use DFS (preorder, right subtree first):

- Visit right child before left child.
- Track current depth. If `depth === result.length`, you're visiting this level for the first time (from the right) — add to result.

```js
function dfs(node, depth) {
  if (!node) return;
  if (depth === result.length) result.push(node.val);
  dfs(node.right, depth + 1);
  dfs(node.left,  depth + 1);
}
```
</details>

## Write your solution

→ [`../solutions/24-right-side-view.js`](../solutions/24-right-side-view.js)

## Follow-ups

- **Left side view**: same idea but take the first node of each level (or visit left child first in the DFS version).
- How would you return both the left and right side views simultaneously?
