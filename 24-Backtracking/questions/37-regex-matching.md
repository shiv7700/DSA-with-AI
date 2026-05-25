# Q37 — Regular Expression Matching

**Difficulty:** Hard
**Pattern:** Backtracking / DP — match with `.` wildcard and `*` repetition operator
**Expected:** O(m · n) time · O(m · n) space (DP); O(m · n) backtracking with memo

## Problem

Given an input string `s` and a pattern `p`, implement regular expression matching with support for `'.'` and `'*'` where:
- `'.'` matches any single character.
- `'*'` matches zero or more of the preceding element.

The matching must cover the **entire** input string (not partial).

## Examples

### Example 1
```
Input:  s = "aa", p = "a"
Output: false
```
`"a"` does not match the full string `"aa"`.

### Example 2
```
Input:  s = "aa", p = "a*"
Output: true
```
`'*'` means zero or more of `'a'` — so `"a*"` matches `"aa"`.

### Example 3
```
Input:  s = "ab", p = ".*"
Output: true
```
`".*"` means zero or more of any character.

### Example 4
```
Input:  s = "aab", p = "c*a*b"
Output: true
```
`c*` matches zero `c`s, `a*` matches two `a`s, `b` matches `b`.

## Constraints
- `1 <= s.length <= 20`
- `1 <= p.length <= 30`
- `s` contains only lowercase English letters.
- `p` contains only lowercase English letters, `'.'`, and `'*'`.
- It is guaranteed for each occurrence of `'*'`, there will be a previous valid character to match.

## Hints

<details>
<summary>Hint 1 — handle the * case by lookahead</summary>

When you see a `*` at `p[j+1]`, you have two choices: (1) skip the pattern element entirely (use `*` as "zero occurrences") and advance `j` by 2; (2) if the current characters match, stay on the same pattern element (use `*` as "one more occurrence") and advance `i` by 1.
</details>

<details>
<summary>Hint 2 — single character match</summary>

Without `*`, `p[j]` matches `s[i]` if `p[j] === s[i]` or `p[j] === '.'`. After a match, advance both `i` and `j`.
</details>

<details>
<summary>Hint 3 — memoize (i, j) pairs</summary>

The backtracking can revisit the same `(i, j)` pairs. Cache the result for each `(i, j)` in a 2D array or Map to avoid exponential blowup. This converts O(exponential) to O(m · n).
</details>

## Write your solution
→ [`../solutions/37-regex-matching.js`](../solutions/37-regex-matching.js)

## Follow-ups
- **Wildcard Matching** — a simpler variant where `*` matches any sequence (no preceding element needed).
- Convert the memoized recursive solution to a bottom-up DP table.
- What changes if `+` (one or more) and `?` (zero or one) are also supported?
