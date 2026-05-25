# 13 — Heaps & Priority Queues

> A heap is a nearly-complete binary tree stored in a flat array. It gives you **O(1) peek** and **O(log n) push/pop** — the perfect tool when you need to repeatedly retrieve the smallest or largest element from a changing collection. Master this and you unlock top-K problems, Dijkstra, Prim, running medians, and more.

## Learn Path

1. **Read [`notes.md`](./notes.md) first** — concepts, ASCII diagrams, the parent/child index math, push/pop walkthroughs, buildHeap O(n) explained, a complete MinHeap class, and a complexity cheat-sheet.
2. Solve questions in order. Each lives in `questions/<NN>-<slug>.md`.
3. Write your solution in the matching `solutions/<NN>-<slug>.js`.
4. Tick off the checklist below as you finish.

## Progress

### Implement First (Foundation)
- [ ] [01 — Implement MinHeap](./questions/01-implement-min-heap.md)
- [ ] [02 — Implement MaxHeap](./questions/02-implement-max-heap.md)
- [ ] [03 — Implement Generic PriorityQueue](./questions/03-implement-priority-queue.md)

### Easy
- [ ] [04 — Build a Heap from an Unsorted Array (heapify)](./questions/04-heapify-array.md)
- [ ] [05 — Check If Array Is a Valid Min-Heap](./questions/05-is-valid-min-heap.md)
- [ ] [06 — Kth Smallest Element Using a Heap](./questions/06-kth-smallest.md)
- [ ] [07 — Convert Min-Heap to Max-Heap](./questions/07-min-to-max-heap.md)

### Medium
- [ ] [08 — Kth Largest Element in an Array](./questions/08-kth-largest-in-array.md)
- [ ] [09 — Kth Largest Element in a Stream](./questions/09-kth-largest-in-stream.md)
- [ ] [10 — Top K Frequent Elements](./questions/10-top-k-frequent-elements.md)
- [ ] [11 — Top K Frequent Words](./questions/11-top-k-frequent-words.md)
- [ ] [12 — K Closest Points to Origin](./questions/12-k-closest-points.md)
- [ ] [13 — Sort a Nearly Sorted (K-Sorted) Array](./questions/13-sort-k-sorted-array.md)
- [ ] [14 — Merge K Sorted Lists](./questions/14-merge-k-sorted-lists.md)
- [ ] [15 — Merge K Sorted Arrays](./questions/15-merge-k-sorted-arrays.md)
- [ ] [16 — Last Stone Weight](./questions/16-last-stone-weight.md)
- [ ] [17 — Furthest Building You Can Reach](./questions/17-furthest-building.md)
- [ ] [18 — Connect Ropes with Minimum Cost](./questions/18-connect-ropes.md)
- [ ] [19 — Reorganize String](./questions/19-reorganize-string.md)
- [ ] [20 — Task Scheduler](./questions/20-task-scheduler.md)
- [ ] [21 — Find Median from Data Stream](./questions/21-find-median-from-stream.md)
- [ ] [22 — Sliding Window Median](./questions/22-sliding-window-median.md)
- [ ] [23 — Ugly Number II](./questions/23-ugly-number-ii.md)
- [ ] [24 — Smallest Range Covering Elements from K Lists](./questions/24-smallest-range-k-lists.md)

### Hard
- [ ] [25 — Find K-th Smallest Pair Distance](./questions/25-kth-smallest-pair-distance.md)
- [ ] [26 — Trapping Rain Water II](./questions/26-trapping-rain-water-ii.md)
- [ ] [27 — Swim in Rising Water](./questions/27-swim-in-rising-water.md)
- [ ] [28 — Path with Minimum Effort](./questions/28-path-minimum-effort.md)
- [ ] [29 — Network Delay Time (Dijkstra)](./questions/29-network-delay-time.md)
- [ ] [30 — Cheapest Flights Within K Stops](./questions/30-cheapest-flights.md)
- [ ] [31 — Minimum Cost to Connect All Points (Prim's MST)](./questions/31-min-cost-connect-points.md)
- [ ] [32 — IPO](./questions/32-ipo.md)

### Heap Sort & Priority Queue Internals
- [ ] [33 — Implement Heap Sort](./questions/33-heap-sort.md)
- [ ] [34 — Priority Queue with decreaseKey](./questions/34-priority-queue-decrease-key.md)

## Related Topics

- [05 — Searching](../05-Searching/) — binary search is complementary.
- [10 — Hash Tables](../10-Hash-Tables/) — used alongside heaps in many top-K problems.
- [14 — Graphs](../14-Graphs/) — Dijkstra and Prim use heaps.
- [20 — Sliding Window](../20-Sliding-Window/) — sliding window median uses two heaps.
