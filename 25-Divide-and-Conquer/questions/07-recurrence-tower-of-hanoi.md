# Q7 — Recurrence Analysis: T(n) = 2T(n-1) + 1

**Difficulty:** Easy/Medium (theory)
**Pattern:** Recurrence expansion — exponential result
**Expected:** Pen-and-paper analysis

## Problem

You are given the recurrence:

```
T(n) = 2·T(n-1) + 1,  with  T(1) = 1
```

This is the recurrence for the **Tower of Hanoi** puzzle: to move n disks, you move the top n-1 disks to a spare peg (T(n-1)), move the largest disk (1 step), then move the n-1 disks on top of it (T(n-1) again). Total: 2·T(n-1) + 1 moves.

> **Note:** Again, the Master Theorem does not apply here (the input shrinks by 1, not by a factor). You must expand manually.

1. Expand the recurrence step by step.
2. Identify the geometric series pattern.
3. State the closed-form complexity.

## Examples

### Example — small cases

```
n=1: T(1) = 1   (1 move)
n=2: T(2) = 2·1 + 1 = 3   (3 moves)
n=3: T(3) = 2·3 + 1 = 7   (7 moves)
n=4: T(4) = 2·7 + 1 = 15  (15 moves)
n=5: T(5) = 2·15 + 1 = 31 (31 moves)
```

Pattern: 1, 3, 7, 15, 31 ... = 2^1 - 1, 2^2 - 1, 2^3 - 1, 2^4 - 1, 2^5 - 1.

## Constraints

- Theory question — written explanation + Θ result.
- No code required.

## Hints

<details>
<summary>Hint 1 — expand the recurrence</summary>

```
T(n) = 2·T(n-1) + 1
     = 2·(2·T(n-2) + 1) + 1   = 4·T(n-2) + 2 + 1
     = 4·(2·T(n-3) + 1) + 3   = 8·T(n-3) + 4 + 2 + 1
     = ...
     = 2^k · T(n-k) + 2^(k-1) + 2^(k-2) + ... + 1
```

When k = n-1: `= 2^(n-1) · T(1) + 2^(n-2) + ... + 1`
</details>

<details>
<summary>Hint 2 — geometric series</summary>

T(1) = 1, so:

```
T(n) = 2^(n-1) + 2^(n-2) + ... + 2 + 1
     = sum of 2^i for i = 0 to n-1
     = 2^n - 1
```

(Geometric series sum: a(r^n - 1)/(r - 1) = 1·(2^n - 1)/(2 - 1) = 2^n - 1)
</details>

<details>
<summary>Hint 3 — final answer</summary>

T(n) = 2^n - 1 = **Θ(2^n)**.

This is exponential. For n = 64 disks, that's 2^64 - 1 ≈ 1.8 × 10^19 moves. At one move per second, it would take about 585 billion years. This is why the Tower of Hanoi is not something you'd actually build as a computer algorithm for large n.
</details>

## Answer

→ [`../solutions/07-recurrence-tower-of-hanoi.js`](../solutions/07-recurrence-tower-of-hanoi.js)

## Follow-ups

- Implement the Tower of Hanoi recursion in JavaScript. Confirm that your implementation on n=3 makes exactly 7 moves and on n=4 makes exactly 15 moves.
- Why is 2^n - 1 the **minimum** number of moves? Can you prove that you can't do it in fewer?
- Compare Θ(2^n) to Θ(n!). Which grows faster? (Tower of Hanoi is exponential; some other combinatorial problems are factorial.)
