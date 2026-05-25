# Q25 — Maximal Rectangle

**Difficulty:** Hard
**Pattern:** Monotonic stack + histogram technique
**Expected:** O(m × n) time · O(n) space

## Problem

Given a `rows × cols` binary matrix `matrix` filled with `'0'`s and `'1'`s, find the **largest rectangle containing only `'1'`s** and return its area.

## Examples

### Example 1
```
Input:
  matrix = [
    ["1","0","1","0","0"],
    ["1","0","1","1","1"],
    ["1","1","1","1","1"],
    ["1","0","0","1","0"]
  ]
Output: 6
```
The largest rectangle of 1s has area 6 (rows 1–2, columns 2–4).

### Example 2
```
Input:  matrix = [["0"]]
Output: 0
```

### Example 3
```
Input:  matrix = [["1"]]
Output: 1
```

## Constraints
- `1 <= rows, cols <= 200`
- `matrix[i][j]` is `'0'` or `'1'`.

## Hints

<details>
<summary>Hint 1 — reduce to the histogram problem</summary>

This problem reduces to running Q24 (Largest Rectangle in Histogram) once per row.

Build a `heights` array: `heights[j]` = how many consecutive `'1'`s exist ending at the current row in column `j`. When `matrix[i][j] === '1'`, `heights[j]++`. When `matrix[i][j] === '0'`, `heights[j] = 0`.

Each row gives a new histogram. Find the largest rectangle in that histogram (Q24). Track the maximum across all rows.
</details>

<details>
<summary>Hint 2 — update heights row by row</summary>

```js
const heights = new Array(cols).fill(0);

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    heights[c] = matrix[r][c] === '1' ? heights[c] + 1 : 0;
  }
  maxArea = Math.max(maxArea, largestRectangleInHistogram(heights));
}
```

`largestRectangleInHistogram` is the function from Q24.
</details>

## Write your solution
→ [`../solutions/25-maximal-rectangle.js`](../solutions/25-maximal-rectangle.js)

## Follow-ups
- What is the time complexity? Can it be solved faster than O(m × n)?
- What if the matrix contained `'2'`s as well, and you wanted the largest rectangle of any single digit?
