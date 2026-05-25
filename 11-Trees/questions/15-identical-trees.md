# Q15 — Check if Two Trees are Identical

**Difficulty:** Easy
**Pattern:** DFS recursion · simultaneous traversal
**Expected:** O(n) time · O(h) space

## Problem

Given the roots of two binary trees `p` and `q`, return `true` if they are **identical** — the same structure AND the same node values at every position.

## Examples

### Example 1

```
p:       1          q:       1
        / \                 / \
       2   3               2   3

Input:  p = [1,2,3],  q = [1,2,3]
Output: true
```

### Example 2

```
p:       1          q:       1
        / \                   \
       2   3                   2

Input:  p = [1,2],  q = [1,null,2]
Output: false
```

Different structure.

### Example 3

```
p:       1          q:       1
        / \                 / \
       2   1               1   2

Input:  p = [1,2,1],  q = [1,1,2]
Output: false
```

Same structure, different values.

## Constraints

- The number of nodes in both trees is in the range `[0, 1000]`.
- `-10^4 <= Node.val <= 10^4`

## Hints

<details>
<summary>Hint 1 — think about all the cases at each step</summary>

Recurse on `p` and `q` simultaneously. At each pair of nodes:

1. Both are null → `true` (the empty tree equals the empty tree).
2. One is null, the other isn't → `false` (different structure).
3. Both exist but `p.val !== q.val` → `false`.
4. Both exist, same value → check left subtrees AND right subtrees.
</details>

<details>
<summary>Hint 2 — the code</summary>

```js
function isSameTree(p, q) {
  if (p === null && q === null) return true;
  if (p === null || q === null) return false;
  if (p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
```

Short-circuit with `&&` — if left subtrees differ, no need to check right.
</details>

## Write your solution

→ [`../solutions/15-identical-trees.js`](../solutions/15-identical-trees.js)

## Follow-ups

- **Symmetric tree** (Q17) uses a very similar idea — check left against right.
- **Subtree check** (Q16) reuses `isSameTree` as a helper.
