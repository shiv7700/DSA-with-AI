# Heaps & Priority Queues

> A heap is a tree stored in an array. Insertion and extraction in O(log n). The go-to data structure for "top K" and "next event".

## Concept Check

1. Min-heap vs Max-heap — what's the invariant?
2. Why is a heap stored in an array? Index math:
   - `parent(i) = (i - 1) >> 1`
   - `left(i) = 2*i + 1`
   - `right(i) = 2*i + 2`
3. Complexity of `insert`, `extractMin`, `peek`, `decreaseKey`.
4. Why is `buildHeap` from an array O(n), not O(n log n)?
5. Difference between binary heap, binomial heap, Fibonacci heap.
6. Heap vs BST — when is heap better? When is BST better?

## Implement First

```js
class MinHeap {
  constructor() { this.heap = []; }
  peek()                  { return this.heap[0]; }
  size()                  { return this.heap.length; }
  push(val)               { /* bubble-up */ }
  pop()                   { /* swap root with last, sift-down */ }
  _siftUp(i)              { /* */ }
  _siftDown(i)            { /* */ }
  static heapify(arr)     { /* O(n) build */ }
}
```
Then build a `MaxHeap` and a generic `PriorityQueue` taking a comparator.

## Easy

1. Build a heap from an unsorted array — O(n).
2. Insert into a heap.
3. Extract the min / max.
4. Heapify a subtree at index `i`.
5. Convert min-heap to max-heap.
6. Check if a given array represents a min-heap.
7. Find the kth smallest element using a heap.

## Medium

8. **Kth Largest Element in an Array** — min-heap of size k.
9. **Kth Largest Element in a Stream** — design class with `add`.
10. **Top K Frequent Elements**.
11. **Top K Frequent Words** — tiebreak alphabetically.
12. **K Closest Points to Origin**.
13. **Sort a Nearly Sorted (K-Sorted) Array** — O(n log k).
14. **Merge K Sorted Lists**.
15. **Merge K Sorted Arrays**.
16. **Last Stone Weight** — max-heap simulation.
17. **Furthest Building You Can Reach**.
18. **Connect Ropes with Minimum Cost** (Huffman-like).
19. **Reorganize String** — no two adjacent equal chars.
20. **Task Scheduler** — with cooldown.
21. **Find Median from Data Stream** — two heaps.
22. **Sliding Window Median** — two heaps + lazy deletion.
23. **Ugly Number II** — n-th number whose only prime factors are 2, 3, 5.
24. **Super Ugly Number**.
25. **Smallest Range Covering Elements from K Lists**.

## Hard

26. **Find K-th Smallest Pair Distance**.
27. **Trapping Rain Water II** — 2D version using min-heap.
28. **Swim in Rising Water** — Dijkstra-like.
29. **Path with Minimum Effort** — modified Dijkstra.
30. **Network Delay Time** — Dijkstra on a heap.
31. **Cheapest Flights Within K Stops** — modified Dijkstra.
32. **Minimum Cost to Connect All Points** — Prim's MST with heap.
33. **IPO** — pick projects to maximize capital.

## Heapsort Drill

34. Implement heap sort — in-place using a max-heap.
35. Why is heap sort O(n log n) but slower than quicksort in practice?
36. Stable? In-place?

## Priority Queue API Drill

37. Implement a priority queue that supports `decreaseKey(node, newVal)` — needed for Dijkstra/Prim with no duplicates.
38. Why does a binary heap make `decreaseKey` O(log n), but a Fibonacci heap makes it O(1) amortized?
