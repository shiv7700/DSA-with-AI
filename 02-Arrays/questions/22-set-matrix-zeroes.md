# Q22 — Set Matrix Zeroes

**Difficulty:** Medium
**Pattern:** Use the matrix itself as a marker (avoid extra space)
**Expected:** O(m × n) time · O(1) extra space

## Problem

You are given an `m × n` 2D matrix. If any element is `0`, set **its entire row and entire column** to `0`. Do this **in place**.

A solution with O(m + n) extra space (using two sets — one for "zero rows", one for "zero columns") is straightforward. The real challenge is achieving **O(1) extra space**.

## Examples

### Example 1
```
Input:
[[1, 1, 1],
 [1, 0, 1],
 [1, 1, 1]]

Output:
[[1, 0, 1],
 [0, 0, 0],
 [1, 0, 1]]
```

### Example 2
```
Input:
[[0, 1, 2, 0],
 [3, 4, 5, 2],
 [1, 3, 1, 5]]

Output:
[[0, 0, 0, 0],
 [0, 4, 5, 0],
 [0, 3, 1, 0]]
```

## Constraints
- `1 <= m, n <= 200`
- Elements can be any integer (including negatives).
- The O(1) extra space variant is required.

## Hints

<details>
<summary>Hint 1 — the easier O(m + n) approach (warm-up)</summary>

Scan the matrix once. Remember which rows contain a zero (in a set) and which columns contain a zero (in another set). Then scan again, zeroing out any cell whose row or column is in either set.
</details>

<details>
<summary>Hint 2 — use the first row and first column as the markers</summary>

We can avoid the extra sets by using the matrix's own first row and first column as flag-storage.

Plan:
1. **Check first** whether the first row contains a zero, and whether the first column contains a zero. Remember these as two boolean variables — because we're about to overwrite that row and column.
2. Scan the interior (everything except the first row and column). For each `matrix[i][j] == 0`, set `matrix[i][0] = 0` and `matrix[0][j] = 0`. These are now our flags.
3. Scan the interior again. If `matrix[i][0] == 0` or `matrix[0][j] == 0`, zero out `matrix[i][j]`.
4. Finally, if the first row had a zero originally, zero out the entire first row. Same for the first column.
</details>

<details>
<summary>Hint 3 — order matters</summary>

You must do step 3 **before** step 4. If you zero out the first row first, you destroy the markers you need for step 3.
</details>

## Write your solution
→ [`../solutions/22-set-matrix-zeroes.js`](../solutions/22-set-matrix-zeroes.js)

## Follow-ups
- Generalize: "if a cell equals `target`, zero its row and column."
- Instead of zeroing the row and column, set them to a given fill value `f`.
