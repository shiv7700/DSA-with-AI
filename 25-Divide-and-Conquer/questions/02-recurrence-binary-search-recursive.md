# Q2 — Recurrence Analysis: T(n) = 2T(n/2) + 1

**Difficulty:** Easy (theory)
**Pattern:** Master Theorem — Case 1
**Expected:** Pen-and-paper analysis

## Problem

You are given the recurrence:

```
T(n) = 2·T(n/2) + 1,  with  T(1) = 1
```

One scenario where this arises: a recursive algorithm that splits the problem into 2 subproblems of half the size, but does only **constant work** (O(1)) outside the recursive calls.

1. Identify a, b, and f(n).
2. Compute `c = log_b(a)`.
3. Determine which Master Theorem case applies.
4. State the closed-form complexity.

> **Note:** This is different from regular binary search — regular binary search has `T(n) = T(n/2) + 1` (only **one** recursive call). This recurrence explores what happens when you make **two** recursive calls but still do constant combine work.

## Examples

### Example — manual expansion (n = 8)

```
T(8) = 2·T(4) + 1
T(4) = 2·T(2) + 1
T(2) = 2·T(1) + 1 = 2·1 + 1 = 3
T(4) = 2·3 + 1 = 7
T(8) = 2·7 + 1 = 15
```

Note: for n = 8, T(n) = 15 = 2·8 - 1 = Θ(n). Does your Master Theorem analysis confirm this?

## Constraints

- Theory question — written explanation + Θ result.
- No code required.

## Hints

<details>
<summary>Hint 1 — identify a, b, f(n)</summary>

- `a` = 2 (two recursive calls)
- `b` = 2 (each problem is half the size)
- `f(n)` = 1 (constant work outside recursion)
</details>

<details>
<summary>Hint 2 — compute the critical exponent</summary>

`c = log₂(2) = 1`. So `n^c = n^1 = n`.

Now compare `f(n) = 1` to `n^c = n`.

1 grows **slower** than n. Which case does that mean?
</details>

<details>
<summary>Hint 3 — apply Case 1</summary>

Case 1: `f(n) = O(n^(c-ε))` for some ε > 0 → `T(n) = Θ(n^c)`.

Here f(n) = 1 = O(n^0) = O(n^(1-1)) so ε = 1 works.

Result: T(n) = Θ(n^1) = **Θ(n)**.
</details>

<details>
<summary>Hint 4 — recursion tree intuition</summary>

```
Level 0: 1 problem of size n,   cost = 1
Level 1: 2 problems of size n/2, cost = 2·1 = 2
Level 2: 4 problems of size n/4, cost = 4·1 = 4
...
Level k: 2^k problems,          cost = 2^k

Total = 1 + 2 + 4 + … + n = 2n - 1 = Θ(n)
```

The leaf level (n leaf nodes, each O(1)) dominates. That's why the leaves win → Case 1.
</details>

## Answer

→ [`../solutions/02-recurrence-binary-search-recursive.js`](../solutions/02-recurrence-binary-search-recursive.js)

## Follow-ups

- Why do the **leaf nodes dominate** in Case 1? Visualize the recursion tree and mark which level contributes the most work.
- How would T(n) change if the constant work were O(log n) instead of O(1)?
- Compare this recurrence to `T(n) = T(n/2) + 1` (Q5). What changes when you go from 2 recursive calls to 1?
