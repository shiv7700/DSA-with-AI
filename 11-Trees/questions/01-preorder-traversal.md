# Q1 — Preorder Traversal

**Difficulty:** Easy
**Pattern:** DFS · Recursive and Iterative
**Expected:** O(n) time · O(h) space (h = height of tree)

## Problem

Given the `root` of a binary tree, return the **preorder traversal** of its nodes' values as an array.

Preorder means: visit the **root first**, then recursively traverse the **left subtree**, then the **right subtree**.

> **Why preorder?** It's the traversal order that "creates" a tree — you encounter the root before its children, which mirrors how you'd copy or serialize a tree. It's also one of the three must-know DFS traversals every tree question builds on.

## Examples

### Example 1

```
Tree:        1
           /   \
          2     3
         / \
        4   5

Serialized: [1, 2, 4, 5, 3]
```

```
Input:  root = [1, 2, 3, 4, 5]
Output: [1, 2, 4, 5, 3]
```

Walkthrough: Visit 1 → go left, visit 2 → go left, visit 4 (leaf) → go right, visit 5 (leaf) → back to 1, go right, visit 3 (leaf).

### Example 2

```
Tree:    1
          \
           2
            \
             3

Serialized: [1, null, 2, null, 3]
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

- The number of nodes is in the range `[0, 100]`.
- `-100 <= Node.val <= 100`
- Solve it **both** recursively and iteratively.

## Hints

<details>
<summary>Hint 1 — what does "preorder" mean at every single node?</summary>

At each node, the instruction is the same three steps:
1. Add the node's value to the result.
2. Go visit the left subtree (same three steps, but starting from `root.left`).
3. Go visit the right subtree (same three steps, but starting from `root.right`).

What happens when you reach `null`? That's your base case — there's nothing to visit, just return.
</details>

<details>
<summary>Hint 2 — writing the recursive solution</summary>

```js
function preorder(root, result = []) {
  if (root === null) return result;
  result.push(root.val);       // ROOT first
  preorder(root.left, result);
  preorder(root.right, result);
  return result;
}
```

Trace through Example 1 by hand before moving to iterative.
</details>

<details>
<summary>Hint 3 — iterative solution (uses a stack)</summary>

The recursive call stack is an implicit stack. For the iterative version, you manage a stack yourself.

Key idea: push the **right child before the left child** onto the stack. That way, the left child is popped first (LIFO).

```
Stack starts: [root]
Pop root → push right, push left.
Pop left's top → push its right, push its left.
...
```

If you get stuck, think: "what would the call stack look like at each step of the recursive version?"
</details>

## Write your solution

→ [`../solutions/01-preorder-traversal.js`](../solutions/01-preorder-traversal.js)

## Follow-ups

- Can you solve it without any extra array for the result — using a generator function that `yield`s values one at a time?
- What changes if the tree is N-ary (each node can have more than 2 children)?
- Compare your iterative version to Q7 (Morris Traversal) — Morris does it in O(1) space.
