# Q17 — Number of Submatrices That Sum to Target (LeetCode 1074)

**Difficulty:** Hard
**Pattern:** 2D prefix sums + hash map (BIT not required but can be used)
**Expected:** O(m² * n) time · O(m * n) space

## Problem

This is [LeetCode 1074 — Number of Submatrices That Sum to Target](https://leetcode.com/problems/number-of-submatrices-that-sum-to-target/).

Given a `matrix` and a `target`, return the number of non-empty submatrices that sum to `target`.

A submatrix is defined by choosing two row boundaries `r1 <= r2` and two column boundaries `c1 <= c2`, and includes all cells `(r, c)` with `r1 <= r <= r2` and `c1 <= c <= c2`.

## Examples

### Example 1

```
Input:
matrix = [[0,  1,  0],
          [1,  1,  1],
          [0,  1,  0]]
target = 0

Output: 4

The four zero-sum submatrices are the single cells (0,0), (0,2), (2,0), (2,2).
```

### Example 2

```
Input:
matrix = [[1, -1],
          [-1, 1]]
target = 0

Output: 5
```

### Example 3

```
Input:
matrix = [[904]]
target = 0

Output: 0
```

## Constraints

- `1 <= matrix.length, matrix[0].length <= 100`
- `-1000 <= matrix[i][j] <= 1000`
- `-10^8 <= target <= 10^8`

## Hints

<details>
<summary>Hint 1 — reduce to 1D subarray sum</summary>

Fix two row boundaries `r1` and `r2`. Then for each column `c`, compute the column sum `colSum[c] = matrix[r1][c] + ... + matrix[r2][c]`. Now the problem becomes: how many contiguous subarrays of `colSum` sum to `target`? That's the 1D "Subarray Sum Equals K" problem (solved with a prefix-sum + hash map in O(n)).

Iterating over all pairs `(r1, r2)` is O(m²), and for each pair the 1D pass is O(n). Total: O(m² * n).

</details>

<details>
<summary>Hint 2 — precompute 2D prefix sums</summary>

To quickly get `colSum[c]` for any `(r1, r2)` range, precompute a 2D prefix sum matrix `pre` where `pre[r][c] = sum of matrix[0..r-1][0..c-1]`. Then:

```
colSum[c] for rows [r1..r2] = pre[r2+1][c+1] - pre[r1][c+1]
```

Building `pre` is O(m * n) and each row-range column sum retrieval is O(1).

</details>

<details>
<summary>Hint 3 — the 1D subarray sum step</summary>

For each fixed `(r1, r2)`, walk through columns. Maintain a running sum of `colSum[0..c]`. Use a `Map` from prefix-sum value to count to find how many previous prefix sums equal `currentSum - target`. This is the same technique as LeetCode 560 — Subarray Sum Equals K.

</details>

## Write your solution

→ [`../solutions/17-submatrices-sum-target.js`](../solutions/17-submatrices-sum-target.js)

## Follow-ups

- Can you use the 2D BIT from Q15 for this problem? (You could, but the hash-map approach is simpler here because there are no updates.)
- What would change if updates were allowed — i.e., you had to answer this query after each update?
- For the 1D version (LeetCode 560 — Subarray Sum Equals K), can you write it as a warm-up?
