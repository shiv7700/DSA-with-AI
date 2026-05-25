# Q12 — Generate Parentheses

**Difficulty:** Medium
**Pattern:** Backtracking — pruning with open/close counts
**Expected:** O(4^n / sqrt(n)) time · O(n) space

## Problem

Given `n` pairs of parentheses, write a function to generate all combinations of well-formed (valid) parentheses strings. A well-formed string has every opening parenthesis matched by a closing parenthesis in the correct order.

## Examples

### Example 1
```
Input:  n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
```
All five valid arrangements of 3 pairs of parentheses.

### Example 2
```
Input:  n = 1
Output: ["()"]
```

## Constraints
- `1 <= n <= 8`

## Hints

<details>
<summary>Hint 1 — two counters, not a character pool</summary>

Track how many opening parentheses (`open`) and closing parentheses (`close`) you have placed so far. At each step, you may add `(` if `open < n`, and you may add `)` if `close < open`. These two rules guarantee every partial string is valid.
</details>

<details>
<summary>Hint 2 — base case</summary>

When both `open === n` and `close === n`, you've placed all `2n` characters and the string is complete. Record it.
</details>

<details>
<summary>Hint 3 — why this produces only valid strings</summary>

Allowing `)` only when `close < open` means you never close a parenthesis that wasn't opened. Allowing `(` only when `open < n` means you never place more openers than the budget allows. Together, these conditions make every string you build valid by construction — no post-filtering needed.
</details>

## Write your solution
→ [`../solutions/12-generate-parentheses.js`](../solutions/12-generate-parentheses.js)

## Follow-ups
- **Valid Parentheses** — given a string, check if it is valid (Stack problem, O(n)).
- **Remove Invalid Parentheses** — remove the minimum number of parentheses to make a string valid.
- Extend to multiple bracket types: `()`, `[]`, `{}`.
