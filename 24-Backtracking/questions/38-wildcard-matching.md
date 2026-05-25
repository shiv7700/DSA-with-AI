# Q38 — Wildcard Matching

**Difficulty:** Hard
**Pattern:** Backtracking / DP — `?` matches one char, `*` matches any sequence
**Expected:** O(m · n) time · O(m · n) space (DP)

## Problem

Given an input string `s` and a pattern `p`, implement wildcard pattern matching with support for `'?'` and `'*'` where:
- `'?'` matches any single character.
- `'*'` matches any sequence of characters (including the empty sequence).

The matching must cover the **entire** input string.

## Examples

### Example 1
```
Input:  s = "aa", p = "a"
Output: false
```

### Example 2
```
Input:  s = "aa", p = "*"
Output: true
```
`'*'` matches the entire string.

### Example 3
```
Input:  s = "cb", p = "?a"
Output: false
```
`'?'` matches `'c'`, but `'a'` does not match `'b'`.

### Example 4
```
Input:  s = "adceb", p = "*a*b"
Output: true
```

## Constraints
- `0 <= s.length, p.length <= 2000`
- `s` contains only lowercase English letters.
- `p` contains only lowercase English letters, `'?'`, and `'*'`.

## Hints

<details>
<summary>Hint 1 — simpler than regex: * matches any sequence, no preceding element</summary>

Unlike regex `'*'`, wildcard `'*'` is independent — it matches any number of any characters. When you encounter `*` in `p`, try using it to match 0 characters (advance `j`), 1 character (advance `i`), or stay (advance `i` and let `*` potentially match more).
</details>

<details>
<summary>Hint 2 — DP formulation</summary>

Define `dp[i][j] = true` if `s[0..i-1]` matches `p[0..j-1]`. Transitions:
- If `p[j-1]` is a letter: `dp[i][j] = dp[i-1][j-1] && s[i-1] === p[j-1]`.
- If `p[j-1]` is `?`: `dp[i][j] = dp[i-1][j-1]` (matches any single char).
- If `p[j-1]` is `*`: `dp[i][j] = dp[i][j-1] || dp[i-1][j]` (empty match or one-more-char match).
</details>

<details>
<summary>Hint 3 — base cases</summary>

`dp[0][0] = true`. `dp[0][j] = true` only if `p[0..j-1]` is all `*` characters (each matches empty string). `dp[i][0] = false` for `i > 0` (non-empty string cannot match empty pattern).
</details>

## Write your solution
→ [`../solutions/38-wildcard-matching.js`](../solutions/38-wildcard-matching.js)

## Follow-ups
- **Regular Expression Matching** — harder variant where `*` modifies the preceding element.
- Can you solve this in O(m · n) time with O(min(m, n)) space using a rolling array?
- Implement a backtracking solution first, then compare with the DP approach on long inputs.
