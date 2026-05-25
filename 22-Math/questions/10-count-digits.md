# Q10 — Count Digits

**Difficulty:** Easy
**Pattern:** Digit extraction with modulo / logarithm
**Expected:** O(log n) time · O(1) space

## Problem

Given a positive integer `n`, return the number of digits in its decimal representation.

## Examples

### Example 1
```
Input:  n = 5
Output: 1
```

### Example 2
```
Input:  n = 123
Output: 3
```

### Example 3
```
Input:  n = 1000000
Output: 7
```

### Example 4
```
Input:  n = 0
Output: 1
```

## Constraints
- `0 <= n <= 10^15`

## Hints

<details>
<summary>Hint 1 — loop approach</summary>

Repeatedly divide `n` by 10 (stripping the last digit), counting how many times you can do so before `n` reaches 0.
</details>

<details>
<summary>Hint 2 — the Math.floor + log10 trick</summary>

The number of digits of `n` is `Math.floor(Math.log10(n)) + 1`.

For example: `Math.log10(123) ≈ 2.089`, `Math.floor(2.089) + 1 = 3`. ✅

Be careful: this uses floating-point, so it can give wrong answers for very large numbers near powers of 10. The loop approach is safer.
</details>

<details>
<summary>Hint 3 — converting to string (know it, but do it the proper way)</summary>

`String(n).length` works, but the problem is asking you to practice arithmetic digit extraction. Use the loop approach for this exercise.
</details>

## Write your solution
→ [`../solutions/10-count-digits.js`](../solutions/10-count-digits.js)

## Follow-ups
- Count the number of digits in `n!` for large n. (Hint: Stirling's approximation, or Legendre's formula.)
- Given n, find the number of integers from 1 to n that have an even number of digits.
