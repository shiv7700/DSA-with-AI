# Q4 — Implement a Priority Queue (array-backed min-heap)

**Difficulty:** Medium
**Pattern:** Binary min-heap stored in an array
**Expected:** O(log n) insert · O(log n) extractMin · O(1) peek · O(n) space

## Problem

Implement a `MinPriorityQueue` class backed by a **binary min-heap**. The item with the **smallest priority value** is always dequeued first.

| Method | Description |
|--------|-------------|
| `insert(value, priority)` | Add `value` with numeric `priority` |
| `extractMin()` | Remove and return the `{ value, priority }` with the lowest priority number; `undefined` if empty |
| `peek()` | Return (without removing) the min-priority item; `undefined` if empty |
| `isEmpty()` | Return `true` if the queue has no items |
| `size()` | Return the number of items |

**Rules:**
- Back the queue with a plain JS array (index 0 unused, root at index 1 — or use index 0, your choice).
- `insert` must run in O(log n) using the **bubble-up** (sift-up) operation.
- `extractMin` must run in O(log n) using the **bubble-down** (sift-down) operation.
- Elements with equal priority may be returned in any order.

> **Why a heap?** A sorted array gives O(1) peek but O(n) insert. A linked list gives O(1) insert but O(n) extract-min. A binary heap balances both at O(log n). That's why heaps are the go-to for priority queues. Full heap theory lives in topic 13.

## Examples

```
const pq = new MinPriorityQueue();

pq.insert('low-priority task', 10);
pq.insert('urgent task', 1);
pq.insert('normal task', 5);

pq.peek()         // { value: 'urgent task', priority: 1 }
pq.size()         // 3

pq.extractMin()   // { value: 'urgent task', priority: 1 }
pq.extractMin()   // { value: 'normal task', priority: 5 }
pq.extractMin()   // { value: 'low-priority task', priority: 10 }
pq.extractMin()   // undefined
```

## Constraints
- `priority` is a number (may be negative).
- Items with equal priority may be returned in any order.
- `insert` and `extractMin` must be O(log n).
- Space: O(n).

## Hints

<details>
<summary>Hint 1 — heap array layout</summary>

Store heap elements in an array. For a node at index `i`:
- Left child: `2 * i`
- Right child: `2 * i + 1`
- Parent: `Math.floor(i / 2)`

Use index 0 as unused (or dummy) and start the root at index 1. This makes the parent/child formulas cleaner.

```
heap array: [null, 1, 5, 3, 8, 10, 7, ...]
                   ↑  ↑  ↑
                 root  root's left  root's right
```
</details>

<details>
<summary>Hint 2 — the heap property</summary>

In a **min-heap**: every node's priority is ≤ its children's priorities. So the minimum is always at the root (index 1).

After insert or extractMin, you need to **restore** this property.
</details>

<details>
<summary>Hint 3 — insert and bubble-up</summary>

1. Push the new element to the end of the array.
2. **Bubble it up**: while its priority is less than its parent's, swap with the parent.

```
Insert priority 2:
  Array: [null, 1, 5, 3]
  Push:  [null, 1, 5, 3, 2]  (index 4, parent = index 2, priority 5)
  2 < 5: swap:  [null, 1, 2, 3, 5]  (index 2, parent = index 1, priority 1)
  2 > 1: stop. Done.
```
</details>

<details>
<summary>Hint 4 — extractMin and bubble-down</summary>

1. Save the root (index 1) — that's the minimum.
2. Move the **last** element to the root.
3. Pop the last element.
4. **Bubble down**: while the root is larger than one of its children, swap with the *smaller* child.

```
Before: [null, 1, 5, 3]
Extract min (1):
  Move last (3) to root: [null, 3, 5]
  3 has no children → done. Return 1.
```
</details>

## Write your solution
→ [`../solutions/04-implement-priority-queue.js`](../solutions/04-implement-priority-queue.js)

## Follow-ups
- Modify your implementation to support a **max-heap** (largest priority first). What's the only thing you need to change?
- Add an `update(value, newPriority)` method. Why is this hard? (Hint: you need to find the element first — O(n) unless you maintain an index map.)
- How is a priority queue used in Dijkstra's shortest-path algorithm?
