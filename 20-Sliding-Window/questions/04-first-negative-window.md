# Q4 — First Negative in Every Window of Size K

**Difficulty:** Easy
**Pattern:** Fixed-size sliding window (with a queue for tracking)
**Expected:** O(n) time · O(k) space

## Problem

You are given an array of integers `arr` and a positive integer `k`. For every contiguous window of size `k`, find the **first negative number** in that window. If no negative exists in a window, output `0` for that position.

Return an array of length `arr.length - k + 1`.

## Examples

### Example 1
```
Input:  arr = [-8, 2, 3, -6, 10],  k = 2
Output: [-8, 0, -6, -6]
```
- Window [-8, 2]  → first negative = -8
- Window [2, 3]   → no negative    → 0
- Window [3, -6]  → first negative = -6
- Window [-6, 10] → first negative = -6

### Example 2
```
Input:  arr = [12, -1, -7, 8, -15, 30, 16, 28],  k = 3
Output: [-1, -1, -7, -15, -15, 0]
```

### Example 3
```
Input:  arr = [1, 2, 3, 4],  k = 2
Output: [0, 0, 0]
```

## Constraints
- `1 <= k <= arr.length <= 10^5`
- `-10^4 <= arr[i] <= 10^4`

## Hints

<details>
<summary>Hint 1 — brute force</summary>

For each window starting at index `i`, loop through `arr[i..i+k-1]` and return the first element that is negative (< 0). O(n·k).
</details>

<details>
<summary>Hint 2 — use a queue of indexes</summary>

Keep a queue that stores **indexes** of negative numbers currently in the window.

- When you add `arr[right]`: if it's negative, push `right` to the queue.
- When the window slides past `left`: if the front of the queue equals `left` (i.e., the front index is no longer in the window), remove it from the front.
- The answer for the current window is `arr[queue[0]]` if the queue is non-empty, else `0`.
</details>

<details>
<summary>Hint 3 — full loop outline</summary>

```
left = 0
queue = []

for right = 0 to n-1:
  if arr[right] < 0:
    queue.push(right)

  if right >= k - 1:
    // record answer
    result.push(queue.length ? arr[queue[0]] : 0)
    // remove the element that is about to leave the window
    if queue[0] === left:
      queue.shift()
    left++
```
</details>

## Write your solution
→ [`../solutions/04-first-negative-window.js`](../solutions/04-first-negative-window.js)

## Follow-ups
- How would you find the **last** negative in every window instead of the first?
- What if you need to count the total number of negatives in every window?
