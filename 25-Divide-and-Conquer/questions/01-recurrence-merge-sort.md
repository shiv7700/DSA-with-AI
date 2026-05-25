# Q1 — Recurrence Analysis: T(n) = 2T(n/2) + n

**Difficulty:** Easy (theory)
**Pattern:** Master Theorem — Case 2
**Expected:** Pen-and-paper analysis

## Problem

You are given the recurrence relation:

```
T(n) = 2·T(n/2) + n,  with  T(1) = 1
```

This is the recurrence for **merge sort**: you make 2 recursive calls on problems of size n/2, and then do O(n) work in the merge step.

1. Identify a, b, and f(n) in the Master Theorem form `T(n) = a·T(n/b) + f(n)`.
2. Compute the critical exponent `c = log_b(a)`.
3. Determine which Master Theorem case applies.
4. State the closed-form complexity of T(n).

## Examples

### Example — small case (n = 4)

Expand the recurrence manually:

```
T(4) = 2·T(2) + 4
T(2) = 2·T(1) + 2 = 2·1 + 2 = 4
T(4) = 2·4 + 4 = 12
```

For n = 8:
```
T(8) = 2·T(4) + 8 = 2·12 + 8 = 32
```

Note that n·log₂(n) for n=8 is 8·3 = 24. The constant factors and lower-order terms explain the gap from the approximation — the Θ notation absorbs them.

## Constraints

- This is a theory question — write your answer as a brief explanation.
- You do not need to produce code.
- Your answer should state the complexity in Θ notation.

## Hints

<details>
<summary>Hint 1 — identify the parameters</summary>

Read off `a`, `b`, `f(n)` from the recurrence:
- `a` = number of recursive subproblems = ?
- `b` = factor by which input shrinks = ?
- `f(n)` = work done outside recursion = ?
</details>

<details>
<summary>Hint 2 — compute the critical exponent</summary>

`c = log_b(a)`. For this recurrence, what is log base 2 of 2?

Think about it: 2^? = 2.
</details>

<details>
<summary>Hint 3 — compare f(n) to n^c</summary>

Once you have c = 1, compare f(n) = n to n^c = n^1 = n.

They are the same growth rate. Which Master Theorem case is that?

- Case 1: f(n) grows **slower** than n^c → T(n) = Θ(n^c)
- Case 2: f(n) grows at the **same rate** as n^c → T(n) = Θ(n^c · log n)
- Case 3: f(n) grows **faster** than n^c → T(n) = Θ(f(n))
</details>

<details>
<summary>Hint 4 — the recursion tree confirmation</summary>

Draw the recursion tree:

```
Level 0: 1 problem of size n,   cost = n
Level 1: 2 problems of size n/2, total cost = 2·(n/2) = n
Level 2: 4 problems of size n/4, total cost = 4·(n/4) = n
...
Level k: 2^k problems of size n/2^k, total cost = n

Levels until size = 1: k = log₂(n)
Total = n × (log₂(n) + 1) = Θ(n log n)
```
</details>

## Answer

→ [`../solutions/01-recurrence-merge-sort.js`](../solutions/01-recurrence-merge-sort.js)

## Follow-ups

- Draw the recursion tree for n = 16 and verify the level-by-level costs.
- Why does every level cost exactly n? What property of the merge step makes this true?
- If the merge step were O(n²) instead of O(n), what would the total complexity be?
