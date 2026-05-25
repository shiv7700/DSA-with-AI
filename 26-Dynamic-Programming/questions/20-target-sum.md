# Q20 — Target Sum

**Difficulty:** Medium
**Pattern:** Knapsack (0/1) — count subsets with given sum
**Expected:** O(n × sum) time · O(sum) space

## Problem

You are given an integer array `nums` and an integer `target`. You want to assign either a `+` or `-` sign to each element in `nums`. Return the **number of ways** you can assign symbols to make the expression evaluate to `target`.

## Examples

### Example 1
```
Input:  nums = [1, 1, 1, 1, 1], target = 3
Output: 5
```
There are 5 ways: `-++++`, `+-+++`, `++-++`, `+++-+`, `++++-`.

### Example 2
```
Input:  nums = [1], target = 1
Output: 1
```

## Constraints
- `1 <= nums.length <= 20`
- `0 <= nums[i] <= 1000`
- `0 <= sum(nums[i]) <= 1000`
- `-1000 <= target <= 1000`

## Hints

<details>
<summary>Hint 1 — reframe as a subset sum problem</summary>

Let `P` = set of numbers with `+` sign, `N` = set with `-` sign. Then:
- `sum(P) - sum(N) = target`
- `sum(P) + sum(N) = totalSum`

Adding these: `2 * sum(P) = target + totalSum`, so `sum(P) = (target + totalSum) / 2`.

You need to count the number of subsets that sum to `(target + totalSum) / 2`.
</details>

<details>
<summary>Hint 2 — if the required sum is not an integer, answer is 0</summary>

If `(target + totalSum)` is odd, or if the required subset sum is negative or greater than `totalSum`, return 0 immediately.
</details>

<details>
<summary>Hint 3 — counting subsets (not just existence)</summary>

`dp[w]` = number of subsets summing to exactly `w`. Start with `dp[0] = 1`. For each number `num`, traverse capacity backwards and add: `dp[w] += dp[w - num]`.
</details>

## Write your solution
→ [`../solutions/20-target-sum.js`](../solutions/20-target-sum.js)

## Follow-ups
- How would you enumerate (not just count) all assignments that reach the target?
- What if numbers can be negative?
