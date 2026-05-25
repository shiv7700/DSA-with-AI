# Q29 — Matchsticks to Square

**Difficulty:** Medium
**Pattern:** Backtracking — partition into 4 equal-sum groups (k = 4 special case)
**Expected:** O(4 · 2^n) time · O(n) space

## Problem

You are given an integer array `matchsticks` where `matchsticks[i]` is the length of the `i`-th matchstick. You want to use **all** the matchsticks to make one square. You **cannot** break any stick, and you must use every stick exactly once.

Return `true` if you can make this square, otherwise `false`.

## Examples

### Example 1
```
Input:  matchsticks = [1, 1, 2, 2, 2]
Output: true
```
The four sides are `[1, 2]`, `[1, 2]`, `[2]`, `[2]`.

### Example 2
```
Input:  matchsticks = [3, 3, 3, 3, 4]
Output: false
```
Total length is 16, so each side would need to be 4. But the only way to make 4 from one stick is the single `4` — the remaining four `3`s cannot form three sides of length 4 each.

## Constraints
- `1 <= matchsticks.length <= 15`
- `1 <= matchsticks[i] <= 10^8`

## Hints

<details>
<summary>Hint 1 — reduce to partition into 4 equal sums</summary>

This is Partition to K Equal Sum Subsets with `k = 4`. Compute `target = total / 4`. If `total % 4 !== 0` or any stick is longer than `target`, return false immediately.
</details>

<details>
<summary>Hint 2 — four buckets, same backtracking</summary>

Maintain four running sums. Assign each matchstick to one bucket that won't overflow `target`. When all sticks are placed and all four sums equal `target`, return `true`.
</details>

<details>
<summary>Hint 3 — sort descending for early failure</summary>

Sort the matchsticks in descending order so that long sticks are placed first. A long stick that causes overflow in all four buckets fails early rather than after many recursive calls.
</details>

## Write your solution
→ [`../solutions/29-matchsticks-to-square.js`](../solutions/29-matchsticks-to-square.js)

## Follow-ups
- **Partition to K Equal Sum Subsets** — generalization to arbitrary `k`.
- **Partition Equal Subset Sum** — the two-partition version, solvable with DP.
- If you allow breaking sticks, when is a square always possible?
