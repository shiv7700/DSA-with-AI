# Q27 — Basic Calculator

**Difficulty:** Hard
**Pattern:** Stack — expression parsing with nested parentheses
**Expected:** O(n) time · O(n) space

## Problem

Given a string `s` representing a valid mathematical expression, implement a basic calculator to evaluate it and return the result.

The expression contains:
- Non-negative integers
- `+` and `-` operators
- Parentheses `(` and `)`
- Spaces (ignore them)

You may **not** use any built-in expression evaluation functions.

## Examples

### Example 1
```
Input:  "1 + 1"
Output: 2
```

### Example 2
```
Input:  " 2-1 + 2 "
Output: 3
```

### Example 3
```
Input:  "(1+(4+5+2)-3)+(6+8)"
Output: 23
```

### Example 4
```
Input:  "2-(5-6)"
Output: 3
```

## Constraints
- `1 <= s.length <= 3 × 10^5`
- `s` consists of digits, `+`, `-`, `(`, `)`, and space.
- `s` represents a valid expression.
- The answer fits in a 32-bit integer.

## Hints

<details>
<summary>Hint 1 — the challenge with parentheses</summary>

Parentheses change the "sign" of everything inside them when there's a `-` before the `(`. For example:
`-(5 - 6)` = `-5 + 6` = `1`

The sign inside the parentheses gets **flipped** by the leading `-`. If you nest parentheses, signs can flip multiple times. A stack is natural for tracking the running sign as you enter/exit parentheses.
</details>

<details>
<summary>Hint 2 — the sign-stack approach</summary>

Track a running `result`, a `sign` variable (`+1` or `-1`), and a stack.

When you see `(`: push the **current result** and **current sign** onto the stack, then reset both to start fresh inside the parentheses.

When you see `)`: the inner expression is done. Pop the sign and previous result from the stack, then:
```
result = previousResult + sign * result
```

Numbers add to `result` with the current `sign`. `+` sets `sign = 1`. `-` sets `sign = -1`.
</details>

<details>
<summary>Hint 3 — trace "(1+(4+5+2)-3)"</summary>

```
'(':  push (result=0, sign=+1). Reset: result=0, sign=+1
'1':  result = 0 + 1*1 = 1
'+':  sign = +1
'(':  push (result=1, sign=+1). Reset: result=0, sign=+1
'4':  result = 0 + 1*4 = 4
'+':  sign = +1
'5':  result = 4 + 1*5 = 9
'+':  sign = +1
'2':  result = 9 + 1*2 = 11
')':  pop → prevResult=1, prevSign=+1 → result = 1 + 1*11 = 12
'-':  sign = -1
'3':  result = 12 + (-1)*3 = 9
')':  pop → prevResult=0, prevSign=+1 → result = 0 + 1*9 = 9
Final: 9 ✅  (plus the outer +(6+8)=14 → total 23)
```
</details>

## Write your solution
→ [`../solutions/27-basic-calculator.js`](../solutions/27-basic-calculator.js)

## Follow-ups
- **Basic Calculator II** (Q28) — add `*` and `/`, no parentheses.
- **Basic Calculator III** (Q29) — all four operators plus parentheses.
- How would you add support for unary minus applied to a number (e.g., `-3 + 5`)?
