# Q7 — Morris Traversal (O(1) Space Inorder)

**Difficulty:** Hard
**Pattern:** Tree threading · O(1) space
**Expected:** O(n) time · O(1) space

## Problem

Implement an **inorder traversal** of a binary tree using **O(1) extra space** — no recursion and no explicit stack. You may temporarily modify the tree structure during traversal, but must restore it before returning.

This technique is called **Morris Traversal**.

> **Why it matters:** A standard iterative inorder traversal uses O(h) space for the stack (O(n) in the worst case). Morris Traversal achieves the same inorder output using only two pointers, by threading the tree.

## Examples

### Example 1

```
Tree:        4
           /   \
          2     6
         / \   / \
        1   3 5   7
```

```
Input:  root = [4, 2, 6, 1, 3, 5, 7]
Output: [1, 2, 3, 4, 5, 6, 7]
```

Same result as standard inorder — the only difference is how we get there.

### Example 2

```
Tree:    1
          \
           2
            \
             3
```

```
Input:  root = [1, null, 2, null, 3]
Output: [1, 2, 3]
```

### Example 3

```
Input:  root = []
Output: []
```

## Constraints

- The number of nodes is in the range `[0, 5000]`.
- `-5000 <= Node.val <= 5000`
- You may **not** use the call stack (no recursion) and **no auxiliary data structure** (no stack or queue).

## Hints

<details>
<summary>Hint 1 — the core insight: threading</summary>

In the recursive inorder, after processing the left subtree of node `X`, you "return" to node `X` via the call stack. Morris avoids the stack by creating a **temporary link**: before going left, find the **inorder predecessor** of `X` (the rightmost node of its left subtree), and make its `right` pointer point back to `X`.

This "thread" is how you navigate back to `X` after finishing the left subtree.
</details>

<details>
<summary>Hint 2 — the algorithm in steps</summary>

Start with `curr = root`.

While `curr` is not null:
1. If `curr.left` is null: **visit** `curr`, then move `curr = curr.right`.
2. If `curr.left` is not null:
   - Find the **inorder predecessor** of `curr` (the rightmost node of `curr.left` subtree — but stop if you hit a back-thread pointing to `curr`).
   - If predecessor's `right` is null: set `predecessor.right = curr` (create thread), then `curr = curr.left`.
   - If predecessor's `right` is `curr` (thread already exists): remove the thread (`predecessor.right = null`), **visit** `curr`, then `curr = curr.right`.
</details>

<details>
<summary>Hint 3 — tracing through a small example</summary>

```
     2
    / \
   1   3
```

`curr = 2`. Left exists. Find predecessor (rightmost of left = 1). 1.right is null → set 1.right = 2. Move `curr = 1`.
`curr = 1`. Left is null → visit 1. Move `curr = 1.right = 2` (the thread!).
`curr = 2`. Left exists. Find predecessor (1). 1.right is 2 (thread exists) → remove thread (1.right = null). Visit 2. Move `curr = 2.right = 3`.
`curr = 3`. Left is null → visit 3. Move `curr = 3.right = null`. Done.

Output: `[1, 2, 3]` ✓
</details>

## Write your solution

→ [`../solutions/07-morris-traversal.js`](../solutions/07-morris-traversal.js)

## Follow-ups

- Can you modify Morris Traversal to do **preorder** instead of inorder?
- How would you adapt this technique to **convert a BST to a sorted doubly linked list** in place?
