# Q4 — Recurrence Analysis: T(n) = 7T(n/2) + n²

**Difficulty:** Easy (theory)
**Pattern:** Master Theorem — Case 1
**Expected:** Pen-and-paper analysis

## Problem

You are given the recurrence:

```
T(n) = 7·T(n/2) + n²,  with  T(1) = 1
```

This is the recurrence for **Strassen's matrix multiplication** algorithm. Strassen discovered a way to multiply two n×n matrices using only **7** recursive multiplications of (n/2)×(n/2) matrices (instead of the naive 8), plus O(n²) additions.

1. Identify a, b, and f(n).
2. Compute `c = log_b(a)`.
3. Determine which Master Theorem case applies.
4. State the closed-form complexity.

## Examples

### Example — why Strassen matters

Naive matrix multiplication:
```
T(n) = 8·T(n/2) + n²
c = log₂(8) = 3  → T(n) = Θ(n³)
```

Strassen's:
```
T(n) = 7·T(n/2) + n²
c = log₂(7) ≈ 2.807  → T(n) = Θ(n^2.807)
```

Going from 8 to 7 recursive calls reduces the exponent from 3 to ~2.807. For very large matrices (n = 1,000), that's a 10× speedup.

## Constraints

- Theory question — written explanation + Θ result.
- No code required.
- You may leave the answer as Θ(n^(log₂ 7)).

## Hints

<details>
<summary>Hint 1 — identify parameters</summary>

- `a` = 7 (seven recursive calls)
- `b` = 2 (each subproblem is half the size)
- `f(n)` = n² (quadratic work for matrix additions)

`c = log₂(7) ≈ 2.807`
</details>

<details>
<summary>Hint 2 — compare f(n) to n^c</summary>

n^c = n^(log₂ 7) ≈ n^2.807.

f(n) = n².

Does n² grow slower than n^2.807? Yes — n^2.807 eventually dominates n².

(Check: n^2.807 / n² = n^0.807 → grows without bound.)

So f(n) = O(n^(c - ε)) for some small ε. That's Case 1.
</details>

<details>
<summary>Hint 3 — apply Case 1</summary>

Case 1 → T(n) = Θ(n^c) = **Θ(n^(log₂ 7)) ≈ Θ(n^2.807)**.

This beats the naive Θ(n³) from 8 recursive calls!
</details>

## Answer

→ [`../solutions/04-recurrence-strassen.js`](../solutions/04-recurrence-strassen.js)

## Follow-ups

- Why is reducing from 8 to 7 recursive calls such a big deal? What happens to the exponent c?
- Strassen was the first to beat O(n³) for matrix multiplication (1969). The current best known is ~O(n^2.371). How could you further reduce the number of recursive multiplications?
- What is the tradeoff Strassen makes compared to naive matrix multiplication?
