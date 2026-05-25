# Q3 — Implement Generic PriorityQueue

**Difficulty:** Easy-Medium
**Pattern:** Heap with custom comparator
**Expected:** push O(log n) · pop O(log n) · peek O(1)

## Problem

Implement a `PriorityQueue` class that accepts a **comparator function** at construction time. This lets callers use it as a min-heap, max-heap, or a heap ordered by any custom property (e.g., "by frequency, then alphabetically").

```js
// Comparator contract (same as Array.prototype.sort):
// comparator(a, b) returns:
//   negative  →  a should come out BEFORE b  (a has higher priority)
//   positive  →  b should come out BEFORE a
//   zero      →  equal priority
```

Your class must support:

- `constructor(comparator)` — defaults to `(a, b) => a - b` (min-heap of numbers).
- `push(val)` — insert a value.
- `pop()` — remove and return the highest-priority value.
- `peek()` — return the highest-priority value without removing it.
- `size()` — number of elements.

## Examples

### Default (min-heap)
```
const pq = new PriorityQueue();
pq.push(5); pq.push(2); pq.push(8); pq.push(1);
pq.pop() → 1
pq.pop() → 2
```

### Max-heap of numbers
```
const pq = new PriorityQueue((a, b) => b - a);
pq.push(5); pq.push(2); pq.push(8);
pq.pop() → 8
```

### Min-heap by distance (objects)
```
const pq = new PriorityQueue((a, b) => a.dist - b.dist);
pq.push({ node: 'A', dist: 5 });
pq.push({ node: 'B', dist: 2 });
pq.push({ node: 'C', dist: 9 });
pq.pop() → { node: 'B', dist: 2 }
pq.pop() → { node: 'A', dist: 5 }
```

### Frequency then alphabetical tiebreak
```
const pq = new PriorityQueue((a, b) => {
  if (a.freq !== b.freq) return a.freq - b.freq;
  return a.word < b.word ? -1 : 1;
});
pq.push({ word: 'cat', freq: 3 });
pq.push({ word: 'bat', freq: 3 });
pq.push({ word: 'dog', freq: 5 });
pq.pop() → { word: 'bat', freq: 3 }  (bat < cat alphabetically, same freq)
```

## Constraints
- Comparator must default to `(a, b) => a - b` when not provided.
- Use the same array-based storage and index math as MinHeap/MaxHeap.
- All comparisons go through `this.cmp(a, b)`.

## Hints

<details>
<summary>Hint 1 — everywhere you compared values, use the comparator instead</summary>

In MinHeap's `_siftUp`, you had:
```js
if (this.heap[parent] <= this.heap[i]) break;
```

In PriorityQueue, replace this with:
```js
if (this.cmp(this.heap[parent], this.heap[i]) <= 0) break;
```

Meaning: if the parent already has equal or better priority than the child, stop.

Similarly in `_siftDown`, instead of tracking the "smallest" child, track the child that the comparator says should come first.
</details>

<details>
<summary>Hint 2 — the "best" child in siftDown</summary>

```js
let best = i;
const l = 2 * i + 1;
const r = 2 * i + 2;
if (l < n && this.cmp(this.heap[l], this.heap[best]) < 0) best = l;
if (r < n && this.cmp(this.heap[r], this.heap[best]) < 0) best = r;
```

`this.cmp(this.heap[l], this.heap[best]) < 0` means "l has higher priority than best". If true, l should be the new "best" candidate.
</details>

## Write your solution
→ [`../solutions/03-implement-priority-queue.js`](../solutions/03-implement-priority-queue.js)

## Follow-ups
- Can you add a `pushAll(arr)` method that uses Floyd's O(n) `heapify` internally?
- How would you implement `decreaseKey(node, newVal)` efficiently? (See Q34 — it requires tracking element positions.)
