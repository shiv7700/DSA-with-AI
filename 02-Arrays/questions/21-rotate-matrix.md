# Q21 — Rotate Matrix by 90°

**Difficulty:** Medium
**Pattern:** Transpose + reverse rows · or layer-by-layer 4-way swap
**Expected:** O(n²) time · O(1) extra space

## Problem

You are given an `n × n` 2D matrix that represents an image. **Rotate the image by 90 degrees clockwise**, in place. You must **not** allocate a second 2D matrix.

## Examples

### Example 1
```
Input:
[[1, 2, 3],
 [4, 5, 6],
 [7, 8, 9]]

Output:
[[7, 4, 1],
 [8, 5, 2],
 [9, 6, 3]]
```

### Example 2
```
Input:
[[ 5,  1,  9, 11],
 [ 2,  4,  8, 10],
 [13,  3,  6,  7],
 [15, 14, 12, 16]]

Output:
[[15, 13,  2,  5],
 [14,  3,  4,  1],
 [12,  6,  8,  9],
 [16,  7, 10, 11]]
```

### Example 3 (edge case)
```
Input:  [[1]]
Output: [[1]]
```

## Constraints
- `1 <= n <= 20`
- Square matrix only.
- Rotate in place — no second matrix allowed.

## Hints

<details>
<summary>Hint 1 — the cleanest approach: transpose + reverse rows</summary>

A 90° clockwise rotation is equivalent to two simpler operations:
1. **Transpose** the matrix (swap across the main diagonal — every `m[i][j]` is swapped with `m[j][i]`).
2. **Reverse each row.**

Both steps are in place and run in O(n²). Total: O(n²).
</details>

<details>
<summary>Hint 2 — the transpose pitfall</summary>

When transposing, only swap pairs where `j > i`. If you loop over **every** `(i, j)` pair, you'll swap each pair twice — which cancels out and gives you the original matrix back.
</details>

<details>
<summary>Hint 3 — alternative: 4-way swap in layers</summary>

You can also rotate in concentric "rings". For each ring, pick four positions related by 90° rotation and rotate their values:
```
top    = m[i][j]
m[i][j]              = m[n-1-j][i]
m[n-1-j][i]          = m[n-1-i][n-1-j]
m[n-1-i][n-1-j]      = m[j][n-1-i]
m[j][n-1-i]          = top
```

It's correct but easy to get the indexes wrong. The transpose-then-reverse approach is cleaner.
</details>

## Write your solution
→ [`../solutions/21-rotate-matrix.js`](../solutions/21-rotate-matrix.js)

## Follow-ups
- Rotate by **180°** — reverse rows, then reverse columns (or do two 90° rotations).
- Rotate by **90° counter-clockwise** — transpose, then reverse each column (or: reverse each row, then transpose).
- A non-square matrix can't be rotated in place — explain why.
