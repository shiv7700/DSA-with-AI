# Q16 — Power Function (Fast Exponentiation)

**Difficulty:** Medium
**Pattern:** Fast exponentiation (binary exponentiation)
**Expected:** O(log n) time · O(1) space (iterative)

## Problem

Implement `pow(x, n)` — raise `x` to the power `n`.

- `x` is a floating-point number.
- `n` is an integer that may be negative or zero.
- Do **not** use `Math.pow` or the `**` operator.

## Examples

### Example 1
```
Input:  x = 2.0, n = 10
Output: 1024.0
```

### Example 2
```
Input:  x = 2.1, n = 3
Output: 9.261000000000001
```

### Example 3
```
Input:  x = 2.0, n = -2
Output: 0.25
```
2^(-2) = 1 / 2² = 0.25.

### Example 4
```
Input:  x = 0.0, n = 0
Output: 1.0
```
By convention, anything raised to the 0 power is 1.

## Constraints
- `-100.0 < x < 100.0`
- `-2^31 <= n <= 2^31 - 1`
- Either `x != 0` or `n > 0`

## Hints

<details>
<summary>Hint 1 — the squaring trick</summary>

Instead of multiplying `x` by itself `n` times, use:
- If n is even: `x^n = (x^(n/2))^2`
- If n is odd: `x^n = x × x^(n-1)`

This halves the problem size at each step: O(log n) multiplications total.
</details>

<details>
<summary>Hint 2 — handle negative exponents</summary>

`x^(-n) = 1 / x^n`

So if `n < 0`, compute `1 / pow(x, -n)`.

Be careful: `n` can be `-2^31`. If you negate it to get `2^31`, that overflows a 32-bit integer. In JavaScript this isn't an issue (numbers are 64-bit floats), but be aware.
</details>

<details>
<summary>Hint 3 — iterative version (avoids deep recursion)</summary>

```js
function pow(x, n) {
  if (n < 0) { x = 1 / x; n = -n; }
  let result = 1;
  while (n > 0) {
    if (n % 2 === 1) result *= x;
    x *= x;
    n = Math.floor(n / 2);
  }
  return result;
}
```
</details>

## Write your solution
→ [`../solutions/16-power-function.js`](../solutions/16-power-function.js)

## Follow-ups
- How would you compute `x^n mod m` (modular exponentiation)? See Q17.
- What happens with `pow(0, 0)`? Most languages define it as 1.
- What's the minimum number of multiplications needed to compute `x^15`?
