# Q13 — Identify the Complexity: Two-Array Sequential Loops

**Difficulty:** Easy
**Pattern:** Complexity analysis — two inputs, sequential loops
**Expected:** State time complexity and space complexity with justification

## Problem

Analyze the following function and state its **time complexity** and **space complexity**. Justify each answer in a comment. This question tests a common mistake beginners make with two separate inputs.

```js
function twoLoops(arr1, arr2) {
  for (const a of arr1) console.log(a);
  for (const b of arr2) console.log(b);
}
```

## Input / Output

```
Input:  arr1 (length n), arr2 (length m)
Output: State O(?) time, O(?) space — and explain why
```

## Constraints
- `arr1` has length n; `arr2` has length m.
- n and m are **not necessarily equal** — do not assume they are the same.

## Hints

<details>
<summary>Hint 1 — use two variable names for two different sizes</summary>

Since `arr1` and `arr2` might be different sizes, we need two different variables to represent their lengths. Convention: call them `n` and `m`.

The first loop runs `n` times. The second loop runs `m` times. Sequential (not nested), so you add them.
</details>

<details>
<summary>Hint 2 — O(n + m), not O(2n)</summary>

This is **O(n + m)**, not O(2n). Writing O(2n) would wrongly imply both arrays are the same length. If n = 5 and m = 1,000,000, the total work is dominated by the second loop.

O(n + m) is the accurate, general answer. If you happen to know n = m, you can simplify: O(n + n) = O(2n) = O(n). But don't assume.
</details>

<details>
<summary>Hint 3 — compare: what if the loops were nested?</summary>

If the second loop were inside the first, the complexity would be O(n · m). Since they're sequential (one after the other), it's O(n + m). Know the difference:

- Sequential loops → add → O(n + m)
- Nested loops → multiply → O(n · m)
</details>

## Write your answer
→ [`../solutions/13-two-array-loops.js`](../solutions/13-two-array-loops.js)

## Follow-ups
- Rewrite `twoLoops` so the second loop is nested inside the first. What does the complexity become?
- What if there were three arrays, each with different lengths n, m, and p, and each had its own sequential loop? What's the complexity?
- If both arrays always have the same length (n = m), simplify O(n + m). What does it reduce to?
- What is the complexity of `[...arr1, ...arr2]` (spread into a new array)? Use the same n and m notation.
