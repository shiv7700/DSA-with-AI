# Q10 — Delete a Node in BST

**Difficulty:** Medium
**Pattern:** BST delete — three cases (leaf / one child / two children + inorder successor)
**Expected:** O(log n) time average · O(log n) space

## Problem

Given the root of a Binary Search Tree and an integer `key`, delete the node with value `key` from the BST and return the updated root.

If `key` is not in the BST, return the root unchanged.

The deletion must maintain the BST property.

> **Why this is Medium:** insertion just adds a leaf. Deletion has to deal with restructuring when the deleted node has children — especially the two-children case, which requires the inorder-successor trick.

## Examples

### Example 1 — delete a leaf

```
Input:  root = [5, 3, 6, 2, 4, null, 7],  key = 3

Before:             After:
     5                   5
    / \                 / \
   3   6               4   6
  / \   \             /     \
 2   4   7           2       7
```

3 has two children. Its inorder successor is 4.
Replace 3 with 4, then delete 4 from its original position.

### Example 2 — delete a leaf

```
Input:  root = [5, 3, 6, 2, 4, null, 7],  key = 2

Before:          After:
     5                5
    / \              / \
   3   6            3   6
  / \   \            \   \
 2   4   7            4   7
```

2 is a leaf. Remove it directly.

### Example 3 — key not present

```
Input:  root = [5, 3, 6, 2, 4, null, 7],  key = 0

Output: root unchanged (0 not found)
```

## Constraints

- The number of nodes is in the range `[0, 10^4]`.
- `-10^5 <= Node.val, key <= 10^5`
- All node values are unique.

## Hints

<details>
<summary>Hint 1 — find the node first</summary>

Use the same left/right walk as search. Once you find the node to delete, handle one of three cases.
</details>

<details>
<summary>Hint 2 — three cases</summary>

**Case 1 — no children (leaf):** return `null` to the parent.

**Case 2 — one child:** return the surviving child to the parent.

**Case 3 — two children:**
1. Find the inorder successor: the leftmost node in the right subtree.
2. Copy its value into the node you want to delete.
3. Recursively delete the inorder successor from the right subtree.

The inorder successor has at most one child (no left child, since it's the leftmost), so step 3 always falls into Case 1 or 2.
</details>

<details>
<summary>Hint 3 — recursive template</summary>

```js
function deleteNode(root, key) {
  if (root === null) return null;
  if (key < root.val) {
    root.left  = deleteNode(root.left,  key);
  } else if (key > root.val) {
    root.right = deleteNode(root.right, key);
  } else {
    // Found the node to delete
    if (!root.left)  return root.right;  // Case 1 or 2
    if (!root.right) return root.left;   // Case 2
    // Case 3: find inorder successor (min of right subtree)
    let successor = root.right;
    while (successor.left) successor = successor.left;
    root.val   = successor.val;
    root.right = deleteNode(root.right, successor.val);
  }
  return root;
}
```
</details>

## Write your solution
→ [`../solutions/10-delete-node-bst.js`](../solutions/10-delete-node-bst.js)

## Follow-ups

- Instead of the inorder successor, use the inorder **predecessor** (max of left subtree). Verify you still get a valid BST.
- What is the time complexity if the tree is completely unbalanced?
- Can you delete a node from a BST **without recursion**? (Use an iterative approach with a parent pointer.)
