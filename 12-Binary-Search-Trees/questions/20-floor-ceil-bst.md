# Q20 — Floor and Ceiling in a BST

**Difficulty:** Medium
**Pattern:** BST walk — track the best candidate seen so far
**Expected:** O(log n) time average · O(1) space (iterative)

## Problem

Given the root of a BST and a value `target`, find:

1. **`floor(target)`** — the largest value in the BST that is **≤ target**. Return `null` if no such value exists.
2. **`ceil(target)`** — the smallest value in the BST that is **≥ target**. Return `null` if no such value exists.

## Examples

### Example 1

```
Tree:
      8
     / \
    4   12
   / \ /  \
  2  6 10  14

floor(5)   →  4    (largest value ≤ 5)
ceil(5)    →  6    (smallest value ≥ 5)

floor(6)   →  6    (6 is in the tree, exact match is its own floor)
ceil(6)    →  6    (exact match)

floor(1)   →  null (no value ≤ 1)
ceil(15)   →  null (no value ≥ 15)

floor(9)   →  8
ceil(9)    →  10
```

## Constraints

- The number of nodes is in the range `[1, 10^4]`.
- All node values are unique.
- `target` may or may not be in the BST.

## Hints

<details>
<summary>Hint 1 — floor: what does "best candidate" mean?</summary>

As you walk down the tree:
- If `target === curr.val`: exact match — return `curr.val` immediately.
- If `target < curr.val`: the current node is too big. Go left. The floor (if it exists) is smaller.
- If `target > curr.val`: the current node is a **candidate** for the floor (it's ≤ target). Record it. But there might be something even closer to target in the right subtree — go right.

At the end, return the last recorded candidate.
</details>

<details>
<summary>Hint 2 — iterative implementations</summary>

```js
function floor(root, target) {
  let result = null, curr = root;
  while (curr) {
    if (curr.val === target)  return curr.val;
    if (curr.val < target) {
      result = curr.val;      // candidate: curr is ≤ target
      curr = curr.right;      // look for something closer
    } else {
      curr = curr.left;       // curr is too big, go smaller
    }
  }
  return result;
}

function ceil(root, target) {
  let result = null, curr = root;
  while (curr) {
    if (curr.val === target)  return curr.val;
    if (curr.val > target) {
      result = curr.val;      // candidate: curr is ≥ target
      curr = curr.left;       // look for something closer
    } else {
      curr = curr.right;      // curr is too small, go bigger
    }
  }
  return result;
}
```
</details>

## Write your solution
→ [`../solutions/20-floor-ceil-bst.js`](../solutions/20-floor-ceil-bst.js)

## Follow-ups

- How do floor and ceil relate to successor and predecessor (Q14)?
- If `target` is in the BST, floor(target) == target == ceil(target). Verify this with the implementations above.
- Implement `floorNode` and `ceilNode` that return the node (not just the value).
