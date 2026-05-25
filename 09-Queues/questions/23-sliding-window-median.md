# Q23 — Sliding Window Median

**Difficulty:** Hard
**Pattern:** Two heaps (max-heap of lower half + min-heap of upper half) with lazy deletion
**Expected:** O(n log k) time · O(k) space

## Problem

You are given an integer array `nums` and an integer `k`. There is a sliding window of size `k` moving from left to right. For each window position, return the **median** of the `k` elements in the window.

The median of a sorted list of length `k` is:
- If `k` is odd: the middle element.
- If `k` is even: the average of the two middle elements.

**Signature:**
```js
function medianSlidingWindow(nums, k) { ... }
// Returns: number[]
```

## Examples

### Example 1
```
Input:  nums = [1, 3, -1, -3, 5, 3, 6, 7],  k = 3
Output: [1.0, -1.0, -1.0, 3.0, 5.0, 6.0]

Windows:
  [1, 3,-1]  → sorted: [-1, 1, 3]  → median = 1
  [3,-1,-3]  → sorted: [-3,-1, 3]  → median = -1
  [-1,-3, 5] → sorted: [-3,-1, 5]  → median = -1
  [-3, 5, 3] → sorted: [-3, 3, 5]  → median = 3
  [5, 3, 6]  → sorted: [3, 5, 6]   → median = 5
  [3, 6, 7]  → sorted: [3, 6, 7]   → median = 6
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
<summary>Hint 1 — why is this hard?</summary>

Finding the max/min with a sliding deque is O(n). Finding the median is harder because you need the "middle" element — neither the max nor the min. Sorting each window is O(nk log k). We need something faster.
</details>

<details>
<summary>Hint 2 — two-heap idea (without deletion)</summary>

Maintain two heaps to track the median:
- `lo`: max-heap of the lower half of numbers.
- `hi`: min-heap of the upper half.

Keep them balanced (sizes differ by at most 1). The median is `lo.top()` (if odd total) or average of `lo.top()` and `hi.top()` (if even).

For a static set this works well. The hard part is **removing the outgoing element** when the window slides.
</details>

<details>
<summary>Hint 3 — lazy deletion</summary>

JavaScript has no built-in heap deletion. Use a **delay map** (hash map): mark the element to be removed. When you pop from a heap, if the top element is marked for deletion, discard it and pop again. The actual deletion is deferred until the element naturally reaches the top.

This is O(log k) amortized per operation.
</details>

<details>
<summary>Hint 4 — you need a heap implementation</summary>

JavaScript's built-in arrays don't include a heap. You'll need to implement or import a `MaxHeap` and `MinHeap` class (or use the one you built in Q4 and adapt it). This is expected — the problem tests both the two-heap median technique AND implementation skill.
</details>

## Write your solution
→ [`../solutions/23-sliding-window-median.js`](../solutions/23-sliding-window-median.js)

## Follow-ups
- **Find Median from Data Stream** (Q31): the static case (no sliding window removal). Easier — start there if this is too hard.
- What is the time complexity of each add/remove operation with the lazy deletion approach? Prove it's O(log k) amortized.
- Can you solve this with a sorted data structure (like a balanced BST or order-statistics tree) instead?
