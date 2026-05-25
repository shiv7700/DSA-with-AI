# Q29 — Basic Calculator III

**Difficulty:** Hard
**Pattern:** Stack — full expression evaluation (precedence + parentheses)
**Expected:** O(n) time · O(n) space

## Problem

Implement a calculator that evaluates a string expression containing:
- Non-negative integers
- `+`, `-`, `*`, `/` operators
- Parentheses `(` and `)`
- Spaces (ignore them)

Integer division truncates toward zero.

This is the combination of Q27 (handles `+`, `-`, parentheses) and Q28 (handles `+`, `-`, `*`, `/` with precedence).

## Examples

### Example 1
```
Input:  "1+2*3"
Output: 7
```

### Example 2
```
Input:  "(2+6*3+5-(3*14/7+2)*5)+3"
Output: -12
```

### Example 3
```
Input:  "2*(5+5*2)/10+(6/2+8)"
Output: 11
```

## Constraints
- `1 <= s.length <= 10^4`
- `s` consists of digits, `+`, `-`, `*`, `/`, `(`, `)`, and spaces.
- Expression is always valid.
- `1 <= |answer| <= 2^31`

## Hints

<details>
<summary>Hint 1 — combine Q27 and Q28</summary>

Q27 handled `(` and `)` with a sign-context stack. Q28 handled `*`/`/` by processing them immediately (high precedence) and deferring `+`/`-` to a stack.

For Q29, combine both: when you see `(`, save the current computation context (the stack and current operator) and start fresh. When you see `)`, finish the inner expression and merge back into the outer context.

This is the hardest combination. If you haven't solved Q27 and Q28 first, go do those.
</details>

<details>
<summary>Hint 2 — recursive approach</summary>

An elegant alternative: write a recursive function that evaluates a subexpression. Use a position pointer `i` passed by reference. When you hit `(`, recurse. When you hit `)` or end of string, return the result.

Inside each call, use the Q28 stack technique for handling `*`/`/` precedence.
</details>

## Write your solution
→ [`../solutions/29-basic-calculator-iii.js`](../solutions/29-basic-calculator-iii.js)

## Follow-ups
- Add support for exponentiation `**` with right-associativity.
- Extend to support floating-point numbers.
- What if the expression could contain variables that map to values in a dictionary?
