# Q19 — Subarray Sum Equals K

**Difficulty:** Medium
**Pattern:** Prefix sum + hash map
**Expected:** O(n) time · O(n) space

## Problem

Given an integer array `nums` and an integer `k`, return the **total number of contiguous subarrays** whose sum equals `k`.

A subarray is a contiguous, non-empty slice of the array (e.g., `nums[i..j]` for `i <= j`).

## Examples

### Example 1
```
Input:  nums = [1, 1, 1],  k = 2
Output: 2
```
Two valid subarrays: `[1, 1]` (indexes 0..1) and `[1, 1]` (indexes 1..2).

### Example 2
```
Input:  nums = [1, 2, 3],  k = 3
Output: 2
```
Subarrays `[3]` and `[1, 2]`.

### Example 3 (with negatives)
```
Input:  nums = [1, -1, 0],  k = 0
Output: 3
```
Subarrays:
- `[1, -1]` — sum = 0
- `[0]` — sum = 0
- `[1, -1, 0]` — sum = 0

### Example 4
```
Input:  nums = [3, 4, 7, 2, -3, 1, 4, 2],  k = 7
Output: 4
```

## Constraints
- `1 <= nums.length <= 2 * 10^4`
- `-1000 <= nums[i] <= 1000`
- `-10^7 <= k <= 10^7`

## Hints

<details>
<summary>Hint 1 — why sliding window doesn't work here</summary>

Sliding window works when growing the window strictly increases the sum and shrinking it strictly decreases it. With **negative numbers in the array**, expanding the window can actually *decrease* the sum — so the window approach breaks down.
</details>

<details>
<summary>Hint 2 — prefix sums</summary>

Let `S[i]` = the sum of `nums[0..i-1]` (with `S[0] = 0` representing the empty prefix). Then the sum of any subarray `nums[i..j]` is:
```
sum(i, j) = S[j + 1] - S[i]
```

We want subarrays where this difference equals `k`. Rearranging: `S[i] = S[j + 1] - k`. So at each prefix endpoint `j + 1`, we want to count how many earlier prefixes `S[i]` equal `currentPrefix - k`.
</details>

<details>
<summary>Hint 3 — the implementation</summary>

```js
const seen = new Map([[0, 1]]);   // prefix 0 has occurred once (the empty prefix)
let sum = 0, count = 0;

for (const x of nums) {
  sum += x;
  count += seen.get(sum - k) ?? 0;
  seen.set(sum, (seen.get(sum) ?? 0) + 1);
}

return count;
```

The initial `[0, 1]` in the map handles the case where a prefix starting from index 0 itself equals `k`.
</details>

## Write your solution
→ [`../solutions/19-subarray-sum-equals-k.js`](../solutions/19-subarray-sum-equals-k.js)

## Follow-ups
- **Continuous Subarray Sum** — find subarrays whose sum is a multiple of `k`.
- **Subarray Sums Divisible by K** — same prefix idea, but you store `prefix mod k`.
- **Maximum Size Subarray Sum Equals K** — return the **length** of the longest such subarray, not the count.
