# Q2 — Factorial of N

**Difficulty:** Easy
**Pattern:** Linear recursion (one call, reduces by 1)
**Expected:** O(n) time · O(n) space (call stack)

## Problem

Write a recursive function `factorial(n)` that returns `n!` (n factorial).

`n!` is defined as: `n × (n-1) × (n-2) × … × 2 × 1`.

Special case: `0! = 1` (by mathematical convention — the "empty product").

> **Why this problem?** Factorial is the "hello world" of recursion — it appears in almost every textbook. More importantly, it forces you to trace the two-phase pattern (going down, coming back up) that all recursion follows.

## Examples

### Example 1
```
Input:  n = 5
Output: 120
```
Because `5 × 4 × 3 × 2 × 1 = 120`.

### Example 2
```
Input:  n = 0
Output: 1
```
By definition, `0! = 1`.

### Example 3
```
Input:  n = 1
Output: 1
```

### Example 4
```
Input:  n = 10
Output: 3628800
```

## Constraints
- `0 <= n <= 12` (beyond 12, the result overflows a regular JavaScript number)
- Use recursion (no loops).

## Hints

<details>
<summary>Hint 1 — identify the base case</summary>

What is `0!`? By definition, it's `1`. That's your base case — if `n === 0`, return `1` directly.

You might also think of `1! = 1` as a valid base case. Both work.
</details>

<details>
<summary>Hint 2 — identify the recursive case</summary>

Apply the leap of faith. Assume `factorial(n-1)` correctly gives you `(n-1)!`.

Then `n! = n × (n-1)!`, so:

```
return n * factorial(n - 1);
```
</details>

<details>
<summary>Hint 3 — trace it by hand for n = 4</summary>

**Phase 1: going down**
```
factorial(4) waits for factorial(3)
  factorial(3) waits for factorial(2)
    factorial(2) waits for factorial(1)
      factorial(1) waits for factorial(0)
        factorial(0) → returns 1  ← BASE CASE
```

**Phase 2: coming back up**
```
factorial(1) = 1 * 1 = 1    → returns 1
factorial(2) = 2 * 1 = 2    → returns 2
factorial(3) = 3 * 2 = 6    → returns 6
factorial(4) = 4 * 6 = 24   → returns 24
```
</details>

<details>
<summary>Hint 4 — common mistake</summary>

Make sure you `return` the recursive call's result. A common mistake:

```js
// ❌ Wrong — function returns undefined
function factorial(n) {
  if (n === 0) return 1;
  n * factorial(n - 1);   // forgot return!
}

// ✅ Correct
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}
```
</details>

## Write your solution
→ [`../solutions/02-factorial.js`](../solutions/02-factorial.js)

## Follow-ups
- Write an iterative version using a `for` loop. Compare the two.
- Write a tail-recursive version using an accumulator: `factTail(n, acc = 1)`. What does the accumulator hold at each step?
- What is the iterative equivalent of the tail-recursive version? (Hint: it's basically the same as your `for` loop version.)
