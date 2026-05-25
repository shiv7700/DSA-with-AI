# Q23 — Jump Game II

**Difficulty:** Medium
**Pattern:** 1D DP / greedy — minimum jumps
**Expected:** O(n) time · O(1) space

## Problem

Given an integer array `nums` (you are guaranteed to be able to reach the last index), return the **minimum number of jumps** to reach `nums[n - 1]`.

Each element `nums[i]` is the maximum jump length from position `i`.

## Examples

### Example 1
```
Input:  nums = [2, 3, 1, 1, 4]
Output: 2
```
Jump 1 step from index 0 to index 1, then 3 steps to the last index.

### Example 2
```
Input:  nums = [2, 3, 0, 1, 4]
Output: 2
```

## Constraints
- `1 <= nums.length <= 10^4`
- `0 <= nums[i] <= 1000`
- It is guaranteed you can reach `nums[n - 1]`.

## Hints

<details>
<summary>Hint 1 — think in "jump levels"</summary>

This is like a BFS level-order traversal. Each "level" is the set of positions reachable with exactly `k` jumps. The minimum number of jumps is the level at which you first reach the last index.
</details>

<details>
<summary>Hint 2 — the greedy variables</summary>

Maintain:
- `jumps` — how many jumps used so far
- `currentEnd` — the farthest position reachable with the current number of jumps
- `farthest` — the farthest position reachable from any position up to `currentEnd`

When you reach `currentEnd`, increment `jumps` and extend `currentEnd` to `farthest`.
</details>

<details>
<summary>Hint 3 — greedy skeleton</summary>

```js
let jumps = 0, currentEnd = 0, farthest = 0;
for (let i = 0; i < nums.length - 1; i++) {
  farthest = Math.max(farthest, i + nums[i]);
  if (i === currentEnd) {
    jumps++;
    currentEnd = farthest;
  }
}
return jumps;
```
</details>

## Write your solution
→ [`../solutions/23-jump-game-ii.js`](../solutions/23-jump-game-ii.js)

## Follow-ups
- Can you reconstruct the actual sequence of jump positions?
- **Video Stitching** — similar minimum-coverage greedy structure with intervals.
