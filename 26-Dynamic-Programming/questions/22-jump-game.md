# Q22 — Jump Game

**Difficulty:** Medium
**Pattern:** 1D DP or greedy — reachability
**Expected:** O(n) time · O(1) space

## Problem

You are given an integer array `nums`. You start at the first index. Each element `nums[i]` represents the maximum jump length from position `i`. Return `true` if you can reach the last index.

## Examples

### Example 1
```
Input:  nums = [2, 3, 1, 1, 4]
Output: true
```
Jump 1 step from index 0 to index 1, then 3 steps to the last index.

### Example 2
```
Input:  nums = [3, 2, 1, 0, 4]
Output: false
```
You always get stuck at index 3, which has a jump of 0.

## Constraints
- `1 <= nums.length <= 10^4`
- `0 <= nums[i] <= 10^5`

## Hints

<details>
<summary>Hint 1 — track the farthest reachable position</summary>

The greedy insight: at each index `i`, you can jump to any position from `i+1` to `i + nums[i]`. So track `maxReach` — the farthest position you can reach so far. If `i > maxReach`, you're stuck.
</details>

<details>
<summary>Hint 2 — the greedy update</summary>

```js
let maxReach = 0;
for (let i = 0; i < nums.length; i++) {
  if (i > maxReach) return false;   // can't reach position i
  maxReach = Math.max(maxReach, i + nums[i]);
}
return true;
```
</details>

<details>
<summary>Hint 3 — the DP approach (for comparison)</summary>

`dp[i]` = `true` if index `i` is reachable. `dp[0] = true`. For each reachable `i`, mark all `j` in `[i+1, i + nums[i]]` as reachable. Return `dp[n-1]`. This is O(n²) — the greedy is faster, but the DP approach builds intuition for Q23.
</details>

## Write your solution
→ [`../solutions/22-jump-game.js`](../solutions/22-jump-game.js)

## Follow-ups
- **Jump Game II** (Q23) — find the minimum number of jumps to reach the end.
- **Jump Game III** — from index `i` you can jump to `i + nums[i]` or `i - nums[i]`. Can you reach any index with value 0?
