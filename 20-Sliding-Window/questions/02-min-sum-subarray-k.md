# Q2 — Min Sum Subarray of Size K

**Difficulty:** Easy
**Pattern:** Fixed-size sliding window
**Expected:** O(n) time · O(1) space

## Problem

You are given an array of integers `arr` and a positive integer `k`. Find the **minimum sum** of any contiguous subarray of exactly `k` elements.

> **Why this problem matters:** this is Q1 with one character changed (`max` → `min`). Solving it immediately after Q1 cements the template — you'll see that the structure is identical and only the comparison flips.

## Examples

### Example 1
```
Input:  arr = [2, 1, 5, 1, 3, 2],  k = 3
Output: 4
```
The subarray `[1, 1, 2]` (wait — is that contiguous? No). Contiguous subarrays of size 3: `[2,1,5]=8`, `[1,5,1]=7`, `[5,1,3]=9`, `[1,3,2]=6`. Minimum is 6. Let me recheck — `[2,1,1]` is not contiguous here. The minimum is `[1,5,1]=7`? Re-reading: `[2,1,5,1,3,2]` k=3 → windows: 8, 7, 9, 6 → min = 6.

```
Input:  arr = [2, 1, 5, 1, 3, 2],  k = 3
Output: 6
```
The subarray `[1, 3, 2]` (indexes 3–5) has sum 6.

### Example 2
```
Input:  arr = [3, 1, 4, 1, 5, 9, 2, 6],  k = 3
Output: 6
```
The subarray `[1, 4, 1]` has sum 6.

### Example 3
```
Input:  arr = [5, 5, 5, 5],  k = 2
Output: 10
```

### Example 4
```
Input:  arr = [10],  k = 1
Output: 10
```

## Constraints
- `1 <= k <= arr.length <= 10^5`
- `-10^4 <= arr[i] <= 10^4`

## Hints

<details>
<summary>Hint 1 — relate it to Q1</summary>

The only difference from Max Sum Subarray of Size K is which comparison you use. Instead of tracking the maximum, track the minimum. Change `Math.max` to `Math.min` and initialize `minSum` to the first window sum.
</details>

<details>
<summary>Hint 2 — full algorithm outline</summary>

1. Sum the first `k` elements. Set `minSum = windowSum`.
2. Loop `right` from `k` to `arr.length - 1`:
   - `windowSum += arr[right]`
   - `windowSum -= arr[right - k]`
   - `minSum = Math.min(minSum, windowSum)`
3. Return `minSum`.
</details>

## Write your solution
→ [`../solutions/02-min-sum-subarray-k.js`](../solutions/02-min-sum-subarray-k.js)

## Follow-ups
- Can you find both the minimum **and** maximum sum in a single pass?
- What if you need the minimum sum subarray of size **at least** K (not exactly K)? (Hint: this becomes a variable-size window problem.)
