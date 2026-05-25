# Q5 — Power of a Number in O(log n)

**Difficulty:** Easy
**Pattern:** Divide and conquer recursion (halving the problem)
**Expected:** O(log n) time · O(log n) space (call stack)

## Problem

Write a recursive function `power(base, exp)` that returns `base` raised to the power `exp` (`base^exp`).

**Important:** your solution must run in **O(log n)** time — not O(n). You'll do this by halving the exponent at each step instead of reducing it by 1.

> **Why O(log n)?** A naive solution multiplies `base` by itself `exp` times — that's O(n). But you can compute `base^exp` much faster by observing that `base^8 = (base^4)^2`. You only need to compute `base^4` once and square it. This halves the number of multiplications needed on every step. It's one of the cleanest examples of "divide and conquer" thinking.

## Examples

### Example 1
```
Input:  base = 2, exp = 10
Output: 1024
```

### Example 2
```
Input:  base = 3, exp = 5
Output: 243
```

### Example 3 (edge cases)
```
Input:  base = 5, exp = 0  → 1      (anything^0 = 1)
Input:  base = 0, exp = 5  → 0      (0^anything = 0)
Input:  base = 1, exp = 100 → 1     (1^anything = 1)
```

### Example 4 (negative exponent — optional)
```
Input:  base = 2, exp = -3
Output: 0.125   (which is 1 / 2^3)
```

## Constraints
- `-100 <= base <= 100`
- `0 <= exp <= 50` (for the main challenge)
- For the follow-up, handle negative exponents.
- Use recursion — no `Math.pow`.

## Hints

<details>
<summary>Hint 1 — identify the base case</summary>

What exponent is trivial? Any number raised to the power `0` is `1`. That's your base case:

```
if (exp === 0) return 1;
```
</details>

<details>
<summary>Hint 2 — the O(n) naive approach (then we'll improve it)</summary>

The naive recursive approach reduces `exp` by 1 each call:

```js
function power(base, exp) {
  if (exp === 0) return 1;
  return base * power(base, exp - 1);   // O(n) — exp steps
}
```

This is correct but slow. For `exp = 1000`, it makes 1000 recursive calls.
</details>

<details>
<summary>Hint 3 — the O(log n) insight: halve the exponent</summary>

Key observation: `base^exp = (base^(exp/2))^2` when `exp` is even.

For example: `2^8 = (2^4)^2 = 16^2 = 256`. You only needed to compute `2^4`, not `2^8` separate multiplications.

For odd exponents: `base^exp = base × base^(exp-1)`, and `exp-1` is now even.

```js
function power(base, exp) {
  if (exp === 0) return 1;
  if (exp % 2 === 0) {
    const half = power(base, exp / 2);
    return half * half;
  } else {
    return base * power(base, exp - 1);
  }
}
```

Each time `exp` is even, you cut it in half. The depth of recursion is at most `O(log n)`.
</details>

<details>
<summary>Hint 4 — trace for base=2, exp=8</summary>

```
power(2, 8)
  exp is even → half = power(2, 4)
    exp is even → half = power(2, 2)
      exp is even → half = power(2, 1)
        exp is odd → 2 * power(2, 0)
          exp = 0 → return 1
        = 2 * 1 = 2   (returns 2)
      = 2 * 2 = 4     (returns 4)
    = 4 * 4 = 16      (returns 16)
  = 16 * 16 = 256     (returns 256)
```

Only 4 recursive calls for exp=8, vs 8 for the naive version. For exp=1024, it's 10 calls vs 1024.
</details>

## Write your solution
→ [`../solutions/05-power.js`](../solutions/05-power.js)

## Follow-ups
- Extend your solution to handle negative exponents: `power(base, -exp) = 1 / power(base, exp)`.
- This algorithm is known as **"fast exponentiation"** or **"exponentiation by squaring"**. It also works with matrix multiplication — you can compute the `n`-th Fibonacci number in O(log n) using matrix exponentiation.
- LeetCode 50: **Pow(x, n)** — the same problem with negative exponents.
