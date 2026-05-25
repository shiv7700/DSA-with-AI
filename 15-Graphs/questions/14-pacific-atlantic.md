# Q14 — Pacific Atlantic Water Flow

**Difficulty:** Medium
**Pattern:** Reverse multi-source DFS / BFS from ocean borders
**Expected:** O(m × n) time · O(m × n) space

## Problem

You have an `m × n` integer grid `heights` representing the height of land above sea level. Rain water flows from higher or equal height to lower or equal height in any of the **4 cardinal directions**.

The ocean borders:
- **Pacific Ocean** touches the **top and left** edges.
- **Atlantic Ocean** touches the **bottom and right** edges.

Return a list of grid coordinates `[r, c]` where water can flow to **both** the Pacific and Atlantic oceans.

## Examples

### Example 1

```
Input:
  heights = [[1, 2, 2, 3, 5],
             [3, 2, 3, 4, 4],
             [2, 4, 5, 3, 1],
             [6, 7, 1, 4, 5],
             [5, 1, 1, 2, 4]]

Pacific Ocean: top/left border
Atlantic Ocean: bottom/right border

Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]

Visualization (P=can reach Pacific, A=Atlantic, B=Both):
  . . . . P
  . . . B B
  . . B . .
  B B . . .
  B . . . .
```

### Example 2

```
Input:
  heights = [[1]]

Output: [[0,0]]   (only cell — touches both oceans)
```

## Constraints

- `1 <= m, n <= 200`
- `0 <= heights[i][j] <= 10^5`

## Hints

<details>
<summary>Hint 1 — reverse the problem</summary>

Instead of flowing water downward from each cell, think in reverse: **flow water upward** from each ocean, following cells of equal or greater height.

Run multi-source BFS/DFS from all Pacific-border cells (marking which cells can reach Pacific).
Run another multi-source BFS/DFS from all Atlantic-border cells.

Any cell marked in BOTH sets is your answer.
</details>

<details>
<summary>Hint 2 — why reverse?</summary>

Forward direction: from each cell, you'd have to check all 4 neighbors and follow downward — complex and hard to track which ocean you reach.

Reverse direction: start at the ocean border and ask "which cells can send water here?" Moving to a neighbor is valid if `neighbor height >= current height` (because water flows downward in the original direction, which is upward in reverse).
</details>

<details>
<summary>Hint 3 — two BFS passes</summary>

```js
const pacific = new Set();    // cells that can reach Pacific
const atlantic = new Set();   // cells that can reach Atlantic

// BFS from all Pacific-border cells:
// Pacific borders = top row (all cols) + left col (all rows)

// BFS from all Atlantic-border cells:
// Atlantic borders = bottom row + right col

// In BFS: move to neighbor if height[nr][nc] >= height[r][c]
//         (we're going "uphill" in reverse)
```

After both BFS runs, find cells in BOTH sets.
</details>

## Write your solution
→ [`../solutions/14-pacific-atlantic.js`](../solutions/14-pacific-atlantic.js)

## Follow-ups
- What if there were three oceans with different border placements?
- What is the minimum number of cells whose height you'd need to change so that all cells can reach both oceans?
- Return the cells sorted by `[row, col]` lexicographically.
