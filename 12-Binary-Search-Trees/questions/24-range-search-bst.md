# Q24 — Range Search in BST

**Difficulty:** Medium
**Pattern:** BST traversal with bounds pruning
**Expected:** O(log n + k) time · O(h + k) space  (k = number of results)

## Problem

Given the root of a BST and two integers `low` and `high`, return a list of all values in the BST that fall within the inclusive range `[low, high]`, in **ascending order**.

## Examples

### Example 1

```
Tree:
        10
       /  \
      5    15
     / \  /  \
    3   7 12  20

low = 6,  high = 14

Output: [7, 10, 12]
```

Values 7, 10, and 12 are in [6, 14]. 3, 5 are too small. 15, 20 are too large.

### Example 2

```
Same tree.
low = 3,  high = 20

Output: [3, 5, 7, 10, 12, 15, 20]   ← all values
```

### Example 3

```
Same tree.
low = 100, high = 200

Output: []   (no values in range)
```

## Constraints

- `1 <= n <= 2 * 10^4`
- All node values are unique.
- `low <= high`

## Hints

<details>
<summary>Hint 1 — augment inorder with pruning</summary>

Do an inorder traversal but prune subtrees that are entirely out of range:
- If `node.val <= low`, skip the left subtree (all values there are < node.val ≤ low).
- If `node.val >= high`, skip the right subtree.
- Otherwise, collect this node if it's in range and recurse both sides.
</details>

<details>
<summary>Hint 2 — or use rangeSumBST as a template</summary>

The structure is identical to Q8 (Range Sum), except you collect values instead of summing them:

```js
function rangeSearchBST(root, low, high, result = []) {
  if (!root) return result;
  if (root.val > low)  rangeSearchBST(root.left,  low, high, result);
  if (root.val >= low && root.val <= high) result.push(root.val);
  if (root.val < high) rangeSearchBST(root.right, low, high, result);
  return result;
}
```

The output is sorted (ascending) because we do inorder traversal.
</details>

## Write your solution
→ [`../solutions/24-range-search-bst.js`](../solutions/24-range-search-bst.js)

## Follow-ups

- Return the **nodes** themselves instead of just the values.
- How does this compare to Q8 (Range Sum)? They're almost identical — just a different aggregation.
- If queries are frequent and the tree changes rarely, could you precompute something to answer range queries faster?
