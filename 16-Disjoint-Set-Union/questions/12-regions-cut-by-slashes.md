# Q12 — Regions Cut by Slashes

**Difficulty:** Medium
**Pattern:** DSU — expand grid cells into sub-cells to model diagonal cuts
**Expected:** O(n² · α(n²)) time · O(n²) space

## Problem

You are given an `n × n` grid of strings, where each cell is either `"/"`, `"\"`, or `" "` (a space).

The slashes divide the grid into **regions**. Count the number of regions.

> **Visualization:** think of a grid of squares. A `"/"` cuts a square from its bottom-left corner to its top-right corner. A `"\"` cuts from top-left to bottom-right. A `" "` leaves the square undivided.

## Examples

### Example 1

```
Input:  grid = [" /","/ "]
Output: 2
```

```
+--+--+
|  /  |
+--+--+
|/    |
+--+--+
Two regions (think of it as two triangles separated by the connected slashes).
```

### Example 2

```
Input:  grid = [" /","  "]
Output: 1
```

One region — the slash doesn't fully close off a region.

### Example 3

```
Input:  grid = ["/\\","\\/"]
Output: 4
```

Four triangular regions inside a 2×2 grid.

### Example 4

```
Input:  grid = ["//","/ "]
Output: 3
```

## Constraints

- `1 <= n <= 30`
- `grid[i][j]` is `'/'`, `'\'`, or `' '`.

## Hints

<details>
<summary>Hint 1 — split each cell into 4 triangles</summary>

Each grid cell can be divided into **4 triangles** (sub-cells): top (0), right (1), bottom (2), left (3).

Encode triangle `t` in cell `(r, c)` as index: `(r * n + c) * 4 + t`.

Total DSU size: `4 * n * n`.
</details>

<details>
<summary>Hint 2 — how slashes divide a cell</summary>

For each cell:
- `" "` (space): all 4 triangles are connected. Union 0-1-2-3.
- `"/"`: top and left are connected; right and bottom are connected. Union top with left (0,3); union right with bottom (1,2).
- `"\"`: top and right are connected; left and bottom are connected. Union top with right (0,1); union left with bottom (2,3).
</details>

<details>
<summary>Hint 3 — connecting adjacent cells</summary>

After handling each cell internally, connect adjacent cells:
- The bottom triangle of cell `(r, c)` connects to the top triangle of cell `(r+1, c)`.
- The right triangle of cell `(r, c)` connects to the left triangle of cell `(r, c+1)`.

After all unions, count the number of distinct roots → number of regions.
</details>

## Write your solution

→ [`../solutions/12-regions-cut-by-slashes.js`](../solutions/12-regions-cut-by-slashes.js)

## Follow-ups

- Why 4 triangles per cell? Could you use 3? (Try it — it gets messy with the diagonal connections.)
- What's the maximum possible number of regions in an n×n grid?
