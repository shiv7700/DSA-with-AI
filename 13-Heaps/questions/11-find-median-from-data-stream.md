# Q11 — Find Median from Data Stream

**Difficulty:** Hard
**Pattern:** Two heaps (max-heap for lower half, min-heap for upper half)
**Expected:** addNum O(log n) · findMedian O(1) · O(n) space

## Problem

Design a data structure that supports the following two operations:

- `addNum(num)` — add an integer from the data stream to the data structure.
- `findMedian()` — return the median of all elements seen so far.

The **median** is the middle value in an ordered integer list. If the size of the list is even, the median is the average of the two middle values.

```
[2, 3, 4]        → median = 3
[2, 3]           → median = (2 + 3) / 2 = 2.5
```

## Examples

### Example 1
```
addNum(1)
addNum(2)
findMedian() → 1.5    ([1, 2] → average of 1 and 2)

addNum(3)
findMedian() → 2.0    ([1, 2, 3] → middle element)
```

### Example 2
```
addNum(5)
findMedian() → 5.0

addNum(3)
findMedian() → 4.0    ([3, 5] → average)

addNum(8)
findMedian() → 5.0    ([3, 5, 8] → middle)

addNum(1)
findMedian() → 4.0    ([1, 3, 5, 8] → (3+5)/2)
```

## Constraints
- `-10^5 <= num <= 10^5`
- At least one element will be added before `findMedian` is called.
- At most `5 * 10^4` operations will be called.

## Hints

<details>
<summary>Hint 1 — split the stream into two halves</summary>

Imagine the sorted sequence split right down the middle. The left half contains the smaller elements; the right half contains the larger elements.

- To get the largest of the left half instantly: use a **max-heap** for the left half.
- To get the smallest of the right half instantly: use a **min-heap** for the right half.

The median is either `leftMax.peek()`, `rightMin.peek()`, or the average of both — depending on whether the total count is odd or even.
</details>

<details>
<summary>Hint 2 — the balancing invariant</summary>

Maintain this invariant after each `addNum`:
- `leftHeap.size()` equals `rightHeap.size()` (even total), OR
- `leftHeap.size()` equals `rightHeap.size() + 1` (odd total — left holds the extra).

If sizes get out of balance, transfer the root of the larger heap to the smaller.
</details>

<details>
<summary>Hint 3 — how to route the new number</summary>

When adding `num`:
1. If `num <= leftHeap.peek()` (or left is empty), push to `leftHeap`; otherwise push to `rightHeap`.
2. Rebalance if the size difference exceeds 1.

After rebalancing:
- If total count is odd: median = `leftHeap.peek()`.
- If even: median = `(leftHeap.peek() + rightHeap.peek()) / 2`.
</details>

<details>
<summary>Hint 4 — edge case: first element</summary>

When the left heap is empty and you're routing the first element, just push it to the left heap. There's no `peek()` to compare against yet, so guard against that.
</details>

## Write your solution
→ [`../solutions/11-find-median-from-data-stream.js`](../solutions/11-find-median-from-data-stream.js)

## Follow-ups
- **Sliding window median** (Q12) — same two-heap idea but elements also leave the window.
- If you knew that 99% of numbers are in range [0, 100], could you do better than O(log n) per insertion?
- Can you find the median of a static sorted array in O(1)? (Trivially yes — just look at the middle index.)
