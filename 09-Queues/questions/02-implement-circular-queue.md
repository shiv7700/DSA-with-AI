# Q2 — Implement a Circular Queue (fixed-size ring)

**Difficulty:** Easy–Medium
**Pattern:** Ring buffer with front/rear pointers and modulo wrap-around
**Expected:** O(1) enqueue · O(1) dequeue · O(capacity) space

## Problem

Implement a `CircularQueue` class backed by a **fixed-size array**. It supports the following operations:

| Method | Description |
|--------|-------------|
| `enqueue(value)` | Add `value` to the back. Return `false` if full, `true` on success. |
| `dequeue()` | Remove and return the front value. Return `undefined` if empty. |
| `peek()` | Return the front value without removing it. Return `undefined` if empty. |
| `isFull()` | Return `true` if the queue is at capacity. |
| `isEmpty()` | Return `true` if the queue has no items. |
| `size()` | Return the number of items currently in the queue. |

**Rules:**
- The constructor takes a single `capacity` argument: `new CircularQueue(5)`.
- You must use a **fixed-size array of length `capacity`** internally.
- No `push` or `shift` on the internal array — only direct index access.
- Both `enqueue` and `dequeue` must run in O(1) time.

> **Why circular?** A plain array queue using `shift()` is O(n). A simple head-pointer trick moves the front pointer forward but wastes space (used slots are never reused). The circular trick lets the pointers **wrap around** so every slot gets reused, and both operations stay O(1).

## Examples

```
const cq = new CircularQueue(3);

cq.isEmpty()   // true
cq.isFull()    // false

cq.enqueue(1)  // true
cq.enqueue(2)  // true
cq.enqueue(3)  // true
cq.isFull()    // true
cq.enqueue(4)  // false  (full — rejected)

cq.dequeue()   // 1
cq.enqueue(4)  // true   (slot freed, wraps around)
cq.peek()      // 2
cq.size()      // 3
```

## Constraints
- `1 <= capacity <= 1000`
- Enqueued values can be any JavaScript value.
- `enqueue` returns `false` (not throw) when full.
- `dequeue` returns `undefined` (not throw) when empty.
- Both must be O(1).

## Hints

<details>
<summary>Hint 1 — three things to track</summary>

Your class needs:
- `this.data` — a fixed array of length `capacity`.
- `this.front` — index of the next item to dequeue.
- `this.rear` — index where the next enqueue will land.
- `this.size` — current number of items (this avoids the full/empty ambiguity).
</details>

<details>
<summary>Hint 2 — the wrap-around formula</summary>

When you advance a pointer and it would go past the last index, wrap it to 0. The formula is:

```js
this.rear = (this.rear + 1) % this.capacity;
```

For a capacity-5 queue: 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, … — it wraps automatically.
</details>

<details>
<summary>Hint 3 — enqueue step by step</summary>

```
1. If size === capacity: return false (full).
2. Write value into data[rear].
3. Advance rear: rear = (rear + 1) % capacity.
4. Increment size.
5. Return true.
```
</details>

<details>
<summary>Hint 4 — dequeue step by step</summary>

```
1. If size === 0: return undefined (empty).
2. Save value = data[front].
3. Advance front: front = (front + 1) % capacity.
4. Decrement size.
5. Return value.
```
</details>

<details>
<summary>Hint 5 — ASCII trace</summary>

```
capacity = 3,  data = [_, _, _], front=0, rear=0, size=0

enqueue(A): data=[A,_,_], rear=1, size=1
enqueue(B): data=[A,B,_], rear=2, size=2
enqueue(C): data=[A,B,C], rear=0, size=3  ← rear wrapped!
isFull()  : true

dequeue(): returns A, front=1, size=2     data=[A,B,C] (A still there but ignored)
enqueue(D): data=[A,B,C] → data=[D,B,C], rear=1, size=3  ← D reuses slot 0
peek()    : B  (front=1)
```
</details>

## Write your solution
→ [`../solutions/02-implement-circular-queue.js`](../solutions/02-implement-circular-queue.js)

## Follow-ups
- What would you change to make `enqueue` block (wait) instead of returning `false` when full? (Think producer-consumer.)
- Can you implement this without a separate `size` counter? (Hint: use `capacity + 1` array slots and an alternate full/empty check.)
- Where do ring buffers appear in real operating systems and audio drivers?
