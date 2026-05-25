# Q01 — Fibonacci Number

**Difficulty:** Easy
**Pattern:** 1D linear DP — three implementations (memoization, tabulation, O(1) space)
**Expected:** O(n) time · O(1) space (best version)

## Problem

The Fibonacci sequence is defined as:
- `F(0) = 0`
- `F(1) = 1`
- `F(n) = F(n - 1) + F(n - 2)` for `n >= 2`

Given `n`, return `F(n)`.

This problem exists to make you implement DP **three ways**: memoized recursion, bottom-up tabulation, and finally the space-optimized O(1) version. Understanding all three is more valuable than the result itself.

## Examples

### Example 1
```
Input:  n = 6
Output: 8
```
Sequence: 0, 1, 1, 2, 3, 5, **8**

### Example 2
```
Input:  n = 10
Output: 55
```

### Example 3
```
Input:  n = 0
Output: 0
```

## Constraints
- `0 <= n <= 30`

## Hints

<details>
<summary>Hint 1 — start with the naïve recursive version</summary>

Write `fib(n) = fib(n-1) + fib(n-2)` with base cases `fib(0) = 0` and `fib(1) = 1`. Confirm it gives the right answer for small `n`. Then check: how many times does `fib(3)` get called when computing `fib(6)`? That redundancy is the whole problem.
</details>

<details>
<summary>Hint 2 — add a memo object to fix the redundancy</summary>

Pass a `memo` object into your recursive function. At the top of the function, check if `n` is already in `memo` and return immediately if so. At the bottom, store the result in `memo[n]` before returning. This is top-down DP (memoization).
</details>

<details>
<summary>Hint 3 — rewrite it iteratively (tabulation)</summary>

Create `dp = [0, 1, 0, 0, ..., 0]` of length `n + 1`. Then loop `i` from `2` to `n`, setting `dp[i] = dp[i-1] + dp[i-2]`. Return `dp[n]`. No recursion at all.
</details>

<details>
<summary>Hint 4 — squeeze to O(1) space</summary>

Notice `dp[i]` only ever reads `dp[i-1]` and `dp[i-2]`. You don't need the entire array — just two variables. At each step, shift them forward: `[prev2, prev1] = [prev1, prev1 + prev2]`.
</details>

## Write your solution
→ [`../solutions/01-fibonacci.js`](../solutions/01-fibonacci.js)

## Follow-ups
- Implement all four versions (naive, memoized, tabulated, O(1) space) and compare their runtimes for `n = 40`.
- **Climbing Stairs** (Q02) — same recurrence, different story.
- **Tribonacci** — `F(n) = F(n-1) + F(n-2) + F(n-3)`. How does the O(1) solution change?
