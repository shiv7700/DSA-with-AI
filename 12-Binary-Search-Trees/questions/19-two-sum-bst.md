# Q19 — Two Sum in BST

**Difficulty:** Medium
**Pattern:** Inorder traversal + hash set (or two-pointer with iterator)
**Expected:** O(n) time · O(n) space  (hash set approach)

## Problem

Given the root of a BST and an integer `target`, return `true` if there exist two **different** nodes in the BST whose values sum to `target`. Return `false` otherwise.

## Examples

### Example 1

```
Input:
        5
       / \
      3   6
     / \   \
    2   4   7

target = 9

Output: true   (2 + 7 = 9, or 3 + 6 = 9)
```

### Example 2

```
Same tree.
target = 28

Output: false   (max sum is 6 + 7 = 13)
```

### Example 3

```
Input:
    2
   / \
  1   3

target = 4
Output: true   (1 + 3 = 4)

target = 3
Output: true   (1 + 2 = 3)

target = 1
Output: false  (need two different nodes)
```

## Constraints

- The number of nodes is in the range `[1, 10^4]`.
- `-10^4 <= Node.val <= 10^4`
- `-10^5 <= target <= 10^5`
- All node values are unique.

## Hints

<details>
<summary>Hint 1 — treat it like Two Sum on an array</summary>

Do an inorder traversal to get the values as a sorted array, then apply the classic Two Sum pattern: use a hash set or two pointers.

- **Hash set approach:** traverse inorder, for each value check if `target - value` is already in the set. O(n) time, O(n) space.
- **Two pointer approach on array:** traverse inorder to get sorted array, then two pointers from both ends. O(n) time, O(n) space.
</details>

<details>
<summary>Hint 2 — you can do it without materializing the array</summary>

Use a `Set` and a single traversal:

```js
function findTarget(root, target) {
  const seen = new Set();
  function dfs(node) {
    if (!node) return false;
    if (seen.has(target - node.val)) return true;
    seen.add(node.val);
    return dfs(node.left) || dfs(node.right);
  }
  return dfs(root);
}
```

This works because the Set grows as you traverse. When you check `target - node.val`, all previously visited nodes are in the set.
</details>

<details>
<summary>Hint 3 — can you do O(h) space instead of O(n)?</summary>

Yes, with two BST iterators: one doing inorder (ascending), one doing reverse inorder (descending). Walk them inward like two pointers. Each iterator uses O(h) stack space.

This is more complex to implement but space-optimal.
</details>

## Write your solution
→ [`../solutions/19-two-sum-bst.js`](../solutions/19-two-sum-bst.js)

## Follow-ups

- Return the **pair of values** that sum to target (not just true/false).
- What if you need to find all pairs that sum to target?
- How does this compare to Two Sum on a regular array (Q11 in Arrays chapter)?
