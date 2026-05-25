# Q10 — Max Stack

**Difficulty:** Medium
**Pattern:** Stack — auxiliary stack for tracking state
**Expected:** O(1) per operation · O(n) space

## Problem

Design a stack that supports `push`, `pop`, `top`, and retrieving the **maximum element** — all in **O(1) time**.

Implement the `MaxStack` class:
- `push(val)` — push `val` onto the stack.
- `pop()` — remove the top element and return it.
- `top()` — return (but don't remove) the top element.
- `getMax()` — return the maximum element currently in the stack.

## Examples

### Example 1
```
const s = new MaxStack();
s.push(1);
s.push(5);
s.push(3);
s.getMax()  → 5
s.pop()     → 3
s.getMax()  → 5
s.pop()     → 5
s.getMax()  → 1
```

### Example 2
```
s.push(-10);
s.push(-5);
s.push(-20);
s.getMax()  → -5
s.pop()     → -20
s.getMax()  → -5
```

## Constraints
- `-2^31 <= val <= 2^31 - 1`
- `pop`, `top`, `getMax` will always be called on a non-empty stack.
- Up to `3 * 10^4` calls total.
- All operations must be O(1).

## Hints

<details>
<summary>Hint 1 — mirror the Min Stack solution</summary>

This is exactly the same design as Q9 (Min Stack) but tracking the maximum instead of the minimum. If you solved Q9, adapt that solution here — the logic is symmetric.

Use either:
- Two stacks: one main, one `maxStack` that stores the running maximum at each level.
- Pairs: store `[value, maxSoFar]` in each entry of a single stack.
</details>

<details>
<summary>Hint 2 — the two-stack version</summary>

```
push 3:  main: [3]      maxStack: [3]
push 5:  main: [3,5]    maxStack: [3,5]
push 1:  main: [3,5,1]  maxStack: [3,5,5]  ← max is still 5
pop():   main: [3,5]    maxStack: [3,5]     → getMax() still returns 5
pop():   main: [3]      maxStack: [3]       → now max is 3
```
</details>

## Write your solution
→ [`../solutions/10-max-stack.js`](../solutions/10-max-stack.js)

## Follow-ups
- Implement a stack that tracks **both** min and max simultaneously in O(1).
- What if you could also call `popMax()` — remove the maximum element wherever it is in the stack? This breaks O(1) for that operation. How would you implement `popMax()` as efficiently as possible?
