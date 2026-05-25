# Q14 — Evaluate an Infix Expression

**Difficulty:** Medium
**Pattern:** Stack — two-stack direct evaluation
**Expected:** O(n) time · O(n) space

## Problem

Given an infix arithmetic expression string containing non-negative integers, `+`, `-`, `*`, `/`, and parentheses `(` `)`, evaluate it and return the integer result.

Division truncates toward zero. You may assume the input is always valid.

## Examples

### Example 1
```
Input:  "3+5*2"
Output: 13
```

### Example 2
```
Input:  "(3+5)*2"
Output: 16
```

### Example 3
```
Input:  "10+2*6"
Output: 22
```

### Example 4
```
Input:  "100*2+12"
Output: 212
```

## Constraints
- `1 <= expression.length <= 10^5`
- Integers may be multi-digit.
- Expression is always valid.
- Operators: `+`, `-`, `*`, `/`.

## Hints

<details>
<summary>Hint 1 — two approaches</summary>

**Approach A — compose Q13 + Q12:** Convert infix to postfix (Q13), then evaluate the postfix (Q12). This is clean and modular.

**Approach B — two-stack direct evaluation:** Use one stack for numbers and one for operators. Process the expression in one pass. This avoids building an intermediate string.
</details>

<details>
<summary>Hint 2 — the two-stack approach</summary>

Two stacks: `nums` and `ops`.

For each token:
- **Number** → push to `nums`.
- `(` → push to `ops`.
- `)` → apply operators from `ops` to `nums` until you hit `(`, then discard `(`.
- **Operator** → while `ops` is not empty and the top operator has equal or higher precedence (and is not `(`), apply it. Then push the current operator.
- **End** → apply all remaining operators.

"Apply" means: pop two numbers from `nums`, pop one operator from `ops`, compute, push result to `nums`.
</details>

<details>
<summary>Hint 3 — parsing multi-digit numbers</summary>

Characters come in one at a time. To parse a multi-digit number, accumulate digits:

```js
let i = 0;
while (i < s.length) {
  if (/\d/.test(s[i])) {
    let num = 0;
    while (i < s.length && /\d/.test(s[i])) {
      num = num * 10 + Number(s[i]);
      i++;
    }
    nums.push(num);
  } else {
    // handle operator or parenthesis
    i++;
  }
}
```
</details>

## Write your solution
→ [`../solutions/14-evaluate-infix.js`](../solutions/14-evaluate-infix.js)

## Follow-ups
- Q27 and Q28 (Basic Calculator I and II) are variants of this problem with different sets of allowed operators.
- How would you add support for unary minus (e.g., `"-3+5"` = `2`)?
- What would change if the expression could contain variables (like `"x+2*y"`) that you look up in a map?
