# Q23 — Edit Distance (Levenshtein Distance)

**Difficulty:** Hard
**Pattern:** Dynamic programming (2D DP table)
**Expected:** O(m · n) time · O(m · n) space (can be reduced to O(min(m,n)) space)

## Problem

Given two strings `word1` and `word2`, return the **minimum number of operations** required to convert `word1` into `word2`.

You are allowed three operations, each counting as 1:
1. **Insert** a character at any position.
2. **Delete** a character at any position.
3. **Replace** a character with another character.

> **Real-world use:** edit distance is the algorithm behind spell checkers, diff tools (like `git diff`), DNA sequence alignment, and autocorrect features. When your phone suggests the word you almost typed, it's often using a variant of this.

## Examples

### Example 1
```
Input:  word1 = 'horse',  word2 = 'ros'
Output: 3
```
- `horse` → `rorse` (replace `h` with `r`)
- `rorse` → `rose`  (delete `r`)
- `rose`  → `ros`   (delete `e`)

### Example 2
```
Input:  word1 = 'intention',  word2 = 'execution'
Output: 5
```

### Example 3 (edge cases)
```
Input:  word1 = '',       word2 = 'abc'   →  3  (insert 3 characters)
Input:  word1 = 'abc',    word2 = ''      →  3  (delete 3 characters)
Input:  word1 = 'abc',    word2 = 'abc'   →  0  (already equal)
Input:  word1 = 'a',      word2 = 'b'    →  1  (replace)
```

## Constraints
- `0 <= word1.length, word2.length <= 500`
- `word1` and `word2` consist of lowercase English letters.

## Hints

<details>
<summary>Hint 1 — define the subproblem</summary>

Let `dp[i][j]` = minimum edit distance between `word1[0..i-1]` and `word2[0..j-1]`.

Base cases:
- `dp[i][0] = i` — converting `word1[0..i-1]` to an empty string requires `i` deletions.
- `dp[0][j] = j` — converting an empty string to `word2[0..j-1]` requires `j` insertions.
</details>

<details>
<summary>Hint 2 — the recurrence</summary>

For each cell `dp[i][j]`:

If `word1[i-1] === word2[j-1]` (characters match):
```
dp[i][j] = dp[i-1][j-1]   // no operation needed
```

If they don't match:
```
dp[i][j] = 1 + min(
  dp[i-1][j],    // delete from word1
  dp[i][j-1],    // insert into word1
  dp[i-1][j-1]   // replace in word1
)
```

Read the three options as:
- `dp[i-1][j]` — we deleted `word1[i-1]`, so now we need to convert `word1[0..i-2]` to `word2[0..j-1]`.
- `dp[i][j-1]` — we inserted `word2[j-1]` at the end of `word1[0..i-1]`, now we need `word2[0..j-2]`.
- `dp[i-1][j-1]` — we replaced `word1[i-1]` with `word2[j-1]`, now both prefixes are matched.
</details>

<details>
<summary>Hint 3 — space optimization</summary>

You only need the **previous row** to compute the current row. This reduces space from O(m · n) to O(min(m, n)) by processing the shorter word along the column dimension. For the initial implementation, the full 2D table is fine.
</details>

## Write your solution
→ [`../solutions/23-edit-distance.js`](../solutions/23-edit-distance.js)

## Follow-ups
- Return the **sequence of operations** (not just the count) that achieves the minimum edit distance. (Hint: backtrack through the DP table.)
- **Restricted Edit Distance**: only allow insertions and deletions (no replacements). How does the recurrence change?
- What is the edit distance between `'kitten'` and `'sitting'`? Work it out by hand using the DP table.
- How is edit distance used in biological sequence alignment? What are "gap penalties"?
