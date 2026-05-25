# Q24 — Number of Nice Subarrays

**Difficulty:** Medium (LeetCode 1248)
**Pattern:** Variable-size sliding window — atMost(K) − atMost(K−1) trick
**Expected:** O(n) time · O(1) space

## Problem

Given an array of integers `nums` and an integer `k`, a subarray is called **"nice"** if it contains **exactly `k` odd numbers**.

Return the number of nice subarrays.

## Examples

### Example 1
```
Input:  nums = [1, 1, 2, 1, 1],  k = 3
Output: 2
```
Nice subarrays (with exactly 3 odds):
- [1, 1, 2, 1] — odds at indexes 0, 1, 3 → 3 odds ✓
- [1, 2, 1, 1] — odds at indexes 1, 3, 4 → 3 odds ✓

### Example 2
```
Input:  nums = [2, 4, 6],  k = 1
Output: 0
```
No odd numbers at all.

### Example 3
```
Input:  nums = [2, 2, 2, 1, 2, 2, 1, 2, 2, 2],  k = 2
Output: 16
```

## Constraints
- `1 <= nums.length <= 50000`
- `1 <= nums[i] <= 10^5`
- `1 <= k <= nums.length`

## Hints

<details>
<summary>Hint 1 — why "exactly K" is hard to do directly</summary>

With a variable window, when you add an odd number and now have K+1 odds, you'd shrink from the left. But once you shrink past the leftmost odd, you have K odds again — but any further shrinking might make you go below K. It's hard to count precisely.
</details>

<details>
<summary>Hint 2 — the atMost trick</summary>

```
count(exactly K odds) = count(at most K odds) − count(at most K−1 odds)
```

`atMost(k)` counts subarrays with ≤ k odds. That's a standard variable window: track `odds` (number of odd values in window), shrink while `odds > k`, add `right - left + 1` to count at each step.
</details>

<details>
<summary>Hint 3 — atMost template for this problem</summary>

```js
function atMost(nums, k) {
  let left = 0, odds = 0, count = 0;
  for (let right = 0; right < nums.length; right++) {
    if (nums[right] % 2 !== 0) odds++;
    while (odds > k) {
      if (nums[left] % 2 !== 0) odds--;
      left++;
    }
    count += right - left + 1;
  }
  return count;
}
```
</details>

## Write your solution
→ [`../solutions/24-number-of-nice-subarrays.js`](../solutions/24-number-of-nice-subarrays.js)

## Follow-ups
- **Binary Subarrays With Sum** (Q25) — the same trick applied to subarrays with exactly K ones.
- **Subarrays with K Different Integers** (Q26) — the same trick applied to distinct values.
- Can you solve this problem without the `atMost` trick, using a prefix sum approach instead?
