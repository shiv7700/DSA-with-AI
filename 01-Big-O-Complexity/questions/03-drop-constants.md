# Q3 — Why Drop Constants and Lower-Order Terms?

**Difficulty:** Easy (Conceptual)
**Pattern:** Big-O simplification rules
**Expected:** Written explanation (no code required)

## Question

Big-O notation follows two simplification rules that beginners often find puzzling:

1. **Drop constants:** O(3n) becomes O(n). O(500) becomes O(1).
2. **Drop lower-order terms:** O(n² + n + 1) becomes O(n²).

Explain *why* these rules make sense. Your answer should address:

- What justifies ignoring constants?
- What justifies ignoring lower-order terms?
- Is there any scenario where the dropped constant actually matters in practice?

## Examples

There is no code input/output for this question. Write your answer as a comment.

### Worked example to address in your answer

```
Algorithm A: does exactly  2n operations
Algorithm B: does exactly  n² operations

n = 10:    A = 20,       B = 100
n = 100:   A = 200,      B = 10,000
n = 1000:  A = 2,000,    B = 1,000,000
n = 10000: A = 20,000,   B = 100,000,000
```

Even though Algorithm A has a constant factor of 2 and Algorithm B has coefficient 1, Algorithm B becomes overwhelmingly slower. Why?

## Hints

<details>
<summary>Hint 1 — Big-O is about the shape of growth</summary>

Big-O describes the *growth rate*, not the actual number of operations. Two algorithms that both double their work when the input doubles are the same *shape* of growth — linear — even if one does 5× more work than the other at every n.

The constant factor (how many times faster one is) depends on hardware, language, CPU cache behavior, branch prediction, and other factors that Big-O intentionally ignores. A 5× constant advantage can disappear if you run on different hardware.
</details>

<details>
<summary>Hint 2 — lower-order terms vanish at scale</summary>

For the expression n² + n:
- n = 10:    100 + 10    → the n term is 10% of the total
- n = 100:   10,000 + 100 → the n term is 1% of the total
- n = 10000: 100,000,000 + 10,000 → the n term is 0.01% of the total

As n grows, the lower-order term becomes increasingly irrelevant. For sufficiently large n, the dominant term overwhelms everything else.
</details>

<details>
<summary>Hint 3 — the practical caveat</summary>

Constants *do* matter in practice — but at a different level of optimization. When you've already chosen the right Big-O complexity (the right algorithm), then you optimize constants: better cache usage, SIMD instructions, avoiding branch mispredictions. This is called "constant factor optimization." It's real, but it's a second-order concern.

The rule of thumb: first choose the right algorithm (correct Big-O), then optimize constants if needed.
</details>

## Write your answer
→ [`../solutions/03-drop-constants.js`](../solutions/03-drop-constants.js)

## Follow-ups
- If O(2n) and O(n) are the same Big-O, why would you ever prefer the O(2n) solution over O(n)?
- Simplify each of these: `O(n + 500)`, `O(3n² + 2n + 7)`, `O(n log n + n²)`, `O(4)`.
- Give a real-world scenario where two O(n) algorithms differ so much in constant factors that the "slower" Big-O algorithm is actually faster in practice.
