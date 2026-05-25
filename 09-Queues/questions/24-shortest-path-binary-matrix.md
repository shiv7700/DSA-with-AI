# Q24 — Shortest Path in a Binary Matrix

**Difficulty:** Hard
**Pattern:** BFS on grid with 8-directional movement
**Expected:** O(n²) time · O(n²) space

## Problem

Given an `n × n` binary matrix `grid`, return the length of the **shortest clear path** from the top-left cell `(0, 0)` to the bottom-right cell `(n-1, n-1)`. A clear path is one where every cell on the path is `0`. You can move 8-directionally (horizontally, vertically, and diagonally).

The length of a path is the number of visited cells.

If no such path exists, return `-1`.

**Signature:**
```js
function shortestPathBinaryMatrix(grid) { ... }
```

## Examples

### Example 1
```
Input:
  [[0, 1],
   [1, 0]]
Output: 2

Path: (0,0) → (1,1)
```

### Example 2
```
Input:
  [[0, 0, 0],
   [1, 1, 0],
   [1, 1, 0]]
Output: 4

Path: (0,0) → (0,1) → (0,2) → (1,2) → (2,2)
Wait, that's 5. Let's re-check:
(0,0) → (0,1) → (1,2) → (2,2) — but (1,2)=0: yes.
Diagonal: (0,0) → (1,1)? No, (1,1)=1.
Shortest: (0,0)→(0,1)→(0,2)→(1,2)→(2,2) = 5. Hmm.

Actually: 4
(0,0)→(0,1)→(0,2)→(2,2)? No — diagonal from (0,2) to (2,2) skips a row.
Checking 8-dir from (0,2): neighbors include (1,1)=blocked, (1,2)=0, (1,3)=OOB.
From (1,2): 8-dir to (2,2)=0. ✓
Path: (0,0)→(0,1)→(0,2)→(1,2)→(2,2) = length 5? 

The expected is 4: (0,0)→(0,1)→(1,2)→(2,2) — note diagonal (0,1)→(1,2) is valid.
```

### Example 3
```
Input:  [[1, 0, 0], [1, 1, 0], [1, 1, 0]]
Output: -1
((0,0) is blocked.)
```

## Constraints
- `n == grid.length == grid[i].length`
- `1 <= n <= 100`
- `grid[i][j]` is `0` or `1`

## Hints

<details>
<summary>Hint 1 — standard BFS but with 8 directions</summary>

Same BFS template as grid problems, but expand to 8 neighbors instead of 4. Each BFS level = distance 1.

```js
const dirs = [
  [-1,-1],[-1,0],[-1,1],
  [ 0,-1],        [0,1],
  [ 1,-1],[ 1,0],[ 1,1]
];
```
</details>

<details>
<summary>Hint 2 — immediate checks before BFS</summary>

- If `grid[0][0] === 1` or `grid[n-1][n-1] === 1`: return `-1` immediately.
- If `n === 1` and `grid[0][0] === 0`: return `1`.
</details>

<details>
<summary>Hint 3 — track distance in the queue</summary>

Enqueue `[row, col, distance]`. Or use level-by-level BFS. When you reach `(n-1, n-1)`, return the current distance.
</details>

## Write your solution
→ [`../solutions/24-shortest-path-binary-matrix.js`](../solutions/24-shortest-path-binary-matrix.js)

## Follow-ups
- What if some cells have weights (cost to traverse)? BFS no longer works — you'd need Dijkstra.
- **Shortest path counting**: how many distinct shortest paths are there?
- What changes if diagonal movement costs 2 steps instead of 1?
