# Q36 — Remove Invalid Parentheses

**Difficulty:** Hard
**Pattern:** BFS (or backtracking) — find minimum removals to produce valid parentheses strings
**Expected:** O(2^n) time · O(n) space

## Problem

Given a string `s` that contains parentheses and letters, remove the minimum number of invalid parentheses to make the input string valid. Return a list of all unique results. You may return the answer in any order.

## Examples

### Example 1
```
Input:  s = "()())()"
Output: ["(())()", "()()()"]
```
One removal is enough; both results use the same number of removals.

### Example 2
```
Input:  s = "(a)())()"
Output: ["(a)()()", "(a())()"]
```

### Example 3
```
Input:  s = ")("
Output: [""]
```
Removing both gives the empty string — the only valid result.

## Constraints
- `1 <= s.length <= 25`
- `s` consists of lowercase English letters and parentheses `'('` and `')'`.
- There will be at most 20 parentheses in `s`.

## Hints

<details>
<summary>Hint 1 — BFS levels correspond to removal counts</summary>

BFS level 0 = the original string. Level 1 = all strings with one character removed. Level 2 = two removals, and so on. The first BFS level that contains at least one valid string gives the minimum removal count and all optimal results.
</details>

<details>
<summary>Hint 2 — validity check</summary>

A string is a valid parenthesization if you can scan it left-to-right tracking a counter: increment for `(`, decrement for `)`. If the counter goes negative at any point, it is invalid. A valid string has a counter of 0 at the end.
</details>

<details>
<summary>Hint 3 — backtracking alternative</summary>

Compute the number of misplaced `(` and `)` upfront (call them `leftRem` and `rightRem`). Then use backtracking: at each index, try keeping the character or removing it (only if it's a parenthesis and you have remaining removals of that type). Prune with validity tracking.
</details>

## Write your solution
→ [`../solutions/36-remove-invalid-parentheses.js`](../solutions/36-remove-invalid-parentheses.js)

## Follow-ups
- **Generate Parentheses** — the reverse problem: generate all valid strings.
- **Minimum Add to Make Parentheses Valid** — add characters instead of removing them.
- Return only the lexicographically smallest valid result.
