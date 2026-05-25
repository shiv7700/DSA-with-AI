# Q17 — Modular Exponentiation

**Difficulty:** Medium
**Pattern:** Fast exponentiation + modulo at every step
**Expected:** O(log b) time · O(1) space

## Problem

Given three integers `base`, `exp`, and `mod`, compute:

```
(base ^ exp) % mod
```

`exp` and `base` can be very large (up to `10^18`), so you must use **BigInt** for intermediate products to avoid precision loss.

## Examples

### Example 1
```
Input:  base = 2, exp = 10, mod = 1000
Output: 24
```
2^10 = 1024, 1024 % 1000 = 24.

### Example 2
```
Input:  base = 3, exp = 1000000000, mod = 1000000007
Output: 811984862
```

### Example 3
```
Input:  base = 2, exp = 0, mod = 5
Output: 1
```
Any base to the 0 power is 1.

## Constraints
- `0 <= base, exp <= 10^18`
- `1 <= mod <= 10^9`

## Hints

<details>
<summary>Hint 1 — why plain Number fails here</summary>

Even if `base` and `mod` are both around `10^9`, their product `base * base` is around `10^18`. That exceeds `Number.MAX_SAFE_INTEGER ≈ 9 × 10^15`. Use BigInt for all arithmetic.
</details>

<details>
<summary>Hint 2 — the algorithm</summary>

Apply `% mod` after every multiplication. Never let any intermediate value exceed `mod²`.

```js
function modPow(base, exp, mod) {
  base = BigInt(base); exp = BigInt(exp); mod = BigInt(mod);
  let result = 1n;
  base = base % mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) result = (result * base) % mod;
    base = (base * base) % mod;
    exp = exp / 2n;
  }
  return Number(result);
}
```
</details>

## Write your solution
→ [`../solutions/17-modular-exponentiation.js`](../solutions/17-modular-exponentiation.js)

## Follow-ups
- This is the core of RSA decryption. In RSA, you compute `message^private_key mod n`. For 2048-bit RSA, the exponent has ~617 decimal digits. How many multiplications does that take with fast modular exponentiation?
- Implement `superPow(a, b, 1337)` where `b` is given as an array of digits. See Q35.
