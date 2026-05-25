# Q28 — Triangle

**Difficulty:** Medium
**Pattern:** 2D → 1D DP — minimum path top to bottom
**Expected:** O(n²) time · O(n) space

## Problem

Given a triangular array of integers `triangle`, find the minimum path sum from top to bottom. At each step, you may move to an **adjacent** element on the row below (element `j` on row `i` is adjacent to elements `j` and `j+1` on row `i+1`).

## Examples

### Example 1
```
Input:
triangle = [
     [2],
    [3, 4],
   [6, 5, 7],
  [4, 1, 8, 3]
]
Output: 11
```
Path: 2 → 3 → 5 → 1. Sum = 11.

### Example 2
```
Input:
triangle = [[-10]]
Output: -10
```

## Constraints
- `1 <= triangle.length <= 200`
- `triangle[i].length == i + 1`
- `-10^4 <= triangle[i][j] <= 10^4`

## Hints

<details>
<summary>Hint 1 — fill bottom-up</summary>

Start from the bottom row. For each cell on the second-to-last row, add the minimum of the two adjacent cells below. Propagate upward until you reach the top.
</details>

<details>
<summary>Hint 2 — the bottom-up recurrence</summary>

Let `dp` be a copy of the last row. For each row above (from second-to-last up to row 0):

`dp[j] = triangle[row][j] + min(dp[j], dp[j+1])`

After processing all rows, `dp[0]` is the answer.
</details>

<details>
<summary>Hint 3 — space optimization</summary>

You only need the dp array for one row at a time (updating in place). Use a single array of length `n` (where `n` = number of rows) initialized with the last row.
</details>

## Write your solution
→ [`../solutions/28-triangle-minimum-path.js`](../solutions/28-triangle-minimum-path.js)

## Follow-ups
- Return the actual path (sequence of indices), not just the minimum sum.
- What is the maximum path sum? (Change `min` to `max`.)
