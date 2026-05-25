# Q4 — Fibonacci

**Difficulty:** Easy → Medium (depending on which version)
**Pattern:** Recursion · Memoization · Iteration · Matrix exponentiation
**Expected:** O(n) time · O(1) space (iterative)

## Problem

The Fibonacci sequence is: `0, 1, 1, 2, 3, 5, 8, 13, 21, 34, …`

Each number is the sum of the two before it:
```
F(0) = 0
F(1) = 1
F(n) = F(n-1) + F(n-2)   for n >= 2
```

Implement at least three versions:
1. **Naive recursion** — understand why it's slow
2. **Memoized recursion** — fix the repeat work
3. **Iterative** — O(n) time, O(1) space

## Examples

### Example 1
```
Input:  n = 0
Output: 0
```

### Example 2
```
Input:  n = 6
Output: 8
```
Sequence: 0, 1, 1, 2, 3, 5, **8**

### Example 3
```
Input:  n = 10
Output: 55
```

### Example 4
```
Input:  n = 50
Output: 12586269025
```
(Use BigInt or regular Number — 12 billion fits in Number safely.)

## Constraints
- `0 <= n <= 50`

## Hints

<details>
<summary>Hint 1 — why naive recursion is slow</summary>

`fib(5)` calls `fib(4)` and `fib(3)`.
`fib(4)` calls `fib(3)` and `fib(2)`.
`fib(3)` is computed twice! For large n, this snowballs to O(2^n) total calls.
</details>

<details>
<summary>Hint 2 — memoization fix</summary>

Before computing `fib(n)`, check a cache (a `Map` or object). If the answer is already there, return it. Otherwise compute it, store it, then return it. Each `fib(k)` is now computed exactly once.
</details>

<details>
<summary>Hint 3 — the iterative approach</summary>

You only ever need the last two values. Keep two variables `prev` and `curr`, and update them at each step:

```js
let [prev, curr] = [0, 1];
for (let i = 2; i <= n; i++) {
  [prev, curr] = [curr, prev + curr];
}
```
</details>

## Write your solution
→ [`../solutions/04-fibonacci.js`](../solutions/04-fibonacci.js)

## Follow-ups
- What's `F(10^18) mod (10^9 + 7)`? (Hint: matrix exponentiation in O(log n).)
- Prove that consecutive Fibonacci numbers are always coprime.
- The sum of the first n Fibonacci numbers equals `F(n+2) - 1`. Verify this for n = 5.
