# Q1 — What is Big-O Notation?

**Difficulty:** Easy (Conceptual)
**Pattern:** Foundational concept
**Expected:** Written explanation (no code required)

## Question

Explain Big-O notation in your own words. Your answer should cover:

1. What is it measuring?
2. What does the letter `n` represent?
3. Why does it matter for writing software?

You do not need to use formal mathematical definitions. Write as if you're explaining it to a fellow beginner who has just started learning to code.

## Examples

There is no "input/output" for this question. Instead, write your answer as a comment in the solution file.

### Example framing

A strong answer might start like: "Big-O notation is a way of measuring how the running time (or memory usage) of an algorithm changes as its input grows. The `n` stands for the size of the input — for example, the number of elements in an array. If an algorithm is O(n), it means: when the input doubles, the work roughly doubles too..."

## Hints

<details>
<summary>Hint 1 — think about scale, not exact speed</summary>

Big-O doesn't tell you "this function takes 5 milliseconds." It tells you: "if the input grows 10×, does the time grow 10×? Or 100×? Or stay the same?"

Focus your answer on *how the work changes* as `n` grows — not on a specific time measurement.
</details>

<details>
<summary>Hint 2 — the machine doesn't matter</summary>

Big-O is intentionally machine-independent. A function that takes 3ms on your laptop and 1ms on a server still has the same Big-O. That's the point: Big-O describes the *algorithm's structure*, not the hardware.

How does this affect the way you'd describe it?
</details>

<details>
<summary>Hint 3 — an analogy to lean on</summary>

Think about searching for a name in a phone book. If you flip page by page from the start, the time grows linearly with the number of pages — O(n). If you open to the middle, split in half, and repeat — that's O(log n). The phone book's *size* determines which one matters.
</details>

## Write your answer
→ [`../solutions/01-what-is-big-o.js`](../solutions/01-what-is-big-o.js)

## Follow-ups
- What would change about your explanation if you were describing *space* complexity instead of *time* complexity?
- Why does Big-O only care about "large `n`"? Is it always relevant for small inputs?
- Can two algorithms with the same Big-O have very different real-world speeds? Give an example.
- How would you explain O(1) vs O(n) to someone who has never programmed?
