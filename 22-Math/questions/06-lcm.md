# Q6 — LCM of Two Numbers

**Difficulty:** Easy
**Pattern:** GCD + LCM identity
**Expected:** O(log min(a, b)) time · O(1) space

## Problem

Given two positive integers `a` and `b`, return their **least common multiple** (LCM) — the smallest positive integer that is divisible by both `a` and `b`.

## Examples

### Example 1
```
Input:  a = 4, b = 6
Output: 12
```
Multiples of 4: 4, 8, **12**, … Multiples of 6: 6, **12**, … Smallest common: 12.

### Example 2
```
Input:  a = 12, b = 8
Output: 24
```

### Example 3
```
Input:  a = 7, b = 5
Output: 35
```
7 and 5 are coprime, so their LCM is just 7 × 5 = 35.

### Example 4
```
Input:  a = 6, b = 6
Output: 6
```

## Constraints
- `1 <= a, b <= 10^6`
- The result will fit in a `Number` safely.

## Hints

<details>
<summary>Hint 1 — the identity</summary>

```
lcm(a, b) = (a × b) / gcd(a, b)
```

Why? The GCD contains all shared prime factors. Dividing by GCD removes the double-counting.
</details>

<details>
<summary>Hint 2 — avoid overflow by dividing first</summary>

Instead of `(a * b) / gcd(a, b)`, compute `(a / gcd(a, b)) * b`.

By dividing first, `a / gcd(a, b)` is already an integer (gcd always divides a), and the intermediate product is smaller.
</details>

<details>
<summary>Hint 3 — using your GCD solution</summary>

Build on the `gcd` function you wrote in Q5:

```js
function lcm(a, b) {
  return (a / gcd(a, b)) * b;
}
```
</details>

## Write your solution
→ [`../solutions/06-lcm.js`](../solutions/06-lcm.js)

## Follow-ups
- Bus A comes every `a` minutes, Bus B every `b` minutes. After how many minutes will they arrive at the same time again?
- Compute LCM for an array of numbers.
- Why is `lcm(a, b) * gcd(a, b) === a * b` always true?
