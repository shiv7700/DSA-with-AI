# Q13 — Pow(x, n) — Fast Exponentiation

**Difficulty:** Medium
**Pattern:** Divide and Conquer — halve the exponent each call
**Expected:** O(log n) time · O(log n) space

## Problem

Implement `pow(x, n)`, which calculates `x` raised to the power `n` (i.e., x^n).

Rules:
- `n` can be negative (x^(-n) = 1 / x^n).
- Do **not** use the built-in `Math.pow` or the `**` operator.
- Your solution must be O(log n) — not O(n).

## Examples

### Example 1
```
Input:  x = 2.00000, n = 10
Output: 1024.00000
```

### Example 2
```
Input:  x = 2.10000, n = 3
Output: 9.26100
```

### Example 3 (negative exponent)
```
Input:  x = 2.00000, n = -2
Output: 0.25000
```
Because 2^(-2) = 1/(2^2) = 1/4 = 0.25.

### Example 4 (edge cases)
```
Input:  x = 1.0,  n = 2147483647   →  1.0
Input:  x = 2.0,  n = 0            →  1.0
```

## Constraints

- `-100.0 < x < 100.0`
- `-2^31 <= n <= 2^31 - 1`
- The result is guaranteed to fit in a 64-bit floating-point number.
- Time: O(log|n|).

## Hints

<details>
<summary>Hint 1 — the key insight (repeated squaring)</summary>

Instead of multiplying x by itself n times, use the fact that:

- If n is **even**: x^n = (x^(n/2))²  → one recursive call, one multiplication.
- If n is **odd**: x^n = x · (x^(n-1)) → reduce to even case in one step.

```
x^8 = (x^4)²           ← 1 call
x^4 = (x^2)²           ← 1 call
x^2 = (x^1)²           ← 1 call
x^1 = x                ← base case

Total: 3 multiplications instead of 7.
```
</details>

<details>
<summary>Hint 2 — handling negative n</summary>

x^(-n) = 1 / x^n.

If `n < 0`, compute `myPow(x, -n)` and return `1 / result`.

Watch out: if n is `Number.MIN_SAFE_INTEGER`, negating it overflows in some languages. In JavaScript with floating-point n this is fine, but be aware of the pattern.
</details>

<details>
<summary>Hint 3 — code structure</summary>

```js
function myPow(x, n) {
  if (n === 0) return 1;
  if (n < 0)   return 1 / myPow(x, -n);
  if (n % 2 === 0) {
    const half = myPow(x, n / 2);
    return half * half;
  }
  return x * myPow(x, n - 1);
}
```

(An alternative for odd n: `x * myPow(x * x, Math.floor(n / 2))` avoids the extra recursive call.)
</details>

## Write your solution

→ [`../solutions/13-pow-x-n.js`](../solutions/13-pow-x-n.js)

## Follow-ups

- Rewrite **iteratively** using the binary representation of n. At each bit position, decide whether to include that power of x.
- This technique is used in **modular exponentiation** (fast computation of x^n mod p), which is the core of RSA encryption. Why does performing all arithmetic mod p matter for security?
- What is the time complexity if n is negative? Does the sign of n affect the number of recursive calls?
