# Q1 — Check if a Number is Prime

**Difficulty:** Easy
**Pattern:** Trial division up to √n
**Expected:** O(√n) time · O(1) space

## Problem

Given a non-negative integer `n`, return `true` if `n` is prime, `false` otherwise.

A prime number is a whole number greater than 1 that has **exactly two divisors**: 1 and itself.

> **Why this matters:** Primality testing is the foundation of this entire chapter. The √n optimization you learn here appears in divisors, factorization, and more.

## Examples

### Example 1
```
Input:  n = 2
Output: true
```
2 is the smallest prime.

### Example 2
```
Input:  n = 17
Output: true
```

### Example 3
```
Input:  n = 18
Output: false
```
18 = 2 × 9 = 2 × 3 × 3.

### Example 4 (edge cases)
```
Input:  n = 0  →  false
Input:  n = 1  →  false   (1 has only one divisor — itself)
Input:  n = 4  →  false   (4 = 2 × 2)
```

## Constraints
- `0 <= n <= 10^9`

## Hints

<details>
<summary>Hint 1 — brute force first</summary>

Try every divisor from 2 to n − 1. If any of them divides n evenly (`n % i === 0`), n is not prime. This is O(n) — correct but slow.
</details>

<details>
<summary>Hint 2 — the √n insight</summary>

If n has a divisor d > √n, then n / d is a divisor < √n. So you only need to check divisors up to √n.

Instead of `i < n`, use `i * i <= n` as your loop condition (avoids calling `Math.sqrt` and float rounding).
</details>

<details>
<summary>Hint 3 — quick even-number shortcut</summary>

After handling n < 2 and n === 2 as special cases, check `if (n % 2 === 0) return false` — that knocks out all even numbers instantly. Then only loop over odd numbers (`i += 2` instead of `i++`), which cuts the work in half.
</details>

## Write your solution
→ [`../solutions/01-is-prime.js`](../solutions/01-is-prime.js)

## Follow-ups
- Can you handle the case where you need to check millions of numbers? (Hint: precompute with a sieve.)
- What is the smallest prime larger than 1,000,000?
- Why is 1 not considered prime?
