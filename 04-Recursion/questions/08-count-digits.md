# Q8 — Count Digits of a Number

**Difficulty:** Easy
**Pattern:** Linear recursion — peel off one digit at a time
**Expected:** O(d) time · O(d) space — where d is the number of digits

## Problem

Write a recursive function `countDigits(n)` that returns the number of digits in the non-negative integer `n`.

For example, `countDigits(1234) = 4` because `1234` has four digits.

> **Why this problem?** It's very similar to Q7 (sum of digits) — same "peel off one digit" structure — but the combination step is different. Good repetition of the pattern with a small twist.

## Examples

### Example 1
```
Input:  n = 1234
Output: 4
```

### Example 2
```
Input:  n = 0
Output: 1
```
Zero has exactly one digit.

### Example 3
```
Input:  n = 1000000
Output: 7
```

### Example 4
```
Input:  n = 9
Output: 1
```

## Constraints
- `0 <= n <= 10^9`
- Use recursion (no loops, no `String(n).length` trick).
- Special case: treat `0` as having 1 digit.

## Hints

<details>
<summary>Hint 1 — identify the base case</summary>

When does a number have exactly one digit? When it's between 0 and 9 (inclusive).

Base case: `if (n < 10) return 1;`

This handles 0–9. Note: 0 correctly returns 1.
</details>

<details>
<summary>Hint 2 — the recursive case</summary>

Removing the last digit with `Math.floor(n / 10)` gives you a number with one fewer digit.

So: total digits = 1 (the digit you just "peeled") + digits in the remaining number.

```
countDigits(n) = 1 + countDigits(Math.floor(n / 10))
```
</details>

<details>
<summary>Hint 3 — trace it for n = 4567</summary>

```
countDigits(4567)
  = 1 + countDigits(456)
  = 1 + (1 + countDigits(45))
  = 1 + (1 + (1 + countDigits(4)))
  = 1 + (1 + (1 + 1))     ← base case: countDigits(4) = 1
  = 1 + (1 + 2)
  = 1 + 3
  = 4
```
</details>

## Write your solution
→ [`../solutions/08-count-digits.js`](../solutions/08-count-digits.js)

## Follow-ups
- Write the same function iteratively with a `while` loop. Compare them — are they equally simple?
- The non-recursive mathematical shortcut: `Math.floor(Math.log10(n)) + 1` for `n > 0`. Why does this formula work?
- Extend `countDigits` to work in different bases. For example, `countDigitsBase(255, 16)` should return `2` (because 255 in hex is `FF` — two digits).
