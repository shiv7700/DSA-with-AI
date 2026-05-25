# Q11 — Implement Stack Using Queues

**Difficulty:** Medium
**Pattern:** Design — simulate one data structure with another
**Expected:** Push O(n) or Pop O(n) (you choose) · O(n) space

## Problem

Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support `push`, `pop`, `top`, and `empty`.

Implement the `MyStack` class:
- `push(x)` — push element `x` to the top of the stack.
- `pop()` — remove and return the element on top.
- `top()` — return the top element.
- `empty()` — return `true` if the stack is empty.

> **The constraint:** you may only use the standard queue operations — `enqueue` (add to back), `dequeue` (remove from front), `peek` (front element), `size`, `isEmpty`.

## Examples

### Example 1
```
const s = new MyStack();
s.push(1);
s.push(2);
s.top()   → 2
s.pop()   → 2
s.empty() → false
```

### Example 2
```
s.push(10); s.push(20); s.push(30);
s.pop()   → 30
s.top()   → 20
s.pop()   → 20
s.pop()   → 10
s.empty() → true
```

## Constraints
- `1 <= x <= 9`
- At most 100 calls total.
- `pop` and `top` will always be called on a non-empty stack.

## Hints

<details>
<summary>Hint 1 — why is this hard?</summary>

A queue is FIFO — first in, first out. A stack is LIFO — last in, first out. They're opposites. Making LIFO behavior from FIFO primitives requires some extra work.

The core challenge: when you push a new element, it becomes the "top". But in a queue, new elements go to the **back**. To make `pop` return the most recently pushed element, you need to move the new element to the front somehow.
</details>

<details>
<summary>Hint 2 — costly push approach (the simpler one)</summary>

**Two queues, costly push:**

When you `push(x)`:
1. Enqueue `x` into `q2` (the empty helper queue).
2. Move all elements from `q1` into `q2` (so `x` is now at the front of `q2`).
3. Swap `q1` and `q2` (by swapping references).

Now `q1`'s front is always the "top of the stack".

`pop()` and `top()` are then just dequeue/peek on `q1` — O(1).
`push()` is O(n).
</details>

<details>
<summary>Hint 3 — one-queue approach (elegant)</summary>

You can actually do this with a **single queue**:

When you `push(x)`:
1. Enqueue `x`.
2. Rotate the queue: dequeue every element except the new one, and re-enqueue each at the back. Now `x` is at the front.

`pop()` and `top()` are O(1) dequeue/peek. `push()` is O(n).
</details>

## Write your solution
→ [`../solutions/11-stack-using-queues.js`](../solutions/11-stack-using-queues.js)

## Follow-ups
- The reverse problem: implement a **queue using two stacks** (a classic, often asked together with this one).
- Can you achieve O(1) push AND O(1) pop simultaneously? (No — you can make one O(1) but the other must be O(n), because fundamentally FIFO and LIFO are opposites.)
