# Q17 — Surrounded Regions

**Difficulty:** Medium
**Pattern:** DSU — virtual boundary node, or DFS from edges
**Expected:** O(m · n · α(m · n)) time · O(m · n) space

## Problem

You are given an `m × n` matrix `board` of characters `'X'` and `'O'`.

**Capture** all regions of `'O'`s that are **fully surrounded by `'X'`s** — replace them with `'X'`. A region is NOT captured if any `'O'` in it is on the border of the board or connects (through other `'O'`s) to a border `'O'`.

Modify the board **in place**.

## Examples

### Example 1

```
Input:
  X X X X
  X O O X
  X X O X
  X O X X

Output:
  X X X X
  X X X X
  X X X X
  X O X X
```

The `'O'` at (3,1) is on the border → not captured. The `'O'`s at (1,1),(1,2),(2,2) are surrounded → captured.

### Example 2

```
Input:   [["X"]]
Output:  [["X"]]
```

### Example 3

```
Input:
  O O O
  O O O
  O O O

Output:
  O O O
  O O O
  O O O
```

All `'O'`s touch the border (or connect to border `'O'`s). Nothing captured.

## Constraints

- `1 <= m, n <= 200`
- `board[i][j]` is `'X'` or `'O'`.

## Hints

<details>
<summary>Hint 1 — the virtual "boundary" node</summary>

DSU approach: add one extra virtual node (index `m * n`) to represent "the boundary". Any `'O'` on the border gets unioned with this virtual node. Any `'O'` adjacent to another `'O'` gets unioned with it.

At the end: any `'O'` whose root is the virtual node's root is safe (keep it). All other `'O'`s get flipped to `'X'`.
</details>

<details>
<summary>Hint 2 — encoding 2D cells as 1D indices</summary>

Cell `(r, c)` in an `m × n` grid → index `r * n + c`.

Boundary condition: `r === 0 || r === m-1 || c === 0 || c === n-1`.
</details>

<details>
<summary>Hint 3 — simpler alternative: DFS/BFS from border</summary>

1. For each `'O'` on the border, DFS to mark all connected `'O'`s as safe (e.g., mark them `'S'`).
2. Flip all remaining `'O'`s to `'X'`.
3. Flip all `'S'`s back to `'O'`.

Both the DSU and DFS approaches have the same complexity. The DFS version is often considered cleaner for this problem.
</details>

## Write your solution

→ [`../solutions/17-surrounded-regions.js`](../solutions/17-surrounded-regions.js)

## Follow-ups

- Implement both the DSU version (virtual boundary node) and the DFS version. Which do you find cleaner?
- What changes if the board is 3D?
