# Q17 — Check if a Tree is Symmetric

**Difficulty:** Easy
**Pattern:** DFS recursion · mirror comparison
**Expected:** O(n) time · O(h) space

## Problem

Given the `root` of a binary tree, return `true` if the tree is a **mirror of itself** (symmetric around its center).

A tree is symmetric if the left subtree is a mirror reflection of the right subtree.

## Examples

### Example 1

```
Tree:        1
           /   \
          2     2
         / \   / \
        3   4 4   3

Input:  root = [1, 2, 2, 3, 4, 4, 3]
Output: true
```

Left side (2, 3, 4) mirrors right side (2, 4, 3) when flipped.

### Example 2

```
Tree:        1
           /   \
          2     2
           \     \
            3     3

Input:  root = [1, 2, 2, null, 3, null, 3]
Output: false
```

The structure doesn't mirror — left 2 has a right child, right 2 also has a right child (should be left).

### Example 3

```
Input:  root = [1]
Output: true
```

A single node is always symmetric.

## Constraints

- The number of nodes is in the range `[1, 1000]`.
- `-100 <= Node.val <= 100`
- Solve it both **recursively** and **iteratively**.

## Hints

<details>
<summary>Hint 1 — think "mirror" not "identical"</summary>

Two trees are mirrors of each other if:
1. Their roots have the same value.
2. The left subtree of one is a mirror of the right subtree of the other.

So write a helper `isMirror(left, right)` and call it as `isMirror(root.left, root.right)`.
</details>

<details>
<summary>Hint 2 — isMirror cases</summary>

- Both null → `true` (empty mirrors empty)
- One null, one not → `false` (structure mismatch)
- Values differ → `false`
- Otherwise: `isMirror(left.left, right.right) && isMirror(left.right, right.left)`

Note the crossing: left's LEFT vs right's RIGHT, and left's RIGHT vs right's LEFT.
</details>

<details>
<summary>Hint 3 — iterative version with a queue</summary>

Use a queue. Enqueue pairs of nodes `(left, right)` that should be mirrors.

Each iteration: dequeue a pair. Check null/value conditions. Enqueue the next two mirror pairs: `(left.left, right.right)` and `(left.right, right.left)`.
</details>

## Write your solution

→ [`../solutions/17-symmetric-tree.js`](../solutions/17-symmetric-tree.js)

## Follow-ups

- How does this differ from the "identical trees" problem (Q15)?
- Can you solve it with a single recursive DFS function (no helper)?
