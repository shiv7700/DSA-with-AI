# Q25 — Construct BST from Preorder Traversal

**Difficulty:** Medium
**Pattern:** BST insertion or divide-and-conquer with upper bound
**Expected:** O(n) time (optimal) · O(n) space

## Problem

Given an array `preorder` which represents the preorder traversal of a BST, reconstruct the BST and return its root.

In a preorder traversal, each node is visited **before** its children: root → left subtree → right subtree.

You are **guaranteed** that the given array is a valid BST preorder sequence.

## Examples

### Example 1

```
Input:  preorder = [8, 5, 1, 7, 10, 12]

Reconstruction:
        8
       / \
      5   10
     / \    \
    1   7   12

Output: root of this tree
```

Verify: inorder of the resulting tree = [1, 5, 7, 8, 10, 12] ← sorted. ✓

### Example 2

```
Input:  preorder = [4, 2]

        4
       /
      2

Output: root
```

### Example 3 (single node)

```
Input:  preorder = [1]
Output: TreeNode(1)
```

## Constraints

- `1 <= preorder.length <= 100`
- `1 <= preorder[i] <= 10^8`
- All values are unique.
- The input is guaranteed to be a valid BST preorder sequence.

## Hints

<details>
<summary>Hint 1 — simplest approach: insert one by one</summary>

Just insert each value in the preorder array into a BST one at a time (Q1). The first element is the root. Each subsequent element gets inserted at the correct BST position.

This is O(n log n) average, O(n²) worst case.
</details>

<details>
<summary>Hint 2 — O(n) approach: pass an upper bound</summary>

Preorder means: first element is the root. Everything that follows and is less than the root belongs to the left subtree. The rest goes to the right.

Use a global index (pointing to the current element in `preorder`) and an `upperBound` (max allowed value for the current subtree):

```js
function bstFromPreorder(preorder) {
  let i = 0;
  function build(upperBound) {
    if (i === preorder.length || preorder[i] > upperBound) return null;
    const root = new TreeNode(preorder[i++]);
    root.left  = build(root.val);       // left subtree: all values < root.val
    root.right = build(upperBound);     // right subtree: values < upperBound
    return root;
  }
  return build(Infinity);
}
```

Each element is processed exactly once: O(n) total.
</details>

## Write your solution
→ [`../solutions/25-bst-from-preorder.js`](../solutions/25-bst-from-preorder.js)

## Follow-ups

- Can you reconstruct a BST from its **inorder** traversal alone? (No — inorder of a BST is just a sorted array, and infinitely many BSTs have the same sorted sequence.)
- Can you reconstruct a BST from its **postorder** traversal? (Yes — similar to preorder but process from right to left with a lower bound.)
- If you have both inorder and preorder, you can uniquely reconstruct a general binary tree. Does having only preorder uniquely determine the BST? (Yes! Because the BST property + preorder together uniquely determine the structure.)
