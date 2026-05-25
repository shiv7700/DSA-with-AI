# Q27 — Top View / Bottom View / Left View / Right View

**Difficulty:** Medium
**Pattern:** BFS · coordinate mapping
**Expected:** O(n) time · O(n) space

## Problem

Given the `root` of a binary tree, implement all four directional views:

- **Top View**: for each column, the first (topmost) node visible.
- **Bottom View**: for each column, the last (bottommost) node visible.
- **Left View**: the leftmost node at each depth level (= right side view of a mirror).
- **Right View**: the rightmost node at each depth level (same as Q24).

Return each as an array of node values.

## Examples

### Example 1

```
Tree:        1
           /   \
          2     3
         / \   / \
        4   5 6   7
             \
              8
```

**Top view** (first node per column, left to right): `[4, 2, 1, 3, 7]`

Wait, where does 5 go? 5 is at column 0 — same as 1. 1 is on top (row 0), so 1 is visible from the top. 5 is hidden behind 1.

Let's label columns:
```
Col: -2  -1   0   1   2
Row0:          1
Row1:     2        3
Row2: 4       5  6       7
Row3:         8 (at col 0, row 3, hidden under 5 in col 0 but visible in bottom)
```

Hmm, 8 is actually right child of 5, so col = col(5)+1 = 1. Let me redraw:

```
         1            col 0
        / \
       2   3          col -1, +1
      / \ / \
     4  5 6  7        col -2, 0, 0, +2  (5 and 6 both at col 0)
         \
          8            col 1
```

**Top view** (leftmost col to rightmost): `[4, 2, 1, 3, 7]`
(At col 0: 1 at row 0 is visible. At col +1: 3 at row 1, but 8 is at row 3 same col — 3 is on top.)

**Bottom view**: `[4, 2, 5 or 6, 8, 7]` (At col 0: 5 and 6 both at same row — pick either; at col 1: 8.)

**Left view** (first node per level): `[1, 2, 4, 8]`

**Right view** (last node per level): `[1, 3, 7, 8]`

```
Input:  root = [1, 2, 3, 4, 5, 6, 7, null, null, null, 8]
Top view:    [4, 2, 1, 3, 7]
Bottom view: [4, 2, 5, 8, 7]  (if tie, pick left child first)
Left view:   [1, 2, 4, 8]
Right view:  [1, 3, 7, 8]
```

## Constraints

- The number of nodes is in the range `[1, 500]`.
- `-100 <= Node.val <= 100`

## Hints

<details>
<summary>Hint 1 — top and bottom view use column + BFS</summary>

Same BFS with `(node, col)` as in Q26. For **top view**: for each column, record only the FIRST node seen (don't overwrite). For **bottom view**: for each column, always overwrite with the LATEST node seen.

Since BFS processes top-to-bottom, the "first seen" is topmost and "last seen" is bottommost.
</details>

<details>
<summary>Hint 2 — left and right view use level-order from Q4/Q24</summary>

**Right view** = last node at each level (Q24).
**Left view** = first node at each level (same as Q24 but take `i === 0` instead of `i === levelSize - 1`).
</details>

## Write your solution

→ [`../solutions/27-directional-views.js`](../solutions/27-directional-views.js)

## Follow-ups

- For top/bottom view, when two nodes share the same column and row (tie), the problem usually says left child comes before right child. Make sure your BFS order handles this naturally.
