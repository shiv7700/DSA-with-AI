# Q22 — Regular Expression Matching

**Difficulty:** Hard
**Pattern:** Dynamic programming (2D DP table)
**Expected:** O(m · n) time · O(m · n) space  (m = |s|, n = |p|)

## Problem

Given an input string `s` and a pattern `p`, implement regular expression matching with support for **`.`** and **`*`** only.

- `.` matches **any single character**.
- `*` matches **zero or more** of the **preceding element**.

The matching must cover the **entire** input string (not partial matching).

> **Note:** `*` always follows another character or `.` — it never appears at the start or consecutively (no `**`).

## Examples

### Example 1
```
Input:  s = 'aa',   p = 'a'
Output: false
```
The pattern `'a'` only matches one `'a'`, not two.

### Example 2
```
Input:  s = 'aa',   p = 'a*'
Output: true
```
`'a*'` means "zero or more `a`s" — it matches `'aa'`.

### Example 3
```
Input:  s = 'ab',   p = '.*'
Output: true
```
`'.*'` means "zero or more of any character" — it matches anything.

### Example 4
```
Input:  s = 'aab',  p = 'c*a*b'
Output: true
```
`'c*'` matches zero `c`s. `'a*'` matches two `a`s. `'b'` matches `'b'`.

### Example 5
```
Input:  s = 'mississippi',  p = 'mis*is*p*.'
Output: false
```

## Constraints
- `1 <= s.length <= 20`
- `1 <= p.length <= 30`
- `s` contains only lowercase English letters.
- `p` contains only lowercase English letters, `'.'`, and `'*'`.
- It is guaranteed that for each occurrence of `'*'`, there is a valid preceding element.

## Hints

<details>
<summary>Hint 1 — define the subproblem</summary>

Define `dp[i][j]` = `true` if `s[0..i-1]` matches `p[0..j-1]`.

Base case: `dp[0][0] = true` (empty string matches empty pattern).

For the first row (empty string vs non-empty pattern): a pattern like `'a*b*c*'` can match an empty string if all pairs are of the form `X*`.
</details>

<details>
<summary>Hint 2 — filling the table</summary>

For each cell `dp[i][j]`:

1. **If `p[j-1]` is a regular character or `'.'`:**
   - `dp[i][j] = dp[i-1][j-1] && (p[j-1] === s[i-1] || p[j-1] === '.')`

2. **If `p[j-1]` is `'*'`:**
   - The `*` can match **zero** occurrences of the previous character: `dp[i][j] = dp[i][j-2]`
   - The `*` can match **one or more**: `dp[i][j] |= dp[i-1][j] && (p[j-2] === s[i-1] || p[j-2] === '.')`
</details>

<details>
<summary>Hint 3 — recursive approach with memoization (alternative)</summary>

If the DP table feels hard to set up directly, start with recursion:

```js
function isMatch(s, p, i = 0, j = 0, memo = {}) {
  const key = `${i},${j}`;
  if (key in memo) return memo[key];

  if (j === p.length) return i === s.length;

  const firstMatch = i < s.length && (p[j] === '.' || p[j] === s[i]);

  let result;
  if (j + 1 < p.length && p[j + 1] === '*') {
    result = isMatch(s, p, i, j + 2, memo) ||          // zero occurrences
             (firstMatch && isMatch(s, p, i + 1, j, memo)); // one+ occurrences
  } else {
    result = firstMatch && isMatch(s, p, i + 1, j + 1, memo);
  }

  return (memo[key] = result);
}
```
</details>

## Write your solution
→ [`../solutions/22-regex-matching.js`](../solutions/22-regex-matching.js)

## Follow-ups
- **Wildcard Matching** — similar problem but `'*'` matches any sequence of characters (not tied to the preceding element). How does the DP change?
- How does JavaScript's built-in `RegExp` engine handle `.*` matching? Is it backtracking, NFA, or DFA based?
- Why is this problem O(m · n) with DP but potentially exponential with naive backtracking (without memoization)?
- Extend the pattern language to support `+` (one or more) and `?` (zero or one). What new DP cases do you need?
