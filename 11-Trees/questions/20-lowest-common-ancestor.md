# Q20 — Lowest Common Ancestor

**Difficulty:** Medium
**Pattern:** DFS recursion · LCA
**Expected:** O(n) time · O(h) space

## Problem

Given a binary tree and two nodes `p` and `q`, find their **Lowest Common Ancestor (LCA)**.

The LCA of two nodes is the deepest node in the tree that is an ancestor of both `p` and `q`. A node is considered an ancestor of itself.

## Examples

### Example 1

```
Tree:          3
             /   \
            5     1
           / \   / \
          6   2 0   8
             / \
            7   4

Serialized: [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]
```

```
Input:  root = [3,5,1,6,2,0,8,null,null,7,4],  p = 5,  q = 1
Output: 3
```

Node 3 is the deepest ancestor of both 5 and 1.

### Example 2 (using the same tree)

```
Input:  p = 5,  q = 4
Output: 5
```

5 is an ancestor of 4, and it's the deepest one. So the LCA is 5 itself.

### Example 3

```
Input:  p = 6,  q = 7
Output: 5
```

Both 6 and 7 live under 5. 5 is their LCA.

## Constraints

- The number of nodes is in the range `[2, 10^5]`.
- `-10^9 <= Node.val <= 10^9`
- All node values are unique.
- Both `p` and `q` exist in the tree.

## Hints

<details>
<summary>Hint 1 — the key observation</summary>

As you recurse through the tree, at each node ask: "can I find `p` or `q` in my subtree?"

If you can find `p` on the left AND `q` on the right (or vice versa), then the **current node is the LCA** — it's the first node where they split.

If you find both on the same side, the LCA is deeper.
</details>

<details>
<summary>Hint 2 — the recursive logic</summary>

Your function returns the LCA if it's in this subtree, or `null` if neither `p` nor `q` is here.

```js
function lowestCommonAncestor(root, p, q) {
  if (root === null) return null;
  if (root === p || root === q) return root;   // found one of them

  const left  = lowestCommonAncestor(root.left,  p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left !== null && right !== null) return root;  // p and q split here
  return left !== null ? left : right;               // one side has both
}
```
</details>

<details>
<summary>Hint 3 — tracing through Example 1 (p=5, q=1)</summary>

```
LCA(3, 5, 1):
  LCA(5, 5, 1) → root===p → return 5 (found p)
  left = 5 (non-null)
  LCA(1, 5, 1) → root===q → return 1 (found q)
  right = 1 (non-null)
  Both sides non-null → return root = 3 ✓
```
</details>

## Write your solution

→ [`../solutions/20-lowest-common-ancestor.js`](../solutions/20-lowest-common-ancestor.js)

## Follow-ups

- **LCA in a BST** — you can use the BST ordering property to navigate directly (no full scan needed). If both `p` and `q` are less than root, go left. If both are greater, go right. Otherwise, the current node is the LCA. O(h) time, O(1) space.
- **LCA of deepest leaves** (Q37) — a different variant.
