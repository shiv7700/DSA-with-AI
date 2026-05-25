# Q9 — Rotting Oranges

**Difficulty:** Medium
**Pattern:** Multi-source BFS
**Expected:** O(m × n) time · O(m × n) space

## Problem

You are given a 2D integer grid where:
- `0` = empty cell
- `1` = fresh orange
- `2` = rotten orange

Every minute, any fresh orange **4-directionally adjacent** to a rotten orange becomes rotten.

Return the **minimum number of minutes** until no fresh orange remains. If it is impossible for all oranges to become rotten, return `-1`.

## Examples

### Example 1

```
Input:
  [[2,1,1],
   [1,1,0],
   [0,1,1]]

Output: 4

Minute 0:   2 1 1       Minute 1:   2 2 1       Minute 2:   2 2 2
            1 1 0                   2 1 0                   2 2 0
            0 1 1                   0 1 1                   0 2 1

Minute 3:   2 2 2       Minute 4:   2 2 2
            2 2 0                   2 2 0
            0 2 2                   0 2 2

After 4 minutes, all oranges are rotten.
```

### Example 2

```
Input:
  [[2,1,1],
   [0,1,1],
   [1,0,1]]

Output: -1

The orange at (2,0) has no rotten neighbors and is cut off by 0s.
It can never become rotten.
```

### Example 3

```
Input:
  [[0,2]]

Output: 0

There are no fresh oranges to begin with.
```

### Example 4

```
Input:
  [[1]]

Output: -1   (one fresh orange, no rotten oranges to infect it)
```

## Constraints

- `1 <= m, n <= 10`
- `grid[i][j]` is `0`, `1`, or `2`.

## Hints

<details>
<summary>Hint 1 — why multi-source BFS?</summary>

All rotten oranges start infecting simultaneously at minute 0. If you ran BFS from each rotten orange separately and took the max, you'd get the wrong answer. Multi-source BFS initializes the queue with ALL rotten oranges at time 0 and spreads from all of them at once.
</details>

<details>
<summary>Hint 2 — setup</summary>

1. Count total fresh oranges (`freshCount`).
2. Enqueue all rotten oranges at time 0.
3. Run BFS. Each time you infect a fresh orange, decrement `freshCount` and enqueue it with `time + 1`.
4. Track the maximum time seen.
5. At the end: if `freshCount > 0`, return `-1`. Otherwise return the max time.
</details>

<details>
<summary>Hint 3 — tracking time in the queue</summary>

Store tuples `[r, c, time]` in the queue:
```js
const queue = [];
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (grid[r][c] === 2) queue.push([r, c, 0]);
  }
}
```

When you infect a neighbor: `queue.push([nr, nc, time + 1])`.
Keep a `maxTime` variable and update it whenever you infect a new orange.
</details>

## Write your solution
→ [`../solutions/09-rotting-oranges.js`](../solutions/09-rotting-oranges.js)

## Follow-ups
- What if oranges can also infect 8-directionally (diagonals)?
- What if multiple "super-rotten" oranges spread at double speed?
- **Walls and Gates** — same multi-source BFS pattern: fill each empty room with the distance to its nearest gate.
