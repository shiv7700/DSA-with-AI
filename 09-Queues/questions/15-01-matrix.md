# Q15 — 01 Matrix

**Difficulty:** Medium
**Pattern:** Multi-source BFS — all 0-cells are sources simultaneously
**Expected:** O(m × n) time · O(m × n) space

## Problem

Given an `m × n` binary matrix `mat` where each cell is `0` or `1`, return a matrix of the same size where each cell contains the **distance to the nearest `0`**.

Distance is measured in steps: you can move up, down, left, right (4-directional), one cell per step.

**Signature:**
```js
function updateMatrix(mat) { ... }
```

## Examples

### Example 1
```
Input:
  [[0, 0, 0],
   [0, 1, 0],
   [0, 0, 0]]

Output:
  [[0, 0, 0],
   [0, 1, 0],
   [0, 0, 0]]
```

### Example 2
```
Input:
  [[0, 0, 0],
   [0, 1, 0],
   [1, 1, 1]]

Output:
  [[0, 0, 0],
   [0, 1, 0],
   [1, 2, 1]]
```

### Example 3
```
Input:
  [[1, 1, 1],
   [1, 1, 1],
   [1, 1, 0]]

Output:
  [[4, 3, 2],
   [3, 2, 1],
   [2, 1, 0]]
```

## Constraints
- `1 <= m, n <= 10^4`
- `1 <= m * n <= 10^4`
- `mat[i][j]` is `0` or `1`
- There is at least one `0` in the matrix.

## Hints

<details>
<summary>Hint 1 — the wrong approach (single-source BFS)</summary>

If you run a BFS from each `1`-cell to find its nearest `0`, that's O((m×n)²). Way too slow.
</details>

<details>
<summary>Hint 2 — multi-source BFS (the right approach)</summary>

Flip the perspective. Instead of "each 1-cell searching for its nearest 0", run BFS **from all 0-cells simultaneously**.

1. Initialize a `dist` matrix of `Infinity` everywhere.
2. Enqueue all `0`-cells (set their `dist = 0`).
3. BFS outward. Each step from a `0`-cell (or a cell we've already assigned a distance) propagates `dist + 1` to unvisited neighbors.

The first time BFS reaches each `1`-cell, it arrives via the shortest path from the nearest `0`.
</details>

<details>
<summary>Hint 3 — implementation sketch</summary>

```js
const dist = Array.from({length: m}, () => new Array(n).fill(Infinity));
const queue = [];

for (let r = 0; r < m; r++) {
  for (let c = 0; c < n; c++) {
    if (mat[r][c] === 0) {
      dist[r][c] = 0;
      queue.push([r, c]);
    }
  }
}

// Standard BFS from here...
```
</details>

## Write your solution
→ [`../solutions/15-01-matrix.js`](../solutions/15-01-matrix.js)

## Follow-ups
- Same problem but distance is Manhattan distance — does BFS still give optimal results? Yes. Why?
- What if diagonal moves are also allowed (8-directional)? How does that change the BFS?
- **Walls and Gates** (Q17) is the exact same algorithm with `0` → gate and `1` → empty room.
