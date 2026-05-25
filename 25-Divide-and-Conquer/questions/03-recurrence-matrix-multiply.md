# Q3 — Recurrence Analysis: T(n) = 4T(n/2) + n

**Difficulty:** Easy (theory)
**Pattern:** Master Theorem — Case 1
**Expected:** Pen-and-paper analysis

## Problem

You are given the recurrence:

```
T(n) = 4·T(n/2) + n,  with  T(1) = 1
```

This arises in a variant of naive matrix multiplication where you split each n×n matrix into four (n/2)×(n/2) submatrices and make 4 recursive calls, with O(n) work to add the results.

1. Identify a, b, and f(n).
2. Compute `c = log_b(a)`.
3. Determine which Master Theorem case applies.
4. State the closed-form complexity.

## Examples

### Example — manual expansion (n = 4)

```
T(4) = 4·T(2) + 4
T(2) = 4·T(1) + 2 = 4·1 + 2 = 6
T(4) = 4·6 + 4 = 28
```

For n = 8: T(8) = 4·T(4) + 8 = 4·28 + 8 = 120.

Note: n² = 64 for n = 8. The exact value is larger due to constants, but T(n) = Θ(n²).

## Constraints

- Theory question — written explanation + Θ result.
- No code required.

## Hints

<details>
<summary>Hint 1 — identify parameters</summary>

- `a` = 4 (four recursive calls)
- `b` = 2 (each subproblem is half the size)
- `f(n)` = n (linear combine work)

`c = log₂(4) = ?`  (what power of 2 gives 4?)
</details>

<details>
<summary>Hint 2 — compute n^c</summary>

log₂(4) = 2, so n^c = n².

Compare f(n) = n to n^c = n².

n grows **slower** than n². Which case?
</details>

<details>
<summary>Hint 3 — apply Case 1</summary>

f(n) = n = O(n^(2-1)), so ε = 1 works for Case 1.

Result: T(n) = Θ(n^c) = **Θ(n²)**.
</details>

<details>
<summary>Hint 4 — recursion tree</summary>

```
Level 0: 1 problem,  cost = n
Level 1: 4 problems, cost = 4·(n/2)  = 2n
Level 2: 16 problems, cost = 16·(n/4) = 4n
...
Level k: 4^k problems, cost = 4^k · (n/2^k) = n · (4/2)^k = n · 2^k

At the leaf level (k = log₂ n): n · 2^(log₂ n) = n · n = n²

The leaf level dominates → Case 1 → Θ(n²).
```
</details>

## Answer

→ [`../solutions/03-recurrence-matrix-multiply.js`](../solutions/03-recurrence-matrix-multiply.js)

## Follow-ups

- Why does the leaf level dominate here? At each level the work grows — visualize this on the recursion tree.
- How is this recurrence different from Strassen's (Q4)?
- Could you reduce the 4 recursive calls to 3 (like Karatsuba did for multiplication) to beat O(n²)?
