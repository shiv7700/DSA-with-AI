# Q4 — Jump Game

**Difficulty:** Medium
**Pattern:** Greedy · Running Maximum Reach
**Expected:** O(n) time · O(1) space

## Problem

You are given an integer array `nums`. You are initially positioned at index 0. Each element `nums[i]` represents the **maximum** jump length you can make from index `i` (you can jump anywhere from 1 to `nums[i]` steps forward, or stay put if you choose).

Return `true` if you can reach the last index, or `false` otherwise.

## Examples

### Example 1
```
Input:  nums = [2, 3, 1, 1, 4]
Output: true
```
Jump from index 0 to index 1 (jump 1 step), then from index 1 to index 4 (jump 3 steps).

### Example 2
```
Input:  nums = [3, 2, 1, 0, 4]
Output: false
```
No matter how you jump, you always land on index 3 (value 0) and get stuck.

### Example 3
```
Input:  nums = [0]
Output: true
```
Already at the last index.

### Example 4
```
Input:  nums = [2, 0, 0]
Output: true
```
Jump over the zeros directly to the last index.

## Constraints
- `1 <= nums.length <= 10^4`
- `0 <= nums[i] <= 10^5`

## Hints

<details>
<summary>Hint 1 — what's the greedy rule?</summary>

At each index you can reach, update the **furthest index reachable so far**. If at any point your current position exceeds the furthest reachable index, you're stuck. If you make it through the whole array, you can reach the end.

The greedy rule: **always track the maximum reachable index**.
</details>

<details>
<summary>Hint 2 — why does it work for this problem?</summary>

If you can reach index `i`, you can reach any index `j ≤ i + nums[i]`. The "furthest reach" captures all possibilities from everything reachable so far — you don't need to track which specific path gets you there, just whether it's possible to get there at all. Making the locally greedy choice (maximizing reach at each step) is globally optimal because reach can only help, never hurt.
</details>

<details>
<summary>Hint 3 — implementation sketch</summary>

```js
let maxReach = 0;
for (let i = 0; i < nums.length; i++) {
  if (i > maxReach) return false;        // stuck before reaching here
  maxReach = Math.max(maxReach, i + nums[i]);
}
return true;
```
</details>

## Write your solution
→ [`../solutions/04-jump-game.js`](../solutions/04-jump-game.js)

## Follow-ups
- **Jump Game II** (Q5) — what's the *minimum* number of jumps to reach the end?
- **Jump Game III** — you can jump left or right; determine if you can reach any index with value 0.
- **Jump Game VII** — you can only jump within a range; determine reachability.
