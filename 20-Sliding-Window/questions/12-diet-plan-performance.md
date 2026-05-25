# Q12 — Diet Plan Performance

**Difficulty:** Easy (LeetCode 1176)
**Pattern:** Fixed-size sliding window
**Expected:** O(n) time · O(1) space

## Problem

A dieter tracks their calorie intake for `n` days in an array `calories`. They evaluate their performance every `k` consecutive days.

For each contiguous window of `k` days:
- If the total calories is **less than** `lower`, they score **−1**.
- If the total calories is **greater than** `upper`, they score **+1**.
- Otherwise, they score **0**.

Return the total score after evaluating all windows.

## Examples

### Example 1
```
Input:  calories = [1, 2, 3, 4, 5],  k = 1,  lower = 3,  upper = 3
Output: 0
```
Scores: -1 (1<3), -1 (2<3), 0 (3=3), +1 (4>3), +1 (5>3) → total = 0.

### Example 2
```
Input:  calories = [3, 2],  k = 2,  lower = 0,  upper = 1
Output: 1
```
Only window: [3, 2] → sum=5 > 1 → score = +1.

### Example 3
```
Input:  calories = [6, 5, 0, 0],  k = 2,  lower = 1,  upper = 5
Output: 0
```
- [6,5] → 11 > 5 → +1
- [5,0] →  5 ≤ 5 → 0
- [0,0] →  0 < 1 → -1
Total = 0.

## Constraints
- `1 <= k <= calories.length <= 10^5`
- `0 <= calories[i] <= 1000`
- `0 <= lower <= upper`

## Hints

<details>
<summary>Hint 1 — standard fixed-size window</summary>

This is Q1/Q3 with a different "update answer" step. After each window position, compare `windowSum` to `lower` and `upper` and add the appropriate score.
</details>

<details>
<summary>Hint 2 — full outline</summary>

1. Build the first window sum.
2. Score it.
3. Slide: add `calories[right]`, remove `calories[right - k]`, score the new sum.
4. Return total score.
</details>

## Write your solution
→ [`../solutions/12-diet-plan-performance.js`](../solutions/12-diet-plan-performance.js)

## Follow-ups
- What if the scoring rules changed — e.g., `+2` for exceeding `upper` by more than 50%?
- What's the minimum number of days to guarantee a positive total score if `lower = 0`?
