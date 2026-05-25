# Q8 — Identify the Complexity: Fixed Cap Loop

**Difficulty:** Easy
**Pattern:** Complexity analysis — constant-bounded loop
**Expected:** State time complexity and space complexity with justification

## Problem

Analyze the following function and state its **time complexity** and **space complexity**. Justify each answer in a comment. This one is a common trick question.

```js
function printFirstTen(arr) {
  for (let i = 0; i < 10 && i < arr.length; i++) {
    console.log(arr[i]);
  }
}
```

## Input / Output

```
Input:  The function itself (n = arr.length)
Output: State O(?) time, O(?) space — and explain why
```

## Constraints
- `arr` is an array of length n.
- The hard cap in the loop condition is exactly 10 (a fixed constant).

## Hints

<details>
<summary>Hint 1 — what is the maximum number of iterations?</summary>

Regardless of how large `arr` is, the condition `i < 10` caps the loop. If `arr` has 10 elements, the loop runs 10 times. If `arr` has 10,000 elements, the loop still runs at most 10 times.

Does the number of iterations grow with n?
</details>

<details>
<summary>Hint 2 — a constant upper bound makes it O(1)</summary>

When the number of iterations is bounded by a fixed constant (10, 100, 1000 — any number that doesn't depend on the input size), the loop is O(1). It doesn't matter how large the array gets — the work is always "at most 10 steps."

Compare this to a loop with `i < arr.length` — there, the upper bound scales with n.
</details>

<details>
<summary>Hint 3 — the rule to remember</summary>

A loop is O(1) if its iteration count is bounded by a constant. A loop is O(n) if its iteration count grows proportionally with n. The loop condition is the key — look at the upper bound expression.
</details>

## Write your answer
→ [`../solutions/08-fixed-cap-loop.js`](../solutions/08-fixed-cap-loop.js)

## Follow-ups
- What if the cap were `Math.min(arr.length, 10)`? Same answer?
- What if the cap were `Math.sqrt(arr.length)`? That grows with n — what complexity would that be?
- What if the function took a parameter `k` for the cap, and `k` could be anywhere from 1 to n? How would you express the complexity?
- What is the complexity of `arr.slice(0, 10)`? How does it compare to this function?
