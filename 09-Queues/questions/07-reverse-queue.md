# Q7 — Reverse a Queue

**Difficulty:** Easy
**Pattern:** Use a stack (or recursion) to reverse FIFO order
**Expected:** O(n) time · O(n) space

## Problem

Given a queue, reverse the order of its elements **in place**. The item that was at the front should now be at the back, and vice versa.

You are given a queue represented as an array where:
- `queue.push(x)` enqueues `x` at the back.
- `queue.shift()` dequeues from the front.

**Return** the reversed queue (the same array reference, modified).

## Examples

### Example 1
```
Input:  [1, 2, 3, 4, 5]   (front = left)
Output: [5, 4, 3, 2, 1]
```

### Example 2
```
Input:  ['a', 'b', 'c']
Output: ['c', 'b', 'a']
```

### Example 3 (edge cases)
```
Input:  []      →  []
Input:  [42]    →  [42]
```

## Constraints
- `0 <= queue.length <= 10^4`
- Use only queue operations (`push`, `shift`) plus a helper stack (array with `push`/`pop`).

## Hints

<details>
<summary>Hint 1 — using a stack</summary>

A stack reverses order: push all queue elements onto a stack, then dequeue them back. The stack's LIFO property flips the order.

```
Queue: [1, 2, 3, 4, 5]

Dequeue all into stack:
  stack: [1, 2, 3, 4, 5]  (5 on top)

Pop from stack, enqueue back:
  queue: [5, 4, 3, 2, 1]  ✓
```
</details>

<details>
<summary>Hint 2 — using recursion</summary>

Recursion can also reverse a queue. Dequeue the front element, recursively reverse the rest, then enqueue the front element at the back.

Base case: empty queue — do nothing.
</details>

## Write your solution
→ [`../solutions/07-reverse-queue.js`](../solutions/07-reverse-queue.js)

## Follow-ups
- Implement both the stack-based and recursive approaches.
- What is the call-stack depth for the recursive approach? Is there a risk of stack overflow for large inputs?
- Can you reverse a queue using only queue operations and **no** extra stack? (Hint: you can, but it takes O(n²) time.)
