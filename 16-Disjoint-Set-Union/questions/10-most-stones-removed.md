# Q10 — Most Stones Removed with Same Row or Column

**Difficulty:** Medium
**Pattern:** DSU — union rows and columns as virtual nodes
**Expected:** O(n · α(n)) time · O(n) space

## Problem

On a 2D plane, you have `n` stones placed at integer coordinates. Each stone occupies exactly one point.

A stone can be removed if it shares the **same row or same column** as another stone that has not yet been removed.

Return the **largest number of stones** you can remove.

> **Key insight:** you can always remove all stones except one from a connected group. Two stones are "connected" if they share a row or column. Connected groups form transitively — stone A and stone C are in the same group if A shares a row with B and B shares a column with C.

## Examples

### Example 1

```
Input:  stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]
Output: 5
```

All 6 stones form one connected component (can be verified by row/column sharing). You can remove 5 of them, leaving 1.

### Example 2

```
Input:  stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]
Output: 3
```

Two components form. You can remove 2 from one and 1 from the other (or similar). Max removable = 5 - 2 = 3.

### Example 3

```
Input:  stones = [[0,0]]
Output: 0
```

Only one stone. Nothing to remove.

## Constraints

- `1 <= stones.length <= 1000`
- `0 <= stones[i][0], stones[i][1] <= 10^4`
- No two stones share the same position.

## Hints

<details>
<summary>Hint 1 — the answer formula</summary>

For each connected component of size `s`, you can remove `s - 1` stones (keep exactly 1 per component).

Answer = n - (number of connected components).
</details>

<details>
<summary>Hint 2 — how to connect stones with DSU</summary>

Two stones that share a row are connected. Two stones that share a column are connected.

Naive approach: for each pair of stones, union them if they share a row or column. O(n²) — works within constraints.

Better: for each stone, union it with every other stone in the same row, and every other stone in the same column. Build a `rowMap: Map<row, stone_indices[]>` and `colMap: Map<col, stone_indices[]>`.
</details>

<details>
<summary>Hint 3 — smarter approach: union row-index with col-index</summary>

Create virtual DSU nodes for rows and columns. Since row and column values can both be up to 10^4, offset columns by 10001 to avoid collision with row indices.

For each stone `[r, c]`, union node `r` with node `c + 10001`. This connects all stones in the same row or column through their shared virtual node, without needing to compare stone pairs.

After all unions: the answer is `n - (number of distinct roots among the n stones)`.
</details>

## Write your solution

→ [`../solutions/10-most-stones-removed.js`](../solutions/10-most-stones-removed.js)

## Follow-ups

- Convince yourself that the answer is `n - components` (where components is counted only over the stones, not the virtual row/col nodes).
- Why do we offset column indices when uniting rows and columns in the same DSU?
