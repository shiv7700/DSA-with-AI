# Q8 — Reverse the First K Elements of a Queue

**Difficulty:** Easy
**Pattern:** Stack for partial reversal + re-queue remainder
**Expected:** O(n) time · O(k) space

## Problem

Given a queue and a positive integer `k`, reverse the order of the **first `k` elements** of the queue. The remaining elements (after position `k`) stay in their original relative order, but move to the back behind the reversed elements.

**Signature:**
```js
function reverseFirstK(queue, k) { ... }
// queue is a plain array (push/shift for enqueue/dequeue)
// Returns the modified queue.
```

## Examples

### Example 1
```
Input:  queue = [1, 2, 3, 4, 5],  k = 3
Output: [3, 2, 1, 4, 5]
```
The first 3 elements are reversed. Elements 4 and 5 stay in order.

### Example 2
```
Input:  queue = [10, 20, 30, 40],  k = 2
Output: [20, 10, 30, 40]
```

### Example 3 (edge cases)
```
Input:  queue = [1, 2, 3],  k = 0  →  [1, 2, 3]   (no change)
Input:  queue = [1, 2, 3],  k = 3  →  [3, 2, 1]   (reverse all)
```

## Constraints
- `0 <= k <= queue.length`
- `queue.length <= 10^4`

## Hints

<details>
<summary>Hint 1 — the three-step plan</summary>

1. **Dequeue the first `k` elements** into a stack (this reverses their order).
2. **Pop from the stack and enqueue** back onto the queue (the k elements are now reversed at the front).
3. **Move the remaining `(n - k)` elements** from front to back so they appear after the reversed segment.
</details>

<details>
<summary>Hint 2 — step 3 visualized</summary>

After steps 1 and 2:

```
Original: [1, 2, 3, 4, 5], k=3
After step 2: queue = [3, 2, 1, 4, 5]
              but the original last (n-k)=2 elements are still at front!
Wait — no, they're already there.

Actually: after pushing k items from stack:
  queue = [3, 2, 1, 4, 5]  ← 4 and 5 were never moved, they're still in order.
```

No step 3 is needed if you're careful about the order of operations. But if your approach pushes and re-enqueues in the wrong order, you may need an extra loop to rotate the tail elements.
</details>

## Write your solution
→ [`../solutions/08-reverse-first-k-elements.js`](../solutions/08-reverse-first-k-elements.js)

## Follow-ups
- What if `k > queue.length`? Handle it gracefully.
- Reverse the **last** k elements instead.
- Reverse elements in groups of k across the entire queue (like "reverse every k elements").
