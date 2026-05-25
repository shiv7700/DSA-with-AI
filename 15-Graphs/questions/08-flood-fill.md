# Q8 — Flood Fill

**Difficulty:** Easy
**Pattern:** DFS / BFS on a 2D grid · Connected component recoloring
**Expected:** O(m × n) time · O(m × n) space

## Problem

You are given a 2D integer grid `image`, a starting cell `(sr, sc)` (source row and column), and a `color` integer.

Perform a **flood fill** starting from `image[sr][sc]`:
- Change the color of the starting cell to `color`.
- Recursively change the color of all **4-directionally connected** cells that share the original color.
- Return the modified grid.

This is exactly what the paint-bucket tool does in an image editor.

## Examples

### Example 1

```
Input:
  image = [[1,1,1],
           [1,1,0],
           [1,0,1]]
  sr = 1, sc = 1, color = 2

Output:
  [[2,2,2],
   [2,2,0],
   [2,0,1]]

Explanation:
  The starting cell (1,1) has color 1. All 4-directionally connected 1s
  become 2. The bottom-right 1 at (2,2) is NOT connected to the source
  region (separated by 0s), so it stays 1.

Before:        After:
  1 1 1          2 2 2
  1 1 0    →     2 2 0
  1 0 1          2 0 1
```

### Example 2

```
Input:
  image = [[0,0,0],
           [0,0,0]]
  sr = 0, sc = 0, color = 0

Output:
  [[0,0,0],
   [0,0,0]]

Explanation: the new color is the same as the old color. No change needed.
```

### Example 3

```
Input:
  image = [[1,0,1],
           [0,1,0],
           [1,0,1]]
  sr = 1, sc = 1, color = 3

Output:
  [[1,0,1],
   [0,3,0],
   [1,0,1]]

Explanation: (1,1) has color 1 but none of its 4-directional neighbors
             are also 1 (they're all 0). So only (1,1) changes.
```

## Constraints

- `1 <= m, n <= 50`
- `0 <= image[i][j], color <= 2^16`
- `0 <= sr < m`, `0 <= sc < n`

## Hints

<details>
<summary>Hint 1 — early exit</summary>

If `image[sr][sc] === color`, there's nothing to do — return `image` as-is. Forgetting this check causes infinite recursion (you'd keep re-coloring cells that are already the target color).
</details>

<details>
<summary>Hint 2 — recursive DFS</summary>

```js
const originalColor = image[sr][sc];

function fill(r, c) {
  if (r < 0 || r >= m || c < 0 || c >= n) return;
  if (image[r][c] !== originalColor) return;   // different color — stop
  image[r][c] = color;   // paint it
  fill(r-1, c); fill(r+1, c); fill(r, c-1); fill(r, c+1);
}

fill(sr, sc);
```
</details>

<details>
<summary>Hint 3 — BFS version</summary>

Start BFS from `(sr, sc)`. Each time you dequeue a cell, recolor it and enqueue all 4 neighbors that still have `originalColor`. The visited check is implicit — once a cell is recolored, it no longer matches `originalColor` and won't be enqueued again.
</details>

## Write your solution
→ [`../solutions/08-flood-fill.js`](../solutions/08-flood-fill.js)

## Follow-ups
- Implement 8-directional flood fill (diagonals count as connected).
- Given two flood-fill operations, apply them in sequence. Does order matter?
- **Surrounded Regions**: flip all `'O'` regions not touching the border to `'X'` — a flood fill from the border working inward.
