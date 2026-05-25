# Q9 — Count Range Sum (LeetCode 327)

**Difficulty:** Medium
**Pattern:** Fenwick Tree + prefix sums + coordinate compression
**Expected:** O(n log n) time · O(n) space

## Problem

This is [LeetCode 327 — Count of Range Sum](https://leetcode.com/problems/count-of-range-sum/).

Given an integer array `nums` and two integers `lower` and `upper`, return the number of **range sums** that lie in `[lower, upper]` (inclusive).

A range sum `S(i, j)` is defined as the sum of elements in `nums` between indexes `i` and `j` (0-indexed, both inclusive).

## Examples

### Example 1

```
Input:  nums = [-2, 5, -1],  lower = -2,  upper = 2
Output: 3

Range sums:
  S(0,0) = -2  ✓ (in [-2, 2])
  S(0,1) =  3  ✗
  S(0,2) =  2  ✓
  S(1,1) =  5  ✗
  S(1,2) =  4  ✗
  S(2,2) = -1  ✓
```

### Example 2

```
Input:  nums = [0],  lower = 0,  upper = 0
Output: 1
```

### Example 3

```
Input:  nums = [1, -1],  lower = 0,  upper = 0
Output: 1   (S(0,1) = 0)
```

## Constraints

- `1 <= nums.length <= 10^5`
- `-2^31 <= nums[i] <= 2^31 - 1`
- `-10^5 <= lower <= upper <= 10^5`
- The answer is guaranteed to fit in a 32-bit integer.

## Hints

<details>
<summary>Hint 1 — prefix sums</summary>

Build a prefix sum array `pre` where `pre[0] = 0` and `pre[i] = nums[0] + ... + nums[i-1]`.

Then `S(i, j) = pre[j+1] - pre[i]`.

The question becomes: for how many pairs `(i, j)` with `i < j+1` is `lower <= pre[j+1] - pre[i] <= upper`?

Rearranging: `pre[j+1] - upper <= pre[i] <= pre[j+1] - lower`.

</details>

<details>
<summary>Hint 2 — sweep with a BIT</summary>

Walk through the prefix sums left to right. When you're at prefix `pre[k]`:
- Count how many previous prefix sums `pre[i]` (with `i < k`) satisfy `pre[k] - upper <= pre[i] <= pre[k] - lower`.
- That's `bit.rangeQuery(rank(pre[k] - upper), rank(pre[k] - lower))`.
- Then insert `pre[k]` into the BIT.

</details>

<details>
<summary>Hint 3 — coordinate compression</summary>

The prefix sums and the bounds `pre[k] - upper`, `pre[k] - lower` can all be large. Collect all the values you'll ever query or insert, sort and deduplicate them, assign 1-indexed ranks. Build the BIT over those ranks.

⚠️ Be careful with `lower` and `upper` boundaries during rank lookup — if a value doesn't exist in the compressed set, find the first rank that is ≥ that value (lower bound) or ≤ that value (upper bound).

</details>

## Write your solution

→ [`../solutions/09-count-range-sum.js`](../solutions/09-count-range-sum.js)

## Follow-ups

- This can also be solved with a modified merge sort. Which approach do you find cleaner?
- What if `nums` values were bounded to [-100, 100]? Would coordinate compression still be needed?
