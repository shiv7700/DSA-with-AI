# Q18 — Edit Distance

**Difficulty:** Hard
**Pattern:** 2D two-sequence DP — three-operation recurrence
**Expected:** O(m × n) time · O(min(m, n)) space

## Problem

Given two strings `word1` and `word2`, return the **minimum number of operations** to convert `word1` into `word2`.

The allowed operations are:
- **Insert** a character
- **Delete** a character
- **Replace** a character

## Examples

### Example 1
```
Input:  word1 = "horse", word2 = "ros"
Output: 3
```
"horse" → "rorse" (replace 'h' with 'r') → "rose" (delete 'r') → "ros" (delete 'e'). 3 operations.

### Example 2
```
Input:  word1 = "intention", word2 = "execution"
Output: 5
```

### Example 3
```
Input:  word1 = "", word2 = "a"
Output: 1
```

## Constraints
- `0 <= word1.length, word2.length <= 500`
- `word1` and `word2` consist of lowercase English letters.

## Hints

<details>
<summary>Hint 1 — define the state</summary>

`dp[i][j]` = minimum edit distance between `word1[0..i-1]` and `word2[0..j-1]`.

Base cases:
- `dp[0][j] = j` (insert `j` characters to build `word2[0..j-1]` from empty)
- `dp[i][0] = i` (delete `i` characters to reduce `word1[0..i-1]` to empty)
</details>

<details>
<summary>Hint 2 — the recurrence</summary>

If `word1[i-1] === word2[j-1]`: no operation needed.
  `dp[i][j] = dp[i-1][j-1]`

Otherwise, take the cheapest of three operations:
  `dp[i][j] = 1 + min(`
  `  dp[i-1][j],      // delete from word1`
  `  dp[i][j-1],      // insert into word1 (= delete from word2)`
  `  dp[i-1][j-1]     // replace`
  `)`
</details>

<details>
<summary>Hint 3 — understanding the operations visually</summary>

Imagine filling the table for "cat" → "cut":
- `dp[i-1][j]`: we've matched `word1[0..i-2]` with `word2[0..j-1]`, and we delete `word1[i-1]`.
- `dp[i][j-1]`: we've matched `word1[0..i-1]` with `word2[0..j-2]`, and we insert `word2[j-1]`.
- `dp[i-1][j-1]`: we replace `word1[i-1]` with `word2[j-1]`.
</details>

## Write your solution
→ [`../solutions/18-edit-distance.js`](../solutions/18-edit-distance.js)

## Follow-ups
- Reconstruct the actual sequence of edits.
- **One Edit Distance** — check in O(n) whether two strings are exactly one edit apart.
- **Delete Operation for Two Strings** — minimum total deletions to make two strings equal.
