# Q14 — Unique Paths II

**Difficulty:** Medium
**Pattern:** 2D grid DP — paths with obstacles
**Expected:** O(m × n) time · O(n) space

## Problem

An `m × n` grid has obstacles. A `1` in the grid represents an obstacle; a `0` is open space. A robot starts at the top-left corner and must reach the bottom-right corner, moving only right or down. Return the number of distinct paths, or `0` if the start or end is blocked.

## Examples

### Example 1
```
Input:
obstacleGrid = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0]
]
Output: 2
```
Two paths that avoid the center obstacle.

### Example 2
```
Input:
obstacleGrid = [
  [0, 1],
  [0, 0]
]
Output: 1
```

## Constraints
- `m == obstacleGrid.length`
- `n == obstacleGrid[i].length`
- `1 <= m, n <= 100`
- `obstacleGrid[i][j]` is `0` or `1`.

## Hints

<details>
<summary>Hint 1 — obstacle cells have zero paths through them</summary>

Set `dp[r][c] = 0` whenever `obstacleGrid[r][c] === 1`. No path can pass through an obstacle.
</details>

<details>
<summary>Hint 2 — first row and column need special care</summary>

In the first row, if any cell is an obstacle, all cells to the right of it are also unreachable (their `dp` value should be 0, even if they themselves aren't obstacles). Same logic for the first column going down.
</details>

<details>
<summary>Hint 3 — the main recurrence is identical to Q13</summary>

For non-obstacle cells: `dp[r][c] = dp[r-1][c] + dp[r][c-1]`. Just skip (leave as 0) cells where the obstacle flag is set.
</details>

## Write your solution
→ [`../solutions/14-unique-paths-ii.js`](../solutions/14-unique-paths-ii.js)

## Follow-ups
- **Minimum Path Sum** (Q15) — instead of counting paths, minimize the sum along a path.
- What if the robot could also move left or up (but revisiting is forbidden)?
