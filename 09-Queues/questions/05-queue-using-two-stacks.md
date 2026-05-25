# Q5 — Implement a Queue Using Two Stacks

**Difficulty:** Easy
**Pattern:** Amortized O(1) dequeue via lazy transfer between two stacks
**Expected:** O(1) amortized enqueue and dequeue · O(n) space

## Problem

Implement a queue using **only two stacks** as the underlying storage. No arrays accessed by index — only push and pop operations.

| Method | Description |
|--------|-------------|
| `enqueue(value)` | Add `value` to the back of the queue |
| `dequeue()` | Remove and return the front value; `undefined` if empty |
| `peek()` | Return the front value without removing it; `undefined` if empty |
| `isEmpty()` | Return `true` if the queue has no items |

You may use JavaScript arrays as stacks (using `push` and `pop` only).

> **Why this matters:** This problem is a classic interview question about using one data structure to simulate another. It teaches the "lazy transfer" trick and the concept of amortized complexity.

## Examples

```
const q = new MyQueue();

q.enqueue(1);
q.enqueue(2);
q.enqueue(3);

q.peek()     // 1
q.dequeue()  // 1
q.dequeue()  // 2
q.isEmpty()  // false
q.dequeue()  // 3
q.isEmpty()  // true
```

## Constraints
- `0 <= value <= 1000`
- At most 100 calls to each method will be made.
- `dequeue` and `peek` will always be called on a non-empty queue (in the basic version — but make your implementation safe regardless).

## Hints

<details>
<summary>Hint 1 — the core insight</summary>

A stack is LIFO. To get FIFO behavior, push all items onto **Stack 1**. When you need to dequeue, pour everything from Stack 1 into **Stack 2** (reversing the order). Now Stack 2's top is the oldest item — dequeue from Stack 2.

Don't transfer back and forth every time. Only pour from Stack 1 into Stack 2 when Stack 2 is empty. This is the "lazy transfer."
</details>

<details>
<summary>Hint 2 — visualizing the transfer</summary>

```
enqueue 1, 2, 3:
  stack1: [1, 2, 3]  (3 on top)
  stack2: []

dequeue() — stack2 is empty, pour stack1 into stack2:
  stack1: []
  stack2: [3, 2, 1]  (1 on top — oldest first!)
  pop from stack2 → 1  ✓

dequeue() — stack2 is not empty, pop directly:
  pop from stack2 → 2  ✓
```
</details>

<details>
<summary>Hint 3 — amortized O(1)</summary>

Each element is pushed once onto `stack1` (enqueue) and transferred at most once from `stack1` to `stack2`. So each element costs at most 2 push operations and 1 pop total — O(1) amortized, even though a single dequeue that triggers a full pour is O(n).
</details>

## Write your solution
→ [`../solutions/05-queue-using-two-stacks.js`](../solutions/05-queue-using-two-stacks.js)

## Follow-ups
- What is the worst-case time for a single `dequeue` call? When does that worst case happen?
- What is the **amortized** time per operation over a sequence of N enqueues and N dequeues? Explain why.
- Now try the reverse: implement a **stack using two queues** (Q6).
