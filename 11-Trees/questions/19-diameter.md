# Q19 — Diameter of a Binary Tree

**Difficulty:** Easy
**Pattern:** DFS · tree DP · global maximum
**Expected:** O(n) time · O(h) space

## Problem

Given the `root` of a binary tree, return the length of its **diameter** — the length of the longest path between any two nodes in the tree.

The path may or may not pass through the root. Length is measured in **number of edges**.

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

The longest path is `4→2→1→3` or `5→2→1→3` — both have 3 edges.

### Example 2

```
Tree:    1
        /
       2
```

```
Input:  root = [1, 2]
Output: 1
```

Only path is `2→1`, which has 1 edge.

### Example 3

```
Tree:        1
           /   \
          2     3
         /
        4
       /
      5
```

```
Input:  root = [1, 2, 3, 4, null, null, null, 5]
Output: 4
```

Longest path: `5→4→2→1→3` — 4 edges.

## Constraints

- The number of nodes is in the range `[1, 10^4]`.
- `-100 <= Node.val <= 100`

## Hints

<details>
<summary>Hint 1 — the key insight</summary>

For any node, the longest path that passes **through** it equals:
`(height of left subtree) + (height of right subtree)`

where height is measured in edges (so a null child has height -1, a leaf has height 0).

The global diameter is the maximum of this value over all nodes.
</details>

<details>
<summary>Hint 2 — use a closure for the global max</summary>

Your recursive function returns the **height** of the current subtree (useful for the parent to calculate the path through it). But you also need to track the best path found anywhere — use a variable in the outer function:

```js
function diameterOfBinaryTree(root) {
  let diameter = 0;

  function height(node) {
    if (node === null) return -1;
    const lh = height(node.left);
    const rh = height(node.right);
    diameter = Math.max(diameter, lh + rh + 2);  // path through this node
    return 1 + Math.max(lh, rh);                 // height for parent
  }

  height(root);
  return diameter;
}
```

Wait — why `lh + rh + 2`? If left height = 0 (leaf), there's 1 edge to the left. If right height = 0 (leaf), there's 1 edge to the right. Total = 2 edges. So edges through a node = (lh + 1) + (rh + 1) = lh + rh + 2. ✓
</details>

<details>
<summary>Hint 3 — trace through Example 1</summary>

```
height(4): lh=-1, rh=-1. diameter = max(0, -1+-1+2)=max(0,0)=0. return 0.
height(5): lh=-1, rh=-1. diameter = 0. return 0.
height(2): lh=0 (from 4), rh=0 (from 5). diameter = max(0, 0+0+2)=2. return 1.
height(3): lh=-1, rh=-1. diameter = 2. return 0.
height(1): lh=1 (from 2), rh=0 (from 3). diameter = max(2, 1+0+2)=3. return 2.

Final: 3 ✓
```
</details>

## Write your solution

→ [`../solutions/19-diameter.js`](../solutions/19-diameter.js)

## Follow-ups

- The same "global max with height helper" pattern solves Q41 (max path sum). Practice this pattern on diameter first.
- How would you return the **actual path** (not just its length)?
