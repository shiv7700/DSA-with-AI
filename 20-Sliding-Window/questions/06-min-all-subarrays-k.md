# Q6 — Minimum of All Subarrays of Size K

**Difficulty:** Medium
**Pattern:** Fixed-size sliding window + monotonic deque
**Expected:** O(n) time · O(k) space

## Problem

You are given an array of integers `arr` and a positive integer `k`. Return an array of the **minimum value** in each contiguous window of size `k`.

## Examples

### Example 1
```
Input:  arr = [1, 3, -1, -3, 5, 3, 6, 7],  k = 3
Output: [-1, -3, -3, -3, 3, 3]
```
- [1,3,-1]  → -1
- [3,-1,-3] → -3
- [-1,-3,5] → -3
- [-3,5,3]  → -3
- [5,3,6]   → 3
- [3,6,7]   → 3

### Example 2
```
Input:  arr = [2, 5, 1, 7, 3, 4],  k = 3
Output: [1, 1, 1, 3]
```

### Example 3
```
Input:  arr = [4, 3, 2, 1],  k = 2
Output: [3, 2, 1]
```

## Constraints
- `1 <= k <= arr.length <= 10^5`
- `-10^4 <= arr[i] <= 10^4`

## Hints

<details>
<summary>Hint 1 — relate to Q5</summary>

Q5 found the **maximum** using a deque that maintained a **decreasing** sequence (pop from back when the new value is larger). For the minimum, flip the invariant: maintain an **increasing** sequence (pop from back when the new value is **smaller**).
</details>

<details>
<summary>Hint 2 — the deque invariant for minimum</summary>

Maintain a deque of indexes where the values are in **strictly increasing order** (front = smallest).

- Pop from the back while `arr[deque.back] >= arr[right]`.
- Pop from the front if `deque.front <= right - k`.
- The front always holds the index of the current window's minimum.
</details>

## Write your solution
→ [`../solutions/06-min-all-subarrays-k.js`](../solutions/06-min-all-subarrays-k.js)

## Follow-ups
- Can you solve this with the same function you wrote for Q5 by negating all values?
- How would you modify the deque approach to find both min and max simultaneously in a single pass?
