# Q26 — Sliding Window Maximum

**Difficulty:** Hard
**Pattern:** Monotonic deque
**Expected:** O(n) time · O(k) space

## Problem

You are given an integer array `nums` and an integer `k`. A "window" of size `k` slides across `nums` from left to right, moving one position at a time. For each window position, find the **maximum value** inside that window.

Return an array of these maximums. The total number of windows is `n - k + 1`.

## Examples

### Example 1
```
Input:  nums = [1, 3, -1, -3, 5, 3, 6, 7],  k = 3
Output: [3, 3, 5, 5, 6, 7]
```

Window-by-window:
```
[1   3  -1] -3   5   3   6   7    →  max = 3
 1  [3  -1  -3]  5   3   6   7    →  max = 3
 1   3 [-1  -3   5]  3   6   7    →  max = 5
 1   3  -1 [-3   5   3]  6   7    →  max = 5
 1   3  -1  -3  [5   3   6]  7    →  max = 6
 1   3  -1  -3   5  [3   6   7]   →  max = 7
```

### Example 2
```
Input:  nums = [1],  k = 1
Output: [1]
```

### Example 3
```
Input:  nums = [9, 11],  k = 2
Output: [11]
```

## Constraints
- `1 <= nums.length <= 10^5`
- `1 <= k <= nums.length`
- Solution must be **O(n) overall**. An O(n × k) brute-force will time out.

## Hints

<details>
<summary>Hint 1 — brute force</summary>

For each window, scan the `k` elements to find the max. O(n × k). Times out at `n = 10^5`.
</details>

<details>
<summary>Hint 2 — monotonic deque (the standard trick)</summary>

Maintain a deque (double-ended queue) of **indexes** whose corresponding values form a **decreasing** sequence (largest at the front).

As you advance `i` through the array:
1. While the deque's back index has a value ≤ `nums[i]`, pop it from the back. (These values are dominated by `nums[i]` — they're smaller **and** earlier, so they can never be the max of any future window.)
2. Push `i` onto the back.
3. If the deque's front index is no longer inside the window (`< i - k + 1`), pop it from the front.
4. Once `i >= k - 1`, the front of the deque is the index of the current window's max. Record `nums[deque.front]` in your result.
</details>

<details>
<summary>Hint 3 — why this is O(n)</summary>

Each index enters the deque exactly once and leaves at most once. Total work across all of `i` is O(n) — amortized.
</details>

## Write your solution
→ [`../solutions/26-sliding-window-maximum.js`](../solutions/26-sliding-window-maximum.js)

## Follow-ups
- **Sliding Window Minimum** — same pattern, flip the comparison.
- **Sliding Window Median** — needs a different structure (two heaps or a balanced BST), because "the middle element" isn't preserved by a monotonic deque.
