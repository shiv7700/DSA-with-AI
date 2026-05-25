# Q8 — Range Sum of BST

**Difficulty:** Easy
**Pattern:** BST pruning — skip entire subtrees outside the range
**Expected:** O(n) time worst case · O(h) space (but much better in practice due to pruning)

## Problem

Given the root of a Binary Search Tree and two integers `low` and `high`, return the sum of values of all nodes with a value in the **inclusive range** `[low, high]`.

## Examples

### Example 1

```
Input:  root = [10, 5, 15, 3, 7, null, 18],  low = 7,  high = 15

Tree:
        10
       /  \
      5    15
     / \     \
    3   7    18

Output: 32
```

Nodes with values in [7, 15]: 7 + 10 + 15 = 32.

Nodes **skipped**: 3 (< 7), 18 (> 15), and 5 (< 7).

### Example 2

```
Input:  root = [10, 5, 15, 3, 7, 13, 18, 1, null, 6],  low = 6,  high = 10

Tree:
           10
          /  \
         5    15
        / \  /  \
       3   7 13  18
      /   /
     1   6

Output: 23
```

Nodes in [6, 10]: 6 + 7 + 10 = 23.

## Constraints

- The number of nodes in the tree is in the range `[1, 2 * 10^4]`.
- `1 <= Node.val <= 10^5`
- `1 <= low <= high <= 10^5`
- All `Node.val` are unique.

## Hints

<details>
<summary>Hint 1 — don't just do a full traversal</summary>

You could do a full inorder traversal and sum values in the range. That's O(n). But you can do better with BST pruning.

The BST property tells you when you can skip an entire subtree:
- If `node.val < low`, the entire LEFT subtree of this node is also < low. Skip it.
- If `node.val > high`, the entire RIGHT subtree is also > high. Skip it.
</details>

<details>
<summary>Hint 2 — recursive with pruning</summary>

```js
function rangeSumBST(root, low, high) {
  if (root === null) return 0;
  let sum = 0;
  if (root.val >= low && root.val <= high) sum += root.val;
  if (root.val > low)  sum += rangeSumBST(root.left,  low, high);
  if (root.val < high) sum += rangeSumBST(root.right, low, high);
  return sum;
}
```

The key insight: `if (root.val > low)` — only go left if there might be values ≥ low in the left subtree. Since the left subtree contains values < root.val, if root.val <= low, the entire left subtree is < low and we skip it.
</details>

## Write your solution
→ [`../solutions/08-range-sum-bst.js`](../solutions/08-range-sum-bst.js)

## Follow-ups

- Return a list of all nodes in the range [low, high] instead of their sum.
- Count the number of nodes in the range (not the sum).
- What if you need to answer many range-sum queries on the same BST? Can you precompute something to answer each query in O(log n)?
