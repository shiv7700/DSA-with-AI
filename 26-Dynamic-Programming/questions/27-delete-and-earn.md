# Q27 — Delete and Earn

**Difficulty:** Medium
**Pattern:** 1D linear DP — reduce to House Robber
**Expected:** O(n + max(nums)) time · O(max(nums)) space

## Problem

You are given an integer array `nums`. In one operation, you choose a number `x`, **delete all occurrences** of `x - 1`, `x`, and `x + 1`, and earn `x` points (per occurrence deleted of `x`). Repeat until the array is empty. Return the maximum number of points you can earn.

## Examples

### Example 1
```
Input:  nums = [3, 4, 2]
Output: 6
```
Take 3 (earn 3, delete 2 and 4). Then take nothing. Total: 3. Or take 4 (earn 4, delete 3 and 5). Total: 4. Or take 2 then 4: 2 + 4 = 6.

### Example 2
```
Input:  nums = [2, 2, 3, 3, 3, 4]
Output: 9
```
Take 3 three times (earn 3×3=9, delete all 2s and 4s). Total: 9.

## Constraints
- `1 <= nums.length <= 2 * 10^4`
- `1 <= nums[i] <= 10^4`

## Hints

<details>
<summary>Hint 1 — reduce to House Robber</summary>

If you take any `x`, you must delete all `x-1` and `x+1`. This means you can never take adjacent values together. Does that sound familiar?

Build an array `points` where `points[x]` = `x * (count of x in nums)`. Now the problem becomes: pick a subset of values, where no two consecutive values are chosen, to maximize the total points. That's exactly House Robber!
</details>

<details>
<summary>Hint 2 — implement House Robber on the points array</summary>

Run the House Robber algorithm on `points[1..maxVal]`. The indices represent the numeric values; `points[i]` is the reward for "robbing" value `i`.
</details>

## Write your solution
→ [`../solutions/27-delete-and-earn.js`](../solutions/27-delete-and-earn.js)

## Follow-ups
- What if, instead of all `x-1` and `x+1`, deleting `x` only removed exactly one `x-1` and one `x+1`?
