# Q22 — Bricks Falling When Hit

**Difficulty:** Hard
**Pattern:** DSU — reverse time to convert deletion into addition
**Expected:** O((m · n + hits.length) · α(m · n)) time · O(m · n) space

## Problem

You are given a binary `grid` (1 = brick, 0 = empty) and a list of `hits`. Each hit erases the brick at that position (if any) and potentially causes connected bricks above to fall.

A brick **falls** if, after the hit, it is no longer directly or indirectly connected to the **top row** of the grid (connection is 4-directional).

After each hit, return the **number of bricks that fall** as a result of that hit (not counting the hit brick itself, which is simply erased).

## Examples

### Example 1

```
Input:  grid = [[1,0,0,0],[1,1,1,0]],  hits = [[1,0]]
Output: [2]
```

Hit `(1,0)`. Before hit:
```
1 0 0 0
1 1 1 0
```
After erasing (1,0):
```
1 0 0 0
0 1 1 0
```
Now (1,1) and (1,2) are no longer connected to the top row. They fall. Answer: 2.

### Example 2

```
Input:  grid = [[1,0,0,0],[1,1,0,0]],  hits = [[1,1],[1,0]]
Output: [0,0]
```

Hit (1,1): isolated brick falls, count = 0 (the hit brick itself doesn't count).
Hit (1,0): (1,0) was already a lone brick after the first hit. Falls: 0.

## Constraints

- `m == grid.length`, `n == grid[0].length`
- `1 <= m, n <= 200`
- `grid[i][j]` is `0` or `1`.
- `1 <= hits.length <= 4 * 10^4`
- `0 <= hits[i][0] < m`
- `0 <= hits[i][1] < n`
- Hits may target empty cells (no effect).

## Hints

<details>
<summary>Hint 1 — the core problem with forward simulation</summary>

If you simulate hits forward: each hit might disconnect a large cluster, requiring you to re-count connected bricks from the top. That's O(m · n) per hit — too slow for 40,000 hits.

DSU doesn't support removing connections. So: reverse time.
</details>

<details>
<summary>Hint 2 — reverse time: add bricks back</summary>

```
1. Start with the grid AFTER all hits (apply all hits to a copy of the grid).
2. Add a virtual "roof" node connected to all bricks in the top row (index m * n).
3. Process hits in REVERSE ORDER. For each hit (r, c):
     a. If the original grid had no brick here, skip (count = 0).
     b. Otherwise, add the brick back. Connect it to its active neighbors.
     c. sizeBefore = size of the roof component BEFORE adding this brick.
     d. sizeAfter  = size of the roof component AFTER adding this brick.
     e. bricksFell = max(0, sizeAfter - sizeBefore - 1)
        (-1 because the brick we just added back doesn't count as "falling" bricks)
4. Reverse the result array before returning.
```
</details>

<details>
<summary>Hint 3 — the virtual roof node</summary>

The "roof" node (index `m * n`) represents the ceiling. Bricks in row 0 are always connected to the roof.

When you add a brick at `(r, c)`:
- If `r === 0`: union(r*n+c, m*n) — connect to roof.
- For each 4-directional active neighbor: union with it.

A brick is "stable" iff it's connected to the roof node. `getSize(roof)` gives you how many bricks are currently stable (including the virtual roof node itself, so subtract 1 for the real count).
</details>

## Write your solution

→ [`../solutions/22-bricks-falling.js`](../solutions/22-bricks-falling.js)

## Follow-ups

- Walk through Example 1 step by step with the reverse-time algorithm. Verify it gives [2].
- **Lesson 15 in notes.md** explains why DSU can't handle deletion and why reversing time works. Re-read it if you're confused.
