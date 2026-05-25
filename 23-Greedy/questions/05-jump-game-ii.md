# Q5 — Jump Game II

**Difficulty:** Medium
**Pattern:** Greedy · BFS-level tracking
**Expected:** O(n) time · O(1) space

## Problem

Same setup as Jump Game (Q4): you start at index 0 of array `nums`, where `nums[i]` is the maximum jump length from index `i`. You are **guaranteed** to be able to reach the last index.

Return the **minimum number of jumps** needed to reach the last index.

## Examples

### Example 1
```
Input:  nums = [2, 3, 1, 1, 4]
Output: 2
```
Jump 1 step to index 1 (value 3), then jump 3 steps to index 4. Two jumps total.

### Example 2
```
Input:  nums = [2, 3, 0, 1, 4]
Output: 2
```
Jump to index 1, then jump to index 4.

### Example 3
```
Input:  nums = [1, 2, 1, 1, 1]
Output: 3
```

### Example 4
```
Input:  nums = [0]
Output: 0
```
Already at the destination — zero jumps.

## Constraints
- `1 <= nums.length <= 3 * 10^4`
- `0 <= nums[i] <= 10^5`
- The input is **guaranteed** to allow reaching the last index.

## Hints

<details>
<summary>Hint 1 — think in "jump levels"</summary>

Imagine you're doing BFS on the jump graph. Level 0 is just index 0. Level 1 is every index reachable in exactly 1 jump from level 0. Level 2 is every index reachable in exactly 2 jumps. And so on.

You want the level of the last index. But you don't need to actually build the BFS graph — the greedy insight lets you simulate it in O(n).
</details>

<details>
<summary>Hint 2 — what's the greedy rule?</summary>

Track two boundaries:
- `currentEnd`: the furthest index reachable with the number of jumps you've taken so far.
- `furthest`: the furthest index reachable from anywhere within the current jump level.

When you reach `currentEnd`, you must take another jump. Set `currentEnd = furthest` and increment jump count.

The greedy rule: **extend your reach as far as possible within each jump level**.
</details>

<details>
<summary>Hint 3 — implementation sketch</summary>

```js
let jumps = 0, currentEnd = 0, furthest = 0;
for (let i = 0; i < nums.length - 1; i++) {   // stop before last index
  furthest = Math.max(furthest, i + nums[i]);
  if (i === currentEnd) {        // used up current jump level
    jumps++;
    currentEnd = furthest;
  }
}
return jumps;
```

Note: the loop stops at `n - 2` because reaching `n - 1` doesn't require an additional jump count.
</details>

## Write your solution
→ [`../solutions/05-jump-game-ii.js`](../solutions/05-jump-game-ii.js)

## Follow-ups
- What if you wanted to return the actual sequence of jump positions, not just the count?
- **Jump Game** (Q4) — same setup, just return whether the end is reachable.
- What if jumping had a cost (`costs[i]` per jump from index `i`) and you wanted to minimize total cost?
