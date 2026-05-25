# Q21 — Closest Value in BST

**Difficulty:** Medium
**Pattern:** BST walk — track running minimum distance
**Expected:** O(log n) time average · O(1) space (iterative)

## Problem

Given the root of a BST and a floating-point `target`, find the value in the BST that is **closest** to `target` (smallest absolute difference).

If there is a tie (two values equally close), return the smaller one.

## Examples

### Example 1

```
Tree:
        4
       / \
      2   5
     / \
    1   3

target = 3.714286

Distances: |1 - 3.714| = 2.714
           |2 - 3.714| = 1.714
           |3 - 3.714| = 0.714   ← winner
           |4 - 3.714| = 0.286   ← winner
           |5 - 3.714| = 1.286

Output: 4   (|4 - 3.714286| = 0.285714 < |3 - 3.714286| = 0.714286)
```

### Example 2

```
Same tree.
target = 2.5

Distances: |1 - 2.5| = 1.5
           |2 - 2.5| = 0.5   ← tie
           |3 - 2.5| = 0.5   ← tie

Output: 2   (tie broken by returning the smaller value)
```

### Example 3 (exact match)

```
target = 3.0
Output: 3
```

## Constraints

- The number of nodes is in the range `[1, 10^4]`.
- `0 <= Node.val <= 10^9`
- `-10^9 <= target <= 10^9`
- All node values are unique.

## Hints

<details>
<summary>Hint 1 — walk the BST, update closest candidate</summary>

At each node, compare `|node.val - target|` to the current best. Update if closer. Then go left or right based on where target is.

You don't need to explore both sides — the BST property guarantees that the closest value lies on the path you'd take when searching for target.
</details>

<details>
<summary>Hint 2 — implementation</summary>

```js
function closestValue(root, target) {
  let closest = root.val;
  let curr = root;
  while (curr !== null) {
    const currDiff    = Math.abs(curr.val - target);
    const closestDiff = Math.abs(closest   - target);
    if (currDiff < closestDiff ||
        (currDiff === closestDiff && curr.val < closest)) {
      closest = curr.val;
    }
    curr = target < curr.val ? curr.left : curr.right;
  }
  return closest;
}
```
</details>

## Write your solution
→ [`../solutions/21-closest-value-bst.js`](../solutions/21-closest-value-bst.js)

## Follow-ups

- Q22 asks for the **k closest** values — a significant jump in complexity.
- What if `target` is a very large negative number? Does your code handle it correctly?
- Why is it safe to only follow one path (not both sides) when searching for the closest value?
