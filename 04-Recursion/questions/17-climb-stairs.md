# Q17 — Climb Stairs

**Difficulty:** Medium
**Pattern:** Branching recursion → memoization → DP
**Expected:** Naive: O(2^n) | Memoized: O(n) time · O(n) space

## Problem

You're climbing a staircase of `n` steps. Each move you can climb either **1 step** or **2 steps**.

Write a function `climbStairs(n)` that returns the number of distinct ways to reach the top.

> **Why this problem?** Climb Stairs is Fibonacci in disguise. The number of ways to reach step `n` equals `climbStairs(n-1)` (the ways that take 1 step from n-1) plus `climbStairs(n-2)` (the ways that take 2 steps from n-2). It's a gentle introduction to "counting ways" recursion and a direct bridge to dynamic programming.

## Examples

### Example 1
```
Input:  n = 1
Output: 1
```
Only one way: `[1]`.

### Example 2
```
Input:  n = 2
Output: 2
```
Two ways: `[1,1]` or `[2]`.

### Example 3
```
Input:  n = 3
Output: 3
```
Three ways: `[1,1,1]`, `[1,2]`, `[2,1]`.

### Example 4
```
Input:  n = 5
Output: 8
```
(The Fibonacci sequence: 1, 1, 2, 3, 5, **8**, 13, …)

## Constraints
- `1 <= n <= 45`

## Hints

<details>
<summary>Hint 1 — identify the base cases</summary>

How many ways are there to reach step 1? Just one: take a single step. `climbStairs(1) = 1`.

How many ways are there to reach step 2? Two: `[1,1]` or `[2]`. `climbStairs(2) = 2`.

These are your base cases.
</details>

<details>
<summary>Hint 2 — the recursive case (this is just Fibonacci!)</summary>

To reach step `n`, your last move was either:
- A 1-step move from step `n-1`, OR
- A 2-step move from step `n-2`.

So the total number of ways to reach `n` = (ways to reach `n-1`) + (ways to reach `n-2`).

```js
function climbStairs(n) {
  if (n === 1) return 1;
  if (n === 2) return 2;
  return climbStairs(n - 1) + climbStairs(n - 2);   // naive O(2^n)
}
```
</details>

<details>
<summary>Hint 3 — add memoization</summary>

Same as Fibonacci — without memo, `climbStairs(40)` will be very slow. Add a cache:

```js
const memo = {};
function climbStairsMemo(n) {
  if (n === 1) return 1;
  if (n === 2) return 2;
  if (memo[n]) return memo[n];
  return (memo[n] = climbStairsMemo(n-1) + climbStairsMemo(n-2));
}
```
</details>

<details>
<summary>Hint 4 — the O(1) space iterative solution</summary>

Like Fibonacci, you only need the last two values:

```js
function climbStairsDP(n) {
  if (n <= 2) return n;
  let prev2 = 1, prev1 = 2;
  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}
```

This is O(n) time, O(1) space — the best possible.
</details>

## Write your solution
→ [`../solutions/17-climb-stairs.js`](../solutions/17-climb-stairs.js)

## Follow-ups
- Extend: what if you can also take 3 steps at a time? Adjust the recursion. This is the "k-step staircase" generalization.
- LeetCode 70: **Climbing Stairs** — exact same problem.
- LeetCode 746: **Min Cost Climbing Stairs** — now each step has a cost; minimize the total cost to reach the top.
