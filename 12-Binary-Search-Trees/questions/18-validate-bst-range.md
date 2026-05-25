# Q18 — Validate BST (with range check)

**Difficulty:** Medium
**Pattern:** Recursive with strict min/max bounds
**Expected:** O(n) time · O(h) space

## Problem

Given the root of a binary tree, determine if it is a valid BST.

This is the same as Q7, but now you must handle integer edge cases correctly — in particular, node values that equal `Integer.MIN_VALUE` or `Integer.MAX_VALUE`.

A valid BST satisfies:
- The left subtree of every node contains only values **strictly less than** the node.
- The right subtree of every node contains only values **strictly greater than** the node.
- Both subtrees are also valid BSTs.

> **Why revisit this?** Q7 introduced the concept. Here you go deeper: handling integer overflow boundaries, understanding why the inorder approach sidesteps those issues, and reinforcing the pattern before tackling harder BST problems.

## Examples

### Example 1 — Integer boundary case

```
Input:
        2147483647       (Integer.MAX_VALUE = 2^31 - 1)

Output: true   (single node is always a valid BST)
```

### Example 2 — Corner case with MIN_VALUE

```
Input:
    -2147483648
             \
        2147483647

Output: true

Node -2147483648's right child 2147483647 is greater. ✓
The range check: root has bounds (-Infinity, +Infinity). ✓
Right child has bounds (-2147483648, +Infinity).
  2147483647 > -2147483648 ✓
```

### Example 3 — Classic failure

```
Input:
        5
       / \
      4   6
         / \
        3   7

Output: false   (3 is in the right subtree of 5, but 3 < 5)
```

## Constraints

- The number of nodes is in the range `[1, 10^4]`.
- `-2^31 <= Node.val <= 2^31 - 1`

## Hints

<details>
<summary>Hint 1 — why -Infinity / +Infinity works</summary>

Using JavaScript's `-Infinity` and `Infinity` as default bounds avoids integer overflow issues entirely. Unlike Java/C++ where you'd use `Integer.MIN_VALUE - 1` (which overflows), JavaScript numbers can represent these special values naturally.

```js
function isValidBST(root, min = -Infinity, max = Infinity) {
  if (root === null) return true;
  if (root.val <= min || root.val >= max) return false;
  return isValidBST(root.left, min, root.val)
      && isValidBST(root.right, root.val, max);
}
```
</details>

<details>
<summary>Hint 2 — inorder approach sidesteps bounds entirely</summary>

Track the previous value during inorder traversal. If any node is ≤ previous, it's invalid.

```js
function isValidBST(root) {
  let prev = -Infinity;
  function inorder(node) {
    if (!node) return true;
    if (!inorder(node.left)) return false;
    if (node.val <= prev) return false;
    prev = node.val;
    return inorder(node.right);
  }
  return inorder(root);
}
```
</details>

## Write your solution
→ [`../solutions/18-validate-bst-range.js`](../solutions/18-validate-bst-range.js)

## Follow-ups

- Q7 and Q18 are essentially the same problem. Write both the range-bounds approach and the inorder approach and compare them. Which do you find easier to reason about?
- What if the BST allows duplicates (≤ instead of <)? How does the validation predicate change?
