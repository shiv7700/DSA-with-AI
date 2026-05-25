# Q17 — Walls and Gates

**Difficulty:** Medium
**Pattern:** Multi-source BFS from all gates simultaneously
**Expected:** O(m × n) time · O(m × n) space

## Problem

You are given an `m × n` grid `rooms` initialized with these values:
- `-1` — a wall or obstacle
- `0` — a gate
- `INF` (use `2147483647`) — an empty room

Fill each empty room with the **distance to its nearest gate**. If it is impossible to reach a gate, the value remains `INF`.

**Signature:**
```js
const INF = 2147483647;
function wallsAndGates(rooms) { ... }
// Modifies rooms in place; returns nothing.
```

## Examples

### Example 1
```
Input:
  [[INF, -1,   0, INF],
   [INF, INF, INF,  -1],
   [INF,  -1, INF,  -1],
   [  0,  -1, INF, INF]]

Output:
  [[3, -1,  0,  1],
   [2,  2,  1, -1],
   [1, -1,  2, -1],
   [0, -1,  3,  4]]
```

### Example 2
```
Input:  [[-1]]
Output: [[-1]]
```

## Constraints
- `1 <= m, n <= 250`
- `rooms[i][j]` is `-1`, `0`, or `2147483647`

## Hints

<details>
<summary>Hint 1 — this is 01 Matrix in disguise</summary>

This is exactly the same algorithm as Q15 (01 Matrix). Gates are the "0-sources". Empty rooms are the "1-cells" that need their distance filled. Walls (`-1`) are obstacles — skip them.

The template: enqueue all gates → BFS outward → update distance for each reachable empty room.
</details>

<details>
<summary>Hint 2 — no separate visited array needed</summary>

Since you're updating `rooms[r][c]` with the actual distance, a cell is "visited" the moment its distance is set to anything other than `INF`. Check `rooms[nr][nc] === INF` before enqueuing a neighbor.
</details>

## Write your solution
→ [`../solutions/17-walls-and-gates.js`](../solutions/17-walls-and-gates.js)

## Follow-ups
- What if there are multiple types of gates with different "access speeds" (i.e., a gate of type A spreads 1 unit per step, type B spreads 2 units per step)? How would you model this?
- What if rooms can be 3D (floors, stairs)? How does BFS extend to 3D grids?
