# Q14 — Comparing Growth Rates

**Difficulty:** Easy (Conceptual)
**Pattern:** Complexity intuition — concrete numbers
**Expected:** Written explanation with a comparison table

## Question

Compare `O(log n)`, `O(n)`, and `O(n log n)` at different values of n. Your answer should:

1. Fill in (or reason through) a table of approximate step counts.
2. Identify at what scale the difference becomes practically significant.
3. Explain a real-world scenario where the choice between O(n) and O(n log n) matters.

## Examples

```
Approximate step counts (rounded):

n          O(log n)    O(n)       O(n log n)
---------  ----------  ---------  ----------
10         ~3          10         ~33
100        ~7          100        ~664
1,000      ~10         1,000      ~9,966
10,000     ~13         10,000     ~132,877
1,000,000  ~20         1,000,000  ~19,931,568
```

Your job: explain what these numbers mean in practice. At what n do the gaps start to matter?

## Hints

<details>
<summary>Hint 1 — O(log n) is almost free</summary>

For n = 1,000,000 (one million), O(log n) ≈ 20 steps. Twenty. This is why binary search on a sorted array of a million items is practically instant — it only needs about 20 comparisons.

Compare that to O(n): a million steps for a million items. Still fast for a computer, but a 50,000× difference from O(log n).
</details>

<details>
<summary>Hint 2 — when does O(n log n) vs O(n) matter?</summary>

For n = 1,000: O(n) = 1,000 steps; O(n log n) = ~10,000 steps — a 10× difference.
For n = 1,000,000: O(n) = 1,000,000 steps; O(n log n) = ~20,000,000 steps — still 20×.

The ratio O(n log n)/O(n) = log n, which grows slowly. The difference matters at large n, but not as dramatically as O(n) vs O(n²).

A practical scenario: sorting 10 million user records before returning results — O(n log n) is unavoidable (and fast enough), while a second scan over those sorted records is an additional O(n) — negligible by comparison.
</details>

<details>
<summary>Hint 3 — real-world framing</summary>

A search engine might have n = 10 billion web pages. O(log n) ≈ 33 comparisons (binary search on a sorted index). O(n) = 10 billion — still physically possible, but 333 million× slower. O(n log n) = ~330 billion — that would be painfully slow for a single search query.

This is why building a sorted index (an O(n log n) one-time cost) enables O(log n) per query. The one-time cost pays off across billions of queries.
</details>

## Write your answer
→ [`../solutions/14-comparing-growth-rates.js`](../solutions/14-comparing-growth-rates.js)

## Follow-ups
- At what n does O(n log n) first exceed 10× the cost of O(n)?
- An algorithm is O(n²). At n = 10,000, a modern computer can run about 10⁸ basic operations per second. How long does it take? What about O(n log n)?
- Why is O(n log n) considered the "theoretical lower bound" for comparison-based sorting?
- Give an example of an algorithm that is exactly O(n log n) (not just bounded by it).
