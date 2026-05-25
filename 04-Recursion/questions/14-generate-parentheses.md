# Q14 — Generate Parentheses

**Difficulty:** Medium
**Pattern:** Backtracking with constraints — track open/close counts
**Expected:** O(4^n / √n) time (Catalan number) · O(n) space (call stack)

## Problem

Given `n` pairs of parentheses, write a recursive function `generateParentheses(n)` that returns all combinations of **well-formed** (valid) parentheses.

A combination is well-formed if every open parenthesis has a matching close parenthesis in the correct order.

> **Why this problem?** It's the perfect step-up from Q13 (binary strings). The structure is the same — choose `'('` or `')'` at each position — but now you have **constraints**. This is where backtracking thinking really starts: you don't explore paths you know will fail.

## Examples

### Example 1
```
Input:  n = 1
Output: ["()"]
```

### Example 2
```
Input:  n = 2
Output: ["(())", "()()"]
```

### Example 3
```
Input:  n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
```
(5 combinations — the 3rd Catalan number)

## Constraints
- `1 <= n <= 8`
- Return only unique, valid combinations.
- Order doesn't matter.

## Hints

<details>
<summary>Hint 1 — when can you add each bracket?</summary>

Think about it this way. You're building a string one character at a time. You have:
- `open`: how many `'('` you've placed so far
- `close`: how many `')'` you've placed so far

Rules:
- You can add `'('` as long as `open < n` (you haven't used up all your open brackets).
- You can add `')'` as long as `close < open` (you can't close what isn't open).

When `open === n` and `close === n`, you have a valid combination — add it to the result.
</details>

<details>
<summary>Hint 2 — the recursive structure</summary>

```js
function helper(current, open, close, n, result) {
  // base case
  if (current.length === 2 * n) {
    result.push(current);
    return;
  }
  // add '(' if we still have some to use
  if (open < n) {
    helper(current + '(', open + 1, close, n, result);
  }
  // add ')' if we have unclosed '('s
  if (close < open) {
    helper(current + ')', open, close + 1, n, result);
  }
}
```
</details>

<details>
<summary>Hint 3 — trace for n=2</summary>

```
helper("",  0, 0, 2)
├── add '(' → helper("(",   1, 0, 2)
│   ├── add '(' → helper("((", 2, 0, 2)
│   │   └── add ')' → helper("(()", 2, 1, 2)
│   │       └── add ')' → helper("(())", 2, 2, 2) → push "(())"
│   └── add ')' → helper("()", 1, 1, 2)
│       └── add '(' → helper("()(", 2, 1, 2)
│           └── add ')' → helper("()()", 2, 2, 2) → push "()()"
```

Output: ["(())", "()()"] ✅
</details>

<details>
<summary>Hint 4 — why no "undo" step here?</summary>

In this solution we use string concatenation (`current + '('`), so each recursive call gets its own copy of the string. There's no shared mutable state to undo. This is a valid style when the string is short. For large inputs, using an array and pushing/popping is more memory efficient.
</details>

## Write your solution
→ [`../solutions/14-generate-parentheses.js`](../solutions/14-generate-parentheses.js)

## Follow-ups
- LeetCode 22: **Generate Parentheses** — exact same problem.
- Validate a string of parentheses (Q from Stacks chapter): given an arbitrary string, return true if it's a valid sequence. How is validation different from generation?
- Extend to three types of brackets: `()`, `[]`, `{}`. Much harder — requires tracking each type separately.
