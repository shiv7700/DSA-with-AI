# Q26 — All Possible Full BSTs

**Difficulty:** Medium
**Pattern:** Recursive enumeration — Catalan number structure
**Expected:** O(Catalan(n)) time and space  (grows as 4^n / n^1.5)

## Problem

Given an integer `n`, return a list of all structurally unique **full** Binary Search Trees that store values 1 through `n`.

A **full** BST is one where every node has either **0 or 2 children** (never exactly 1).

> Note: LeetCode's "All Possible Full BSTs" uses only odd numbers of nodes (since a full binary tree with n nodes has n = 2k + 1 for some k ≥ 0). Here we relax to all values of n.

## Examples

### Example 1

```
Input: n = 3

All BSTs with values {1, 2, 3}:

    2          (root = 2)
   / \
  1   3

Output: [root of the tree above]

Only one structurally unique full BST with 3 nodes and values 1..3.
```

### Example 2

```
Input: n = 1

Output: [TreeNode(1)]   (single node — trivially a full BST)
```

### Example 3

```
Input: n = 7

Output: 14 unique trees  (Catalan number C(3) = 14 for 7 nodes... actually 5 for n=4 nodes)
```

Actually for n=3 nodes: `C(1)` = 1 tree; for n=5 nodes: `C(2)` = 2 trees; for n=7: `C(3)` = 5 trees; and so on following Catalan numbers for odd-node full binary trees.

## Constraints

- `1 <= n <= 7`

## Hints

<details>
<summary>Hint 1 — enumerate all possible roots</summary>

For values 1 to n, try each value i as the root. Then:
- Values 1 to i-1 form the left subtree.
- Values i+1 to n form the right subtree.

Recursively generate all possible left subtrees and right subtrees, then combine every left-right pair with root i.
</details>

<details>
<summary>Hint 2 — recursive template</summary>

```js
function generateTrees(n) {
  function generate(lo, hi) {
    if (lo > hi) return [null];
    const trees = [];
    for (let i = lo; i <= hi; i++) {
      const lefts  = generate(lo,  i - 1);
      const rights = generate(i + 1, hi);
      for (const left of lefts) {
        for (const right of rights) {
          const root   = new TreeNode(i);
          root.left  = left;
          root.right = right;
          trees.push(root);
        }
      }
    }
    return trees;
  }
  return generate(1, n);
}
```
</details>

<details>
<summary>Hint 3 — how many trees are there?</summary>

The number of structurally unique BSTs with n nodes is the **nth Catalan number**: C(n) = (2n choose n) / (n + 1).

- n=1: 1 tree
- n=2: 2 trees
- n=3: 5 trees
- n=4: 14 trees
- n=5: 42 trees

This grows exponentially, which is why `n <= 7` in the constraints.
</details>

## Write your solution
→ [`../solutions/26-all-possible-full-bsts.js`](../solutions/26-all-possible-full-bsts.js)

## Follow-ups

- Q27 asks: **how many** unique BSTs are there for n nodes — just the count, not the actual trees. That's much cheaper to compute.
- Can you add memoization to avoid regenerating the same subtree structures?
