# Q1 — Max Sum Subarray of Size K

**Difficulty:** Easy
**Pattern:** Fixed-size sliding window
**Expected:** O(n) time · O(1) space

## Problem

You are given an array of integers `arr` and a positive integer `k`. Find the **maximum sum** of any contiguous subarray of exactly `k` elements.

> **Why this problem matters:** this is the canonical entry point for the sliding window pattern. Every fixed-size window problem follows the same template you'll build here — add the new right element, subtract the old left element, track the best result.

## Examples

### Example 1
```
Input:  arr = [2, 1, 5, 1, 3, 2],  k = 3
Output: 9
```
The subarray `[5, 1, 3]` (indexes 2–4) has the largest sum of 9.

### Example 2
```
Input:  arr = [2, 3, 4, 1, 5],  k = 2
Output: 7
```
The subarray `[3, 4]` has the largest sum of 7.

### Example 3
```
Input:  arr = [1, 1, 1, 1, 1],  k = 3
Output: 3
```

### Example 4 (window equals full array)
```
Input:  arr = [4, 2, 7],  k = 3
Output: 13
```

## Constraints
- `1 <= k <= arr.length <= 10^5`
- `-10^4 <= arr[i] <= 10^4`

## Hints

<details>
<summary>Hint 1 — brute force first</summary>

For each valid starting index `i` (from 0 to `n - k`), sum the `k` elements `arr[i]` through `arr[i + k - 1]`. Track the maximum. This is O(n·k).
</details>

<details>
<summary>Hint 2 — the sliding window insight</summary>

After computing the first window sum, each subsequent window differs from the previous by exactly **two elements**: one enters on the right, one leaves on the left.

```
window A: [ arr[i],   arr[i+1], …, arr[i+k-1] ]
window B: [ arr[i+1], arr[i+2], …, arr[i+k]   ]

sum(B) = sum(A) − arr[i] + arr[i+k]
```

So you never need more than one subtraction and one addition per step.
</details>

<details>
<summary>Hint 3 — full algorithm outline</summary>

1. Sum the first `k` elements. Set `maxSum = windowSum`.
2. Loop `right` from `k` to `arr.length - 1`:
   - `windowSum += arr[right]`
   - `windowSum -= arr[right - k]`
   - `maxSum = Math.max(maxSum, windowSum)`
3. Return `maxSum`.
</details>

## Write your solution
→ [`../solutions/01-max-sum-subarray-k.js`](../solutions/01-max-sum-subarray-k.js)

## Follow-ups
- What if you also need to return the **starting index** of the maximum window, not just the sum?
- What if `k` could be larger than `arr.length`? How would you handle that?
- Now solve the **minimum** sum version. How much changes?
