# Q3 — Balanced Brackets

**Difficulty:** Easy
**Pattern:** Stack — push opens, pop and match closes
**Expected:** O(n) time · O(n) space

## Problem

Given a string containing only the characters `(`, `)`, `[`, `]`, `{`, `}`, determine whether the brackets are balanced.

A string is balanced if:
1. Every opening bracket has a corresponding closing bracket of the **same type**.
2. Brackets are closed in the **correct order** — the most recently opened bracket must be closed first.

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
Input:  "([{}])"
Output: true
```

### Example 4 (invalid — wrong order)
```
Input:  "([)]"
Output: false
```

### Example 5 (invalid — unclosed bracket)
```
Input:  "{"
Output: false
```

### Example 6 (edge cases)
```
Input:  ""   → true
Input:  "]"  → false
```

## Constraints
- `0 <= s.length <= 10^4`
- `s` consists only of `(`, `)`, `[`, `]`, `{`, `}`.

## Hints

<details>
<summary>Hint 1 — why counting isn't enough</summary>

You might think: "count opens and closes — if they match, we're good." But `"([)]"` has 2 opens and 2 closes, yet it's invalid. The **order** matters, not just the count.

This is a nesting problem. The most recently opened bracket must close first. That's exactly what a stack handles.
</details>

<details>
<summary>Hint 2 — the algorithm</summary>

Walk through the string one character at a time:

- Opening bracket (`(`, `[`, `{`)? → **Push** it onto the stack.
- Closing bracket (`)`, `]`, `}`)? →
  - If stack is empty → **return false** (nothing to match against).
  - **Pop** the top. If it doesn't match the current closing bracket → **return false**.
- After the loop: return `stack.length === 0` (true if everything was closed).

What "matches" mean:
- `)` matches `(`
- `]` matches `[`
- `}` matches `{`
</details>

<details>
<summary>Hint 3 — implementing the match check cleanly</summary>

A lookup object makes the match check one line:

```js
const match = { ')': '(', ']': '[', '}': '{' };
```

Then `match[closingBracket]` gives you the expected opening bracket. Compare that to what you pop off the stack.
</details>

## Write your solution
→ [`../solutions/03-balanced-brackets.js`](../solutions/03-balanced-brackets.js)

## Follow-ups
- This problem appears again as Q8 (Valid Parentheses) with the same implementation — the two problems are identical. The real interview version often involves only `()[]{}`.
- Extend the solution to also handle `<` and `>` as bracket pairs.
- What if the input string also contains non-bracket characters (letters, spaces)? Modify the solution to ignore them.
