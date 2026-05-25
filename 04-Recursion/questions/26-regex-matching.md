# Q26 — Regular Expression Matching (Recursive Version)

**Difficulty:** Hard
**Pattern:** Recursion with memoization — case-split on pattern character type
**Expected:** O(m × n) time with memo · O(m × n) space

## Problem

Given an input string `s` and a pattern `p`, implement regular expression matching supporting only two special characters:
- `'.'` — matches any single character.
- `'*'` — matches zero or more of the preceding element.

The match must cover the **entire** input string (not partial).

> **Why this problem?** It's one of the hardest "pure recursion" problems. The `'*'` operator introduces branching: zero occurrences or one or more. Working through this problem gives you deep confidence with recursive case-splitting. With memoization added, it becomes a textbook DP problem.

## Examples

### Example 1
```
Input:  s = "aa",  p = "a"
Output: false
```
"a" matches only one 'a', not two.

### Example 2
```
Input:  s = "aa",  p = "a*"
Output: true
```
`'a*'` matches zero or more 'a' → matches "aa".

### Example 3
```
Input:  s = "ab",  p = ".*"
Output: true
```
`".*"` matches any sequence.

### Example 4
```
Input:  s = "aab",  p = "c*a*b"
Output: true
```
`'c*'` matches zero 'c's, `'a*'` matches two 'a's, `'b'` matches 'b'.

## Constraints
- `1 <= s.length <= 20`
- `1 <= p.length <= 30`
- `s` contains only lowercase letters.
- `p` contains only lowercase letters, `'.'`, and `'*'`.
- Every `'*'` is preceded by a valid character or `'.'`.

## Hints

<details>
<summary>Hint 1 — base cases</summary>

1. If the pattern is empty, the string must also be empty. Return `s.length === 0`.
2. The first character matches if: `s[0] === p[0]` or `p[0] === '.'` (and `s` is non-empty).
</details>

<details>
<summary>Hint 2 — the star case is the tricky one</summary>

If `p[1] === '*'`, you have two choices:
1. **Use zero occurrences** of `p[0]`: skip the `p[0]*` pattern entirely → recurse on `isMatch(s, p.slice(2))`.
2. **Use one or more occurrences** of `p[0]`: the first char of `s` must match `p[0]`, then try to match the rest of `s` with the same pattern `p` (because `*` allows unlimited repetition) → recurse on `isMatch(s.slice(1), p)`.

Only do option 2 if the first characters match.
</details>

<details>
<summary>Hint 3 — the non-star case</summary>

If `p[1] !== '*'` (no star following the current pattern char):
- The first characters must match (either `s[0] === p[0]` or `p[0] === '.'`).
- Then match the rest: `isMatch(s.slice(1), p.slice(1))`.

```js
function isMatch(s, p) {
  if (p.length === 0) return s.length === 0;

  const firstMatch = s.length > 0 && (p[0] === s[0] || p[0] === '.');

  if (p.length >= 2 && p[1] === '*') {
    // zero uses of p[0]*  OR  one+ uses (if first char matches)
    return isMatch(s, p.slice(2)) || (firstMatch && isMatch(s.slice(1), p));
  } else {
    return firstMatch && isMatch(s.slice(1), p.slice(1));
  }
}
```
</details>

<details>
<summary>Hint 4 — memoization (required for larger inputs)</summary>

The state is `(i, j)` — current position in `s` and `p`. There are `m × n` unique states. Cache them:

```js
const memo = {};
function isMatch(s, p) {
  const key = `${s}|${p}`;
  if (key in memo) return memo[key];

  if (p.length === 0) return s.length === 0;
  const firstMatch = s.length > 0 && (p[0] === s[0] || p[0] === '.');

  let result;
  if (p.length >= 2 && p[1] === '*') {
    result = isMatch(s, p.slice(2)) || (firstMatch && isMatch(s.slice(1), p));
  } else {
    result = firstMatch && isMatch(s.slice(1), p.slice(1));
  }
  memo[key] = result;
  return result;
}
```
</details>

## Write your solution
→ [`../solutions/26-regex-matching.js`](../solutions/26-regex-matching.js)

## Follow-ups
- LeetCode 10: **Regular Expression Matching** — exact same problem.
- LeetCode 44: **Wildcard Matching** — similar but `'*'` matches any sequence (not "zero or more of the preceding"). Slightly simpler.
- Convert your memoized solution to a bottom-up 2D DP table.
