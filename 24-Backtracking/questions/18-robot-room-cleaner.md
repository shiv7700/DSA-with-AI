# Q18 — Robot Room Cleaner

**Difficulty:** Hard
**Pattern:** Backtracking on an implicit grid — explore without knowing the layout
**Expected:** O(n) time · O(n) space — where n is the number of reachable cells

## Problem

You are given a robot that is placed in a room represented by an `m x n` grid. The room is modeled through an API, and you do not have direct access to the grid. The robot has the following API:

```
robot.move()       → returns true if the robot moved forward (cell is open), false if blocked
robot.turnLeft()   → rotates the robot 90 degrees counter-clockwise
robot.turnRight()  → rotates the robot 90 degrees clockwise
robot.clean()      → cleans the current cell
```

Design an algorithm to clean the entire room using only the four API calls. The robot starts at an unknown position with an unknown initial direction. You may not use the grid directly.

## Examples

```
Input:  room = [[1,1,1,1,1,0,1,1],
                [1,1,1,1,1,0,1,1],
                [1,1,1,1,1,1,1,1],
                [0,0,0,1,0,0,0,0],
                [1,1,1,1,1,1,1,1]],
        row = 1, col = 3
Output: robot cleans every reachable cell
```

## Constraints
- `1 <= room.length <= 100`, `1 <= room[0].length <= 200`
- `room[i][j]` is either 0 or 1 (0 = wall/obstacle, 1 = open cell).
- `0 <= row < room.length`, `0 <= col < room[0].length`
- `room[row][col] == 1`
- All the cells the robot can reach are connected.

## Hints

<details>
<summary>Hint 1 — use a virtual coordinate system</summary>

Since you cannot read the grid, track the robot's position yourself. Start at virtual coordinate `(0, 0)` facing "up". Maintain a `visited` set of virtual coordinates. Before moving, compute the target cell's coordinates based on the current direction and check if it has been visited.
</details>

<details>
<summary>Hint 2 — four directions, encoded as direction index</summary>

Represent directions as an array `[[-1,0],[0,1],[1,0],[0,-1]]` (up, right, down, left). Track the current direction as an index `d`. `turnRight()` increments `d` by 1 mod 4; `turnLeft()` decrements.
</details>

<details>
<summary>Hint 3 — backtracking: go back to where you came from</summary>

After exploring all 4 directions from a cell, you need to return to the cell's parent. To do so: turn 180 degrees (two `turnRight()` calls), call `move()`, then turn 180 degrees again. This is the "unchoose" step — returning the robot to the state it was in before it entered this cell.
</details>

## Write your solution
→ [`../solutions/18-robot-room-cleaner.js`](../solutions/18-robot-room-cleaner.js)

## Follow-ups
- How would you solve this if the robot also has an `obstacle()` sensor (can detect walls without moving)?
- **Maze Solver** — plan a path through a known grid vs. exploring an unknown one.
- Analyze how many API calls your solution makes in the worst case.
