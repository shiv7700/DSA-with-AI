# Q28 — Construct Binary Tree from Preorder & Inorder

**Difficulty:** Medium
**Pattern:** DFS · divide and conquer · hash map
**Expected:** O(n) time · O(n) space

## Problem

Given two integer arrays `preorder` and `inorder` where:
- `preorder` is the preorder traversal of a binary tree.
- `inorder` is the inorder traversal of the same tree.

Construct and return the binary tree.

(All values are unique.)

## Examples

### Example 1

```
preorder = [3, 9, 20, 15, 7]
inorder  = [9, 3, 15, 20, 7]
```

```
Output tree:
     3
    / \
   9  20
     /  \
    15   7
```

### Example 2

```
preorder = [1, 2]
inorder  = [2, 1]
```

```
Output tree:
  1
 /
2
```

### Example 3

```
preorder = [-1]
inorder  = [-1]
```

```
Output: single-node tree with value -1
```

## Constraints

- `1 <= preorder.length <= 3000`
- `inorder.length === preorder.length`
- `-3000 <= preorder[i] <= 3000`
- All values are **unique**.

## Hints

<details>
<summary>Hint 1 — preorder tells you the root; inorder tells you the split</summary>

The **first element** of `preorder` is always the root.

In `inorder`, find that root value. Everything to its LEFT in `inorder` is the left subtree; everything to its RIGHT is the right subtree.

Now you know the sizes of both subtrees, which lets you split `preorder` too (elements 1..leftSize for the left subtree, leftSize+1..end for the right).

Recurse on each half.
</details>

<details>
<summary>Hint 2 — use a hash map for O(1) inorder lookups</summary>

Naively, finding the root in `inorder` takes O(n) per call → O(n²) total.

Build a map `inorderIndex: value → index` once upfront. Then each lookup is O(1).
</details>

<details>
<summary>Hint 3 — the recursion with index bounds</summary>

Instead of slicing arrays (expensive), pass start/end indices:

```js
function build(preStart, inStart, inEnd) {
  if (inStart > inEnd) return null;
  const rootVal = preorder[preStart];
  const root = new TreeNode(rootVal);
  const mid = inorderIndex.get(rootVal);
  const leftSize = mid - inStart;
  root.left  = build(preStart + 1, inStart, mid - 1);
  root.right = build(preStart + 1 + leftSize, mid + 1, inEnd);
  return root;
}
```
</details>

## Write your solution

→ [`../solutions/28-construct-from-preorder-inorder.js`](../solutions/28-construct-from-preorder-inorder.js)

## Follow-ups

- **Q29**: construct from postorder + inorder (same idea, but the root is the LAST element of postorder).
- Can you construct a tree from preorder + postorder alone? (Only possible if the tree is full.)
