# Q17 — Longest Common Subsequence

**Difficulty:** Medium
**Pattern:** 2D subsequence DP — two-sequence tabulation
**Expected:** O(m × n) time · O(min(m, n)) space

## Problem

Given two strings `text1` and `text2`, return the length of their **longest common subsequence** (LCS). If there is no common subsequence, return `0`.

A subsequence is formed by deleting characters without changing the relative order of the remaining characters.

## Examples

### Example 1
```
Input:  text1 = "abcde", text2 = "ace"
Output: 3
```
The LCS is "ace".

### Example 2
```
Input:  text1 = "abc", text2 = "abc"
Output: 3
```
The LCS is "abc".

### Example 3
```
Input:  text1 = "abc", text2 = "def"
Output: 0
```
No common subsequence.

## Constraints
- `1 <= text1.length, text2.length <= 1000`
- `text1` and `text2` consist only of lowercase English letters.

## Hints

<details>
<summary>Hint 1 — define the state</summary>

`dp[i][j]` = the length of the LCS of `text1[0..i-1]` and `text2[0..j-1]`. The table is `(m+1) × (n+1)` with `dp[0][j] = 0` and `dp[i][0] = 0` (LCS with an empty string is 0).
</details>

<details>
<summary>Hint 2 — the recurrence</summary>

If `text1[i-1] === text2[j-1]`:
  `dp[i][j] = dp[i-1][j-1] + 1`   — characters match, extend

Otherwise:
  `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`  — skip one character from either string
</details>

<details>
<summary>Hint 3 — trace a small example</summary>

text1 = "ace", text2 = "abcde":

```
     ""  a  b  c  d  e
  ""  0  0  0  0  0  0
  a   0  1  1  1  1  1
  c   0  1  1  2  2  2
  e   0  1  1  2  2  3
```

Answer: 3.
</details>

<details>
<summary>Hint 4 — space optimization</summary>

`dp[i][j]` only depends on `dp[i-1][j-1]`, `dp[i-1][j]`, and `dp[i][j-1]` — the previous row and the current row. Use two 1D arrays (or even one with careful bookkeeping).
</details>

## Write your solution
→ [`../solutions/17-longest-common-subsequence.js`](../solutions/17-longest-common-subsequence.js)

## Follow-ups
- Reconstruct the actual LCS string, not just its length.
- **Edit Distance** (Q18) — builds on the same 2D DP table structure.
- **Longest Common Substring** — a stricter version where the common part must be contiguous.
