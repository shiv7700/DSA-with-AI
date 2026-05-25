# Q1 — Implement a Queue (linked-list backed)

**Difficulty:** Easy (but foundational)
**Pattern:** Linked list with head + tail pointers
**Expected:** O(1) enqueue · O(1) dequeue · O(n) space

## Problem

Implement a `Queue` class that supports the following operations:

| Method | Description |
|--------|-------------|
| `enqueue(value)` | Add `value` to the **back** of the queue |
| `dequeue()` | Remove and return the value at the **front**; return `undefined` if empty |
| `peek()` | Return the front value without removing it; return `undefined` if empty |
| `isEmpty()` | Return `true` if the queue has no items |
| `size()` | Return the number of items currently in the queue |

**Rules:**
- Use a **linked list** internally — not a plain array. This is the whole point.
- `enqueue` and `dequeue` must both run in **O(1)** time.
- You may define an inner `Node` class or use plain objects for nodes.

> **Why linked-list and not array?** If you use an array and call `arr.shift()` to dequeue, every remaining element has to slide left — that's O(n). With a linked list, you just advance a `head` pointer. See notes.md Lesson 5 for the full explanation.

## Examples

```
const q = new Queue();

q.isEmpty()   // true
q.size()      // 0

q.enqueue(10);
q.enqueue(20);
q.enqueue(30);

q.size()      // 3
q.peek()      // 10    (front, unchanged)

q.dequeue()   // 10
q.dequeue()   // 20

q.size()      // 1
q.peek()      // 30

q.dequeue()   // 30
q.isEmpty()   // true
q.dequeue()   // undefined
```

## Constraints
- Enqueued values can be any JavaScript value (numbers, strings, objects).
- `dequeue()` on an empty queue returns `undefined` — don't throw.
- `enqueue` and `dequeue` must be O(1) time.
- Space: O(n) where n is the number of items currently in the queue.

## Hints

<details>
<summary>Hint 1 — what does each node need?</summary>

Each node in your linked list needs two things: the `value` it holds, and a reference to the `next` node in line. The last node's `next` is `null`.

```js
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
```
</details>

<details>
<summary>Hint 2 — what does the Queue class track?</summary>

The `Queue` needs to know two things at all times:
- `head` — the node at the **front** (where dequeue happens).
- `tail` — the node at the **back** (where enqueue happens).

When the queue is empty, both are `null`. When it has exactly one item, `head === tail`.
</details>

<details>
<summary>Hint 3 — implementing enqueue</summary>

Create a new node. If the queue already has items, point the old tail's `next` to the new node, then update `tail`. If the queue is empty, `head` and `tail` both point to the new node.

```
Before: head → [A] → [B] ← tail

enqueue(C):
  newNode = [C]
  tail.next = newNode
  tail = newNode

After:  head → [A] → [B] → [C] ← tail
```
</details>

<details>
<summary>Hint 4 — implementing dequeue</summary>

Save the current `head`'s value. Advance `head` to `head.next`. If `head` is now `null`, the queue is empty — set `tail = null` too (otherwise `tail` still points to the old node, which would be a bug).

```
Before: head → [A] → [B] → [C] ← tail

dequeue():
  value = head.value   (= A)
  head = head.next     (= B's node)
  return A

After:  head → [B] → [C] ← tail
```
</details>

## Write your solution
→ [`../solutions/01-implement-queue.js`](../solutions/01-implement-queue.js)

## Follow-ups
- What happens if you call `dequeue()` many times on an empty queue? Make sure it never throws.
- Add a `toArray()` method that returns all values in order from front to back.
- What would you need to change to make the queue thread-safe in a concurrent environment?
