# Q19 — Perfect Squares

**Difficulty:** Medium
**Pattern:** BFS on implicit graph (each number is a node, edges go to n - perfect_square) OR dynamic programming
**Expected:** O(n × √n) time · O(n) space

## Problem

Given an integer `n`, return the **minimum number of perfect square numbers** that sum to `n`.

A perfect square is an integer that is the square of another integer: `1, 4, 9, 16, 25, ...`

**Signature:**
```js
function numSquares(n) { ... }
```

## Examples

### Example 1
```
Input:  n = 12
Output: 3
(12 = 4 + 4 + 4)
```

### Example 2
```
Input:  n = 13
Output: 2
(13 = 4 + 9)
```

### Example 3
```
Input:  n = 1
Output: 1
(1 = 1)
```

### Example 4
```
Input:  n = 4
Output: 1
(4 = 4)
```

## Constraints
- `1 <= n <= 10^4`

## Hints

<details>
<summary>Hint 1 — the BFS perspective</summary>

Think of the numbers `0..n` as nodes in a graph. From node `x`, you have edges to `x - 1`, `x - 4`, `x - 9`, `x - 16`, ... (all `x - k²` where `k² <= x`).

You want the shortest path from `n` to `0`. Or equivalently, from `0` to `n`. BFS on this graph gives the shortest path, which equals the minimum number of perfect squares.
</details>

<details>
<summary>Hint 2 — BFS implementation</summary>

Start with `0` in the queue (or `n`, depending on direction). Use a `visited` array of size `n+1` to avoid re-processing. When you reach `n` (or `0`), the BFS depth is your answer.

Each BFS step: for each perfect square `sq <= current`, try `current + sq` (or `current - sq`). If in range and unvisited, enqueue.
</details>

<details>
<summary>Hint 3 — dynamic programming alternative</summary>

`dp[i]` = minimum squares summing to `i`.

```
dp[0] = 0
dp[i] = 1 + min(dp[i - sq])  for all perfect squares sq <= i
```

Build up from `i = 1` to `n`. Both BFS and DP give the same result — the BFS approach is a good exercise in thinking about numbers as graphs.
</details>

## Write your solution
→ [`../solutions/19-perfect-squares.js`](../solutions/19-perfect-squares.js)

## Follow-calls
- Implement both the BFS approach and the DP approach. Compare their runtime on `n = 10000`.
- **Lagrange's four-square theorem** guarantees the answer is always ≤ 4. Can you verify this experimentally?
- How does this problem relate to the "coin change" problem?
