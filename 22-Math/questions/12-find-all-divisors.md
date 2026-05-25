# Q12 — Find All Divisors of N

**Difficulty:** Easy
**Pattern:** Trial division up to √n, paired divisors
**Expected:** O(√n) time · O(d(n)) space   (d(n) = number of divisors)

## Problem

Given a positive integer `n`, return a sorted array of all its divisors (including 1 and n itself).

## Examples

### Example 1
```
Input:  n = 12
Output: [1, 2, 3, 4, 6, 12]
```

### Example 2
```
Input:  n = 36
Output: [1, 2, 3, 4, 6, 9, 12, 18, 36]
```

### Example 3 (prime number — only 2 divisors)
```
Input:  n = 13
Output: [1, 13]
```

### Example 4 (perfect square)
```
Input:  n = 16
Output: [1, 2, 4, 8, 16]
```

## Constraints
- `1 <= n <= 10^9`

## Hints

<details>
<summary>Hint 1 — divisors come in pairs</summary>

If `d` divides `n`, then `n / d` also divides `n`. For example: 3 divides 12, and 12/3 = 4 also divides 12.

So loop `i` from 1 to √n. If `n % i === 0`, add both `i` and `n / i` to your result.
</details>

<details>
<summary>Hint 2 — perfect square edge case</summary>

When `i * i === n` (n is a perfect square), `i` and `n / i` are the same number. Add it only once.
</details>

<details>
<summary>Hint 3 — sorting</summary>

If you add pairs as you go, the result won't be sorted. Either sort at the end, or add divisors ≤ √n to one array and divisors > √n (in reverse) to another, then concatenate.
</details>

## Write your solution
→ [`../solutions/12-find-all-divisors.js`](../solutions/12-find-all-divisors.js)

## Follow-ups
- How many divisors does `10^12` have? How quickly can you compute this?
- Perfect numbers: a number where the sum of its proper divisors (all except itself) equals the number. Example: 6 = 1 + 2 + 3. Find the first four perfect numbers.
- If d(n) is odd (odd number of divisors), n is a perfect square. Prove this.
