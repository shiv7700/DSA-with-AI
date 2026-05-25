# Q10 — Sliding Window Maximum

**Difficulty:** Medium
**Pattern:** Monotonic deque (decreasing) — O(n) solution
**Expected:** O(n) time · O(k) space

## Problem

You are given an integer array `nums` and an integer `k`. There is a sliding window of size `k` that moves from the left edge to the right edge one step at a time. At each position, you can only see the `k` numbers currently in the window.

Return an array of the **maximum value** in each window position.

**Signature:**
```js
function maxSlidingWindow(nums, k) { ... }
```

## Examples

### Example 1
```
Input:  nums = [1, 3, -1, -3, 5, 3, 6, 7],  k = 3
Output: [3, 3, 5, 5, 6, 7]

Explanation:
  Window [1, 3,-1]  → max = 3
  Window [3,-1,-3]  → max = 3
  Window [-1,-3, 5] → max = 5
  Window [-3, 5, 3] → max = 5
  Window [5, 3, 6]  → max = 6
  Window [3, 6, 7]  → max = 7
```

### Example 2
```
Input:  nums = [1],  k = 1
Output: [1]
```

### Example 3
```
Input:  nums = [9, 7, 5, 3, 1],  k = 2
Output: [9, 7, 5, 3]
```

### Example 4
```
Input:  nums = [1, 3, 1, 2, 0, 5],  k = 3
Output: [3, 3, 2, 5]
```

## Constraints
- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`
- `1 <= k <= nums.length`

## Hints

<details>
<summary>Hint 1 — brute force first</summary>

For each window starting position `i`, scan `k` elements to find the max. O(nk) time. This works but times out on large inputs.

```js
// Brute force O(nk)
const result = [];
for (let i = 0; i <= nums.length - k; i++) {
  let max = -Infinity;
  for (let j = i; j < i + k; j++) max = Math.max(max, nums[j]);
  result.push(max);
}
```
</details>

<details>
<summary>Hint 2 — what can we discard?</summary>

Suppose the current window contains `[3, 1, -1]` and the window slides right to include `5`. The numbers `1` and `-1` can never be the maximum of any future window — `5` is to their right and is larger. They're useless. We should discard them immediately.

This is the core insight of the **monotonic deque**: always discard elements from the back that are smaller than the new arrival.
</details>

<details>
<summary>Hint 3 — the deque stores indices, not values</summary>

Maintain a deque of **indices** (not values). The deque is always in **decreasing order of values**.

For each index `i`:
1. Pop from the **front** if `deque[0] < i - k + 1` (out of window).
2. Pop from the **back** while `nums[deque[back]] <= nums[i]` (smaller than current, useless).
3. Push `i` to the back.
4. If `i >= k - 1`, the front of the deque is the max index — record `nums[deque[0]]`.

See notes.md Lesson 13 for a full hand-trace of this algorithm.
</details>

<details>
<summary>Hint 4 — the "monotonic" part</summary>

"Monotonic deque" means the deque is kept in strictly decreasing value order (front is largest). Whenever a new element comes in that's larger than some tail elements, those tail elements can never be future window maxima — remove them. The deque never grows larger than k elements.
</details>

## Write your solution
→ [`../solutions/10-sliding-window-maximum.js`](../solutions/10-sliding-window-maximum.js)

## Follow-ups
- **Sliding Window Minimum**: change one comparison. What changes?
- **Sliding Window Maximum** (Q23) — sliding window *median* is much harder. Can you think about why?
- This deque technique also solves "largest rectangle in histogram" and several DP optimization problems.
