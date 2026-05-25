# Q28 — Basic Calculator II

**Difficulty:** Hard
**Pattern:** Stack — operator precedence without parentheses
**Expected:** O(n) time · O(n) space

## Problem

Given a string `s` representing a valid mathematical expression, implement a calculator to evaluate it and return the result.

The expression contains:
- Non-negative integers
- `+`, `-`, `*`, `/` operators
- Spaces (ignore them)
- **No parentheses**

Integer division should truncate toward zero.

## Examples

### Example 1
```
Input:  "3+2*2"
Output: 7
```

### Example 2
```
Input:  " 3/2 "
Output: 1
```

### Example 3
```
Input:  " 3+5 / 2 "
Output: 5
```
(3 + 2 = 5, because 5/2 = 2 truncated)

## Constraints
- `1 <= s.length <= 3 × 10^5`
- `s` consists of digits, `+`, `-`, `*`, `/`, and spaces.
- `s` represents a valid expression.
- All integers in the expression are non-negative.
- The answer fits in a 32-bit integer.

## Hints

<details>
<summary>Hint 1 — the precedence problem</summary>

`3 + 2 * 2` is `7`, not `10`. You need to evaluate `*` and `/` before `+` and `-`. This requires knowing what comes next before committing to an operation.

Key insight: when you encounter an operator, you don't yet know the second operand. When you get the next number, you apply the previous operator.
</details>

<details>
<summary>Hint 2 — defer low-precedence operations</summary>

Use a stack. Instead of computing immediately:
- For `*` and `/`: compute right away with the previous number (they're high-precedence — no need to wait).
- For `+` and `-`: push a **signed** value onto the stack and defer addition to the end.

At the end, sum up everything on the stack.

```
Process "3+2*2":
  see 3, prevOp='+': push +3.   stack: [3]
  see 2, prevOp='+': push +2.   stack: [3, 2]
  see 2, prevOp='*': pop 2, compute 2*2=4, push 4. stack: [3, 4]
  Sum stack: 3+4 = 7 ✅
```
</details>

<details>
<summary>Hint 3 — code structure</summary>

Walk through the string. Accumulate multi-digit numbers. Track `prevOp`. When you hit an operator (or end of string), process the accumulated number with `prevOp`:

```js
if (prevOp === '+') stack.push(num);
else if (prevOp === '-') stack.push(-num);
else if (prevOp === '*') stack.push(stack.pop() * num);
else stack.push(Math.trunc(stack.pop() / num));
```

Then set `prevOp` to the new operator and reset `num`.
</details>

## Write your solution
→ [`../solutions/28-basic-calculator-ii.js`](../solutions/28-basic-calculator-ii.js)

## Follow-ups
- **Basic Calculator III** (Q29) — combine this with Q27 to handle both precedence and parentheses.
- What changes if you allow unary minus (e.g., `-3 * 2`)?
