# Q12 — Identify the Complexity: Triangle Loop

**Difficulty:** Medium
**Pattern:** Complexity analysis — asymmetric nested loops
**Expected:** State time complexity and space complexity with justification

## Problem

Analyze the following function and state its **time complexity** and **space complexity**. Justify each answer in a comment. This one requires counting more carefully than a simple nested loop.

```js
function nestedLog(n) {
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      console.log(i, j);
    }
  }
}
```

## Input / Output

```
Input:  n (a positive integer)
Output: State O(?) time, O(?) space — and explain why
```

### Example trace for n = 4

```
Outer i=0: inner j runs 0,1,2,3  (4 iterations)
Outer i=1: inner j runs 1,2,3    (3 iterations)
Outer i=2: inner j runs 2,3      (2 iterations)
Outer i=3: inner j runs 3        (1 iteration)

Total iterations: 4 + 3 + 2 + 1 = 10
```

## Constraints
- `n` is a positive integer.
- The inner loop starts at `j = i`, not `j = 0`.

## Hints

<details>
<summary>Hint 1 — total iterations via triangular numbers</summary>

The inner loop runs n iterations when i=0, then n-1, then n-2, ..., then 1.

Total = n + (n-1) + (n-2) + ... + 2 + 1

This is the formula for triangular numbers: n(n+1)/2.

For n = 1000: that's 500,500 iterations.
</details>

<details>
<summary>Hint 2 — drop the constant</summary>

n(n+1)/2 = (n² + n) / 2

Apply the rules:
1. Drop the constant 1/2: n² + n
2. Drop the lower-order term n: n²

Result: **O(n²)**.

Even though the inner loop starts at `i` (not 0), the total work is still quadratic — just about half of a full n×n nested loop.
</details>

<details>
<summary>Hint 3 — compare with the full nested loop</summary>

A "full" nested loop (j from 0 to n) does n² iterations.
This "triangle" loop does about n²/2 iterations.

Big-O drops the 1/2 constant, so both are **O(n²)**.

The triangle loop is faster in practice (half the operations), but the same Big-O class as a full nested loop.
</details>

## Write your answer
→ [`../solutions/12-triangle-loop.js`](../solutions/12-triangle-loop.js)

## Follow-ups
- If the inner loop ran from `j = 0` to `j = i` (instead of `j = i` to `j = n`), would the complexity change?
- What is the complexity of generating all pairs `[arr[i], arr[j]]` where `i < j`? (Hint: this is the same structure.)
- Write a version of this loop that collects all pairs into an array. What is the space complexity of the result?
- At what n does this function start to feel slow (say, > 100ms)? Estimate based on ~10⁸ operations per second.
