# Q04 — House Robber

**Difficulty:** Easy
**Pattern:** 1D linear DP — rob-or-skip decision
**Expected:** O(n) time · O(1) space

## Problem

You are a robber planning to rob houses along a street. Each house has a certain amount of money. Adjacent houses have a connected security system: **if you rob two adjacent houses, the alarm will trigger**.

Given an integer array `nums` where `nums[i]` is the amount of money in the `i`-th house, return the maximum amount of money you can rob without triggering the alarm.

## Examples

### Example 1
```
Input:  nums = [1, 2, 3, 1]
Output: 4
```
Rob house 0 (1) and house 2 (3). Total = 4.

### Example 2
```
Input:  nums = [2, 7, 9, 3, 1]
Output: 12
```
Rob house 0 (2), house 2 (9), and house 4 (1). Total = 12.

### Example 3
```
Input:  nums = [2, 1, 1, 2]
Output: 4
```
Rob house 0 (2) and house 3 (2). Total = 4.

## Constraints
- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 400`

## Hints

<details>
<summary>Hint 1 — the key decision at each house</summary>

At each house `i`, you face a binary choice: rob it or skip it.
- If you rob it: you gain `nums[i]` but you couldn't have robbed `i-1`. Best you could have done before is `dp[i-2]`.
- If you skip it: your total is whatever was best up to `i-1`, which is `dp[i-1]`.
</details>

<details>
<summary>Hint 2 — write the recurrence</summary>

`dp[i] = max(nums[i] + dp[i-2],  dp[i-1])`

Base cases: `dp[0] = nums[0]`, `dp[1] = max(nums[0], nums[1])`.
</details>

<details>
<summary>Hint 3 — space optimization</summary>

You only ever need `dp[i-1]` and `dp[i-2]`. Use two variables `prev1` and `prev2` instead of an array.
</details>

## Write your solution
→ [`../solutions/04-house-robber.js`](../solutions/04-house-robber.js)

## Follow-ups
- **House Robber II** (Q05) — the street is circular (first and last houses are adjacent).
- **House Robber III** (Q12) — houses are arranged in a binary tree.
- What if the alarm triggers only if you rob three consecutive houses (instead of two)?
