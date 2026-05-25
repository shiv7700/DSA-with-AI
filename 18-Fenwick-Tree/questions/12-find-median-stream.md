# Q12 — Find Median in a Stream (BIT approach)

**Difficulty:** Medium
**Pattern:** Fenwick Tree — frequency array + kth smallest
**Expected:** O(log V) per insert · O(log V) per median · O(V) space

## Problem

Design a data structure that supports a stream of integers and answers "what is the current **median**?" at any point.

Implement the `MedianFinder` class:

- `addNum(num)` — add `num` from the data stream.
- `findMedian()` — return the median of all numbers added so far.
  - If the count is odd, the median is the middle value.
  - If the count is even, the median is the average of the two middle values. Return a float.

Assume all values are in the range `[1, 10^5]`.

## Examples

### Example 1

```
addNum(1)
findMedian()  → 1.0

addNum(2)
findMedian()  → 1.5

addNum(3)
findMedian()  → 2.0

addNum(7)
findMedian()  → 2.5

addNum(5)
findMedian()  → 3.0
```

### Example 2

```
addNum(6)
addNum(2)
addNum(4)
findMedian()  → 4.0
```

## Constraints

- `1 <= num <= 10^5`
- At most `5 * 10^4` calls total.
- `findMedian` is called after at least one `addNum`.

## Hints

<details>
<summary>Hint 1 — reuse kth smallest from Q11</summary>

The median of `n` elements is:
- If `n` is odd: the `ceil(n/2)`-th smallest.
- If `n` is even: the average of the `n/2`-th and `(n/2 + 1)`-th smallest.

So you just need a fast **kth smallest** on a dynamic multiset — exactly what Q11 gives you.

</details>

<details>
<summary>Hint 2 — BIT of frequencies</summary>

Use a BIT of size MAX_VAL (10^5) where each cell stores the count of that value. `addNum(x)` calls `bit.update(x, 1)`. Then `findMedian` calls `kthSmallest(...)` once or twice.

</details>

<details>
<summary>Hint 3 — alternative: two heaps</summary>

The "classic" solution uses two heaps (max-heap for lower half, min-heap for upper half). The BIT approach is slightly different but also O(log V). For this problem the classic two-heap solution is actually simpler — try the BIT version to practice, but know the heap approach too.

</details>

## Write your solution

→ [`../solutions/12-find-median-stream.js`](../solutions/12-find-median-stream.js)

## Follow-ups

- If values could be any integer (not bounded to [1, 10^5]), the BIT approach requires coordinate compression over the stream — but you don't know future values. What data structure handles unbounded dynamic medians? (Two heaps or a balanced BST.)
- How does your solution change if you need to support `removeNum(num)` as well?
- Compare the code complexity of the two-heap approach vs the BIT approach.
