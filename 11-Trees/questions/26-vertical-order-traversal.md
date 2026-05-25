# Q26 — Vertical Order Traversal

**Difficulty:** Medium
**Pattern:** BFS · coordinate mapping
**Expected:** O(n log n) time · O(n) space

## Problem

Given the `root` of a binary tree, return the **vertical order traversal** of its nodes' values.

Assign each node a column index: the root is at column 0, left child is at column -1, right child is at column +1. For each column, list nodes from top to bottom (by row/depth). Nodes in the same column appear in top-to-bottom order.

(For the case where two nodes share the same column AND same row, see Q43 for the tie-breaking variant.)

## Examples

### Example 1

```
Tree:        3
           /   \
          9    20
              /  \
             15   7

Col:  -1  0   1
Row 0:    3
Row 1: 9     20
Row 2:   15    7
```

```
Input:  root = [3, 9, 20, null, null, 15, 7]
Output: [[9], [3, 15], [20], [7]]
```

### Example 2

```
Tree:        1
           /   \
          2     3
         / \   / \
        4   5 6   7

Col: -2 -1  0  1  2
Row 0:      1
Row 1:   2     3
Row 2: 4   5 6   7
```

```
Input:  root = [1, 2, 3, 4, 5, 6, 7]
Output: [[4], [2], [1, 5, 6], [3], [7]]
```

At col 0: 1 (row 0), 5 (row 2), 6 (row 2). Listed top-to-bottom: 1, 5, 6.

## Constraints

- The number of nodes is in the range `[1, 1000]`.
- `0 <= Node.val <= 1000`

## Hints

<details>
<summary>Hint 1 — assign coordinates as you traverse</summary>

Use BFS and pass `(node, row, col)` through the queue. For each node:
- Left child: `(node.left, row+1, col-1)`
- Right child: `(node.right, row+1, col+1)`

Collect all `(col, row, val)` tuples, then group by column.
</details>

<details>
<summary>Hint 2 — grouping and sorting</summary>

Use a `Map<col, [{row, val}]>`. After BFS, sort columns (keys), then for each column sort by row, then output values.

```js
const map = new Map();
// After collecting all tuples:
const cols = [...map.keys()].sort((a, b) => a - b);
return cols.map(col => map.get(col).sort((a, b) => a.row - b.row).map(x => x.val));
```
</details>

## Write your solution

→ [`../solutions/26-vertical-order-traversal.js`](../solutions/26-vertical-order-traversal.js)

## Follow-ups

- **Q43** adds tie-breaking by value when row and column are the same.
- How would this change for an N-ary tree?
