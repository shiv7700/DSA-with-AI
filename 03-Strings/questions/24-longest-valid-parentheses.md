# Q24 — Longest Valid Parentheses

**Difficulty:** Hard
**Pattern:** Stack · or dynamic programming · or two-pass counting
**Expected:** O(n) time · O(n) space (stack/DP) · O(1) space (two-pass)

## Problem

Given a string `s` containing only `'('` and `')'`, return the length of the **longest valid (well-formed) parentheses substring**.

A valid parentheses string is one where every `'('` is matched by a `')'` in the correct order and every `')'` is matched by a `'('`.

> **This is harder than Q14 (Valid Parentheses)** because here you're not just checking validity — you're finding the longest contiguous valid portion within a larger, potentially invalid string.

## Examples

### Example 1
```
Input:  '(()'
Output: 2
```
The longest valid substring is `'()'` (length 2).

### Example 2
```
Input:  ')()())'
Output: 4
```
The longest valid substring is `'()()'` (length 4). The leading `')'` and trailing `')'` are unmatched.

### Example 3
```
Input:  ''
Output: 0
```

### Example 4
```
Input:  '()()'
Output: 4
```
The entire string is valid.

### Example 5
```
Input:  '(())'
Output: 4
```

## Constraints
- `0 <= s.length <= 3 * 10^4`
- `s` contains only `'('` and `')'`.

## Hints

<details>
<summary>Hint 1 — stack approach</summary>

Use a stack that stores **indexes** (not characters). Initialize it with `-1` (a sentinel base index for calculating lengths).

Walk through the string:
- If `s[i] === '('`: push index `i`.
- If `s[i] === ')'`:
  - Pop from the stack.
  - If the stack is now **empty**: push `i` as the new base index.
  - Otherwise: the current valid length is `i - stack.top`. Update the maximum.

```js
const stack = [-1];
let maxLen = 0;
for (let i = 0; i < s.length; i++) {
  if (s[i] === '(') {
    stack.push(i);
  } else {
    stack.pop();
    if (stack.length === 0) stack.push(i);
    else maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
  }
}
return maxLen;
```
</details>

<details>
<summary>Hint 2 — DP approach</summary>

Define `dp[i]` = length of the longest valid parentheses substring **ending at index `i`**.

If `s[i] === '('`: `dp[i] = 0` (a valid string can't end with an open bracket).

If `s[i] === ')'`:
- If `s[i-1] === '('`: `dp[i] = dp[i-2] + 2` (extends a previous valid string).
- If `s[i-1] === ')'` and `dp[i-1] > 0`: look at `j = i - dp[i-1] - 1`. If `s[j] === '('`: `dp[i] = dp[i-1] + 2 + dp[j-1]`.
</details>

<details>
<summary>Hint 3 — two-pass O(1) space approach</summary>

Count `left` and `right` as you scan left-to-right:
- Increment `left` for `'('`, `right` for `')'`.
- When `left === right`: valid length is `2 * right`. Update max.
- When `right > left`: reset both to 0 (too many close brackets).

Then repeat the scan right-to-left (resetting when `left > right`). This catches the case where there are excess open brackets.
</details>

## Write your solution
→ [`../solutions/24-longest-valid-parentheses.js`](../solutions/24-longest-valid-parentheses.js)

## Follow-ups
- Return the actual longest valid parentheses substring, not just its length.
- **Minimum Add to Make Parentheses Valid** — what is the minimum number of brackets to insert to make the whole string valid?
- Extend to three types of brackets: `()`, `[]`, `{}`. Does the O(1) space solution still work?
- What is the time and space complexity of each of the three approaches?
