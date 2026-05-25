# Q16 — Flood Fill

**Difficulty:** Medium
**Pattern:** BFS (or DFS) from a starting cell, spreading to same-colored neighbors
**Expected:** O(m × n) time · O(m × n) space

## Problem

You are given an `m × n` image represented as a 2D integer array `image`, where `image[r][c]` is the color of the pixel at position `(r, c)`. You are also given three integers `sr`, `sc`, and `color`.

Perform a **flood fill** starting from pixel `(sr, sc)`:
1. Color pixel `(sr, sc)` with `color`.
2. Color any pixel connected (4-directionally) to `(sr, sc)` that has the **same original color** as `(sr, sc)`.
3. Color any pixels connected to those pixels (same original color), and so on.

Return the modified image.

**Signature:**
```js
function floodFill(image, sr, sc, color) { ... }
```

## Examples

### Example 1
```
Input:  image = [[1,1,1],[1,1,0],[1,0,1]], sr=1, sc=1, color=2

 Before:           After:
 [1, 1, 1]         [2, 2, 2]
 [1, 1, 0]   →    [2, 2, 0]
 [1, 0, 1]         [2, 0, 1]
```
The `1` at (2,2) is not connected to (1,1) because the `0`s at (1,2) and (2,1) block the path.

### Example 2
```
Input:  image = [[0,0,0],[0,0,0]], sr=0, sc=0, color=0
Output: [[0,0,0],[0,0,0]]
```
The starting pixel already has the target color — no change needed.

## Constraints
- `1 <= m, n <= 50`
- `0 <= image[i][j], color <= 2^16`
- `0 <= sr < m`, `0 <= sc < n`

## Hints

<details>
<summary>Hint 1 — the edge case to watch for</summary>

If the original color of `(sr, sc)` is already equal to `color`, return early. Otherwise your BFS will loop infinitely (every cell you color to `color` looks like it has the new color and you'd keep re-adding it to the queue).
</details>

<details>
<summary>Hint 2 — BFS approach</summary>

Save `originalColor = image[sr][sc]`. Color `(sr, sc)` with `color`. Enqueue `(sr, sc)`.

BFS: dequeue `(r, c)`. For each of the 4 neighbors: if in bounds and `image[neighbor] === originalColor`, color it to `color` and enqueue it.
</details>

## Write your solution
→ [`../solutions/16-flood-fill.js`](../solutions/16-flood-fill.js)

## Follow-ups
- Implement the DFS version using recursion.
- **8-directional flood fill**: also spread to diagonal neighbors.
- This is exactly the "paint bucket" tool in image editors. How would you implement multi-color gradients with flood fill?
