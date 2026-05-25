# Q13 — Subarray Sum Equals K

**Difficulty:** Medium
**Pattern:** Prefix sum + Map
**Expected:** O(n) time · O(n) space

## Problem

Given an array of integers `nums` and an integer `k`, return the **total number of contiguous subarrays** whose elements sum to `k`.

## Examples

### Example 1
```
Input:  nums = [1, 1, 1],  k = 2
Output: 2
```
Subarrays: `[1, 1]` at indexes 0–1, and `[1, 1]` at indexes 1–2.

### Example 2
```
Input:  nums = [1, 2, 3],  k = 3
Output: 2
```
Subarrays: `[3]` at index 2, and `[1, 2]` at indexes 0–1.

### Example 3 (negative numbers)
```
Input:  nums = [1, -1, 1, -1, 1],  k = 0
Output: 4
```

### Example 4
```
Input:  nums = [1],  k = 0
Output: 0
```

## Constraints
- `1 <= nums.length <= 2 * 10^4`
- `-1000 <= nums[i] <= 1000`
- `-10^7 <= k <= 10^7`

## Hints

<details>
<summary>Hint 1 — brute force</summary>

For every pair `(i, j)`, compute `sum(nums[i..j])` and count the ones equal to `k`. O(n²) or O(n³). Too slow.
</details>

<details>
<summary>Hint 2 — prefix sum key insight</summary>

Let `prefixSum[i]` = sum of `nums[0..i-1]`.

A subarray `nums[i..j]` has sum `k` if and only if:
```
prefixSum[j+1] - prefixSum[i] = k
```
which means:
```
prefixSum[i] = prefixSum[j+1] - k
```

So as you compute the running prefix sum left to right, you need to know: "how many previous prefix sums equal `currentSum - k`?" A `Map` (prefixSum → count) answers this in O(1).

Initialize the map with `{0: 1}` to account for subarrays starting at index 0.
</details>

<details>
<summary>Hint 3 — trace for [1, 1, 1], k = 2</summary>

```
prefixSums seen: { 0: 1 }
sum = 0

i=0: sum = 1. Need sum - k = -1. Not in map. Add {1: 1}.
i=1: sum = 2. Need sum - k = 0. Found! count 0 → count 1. Add {2: 1}.
i=2: sum = 3. Need sum - k = 1. Found (count 1)! count 1 → count 2. Add {3: 1}.

Result: 2 ✓
```
</details>

## Write your solution
→ [`../solutions/13-subarray-sum-k.js`](../solutions/13-subarray-sum-k.js)

## Follow-ups
- **Continuous Subarray Sum** (Q14) — subarray sum that is a multiple of `k`.
- What if you need to return the actual subarray(s), not just the count?
- Does the solution work if `nums` contains only positive numbers? Could you use a simpler approach then?
