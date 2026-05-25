# Q2 — Search for a Value in a BST

**Difficulty:** Easy
**Pattern:** BST walk — eliminate half the tree at each step
**Expected:** O(log n) time average · O(log n) space (recursion stack); O(1) iterative

## Problem

You are given the root of a Binary Search Tree and an integer `val`. Search the BST for a node with value `val`. Return the node if found, or `null` if not.

## Examples

### Example 1

```
Input:  val = 2

        4
       / \
      2   7
     / \
    1   3

Output: the node with value 2 (and its subtree)

          2
         / \
        1   3
```

### Example 2

```
Input:  val = 5

        4
       / \
      2   7
     / \
    1   3

Output: null   (5 is not in the tree)
```

### Example 3

```
Input:  val = 4  (the root itself)

        4
       / \
      2   7

Output: the root node (4)
```

## Constraints

- The number of nodes in the tree is in the range `[1, 5000]`.
- `1 <= Node.val <= 10^7`
- Each node value is unique.
- `1 <= val <= 10^7`

## Hints

<details>
<summary>Hint 1 — the BST property is your guide</summary>

At every node, you know **exactly** which direction to go:
- If `val < node.val`, the target (if it exists) must be in the **left** subtree.
- If `val > node.val`, it must be in the **right** subtree.
- If `val === node.val`, you found it.

You never need to search both sides. That's what makes BST search O(log n) instead of O(n).
</details>

<details>
<summary>Hint 2 — iterative version (preferred in interviews)</summary>

```js
function searchBST(root, val) {
  let curr = root;
  while (curr !== null) {
    if (val === curr.val) return curr;
    curr = val < curr.val ? curr.left : curr.right;
  }
  return null;
}
```

This uses O(1) space — no recursion stack — and is often cleaner to write under interview pressure.
</details>

## Write your solution
→ [`../solutions/02-search-in-bst.js`](../solutions/02-search-in-bst.js)

## Follow-ups

- Modify your solution to return `true`/`false` instead of the node.
- What is the worst-case number of comparisons to find a value in a BST of 1,000,000 perfectly balanced nodes? (Hint: log₂(1,000,000) ≈ 20.)
- What changes if the tree is not a BST — just a plain binary tree? (You'd need to check both subtrees: O(n).)
