# Q6 — Recurrence Analysis: T(n) = T(n-1) + n

**Difficulty:** Easy (theory)
**Pattern:** Recurrence expansion (not Master Theorem form)
**Expected:** Pen-and-paper analysis

## Problem

You are given the recurrence:

```
T(n) = T(n-1) + n,  with  T(1) = 1
```

This arises in **selection sort** (or insertion sort): you scan the whole array to find the minimum — O(n) work — then recurse on the remaining n-1 elements.

> **Note:** The Master Theorem only applies to recurrences of the form `T(n) = a·T(n/b) + f(n)` where the input shrinks by a **factor** each time. Here the input shrinks by a **constant** (n-1), so you must expand the recurrence manually.

1. Expand the recurrence step by step.
2. Identify the pattern.
3. State the closed-form complexity.

## Examples

### Example — expansion for small n

```
T(5) = T(4) + 5
T(4) = T(3) + 4
T(3) = T(2) + 3
T(2) = T(1) + 2 = 1 + 2 = 3
T(3) = 3 + 3 = 6
T(4) = 6 + 4 = 10
T(5) = 10 + 5 = 15
```

5 + 4 + 3 + 2 + 1 = 15. Notice anything familiar?

## Constraints

- Theory question — written explanation + Θ result.
- No code required.

## Hints

<details>
<summary>Hint 1 — expand manually</summary>

```
T(n) = T(n-1) + n
     = T(n-2) + (n-1) + n
     = T(n-3) + (n-2) + (n-1) + n
     = ...
     = T(1) + 2 + 3 + ... + n
     = 1 + 2 + 3 + ... + n
```
</details>

<details>
<summary>Hint 2 — sum of 1 to n</summary>

The sum 1 + 2 + 3 + ... + n = n(n+1)/2.

This is a classic result, provable by pairing: (1 + n) + (2 + n-1) + ... = (n+1) pairs of n+1.

n(n+1)/2 is Θ(n²).
</details>

<details>
<summary>Hint 3 — final answer</summary>

T(n) = Θ(n²).

This is why selection sort and insertion sort are O(n²) — they make n recursive calls, and each one does one fewer unit of work, summing to n(n+1)/2.
</details>

## Answer

→ [`../solutions/06-recurrence-selection-sort.js`](../solutions/06-recurrence-selection-sort.js)

## Follow-ups

- Why can't you apply the Master Theorem directly here?
- What would you need to change in the algorithm to get T(n) = T(n/2) + n (merge sort-like) instead?
- Visualize this as a "staircase" of work — each level does one less unit. How does this compare to the merge sort recursion tree where every level does the same amount?
