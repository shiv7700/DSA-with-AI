# Q8 — Combination Sum III

**Difficulty:** Medium
**Pattern:** Backtracking — fixed count and fixed sum from a bounded digit set
**Expected:** O(C(9, k)) time · O(k) space

## Problem

Find all valid combinations of `k` numbers that sum up to `n` such that the following conditions are true:
- Only numbers `1` through `9` are used.
- Each number is used **at most once**.

Return a list of all possible valid combinations. The list must not contain the same combination twice, and the combinations may be returned in any order.

## Examples

### Example 1
```
Input:  k = 3, n = 7
Output: [[1,2,4]]
```
`1 + 2 + 4 = 7` using three distinct digits from 1–9.

### Example 2
```
Input:  k = 3, n = 9
Output: [[1,2,6],[1,3,5],[2,3,4]]
```

### Example 3
```
Input:  k = 4, n = 1
Output: []
```
Even the smallest four distinct numbers `1+2+3+4 = 10 > 1`.

## Constraints
- `2 <= k <= 9`
- `1 <= n <= 60`

## Hints

<details>
<summary>Hint 1 — bounded candidate set</summary>

The candidate set is exactly `{1, 2, 3, 4, 5, 6, 7, 8, 9}`. You don't need a separate array — just iterate `i` from `start` to `9`.
</details>

<details>
<summary>Hint 2 — two termination conditions</summary>

You need exactly `k` numbers summing to `n`. Record a solution when `current.length === k && remaining === 0`. Return early (prune) if `current.length === k` but `remaining !== 0`, or if `remaining < 0`.
</details>

<details>
<summary>Hint 3 — additional pruning</summary>

If even the smallest remaining digits sum to more than `remaining`, you can prune early. Alternatively, just sort naturally (1 through 9 are already ordered) and break when `i > remaining`.
</details>

## Write your solution
→ [`../solutions/08-combination-sum-iii.js`](../solutions/08-combination-sum-iii.js)

## Follow-ups
- **Combinations** — same structure but without the sum constraint.
- **Combination Sum** — unbounded candidates with reuse.
- What is the maximum number of valid combinations for any `k` and `n`?
