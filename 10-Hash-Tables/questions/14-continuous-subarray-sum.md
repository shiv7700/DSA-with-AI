# Q14 — Continuous Subarray Sum (Multiple of K)

**Difficulty:** Medium
**Pattern:** Prefix sum mod k + Map
**Expected:** O(n) time · O(k) space

## Problem

Given an integer array `nums` and an integer `k`, return `true` if `nums` has a **good subarray** — a contiguous subarray of length **at least 2** whose sum is a multiple of `k` (i.e., the sum is `0, k, 2k, 3k, ...`).

## Examples

### Example 1
```
Input:  nums = [23, 2, 4, 6, 7],  k = 6
Output: true
```
`[2, 4]` has sum 6, which is 1 × 6.

### Example 2
```
Input:  nums = [23, 2, 6, 4, 7],  k = 6
Output: true
```
`[23, 2, 6, 4, 7]` has sum 42, which is 7 × 6.

### Example 3
```
Input:  nums = [23, 2, 6, 4, 7],  k = 13
Output: false
```

### Example 4
```
Input:  nums = [5, 0, 0, 0],  k = 3
Output: true
```
`[0, 0]` has sum 0 = 0 × 3.

## Constraints
- `1 <= nums.length <= 10^5`
- `0 <= nums[i] <= 10^9`
- `0 <= k <= 2^31 - 1`

## Hints

<details>
<summary>Hint 1 — the modular arithmetic insight</summary>

`sum(nums[i..j])` is a multiple of `k` if and only if:
```
prefixSum[j+1] % k == prefixSum[i] % k
```

So as you compute the running prefix sum, store `(prefixSum % k) → earliest index` in a map. When you see the same remainder again — at a distance of at least 2 — you've found a valid subarray.
</details>

<details>
<summary>Hint 2 — initialization and edge cases</summary>

Initialize the map with `{0: -1}` to represent the empty prefix (before any element). This handles subarrays that start at index 0.

The "at least length 2" constraint means you need `currentIndex - map.get(rem) >= 2`.

**Edge case:** if `k = 0`, you can't take modulo. In that case, you're looking for a subarray of length ≥ 2 with sum `0`. Handle separately.
</details>

## Write your solution
→ [`../solutions/14-continuous-subarray-sum.js`](../solutions/14-continuous-subarray-sum.js)

## Follow-ups
- Instead of checking existence, count all such subarrays.
- **Subarray Sum Divisible by K** — a related variant where you count subarrays with sum divisible by k.
