# Q4 — Amortized Complexity

**Difficulty:** Medium (Conceptual)
**Pattern:** Amortized analysis
**Expected:** Written explanation + JS example

## Question

Explain what **amortized complexity** means. Your answer should:

1. Define amortized complexity in plain English.
2. Use `Array.push()` in JavaScript as the primary example — explain why a single `push` call is said to be O(1) amortized, even though some individual calls are O(n).
3. Walk through the "doubling" mechanism and show why the average cost works out to O(1).

## Examples

There is no input/output for this question. Write your explanation as a comment in the solution file.

### The core scenario

JavaScript arrays have a fixed-size internal buffer. When you push an element and the buffer is full, the engine:
1. Allocates a new buffer of double the current size.
2. Copies all existing elements to the new buffer (O(n) work).
3. Adds the new element.

This looks expensive. But how often does it happen?

Starting from a buffer of size 1 that doubles as needed:

```
Buffer capacity:  1 → 2 → 4 → 8 → 16 → 32 → 64 → ...
Copy cost each:   1,  2,  4,  8,  16,  32,  64,  ...
```

If you push 64 elements total, the doubling costs were: 1 + 2 + 4 + 8 + 16 + 32 = 63 copy operations, spread across 64 pushes. That's roughly 1 copy per push — O(1) amortized.

Your task: explain this in your own words, and explain why it matters.

## Hints

<details>
<summary>Hint 1 — think of it as a "bank account" for work</summary>

Imagine every cheap O(1) push deposits a "work credit" into a savings account. When the occasional expensive O(n) push comes around, it withdraws from that account. If the bank balance never goes negative, the amortized cost is O(1).

The doubling strategy ensures that the expensive resize always has enough saved-up credit from the preceding cheap pushes to pay for itself.
</details>

<details>
<summary>Hint 2 — the geometric series argument</summary>

The total number of copy operations for n pushes is bounded by:

1 + 2 + 4 + 8 + ... + n/2 + n ≤ 2n

(This is the sum of a geometric series with ratio 2.) Dividing by n pushes total: 2n/n = 2 copy operations per push on average. That's a constant — O(1) amortized.
</details>

<details>
<summary>Hint 3 — why not grow by 1 each time?</summary>

If instead of doubling, the buffer grew by 1 element each time it filled:
- Push 1: copy 0 elements
- Push 2: copy 1 element
- Push 3: copy 2 elements
- Push n: copy n-1 elements

Total copies for n pushes = 0 + 1 + 2 + ... + (n-1) = n(n-1)/2 ≈ n²/2.

That's O(n²) total, or O(n) per push on average — much worse. Doubling is the key.
</details>

<details>
<summary>Hint 4 — other examples of amortized O(1)</summary>

`Array.push` isn't the only amortized O(1) operation. Some others:
- Inserting into a hash table (with rehashing): O(1) amortized.
- Inserting into a dynamic-size string builder: O(1) amortized (same doubling trick).

In contrast, `Array.unshift` is O(n) even amortized — the shifting cost applies to every call, not just occasional ones.
</details>

## Write your answer
→ [`../solutions/04-amortized-complexity.js`](../solutions/04-amortized-complexity.js)

## Follow-ups
- Is `Array.pop()` O(1) amortized, or just O(1)? What about the case where the array shrinks?
- What happens to amortized complexity if the array grows by a factor of 1.5 instead of 2? Does it change the asymptotic analysis?
- Name one JavaScript operation that is O(n) even when amortized — not just occasionally.
- Write a function `makeDynamicArray()` that simulates the doubling behavior and logs each resize event.
