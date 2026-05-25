# 09 — Queues

> The queue is the "take a number and wait your turn" data structure. FIFO — First In, First Out. Master the core operations, understand why a naive JS array queue is secretly slow, build the efficient linked-list version, and then use queues as the engine of BFS across a huge range of problems.

## Learn Path

1. **Read [`notes.md`](./notes.md) first** — FIFO concept, real-world analogies, core operations, why `arr.shift()` is O(n), linked-list queue, circular queue, deque, priority queue preview, BFS, deque patterns.
2. Solve questions in order. Each lives in `questions/<NN>-<slug>.md`.
3. Write your solution in the matching `solutions/<NN>-<slug>.js`.
4. Tick off the checklist below as you finish.

## Progress

### Implement First (data structure foundations)
- [ ] [01 — Implement a Queue (linked-list backed)](./questions/01-implement-queue.md)
- [ ] [02 — Implement a Circular Queue (fixed-size ring)](./questions/02-implement-circular-queue.md)
- [ ] [03 — Implement a Deque (double-ended queue)](./questions/03-implement-deque.md)
- [ ] [04 — Implement a Priority Queue (array-backed min-heap)](./questions/04-implement-priority-queue.md)

### Easy
- [ ] [05 — Queue Using Two Stacks](./questions/05-queue-using-two-stacks.md)
- [ ] [06 — Stack Using Two Queues](./questions/06-stack-using-two-queues.md)
- [ ] [07 — Reverse a Queue](./questions/07-reverse-queue.md)
- [ ] [08 — Reverse First K Elements of a Queue](./questions/08-reverse-first-k-elements.md)
- [ ] [09 — Generate Binary Numbers 1 to N](./questions/09-generate-binary-numbers.md)

### Medium
- [ ] [10 — Sliding Window Maximum](./questions/10-sliding-window-maximum.md)
- [ ] [11 — First Negative Number in Every Window of Size K](./questions/11-first-negative-in-window.md)
- [ ] [12 — First Unique Character in a Stream](./questions/12-first-unique-character-stream.md)
- [ ] [13 — Rotting Oranges](./questions/13-rotting-oranges.md)
- [ ] [14 — Number of Islands](./questions/14-number-of-islands.md)
- [ ] [15 — 01 Matrix](./questions/15-01-matrix.md)
- [ ] [16 — Flood Fill](./questions/16-flood-fill.md)
- [ ] [17 — Walls and Gates](./questions/17-walls-and-gates.md)
- [ ] [18 — Open the Lock](./questions/18-open-the-lock.md)
- [ ] [19 — Perfect Squares](./questions/19-perfect-squares.md)
- [ ] [20 — Course Schedule (Kahn's Algorithm)](./questions/20-course-schedule.md)
- [ ] [21 — Task Scheduler](./questions/21-task-scheduler.md)
- [ ] [22 — Design Hit Counter](./questions/22-design-hit-counter.md)

### Hard
- [ ] [23 — Sliding Window Median](./questions/23-sliding-window-median.md)
- [ ] [24 — Shortest Path in a Binary Matrix](./questions/24-shortest-path-binary-matrix.md)
- [ ] [25 — Word Ladder](./questions/25-word-ladder.md)
- [ ] [26 — Bus Routes](./questions/26-bus-routes.md)
- [ ] [27 — Cut Off Trees for Golf Event](./questions/27-cut-off-trees.md)

### Priority Queue Drills
- [ ] [28 — Kth Largest Element in an Array](./questions/28-kth-largest.md)
- [ ] [29 — Top K Frequent Elements](./questions/29-top-k-frequent.md)
- [ ] [30 — Merge K Sorted Lists](./questions/30-merge-k-sorted-lists.md)
- [ ] [31 — Find Median from Data Stream](./questions/31-find-median-data-stream.md)
- [ ] [32 — Reorganize String](./questions/32-reorganize-string.md)
- [ ] [33 — K Closest Points to Origin](./questions/33-k-closest-points.md)

### Deque Pattern Drill
- [ ] [34 — Moving Average from Data Stream](./questions/34-moving-average.md)
- [ ] [35 — Queue with Max (O(1) amortized)](./questions/35-queue-with-max.md)

## Related Topics

- [08 — Stacks](../08-Stacks/) — queues and stacks are duals; several problems use both.
- [11 — Trees](../11-Trees/) — BFS on trees uses a queue.
- [13 — Heaps](../13-Heaps/) — priority queue deep dive.
- [15 — Graphs](../15-Graphs/) — BFS on graphs uses a queue.
- [20 — Sliding Window](../20-Sliding-Window/) — deque unlocks O(n) sliding max/min.
