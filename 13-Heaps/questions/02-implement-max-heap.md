# Q2 — Implement MaxHeap

**Difficulty:** Easy
**Pattern:** Heap internals — max variant
**Expected:** push O(log n) · pop O(log n) · peek O(1)

## Problem

Implement a `MaxHeap` class. A max-heap is a heap where the **largest** element is always at the root (index 0). Every parent's value is **greater than or equal to** both of its children's values.

Your class must support:

- `push(val)` — insert a value.
- `pop()` — remove and return the **maximum** value.
- `peek()` — return the maximum value without removing it. O(1).
- `size()` — number of elements.

The structure (array storage, index math) is identical to MinHeap. The only change is the **direction of comparisons**.

## Examples

```
heap = new MaxHeap()
heap.push(3)   → [3]
heap.push(1)   → [3, 1]
heap.push(9)   → [9, 1, 3]   (9 bubbles up past 3)
heap.push(7)   → [9, 7, 3, 1]
heap.peek()    → 9
heap.pop()     → 9,  heap becomes [7, 1, 3]
heap.pop()     → 7,  heap becomes [3, 1]
```

## Constraints
- All values are integers.
- Use the same array-based storage and index math as MinHeap.
- `pop()` on an empty heap returns `undefined`.

## Hints

<details>
<summary>Hint 1 — the single difference from MinHeap</summary>

In MinHeap's `_siftUp`, you stop when `parent <= child`. In MaxHeap, you stop when `parent >= child` — i.e., you swap when the parent is *smaller* than the child.

In MinHeap's `_siftDown`, you track the "smallest" child. In MaxHeap, you track the "largest" child.

That's literally it. The rest of the code is identical.
</details>

<details>
<summary>Hint 2 — verifying the heap property</summary>

After every `push` and `pop`, mentally check: is `heap[0]` still the largest? For a small heap you can quickly scan the array and verify no parent is smaller than a child.
</details>

## Write your solution
→ [`../solutions/02-implement-max-heap.js`](../solutions/02-implement-max-heap.js)

## Follow-ups
- If you have a MinHeap, can you simulate a MaxHeap by **negating all values** on the way in and negating again on the way out? (This is a common trick when a language only provides min-heap.)
- Implement `static heapify(arr)` on MaxHeap as well, using the bottom-up approach.
