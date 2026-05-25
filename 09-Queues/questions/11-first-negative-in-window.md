# Q11 — First Negative Number in Every Window of Size K

**Difficulty:** Medium
**Pattern:** Queue (sliding window) — store only negative number indices
**Expected:** O(n) time · O(k) space

## Problem

Given an integer array `nums` and a positive integer `k`, for every contiguous subarray of size `k`, find the **first negative number** in it. If there is no negative number in a window, output `0` for that window.

**Signature:**
```js
function firstNegativeInWindow(nums, k) { ... }
// Returns: number[]
```

## Examples

### Example 1
```
Input:  nums = [-8, 2, 3, -6, 10],  k = 2
Output: [-8, 0, -6, -6]

Windows:
  [-8, 2]   → first negative: -8
  [2, 3]    → no negative: 0
  [3, -6]   → first negative: -6
  [-6, 10]  → first negative: -6
```

### Example 2
```
Input:  nums = [12, -1, -7, 8, -15, 30, 16, 28],  k = 3
Output: [-1, -1, -7, -15, -15, 28? No...]

Wait:
  [12,-1,-7]   → -1
  [-1,-7, 8]   → -1
  [-7, 8,-15]  → -7
  [8,-15,30]   → -15
  [-15,30,16]  → -15
  [30, 16, 28] → 0

Output: [-1, -1, -7, -15, -15, 0]
```

### Example 3
```
Input:  nums = [1, 2, 3, 4],  k = 2
Output: [0, 0, 0]
```

## Constraints
- `1 <= nums.length <= 10^5`
- `-10^5 <= nums[i] <= 10^5`
- `1 <= k <= nums.length`

## Hints

<details>
<summary>Hint 1 — what to keep in the queue</summary>

As the window slides, you only care about negative numbers and *where* they are. Maintain a queue of **indices** of negative numbers that fall within the current window.
</details>

<details>
<summary>Hint 2 — sliding the window</summary>

For each new index `i`:
1. Remove the front of the queue if it's outside the current window (`queue[0] < i - k + 1`).
2. If `nums[i] < 0`, add `i` to the back of the queue.
3. Once the window is full (`i >= k - 1`): the first negative is `nums[queue[0]]`, or `0` if the queue is empty.
</details>

## Write your solution
→ [`../solutions/11-first-negative-in-window.js`](../solutions/11-first-negative-in-window.js)

## Follow-ups
- Find the **count** of negative numbers in each window instead of just the first.
- Find the **last** negative number in each window.
- Find the first element greater than `x` in each window.
