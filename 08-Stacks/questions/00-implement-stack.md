# Q0 — Implement a Stack

**Difficulty:** Easy (foundational — do this first)
**Pattern:** Design / Data Structure
**Expected:** O(1) per operation · O(n) space

## Problem

Implement a `Stack` class that supports the following operations:

- `push(x)` — add item `x` to the top of the stack.
- `pop()` — remove and return the item from the top. Return `undefined` if the stack is empty.
- `peek()` — return (without removing) the item on top. Return `undefined` if the stack is empty.
- `isEmpty()` — return `true` if the stack has no items, `false` otherwise.
- `size()` — return the number of items in the stack.

**Part A:** Implement using a JavaScript array as the backing storage.

**Part B:** Implement using a singly linked list as the backing storage (no arrays allowed).

Both implementations must have **O(1)** time for every operation.

## Examples

### Example 1 (array-backed)
```
const s = new Stack();
s.isEmpty()   → true
s.push(10)
s.push(20)
s.push(30)
s.peek()      → 30
s.pop()       → 30
s.pop()       → 20
s.size()      → 1
s.isEmpty()   → false
s.pop()       → 10
s.isEmpty()   → true
s.pop()       → undefined
```

### Example 2 (same behavior expected from linked-list version)
```
const s = new StackLL();
s.push(1);
s.push(2);
s.push(3);
s.pop()   → 3
s.peek()  → 2
s.size()  → 2
```

## Constraints
- `0 <= number of operations <= 10^4`
- Values can be any JavaScript primitive or object.
- All operations must run in O(1) time.
- **Part B** must not use a JavaScript array internally.

## Hints

<details>
<summary>Hint 1 — Part A (array-backed)</summary>

A JavaScript array is already almost a stack. The key insight is: treat the **end** (right side) of the array as the "top" of the stack.

- `push(x)` → `this.items.push(x)` — O(1)
- `pop()` → `this.items.pop()` — O(1)
- `peek()` → `this.items[this.items.length - 1]` — O(1)

Why use the end and not the front? Because `push` and `pop` at the end are O(1), while `unshift` and `shift` at the front are O(n) (they shift every element). Never implement a stack using the front of an array.
</details>

<details>
<summary>Hint 2 — Part B (linked-list-backed)</summary>

A singly linked list looks like: `head → [val|next] → [val|next] → null`

For a stack, treat the **head** as the "top":

- `push(x)`: create a new node, point its `next` at the current head, then set head to the new node. (Prepend — O(1).)
- `pop()`: save `head.val`, advance `head = head.next`, return the saved value. (O(1).)
- `peek()`: return `head.val` without changing anything. (O(1).)

Keep a `_size` counter so `size()` is O(1) (no need to traverse the list).
</details>

<details>
<summary>Hint 3 — edge cases to watch for</summary>

- `pop()` and `peek()` on an empty stack should return `undefined`, not throw.
- `size()` should return `0` on an empty stack, not `-1` or an error.
- After alternating pushes and pops, check that `size()` remains consistent.
</details>

## Write your solution
→ [`../solutions/00-implement-stack.js`](../solutions/00-implement-stack.js)

## Follow-ups
- Add a `print()` method that logs the stack from top to bottom.
- Implement a stack that also tracks the **minimum** element in O(1) (see Q9 — Min Stack).
- What happens if you accidentally use `unshift`/`shift` instead of `push`/`pop` in Part A? Write a benchmark and measure the difference at n = 100 000.
