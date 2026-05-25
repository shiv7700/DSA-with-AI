# Q13 — Infix to Postfix Conversion

**Difficulty:** Medium
**Pattern:** Stack — shunting-yard algorithm
**Expected:** O(n) time · O(n) space

## Problem

Given an infix expression string (e.g., `"3+4*2"`) containing single-digit integers and the operators `+`, `-`, `*`, `/`, and parentheses `(`, `)`, convert it to a postfix (RPN) expression string.

Operator precedence:
- `*` and `/` have higher precedence than `+` and `-`.
- All operators are left-associative (evaluated left to right when at the same level).
- Parentheses override precedence as usual.

## Examples

### Example 1
```
Input:  "3+4*2"
Output: "342*+"
```
Explanation: `3 + (4 * 2)` → `3 4 2 * +`

### Example 2
```
Input:  "(3+4)*2"
Output: "34+2*"
```

### Example 3
```
Input:  "1+2*3-4/2"
Output: "123*+42/-"
```

### Example 4 (nested parentheses)
```
Input:  "((2+3)*4)+5"
Output: "23+4*5+"
```

## Constraints
- Input contains only single-digit numbers, `+`, `-`, `*`, `/`, `(`, `)`.
- The expression is always valid.
- No spaces in the input.

## Hints

<details>
<summary>Hint 1 — the shunting-yard algorithm (overview)</summary>

Maintain two things:
- An **output list** — builds the postfix expression as tokens.
- An **operator stack** — holds operators and `(` temporarily.

Rules:
1. **Number** → add to output.
2. `(` → push to operator stack.
3. `)` → pop operators to output until `(`, then discard the `(`.
4. **Operator** → while the stack's top operator has equal or higher precedence (and is not `(`), pop it to output. Then push the current operator.
5. **End of tokens** → pop all remaining operators to output.
</details>

<details>
<summary>Hint 2 — implementing precedence</summary>

A simple precedence lookup:

```js
const prec = { '+': 1, '-': 1, '*': 2, '/': 2 };
```

"Higher precedence" means a higher number. Before pushing an operator `op`, pop everything from the stack with `prec[stack.top()] >= prec[op]`.
</details>

<details>
<summary>Hint 3 — trace through "3+4*2"</summary>

```
Token   Output        Op Stack    Notes
──────────────────────────────────────────
'3'     [3]           []          number → output
'+'     [3]           [+]         push +
'4'     [3,4]         [+]         number → output
'*'     [3,4]         [+,*]       prec(*) > prec(+), so just push *
'2'     [3,4,2]       [+,*]       number → output
End     [3,4,2,*,+]   []          drain: pop *, then +
```
Output: `"342*+"` ✅
</details>

## Write your solution
→ [`../solutions/13-infix-to-postfix.js`](../solutions/13-infix-to-postfix.js)

## Follow-ups
- Extend to support multi-digit numbers and spaces between tokens.
- Add support for right-associative operators (e.g., exponentiation `^`). For right-associative operators, only pop when the stack top has **strictly higher** precedence (not equal).
- Chain Q13 and Q12 together: a full infix expression calculator.
