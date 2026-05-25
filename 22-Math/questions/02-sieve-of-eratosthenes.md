# Q2 — Sieve of Eratosthenes

**Difficulty:** Easy
**Pattern:** Sieve / bulk prime generation
**Expected:** O(n log log n) time · O(n) space

## Problem

Given a positive integer `n`, return an array of all prime numbers **less than or equal to n**, in ascending order.

## Examples

### Example 1
```
Input:  n = 10
Output: [2, 3, 5, 7]
```

### Example 2
```
Input:  n = 20
Output: [2, 3, 5, 7, 11, 13, 17, 19]
```

### Example 3
```
Input:  n = 2
Output: [2]
```

### Example 4 (edge case)
```
Input:  n = 1
Output: []
```

## Constraints
- `1 <= n <= 10^6`

## Hints

<details>
<summary>Hint 1 — the intuition (the "crossing out" idea)</summary>

Start with every number from 2 to n marked as "potentially prime." Then:
1. Find the smallest unmarked number (that's a prime).
2. Cross out every multiple of it — they can't be prime.
3. Repeat from step 1 until you've gone past √n.

Everything still marked at the end is prime.
</details>

<details>
<summary>Hint 2 — implementation sketch</summary>

```js
const isPrime = new Array(n + 1).fill(true);
isPrime[0] = isPrime[1] = false;

for (let i = 2; i * i <= n; i++) {
  if (isPrime[i]) {
    for (let j = i * i; j <= n; j += i) {
      isPrime[j] = false;
    }
  }
}
```

Collect the indices where `isPrime[i]` is still `true`.
</details>

<details>
<summary>Hint 3 — why start crossing at i * i?</summary>

When you reach prime p, all multiples `2p, 3p, …, (p-1)p` have already been crossed out by smaller primes (2, 3, …, p-1). The first multiple you haven't touched yet is `p * p`. Starting there avoids redundant work.
</details>

## Write your solution
→ [`../solutions/02-sieve-of-eratosthenes.js`](../solutions/02-sieve-of-eratosthenes.js)

## Follow-ups
- Count the primes instead of listing them (LeetCode 204 — "Count Primes").
- Modify the sieve to also return the **smallest prime factor** of each number up to n.
- How would you adapt this to find primes in the range `[lo, hi]` where `lo` and `hi` can be up to `10^12`? (Hint: segmented sieve.)
