# Q05 — House Robber II

**Difficulty:** Medium
**Pattern:** 1D linear DP — circular constraint, two-pass trick
**Expected:** O(n) time · O(1) space

## Problem

All houses are arranged in a **circle** — the first house is adjacent to the last. You cannot rob two adjacent houses. Given `nums`, return the maximum money you can rob.

## Examples

### Example 1
```
Input:  nums = [2, 3, 2]
Output: 3
```
You can't rob house 0 and house 2 together (they're adjacent in the circle). Best: just house 1 (3).

### Example 2
```
Input:  nums = [1, 2, 3, 1]
Output: 4
```
Rob house 0 (1) and house 2 (3). Total = 4.

### Example 3
```
Input:  nums = [1, 2, 3]
Output: 3
```

## Constraints
- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 1000`

## Hints

<details>
<summary>Hint 1 — the circular problem breaks into two linear ones</summary>

Since house 0 and house `n-1` can't both be robbed, exactly one of these must be true for any optimal solution:
- House 0 is **not** robbed (solve the linear problem on `nums[1..n-1]`)
- House `n-1` is **not** robbed (solve the linear problem on `nums[0..n-2]`)

The answer is the max of those two.
</details>

<details>
<summary>Hint 2 — reuse your Q04 solution</summary>

Write a helper `robLinear(arr)` that solves the non-circular version (exactly Q04). Then return `max(robLinear(nums.slice(1)), robLinear(nums.slice(0, -1)))`.
</details>

<details>
<summary>Hint 3 — edge case</summary>

If `n === 1`, return `nums[0]` directly (the circular constraint doesn't apply with one house).
</details>

## Write your solution
→ [`../solutions/05-house-robber-ii.js`](../solutions/05-house-robber-ii.js)

## Follow-ups
- **House Robber III** (Q12) — the circular problem's tree sibling.
- Can you generalize to "no k-consecutive houses"?
