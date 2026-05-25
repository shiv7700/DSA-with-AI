# Q32 — Beautiful Arrangement

**Difficulty:** Medium
**Pattern:** Backtracking — count valid permutations with divisibility constraints
**Expected:** O(k) time · O(n) space — where k is the number of valid arrangements

## Problem

Suppose you have `n` integers labeled `1` to `n`. A permutation of those `n` integers `perm` is considered **beautiful** if for every `i` (1-indexed), either of the following is true:
- `perm[i]` is divisible by `i`, or
- `i` is divisible by `perm[i]`.

Given an integer `n`, return the **number of beautiful arrangements** you can construct.

## Examples

### Example 1
```
Input:  n = 2
Output: 2
```
The two valid arrangements: `[1, 2]` (1%1=0, 2%2=0) and `[2, 1]` (2%1=0, 1%1=0).

### Example 2
```
Input:  n = 1
Output: 1
```

## Constraints
- `1 <= n <= 15`

## Hints

<details>
<summary>Hint 1 — build the permutation position by position</summary>

At each position `pos` (1-indexed from 1 to n), try placing each unused number. Only proceed if the divisibility condition holds for this `(pos, number)` pair.
</details>

<details>
<summary>Hint 2 — use a visited array</summary>

Maintain a boolean `visited[n]` to track which numbers are already placed. Choose an unvisited number, mark it visited, recurse to the next position, then unmark on backtrack.
</details>

<details>
<summary>Hint 3 — prune aggressively</summary>

The divisibility check is the pruning condition. If neither `num % pos === 0` nor `pos % num === 0`, skip this number entirely — don't recurse at all. This cuts a large fraction of the search tree.
</details>

## Write your solution
→ [`../solutions/32-beautiful-arrangement.js`](../solutions/32-beautiful-arrangement.js)

## Follow-ups
- **Permutations** — the same backtracking structure without any pruning condition.
- Modify the problem: instead of counting, return all valid arrangements.
- Can you use bitmask DP to solve this in O(n · 2^n) with lower constants?
