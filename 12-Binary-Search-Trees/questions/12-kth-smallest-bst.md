# Q12 — Kth Smallest Element in a BST

**Difficulty:** Medium
**Pattern:** Iterative inorder traversal — stop early at the kth step
**Expected:** O(h + k) time · O(h) space  (h = height)

## Problem

Given the root of a BST and an integer `k`, return the **kth smallest** value among all node values (1-indexed).

## Examples

### Example 1

```
Input:  k = 1

    3
   / \
  1   4
   \
    2

Inorder: [1, 2, 3, 4]
Output: 1   (1st smallest)
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

Inorder: [1, 2, 3, 4, 5, 6]
Output: 3   (3rd smallest)
```

### Example 3

```
Input:  k = 4  (in the same tree above)
Output: 4
```

## Constraints

- The number of nodes in the tree is `n`.
- `1 <= k <= n <= 10^4`
- `0 <= Node.val <= 10^4`

## Hints

<details>
<summary>Hint 1 — inorder gives sorted order</summary>

BST inorder traversal visits nodes in ascending order. The kth node visited in the inorder traversal is the kth smallest. You already know how to do inorder traversal (Q4). Now just stop when you've seen k nodes.
</details>

<details>
<summary>Hint 2 — why iterative is better here</summary>

If you do a recursive inorder and collect all values, you use O(n) space. But you might only need to visit k nodes (when k is small). The iterative approach with an explicit stack lets you stop early.

```js
function kthSmallest(root, k) {
  const stack = [];
  let curr = root;
  let count = 0;

  while (curr !== null || stack.length > 0) {
    while (curr !== null) {
      stack.push(curr);
      curr = curr.left;
    }
    curr = stack.pop();
    count++;
    if (count === k) return curr.val;   // found it, stop now!
    curr = curr.right;
  }
}
```

Time: O(h + k) — O(h) to reach the leftmost node, then O(k) steps to count up to k.
</details>

## Write your solution
→ [`../solutions/12-kth-smallest-bst.js`](../solutions/12-kth-smallest-bst.js)

## Follow-ups

- How would you handle kth **largest**? (Reverse inorder: right → root → left.)
- If the BST is modified frequently and you need to answer kth-smallest queries often, what extra data would you store at each node? (Hint: store subtree size — then each query is O(log n).)
- What if `k` is larger than the number of nodes? Return `null` or `-1`.
