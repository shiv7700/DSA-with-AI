# Q34 — Expression Add Operators

**Difficulty:** Hard
**Pattern:** Backtracking — insert +, -, * between digits, track running value and last term
**Expected:** O(4^n · n) time · O(n) space

## Problem

Given a string `num` that contains only digits and an integer `target`, return all possibilities to insert the binary operators `'+'`, `'-'`, or `'*'` between the digits of `num` so that the resultant expression evaluates to the `target` value. Operators must go **between** digits; you cannot place an operator before the first digit or after the last.

Note: Operands in the returned expressions should not contain leading zeros. `"105"` can be `"1*0+5"` or `"10-5"` but not `"1*05"`.

## Examples

### Example 1
```
Input:  num = "123", target = 6
Output: ["1+2+3","1*2*3"]
```

### Example 2
```
Input:  num = "232", target = 8
Output: ["2+3*2","2*3+2"]
```
`2 + 3*2 = 2 + 6 = 8` and `2*3 + 2 = 6 + 2 = 8`.

### Example 3
```
Input:  num = "3456237490", target = 9191
Output: []
```

## Constraints
- `1 <= num.length <= 10`
- `num` consists of only digits.
- `-2^31 <= target <= 2^31 - 1`

## Hints

<details>
<summary>Hint 1 — backtrack on split positions</summary>

At each position, try taking a number of digits as the next operand (1 to remaining digits). Then try attaching it with `+`, `-`, or `*` (or no operator for the very first operand).
</details>

<details>
<summary>Hint 2 — tracking the running total and last term</summary>

Evaluating a running expression left-to-right is straightforward for `+` and `-`, but `*` has higher precedence. To handle this, track both the current total (`eval`) and the last term added (`mult`). When you encounter `*`, undo the last addition: `eval - mult + mult * newNum`. For `+`: `eval + newNum` with `mult = newNum`. For `-`: `eval - newNum` with `mult = -newNum`.
</details>

<details>
<summary>Hint 3 — no leading zeros rule</summary>

If the current number token starts with `'0'` and has more than one digit, skip it — it is an invalid operand with a leading zero.
</details>

## Write your solution
→ [`../solutions/34-expression-add-operators.js`](../solutions/34-expression-add-operators.js)

## Follow-ups
- **24 Game** — similar operator insertion but with exactly four numbers and parentheses allowed.
- **Different Ways to Add Parentheses** — enumerate all expression evaluation results.
- If `'^'` (exponentiation) is also allowed, how does the tracking change?
