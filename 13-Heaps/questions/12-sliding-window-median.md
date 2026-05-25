# Q12 — Sliding Window Median

**Difficulty:** Hard
**Pattern:** Two heaps with lazy deletion
**Expected:** O(n log k) time · O(k) space

## Problem

Given an integer array `nums` and a window size `k`, return an array of the medians for each window of size `k` as it slides across `nums` from left to right.

The median of a window is the middle value if `k` is odd, or the average of the two middle values if `k` is even.

## Examples

### Example 1
```
Input:  nums = [1, 3, -1, -3, 5, 3, 6, 7],  k = 3
Output: [1.0, -1.0, -1.0, 3.0, 5.0, 6.0]
```
Explanation:
```
Window [1, 3, -1]   → sorted [-1, 1, 3]    → median 1.0
Window [3, -1, -3]  → sorted [-3, -1, 3]   → median -1.0
Window [-1, -3, 5]  → sorted [-3, -1, 5]   → median -1.0
Window [-3, 5, 3]   → sorted [-3, 3, 5]    → median 3.0
Window [5, 3, 6]    → sorted [3, 5, 6]     → median 5.0
Window [3, 6, 7]    → sorted [3, 6, 7]     → median 6.0
```

### Example 2
```
Input:  nums = [1, 2, 3, 4, 2, 3, 1, 4, 2],  k = 3
Output: [2.0, 3.0, 3.0, 3.0, 2.0, 3.0, 2.0]
```

## Constraints
- `1 <= k <= nums.length <= 10^5`
- `-2^31 <= nums[i] <= 2^31 - 1`

## Hints

<details>
<summary>Hint 1 — start with the two-heap idea from Q11</summary>

The same two-heap trick (max-heap for left half, min-heap for right half) gives you the median in O(1) at any moment.

The new challenge: as the window slides, you must **remove** the element that is leaving the window. Standard heaps don't support arbitrary removal efficiently.
</details>

<details>
<summary>Hint 2 — lazy deletion</summary>

Instead of actually removing elements from the heap, keep a "to-delete" counter map. When you pop from a heap, check if the element at the root is in the to-delete map — if so, discard it (lazy pop) and pop again until you find a valid root.

```
toDelete = {}  // value → count of pending deletions

function lazyPop(heap):
  while toDelete[heap.peek()] > 0:
    toDelete[heap.peek()]--
    heap.pop()
  return heap.pop()
```
</details>

<details>
<summary>Hint 3 — window slide algorithm</summary>

For each new element entering the window (right pointer):
1. Add the incoming element to the appropriate heap.
2. Record the outgoing element (left pointer) in `toDelete`.
3. Rebalance the two heaps (accounting for lazy deletions).
4. Read the median from the heap roots.

"Effective size" of a heap = actual size minus pending deletions for elements it holds.
</details>

## Write your solution
→ [`../solutions/12-sliding-window-median.js`](../solutions/12-sliding-window-median.js)

## Follow-ups
- What is the time complexity of the lazy deletion approach vs. rebuilding the heap each step?
- Can you think of a simpler O(nk) brute-force approach for small k?
- **Sliding window maximum** (Q22) — a simpler variant using a deque instead of heaps.
