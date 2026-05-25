# Q3 — Postorder Traversal

**Difficulty:** Easy
**Pattern:** DFS · Recursive and Iterative
**Expected:** O(n) time · O(h) space (h = height of tree)

## Problem

Given the `root` of a binary tree, return the **postorder traversal** of its nodes' values as an array.

Postorder means: recursively traverse the **left subtree**, then the **right subtree**, then **visit the root last**.

> **Why postorder?** It's the order used when you need children's results before computing the parent's. Deleting a tree (free children before parent), evaluating an expression tree, computing heights and sizes — all postorder. It's also the basis for many tree DP problems.

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
Output: [4, 5, 2, 3, 1]
```

Walkthrough: go left to 4 (leaf, print) → right to 5 (leaf, print) → back to 2 (print) → right to 3 (leaf, print) → back to 1 (print). Root is always last.

### Example 2

```
Tree:    1
        / \
       2   3
      /
     4
    /
   5
```

```
Input:  root = [1, 2, 3, 4, null, null, null, 5]
Output: [5, 4, 2, 3, 1]
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
<summary>Hint 1 — what's the rule at every node?</summary>

"Don't visit me until BOTH my children are fully done."

If you're thinking about deleting a tree: you'd delete the leaves first, then their parents, then their grandparents... all the way up to the root last. That's postorder.
</details>

<details>
<summary>Hint 2 — recursive solution (one line different from the others)</summary>

```js
function postorder(root, result = []) {
  if (root === null) return result;
  postorder(root.left, result);
  postorder(root.right, result);
  result.push(root.val);    // ROOT last
  return result;
}
```

Compare this to preorder (push first) and inorder (push in the middle). The only change is where you push.
</details>

<details>
<summary>Hint 3 — iterative trick (reverse of a modified preorder)</summary>

One elegant approach: postorder is almost the reverse of preorder-with-left-and-right-swapped.

Preorder (Root → Left → Right).
Modified preorder (Root → Right → Left) → reverse it → you get (Left → Right → Root) = Postorder!

So: do a preorder-like stack traversal but push left before right (so right is popped first), collect values with `unshift` (or push then reverse at the end).

```
stack = [root]
while stack not empty:
  node = stack.pop()
  result.unshift(node.val)     ← prepend, not append
  if node.left:  stack.push(node.left)
  if node.right: stack.push(node.right)
```
</details>

## Write your solution

→ [`../solutions/03-postorder-traversal.js`](../solutions/03-postorder-traversal.js)

## Follow-ups

- How would you use postorder to **evaluate** the expression tree below?
  ```
       *
      / \
     +   2
    / \
   3   1
  ```
  (Answer: 3+1=4, then 4*2=8.)
- What happens if you call postorder on a very deep, degenerate (linked-list-shaped) tree with n=100,000? How would you fix the recursive solution?
