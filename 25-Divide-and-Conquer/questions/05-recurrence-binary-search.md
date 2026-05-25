# Q5 — Recurrence Analysis: T(n) = T(n/2) + 1

**Difficulty:** Easy (theory)
**Pattern:** Master Theorem — Case 2
**Expected:** Pen-and-paper analysis

## Problem

You are given the recurrence:

```
T(n) = T(n/2) + 1,  with  T(1) = 1
```

This is the recurrence for **binary search**: you make **one** recursive call on a problem of size n/2, and do O(1) work to pick the right half.

1. Identify a, b, and f(n).
2. Compute `c = log_b(a)`.
3. Determine which Master Theorem case applies.
4. State the closed-form complexity.

## Examples

### Example — manual expansion (n = 8)

```
T(8) = T(4) + 1
T(4) = T(2) + 1
T(2) = T(1) + 1 = 1 + 1 = 2
T(4) = 2 + 1 = 3
T(8) = 3 + 1 = 4
```

log₂(8) = 3, and T(8) = 4 = log₂(8) + 1 = Θ(log n). Confirmed.

For n = 1,024: T(1024) = 11 steps. For n = 1,048,576 (≈ 10⁶): T = 21 steps. Incredibly efficient.

## Constraints

- Theory question — written explanation + Θ result.
- No code required.

## Hints

<details>
<summary>Hint 1 — identify parameters</summary>

- `a` = 1 (only one recursive call)
- `b` = 2 (problem halves each time)
- `f(n)` = 1 (constant work to decide which half)

`c = log₂(1) = 0`. So n^c = n⁰ = 1.
</details>

<details>
<summary>Hint 2 — compare f(n) to n^c</summary>

n^c = 1.
f(n) = 1.

They're the same! Both are constant. That's Case 2.
</details>

<details>
<summary>Hint 3 — apply Case 2</summary>

Case 2 → T(n) = Θ(n^c · log n) = Θ(1 · log n) = **Θ(log n)**.
</details>

<details>
<summary>Hint 4 — intuitive explanation</summary>

Binary search just keeps halving. The total number of "halvings" before you reach size 1 is log₂(n). Each halving costs O(1). So the total is O(log n).

No tree needed — it's a straight chain of recursive calls:

```
T(n) → T(n/2) → T(n/4) → … → T(1)
  +1      +1       +1            +1
```

Chain length = log₂(n). Total = log₂(n) + 1 = Θ(log n).
</details>

## Answer

→ [`../solutions/05-recurrence-binary-search.js`](../solutions/05-recurrence-binary-search.js)

## Follow-ups

- Compare this to Q2: T(n) = 2T(n/2) + 1. The only change is `a`: from 1 to 2. Yet the complexity jumps from Θ(log n) to Θ(n). Why does that one change matter so much?
- If you used **ternary search** (split into 3 equal parts, recurse on one), the recurrence is T(n) = T(n/3) + 1. Is that faster or slower than binary search?
