# Q14 — Valid Parentheses

**Difficulty:** Medium
**Pattern:** Stack
**Expected:** O(n) time · O(n) space

## Problem

Given a string `s` containing only the characters `'('`, `')'`, `'{'`, `'}'`, `'['`, and `']'`, determine if the input string is **valid**.

A string is valid if:
1. Every open bracket is closed by the **same type** of bracket.
2. Every open bracket is closed in the **correct order** (inner brackets must be closed before outer brackets).
3. Every close bracket has a corresponding open bracket.

## Examples

### Example 1
```
Input:  '()'
Output: true
```

### Example 2
```
Input:  '()[]{}'
Output: true
```

### Example 3
```
Input:  '(]'
Output: false
```

### Example 4
```
Input:  '([)]'
Output: false
```
The brackets are interleaved — `[` is opened inside `(` but closed after `)`. That's not valid.

### Example 5
```
Input:  '{[]}'
Output: true
```

### Example 6 (edge cases)
```
Input:  ''       →  true    (empty string — no violations)
Input:  '('      →  false   (unmatched open bracket)
Input:  ')'      →  false   (close without matching open)
```

## Constraints
- `0 <= s.length <= 10^4`
- `s` consists only of parentheses characters: `()[]{}`.

## Hints

<details>
<summary>Hint 1 — why a stack?</summary>

Brackets must be closed in **last-in, first-out** order. The most recently opened bracket must be the first to be closed. That's exactly what a stack provides.

When you see an open bracket: push it onto the stack.
When you see a close bracket: check if the top of the stack is the matching open bracket.
</details>

<details>
<summary>Hint 2 — the matching map</summary>

Create a map from each closing bracket to its expected opening bracket:

```js
const matchFor = { ')': '(', ']': '[', '}': '{' };
```

When you encounter `')'`, you need `'('` to be on top of the stack.
</details>

<details>
<summary>Hint 3 — the algorithm</summary>

```
stack = []

for each char c in s:
  if c is an open bracket ('(', '[', '{'):
    push c onto stack
  else (c is a close bracket):
    if stack is empty → return false   (nothing to match)
    if stack.top !== matchFor[c] → return false   (wrong type)
    pop from stack

return stack.length === 0   (all opens were matched)
```
</details>

## Write your solution
→ [`../solutions/14-valid-parentheses.js`](../solutions/14-valid-parentheses.js)

## Follow-ups
- **Longest Valid Parentheses** (Q24) — find the length of the longest valid (well-formed) parentheses substring.
- **Minimum Add to Make Parentheses Valid** — find the minimum number of `'('` or `')'` characters to add to make a string valid.
- **Remove Invalid Parentheses** — remove the minimum number of parentheses to make the string valid; return all possible results.
- What if the string could also contain non-bracket characters? Would you skip them, or return false?
