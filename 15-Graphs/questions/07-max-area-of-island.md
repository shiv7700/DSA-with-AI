# Q7 — Max Area of Island

**Difficulty:** Easy
**Pattern:** DFS / BFS on a 2D grid · Component size
**Expected:** O(m × n) time · O(m × n) space

## Problem

Given a 2D binary grid of `0`s and `1`s (integers, not strings this time), return the **maximum area** of an island.

An island is a group of `1`s connected horizontally or vertically. The area of an island is the number of cells with value `1` in it. If there are no islands, return `0`.

## Examples

### Example 1

```
Input:
  [[0,0,1,0,0,0,0,1,0,0,0,0,0],
   [0,0,0,0,0,0,0,1,1,1,0,0,0],
   [0,1,1,0,1,0,0,0,0,0,0,0,0],
   [0,1,0,0,1,1,0,0,1,0,1,0,0],
   [0,1,0,0,1,1,0,0,1,1,1,0,0],
   [0,0,0,0,0,0,0,0,0,0,1,0,0],
   [0,0,0,0,0,0,0,1,1,1,0,0,0],
   [0,0,0,0,0,0,0,1,1,0,0,0,0]]

Output: 6

The largest island has 6 cells (bottom-right cluster of 1s with area 6).
```

### Example 2

```
Input:
  [[0,0,0,0,0,0,0,0]]

Output: 0   (no islands at all)
```

### Example 3

```
Input:
  [[1,1],
   [1,0]]

Output: 3

  # #
  # .
All three 1s are connected → area 3.
```

## Constraints

- `1 <= m, n <= 50`
- `grid[i][j]` is either `0` or `1`.

## Hints

<details>
<summary>Hint 1 — build on number of islands</summary>

This is almost identical to Q6. Instead of just incrementing a count when you find a new island, track the **size** of each island (count cells during BFS/DFS). Keep a running max.
</details>

<details>
<summary>Hint 2 — DFS returning a count</summary>

Recursive DFS is elegant here:

```js
function dfs(grid, r, c) {
  if (out of bounds or grid[r][c] === 0) return 0;
  grid[r][c] = 0;   // mark visited
  return 1 + dfs(r-1,c) + dfs(r+1,c) + dfs(r,c-1) + dfs(r,c+1);
}
```

Each recursive call contributes `1` (for itself) plus the size of all connected cells.
</details>

<details>
<summary>Hint 3 — BFS with a counter</summary>

If you prefer BFS, add a counter:

```js
let size = 0;
// ... in the BFS loop:
const [r, c] = queue.shift();
size++;
// ... enqueue valid neighbors
```
</details>

## Write your solution
→ [`../solutions/07-max-area-of-island.js`](../solutions/07-max-area-of-island.js)

## Follow-ups
- Return the coordinates of all cells in the largest island.
- What if you can flip one `0` to `1` to maximize island area? (Harder.)
- Count the number of distinct island **shapes** (harder — requires canonical serialization).
