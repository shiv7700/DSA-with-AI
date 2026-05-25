# Q6 — Two Stacks in One Array

**Difficulty:** Easy
**Pattern:** Design / Array indexing
**Expected:** O(1) per operation · O(n) space total

## Problem

Implement **two stacks** using a **single fixed-size array** of length `n`. Both stacks together must be able to use any amount of space up to the full array — neither stack should waste half the array by default.

Implement:
- `push1(x)` — push onto stack 1.
- `push2(x)` — push onto stack 2.
- `pop1()` — pop from stack 1.
- `pop2()` — pop from stack 2.
- `peek1()`, `peek2()` — peek at each stack's top.
- `isEmpty1()`, `isEmpty2()`

Throw an error (or return a sentinel) if you try to push and the array is full, or pop from an empty stack.

## Examples

```
const ts = new TwoStacks(6);

ts.push1(10); ts.push1(20);
ts.push2(30); ts.push2(40); ts.push2(50);

ts.pop1()   → 20
ts.pop2()   → 50
ts.peek1()  → 10
ts.peek2()  → 40
ts.push1(60); ts.push1(70);    // uses space freed by earlier pops
```

## Constraints
- `1 <= n <= 10^4`
- Values are integers.
- Total items across both stacks at any time must not exceed `n`.
- All operations must be O(1).

## Hints

<details>
<summary>Hint 1 — naive split (and why it wastes space)</summary>

The simple idea: give stack 1 the left half (`[0 .. n/2-1]`) and stack 2 the right half (`[n/2 .. n-1]`). This works, but it wastes space: if stack 1 grows to 60 elements and stack 2 only has 5, stack 2's 45 empty slots can't be used by stack 1.
</details>

<details>
<summary>Hint 2 — grow from opposite ends</summary>

A much better approach: start stack 1 from the **left** end (index 0) and grow rightward. Start stack 2 from the **right** end (index n−1) and grow leftward. They meet in the middle.

```
Index:  0   1   2       ...     n-2  n-1
        ←── stack 1 grows        stack 2 grows ──→
        ┌───┬───┬───┬────────┬───┬───┐
        │S1 │S1 │   │  free  │   │S2 │
        └───┴───┴───┴────────┴───┴───┘
                 ↑                ↑
               top1             top2
```

The array is "full" when `top1 + 1 === top2`.

Stack 1 tracks its top with an index starting at -1 (empty) and incrementing. Stack 2 tracks its top starting at `n` (empty) and decrementing.
</details>

## Write your solution
→ [`../solutions/06-two-stacks-one-array.js`](../solutions/06-two-stacks-one-array.md)

## Follow-ups
- Extend the idea to **three stacks** in one array. How would you divide space?
- What if you don't know how large each stack will grow, and you want dynamic resizing? Look up "stack with dynamic division" — it's a significantly harder design problem.
