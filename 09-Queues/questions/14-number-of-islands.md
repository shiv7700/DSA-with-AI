# Q14 — Number of Islands

**Difficulty:** Medium
**Pattern:** BFS (or DFS) flood-fill on a grid
**Expected:** O(m × n) time · O(min(m, n)) space for BFS queue

## Problem

Given an `m × n` 2D binary grid where `'1'` represents land and `'0'` represents water, return the **number of islands**.

An island is surrounded by water and is formed by connecting adjacent `'1'`s horizontally or vertically. You may assume all four edges of the grid are surrounded by water.

**Signature:**
```js
function numIslands(grid) { ... }
```

## Examples

### Example 1
```
Input:
  [["1","1","1","1","0"],
   ["1","1","0","1","0"],
   ["1","1","0","0","0"],
   ["0","0","0","0","0"]]

Output: 1
(One big island in the top-left.)
```

### Example 2
```
Input:
  [["1","1","0","0","0"],
   ["1","1","0","0","0"],
   ["0","0","1","0","0"],
   ["0","0","0","1","1"]]

Output: 3
```

### Example 3
```
Input:
  [["1","0","1"],
   ["0","1","0"],
   ["1","0","1"]]

Output: 5
```

## Constraints
- `1 <= m, n <= 300`
- `grid[i][j]` is `'0'` or `'1'`

## Hints

<details>
<summary>Hint 1 — the core strategy</summary>

Scan the grid. Every time you find an unvisited `'1'`, you've found a new island — increment the count, then use BFS (or DFS) to mark all connected `'1'`s as visited so you don't count them again.

Total islands = number of times you trigger a BFS/DFS.
</details>

<details>
<summary>Hint 2 — BFS approach</summary>

When you find an unvisited `'1'` at `(r, c)`:
1. Mark it as visited (e.g., set `grid[r][c] = '0'` to avoid a separate visited set).
2. Enqueue `(r, c)`.
3. BFS: dequeue, check all 4 neighbors, enqueue any unvisited `'1'` neighbors.
4. Count this as one island.
</details>

<details>
<summary>Hint 3 — modifying the grid vs. visited set</summary>

Setting `grid[r][c] = '0'` is a common trick to avoid allocating a separate `visited` array. It mutates the input — which is fine in most interview settings but worth mentioning. If you can't mutate, use a `Set` of serialized coordinates (`'r,c'`).
</details>

## Write your solution
→ [`../solutions/14-number-of-islands.js`](../solutions/14-number-of-islands.js)

## Follow-ups
- Find the **size of the largest island** (number of land cells).
- Count the number of islands where each island has an area **greater than k**.
- **Number of Islands II** (LeetCode 305) — islands are added one at a time. Use Union-Find for efficient dynamic connectivity.
