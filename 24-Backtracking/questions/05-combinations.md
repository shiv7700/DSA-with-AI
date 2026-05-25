# Q5 — Combinations

**Difficulty:** Medium
**Pattern:** Backtracking — forward-only selection with a fixed-length goal
**Expected:** O(k · C(n, k)) time · O(k) space (excluding output)

## Problem

Given two integers `n` and `k`, return all possible combinations of `k` numbers chosen from the range `[1, n]`. You may return the answer in any order.

## Examples

### Example 1
```
Input:  n = 4, k = 2
Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
```
All ways to choose 2 numbers from {1, 2, 3, 4}.

### Example 2
```
Input:  n = 1, k = 1
Output: [[1]]
```

## Constraints
- `1 <= n <= 20`
- `1 <= k <= n`

## Hints

<details>
<summary>Hint 1 — forward selection prevents duplicates</summary>

Since combinations are unordered (i.e., `[1, 2]` and `[2, 1]` are the same), only look at numbers greater than the last one you chose. Use a `start` index that advances as you recurse.
</details>

<details>
<summary>Hint 2 — base case</summary>

When `current.length === k`, you have a complete combination. Push a clone to results and return.
</details>

<details>
<summary>Hint 3 — pruning with early termination</summary>

If there are fewer remaining numbers than slots left to fill, no complete combination is possible from this point. Specifically, if `n - i + 1 < k - current.length`, you can stop the loop early. This prunes branches that can never reach length `k`.
</details>

## Write your solution
→ [`../solutions/05-combinations.js`](../solutions/05-combinations.js)

## Follow-ups
- **Combination Sum** — choose numbers that sum to a target instead of a fixed count.
- **Combination Sum III** — exactly `k` numbers from 1–9 that sum to `n`.
- How does the number of valid combinations grow as `k` approaches `n/2`?
