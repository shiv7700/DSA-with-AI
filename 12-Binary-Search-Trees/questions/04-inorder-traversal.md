# Q4 — Inorder Traversal (sorted output)

**Difficulty:** Easy
**Pattern:** Inorder traversal — left → node → right
**Expected:** O(n) time · O(n) space (output array + call stack)

## Problem

Given the root of a Binary Search Tree, return all its values in **ascending sorted order** by performing an inorder traversal.

Inorder traversal: visit the **left** subtree, then the **current node**, then the **right** subtree.

> **Why this matters:** inorder traversal is the single most-used BST operation. It comes up directly (return sorted order) and indirectly (kth smallest, validate, convert to sorted array). Master it here and every subsequent problem will feel easier.

## Examples

### Example 1

```
Input:
        4
       / \
      2   6
     / \ / \
    1  3 5  7

Output: [1, 2, 3, 4, 5, 6, 7]
```

Trace:
```
Go left from 4 → left from 2 → reach 1 (no left child)
  Visit 1. Go right → null.
Visit 2. Go right → reach 3 (no left child)
  Visit 3. Go right → null.
Visit 4. Go right → reach 6 → left → reach 5
  Visit 5. Go right → null.
Visit 6. Go right → reach 7.
  Visit 7.
Result: [1, 2, 3, 4, 5, 6, 7]  ✓ sorted!
```

### Example 2

```
Input:
    1
     \
      3
     /
    2

Output: [1, 2, 3]
```

### Example 3 (single node)

```
Input:   42
Output:  [42]
```

### Example 4 (empty tree)

```
Input:   null
Output:  []
```

## Constraints

- The number of nodes in the tree is in the range `[0, 100]`.
- `-100 <= Node.val <= 100`

## Hints

<details>
<summary>Hint 1 — the recursive version is three lines</summary>

```js
function inorderTraversal(root, result = []) {
  if (root === null) return result;
  inorderTraversal(root.left, result);    // left subtree first
  result.push(root.val);                  // then this node
  inorderTraversal(root.right, result);   // then right subtree
  return result;
}
```

Why does this produce sorted output? Because the BST rule says "everything left of me is smaller, everything right is larger." Inorder visits small things first, then you, then large things. That's sorting.
</details>

<details>
<summary>Hint 2 — the iterative version (using an explicit stack)</summary>

Sometimes interviewers specifically ask for an iterative solution. Here's the pattern:

```js
function inorderTraversal(root) {
  const result = [];
  const stack  = [];
  let curr = root;

  while (curr !== null || stack.length > 0) {
    // Walk all the way to the leftmost node
    while (curr !== null) {
      stack.push(curr);
      curr = curr.left;
    }
    // Pop and visit
    curr = stack.pop();
    result.push(curr.val);
    // Then explore the right subtree
    curr = curr.right;
  }

  return result;
}
```

The stack is simulating the recursion call stack explicitly.
</details>

## Write your solution
→ [`../solutions/04-inorder-traversal.js`](../solutions/04-inorder-traversal.js)

## Follow-ups

- Write preorder (root → left → right) and postorder (left → right → root) traversals. How do they compare to inorder for a BST?
- Write a "reverse inorder" traversal (right → node → left) that produces **descending** order.
- Use inorder traversal to check if a binary tree is a valid BST: compare each visited value to the previous one. If it's ever smaller or equal, it's not a BST.
