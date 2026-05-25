# Q02 — Climbing Stairs

**Difficulty:** Easy
**Pattern:** 1D linear DP — Fibonacci in disguise
**Expected:** O(n) time · O(1) space

## Problem

You are climbing a staircase with `n` steps. Each move you can climb either **1 step** or **2 steps**. In how many distinct ways can you reach the top?

## Examples

### Example 1
```
Input:  n = 2
Output: 2
```
Two ways: `[1, 1]` or `[2]`.

### Example 2
```
Input:  n = 3
Output: 3
```
Three ways: `[1, 1, 1]`, `[1, 2]`, `[2, 1]`.

### Example 3
```
Input:  n = 5
Output: 8
```

## Constraints
- `1 <= n <= 45`

## Hints

<details>
<summary>Hint 1 — think about the last step</summary>

To reach step `n`, you must have come from step `n-1` (by taking 1 step) or from step `n-2` (by taking 2 steps). So the number of ways to reach `n` equals the number of ways to reach `n-1` plus the number of ways to reach `n-2`.
</details>

<details>
<summary>Hint 2 — write out the first few values</summary>

- `ways(1)` = 1 (only one way: one step)
- `ways(2)` = 2 (1+1 or 2)
- `ways(3)` = ways(2) + ways(1) = 2 + 1 = 3
- `ways(4)` = ways(3) + ways(2) = 3 + 2 = 5

Does this sequence look familiar?
</details>

<details>
<summary>Hint 3 — it's Fibonacci, shifted by one</summary>

`ways(n) = fib(n + 1)` in the standard Fibonacci numbering. Implement exactly as Q01's O(1) space version, but with base cases `ways(1) = 1` and `ways(2) = 2`.
</details>

## Write your solution
→ [`../solutions/02-climbing-stairs.js`](../solutions/02-climbing-stairs.js)

## Follow-ups
- What if you could take 1, 2, or 3 steps? Generalize the recurrence.
- **Min Cost Climbing Stairs** (Q03) — same structure, but each stair has a cost.
