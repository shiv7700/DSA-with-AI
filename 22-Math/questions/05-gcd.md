# Q5 — GCD of Two Numbers

**Difficulty:** Easy
**Pattern:** Euclid's algorithm
**Expected:** O(log min(a, b)) time · O(1) space

## Problem

Given two non-negative integers `a` and `b`, return their **greatest common divisor** (GCD) — the largest integer that divides both `a` and `b` without a remainder.

## Examples

### Example 1
```
Input:  a = 12, b = 8
Output: 4
```
Divisors of 12: 1, 2, 3, 4, 6, 12. Divisors of 8: 1, 2, 4, 8. Largest common: 4.

### Example 2
```
Input:  a = 48, b = 36
Output: 12
```

### Example 3
```
Input:  a = 17, b = 5
Output: 1
```
17 and 5 share no common factor — they are **coprime**.

### Example 4 (edge cases)
```
Input:  a = 0, b = 7   →  7   (gcd(0, x) = x by convention)
Input:  a = 0, b = 0   →  0
```

## Constraints
- `0 <= a, b <= 10^9`

## Hints

<details>
<summary>Hint 1 — brute force (just to understand)</summary>

Loop from 1 to min(a, b) and check which numbers divide both. Take the maximum. This is O(min(a, b)) — too slow for large inputs.
</details>

<details>
<summary>Hint 2 — Euclid's key identity</summary>

```
gcd(a, b) = gcd(b, a mod b)
```

And the base case: `gcd(a, 0) = a`.

So if `b = 0`, return `a`. Otherwise return `gcd(b, a % b)`.

Trace for `gcd(48, 36)`:
```
gcd(48, 36) → gcd(36, 12) → gcd(12, 0) → 12
```
</details>

<details>
<summary>Hint 3 — iterative vs recursive</summary>

Recursive:
```js
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}
```

Iterative (avoids deep call stacks):
```js
function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}
```
</details>

## Write your solution
→ [`../solutions/05-gcd.js`](../solutions/05-gcd.js)

## Follow-ups
- How many steps does Euclid's algorithm take for `gcd(F(n+1), F(n))` where F is Fibonacci? (This is the worst case — Fibonacci pairs maximize the number of steps.)
- Compute GCD for three numbers: `gcd(a, b, c)`.
- What's `gcd(10^9, 10^9 - 1)`?
