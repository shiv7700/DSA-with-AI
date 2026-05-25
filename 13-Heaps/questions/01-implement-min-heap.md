# Q1 — Implement MinHeap

**Difficulty:** Easy (but foundational — spend real time here)
**Pattern:** Heap internals — sift-up, sift-down
**Expected:** push O(log n) · pop O(log n) · peek O(1) · heapify O(n)

## Problem

Implement a `MinHeap` class from scratch in JavaScript. JavaScript has no built-in heap or priority queue — you'll need to build one. The class should store its data in a plain array (`this.heap`) and use the standard parent/child index math.

Your class must support:

- `push(val)` — insert a new value. Maintains the heap property.
- `pop()` — remove and return the minimum value. Maintains the heap property.
- `peek()` — return the minimum value without removing it. O(1).
- `size()` — return the number of elements.
- `static heapify(arr)` — build a MinHeap from an existing array in **O(n)** time (Floyd's algorithm — do NOT just push each element one by one).

**Heap invariant (min-heap):** every parent's value is less than or equal to both of its children's values. The root is always the minimum.

**Index math** (for a heap stored in an array):
```
parent(i)      = (i - 1) >> 1
leftChild(i)   = 2 * i + 1
rightChild(i)  = 2 * i + 2
```

## Examples

### push then pop
```
heap = new MinHeap()
heap.push(5)   → heap.heap = [5]
heap.push(3)   → heap.heap = [3, 5]   (3 bubbled up)
heap.push(8)   → heap.heap = [3, 5, 8]
heap.push(1)   → heap.heap = [1, 3, 8, 5]  (1 bubbled up to root)
heap.peek()    → 1
heap.pop()     → 1,  heap = [3, 5, 8]
heap.pop()     → 3,  heap = [5, 8]
```

### heapify
```
MinHeap.heapify([9, 4, 7, 1, 8, 3, 5])
→ a valid min-heap, e.g. heap.heap = [1, 4, 3, 9, 8, 7, 5]
→ heap.peek() = 1
```

## Constraints
- All values are integers (positive or negative).
- You must implement `_siftUp(i)` and `_siftDown(i)` as private helper methods.
- `heapify` must run in O(n) — use bottom-up construction, not repeated `push`.
- `pop()` on an empty heap should return `undefined`.
- `peek()` on an empty heap should return `undefined`.

## Hints

<details>
<summary>Hint 1 — the two core helper operations</summary>

The whole class is built on two helpers:

- `_siftUp(i)`: element at index `i` might be too small (violates its parent). Keep swapping it with its parent while it's smaller than its parent AND while `i > 0`.
- `_siftDown(i)`: element at index `i` might be too large (violates one of its children). Find the smaller of its two children. If that child is smaller than the current node, swap. Repeat.

Once you have these two, `push` = append + `_siftUp`, and `pop` = swap root with last + shrink + `_siftDown(0)`.
</details>

<details>
<summary>Hint 2 — siftDown detail: which child to swap with?</summary>

For a min-heap, when sifting down always pick the **smaller** of the two children. If you swapped with the larger child, the smaller child would end up below something larger than it — violating the heap property.

Also make sure to check bounds: the right child (`2*i+2`) might not exist if `i` is near the end of the array.
</details>

<details>
<summary>Hint 3 — heapify in O(n)</summary>

Don't call `push` n times (that would be O(n log n)).

Instead:
1. Copy the array directly into `this.heap`.
2. Find the last non-leaf node: `Math.floor(n/2) - 1`.
3. Loop from that index down to `0`, calling `_siftDown(i)` on each.

Why O(n)? Half the nodes are leaves (zero work). The level above has at most 1 swap. The level above that at most 2. The math works out to O(n) total.
</details>

<details>
<summary>Hint 4 — pop edge cases</summary>

Handle these carefully in `pop()`:
- If the heap is empty, return `undefined`.
- If the heap has only one element, `this.heap.pop()` handles it — don't try to sift-down (there's nothing left to sift).
- Otherwise: save `this.heap[0]`, move the last element to index 0 with `this.heap[0] = this.heap.pop()`, then `_siftDown(0)`.
</details>

## Write your solution
→ [`../solutions/01-implement-min-heap.js`](../solutions/01-implement-min-heap.js)

## Follow-ups
- After implementing, look carefully at `heapify`. Can you verify by hand that `[9, 4, 7, 1, 8, 3, 5]` becomes a valid min-heap step by step?
- What would change if the heap stored objects instead of numbers? (Hint: you'd need a comparator — see Q3.)
- Can you add a `replace(val)` method that pops the root and pushes a new value in a single O(log n) pass?
