# Queues

> FIFO. The natural fit for BFS, scheduling, buffering, and sliding windows (deque).

## Concept Check

1. Queue operations and their complexity: `enqueue`, `dequeue`, `peek`.
2. Why is `arr.shift()` O(n) in JS? What does that mean for naive queue implementations?
3. Difference between:
   - Simple queue
   - Circular queue
   - Deque (double-ended queue)
   - Priority queue
4. When do you need a circular queue?
5. How is a priority queue different from a sorted queue?
6. BFS uses a queue. Why not a stack?

## Implement First

### Simple Queue (linked-list backed, O(1) ops)
```js
class Queue {
  constructor() { this.head = null; this.tail = null; this.length = 0; }
  enqueue(x)  { /* ... */ }
  dequeue()   { /* ... */ }
  peek()      { /* ... */ }
  isEmpty()   { /* ... */ }
  size()      { /* ... */ }
}
```

### Circular Queue (fixed-size array, two pointers)

### Deque (doubly linked list)

### Priority Queue (binary heap — for now use array, revisit with Heap topic)

## Easy

1. Implement a queue using two stacks.
2. Implement a stack using two queues.
3. Reverse a queue using recursion / using a stack.
4. Reverse the first `k` elements of a queue.
5. Generate binary numbers from 1 to N using a queue.
6. Implement a deque from scratch.
7. Implement a circular queue of fixed size.

## Medium

8. **Sliding Window Maximum** — `O(n)` using a deque.
9. **First Negative Number in Every Window of Size K**.
10. **First Unique Character in a Stream** — using a queue + frequency map.
11. **Rotting Oranges** — multi-source BFS on a grid.
12. **Number of Islands** — BFS variant.
13. **01 Matrix** — distance to nearest 0 for each cell (BFS).
14. **Flood Fill** — BFS version.
15. **Walls and Gates**.
16. **Open the Lock** — BFS on state space.
17. **Perfect Squares** — fewest perfect squares summing to n (BFS).
18. **Course Schedule** — topological sort using Kahn's algorithm (queue).
19. **Task Scheduler** — using a priority queue.
20. **Design Hit Counter** — count hits in the past 5 minutes.

## Hard

21. **Sliding Window Median**.
22. **Shortest Path in a Binary Matrix** — BFS, 8 directions.
23. **Word Ladder** — shortest transformation sequence (BFS).
24. **Bus Routes** — minimum buses to take from source to target (BFS).
25. **Cut Off Trees for Golf Event**.

## Priority Queue Drills

(Use the array-backed heap you'll build later — or a stub for now.)

26. **Kth Largest Element in an Array** — using min-heap of size k.
27. **Top K Frequent Elements**.
28. **Merge K Sorted Lists** — using a min-heap.
29. **Find Median from Data Stream** — two heaps.
30. **Reorganize String** — no two adjacent equal chars (max-heap).
31. **K Closest Points to Origin**.

## Deque Pattern Drill

32. Implement `MovingAverage` — average of last k values in a stream.
33. Implement a queue with `getMax()` in O(1) amortized.
