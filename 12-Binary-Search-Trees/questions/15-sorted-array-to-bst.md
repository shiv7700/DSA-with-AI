# Q15 — Convert Sorted Array to Height-Balanced BST

**Difficulty:** Medium
**Pattern:** Divide and conquer — always pick the middle element as root
**Expected:** O(n) time · O(log n) space (recursion stack)

## Problem

Given an integer array `nums` sorted in **ascending order**, convert it to a **height-balanced** Binary Search Tree.

A height-balanced BST is one where the depth of the two subtrees of every node never differs by more than 1.

## Examples

### Example 1

```
Input:  nums = [-10, -3, 0, 5, 9]

One valid output:
        0
       / \
     -3   9
     /   /
   -10  5

Another valid output:
        0
       / \
     -10   5
       \    \
       -3    9
```

Both are valid. The middle element (0) becomes the root. The elements to the left and right become the left and right subtrees recursively.

### Example 2

```
Input:  nums = [1, 3]

Output:
    3        or     1
   /                 \
  1                   3

Both are valid (the mid can be either element for an even-length array).
```

### Example 3

```
Input:  nums = [1, 2, 3, 4, 5, 6, 7]

Output:
         4
        / \
       2   6
      / \ / \
     1  3 5  7
```

This is a perfect binary tree — all leaves at the same level.

## Constraints

- `1 <= nums.length <= 10^4`
- `-10^4 <= nums[i] <= 10^4`
- `nums` is sorted in strictly increasing order.

## Hints

<details>
<summary>Hint 1 — why middle element as root?</summary>

If you pick the middle element as the root, you split the remaining elements equally (or as close to equally as possible) between the left and right subtrees. This guarantees the tree stays balanced — the left and right subtrees differ in size by at most 1.

Picking the first or last element would create a skewed tree (the "linked list in disguise" from the notes).
</details>

<details>
<summary>Hint 2 — recursive structure</summary>

```
nums = [1, 2, 3, 4, 5, 6, 7]
mid  = 3  (index 3, value 4)

root = 4
left  = convert([1, 2, 3])
right = convert([5, 6, 7])
```

And `convert([1, 2, 3])`:
```
mid   = 1  (index 1, value 2)
root  = 2
left  = convert([1])
right = convert([3])
```

And so on.
</details>

<details>
<summary>Hint 3 — implementation</summary>

```js
function sortedArrayToBST(nums, lo = 0, hi = nums.length - 1) {
  if (lo > hi) return null;
  const mid  = Math.floor((lo + hi) / 2);
  const node = new TreeNode(nums[mid]);
  node.left  = sortedArrayToBST(nums, lo, mid - 1);
  node.right = sortedArrayToBST(nums, mid + 1, hi);
  return node;
}
```

Avoid creating subarrays — pass index bounds instead to stay O(n) space overall.
</details>

## Write your solution
→ [`../solutions/15-sorted-array-to-bst.js`](../solutions/15-sorted-array-to-bst.js)

## Follow-ups

- What if `nums` is **not** sorted? Would you sort it first (O(n log n)) or could you do better?
- This is the inverse of inorder traversal. If you do an inorder traversal of the resulting BST, do you get `nums` back? Why?
- Q16 asks the same question for a sorted linked list. How does that change the approach?
