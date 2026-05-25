# Q10 — 01 Matrix (Distance to Nearest 0)

**Difficulty:** Medium
**Pattern:** Multi-source BFS
**Expected:** O(m × n) time · O(m × n) space

## Problem

Given a 2D binary matrix of `0`s and `1`s, return a matrix of the same size where each cell contains the **distance to the nearest `0`** in the original matrix.

Distance is measured in the number of steps moving horizontally or vertically (4-directional). A cell containing `0` has distance `0`.

## Examples

### Example 1

```
Input:
  [[0,0,0],
   [0,1,0],
   [0,0,0]]

Output:
  [[0,0,0],
   [0,1,0],
   [0,0,0]]

The 1 at (1,1) is adjacent to four 0s → distance 1.
```

### Example 2

```
Input:
  [[0,0,0],
   [0,1,0],
   [1,1,1]]

Output:
  [[0,0,0],
   [0,1,0],
   [1,2,1]]

  (1,2)=1  is adjacent to (0,2)=0 → distance 1
  (2,0)=1  is adjacent to (1,0)=0 → distance 1
  (2,1)=1  nearest 0 is at distance 2
  (2,2)=1  is adjacent to (1,2)=0 → distance 1 (wait — (1,2) is 0!)
            Actually (2,2) is adjacent to (1,2) which is 0 → distance 1.
```

Corrected output for Example 2:
```
  [[0,0,0],
   [0,1,0],
   [1,2,1]]
```

### Example 3

```
Input:
  [[1,0,1],
   [1,1,1],
   [1,1,0]]

Output:
  [[1,0,1],
   [2,1,2],
   [3,2,1]]   ← wait, let's verify:
               (0,0): nearest 0 is (0,1) → distance 1
               (0,2): nearest 0 is (0,1) → distance 1
               (1,0): nearest 0 → (0,1) at distance 2, (2,2) at distance 3 → 2
               (1,1): nearest 0 → (0,1) at distance 1
               (1,2): nearest 0 → (0,1) at distance 2 or (2,2) at distance 1 → 1
               (2,0): nearest 0 → (0,1) at distance 3 or (2,2) at distance 2 → 2
               (2,1): nearest 0 → (2,2) at distance 1

Output:  [[1,0,1],
          [2,1,1],
          [2,1,0]]
```

## Constraints

- `1 <= m, n <= 10^4`
- Total cells `m * n <= 10^4`
- `matrix[i][j]` is `0` or `1`.
- At least one `0` is guaranteed.

## Hints

<details>
<summary>Hint 1 — don't BFS from each 1</summary>

Running a separate BFS from each `1` cell to find the nearest `0` is O((m×n)²) — too slow. Think in reverse: run BFS from **all zeros at once** (multi-source BFS). The first time BFS reaches each `1`, that's the shortest distance.
</details>

<details>
<summary>Hint 2 — setup</summary>

1. Initialize `dist[r][c] = 0` for every `0` cell, `Infinity` for every `1` cell.
2. Enqueue all `0` cells at the start.
3. BFS propagates distances outward: `dist[neighbor] = dist[current] + 1` when it's smaller.
</details>

<details>
<summary>Hint 3 — standard multi-source BFS template</summary>

```js
const dist = matrix.map(row => row.map(v => v === 0 ? 0 : Infinity));
const queue = [];

for (let r = 0; r < rows; r++)
  for (let c = 0; c < cols; c++)
    if (matrix[r][c] === 0) queue.push([r, c]);

const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
while (queue.length > 0) {
  const [r, c] = queue.shift();
  for (const [dr, dc] of dirs) {
    const nr = r + dr, nc = c + dc;
    if (in bounds && dist[nr][nc] > dist[r][c] + 1) {
      dist[nr][nc] = dist[r][c] + 1;
      queue.push([nr, nc]);
    }
  }
}
return dist;
```
</details>

## Write your solution
→ [`../solutions/10-01-matrix.js`](../solutions/10-01-matrix.js)

## Follow-ups
- What if distance is measured using all 8 directions (diagonals count)?
- What is the cell that is **furthest** from any `0`?
- **Walls and Gates**: same pattern — fill each empty room with distance to nearest gate.
