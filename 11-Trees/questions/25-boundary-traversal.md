# Q25 — Boundary Traversal

**Difficulty:** Medium
**Pattern:** DFS · three separate passes
**Expected:** O(n) time · O(h) space

## Problem

Given the `root` of a binary tree, return the values of its **boundary nodes** in anti-clockwise order starting from the root.

The boundary consists of:
1. The **root** node.
2. The **left boundary** — leftmost nodes from root to the leftmost leaf (excluding the leaf).
3. All **leaf nodes** — from left to right.
4. The **right boundary** — rightmost nodes from root to the rightmost leaf (excluding the leaf), in **reverse** (bottom to top).

## Examples

### Example 1

```
Tree:              1
                 /   \
                2     3
               / \   / \
              4   5 6   7
                 / \
                8   9

Boundary (anti-clockwise): 1 → down-left → leaves → up-right
```

```
Input:  root = [1, 2, 3, 4, 5, 6, 7, null, null, 8, 9]
Output: [1, 2, 4, 8, 9, 6, 7, 3]
```

Left boundary: 2 (not 4 — 4 is a leaf, handled separately)
Leaves (left to right): 4, 8, 9, 6, 7
Right boundary (bottom-up, excluding leaves): 3

### Example 2

```
Tree:    1
```

```
Input:  root = [1]
Output: [1]
```

## Constraints

- The number of nodes is in the range `[1, 10^4]`.
- `-1000 <= Node.val <= 1000`

## Hints

<details>
<summary>Hint 1 — split into three sub-problems</summary>

1. Add root.
2. Add left boundary (top-down, excluding root and leaf).
3. Add all leaves (left to right via DFS).
4. Add right boundary (bottom-up, excluding root and leaf).

Each of these is a simple DFS/traversal. Combine them.
</details>

<details>
<summary>Hint 2 — left boundary traversal</summary>

Starting from `root.left`, keep going left (prefer left, fall back to right) and add nodes — stop before you reach a leaf.

```js
function addLeftBoundary(node, res) {
  while (node) {
    if (node.left || node.right) res.push(node.val);  // not a leaf
    node = node.left || node.right;
  }
}
```
</details>

<details>
<summary>Hint 3 — right boundary (reversed)</summary>

Same as left boundary but go right first (fall back to left), and collect in reverse:

```js
function addRightBoundary(node, res) {
  const temp = [];
  while (node) {
    if (node.left || node.right) temp.push(node.val);
    node = node.right || node.left;
  }
  for (let i = temp.length - 1; i >= 0; i--) res.push(temp[i]);
}
```
</details>

## Write your solution

→ [`../solutions/25-boundary-traversal.js`](../solutions/25-boundary-traversal.js)

## Follow-ups

- How would you handle a tree where the root itself is a leaf (single node)?
- How does this compare to Q27 (directional views)?
