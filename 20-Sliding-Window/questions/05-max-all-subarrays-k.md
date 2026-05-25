# Q5 — Maximum of All Subarrays of Size K

**Difficulty:** Medium
**Pattern:** Fixed-size sliding window + monotonic deque
**Expected:** O(n) time · O(k) space

## Problem

You are given an array of integers `arr` and a positive integer `k`. Return an array of the **maximum value** in each contiguous window of size `k`.

The output array will have `arr.length - k + 1` elements.

> **Why this matters:** the naive approach (scan each window for its max) is O(n·k). This problem is the classic motivation for the **monotonic deque** — a data structure that gives you the window maximum in amortized O(1) per step.

## Examples

### Example 1
```
Input:  arr = [1, 3, -1, -3, 5, 3, 6, 7],  k = 3
Output: [3, 3, 5, 5, 6, 7]
```
- [1,3,-1]  → 3
- [3,-1,-3] → 3
- [-1,-3,5] → 5
- [-3,5,3]  → 5
- [5,3,6]   → 6
- [3,6,7]   → 7

### Example 2
```
Input:  arr = [2, 1, 5, 3, 6, 4, 8, 2],  k = 3
Output: [5, 5, 6, 6, 8, 8]
```

### Example 3
```
Input:  arr = [4, 3, 2, 1],  k = 2
Output: [4, 3, 2]
```

## Constraints
- `1 <= k <= arr.length <= 10^5`
- `-10^4 <= arr[i] <= 10^4`

## Hints

<details>
<summary>Hint 1 — brute force (O(n·k))</summary>

For each starting index `i`, loop through `arr[i..i+k-1]` to find the maximum. This is correct but too slow for large inputs.
</details>

<details>
<summary>Hint 2 — why a simple variable doesn't work</summary>

When a new element enters the window you can update the max if the new element is bigger. But when the **current maximum leaves** the window, you have no quick way to find the next largest. You'd have to rescan — making it O(n·k) again.
</details>

<details>
<summary>Hint 3 — monotonic deque (the real solution)</summary>

Maintain a deque of **indexes** in decreasing order of their values. Rules:

1. Before adding `right`: pop from the **back** of the deque while the back element's value is ≤ `arr[right]`. (Those elements can never be the window max while `arr[right]` is in the window.)
2. Pop from the **front** if `deque[0] <= right - k`. (It left the window.)
3. Push `right` to the back.
4. When `right >= k - 1`, the front of the deque is the index of the current window's maximum.

Read the full walk-through in `notes.md` Lesson 11.
</details>

## Write your solution
→ [`../solutions/05-max-all-subarrays-k.js`](../solutions/05-max-all-subarrays-k.js)

## Follow-ups
- How does the solution change for **minimum** of each window? (Q6)
- This problem is also listed as Q31 in the Hard section (same problem, ensure you truly understand the deque). Return to Q31 after solving Q6 and Q31 will feel easy.
