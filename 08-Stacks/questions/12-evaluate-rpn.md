# Q12 — Evaluate Reverse Polish Notation

**Difficulty:** Medium
**Pattern:** Stack — postfix expression evaluation
**Expected:** O(n) time · O(n) space

## Problem

Evaluate the value of an arithmetic expression in **Reverse Polish Notation (RPN)** (also called postfix notation).

Valid operators are `+`, `-`, `*`, and `/`. Each operand can be an integer or another expression. Division between two integers should **truncate toward zero**.

It is guaranteed the expression is valid — no division by zero, and the expression always evaluates to a value.

> **Reminder from notes:** In RPN, the operator comes after its operands. `3 4 +` means `3 + 4 = 7`. `5 1 2 + 4 * + 3 -` means `5 + ((1 + 2) * 4) - 3 = 14`.

## Examples

### Example 1
```
Input:  ["2", "1", "+", "3", "*"]
Output: 9
```
Explanation: `(2 + 1) * 3 = 9`

### Example 2
```
Input:  ["4", "13", "5", "/", "+"]
Output: 6
```
Explanation: `4 + (13 / 5) = 4 + 2 = 6`  (13/5 truncates to 2)

### Example 3
```
Input:  ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]
Output: 22
```

## Constraints
- `1 <= tokens.length <= 10^4`
- `tokens[i]` is either an operator (`+`, `-`, `*`, `/`) or an integer in the range `[-200, 200]`.
- The expression is always valid.

## Hints

<details>
<summary>Hint 1 — the algorithm (from notes Lesson 10)</summary>

Walk through tokens left to right:
- **Number token** → push onto stack.
- **Operator token** → pop two numbers (`b` then `a`), apply operator, push result.

At the end, the single value on the stack is your answer.
</details>

<details>
<summary>Hint 2 — operand order matters for subtraction and division</summary>

When you pop: the **first** value popped is `b` (right operand), the **second** is `a` (left operand).

```
stack before '*' operation: [..., 3, 4]  (4 is on top)
b = pop() → 4
a = pop() → 3
result = a * b = 3 * 4 = 12
```

For subtraction: `a - b` (not `b - a`). For division: `a / b`. Easy to get backwards — be careful.
</details>

<details>
<summary>Hint 3 — integer division truncating toward zero</summary>

JavaScript's `/` gives floating-point results. To truncate toward zero (not floor):

```js
Math.trunc(a / b)
```

This differs from `Math.floor` only for negative numbers:
- `Math.floor(-7 / 2)` = `Math.floor(-3.5)` = `-4`
- `Math.trunc(-7 / 2)` = `Math.trunc(-3.5)` = `-3`  ← what the problem wants

Use `Math.trunc`.
</details>

## Write your solution
→ [`../solutions/12-evaluate-rpn.js`](../solutions/12-evaluate-rpn.js)

## Follow-ups
- Implement the reverse: given an infix expression, convert it to RPN (Q13 — Infix to Postfix).
- Add support for exponentiation (`^`) with right-to-left associativity.
- Extend to handle floating-point numbers in the token list.
