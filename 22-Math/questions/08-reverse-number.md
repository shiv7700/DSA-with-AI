# Q8 — Reverse a Number

**Difficulty:** Easy
**Pattern:** Digit extraction with modulo
**Expected:** O(log n) time · O(1) space

## Problem

Given a 32-bit signed integer `x`, return `x` with its digits reversed.

If reversing `x` causes the value to go outside the 32-bit signed integer range `[-2^31, 2^31 - 1]`, return `0`.

**Do not convert to a string** — extract digits using arithmetic.

## Examples

### Example 1
```
Input:  x = 123
Output: 321
```

### Example 2
```
Input:  x = -456
Output: -654
```

### Example 3
```
Input:  x = 120
Output: 21
```
Leading zeros in the reversed number are dropped.

### Example 4 (overflow)
```
Input:  x = 1534236469
Output: 0
```
9646324351 > 2^31 - 1 = 2147483647.

## Constraints
- `-2^31 <= x <= 2^31 - 1`

## Hints

<details>
<summary>Hint 1 — extracting the last digit</summary>

`x % 10` gives you the last digit of `x`.
`Math.trunc(x / 10)` removes the last digit.

Keep extracting digits one by one and build the reversed number by multiplying the running result by 10 and adding the new digit.
</details>

<details>
<summary>Hint 2 — handling negatives</summary>

`-123 % 10` in JavaScript is `-3` (sign follows the dividend). You can handle this naturally: the negative sign just carries through. Work with `Math.abs(x)` and reapply the sign at the end, or let JavaScript's `%` behavior handle it directly.
</details>

<details>
<summary>Hint 3 — overflow check</summary>

In JavaScript, `Number` doesn't overflow the way 32-bit integers do. But the problem asks you to simulate 32-bit signed overflow. Before returning, check:

```js
const MAX = 2 ** 31 - 1;
const MIN = -(2 ** 31);
if (reversed > MAX || reversed < MIN) return 0;
```
</details>

## Write your solution
→ [`../solutions/08-reverse-number.js`](../solutions/08-reverse-number.js)

## Follow-ups
- What if the number is in base 16 (hexadecimal)?
- How would you reverse only the digits between position `i` and `j`?
