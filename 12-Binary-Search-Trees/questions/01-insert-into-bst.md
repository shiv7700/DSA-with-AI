# Q1 — Insert a Value into a BST

**Difficulty:** Easy
**Pattern:** BST walk — left if smaller, right if larger
**Expected:** O(log n) time average · O(log n) space (recursion stack)

## Problem

You are given the root of a Binary Search Tree and an integer `val`. Insert `val` into the BST and return the root of the modified tree.

Rules:
- Duplicate values will not be given (all values in the tree are unique).
- You may insert the new node at any valid position — there may be multiple valid resulting trees. Any one is acceptable.

> **Why this matters:** insertion is the most fundamental BST operation. Once you nail it, deletion and search feel natural because they use the same left/right decision logic.

## Examples

### Example 1

```
Input:  root = [4, 2, 7, 1, 3],  val = 5

Tree before insert:
        4
       / \
      2   7
     / \
    1   3

Tree after inserting 5:
        4
       / \
      2   7
     / \ /
    1  3 5

Output: root of the modified tree
```

### Example 2

```
Input:  root = [40, 20, 60, 10, 30, 50, 70],  val = 25

Tree before:
           40
          /  \
        20    60
       /  \  /  \
      10  30 50  70

After inserting 25:
           40
          /  \
        20    60
       /  \  /  \
      10  30 50  70
         /
        25

Output: root of the modified tree
```

### Example 3 (empty tree)

```
Input:  root = null,  val = 5
Output: TreeNode(5)   ← 5 becomes the root
```

## Constraints

- The number of nodes in the tree is in the range `[0, 10^4]`.
- `-10^8 <= Node.val, val <= 10^8`
- All existing values are unique, and `val` is not already in the tree.

## Hints

<details>
<summary>Hint 1 — think about where the new node must land</summary>

The new node is always inserted as a **leaf**. You never restructure existing nodes — you just walk down to find the right empty (`null`) slot and place it there.
</details>

<details>
<summary>Hint 2 — the decision at each node</summary>

At any node `curr`:
- If `val < curr.val`, the new node belongs somewhere in the **left** subtree.
- If `val > curr.val`, the new node belongs somewhere in the **right** subtree.
- If you've reached `null`, you've found the exact spot — create and return the new node.
</details>

<details>
<summary>Hint 3 — recursive structure</summary>

```js
function insertIntoBST(root, val) {
  if (root === null) return new TreeNode(val);
  if (val < root.val) root.left  = insertIntoBST(root.left,  val);
  else                root.right = insertIntoBST(root.right, val);
  return root;
}
```

Read this as: "If the tree is empty, the new node IS the tree. Otherwise, delegate to the correct subtree and reconnect."
</details>

## Write your solution
→ [`../solutions/01-insert-into-bst.js`](../solutions/01-insert-into-bst.js)

## Follow-ups

- Write an iterative version that uses no recursion (avoid the call stack).
- What happens if you call insert with a value that already exists? Modify your solution to handle duplicates gracefully (e.g., always go left on equal).
- If you insert `n` values one by one into an empty BST in random order, what's the expected height of the resulting tree?
