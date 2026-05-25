# Q3 — Average of All Subarrays of Size K

**Difficulty:** Easy
**Pattern:** Fixed-size sliding window
**Expected:** O(n) time · O(n) space (output array)

## Problem

You are given an array of integers `arr` and a positive integer `k`. Return a new array where the element at index `i` is the **average** of the subarray `arr[i..i+k-1]`.

The output array will have `arr.length - k + 1` elements.

## Examples

### Example 1
```
Input:  arr = [1, 3, 2, 6, -1, 4, 1, 8, 2],  k = 5
Output: [2.2, 2.8, 2.4, 3.6, 2.8]
```
- Window [1,3,2,6,-1] = 11 → avg 2.2
- Window [3,2,6,-1,4] = 14 → avg 2.8
- Window [2,6,-1,4,1] = 12 → avg 2.4
- Window [6,-1,4,1,8] = 18 → avg 3.6
- Window [-1,4,1,8,2] = 14 → avg 2.8

### Example 2
```
Input:  arr = [10, 20, 30],  k = 2
Output: [15, 25]
```

### Example 3
```
Input:  arr = [5],  k = 1
Output: [5]
```

## Constraints
- `1 <= k <= arr.length <= 10^5`
- `-10^4 <= arr[i] <= 10^4`
- Answers within `10^-5` of the actual answer are accepted.

## Hints

<details>
<summary>Hint 1 — same as Q1, but record every window</summary>

In Q1 you tracked only the maximum. Here, you must record the average for **every** window position. Use the same sliding window sum, but push `windowSum / k` to a result array at each step.
</details>

<details>
<summary>Hint 2 — full algorithm outline</summary>

1. Sum the first `k` elements. Push `windowSum / k` to `result`.
2. Loop `right` from `k` to `arr.length - 1`:
   - `windowSum += arr[right]`
   - `windowSum -= arr[right - k]`
   - `result.push(windowSum / k)`
3. Return `result`.
</details>

## Write your solution
→ [`../solutions/03-average-subarrays-k.js`](../solutions/03-average-subarrays-k.js)

## Follow-ups
- What if `k` can be 0? How would you guard against division by zero?
- How would you round each average to 2 decimal places?
- **Diet Plan Performance** (Q12) is a direct extension of this idea — check it out after.
