# Q3 — Implement a Deque (double-ended queue)

**Difficulty:** Easy–Medium
**Pattern:** Doubly linked list with head + tail pointers
**Expected:** O(1) all four add/remove operations · O(n) space

## Problem

Implement a `Deque` (Double-Ended Queue) class that supports adding and removing items from **both** ends in O(1).

| Method | Description |
|--------|-------------|
| `addFront(value)` | Add `value` to the **front** of the deque |
| `addBack(value)` | Add `value` to the **back** of the deque |
| `removeFront()` | Remove and return the front value; `undefined` if empty |
| `removeBack()` | Remove and return the back value; `undefined` if empty |
| `peekFront()` | Return the front value without removing it; `undefined` if empty |
| `peekBack()` | Return the back value without removing it; `undefined` if empty |
| `isEmpty()` | Return `true` if the deque has no items |
| `size()` | Return the number of items |

**Rules:**
- Use a **doubly linked list** internally (each node has `prev` and `next`).
- All four add/remove operations must be O(1).
- Do not use a plain JS array.

> **Why doubly linked?** A singly linked list can only move forward — so removing from the *back* requires walking the whole list (O(n)). Doubly linked nodes let you remove from either end by following either `next` (to go forward) or `prev` (to go backward).

## Examples

```
const dq = new Deque();

dq.addBack(1);
dq.addBack(2);
dq.addBack(3);
// deque: front [1, 2, 3] back

dq.addFront(0);
// deque: front [0, 1, 2, 3] back

dq.peekFront()   // 0
dq.peekBack()    // 3

dq.removeFront() // 0   → deque: [1, 2, 3]
dq.removeBack()  // 3   → deque: [1, 2]

dq.size()        // 2
dq.isEmpty()     // false

dq.removeBack()  // 2
dq.removeBack()  // 1
dq.isEmpty()     // true
dq.removeFront() // undefined
```

## Constraints
- Values can be any JavaScript value.
- All `remove*` methods return `undefined` on an empty deque — no throws.
- All four add/remove methods must be O(1).
- Space: O(n).

## Hints

<details>
<summary>Hint 1 — the doubly linked node</summary>

Each node needs three fields:

```js
class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;   // pointer toward the front
    this.next = null;   // pointer toward the back
  }
}
```
</details>

<details>
<summary>Hint 2 — the Deque class structure</summary>

Track `head` (front node) and `tail` (back node), plus `length`. When empty, both are `null`. When only one item exists, `head === tail`.

```
head                     tail
 ↓                          ↓
[A] ↔ [B] ↔ [C] ↔ [D]
```
</details>

<details>
<summary>Hint 3 — addFront step by step</summary>

```
1. Create newNode.
2. If empty: head = tail = newNode. Done.
3. Otherwise:
   newNode.next = head
   head.prev = newNode
   head = newNode
```
</details>

<details>
<summary>Hint 4 — removeBack step by step</summary>

```
1. If empty: return undefined.
2. Save value = tail.value.
3. tail = tail.prev.
4. If tail is now null: head = null (deque is now empty).
5. Else: tail.next = null (cut off the old tail node).
6. Return value.
```
</details>

## Write your solution
→ [`../solutions/03-implement-deque.js`](../solutions/03-implement-deque.js)

## Follow-ups
- A regular `Queue` is a deque where you restrict access to `addBack` and `removeFront`. Refactor your implementation to express it this way.
- A `Stack` is a deque where you restrict access to `addBack` and `removeBack`. Can you do the same?
- What would you change to implement a **bounded deque** (max capacity `k`)?
