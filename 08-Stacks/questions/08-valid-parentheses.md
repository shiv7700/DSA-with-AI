# Q8 — Valid Parentheses

**Difficulty:** Medium (classic interview question)
**Pattern:** Stack — push opens, pop and match closes
**Expected:** O(n) time · O(n) space

## Problem

Given a string `s` containing only the characters `(`, `)`, `[`, `]`, `{`, `}`, return `true` if the input string is valid.

A string is valid if:
1. Open brackets are closed by the same type of brackets.
2. Open brackets are closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

> **Why this is a classic:** This exact problem appears on LeetCode (problem #20) and is asked in virtually every company's screening interview. It's simple enough to code in 15 lines, but tests whether you immediately reach for a stack when you see "matching" and "nesting".

## Examples

### Example 1
```
Input:  "()"
Output: true
```

### Example 2
```
Input:  "()[]{}"
Output: true
```

### Example 3
```
Input:  "([])"
Output: true
```

### Example 4 (wrong order)
```
Input:  "([)]"
Output: false
```

### Example 5 (unclosed bracket)
```
Input:  "([{}"
Output: false
```

### Example 6 (starts with close)
```
Input:  "]"
Output: false
```

## Constraints
- `1 <= s.length <= 10^4`
- `s` consists only of `(`, `)`, `[`, `]`, `{`, `}`.

## Hints

<details>
<summary>Hint 1 — the core insight</summary>

Why does this need a stack and not just counters?

Consider `"([)]"`: 2 opens, 2 closes, both types present. But the `[` is closed by `)` before `[` is closed — that's wrong. Simple counting can't detect this.

The rule is: the **most recently opened** bracket must be the next to close. That's LIFO — a stack.
</details>

<details>
<summary>Hint 2 — the algorithm</summary>

```
stack = []
match = { ')': '(', ']': '[', '}': '{' }

for each character ch in s:
  if ch is an opening bracket:
    push ch onto stack
  else (ch is a closing bracket):
    if stack is empty:
      return false           ← nothing to match against
    if stack.pop() !== match[ch]:
      return false           ← mismatched types

return stack.length === 0    ← true only if everything was closed
```
</details>

<details>
<summary>Hint 3 — early termination optimisation</summary>

A small but clean optimisation: if the string has an **odd length**, it can never be balanced (brackets always pair up). Return `false` immediately. This isn't required to pass, but it's a nice touch to mention in an interview.
</details>

## Write your solution
→ [`../solutions/08-valid-parentheses.js`](../solutions/08-valid-parentheses.js)

## Follow-ups
- **Minimum add to make parentheses valid** — given a string of `(` and `)`, find the minimum number of brackets to add to make it valid.
- **Longest valid parentheses** — longest contiguous valid bracket substring (Q30, Hard).
- How would you modify this to return the position of the first mismatched bracket instead of just true/false?
