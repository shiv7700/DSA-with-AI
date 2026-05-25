# Q30 — Burst Balloons

**Difficulty:** Hard
**Pattern:** Interval DP — think about which balloon to burst LAST
**Expected:** O(n³) time · O(n²) space

## Problem

You are given `n` balloons, indexed from `0` to `n - 1`. Each balloon has a number on it given by `nums[i]`. You burst all the balloons. When you burst balloon `i`, you earn `nums[i-1] * nums[i] * nums[i+1]` coins. If `i-1` or `i+1` is out of bounds, treat it as if it has a `1`.

Return the **maximum coins** you can collect by bursting all the balloons wisely.

## Examples

### Example 1
```
Input:  nums = [3, 1, 5, 8]
Output: 167
```
Burst 1 → earn 3×1×5=15. Burst 5 → earn 3×5×8=120. Burst 3 → earn 1×3×8=24. Burst 8 → earn 1×8×1=8. Total = 167.

### Example 2
```
Input:  nums = [1, 5]
Output: 10
```

## Constraints
- `n == nums.length`
- `1 <= n <= 300`
- `0 <= nums[i] <= 100`

## Hints

<details>
<summary>Hint 1 — the critical insight: think in reverse</summary>

If you think "what burst first?", the neighbors keep changing as balloons disappear. Very hard to track.

Flip it: think "what burst **last** in this interval?" The last balloon in interval `[i, j]` always has `nums[i-1]` and `nums[j+1]` as its neighbors (because everything between `i` and `j` was already burst).
</details>

<details>
<summary>Hint 2 — define dp[i][j]</summary>

Add sentinel balloons: pad `nums` with `1` at both ends. Now `dp[i][j]` = maximum coins from bursting all balloons **strictly between** indices `i` and `j` (not including the sentinels at `i` and `j` themselves).
</details>

<details>
<summary>Hint 3 — the recurrence</summary>

For each possible "last balloon" `k` in `(i, j)`:

`dp[i][j] = max over all k in (i, j) of:`
`  dp[i][k] + nums[i] * nums[k] * nums[j] + dp[k][j]`

When `k` is burst last, its neighbors are `nums[i]` (left sentinel) and `nums[j]` (right sentinel).
</details>

<details>
<summary>Hint 4 — fill order</summary>

Fill by increasing interval length (`j - i`), from shortest to longest. Base case: `dp[i][i+1] = 0` (no balloon between adjacent sentinels).
</details>

## Write your solution
→ [`../solutions/30-burst-balloons.js`](../solutions/30-burst-balloons.js)

## Follow-ups
- **Strange Printer** — a similar "think about the last operation" interval DP.
- **Remove Boxes** — a harder variant where coins depend on how many adjacent boxes of the same color have been removed.
