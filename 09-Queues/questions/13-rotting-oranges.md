# Q13 — Rotting Oranges

**Difficulty:** Medium
**Pattern:** Multi-source BFS on a grid
**Expected:** O(m × n) time · O(m × n) space

## Problem

You are given an `m × n` grid where each cell can be:
- `0` — empty
- `1` — a fresh orange
- `2` — a rotten orange

Every **minute**, any fresh orange adjacent (4-directionally: up, down, left, right) to a rotten orange becomes rotten.

Return the **minimum number of minutes** needed for all fresh oranges to rot. If this is impossible, return `-1`.

**Signature:**
```js
function orangesRotting(grid) { ... }
```

## Examples

### Example 1
```
Input:
  [[2, 1, 1],
   [1, 1, 0],
   [0, 1, 1]]

Output: 4

Minute 0: rotten = {(0,0)}
Minute 1: rotten = {(0,1),(1,0)}
Minute 2: rotten = {(0,2),(1,1)}
Minute 3: rotten = {(2,1)}         (0,2)→(1,1) and (1,1)→(2,1))
Minute 4: rotten = {(2,2)}
All fresh oranges are now rotten.
```

### Example 2
```
Input:  [[2, 1, 1], [0, 1, 1], [1, 0, 1]]
Output: -1
  (The orange at (2,0) can never be reached.)
```

### Example 3
```
Input:  [[0, 2]]
Output: 0
  (No fresh oranges, already done.)
```

## Constraints
- `1 <= m, n <= 10`
- `grid[i][j]` is `0`, `1`, or `2`

## Hints

<details>
<summary>Hint 1 — why BFS?</summary>

We want the **minimum time** for all oranges to rot. BFS naturally explores outward in "rounds" — each round represents one minute. A single BFS pass gives us the minimum number of minutes.

This is **multi-source BFS**: all rotten oranges spread simultaneously. Enqueue all initial rotten oranges before you start the BFS loop.
</details>

<details>
<summary>Hint 2 — setup</summary>

1. Count the number of fresh oranges (`freshCount`).
2. Enqueue all initially rotten oranges.
3. Run BFS. Each time you rot a fresh orange, decrement `freshCount`.
4. Track the number of BFS rounds (minutes).
5. After BFS: if `freshCount === 0`, return minutes. Otherwise return `-1`.
</details>

<details>
<summary>Hint 3 — counting minutes</summary>

Process the queue level by level. One "level" = one minute. A common technique: record the queue size at the start of each minute, then process exactly that many nodes before incrementing the minute counter.

```js
let minutes = 0;
while (queue.length > 0) {
  const size = queue.length;       // all oranges rotting this minute
  for (let i = 0; i < size; i++) {
    const [r, c] = queue.shift();
    // spread to 4 neighbors...
  }
  if (queue.length > 0) minutes++;  // only count if more spreading happened
}
```
</details>

<details>
<summary>Hint 4 — the 4-directional move template</summary>

```js
const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
for (const [dr, dc] of dirs) {
  const nr = r + dr, nc = c + dc;
  if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1) {
    grid[nr][nc] = 2;
    freshCount--;
    queue.push([nr, nc]);
  }
}
```
</details>

## Write your solution
→ [`../solutions/13-rotting-oranges.js`](../solutions/13-rotting-oranges.js)

## Follow-ups
- **8-directional rotting**: rotten oranges also spread diagonally. How does the solution change?
- **Multiple types**: what if oranges rot at different speeds (some take 2 minutes instead of 1)?
- This problem is structurally identical to **Walls and Gates** (Q17) and **01 Matrix** (Q15). Can you see how?
