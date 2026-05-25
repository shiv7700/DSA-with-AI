# Q13 — Kth Largest Element in a BST

**Difficulty:** Medium
**Pattern:** Reverse inorder traversal (right → node → left) — stop at kth step
**Expected:** O(h + k) time · O(h) space

## Problem

Given the root of a BST and an integer `k`, return the **kth largest** value (1-indexed).

The 1st largest is the maximum, 2nd largest is the second largest, and so on.

## Examples

### Example 1

```
Input:  k = 1

    3
   / \
  1   4
   \
    2

Reverse inorder: [4, 3, 2, 1]
Output: 4   (1st largest = maximum)
```

### Example 2

```
Input:  k = 3

        5
       / \
      3   6
     / \
    2   4
   /
  1

Reverse inorder: [6, 5, 4, 3, 2, 1]
Output: 4   (3rd largest)
```

### Example 3

```
Input:  k = 2  (same tree)
Output: 5
```

## Constraints

- `1 <= k <= n` (number of nodes)
- `0 <= Node.val <= 10^4`
- All node values are unique.

## Hints

<details>
<summary>Hint 1 — reverse inorder</summary>

Normal inorder (left → node → right) gives ascending order.
Reverse inorder (right → node → left) gives **descending** order.

The kth node in reverse inorder is the kth largest.
</details>

<details>
<summary>Hint 2 — implementation</summary>

Swap left/right in your inorder code:

```js
function kthLargest(root, k) {
  const stack = [];
  let curr = root;
  let count = 0;

  while (curr !== null || stack.length > 0) {
    while (curr !== null) {
      stack.push(curr);
      curr = curr.right;         // go right first (for descending)
    }
    curr = stack.pop();
    count++;
    if (count === k) return curr.val;
    curr = curr.left;            // then left
  }
}
```
</details>

<details>
<summary>Hint 3 — relationship to kth smallest</summary>

If the BST has n nodes, the kth largest is the same as the `(n - k + 1)`th smallest. So if you already have `kthSmallest` working and you know `n`, you can reuse it: `kthSmallest(root, n - k + 1)`. But the reverse inorder approach avoids needing to count n first.
</details>

## Write your solution
→ [`../solutions/13-kth-largest-bst.js`](../solutions/13-kth-largest-bst.js)

## Follow-ups

- Can you write a single function `kthInOrder(root, k, ascending)` that handles both kth smallest and kth largest depending on a flag?
- If the BST is augmented with subtree sizes at each node, how would you find kth largest in O(log n)?
