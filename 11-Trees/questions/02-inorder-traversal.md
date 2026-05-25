# Q2 — Inorder Traversal

**Difficulty:** Easy
**Pattern:** DFS · Recursive and Iterative
**Expected:** O(n) time · O(h) space (h = height of tree)

## Problem

Given the `root` of a binary tree, return the **inorder traversal** of its nodes' values as an array.

Inorder means: recursively traverse the **left subtree first**, then visit the **root**, then the **right subtree**.

> **Why inorder?** For a Binary Search Tree, inorder traversal produces a **sorted** sequence. It's also the traversal used for expression tree evaluation (infix notation). It's the trickiest of the three DFS traversals to write iteratively — a valuable interview test.

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
Output: [4, 2, 5, 1, 3]
```

Walkthrough: go all the way left to 4 (leaf, print) → back to 2 (print) → right to 5 (leaf, print) → back to 1 (print) → right to 3 (leaf, print).

### Example 2

```
Tree (BST):   4
             / \
            2   6
           / \ / \
          1  3 5  7
```

```
Input:  root = [4, 2, 6, 1, 3, 5, 7]
Output: [1, 2, 3, 4, 5, 6, 7]
```

Notice: the output is sorted! This is the defining property of inorder on a BST.

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
<summary>Hint 1 — understanding "inorder" intuitively</summary>

Imagine flattening the tree so that every node "drops" to a horizontal line. The inorder traversal is what you'd read left to right.

For this tree:
```
        4
       / \
      2   5
     / \
    1   3
```
Drop all nodes: `1  2  3  4  5` — that's inorder.

At each node, the rule: "don't print me yet, print my entire left subtree first, then print me, then print my entire right subtree."
</details>

<details>
<summary>Hint 2 — recursive solution</summary>

```js
function inorder(root, result = []) {
  if (root === null) return result;
  inorder(root.left, result);    // LEFT first
  result.push(root.val);         // then ROOT
  inorder(root.right, result);   // then RIGHT
  return result;
}
```

The only difference from preorder is that `result.push(root.val)` moved to the middle.
</details>

<details>
<summary>Hint 3 — iterative solution (the tricky part)</summary>

In the recursive version, you always go as far left as possible before printing anything. Mimic this with a stack:

1. Keep a pointer `curr = root`.
2. While `curr` is not null, push it onto the stack and move `curr = curr.left`.
3. When `curr` is null, pop from the stack, **print** the popped node, then set `curr = popped.right`.
4. Repeat until both `curr` is null AND the stack is empty.

The stack is essentially "remembering" nodes you've passed through on your way left that you haven't printed yet.
</details>

## Write your solution

→ [`../solutions/02-inorder-traversal.js`](../solutions/02-inorder-traversal.js)

## Follow-ups

- Using the iterative inorder, write a function that finds the **k-th smallest value** in a BST.
- Can you build an **inorder iterator** class with `hasNext()` and `next()` methods?
- What does inorder traversal look like on a tree that's not a BST? Does the "sorted order" property hold?
