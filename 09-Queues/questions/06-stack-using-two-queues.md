# Q6 — Implement a Stack Using Two Queues

**Difficulty:** Easy
**Pattern:** Simulate LIFO with FIFO by re-queuing all but the last element
**Expected:** O(n) push or O(n) pop (one of them is slow) · O(n) space

## Problem

Implement a stack using **only two queues** as the underlying storage. The stack must support LIFO behavior using only enqueue and dequeue operations on the queues.

| Method | Description |
|--------|-------------|
| `push(value)` | Add `value` to the top of the stack |
| `pop()` | Remove and return the top value; `undefined` if empty |
| `top()` | Return the top value without removing; `undefined` if empty |
| `isEmpty()` | Return `true` if the stack has no items |

You may use JavaScript arrays as queues (using `push` to enqueue and `shift` to dequeue).

> **Why is this harder than the reverse?** Queues give you the *oldest* element first. Stacks give you the *newest* first. To get the newest, you have to move everything else out of the way. There's no "lazy transfer" trick here — it genuinely costs O(n) each time.

## Examples

```
const s = new MyStack();

s.push(1);
s.push(2);
s.push(3);

s.top()   // 3
s.pop()   // 3
s.top()   // 2
s.pop()   // 2
s.pop()   // 1
s.isEmpty() // true
```

## Constraints
- `1 <= value <= 1000`
- At most 100 calls to each method.
- `pop` and `top` will always be called on non-empty stack (in the basic version — but handle the empty case gracefully).

## Hints

<details>
<summary>Hint 1 — the challenge</summary>

With two stacks making a queue, you could "reverse the order" by pouring one into the other. That trick works because you want the *oldest* item (opposite end).

Here you want the *newest* item. The newest is at the back of the queue, not the front. How do you get to it?
</details>

<details>
<summary>Hint 2 — the approach (push is O(n))</summary>

**Strategy 1 — expensive push:**

When you push a new element:
1. Enqueue the new element onto `queue2`.
2. Move every element from `queue1` to `queue2` (so the new element ends up at the front of the combined result in reverse order... wait, that's the back).

Actually, simpler:
1. Enqueue new item onto empty `queue2`.
2. Drain `queue1` into `queue2` (all old items go behind the new one).
3. Swap queue1 and queue2 (so queue1 is always the "main" queue with newest at front).

```
push(1): q1=[1], q2=[]
push(2): q2=[2], drain q1=[1] → q2=[2,1], swap → q1=[2,1]
push(3): q2=[3], drain q1=[2,1] → q2=[3,2,1], swap → q1=[3,2,1]
pop()  : dequeue q1 → 3  ✓
```
</details>

<details>
<summary>Hint 3 — alternative (pop is O(n))</summary>

**Strategy 2 — expensive pop:**

Keep all items in `queue1`. On `pop`, drain `queue1` into `queue2` keeping everything except the last one. The last one is your stack top. Swap references so `queue1` becomes the populated queue again.
</details>

## Write your solution
→ [`../solutions/06-stack-using-two-queues.js`](../solutions/06-stack-using-two-queues.js)

## Follow-ups
- Compare this to Q5 (Queue using Two Stacks). Which direction (queue→stack or stack→queue) is more efficient? Why?
- Can you implement a stack using **one** queue? (Yes — and it's also O(n) per pop.)
- What does this tell you about the fundamental difference between LIFO and FIFO structures?
