# Q21 — Number of Islands II

**Difficulty:** Hard
**Pattern:** DSU — online union, track component count after each addition
**Expected:** O(k · α(m · n)) time · O(m · n) space  (k = number of additions)

## Problem

You have an `m × n` grid of water. You are given a list of `positions` where `positions[i] = [ri, ci]` tells you to add a piece of land at position `(ri, ci)`.

After each land addition, return the current **number of islands** (connected groups of land cells, where connectivity is 4-directional: up, down, left, right).

Return an array of island counts, one count after each addition.

> **Why DSU over BFS?** A BFS/DFS approach would re-scan all land after each addition — O(m · n) per step, O(k · m · n) total. DSU handles each addition in O(α(m · n)) — much faster for large grids with many additions.

## Examples

### Example 1

```
Input:  m = 3,  n = 3,  positions = [[0,0],[0,1],[1,2],[2,1]]
Output: [1,1,2,3]
```

Add (0,0): 1 island.
Add (0,1): merges with (0,0) → still 1 island.
Add (1,2): separate → 2 islands.
Add (2,1): separate → 3 islands.

```
After step 1:   After step 2:   After step 3:   After step 4:
1 . .           1 1 .           1 1 .           1 1 .
. . .           . . .           . . 2           . . 2
. . .           . . .           . . .           . 3 .
Islands: 1      Islands: 1      Islands: 2      Islands: 3
```

### Example 2

```
Input:  m = 1,  n = 1,  positions = [[0,0]]
Output: [1]
```

## Constraints

- `1 <= m, n <= 200`
- `1 <= positions.length <= 10^4`
- `0 <= ri < m`
- `0 <= ci < n`

## Hints

<details>
<summary>Hint 1 — encoding 2D as 1D</summary>

Encode cell `(r, c)` as `r * n + c`. Total DSU size: `m * n`.

Keep a boolean `active[m * n]` array initialized to `false`. When you add land at `(r, c)`, set `active[r*n+c] = true`.
</details>

<details>
<summary>Hint 2 — adding a new land cell</summary>

When you add land at `(r, c)`:
1. If it was already land, push the current count and continue (no change).
2. Otherwise: `active[cell] = true`. Increment `islands` by 1 (new island).
3. For each of the 4 neighbors (up, down, left, right):
   - If in bounds AND `active[neighbor]`:
     - If `union(cell, neighbor)` returns true: decrement `islands` (two islands merged).
4. Push current `islands` to result.
</details>

<details>
<summary>Hint 3 — why increment then decrement?</summary>

When you place land on an empty cell, it starts as its own island (+1). Then for each active neighbor it successfully merges with, the island count decreases by 1 (two became one). This correctly handles merging with multiple neighbors at once (e.g., a cell that bridges two separate islands from both sides).
</details>

## Write your solution

→ [`../solutions/21-number-of-islands-ii.js`](../solutions/21-number-of-islands-ii.js)

## Follow-ups

- What if the same position is added more than once? (Handle gracefully — it's already active, count doesn't change.)
- **Q22 — Bricks Falling When Hit**: uses the same "reverse time" trick instead of online additions.
- How would you solve "Number of Islands" (the static version) with DSU?
