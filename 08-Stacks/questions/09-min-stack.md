# Q9 — Min Stack

**Difficulty:** Medium
**Pattern:** Stack — auxiliary stack for tracking state
**Expected:** O(1) per operation · O(n) space

## Problem

Design a stack that supports `push`, `pop`, `top`, and retrieving the **minimum element** — all in **O(1) time**.

Implement the `MinStack` class:
- `push(val)` — push `val` onto the stack.
- `pop()` — remove the element on top of the stack.
- `top()` — get the top element.
- `getMin()` — retrieve the minimum element in the stack.

> **Why this is tricky:** After you pop the current minimum, you need to know the new minimum instantly — without scanning the whole stack. You need to store that information ahead of time.

## Examples

### Example 1
```
const s = new MinStack();
s.push(-2);
s.push(0);
s.push(-3);
s.getMin()  → -3
s.pop()
s.top()     → 0
s.getMin()  → -2
```

### Example 2
```
s.push(5);
s.getMin()  → 5
s.push(3);
s.getMin()  → 3
s.push(7);
s.getMin()  → 3
s.pop();    // removes 7
s.getMin()  → 3
s.pop();    // removes 3
s.getMin()  → 5
```

## Constraints
- `-2^31 <= val <= 2^31 - 1`
- `pop`, `top`, and `getMin` will always be called on a non-empty stack.
- Up to `3 * 10^4` calls in total.
- All four operations must run in **O(1)** time.

## Hints

<details>
<summary>Hint 1 — why one stack isn't enough</summary>

A regular stack tells you the top. But `getMin` needs to know the minimum over all elements currently in the stack.

If you store the minimum as a single variable `currentMin`, it works for pushes (compare new value to currentMin). But what about pops? If you pop the current minimum, what was the minimum before it was pushed?

You've lost that information. You'd need to re-scan the whole stack → O(n). That's not allowed.
</details>

<details>
<summary>Hint 2 — the two-stack technique</summary>

Maintain a **second stack, `minStack`**, that tracks the minimum at each level of the main stack.

- When you `push(val)`: push `val` onto the main stack. Also push `min(val, minStack.peek())` onto `minStack`.
- When you `pop()`: pop from both stacks simultaneously.
- `getMin()`: peek at `minStack`.

The key insight: `minStack[i]` stores "what is the minimum in the main stack considering only the elements from the bottom up to index i?"

```
push 5:  main: [5]      minStack: [5]
push 3:  main: [5,3]    minStack: [5,3]
push 7:  main: [5,3,7]  minStack: [5,3,3]  ← min is still 3
pop():   main: [5,3]    minStack: [5,3]     → top was 7, min is back to 3
pop():   main: [5]      minStack: [5]       → popped 3, min is now 5
```
</details>

<details>
<summary>Hint 3 — alternative: store (value, currentMin) pairs</summary>

Instead of a second stack, you can store pairs in a single stack: each entry is `[value, minSoFar]`.

```js
this.stack = [];

push(val) {
  const min = this.stack.length ? Math.min(val, this.stack[this.stack.length-1][1]) : val;
  this.stack.push([val, min]);
}

getMin() {
  return this.stack[this.stack.length - 1][1];
}
```

Same O(1) guarantee, just one stack object instead of two.
</details>

## Write your solution
→ [`../solutions/09-min-stack.js`](../solutions/09-min-stack.js)

## Follow-ups
- **Max Stack** (Q10) — same idea, tracking the maximum instead.
- What if you need both `getMin` and `getMax` simultaneously? Can you do it in O(1) with two auxiliary stacks?
- What if `getMedian()` also needed to be O(1)? (Harder — hint: two heaps.)
