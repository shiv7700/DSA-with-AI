# Q11 — Decode Ways

**Difficulty:** Medium
**Pattern:** 1D linear DP — conditional transitions, careful base cases
**Expected:** O(n) time · O(1) space

## Problem

A string of digits can be decoded by mapping `'1'` → `'A'`, `'2'` → `'B'`, ..., `'26'` → `'Z'`. Given a string `s` containing only digits, return the **total number of ways** to decode it.

If no valid decoding exists, return `0`.

## Examples

### Example 1
```
Input:  s = "12"
Output: 2
```
"12" can decode as "AB" (1, 2) or "L" (12).

### Example 2
```
Input:  s = "226"
Output: 3
```
"226" → "BZ" (2, 26), "VF" (22, 6), "BBF" (2, 2, 6).

### Example 3
```
Input:  s = "06"
Output: 0
```
"06" has a leading zero — `'06'` cannot map to `'F'` because it's not `'6'`.

## Constraints
- `1 <= s.length <= 100`
- `s` contains only digits.
- `s` may contain leading zeros.

## Hints

<details>
<summary>Hint 1 — define dp[i]</summary>

`dp[i]` = number of ways to decode the first `i` characters of `s`. `dp[0] = 1` (one way to decode the empty string: do nothing). `dp[1] = 1` if `s[0] !== '0'`, else `0`.
</details>

<details>
<summary>Hint 2 — the one-digit transition</summary>

The character `s[i-1]` alone (one digit) is a valid encoding if it is not `'0'`. If valid, add `dp[i-1]` to `dp[i]`.
</details>

<details>
<summary>Hint 3 — the two-digit transition</summary>

The substring `s[i-2..i-1]` (two digits) is a valid encoding if the two-digit number is between 10 and 26 inclusive. If valid, add `dp[i-2]` to `dp[i]`.
</details>

<details>
<summary>Hint 4 — zero handling is the tricky part</summary>

- `'0'` alone is never valid (no letter maps to 0).
- `'30'`, `'40'`, ..., `'90'` are not valid two-digit codes.
- `'10'` and `'20'` are valid two-digit codes.
- Any `s[i-1] === '0'` means the single-digit transition is blocked entirely.
</details>

## Write your solution
→ [`../solutions/11-decode-ways.js`](../solutions/11-decode-ways.js)

## Follow-ups
- **Decode Ways II** — `'*'` can represent any digit `'1'` through `'9'`. How does the recurrence change?
- Return all actual decodings (not just the count) — this becomes a backtracking problem.
