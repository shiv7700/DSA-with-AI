# Q20 — Spiral Matrix Traversal

**Difficulty:** Medium
**Pattern:** Boundary shrinking · or direction vectors
**Expected:** O(m × n) time · O(1) extra space (not counting the output)

## Problem

Given an `m × n` 2D matrix, return all its elements in **spiral order**, starting from the top-left corner and going right → down → left → up, peeling the matrix layer by layer.

## Examples

### Example 1
```
Input:
[[1, 2, 3],
 [4, 5, 6],
 [7, 8, 9]]

Output: [1, 2, 3, 6, 9, 8, 7, 4, 5]
```

Visualization of the traversal path:
```
1 → 2 → 3
        ↓
4 → 5   6
↑       ↓
7 ← 8 ← 9
```

### Example 2 (non-square)
```
Input:
[[1, 2, 3, 4],
 [5, 6, 7, 8],
 [9,10,11,12]]

Output: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]
```

### Example 3 (single row)
```
Input:  [[1, 2, 3, 4, 5]]
Output: [1, 2, 3, 4, 5]
```

### Example 4 (single column)
```
Input:  [[1], [2], [3]]
Output: [1, 2, 3]
```

## Constraints
- `1 <= m, n <= 10`
- Elements can be any value.

## Hints

<details>
<summary>Hint 1 — shrinking boundaries</summary>

Maintain four boundary variables: `top`, `bottom`, `left`, `right`. Repeatedly walk along each side, then shrink that side inward.

```
top = 0, bottom = m - 1, left = 0, right = n - 1

while top <= bottom and left <= right:
  walk right along row `top`,    then top++
  walk down  along col `right`,  then right--
  if top <= bottom:
    walk left along row `bottom`, then bottom--
  if left <= right:
    walk up   along col `left`,   then left++
```
</details>

<details>
<summary>Hint 2 — why the two `if` guards matter</summary>

The last two walks (left and up) need guards. Without them, when the matrix has just a single remaining row or column, you'd traverse it twice and emit duplicate elements.
</details>

<details>
<summary>Hint 3 — alternative using direction vectors</summary>

Maintain a direction index `d = 0`, with directions `[[0, 1], [1, 0], [0, -1], [-1, 0]]`. Step in the current direction. When the next step would go off the grid or onto an already-visited cell, rotate: `d = (d + 1) % 4`. This uses O(m × n) extra space for the visited marker, so the boundary approach is usually preferred.
</details>

## Write your solution
→ [`../solutions/20-spiral-matrix.js`](../solutions/20-spiral-matrix.js)

## Follow-ups
- **Spiral Matrix II** — given `n`, generate an `n × n` matrix filled with values `1..n²` in spiral order.
- **Spiral Matrix III** — start at a given cell, spiral outward, allowed to step temporarily off the grid.
