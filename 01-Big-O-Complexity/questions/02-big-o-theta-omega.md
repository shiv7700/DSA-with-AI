# Q2 — Big-O vs Big-Theta vs Big-Omega

**Difficulty:** Easy–Medium (Conceptual)
**Pattern:** Foundational concept — notation precision
**Expected:** Written explanation (no code required)

## Question

In formal algorithm analysis, there are three related notations: **Big-O (O)**, **Big-Theta (Θ)**, and **Big-Omega (Ω)**. Explain the difference between them.

Your answer should cover:

1. What does each one measure? (upper bound, lower bound, or exact bound?)
2. Give a simple example that illustrates when they're different.
3. Why does everyday conversation mostly use "Big-O" even when Theta would be more precise?

## Examples

There is no input/output for this question. Write your answer as a comment in the solution file.

### Example framing

Consider linear search (`arr.indexOf(x)`):
- Best case: the element is at index 0 — found in 1 step.
- Worst case: the element is absent — scanned all `n` elements.

Using all three notations: the worst-case time is O(n) (at most n steps), Ω(1) (at least 1 step), and **not** Θ(n) in general (because the best case doesn't hit n). But for the average case over all possible inputs, the analysis changes.

Your job is to articulate these differences clearly.

## Hints

<details>
<summary>Hint 1 — think about ceilings, floors, and sandwiches</summary>

- O(f(n)) — the algorithm takes **at most** c·f(n) steps for large n. Think of it as a **ceiling**.
- Ω(f(n)) — the algorithm takes **at least** c·f(n) steps for large n. Think of it as a **floor**.
- Θ(f(n)) — the algorithm takes **both** at most and at least c·f(n) steps. The ceiling and floor match — a **tight bound**. The algorithm is "sandwiched" between two multiples of f(n).
</details>

<details>
<summary>Hint 2 — the common misuse</summary>

When someone says "bubble sort is O(n²)", they usually mean "bubble sort is Θ(n²)" — it's not just bounded above by n², it actually always takes about n² steps.

Technically, it's also correct to say "bubble sort is O(n!)" — n! is indeed an upper bound (since n² ≤ n! for large n). But that's a loose, not-useful bound. Big-Theta captures the *tight* (exact) bound.

In practice, engineers say "O" and mean "the tight bound." Does your answer acknowledge this?
</details>

<details>
<summary>Hint 3 — why Omega matters</summary>

Big-Omega is most useful for proving that no algorithm can do better than a certain speed. For example: "any comparison-based sort requires at least Ω(n log n) comparisons in the worst case." This is a lower-bound proof — it says no matter how clever your algorithm, you cannot sort faster than n log n with comparisons alone.
</details>

## Write your answer
→ [`../solutions/02-big-o-theta-omega.js`](../solutions/02-big-o-theta-omega.js)

## Follow-ups
- Give an example of an algorithm where O ≠ Ω (i.e., the best and worst cases are different complexity classes).
- Why is it valid to say "linear search is O(n²)" — even though it's O(n)?
- For which common algorithms are Big-O and Big-Theta the same?
- What does it mean that comparison-based sorting is Ω(n log n)?
