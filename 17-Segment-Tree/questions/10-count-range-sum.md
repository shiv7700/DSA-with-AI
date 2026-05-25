# Q10 — Count of Range Sum

**Difficulty:** Medium
**Pattern:** Segment Tree / Merge Sort on prefix sums
**Expected:** O(n log n) time · O(n) space

## Problem

Given an integer array `nums` and two integers `lower` and `upper`, return the number of **range sums** that lie in `[lower, upper]` (inclusive).

A range sum `S(i, j)` is defined as the sum of `nums[i]` through `nums[j]` where `0 <= i <= j < n`.

## Examples

### Example 1

```
Input:  nums = [-2, 5, -1], lower = -2, upper = 2
Output: 3
```
Explanation: The three ranges are `[0,0]`, `[2,2]`, and `[0,2]` with sums `-2`, `-1`, and `2`, all within `[-2, 2]`.

### Example 2

```
Input:  nums = [0], lower = 0, upper = 0
Output: 1
```

### Example 3

```
Input:  nums = [-3, 1, 2, -2, 5, -1], lower = -2, upper = 4
Output: 8
```

## Constraints

- `1 <= nums.length <= 10^5`
- `-2^31 <= nums[i] <= 2^31 - 1`
- `-10^5 <= lower <= upper <= 10^5`
- The answer is guaranteed to fit in a 32-bit integer.

## Hints

<details>
<summary>Hint 1 — prefix sum reduction</summary>

Let `prefix[i] = nums[0] + ... + nums[i-1]` (with `prefix[0] = 0`). Then `S(i, j) = prefix[j+1] - prefix[i]`.

We want to count pairs `(i, j)` with `i < j+1` such that:
```
lower <= prefix[j+1] - prefix[i] <= upper
```

Rearranging: for each `j`, count how many `i < j` have `prefix[j] - upper <= prefix[i] <= prefix[j] - lower`.
</details>

<details>
<summary>Hint 2 — merge sort on prefix sums</summary>

Use a modified merge sort on the prefix array. During the merge of left and right halves, for each element `R` in the right half, count how many elements `L` in the (already sorted) left half satisfy `lower <= R - L <= upper`, i.e., `R - upper <= L <= R - lower`.

Since the left half is sorted, this count can be found in O(1) with two pointers, giving O(n log n) overall.
</details>

<details>
<summary>Hint 3 — segment tree / BIT with coordinate compression (alternative)</summary>

Process prefix sums left to right. Compress coordinates. For each new prefix sum `p`, query the frequency of values in `[p - upper, p - lower]` in the tree, then insert `p` into the tree. O(n log n).
</details>

## Write your solution

→ [`../solutions/10-count-range-sum.js`](../solutions/10-count-range-sum.js)

## Follow-ups

- What happens when `lower > upper`? Should return 0 — add that guard.
- Try both the merge-sort and segment-tree approaches and compare implementation complexity.
