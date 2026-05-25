# Q7 — Sum of Digits of a Number

**Difficulty:** Easy
**Pattern:** Linear recursion — peel off one digit at a time
**Expected:** O(d) time · O(d) space — where d is the number of digits

## Problem

Write a recursive function `sumDigits(n)` that returns the sum of all digits of the non-negative integer `n`.

For example, `sumDigits(1234) = 1 + 2 + 3 + 4 = 10`.

> **Why this problem?** It practises peeling off "one piece" of a number recursively — the same thinking you'd use on strings or arrays. The trick is using `%` and `Math.floor()` to split off the last digit.

## Examples

### Example 1
```
Input:  n = 1234
Output: 10
```

### Example 2
```
Input:  n = 9999
Output: 36
```

### Example 3 (edge cases)
```
Input:  n = 0    → 0
Input:  n = 7    → 7
```

### Example 4
```
Input:  n = 12345
Output: 15
```

## Constraints
- `0 <= n <= 10^9`
- Use recursion (no loops).
- You may assume `n` is always a non-negative integer.

## Hints

<details>
<summary>Hint 1 — identify the base case</summary>

What is a number so small that its digit sum is trivially the number itself?

If `n` has only one digit (0 through 9), the sum of its digits is just `n`.

Base case: `if (n < 10) return n;`
</details>

<details>
<summary>Hint 2 — how to peel off the last digit</summary>

In JavaScript:
- `n % 10` gives you the **last digit** of `n`. (e.g., `1234 % 10 = 4`)
- `Math.floor(n / 10)` removes the last digit. (e.g., `Math.floor(1234 / 10) = 123`)

Recursive case: the last digit is `n % 10`, and the rest of the digits sum to `sumDigits(Math.floor(n / 10))`.

```
sumDigits(n) = (n % 10) + sumDigits(Math.floor(n / 10))
```
</details>

<details>
<summary>Hint 3 — trace it for n = 123</summary>

```
sumDigits(123)
  = (123 % 10) + sumDigits(12)
  = 3 + sumDigits(12)
  = 3 + ((12 % 10) + sumDigits(1))
  = 3 + (2 + sumDigits(1))
  = 3 + (2 + 1)        ← base case: sumDigits(1) = 1
  = 3 + 3
  = 6
```
</details>

## Write your solution
→ [`../solutions/07-sum-digits.js`](../solutions/07-sum-digits.js)

## Follow-ups
- Write the iterative version. Which is cleaner?
- **Digital root:** keep applying `sumDigits` until you have a single digit. `digitalRoot(9999)` → `sumDigits(9999) = 36` → `sumDigits(36) = 9`. Write a recursive `digitalRoot(n)`.
- Product of digits: write `productDigits(n)` using the same recursive structure.
