# Q10 — GCD Using Euclid's Algorithm

**Difficulty:** Easy
**Pattern:** Recursive reduction — Euclid's algorithm
**Expected:** O(log(min(a, b))) time · O(log(min(a, b))) space

## Problem

Write a recursive function `gcd(a, b)` that returns the **Greatest Common Divisor** of two non-negative integers `a` and `b`.

The GCD is the largest integer that divides both `a` and `b` without remainder.

Use **Euclid's algorithm**: `gcd(a, b) = gcd(b, a % b)`, with base case `gcd(a, 0) = a`.

> **Why this problem?** Euclid's algorithm is one of the oldest algorithms in mathematics (300 BCE) and one of the most elegant examples of recursion. It also demonstrates that recursion can converge very fast — each step reduces the problem dramatically — which is why it's O(log n) rather than O(n).

## Examples

### Example 1
```
Input:  a = 48, b = 18
Output: 6
```
Because 6 is the largest number that divides both 48 and 18.

### Example 2
```
Input:  a = 100, b = 75
Output: 25
```

### Example 3 (edge cases)
```
Input:  a = 0,  b = 5   → 5    (gcd(0, n) = n by convention)
Input:  a = 7,  b = 0   → 7
Input:  a = 12, b = 12  → 12
```

### Example 4
```
Input:  a = 17, b = 13
Output: 1
```
When GCD is 1, the two numbers are called **coprime** (no common factor).

## Constraints
- `0 <= a, b <= 10^9`
- At least one of `a`, `b` is non-zero.
- Use recursion.

## Hints

<details>
<summary>Hint 1 — understand Euclid's key insight</summary>

The key fact: any common divisor of `a` and `b` is also a common divisor of `b` and `a % b`.

Example: `gcd(48, 18)`.
- `48 % 18 = 12`
- So `gcd(48, 18) = gcd(18, 12)`
- `18 % 12 = 6`
- So `gcd(18, 12) = gcd(12, 6)`
- `12 % 6 = 0`
- So `gcd(12, 6) = gcd(6, 0) = 6`  ← base case

The numbers shrink rapidly each step.
</details>

<details>
<summary>Hint 2 — identify the base case</summary>

When `b === 0`, the GCD is just `a`. That's your base case.

Why? If b is 0, then every number divides 0, so the largest number dividing both `a` and `0` is just `a`.
</details>

<details>
<summary>Hint 3 — the recursive case</summary>

```js
function gcd(a, b) {
  if (b === 0) return a;          // base case
  return gcd(b, a % b);           // recursive case
}
```

Notice the arguments swap: the new first argument is `b`, the new second argument is `a % b`.
</details>

<details>
<summary>Hint 4 — trace it for gcd(48, 18)</summary>

```
gcd(48, 18)
  → gcd(18, 48 % 18) = gcd(18, 12)
  → gcd(12, 18 % 12) = gcd(12, 6)
  → gcd(6,  12 % 6)  = gcd(6, 0)
  → b === 0, return 6
```
</details>

## Write your solution
→ [`../solutions/10-gcd.js`](../solutions/10-gcd.js)

## Follow-ups
- Write an iterative version. (Hint: a `while` loop with the same logic.) Which do you prefer?
- **LCM (Least Common Multiple):** `lcm(a, b) = (a * b) / gcd(a, b)`. Write `lcm(a, b)` that uses your `gcd` function.
- Why is Euclid's algorithm O(log(min(a, b)))? The reason is that `a % b` is always less than `a/2`, so the larger number at least halves on each step.
