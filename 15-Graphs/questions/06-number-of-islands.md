# Q6 — Number of Islands

**Difficulty:** Easy
**Pattern:** BFS / DFS on a 2D grid · Connected components
**Expected:** O(m × n) time · O(m × n) space

## Problem

Given a 2D grid of `'1'`s (land) and `'0'`s (water), count the number of **islands**.

An island is surrounded by water and is formed by connecting adjacent lands **horizontally or vertically** (not diagonally). You may assume all four edges of the grid are surrounded by water.

## Examples

### Example 1

```
Input:
  [['1','1','1','1','0'],
   ['1','1','0','1','0'],
   ['1','1','0','0','0'],
   ['0','0','0','0','0']]

Output: 1

Visualization (# = land, . = water):
  # # # # .
  # # . # .
  # # . . .
  . . . . .

All land cells are connected → 1 island.
```

### Example 2

```
Input:
  [['1','1','0','0','0'],
   ['1','1','0','0','0'],
   ['0','0','1','0','0'],
   ['0','0','0','1','1']]

Output: 3

  # # . . .     ← island 1
  # # . . .
  . . # . .     ← island 2
  . . . # #     ← island 3
```

### Example 3

```
Input:
  [['1']]

Output: 1
```

## Constraints

- `1 <= m, n <= 300`
- `grid[i][j]` is either `'0'` or `'1'`.

## Hints

<details>
<summary>Hint 1 — think connected components</summary>

Each island is a connected component of `'1'` cells. This is the same pattern as Q4 (count connected components), just on a 2D grid instead of an explicit graph.

Walk every cell. When you hit an unvisited `'1'`, you've found a new island. Increment count, then BFS/DFS to mark ALL connected `'1'` cells as visited.
</details>

<details>
<summary>Hint 2 — the direction vector</summary>

```js
const dirs = [[-1,0],[1,0],[0,-1],[0,1]];  // up, down, left, right
```

For each cell `(r, c)`, its valid neighbors are `(r+dr, c+dc)` for each `[dr, dc]` in `dirs`, where the new coordinates are within bounds and the cell is `'1'`.
</details>

<details>
<summary>Hint 3 — marking visited</summary>

You can use a separate `visited` 2D boolean array — clean but uses O(m×n) extra space.

Or: **overwrite** the original grid — change `'1'` to `'0'` as you visit it. This uses O(1) extra space (the BFS queue aside), but mutates the input. Check if the problem allows mutation.

```js
grid[r][c] = '0';  // mark visited
```
</details>

## Write your solution
→ [`../solutions/06-number-of-islands.js`](../solutions/06-number-of-islands.js)

## Follow-ups
- **Max Area of Island** (Q7): instead of counting islands, find the largest island's area.
- What if diagonal connections also count?
- What if the grid wraps around (like a globe)?
